// Pure render for <pura-section>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function sectionTemplate(el = EMPTY_SHIM) {
  const html = `<section part="section"><div class="inner"><slot></slot></div></section>`;
  return { html, css: SECTION_CSS };
}

export const SECTION_CSS = `
  :host {
    display: block;
    --_py: var(--pura-space-6);
    --_bg: transparent;
  }
  [part="section"] {
    padding: var(--_py) var(--pura-space-4);
    background: var(--_bg);
    color: var(--pura-fg);
  }
  .inner { width: 100%; }
  /* container: center content at a comfortable reading max-width */
  :host([container]) .inner {
    max-width: 65rem;
    margin-inline: auto;
  }
`;
