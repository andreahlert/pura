// Pure render for <pura-idle>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function idleTemplate(el = EMPTY_SHIM) {
  const html = `<slot></slot>`;
  return { html, css: IDLE_CSS };
}

export const IDLE_CSS = `
  /* Invisible wrapper: the host disappears from layout, children flow as if it
     were not present. No color/box affordances by design. */
  :host { display: contents; }
`;
