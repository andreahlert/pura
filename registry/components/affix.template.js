// Pure render for <pura-affix>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function affixTemplate(el = EMPTY_SHIM) {
  const html = `<div class="sentinel" aria-hidden="true"></div>
       <div class="placeholder"><div part="content" class="content"><slot></slot></div></div>`;
  return { html, css: AFFIX_CSS };
}

export const AFFIX_CSS = `
  :host { display: block; }
  .sentinel { width: 100%; height: 1px; margin-bottom: -1px; }
  .placeholder { display: block; }
  [part="content"] { z-index: 10; }
`;
