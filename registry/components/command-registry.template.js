// Pure render(s) for <command-registry> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function commandActionTemplate(el = EMPTY_SHIM) {
  const html = `<span part="action" hidden></span>`;
  return { html, css: COMMAND_ACTION_CSS };
}

export const COMMAND_ACTION_CSS = `
  :host { display: none !important; }
  [part="action"] { display: none; }
`;
