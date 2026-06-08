// Pure render for <pura-action>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function actionTemplate(el = EMPTY_SHIM) {
  const html = `<slot></slot>`;
  return { html, css: ACTION_CSS };
}

export const ACTION_CSS = `
  :host { display: contents; }
`;
