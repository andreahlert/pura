// Pure render(s) for <dropdown-menu> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function menuItemTemplate(el = EMPTY_SHIM) {
  const html = `<span class="icon" part="icon"><slot name="icon"></slot></span>
       <span class="label" part="label"><slot></slot></span>
       <span class="shortcut" part="shortcut"><slot name="shortcut"></slot></span>`;
  return { html, css: MENU_ITEM_CSS };
}

export function menuSeparatorTemplate(el = EMPTY_SHIM) {
  const html = `<div part="separator" role="separator"></div>`;
  return { html, css: MENU_SEPARATOR_CSS };
}

export function menuLabelTemplate(el = EMPTY_SHIM) {
  const html = `<div part="label" role="presentation"><slot></slot></div>`;
  return { html, css: MENU_LABEL_CSS };
}

export const MENU_ITEM_CSS = `
  :host {
    display: flex; align-items: center; gap: var(--pura-space-2);
    padding: var(--pura-space-2) var(--pura-space-2);
    border-radius: var(--pura-radius-sm); cursor: pointer;
    color: var(--pura-fg); font-size: var(--pura-text-sm); line-height: 1.2;
    user-select: none; outline: none;
    transition: background var(--pura-dur) var(--pura-ease);
  }
  :host(:hover), :host(:focus-visible), :host(:focus) { background: var(--pura-subtle); }
  :host(:focus-visible) { box-shadow: inset 0 0 0 1px var(--pura-border-strong); }
  :host([disabled]) { color: var(--pura-muted); cursor: not-allowed; pointer-events: none; opacity: 0.6; }
  .icon { display: inline-flex; align-items: center; justify-content: center; width: 1rem; height: 1rem; flex: none; color: var(--pura-muted-fg); }
  .icon:empty { display: none; }
  .label { flex: 1; min-width: 0; }
  .shortcut { margin-left: auto; padding-left: var(--pura-space-4); color: var(--pura-muted); font-size: var(--pura-text-xs); letter-spacing: 0.05em; }
  .shortcut:empty { display: none; }
`;

export const MENU_SEPARATOR_CSS = `
  :host { display: block; }
  [part="separator"] {
    height: 1px; width: auto; background: var(--pura-border);
    margin: var(--pura-space-1) calc(var(--pura-space-1) * -1);
  }
`;

export const MENU_LABEL_CSS = `
  :host { display: block; }
  [part="label"] {
    padding: var(--pura-space-2) var(--pura-space-2);
    font-size: var(--pura-text-xs); font-weight: 600;
    color: var(--pura-muted); letter-spacing: 0.02em;
  }
`;
