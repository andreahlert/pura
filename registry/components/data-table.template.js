// Pure render for <pura-data-table>. No DOM; SSR/DSD + client safe.
// The shadow shell is static: a toolbar (search box), a <slot> for the real
// light-DOM <table>, and an empty footer/pager. All live text (search
// placeholder, count, page labels) is filled at runtime by _applyI18n/_apply,
// so the initial markup reads nothing from the host. EMPTY_SHIM is unused.
import { EMPTY_SHIM } from "../base.js";

// Shadow shell, rendered once. The slot holds the real <table>.
function SHELL() {
  return `
    <div class="root" part="root">
      <div part="toolbar" class="toolbar" hidden>
        <input part="search" class="search" type="search" autocomplete="off"
          spellcheck="false" aria-label="search" />
      </div>
      <div part="table" class="table">
        <slot></slot>
      </div>
      <div part="footer" class="footer" hidden>
        <span part="count" class="count"></span>
        <div part="pager" class="pager" hidden>
          <button part="prev" type="button" class="navbtn"></button>
          <span part="page-label" class="page-label"></span>
          <button part="next" type="button" class="navbtn"></button>
        </div>
      </div>
    </div>
  `;
}

// Shadow styles: host shell, toolbar, footer, and the directly slotted <table>.
const SHADOW_CSS = `
  :host { display: block; }

  .root {
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius);
    background: var(--pura-bg);
    overflow: hidden;
  }

  .toolbar {
    display: flex; align-items: center; gap: var(--pura-space-2);
    padding: var(--pura-space-3) var(--pura-space-4);
    border-bottom: 1px solid var(--pura-border);
  }
  .toolbar[hidden] { display: none; }

  .search {
    font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-3); height: 2.25rem;
    width: 100%; max-width: 20rem;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .search::placeholder { color: var(--pura-muted); }
  .search:focus-visible {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  .table { width: 100%; overflow-x: auto; }

  ::slotted(table) {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--pura-text-sm);
    color: var(--pura-fg);
    caption-side: bottom;
  }
  ::slotted(style) { display: none; }

  .footer {
    display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-3); flex-wrap: wrap;
    padding: var(--pura-space-3) var(--pura-space-4);
    border-top: 1px solid var(--pura-border);
    font-size: var(--pura-text-xs); color: var(--pura-muted);
  }
  .footer[hidden] { display: none; }

  .pager { display: flex; align-items: center; gap: var(--pura-space-2); }
  .pager[hidden] { display: none; }

  .page-label { color: var(--pura-muted-fg); font-size: var(--pura-text-xs); }

  .navbtn {
    display: inline-flex; align-items: center; justify-content: center;
    font: inherit; font-size: var(--pura-text-base); line-height: 1;
    cursor: pointer; color: var(--pura-fg);
    background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius);
    min-width: 2rem; height: 2rem; padding: 0 var(--pura-space-2);
    box-shadow: var(--pura-shadow-sm);
    transition: background var(--pura-dur) var(--pura-ease);
  }
  .navbtn:hover { background: var(--pura-subtle); }
  .navbtn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .navbtn:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-bg); }
`;

export function dataTableTemplate(el = EMPTY_SHIM) {
  return { html: SHELL(), css: SHADOW_CSS };
}
