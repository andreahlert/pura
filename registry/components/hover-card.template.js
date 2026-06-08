// Pure render(s) for <hover-card> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

const CSS = `
  :host { display: inline-block; }
  .anchor { anchor-name: ANCHOR; display: inline-flex; outline: none; }

  [part="card"] {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    width: max-content; max-width: min(20rem, 92vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-4);
    font-size: var(--pura-text-sm); line-height: 1.5;
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  [part="card"]:popover-open { opacity: 1; transform: none; }

  :host([placement="top"]) [part="card"] { top: auto; bottom: anchor(top); margin: 0 0 var(--pura-space-2); transform: translateY(4px); }
  :host([placement="right"]) [part="card"] { top: anchor(top); left: anchor(right); margin: 0 0 0 var(--pura-space-2); transform: translateX(-4px); }
  :host([placement="left"]) [part="card"] { top: anchor(top); left: auto; right: anchor(left); margin: 0 var(--pura-space-2) 0 0; transform: translateX(4px); }
  :host([placement="top"]) [part="card"]:popover-open,
  :host([placement="left"]) [part="card"]:popover-open,
  :host([placement="right"]) [part="card"]:popover-open { transform: none; }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    :host { position: relative; }
    [part="card"] { position: absolute; top: 100%; left: 0; inset: auto; }
  }
`;

export function hoverCardTemplate(el = EMPTY_SHIM) {
  const html = `<span class="anchor" part="trigger"><slot name="trigger"></slot></span>
       <div part="card" popover="manual" role="dialog" aria-modal="false"><slot></slot></div>`;
  return { html, css: CSS.replaceAll("ANCHOR", el._name) };
}
