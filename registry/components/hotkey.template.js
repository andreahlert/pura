// Pure render for <pura-hotkey>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function hotkeyTemplate(el = EMPTY_SHIM) {
  const html = `<slot></slot>`;
  return { html, css: HOTKEY_CSS };
}

export const HOTKEY_CSS = `
  /* Invisible declarative binder: the host disappears from layout, any children
     flow as if it were not present. No color/box affordances by design. */
  :host { display: contents; }
`;
