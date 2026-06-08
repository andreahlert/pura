// Pure render(s) for <menubar> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function menuItemTemplate(el = EMPTY_SHIM) {
  const html = `<div part="item" role="menuitem" tabindex="-1"
        aria-disabled="${el.hasAttribute("disabled") ? "true" : "false"}">
         <span class="icon" part="icon" aria-hidden="true"><slot name="icon"></slot></span>
         <span class="label"><slot></slot></span>
         <span class="shortcut" part="shortcut"><slot name="shortcut"></slot></span>
       </div>`;
  return { html, css: MENU_ITEM_CSS };
}

export function menubarTemplate(el = EMPTY_SHIM) {
  const html = `<div part="bar" role="menubar" aria-orientation="horizontal"><slot></slot></div>`;
  return { html, css: MENUBAR_CSS };
}

export const MENU_ITEM_CSS = `
  :host { display: block; }
  [part="item"] {
    display: flex; align-items: center; gap: var(--pura-space-2);
    font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); cursor: pointer; user-select: none;
    padding: var(--pura-space-2) var(--pura-space-3);
    border-radius: var(--pura-radius-sm);
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur) var(--pura-ease);
  }
  [part="item"]:hover, [part="item"]:focus-visible, [part="item"][data-active] {
    outline: none; background: var(--pura-subtle); color: var(--pura-fg);
  }
  .icon { display: inline-flex; width: 1rem; height: 1rem; flex: none; color: var(--pura-muted); }
  .icon:empty { display: none; }
  .label { flex: 1; }
  .shortcut { margin-left: var(--pura-space-5); font-size: var(--pura-text-xs);
    color: var(--pura-muted); letter-spacing: 0.04em; }
  .shortcut:empty { display: none; }
  :host([inset]) .icon { display: inline-flex; }
  :host([disabled]) [part="item"] { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
`;

export const MENUBAR_CSS = `
  :host { display: block; }
  [part="bar"] {
    display: flex; align-items: center; gap: var(--pura-space-1);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm);
    padding: var(--pura-space-1);
  }
`;
