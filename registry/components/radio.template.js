// Pure render for <pura-radio>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function radioTemplate(el = EMPTY_SHIM) {
  const html = `<label part="root">
         <span class="dot" part="dot" role="radio"
           tabindex="${el.hasAttribute("disabled") ? -1 : 0}"
           aria-checked="${el.hasAttribute("checked")}"></span>
         <span class="txt"><slot></slot></span>
       </label>`;
  return { html, css: RADIO_CSS };
}

export const RADIO_CSS = `
  :host { display: inline-block; }
  label { display: inline-flex; align-items: center; gap: var(--pura-space-2);
    font-size: var(--pura-text-sm); color: var(--pura-fg); cursor: pointer; user-select: none; }
  .dot {
    position: relative; display: inline-block; width: 1.15rem; height: 1.15rem;
    border: 1.5px solid var(--pura-border-strong); border-radius: 50%;
    background: var(--pura-bg); flex: none;
    transition: border-color var(--pura-dur) var(--pura-ease), box-shadow var(--pura-dur) var(--pura-ease);
  }
  .dot::after {
    content: ""; position: absolute; inset: 0; margin: auto;
    width: 0.55rem; height: 0.55rem; border-radius: 50%;
    background: var(--pura-primary); transform: scale(0);
    transition: transform var(--pura-dur) var(--pura-ease);
  }
  .dot:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  :host([checked]) .dot { border-color: var(--pura-primary); }
  :host([checked]) .dot::after { transform: scale(1); }
  :host([disabled]) label { opacity: 0.55; cursor: not-allowed; }
`;
