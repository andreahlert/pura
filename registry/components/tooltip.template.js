// Pure render for <pura-tooltip>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function tooltipTemplate(el = EMPTY_SHIM) {
  const html = `<span class="trigger" part="trigger" tabindex="0" aria-describedby="tip"><slot></slot></span>
       <span id="tip" part="tip" role="tooltip">${el.getAttribute("text") || ""}</span>`;
  return { html, css: TOOLTIP_CSS };
}

export const TOOLTIP_CSS = `
  :host { display: inline-block; position: relative; }
  .trigger { display: inline-flex; outline: none; }
  .trigger:focus-visible { outline: 2px solid var(--pura-ring); outline-offset: 2px; border-radius: var(--pura-radius-sm); }
  [part="tip"] {
    position: absolute; z-index: 50; left: 50%; bottom: calc(100% + 8px);
    transform: translateX(-50%) translateY(4px);
    background: var(--pura-fg); color: var(--pura-bg);
    font-size: var(--pura-text-xs); font-weight: 500; line-height: 1.2;
    padding: var(--pura-space-2) var(--pura-space-3); border-radius: var(--pura-radius-sm);
    white-space: nowrap; pointer-events: none; opacity: 0;
    box-shadow: var(--pura-shadow);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  :host(:hover) [part="tip"], .trigger:focus-visible + [part="tip"] {
    opacity: 1; transform: translateX(-50%) translateY(0);
  }
  :host([placement="bottom"]) [part="tip"] { bottom: auto; top: calc(100% + 8px); }
  :host([placement="left"]) [part="tip"] { bottom: auto; top: 50%; left: auto; right: calc(100% + 8px); transform: translateY(-50%) translateX(4px); }
  :host([placement="right"]) [part="tip"] { bottom: auto; top: 50%; left: calc(100% + 8px); transform: translateY(-50%) translateX(-4px); }
  :host([placement="left"]:hover) [part="tip"], :host([placement="right"]:hover) [part="tip"] { transform: translateY(-50%) translateX(0); }
`;
