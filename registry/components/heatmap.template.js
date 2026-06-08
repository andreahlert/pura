// Pure render for <pura-heatmap>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function heatmapTemplate(el = EMPTY_SHIM) {
  const html = `<div class="root" part="grid"></div>
       <div class="legend" part="legend" aria-hidden="true"></div>`;
  return { html, css: HEATMAP_CSS };
}

export const HEATMAP_CSS = `
  :host { display: inline-block; color: var(--pura-fg); }

  .root { display: block; overflow-x: auto; }
  .svg { display: block; max-width: 100%; height: auto; }

  .cell {
    stroke: var(--pura-border);
    stroke-width: 0.5;
    cursor: pointer;
    transition: stroke var(--pura-dur) var(--pura-ease);
  }
  .cell:hover { stroke: var(--pura-border-strong); }

  .legend {
    display: flex; align-items: center; gap: var(--pura-space-1);
    margin-top: var(--pura-space-2);
    font-size: var(--pura-text-xs); color: var(--pura-muted-fg);
  }
  .legend .sw {
    display: inline-block; width: 12px; height: 12px;
    border-radius: 2.5px; border: 1px solid var(--pura-border);
  }
  .lg-less { margin-right: var(--pura-space-1); }
  .lg-more { margin-left: var(--pura-space-1); }
`;
