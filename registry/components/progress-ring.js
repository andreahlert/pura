// <pura-progress-ring value="0..100"> — circular determinate progress. An SVG
// ring whose foreground arc is driven by stroke-dashoffset; the percentage is
// shown in the center. Add `indeterminate` for an animated unknown-progress spin.
//
// Attributes:
//   value         — number 0..100 (clamped). Ignored while indeterminate.
//   size          — ring diameter in px (default 64). Bare number or px value.
//   thickness     — stroke width in px (default 6, capped at half the size).
//   indeterminate — boolean; continuous spin, hides the percentage label.
//   label         — optional accessible name override (else "<value> percent").
//
// Parts:
//   ring (root, carries role=progressbar), svg, track (background circle),
//   indicator (progress arc), value (center percentage text).
//
// ARIA: the root carries role="progressbar" with aria-valuemin / aria-valuemax /
//   aria-valuenow / aria-valuetext / aria-label. While indeterminate, valuenow is
//   omitted and aria-busy="true". It is a read-only display, so there is no
//   keyboard interaction; animation respects prefers-reduced-motion via the base
//   reset (the arc transition / spin are neutralized there).
//
// Agent-native layer: stable data-pura-ring-* attributes mirror live state and
//   each instance registers in window.__puraProgressRings keyed by its
//   data-pura-id, so an agent can enumerate / read every ring without DOM diving.
import { PuraElement, define } from "../base.js";
import meta from "./progress-ring.meta.js";
import { progressRingTemplate } from "./progress-ring.template.js";

let uid = 0;

// Lazily-created global registry: data-pura-id -> element.
function registry() {
  return (window.__puraProgressRings ||= new Map());
}

const clamp = (n) => Math.max(0, Math.min(100, n));

class PuraProgressRing extends PuraElement {
  static observedAttributes = ["value", "size", "thickness", "indeterminate", "label"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-progress-ring-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = progressRingTemplate(this);
    this.render(html, css);

    this._root = this.$(".ring");
    this._track = this.$(".track");
    this._indicator = this.$(".indicator");
    this._valueEl = this.$(".value");
    this._sync();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this._root) this._sync();
  }

  // ---- public API -------------------------------------------------------
  get value() { return clamp(Number(this.getAttribute("value") || 0)); }
  set value(v) { this.setAttribute("value", String(v)); }

  get indeterminate() { return this.hasAttribute("indeterminate"); }
  set indeterminate(v) {
    v ? this.setAttribute("indeterminate", "") : this.removeAttribute("indeterminate");
  }

  // ---- internals --------------------------------------------------------
  // A positive finite number parsed from an attribute, or a fallback.
  _num(attr, fallback) {
    const raw = this.getAttribute(attr);
    if (raw == null || raw === "") return fallback;
    const n = parseFloat(raw);
    return Number.isFinite(n) && n > 0 ? n : fallback;
  }

  _sync() {
    const size = this._num("size", 64);
    const thickness = Math.min(this._num("thickness", 6), size / 2);
    const indeterminate = this.indeterminate;
    const value = this.value;
    const pct = Math.round(value);

    // Geometry is expressed in the 0..100 viewBox; stroke width scales with it.
    const vbStroke = (thickness / size) * 100;
    const radius = 50 - vbStroke / 2;
    const circumference = 2 * Math.PI * radius;

    this._root.style.setProperty("--ring-size", size + "px");
    this._track.setAttribute("r", radius);
    this._track.style.strokeWidth = vbStroke;
    this._indicator.setAttribute("r", radius);
    this._indicator.style.strokeWidth = vbStroke;
    this._indicator.style.strokeDasharray = circumference;

    if (indeterminate) {
      // Fixed visible arc (~25% of the circle); the SVG element itself spins.
      this._indicator.style.strokeDashoffset = circumference * 0.75;
      this._valueEl.textContent = "";
      this._root.removeAttribute("aria-valuenow");
      this._root.setAttribute("aria-valuetext", "Loading");
      this._root.setAttribute("aria-label", this.getAttribute("label") || "Loading");
      this._root.setAttribute("aria-busy", "true");
    } else {
      this._indicator.style.strokeDashoffset = circumference * (1 - value / 100);
      this._valueEl.textContent = pct + "%";
      this._root.setAttribute("aria-valuenow", String(pct));
      this._root.setAttribute("aria-valuetext", pct + "%");
      this._root.setAttribute("aria-label", this.getAttribute("label") || `${pct} percent`);
      this._root.removeAttribute("aria-busy");
    }

    // Agent-native: stable, machine-readable mirror of live state.
    this.setAttribute("data-pura-ring-value", indeterminate ? "" : String(pct));
    this.setAttribute("data-pura-ring-state", indeterminate ? "indeterminate" : "determinate");
    this.setAttribute("data-pura-ring-size", String(size));
    this.setAttribute("data-pura-ring-thickness", String(thickness));
  }
}


define("pura-progress-ring", PuraProgressRing, meta);
export { PuraProgressRing };
