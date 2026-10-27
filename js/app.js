const I = {
  home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  team: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><circle cx="17" cy="9" r="2.6"/><path d="M16.5 14.6c2.7.2 4.4 1.9 5 4.9"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  pen: '<path d="M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4"/>',
  out: '<path d="M10 4H5v16h5M14 8l4 4-4 4M18 12H9"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  box: '<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9"/>',
  wrench: '<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 1-2-2z"/><path d="M14.5 6.5L17 4"/>',
  talk: '<path d="M4 6h16v10h-6l-4 4v-4H4z"/><path d="M8 10h8M8 13h5"/>',
  camera: '<path d="M4 8h3l2-2.5h6L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
  send: '<path d="M4 12l16-8-6 16-2.5-6.5z"/>',
  inbox: '<path d="M3.5 13l2.5-8h12l2.5 8v6h-17z"/><path d="M3.5 13H9l1 2h4l1-2h5.5"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  chev: '<path d="M9 5l7 7-7 7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  cal: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  whistle: '<circle cx="9" cy="14" r="5"/><path d="M12.5 10.5L20 6v4l-5 2"/>'
};
const ic = n => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${I[n]}</svg>`;

const STATES = ['Enviada', 'Vista', 'En marcha', 'Resuelta'];

/* Equipos, partidos y clasificaciones reales (js/datos.js, sacado de rfaf.es y educationleague.es) */
const D = window.DATOS || { equipos: [] };
/* Orden del club: de mayores a pequeños */
const ORDEN = ['senior', 'juvenil', 'cadete', 'infantil', 'alevin2', 'alevin1', 'benjamin2', 'benjamin1', 'prebenjamin', 'minis'];
D.equipos.sort((a, b) => (ORDEN.indexOf(a.id) + 1 || 99) - (ORDEN.indexOf(b.id) + 1 || 99));
const EQ = Object.fromEntries(D.equipos.map(e => [e.nombre, e]));
const US = /AZNALC[OÓ]LLAR/i; /* nunca solo "AZNALC": coincidiría con el C.A. Aznalcázar */
const ISO = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const TODAY = ISO(new Date());
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const toDate = iso => new Date(iso + 'T12:00:00');
const dayLbl = iso => { const d = toDate(iso); return `${WD[d.getDay()]} ${d.getDate()}`; };
const dateLbl = iso => { const d = toDate(iso); return `${WD[d.getDay()]} ${d.getDate()} ${MES[d.getMonth()]}`; };
/* "C.D. ATLÉTICO SAN JUAN" -> "C.D. Atlético San Juan" */
const nice = n => n === n.toUpperCase()
  ? n.split(' ').map(w => /\.|^"|^[IVX]+$/.test(w) ? w : w.charAt(0) + w.slice(1).toLowerCase()).join(' ').replace(/ (De|Del|La|Las|Los|Y) /g, m => m.toLowerCase())
  : n;
/* "Alevín 2º año" -> "A2", "Infantil" -> "In" */
const abbr = n => { const m = /(\d)º/.exec(n); return n.slice(0, m ? 1 : 2) + (m ? m[1] : ''); };
const crestOf = (e, name) => e.escudos[name] || null;
const usName = e => (e.tabla.find(r => US.test(r.equipo)) || {}).equipo || Object.keys(e.escudos).find(n => US.test(n));
const nextMatch = e => e.partidos.find(p => !p.descansa && !p.goles && p.fecha >= TODAY) || null;
const played = e => e.partidos.filter(p => p.goles);
const lastMatch = e => played(e).slice(-1)[0] || null;
const outcome = p => { const [a, b] = p.casa ? p.goles : [p.goles[1], p.goles[0]]; return a > b ? 'G' : a < b ? 'P' : 'E'; };
const scoreTxt = p => `${p.goles[0]}–${p.goles[1]}`;
const ourRow = e => e.tabla.find(r => US.test(r.equipo));
const placeOf = p => (p.campo || '').replace(/\s*\((F11|F7)[^)]*\)/gi, '').trim().split(' - ').map(x => nice(x.trim())).join(' · ');
const updated = () => { const d = new Date(D.actualizado); return isNaN(d) ? '' : `${d.getDate()} ${MES[d.getMonth()]}`; };
function crestBadge(e, name, cls = 'mini') {
  const src = US.test(name) ? CREST_SRC : crestOf(e, name);
  return src ? `<span class="${cls} img" aria-hidden="true"><img src="${src}" alt="" loading="lazy"></span>`
    : `<span class="${cls}" style="background:var(--navy)" aria-hidden="true">${initials(nice(name).replace(/^[A-Z.]+\s/, '').replace(/"/g, ''))}</span>`;
}
const S = {
  role: 'coach', tab: 'home', sub: null, conv: {},
  /* live = true cuando hay sesión iniciada en el servidor del club (js/servidor.js) */
  live: false, me: { id: null, nombre: 'Paco Martín' }, board: 'Ana Ruiz',
  coach: 'Paco', team: 'Alevín 2º año',
  /* Equipos de Paco (entrenador de ejemplo). Los partidos son reales; la plantilla aún es de ejemplo. */
  teams: {
    'Alevín 2º año': { cat: 'Alevín · F7', train: { dias: [1, 3], h: '18:00', where: 'Campo 2' },
      players: ['Lucas Romero', 'Hugo Sanz', 'Martín Gil', 'Pablo Ortega', 'Daniel Ruiz', 'Álvaro Vidal', 'Leo Navarro', 'Mateo Cano', 'Izan Molina', 'Adrián Prieto', 'Marcos León', 'Bruno Díez'] },
    'Infantil': { cat: 'Infantil · F11', train: { dias: [1, 4], h: '19:30', where: 'Campo 1' },
      players: ['Sara Blanco', 'Nerea Gómez', 'Lucía Pastor', 'Carla Ibáñez', 'Alba Rubio', 'Irene Moya', 'Paula Crespo', 'Vega Herrero', 'Noa Garrido', 'Elena Soler'] }
  },
  attend: {},
  people: [
    { id: 'd1', nombre: 'Ana Ruiz', usuario: 'ana@example.com', rol: 'junta', equipos: [] },
    { id: 'd2', nombre: 'Paco Martín', usuario: 'paco.alevin', rol: 'entrenador', equipos: ['alevin2', 'infantil'] }
  ],
  cal: [
    { wd: 'Lun', d: '26', h: '18:00', t: 'Entrenamiento', w: 'Campo 2' },
    { wd: 'Mié', d: '28', h: '18:00', t: 'Entrenamiento', w: 'Campo 2' },
    { wd: 'Sáb', d: '31', h: '10:30', t: 'Partido vs. CD Las Eras', w: 'Fuera · Polideportivo Norte' }
  ],
  requests: [
    { id: 1, kind: 'roto', title: 'Portería pequeña con la red rota', where: 'Campo 2', team: 'Alevín A', by: 'Paco', st: 2, when: 'Hace 2 días', urgent: true },
    { id: 2, kind: 'material', title: '10 balones del número 4', where: '', team: 'Alevín A', by: 'Paco', st: 1, when: 'Ayer', urgent: false },
    { id: 3, kind: 'roto', title: 'Luz del vestuario 3 no enciende', where: 'Vestuario 3', team: 'Cadete A', by: 'Raquel', st: 0, when: 'Hoy, 9:12', urgent: true },
    { id: 4, kind: 'otra', title: 'Cambiar el entreno del jueves a las 19:00', where: '', team: 'Infantil B', by: 'Manolo', st: 0, when: 'Hoy, 11:40', urgent: false }
  ],
  notices: [
    { id: 1, from: 'Junta directiva', title: 'Fotos oficiales del club', body: 'El sábado 31 a las 9:00 hacemos las fotos de todos los equipos en el Campo 1. Venid con la primera equipación.', read: false, readBy: 18, total: 24 },
    { id: 2, from: 'Coordinación deportiva', title: 'Nuevo horario de campos', body: 'Desde noviembre, el Campo 2 queda libre los viernes para partidos amistosos.', read: true, readBy: 22, total: 24 }
  ],
  draft: null
};
/* Demo: cada jugador con su id; la asistencia guarda ids */
for (const t of Object.values(S.teams)) t.players = t.players.map((n, i) => ({ id: i + 1, n }));

/* Demo: se guarda en este móvil. Con sesión iniciada, los datos van al servidor (window.API). */
const STORE_KEY = 'cd-aznalcollar-v2';
const API = () => (S.live && window.API) || null;
function load() {
  try {
    const d = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!d) return;
    if (d.requests) S.requests = d.requests;
    if (d.notices) S.notices = d.notices;
    if (d.attend) for (const k in d.attend) S.attend[k] = new Set(d.attend[k]);
  } catch (_) {}
}
function save() {
  if (S.live) return;
  try {
    const attend = {};
    for (const k in S.attend) attend[k] = [...S.attend[k]];
    localStorage.setItem(STORE_KEY, JSON.stringify({ requests: S.requests, notices: S.notices, attend }));
  } catch (_) {}
}
const today = () => TODAY;

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const initials = n => n.split(' ').map(w => w[0]).slice(0, 2).join('');
const short = n => { const [a, b] = n.split(' '); return b ? `${a} ${b[0]}.` : a; };

/* Ventanas propias (sirven en todos los móviles y en la vista previa). onClose recibe el valor de cierre. */
function modal(html, role, onClose) {
  const back = document.activeElement, d = document.createElement('div');
  d.className = 'modal'; d.setAttribute('role', role); d.setAttribute('aria-modal', 'true'); d.setAttribute('aria-labelledby', 'mdl-t');
  d.innerHTML = `<div class="card stack">${html}</div>`;
  const focusables = () => [...d.querySelectorAll('button, input, select, textarea')];
  const key = e => {
    if (e.key === 'Escape') close(false);
    if (e.key === 'Tab') { const f = focusables(), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }
  };
  const close = v => { d.remove(); document.removeEventListener('keydown', key); back && back.focus && back.focus(); onClose(v); };
  d.onclick = e => { if (e.target === d) close(false); const b = e.target.closest('[data-v]'); if (b) close(b.dataset.v === '1'); };
  document.addEventListener('keydown', key);
  document.body.append(d);
  return { el: d, close };
}
function ask(title, text, okLabel) {
  return new Promise(done => {
    const m = modal(`<h2 id="mdl-t">${esc(title)}</h2><p>${esc(text)}</p>
      <div class="btn-row"><button type="button" class="btn ghost" data-v="0">Cancelar</button><button type="button" class="btn red" data-v="1">${esc(okLabel)}</button></div>`, 'alertdialog', done);
    m.el.querySelector('[data-v="0"]').focus();
  });
}
function say(msg, undo) {
  $('#live').textContent = msg;
  const t = $('#toast');
  t.innerHTML = `${ic('check')}<span>${esc(msg)}</span>${undo ? '<button type="button" id="undo">Deshacer</button>' : ''}`;
  t.hidden = false;
  clearTimeout(say.tm);
  say.tm = setTimeout(() => (t.hidden = true), 4500);
  if (undo) $('#undo').onclick = () => { undo(); t.hidden = true; render(); };
}


const CREST = 'icons/escudo-160.png';
const CREST_SRC = CREST;
const CLUB = 'C.D. Aznalcóllar';
const greet = () => { const h = new Date().getHours(); return h < 14 ? 'Buenos días' : h < 21 ? 'Buenas tardes' : 'Buenas noches'; };
const myName = () => S.live ? S.me.nombre : S.role === 'coach' ? S.me.nombre : S.board;
const roleName = () => S.role === 'coach' ? 'Entrenador' : 'Junta directiva';
const myPerson = () => S.live ? S.me : { nombre: myName(), foto: null };
/* Foto de la persona, o sus iniciales si la junta aún no ha subido ninguna */
const avatar = (p, cls) => p.foto ? `<span class="${cls} ph" aria-hidden="true"><img src="${esc(p.foto)}" alt=""></span>` : `<span class="${cls}" aria-hidden="true">${esc(initials(p.nombre))}</span>`;
function bindMe() {
  const b = $('#me'), m = $('#me-menu');
  const close = () => { m.hidden = true; b.setAttribute('aria-expanded', 'false'); };
  b.onclick = e => { e.stopPropagation(); m.hidden = !m.hidden; b.setAttribute('aria-expanded', String(!m.hidden)); if (!m.hidden) m.querySelector('button').focus(); };
  m.onclick = e => e.stopPropagation();
  m.onkeydown = e => { if (e.key === 'Escape') { close(); b.focus(); } };
  document.onclick = close;
  if ($('#logout')) $('#logout').onclick = () => window.logout && window.logout();
  $('#rename').onclick = () => { close(); renameMe(); };
  if ($('#push-menu')) $('#push-menu').onclick = () => { close(); activarPush(); };
  m.querySelectorAll('[data-role]').forEach(x => x.onclick = () => { S.role = x.dataset.role; go('home'); });
}
/* ---------- Notificaciones al móvil ---------- */
const pushNo = () => { try { return localStorage.getItem('push-no') === '1'; } catch (_) { return false; } };
function pushCard() {
  if (!S.live || !['off', 'ios'].includes(S.push) || pushNo()) return '';
  const quien = S.role === 'coach' ? 'cuando la junta te mande un aviso o conteste a tus peticiones' : 'cuando un entrenador haga una petición';
  return `<section class="card push-card" aria-labelledby="h-push"><span class="ic">${ic('bell')}</span>
    <div class="grow">${S.push === 'ios'
      ? '<h2 id="h-push">Recibe los avisos en el móvil</h2><p>Para que te lleguen las notificaciones, abre la app desde su icono en la pantalla de inicio.</p></div><div class="btns one"><button type="button" class="btn ghost" id="push-no">Entendido</button></div>'
      : `<h2 id="h-push">Activa las notificaciones</h2><p>Te avisaremos en el móvil ${quien}.</p></div><div class="btns"><button type="button" class="btn ghost" id="push-no">Ahora no</button><button type="button" class="btn blue" id="push-si">${ic('bell')} Activar</button></div>`}
  </section>`;
}
async function activarPush() {
  try { S.push = await window.Push.activar(); } catch (_) { say('No se han podido activar. Prueba otra vez en un momento.'); return; }
  render();
  say(S.push === 'on' ? 'Notificaciones activadas' : 'Las notificaciones están bloqueadas. Actívalas en los ajustes del móvil.');
}
function bindPush() {
  if ($('#push-si')) $('#push-si').onclick = activarPush;
  if ($('#push-no')) $('#push-no').onclick = () => { try { localStorage.setItem('push-no', '1'); } catch (_) {} render(); };
}

/* Ventana para cambiar el nombre que sale junto a la foto */
function renameMe() {
  const m = modal(`<h2 id="mdl-t">Cambiar mi nombre</h2>
    <form id="nf" class="stack" novalidate>
      <label class="f" for="nn">Tu nombre<span class="hint">Sale junto a tu foto</span><input type="text" id="nn" autocomplete="name" maxlength="60" value="${esc(myName())}"></label>
      <p id="nerr" class="err" role="alert" hidden>Escribe tu nombre.</p>
      <div class="btn-row"><button type="button" class="btn ghost" data-v="0">Cancelar</button><button type="submit" class="btn blue">${ic('check')} Guardar</button></div>
    </form>`, 'dialog', () => {});
  $('#nn').focus(); $('#nn').select();
  $('#nf').onsubmit = async e => {
    e.preventDefault();
    const n = $('#nn').value.trim().replace(/\s+/g, ' ');
    if (!n) { $('#nerr').hidden = false; $('#nn').focus(); return; }
    try { API() && await API().nombre(n); } catch (_) { $('#nerr').textContent = 'No se ha podido guardar. Revisa la conexión.'; $('#nerr').hidden = false; return; }
    const old = myName();
    S.requests.forEach(r => { if (r.by === old) r.by = n; });
    const yo = S.people.find(p => p.id && p.id === S.me.id); if (yo) yo.nombre = n;
    if (S.live || S.role === 'coach') { S.me.nombre = n; S.coach = n; } else S.board = n;
    m.close(); render(); say('Nombre cambiado.');
  };
}
/* Reduce la foto a 192 px (JPEG) para guardarla junto al perfil */
function readPhoto(file) {
  return new Promise((ok, ko) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const n = 192, c = document.createElement('canvas'), sz = Math.min(img.width, img.height);
      c.width = c.height = n;
      c.getContext('2d').drawImage(img, (img.width - sz) / 2, (img.height - sz) / 2, sz, sz, 0, 0, n, n);
      URL.revokeObjectURL(url); ok(c.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = ko; img.src = url;
  });
}
/* Foto de una petición: lado mayor a 1280 px (JPEG) para que suba rápido y se vea bien */
function readImage(file, max = 1280) {
  return new Promise((ok, ko) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas');
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url); ok(c.toDataURL('image/jpeg', 0.8));
    };
    img.onerror = ko; img.src = url;
  });
}
function photoField(foto, nombre) {
  return `<label class="photo" for="fo">${avatar({ foto, nombre: nombre || '?' }, 'av')}<span id="fo-t">${foto ? 'Foto añadida · toca para cambiarla' : 'Añadir foto (opcional)'}</span></label>
    <input type="file" id="fo" accept="image/*" class="sr">`;
}
function bindPhoto(state) {
  $('#fo').onchange = async () => {
    const f = $('#fo').files[0]; if (!f) return;
    try { state.foto = await readPhoto(f); } catch (_) { say('No se ha podido leer esa foto. Prueba con otra.'); return; }
    const l = $('label[for=fo]'); l.querySelector('.av').outerHTML = avatar({ foto: state.foto }, 'av'); $('#fo-t').textContent = 'Foto añadida · toca para cambiarla';
  };
}
const firstName = () => myName().split(' ')[0];
const crestImg = (cls = '') => `<img class="cr ${cls}" src="${CREST}" alt="">`;


