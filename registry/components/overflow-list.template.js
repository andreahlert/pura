// Pure render(s) for <overflow-list> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

const CSS = `
  :host { display: block; }

  .list {
    display: flex; flex-wrap: nowrap; align-items: center;
    gap: var(--overflow-gap, var(--pura-space-2));
    overflow: hidden; min-width: 0;
  }

  ::slotted(*) { flex: none; }

  .more {
    anchor-name: ANCHOR;
    flex: none; white-space: nowrap; cursor: pointer; font: inherit;
    font-size: var(--pura-text-sm); font-weight: 550; line-height: 1;
    color: var(--pura-fg); background: var(--pura-subtle);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-sm);
    padding: var(--pura-space-2) var(--pura-space-3);
    transition: background var(--pura-dur) var(--pura-ease);
  }
  .more:hover { background: var(--pura-subtle-hover); }
  .more:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--pura-ring); }
  .more[hidden] { display: none; }

  .menu {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); right: anchor(right); margin-top: var(--pura-space-2);
    width: max-content; max-width: min(20rem, 92vw);
    display: flex; flex-direction: column; gap: 1px;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-1);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .menu:popover-open { opacity: 1; transform: none; }

  .menu-item {
    display: flex; align-items: center;
    padding: var(--pura-space-2) var(--pura-space-2);
    border-radius: var(--pura-radius-sm);
  }
  .menu-item:hover { background: var(--pura-subtle); }

  @supports not (anchor-name: --x) {
    :host { position: relative; }
    .menu { position: absolute; top: 100%; right: 0; inset: auto; }
  }
`;

export function overflowListTemplate(el = EMPTY_SHIM) {
  const html = `<div part="list" class="list">
         <slot></slot>
         <button part="more" class="more" type="button" hidden
                 aria-haspopup="menu" aria-expanded="false"></button>
         <div part="menu" class="menu" role="menu" popover="auto"></div>
       </div>`;
  return { html, css: CSS.replaceAll("ANCHOR", el._anchor) };
}
