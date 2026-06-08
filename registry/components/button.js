// <pura-button> — variants: primary (default) | secondary | ghost | danger
// Sizes: sm | md (default) | lg. Attributes: disabled, loading, full.
import { PuraElement, define } from "../base.js";
import meta from "./button.meta.js";
import { buttonTemplate } from "./button.template.js";

class PuraButton extends PuraElement {
  static observedAttributes = ["variant", "size", "disabled", "loading", "full"];

  connectedCallback() {
    const { html, css } = buttonTemplate();
    this.render(html, css);
    this._btn = this.$("button");
    this._sync();
    // forward host clicks; block when disabled/loading
    this._btn.addEventListener("click", (e) => {
      if (this.hasAttribute("disabled") || this.hasAttribute("loading")) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    });
  }

  attributeChangedCallback() {
    if (this._btn) this._sync();
  }

  _sync() {
    const disabled = this.hasAttribute("disabled") || this.hasAttribute("loading");
    this._btn.disabled = disabled;
    this._btn.setAttribute("aria-busy", this.hasAttribute("loading") ? "true" : "false");
  }
}

define("pura-button", PuraButton, meta);
export { PuraButton };
