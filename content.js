/* ============================================================================
   Shared helpers. Reads whatever content/works.js put on window.PORTFOLIO.
   ========================================================================== */

const P           = window.PORTFOLIO || {};
const PROFILE     = P.profile || {};
const DISCIPLINES = P.disciplines || {};

/* drafts are editor-only; they never reach the site */
const WORKS = (P.works || []).filter(w => w && w.id && !w.draft);

const workById = id => WORKS.find(w => w.id === id);
const discOf   = w  => DISCIPLINES[w.discipline] || {};

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

/* A deliberately small amount of markdown: **bold**, *italic*, `code`,
   [text](url). Everything is escaped first. */
function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
      (_, text, url) => `<a href="${url}" target="_blank" rel="noopener">${text}</a>`);
}

/* Where does a row go when clicked? */
const linkFor = w => w.external ? w.external : `case.html?id=${encodeURIComponent(w.id)}`;

const pad = n => String(n).padStart(2, '0');

/* One row of the work index. */
function workRow(w, i) {
  const ext = w.external ? ' target="_blank" rel="noopener"' : '';
  const thumb = w.thumb ? ` data-peek="${esc(w.thumb)}"` : '';
  return `<a class="row" href="${esc(linkFor(w))}"${ext}${thumb}>
    <span class="row-num">${pad(i + 1)}</span>
    <span>
      <span class="row-title">${esc(w.title)}</span>
      ${w.thesis ? `<span class="row-thesis">${esc(w.thesis)}</span>` : ''}
    </span>
    <span class="row-disc">${esc(discOf(w).label || '')}</span>
    <span class="row-year">${esc(w.year || '')}</span>
    <span class="row-go" aria-hidden="true">↗</span>
  </a>`;
}

/* Fill in name, email and links wherever they're marked up. */
function hydrateProfile() {
  document.querySelectorAll('[data-p]').forEach(el => {
    const v = PROFILE[el.dataset.p];
    if (v) el.textContent = v;
  });
  document.querySelectorAll('[data-mailto]').forEach(el => {
    if (PROFILE.email) el.href = `mailto:${PROFILE.email}`;
  });
  document.querySelectorAll('[data-linkedin]').forEach(el => {
    if (PROFILE.linkedin) el.href = PROFILE.linkedin;
  });
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
}
