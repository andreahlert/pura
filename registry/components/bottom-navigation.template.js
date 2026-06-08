// Pure render(s) for <bottom-navigation> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function bottomNavigationTemplate(el = EMPTY_SHIM) {
  const html = `<nav part="nav" class="nav"><slot></slot></nav>`;
  return { html, css: BOTTOM_NAVIGATION_CSS };
}

export const BOTTOM_NAVIGATION_CSS = `
  :host { display: block; }
  :host(:not([static])) {
    position: fixed; left: 0; right: 0; bottom: 0; z-index: 50;
  }
  slot { display: none; }

  .nav {
    display: flex; align-items: stretch; justify-content: space-around;
    gap: var(--pura-space-1);
    background: var(--pura-bg); color: var(--pura-muted-fg);
    border-top: 1px solid var(--pura-border);
    padding: var(--pura-space-1) var(--pura-space-2);
    padding-bottom: max(var(--pura-space-1), env(safe-area-inset-bottom));
  }

  .item {
    flex: 1 1 0; min-width: 0;
    display: inline-flex; flex-direction: column; align-items: center;
    justify-content: center; gap: var(--pura-space-1);
    padding: var(--pura-space-2) var(--pura-space-1);
    border: none; background: transparent; cursor: pointer;
    color: inherit; font: inherit;
    border-radius: var(--pura-radius-sm);
    transition: color var(--pura-dur) var(--pura-ease),
      background var(--pura-dur) var(--pura-ease);
  }
  .item:hover { background: var(--pura-subtle); color: var(--pura-fg); }
  .item:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--pura-ring); }
  .item[data-active="true"] { color: var(--pura-accent); }

  .icon { display: inline-flex; align-items: center; justify-content: center;
    width: 1.5rem; height: 1.5rem; flex: none; }
  .icon svg, .icon { width: 1.5rem; height: 1.5rem; }

  .label {
    font-size: var(--pura-text-xs); font-weight: 550; line-height: 1;
    max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
`;
