// <pura-checkbox> — label via slot. Attributes: checked, disabled.
import { PuraElement, define } from "../base.js";
import meta from "./checkbox.meta.js";
import { checkboxTemplate } from "./checkbox.template.js";

class PuraCheckbox extends PuraElement {
  static observedAttributes = ["checked", "disabled"];

  connectedCallback() {
    const { html, css } = checkboxTemplate(this);
    this.render(html, css);
    this._box = this.$(".box");
    // If the consumer named the control on the host (no visible slotted text),
    // forward that name onto the role=checkbox node, which carries the semantics.
    const hostLabel = this.getAttribute("aria-label");
    if (hostLabel) { this._box.setAttribute("aria-label", hostLabel); this._box.removeAttribute("aria-labelledby"); }
    const toggle = () => {
      if (this.hasAttribute("disabled")) return;
      this.toggleAttribute("checked");
      this.dispatchEvent(new CustomEvent("change", { detail: { checked: this.hasAttribute("checked") }, bubbles: true }));
    };
    this._box.addEventListener("click", toggle);
    this._box.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); }
    });
  }

  attributeChangedCallback() {
    if (this._box) this._box.setAttribute("aria-checked", this.hasAttribute("checked"));
  }

  get checked() { return this.hasAttribute("checked"); }
  set checked(v) { this.toggleAttribute("checked", !!v); }
}


define("pura-checkbox", PuraCheckbox, meta);
export { PuraCheckbox };
