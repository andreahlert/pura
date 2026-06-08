// Pure render for <pura-toolbar>. No DOM; SSR/DSD + client safe.
// orientation derives from the attribute; under EMPTY_SHIM no attribute is set so
// it degrades to "horizontal" (the default). The slotted items render at runtime.
import { EMPTY_SHIM } from "../base.js";

const CSS = `
  :host { display: block; }
  :host([orientation="vertical"]) { display: inline-block; }

  [part="toolbar"] {
    display: flex; flex-direction: row; align-items: center;
    flex-wrap: wrap; gap: var(--pura-space-2);
    padding: var(--pura-space-2);
    background: var(--pura-bg);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm);
  }
  :host([orientation="vertical"]) [part="toolbar"] {
    flex-direction: column; flex-wrap: nowrap; align-items: stretch;
    width: max-content;
  }

  /* Let slotted separators stretch across the cross axis. */
  ::slotted(pura-separator) { align-self: stretch; }
  :host(:not([orientation="vertical"])) ::slotted(pura-separator) {
    height: 1.5rem; align-self: center;
  }
`;

export function toolbarTemplate(el = EMPTY_SHIM) {
  // _orientation(): "vertical" only when the attribute is exactly "vertical".
  const orientation =
    el.getAttribute("orientation") === "vertical" ? "vertical" : "horizontal";
  const html = `<div part="toolbar" role="toolbar"
            aria-orientation="${orientation}">
         <slot></slot>
       </div>`;
  return { html, css: CSS };
}
