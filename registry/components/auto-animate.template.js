// Pure render for <pura-auto-animate>. No DOM; safe on server (SSR/DSD).
import { EMPTY_SHIM } from "../base.js";

export function autoAnimateTemplate(el = EMPTY_SHIM) {
  // The animated nodes are the host's light-DOM children, projected here. The
  // shadow root is just the slot; the FLIP engine measures the light children.
  const html = `<slot></slot>`;
  return { html, css: AUTO_ANIMATE_CSS };
}

export const AUTO_ANIMATE_CSS = `
  :host { display: block; }
`;
