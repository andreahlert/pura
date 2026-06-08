// Pure render for <pura-spacer>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function spacerTemplate(el = EMPTY_SHIM) {
  const html = `<div part="spacer"></div>`;
  return { html, css: SPACER_CSS };
}

export const SPACER_CSS = `
  :host { display: block; }
  /* No size: grow to fill (pushes flex siblings apart); inert in block flow. */
  :host(:not([size])) { flex: 1 1 0%; }
  /* Fixed size: main-axis basis covers flex row/column; height covers block flow. */
  :host([size]) { flex: 0 0 var(--_size); height: var(--_size); }
  [part="spacer"] { width: 100%; height: 100%; }
`;
