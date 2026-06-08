// <pura-input-group> — input with addons. A single bordered, rounded container
// that holds an optional prefix (slot name="prefix"), the default-slotted
// control (a plain <input> or <pura-input>, rendered borderless to blend), and
// an optional suffix (slot name="suffix"). The container shows a shared focus
// ring whenever focus is within it (:focus-within). Attributes: disabled, invalid.
import { PuraElement, define } from "../base.js";
import meta from "./input-group.meta.js";
import { inputGroupTemplate } from "./input-group.template.js";

class PuraInputGroup extends PuraElement {
  static observedAttributes = ["disabled", "invalid"];

  connectedCallback() {
    const { html, css } = inputGroupTemplate(this);
    this.render(html, css);
    this._sync();
  }

  attributeChangedCallback() {
    if (this.isConnected) this._sync();
  }

  _sync() {
    const group = this.$(".group");
    if (!group) return;
    group.setAttribute("aria-disabled", this.hasAttribute("disabled") ? "true" : "false");
  }

  get disabled() { return this.hasAttribute("disabled"); }
  set disabled(v) { this.toggleAttribute("disabled", !!v); }
  get invalid() { return this.hasAttribute("invalid"); }
  set invalid(v) { this.toggleAttribute("invalid", !!v); }
}


define("pura-input-group", PuraInputGroup, meta);
export { PuraInputGroup };
