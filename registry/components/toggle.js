// <pura-toggle> — two-state toggle button (shadcn/ui Toggle).
// Variants: default (subtle) | outline. Sizes: sm | md (default) | lg.
// Attributes: pressed (reflects on/off state), variant, size, disabled.
// Default slot = content (icon and/or text). Toggles on click + Space/Enter.
// Emits CustomEvent("change", { detail: { pressed } }).
import { PuraElement, define } from "../base.js";
import meta from "./toggle.meta.js";
import { toggleTemplate } from "./toggle.template.js";

class PuraToggle extends PuraElement {
  static observedAttributes = ["pressed", "disabled"];

  connectedCallback() {
    const { html, css } = toggleTemplate(this);
    this.render(html, css);
    this._btn = this.$("button");
    this._sync();
    this._btn.addEventListener("click", (e) => {
      if (this.hasAttribute("disabled")) {
        e.stopImmediatePropagation();
        e.preventDefault();
        return;
      }
      this.toggle();
    });
  }

  attributeChangedCallback() {
    if (this._btn) this._sync();
  }

  // Reflect current state to the rendered button's ARIA + disabled.
  _sync() {
    const pressed = this.hasAttribute("pressed");
    this._btn.setAttribute("aria-pressed", pressed ? "true" : "false");
    this._btn.disabled = this.hasAttribute("disabled");
  }

  get pressed() {
    return this.hasAttribute("pressed");
  }

  set pressed(v) {
    if (v) this.setAttribute("pressed", "");
    else this.removeAttribute("pressed");
  }

  get value() {
    return this.getAttribute("value") ?? this.textContent.trim();
  }
  set value(v) {
    this.setAttribute("value", v);
  }

  // Roving-focus helpers used by <pura-toggle-group>.
  setTabbable(on) {
    if (this._btn) this._btn.tabIndex = on ? 0 : -1;
  }
  focus() {
    if (this._btn) this._btn.focus();
  }

  // Flip state and notify; ignored while disabled.
  toggle() {
    if (this.hasAttribute("disabled")) return;
    this.pressed = !this.pressed;
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { pressed: this.pressed, value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }
}


define("pura-toggle", PuraToggle, meta);
export { PuraToggle };
