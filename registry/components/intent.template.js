// Pure render for <pura-intent>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function intentTemplate(el = EMPTY_SHIM) {
  const html = `<slot></slot>`;
  return { html, css: INTENT_CSS };
}

export const INTENT_CSS = `
  /* Non-visual annotation: the host disappears from layout, children flow
     as if it were not present. No color/box affordances by design. */
  :host { display: contents; }
`;
