// Pure render for <pura-bento>. No DOM; safe on server (SSR/DSD) and client.
// Bento-style CSS grid: child cells declare their own footprint with
// `col-span` / `row-span` attributes; the grid auto-flows dense to fill holes.
// Cells enter with a staggered fade/rise keyframe whose per-cell delay is a
// deterministic function of :nth-child index (no JS, no randomness), and lift
// on hover via a plain CSS transition.
//
// SSR / pre-JS: the grid, spans and cell chrome are pure CSS so the layout is
// complete and presentable before any JS runs.
// Reduced motion: the entrance block is gated behind
// @media (prefers-reduced-motion: no-preference), so reduce paints every cell
// directly in its final state (no opacity:0 hold during stagger delays).
import { EMPTY_SHIM } from "../base.js";

// Max number of cells that get an individual nth-child stagger rule; later
// cells share the last delay so very large grids do not bloat the stylesheet.
const STAGGER_RULES = 16;

function intAttr(el, name, fallback, min, max) {
  const n = parseInt(el.getAttribute(name), 10);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
}

export function bentoTemplate(el = EMPTY_SHIM) {
  const cols = intAttr(el, "cols", 3, 1, 8);
  const stagger = intAttr(el, "stagger", 80, 0, 1000);
  const duration = intAttr(el, "duration", 600, 0, 5000);
  const isStatic = el.hasAttribute("static");

  const html = `<div class="grid" part="grid"><slot></slot></div>`;

  // Span rules for cells: col spans up to the column count, row spans up to 4.
  let spans = "";
  for (let s = 2; s <= cols; s++) {
    spans += `::slotted([col-span="${s}"]) { grid-column: span ${s}; }\n`;
  }
  for (let s = 2; s <= 4; s++) {
    spans += `::slotted([row-span="${s}"]) { grid-row: span ${s}; }\n`;
  }

  // Deterministic stagger: delay grows linearly with the cell's child index.
  let entrance = "";
  if (!isStatic) {
    let delays = "";
    for (let i = 1; i <= STAGGER_RULES; i++) {
      delays += `::slotted(:nth-child(${i})) { animation-delay: calc(${i - 1} * var(--pura-bento-stagger, ${stagger}ms)); }\n`;
    }
    delays += `::slotted(:nth-child(n+${STAGGER_RULES + 1})) { animation-delay: calc(${STAGGER_RULES - 1} * var(--pura-bento-stagger, ${stagger}ms)); }\n`;
    entrance = `
    @keyframes pura-bento-in {
      from { opacity: 0; transform: translateY(14px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    /* backwards fill (not both): once the entrance ends, no keyframe stays
       pinned, so the hover transform/transition below can take over. */
    @media (prefers-reduced-motion: no-preference) {
      ::slotted(*) {
        animation: pura-bento-in var(--pura-bento-duration, ${duration}ms) var(--pura-ease-decelerate, cubic-bezier(0.16, 1, 0.3, 1)) backwards;
      }
      ${delays}
    }`;
  }

  const css = `
    :host { display: block; }

    .grid {
      display: grid;
      grid-template-columns: repeat(${cols}, minmax(0, 1fr));
      grid-auto-rows: minmax(var(--pura-bento-row, 9rem), auto);
      grid-auto-flow: dense;
      gap: var(--pura-bento-gap, var(--pura-space-4, 1rem));
    }

    /* default cell chrome: a quiet card the consumer can theme or override */
    ::slotted(*) {
      background: var(--pura-bento-cell-bg, var(--pura-muted, #f4f4f5));
      border: 1px solid var(--pura-bento-border, var(--pura-border, #e4e4e7));
      border-radius: var(--pura-bento-radius, var(--pura-radius-lg, 0.75rem));
      padding: var(--pura-bento-padding, var(--pura-space-4, 1rem));
      overflow: hidden;
      min-width: 0;
      transition:
        transform var(--pura-duration-3, 0.25s) var(--pura-ease, ease),
        box-shadow var(--pura-duration-3, 0.25s) var(--pura-ease, ease),
        border-color var(--pura-duration-3, 0.25s) var(--pura-ease, ease);
    }

    ${spans}

    /* hover highlight: lift the cell and brighten its edge */
    :host(:not([no-hover])) ::slotted(*:hover) {
      transform: translateY(calc(-1 * var(--pura-bento-lift, 4px)));
      border-color: var(--pura-bento-hover-border, var(--pura-border-strong, #a1a1aa));
      box-shadow: var(--pura-bento-hover-shadow, var(--pura-shadow-lg, 0 12px 32px rgba(0, 0, 0, 0.12)));
    }
    ${entrance}

    /* small viewports: collapse to a single column, spans reset */
    @media (max-width: 640px) {
      .grid { grid-template-columns: 1fr; }
      ::slotted([col-span]) { grid-column: auto; }
    }
  `;

  return { html, css };
}
