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
