/* Conexión con el servidor privado del club (Supabase).
   Con js/config.js relleno, la app pide usuario y contraseña y trae de allí plantillas, asistencia,
   peticiones y avisos. Cada persona solo recibe lo que sus permisos le dejan ver. */
(function () {
  const C = window.SERVIDOR || {};
  if (!C.url || !C.clave || !window.supabase) return;
  const sb = window.supabase.createClient(C.url, C.clave, { auth: { persistSession: true, autoRefreshToken: true } });
  const DOMINIO = 'usuarios.cdaznalcollar.es';
  const emailDe = u => { u = u.trim().toLowerCase(); return u.includes('@') ? u : `${u}@${DOMINIO}`; };
  const ok = ({ data, error }) => { if (error) throw error; return data; };
  const nombreEq = id => (D.equipos.find(e => e.id === id) || {}).nombre || id;
  const idEq = nombre => (D.equipos.find(e => e.nombre === nombre) || {}).id || null;
  const cuando = iso => {
    const d = new Date(iso), dias = Math.round((new Date(TODAY) - new Date(ISO(d))) / 864e5);
    const h = `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
    return dias <= 0 ? `Hoy, ${h}` : dias === 1 ? 'Ayer' : `Hace ${dias} días`;
  };

  window.SERVIDOR_ON = true;
  window.API = {
    async asistencia(jugador, fecha, presente) {
      ok(presente ? await sb.from('asistencia').upsert({ jugador, fecha }, { ignoreDuplicates: true }) : await sb.from('asistencia').delete().match({ jugador, fecha }));
    },
    async jugador(team, p) {
      return ok(await sb.from('jugadores').insert({ equipo: idEq(team), nombre: p.n, dorsal: p.dorsal }).select('id').single()).id;
    },
    async editarJugador(id, n, dorsal) { ok(await sb.from('jugadores').update({ nombre: n, apellidos: '', dorsal }).eq('id', id)); },
    async quitarJugador(id, activo) { ok(await sb.from('jugadores').update({ activo }).eq('id', id)); },
    async peticion(r) {
      const fila = { equipo: idEq(r.team), tipo: r.kind, titulo: r.title, lugar: r.where || '', urgente: r.urgent };
      let res = await sb.from('peticiones').insert(r.foto ? { ...fila, foto: r.foto } : fila).select('id').single();
      /* Si aún no existe la columna "foto", la petición sale igualmente, sin foto */
      if (res.error && r.foto && /foto/.test(res.error.message || '')) { res = await sb.from('peticiones').insert(fila).select('id').single(); r.conFoto = false; }
      return ok(res).id;
    },
    async fotoPeticion(id) { return ok(await sb.from('peticiones').select('foto').eq('id', id).single()).foto; },
    async estado(id, st) { ok(await sb.from('peticiones').update({ estado: st }).eq('id', id)); },
    async aviso(n) { return ok(await sb.from('avisos').insert({ titulo: n.title, texto: n.body }).select('id').single()).id; },
    async borrarAviso(id) { ok(await sb.from('avisos').delete().eq('id', id)); },
    async leido(id) { ok(await sb.from('avisos_leidos').upsert({ aviso: id }, { ignoreDuplicates: true })); },
    async alta(p) { return ok(await sb.rpc('crear_usuario', { p_usuario: p.usuario, p_clave: p.clave, p_nombre: p.nombre, p_rol: p.rol, p_equipos: p.equipos })); },
    async entreno(team, t) {
      const base = { dias: t.dias, hora: t.h, lugar: t.where };
      const r = await sb.from('equipos').update({ ...base, sesiones: t.ses }).eq('id', idEq(team));
      /* Si aún no existe la columna "sesiones", guarda al menos días, hora y campo */
      ok(r.error && /sesiones/.test(r.error.message || '') ? await sb.from('equipos').update(base).eq('id', idEq(team)) : r);
    },
    async foto(perfil, foto) { ok(await sb.from('perfiles').update({ foto }).eq('id', perfil)); },
    async clave(perfil, clave) { ok(await sb.rpc('cambiar_clave', { p_perfil: perfil, p_clave: clave })); },
    async convocatoria(team, fecha, c) {
      ok(await sb.from('convocatorias').upsert({ equipo: idEq(team), fecha, jugadores: c.ids, hora: c.hora || '', lugar: c.lugar || '', nota: c.nota || '' }, { onConflict: 'equipo,fecha' }));
    },
    async nombre(nombre) { ok(await sb.rpc('cambiar_nombre', { p_nombre: nombre })); },
    async equipos(perfil, ids) {
      ok(await sb.from('entrenador_equipo').delete().eq('perfil', perfil).not('equipo', 'in', `(${ids.join(',')})`));
      ok(await sb.from('entrenador_equipo').upsert(ids.map(equipo => ({ perfil, equipo })), { ignoreDuplicates: true }));
    }
  };

  /* ---------- Pantalla de entrada ---------- */
  function pantallaEntrada(msg) {
    document.body.classList.add('sin-sesion');
    let box = $('#login');
    if (!box) { box = document.createElement('div'); box.id = 'login'; box.className = 'login'; document.body.prepend(box); }
    box.hidden = false;
    box.innerHTML = `<main class="card stack" aria-labelledby="lg-t">
      <img class="cr crest" src="${CREST}" alt="">
      <div><h1 id="lg-t">C.D. Aznalcóllar Fútbol Base</h1><p class="sub">Entrenadores y junta directiva</p></div>
      <form id="lg" class="stack" novalidate>
        <label class="f" for="lu">Usuario o correo<input type="text" id="lu" autocomplete="username" autocapitalize="none" spellcheck="false" required></label>
        <label class="f" for="lp">Contraseña<span class="pw"><input type="password" id="lp" autocomplete="current-password" required>
          <button type="button" id="ver" aria-pressed="false">Ver</button></span></label>
        <p id="lerr" class="err" role="alert" ${msg ? '' : 'hidden'}>${msg ? esc(msg) : ''}</p>
        <button type="submit" class="btn blue block" id="lgo">Entrar</button>
      </form>
      <p class="help">¿Sin contraseña? Pídela a la junta.</p>
    </main>`;
    $('#ver').onclick = e => { const v = $('#lp').type === 'password'; $('#lp').type = v ? 'text' : 'password'; e.target.textContent = v ? 'Ocultar' : 'Ver'; e.target.setAttribute('aria-pressed', v); };
    $('#lg').onsubmit = async e => {
      e.preventDefault();
      const err = m => { $('#lerr').textContent = m; $('#lerr').hidden = false; $('#lgo').disabled = false; $('#lgo').textContent = 'Entrar'; };
      const u = $('#lu').value, p = $('#lp').value;
      if (!u.trim() || !p) return err('Escribe tu usuario y tu contraseña.');
      $('#lgo').disabled = true; $('#lgo').textContent = 'Entrando…';
      const { error } = await sb.auth.signInWithPassword({ email: emailDe(u), password: p });
      if (error) return err(/invalid/i.test(error.message) ? 'Usuario o contraseña incorrectos.' : 'No hay conexión. Prueba otra vez en un momento.');
      entrar();
    };
    $('#lu').focus();
  }

  /* ---------- Cargar los datos de la persona que entra ---------- */
  async function cargar() {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return false;
    const yo = ok(await sb.from('perfiles').select('*').eq('id', user.id).single());
    const junta = yo.rol === 'junta';
    const asig = ok(await sb.from('entrenador_equipo').select('perfil, equipo'));
    const mios = junta ? D.equipos.map(e => e.id) : asig.filter(a => a.perfil === yo.id).map(a => a.equipo);
    const desde = new Date(); desde.setDate(desde.getDate() - 60);
    const [jug, asis, pet, avi, lei, gente] = await Promise.all([
      sb.from('jugadores').select('id, equipo, nombre, apellidos, dorsal').eq('activo', true).order('dorsal', { nullsFirst: false }),
      sb.from('asistencia').select('jugador, fecha').gte('fecha', ISO(desde)),
      sb.from('peticiones').select('id, equipo, tipo, titulo, lugar, urgente, estado, creada, con_foto, perfiles(nombre)').order('creada', { ascending: false })
        .then(r => r.error ? sb.from('peticiones').select('id, equipo, tipo, titulo, lugar, urgente, estado, creada, perfiles(nombre)').order('creada', { ascending: false }) : r),
      sb.from('avisos').select('*').order('creado', { ascending: false }).limit(50),
      sb.from('avisos_leidos').select('aviso, perfil'),
      junta ? sb.from('perfiles').select('id, usuario, nombre, rol, foto').order('nombre') : Promise.resolve({ data: [] })
    ].map(q => Promise.resolve(q).then(ok)));

    S.live = true;
    S.me = { id: yo.id, nombre: yo.nombre, foto: yo.foto || null };
    S.coach = yo.nombre;
    S.role = junta ? 'board' : 'coach';
    S.teams = {};
    const eqs = ok(await sb.from('equipos').select('*'));
    mios.sort((a, b) => ORDEN.indexOf(a) - ORDEN.indexOf(b));
    for (const id of mios) {
      const q = eqs.find(x => x.id === id) || {};
      S.teams[nombreEq(id)] = { cat: '', train: { dias: q.dias || [], h: q.hora || '', where: q.lugar || '', ses: Array.isArray(q.sesiones) ? q.sesiones : null }, players: [] };
    }
    const equipoDe = {};
    for (const j of jug) {
      equipoDe[j.id] = nombreEq(j.equipo);
      const t = S.teams[equipoDe[j.id]];
      if (t) t.players.push({ id: j.id, n: `${j.nombre} ${j.apellidos}`.trim(), dorsal: j.dorsal });
    }
    /* Convocatorias de los próximos partidos (si la tabla aún no existe, se sigue sin ellas) */
    S.conv = {};
    const conv = await sb.from('convocatorias').select('equipo, fecha, jugadores, hora, lugar, nota').gte('fecha', ISO(new Date()));
    for (const c of conv.data || []) S.conv[`${nombreEq(c.equipo)} ${c.fecha}`] = { ids: (c.jugadores || []).map(Number), hora: c.hora, lugar: c.lugar, nota: c.nota };
    S.attend = {};
    for (const a of asis) {
      const k = `${equipoDe[a.jugador]} ${a.fecha}`;
      (S.attend[k] = S.attend[k] || new Set()).add(a.jugador);
    }
    S.requests = pet.map(r => ({ id: r.id, kind: r.tipo, title: r.titulo, where: r.lugar, team: r.equipo ? nombreEq(r.equipo) : '', by: (r.perfiles || {}).nombre || '', st: r.estado, when: cuando(r.creada), urgent: r.urgente, conFoto: !!r.con_foto }));
    S.people = gente.map(p => ({ ...p, equipos: asig.filter(a => a.perfil === p.id).map(a => a.equipo) }));
    const total = S.people.filter(p => p.rol === 'entrenador').length;
    S.notices = avi.map(n => ({ id: n.id, from: 'Junta directiva', title: n.titulo, body: n.texto,
      read: lei.some(l => l.aviso === n.id && l.perfil === yo.id), readBy: lei.filter(l => l.aviso === n.id).length, total }));
    if (!S.teams[S.team]) S.team = Object.keys(S.teams)[0] || null;
    AGENDA = buildAgenda();
    return true;
  }

  window.logout = async () => { await sb.auth.signOut(); location.reload(); };

  async function entrar() {
    try {
      if (!(await cargar())) return pantallaEntrada();
    } catch (_) {
      return pantallaEntrada('No se han podido cargar los datos. Revisa la conexión y vuelve a entrar.');
    }
    document.body.classList.remove('sin-sesion');
    if ($('#login')) $('#login').hidden = true;
    if (S.role === 'coach' && !S.team) {
      $('#main').innerHTML = `<section class="card stack"><h1 style="margin:0">Hola, ${esc(S.me.nombre.split(' ')[0])}</h1>
        <p style="margin:0">Todavía no tienes ningún equipo asignado. Pide a la junta que te asigne el tuyo y vuelve a entrar.</p></section>`;
      return;
    }
    S.tab = 'home'; S.sub = null;
    render();
  }

  /* Al volver a la app, traer lo último (peticiones nuevas, avisos, estados) */
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState !== 'visible' || !S.live || S.draft || document.activeElement.matches('input, textarea, select')) return;
    try { if (await cargar()) render(); } catch (_) {}
  });

  window.startServer = async () => {
    document.body.classList.add('sin-sesion');
    const { data: { session } } = await sb.auth.getSession();
    session ? entrar() : pantallaEntrada();
  };
})();
