const I = {
  home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  team: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><circle cx="17" cy="9" r="2.6"/><path d="M16.5 14.6c2.7.2 4.4 1.9 5 4.9"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
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
const S = {
  role: 'coach', tab: 'home', sub: null,
  coach: 'Paco', team: 'Alevín A',
  teams: {
    'Alevín A': { cat: 'Alevín · F7', next: { h: '18:00', what: 'Entrenamiento', where: 'Campo 2' },
      match: { rival: 'CD Las Eras', day: 'Sábado 31', h: '10:30', where: 'Polideportivo Norte', home: false, color: '#C8102E', jornada: 7 },
      players: ['Lucas Romero', 'Hugo Sanz', 'Martín Gil', 'Pablo Ortega', 'Daniel Ruiz', 'Álvaro Vidal', 'Leo Navarro', 'Mateo Cano', 'Izan Molina', 'Adrián Prieto', 'Marcos León', 'Bruno Díez'] },
    'Infantil B': { cat: 'Infantil · F11', next: { h: '19:30', what: 'Entrenamiento', where: 'Campo 1' },
      match: { rival: 'UD Gerena', day: 'Domingo 1', h: '12:00', where: 'Campo municipal', home: true, color: '#0E7A3E', jornada: 5 },
      players: ['Sara Blanco', 'Nerea Gómez', 'Lucía Pastor', 'Carla Ibáñez', 'Alba Rubio', 'Irene Moya', 'Paula Crespo', 'Vega Herrero', 'Noa Garrido', 'Elena Soler'] }
  },
  attend: {},
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

/* Guardado en este móvil. Cuando haya servidor, estas dos funciones pasan a hablar con él. */
const STORE_KEY = 'cd-aznalcollar-v1';
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
  try {
    const attend = {};
    for (const k in S.attend) attend[k] = [...S.attend[k]];
    localStorage.setItem(STORE_KEY, JSON.stringify({ requests: S.requests, notices: S.notices, attend }));
  } catch (_) {}
}
const today = () => new Date().toISOString().slice(0, 10);

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const initials = n => n.split(' ').map(w => w[0]).slice(0, 2).join('');
const short = n => { const [a, b] = n.split(' '); return b ? `${a} ${b[0]}.` : a; };

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
const CLUB = 'C.D. Aznalcóllar';
const greet = () => { const h = new Date().getHours(); return h < 14 ? 'Buenos días' : h < 21 ? 'Buenas tardes' : 'Buenas noches'; };
const crestImg = (cls = '') => `<img class="cr ${cls}" src="${CREST}" alt="">`;
const rivalMini = m => `<span class="mini" style="background:${m.color}" aria-hidden="true">${initials(m.rival.replace(/^(CD|UD) /, ''))}</span>`;
const usMini = () => `<span class="mini" aria-hidden="true">${crestImg()}</span>`;

/* Agenda de la semana (datos de ejemplo) */
const AGENDA = [
  { day: 'Hoy', h: '18:00', kind: 'train', team: 'Alevín A', where: 'Campo 2', today: true },
  { day: 'Hoy', h: '19:30', kind: 'train', team: 'Infantil B', where: 'Campo 1', today: true },
  { day: 'Mié 28', h: '18:00', kind: 'train', team: 'Alevín A', where: 'Campo 2' },
  { day: 'Jue 29', h: '19:30', kind: 'train', team: 'Infantil B', where: 'Campo 1' },
  { day: 'Sáb 31', h: '10:30', kind: 'match', team: 'Alevín A' },
  { day: 'Dom 1', h: '12:00', kind: 'match', team: 'Infantil B' },
  { day: 'Sáb 31', h: '9:00', kind: 'club', title: 'Fotos oficiales del club', where: 'Campo 1' }
];

function tabsFor() {
  const unread = S.notices.filter(n => !n.read).length;
  const open = S.requests.filter(r => r.st < 3).length;
  return S.role === 'coach'
    ? [['home', 'Inicio', 'home'], ['team', 'Mi equipo', 'team'], ['ask', 'Pedir', 'plus', 'plus'], ['msg', 'Mensajes', 'chat', '', unread]]
    : [['home', 'Bandeja', 'inbox', '', open], ['team', 'Equipos', 'team'], ['ask', 'Aviso', 'send', 'plus'], ['msg', 'Enviados', 'chat']];
}

function go(tab, sub = null) { S.tab = tab; S.sub = sub; if (tab !== 'ask') S.draft = null; render(true); }

function render(focus) {
  save();
  const tabs = tabsFor();
  $('#rail-tabs').innerHTML = tabs.map(([k, l, i, cls, n]) =>
    `<li><button type="button" class="${cls || ''}" data-tab="${k}" ${S.tab === k ? 'aria-current="page"' : ''}>${ic(i)}<span>${l}</span>${n ? `<span class="badge" aria-label="${n} pendientes">${n}</span>` : ''}</button></li>`).join('');
  $('#bottom-tabs').innerHTML = tabs.map(([k, l, i, cls, n]) =>
    `<li><button type="button" class="${cls || ''}" data-tab="${k}" ${S.tab === k ? 'aria-current="page"' : ''}>${cls === 'plus' ? `<span class="ic">${ic(i)}</span>` : ic(i)}<span>${l}</span>${n ? `<span class="badge" aria-label="${n} pendientes">${n}</span>` : ''}</button></li>`).join('');
  const v = (S.role === 'coach' ? COACH : BOARD)[S.tab]();
  const unread = S.notices.filter(n => !n.read).length;
  $('#top').innerHTML = `
    ${v.back ? `<button type="button" class="back" data-back aria-label="Volver">${ic('back')}</button>` : crestImg('logo')}
    <div class="title"><small>${v.kicker}</small><h1 id="title">${v.title}</h1></div>
    ${S.role === 'coach' ? `<button type="button" class="iconbtn" data-go="msg" aria-label="Mensajes${unread ? `, ${unread} sin leer` : ''}">${ic('bell')}${unread ? '<span class="dot"></span>' : ''}</button>` : ''}
    <div class="who"><div><small>${S.role === 'coach' ? 'Entrenador' : 'Junta directiva'}</small><b>${S.role === 'coach' ? 'Paco Martín' : 'Ana Ruiz'}</b></div><span class="av" aria-hidden="true">${S.role === 'coach' ? 'PM' : 'AR'}</span></div>`;
  $('#main').className = v.layout || '';
  $('#main').innerHTML = v.body;
  v.bind && v.bind();
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
  return `<div class="rq"><span class="ic ${kindCls(r.kind)}">${ic(kindIco(r.kind))}</span>
    <div class="grow"><b title="${esc(r.title)}">${esc(r.title)}</b><div class="rq-meta">${stPill(r)}<small>${S.role === 'board' ? `${r.by} · ${r.team} · ` : ''}${r.when}${r.where ? ' · ' + esc(r.where) : ''}</small></div>${stepsHTML(r, !!ctl)}</div>
    ${ctl}</div>`;
}
function card(id, title, body, cls = '', more = '') {
  return `<section class="card ${cls}" aria-labelledby="${id}"><div class="card-h"><h2 id="${id}">${title}</h2>${more}</div>${body}</section>`;
}
function scoreHTML(team) {
  const m = S.teams[team].match;
  const us = `<div><div class="ring">${crestImg()}</div><b>Aznalcóllar</b><small>${team}</small></div>`;
  const them = `<div><div class="ring rv" style="background-color:${m.color}" aria-hidden="true">${initials(m.rival.replace(/^(CD|UD) /, ''))}</div><b>${esc(m.rival)}</b><small>${m.home ? 'Visitante' : 'Local'}</small></div>`;
  return `<div class="score">${m.home ? us : them}<div><div class="vs-time">${m.h}</div><small>Jornada ${m.jornada}</small></div>${m.home ? them : us}</div>`;
}
function agendaRow(e, withAct) {
  let what;
  if (e.kind === 'match') {
    const m = S.teams[e.team].match;
    const us = `${usMini()}<span class="nm">Aznalcóllar</span>`, them = `${rivalMini(m)}<span class="nm">${esc(m.rival)}</span>`;
    what = `<span class="vsl">${m.home ? us : them}<span class="pill gold">vs</span>${m.home ? them : us}</span><span class="where">${esc(m.where)}</span>`;
  } else if (e.kind === 'club') what = `<span class="t">${e.title}</span><span class="where">${e.where}</span>`;
  else what = `<span class="t">Entreno · ${e.team}</span>${e.today ? '<span class="pill">Hoy</span>' : ''}<span class="where">${e.where}</span>`;
  const act = withAct && e.today && e.kind === 'train'
    ? `<button type="button" class="btn gold sm ev-act" data-team-go="${e.team}">Pasar lista</button>`
    : `<span class="pill ${e.kind === 'match' ? 'gold' : e.kind === 'club' ? 'grey' : 'blue'} ev-act">${e.kind === 'club' ? 'Club' : e.team}</span>`;
  return `<div class="ev"><div class="when"><b>${e.h}</b><small>${e.day}</small></div><div class="what">${what}</div>${act}</div>`;
}
function agendaCard(filter) {
  const f = filter || 'all';
  const list = AGENDA.filter(e => f === 'all' || e.kind === f);
  return card('h-ag', 'Esta semana', `
    <div class="tabs" role="group" aria-label="Filtrar agenda">${[['all', 'Todo'], ['train', 'Entrenos'], ['match', 'Partidos'], ['club', 'Club']].map(([k, l]) =>
      `<button type="button" data-ag="${k}" aria-pressed="${f === k}">${l}</button>`).join('')}</div>
    <div id="ag-list">${list.map(e => agendaRow(e, true)).join('')}</div>`, 'a-agenda');
}
function bindAgenda() {
  document.querySelectorAll('[data-ag]').forEach(b => b.onclick = () => { S.ag = b.dataset.ag; const el = b.closest('section'); el.outerHTML = agendaCard(S.ag); bindAgenda(); bindGo(); });
  document.querySelectorAll('[data-team-go]').forEach(b => b.onclick = () => { S.team = b.dataset.teamGo; go('team', 'list'); });
}
function attendanceCard(team, id) {
  const pct = team === 'Alevín A' ? [75, 83, 92, 67, 92, 100, 83, 92] : [80, 90, 100, 70, 90, 100, 90, 100];
  const avg = Math.round(pct.reduce((a, b) => a + b) / pct.length);
  const a = S.attend[`${team} ${today()}`];
  const n = S.teams[team].players.length;
  return card(id, `Asistencia · ${team}`, `
    <div class="bignum">${avg}%</div><div class="delta">+4% respecto a septiembre</div>
    <div class="bars" role="img" aria-label="Asistencia por entrenamiento en octubre: ${pct.join(', ')} por ciento">${pct.map(p => `<span class="${p >= 90 ? 'hi' : p < 70 ? 'lo' : ''}" style="height:${p}%"></span>`).join('')}</div>
    <div class="bars-x" aria-hidden="true">${[5, 7, 12, 14, 19, 21, 23, 26].map(d => `<span>${d}</span>`).join('')}</div>
    <div class="last">${ic('check')}Hoy<b class="att-today">${a ? a.size : 0} de ${n}</b></div>`, 'dark a-attend', '<span class="tag">Octubre</span>');
}
function noticeCard(n, cls = '') {
  return `<section class="card notice ${cls}" aria-labelledby="nt${n.id}"><div class="media">${crestImg()}<span class="lbl">${ic('bell')}Aviso del club</span></div>
    <span class="eyebrow">${esc(n.from)}</span><h3 id="nt${n.id}">${esc(n.title)}</h3><p class="eyebrow nb">${esc(n.body)}</p></section>`;
}

/* ---------- ENTRENADOR ---------- */
const COACH = {
  home() {
    const t = S.teams[S.team];
    const mine = S.requests.filter(r => r.by === S.coach && r.st < 3);
    const notice = S.notices.find(n => !n.read) || S.notices[0];
    const days = ['Lun 26', 'Mar 27', 'Mié 28', 'Jue 29', 'Vie 30', 'Sáb 31', 'Dom 1'];
    return {
      kicker: `${greet()},`, title: 'Paco Martín', layout: '',
      body: `
      <div class="days" aria-label="Esta semana">${days.map((d, i) => { const [w, n] = d.split(' '); return `<span class="${i === 0 ? 'today' : ''} ${i >= 5 ? 'has-match' : ''}">${w}<b>${n}</b></span>`; }).join('')}</div>
      <div class="grid coach-home">
        ${card('h-m', 'Próximo partido', `${scoreHTML(S.team)}
          <div class="match-btns"><button type="button" class="btn gold" data-say="La convocatoria llegará en la próxima versión.">Convocatoria</button><button type="button" class="btn glass" data-say="${esc(t.match.where)}">${ic('pin')}Cómo llegar</button></div>`,
          'match a-match', `<span class="tag gold">${t.match.day}</span>`)}
        <section class="hero a-hero" aria-labelledby="h-hero">${crestImg('big-crest')}
          <span class="kick">Hoy · ${t.next.what} ${t.next.h} · ${t.next.where}</span>
          <h2 id="h-hero">Semana de partido para el ${S.team}</h2>
          <p>El ${t.match.day.toLowerCase()} ${t.match.home ? 'recibís al' : 'visitáis al'} ${esc(t.match.rival)}. Pasa lista hoy y prepara la convocatoria.</p>
          <div class="btns"><button type="button" class="btn gold" data-go="team:list">Pasar lista</button><button type="button" class="btn glass" data-go="ask:material">Pedir algo a la junta</button></div>
        </section>
        <section class="actions a-actions" aria-label="Acciones rápidas">
          <button type="button" class="act p" data-go="team:list"><span class="ic">${ic('list')}</span>Pasar lista</button>
          <button type="button" class="act" data-go="ask:material"><span class="ic">${ic('box')}</span>Pedir algo</button>
          <button type="button" class="act" data-go="ask:roto"><span class="ic">${ic('wrench')}</span>Algo roto</button>
        </section>
        ${agendaCard(S.ag)}
        ${attendanceCard(S.team, 'h-at')}
        ${noticeCard(notice, 'a-notice')}
        ${card('h-rq', 'Mis peticiones', mine.length ? mine.map(r => reqRow(r)).join('') : '<p class="muted">No tienes peticiones abiertas.</p>', 'a-reqs', '<button type="button" class="more" data-go="ask">Nueva</button>')}
        ${card('h-tm', 'Mis equipos', Object.entries(S.teams).map(([n, x], i) => `<button type="button" class="tm" data-team-go="${n}" style="width:100%;border:0;background:none;cursor:pointer;text-align:left;font:inherit">
          <span class="k">${n[0]}${n.split(' ')[1]}</span><span class="grow"><b>${n}</b><small>${x.cat} · ${x.players.length} jugadores</small></span><span class="pill">${[86, 91][i]}%</span></button>`).join(''), 'a-teams')}
      </div>`,
      bind() {
        bindAgenda();
        document.querySelectorAll('[data-say]').forEach(b => b.onclick = () => say(b.dataset.say));
      }
    };
  },
  team() {
    const t = S.teams[S.team];
    const sub = S.sub || 'list';
    const key = `${S.team} ${today()}`;
    const a = S.attend[key] || (S.attend[key] = new Set());
    const pct = () => Math.round(a.size / t.players.length * 100);
    const head = `<div class="stack" style="margin-bottom:16px">
      <div class="chips" role="group" aria-label="Elige equipo">${Object.keys(S.teams).map(n => `<button type="button" class="chip" data-team="${n}" aria-pressed="${n === S.team}">${n}</button>`).join('')}</div>
      <div class="tabs" role="group" aria-label="Vista">${[['list', 'Pasar lista'], ['roster', 'Plantilla'], ['cal', 'Calendario']].map(([k, l]) =>
        `<button type="button" data-sub="${k}" aria-pressed="${sub === k}">${l}</button>`).join('')}</div></div>`;
    let body = '';
    if (sub === 'list') body = `<div class="split"><div class="stack">
      <section class="card match" aria-label="Resumen de asistencia de hoy"><div class="att-top">
        <div><span class="tag">Hoy · ${t.next.h} · ${t.next.where}</span><div class="vs-time" style="margin-top:10px" id="cnt">${a.size}<small style="font-size:1.2rem;opacity:.7"> / ${t.players.length}</small></div><small>han venido</small></div>
        <button type="button" class="btn gold" id="all">${ic('check')} Marcar a todos</button></div>
        <div class="progress" aria-hidden="true"><i id="bar" style="width:${pct()}%"></i></div></section>
      <p class="muted" style="margin:0">Toca a cada jugador que ha venido. Se guarda solo.</p>
      <ul class="players">${t.players.map((p, i) => `<li><button type="button" class="player" data-p="${i}" aria-pressed="${a.has(i)}">
        <span class="tick" aria-hidden="true">${ic('check')}</span><span class="num" aria-hidden="true">${i + 1}</span><span class="pname">${p}</span>
        <span class="pstate">${a.has(i) ? 'Ha venido' : 'Sin marcar'}</span></button></li>`).join('')}</ul></div>
      ${attendanceCard(S.team, 'h-at2')}</div>`;
    if (sub === 'roster') body = card('h-pl', `Plantilla · ${t.players.length} jugadores`, t.players.map((p, i) => `<div class="tm"><span class="k">${i + 1}</span>
      <div class="grow"><b>${p}</b><small>Familia: 6${String(10 + i * 7).padStart(2, '0')} 45${String(20 + i).padStart(2, '0')} 1${i}</small></div></div>`).join(''));
    if (sub === 'cal') body = card('h-cal', 'Esta semana', AGENDA.filter(e => e.team === S.team || e.kind === 'club').map(e => agendaRow(e, false)).join(''));
    return {
      kicker: `Mi equipo · ${t.cat}`, title: S.team,
      body: head + body,
      bind() {
        document.querySelectorAll('[data-team]').forEach(b => b.onclick = () => { S.team = b.dataset.team; render(); });
        document.querySelectorAll('[data-sub]').forEach(b => b.onclick = () => { S.sub = b.dataset.sub; render(); });
        document.querySelectorAll('[data-p]').forEach(b => b.onclick = () => {
          const i = +b.dataset.p; a.has(i) ? a.delete(i) : a.add(i);
          b.setAttribute('aria-pressed', a.has(i));
          b.querySelector('.pstate').textContent = a.has(i) ? 'Ha venido' : 'Sin marcar';
          $('#cnt').innerHTML = `${a.size}<small style="font-size:1.2rem;opacity:.7"> / ${t.players.length}</small>`; $('#bar').style.width = pct() + '%';
          document.querySelectorAll('.att-today').forEach(x => x.textContent = `${a.size} de ${t.players.length}`);
          save();
          $('#live').textContent = `${t.players[i]}: ${a.has(i) ? 'ha venido' : 'sin marcar'}. ${a.size} de ${t.players.length}.`;
        });
        const all = $('#all');
        if (all) all.onclick = () => { const prev = new Set(a); t.players.forEach((_, i) => a.add(i)); render(); say('Todos marcados como presentes', () => { S.attend[key] = prev; }); };
      }
    };
  },
  ask() {
    const d = S.draft || (S.draft = { step: S.sub ? 2 : 1, kind: S.sub || null, text: '', where: '', urgent: false, photo: null });
    S.sub = null;
    const stepper = `<div class="stepper" aria-hidden="true">${[1, 2, 3].map(i => `<span class="${i <= d.step ? 'on' : ''}"></span>`).join('')}</div>
      <p class="step-lbl">Paso ${d.step} de 3 · ${['¿Qué necesitas?', 'Cuéntanos', 'Revisa y envía'][d.step - 1]}</p>`;
    const back = d.step > 1 && d.step < 4 ? () => { d.step--; render(true); } : null;
    const base = { kicker: 'Pedir o avisar', layout: 'narrow', back };
    if (d.step === 1) return { ...base,
      title: '¿Qué necesitas?',
      body: `${stepper}<div class="opts">
        <button type="button" class="opt" data-k="material"><span class="ic">${ic('box')}</span><span><b>Pedir material</b><small>Balones, petos, conos, botiquín…</small></span><span class="go">${ic('chev')}</span></button>
        <button type="button" class="opt" data-k="roto"><span class="ic">${ic('wrench')}</span><span><b>Avisar de algo roto</b><small>Porterías, luces, vestuarios…</small></span><span class="go">${ic('chev')}</span></button>
        <button type="button" class="opt" data-k="otra"><span class="ic">${ic('talk')}</span><span><b>Otra cosa</b><small>Horarios, campos, dudas, propuestas</small></span><span class="go">${ic('chev')}</span></button></div>`,
      bind() { document.querySelectorAll('[data-k]').forEach(b => b.onclick = () => { d.kind = b.dataset.k; d.step = 2; render(true); }); }
    };
    if (d.step === 2) return { ...base,
      title: kindName(d.kind),
      body: `${stepper}<form id="f" class="card stack" novalidate>
        <label class="f" for="t">${d.kind === 'roto' ? '¿Qué se ha roto?' : d.kind === 'material' ? '¿Qué necesitas?' : '¿Qué quieres decir a la junta?'}
          <span class="hint">${ic('mic')} Con una frase basta. Puedes dictarlo con el micrófono del teclado.</span>
          <textarea id="t" required>${esc(d.text)}</textarea></label>
        ${d.kind === 'roto' ? `<label class="f" for="w">¿Dónde está?
          <select id="w">${['', 'Campo 1', 'Campo 2', 'Vestuario 1', 'Vestuario 2', 'Vestuario 3', 'Almacén', 'Otro sitio'].map(o => `<option ${d.where === o ? 'selected' : ''} value="${o}">${o || 'Elige un sitio'}</option>`).join('')}</select></label>
          <label class="photo" for="ph">${d.photo ? `<img src="${d.photo}" alt="Foto adjunta">` : `<span class="ic">${ic('camera')}</span>`}
          <span>${d.photo ? 'Foto añadida · toca para cambiarla' : 'Añadir una foto (opcional)'}</span></label>
          <input type="file" id="ph" accept="image/*" class="sr">` : ''}
        <label class="toggle" for="u"><input type="checkbox" id="u" ${d.urgent ? 'checked' : ''}> <span>Es urgente</span></label>
        <p id="err" class="err" role="alert" hidden>Escribe al menos unas palabras para poder seguir.</p>
        <button class="btn blue block" type="submit">Siguiente</button></form>`,
      bind() {
        const sync = () => { d.text = $('#t').value.trim(); d.urgent = $('#u').checked; if ($('#w')) d.where = $('#w').value; };
        const ph = $('#ph');
        if (ph) ph.onchange = () => { const f = ph.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { d.photo = r.result; sync(); render(); }; r.readAsDataURL(f); };
        $('#f').onsubmit = e => { e.preventDefault(); sync(); if (!d.text) { $('#err').hidden = false; $('#t').focus(); return; } d.step = 3; render(true); };
      }
    };
    if (d.step === 3) return { ...base,
      title: 'Revisa y envía',
      body: `${stepper}<section class="card stack" aria-label="Resumen">
        <div class="rq" style="padding:0;border:0"><span class="ic ${kindCls(d.kind)}">${ic(kindIco(d.kind))}</span><div class="grow"><b>${esc(d.text)}</b><small>${kindName(d.kind)} · ${S.team}${d.where ? ' · ' + esc(d.where) : ''}</small></div>${d.urgent ? '<span class="pill red">Urgente</span>' : ''}</div>
        ${d.photo ? `<img src="${d.photo}" alt="Foto adjunta" style="border-radius:16px;max-height:240px;width:100%;object-fit:cover">` : ''}
        <button type="button" class="btn gold block" id="send">${ic('send')} Enviar a la junta</button></section>`,
      bind() {
        $('#send').onclick = () => {
          S.requests.unshift({ id: Date.now(), kind: d.kind, title: d.text, where: d.where, team: S.team, by: S.coach, st: 0, when: 'Ahora', urgent: d.urgent });
          d.step = 4; render(true);
        };
      }
    };
    return { ...base, back: null,
      title: 'Enviado a la junta',
      body: `<section class="card stack" style="align-items:flex-start"><span class="done-ic">${ic('check')}</span>
        <h2 style="margin:0">Ya lo tienen</h2><p class="muted" style="margin:0">Verás cómo avanza en Inicio, en “Mis peticiones”. Te avisaremos cuando esté resuelto.</p>
        <button type="button" class="btn blue block" data-go="home">Volver al inicio</button></section>`,
      bind() { S.draft = null; }
    };
  },
  msg() {
    return {
      kicker: 'Mensajes', title: 'Avisos del club', layout: 'narrow',
      body: `<div class="stack">${S.notices.map(n => `<section class="card notice" aria-labelledby="m${n.id}">
          <div class="card-h" style="margin-bottom:6px"><span class="eyebrow">${esc(n.from)}</span>${n.read ? '<span class="pill">Leído</span>' : '<span class="pill gold">Nuevo</span>'}</div>
          <h3 id="m${n.id}">${esc(n.title)}</h3><p style="margin:6px 0 0">${esc(n.body)}</p>
          ${n.read ? '' : `<button type="button" class="btn blue block" style="margin-top:14px" data-read="${n.id}">${ic('check')} Entendido</button>`}</section>`).join('')}</div>`,
      bind() { document.querySelectorAll('[data-read]').forEach(b => b.onclick = () => {
        const n = S.notices.find(x => x.id == b.dataset.read); n.read = true; n.readBy++; render(); say('Marcado como leído. La junta lo verá.'); }); }
    };
  }
};

/* ---------- JUNTA ---------- */
const TEAMS = [['Alevín A', 'Paco Martín', 12, 86], ['Infantil B', 'Paco Martín', 10, 91], ['Cadete A', 'Raquel Torres', 16, 78], ['Benjamín C', 'Manolo Fuentes', 11, 94], ['Juvenil A', 'Iker Domínguez', 18, 72]];
const teamsList = () => TEAMS.map(([t, c, n, p]) => `<div class="tm"><span class="k">${t[0]}${t.split(' ')[1]}</span><div class="grow"><b>${t}</b><small>${c} · ${n} jugadores</small>
  <div class="meter" aria-hidden="true"><i style="width:${p}%;background:var(${p >= 85 ? '--ok' : p >= 75 ? '--gold' : '--bad'})"></i></div></div><span class="pill ${p >= 85 ? '' : p >= 75 ? 'gold' : 'red'}">${p}%</span></div>`).join('');
const BOARD = {
  home() {
    const open = S.requests.filter(r => r.st < 3);
    const order = [...S.requests].sort((a, b) => (a.st === 3) - (b.st === 3) || b.urgent - a.urgent || a.st - b.st);
    return {
      kicker: `${greet()}, Ana`, title: 'Bandeja de la junta',
      body: `<div class="grid board-home">
        <div class="kpis a-kpis">
          <div class="kpi dark"><small>Abiertas</small><b>${open.length}</b></div>
          <div class="kpi ${open.some(r => r.urgent) ? 'alert' : ''}"><small>Urgentes</small><b>${open.filter(r => r.urgent).length}</b></div>
          <div class="kpi"><small>Sin ver</small><b>${S.requests.filter(r => r.st === 0).length}</b></div>
          <div class="kpi"><small>Resueltas</small><b>${S.requests.filter(r => r.st === 3).length}</b></div></div>
        ${card('h-in', 'Peticiones recibidas', order.map(r => reqRow(r, `<div class="ctl"><label for="s${r.id}">Estado</label>
          <select id="s${r.id}" data-st="${r.id}">${STATES.map((s, i) => `<option value="${i}" ${i === r.st ? 'selected' : ''}>${s}</option>`).join('')}</select></div>`)).join(''), 'a-inbox')}
        ${card('h-tm', 'Asistencia por equipo', teamsList(), 'a-teams', '<button type="button" class="more" data-go="team">Ver equipos</button>')}
        ${noticeCard(S.notices[0], 'a-notice')}
      </div>`,
      bind() { document.querySelectorAll('[data-st]').forEach(s => s.onchange = () => {
        const r = S.requests.find(x => x.id == s.dataset.st); const prev = r.st; r.st = +s.value; render();
        say(`“${r.title}” pasa a ${STATES[r.st]}. ${r.by} lo verá en su móvil.`, () => { r.st = prev; }); }); }
    };
  },
  team() {
    const avg = Math.round(TEAMS.reduce((s, r) => s + r[3], 0) / TEAMS.length);
    return {
      kicker: 'Club · Temporada 2026/27', title: 'Equipos',
      body: `<div class="stack"><div class="kpis">
          <div class="kpi dark"><small>Equipos</small><b>${TEAMS.length}</b></div>
          <div class="kpi"><small>Jugadores</small><b>${TEAMS.reduce((s, r) => s + r[2], 0)}</b></div>
          <div class="kpi"><small>Entrenadores</small><b>${new Set(TEAMS.map(r => r[1])).size}</b></div>
          <div class="kpi"><small>Asistencia media</small><b>${avg}%</b></div></div>
        ${card('h-eq', 'Asistencia del último mes', teamsList())}</div>`
    };
  },
  ask() {
    return {
      kicker: 'Comunicación', title: 'Enviar un aviso', layout: 'narrow',
      body: `<form id="nf" class="card stack" novalidate>
        <label class="f" for="to">¿A quién?<select id="to"><option>Todos los entrenadores (24)</option><option>Fútbol base (14)</option><option>Categoría alevín (4)</option><option>Solo a Paco Martín</option></select></label>
        <label class="f" for="nt">Título<input type="text" id="nt" value="Reunión de entrenadores"></label>
        <label class="f" for="nb">Mensaje<textarea id="nb">El jueves 29 a las 20:30 en la sede. Hablaremos del torneo de Navidad.</textarea></label>
        <label class="toggle" for="nr"><input type="checkbox" id="nr" checked> <span>Pedir “Entendido”</span></label>
        <button type="submit" class="btn gold block">${ic('send')} Enviar aviso</button></form>`,
      bind() { $('#nf').onsubmit = e => { e.preventDefault();
        S.notices.unshift({ id: Date.now(), from: 'Junta directiva', title: $('#nt').value || 'Aviso', body: $('#nb').value, read: false, readBy: 0, total: 24 });
        go('msg'); say('Aviso enviado. Verás quién lo ha leído.'); }; }
    };
  },
  msg() {
    return {
      kicker: 'Comunicación', title: 'Avisos enviados', layout: 'narrow',
      body: card('h-env', 'Quién los ha leído', S.notices.map(n => `<div class="rq"><span class="ic b">${ic('bell')}</span>
        <div class="grow"><b>${esc(n.title)}</b><small>${esc(n.body)}</small><div class="meter" role="img" aria-label="Leído por ${n.readBy} de ${n.total}"><i style="width:${n.readBy / n.total * 100}%"></i></div></div>
        <span class="pill ${n.readBy === n.total ? '' : 'blue'}">${n.readBy} de ${n.total}</span></div>`).join(''))
    };
  }
};

function bindGo() {
  document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { const [t, s] = b.dataset.go.split(':'); go(t, s || null); });
  document.querySelectorAll('[data-team-go]').forEach(b => b.onclick = () => { S.team = b.dataset.teamGo; go('team', 'list'); });
}

document.addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) go(b.dataset.tab); });
function setRole(r) {
  S.role = r; $('#role-coach').setAttribute('aria-pressed', r === 'coach'); $('#role-board').setAttribute('aria-pressed', r === 'board'); go('home');
}
$('#role-coach').onclick = () => setRole('coach');
$('#role-board').onclick = () => setRole('board');
$('#bigtext').onchange = e => { document.documentElement.classList.toggle('big', e.target.checked); try { localStorage.setItem('big', e.target.checked ? '1' : ''); } catch (_) {} };
try { if (localStorage.getItem('big')) { $('#bigtext').checked = true; document.documentElement.classList.add('big'); } } catch (_) {}
load();
render();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
