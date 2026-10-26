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
  whistle: '<circle cx="9" cy="14" r="5"/><path d="M12.5 10.5L20 6v4l-5 2"/>'
};
const ic = n => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${I[n]}</svg>`;

const STATES = ['Enviada', 'Vista', 'En marcha', 'Resuelta'];
const S = {
  role: 'coach', tab: 'home', sub: null,
  coach: 'Paco', team: 'Alevín A',
  teams: {
    'Alevín A': { cat: 'Alevín · F7', next: { h: '18:00', what: 'Entrenamiento', where: 'Campo 2' },
      match: { rival: 'CD Las Eras', day: 'Sábado 31', h: '10:30', where: 'Polideportivo Norte', home: false },
      players: ['Lucas Romero', 'Hugo Sanz', 'Martín Gil', 'Pablo Ortega', 'Daniel Ruiz', 'Álvaro Vidal', 'Leo Navarro', 'Mateo Cano', 'Izan Molina', 'Adrián Prieto', 'Marcos León', 'Bruno Díez'] },
    'Infantil B': { cat: 'Infantil · F11', next: { h: '19:30', what: 'Entrenamiento', where: 'Campo 1' },
      match: { rival: 'UD Gerena', day: 'Domingo 1', h: '12:00', where: 'Campo municipal', home: true },
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

function tabsFor() {
  const unread = S.notices.filter(n => !n.read).length;
  const open = S.requests.filter(r => r.st < 3).length;
  return S.role === 'coach'
    ? [['home', 'Inicio', 'home'], ['team', 'Mi equipo', 'team'], ['ask', 'Pedir o avisar', 'plus', 'center'], ['msg', 'Mensajes', 'chat', '', unread]]
    : [['home', 'Bandeja', 'inbox', '', open], ['team', 'Equipos', 'team'], ['ask', 'Enviar aviso', 'send', 'center'], ['msg', 'Avisos enviados', 'chat']];
}

function go(tab, sub = null) { S.tab = tab; S.sub = sub; if (tab !== 'ask') S.draft = null; render(true); }

function render(focus) {
  save();
  $('#tabs').innerHTML = tabsFor().map(([k, l, i, cls, n]) =>
    `<li><button type="button" class="${cls || ''}" data-tab="${k}" ${S.tab === k ? 'aria-current="page"' : ''}>${ic(i)}<span>${l}</span>${n ? `<span class="badge" aria-label="${n} pendientes">${n}</span>` : ''}</button></li>`).join('');
  const v = (S.role === 'coach' ? COACH : BOARD)[S.tab]();
  const date = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  $('#top').innerHTML = `
    <div class="mast">
      <div class="mast-top"><img src="${CREST}" alt="Escudo del ${CLUB}"><div class="mast-name">${CLUB}<small>Fútbol Base</small></div></div>
      <div class="mast-rule" aria-hidden="true"></div>
      <div class="dateline"><span>${date}</span><span>Temporada 2026/27 · ${S.role === 'coach' ? 'Entrenadores' : 'Junta directiva'}</span></div>
    </div>
    <div class="headline">
      ${v.back ? `<button type="button" class="back" data-back>${ic('back')} Volver</button>` : ''}
      <div class="kicker">${v.kicker}</div>
      <h1 id="title">${v.title}</h1>${v.sub ? `<p>${v.sub}</p>` : ''}
    </div>`;
  $('#main').className = 'pad ' + (v.layout || '');
  $('#main').innerHTML = v.body;
  v.bind && v.bind();
  if (v.back) $('[data-back]').onclick = v.back;
  if (focus) { $('#title').setAttribute('tabindex', '-1'); $('#title').focus({ preventScroll: true }); window.scrollTo(0, 0); }
}

const kindIco = k => k === 'roto' ? 'wrench' : k === 'material' ? 'box' : 'talk';
const kindName = k => k === 'roto' ? 'Algo roto' : k === 'material' ? 'Material' : 'Otra petición';
function stPill(r) {
  if (r.urgent && r.st < 3) return '<span class="pill bad">Urgente</span>';
  return `<span class="pill ${r.st === 3 ? 'ok' : r.st === 0 ? 'info' : 'warn'}">${STATES[r.st]}</span>`;
}
function trackHTML(r) {
  return `<div role="img" aria-label="Estado: ${STATES[r.st]}, paso ${r.st + 1} de 4">
    <div class="track" aria-hidden="true">${STATES.map((_, i) => `<span class="${i <= r.st ? 'on' : ''}"></span>`).join('')}</div>
    <div class="track-lbl" aria-hidden="true">${STATES.map((s, i) => `<span class="${i <= r.st ? 'on' : ''}">${s}</span>`).join('')}</div></div>`;
}
function reqRow(r, extra = '') {
  return `<li><span class="ti">${ic(kindIco(r.kind))}</span>
    <div class="title"><span>${esc(r.title)}</span>${stPill(r)}</div>
    <div class="meta">${S.role === 'board' ? `${r.by} · ${r.team} · ` : ''}${kindName(r.kind)}${r.where ? ' · ' + esc(r.where) : ''} · ${r.when}</div>
    <div class="extra">${trackHTML(r)}${extra}</div></li>`;
}
function panel(title, body, cls = '', action = '') {
  return `<section class="panel ${cls}" aria-label="${title}"><div class="panel-h"><h2>${title}</h2>${action}</div>${body}</section>`;
}
function kpis(list) {
  return `<div class="kpis">${list.map(([l, v, note, cls]) => `<div class="kpi ${cls || ''}"><span class="lbl">${l}</span><span class="val">${v}</span>${note ? `<span class="note">${note}</span>` : ''}</div>`).join('')}</div>`;
}
function matchHTML(team) {
  const m = S.teams[team].match;
  const [wd, d] = m.day.split(' ');
  const us = `<div class="team-line"><img src="${CREST}" alt="">${CLUB}</div>`;
  const them = `<div class="team-line"><span class="rival-badge" aria-hidden="true">${initials(m.rival.replace(/^(CD|UD) /, ''))}</span>${esc(m.rival)}</div>`;
  return `<div class="match">
    <div class="match-date"><span class="m">${wd}</span><span class="d">${d}</span><span class="m">Oct</span></div>
    <div class="versus">${m.home ? us + them : them + us}
      <div class="match-meta"><span class="kick">${m.h}</span><span>${ic('pin')} ${m.home ? 'En casa' : 'Fuera'} · ${esc(m.where)}</span></div></div></div>`;
}

/* ---------- ENTRENADOR ---------- */
const COACH = {
  home() {
    const t = S.teams[S.team];
    const mine = S.requests.filter(r => r.by === S.coach && r.st < 3);
    const unread = S.notices.filter(n => !n.read);
    const a = S.attend[`${S.team} ${today()}`];
    return {
      kicker: 'Panel del entrenador', title: `${greet()}, ${S.coach}`, sub: `Entrenas a ${Object.keys(S.teams).join(' e ')}. Esto es lo que tienes hoy.`,
      body: `
      ${kpis([
        ['Asistencia hoy', `${a ? a.size : 0}<small> / ${t.players.length}</small>`, S.team],
        ['Próximo partido', t.match.h, `${t.match.day} · ${t.match.home ? 'en casa' : 'fuera'}`],
        ['Mis peticiones', mine.length, 'abiertas'],
        ['Avisos', unread.length, 'sin leer', unread.length ? 'alert' : '']
      ])}
      <div class="grid">
        ${panel('Acciones rápidas', `<div class="actions">
          <button type="button" class="act primary" data-go="team:list"><span class="ti">${ic('list')}</span><span><b>Pasar lista</b><small>Marca quién ha venido hoy</small></span><span class="go">${ic('chev')}</span></button>
          <button type="button" class="act" data-go="ask:material"><span class="ti">${ic('box')}</span><span><b>Pedir algo a la junta</b><small>Material, horarios, campos</small></span><span class="go">${ic('chev')}</span></button>
          <button type="button" class="act" data-go="ask:roto"><span class="ti">${ic('wrench')}</span><span><b>Avisar de algo roto</b><small>Con una foto, en tres pasos</small></span><span class="go">${ic('chev')}</span></button>
        </div>`, 'c5')}
        ${panel(`Próximo partido · ${S.team}`, matchHTML(S.team), 'c7 feature')}
        ${panel('Hoy', `<div class="stack">
          <div class="row"><div class="cal-date"><span>Hoy</span><b>${t.next.h.split(':')[0]}h</b></div><div class="grow"><strong>${t.next.what} · ${S.team}</strong><br><span class="muted">${t.next.h} · ${t.next.where}</span></div></div>
          ${unread.length ? `<button type="button" class="act unread" data-go="msg"><span class="ti">${ic('bell')}</span><span><b>${esc(unread[0].title)}</b><small>Aviso de ${esc(unread[0].from)}</small></span><span class="go">${ic('chev')}</span></button>` : ''}
        </div>`, 'c5')}
        ${panel('Mis peticiones', mine.length ? `<ul class="rows">${mine.map(r => reqRow(r)).join('')}</ul>` : '<p class="muted">No tienes peticiones abiertas.</p>', 'c7',
          '<button type="button" class="link" data-go="ask">Nueva</button>')}
      </div>`,
      bind: bindGo
    };
  },
  team() {
    const t = S.teams[S.team];
    const sub = S.sub || 'list';
    const key = `${S.team} ${today()}`;
    const a = S.attend[key] || (S.attend[key] = new Set());
    const pct = () => Math.round(a.size / t.players.length * 100);
    const teamBtns = `<div class="teams" role="group" aria-label="Elige equipo">${Object.keys(S.teams).map(n =>
      `<button type="button" class="team-btn" data-team="${n}" aria-pressed="${n === S.team}">${n}</button>`).join('')}</div>`;
    const views = `<div class="tabs-in" role="group" aria-label="Vista">${[['list', 'Pasar lista'], ['roster', 'Plantilla'], ['cal', 'Calendario']].map(([k, l]) =>
      `<button type="button" data-sub="${k}" aria-pressed="${sub === k}">${l}</button>`).join('')}</div>`;
    let body = '';
    if (sub === 'list') body = panel(`Asistencia · ${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}`, `
      <div class="attend-head"><div><span class="muted">Han venido</span><div class="val" id="cnt">${a.size}<small> / ${t.players.length}</small></div></div>
        <button type="button" class="btn primary inline" id="all">${ic('check')} Marcar a todos</button></div>
      <div class="bar" aria-hidden="true"><i id="bar" style="width:${pct()}%"></i></div>
      <p class="muted">Toca a cada jugador que ha venido. Se guarda solo.</p>
      <ul class="players">${t.players.map((p, i) => `<li><button type="button" class="player" data-p="${i}" aria-pressed="${a.has(i)}">
        <span class="dorsal" aria-hidden="true">${i + 1}</span><span class="pname">${p}</span>
        <span class="pstate">${a.has(i) ? ic('check') + 'Ha venido' : 'Sin marcar'}</span></button></li>`).join('')}</ul>`);
    if (sub === 'roster') body = panel('Plantilla', `<div class="table-wrap"><table class="data"><thead><tr><th>Dorsal</th><th>Jugador</th><th>Contacto familia</th></tr></thead><tbody>
      ${t.players.map((p, i) => `<tr><td class="n">${i + 1}</td><td><strong>${p}</strong></td><td class="muted">6${String(10 + i * 7).padStart(2, '0')} 45${String(20 + i).padStart(2, '0')} 1${i}</td></tr>`).join('')}</tbody></table></div>`);
    if (sub === 'cal') body = panel('Esta semana', `<ul class="rows">${S.cal.map(c => `<li><div class="cal-date" style="grid-row:span 2"><span>${c.wd}</span><b>${c.d}</b></div>
      <div class="title"><span>${c.t}</span></div><div class="meta">${c.h} · ${c.w}</div></li>`).join('')}</ul>`);
    return {
      kicker: 'Mi equipo', title: S.team, sub: `${t.cat} · ${t.players.length} jugadores`,
      body: `${teamBtns}${views}${body}`,
      bind() {
        document.querySelectorAll('[data-team]').forEach(b => b.onclick = () => { S.team = b.dataset.team; render(); });
        document.querySelectorAll('[data-sub]').forEach(b => b.onclick = () => { S.sub = b.dataset.sub; render(); });
        document.querySelectorAll('[data-p]').forEach(b => b.onclick = () => {
          const i = +b.dataset.p; a.has(i) ? a.delete(i) : a.add(i);
          b.setAttribute('aria-pressed', a.has(i));
          b.querySelector('.pstate').innerHTML = a.has(i) ? ic('check') + 'Ha venido' : 'Sin marcar';
          $('#cnt').innerHTML = `${a.size}<small> / ${t.players.length}</small>`; $('#bar').style.width = pct() + '%';
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
    const stepper = `<div><div class="stepper" aria-hidden="true">${[1, 2, 3].map(i => `<span class="${i <= d.step ? 'on' : ''}"></span>`).join('')}</div>
      <p class="step-lbl">Paso ${d.step} de 3 · ${['¿Qué necesitas?', 'Cuéntanos', 'Revisa y envía'][d.step - 1]}</p></div>`;
    const back = d.step > 1 && d.step < 4 ? () => { d.step--; render(true); } : null;
    const base = { kicker: 'Pedir o avisar', layout: 'narrow', back };
    if (d.step === 1) return { ...base,
      title: '¿Qué necesitas?', sub: 'La junta lo recibe al momento y verás cómo avanza.',
      body: `${stepper}<div class="actions">
        <button type="button" class="act" data-k="material"><span class="ti">${ic('box')}</span><span><b>Pedir material</b><small>Balones, petos, conos, botiquín…</small></span><span class="go">${ic('chev')}</span></button>
        <button type="button" class="act" data-k="roto"><span class="ti">${ic('wrench')}</span><span><b>Avisar de algo roto</b><small>Porterías, luces, vestuarios…</small></span><span class="go">${ic('chev')}</span></button>
        <button type="button" class="act" data-k="otra"><span class="ti">${ic('talk')}</span><span><b>Otra cosa</b><small>Horarios, campos, dudas, propuestas</small></span><span class="go">${ic('chev')}</span></button></div>`,
      bind() { document.querySelectorAll('[data-k]').forEach(b => b.onclick = () => { d.kind = b.dataset.k; d.step = 2; render(true); }); }
    };
    if (d.step === 2) return { ...base,
      title: kindName(d.kind), sub: S.team,
      body: `${stepper}<form id="f" class="panel stack" novalidate>
        <label class="f" for="t">${d.kind === 'roto' ? '¿Qué se ha roto?' : d.kind === 'material' ? '¿Qué necesitas?' : '¿Qué quieres decir a la junta?'}
          <span class="hint">${ic('mic')} Con una frase basta. Puedes dictarlo con el micrófono del teclado.</span>
          <textarea id="t" required>${esc(d.text)}</textarea></label>
        ${d.kind === 'roto' ? `<label class="f" for="w">¿Dónde está?
          <select id="w">${['', 'Campo 1', 'Campo 2', 'Vestuario 1', 'Vestuario 2', 'Vestuario 3', 'Almacén', 'Otro sitio'].map(o => `<option ${d.where === o ? 'selected' : ''} value="${o}">${o || 'Elige un sitio'}</option>`).join('')}</select></label>
          <label class="photo" for="ph">${d.photo ? `<img src="${d.photo}" alt="Foto adjunta">` : `<span class="ti">${ic('camera')}</span>`}
          <span>${d.photo ? 'Foto añadida · toca para cambiarla' : 'Añadir una foto (opcional)'}</span></label>
          <input type="file" id="ph" accept="image/*" class="sr">` : ''}
        <label class="toggle" for="u"><input type="checkbox" id="u" ${d.urgent ? 'checked' : ''}> Es urgente</label>
        <p id="err" class="err" role="alert" hidden>Escribe al menos unas palabras para poder seguir.</p>
        <button class="btn primary" type="submit">Siguiente</button></form>`,
      bind() {
        const sync = () => { d.text = $('#t').value.trim(); d.urgent = $('#u').checked; if ($('#w')) d.where = $('#w').value; };
        const ph = $('#ph');
        if (ph) ph.onchange = () => { const f = ph.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { d.photo = r.result; sync(); render(); }; r.readAsDataURL(f); };
        $('#f').onsubmit = e => { e.preventDefault(); sync(); if (!d.text) { $('#err').hidden = false; $('#t').focus(); return; } d.step = 3; render(true); };
      }
    };
    if (d.step === 3) return { ...base,
      title: 'Revisa y envía', sub: 'Así lo verá la junta.',
      body: `${stepper}${panel(kindName(d.kind), `<div class="stack">
        <p style="margin:0;font-size:1.15rem;font-weight:700">${esc(d.text)}</p>
        <p class="muted" style="margin:0">${S.team}${d.where ? ' · ' + esc(d.where) : ''}${d.urgent ? ' · <span class="pill bad">Urgente</span>' : ''}</p>
        ${d.photo ? `<img src="${d.photo}" alt="Foto adjunta" style="border-radius:6px;max-height:240px;width:100%;object-fit:cover">` : ''}</div>`)}
        <button type="button" class="btn primary" id="send">${ic('send')} Enviar a la junta</button>`,
      bind() {
        $('#send').onclick = () => {
          S.requests.unshift({ id: Date.now(), kind: d.kind, title: d.text, where: d.where, team: S.team, by: S.coach, st: 0, when: 'Ahora', urgent: d.urgent });
          d.step = 4; render(true);
        };
      }
    };
    return { ...base, back: null,
      title: 'Enviado a la junta', sub: 'Ya lo tienen. Te avisaremos cuando esté resuelto.',
      body: `<div class="panel done"><span class="ring">${ic('check')}</span>
        <p style="margin:0">Puedes seguir cómo avanza en <strong>Inicio</strong>, en “Mis peticiones”.</p></div>
        <button type="button" class="btn primary" data-go="home">Volver al inicio</button>`,
      bind() { S.draft = null; bindGo(); }
    };
  },
  msg() {
    return {
      kicker: 'Mensajes', title: 'Avisos del club', sub: 'Comunicados de la junta y la coordinación deportiva.', layout: 'narrow',
      body: S.notices.map(n => `<article class="panel stack ${n.read ? '' : 'unread'}" aria-labelledby="n${n.id}">
          <div class="panel-h" style="margin:0"><h2 id="n${n.id}" style="text-transform:none;letter-spacing:0;font-size:1.3rem">${esc(n.title)}</h2>${n.read ? '<span class="pill ok">Leído</span>' : '<span class="pill warn">Nuevo</span>'}</div>
          <p style="margin:0">${esc(n.body)}</p><span class="muted">${esc(n.from)}</span>
          ${n.read ? '' : `<button type="button" class="btn primary" data-read="${n.id}">${ic('check')} Entendido</button>`}
        </article>`).join(''),
      bind() { document.querySelectorAll('[data-read]').forEach(b => b.onclick = () => {
        const n = S.notices.find(x => x.id == b.dataset.read); n.read = true; n.readBy++; render(); say('Marcado como leído. La junta lo verá.'); }); }
    };
  }
};

/* ---------- JUNTA ---------- */
const BOARD = {
  home() {
    const open = S.requests.filter(r => r.st < 3);
    const order = [...S.requests].sort((a, b) => (a.st === 3) - (b.st === 3) || b.urgent - a.urgent || a.st - b.st);
    return {
      kicker: 'Panel de la junta', title: 'Bandeja de entrada', sub: 'Todo lo que piden y avisan los entrenadores, ordenado por urgencia.',
      body: `${kpis([
          ['Abiertas', open.length, 'peticiones'],
          ['Urgentes', open.filter(r => r.urgent).length, 'por atender', open.some(r => r.urgent) ? 'alert' : ''],
          ['Sin ver', S.requests.filter(r => r.st === 0).length, 'nuevas'],
          ['Resueltas', S.requests.filter(r => r.st === 3).length, 'esta temporada']
        ])}
        ${panel('Peticiones y avisos', `<ul class="rows">${order.map(r => reqRow(r, `
            <label class="f" for="s${r.id}" style="max-width:280px"><span class="hint">Cambiar estado</span>
              <select id="s${r.id}" data-st="${r.id}">${STATES.map((s, i) => `<option value="${i}" ${i === r.st ? 'selected' : ''}>${s}</option>`).join('')}</select></label>`)).join('')}</ul>`)}`,
      bind() { document.querySelectorAll('[data-st]').forEach(s => s.onchange = () => {
        const r = S.requests.find(x => x.id == s.dataset.st); const prev = r.st; r.st = +s.value; render();
        say(`“${r.title}” pasa a ${STATES[r.st]}. ${r.by} lo verá en su móvil.`, () => { r.st = prev; }); }); }
    };
  },
  team() {
    const rows = [['Alevín A', 'Paco Martín', 12, 86], ['Infantil B', 'Paco Martín', 10, 91], ['Cadete A', 'Raquel Torres', 16, 78], ['Benjamín C', 'Manolo Fuentes', 11, 94], ['Juvenil A', 'Iker Domínguez', 18, 72]];
    const avg = Math.round(rows.reduce((s, r) => s + r[3], 0) / rows.length);
    return {
      kicker: 'Club', title: 'Equipos', sub: 'Asistencia media del último mes por equipo.',
      body: `${kpis([['Equipos', rows.length], ['Jugadores', rows.reduce((s, r) => s + r[2], 0)], ['Entrenadores', new Set(rows.map(r => r[1])).size], ['Asistencia media', `${avg}<small>%</small>`]])}
        ${panel('Equipos de la temporada', `<div class="table-wrap"><table class="data"><thead><tr><th>Equipo</th><th>Entrenador</th><th>Jugadores</th><th style="min-width:160px">Asistencia</th></tr></thead><tbody>
        ${rows.map(([t, c, n, p]) => `<tr><td><strong>${t}</strong></td><td>${c}</td><td>${n}</td>
          <td><div class="row"><div class="bar grow" aria-hidden="true"><i style="width:${p}%;background:var(${p >= 85 ? '--ok' : p >= 75 ? '--warn' : '--bad'})"></i></div><span class="pill ${p >= 85 ? 'ok' : p >= 75 ? 'warn' : 'bad'}">${p}%</span></div></td></tr>`).join('')}
        </tbody></table></div>`)}`
    };
  },
  ask() {
    return {
      kicker: 'Comunicación', title: 'Enviar un aviso', sub: 'Llega al móvil de los entrenadores y verás quién lo ha leído.', layout: 'narrow',
      body: `<form id="nf" class="panel stack" novalidate>
        <label class="f" for="to">¿A quién?<select id="to"><option>Todos los entrenadores (24)</option><option>Fútbol base (14)</option><option>Categoría alevín (4)</option><option>Solo a Paco Martín</option></select></label>
        <label class="f" for="nt">Título<input type="text" id="nt" value="Reunión de entrenadores"></label>
        <label class="f" for="nb">Mensaje<textarea id="nb">El jueves 29 a las 20:30 en la sede. Hablaremos del torneo de Navidad.</textarea></label>
        <label class="toggle" for="nr"><input type="checkbox" id="nr" checked> Pedir que confirmen “Entendido”</label>
        <button type="submit" class="btn primary">${ic('send')} Enviar aviso</button></form>`,
      bind() { $('#nf').onsubmit = e => { e.preventDefault();
        S.notices.unshift({ id: Date.now(), from: 'Junta directiva', title: $('#nt').value || 'Aviso', body: $('#nb').value, read: false, readBy: 0, total: 24 });
        go('msg'); say('Aviso enviado. Verás quién lo ha leído.'); }; }
    };
  },
  msg() {
    return {
      kicker: 'Comunicación', title: 'Avisos enviados', sub: 'Quién los ha leído.',
      body: panel('Lecturas', `<ul class="rows">${S.notices.map(n => `<li><span class="ti">${ic('bell')}</span>
        <div class="title"><span>${esc(n.title)}</span><span class="pill ${n.readBy === n.total ? 'ok' : 'info'}">${n.readBy} de ${n.total}</span></div>
        <div class="meta">${esc(n.body)}</div>
        <div class="extra"><div class="bar" role="img" aria-label="Leído por ${n.readBy} de ${n.total}"><i style="width:${n.readBy / n.total * 100}%"></i></div></div></li>`).join('')}</ul>`)
    };
  }
};

function bindGo() {
  document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { const [t, s] = b.dataset.go.split(':'); go(t, s || null); });
}

$('#tabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) go(b.dataset.tab); });
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
