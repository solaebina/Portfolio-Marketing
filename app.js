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

        <div class="smap-contact">
          <ul class="smap-meta">
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="m3.5 7.5 8.5 6 8.5-6"/></svg>
            <a href="${esc(mail)}">${esc(PROFILE.email || '')}</a>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 21.5c4.5-5 7-8.4 7-11.5a7 7 0 1 0-14 0c0 3.1 2.5 6.5 7 11.5Z"/><circle cx="12" cy="10" r="2.6"/></svg>
            <span>${esc(PROFILE.location || '')}</span>
          </li>
          </ul>

          <ul class="smap-social">
          <li><a href="${esc(PROFILE.linkedin || '')}" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/></svg></a></li>
          <li><a href="${esc(mail)}" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 4h20a2 2 0 0 1 2 2v.35l-12 7.2-12-7.2V6a2 2 0 0 1 2-2Zm-2 4.68V18a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V8.68l-11.49 6.9a1 1 0 0 1-1.02 0L0 8.68Z"/></svg></a></li>
          </ul>
        </div>
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
