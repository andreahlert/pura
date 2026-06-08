// Pure render(s) for <tabs> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function tabTemplate(el = EMPTY_SHIM) {
  const html = `<div part="panel" role="tabpanel"><slot></slot></div>`;
  return { html, css: `
      :host { display: block; }
      [part="panel"] { font-size: var(--pura-text-sm); color: var(--pura-muted-fg); line-height: 1.6; }
    ` };
}
