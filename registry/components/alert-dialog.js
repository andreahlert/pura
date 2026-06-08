// <pura-alert-dialog> — confirmation dialog built on the native <dialog> element
// via showModal (focus trap). Centered modal that demands a decision: backdrop
// clicks and ESC are ignored (the native `cancel` event is prevented). Named
// slots: cancel, action (footer buttons, with sensible defaults). Default slot =
// description body. Attributes: title, description, open.
// Events: cancel (Cancel button), confirm (Action button). Both then close.
// API: .open() / .close().
import { PuraElement, define } from "../base.js";
import meta from "./alert-dialog.meta.js";
import { alertDialogTemplate } from "./alert-dialog.template.js";

class PuraAlertDialog extends PuraElement {
  static observedAttributes = ["open"];

  connectedCallback() {
    const { html, css } = alertDialogTemplate(this);
    this.render(html, css);
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


define("pura-alert-dialog", PuraAlertDialog, meta);
export { PuraAlertDialog };
