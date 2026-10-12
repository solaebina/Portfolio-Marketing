/* ============================================================================
   Draws a case study from content/works.js into case.html.
   ========================================================================== */

(function renderCase() {
  const host = document.getElementById('case');
  if (!host) return;

  const id = new URLSearchParams(location.search).get('id');
  const w  = id ? workById(id) : null;

  if (!w) {
    document.title = 'Not found — ' + (PROFILE.name || 'Portfolio');
    host.innerHTML = `<div class="wrap case-head">
      <h1>That case isn't here.</h1>
      <p class="case-thesis">It may have been renamed, or the link may have lost a piece.
        The full index is a click away.</p>
      <p style="margin-top:2rem"><a class="back" href="index.html"><span>←</span> Back</a></p>
    </div>`;
    return;
  }

  const disc = discOf(w);
  document.title = `${w.title} — ${PROFILE.name || 'Portfolio'}`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && w.thesis) meta.setAttribute('content', w.thesis);

  /* ── blocks ────────────────────────────────────────────────────────────── */
  const paras = v => String(v).split(/\n{2,}/)
    .map(p => `<p>${inline(p.trim())}</p>`).join('');

  function block(b) {
    switch (b.type) {
      case 'text':
        return paras(b.value);

      case 'steps':
        return `<ol class="steps">${
          (b.items || []).map(i => `<li>${inline(i)}</li>`).join('')}</ol>`;

      case 'list':
        return `<ul class="points">${
          (b.items || []).map(i => `<li>${inline(i)}</li>`).join('')}</ul>`;

      case 'stats':
        return `<div class="stats">${(b.items || []).map(s => `
          <div class="stat">
            <div class="stat-value">${esc(s.value)}</div>
            <div class="stat-label">${esc(s.label)}</div>
          </div>`).join('')}</div>`;

      case 'image':
        return `<figure>
          <img src="${esc(b.src)}" alt="${esc(b.alt || b.caption || '')}" loading="lazy">
          ${b.caption ? `<figcaption>${inline(b.caption)}</figcaption>` : ''}
        </figure>`;

      case 'note':
        return `<div class="note">${paras(b.value)}</div>`;

      case 'quote':
        return `<blockquote class="pull"><p>${inline(b.value)}</p>${
          b.cite ? `<cite>${esc(b.cite)}</cite>` : ''}</blockquote>`;

      default:
        return '';
    }
  }

  const sections = (w.sections || []).map(s => `
    <section class="case-section rise">
      <h2 class="case-label">${esc(s.title)}</h2>
      <div class="case-content">${(s.blocks || []).map(block).join('')}</div>
    </section>`).join('');

  /* ── the meta rail ─────────────────────────────────────────────────────── */
  const facts = [
    ['Client',     w.client],
    ['Role',       w.role],
    ['Discipline', disc.label],
    ['Year',       w.year],
    ['Timeline',   w.timeline],
  ].filter(([, v]) => v);

  /* ── what to read next ─────────────────────────────────────────────────── */
  const i    = WORKS.findIndex(x => x.id === w.id);
  const next = WORKS[(i + 1) % WORKS.length];
  const nextHtml = (next && next.id !== w.id) ? `
    <section class="case-next">
      <div class="wrap">
        <a href="${esc(linkFor(next))}">
          <p class="eyebrow">Next case</p>
          <h2>${esc(next.title)}</h2>
        </a>
      </div>
    </section>` : '';

  host.innerHTML = `
    <article class="case">
      <div class="wrap">
        <a class="back" href="index.html"><span>←</span> ${esc(PROFILE.name || 'Home')}</a>

        <header class="case-head">
          <p class="eyebrow" style="margin-bottom:1.25rem">${esc(disc.label || '')}</p>
          <h1>${esc(w.title)}</h1>
          ${w.thesis ? `<p class="case-thesis">${esc(w.thesis)}</p>` : ''}
        </header>

        <dl class="case-meta">
          ${facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
        </dl>

        ${w.hero ? `<figure class="case-hero rise">
          <img src="${esc(w.hero)}" alt="${esc(w.title)}">
        </figure>` : ''}

        <div class="case-body">${sections}</div>

        ${(w.tags || []).length ? `
          <div style="padding-bottom:clamp(3rem,7vw,5rem)">
            <p class="eyebrow" style="margin-bottom:.875rem">Tools &amp; methods</p>
            <ul class="case-tags">${w.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
          </div>` : ''}
      </div>
      ${nextHtml}
    </article>`;
})();
