// Pure render for <pura-table>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function tableTemplate(el = EMPTY_SHIM) {
  const html = `<div part="container" class="container"><slot></slot></div>`;
  return { html, css: TABLE_CSS };
}

export const TABLE_CSS = `
  :host { display: block; }

  .container {
    width: 100%;
    overflow-x: auto;
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius);
    background: var(--pura-bg);
  }

  ::slotted(table) {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--pura-text-sm);
    color: var(--pura-fg);
    caption-side: bottom;
  }

  ::slotted(style) { display: none; }
`;
