// Pure render for <pura-kbd-shortcuts>. No DOM; SSR/DSD + client safe.
// Renders the dialog shell with an EMPTY body; the grouped shortcut list is built
// from light-DOM <pura-shortcut> children at runtime by _sync(). Under EMPTY_SHIM
// the title resolves to the default-locale i18n string.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

// Quote-safe escaping for the title/labels (kbd-shortcuts order: & < > ").
function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const CSS = `
  :host { display: contents; }

  dialog {
    padding: 0; border: 1px solid var(--pura-border); color: var(--pura-fg);
    border-radius: var(--pura-radius-lg); background: var(--pura-bg);
    box-shadow: var(--pura-shadow-lg); width: min(34rem, calc(100vw - 2rem));
    max-height: min(80dvh, 44rem); display: flex; flex-direction: column;
    opacity: 0; transform: translateY(8px) scale(0.98);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  dialog[open] { opacity: 1; transform: none; }
  dialog::backdrop { background: rgb(0 0 0 / 0.45); backdrop-filter: blur(2px); }

  header { display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-3); padding: var(--pura-space-5) var(--pura-space-5) var(--pura-space-3); }
  .title { font-size: var(--pura-text-lg); font-weight: 600; }
  .x { display: grid; place-items: center; width: 1.75rem; height: 1.75rem;
    border: none; background: transparent; color: var(--pura-muted); cursor: pointer;
    border-radius: var(--pura-radius-sm);
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur); }
  .x:hover { background: var(--pura-subtle); color: var(--pura-fg); }
  .x:focus-visible { outline: 2px solid var(--pura-ring); outline-offset: 2px; }
  .x svg { width: 1.1rem; height: 1.1rem; }

  .body { padding: 0 var(--pura-space-5) var(--pura-space-5); overflow: auto; flex: 1;
    display: flex; flex-direction: column; gap: var(--pura-space-5); }
  .empty { color: var(--pura-muted); font-size: var(--pura-text-sm); margin: 0;
    padding: var(--pura-space-4) 0; }

  .group { display: flex; flex-direction: column; gap: var(--pura-space-2); }
  .group-title { margin: 0; font-size: var(--pura-text-xs); font-weight: 600;
    letter-spacing: 0.04em; text-transform: uppercase; color: var(--pura-muted); }
  .rows { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }

  .row { display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-4); padding: var(--pura-space-2) 0;
    border-bottom: 1px solid var(--pura-border); }
  .row:last-child { border-bottom: none; }
  .row-label { font-size: var(--pura-text-sm); color: var(--pura-fg); }
  .keys { display: inline-flex; align-items: center; gap: var(--pura-space-1);
    flex-shrink: 0; white-space: nowrap; }

  .kbd {
    display: inline-flex; align-items: center; justify-content: center;
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-xs); font-weight: 500; line-height: 1;
    white-space: nowrap; min-width: 1.25em; height: 1.25rem;
    padding: 0 var(--pura-space-2);
    color: var(--pura-muted-fg); background: var(--pura-subtle);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-sm);
  }
  .plus { color: var(--pura-muted); font-size: var(--pura-text-xs); }

  footer { display: flex; justify-content: flex-end; gap: var(--pura-space-2);
    padding: var(--pura-space-4) var(--pura-space-5); border-top: 1px solid var(--pura-border);
    background: var(--pura-subtle); }
`;

export function kbdShortcutsTemplate(el = EMPTY_SHIM) {
  // _title(): the [title] attribute or the default-locale i18n title.
  const title = el.getAttribute("title") || t("kbd-shortcuts.title");
  const html = `<dialog part="dialog" aria-label="${esc(title)}">
         <header part="header">
           <span class="title"><slot name="header">${esc(title)}</slot></span>
           <button class="x" part="close" type="button" aria-label="${esc(t("kbd-shortcuts.close"))}">
             <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
           </button>
         </header>
         <div class="body" part="body" role="list"></div>
         <footer part="footer"><slot name="footer"></slot></footer>
       </dialog>
       <slot hidden></slot>`;
  return { html, css: CSS };
}
