// <pura-slider> — range slider built on a styled native input[type=range] for
// reliable keyboard (arrows/Home/End/PageUp/PageDown) and ARIA (role=slider +
// valuemin/max/now) for free. Attributes: min (0), max (100), step (1), value,
// disabled, show-value. Mirrors value back to the host attribute, exposes
// .value, and emits 'input' and 'change' with detail { value }. With
// show-value an optional bubble tracks the thumb.
import { PuraElement, define } from "../base.js";
import meta from "./slider.meta.js";
import { sliderTemplate } from "./slider.template.js";

class PuraSlider extends PuraElement {
  static observedAttributes = ["min", "max", "step", "value", "disabled", "show-value"];

  connectedCallback() {
    const min = this.getAttribute("min") ?? "0";
    const max = this.getAttribute("max") ?? "100";
    const step = this.getAttribute("step") ?? "1";
    const { html, css } = sliderTemplate(this);
    this.render(html, css);
    this._input = this.$("input");
    this._bubble = this.$(".bubble");

    // Resolve initial value: explicit attr, else whatever the native input
    // settles on (defaults to the midpoint of min/max), then mirror it back so
    // the host attribute and fill agree on first paint.
    if (this.hasAttribute("value")) this._input.value = this.getAttribute("value");
    if (this.getAttribute("value") !== this._input.value) {
      this.setAttribute("value", this._input.value);
    }
    this._sync();

    this._input.addEventListener("input", () => {
      this.setAttribute("value", this._input.value);
      this._sync();
      this.dispatchEvent(new CustomEvent("input", { detail: { value: this.value }, bubbles: true }));
    });
    this._input.addEventListener("change", () => {
      this.dispatchEvent(new CustomEvent("change", { detail: { value: this.value }, bubbles: true }));
    });
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._input) return;
    if (name === "min") this._input.min = val ?? "0";
    else if (name === "max") this._input.max = val ?? "100";
    else if (name === "step") this._input.step = val ?? "1";
    else if (name === "disabled") this._input.disabled = this.hasAttribute("disabled");
    else if (name === "value" && val !== null && val !== this._input.value) {
      this._input.value = val;
    }
    this._sync();
  }

  // Recompute the filled-track gradient and reposition the value bubble.
  _sync() {
    const min = Number(this._input.min || 0);
    const max = Number(this._input.max || 100);
    const val = Number(this._input.value || 0);
    const pct = max > min ? ((val - min) / (max - min)) * 100 : 0;
    this.style.setProperty("--pura-slider-fill", `${pct}%`);
    if (this._bubble) {
      this._bubble.textContent = this._input.value;
      this._bubble.style.left = `${pct}%`;
    }
  }

  get value() { return this._input ? Number(this._input.value) : Number(this.getAttribute("value") ?? 0); }
  set value(v) { this.setAttribute("value", v); if (this._input) { this._input.value = v; this._sync(); } }
}


define("pura-slider", PuraSlider, meta);
export { PuraSlider };
