// <pura-radio> — single radio. Group by shared `name`. Label via slot.
// Attributes: checked, disabled, name, value.
import { PuraElement, define } from "../base.js";
import meta from "./radio.meta.js";
import { radioTemplate } from "./radio.template.js";

class PuraRadio extends PuraElement {
  static observedAttributes = ["checked", "disabled"];

  connectedCallback() {
    const { html, css } = radioTemplate(this);
    this.render(html, css);
    this._dot = this.$(".dot");
    const select = () => {
      if (this.hasAttribute("disabled") || this.hasAttribute("checked")) return;
      const name = this.getAttribute("name");
      if (name) {
        document.querySelectorAll(`pura-radio[name="${name}"]`).forEach((r) => r.removeAttribute("checked"));
      }
      this.setAttribute("checked", "");
      this.dispatchEvent(new CustomEvent("change", { detail: { value: this.getAttribute("value") }, bubbles: true }));
    };
    this._dot.addEventListener("click", select);
    this._dot.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); select(); }
    });
  }

  attributeChangedCallback() {
    if (this._dot) this._dot.setAttribute("aria-checked", this.hasAttribute("checked"));
  }

  get checked() { return this.hasAttribute("checked"); }
  set checked(v) { this.toggleAttribute("checked", !!v); }
}


define("pura-radio", PuraRadio, meta);
export { PuraRadio };
