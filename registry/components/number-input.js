// <pura-number-input> — numeric field flanked by − / + stepper buttons.
// Attributes: min, max, step (default 1), value, disabled. Clamps to the
// [min, max] range, snaps to step, and mirrors value back to the host
// attribute. Exposes .value (Number) and emits 'input' (live) and 'change'
// (committed) with detail { value }. Keyboard: ArrowUp/ArrowDown step the
// value (also PageUp/PageDown for ×10, Home/End jump to min/max) on the field.
// Parts: root, decrement, input, increment.
import { PuraElement, define } from "../base.js";
import meta from "./number-input.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "number-input.label": { en: "Number", "pt-BR": "Número", fr: "Nombre", de: "Zahl", it: "Numero" },
  "number-input.decrease": { en: "Decrease", "pt-BR": "Diminuir", fr: "Diminuer", de: "Verringern", it: "Diminuisci" },
  "number-input.increase": { en: "Increase", "pt-BR": "Aumentar", fr: "Augmenter", de: "Erhöhen", it: "Aumenta" },
});

class PuraNumberInput extends PuraElement {
  static observedAttributes = ["min", "max", "step", "value", "disabled"];

  connectedCallback() {
    // Use the consumer-provided aria-label if present; otherwise fall back to
    // the localized default. Track which so locale changes only retitle the default.
    this._ownLabel = !this.hasAttribute("aria-label");
    const label = this.getAttribute("aria-label") || t("number-input.label");
    this.render(
      `<div class="wrap" part="root" role="group" aria-label="${esc(label)}">
         <button class="step dec" part="decrement" type="button"
           tabindex="-1" aria-label="${esc(t("number-input.decrease"))}" data-pura-action="decrement">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
         </button>
         <input class="field" part="input" type="text" inputmode="decimal"
           role="spinbutton" autocomplete="off"
           ${this.hasAttribute("disabled") ? "disabled" : ""} />
         <button class="step inc" part="increment" type="button"
           tabindex="-1" aria-label="${esc(t("number-input.increase"))}" data-pura-action="increment">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
         </button>
       </div>`,
      CSS
    );

    this._wrap = this.$(".wrap");
    this._input = this.$(".field");
    this._dec = this.$(".dec");
    this._inc = this.$(".inc");

    // Seed the displayed value from the attribute (clamped) without firing events.
    const seed = this.hasAttribute("value") ? this._coerce(this.getAttribute("value")) : null;
    if (seed !== null) {
      this._input.value = this._format(seed);
      if (String(seed) !== this.getAttribute("value")) this.setAttribute("value", String(seed));
    }
    this._syncAria();

    // Stepper buttons.
    this._dec.addEventListener("click", () => this._nudge(-1));
    this._inc.addEventListener("click", () => this._nudge(1));

    // Live typing: emit input but do not reformat mid-edit (lets users type "-").
    this._input.addEventListener("input", () => {
      const raw = this._input.value.trim();
      if (raw === "" || raw === "-" || raw === ".") return; // transient states
      const n = Number(raw);
      if (Number.isNaN(n)) return;
      this.setAttribute("value", String(n));
      this._syncAria();
      this._emit("input");
    });

    // Commit on blur / Enter: clamp, snap, reformat.
    this._input.addEventListener("change", () => this._commit());
    this._input.addEventListener("blur", () => this._commit());

    this._input.addEventListener("keydown", (e) => {
      if (this.hasAttribute("disabled")) return;
      const big = (Number(this.getAttribute("step")) || 1) * 10;
      switch (e.key) {
        case "ArrowUp": e.preventDefault(); this._nudge(1); break;
        case "ArrowDown": e.preventDefault(); this._nudge(-1); break;
        case "PageUp": e.preventDefault(); this._nudge(1, big); break;
        case "PageDown": e.preventDefault(); this._nudge(-1, big); break;
        case "Home":
          if (this.hasAttribute("min")) { e.preventDefault(); this._set(this._coerce(this.getAttribute("min")), true); }
          break;
        case "End":
          if (this.hasAttribute("max")) { e.preventDefault(); this._set(this._coerce(this.getAttribute("max")), true); }
          break;
        case "Enter": this._commit(); break;
      }
    });

    // React to locale changes by retitling the already-rendered nodes in place.
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  // Update only the localized aria-labels on existing shadow nodes; no re-render,
  // no new listeners. The root label is only retitled when no consumer aria-label
  // was supplied.
  _applyI18n() {
    if (this._ownLabel && this._wrap) this._wrap.setAttribute("aria-label", t("number-input.label"));
    if (this._dec) this._dec.setAttribute("aria-label", t("number-input.decrease"));
    if (this._inc) this._inc.setAttribute("aria-label", t("number-input.increase"));
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._input) return;
    if (name === "disabled") {
      const off = this.hasAttribute("disabled");
      this._input.disabled = off;
      this._syncAria();
      return;
    }
    if (name === "value") {
      const n = this._coerce(val);
      if (n === null) return;
      const formatted = this._format(n);
      if (this._input.value !== formatted) this._input.value = formatted;
      this._syncAria();
      return;
    }
    // min / max / step changed: re-clamp current value.
    if (this.hasAttribute("value")) {
      const n = this._coerce(this.getAttribute("value"));
      if (n !== null && String(n) !== this.getAttribute("value")) this.setAttribute("value", String(n));
    }
    this._syncAria();
  }

