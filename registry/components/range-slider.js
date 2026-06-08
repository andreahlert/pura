// <pura-range-slider> — dual-thumb range slider: two handles (min + max) over a
// track with a filled segment between them. Drag either thumb with a pointer or
// move it with the keyboard (arrows / Home / End / PageUp / PageDown). Values are
// clamped so value-min never exceeds value-max. Each thumb is role=slider with
// its own aria-valuemin/max/now and label so assistive tech and agents can read
// and drive each handle independently.
//
// Attributes: min (0), max (100), step (1), value-min, value-max, disabled.
// Reflects value-min / value-max back to the host. Exposes .valueMin / .valueMax
// (and .min / .max / .step). Emits 'input' and 'change' with detail { min, max }.
// Parts: root, track, fill, thumb, thumb-min, thumb-max.
import { PuraElement, define } from "../base.js";
import meta from "./range-slider.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { rangeSliderTemplate } from "./range-slider.template.js";

registerMessages({
  "range-slider.label": { en: "Range", "pt-BR": "Intervalo", fr: "Plage", de: "Bereich", it: "Intervallo" },
  "range-slider.minimum": { en: "minimum", "pt-BR": "mínimo", fr: "minimum", de: "Minimum", it: "minimo" },
  "range-slider.maximum": { en: "maximum", "pt-BR": "máximo", fr: "maximum", de: "Maximum", it: "massimo" },
});

class PuraRangeSlider extends PuraElement {
  static observedAttributes = ["min", "max", "step", "value-min", "value-max", "disabled"];

  connectedCallback() {
    const label = this.getAttribute("aria-label") || t("range-slider.label");
    const { html, css } = rangeSliderTemplate(this);
    this.render(html, css);

    this._track = this.$(".track");
    this._fill = this.$(".fill");
    this._thumbMin = this.$('[data-pura-part="thumb-min"]');
    this._thumbMax = this.$('[data-pura-part="thumb-max"]');

    // Resolve initial values: default to the full range if unspecified so the
    // component never throws and renders something sensible with no attributes.
    const min = this._min();
    const max = this._max();
    if (!this.hasAttribute("value-min")) this.setAttribute("value-min", String(min));
    if (!this.hasAttribute("value-max")) this.setAttribute("value-max", String(max));

    this._wireThumb(this._thumbMin, "min");
    this._wireThumb(this._thumbMax, "max");

    this._sync();

    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  // Update only the already-rendered i18n nodes in place on locale change.
  _applyI18n() {
    if (!this._thumbMin) return;
    const label = this.getAttribute("aria-label") || t("range-slider.label");
    this._thumbMin.setAttribute("aria-label", `${label} ${t("range-slider.minimum")}`);
    this._thumbMax.setAttribute("aria-label", `${label} ${t("range-slider.maximum")}`);
  }

  attributeChangedCallback(name, _old, _val) {
    if (!this._track) return; // not rendered yet
    if (name === "disabled") {
      const off = this.hasAttribute("disabled");
      this._thumbMin.setAttribute("tabindex", off ? "-1" : "0");
      this._thumbMax.setAttribute("tabindex", off ? "-1" : "0");
    }
    this._sync();
  }

  // ---- numeric model -------------------------------------------------------
  _min() { return num(this.getAttribute("min"), 0); }
  _max() {
    const mn = this._min();
    const mx = num(this.getAttribute("max"), 100);
    return mx > mn ? mx : mn + 1; // guard against max <= min
  }
  _step() {
    const s = num(this.getAttribute("step"), 1);
    return s > 0 ? s : 1;
  }

  _clampMin(v) {
    return clamp(snap(v, this._min(), this._step()), this._min(), this.valueMax);
  }
  _clampMax(v) {
    return clamp(snap(v, this._min(), this._step()), this.valueMin, this._max());
  }

  // ---- interaction ---------------------------------------------------------
  _wireThumb(el, which) {
    // Pointer drag.
    el.addEventListener("pointerdown", (e) => {
      if (this.hasAttribute("disabled")) return;
      e.preventDefault();
      el.focus();
      el.setPointerCapture(e.pointerId);
      const move = (ev) => this._setFromPointer(which, ev.clientX);
      const up = (ev) => {
        el.releasePointerCapture(ev.pointerId);
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", up);
        el.removeEventListener("pointercancel", up);
        this._emit("change");
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);
      this._setFromPointer(which, e.clientX);
    });

    // Keyboard.
    el.addEventListener("keydown", (e) => {
      if (this.hasAttribute("disabled")) return;
      const step = this._step();
      const big = Math.max(step, (this._max() - this._min()) / 10);
      const cur = which === "min" ? this.valueMin : this.valueMax;
      let next = cur;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp": next = cur + step; break;
        case "ArrowLeft":
        case "ArrowDown": next = cur - step; break;
        case "PageUp": next = cur + big; break;
        case "PageDown": next = cur - big; break;
        case "Home": next = which === "min" ? this._min() : this.valueMin; break;
        case "End": next = which === "min" ? this.valueMax : this._max(); break;
        default: return;
      }
      e.preventDefault();
      this._set(which, next, true);
      this._emit("change");
    });
  }

