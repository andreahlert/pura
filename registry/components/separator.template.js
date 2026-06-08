// Pure render for <pura-separator>. No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function separatorTemplate(el = EMPTY_SHIM) {
  const label = el.getAttribute("label");
  const html = label
        ? `<div part="separator" role="separator" class="labeled"><span class="line"></span><span class="label">${label}</span><span class="line"></span></div>`
        : `<div part="separator" role="separator" aria-orientation="${el.getAttribute("orientation") || "horizontal"}"></div>`;
  return { html, css: SEPARATOR_CSS };
}

export const SEPARATOR_CSS = `
  :host { display: block; }
  :host([orientation="vertical"]) { display: inline-block; height: 100%; }
  [part="separator"] { background: var(--pura-border); }
  :host(:not([orientation="vertical"])) [part="separator"]:not(.labeled) { width: 100%; height: 1px; }
  :host([orientation="vertical"]) [part="separator"] { width: 1px; height: 100%; min-height: 1em; }
  .labeled { display: flex; align-items: center; gap: var(--pura-space-3); background: transparent; }
  .labeled .line { flex: 1; height: 1px; background: var(--pura-border); }
  .labeled .label { font-size: var(--pura-text-xs); color: var(--pura-muted); white-space: nowrap; }
`;
