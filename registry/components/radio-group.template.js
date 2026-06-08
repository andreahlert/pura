// Pure render for <pura-radio-group>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function radioGroupTemplate(el = EMPTY_SHIM) {
  const html = `${el.getAttribute("label") ? `<div class="legend" part="label">${el.getAttribute("label")}</div>` : ""}
       <div class="group" part="group" role="radiogroup"
         aria-label="${el.getAttribute("label") || ""}"
         aria-orientation="${el.getAttribute("orientation") === "horizontal" ? "horizontal" : "vertical"}">
         <slot></slot>
       </div>`;
  return { html, css: RADIO_GROUP_CSS };
}

export const RADIO_GROUP_CSS = `
  :host { display: block; }
  .legend {
    font-size: var(--pura-text-sm); font-weight: 550;
    color: var(--pura-fg); margin-bottom: var(--pura-space-3);
  }
  .group { display: flex; flex-direction: column; gap: var(--pura-space-3); }
  :host([orientation="horizontal"]) .group {
    flex-direction: row; flex-wrap: wrap; gap: var(--pura-space-4);
  }
  :host([disabled]) { opacity: 0.55; pointer-events: none; }
`;
