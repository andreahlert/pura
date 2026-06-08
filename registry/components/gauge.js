// <pura-gauge> — semicircular gauge / meter. A 180° SVG arc whose track is
// filled from `min` toward `value` (up to `max`), with a pivoting needle and a
// center readout of the value plus an optional label.
//
// Attributes:
//   value — current reading (clamped into [min, max]). Default 0.
//   min   — start of the scale. Default 0.
//   max   — end of the scale. Default 100. If max <= min it falls back to min+1.
//   label — caption shown under the value and used for the accessible name.
//
// Parts:
//   gauge (root), svg, track (full arc), fill (value arc), needle, pivot,
//   readout (center stack), value (number), label (caption), ticks, tick.
//
// ARIA: the root carries role="meter" with aria-valuemin / aria-valuemax /
//   aria-valuenow / aria-valuetext and an aria-label derived from `label`.
//   The gauge is a read-only display (a meter, not a slider) so there is no
//   keyboard interaction; animation respects prefers-reduced-motion via the
//   base reset (the fill/needle transitions are neutralized there).
//
// Agent-native layer: stable data-pura-gauge-* attributes mirror live state and
//   each instance registers in window.__puraGauges keyed by its data-pura-id, so
//   an agent can enumerate / read every gauge on the page without DOM diving.
import { PuraElement, define } from "../base.js";
import meta from "./gauge.meta.js";
import { gaugeTemplate } from "./gauge.template.js";

let uid = 0;

// Lazily-created global registry: data-pura-id -> element.
function registry() {
  return (window.__puraGauges ||= new Map());
}

// Geometry of the semicircle in the SVG's 0..100 width viewBox. The arc spans
// from (10,90) on the left, over the top, to (90,90) on the right.
const CX = 50;
const CY = 50;
const R = 40;
// Length of a 180° arc of radius R (used to drive the fill via dash offset).
const ARC_LEN = Math.PI * R;

// A finite number parsed from an attribute, or a fallback when absent/invalid.
function num(raw, fallback) {
  if (raw == null || raw === "") return fallback;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}

class PuraGauge extends PuraElement {
  static observedAttributes = ["value", "min", "max", "label"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-gauge-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = gaugeTemplate(this);
    this.render(html, css);

    this._root = this.$(".gauge");
    this._fill = this.$(".fill");
    this._needleGroup = this.$(".needle-group");
    this._valueEl = this.$(".value");
    this._labelEl = this.$(".label");
    this._sync();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this._root) this._sync();
  }

  // ---- public API -------------------------------------------------------
  get value() {
    const { min, max } = this._range();
    return Math.max(min, Math.min(max, num(this.getAttribute("value"), min)));
  }
  set value(v) { this.setAttribute("value", String(v)); }

  get min() { return this._range().min; }
  set min(v) { this.setAttribute("min", String(v)); }

  get max() { return this._range().max; }
  set max(v) { this.setAttribute("max", String(v)); }

  // ---- internals --------------------------------------------------------
  // Resolve a sane [min, max] range; guarantee max > min so fractions are safe.
  _range() {
    const min = num(this.getAttribute("min"), 0);
    let max = num(this.getAttribute("max"), 100);
    if (max <= min) max = min + 1;
    return { min, max };
  }

  _sync() {
    const { min, max } = this._range();
    const value = this.value;
    const frac = (value - min) / (max - min); // 0..1
    const label = this.getAttribute("label") || "";

    // Fill the arc proportionally. The dasharray is the full arc length (via
    // pathLength) so the visible portion is frac * ARC_LEN.
    this._fill.style.strokeDasharray = `${frac * ARC_LEN} ${ARC_LEN}`;

    // Needle sweeps from -90° (min, pointing left) to +90° (max, pointing right).
    const angle = -90 + frac * 180;
    this._needleGroup.style.transform = `rotate(${angle}deg)`;
    this._needleGroup.style.transformOrigin = `${CX}px ${CY}px`;

    // Center readout: show the raw value (trimmed) and the label, if any.
    const display = this._format(value);
    this._valueEl.textContent = display;
    this._labelEl.textContent = label;
    this._labelEl.style.display = label ? "" : "none";

    // ARIA meter semantics + a human/agent-readable value string.
    const valueText = label ? `${display} (${label})` : display;
    this._root.setAttribute("aria-valuemin", String(min));
    this._root.setAttribute("aria-valuemax", String(max));
    this._root.setAttribute("aria-valuenow", String(value));
    this._root.setAttribute("aria-valuetext", valueText);
    this._root.setAttribute("aria-label", label || "Gauge");

    // Agent-native: stable, machine-readable mirror of live state.
    this.setAttribute("data-pura-gauge-value", String(value));
    this.setAttribute("data-pura-gauge-min", String(min));
    this.setAttribute("data-pura-gauge-max", String(max));
    this.setAttribute("data-pura-gauge-percent", String(Math.round(frac * 100)));
    this.setAttribute("data-pura-gauge-label", label);
  }

  // Compact numeric formatting: drop trailing zeros, keep it readable.
  _format(n) {
    if (!Number.isFinite(n)) return "0";
    const rounded = Math.round(n * 100) / 100;
    return String(rounded);
  }
}

define("pura-gauge", PuraGauge, meta);
export { PuraGauge };
