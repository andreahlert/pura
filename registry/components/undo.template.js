// Pure render for <pura-undo>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function undoTemplate(el = EMPTY_SHIM) {
  const html = `<span class="trigger" part="trigger"><slot name="trigger"></slot></span>
       <div class="snackbar" part="snackbar" role="status" aria-live="polite" hidden>
         <span class="msg" part="message"></span>
         <button class="undo" part="undo" type="button"></button>
       </div>`;
  return { html, css: UNDO_CSS };
}

export const UNDO_CSS = `
  :host { display: inline-block; }
  .trigger { display: inline-flex; }
  .trigger:empty { display: none; }

  .snackbar {
    display: inline-flex; align-items: center; gap: var(--pura-space-3);
    margin-top: var(--pura-space-2);
    padding: var(--pura-space-3) var(--pura-space-4);
    border-radius: var(--pura-radius);
    border: 1px solid var(--pura-border); background: var(--pura-bg);
    color: var(--pura-fg); box-shadow: var(--pura-shadow-lg);
    font-size: var(--pura-text-sm);
    width: max-content; max-width: min(24rem, 92vw);
    opacity: 0; transform: translateY(6px) scale(0.98);
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .snackbar.in { opacity: 1; transform: none; }
  .snackbar[hidden] { display: none; }

  [part="message"] {
    flex: 1; min-width: 0; color: var(--pura-fg); line-height: 1.5;
    word-wrap: break-word;
  }

  .undo {
    flex: none; align-self: center; font: inherit; font-size: var(--pura-text-xs);
    font-weight: 550; line-height: 1; white-space: nowrap; cursor: pointer;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    background: var(--pura-bg); color: var(--pura-fg);
    padding: var(--pura-space-2) var(--pura-space-3);
    transition: background var(--pura-dur) var(--pura-ease);
  }
  .undo:hover { background: var(--pura-subtle); }
  .undo:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
`;
