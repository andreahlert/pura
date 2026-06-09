// Build-time relation engine. No DOM, no IO here (caller passes file contents) so
// it is unit-testable. Two signals:
//   relatedBlocks  — exact: blocks whose HTML contains the component's <pura-slug>.
//   relatedComponents — co-occurrence in blocks, rarity-weighted (PMI-style) so
//     ubiquitous components (button/badge/inspector) do not flood every page.

// blocks: [{ slug, title, html }]. slugs: iterable of known component slugs.
// Returns Map<componentSlug, Set<blockIndex>>.
export function scanBlocks(blocks, slugs) {
  const map = new Map();
  for (const slug of slugs) map.set(slug, new Set());
  blocks.forEach((b, i) => {
    for (const slug of slugs) {
      // Lookahead on the tag end so `pura-card` never matches `pura-card-x`, and
      // the leading `<` keeps `--pura-*` CSS tokens out.
      const re = new RegExp(`<pura-${slug}(?=[\\s/>])`);
      if (re.test(b.html)) map.get(slug).add(i);
    }
  });
  return map;
}

// titles: Map<slug, title>. Returns { relatedBlocks, relatedComponents } where
// each is Map<slug, Array>. relatedComponents capped to `limit`.
export function computeRelations(blocks, slugs, titles, limit = 6) {
  const slugList = [...slugs];
  const presence = scanBlocks(blocks, slugList);
  const N = blocks.length;
  const df = (s) => presence.get(s).size;

  const relatedBlocks = new Map();
  const relatedComponents = new Map();

  for (const a of slugList) {
    const inA = presence.get(a);
    relatedBlocks.set(
      a,
      [...inA].map((i) => ({ slug: blocks[i].slug, title: blocks[i].title }))
    );

    if (inA.size === 0) { relatedComponents.set(a, []); continue; }

    const scored = [];
    for (const b of slugList) {
      if (b === a) continue;
      const inB = presence.get(b);
      if (inB.size === 0) continue;
      let co = 0;
      for (const i of inA) if (inB.has(i)) co++;
      if (!co) continue;
      // Each shared block weighted by the partner's inverse doc frequency: a
      // common partner contributes little, a rare partner a lot.
      const score = co * Math.log(N / df(b));
      scored.push({ slug: b, title: titles.get(b) || b, score, df: df(b) });
    }
    scored.sort((x, y) => y.score - x.score || x.df - y.df || x.title.localeCompare(y.title));
    relatedComponents.set(a, scored.slice(0, limit).map(({ slug, title }) => ({ slug, title })));
  }
  return { relatedBlocks, relatedComponents };
}
