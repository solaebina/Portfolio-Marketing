/* ============================================================================
   The front door. It is the sitemap block at hero scale — the same navigation
   that closes every other page opens this one.
   ========================================================================== */

(function front() {
  const host = document.querySelector('[data-front]');
  if (!host) return;
  host.innerHTML = sitemapMarkup(true);
})();
