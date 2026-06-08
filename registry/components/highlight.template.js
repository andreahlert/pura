// Pure render for <pura-highlight>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function highlightTemplate(el = EMPTY_SHIM) {
  const html = `<span part="text" class="text"></span>`;
  return { html, css: HIGHLIGHT_CSS };
}

export const HIGHLIGHT_CSS = `
  :host { display: inline; }
  .text { color: inherit; font: inherit; }
  mark {
    background: var(--pura-warning-bg);
    color: var(--pura-fg);
    border-radius: var(--pura-radius-sm);
    padding: 0 0.1em;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--pura-warning) 35%, transparent);
  }
`;
