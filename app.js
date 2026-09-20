const $ = (s, r = document) => r.querySelector(s);
const main = $('#main'), root = document.documentElement;
try { root.dataset.theme = localStorage.theme || 'dark'; } catch (e) {}

function tex(str) {
  // render $...$ segments with KaTeX, escape the rest
  const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  return str.split(/(\$[^$]+\$)/g).map(p => p.startsWith('$') && p.endsWith('$') && p.length > 1
    ? katex.renderToString(p.slice(1, -1), { throwOnError: false }) : esc(p)).join('');
}

function renderNav(active) {
  $('#nav').innerHTML = `
    <div class="brand"><a href="#/" class="brand"><span class="logo">∑</span>problemset</a><span class="chip">☕ Chai</span></div>
    <div class="links"><button class="theme" id="theme" aria-label="Toggle theme">${root.dataset.theme === 'dark' ? '☾' : '☀'}</button>
    ${Object.entries(TOPICS).map(([k, t]) => `<a href="#/${k}" class="${k === active ? 'active' : ''}">${t.name}</a>`).join('')}
    <a href="#/about" class="${active === 'about' ? 'active' : ''}">About</a></div>`;
  $('#theme').onclick = () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.theme = root.dataset.theme; } catch (e) {}
    renderNav(active);
  };
}

function home() {
  renderNav('');
  root.style.setProperty('--accent', 'var(--accent-nt)');
  main.innerHTML = `<section class="hero"><div class="eyebrow"><i></i>Practice</div>
    <h1>Hand-picked problems.<br><span>Zero fluff.</span></h1>
    <p class="sub">Pick a topic and start solving.</p></section>
    <div class="topics">${Object.entries(TOPICS).map(([k, t]) =>
      `<a class="card" href="#/${k}" style="--c:var(${t.accent})"><b>${t.name}</b><span>${t.sub}</span><em>${t.questions.length} questions →</em></a>`).join('')}</div>`;
}

function about() {
  renderNav('about');
  main.innerHTML = `<section class="hero"><div class="eyebrow"><i></i>About</div><h1>About <span>problemset.</span></h1></section>
    <p class="prose">A small collection of interesting problems, sorted by topic and difficulty. Click any question to reveal its solution. Have a great problem? Send it in and it may end up here.</p>`;
}

function topic(key) {
  const t = TOPICS[key];
  renderNav(key);
  root.style.setProperty('--accent', `var(${t.accent})`);
  let level = 'all', query = '';
  main.innerHTML = `<section class="hero"><a class="back" href="#/">← All topics</a>
    <div class="eyebrow"><i></i>${t.name}</div>
    <h1>${t.name}<br><span>${t.lead}</span></h1><p class="sub">${t.sub}</p>
    <div class="stat">${t.questions.length}<small>questions</small></div></section>
    <div class="tools"><label class="search">⌕<input id="q" placeholder="Search questions..."></label>
    <div class="seg">${['all', 'easy', 'medium', 'hard'].map(l => `<button data-l="${l}" class="${l === 'all' ? 'on' : ''}">${l[0].toUpperCase() + l.slice(1)}</button>`).join('')}</div></div>
    <div id="list"></div>`;
  const draw = () => {
    const rows = t.questions.map((q, i) => ({ q, i })).filter(({ q }) =>
      (level === 'all' || q.level === level) && q.text.toLowerCase().includes(query));
    $('#list').innerHTML = rows.length ? rows.map(({ q, i }) => `
      <div class="q-item ${q.level}"><div class="q-row"><span class="q-index">${String(i + 1).padStart(2, '0')}</span>
      <div class="q-body"><div class="q-text">${tex(q.text)}</div>
      <div class="meta"><span class="dots"><i></i><i></i><i></i></span><span class="lvl">${q.level}</span>
      ${q.video ? '<span class="btn">▶ Video</span>' : ''}${q.image ? '<span class="btn">▣ Image</span>' : ''}<button class="btn share">⤴ Share</button></div></div>
      <span class="caret">▼</span></div>
      <div class="sol"><h4>SOLUTION</h4><p>${q.solution ? tex(q.solution) : 'No solution provided yet.'}</p></div></div>`).join('')
      : '<div class="empty">No questions match.</div>';
    document.querySelectorAll('.q-item').forEach(el => el.onclick = e => {
      if (e.target.closest('.sol')) return;
      if (e.target.closest('.share')) { try { navigator.clipboard.writeText(location.href); } catch (_) {} e.target.textContent = '✓ Copied'; return; }
      el.classList.toggle('open');
    });
  };
  $('#q').oninput = e => { query = e.target.value.toLowerCase(); draw(); };
  document.querySelectorAll('.seg button').forEach(b => b.onclick = () => {
    level = b.dataset.l; document.querySelectorAll('.seg button').forEach(x => x.classList.toggle('on', x === b)); draw();
  });
  draw();
}

function route() {
  const k = location.hash.replace(/^#\/?/, '');
  if (TOPICS[k]) topic(k); else if (k === 'about') about(); else home();
  scrollTo(0, 0);
}
addEventListener('hashchange', route);
route();
