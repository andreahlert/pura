// <pura-knob>, a rotary knob input (PrimeReact Knob style).
// An SVG circular dial with a track arc plus a value arc from min to max and a
// center readout. Drag up/down or around to change, plus wheel and arrow keys.
//
// Attributes: value, min (0), max (100), step (1), size (px, default 100),
//   stroke-width, readonly, disabled, value-template (use {value}).
// Parts: svg, range (track arc), value (value arc), text (center readout).
// ARIA: role=slider with aria-valuenow/min/max. Emits input on change, change
//   on release.
import { PuraElement, define } from "../base.js";

// Dial geometry in a 0..100 viewBox. A gap-at-bottom arc (PrimeReact style)
// spanning 270 degrees, from 135 degrees to 405 degrees clockwise.
const CX = 50;
const CY = 50;
const R = 40;
const START = 135; // degrees, bottom-left
const SWEEP = 270; // total arc span

function num(raw, fallback) {
  if (raw == null || raw === "") return fallback;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}

// Point on the dial circle for a given angle (degrees, SVG clockwise from +x).
function polar(deg) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
}

// Arc path from the start angle through a fraction (0..1) of the sweep.
function arcPath(frac) {
  const f = Math.max(0, Math.min(1, frac));
  const a0 = START;
  const a1 = START + SWEEP * f;
  const p0 = polar(a0);
  const p1 = polar(a1);
  const large = SWEEP * f > 180 ? 1 : 0;
  return `M ${p0.x} ${p0.y} A ${R} ${R} 0 ${large} 1 ${p1.x} ${p1.y}`;
}

class PuraKnob extends PuraElement {
  static observedAttributes = ["value", "min", "max", "step", "size", "stroke-width", "readonly", "disabled", "value-template"];

  connectedCallback() {
    this.render(
      `<div class="knob" part="root">
         <svg class="svg" part="svg" viewBox="0 0 100 100" role="slider" tabindex="0">
           <path class="range" part="range" fill="none"></path>
           <path class="value" part="value" fill="none"></path>
           <text class="text" part="text" x="50" y="50" text-anchor="middle" dominant-baseline="central"></text>
         </svg>
       </div>`,
      CSS
    );
    this._svg = this.$(".svg");
    this._range = this.$(".range");
    this._valueArc = this.$(".value");
    this._text = this.$(".text");

    if (!this.hasAttribute("value")) this.setAttribute("value", String(this._range_().min));

    this._onPointerDown = (e) => this._pointerDown(e);
    this._onPointerMove = (e) => this._pointerMove(e);
    this._onPointerUp = (e) => this._pointerUp(e);
    this._onWheel = (e) => this._wheel(e);
    this._onKey = (e) => this._key(e);

    this._svg.addEventListener("pointerdown", this._onPointerDown);
    this._svg.addEventListener("wheel", this._onWheel, { passive: false });
    this._svg.addEventListener("keydown", this._onKey);

    this._sync();
  }

