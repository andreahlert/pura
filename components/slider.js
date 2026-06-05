// <pura-slider> — range slider built on a styled native input[type=range] for
// reliable keyboard (arrows/Home/End/PageUp/PageDown) and ARIA (role=slider +
// valuemin/max/now) for free. Attributes: min (0), max (100), step (1), value,
// disabled, show-value. Mirrors value back to the host attribute, exposes
// .value, and emits 'input' and 'change' with detail { value }. With
// show-value an optional bubble tracks the thumb.
import { PuraElement, define } from "../base.js";

class PuraSlider extends PuraElement {
  static observedAttributes = ["min", "max", "step", "value", "disabled", "show-value"];

  connectedCallback() {
    const min = this.getAttribute("min") ?? "0";
    const max = this.getAttribute("max") ?? "100";
    const step = this.getAttribute("step") ?? "1";
    this.render(
      `<div class="wrap" part="root">
         <output class="bubble" part="bubble" aria-hidden="true"></output>
         <input type="range" part="input"
           min="${min}" max="${max}" step="${step}"
           ${this.hasAttribute("disabled") ? "disabled" : ""}
           ${this.getAttribute("aria-label") ? `aria-label="${this.getAttribute("aria-label")}"` : ""} />
       </div>`,
      CSS
    );
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

const CSS = `
  :host { display: block; --pura-slider-fill: 0%; }
  :host([disabled]) { opacity: 0.55; cursor: not-allowed; }

  .wrap { position: relative; display: block; padding: var(--pura-space-2) 0; }

  input {
    -webkit-appearance: none; appearance: none;
    width: 100%; margin: 0; background: transparent; cursor: pointer;
    font: inherit;
  }
  input:disabled { cursor: not-allowed; }
  input:focus { outline: none; }

  /* track — filled portion via gradient since WebKit has no progress pseudo */
  input::-webkit-slider-runnable-track {
    height: 0.375rem; border-radius: var(--pura-radius-full);
    background: linear-gradient(to right,
      var(--pura-primary) var(--pura-slider-fill),
      var(--pura-subtle) var(--pura-slider-fill));
  }
  input::-moz-range-track {
    height: 0.375rem; border-radius: var(--pura-radius-full);
    background: linear-gradient(to right,
      var(--pura-primary) var(--pura-slider-fill),
      var(--pura-subtle) var(--pura-slider-fill));
  }

  /* thumb */
  input::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 1.125rem; height: 1.125rem; border-radius: var(--pura-radius-full);
    background: #fff; border: 1px solid var(--pura-border-strong);
    box-shadow: var(--pura-shadow-sm);
    margin-top: -0.375rem; /* center on the 0.375rem track */
    transition: box-shadow var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }
  input::-moz-range-thumb {
    width: 1.125rem; height: 1.125rem; border-radius: var(--pura-radius-full);
    background: #fff; border: 1px solid var(--pura-border-strong);
    box-shadow: var(--pura-shadow-sm);
    transition: box-shadow var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }

  input:hover::-webkit-slider-thumb { border-color: var(--pura-fg); }
  input:hover::-moz-range-thumb { border-color: var(--pura-fg); }
  input:focus-visible::-webkit-slider-thumb {
    border-color: var(--pura-accent); box-shadow: 0 0 0 3px var(--pura-ring);
  }
  input:focus-visible::-moz-range-thumb {
    border-color: var(--pura-accent); box-shadow: 0 0 0 3px var(--pura-ring);
  }

  /* value bubble (opt-in via show-value) */
  .bubble {
    display: none; position: absolute; bottom: 100%; left: 0;
    transform: translateX(-50%); white-space: nowrap; pointer-events: none;
    padding: var(--pura-space-1) var(--pura-space-2);
    margin-bottom: var(--pura-space-1);
    font-size: var(--pura-text-xs); font-weight: 550; line-height: 1;
    color: var(--pura-primary-fg); background: var(--pura-primary);
    border-radius: var(--pura-radius-sm); box-shadow: var(--pura-shadow-sm);
  }
  :host([show-value]) .bubble { display: block; }
`;

define("pura-slider", PuraSlider);
export { PuraSlider };
