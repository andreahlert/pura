// Pure render(s) for <tour> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function tourStepTemplate(el = EMPTY_SHIM) {
  const html = `<slot></slot>`;
  return { html, css: `:host { display: none !important; }` };
}