  _setFromPointer(which, clientX) {
    const rect = this._track.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    const raw = this._min() + ratio * (this._max() - this._min());
    this._set(which, raw, true);
  }

  // Apply a new value to one thumb, clamp it against the other, reflect, sync,
  // and emit 'input'. emit=false is used for silent programmatic sync.
  _set(which, value, emit) {
    const v = which === "min" ? this._clampMin(value) : this._clampMax(value);
    const attr = which === "min" ? "value-min" : "value-max";
    if (String(v) === this.getAttribute(attr)) {
      // No change, but still keep visuals coherent.
      this._sync();
      return;
    }
    this.setAttribute(attr, String(v));
    this._sync();
    if (emit) this._emit("input");
  }

  _emit(type) {
    this.dispatchEvent(new CustomEvent(type, {
      detail: { min: this.valueMin, max: this.valueMax },
      bubbles: true,
    }));
  }

  // ---- render / reflect ----------------------------------------------------
  _sync() {
    const min = this._min();
    const max = this._max();
    const span = max - min;

    // Enforce ordering defensively in case attributes were set out of order.
    let lo = clamp(num(this.getAttribute("value-min"), min), min, max);
    let hi = clamp(num(this.getAttribute("value-max"), max), min, max);
    if (lo > hi) lo = hi;

    const loPct = span > 0 ? ((lo - min) / span) * 100 : 0;
    const hiPct = span > 0 ? ((hi - min) / span) * 100 : 0;

    this._thumbMin.style.left = `${loPct}%`;
    this._thumbMax.style.left = `${hiPct}%`;
    this._fill.style.left = `${loPct}%`;
    this._fill.style.right = `${100 - hiPct}%`;

    // ARIA + machine-readable state on each thumb.
    this._aria(this._thumbMin, min, hi, lo);
    this._aria(this._thumbMax, lo, max, hi);
  }

  _aria(el, vmin, vmax, now) {
    el.setAttribute("aria-valuemin", String(vmin));
    el.setAttribute("aria-valuemax", String(vmax));
    el.setAttribute("aria-valuenow", String(now));
    el.setAttribute("aria-valuetext", String(now));
    el.setAttribute("aria-disabled", this.hasAttribute("disabled") ? "true" : "false");
    el.dataset.puraValue = String(now);
  }

  // ---- public API ----------------------------------------------------------
  get min() { return this._min(); }
  set min(v) { this.setAttribute("min", String(v)); }
  get max() { return this._max(); }
  set max(v) { this.setAttribute("max", String(v)); }
  get step() { return this._step(); }
  set step(v) { this.setAttribute("step", String(v)); }

  get valueMin() {
    return clamp(num(this.getAttribute("value-min"), this._min()), this._min(), this._max());
  }
  set valueMin(v) { if (this._track) this._set("min", num(v, this._min()), false); else this.setAttribute("value-min", String(num(v, 0))); }

  get valueMax() {
    return clamp(num(this.getAttribute("value-max"), this._max()), this._min(), this._max());
  }
  set valueMax(v) { if (this._track) this._set("max", num(v, this._max()), false); else this.setAttribute("value-max", String(num(v, 100))); }

  get value() { return { min: this.valueMin, max: this.valueMax }; }
}

// ---- helpers ---------------------------------------------------------------
function num(v, fallback) {
  if (v === null || v === undefined || v === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}
function clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}
// Snap to the nearest step relative to the floor of the range.
function snap(v, floor, step) {
  const snapped = floor + Math.round((v - floor) / step) * step;
  // Avoid floating-point dust (e.g. 0.30000000000000004).
  return Number(snapped.toFixed(10));
}


define("pura-range-slider", PuraRangeSlider, meta);
export { PuraRangeSlider };
