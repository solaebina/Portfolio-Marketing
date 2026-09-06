# Sola Ebina — portfolio

A minimal portfolio. Two pages, one stylesheet, no build step and no
dependencies — open `index.html` in a browser and it runs.

```
index.html          the one page: hero, work index, practice, about, contact
case.html           the template every case study is drawn with
styles.css          everything visual. The whole system is in :root at the top
content.js          shared helpers (escaping, small markdown, the index row)
app.js              page behaviour: sticky header, reveal, the hover preview
case.js             draws a case study from its entry
content/works.js  ← YOUR WRITING LIVES HERE
images/
  work/             case study images
  about.webp        the About illustration
```

Everything you'd normally want to change lives in `content/works.js`. The
HTML files hold layout and almost no copy — your name, email, links and
location come from the `profile` block, and the three disciplines come from
the `disciplines` block.

---

## How a case study is written

This is the part that matters, so it's worth being explicit about it.

Every case runs the same five beats, in this order:

| Section | What goes in it | Length |
|---|---|---|
| **Context** | Where we were standing. The situation before anyone did anything. | 1–2 short paragraphs |
| **Problem** | The sharp version, with no solution in it yet. | One paragraph |
| **Approach** | What you actually did, as numbered moves. | A paragraph + 4–6 steps |
| **Outcome** | The numbers first, then an honest read of what they mean. | Stats + 1–2 paragraphs |
| **Reflection** | What you'd carry forward, or do differently. Say a true thing. | 1–2 paragraphs |

A sixth, **Under the hood**, is optional — only for cases where the machinery
is the interesting part.

Three rules that keep them readable:

1. **Write the `thesis` first.** One sentence containing the whole case. It's
   the hardest field and the one most people will read instead of the case.
   The shape that works: *[who had what problem], so [what you did], and
   [what changed]*.
2. **Put the caveat in a `note` block, not in a footnote.** If a number is a
   projection rather than banked revenue, say so where the number is. Being
   straight about a soft figure is what makes the hard ones believable.
3. **The reflection is not a summary.** It's the thing you learned that the
   client didn't pay for. If it could be swapped into another case without
   changing, it isn't finished.

---

## Adding a case study

Open `content/works.js`, copy an entry, fill it in, save, refresh. There is
nothing to run.

```js
{
  id: 'retention-model',        // the web address. lowercase, dashes.
  discipline: 'data',           // 'data' | 'strategy' | 'social'
  title: 'Churn early-warning model',
  thesis: 'One sentence. The whole case.',
  client: 'Acme',
  role: 'Analytics lead',
  year: '2025',
  timeline: '6 weeks',
  thumb: 'images/work/retention.webp',   // previews the row on hover
  hero:  'images/work/retention-wide.webp',
  tags: ['SQL', 'Forecasting'],
  draft: false,                 // true = hidden from the site
  external: '',                 // set a URL and the row links straight there
  sections: [
    { title: 'Context', blocks: [
      { type: 'text', value: 'A paragraph.\n\nBlank line starts a new one.' },
    ]},
    { title: 'Outcome', blocks: [
      { type: 'stats', items: [{ value: '+38%', label: 'Retention at 90 days' }] },
      { type: 'note',  value: 'A projection, not banked revenue.' },
    ]},
  ],
}
```

Each entry becomes a row on the index and its own page at
`case.html?id=<your-id>`, which you can send to someone directly.

### Block types

| Block | Renders as |
|---|---|
| `{ type: 'text', value }` | Serif paragraphs. Blank line starts a new one. |
| `{ type: 'steps', items }` | A numbered list — use it for the Approach. |
| `{ type: 'list', items }` | A plain dashed list. |
| `{ type: 'stats', items }` | A row of big numbers with labels. |
| `{ type: 'image', src, caption }` | A figure. Breaks wider than the text on large screens. |
| `{ type: 'note', value }` | A rule-marked aside, set apart from the argument. |
| `{ type: 'quote', value, cite }` | A pull quote. |

In `text`, `list` and `steps` you can use `**bold**`, `*italic*`, `` `code` ``
and `[link](https://example.com)`.

### Things that will save you time

- **Commas matter.** Each entry ends with `},` and the file must stay valid
  JavaScript. If the work index goes empty, that's usually a stray comma —
  the browser console will point at the line.
- **`draft: true`** keeps a case off the site so you can write it over a few
  sittings.
- **Images** go in `images/work/`. Roughly 1600px wide is plenty.
- **Order is the order in the file.** The index numbers itself.

---

## Changing the look

The whole visual system is the `:root` block at the top of `styles.css` —
paper, ink, rules, the accent, the type stacks, and the rhythm values
(`--gutter`, `--max`, `--prose`, `--section`). Change a token there and it
propagates.

Dark mode is a second block below it that redefines only the colours, and it
follows the reader's system setting.

Type is deliberately system-only, so nothing is fetched from a CDN and the
page renders instantly offline: a grotesk for the interface and headlines, a
serif for case-study prose because it's the only long read on the site.

---

## Notes

- Motion respects `prefers-reduced-motion`; the hover preview is off entirely
  on touch and reduced-motion.
- The work index is keyboard reachable, and case pages have a skip link.
- Case pages print cleanly — the chrome drops away and sections avoid breaking.
- No build step, no dependencies, nothing fetched from a CDN.
