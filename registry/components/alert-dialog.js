// <pura-alert-dialog> — confirmation dialog built on the native <dialog> element
// via showModal (focus trap). Centered modal that demands a decision: backdrop
// clicks and ESC are ignored (the native `cancel` event is prevented). Named
// slots: cancel, action (footer buttons, with sensible defaults). Default slot =
// description body. Attributes: title, description, open.
// Events: cancel (Cancel button), confirm (Action button). Both then close.
// API: .open() / .close().
import { PuraElement, define } from "../base.js";
import meta from "./alert-dialog.meta.js";

class PuraAlertDialog extends PuraElement {
  static observedAttributes = ["open"];

  connectedCallback() {
    this.render(
      `<dialog part="dialog" role="alertdialog" aria-modal="true">
         <div part="header" class="header">
           <h2 part="title" class="title">${this.getAttribute("title") || ""}</h2>
           <p part="description" class="desc">
             <slot>${this.getAttribute("description") || ""}</slot>
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
       </dialog>`,
      CSS
    );
    this._dlg = this.$("dialog");

    // Demand a decision: ESC fires the dialog 'cancel' event — prevent it so the
    // dialog stays open. Backdrop clicks are simply ignored (no close handler).
    this._dlg.addEventListener("cancel", (e) => e.preventDefault());

    // Delegate clicks for both default buttons (shadow DOM) and slotted custom
    // buttons that opt in via data-action="cancel" | "confirm". A click anywhere
    // crosses the shadow boundary and bubbles to the host, so one listener with
    // composedPath() covers both trees without double-firing.
    this.addEventListener("click", (e) => {
      const trigger = e.composedPath().find(
        (n) => n.nodeType === 1 && n.hasAttribute && n.hasAttribute("data-action")
      );
      if (!trigger) return;
      const action = trigger.getAttribute("data-action");
      if (action === "cancel") this._dismiss("cancel");
      else if (action === "confirm") this._dismiss("confirm");
    });

    this._dlg.addEventListener("close", () => {
      this.removeAttribute("open");
      this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
    });

    if (this.hasAttribute("open")) this.open();
  }

  attributeChangedCallback(_n, _o, v) {
    if (!this._dlg) return;
    if (v !== null && !this._dlg.open) this._dlg.showModal();
    if (v === null && this._dlg.open) this._dlg.close();
  }

  // Emit the decision event, then close the dialog.
  _dismiss(action) {
    this.dispatchEvent(new CustomEvent(action, { bubbles: true }));
    this.close();
  }

  open() { this.setAttribute("open", ""); }
  close() { this.removeAttribute("open"); }
}

const CSS = `
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

define("pura-alert-dialog", PuraAlertDialog, meta);
export { PuraAlertDialog };