  // Step the value by `dir` (±1) × magnitude. Bases off the current numeric
  // value, falling back to min (or 0) when the field is empty/invalid.
  _nudge(dir, magnitude) {
    if (this.hasAttribute("disabled")) return;
    const step = magnitude ?? (Number(this.getAttribute("step")) || 1);
    const base = this._currentNumber();
    this._set(base + dir * step, true);
    this._input.focus();
  }

  // Read the field's current number, or the sensible base when empty.
  _currentNumber() {
    const raw = this._input.value.trim();
    const n = Number(raw);
    if (raw !== "" && !Number.isNaN(n)) return n;
    if (this.hasAttribute("min")) return Number(this.getAttribute("min"));
    return 0;
  }

  // Coerce a raw string to a clamped+snapped number, or null if not numeric.
  _coerce(raw) {
    if (raw === null || raw === undefined || String(raw).trim() === "") return null;
    const n = Number(raw);
    if (Number.isNaN(n)) return null;
    return this._clamp(this._snap(n));
  }

  _snap(n) {
    const step = Number(this.getAttribute("step"));
    if (!step || Number.isNaN(step) || step <= 0) return n;
    const origin = this.hasAttribute("min") ? Number(this.getAttribute("min")) : 0;
    const snapped = origin + Math.round((n - origin) / step) * step;
    // Tame binary float dust (e.g. 0.1 + 0.2) by rounding to step precision.
    const decimals = (String(step).split(".")[1] || "").length;
    return decimals ? Number(snapped.toFixed(decimals)) : snapped;
  }

  _clamp(n) {
    if (this.hasAttribute("min")) n = Math.max(n, Number(this.getAttribute("min")));
    if (this.hasAttribute("max")) n = Math.min(n, Number(this.getAttribute("max")));
    return n;
  }

  _format(n) {
    return String(n);
  }

  // Set value programmatically. `emit` fires input + change events.
  _set(n, emit) {
    const v = this._clamp(this._snap(Number(n)));
    if (Number.isNaN(v)) return;
    this._input.value = this._format(v);
    const changed = this.getAttribute("value") !== String(v);
    this.setAttribute("value", String(v));
    this._syncAria();
    if (emit) {
      this._emit("input");
      if (changed) this._emit("change");
    }
  }

  // Commit the typed text: clamp/snap/reformat and fire change if it moved.
  _commit() {
    const raw = this._input.value.trim();
    if (raw === "" || raw === "-" || raw === ".") {
      // Restore last known good value (or min/0) when left empty/partial.
      const fallback = this.hasAttribute("value") ? this._coerce(this.getAttribute("value")) : this._coerce(String(this._currentNumber()));
      this._input.value = fallback === null ? "" : this._format(fallback);
      this._syncAria();
      return;
    }
    const n = Number(raw);
    if (Number.isNaN(n)) { this._input.value = this.getAttribute("value") || ""; return; }
    const v = this._clamp(this._snap(n));
    const moved = this.getAttribute("value") !== String(v);
    this._input.value = this._format(v);
    this.setAttribute("value", String(v));
    this._syncAria();
    this._emit("input");
    if (moved) this._emit("change");
  }

