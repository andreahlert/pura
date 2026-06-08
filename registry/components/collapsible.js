// <pura-collapsible> — lightweight show/hide region (lighter than accordion).
// Slots: trigger (the clickable, slot="trigger"), default slot = collapsible
// content. Attributes: open, disabled. API: .toggle() / .open() / .close().
// Toggling sets/removes [open], updates aria-expanded on the trigger wrapper,
// and animates content height via the grid-template-rows 0fr/1fr trick.
import { PuraElement, define } from "../base.js";
import meta from "./collapsible.meta.js";
import { collapsibleTemplate } from "./collapsible.template.js";

class PuraCollapsible extends PuraElement {
  static observedAttributes = ["open", "disabled"];

  connectedCallback() {
    const { html, css } = collapsibleTemplate(this);
    this.render(html, css);
    this._trigger = this.$(".trigger");
    this._trigger.addEventListener("click", () => this.toggle());
    this._sync();
  }

  attributeChangedCallback(name) {
    if (!this._trigger) return;
    if (name === "open") {
      this._sync();
      this.dispatchEvent(
        new CustomEvent(this.hasAttribute("open") ? "open" : "close", { bubbles: true })
      );
    } else {
      this._sync();
    }
  }

  _sync() {
    const open = this.hasAttribute("open");
    this._trigger.setAttribute("aria-expanded", open ? "true" : "false");
    this._trigger.disabled = this.hasAttribute("disabled");
  }

  toggle() {
    if (this.hasAttribute("disabled")) return;
    this.toggleAttribute("open");
  }

  open() {
    if (this.hasAttribute("disabled")) return;
    this.setAttribute("open", "");
  }

  close() {
    this.removeAttribute("open");
  }
}


define("pura-collapsible", PuraCollapsible, meta);
export { PuraCollapsible };
