/* ============================================================================
   Page behaviour. Three small things: the header rule, the reveal, the peek.
   ========================================================================== */

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

hydrateProfile();

/* ── the header grows a hairline once you've scrolled ─────────────────────── */
(function stickyHead() {
  const head = document.querySelector('.site-head');
  if (!head || head.classList.contains('is-stuck')) return;
  const sync = () => head.classList.toggle('is-stuck', window.scrollY > 8);
  sync();
  addEventListener('scroll', sync, { passive: true });
})();

/* ── things rise into place once ──────────────────────────────────────────── */
(function reveal() {
  const items = document.querySelectorAll('.rise');
  if (!items.length) return;
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: .08 });
  items.forEach(el => io.observe(el));
})();

/* ── the index: build the rows, then let a thumbnail follow the cursor ────── */
(function workIndex() {
  const list = document.querySelector('[data-index]');
  if (!list) return;

  list.innerHTML = WORKS.map(workRow).join('');

  const count = document.querySelector('[data-count]');
  if (count) count.textContent = `${pad(WORKS.length)} projects`;

  if (reduced || !matchMedia('(hover: hover)').matches) return;

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

/* ── the practice list ────────────────────────────────────────────────────── */
(function practice() {
  const host = document.querySelector('[data-practice]');
  if (!host) return;

  host.innerHTML = Object.values(DISCIPLINES).map((d, i) => `
    <div class="practice">
      <span class="practice-num">${pad(i + 1)}</span>
      <h3>${esc(d.label)}</h3>
      <div>
        <p>${esc(d.line)}</p>
        <ul class="skills">${(d.skills || []).map(s => `<li>${esc(s)}</li>`).join('')}</ul>
      </div>
    </div>`).join('');
})();
