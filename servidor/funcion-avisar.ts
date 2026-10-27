// Función "avisar" de Supabase (Edge Function): manda las notificaciones al móvil.
// La llama la base de datos cuando la junta envía un aviso, cuando un entrenador hace una petición
// y cuando cambia el estado de una petición. La app también la llama para pedir la clave pública.
// Las claves de las notificaciones se crean solas la primera vez y se guardan en push_config.
import webpush from "npm:web-push@3.6.7";
import { createClient } from "npm:@supabase/supabase-js@2";

const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const ESTADOS = ["Enviada", "Vista", "En marcha", "Resuelta"];

async function claves() {
  let { data } = await sb.from("push_config").select("*").eq("id", 1).maybeSingle();
  if (!data) {
    const k = webpush.generateVAPIDKeys();
    await sb.from("push_config").upsert({ id: 1, publica: k.publicKey, privada: k.privateKey }, { onConflict: "id", ignoreDuplicates: true });
    ({ data } = await sb.from("push_config").select("*").eq("id", 1).single());
  }
  return data!;
}

// Quién recibe la notificación y qué dice
async function mensaje(tabla: string, op: string, id: number) {
  if (tabla === "avisos" && op === "INSERT") {
    const { data: a } = await sb.from("avisos").select("titulo, texto").eq("id", id).single();
    const { data: p } = await sb.from("perfiles").select("id").eq("rol", "entrenador");
    return a && { para: (p || []).map(x => x.id), title: "Aviso de la junta", body: a.titulo, tab: "msg" };
  }
  if (tabla === "peticiones") {
    const { data: r } = await sb.from("peticiones").select("titulo, estado, urgente, autor").eq("id", id).single();
    if (!r) return null;
    if (op === "INSERT") {
      const { data: p } = await sb.from("perfiles").select("id").eq("rol", "junta");
      return { para: (p || []).map(x => x.id), title: r.urgente ? "Nueva petición urgente" : "Nueva petición", body: r.titulo, tab: "home" };
    }
    if (op === "UPDATE" && r.estado > 0 && r.autor) return { para: [r.autor], title: `Tu petición: ${ESTADOS[r.estado] || "actualizada"}`, body: r.titulo, tab: "ask" };
  }
  return null;
}

Deno.serve(async req => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const b = await req.json().catch(() => ({}));
  const k = await claves();
  if (b.accion === "clave") return Response.json({ clave: k.publica }, { headers: cors });
  const m = await mensaje(String(b.tabla || ""), String(b.op || ""), Number(b.id));
  if (!m || !m.para.length) return Response.json({ enviadas: 0 }, { headers: cors });
  webpush.setVapidDetails("https://jmbernalstudio.github.io/gestionazn/", k.publica, k.privada);
  const { data: subs } = await sb.from("push_subs").select("endpoint, p256dh, auth").in("perfil", m.para);
  const carga = JSON.stringify({ title: m.title, body: m.body.length > 140 ? m.body.slice(0, 137) + "…" : m.body, tab: m.tab });
  let enviadas = 0;
  await Promise.all((subs || []).map(s => webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, carga, { TTL: 86400 })
    .then(() => enviadas++)
    .catch(async e => { if (e.statusCode === 404 || e.statusCode === 410) await sb.from("push_subs").delete().eq("endpoint", s.endpoint); })));
  return Response.json({ enviadas }, { headers: cors });
});
