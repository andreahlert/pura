// Pure render for <pura-sheet>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

export function sheetTemplate(el = EMPTY_SHIM) {
  const html = `<dialog part="sheet">
         <header part="header">
           <span class="title"><slot name="header">${el.getAttribute("title") || ""}</slot></span>
           <button class="x" part="close" aria-label="${t("sheet.close")}">
             <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
           </button>
         </header>
         <div part="body"><slot></slot></div>
         <footer part="footer"><slot name="footer"></slot></footer>
       </dialog>`;
  return { html, css: SHEET_CSS };
}

export const SHEET_CSS = `
  dialog {
    padding: 0; border: none; color: var(--pura-fg); background: var(--pura-bg);
    box-shadow: var(--pura-shadow-lg); display: flex; flex-direction: column;
    position: fixed; max-height: 100dvh; max-width: 100vw;
  }
  dialog::backdrop { background: rgb(0 0 0 / 0.45); backdrop-filter: blur(2px); opacity: 0; transition: opacity var(--pura-dur) var(--pura-ease); }
  dialog[open]::backdrop { opacity: 1; }

  /* right (default) */
  dialog { inset: 0 0 0 auto; height: 100dvh; width: min(24rem, 92vw);
    border-left: 1px solid var(--pura-border); transform: translateX(100%);
    transition: transform var(--pura-dur) var(--pura-ease); }
  dialog[open] { transform: none; }
  :host([side="left"]) dialog { inset: 0 auto 0 0; border-left: none; border-right: 1px solid var(--pura-border); transform: translateX(-100%); }
  :host([side="top"]) dialog { inset: 0 0 auto 0; width: 100vw; height: auto; max-height: 85dvh; border: none; border-bottom: 1px solid var(--pura-border); transform: translateY(-100%); }
  :host([side="bottom"]) dialog { inset: auto 0 0 0; width: 100vw; height: auto; max-height: 85dvh; border: none; border-top: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg) var(--pura-radius-lg) 0 0; transform: translateY(100%); }

  header { display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-3); padding: var(--pura-space-5); }
  .title { font-size: var(--pura-text-lg); font-weight: 600; }
  .x { display: grid; place-items: center; width: 1.75rem; height: 1.75rem; border: none;
    background: transparent; color: var(--pura-muted); cursor: pointer; border-radius: var(--pura-radius-sm); }
  .x:hover { background: var(--pura-subtle); color: var(--pura-fg); }
  .x svg { width: 1.1rem; height: 1.1rem; }
  [part="body"] { padding: 0 var(--pura-space-5) var(--pura-space-5); overflow: auto; flex: 1;
    font-size: var(--pura-text-sm); color: var(--pura-muted-fg); line-height: 1.6; }
  footer { display: flex; justify-content: flex-end; gap: var(--pura-space-2);
    padding: var(--pura-space-4) var(--pura-space-5); border-top: 1px solid var(--pura-border); }
`;
