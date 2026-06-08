// Pure render for <pura-drawer>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

export function drawerTemplate(el = EMPTY_SHIM) {
  const html = `<dialog part="drawer">
         <div class="handle" part="handle" aria-hidden="true"></div>
         <header part="header">
           <span class="title"><slot name="header">${el.getAttribute("title") || ""}</slot></span>
           <button class="x" part="close" aria-label="${t("drawer.close")}">
             <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
           </button>
         </header>
         <div part="body"><slot></slot></div>
         <footer part="footer"><slot name="footer"></slot></footer>
       </dialog>`;
  return { html, css: DRAWER_CSS };
}

export const DRAWER_CSS = `
  dialog {
    padding: 0; border: none; border-top: 1px solid var(--pura-border);
    color: var(--pura-fg); background: var(--pura-bg);
    box-shadow: var(--pura-shadow-lg); display: flex; flex-direction: column;
    position: fixed; inset: auto 0 0 0; width: 100vw; height: auto;
    max-height: 85dvh; max-width: 100vw;
    border-radius: var(--pura-radius-lg) var(--pura-radius-lg) 0 0;
    transform: translateY(100%); transition: transform var(--pura-dur) var(--pura-ease);
  }
  dialog[open] { transform: none; }
  dialog::backdrop { background: rgb(0 0 0 / 0.45); backdrop-filter: blur(2px); opacity: 0; transition: opacity var(--pura-dur) var(--pura-ease); }
  dialog[open]::backdrop { opacity: 1; }

  .handle { flex: none; width: 2.5rem; height: 0.375rem; margin: var(--pura-space-3) auto 0;
    background: var(--pura-border-strong); border-radius: var(--pura-radius-full); }

  header { display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-3); padding: var(--pura-space-4) var(--pura-space-5) var(--pura-space-3); }
  .title { font-size: var(--pura-text-lg); font-weight: 600; }
  .x { display: grid; place-items: center; width: 1.75rem; height: 1.75rem; border: none;
    background: transparent; color: var(--pura-muted); cursor: pointer; border-radius: var(--pura-radius-sm);
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur); }
  .x:hover { background: var(--pura-subtle); color: var(--pura-fg); }
  .x svg { width: 1.1rem; height: 1.1rem; }
  [part="body"] { padding: 0 var(--pura-space-5) var(--pura-space-5); overflow: auto; flex: 1;
    font-size: var(--pura-text-sm); color: var(--pura-muted-fg); line-height: 1.6; }
  footer { display: flex; justify-content: flex-end; gap: var(--pura-space-2);
    padding: var(--pura-space-4) var(--pura-space-5); border-top: 1px solid var(--pura-border); }
`;
