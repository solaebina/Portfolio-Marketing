/* ============================================================================
   Page behaviour shared by every page: the profile, the header, the reveal.
   The work list and its hover preview live in work.js, where they're used.
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

/* ── the three disciplines, in the header of every inner page ─────────────── */
(function discNav() {
  const nav = document.querySelector('[data-disc-nav]');
  if (!nav) return;

  /* On a discipline page the key is in the URL; on a case page it's the
     discipline that case belongs to. Either way, mark where you are. */
  const q    = new URLSearchParams(location.search);
  const open = q.get('id') && workById(q.get('id'));
  const here = q.get('d') || (open && open.discipline);
  nav.innerHTML = Object.entries(DISCIPLINES).map(([key, d]) =>
    `<a href="${esc(discLink(key))}"${key === here ? ' aria-current="page"' : ''}>${
      esc(d.short || d.label)}</a>`).join('');
})();

/* ── things rise into place once ──────────────────────────────────────────────
   The hiding is switched on from here, not from the stylesheet, so a page that
   never runs this — JS broken, script blocked — shows everything rather than
   nothing. */
(function reveal() {
  const items = document.querySelectorAll('.rise');
  if (!items.length) return;

  const showAll = () => items.forEach(el => el.classList.add('is-in'));
  if (reduced || !('IntersectionObserver' in window)) return showAll();

  document.documentElement.classList.add('reveal-on');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: .05 });
  items.forEach(el => io.observe(el));
})();

/* ── the sitemap block ────────────────────────────────────────────────────────
   Used twice: as the hero on the front page, and as the footer everywhere
   else. Built from the same content the pages are, so a new case appears in
   both on its own.
   ========================================================================== */
function sitemapMarkup(hero) {
  const mail = PROFILE.email ? `mailto:${PROFILE.email}` : '';

  const columns = Object.entries(DISCIPLINES).map(([key, d]) => {
    const cases = worksIn(key);
    return `<div class="smap-col">
      <h2 class="smap-head"><a href="${esc(discLink(key))}">${esc(d.label)}</a></h2>
      <ul>${cases.map(w =>
        `<li><a href="${esc(linkFor(w))}">${esc(w.short || w.title)}</a></li>`).join('')}</ul>
    </div>`;
  }).join('');

  return `
    <div class="smap-main wrap">

      <div class="smap-brand">
        <div class="smap-id">
          ${hero
            ? `<h1 class="smap-mark">${esc(PROFILE.name || '')}</h1>`
            : `<a class="smap-mark" href="index.html">${esc(PROFILE.name || '')}</a>`}
          <p class="smap-line">Exploring analytical creativity</p>
        </div>

        <ul class="smap-meta">
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="m3.5 7.5 8.5 6 8.5-6"/></svg>
            <a href="${esc(mail)}">${esc(PROFILE.email || '')}</a>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 21.5c4.5-5 7-8.4 7-11.5a7 7 0 1 0-14 0c0 3.1 2.5 6.5 7 11.5Z"/><circle cx="12" cy="10" r="2.6"/></svg>
            <span>${esc(PROFILE.location || '')}</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="2.5"/><path d="M7.2 10.3v7M7.2 7v.01M11.6 17.3v-4a2.6 2.6 0 0 1 5.2 0v4"/></svg>
            <a href="${esc(PROFILE.linkedin || '')}" target="_blank" rel="noopener">LinkedIn</a>
          </li>
        </ul>
      </div>

      <nav class="smap-cols" aria-label="${hero ? 'Work' : 'All work'}">
        ${columns}
      </nav>

    </div>

    <div class="smap-base wrap">
      <span>&copy; ${new Date().getFullYear()} ${esc(PROFILE.name || '')}</span>
      ${hero ? '' : '<button class="smap-top" type="button">Back to top &uarr;</button>'}
    </div>`;
}

/* ── as the footer, on every page but the front ───────────────────────────── */
(function renderFooter() {
  const foot = document.querySelector('[data-foot]');
  if (!foot) return;

  foot.innerHTML = sitemapMarkup(false);
  foot.querySelector('.smap-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });
})();