  // Reflect numeric state onto the spinbutton ARIA + disable steppers at edges.
  _syncAria() {
    if (!this._input) return;
    const cur = this.hasAttribute("value") ? Number(this.getAttribute("value")) : NaN;
    if (this.hasAttribute("min")) this._input.setAttribute("aria-valuemin", this.getAttribute("min"));
    else this._input.removeAttribute("aria-valuemin");
    if (this.hasAttribute("max")) this._input.setAttribute("aria-valuemax", this.getAttribute("max"));
    else this._input.removeAttribute("aria-valuemax");
    if (!Number.isNaN(cur)) {
      this._input.setAttribute("aria-valuenow", String(cur));
      this._input.setAttribute("aria-valuetext", String(cur));
    } else {
      this._input.removeAttribute("aria-valuenow");
      this._input.removeAttribute("aria-valuetext");
    }
    const off = this.hasAttribute("disabled");
    const atMin = this.hasAttribute("min") && !Number.isNaN(cur) && cur <= Number(this.getAttribute("min"));
    const atMax = this.hasAttribute("max") && !Number.isNaN(cur) && cur >= Number(this.getAttribute("max"));
    if (this._dec) { this._dec.disabled = off || atMin; this._dec.setAttribute("aria-disabled", String(off || atMin)); }
    if (this._inc) { this._inc.disabled = off || atMax; this._inc.setAttribute("aria-disabled", String(off || atMax)); }
  }

  _emit(type) {
    this.dispatchEvent(new CustomEvent(type, { detail: { value: this.value }, bubbles: true }));
  }

  get value() {
    const v = this.getAttribute("value");
    return v === null || v.trim() === "" ? null : Number(v);
  }
  set value(v) {
    if (v === null || v === undefined || v === "") { this.removeAttribute("value"); if (this._input) this._input.value = ""; return; }
    if (this._input) this._set(v, false);
    else this.setAttribute("value", String(v));
  }

  get disabled() { return this.hasAttribute("disabled"); }
  set disabled(v) { this.toggleAttribute("disabled", !!v); }
}

// Escape a string for safe interpolation into an attribute value.
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const CSS = `
  :host { display: inline-block; }
  :host([disabled]) { opacity: 0.55; cursor: not-allowed; }

  .wrap {
    display: inline-flex; align-items: stretch;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    background: var(--pura-bg); box-shadow: var(--pura-shadow-sm);
    overflow: hidden; height: 2.25rem;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .wrap:hover { border-color: var(--pura-fg); }
  .wrap:focus-within {
    border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  .step {
    display: inline-flex; align-items: center; justify-content: center;
    flex: none; width: 2.25rem; padding: 0; font: inherit;
    border: none; background: var(--pura-subtle); color: var(--pura-fg);
    cursor: pointer;
    transition: background var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease);
  }
  .step:hover { background: var(--pura-subtle-hover); }
  .step:active { background: var(--pura-border); }
  .step:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--pura-accent); }
  .step:disabled { opacity: 0.4; cursor: not-allowed; background: var(--pura-subtle); }
  .step svg { width: 1rem; height: 1rem; }

  .field {
    width: 4rem; min-width: 0; flex: 1 1 auto; text-align: center;
    font: inherit; font-size: var(--pura-text-sm); font-variant-numeric: tabular-nums;
    color: var(--pura-fg); background: var(--pura-bg);
    border: none; border-left: 1px solid var(--pura-border);
    border-right: 1px solid var(--pura-border);
    padding: 0 var(--pura-space-2);
  }
  .field:focus { outline: none; }
  .field:disabled { cursor: not-allowed; background: var(--pura-subtle); }
`;

define("pura-number-input", PuraNumberInput, meta);
export { PuraNumberInput };
