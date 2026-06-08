// Pure render(s) for <tree-view> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function treeItemTemplate(el = EMPTY_SHIM) {
  const html = `<div part="row" role="treeitem" id="${el._id}" tabindex="-1"
            data-pura-tree-item>
         <span class="twist" part="twist" aria-hidden="true">
           <svg viewBox="0 0 24 24" class="chev"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
         </span>
         <span class="label" part="label"><slot name="label"></slot></span>
       </div>
       <div part="group" role="group" hidden><slot></slot></div>`;
  return { html, css: TREE_ITEM_CSS };
}

export const TREE_ITEM_CSS = `
  :host { display: block; }
  [part="row"] {
    display: flex; align-items: center; gap: var(--pura-space-1);
    padding: var(--pura-space-2) var(--pura-space-2);
    padding-left: calc(var(--pura-space-2) + (var(--pura-tree-level, 1) - 1) * var(--pura-space-5));
    border-radius: var(--pura-radius-sm); cursor: pointer; user-select: none;
    font-size: var(--pura-text-sm); color: var(--pura-fg); line-height: 1.4;
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur) var(--pura-ease);
  }
  [part="row"]:hover { background: var(--pura-subtle); }
  [part="row"]:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--pura-ring); }
  [part="row"][aria-selected="true"] { background: var(--pura-subtle-hover); font-weight: 550; }
  [part="row"][aria-disabled="true"] { opacity: 0.5; cursor: not-allowed; }

  /* indentation per nesting level, set from the host's resolved level */
  :host { --pura-tree-level: 1; }

  .twist {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1rem; height: 1rem; flex: none; color: var(--pura-muted);
  }
  .chev {
    width: 0.85rem; height: 0.85rem;
    transition: transform var(--pura-dur) var(--pura-ease);
  }
  :host([expanded]) .chev { transform: rotate(90deg); }
  /* leaves have no disclosure: hide the chevron but keep alignment */
  :host([leaf]) .chev { visibility: hidden; }

  .label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  [part="group"] { display: block; }
  [part="group"][hidden] { display: none; }
`;
