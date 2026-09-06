/* ============================================================================
   The front door. A name, a line, and the three ways in.
   ========================================================================== */

(function front() {
  const nav = document.querySelector('[data-front-nav]');
  if (!nav) return;

  /* The count is the only number here, and it's true: how many cases are
     waiting behind each door. */
  nav.innerHTML = Object.entries(DISCIPLINES).map(([key, d]) => {
    const n = worksIn(key).length;
    return `<a class="door" href="${esc(discLink(key))}">
      <span class="door-name">${esc(d.label)}</span>
      <span class="door-count">${n} ${n === 1 ? 'case' : 'cases'}</span>
      <span class="door-go" aria-hidden="true">&rarr;</span>
    </a>`;
  }).join('');
})();
