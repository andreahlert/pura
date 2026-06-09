// Pure render for <pura-view-transition>. No DOM; safe on server (SSR/DSD).
import { EMPTY_SHIM } from "../base.js";

export function viewTransitionTemplate(el = EMPTY_SHIM) {
  const html = `<slot></slot>`;
  return { html, css: VIEW_TRANSITION_CSS };
}

export const VIEW_TRANSITION_CSS = `
  :host { display: block; }
`;