/* Días de entreno: 1 = lunes … 7 = domingo (los elige la junta en cada equipo) */
const DIAS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const DIAS_D = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const DIAS_L = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábados', 'domingos'];
const dow = iso => (toDate(iso).getDay() + 6) % 7 + 1;
const addDays = (iso, n) => { const d = toDate(iso); d.setDate(d.getDate() + n); return ISO(d); };
const trainOf = team => S.teams[team] && S.teams[team].train && S.teams[team].train.dias.length ? S.teams[team].train : null;
const trainsOn = (team, iso) => { const t = trainOf(team); return !!t && t.dias.includes(dow(iso)); };
/* Cada día de entreno lleva su hora y su campo (p. ej. lunes Campo 1, miércoles Campo 2) */
const sesiones = t => t ? (t.ses && t.ses.length ? t.ses : t.dias.map(d => ({ d, h: t.h || '', where: t.where || '' }))) : [];
const trainAt = (team, iso) => { const t = trainOf(team); if (!t || !t.dias.includes(dow(iso))) return null; return sesiones(t).find(x => x.d === dow(iso)) || { d: dow(iso), h: t.h || '', where: t.where || '' }; };
const trainLbl = t => ['Entrenamiento', t.h, t.where].filter(Boolean).join(' · ');
/* Solo se pasa lista en días de entreno: hoy si toca, o uno de las dos últimas semanas que se olvidó */
const LOOKBACK = 14;
const trainDates = team => [...Array(LOOKBACK)].map((_, i) => addDays(TODAY, i - LOOKBACK + 1)).filter(d => trainsOn(team, d));
/* Cuentan como pendientes desde la primera lista pasada en la app (antes no se usaba) */
const firstList = team => Object.keys(S.attend).filter(k => k.startsWith(team + ' ') && S.attend[k].size).map(k => k.slice(team.length + 1)).sort()[0] || TODAY;
const pendingLists = team => S.teams[team].players.length ? trainDates(team).filter(d => d >= firstList(team) && !(S.attend[`${team} ${d}`] || { size: 0 }).size) : [];
const pendingAll = () => Object.keys(S.teams).flatMap(team => pendingLists(team).map(iso => ({ team, iso })));
/* Agenda: entrenos y partidos reales de los próximos 7 días; tira de días de lunes a domingo */
const WEEK = [...Array(7)].map((_, i) => addDays(TODAY, i));
const MONWEEK = [...Array(7)].map((_, i) => addDays(TODAY, i - dow(TODAY) + 1));
function buildAgenda() {
  const ev = [];
  for (const team of Object.keys(S.teams)) WEEK.forEach((iso, i) => {
    const t = trainAt(team, iso);
    if (!t) return;
    ev.push({ iso, day: i === 0 ? 'Hoy' : dayLbl(iso), h: t.h || '--:--', kind: 'train', team, where: t.where || '', today: i === 0 });
  });
  for (const e of D.equipos) for (const p of e.partidos)
    if (!p.descansa && p.fecha >= WEEK[0] && p.fecha <= WEEK[6]) ev.push({ iso: p.fecha, day: p.fecha === TODAY ? 'Hoy' : dayLbl(p.fecha), h: p.hora || '--:--', kind: 'match', team: e.nombre, p, e });
  return ev.sort((a, b) => (a.iso + a.h).localeCompare(b.iso + b.h));
}
let AGENDA = buildAgenda();

function tabsFor() {
  const unread = S.notices.filter(n => !n.read).length;
  const open = S.requests.filter(r => r.st < 3).length;
  return S.role === 'coach'
    ? [['home', 'Inicio', 'home'], ['team', 'Mi equipo', 'team', '', pendingAll().length], ['ask', 'Solicitar', 'plus', 'plus'], ['games', 'Partidos', 'cal'], ['msg', 'Mensajes', 'chat', '', unread]]
    : [['home', 'Bandeja', 'inbox', '', open], ['team', 'Equipos', 'team'], ['ask', 'Aviso', 'send', 'plus'], ['games', 'Partidos', 'cal'], ['msg', 'Enviados', 'chat']];
}

function go(tab, sub = null) { if (tab === 'ask' && S.tab !== 'ask') S.askView = 'new'; S.tab = tab; S.sub = sub; if (tab !== 'ask') S.draft = null; render(true); }

function render(focus) {
  save();
  const tabs = tabsFor();
  $('#rail-tabs').innerHTML = tabs.map(([k, l, i, cls, n]) =>
    `<li><button type="button" class="${cls || ''}" data-tab="${k}" ${S.tab === k ? 'aria-current="page"' : ''}>${ic(i)}<span>${l}</span>${n ? `<span class="badge" aria-label="${n} pendientes">${n}</span>` : ''}</button></li>`).join('');
  $('#bottom-tabs').innerHTML = tabs.map(([k, l, i, cls, n]) =>
    `<li><button type="button" class="${cls || ''}" data-tab="${k}" ${S.tab === k ? 'aria-current="page"' : ''}>${cls === 'plus' ? `<span class="ic">${ic(i)}</span>` : ic(i)}<span>${l}</span>${n ? `<span class="badge" aria-label="${n} pendientes">${n}</span>` : ''}</button></li>`).join('');
  const v = (S.role === 'coach' ? COACH : BOARD)[S.tab]();
  const unread = S.notices.filter(n => !n.read).length;
  const unseen = S.requests.filter(r => r.st === 0).length;
  $('#top').innerHTML = `
    ${v.back ? `<button type="button" class="back" data-back aria-label="Volver">${ic('back')}</button>` : crestImg('logo')}
    <div class="title"><small>${v.kicker}</small><h1 id="title">${v.title}</h1></div>
    <div class="me-wrap"><button type="button" class="me" id="me" aria-haspopup="true" aria-expanded="false" aria-controls="me-menu" aria-label="Tu cuenta: ${esc(myName())}">
      ${S.tab === 'home' ? `<span class="me-t"><small>${roleName()}</small></span>` : `<span class="me-t"><small>${roleName()}</small><b>${esc(myName())}</b></span>`}${avatar(myPerson(), 'av')}</button>
      <div class="me-menu card" id="me-menu" hidden>${avatar(myPerson(), 'av big')}<b>${esc(myName())}</b><small>${roleName()}</small>
        <button type="button" class="btn ghost block" id="rename">${ic('pen')} Cambiar mi nombre</button>
        ${!S.live ? '' : S.push === 'off' ? `<button type="button" class="btn ghost block" id="push-menu">${ic('bell')} Activar notificaciones</button>`
          : S.push === 'on' ? `<small class="push-st">${ic('check')} Notificaciones activadas</small>`
          : S.push === 'denied' ? '<small class="push-st">Notificaciones bloqueadas. Actívalas en los ajustes del móvil.</small>' : ''}
        ${S.live ? `<button type="button" class="btn red block" id="logout">${ic('out')} Cerrar sesión</button>`
          : `<div class="stack" style="width:100%;gap:8px"><small>Demostración · ver como</small>
            <button type="button" class="btn ${S.role === 'coach' ? 'blue' : 'out'} block" data-role="coach">Entrenador</button>
            <button type="button" class="btn ${S.role === 'board' ? 'blue' : 'out'} block" data-role="board">Junta</button></div>`}</div></div>
    ${S.role === 'coach' ? `<button type="button" class="iconbtn" data-go="msg" aria-label="Mensajes${unread ? `, ${unread} sin leer` : ''}">${ic('bell')}${unread ? '<span class="dot"></span>' : ''}</button>`
      : `<button type="button" class="iconbtn" data-go="home" aria-label="Peticiones${unseen ? `, ${unseen} sin ver` : ''}">${ic('bell')}${unseen ? '<span class="dot"></span>' : ''}</button>`}`;
  bindMe();
  $('#main').className = v.layout || '';
  $('#main').innerHTML = v.body;
  v.bind && v.bind();
  bindPush();
  bindMatches();
  bindGo();
  if (v.back) $('[data-back]').onclick = v.back;
  if (focus) { $('#title').setAttribute('tabindex', '-1'); $('#title').focus({ preventScroll: true }); window.scrollTo(0, 0); }
}

