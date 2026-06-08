// <pura-switch> — toggle. Label via slot. Attributes: checked, disabled.
import { PuraElement, define } from "../base.js";
import meta from "./switch.meta.js";
import { switchTemplate } from "./switch.template.js";

class PuraSwitch extends PuraElement {
  static observedAttributes = ["checked", "disabled"];

  connectedCallback() {
    const { html, css } = switchTemplate(this);
    this.render(html, css);
    this._track = this.$(".track");
    // No visible slotted label? Forward the host's aria-label onto the
    // role=switch node so it still has an accessible name.
    const hostLabel = this.getAttribute("aria-label");
    if (hostLabel) { this._track.setAttribute("aria-label", hostLabel); this._track.removeAttribute("aria-labelledby"); }
    const toggle = () => {
      if (this.hasAttribute("disabled")) return;
      this.toggleAttribute("checked");
      this.dispatchEvent(new CustomEvent("change", { detail: { checked: this.hasAttribute("checked") }, bubbles: true }));
    };
    this._track.addEventListener("click", toggle);
    this._track.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); }
    });
  }

  attributeChangedCallback() {
    if (this._track) this._track.setAttribute("aria-checked", this.hasAttribute("checked"));
  }

  get checked() { return this.hasAttribute("checked"); }
  set checked(v) { this.toggleAttribute("checked", !!v); }
}


define("pura-switch", PuraSwitch, meta);
export { PuraSwitch };
