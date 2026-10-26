const I = {
  home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  team: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><circle cx="17" cy="9" r="2.6"/><path d="M16.5 14.6c2.7.2 4.4 1.9 5 4.9"/>',
  plus: '<circle cx="12" cy="12" r="9.5"/><path d="M12 7.5v9M7.5 12h9"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  box: '<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9"/>',
  wrench: '<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 1-2-2z"/><path d="M14.5 6.5L17 4"/>',
  talk: '<path d="M4 6h16v10h-6l-4 4v-4H4z"/><path d="M8 10h8M8 13h5"/>',
  camera: '<path d="M4 8h3l2-2.5h6L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>',
  cal: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
  send: '<path d="M4 12l16-8-6 16-2.5-6.5z"/>',
  inbox: '<path d="M3.5 13l2.5-8h12l2.5 8v6h-17z"/><path d="M3.5 13H9l1 2h4l1-2h5.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
};
const ic = (n, label) => `<svg class="i" viewBox="0 0 24 24" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}>${I[n]}</svg>`;

const STATES = ['Enviada', 'Vista', 'En marcha', 'Resuelta'];
const S = {
  role: 'coach', tab: 'home', sub: null,
  coach: 'Paco', team: 'Alevín A',
  teams: {
    'Alevín A': { next: { h: '18:00', what: 'Entrenamiento', where: 'Campo 2 · Hoy, lunes' },
      players: ['Lucas Romero', 'Hugo Sanz', 'Martín Gil', 'Pablo Ortega', 'Daniel Ruiz', 'Álvaro Vidal', 'Leo Navarro', 'Mateo Cano', 'Izan Molina', 'Adrián Prieto', 'Marcos León', 'Bruno Díez'] },
    'Infantil B': { next: { h: '19:30', what: 'Entrenamiento', where: 'Campo 1 · Hoy, lunes' },
      players: ['Sara Blanco', 'Nerea Gómez', 'Lucía Pastor', 'Carla Ibáñez', 'Alba Rubio', 'Irene Moya', 'Paula Crespo', 'Vega Herrero', 'Noa Garrido', 'Elena Soler'] }
  },
  attend: {},
  cal: [
    { d: 'Lun 26', h: '18:00', t: 'Entrenamiento', w: 'Campo 2' },
    { d: 'Mié 28', h: '18:00', t: 'Entrenamiento', w: 'Campo 2' },
    { d: 'Sáb 31', h: '10:30', t: 'Partido vs. CD Las Eras', w: 'Fuera · Polideportivo Norte' }
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

function say(msg, undo) {
  $('#live').textContent = msg;
  const t = $('#toast');
  t.innerHTML = `${ic('check')}<span>${esc(msg)}</span>${undo ? '<button type="button" id="undo">Deshacer</button>' : ''}`;
  t.hidden = false;
  clearTimeout(say.tm);
  say.tm = setTimeout(() => (t.hidden = true), 4500);
  if (undo) $('#undo').onclick = () => { undo(); t.hidden = true; render(); };
}

function tabsFor() {
  const unread = S.notices.filter(n => !n.read).length;
  const open = S.requests.filter(r => r.st < 3).length;
  return S.role === 'coach'
    ? [['home', 'Inicio', 'home'], ['team', 'Mi equipo', 'team'], ['ask', 'Pedir o avisar', 'plus', 'center'], ['msg', 'Mensajes', 'chat', '', unread]]
    : [['home', 'Bandeja', 'inbox', '', open], ['team', 'Equipos', 'team'], ['ask', 'Enviar aviso', 'send', 'center'], ['msg', 'Mensajes', 'chat']];
}

function go(tab, sub = null) { S.tab = tab; S.sub = sub; if (tab !== 'ask') S.draft = null; render(true); }

function render(focus) {
  save();
  $('#tabs').innerHTML = tabsFor().map(([k, l, i, cls, n]) =>
    `<li><button type="button" class="${cls || ''}" data-tab="${k}" ${S.tab === k ? 'aria-current="page"' : ''}>${ic(i)}<span>${l}</span>${n ? `<span class="badge" aria-label="${n} pendientes">${n}</span>` : ''}</button></li>`).join('');
  const v = (S.role === 'coach' ? COACH : BOARD)[S.tab]();
  $('#top').innerHTML = (v.back ? `<button type="button" class="back" data-back>${ic('back')} Volver</button>` : '') +
    `<div class="crest"><i aria-hidden="true"></i> CD Aznalcóllar · ${S.role === 'coach' ? 'Entrenadores' : 'Junta directiva'}</div>
     <h1 id="title">${v.title}</h1>${v.sub ? `<p>${v.sub}</p>` : ''}`;
  $('#main').innerHTML = v.body;
  v.bind && v.bind();
  if (v.back) $('[data-back]').onclick = v.back;
  if (focus) { $('#title').setAttribute('tabindex', '-1'); $('#title').focus({ preventScroll: true }); window.scrollTo(0, 0); }
}

function trackHTML(r) {
  return `<div class="track" aria-hidden="true">${STATES.map((_, i) => `<span class="${i <= r.st ? 'on' : ''}"></span>`).join('')}</div>`;
}
function stPill(r) {
  const cls = r.st === 3 ? 'ok' : r.st === 0 ? 'info' : 'warn';
  return `<span class="pill ${cls}">${STATES[r.st]}</span>`;
}
const kindIco = k => k === 'roto' ? 'wrench' : k === 'material' ? 'box' : 'talk';
const kindName = k => k === 'roto' ? 'Algo roto' : k === 'material' ? 'Material' : 'Otra petición';

/* ---------- ENTRENADOR ---------- */
const COACH = {
  home() {
    const t = S.teams[S.team];
    const mine = S.requests.filter(r => r.by === S.coach);
    const unread = S.notices.filter(n => !n.read);
    return {
      title: `Hola, ${S.coach}`, sub: `Entrenas a ${Object.keys(S.teams).join(' e ')}`,
      body: `
      <section aria-labelledby="h-today">
        <h2 id="h-today">Hoy</h2>
        <div class="card today"><span class="time">${t.next.h}</span><strong>${t.next.what} · ${S.team}</strong><span class="muted">${t.next.where}</span></div>
      </section>
      <section aria-labelledby="h-do">
        <h2 id="h-do">¿Qué quieres hacer?</h2>
        <div class="big-actions">
          <button type="button" class="btn" data-go="team:list"><span class="ico">${ic('list')}</span><span>Pasar lista<small>Marca quién ha venido hoy</small></span></button>
          <button type="button" class="btn" data-go="ask:material"><span class="ico">${ic('box')}</span><span>Pedir algo a la junta<small>Material, horarios, lo que necesites</small></span></button>
          <button type="button" class="btn" data-go="ask:roto"><span class="ico">${ic('wrench')}</span><span>Avisar de algo roto<small>Con una foto, en tres pasos</small></span></button>
        </div>
      </section>
      ${unread.length ? `<section aria-labelledby="h-new"><h2 id="h-new">Avisos nuevos</h2>
        <button type="button" class="btn unread" data-go="msg"><span class="ico">${ic('bell')}</span><span>${esc(unread[0].title)}<small>De ${esc(unread[0].from)} · toca para leer</small></span></button></section>` : ''}
      <section aria-labelledby="h-req">
        <h2 id="h-req">Mis peticiones</h2>
        <div class="stack">${mine.length ? mine.map(r => `
          <div class="card req">
            <div class="req-head"><strong>${esc(r.title)}</strong>${stPill(r)}</div>
            ${trackHTML(r)}
            <span class="muted">${kindName(r.kind)} · ${r.when} · Paso ${r.st + 1} de 4: ${STATES[r.st]}</span>
          </div>`).join('') : '<p class="muted">No tienes peticiones abiertas.</p>'}</div>
      </section>`,
      bind: bindGo
    };
  },
  team() {
    const t = S.teams[S.team];
    const sub = S.sub || 'list';
    const key = `${S.team} ${today()}`;
    const a = S.attend[key] || (S.attend[key] = new Set());
    const teamChips = `<div class="chips" role="group" aria-label="Equipo">${Object.keys(S.teams).map(n =>
      `<button type="button" class="chip" data-team="${n}" aria-pressed="${n === S.team}">${n}</button>`).join('')}</div>`;
    const views = `<div class="seg" role="group" aria-label="Vista" style="align-self:flex-start">
      ${[['list', 'Pasar lista'], ['roster', 'Plantilla'], ['cal', 'Calendario']].map(([k, l]) =>
        `<button type="button" data-sub="${k}" aria-pressed="${sub === k}">${l}</button>`).join('')}</div>`;
    let body = '';
    if (sub === 'list') body = `
      <div class="card" style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap">
        <span>Han venido <span class="count" id="cnt">${a.size} de ${t.players.length}</span></span>
        <button type="button" class="chip" id="all">Marcar a todos</button>
      </div>
      <p class="muted" style="margin:0">Toca a cada jugador que ha venido. Se guarda solo.</p>
      <ul class="roster">${t.players.map((p, i) => `<li><button type="button" class="player" data-p="${i}" aria-pressed="${a.has(i)}">
        <span class="num">${i + 1}</span><span class="name">${p}</span><span class="state">${a.has(i) ? ic('check') + ' Ha venido' : 'No marcado'}</span></button></li>`).join('')}</ul>`;
    if (sub === 'roster') body = `<ul class="roster">${t.players.map((p, i) => `<li class="card row" style="align-items:center">
        <span class="player" style="border:0;padding:0;min-height:0;background:none;cursor:default"><span class="num">${i + 1}</span></span>
        <div class="grow"><strong>${p}</strong><br><span class="muted">Familia: 6${String(10 + i * 7).padStart(2, '0')} 45${String(20 + i).padStart(2, '0')} 1${i}</span></div></li>`).join('')}</ul>`;
    if (sub === 'cal') body = `<div class="stack">${S.cal.map(c => `<div class="card today"><span class="time" style="font-size:1.6rem">${c.h}</span>
        <strong>${c.t}</strong><span class="muted">${c.d} · ${c.w}</span></div>`).join('')}</div>`;
    return {
      title: 'Mi equipo', sub: `${S.team} · ${t.players.length} jugadores`,
      body: `${teamChips}${views}${body}`,
      bind() {
        document.querySelectorAll('[data-team]').forEach(b => b.onclick = () => { S.team = b.dataset.team; render(); });
        document.querySelectorAll('[data-sub]').forEach(b => b.onclick = () => { S.sub = b.dataset.sub; render(); });
        document.querySelectorAll('[data-p]').forEach(b => b.onclick = () => {
          const i = +b.dataset.p; a.has(i) ? a.delete(i) : a.add(i);
          b.setAttribute('aria-pressed', a.has(i));
          b.querySelector('.state').innerHTML = a.has(i) ? ic('check') + ' Ha venido' : 'No marcado';
          $('#cnt').textContent = `${a.size} de ${t.players.length}`;
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
    const stepper = `<p class="steps" aria-label="Paso ${d.step} de 3"><b>${d.step}</b> de 3 · ${['¿Qué necesitas?', 'Cuéntanos', 'Revisa y envía'][d.step - 1]}</p>`;
    const back = d.step > 1 && d.step < 4 ? () => { d.step--; render(true); } : null;
    if (d.step === 1) return {
      title: 'Pedir o avisar', sub: 'La junta lo recibe al momento', back,
      body: `${stepper}<div class="choice">
        <button type="button" class="btn" data-k="material"><span class="ico">${ic('box')}</span><span>Pedir material<small>Balones, petos, conos, botiquín…</small></span></button>
        <button type="button" class="btn" data-k="roto"><span class="ico">${ic('wrench')}</span><span>Avisar de algo roto<small>Porterías, luces, vestuarios…</small></span></button>
        <button type="button" class="btn" data-k="otra"><span class="ico">${ic('talk')}</span><span>Otra cosa<small>Horarios, campos, dudas, propuestas</small></span></button></div>`,
      bind() { document.querySelectorAll('[data-k]').forEach(b => b.onclick = () => { d.kind = b.dataset.k; d.step = 2; render(true); }); }
    };
    if (d.step === 2) return {
      title: kindName(d.kind), sub: S.team, back,
      body: `${stepper}<form id="f" class="stack" novalidate>
        <label class="f" for="t">${d.kind === 'roto' ? '¿Qué se ha roto?' : d.kind === 'material' ? '¿Qué necesitas?' : '¿Qué quieres decir a la junta?'}
          <span class="hint">Con una frase basta. También puedes dictarlo con el micrófono del teclado ${ic('mic')}</span>
          <textarea id="t" required>${esc(d.text)}</textarea></label>
        ${d.kind === 'roto' ? `<label class="f" for="w">¿Dónde está?
          <select id="w">${['', 'Campo 1', 'Campo 2', 'Vestuario 1', 'Vestuario 2', 'Vestuario 3', 'Almacén', 'Otro sitio'].map(o => `<option ${d.where === o ? 'selected' : ''} value="${o}">${o || 'Elige un sitio'}</option>`).join('')}</select></label>
          <label class="photo" for="ph">${d.photo ? `<img src="${d.photo}" alt="Foto adjunta">` : `<span class="ico">${ic('camera')}</span>`}
          <span>${d.photo ? 'Foto añadida · toca para cambiarla' : 'Añadir una foto (opcional)'}</span></label>
          <input type="file" id="ph" accept="image/*" class="sr">` : ''}
        <label class="toggle" for="u"><input type="checkbox" id="u" ${d.urgent ? 'checked' : ''}> Es urgente</label>
        <p id="err" class="pill bad" hidden>Escribe al menos unas palabras para poder seguir.</p>
        <button class="btn primary" type="submit">Siguiente</button></form>`,
      bind() {
        const ph = $('#ph');
        if (ph) ph.onchange = () => { const f = ph.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { d.photo = r.result; sync(); render(); }; r.readAsDataURL(f); };
        const sync = () => { d.text = $('#t').value.trim(); d.urgent = $('#u').checked; if ($('#w')) d.where = $('#w').value; };
        $('#f').onsubmit = e => { e.preventDefault(); sync(); if (!d.text) { $('#err').hidden = false; $('#t').focus(); return; } d.step = 3; render(true); };
      }
    };
    if (d.step === 3) return {
      title: 'Revisa y envía', sub: 'Así lo verá la junta', back,
      body: `${stepper}<div class="card stack">
        <div class="row"><span class="thumb">${ic(kindIco(d.kind))}</span><div class="grow"><strong>${esc(d.text)}</strong><br>
        <span class="muted">${kindName(d.kind)} · ${S.team}${d.where ? ' · ' + esc(d.where) : ''}</span></div></div>
        ${d.photo ? `<img src="${d.photo}" alt="Foto adjunta" style="border-radius:12px;max-height:200px;object-fit:cover">` : ''}
        ${d.urgent ? '<span class="pill bad">Urgente</span>' : ''}</div>
        <button type="button" class="btn gold" id="send">${ic('send')} Enviar a la junta</button>`,
      bind() {
        $('#send').onclick = () => {
          S.requests.unshift({ id: Date.now(), kind: d.kind, title: d.text, where: d.where, team: S.team, by: S.coach, st: 0, when: 'Ahora', urgent: d.urgent });
          d.step = 4; render(true);
        };
      }
    };
    return {
      title: '¡Enviado!', sub: 'La junta ya lo tiene',
      body: `<div class="done"><span class="big-check">${ic('check')}</span>
        <p style="font-size:1.15rem;margin:0"><strong>Tu petición ha llegado a la junta.</strong></p>
        <p class="muted" style="margin:0">Verás cómo avanza en Inicio, en “Mis peticiones”. Te avisaremos cuando esté resuelta.</p></div>
        <button type="button" class="btn primary" data-go="home">Volver al inicio</button>`,
      bind() { S.draft = null; bindGo(); }
    };
  },
  msg() {
    return {
      title: 'Mensajes', sub: 'Avisos del club y conversaciones con la junta',
      body: `<div class="stack">${S.notices.map(n => `
        <article class="card stack ${n.read ? '' : 'unread'}" aria-labelledby="n${n.id}">
          <div class="req-head"><strong id="n${n.id}">${esc(n.title)}</strong>${n.read ? '<span class="pill ok">Leído</span>' : '<span class="pill warn">Nuevo</span>'}</div>
          <p style="margin:0">${esc(n.body)}</p><span class="muted">De ${esc(n.from)}</span>
          ${n.read ? '' : `<button type="button" class="btn primary" data-read="${n.id}" style="min-height:56px">${ic('check')} Entendido</button>`}
        </article>`).join('')}</div>`,
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
      title: 'Bandeja de la junta', sub: 'Lo que piden y avisan los entrenadores',
      body: `<div class="stats">
          <div class="stat"><b>${open.length}</b><span>Abiertas</span></div>
          <div class="stat"><b>${open.filter(r => r.urgent).length}</b><span>Urgentes</span></div>
          <div class="stat"><b>${S.requests.filter(r => r.st === 0).length}</b><span>Sin ver</span></div></div>
        <section aria-labelledby="h-in"><h2 id="h-in">Peticiones y avisos</h2><div class="stack">${order.map(r => `
          <article class="card stack" aria-labelledby="r${r.id}">
            <div class="row"><span class="thumb">${ic(kindIco(r.kind))}</span>
              <div class="grow"><div class="req-head"><strong id="r${r.id}">${esc(r.title)}</strong>${r.urgent && r.st < 3 ? '<span class="pill bad">Urgente</span>' : ''}</div>
              <span class="muted">${r.by} · ${r.team}${r.where ? ' · ' + esc(r.where) : ''} · ${r.when}</span></div></div>
            ${trackHTML(r)}
            <label class="f" for="s${r.id}"><span class="hint">Estado</span>
              <select id="s${r.id}" data-st="${r.id}">${STATES.map((s, i) => `<option value="${i}" ${i === r.st ? 'selected' : ''}>${s}</option>`).join('')}</select></label>
          </article>`).join('')}</div></section>`,
      bind() { document.querySelectorAll('[data-st]').forEach(s => s.onchange = () => {
        const r = S.requests.find(x => x.id == s.dataset.st); const prev = r.st; r.st = +s.value; render();
        say(`“${r.title}” pasa a ${STATES[r.st]}. ${r.by} lo verá en su móvil.`, () => { r.st = prev; }); }); }
    };
  },
  team() {
    const rows = [['Alevín A', 'Paco Martín', 12, 86], ['Infantil B', 'Paco Martín', 10, 91], ['Cadete A', 'Raquel Torres', 16, 78], ['Benjamín C', 'Manolo Fuentes', 11, 94], ['Juvenil A', 'Iker Domínguez', 18, 72]];
    return {
      title: 'Equipos', sub: `${rows.length} equipos · asistencia del último mes`,
      body: `<div class="stack">${rows.map(([t, c, n, p]) => `<div class="card row" style="align-items:center">
        <span class="thumb">${ic('team')}</span><div class="grow"><strong>${t}</strong><br><span class="muted">${c} · ${n} jugadores</span></div>
        <span class="pill ${p >= 85 ? 'ok' : p >= 75 ? 'warn' : 'bad'}">${p}% asistencia</span></div>`).join('')}</div>`
    };
  },
  ask() {
    return {
      title: 'Enviar aviso', sub: 'Llega al móvil de los entrenadores',
      body: `<form id="nf" class="stack" novalidate>
        <label class="f" for="to">¿A quién?<select id="to"><option>Todos los entrenadores (24)</option><option>Fútbol base (14)</option><option>Categoría alevín (4)</option><option>Solo a Paco Martín</option></select></label>
        <label class="f" for="nt">Título<input type="text" id="nt" value="Reunión de entrenadores"></label>
        <label class="f" for="nb">Mensaje<textarea id="nb">El jueves 29 a las 20:30 en la sede. Hablaremos del torneo de Navidad.</textarea></label>
        <label class="toggle" for="nr"><input type="checkbox" id="nr" checked> Pedir que confirmen “Entendido”</label>
        <button type="submit" class="btn gold">${ic('send')} Enviar aviso</button></form>`,
      bind() { $('#nf').onsubmit = e => { e.preventDefault();
        S.notices.unshift({ id: Date.now(), from: 'Junta directiva', title: $('#nt').value || 'Aviso', body: $('#nb').value, read: false, readBy: 0, total: 24 });
        go('msg'); say('Aviso enviado. Verás quién lo ha leído.'); }; }
    };
  },
  msg() {
    return {
      title: 'Avisos enviados', sub: 'Quién los ha leído',
      body: `<div class="stack">${S.notices.map(n => `<article class="card stack">
        <div class="req-head"><strong>${esc(n.title)}</strong><span class="pill ${n.readBy === n.total ? 'ok' : 'info'}">${n.readBy} de ${n.total} leído</span></div>
        <div class="track" style="grid-template-columns:1fr" aria-hidden="true"><span style="background:linear-gradient(90deg,var(--ok) ${n.readBy / n.total * 100}%,var(--line) 0)"></span></div>
        <p style="margin:0" class="muted">${esc(n.body)}</p></article>`).join('')}</div>`
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