  disconnectedCallback() {
    document.removeEventListener("pointermove", this._onPointerMove);
    document.removeEventListener("pointerup", this._onPointerUp);
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._svg) return;
    if (name === "value" && val !== null && num(val, null) === this.value) {
      // No semantic change, avoid loop.
    }
    this._sync();
  }

  // ---- public API ----
  get value() {
    const { min, max } = this._range_();
    return Math.max(min, Math.min(max, num(this.getAttribute("value"), min)));
  }
  set value(v) {
    // Programmatic assignment sets silently (no input/change), matching slider
    // and gauge, to avoid event echo loops.
    const { min, max } = this._range_();
    const step = this._step();
    let next = min + Math.round((num(v, min) - min) / step) * step;
    next = Math.max(min, Math.min(max, next));
    next = Math.round(next * 1e6) / 1e6;
    this.setAttribute("value", String(next));
    this._sync();
  }

  get min() { return this._range_().min; }
  set min(v) { this.setAttribute("min", String(v)); }
  get max() { return this._range_().max; }
  set max(v) { this.setAttribute("max", String(v)); }

  // ---- internals ----
  _range_() {
    const min = num(this.getAttribute("min"), 0);
    let max = num(this.getAttribute("max"), 100);
    if (max <= min) max = min + 1;
    return { min, max };
  }

  _step() {
    const s = num(this.getAttribute("step"), 1);
    return s > 0 ? s : 1;
  }

  _locked() {
    return this.hasAttribute("disabled") || this.hasAttribute("readonly");
  }

  // Round v to the step grid, clamp into range, set attr, fire events.
  _setValue(v, fromInteraction) {
    const { min, max } = this._range_();
    const step = this._step();
    let next = min + Math.round((v - min) / step) * step;
    next = Math.max(min, Math.min(max, next));
    // Tidy float noise.
    next = Math.round(next * 1e6) / 1e6;
    if (next === this.value) { this._sync(); return; }
    this.setAttribute("value", String(next));
    this._sync();
    this.dispatchEvent(new CustomEvent("input", { detail: { value: next }, bubbles: true }));
    this._pendingChange = true;
    if (!fromInteraction) this._flushChange();
  }

  _flushChange() {
    if (!this._pendingChange) return;
    this._pendingChange = false;
    this.dispatchEvent(new CustomEvent("change", { detail: { value: this.value }, bubbles: true }));
  }

  _frac() {
    const { min, max } = this._range_();
    return (this.value - min) / (max - min);
  }

  _sync() {
    const size = num(this.getAttribute("size"), 100);
    this.style.setProperty("--knob-size", `${size}px`);
    const sw = num(this.getAttribute("stroke-width"), Math.max(4, size * 0.09));
    this.style.setProperty("--knob-stroke", String(sw));

    const frac = this._frac();
    this._range.setAttribute("d", arcPath(1));
    this._valueArc.setAttribute("d", arcPath(frac));

    const tpl = this.getAttribute("value-template");
    this._text.textContent = tpl ? tpl.split("{value}").join(String(this.value)) : String(this.value);

    const { min, max } = this._range_();
    this._svg.setAttribute("aria-valuenow", String(this.value));
    this._svg.setAttribute("aria-valuemin", String(min));
    this._svg.setAttribute("aria-valuemax", String(max));
    this._svg.setAttribute("aria-disabled", this.hasAttribute("disabled") ? "true" : "false");
    if (this.hasAttribute("disabled")) this._svg.removeAttribute("tabindex");
    else this._svg.setAttribute("tabindex", "0");
  }

  // ---- interaction ----
  _pointerDown(e) {
    if (this._locked()) return;
    e.preventDefault();
    this._svg.focus();
    this._dragStartY = e.clientY;
    this._dragStartVal = this.value;
    this._svg.setPointerCapture?.(e.pointerId);
    document.addEventListener("pointermove", this._onPointerMove);
    document.addEventListener("pointerup", this._onPointerUp);
  }

  _pointerMove(e) {
    if (this._locked()) return;
    // Vertical drag, up increases. One full range over ~150px of travel.
    const { min, max } = this._range_();
    const dy = this._dragStartY - e.clientY;
    const delta = (dy / 150) * (max - min);
    this._setValue(this._dragStartVal + delta, true);
  }

  _pointerUp(e) {
    document.removeEventListener("pointermove", this._onPointerMove);
    document.removeEventListener("pointerup", this._onPointerUp);
    this._svg.releasePointerCapture?.(e.pointerId);
    this._flushChange();
  }

  _wheel(e) {
    if (this._locked()) return;
    e.preventDefault();
    const dir = e.deltaY < 0 ? 1 : -1;
    this._setValue(this.value + dir * this._step(), false);
  }

  _key(e) {
    if (this._locked()) return;
    const { min, max } = this._range_();
    const step = this._step();
    let handled = true;
    switch (e.key) {
      case "ArrowUp":
      case "ArrowRight": this._setValue(this.value + step, false); break;
      case "ArrowDown":
      case "ArrowLeft": this._setValue(this.value - step, false); break;
      case "PageUp": this._setValue(this.value + step * 10, false); break;
      case "PageDown": this._setValue(this.value - step * 10, false); break;
      case "Home": this._setValue(min, false); break;
      case "End": this._setValue(max, false); break;
      default: handled = false;
    }
    if (handled) e.preventDefault();
  }
}

const CSS = `
  :host { display: inline-block; --knob-size: 100px; --knob-stroke: 9; }
  :host([disabled]) { opacity: 0.55; }
  :host([disabled]) .svg, :host([readonly]) .svg { cursor: default; }

  .knob { display: inline-flex; }
  .svg {
    display: block; width: var(--knob-size); height: var(--knob-size);
    cursor: ns-resize; touch-action: none; outline: none;
  }
  .svg:focus-visible { outline: none; }
  .svg:focus-visible .range { stroke: var(--pura-border-strong); }

  .range {
    stroke: var(--pura-subtle);
    stroke-width: var(--knob-stroke);
    stroke-linecap: round;
  }
  .value {
    stroke: var(--pura-accent);
    stroke-width: var(--knob-stroke);
    stroke-linecap: round;
    transition: d var(--pura-dur) var(--pura-ease);
  }
  .text {
    fill: var(--pura-fg);
    font-family: var(--pura-font);
    font-size: 18px; font-weight: 650;
    font-variant-numeric: tabular-nums;
  }
`;

define("pura-knob", PuraKnob);
export { PuraKnob };
