// Pure render(s) for <tree-select> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

const CSS = `
  :host { display: block; }
  .anchor { anchor-name: ANCHOR; position: relative; display: block; }

  .trigger {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    display: flex; align-items: center; gap: var(--pura-space-2);
    color: var(--pura-fg); background: var(--pura-bg); text-align: left;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-2) 0 var(--pura-space-3); min-height: 2.25rem;
    box-shadow: var(--pura-shadow-sm); cursor: pointer;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .trigger:hover { border-color: var(--pura-fg); }
  .trigger:focus-visible {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  .trigger[aria-disabled="true"] { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }

  .value {
    flex: 1 1 auto; min-width: 0; display: flex; flex-wrap: wrap;
    align-items: center; gap: var(--pura-space-1); padding: var(--pura-space-1) 0;
  }
  .value .single, .value .placeholder {
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .placeholder { color: var(--pura-muted); }

  .tag {
    display: inline-flex; align-items: center; gap: var(--pura-space-1);
    background: var(--pura-subtle); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-sm);
    padding: 0.075rem var(--pura-space-1) 0.075rem var(--pura-space-2);
    font-size: var(--pura-text-xs); max-width: 12rem;
  }
  .tag-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tag-remove {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1rem; height: 1rem; padding: 0; flex: none;
    border: none; background: transparent; color: var(--pura-muted); cursor: pointer;
    border-radius: var(--pura-radius-sm);
  }
  .tag-remove svg { width: 0.75rem; height: 0.75rem; }
  .tag-remove:hover { color: var(--pura-fg); background: var(--pura-subtle-hover); }

  .chev {
    width: 1rem; height: 1rem; flex: none; color: var(--pura-muted);
    transition: transform var(--pura-dur) var(--pura-ease);
  }
  .trigger[aria-expanded="true"] .chev { transform: rotate(180deg); }

  .panel {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    min-width: anchor-size(width); width: max-content; max-width: min(24rem, 92vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-1);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  .panel:popover-open { opacity: 1; transform: none; }

  .search { padding: var(--pura-space-1) var(--pura-space-1) var(--pura-space-2); }
  .search[hidden] { display: none; }
  .search-input {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    padding: 0 var(--pura-space-2); height: 2rem; outline: none;
  }
  .search-input:focus { border-color: var(--pura-accent); box-shadow: 0 0 0 2px var(--pura-ring); }

  .tree { display: flex; flex-direction: column; gap: 1px; max-height: 16rem; overflow-y: auto; }

  .node {
    display: flex; align-items: center; gap: var(--pura-space-1);
    padding: var(--pura-space-2);
    padding-left: calc(var(--pura-space-2) + (var(--pura-ts-level, 1) - 1) * var(--pura-space-5));
    border-radius: var(--pura-radius-sm); cursor: pointer; user-select: none;
    color: var(--pura-fg); line-height: 1.4;
    transition: background var(--pura-dur) var(--pura-ease);
  }
  .node:hover { background: var(--pura-subtle); }
  .node[aria-selected="true"] { background: var(--pura-subtle-hover); font-weight: 550; }
  .node[data-disabled="true"] { opacity: 0.5; cursor: not-allowed; }

  .twist {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1rem; height: 1rem; flex: none; color: var(--pura-muted);
  }
  .tw-chev { width: 0.85rem; height: 0.85rem; transition: transform var(--pura-dur) var(--pura-ease); }
  .tw-chev.open { transform: rotate(90deg); }

  .box {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1rem; height: 1rem; flex: none;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    color: var(--pura-primary-fg); background: var(--pura-bg);
  }
  .box.checked { background: var(--pura-primary); border-color: var(--pura-primary); }
  .box svg { width: 0.75rem; height: 0.75rem; }

  .node-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tick {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1rem; height: 1rem; flex: none; color: var(--pura-accent);
  }

  .empty {
    padding: var(--pura-space-3) var(--pura-space-2);
    color: var(--pura-muted); text-align: center;
  }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    .panel { position: absolute; top: 100%; left: 0; inset: auto; margin-top: var(--pura-space-2); }
  }
`;

export function treeSelectTemplate(el = EMPTY_SHIM) {
  const html = `<div class="anchor" part="anchor">
         <div class="trigger" part="trigger" role="button" tabindex="${el.bool("disabled") ? "-1" : "0"}"
           aria-haspopup="tree" aria-expanded="false" aria-controls="${el._panelId}"
           aria-disabled="${el.bool("disabled") ? "true" : "false"}">
           <span class="value" part="value"></span>
           <svg class="chev" part="chevron" viewBox="0 0 24 24" aria-hidden="true">
             <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round"/>
           </svg>
         </div>
         <div class="panel" part="panel" id="${el._panelId}" popover="manual" tabindex="-1">
           <div class="search" part="search" hidden>
             <input class="search-input" type="text" autocomplete="off" spellcheck="false" />
           </div>
           <div class="tree" role="tree"></div>
         </div>
       </div>`;
  return { html, css: CSS.replaceAll("ANCHOR", el._name) };
}
