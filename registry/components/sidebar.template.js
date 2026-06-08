// Pure render(s) for <sidebar> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

export function sidebarTemplate(el = EMPTY_SHIM) {
  const html = `<dialog part="sidebar" aria-label="${t("sidebar.label")}">
         <header part="header"><slot name="header"></slot></header>
         <nav part="body" aria-label="${t("sidebar.label")}"><slot></slot></nav>
         <footer part="footer"><slot name="footer"></slot></footer>
       </dialog>`;
  return { html, css: SIDEBAR_CSS };
}

export const SIDEBAR_CSS = `
  :host { display: block; }

  dialog {
    margin: 0; padding: 0; border: none; color: var(--pura-fg);
    background: var(--pura-subtle); box-sizing: border-box;
    display: flex; flex-direction: column; max-height: none; max-width: none;
  }

  /* Desktop: inline panel, in normal flow, no backdrop. */
  dialog[open] {
    position: static; height: 100%; width: var(--pura-sidebar-width, 16rem);
    border-right: 1px solid var(--pura-border);
    transition: width var(--pura-dur) var(--pura-ease);
  }
  :host([collapsible][collapsed]) dialog[open] {
    width: var(--pura-sidebar-rail, 3.5rem);
  }

  header { display: flex; align-items: center; gap: var(--pura-space-2);
    padding: var(--pura-space-4); min-height: 3.5rem;
    border-bottom: 1px solid var(--pura-border); }
  nav { flex: 1; overflow-y: auto; overflow-x: hidden;
    padding: var(--pura-space-2);
    display: flex; flex-direction: column; gap: var(--pura-space-1); }
  footer { display: flex; flex-direction: column; gap: var(--pura-space-2);
    padding: var(--pura-space-3); border-top: 1px solid var(--pura-border); }

  /* Mobile: modal off-canvas drawer sliding from the left. */
  @media (max-width: 768px) {
    dialog {
      position: fixed; inset: 0 auto 0 0; height: 100dvh;
      width: min(18rem, 86vw); border-right: 1px solid var(--pura-border);
      box-shadow: var(--pura-shadow-lg);
      transform: translateX(-100%);
      transition: transform var(--pura-dur) var(--pura-ease);
    }
    dialog[open] { width: min(18rem, 86vw); transform: none; }
    dialog::backdrop { background: rgb(0 0 0 / 0.45); backdrop-filter: blur(2px);
      opacity: 0; transition: opacity var(--pura-dur) var(--pura-ease); }
    dialog[open]::backdrop { opacity: 1; }
  }
`;
