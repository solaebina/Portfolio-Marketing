/* ============================================================================
   One discipline's showcase: what it is, then the cases, and nothing else.
   ========================================================================== */

(function renderWork() {
  const host = document.getElementById('work');
  if (!host) return;

  const key = new URLSearchParams(location.search).get('d');
  const d   = key && DISCIPLINES[key];

  if (!d) {
    document.title = 'Not found — ' + (PROFILE.name || 'Portfolio');
    host.innerHTML = `<div class="wrap work-head">
      <h1>That isn't one of the three.</h1>
      <p class="work-line">Marketing strategy, data &amp; AI, or social media — the front
        door has all of them.</p>
      <p style="margin-top:2rem"><a class="back" href="index.html"><span>&larr;</span> Back</a></p>
    </div>`;
    return;
  }

  document.title = `${d.label} — ${PROFILE.name || 'Portfolio'}`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', d.line);

  const cases = worksIn(key);

  host.innerHTML = `
    <div class="wrap">
      <a class="back" href="index.html"><span>&larr;</span> ${esc(PROFILE.name || 'Home')}</a>

      <header class="work-head">
        <h1>${esc(d.label)}</h1>
        <p class="work-line">${esc(d.line)}</p>
        <ul class="skills">${(d.skills || []).map(s => `<li>${esc(s)}</li>`).join('')}</ul>
      </header>

      <div class="index" data-peek-host>
        ${cases.length
          ? cases.map(workRow).join('')
          : '<p class="work-empty">Nothing published here yet.</p>'}
      </div>
    </div>`;

  /* ── a thumbnail trails the cursor across the list ─────────────────────── */
  const list = host.querySelector('[data-peek-host]');
  if (!list || !cases.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!matchMedia('(hover: hover)').matches) return;

  const peek = document.createElement('div');
  peek.className = 'peek';
  peek.setAttribute('aria-hidden', 'true');
  peek.innerHTML = '<img alt="">';
  document.body.appendChild(peek);
  const img = peek.querySelector('img');

  const GAP = 24;
  let x = 0, y = 0, tx = 0, ty = 0, raf = null, on = false;

  /* Sit beside the cursor rather than under it, so the image never covers the
     title you're reading. Flips to the left when there's no room on the right. */
  const place = (cx, cy) => {
    const w = peek.offsetWidth, h = peek.offsetHeight;
    const right = cx + GAP;
    return [
      right + w > innerWidth - GAP ? Math.max(GAP, cx - GAP - w) : right,
      Math.min(Math.max(GAP, cy - h / 2), innerHeight - h - GAP),
    ];
  };

  const frame = () => {
    // ease toward the target so the image trails rather than snaps
    tx += (x - tx) * .14;
    ty += (y - ty) * .14;
    peek.style.translate = `${Math.round(tx)}px ${Math.round(ty)}px`;
    raf = on ? requestAnimationFrame(frame) : null;
  };

  list.addEventListener('pointermove', (e) => {
    [x, y] = place(e.clientX, e.clientY);
    if (!raf && on) raf = requestAnimationFrame(frame);
  });

  list.addEventListener('pointerover', (e) => {
    const row = e.target.closest('[data-peek]');
    if (!row) return;
    if (img.getAttribute('src') !== row.dataset.peek) img.src = row.dataset.peek;
    const [px, py] = place(e.clientX, e.clientY);
    if (!on) { tx = px; ty = py; }   // appear in place, then trail
    x = px; y = py;
    on = true;
    peek.classList.add('is-on');
    if (!raf) raf = requestAnimationFrame(frame);
  });

  const off = (e) => {
    if (e && e.relatedTarget && list.contains(e.relatedTarget)) return;
    on = false;
    peek.classList.remove('is-on');
  };
  list.addEventListener('pointerout', off);
  list.addEventListener('pointerleave', off);
})();
