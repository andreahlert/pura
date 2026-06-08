// Pure render(s) for <stat-grid> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function statGridTemplate(el = EMPTY_SHIM) {
  const html = `<div part="grid" class="grid"><slot></slot></div>`;
  return { html, css: STAT_GRID_CSS };
}

export const STAT_GRID_CSS = `
  :host { display: block; }

  /* The container background bleeds through a 1px gap to draw dividers that
     adapt to any wrapped column count. Each cell repaints its own surface. */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--pura-stat-min, 11rem), 1fr));
    gap: 1px;
    background: var(--pura-border);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-lg);
    overflow: hidden;
  }

  :host([dividers="none"]) .grid {
    gap: 0;
    background: transparent;
    border-color: transparent;
  }

  ::slotted(pura-stat) {
    background: var(--pura-bg);
  }
  :host([dividers="none"]) ::slotted(pura-stat) {
    background: transparent;
  }
`;
