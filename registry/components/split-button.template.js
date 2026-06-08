// Pure render(s) for <split-button> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const CSS = `
  :host { display: inline-block; }
  :host([full]) { display: block; }

  .group { display: inline-flex; align-items: stretch; }
  :host([full]) .group { display: flex; }
  :host([full]) .primary { flex: 1; }

  button {
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--pura-space-2);
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    line-height: 1; white-space: nowrap; cursor: pointer;
    border: 1px solid transparent; height: 2.25rem;
    background: var(--pura-primary); color: var(--pura-primary-fg);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease),
      filter var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  button:hover { background: var(--pura-primary-hover); }
  button:active { transform: translateY(0.5px) scale(0.99); }
  button:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); z-index: 1; position: relative; }
  button:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  .primary { padding: 0 var(--pura-space-4); border-radius: var(--pura-radius) 0 0 var(--pura-radius); }
  .anchor { anchor-name: ANCHOR; display: inline-flex; }
  .caret {
    padding: 0 var(--pura-space-2); border-radius: 0 var(--pura-radius) var(--pura-radius) 0;
    border-left: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  }
  .caret svg { width: 1rem; height: 1rem; }

  .icon { display: inline-flex; align-items: center; justify-content: center; }
  .icon:empty { display: none; }

  /* sizes */
  :host([size="sm"]) button { height: 1.875rem; font-size: var(--pura-text-xs); }
  :host([size="sm"]) .primary { padding: 0 var(--pura-space-3); }
  :host([size="lg"]) button { height: 2.75rem; font-size: var(--pura-text-base); }
  :host([size="lg"]) .primary { padding: 0 var(--pura-space-5); }
  :host([size="lg"]) .caret { padding: 0 var(--pura-space-3); }

  /* variants */
  :host([variant="secondary"]) button {
    background: var(--pura-bg); color: var(--pura-fg);
    border-color: var(--pura-border-strong); box-shadow: var(--pura-shadow-sm);
  }
  :host([variant="secondary"]) .caret { border-left-color: var(--pura-border-strong); }
  :host([variant="secondary"]) button:hover { background: var(--pura-subtle); }

  :host([variant="ghost"]) button { background: transparent; color: var(--pura-fg); }
  :host([variant="ghost"]) button:hover { background: var(--pura-subtle); }

  :host([variant="danger"]) button { background: var(--pura-danger-solid); color: #fff; }
  :host([variant="danger"]) button:hover { filter: brightness(0.94); }

  /* loading spinner */
  .spin { display: none; width: 0.9em; height: 0.9em; border-radius: 50%;
    border: 2px solid currentColor; border-right-color: transparent;
    animation: pura-spin 0.6s linear infinite; }
  :host([loading]) .primary .spin { display: inline-block; }
  :host([loading]) .primary .icon { display: none; }
  @keyframes pura-spin { to { transform: rotate(360deg); } }

  /* dropdown menu panel */
  [part="menu"] {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); right: anchor(right); left: auto; margin-top: var(--pura-space-2);
    min-width: max(anchor-size(width), 10rem); width: max-content; max-width: min(20rem, 92vw);
    display: flex; flex-direction: column; gap: 1px;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-1);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  [part="menu"]:popover-open { opacity: 1; transform: none; }

  :host([placement="top"]) [part="menu"] {
    top: auto; bottom: anchor(top); margin: 0 0 var(--pura-space-2); transform: translateY(4px);
  }
  :host([placement="top"]) [part="menu"]:popover-open { transform: none; }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    .anchor { position: relative; }
    [part="menu"] { position: absolute; top: 100%; right: 0; left: auto; inset: auto; }
  }
`;

export function splitButtonTemplate(el = EMPTY_SHIM) {
  const label = el.getAttribute("label") || "More actions";
  const html = `<div class="group" part="group" role="group">
         <button class="primary" part="primary" type="button">
           <span class="spin" part="spinner" aria-hidden="true"></span>
           <span class="icon" part="icon"><slot name="icon"></slot></span>
           <span class="label"><slot></slot></span>
         </button>
         <span class="anchor" part="trigger-wrap">
           <button class="caret" part="trigger" type="button"
                   aria-haspopup="menu" aria-expanded="false" aria-label="${esc(label)}">
             <svg viewBox="0 0 24 24" aria-hidden="true">
               <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
           </button>
         </span>
         <div class="menu" part="menu" role="menu" popover="auto" aria-label="${esc(label)}"><slot name="menu"></slot></div>
       </div>`;
  return { html, css: CSS.replaceAll("ANCHOR", el._name) };
}
