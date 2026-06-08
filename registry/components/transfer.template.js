// Pure render for <pura-transfer>. No DOM; SSR/DSD + client safe.
// Renders the two panel chromes (title + optional search) and the move
// controls; the <ul> list bodies are EMPTY and filled at runtime by
// _renderList() from [items]/[value]. Under EMPTY_SHIM `searchable` is false
// (no search inputs) and the titles resolve to the default-locale strings.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

// Quote-safe escaping for the search placeholder (transfer order: & " < >).
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Panel chrome (title + optional search + empty list). Rendered once per side.
function panelChrome(side, searchable) {
  const titleKey = side === "source" ? "transfer.source" : "transfer.target";
  return `<div part="panel" class="panel" data-panel="${side}">
      <div class="title" data-title="${side}">${t(titleKey)}</div>
      ${searchable ? `<input part="search" class="search" data-search="${side}"
        type="text" placeholder="${esc(t("transfer.search"))}" />` : ""}
      <ul class="list" data-list="${side}" role="listbox" aria-multiselectable="true"></ul>
    </div>`;
}

const CSS = `
  :host { display: block; }
  .wrap {
    display: grid; grid-template-columns: 1fr auto 1fr; gap: var(--pura-space-3);
    align-items: stretch;
  }

  .panel {
    display: flex; flex-direction: column; min-width: 0;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    background: var(--pura-bg); overflow: hidden;
  }
  .title {
    padding: var(--pura-space-2) var(--pura-space-3);
    font-size: var(--pura-text-sm); font-weight: 550; color: var(--pura-fg);
    border-bottom: 1px solid var(--pura-border);
  }
  .search {
    margin: var(--pura-space-2); width: calc(100% - var(--pura-space-2) * 2);
    font: inherit; font-size: var(--pura-text-sm); color: var(--pura-fg);
    background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    padding: 0 var(--pura-space-2); height: 2rem;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .search::placeholder { color: var(--pura-muted); }
  .search:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  .list {
    list-style: none; margin: 0; padding: var(--pura-space-1);
    overflow-y: auto; flex: 1; max-height: 16rem; min-height: 6rem;
  }
  .item { border-radius: var(--pura-radius-sm); }
  .item label {
    display: flex; align-items: center; gap: var(--pura-space-2);
    padding: var(--pura-space-2); cursor: pointer; user-select: none;
    font-size: var(--pura-text-sm); color: var(--pura-fg);
  }
  .item label:hover { background: var(--pura-subtle); }
  .item input { accent-color: var(--pura-accent); flex: none; }
  .item-label { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  .controls {
    display: flex; flex-direction: column; justify-content: center;
    gap: var(--pura-space-2);
  }
  .ctl {
    display: inline-flex; align-items: center; justify-content: center;
    width: 2rem; height: 2rem; padding: 0;
    font: inherit; font-size: var(--pura-text-base); line-height: 1; cursor: pointer;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    background: var(--pura-bg); color: var(--pura-fg);
    box-shadow: var(--pura-shadow-sm);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }
  .ctl:hover { background: var(--pura-subtle); }
  .ctl:active { transform: translateY(0.5px) scale(0.98); }
  .ctl:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }

  @media (max-width: 480px) {
    .wrap { grid-template-columns: 1fr; }
    .controls { flex-direction: row; }
  }
`;

export function transferTemplate(el = EMPTY_SHIM) {
  const searchable = el.hasAttribute("searchable");
  const html = `<div class="wrap">
         ${panelChrome("source", searchable)}
         <div part="controls" class="controls">
           <button class="ctl" data-act="all-right" type="button" aria-label="Move all right">&raquo;</button>
           <button class="ctl" data-act="right" type="button" aria-label="Move right">&rsaquo;</button>
           <button class="ctl" data-act="left" type="button" aria-label="Move left">&lsaquo;</button>
           <button class="ctl" data-act="all-left" type="button" aria-label="Move all left">&laquo;</button>
         </div>
         ${panelChrome("target", searchable)}
       </div>`;
  return { html, css: CSS };
}
