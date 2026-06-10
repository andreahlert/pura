// Pure render for <pura-interactive-grid>. No DOM; safe on server (SSR/DSD) and client.
// A background grid of real cells: the client JS lights the cell under the
// pointer (fading trail) and ripples a click wave outward. The server paints
// the full static grid, optionally with a few deterministically pre-lit cells
// that pulse via pure CSS, so the page looks finished before any JS runs.
import { EMPTY_SHIM } from "../base.js";

function clampInt(raw, fallback, min, max) {
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
}

export function interactiveGridTemplate(el = EMPTY_SHIM) {
  const columns = clampInt(el.getAttribute("columns"), 12, 1, 64);
  const rows = clampInt(el.getAttribute("rows"), 8, 1, 64);
  const total = columns * rows;
  const prelit = Math.min(clampInt(el.getAttribute("prelit"), 3, 0, 24), total);

  // Deterministic per-index picks so server and client paint byte-identical
  // pre-lit cells (no Math.random, which would diverge between renders).
  const lit = new Set();
  for (let i = 0; i < prelit; i++) lit.add((i * 137 + 53) % total);

  let cells = "";
  for (let i = 0; i < total; i++) {
    const x = i % columns;
    const y = (i - x) / columns;
    const pre = lit.has(i)
      ? ` prelit" style="--pura-igrid-pulse-delay:${((i * 0.61) % 3).toFixed(2)}s`
      : "";
    cells += `<span class="cell${pre}" part="cell" data-x="${x}" data-y="${y}"></span>`;
  }

  const html =
    `<div class="cells" part="cells" aria-hidden="true" style="--pura-igrid-cols:${columns};--pura-igrid-rows:${rows}">${cells}</div>` +
    `<div class="content" part="content"><slot></slot></div>`;

  return { html, css: INTERACTIVE_GRID_CSS };
}

export const INTERACTIVE_GRID_CSS = `
  :host {
    position: relative;
    display: block;
    overflow: hidden;
    --pura-igrid-line: var(--pura-interactive-grid-line, color-mix(in oklab, var(--pura-fg, #71717a) 14%, transparent));
    --pura-igrid-highlight: var(--pura-interactive-grid-highlight, color-mix(in oklab, var(--pura-primary, #6366f1) 45%, transparent));
    --pura-igrid-soft: var(--pura-interactive-grid-prelit, color-mix(in oklab, var(--pura-primary, #6366f1) 18%, transparent));
  }

  .cells {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(var(--pura-igrid-cols, 12), 1fr);
    grid-template-rows: repeat(var(--pura-igrid-rows, 8), 1fr);
    border-top: 1px solid var(--pura-igrid-line);
    border-left: 1px solid var(--pura-igrid-line);
  }

  .cell {
    border-right: 1px solid var(--pura-igrid-line);
    border-bottom: 1px solid var(--pura-igrid-line);
    background-color: transparent;
    /* The fade-out IS the trail: lighting is instant (.lit below), un-lighting
       eases back over the fade duration, so swept cells linger and dim. */
    transition: background-color var(--pura-interactive-grid-fade, 700ms) ease-out;
  }

  .cell.lit {
    background-color: var(--pura-igrid-highlight);
    transition-duration: 0ms;
  }

  /* Click wave: per-cell animation-delay (set by JS, proportional to distance
     from the clicked cell) staggers one flash keyframe outward. "both" keeps
     cells transparent while they wait for their delay. */
  .cell.wave {
    animation: pura-igrid-wave var(--pura-interactive-grid-wave-duration, 700ms) ease-out both;
    animation-delay: var(--pura-igrid-wave-delay, 0s);
  }

  @keyframes pura-igrid-wave {
    0%   { background-color: transparent; }
    30%  { background-color: var(--pura-interactive-grid-wave, var(--pura-igrid-highlight)); }
    100% { background-color: transparent; }
  }

  /* Pre-lit cells: a slow pure-CSS pulse so the no-JS paint looks alive. */
  @media (prefers-reduced-motion: no-preference) {
    .cell.prelit {
      animation: pura-igrid-pulse var(--pura-interactive-grid-pulse-duration, 4s) ease-in-out infinite alternate;
      animation-delay: var(--pura-igrid-pulse-delay, 0s);
    }
  }

  @keyframes pura-igrid-pulse {
    from { background-color: transparent; }
    to   { background-color: var(--pura-igrid-soft); }
  }

  /* Reduced motion: pre-lit cells hold a steady soft highlight (the pulse's
     final state) and the click wave is dropped entirely. */
  @media (prefers-reduced-motion: reduce) {
    .cell.prelit { background-color: var(--pura-igrid-soft); }
    .cell.wave { animation: none; }
  }

  /* Content layers above the cells but lets pointer events fall through so the
     grid reacts under text. Interactive children must opt back in with
     pointer-events: auto. */
  .content {
    position: relative;
    z-index: 1;
    height: 100%;
    pointer-events: none;
  }
`;
