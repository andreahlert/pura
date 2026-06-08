// Pure render(s) for <navigation-menu> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function navigationMenuTemplate(el = EMPTY_SHIM) {
  const html = `<ul part="list" class="list" role="list"><slot></slot></ul>`;
  return { html, css: NAVIGATION_MENU_CSS };
}

export const NAVIGATION_MENU_CSS = `
  :host { display: block; }

  /* parent list */
  .list {
    display: flex; align-items: center; gap: var(--pura-space-1);
    list-style: none; margin: 0; padding: var(--pura-space-1);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    width: max-content; max-width: 100%;
  }

  /* item host sits inline in the row */
  :host(pura-navigation-menu-item) { display: inline-flex; position: relative; }

  /* trigger (button or link) */
  .trigger {
    anchor-name: ANCHOR;
    display: inline-flex; align-items: center; gap: var(--pura-space-1);
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    line-height: 1; white-space: nowrap; cursor: pointer; text-decoration: none;
    color: var(--pura-fg); background: transparent;
    border: 1px solid transparent; border-radius: var(--pura-radius-sm);
    padding: var(--pura-space-2) var(--pura-space-3); height: 2.25rem;
    transition: background var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease);
  }
  .trigger:hover { background: var(--pura-subtle); }
  .trigger:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .trigger[aria-expanded="true"] { background: var(--pura-subtle); }

  .chev { width: 0.85rem; height: 0.85rem; color: var(--pura-muted); flex: none;
    transition: transform var(--pura-dur) var(--pura-ease); }
  .trigger[aria-expanded="true"] .chev { transform: rotate(180deg); }

  /* floating panel via Popover API + anchor positioning */
  .panel {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    width: max-content; max-width: min(34rem, 92vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .panel:popover-open { opacity: 1; transform: none; }
  .panel-inner { padding: var(--pura-space-4); font-size: var(--pura-text-sm); }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    :host(pura-navigation-menu-item) { position: relative; }
    .panel { position: absolute; top: 100%; left: 0; inset: auto; }
  }
`;
