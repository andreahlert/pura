// <pura-meter> — labeled meter bar for a scalar measurement within a known
// range (like the native <meter> element, but themed + agent-native).
// Attributes:
//   value    — current measurement (default min)
//   min      — low bound of the range (default 0)
//   max      — high bound of the range (default 1)
//   low      — upper bound of the "low" segment (optional)
//   high     — lower bound of the "high" segment (optional)
//   optimum  — the optimal point; decides which segment is "good" (success),
//              which is "ok" (warning), and which is "bad" (danger), following
//              the WHATWG <meter> candidate-value algorithm.
//   label    — descriptive caption (e.g. "Disk usage"). Optional.
//   value-text — overrides the displayed value string (e.g. "42 GB"). When
//              omitted the numeric value is shown.
//   hide-value — hide the textual value readout (bar + label only).
// Parts: meter, header, label, value, track, fill.
// ARIA: role="meter" with aria-valuemin / aria-valuemax / aria-valuenow and a
//   self-describing aria-label.
// Agent-native layer: stable data-pura-meter-* attributes mirror live state and
//   each instance registers in window.__puraMeters keyed by its data-pura-id, so
//   an agent can enumerate / read every meter on the page without DOM diving.
import { PuraElement, define } from "../base.js";
import meta from "./meter.meta.js";

let uid = 0;

// Lazily-created global registry: data-pura-id -> element.
function registry() {
  return (window.__puraMeters ||= new Map());
}

// Parse a number attribute, falling back when absent / not finite.
function num(v, fallback) {
  if (v == null || v === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

// Resolve the constrained range + value, mirroring the <meter> algorithm.
// Returns { min, max, value, low, high, optimum }.
function resolve(el) {
  let min = num(el.getAttribute("min"), 0);
  let max = num(el.getAttribute("max"), 1);
  if (max < min) max = min; // max is clamped up to min when authored invalid

  let value = num(el.getAttribute("value"), min);
  value = Math.max(min, Math.min(max, value));

  // low/high default to the range bounds and are clamped into [min,max] and
  // ordered (low <= high), exactly as the spec requires.
  let low = Math.max(min, Math.min(max, num(el.getAttribute("low"), min)));
  let high = Math.max(min, Math.min(max, num(el.getAttribute("high"), max)));
  if (high < low) high = low;

  // optimum defaults to the midpoint and is clamped into [min,max].
  let optimum = Math.max(min, Math.min(max, num(el.getAttribute("optimum"), (min + max) / 2)));

  return { min, max, value, low, high, optimum };
}

// Map state -> semantic level: "success" (optimal), "warning" (suboptimal),
// "danger" (even less optimal). Follows the WHATWG gauge-coloring rules.
function levelFor({ value, low, high, optimum }) {
  if (optimum < low) {
    // Lower region is best.
    if (value <= low) return "success";
    if (value <= high) return "warning";
    return "danger";
  }
  if (optimum > high) {
    // Higher region is best.
    if (value >= high) return "success";
    if (value >= low) return "warning";
    return "danger";
  }
  // Middle region is best.
  if (value >= low && value <= high) return "success";
  return "warning";
}

class PuraMeter extends PuraElement {
  static observedAttributes = [
    "value", "min", "max", "low", "high", "optimum",
    "label", "value-text", "hide-value",
  ];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-meter-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    this.render(
      `<div class="meter" part="meter">
         <div class="header" part="header">
           <span class="label" part="label"></span>
           <span class="value" part="value"></span>
         </div>
         <div class="track" part="track">
           <div class="fill" part="fill"></div>
         </div>
       </div>`,
      CSS
    );

    this._root = this.$(".meter");
    this._header = this.$(".header");
    this._labelEl = this.$(".label");
    this._valueEl = this.$(".value");
    this._track = this.$(".track");
    this._fill = this.$(".fill");

    // role=meter lives on the host so the element is exposed as a meter even
    // when an agent only inspects the light-DOM node.
    this.setAttribute("role", "meter");

    this._sync();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this._root) this._sync();
  }

  // Public, machine-friendly snapshot of resolved state.
  get state() {
    const s = resolve(this);
    return { ...s, level: levelFor(s) };
  }

  _sync() {
    const s = resolve(this);
    const { min, max, value, low, high, optimum } = s;
    const level = levelFor(s);

    const label = this.getAttribute("label") || "";
    const span = max - min;
    const pct = span > 0 ? ((value - min) / span) * 100 : 0;

    const valueText = this.hasAttribute("value-text")
      ? this.getAttribute("value-text")
      : formatNum(value);

    // Paint.
    this._fill.style.width = pct + "%";
    this._root.dataset.level = level;

    this._labelEl.textContent = label;
    this._labelEl.style.display = label ? "" : "none";

    const showValue = !this.hasAttribute("hide-value");
    this._valueEl.textContent = showValue ? valueText : "";
    this._valueEl.style.display = showValue && valueText !== "" ? "" : "none";
    this._header.style.display = (label || (showValue && valueText !== "")) ? "" : "none";

    // ARIA on the host (role=meter).
    this.setAttribute("aria-valuemin", String(min));
    this.setAttribute("aria-valuemax", String(max));
    this.setAttribute("aria-valuenow", String(value));
    this.setAttribute("aria-valuetext", valueText);
    const aria = (label ? `${label}: ` : "") + valueText +
      ` (${min} to ${max}, ${level})`;
    this.setAttribute("aria-label", aria);

    // Agent-native: stable, machine-readable mirror of live state.
    this.setAttribute("data-pura-meter-value", String(value));
    this.setAttribute("data-pura-meter-min", String(min));
    this.setAttribute("data-pura-meter-max", String(max));
    this.setAttribute("data-pura-meter-low", String(low));
    this.setAttribute("data-pura-meter-high", String(high));
    this.setAttribute("data-pura-meter-optimum", String(optimum));
    this.setAttribute("data-pura-meter-percent", String(Math.round(pct * 10) / 10));
    this.setAttribute("data-pura-meter-level", level);
    if (label) this.setAttribute("data-pura-meter-label", label);
    else this.removeAttribute("data-pura-meter-label");
  }
}

// Trim trailing zeros from a clamped number for display.
function formatNum(n) {
  if (!Number.isFinite(n)) return "";
  return String(Math.round(n * 1000) / 1000);
}

const CSS = `
  :host { display: block; }

  .meter { display: flex; flex-direction: column; gap: var(--pura-space-2); }

  .header {
    display: flex; align-items: baseline; justify-content: space-between;
    gap: var(--pura-space-3);
    font-size: var(--pura-text-sm); line-height: 1.2;
  }
  .label { font-weight: 500; color: var(--pura-fg); }
  .value {
    font-weight: 600; color: var(--pura-muted-fg);
    font-variant-numeric: tabular-nums; white-space: nowrap;
  }

  .track {
    width: 100%; height: 0.5rem; border-radius: var(--pura-radius-full);
    background: var(--pura-subtle); overflow: hidden;
  }
  .fill {
    height: 100%; width: 0%; border-radius: inherit;
    background: var(--pura-primary);
    transition: width var(--pura-dur) var(--pura-ease),
      background var(--pura-dur) var(--pura-ease);
  }

  /* threshold-driven colors (resolved level mirrors <meter> semantics) */
  .meter[data-level="success"] .fill { background: var(--pura-success); }
  .meter[data-level="warning"] .fill { background: var(--pura-warning); }
  .meter[data-level="danger"]  .fill { background: var(--pura-danger); }
`;

define("pura-meter", PuraMeter, meta);
export { PuraMeter };
