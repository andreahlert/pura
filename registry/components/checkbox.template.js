// Pure render for <pura-checkbox>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function checkboxTemplate(el = EMPTY_SHIM) {
  const html = `<label part="root">
         <span class="box" part="box" role="checkbox"
           tabindex="${el.hasAttribute("disabled") ? -1 : 0}"
           aria-checked="${el.hasAttribute("checked")}"
           aria-labelledby="txt">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
         </span>
         <span class="txt" id="txt"><slot></slot></span>
       </label>`;
  return { html, css: CHECKBOX_CSS };
}

export const CHECKBOX_CSS = `
  :host { display: inline-block; }
  label { display: inline-flex; align-items: center; gap: var(--pura-space-2);
    font-size: var(--pura-text-sm); color: var(--pura-fg); cursor: pointer; user-select: none; }
  .box {
    display: inline-grid; place-items: center; width: 1.15rem; height: 1.15rem;
    border: 1.5px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    background: var(--pura-bg); color: transparent; flex: none;
    transition: background var(--pura-dur) var(--pura-ease), border-color var(--pura-dur) var(--pura-ease), box-shadow var(--pura-dur) var(--pura-ease);
  }
  .box svg { width: 0.85rem; height: 0.85rem; transform: scale(0.6); transition: transform var(--pura-dur) var(--pura-ease); }
  .box:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  :host([checked]) .box { background: var(--pura-primary); border-color: var(--pura-primary); color: var(--pura-primary-fg); }
  :host([checked]) .box svg { transform: scale(1); }
  :host([disabled]) label { opacity: 0.55; cursor: not-allowed; }
`;
