// Pure render(s) for <command> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function commandItemTemplate(el = EMPTY_SHIM) {
  const html = `<div part="item" class="item">
         <span class="label" part="label"><slot></slot></span>
         <span class="shortcut" part="shortcut"><slot name="shortcut"></slot></span>
       </div>`;
  return { html, css: COMMAND_ITEM_CSS };
}

export function commandTemplate(el = EMPTY_SHIM) {
  const html = `<div part="root" class="root">
         <div part="input-row" class="input-row">
           <svg class="search" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M21 21l-4.3-4.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
           <input part="input" class="input" type="text" role="combobox"
             autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
             aria-expanded="true" aria-autocomplete="list"
             placeholder="${el.getAttribute("placeholder") || "Type a command or search…"}" />
         </div>
         <div part="list" class="list" role="listbox" tabindex="-1">
           <slot></slot>
           <div part="empty" class="empty" role="presentation">${el.getAttribute("empty") || "No results found."}</div>
         </div>
       </div>`;
  return { html, css: COMMAND_CSS };
}

export const COMMAND_ITEM_CSS = `
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
  .label { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .shortcut {
    margin-left: auto; padding-left: var(--pura-space-4);
    font-size: var(--pura-text-xs); color: var(--pura-muted);
    letter-spacing: 0.04em; white-space: nowrap;
  }
  :host(:hover:not([disabled])) .item { background: var(--pura-subtle); }
  :host([aria-selected="true"]:not([disabled])) .item {
    background: var(--pura-subtle); color: var(--pura-fg);
  }
  :host([aria-selected="true"]:not([disabled])) .shortcut { color: var(--pura-muted-fg); }

  :host([disabled]) .item { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
`;

export const COMMAND_CSS = `
  :host { display: block; }
  .root {
    display: flex; flex-direction: column;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg);
    box-shadow: var(--pura-shadow);
    overflow: hidden;
    max-height: 100%;
  }
  /* dropped straight into a <pura-dialog> body we let the dialog frame it */
  :host([flush]) .root { border: none; box-shadow: none; border-radius: 0; }

  .input-row {
    display: flex; align-items: center; gap: var(--pura-space-2);
    padding: 0 var(--pura-space-3);
    border-bottom: 1px solid var(--pura-border);
  }
  .search {
    width: 1rem; height: 1rem; flex: none; color: var(--pura-muted);
  }
  .input {
    flex: 1; min-width: 0;
    font: inherit; font-size: var(--pura-text-sm); color: var(--pura-fg);
    background: transparent; border: none; outline: none;
    height: 2.75rem; padding: 0;
  }
  .input::placeholder { color: var(--pura-muted); }

  .list {
    overflow-y: auto; overscroll-behavior: contain;
    max-height: 20rem; padding: var(--pura-space-2);
    display: flex; flex-direction: column; gap: 1px;
  }

  .empty {
    padding: var(--pura-space-5) var(--pura-space-3);
    text-align: center;
    font-size: var(--pura-text-sm); color: var(--pura-muted);
  }
  .empty[hidden] { display: none; }
`;