const kindIco = k => k === 'roto' ? 'wrench' : k === 'material' ? 'box' : 'talk';
const kindName = k => k === 'roto' ? 'Algo roto' : k === 'material' ? 'Material' : 'Otra petición';
const kindCls = k => k === 'roto' ? '' : k === 'material' ? 'b' : 'g';
function stPill(r) {
  if (r.urgent && r.st < 3) return '<span class="pill red">Urgente</span>';
  return `<span class="pill ${r.st === 3 ? '' : r.st === 0 ? 'grey' : 'blue'}">${STATES[r.st]}</span>`;
}
function stepsHTML(r, labels) {
  return `<div role="img" aria-label="Estado: ${STATES[r.st]}, paso ${r.st + 1} de 4"><div class="steps" aria-hidden="true">${STATES.map((_, i) => `<i class="${i <= r.st ? 'on' : ''}"></i>`).join('')}</div>
    ${labels ? `<div class="steps-lbl" aria-hidden="true">${STATES.map((s, i) => `<span class="${i <= r.st ? 'on' : ''}">${s}</span>`).join('')}</div>` : ''}</div>`;
}
function reqRow(r, ctl = '') {
  return `<div class="rq" data-rq="${r.id}"><span class="ic ${kindCls(r.kind)}">${ic(kindIco(r.kind))}</span>
    <div class="grow"><button type="button" class="rq-open" data-rq-open="${r.id}" title="${esc(r.title)}">${esc(r.title)}</button><div class="rq-meta">${stPill(r)}<small>${r.conFoto ? `<span class="rq-ph" aria-label="Con foto">${ic('camera')}</span>` : ''}${S.role === 'board' ? `${r.by} · ${r.team} · ` : ''}${r.when}${r.where ? ' · ' + esc(r.where) : ''}</small></div>${stepsHTML(r, !!ctl)}</div>
    ${ctl}</div>`;
}
/* Tocar una petición abre todo: texto entero, quién, dónde, foto y estado */
function openRequest(r) {
  const board = S.role === 'board';
  /* Si es nueva y la abre la junta, pasa sola a "Vista" (el entrenador lo ve en su móvil) */
  if (board && r.st === 0) { r.st = 1; render(); API() && API().estado(r.id, 1).catch(() => { r.st = 0; render(); }); }
  /* La junta puede borrar cualquiera; el entrenador solo retira la suya mientras la junta no la haya abierto */
  const canDel = board || r.st === 0;
  const m = modal(`<div class="rqd-h"><span class="ic ${kindCls(r.kind)}">${ic(kindIco(r.kind))}</span><div class="grow"><small>${kindName(r.kind)}</small><div class="rq-meta">${stPill(r)}</div></div>
      <button type="button" class="iconbtn" data-v="0" aria-label="Cerrar">${ic('x')}</button></div>
    <h2 id="mdl-t" class="rqd-t">${esc(r.title)}</h2>
    <dl class="facts">${board ? `<div><dt>Lo pide</dt><dd>${esc(r.by || '—')}</dd></div>` : ''}<div><dt>Equipo</dt><dd>${esc(r.team || '—')}</dd></div>
      <div><dt>Cuándo</dt><dd>${esc(r.when)}</dd></div>${r.where ? `<div><dt>Dónde</dt><dd>${esc(r.where)}</dd></div>` : ''}</dl>
    <div id="rqd-ph">${r.foto ? `<a href="${r.foto}" target="_blank" rel="noopener"><img class="rqd-img" src="${r.foto}" alt="Foto adjunta"></a>` : r.conFoto ? '<p class="muted" style="margin:0">Cargando la foto…</p>' : '<p class="muted" style="margin:0">Sin foto adjunta.</p>'}</div>
    ${stepsHTML(r, true)}
    ${board ? `<label class="f" for="rqd-st">Estado<select id="rqd-st">${STATES.map((s, i) => `<option value="${i}" ${i === r.st ? 'selected' : ''}>${s}</option>`).join('')}</select></label>` : ''}
    <button type="button" class="btn blue block" data-v="0">${ic('check')} Hecho</button>
    ${canDel ? `<button type="button" class="btn red block" id="rqd-del">${ic('trash')} ${board ? 'Borrar petición' : 'Retirar petición'}</button>` : ''}`, 'dialog', () => {});
  m.el.classList.add('rqd');
  if (r.conFoto && !r.foto && API()) API().fotoPeticion(r.id).then(f => { r.foto = f; const box = m.el.querySelector('#rqd-ph'); if (box && f) box.innerHTML = `<a href="${f}" target="_blank" rel="noopener"><img class="rqd-img" src="${f}" alt="Foto adjunta"></a>`; })
    .catch(() => { const box = m.el.querySelector('#rqd-ph'); if (box) box.innerHTML = '<p class="muted" style="margin:0">No se ha podido cargar la foto.</p>'; });
  const del = m.el.querySelector('#rqd-del');
  if (del) del.onclick = async () => {
    m.close(false);
    if (!(await ask(board ? '¿Borrar esta petición?' : '¿Retirar esta petición?', board ? 'Desaparecerá también del móvil del entrenador. No se puede deshacer.' : 'La junta ya no la verá. No se puede deshacer.', board ? 'Sí, borrar' : 'Sí, retirar'))) return;
    try { API() && await API().borrarPeticion(r.id); } catch (e) {
      if (e && e.message === 'vista' && !board) { r.st = Math.max(r.st, 1); render(); say('La junta ya la ha visto y no se puede retirar. Si es un error, avisa a la junta.'); }
      else say('No se ha podido borrar. Revisa la conexión.');
      return;
    }
    S.requests = S.requests.filter(x => x !== r); render(); say(board ? 'Petición borrada.' : 'Petición retirada.');
  };
  const sel = m.el.querySelector('#rqd-st');
  if (sel) sel.onchange = () => {
    const prev = r.st; r.st = +sel.value; render();
    API() && API().estado(r.id, r.st).catch(() => { r.st = prev; render(); say('No se ha podido guardar. Revisa la conexión.'); });
    say(`“${r.title}” pasa a ${STATES[r.st]}.`);
  };
  m.el.querySelector('.iconbtn').focus();
}
function bindRequests() {
  document.querySelectorAll('[data-rq]').forEach(row => row.onclick = e => {
    if (e.target.closest('.ctl')) return;
    const r = S.requests.find(x => x.id == row.dataset.rq); if (r) openRequest(r);
  });
}
/* Pantalla sin contenido: tarjeta alta con el mensaje centrado en la parte visible */
function emptyPage(icon, title, text, cls = '', action = '') {
  return `<section class="card empty empty-page ${cls}">${ic(icon)}<b>${title}</b><small>${text}</small>${action}</section>`;
}
function card(id, title, body, cls = '', more = '') {
  return `<section class="card ${cls}" aria-labelledby="${id}"><div class="card-h"><h2 id="${id}">${title}</h2>${more}</div>${body}</section>`;
}
function scoreHTML(team) {
  const e = EQ[team];
  const m = e && nextMatch(e);
  if (!m) return `<p style="margin:8px 0 0">No hay más partidos publicados por ahora.</p>`;
  const us = `<div><div class="ring">${crestImg()}</div><b>Aznalcóllar</b><small>${team}</small></div>`;
  const src = crestOf(e, m.rival);
  const them = `<div><div class="ring ${src ? '' : 'rv'}" aria-hidden="true">${src ? `<img src="${src}" alt="">` : initials(nice(m.rival))}</div><b title="${esc(nice(m.rival))}">${esc(nice(m.rival))}</b><small>${m.casa ? 'Visitante' : 'Local'}</small></div>`;
  return `<div class="score">${m.casa ? us : them}<div><div class="vs-time">${m.hora || '--:--'}</div><small>${m.hora ? 'Jornada ' + m.j : 'Hora por confirmar'}</small></div>${m.casa ? them : us}</div>`;
}
function agendaRow(e, withAct) {
  let what;
  if (e.kind === 'match') {
    const p = e.p;
    what = `<span class="vsl"><span class="pill gold">vs</span>${crestBadge(e.e, p.rival)}<span class="nm">${esc(nice(p.rival))}</span></span><span class="where">${p.casa ? 'Local' : 'Visitante'}${placeOf(p) ? ' · ' + esc(placeOf(p)) : ''}</span>`;
  } else if (e.kind === 'club') what = `<span class="t">${e.title}</span><span class="where">${e.where}</span>`;
  else {
    // El equipo va en la etiqueta de la derecha; en el móvil (sin etiqueta) o con el botón de pasar lista, va junto al campo
    const btn = withAct && e.today;
    what = `<span class="t">Entrenamiento</span>${e.today ? '<span class="pill">Hoy</span>' : ''}<span class="where"><span class="ev-tm${btn ? ' on' : ''}">${e.team}${e.where ? ' · ' : ''}</span>${e.where}</span>`;
  }
  const act = withAct && e.today && e.kind === 'train'
    ? `<button type="button" class="btn gold sm ev-act" data-team-go="${e.team}">Pasar lista</button>`
    : `<span class="pill ${e.kind === 'match' ? 'gold' : e.kind === 'club' ? 'grey' : 'blue'} ev-act">${e.kind === 'club' ? 'Club' : e.team}</span>`;
  return `<div class="ev"><div class="when"><b>${e.h}</b><small>${e.day}</small></div><div class="what">${what}</div>${act}</div>`;
}
/* Partidos de todos los equipos, agrupados por fin de semana (semana de lunes a domingo) */
const weekOf = iso => addDays(iso, 1 - dow(iso));
function allGames() {
  return D.equipos.flatMap(e => e.partidos.filter(p => p.fecha).map(p => ({ e, p, wk: weekOf(p.fecha) })));
}
function weekLbl(wk, first) {
  const sa = toDate(first && first < addDays(wk, 5) ? first : addDays(wk, 5)), su = toDate(addDays(wk, 6));
  if (first && first < addDays(wk, 5)) return sa.getMonth() === su.getMonth() ? `${sa.getDate()} – ${su.getDate()} ${MES[su.getMonth()]}` : `${sa.getDate()} ${MES[sa.getMonth()]} – ${su.getDate()} ${MES[su.getMonth()]}`;
  return sa.getMonth() === su.getMonth() ? `${sa.getDate()} y ${su.getDate()} ${MES[su.getMonth()]}` : `${sa.getDate()} ${MES[sa.getMonth()]} y ${su.getDate()} ${MES[su.getMonth()]}`;
}
function gameCard(e, p, mine) {
  const us = `<span class="gs">${crestImg('gcr')}<b>Aznalcóllar</b></span>`;
  const src = crestOf(e, p.rival);
  const them = `<span class="gs">${src ? `<img class="gcr" src="${src}" alt="" loading="lazy">` : `<span class="gcr rv" aria-hidden="true">${initials(nice(p.rival).replace(/^[A-Z.]+\s/, '').replace(/"/g, ''))}</span>`}<b title="${esc(nice(p.rival))}">${esc(nice(p.rival))}</b></span>`;
  const res = p.goles ? outcome(p) : null;
  const mid = res ? `<span class="res ${res}" aria-label="${res === 'G' ? 'Ganado' : res === 'P' ? 'Perdido' : 'Empatado'} ${scoreTxt(p)}">${scoreTxt(p)}</span>`
    : p.estado ? `<span class="pill red">${esc(p.estado)}</span>` : p.hora ? `<span class="gtime">${p.hora}</span>` : '<span class="gtime tbd">Hora por<br>confirmar</span>';
  return `<article class="gm" data-match="${e.id}|${p.j}" role="button" tabindex="0" aria-label="Ver el partido contra ${esc(nice(p.rival))}"><div class="gm-h"><span class="pill ${mine ? 'gold' : 'blue'}">${esc(e.nombre)}${mine ? '<span class="sr"> (tu equipo)</span>' : ''}</span><small>${dateLbl(p.fecha)}${p.hora && res ? ' · ' + p.hora : ''} · J${p.j}</small></div>
    <div class="gm-s">${p.casa ? us : them}${mid}${p.casa ? them : us}</div>
    <small class="where">${p.casa ? 'Local' : 'Visitante'}${placeOf(p) ? ' · ' + esc(placeOf(p)) : ''}</small></article>`;
}
/* ---------- Ficha de un partido (ventana centrada al tocarlo) ---------- */
const WDL = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const MESL = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const longDate = iso => { const d = toDate(iso); return `${WDL[d.getDay()]} ${d.getDate()} de ${MESL[d.getMonth()]}`; };
/* Nombre del color (como lo escribe la federación) -> muestra de color; "Negra y amarilla" da dos franjas */
const KIT = [['azul marino', '#1B2A4A'], ['azul celeste', '#7EC8F2'], ['celeste', '#7EC8F2'], ['granate', '#7A1E2C'], ['burdeos', '#6D1A2A'], ['blanc', '#FFFFFF'],
  ['negr', '#111111'], ['roj', '#D7262E'], ['azul', '#1F4FD8'], ['amarill', '#F6C800'], ['verde', '#1E9A4B'], ['morad', '#6B2FA0'], ['violeta', '#6B2FA0'],
  ['naranja', '#F28C1B'], ['gris', '#9AA0A6'], ['rosa', '#F06BA8'], ['plat', '#C0C4CA'], ['dorad', '#C9A227'], ['marr', '#7A4B2A']];
function kitColors(txt) {
  const t = (txt || '').toLowerCase(); let rest = t; const out = [];
  for (const [k, c] of KIT) if (rest.includes(k)) { out.push([t.indexOf(k), c]); rest = rest.split(k).join('#'.repeat(k.length)); }
  return out.sort((a, b) => a[0] - b[0]).map(x => x[1]).slice(0, 3);
}
const swatch = txt => { const cs = kitColors(txt); return `<span class="sw" aria-hidden="true">${(cs.length ? cs : ['#E3E6EE']).map(c => `<i style="background:${c}"></i>`).join('')}</span>`; };
function openMatch(e, p) {
  const res = p.goles ? outcome(p) : null, src = crestOf(e, p.rival), rv = nice(p.rival);
  const us = `<div class="mx-t">${crestImg('mx-cr')}<b>Aznalcóllar</b></div>`;
  const them = `<div class="mx-t">${src ? `<img class="mx-cr" src="${src}" alt="">` : `<span class="mx-cr rv" aria-hidden="true">${initials(rv.replace(/^[A-Z.]+\s/, '').replace(/"/g, ''))}</span>`}<b title="${esc(rv)}">${esc(rv)}</b></div>`;
  const mid = res ? `<div class="mx-m"><span class="res ${res}">${scoreTxt(p)}</span><small>${res === 'G' ? 'Ganado' : res === 'P' ? 'Perdido' : 'Empatado'}</small></div>`
    : `<div class="mx-m"><b class="mx-h">${p.estado ? esc(p.estado) : p.hora || '--:--'}</b><small>${p.estado ? '' : p.hora ? 'Hora' : 'Hora por confirmar'}</small></div>`;
  const k = p.equipacion;
  const kit = k ? `<div class="kit">${[['Camiseta', k.camiseta], ['Pantalón', k.pantalon], ['Medias', k.medias]].filter(x => x[1]).map(([l, v]) =>
      `<div class="kit-r">${swatch(v)}<span class="kit-l">${l}</span><b>${esc(v)}</b></div>`).join('')}</div>`
    : `<p class="muted" style="margin:0">Todavía no tenemos los colores de este equipo.</p>`;
  const m = modal(`<div class="rqd-h"><span class="pill ${S.teams[e.nombre] && S.role === 'coach' ? 'gold' : 'blue'}">${esc(e.nombre)}</span><div class="grow"><small>Jornada ${p.j}</small></div>
      <button type="button" class="iconbtn" data-v="0" aria-label="Cerrar">${ic('x')}</button></div>
    <h2 id="mdl-t" class="sr">${p.casa ? 'Aznalcóllar contra ' + esc(rv) : esc(rv) + ' contra Aznalcóllar'}</h2>
    <div class="mx-s">${p.casa ? us : them}${mid}${p.casa ? them : us}</div>
    <dl class="facts mx-f"><div class="wide"><dt>Fecha</dt><dd>${longDate(p.fecha)}${p.hora && res ? ` · ${p.hora}` : ''}</dd></div>
      <div><dt>Jugamos</dt><dd>${p.casa ? 'De local' : 'De visitante'}</dd></div><div><dt>Césped</dt><dd>${p.superficie ? esc(/artificial/i.test(p.superficie) ? 'Artificial' : /natural/i.test(p.superficie) ? 'Natural' : p.superficie) : 'Sin datos'}</dd></div>
      <div class="wide"><dt>Rival</dt><dd>${esc(rv)}</dd></div>
      <div class="wide"><dt>Campo</dt><dd>${placeOf(p) ? esc(placeOf(p)) : 'Por confirmar'}</dd></div>
      <div class="wide"><dt>Competición</dt><dd>${esc(e.cat)}</dd></div></dl>
    ${p.casa ? '' : `<section class="mx-k" aria-labelledby="mx-kt"><h3 id="mx-kt">Equipación del rival</h3>${kit}</section>`}
    ${p.campo ? `<a class="btn blue block" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeOf(p))}">${ic('pin')} Cómo llegar</a>` : ''}`, 'dialog', () => {});
  m.el.classList.add('rqd', 'mx');
  m.el.querySelector('[data-v="0"]').focus();
}
function bindMatches() {
  document.querySelectorAll('#main [data-match]').forEach(el => {
    const go = () => { const [id, j] = el.dataset.match.split('|'), e = D.equipos.find(x => x.id === id), p = e && e.partidos.find(x => String(x.j) === j); if (p) openMatch(e, p); };
    el.onclick = go;
    el.onkeydown = ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); go(); } };
  });
}
function gamesView() {
  /* Entrenadores: sus equipos o todo el club; la junta ve siempre todo */
  const coach = S.role === 'coach', mineOnly = coach && S.gscope !== 'all';
  const own = e => coach && !!S.teams[e.nombre];
  const all = allGames().filter(g => !mineOnly || own(g.e));
  const weeks = [...new Set(all.filter(g => !g.p.descansa).map(g => g.wk))].sort();
  const now = weekOf(TODAY);
  const wk = S.wk || weeks.find(w => w >= now) || weeks[weeks.length - 1] || now;
  const i = weeks.indexOf(wk), prev = weeks.filter(w => w < wk).pop(), next = weeks.find(w => w > wk);
  const venue = S.gvenue || 'all', VENUES = [['all', 'Todos'], ['home', 'Local'], ['away', 'Visitante']];
  const week = all.filter(g => g.wk === wk && !g.p.descansa);
  const list = week.filter(g => venue === 'all' || (venue === 'home') === !!g.p.casa)
    .sort((a, b) => a.p.fecha.localeCompare(b.p.fecha) || (a.p.hora || '99').localeCompare(b.p.hora || '99') || ORDEN.indexOf(a.e.id) - ORDEN.indexOf(b.e.id));
  const done = list.filter(g => g.p.goles), cnt = k => done.filter(g => outcome(g.p) === k).length;
  const nav = `<div class="wk-nav card">
      <button type="button" class="iconbtn" data-wk="${prev || ''}" ${prev ? '' : 'disabled'} aria-label="Fin de semana anterior">${ic('back')}</button>
      <div class="wk-t"><small>${wk === now ? 'Este fin de semana' : wk < now ? 'Ya jugado' : 'Próximamente'}</small><b>${weekLbl(wk, week.length ? week.map(g => g.p.fecha).sort()[0] : null)}</b></div>
      <button type="button" class="iconbtn" data-wk="${next || ''}" ${next ? '' : 'disabled'} aria-label="Fin de semana siguiente">${ic('chev')}</button>
      <div class="wk-v" role="group" aria-label="Local o visitante">${VENUES.map(([k, l]) =>
        `<button type="button" data-gv="${k}" aria-pressed="${venue === k}">${l}</button>`).join('')}</div>
      ${wk !== now && weeks.includes(now) ? `<button type="button" class="more wk-now" data-wk="${now}">Volver a este fin de semana</button>` : ''}</div>`;
  const stats = `<div class="kpis wk-k ${done.length ? '' : 'k3'}">
      <div class="kpi dark blue"><small>Partidos</small><b>${list.length}</b></div>
      ${done.length ? `<div class="kpi"><small>Ganados</small><b class="ok">${cnt('G')}</b></div><div class="kpi"><small>Empatados</small><b>${cnt('E')}</b></div><div class="kpi"><small>Perdidos</small><b class="bad">${cnt('P')}</b></div>`
        : `<div class="kpi"><small>De local</small><b>${week.filter(g => g.p.casa).length}</b></div><div class="kpi"><small>De visitante</small><b>${week.filter(g => !g.p.casa).length}</b></div>`}</div>`;
  const body = list.length ? `<div class="games">${list.map(g => gameCard(g.e, g.p, own(g.e))).join('')}</div>`
    : emptyPage('cal', `No hay partidos${venue === 'home' ? ' de local' : venue === 'away' ? ' de visitante' : ''}`, 'Usa las flechas para ver otro fin de semana.', 'g');
  const n = Object.keys(S.teams).length;
  const scope = coach ? `<div class="seg g-scope" role="group" aria-label="Qué partidos ver">
      <button type="button" data-gs="mine" aria-pressed="${mineOnly}">${n === 1 ? 'Mi equipo' : 'Mis equipos'}</button>
      <button type="button" data-gs="all" aria-pressed="${!mineOnly}">Todo el club</button></div>` : '';
  const venueSeg = `<div class="seg g-scope g-venue" role="group" aria-label="Local o visitante">${VENUES.map(([k, l]) =>
      `<button type="button" data-gv="${k}" aria-pressed="${venue === k}">${l}</button>`).join('')}</div>`;
  return `<div class="stack"><div class="g-filters ${coach ? '' : 'only-v'}">${scope}${venueSeg}</div>${nav}${stats}${body}</div>`;
}
/* Un partido de la temporada: fecha, rival con escudo, resultado o hora */
function matchRow(e, p) {
  if (p.descansa) return `<div class="mt rest"><div class="cal-d"><span>J${p.j}</span><b>${p.fecha ? toDate(p.fecha).getDate() : '–'}</b></div><div class="grow"><b>Descansa</b><small>${p.fecha ? dateLbl(p.fecha) : ''}</small></div></div>`;
  const res = p.goles ? outcome(p) : null;
  const right = res ? `<span class="res ${res}" aria-label="${res === 'G' ? 'Ganado' : res === 'P' ? 'Perdido' : 'Empatado'} ${scoreTxt(p)}">${scoreTxt(p)}</span>`
    : p.estado ? `<span class="pill red">${p.estado}</span>` : `<span class="pill ${p.hora ? 'blue' : 'grey'}" ${p.hora ? '' : 'title="Hora por confirmar"'}>${p.hora || 'Sin hora'}</span>`;
  return `<div class="mt ${p.fecha === (nextMatch(e) || {}).fecha ? 'next' : ''}" data-match="${e.id}|${p.j}" role="button" tabindex="0" aria-label="Ver el partido contra ${esc(nice(p.rival))}"><div class="cal-d"><span>J${p.j}</span><b>${toDate(p.fecha).getDate()}</b></div>${crestBadge(e, p.rival)}
    <div class="grow"><b title="${esc(nice(p.rival))}">${esc(nice(p.rival))}</b><small>${dateLbl(p.fecha)} · ${p.casa ? 'Local' : 'Visitante'}${placeOf(p) ? ' · ' + esc(placeOf(p)) : ''}</small></div>${right}</div>`;
}
function tableHTML(e) {
  const gd = r => r.gf != null ? r.gf - r.gc : r.dif;
  return `<div class="tbl" role="table" aria-label="Clasificación"><div class="tr th" role="row"><span role="columnheader">#</span><span role="columnheader">Equipo</span><span role="columnheader" title="Jugados">PJ</span><span role="columnheader" title="Diferencia de goles">DG</span><span role="columnheader">Pts</span></div>
    ${e.tabla.map(r => `<div class="tr ${US.test(r.equipo) ? 'us' : ''}" role="row"><span role="cell">${r.pos}</span><span role="cell" class="tn">${crestBadge(e, r.equipo)}<b title="${esc(nice(r.equipo))}">${esc(US.test(r.equipo) ? 'C.D. Aznalcóllar Fútbol Base' : nice(r.equipo))}</b></span><span role="cell">${r.j}</span><span role="cell">${gd(r) > 0 ? '+' : ''}${gd(r)}</span><span role="cell"><b>${r.pts}</b></span></div>`).join('')}</div>`;
}
function agendaCard(filter) {
  const f = filter || 'all';
  const list = AGENDA.filter(e => (e.kind !== 'match' || S.teams[e.team]) && (f === 'all' || e.kind === f));
  return card('h-ag', 'Próximos 7 días', `
    <div class="tabs" role="group" aria-label="Filtrar agenda">${[['all', 'Todo'], ['train', 'Entrenos'], ['match', 'Partidos']].map(([k, l]) =>
      `<button type="button" data-ag="${k}" aria-pressed="${f === k}">${l}</button>`).join('')}</div>
    <div id="ag-list">${list.map(e => agendaRow(e, true)).join('')}</div>`, 'a-agenda');
}
function bindAgenda() {
  document.querySelectorAll('[data-ag]').forEach(b => b.onclick = () => { S.ag = b.dataset.ag; const el = b.closest('section'); el.outerHTML = agendaCard(S.ag); bindAgenda(); bindGo(); });
  document.querySelectorAll('[data-team-go]').forEach(b => b.onclick = () => { S.team = b.dataset.teamGo; go('team', 'list'); });
}
/* Últimos 8 días con lista pasada. En la demo, cifras de ejemplo. */
function attendanceHist(team) {
  const n = S.teams[team].players.length;
  if (!S.live) return { days: [5, 7, 12, 14, 19, 21, 23, 26], pct: team === 'Alevín 2º año' ? [75, 83, 92, 67, 92, 100, 83, 92] : [80, 90, 100, 70, 90, 100, 90, 100] };
  const days = Object.keys(S.attend).filter(k => k.startsWith(team + ' ') && S.attend[k].size).map(k => k.slice(team.length + 1)).sort().slice(-8);
  return { days: days.map(d => toDate(d).getDate()), pct: days.map(d => n ? Math.round(S.attend[`${team} ${d}`].size / n * 100) : 0) };
}
function attendanceCard(team, id) {
  const { days, pct } = attendanceHist(team);
  const avg = pct.length ? Math.round(pct.reduce((a, b) => a + b) / pct.length) : null;
  const n = S.teams[team].players.length;
  // Abajo: el último entreno con lista pasada (hoy si ya la has pasado)
  const done = Object.keys(S.attend).filter(k => k.startsWith(team + ' ') && S.attend[k].size).map(k => k.slice(team.length + 1)).sort();
  const lastIso = done.length ? done[done.length - 1] : today();
  const a = S.attend[`${team} ${lastIso}`];
  const lvl = p => p >= 90 ? 'hi' : p < 70 ? 'lo' : 'mid';
  return card(id, `Asistencia · ${team}`, `
    <div class="bignum">${avg == null ? '–' : avg + '%'}</div><div class="delta">${avg == null ? 'Aún no has pasado lista' : S.live ? `Media de los últimos ${pct.length} entrenos` : '+4% respecto a septiembre'}</div>
    <div class="bars" role="img" aria-label="Asistencia por entrenamiento: ${pct.join(', ')} por ciento">${pct.map(p => `<span class="${lvl(p)}" style="height:${Math.max(p, 4) * .82}%"><b>${p}%</b></span>`).join('')}</div>
    <div class="bars-x" aria-hidden="true">${days.map(d => `<span>${d}</span>`).join('')}</div>
    <div class="bars-key"><span><i class="hi"></i>90% o más</span><span><i class="mid"></i>70–89%</span><span><i class="lo"></i>Menos de 70%</span></div>
    <div class="last">${ic('check')}${lastIso === today() ? 'Hoy' : 'Último entreno · ' + dayLbl(lastIso)}<b>${a ? a.size : 0} de ${n}</b></div>`, 'a-attend', `<span class="tag">${S.live ? 'Últimos entrenos' : 'Octubre'}</span>`);
}
function noticeCard(n, cls = '') {
  if (!n) return '';
  return `<section class="card notice ${cls}" aria-labelledby="nt${n.id}"><div class="media">${crestImg()}<span class="lbl">${ic('bell')}Aviso del club</span></div>
    <span class="eyebrow">${esc(n.from)}</span><h3 id="nt${n.id}">${esc(n.title)}</h3><p class="eyebrow nb">${esc(n.body)}</p></section>`;
}

/* Días, hora y campo de entreno de un equipo (lo edita la junta) */
const CAMPOS = ['Campo entero', 'Campo 1', 'Campo 2'];
function trainCard(team) {
  const t = trainOf(team), ses = sesiones(t);
  /* Ya guardado: se muestra como ficha, un renglón por día, con botón para editar */
  if (t && S.editTrain !== team) return card('h-tr', 'Entrenamientos', `<div class="trs">${ses.map(x => `<div class="trs-r"><b>${DIAS_D[x.d - 1]}</b><span>${esc(x.h || 'Sin hora')}</span><span>${esc(x.where || 'Sin campo')}</span></div>`).join('')}</div>`,
    '', '<button type="button" class="more" id="tedit">Editar</button>');
  const last = ses[ses.length - 1] || {};
  return `<form id="tf" class="card stack" novalidate aria-labelledby="h-tr"><h2 id="h-tr" style="margin:0;font-size:1.1rem">Entrenamientos</h2>
        <fieldset class="f"><legend>Días</legend><div class="chips">${DIAS.map((d, i) => `<label class="chip"><input type="checkbox" value="${i + 1}" ${ses.some(z => z.d === i + 1) ? 'checked' : ''}> <span aria-hidden="true">${d}</span><span class="sr">${DIAS_D[i]}</span></label>`).join('')}</div></fieldset>
    <div class="trf">${DIAS_D.map((dn, i) => { const x = ses.find(z => z.d === i + 1), on = !!x, v = x || last;
      return `<div class="trf-r" data-d="${i + 1}" ${on ? '' : 'hidden'}><b>${dn}</b>
        <label class="f"><span class="sr">Hora del ${dn.toLowerCase()}</span><input type="time" value="${esc(v.h || '')}"></label>
        <label class="f"><span class="sr">Campo del ${dn.toLowerCase()}</span><select>${[...new Set([...CAMPOS, ...(v.where ? [v.where] : [])])].map(c => `<option ${(v.where || 'Campo entero') === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></label></div>`; }).join('')}</div>
    <p id="terr" class="err" role="alert" hidden></p>
    <div class="btn-row">${t ? '<button type="button" class="btn ghost" id="tcancel">Cancelar</button>' : ''}<button type="submit" class="btn blue block">${ic('check')} Guardar</button></div></form>`;
}
function bindTrain(team) {
  if ($('#tedit')) { $('#tedit').onclick = () => { S.editTrain = team; render(); $('#tf input') && $('#tf input').focus(); }; return; }
  if ($('#tcancel')) $('#tcancel').onclick = () => { S.editTrain = null; render(); };
  const rows = [...document.querySelectorAll('#tf .trf-r')];
  /* Al marcar un día nuevo, copia la hora y el campo del último día marcado para no repetirlos */
  document.querySelectorAll('#tf .chips input').forEach(cb => cb.onchange = () => {
    const r = rows.find(o => o.dataset.d === cb.value);
    if (cb.checked) { const prev = rows.filter(o => o !== r && !o.hidden).pop();
      if (prev) { r.querySelector('input[type=time]').value = prev.querySelector('input[type=time]').value; r.querySelector('select').value = prev.querySelector('select').value; } }
    r.hidden = !cb.checked;
  });
  $('#tf').onsubmit = async e => {
    e.preventDefault();
    const ses = rows.filter(r => !r.hidden).map(r => ({ d: +r.dataset.d, h: r.querySelector('input[type=time]').value, where: r.querySelector('select').value }));
    if (ses.some(x => !x.h)) { $('#terr').textContent = 'Pon la hora de cada día marcado.'; $('#terr').hidden = false; return; }
    const tr = { dias: ses.map(x => x.d), h: (ses[0] || {}).h || '', where: (ses[0] || {}).where || '', ses };
    try { API() && await API().entreno(team, tr); } catch (_) { $('#terr').textContent = 'No se ha podido guardar. Revisa la conexión.'; $('#terr').hidden = false; return; }
    S.teams[team].train = tr; S.editTrain = null; AGENDA = buildAgenda(); render();
    say(tr.dias.length ? `${team} entrena los ${tr.dias.map(d => DIAS_L[d - 1]).join(', ').replace(/, ([^,]*)$/, ' y $1')}` : `${team} sin días de entreno`);
  };
}

/* Plantilla: lista y alta/baja de jugadores (entrenador de ese equipo o junta) */
function rosterCard(team) {
  const t = S.teams[team];
  const list = [...t.players].sort((a, b) => (a.dorsal || 99) - (b.dorsal || 99) || a.n.localeCompare(b.n));
  return card('h-pl', `Plantilla · ${t.players.length} jugador${t.players.length === 1 ? '' : 'es'}`, list.length ? `<div class="roster">${list.map(p => `<button type="button" class="tm tm-btn pcard" data-edit="${p.id}" aria-label="Editar a ${esc(p.n)}"><span class="k">${p.dorsal || '–'}</span>
      <span class="grow"><b title="${esc(p.n)}">${esc(p.n)}</b><small>${p.dorsal ? 'Dorsal ' + p.dorsal : 'Sin dorsal'}</small></span>
      <span class="go" aria-hidden="true">${ic('chev')}</span></button>`).join('')}</div>` : '<p class="muted" style="margin:0">Todavía no hay jugadores.</p>');
}
function addPlayerCard(team) {
  return `<form id="pf" class="card stack add-pl" novalidate aria-labelledby="h-add"><h2 id="h-add" style="margin:0;font-size:1.1rem">Añadir jugador</h2>
      <div class="add-row"><label class="f" for="pn">Nombre y apellidos<input type="text" id="pn" autocomplete="off" required></label>
      <label class="f" for="pd">Dorsal (opcional)<input type="number" id="pd" inputmode="numeric" min="1" max="99"></label></div>
      <p id="perr" class="err" role="alert" hidden>Escribe el nombre del jugador.</p>
      <button type="submit" class="btn blue block">${ic('plus')} Añadir a ${esc(team)}</button></form>`;
}
function bindRoster(team) {
  const t = S.teams[team], f = $('#pf');
  if (!f) return;
  f.onsubmit = async e => {
    e.preventDefault();
    const p = { n: $('#pn').value.trim(), dorsal: +$('#pd').value || null };
    if (!p.n) { $('#perr').hidden = false; $('#pn').focus(); return; }
    try { p.id = API() ? await API().jugador(team, p) : Date.now(); } catch (_) { say('No se ha podido guardar. Revisa la conexión.'); return; }
    t.players.push(p); render(); say(`${p.n} añadido a ${team}`); $('#pn') && $('#pn').focus();
  };
  document.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => editPlayer(team, t.players.find(x => x.id == b.dataset.edit)));
}
/* Ventana para cambiar nombre y dorsal, o quitar al jugador (con confirmación) */
function editPlayer(team, p) {
  const t = S.teams[team];
  const m = modal(`<h2 id="mdl-t">Editar jugador</h2>
    <form id="ef" class="stack" novalidate>
      <label class="f" for="en">Nombre y apellidos<input type="text" id="en" autocomplete="off" value="${esc(p.n)}"></label>
      <label class="f" for="ed">Dorsal (opcional)<input type="number" id="ed" inputmode="numeric" min="1" max="99" value="${p.dorsal || ''}"></label>
      <p id="eerr" class="err" role="alert" hidden>Escribe el nombre del jugador.</p>
      <div class="btn-row"><button type="button" class="btn ghost" data-v="0">Cancelar</button><button type="submit" class="btn blue">${ic('check')} Guardar</button></div>
    </form>
    <button type="button" class="linkbtn" id="edel">Quitar de la plantilla</button>`, 'dialog', () => {});
  $('#en').focus();
  $('#ef').onsubmit = async e => {
    e.preventDefault();
    const n = $('#en').value.trim(), dorsal = +$('#ed').value || null;
    if (!n) { $('#eerr').hidden = false; $('#en').focus(); return; }
    try { API() && await API().editarJugador(p.id, n, dorsal); } catch (_) { $('#eerr').textContent = 'No se ha podido guardar. Revisa la conexión.'; $('#eerr').hidden = false; return; }
    p.n = n; p.dorsal = dorsal; m.close(); render(); say(`${n} guardado`);
  };
  $('#edel').onclick = async () => {
    m.close();
    if (!(await ask(`¿Quitar a ${p.n}?`, `Se eliminará de la plantilla de ${team} y ya no saldrá al pasar lista.`, 'Sí, quitar'))) return;
    try { API() && await API().quitarJugador(p.id, false); } catch (_) { say('No se ha podido quitar. Revisa la conexión.'); return; }
    t.players = t.players.filter(x => x !== p); render();
    say(`${p.n} ya no está en la plantilla`, () => { t.players.push(p); API() && API().quitarJugador(p.id, true); });
  };
}

/* ---------- CONVOCATORIA ---------- */
/* El entrenador elige quién va al próximo partido, la hora y el sitio de la citación, y puede mandarla por WhatsApp */
const convKey = (team, p) => `${team} ${p.fecha}`;
/* Convocados en orden: si todos tienen dorsal, por dorsal (de menor a mayor) y se muestra el dorsal;
   si no, por orden alfabético y numerados del 1 al total */
function convList(players, c) {
  const list = players.filter(x => c.ids.includes(x.id)), dorsales = list.length > 0 && list.every(x => x.dorsal);
  if (dorsales) return { dorsales, rows: list.sort((a, b) => a.dorsal - b.dorsal).map(x => ({ num: x.dorsal, n: x.n })) };
  return { dorsales, rows: list.sort((a, b) => a.n.localeCompare(b.n, 'es')).map((x, i) => ({ num: i + 1, n: x.n })) };
}
/* Cartel de la convocatoria: se dibuja en el propio móvil (sin servicios externos) con los escudos y los datos reales */
const loadImg = src => new Promise(ok => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = src; });
async function convPoster(team, p, c, players) {
  await Promise.all(['800 60px Outfit', '700 40px Outfit', '500 30px Outfit'].map(f => document.fonts.load(f).catch(() => {})));
  const e = EQ[team], { dorsales, rows: list } = convList(players, c), W = 1080, ROW = 68;
  const tableY = 744, rowsY = tableY + 150, notaH = c.nota ? 70 : 0, TOP = 122, H = rowsY + list.length * ROW + 30 + notaH + 48 - TOP;
  const cv = document.createElement('canvas'), x = cv.getContext('2d');
  cv.width = W; cv.height = H;
  const BLUE = '#0034DF', GOLD = '#FDCB2B', INK = '#0B0B0B', MUTED = '#5B6475', BG = '#F3F5FA';
  const font = (w, px) => `${w} ${px}px Outfit, system-ui, sans-serif`;
  // Texto en una línea: reduce la letra hasta que quepa en el ancho
  const text = (t, tx, y, w, px, color, maxW = W - 192, align = 'center') => {
    x.font = font(w, px); while (px > 14 && x.measureText(t).width > maxW) x.font = font(w, --px);
    x.fillStyle = color; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(t, tx, y); return x.measureText(t).width;
  };
  const rr = (rx, ry, rw, rh, rad, color) => { x.beginPath(); x.moveTo(rx + rad, ry); x.arcTo(rx + rw, ry, rx + rw, ry + rh, rad); x.arcTo(rx + rw, ry + rh, rx, ry + rh, rad);
    x.arcTo(rx, ry + rh, rx, ry, rad); x.arcTo(rx, ry, rx + rw, ry, rad); x.closePath(); x.fillStyle = color; x.fill(); };
  const fitImg = (img, cx, cy, box) => { const k = Math.min(box / img.width, box / img.height); x.drawImage(img, cx - img.width * k / 2, cy - img.height * k / 2, img.width * k, img.height * k); };
  const src = crestOf(e, p.rival), [ours, theirs] = await Promise.all([loadImg('icons/escudo.png'), src ? loadImg(src) : null]);
  x.fillStyle = BG; x.fillRect(0, 0, W, H);
  x.translate(0, -TOP); // sin cabecera: la tarjeta del partido empieza arriba
  // Tarjeta del partido (como en "Partidos")
  rr(48, 170, W - 96, 430, 40, '#FFFFFF');
  x.font = font(700, 30); const pw = Math.min(x.measureText(team).width + 44, 560);
  rr(96, 214, pw, 56, 28, GOLD); text(team, 96 + pw / 2, 243, 700, 30, INK, pw - 44);
  text(`${dateLbl(p.fecha)} - J${p.j}`, W - 96, 243, 500, 30, MUTED, 380, 'right');
  const side = (img, name, mine, cx) => {
    if (img) fitImg(img, cx, 375, 150);
    else { x.beginPath(); x.arc(cx, 375, 70, 0, Math.PI * 2); x.fillStyle = '#C8102E'; x.fill(); text(initials(name.replace(/^[A-Z.]+\s/, '').replace(/"/g, '')), cx, 377, 800, 48, '#FFFFFF'); }
    text(mine ? 'Aznalcóllar' : name, cx, 495, 700, 34, INK, 360);
  };
  const us = [ours, 'Aznalcóllar', true], them = [theirs, nice(p.rival), false];
  side(...(p.casa ? us : them), 270); side(...(p.casa ? them : us), 810);
  if (p.hora) text(p.hora, W / 2, 385, 800, 76, INK, 240);
  else { text('Hora por', W / 2, 365, 600, 32, MUTED, 220); text('confirmar', W / 2, 403, 600, 32, MUTED, 220); }
  text(placeOf(p) ? placeOf(p).replace(/ · /g, ' - ') : 'Campo por confirmar', W / 2, 558, 500, 30, MUTED);
  // Citación
  rr(48, 624, W - 96, 96, 32, BLUE);
  text(`Citación: ${[c.hora, c.lugar].filter(Boolean).join(' - ')}`, W / 2, 673, 700, 36, '#FFFFFF');
  // Tabla de convocados
  rr(48, tableY, W - 96, H + TOP - tableY - 48, 40, '#FFFFFF');
  text('Convocados', 96, tableY + 60, 800, 40, INK, 500, 'left');
  text(list.length === 1 ? '1 jugador' : `${list.length} jugadores`, W - 96, tableY + 60, 500, 30, MUTED, 300, 'right');
  text(dorsales ? 'Dorsal' : 'Número', 140, tableY + 122, 600, 26, MUTED, 120);
  text('Jugador', 240, tableY + 122, 600, 26, MUTED, 300, 'left');
  list.forEach((q, i) => {
    const y = rowsY + i * ROW;
    if (i % 2 === 0) rr(72, y, W - 144, ROW, 18, BG);
    text(String(q.num), 140, y + ROW / 2, 800, 34, BLUE, 120);
    text(q.n, 240, y + ROW / 2, 500, 34, INK, W - 240 - 96, 'left');
  });
  if (c.nota) text(`Nota: ${c.nota}`, 96, rowsY + list.length * ROW + 30 + 30, 500, 30, MUTED, W - 192, 'left');
  return new Promise(ok => cv.toBlob(b => ok(b), 'image/png'));
}
async function sharePoster(team, p, c, players) {
  const m = modal(`<h2 id="mdl-t">Cartel de la convocatoria</h2><p id="pst-w">Preparando el cartel…</p><div id="pst"></div>`, 'dialog', () => { if (url) URL.revokeObjectURL(url); });
  let url = null;
  const blob = await convPoster(team, p, c, players);
  if (!document.body.contains(m.el)) return;
  const name = `convocatoria-${team}-${p.fecha}.png`.toLowerCase().replace(/[^a-z0-9.-]+/g, '-');
  const file = new File([blob], name, { type: 'image/png' });
  const canShare = !!(navigator.canShare && navigator.canShare({ files: [file] }));
  url = URL.createObjectURL(blob);
  $('#pst-w').textContent = canShare ? 'Pulsa "Compartir" y elige WhatsApp y el grupo del equipo.' : 'Descarga el cartel y mándalo por WhatsApp.';
  $('#pst').outerHTML = `<img class="pst-img" src="${url}" alt="Cartel: convocatoria del ${esc(team)} contra ${esc(nice(p.rival))}, ${c.ids.length} convocados">
    ${canShare ? `<button type="button" class="btn blue block" id="pst-sh">${ic('send')} Compartir</button>`
      : `<button type="button" class="btn blue block" id="pst-dl">${ic('check')} Descargar cartel</button>`}
    <button type="button" class="btn ghost block" data-v="0">Cerrar</button>`;
  const sh = $('#pst-sh'), dl = $('#pst-dl');
  if (sh) { sh.focus(); sh.onclick = () => navigator.share({ files: [file] }).catch(() => {}); }
  if (dl) { dl.focus(); dl.onclick = () => { const a = document.createElement('a'); a.href = url; a.download = name; document.body.append(a); a.click(); a.remove(); }; }
}
function convScreen() {
  const team = S.team, t = S.teams[team], e = EQ[team], p = e && nextMatch(e);
  const back = () => go('home');
  if (!p) return { kicker: 'Convocatoria', title: esc(team), back, body: emptyPage('cal', 'No hay próximo partido', 'Cuando haya un partido en el calendario podrás hacer la convocatoria.') };
  const k = convKey(team, p), saved = S.conv[k];
  const c = S.convDraft && S.convDraft.k === k ? S.convDraft : (S.convDraft = { k, ids: saved ? [...saved.ids] : [], hora: saved ? saved.hora : '', lugar: saved ? saved.lugar : '', nota: saved ? saved.nota : '' });
  const allBtn = on => on ? `${ic('x')} Quitar a todos` : `${ic('check')} Convocar a todos`;
  const row = (x, i) => `<li><button type="button" class="player" data-cv="${x.id}" aria-pressed="${c.ids.includes(x.id)}">
    <span class="tick" aria-hidden="true">${ic('check')}</span><span class="num" aria-hidden="true">${x.dorsal || i + 1}</span><span class="pinfo"><span class="pname" title="${esc(x.n)}">${esc(x.n)}</span>
    <span class="pstate">${c.ids.includes(x.id) ? 'Convocado' : 'No va'}</span></span></button></li>`;
  return {
    kicker: `Convocatoria · ${esc(team)}`, title: `vs ${esc(nice(p.rival))}`, back,
    body: `<div class="split"><div class="stack">
      <section class="card match" aria-label="Partido"><div class="att-top">
        <div><span class="tag">${dateLbl(p.fecha)}${p.hora ? ' · ' + p.hora : ' · Hora por confirmar'} · ${p.casa ? 'Local' : 'Visitante'}</span><div class="vs-time" style="margin-top:10px" id="cvn">${c.ids.length}<small style="font-size:1.2rem;opacity:.7"> / ${t.players.length}</small></div><small>convocados</small></div>
        <button type="button" class="btn gold" id="cvall"${t.players.length ? '' : ' disabled'}>${allBtn(t.players.length && t.players.every(x => c.ids.includes(x.id)))}</button></div>
        ${placeOf(p) ? `<small class="cv-place">${ic('pin')} ${esc(placeOf(p))}</small>` : ''}</section>
      <p class="muted" style="margin:0">Toca a cada jugador para convocarlo o quitarlo.</p>
      ${t.players.length ? '' : `<p class="card muted" style="margin:0">Todavía no hay jugadores en este equipo. Añádelos en “Plantilla”.</p>`}
      <ul class="players">${t.players.map(row).join('')}</ul></div>
      <form id="cvf" class="card stack" novalidate aria-labelledby="h-cv"><h2 id="h-cv" style="margin:0;font-size:1.1rem">Citación</h2>
        <div class="row2"><label class="f" for="cvh">Hora<input type="time" id="cvh" required aria-required="true" value="${esc(c.hora || '')}"></label>
        <label class="f" for="cvl">Sitio<input type="text" id="cvl" required aria-required="true" maxlength="60" placeholder="P. ej. puerta del campo" value="${esc(c.lugar || '')}"></label></div>
        <label class="f" for="cvo">Nota (opcional)<textarea id="cvo" maxlength="300" placeholder="P. ej. traed la 2ª equipación">${esc(c.nota || '')}</textarea></label>
        <p id="cverr" class="err" role="alert" hidden></p>
        <button type="submit" class="btn blue block">${ic('check')} Guardar convocatoria</button>
        <button type="button" class="btn ghost block" id="cvwa">${ic('send')} Enviar por WhatsApp</button>
      </form></div>`,
    bind() {
      const sync = () => { c.hora = $('#cvh').value; c.lugar = $('#cvl').value.trim(); c.nota = $('#cvo').value.trim();
        $('#cvn').innerHTML = `${c.ids.length}<small style="font-size:1.2rem;opacity:.7"> / ${t.players.length}</small>`;
        $('#cvall').innerHTML = allBtn(allOn()); };
      const allOn = () => t.players.length > 0 && t.players.every(x => c.ids.includes(x.id));
      const paint = b => { const on = c.ids.includes(+b.dataset.cv); b.setAttribute('aria-pressed', on); b.querySelector('.pstate').textContent = on ? 'Convocado' : 'No va'; };
      document.querySelectorAll('[data-cv]').forEach(b => b.onclick = () => { const id = +b.dataset.cv; c.ids = c.ids.includes(id) ? c.ids.filter(x => x !== id) : [...c.ids, id]; paint(b); sync(); });
      $('#cvall').onclick = () => { c.ids = allOn() ? [] : t.players.map(x => x.id); document.querySelectorAll('[data-cv]').forEach(paint); sync(); };
      ['#cvh', '#cvl', '#cvo'].forEach(s => $(s).oninput = sync);
      const check = () => {
        sync(); $('#cvh').removeAttribute('aria-invalid'); $('#cvl').removeAttribute('aria-invalid');
        const bad = !c.ids.length ? ['Elige al menos a un jugador convocado.', null] : !c.hora ? ['Pon la hora de la citación.', '#cvh'] : !c.lugar ? ['Pon el sitio de la citación.', '#cvl'] : null;
        $('#cverr').hidden = !bad; if (!bad) return true;
        $('#cverr').textContent = bad[0]; if (bad[1]) { $(bad[1]).setAttribute('aria-invalid', 'true'); $(bad[1]).focus(); }
        return false;
      };
      $('#cvwa').onclick = () => { if (check()) sharePoster(team, p, c, t.players); };
      $('#cvf').onsubmit = async ev => {
        ev.preventDefault();
        if (!check()) return;
        const val = { ids: [...c.ids], hora: c.hora, lugar: c.lugar, nota: c.nota };
        try { API() && await API().convocatoria(team, p.fecha, val); } catch (_) { $('#cverr').textContent = 'No se ha podido guardar. Revisa la conexión.'; $('#cverr').hidden = false; return; }
        S.conv[k] = val; S.convDraft = null; go('home'); say(`Convocatoria guardada: ${val.ids.length} jugadores. Para mandarla por WhatsApp, vuelve a abrir la convocatoria.`);
      };
    }
  };
}

/* Próximo partido de cada equipo del entrenador: con varios equipos es un carrusel (arrastrar o puntos) */
function matchSlide(team) {
  const nm = EQ[team] && nextMatch(EQ[team]), cv = nm && S.conv[convKey(team, nm)];
  return `${scoreHTML(team)}
    <div class="match-btns">${nm ? `<button type="button" class="btn ${cv ? 'glass' : 'gold'}" data-conv-team="${esc(team)}">${ic('list')} ${cv ? `Convocatoria · ${cv.ids.length}` : 'Hacer convocatoria'}</button>` : ''}${nm && nm.campo ? `<a class="btn white" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeOf(nm))}">${ic('pin')}Cómo llegar</a>` : `<button type="button" class="btn glass" disabled>${ic('pin')}Campo por confirmar</button>`}</div>`;
}
function matchTag(team) { const nm = EQ[team] && nextMatch(EQ[team]); return nm ? dateLbl(nm.fecha) : ''; }
function matchCarousel() {
  const teams = Object.keys(S.teams), many = teams.length > 1, at = Math.max(0, teams.indexOf(S.team)), tag = matchTag(teams[at] || S.team);
  const head = `<div class="card-h"><h2 id="h-m">Próximo partido</h2><span class="tag gold" id="mtag"${tag ? '' : ' hidden'}>${tag}</span></div>`;
  if (!many) return `<div class="a-match mwrap"><section class="card match" aria-labelledby="h-m">${head}<div class="mslide">${matchSlide(S.team)}</div></section></div>`;
  return `<div class="a-match mwrap"><section class="card match" aria-labelledby="h-m" aria-roledescription="carrusel">${head}
    <div class="mcar" id="mcar" data-at="${at}">${teams.map((t, i) => `<div class="mslide" role="group" aria-roledescription="partido" aria-label="${esc(t)}, ${i + 1} de ${teams.length}"${i === at ? '' : ' inert'}>${matchSlide(t)}</div>`).join('')}</div></section>
    <div class="mdots" role="group" aria-label="Elegir equipo">${teams.map((t, i) => `<button type="button" data-dot="${i}" aria-label="Próximo partido del ${esc(t)}"${i === at ? ' aria-current="true"' : ''}></button>`).join('')}</div></div>`;
}
function bindCarousel() {
  document.querySelectorAll('[data-conv-team]').forEach(b => b.onclick = () => { S.team = b.dataset.convTeam; go('team', 'conv'); });
  const car = $('#mcar'); if (!car) return;
  const teams = Object.keys(S.teams), slides = [...car.children], dots = [...document.querySelectorAll('[data-dot]')];
  let cur = +car.dataset.at;
  const show = i => { cur = i; slides.forEach((s, k) => s.inert = k !== i); dots.forEach((d, k) => d.toggleAttribute('aria-current', k === i));
    const tg = matchTag(teams[i]); $('#mtag').textContent = tg; $('#mtag').hidden = !tg; };
  const to = (i, smooth = true) => car.scrollTo({ left: i * car.clientWidth, behavior: smooth && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto' });
  requestAnimationFrame(() => to(cur, false));
  car.addEventListener('scroll', () => { const i = Math.round(car.scrollLeft / car.clientWidth); if (i !== cur && slides[i]) show(i); }, { passive: true });
  dots.forEach(d => d.onclick = () => { show(+d.dataset.dot); to(+d.dataset.dot); });
  // Arrastrar con el ratón (en pantallas táctiles ya se desliza con el dedo)
  let x0 = null, l0 = 0, moved = false;
  car.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.button) return; x0 = e.clientX; l0 = car.scrollLeft; moved = false; });
  addEventListener('pointermove', e => { if (x0 === null) return; const dx = e.clientX - x0; if (Math.abs(dx) > 5 && !moved) { moved = true; car.classList.add('drag'); } if (moved) car.scrollLeft = l0 - dx; });
  addEventListener('pointerup', e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (!moved) return;
    car.classList.remove('drag'); const i = Math.min(slides.length - 1, Math.max(0, Math.abs(dx) > car.clientWidth / 5 ? cur + (dx < 0 ? 1 : -1) : cur)); show(i); to(i); });
  car.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  car.addEventListener('dragstart', e => e.preventDefault());
}

/* ---------- ENTRENADOR ---------- */
const COACH = {
  home() {
    const t = S.teams[S.team];
    const mine = S.requests.filter(r => r.by === S.coach && r.st < 3);
    const notice = S.notices.find(n => !n.read) || S.notices[0];
    const mine2 = new Set(AGENDA.filter(x => x.kind === 'match' && S.teams[x.team]).map(x => x.iso));
    const pend = pendingAll(), tt = trainAt(S.team, TODAY);
    return {
      kicker: `${greet()},`, title: esc(myName()), layout: '',
      body: `
      <div class="days" aria-label="Esta semana">${MONWEEK.map(iso => { const [w, n] = dayLbl(iso).split(' '); const tr = Object.keys(S.teams).some(tm => trainsOn(tm, iso)), mt = mine2.has(iso);
        return `<span class="${iso === TODAY ? 'today' : ''}" aria-label="${dateLbl(iso)}${tr ? ', entreno' : ''}${mt ? ', partido' : ''}">${w}<b>${n}</b><i class="dots" aria-hidden="true">${tr ? '<i class="dt"></i>' : ''}${mt ? '<i class="dm"></i>' : ''}</i></span>`; }).join('')}</div>
      <p class="days-key" aria-hidden="true"><span><i class="dt"></i>Entreno</span><span><i class="dm"></i>Partido</span></p>
      ${pushCard()}
      ${pend.length ? `<section class="card pend" aria-labelledby="h-pend"><div class="card-h"><h2 id="h-pend">${pend.length === 1 ? 'Tienes 1 lista sin pasar' : `Tienes ${pend.length} listas sin pasar`}</h2></div>
        <div class="chips">${pend.map(x => `<button type="button" class="chip" data-att="${x.iso}" data-att-team="${esc(x.team)}">${ic('list')} ${x.iso === TODAY ? 'Hoy' : dayLbl(x.iso)}${Object.keys(S.teams).length > 1 ? ' · ' + esc(x.team) : ''}</button>`).join('')}</div></section>` : ''}
      <div class="grid coach-home">
        ${matchCarousel()}
        <section class="hero a-hero" aria-labelledby="h-hero">
          <span class="kick">${tt ? `Hoy · ${esc(trainLbl(tt))}` : esc(EQ[S.team] ? EQ[S.team].cat : t.cat || '')}</span>
          <h2 id="h-hero">Semana de partido para el ${S.team}</h2>
          <p>Estas son tus acciones:</p>
          <div class="btns"><button type="button" class="btn gold" data-go="team:list">${ic('list')} Pasar lista de entrenamiento</button><button type="button" class="btn blue" data-go="ask">${ic('plus')} Pedir algo a la junta</button></div>
        </section>
        <section class="actions a-actions" aria-label="Acciones rápidas">
          <button type="button" class="act p" data-go="team:list"><span class="ic">${ic('list')}</span>Pasar lista</button>
          <button type="button" class="act" data-go="ask"><span class="ic">${ic('box')}</span>Pedir algo</button>
          <button type="button" class="act" data-go="ask:roto"><span class="ic">${ic('wrench')}</span>Algo roto</button>
        </section>
        ${agendaCard(S.ag)}
        ${attendanceCard(S.team, 'h-at')}
        ${noticeCard(notice, 'a-notice')}
        ${card('h-rq', 'Mis peticiones', mine.length ? mine.map(r => reqRow(r)).join('') : '<p class="muted">No tienes peticiones abiertas.</p>', 'a-reqs', '<button type="button" class="more" data-go="ask">Nueva</button>')}
        ${card('h-tm', 'Mis equipos', Object.entries(S.teams).map(([n, x], i) => `<button type="button" class="tm" data-team-go="${n}" style="width:100%;border:0;background:none;cursor:pointer;text-align:left;font:inherit">
          <span class="k">${abbr(n)}</span><span class="grow"><b>${n}</b><small>${EQ[n] ? EQ[n].cat : x.cat}</small></span>${ourRow(EQ[n]) ? `<span class="pill blue">${ourRow(EQ[n]).pos}º</span>` : ''}</button>`).join(''), 'a-teams')}
      </div>`,
      bind() {
        bindAgenda(); bindCarousel();
        document.querySelectorAll('[data-att]').forEach(b => b.onclick = () => { S.team = b.dataset.attTeam; S.attDate = b.dataset.att; go('team', 'list'); });
        document.querySelectorAll('[data-say]').forEach(b => b.onclick = () => say(b.dataset.say));
      }
    };
  },
  team() {
    if (S.sub === 'conv') return convScreen();
    const t = S.teams[S.team];
    const sub = S.sub || 'list';
    const pend = pendingLists(S.team);
    const dates = trainDates(S.team);
    if (!dates.includes(S.attDate)) S.attDate = dates.includes(TODAY) ? TODAY : pend[pend.length - 1] || dates[dates.length - 1] || null;
    const date = S.attDate, isToday = date === TODAY;
    const nextTrain = [1, 2, 3, 4, 5, 6, 7].map(i => addDays(TODAY, i)).find(d => trainsOn(S.team, d));
    const noTrainMsg = !trainOf(S.team) ? 'La junta aún no ha puesto los días de entreno de este equipo.'
      : `Hoy no hay entreno, así que no se pasa lista.${nextTrain ? ` El próximo es el ${dateLbl(nextTrain).toLowerCase()}${trainAt(S.team, nextTrain).h ? ' a las ' + trainAt(S.team, nextTrain).h : ''}${trainAt(S.team, nextTrain).where ? ' en el ' + trainAt(S.team, nextTrain).where : ''}.` : ''}`;
    const key = `${S.team} ${date}`;
    const a = S.attend[key] || (S.attend[key] = new Set());
    const tt = date && trainAt(S.team, date);
    const pct = () => t.players.length ? Math.round(a.size / t.players.length * 100) : 0;
    const allIn = () => t.players.length > 0 && t.players.every(p => a.has(p.id));
    const allLbl = () => allIn() ? `${ic('x')} Quitar a todos` : `${ic('check')} Marcar a todos`;
    const head = `<div class="stack" style="margin-bottom:16px">
      <div class="seg g-scope seg-x" role="group" aria-label="Elige equipo">${Object.keys(S.teams).map(n => `<button type="button" data-team="${n}" aria-pressed="${n === S.team}">${n}</button>`).join('')}</div>
      <div class="tabs" role="group" aria-label="Vista">${[['list', 'Pasar lista'], ['games', 'Partidos'], ['table', 'Clasificación'], ['roster', 'Plantilla']].map(([k, l]) =>
        `<button type="button" data-sub="${k}" aria-pressed="${sub === k}">${l}</button>`).join('')}</div></div>`;
    let body = '';
    if (sub === 'list' && !date) body = `<div class="split"><section class="card stack notrain" aria-label="Pasar lista"><span class="ic">${ic('cal')}</span><p style="margin:0">${esc(noTrainMsg)}</p></section>
      ${attendanceCard(S.team, 'h-at2')}</div>`;
    else if (sub === 'list') body = `<div class="split"><div class="stack">
      ${!dates.includes(TODAY) ? `<p class="card muted" style="margin:0">${esc(noTrainMsg)} Si se te olvidó alguna, puedes completarla aquí:</p>` : ''}
      ${dates.length > 1 || !dates.includes(TODAY) ? `<div class="seg g-scope seg-x" role="group" aria-label="Elige el entreno">${dates.map(d => `<button type="button" data-date="${d}" aria-pressed="${d === date}">${d === TODAY ? 'Hoy' : dayLbl(d)}${pend.includes(d) ? ' <span class="pdot" aria-label="sin pasar"></span>' : ''}</button>`).join('')}</div>` : ''}
      <section class="card match" aria-label="Resumen de asistencia"><div class="att-top">
        <div><span class="tag">${isToday ? 'Hoy' : dateLbl(date)}${tt ? ` · ${esc([tt.h, tt.where].filter(Boolean).join(' · '))}` : ''}</span><div class="vs-time" style="margin-top:10px" id="cnt">${a.size}<small style="font-size:1.2rem;opacity:.7"> / ${t.players.length}</small></div><small>han venido</small></div>
        <button type="button" class="btn gold" id="all"${t.players.length ? '' : ' disabled'}>${allLbl()}</button></div>
        <div class="progress" aria-hidden="true"><i id="bar" style="width:${pct()}%"></i></div></section>
      <p class="muted" style="margin:0">Toca a cada jugador que ha venido. Se guarda solo.</p>
      ${t.players.length ? '' : `<p class="card muted" style="margin:0">Todavía no hay jugadores en este equipo. Añádelos en “Plantilla”.</p>`}
      <ul class="players">${t.players.map((p, i) => `<li><button type="button" class="player" data-p="${p.id}" aria-pressed="${a.has(p.id)}">
        <span class="tick" aria-hidden="true">${ic('check')}</span><span class="num" aria-hidden="true">${p.dorsal || i + 1}</span><span class="pinfo"><span class="pname" title="${esc(p.n)}">${esc(p.n)}</span>
        <span class="pstate">${a.has(p.id) ? 'Ha venido' : 'Sin marcar'}</span></span></button></li>`).join('')}</ul></div>
      ${attendanceCard(S.team, 'h-at2')}</div>`;
    if (sub === 'roster') body = `<div class="stack">${addPlayerCard(S.team)}${rosterCard(S.team)}</div>`;
    const e = EQ[S.team];
    if (sub === 'games') body = card('h-gm', `Temporada · ${e.partidos.length} jornadas`, e.partidos.map(p => matchRow(e, p)).join(''), '', `<span class="tag src">${e.fuente}</span>`);
    if (sub === 'table') body = card('h-tb', e.cat, tableHTML(e), '', `<span class="tag src">${e.fuente}</span>`);
    return {
      kicker: `Mi equipo · ${EQ[S.team] ? EQ[S.team].cat : t.cat}`, title: S.team,
      body: head + body,
      bind() {
        document.querySelectorAll('[data-team]').forEach(b => b.onclick = () => { S.team = b.dataset.team; S.attDate = null; render(); });
        /* El equipo y el día elegidos siempre a la vista, aunque el selector se deslice */
        document.querySelectorAll('.seg-x [aria-pressed="true"]').forEach(b => { const s = b.parentElement; s.scrollLeft = b.offsetLeft - (s.clientWidth - b.offsetWidth) / 2; });
        document.querySelectorAll('[data-sub]').forEach(b => b.onclick = () => { S.sub = b.dataset.sub; render(); });
        bindRoster(S.team);
        document.querySelectorAll('[data-date]').forEach(b => b.onclick = () => { S.attDate = b.dataset.date; render(); });
        document.querySelectorAll('[data-p]').forEach(b => b.onclick = () => {
          const i = +b.dataset.p; a.has(i) ? a.delete(i) : a.add(i);
          API() && API().asistencia(i, date, a.has(i)).catch(() => { a.has(i) ? a.delete(i) : a.add(i); render(); say('No se ha podido guardar. Revisa la conexión.'); });
          b.setAttribute('aria-pressed', a.has(i));
          b.querySelector('.pstate').textContent = a.has(i) ? 'Ha venido' : 'Sin marcar';
          $('#cnt').innerHTML = `${a.size}<small style="font-size:1.2rem;opacity:.7"> / ${t.players.length}</small>`; $('#bar').style.width = pct() + '%'; $('#all').innerHTML = allLbl();
          const ac = document.querySelector('.a-attend'); if (ac) ac.outerHTML = attendanceCard(S.team, ac.getAttribute('aria-labelledby'));
          save();
          $('#live').textContent = `${t.players.find(p => p.id === i).n}: ${a.has(i) ? 'ha venido' : 'sin marcar'}. ${a.size} de ${t.players.length}.`;
        });
        const all = $('#all');
        if (all) all.onclick = () => {
          if (allIn()) {
            const prev = new Set(a), gone = [...a];
            a.clear(); render();
            API() && Promise.all(gone.map(i => API().asistencia(i, date, false))).catch(() => say('No se ha podido guardar. Revisa la conexión.'));
            return say('Lista vaciada', () => { S.attend[key] = prev; API() && gone.forEach(i => API().asistencia(i, date, true)); });
          }
          const prev = new Set(a), added = t.players.filter(p => !a.has(p.id)).map(p => p.id);
          added.forEach(i => a.add(i)); render();
          API() && Promise.all(added.map(i => API().asistencia(i, date, true))).catch(() => say('No se ha podido guardar. Revisa la conexión.'));
          say('Todos marcados como presentes', () => { S.attend[key] = prev; API() && added.forEach(i => API().asistencia(i, date, false)); });
        };
      }
    };
  },
  ask() {
    if (S.sub === 'mine') { S.askView = 'mine'; S.sub = null; }
    const d = S.draft || (S.draft = { step: S.sub ? 2 : 1, kind: S.sub || null, text: '', where: '', urgent: false, photo: null });
    if (S.sub) S.askView = 'new';
    S.sub = null;
    const view = S.askView === 'mine' ? 'mine' : 'new';
    const stepper = `<div class="stepper" aria-hidden="true">${[1, 2, 3].map(i => `<span class="${i <= d.step ? 'on' : ''}"></span>`).join('')}</div>
      <p class="step-lbl">Paso ${d.step} de 3 · ${['¿Qué necesitas?', 'Cuéntanos', 'Revisa y envía'][d.step - 1]}</p>`;
    const back = view === 'new' && d.step > 1 && d.step < 4 ? () => { d.step--; render(true); } : null;
    const mine = S.requests.filter(r => r.by === S.coach);
    const base = { kicker: 'Pedir o avisar', back };
    // Selector arriba: hacer una petición o ver las mías, cada cosa a todo el ancho
    const seg = `<div class="seg g-scope ask-seg" role="group" aria-label="Qué quieres hacer">
      <button type="button" data-av="new" aria-pressed="${view === 'new'}">${ic('plus')} Hacer una petición</button>
      <button type="button" data-av="mine" aria-pressed="${view === 'mine'}">${ic('list')} Mis peticiones${mine.length ? ` <span class="seg-n">${mine.length}</span>` : ''}</button></div>`;
    const bindSeg = () => document.querySelectorAll('[data-av]').forEach(b => b.onclick = () => { S.askView = b.dataset.av; render(true); });
    const duo = v => ({ ...v, body: `<div class="stack">${seg}${v.body}</div>`, bind() { bindSeg(); v.bind && v.bind(); } });
    if (view === 'mine') return duo({ ...base,
      title: 'Mis peticiones',
      body: mine.length ? `<div class="cards-grid rq-cards">${mine.map(r => `<section class="card">${reqRow(r)}</section>`).join('')}</div>`
        : emptyPage('box', 'Aún no has pedido nada', 'Aquí verás cómo avanza cada petición.', 'ask-empty', '<button type="button" class="btn blue" data-av="new">' + ic('plus') + ' Hacer una petición</button>')
    });
    if (d.step === 1) return duo({ ...base,
      title: '¿Qué necesitas?',
      body: `${stepper}<div class="opts">
        <button type="button" class="opt" data-k="material"><span class="ic">${ic('box')}</span><span><b>Pedir material</b><small>Balones, petos, conos, botiquín…</small></span><span class="go">${ic('chev')}</span></button>
        <button type="button" class="opt" data-k="roto"><span class="ic">${ic('wrench')}</span><span><b>Avisar de algo roto</b><small>Porterías, luces, vestuarios…</small></span><span class="go">${ic('chev')}</span></button>
        <button type="button" class="opt" data-k="otra"><span class="ic">${ic('talk')}</span><span><b>Otra cosa</b><small>Horarios, campos, dudas, propuestas</small></span><span class="go">${ic('chev')}</span></button></div>`,
      bind() { document.querySelectorAll('[data-k]').forEach(b => b.onclick = () => { d.kind = b.dataset.k; d.step = 2; render(true); }); }
    });
    if (d.step === 2) return duo({ ...base,
      title: kindName(d.kind),
      body: `${stepper}<form id="f" class="card stack" novalidate>
        <label class="f" for="t">${d.kind === 'roto' ? '¿Qué se ha roto?' : d.kind === 'material' ? '¿Qué necesitas?' : '¿Qué quieres decir a la junta?'}
          <span class="hint">${ic('mic')} Con una frase basta. Puedes dictarlo con el micrófono del teclado.</span>
          <textarea id="t" required>${esc(d.text)}</textarea></label>
        ${d.kind === 'roto' ? `<label class="f" for="w">¿Dónde está?
          <select id="w">${['', 'Campo 1', 'Campo 2', 'Vestuario 1', 'Vestuario 2', 'Vestuario 3', 'Almacén', 'Otro sitio'].map(o => `<option ${d.where === o ? 'selected' : ''} value="${o}">${o || 'Elige un sitio'}</option>`).join('')}</select></label>` : ''}
          <label class="photo" for="ph">${d.photo ? `<img src="${d.photo}" alt="Foto adjunta">` : `<span class="ic">${ic('camera')}</span>`}
          <span>${d.photo ? 'Foto añadida · toca para cambiarla' : 'Añadir una foto (opcional)'}</span></label>
          <input type="file" id="ph" accept="image/*" class="sr">
        <label class="toggle" for="u"><input type="checkbox" id="u" ${d.urgent ? 'checked' : ''}> <span>Es urgente</span></label>
        <p id="err" class="err" role="alert" hidden>Escribe al menos unas palabras para poder seguir.</p>
        <button class="btn blue block" type="submit">Siguiente</button></form>`,
      bind() {
        const sync = () => { d.text = $('#t').value.trim(); d.urgent = $('#u').checked; if ($('#w')) d.where = $('#w').value; };
        const ph = $('#ph');
        if (ph) ph.onchange = async () => { const f = ph.files[0]; if (!f) return; try { d.photo = await readImage(f); } catch (_) { say('No se ha podido leer esa foto. Prueba con otra.'); return; } sync(); render(); };
        $('#f').onsubmit = e => { e.preventDefault(); sync(); if (!d.text) { $('#err').hidden = false; $('#t').focus(); return; } d.step = 3; render(true); };
      }
    });
    if (d.step === 3) return duo({ ...base,
      title: 'Revisa y envía',
      body: `${stepper}<section class="card stack" aria-label="Resumen">
        <div class="rq" style="padding:0;border:0"><span class="ic ${kindCls(d.kind)}">${ic(kindIco(d.kind))}</span><div class="grow"><b>${esc(d.text)}</b><small>${kindName(d.kind)} · ${S.team}${d.where ? ' · ' + esc(d.where) : ''}</small></div>${d.urgent ? '<span class="pill red">Urgente</span>' : ''}</div>
        ${d.photo ? `<img src="${d.photo}" alt="Foto adjunta" style="border-radius:16px;max-height:240px;width:100%;object-fit:cover">` : ''}
        <button type="button" class="btn gold block" id="send">${ic('send')} Enviar a la junta</button></section>`,
      bind() {
        $('#send').onclick = async () => {
          const r = { id: Date.now(), kind: d.kind, title: d.text, where: d.where, team: S.team, by: S.coach, st: 0, when: 'Ahora', urgent: d.urgent, foto: d.photo || null, conFoto: !!d.photo };
          try { if (API()) r.id = await API().peticion(r); } catch (_) { say('No se ha podido enviar. Revisa la conexión y vuelve a probar.'); return; }
          S.requests.unshift(r);
          d.step = 4; render(true);
        };
      }
    });
    return duo({ ...base, back: null,
      title: 'Enviado a la junta',
      body: `<section class="card stack" style="align-items:flex-start"><span class="done-ic">${ic('check')}</span>
        <h2 style="margin:0">Ya lo tienen</h2><p class="muted" style="margin:0">Verás cómo avanza en Inicio, en “Mis peticiones”. Te avisaremos cuando esté resuelto.</p>
        <button type="button" class="btn blue block" data-go="home">Volver al inicio</button></section>`,
      bind() { S.draft = null; }
    });
  },
  games: gamesScreen,
  msg() {
    return {
      kicker: 'Mensajes', title: 'Avisos del club',
      body: `<div class="cards-grid">${S.notices.length ? '' : emptyPage('bell', 'Todavía no hay avisos', 'Cuando la junta envíe un aviso, lo verás aquí.')}${S.notices.map(n => `<section class="card notice" aria-labelledby="m${n.id}">
          <div class="card-h" style="margin-bottom:6px"><span class="eyebrow">${esc(n.from)}</span>${n.read ? '<span class="pill">Leído</span>' : '<span class="pill gold">Nuevo</span>'}</div>
          <h3 id="m${n.id}">${esc(n.title)}</h3><p style="margin:6px 0 0">${esc(n.body)}</p>
          ${n.read ? '' : `<button type="button" class="btn blue block" style="margin-top:14px" data-read="${n.id}">${ic('check')} Entendido</button>`}</section>`).join('')}</div>`,
      bind() { document.querySelectorAll('[data-read]').forEach(b => b.onclick = () => {
        const n = S.notices.find(x => x.id == b.dataset.read); n.read = true; n.readBy++; render(); say('Marcado como leído. La junta lo verá.');
        API() && API().leido(n.id).catch(() => {}); }); }
    };
  }
};

/* ---------- JUNTA ---------- */
/* Los 10 equipos del club con su clasificación y su último resultado reales */
const teamsList = () => D.equipos.map(e => {
  const r = ourRow(e), l = lastMatch(e), n = nextMatch(e);
  const res = l ? outcome(l) : null;
  return `<button type="button" class="tm tm-btn" data-eq="${esc(e.nombre)}"><span class="k">${r ? r.pos + 'º' : '–'}</span><div class="grow"><b>${e.nombre}</b><small>${r ? r.pts + ' pts · ' : ''}${n ? 'Próximo: ' + dayLbl(n.fecha) + ' vs ' + esc(nice(n.rival)) : 'Sin próximos partidos'}</small></div>
    ${l ? `<span class="res ${res}" title="Último: ${esc(nice(l.rival))}">${scoreTxt(l)}</span>` : ''}</button>`;
}).join('');
/* Un aviso enviado con cuántos entrenadores lo han leído */
const sentRow = (n, del) => `<div class="rq"><span class="ic b">${ic('bell')}</span>
  <div class="grow"><b>${esc(n.title)}</b><small>${esc(n.body)}</small><div class="meter" role="img" aria-label="Leído por ${n.readBy} de ${n.total}"><i style="width:${n.total ? n.readBy / n.total * 100 : 0}%"></i></div></div>
  <span class="pill ${n.readBy === n.total ? '' : 'blue'}">${n.readBy} de ${n.total}</span>${del ? `<button type="button" class="btn red sm del" data-del="${n.id}" aria-label="Borrar el aviso ${esc(n.title)}">${ic('trash')} Borrar aviso</button>` : ''}</div>`;
const coachCount = () => S.people.filter(p => p.rol === 'entrenador').length;
const teamOf = id => (D.equipos.find(e => e.id === id) || {}).nombre || id;
/* Entrenadores y junta con sus equipos; alta de cuentas nuevas */
function peopleCard() {
  return card('h-pp', `Entrenadores y accesos · ${S.people.length}`, (S.people.length ? S.people.map(p => `<div class="tm">${avatar(p, 'av')}
    <div class="grow"><b title="${esc(p.nombre)}">${esc(p.nombre)}</b><small title="${esc(p.usuario)}">${p.rol === 'junta' ? 'Junta directiva' : p.equipos.length ? p.equipos.map(teamOf).join(', ') : 'Sin equipo asignado'} · ${esc(p.usuario)}</small></div>
    <button type="button" class="more" data-pw="${p.id}" aria-label="Editar a ${esc(p.nombre)}">Editar</button></div>`).join('') : '<p class="muted" style="margin:0">Aún no hay nadie dado de alta.</p>'),
    'a-people', `<button type="button" class="btn blue sm" data-go="team:alta">${ic('plus')} Dar de alta</button>`);
}
function bindPeople() {
  document.querySelectorAll('[data-pw]').forEach(b => b.onclick = () => go('team', 'pw:' + b.dataset.pw));
}
function claveForm(p) {
  return `<form id="cf" class="card stack" novalidate>
    <div class="form2"><div class="stack"><h2 class="fh">Foto</h2><p style="margin:0">Entra con “${esc(p.usuario)}”.</p>
    ${photoField(p.foto, p.nombre)}</div>
    <div class="stack"><h2 class="fh">${p.rol === 'entrenador' ? 'Contraseña y equipos' : 'Contraseña'}</h2><label class="f" for="cp">Contraseña nueva<span class="hint">Déjala vacía para no cambiarla</span><input type="text" id="cp" autocomplete="off" autocapitalize="none" spellcheck="false"></label>
    ${p.rol === 'entrenador' ? `<fieldset class="f" id="ceq"><legend>Sus equipos</legend><div class="chips">${D.equipos.map(e => `<label class="chip"><input type="checkbox" value="${e.id}"${p.equipos.includes(e.id) ? ' checked' : ''}> ${esc(e.nombre)}</label>`).join('')}</div></fieldset>` : ''}</div></div>
    <p id="cerr" class="err" role="alert" hidden></p>
    <button type="submit" class="btn blue block">${ic('check')} Guardar</button></form>`;
}
function bindClave(p) {
  const st = { foto: p.foto };
  bindPhoto(st);
  $('#cf').onsubmit = async e => {
    e.preventDefault();
    const pw = $('#cp').value, err = m => { $('#cerr').textContent = m; $('#cerr').hidden = false; };
    if (pw && pw.length < 8) return err('La contraseña debe tener al menos 8 caracteres.');
    const eqs = $('#ceq') ? [...document.querySelectorAll('#ceq input:checked')].map(x => x.value) : p.equipos;
    if ($('#ceq') && !eqs.length) return err('Marca al menos un equipo.');
    const cambiaEq = [...eqs].sort().join() !== [...p.equipos].sort().join();
    try {
      if (pw && API()) await API().clave(p.id, pw);
      if (st.foto !== p.foto && API()) await API().foto(p.id, st.foto);
      if (cambiaEq && API()) await API().equipos(p.id, eqs);
    } catch (_) { return err('No se ha podido guardar. Revisa la conexión.'); }
    p.foto = st.foto; p.equipos = eqs; if (p.id === S.me.id) S.me.foto = st.foto;
    go('team'); say(pw ? `Guardado. Dale la contraseña nueva a ${p.nombre.split(' ')[0]}.` : 'Guardado.');
  };
}
function altaForm() {
  return `<form id="af" class="card stack" novalidate>
    <div class="form2"><div class="stack"><h2 class="fh">Datos y acceso</h2>
    ${photoField(null, '')}
    <label class="f" for="an">Nombre y apellidos<input type="text" id="an" autocomplete="off" required></label>
    <label class="f" for="au">Usuario o correo<span class="hint">Sin correo: p. ej. manolo.alevin</span><input type="text" id="au" autocomplete="off" autocapitalize="none" spellcheck="false" required></label>
    <label class="f" for="ap">Contraseña<span class="hint">Mínimo 8 caracteres</span><input type="text" id="ap" autocomplete="off" autocapitalize="none" spellcheck="false" required></label></div>
    <div class="stack"><h2 class="fh">Permisos</h2><fieldset class="f"><legend>Acceso</legend><div class="chips" role="radiogroup">
      <label class="chip"><input type="radio" name="ar" value="entrenador" checked> Entrenador</label>
      <label class="chip"><input type="radio" name="ar" value="junta"> Junta</label></div></fieldset>
    <fieldset class="f" id="aeq"><legend>Sus equipos</legend><div class="chips">${D.equipos.map(e => `<label class="chip"><input type="checkbox" value="${e.id}"> ${esc(e.nombre)}</label>`).join('')}</div></fieldset></div></div>
    <p id="aerr" class="err" role="alert" hidden></p>
    <button type="submit" class="btn blue block">${ic('check')} Dar de alta</button></form>`;
}
function bindAlta() {
  const f = $('#af'), st = { foto: null };
  bindPhoto(st);
  f.querySelectorAll('[name=ar]').forEach(r => r.onchange = () => { $('#aeq').hidden = f.querySelector('[name=ar]:checked').value === 'junta'; });
  f.onsubmit = async e => {
    e.preventDefault();
    const err = m => { $('#aerr').textContent = m; $('#aerr').hidden = false; };
    const rol = f.querySelector('[name=ar]:checked').value;
    const p = { nombre: $('#an').value.trim(), usuario: $('#au').value.trim().toLowerCase(), clave: $('#ap').value, rol,
      equipos: rol === 'junta' ? [] : [...f.querySelectorAll('#aeq input:checked')].map(x => x.value) };
    if (!p.nombre) return err('Escribe el nombre.');
    if (!/^[a-z0-9._@-]{3,}$/.test(p.usuario)) return err('El usuario solo puede llevar letras sin tilde, números y puntos (mínimo 3).');
    if (p.clave.length < 8) return err('La contraseña debe tener al menos 8 caracteres.');
    if (rol === 'entrenador' && !p.equipos.length) return err('Marca al menos un equipo.');
    try { p.id = API() ? await API().alta(p) : String(Date.now()); } catch (x) { return err(/existe/.test(x.message) ? 'Ese usuario ya existe. Elige otro.' : 'No se ha podido dar de alta. Revisa la conexión.'); }
    if (st.foto) try { API() && await API().foto(p.id, st.foto); } catch (_) { st.foto = null; say('Alta hecha, pero la foto no se ha guardado. Súbela desde “Editar”.'); }
    S.people.push({ id: p.id, nombre: p.nombre, usuario: p.usuario, rol, equipos: p.equipos, foto: st.foto });
    go('team'); say(`${p.nombre} ya puede entrar con “${p.usuario}” y su contraseña.`);
  };
}
function gamesScreen() {
  return { kicker: S.role === 'coach' ? 'Fines de semana' : 'Todos los equipos', title: 'Partidos', body: gamesView(),
    bind() {
      document.querySelectorAll('[data-wk]').forEach(b => b.onclick = () => { if (b.dataset.wk) { S.wk = b.dataset.wk; render(); } });
      document.querySelectorAll('[data-gs]').forEach(b => b.onclick = () => { S.gscope = b.dataset.gs; S.wk = null; render(); });
      document.querySelectorAll('[data-gv]').forEach(b => b.onclick = () => { S.gvenue = b.dataset.gv; render(); });
    } };
}
const BOARD = {
  home() {
    const open = S.requests.filter(r => r.st < 3);
    const order = [...S.requests].sort((a, b) => (a.st === 3) - (b.st === 3) || b.urgent - a.urgent || a.st - b.st);
    return {
      kicker: `${greet()}, ${esc(firstName())}`, title: 'Bandeja de la junta',
      body: `${pushCard()}<div class="grid board-home">
        <div class="kpis a-kpis">
          <div class="kpi dark"><small>Abiertas</small><b>${open.length}</b></div>
          <div class="kpi ${open.some(r => r.urgent) ? 'alert' : ''}"><small>Urgentes</small><b>${open.filter(r => r.urgent).length}</b></div>
          <div class="kpi"><small>Sin ver</small><b>${S.requests.filter(r => r.st === 0).length}</b></div>
          <div class="kpi"><small>Resueltas</small><b>${S.requests.filter(r => r.st === 3).length}</b></div></div>
        ${card('h-in', 'Peticiones recibidas', '<div class="scroll">' + (order.length ? order.map(r => reqRow(r, `<div class="ctl"><label for="s${r.id}">Estado</label>
          <select id="s${r.id}" data-st="${r.id}">${STATES.map((s, i) => `<option value="${i}" ${i === r.st ? 'selected' : ''}>${s}</option>`).join('')}</select></div>`)).join('')
          : `<div class="empty">${ic('inbox')}<b>No hay peticiones</b><small>Cuando un entrenador pida algo o avise de una incidencia, aparecerá aquí.</small></div>`) + '</div>', 'a-inbox')}
        ${card('h-tm', 'Nuestros equipos', `<div class="scroll">${teamsList()}</div>`, 'a-teams', '<button type="button" class="more" data-go="team">Ver todos</button>')}
        ${noticeCard(S.notices[0], 'a-notice')}
      </div>`,
      bind() { document.querySelectorAll('[data-st]').forEach(s => s.onchange = () => {
        const r = S.requests.find(x => x.id == s.dataset.st); const prev = r.st; r.st = +s.value; render();
        API() && API().estado(r.id, r.st).catch(() => { r.st = prev; render(); say('No se ha podido guardar. Revisa la conexión.'); });
        say(`“${r.title}” pasa a ${STATES[r.st]}. ${r.by} lo verá en su móvil.`, () => { r.st = prev; API() && API().estado(r.id, prev); }); }); }
    };
  },
  team() {
    if (S.sub === 'alta') return { kicker: 'Equipos · Accesos', title: 'Dar de alta', back: () => go('team'), body: altaForm(), bind: bindAlta };
    if (S.sub && S.sub.startsWith('pw:')) {
      const p = S.people.find(x => x.id === S.sub.slice(3));
      return { kicker: 'Equipos · Accesos', title: esc(p.nombre), back: () => go('team'), body: claveForm(p), bind: () => bindClave(p) };
    }
    if (S.sub && S.sub.startsWith('eq:')) {
      const team = S.sub.slice(3);
      S.teams[team] = S.teams[team] || { cat: (EQ[team] || {}).cat || '', train: null, players: [] };
      return { kicker: `Equipos · ${EQ[team] ? EQ[team].cat : ''}`, title: esc(team), back: () => go('team'),
        body: `<div class="stack"><div class="team-top">${trainCard(team)}${addPlayerCard(team)}</div>${rosterCard(team)}</div>`, bind: () => { bindTrain(team); bindRoster(team); } };
    }
    const all = D.equipos.flatMap(e => played(e));
    const wins = all.filter(p => outcome(p) === 'G').length;
    const week = AGENDA.filter(x => x.kind === 'match');
    return {
      kicker: `Club · Temporada 2026/27 · actualizado ${updated()}`, title: 'Equipos',
      body: `<div class="stack"><div class="kpis">
          <div class="kpi dark"><small>Equipos</small><b>${D.equipos.length}</b></div>
          <div class="kpi"><small>Partidos jugados</small><b>${all.length}</b></div>
          <div class="kpi"><small>Victorias</small><b>${wins}</b></div>
          <div class="kpi"><small>Partidos esta semana</small><b>${week.length}</b></div></div>
        ${peopleCard()}
        ${card('h-eq', 'Clasificación y plantillas', teamsList())}
        ${week.length ? card('h-wk', 'Partidos de los próximos 7 días', week.map(x => agendaRow(x, false)).join('')) : ''}</div>`,
      bind: bindPeople
    };
  },
  ask() {
    return {
      kicker: 'Comunicación', title: 'Enviar un aviso',
      body: `<div class="duo"><form id="nf" class="card stack" novalidate>
        ${S.live ? `<p class="muted" style="margin:0">Lo recibirán todos los entrenadores (${coachCount()}).</p>`
          : `<label class="f" for="to">¿A quién?<select id="to"><option>Todos los entrenadores (24)</option><option>Fútbol base (14)</option><option>Categoría alevín (4)</option><option>Solo a Paco Martín</option></select></label>`}
        <label class="f" for="nt">Título<input type="text" id="nt" ${S.live ? 'placeholder="Por ejemplo: Reunión de entrenadores"' : 'value="Reunión de entrenadores"'}></label>
        <label class="f" for="nb">Mensaje<textarea id="nb">${S.live ? '' : 'El jueves 29 a las 20:30 en la sede. Hablaremos del torneo de Navidad.'}</textarea></label>
        <p id="nerr" class="err" role="alert" hidden>Escribe el mensaje.</p>
        <button type="submit" class="btn gold block">${ic('send')} Enviar aviso</button></form>
        ${card('h-last', 'Últimos avisos enviados', S.notices.length ? S.notices.slice(0, 4).map(n => sentRow(n)).join('') : '<p class="muted" style="margin:0">Aún no has enviado avisos.</p>', '', S.notices.length > 4 ? '<button type="button" class="more" data-go="msg">Ver todos</button>' : '')}</div>`,
      bind() { $('#nf').onsubmit = async e => { e.preventDefault();
        const n = { id: Date.now(), from: 'Junta directiva', title: $('#nt').value.trim() || 'Aviso', body: $('#nb').value.trim(), read: false, readBy: 0, total: S.live ? coachCount() : 24 };
        if (!n.body) { $('#nerr').hidden = false; $('#nb').focus(); return; }
        try { if (API()) n.id = await API().aviso(n); } catch (_) { say('No se ha podido enviar. Revisa la conexión.'); return; }
        S.notices.unshift(n);
        go('msg'); say('Aviso enviado. Verás quién lo ha leído.'); }; }
    };
  },
  games: gamesScreen,
  msg() {
    return {
      kicker: 'Comunicación', title: 'Avisos enviados',
      body: S.notices.length ? `<div class="cards-grid">${S.notices.map(n => `<section class="card sent" aria-label="${esc(n.title)}">${sentRow(n, true)}</section>`).join('')}</div>`
        : emptyPage('bell', 'Aún no has enviado avisos', 'Cuando envíes uno, aquí verás quién lo ha leído.', '', '<button type="button" class="btn blue" data-go="ask">' + ic('send') + ' Enviar un aviso</button>'),
      bind() { document.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => {
        const n = S.notices.find(x => x.id == b.dataset.del);
        if (!(await ask(`¿Borrar “${n.title}”?`, 'Desaparecerá también de los móviles de los entrenadores. No se puede deshacer.', 'Sí, borrar'))) return;
        try { API() && await API().borrarAviso(n.id); } catch (_) { say('No se ha podido borrar. Revisa la conexión.'); return; }
        S.notices = S.notices.filter(x => x !== n); render(); say('Aviso borrado.'); }); }
    };
  }
};

function bindGo() {
  bindRequests();
  document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { const [t, s] = b.dataset.go.split(':'); go(t, s || null); });
  document.querySelectorAll('[data-team-go]').forEach(b => b.onclick = () => { S.team = b.dataset.teamGo; go('team', 'list'); });
  document.querySelectorAll('[data-eq]').forEach(b => b.onclick = () => go('team', 'eq:' + b.dataset.eq));
}

document.addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) go(b.dataset.tab); });
if (window.SERVIDOR_ON) window.startServer();
else { load(); render(); window.splashOff && splashOff(); }

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
