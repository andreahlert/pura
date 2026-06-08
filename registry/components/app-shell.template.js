// Pure render for <pura-app-shell>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function appShellTemplate(el = EMPTY_SHIM) {
  const html = `<div part="shell" class="shell">
         <header part="header" class="header"><slot name="header"></slot></header>
         <aside part="sidebar" class="sidebar"><slot name="sidebar"></slot></aside>
         <div part="scrim" class="scrim"></div>
         <main part="main" class="main"><slot></slot></main>
         <footer part="footer" class="footer"><slot name="footer"></slot></footer>
       </div>`;
  return { html, css: APP_SHELL_CSS };
}

export const APP_SHELL_CSS = `
  :host {
    display: block; height: 100%;
    --shell-sidebar-width: 16rem;
    --shell-header-height: 3.5rem;
    --shell-rail-width: 3.5rem;
    /* Track sources. Inline-overridden to 0 when a region is empty. */
    --shell-header-row: var(--shell-header-height);
    --shell-sidebar-col: var(--shell-sidebar-width);
  }

  .shell {
    display: grid; height: 100%; min-height: 0;
    background: var(--pura-bg); color: var(--pura-fg);
    grid-template-columns: var(--shell-sidebar-col) 1fr;
    grid-template-rows: var(--shell-header-row) 1fr auto;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    transition: grid-template-columns var(--pura-dur) var(--pura-ease);
  }

  .header {
    grid-area: header; display: flex; align-items: center;
    min-height: 0; min-width: 0;
    border-bottom: 1px solid var(--pura-border);
    background: var(--pura-bg);
  }
  :host([fixed-header]) .header {
    position: sticky; top: 0; z-index: 30;
  }

  .sidebar {
    grid-area: sidebar; min-height: 0; overflow: auto;
    border-right: 1px solid var(--pura-border);
    background: var(--pura-subtle);
    transition: width var(--pura-dur) var(--pura-ease);
  }

  .main {
    grid-area: main; min-width: 0; min-height: 0; overflow: auto;
  }

  .footer {
    grid-area: footer; min-width: 0;
    border-top: 1px solid var(--pura-border);
    background: var(--pura-bg);
  }

  /* Desktop collapsed: narrow the sidebar column to an icon rail. An empty
     sidebar (inline --shell-sidebar-col: 0) still overrides this to 0. */
  :host([sidebar-collapsed]:not([sidebar-open])) {
    --shell-sidebar-col: var(--shell-rail-width);
  }

  /* Scrim only matters in the mobile overlay state. */
  .scrim { display: none; }

  /* Mobile: sidebar becomes a fixed off canvas overlay sliding from the left. */
  @media (max-width: 768px) {
    .shell {
      grid-template-columns: 1fr;
      grid-template-areas:
        "header"
        "main"
        "footer";
    }
    .sidebar {
      position: fixed; inset: 0 auto 0 0; z-index: 50;
      width: min(18rem, 86vw); height: 100dvh;
      box-shadow: var(--pura-shadow-lg);
      transform: translateX(-100%);
      transition: transform var(--pura-dur) var(--pura-ease);
    }
    :host([sidebar-open]) .sidebar { transform: none; }

    .scrim {
      display: block; position: fixed; inset: 0; z-index: 40;
      background: rgb(0 0 0 / 0.45);
      opacity: 0; pointer-events: none;
      transition: opacity var(--pura-dur) var(--pura-ease);
    }
    :host([sidebar-open]) .scrim { opacity: 1; pointer-events: auto; }
  }
`;
