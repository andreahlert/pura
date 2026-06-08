// Pure render for <pura-alert-dialog>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function alertDialogTemplate(el = EMPTY_SHIM) {
  const html = `<dialog part="dialog" role="alertdialog" aria-modal="true">
         <div part="header" class="header">
           <h2 part="title" class="title">${el.getAttribute("title") || ""}</h2>
           <p part="description" class="desc">
             <slot>${el.getAttribute("description") || ""}</slot>
           </p>
         </div>
         <footer part="footer">
           <slot name="cancel">
             <button type="button" part="cancel" class="btn cancel" data-action="cancel">Cancel</button>
           </slot>
           <slot name="action">
             <button type="button" part="action" class="btn action" data-action="confirm">Continue</button>
           </slot>
         </footer>
       </dialog>`;
  return { html, css: ALERT_DIALOG_CSS };
}

export const ALERT_DIALOG_CSS = `
  dialog {
    padding: 0; border: 1px solid var(--pura-border); color: var(--pura-fg);
    border-radius: var(--pura-radius-lg); background: var(--pura-bg);
    box-shadow: var(--pura-shadow-lg); width: min(28rem, calc(100vw - 2rem));
    opacity: 0; transform: translateY(8px) scale(0.98);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  dialog[open] { opacity: 1; transform: none; }
  dialog::backdrop { background: rgb(0 0 0 / 0.45); backdrop-filter: blur(2px); }

  .header { display: flex; flex-direction: column; gap: var(--pura-space-2);
    padding: var(--pura-space-5) var(--pura-space-5) var(--pura-space-4); }
  .title { margin: 0; font-size: var(--pura-text-lg); font-weight: 600; line-height: 1.4; }
  .desc { margin: 0; font-size: var(--pura-text-sm); color: var(--pura-muted-fg); line-height: 1.6; }

  footer { display: flex; justify-content: flex-end; gap: var(--pura-space-2);
    padding: var(--pura-space-4) var(--pura-space-5) var(--pura-space-5); }

  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    height: 2.25rem; padding: 0 var(--pura-space-4); border-radius: var(--pura-radius);
    font-family: inherit; font-size: var(--pura-text-sm); font-weight: 500;
    cursor: pointer; border: 1px solid transparent; white-space: nowrap;
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }
  .btn:focus-visible { outline: 2px solid var(--pura-ring); outline-offset: 2px; }

  .cancel { background: var(--pura-bg); color: var(--pura-fg); border-color: var(--pura-border-strong); }
  .cancel:hover { background: var(--pura-subtle); }

  .action { background: var(--pura-primary); color: var(--pura-primary-fg); }
  .action:hover { background: var(--pura-primary-hover); }
`;
