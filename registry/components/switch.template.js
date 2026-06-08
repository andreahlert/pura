// Pure render for <pura-switch>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function switchTemplate(el = EMPTY_SHIM) {
  const html = `<label part="root">
         <span class="track" part="track" role="switch"
           tabindex="${el.hasAttribute("disabled") ? -1 : 0}"
           aria-checked="${el.hasAttribute("checked")}"
           aria-labelledby="txt">
           <span class="thumb" part="thumb"></span>
         </span>
         <span class="txt" id="txt"><slot></slot></span>
       </label>`;
  return { html, css: SWITCH_CSS };
}

export const SWITCH_CSS = `
  :host { display: inline-block; }
  label { display: inline-flex; align-items: center; gap: var(--pura-space-3);
    font-size: var(--pura-text-sm); color: var(--pura-fg); cursor: pointer; user-select: none; }
  .track {
    position: relative; display: inline-flex; align-items: center; flex: none;
    width: 2.5rem; height: 1.4rem; border-radius: var(--pura-radius-full);
    background: var(--pura-border-strong); padding: 2px;
    transition: background var(--pura-dur) var(--pura-ease), box-shadow var(--pura-dur) var(--pura-ease);
  }
  .thumb {
    width: 1rem; height: 1rem; border-radius: 50%; background: #fff;
    box-shadow: var(--pura-shadow-sm);
    transition: transform var(--pura-dur) var(--pura-ease);
  }
  .track:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  :host([checked]) .track { background: var(--pura-primary); }
  :host([checked]) .thumb { transform: translateX(1.1rem); }
  :host([disabled]) label { opacity: 0.55; cursor: not-allowed; }
`;
