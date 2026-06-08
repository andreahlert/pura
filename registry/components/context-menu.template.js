// Pure render(s) for <context-menu> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function menuItemTemplate(el = EMPTY_SHIM) {
  const html = `<div part="item" class="item">
         <span class="icon" part="icon"><slot name="icon"></slot></span>
         <span class="label" part="label"><slot></slot></span>
         <span class="shortcut" part="shortcut"><slot name="shortcut"></slot></span>
       </div>`;
  return { html, css: MENU_ITEM_CSS };
}

export function contextMenuTemplate(el = EMPTY_SHIM) {
  const html = `<div class="region" part="region"><slot></slot></div>
       <div part="menu" class="menu" popover="auto" role="menu" tabindex="-1">
         <slot name="menu"></slot>
       </div>`;
  return { html, css: CONTEXT_MENU_CSS };
}

export const MENU_ITEM_CSS = `
  :host { display: block; }
  :host([hidden]) { display: none !important; }
  .item {
    display: flex; align-items: center; gap: var(--pura-space-2);
    padding: var(--pura-space-2) var(--pura-space-3);
    font-size: var(--pura-text-sm); color: var(--pura-fg);
    border-radius: var(--pura-radius-sm); cursor: pointer;
    user-select: none; outline: none;
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur) var(--pura-ease);
  }
  .icon { display: inline-flex; align-items: center; justify-content: center; }
  .icon:empty { display: none; }
  .icon ::slotted(svg) { width: 1rem; height: 1rem; }
  .label { flex: 1; white-space: nowrap; }
  .shortcut {
    margin-left: auto; padding-left: var(--pura-space-4);
    font-size: var(--pura-text-xs); color: var(--pura-muted);
    letter-spacing: 0.04em;
  }

  :host(:hover:not([disabled])) .item,
  :host(:focus) .item { background: var(--pura-subtle); }
  :host(:focus-visible) .item { box-shadow: 0 0 0 2px var(--pura-ring) inset; }

  :host([variant="danger"]) .item { color: var(--pura-danger); }
  :host([variant="danger"]:hover:not([disabled])) .item,
  :host([variant="danger"]:focus) .item {
    background: var(--pura-danger-bg); color: var(--pura-danger);
  }

  :host([inset]) .item { padding-left: var(--pura-space-6); }

  :host([disabled]) .item { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
`;

export const CONTEXT_MENU_CSS = `
  :host { display: contents; }
  .region { display: contents; }

  [part="menu"] {
    position: fixed; margin: 0; inset: auto; box-sizing: border-box;
    min-width: 12rem; max-width: min(20rem, 92vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg);
    padding: var(--pura-space-1);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: scale(0.97);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  [part="menu"]:popover-open { opacity: 1; transform: none; }
`;
