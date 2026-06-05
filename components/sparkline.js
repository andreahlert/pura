// <pura-sparkline> — inline mini line chart (no axes). Renders a tiny SVG
// polyline scaled to fit its box, with an optional translucent area fill and a
// dot on the last point.
//
// Attributes:
//   values — comma-separated numbers, e.g. "3,7,4,9,5,8". Whitespace is ok and
//            non-numeric entries are dropped. Empty/invalid degrades to nothing.
//   width  — chart width in px (default 80). Bare number or px.
//   height — chart height in px (default 24). Bare number or px.
//   color  — line/dot/fill color. Any CSS color; defaults to var(--pura-fg).
//   fill   — boolean; draw a translucent area under the line.
//   dot    — boolean; draw a dot on the last data point.
//
// Parts: chart (the svg), area (fill polygon), line (polyline), dot (last point).
// ARIA: role=img with an auto-generated aria-label summarising the series
//   (count, min, max, last). Purely presentational; no motion-only affordance.
// Agent-native: stable data-pura-sparkline-* attributes mirror the parsed series
//   stats, and each instance registers in window.__puraSparklines keyed by its
//   data-pura-id so an agent can enumerate / read every chart on the page.
import { PuraElement, define } from "../base.js";

let uid = 0;

// Lazily-created global registry: data-pura-id -> element.
function registry() {
  return (window.__puraSparklines ||= new Map());
}

// Parse "3, 7, 4" into an array of finite numbers (dropping junk).
function parseValues(raw) {
  if (!raw) return [];
  return String(raw)
    .split(",")
    .map((s) => parseFloat(s.trim()))
    .filter((n) => Number.isFinite(n));
}

class PuraSparkline extends PuraElement {
  static observedAttributes = ["values", "width", "height", "color", "fill", "dot"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-sparkline-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    this.render(
      `<svg class="chart" part="chart" role="img" preserveAspectRatio="none">
         <polygon class="area" part="area" points=""></polygon>
         <polyline class="line" part="line" points=""></polyline>
         <circle class="dot" part="dot" r="0" cx="0" cy="0"></circle>
       </svg>`,
      CSS
    );

    this._svg = this.$(".chart");
    this._area = this.$(".area");
    this._line = this.$(".line");
    this._dot = this.$(".dot");
    this._sync();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this._svg) this._sync();
  }

  // ---- public API -------------------------------------------------------
  get values() { return parseValues(this.getAttribute("values")); }
  set values(v) {
    const arr = Array.isArray(v) ? v : parseValues(v);
    this.setAttribute("values", arr.join(","));
  }

  // ---- internals --------------------------------------------------------
  _num(attr, fallback) {
    const raw = this.getAttribute(attr);
    if (raw == null) return fallback;
    const n = parseFloat(raw);
    return Number.isFinite(n) && n > 0 ? n : fallback;
  }

  _sync() {
    const w = this._num("width", 80);
    const h = this._num("height", 24);
    const values = this.values;

    // Size the box (color comes via a custom prop so CSS owns the default).
    this._svg.setAttribute("width", w);
    this._svg.setAttribute("height", h);
    this._svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    const color = this.getAttribute("color");
    if (color) this._svg.style.setProperty("--spark-color", color);
    else this._svg.style.removeProperty("--spark-color");

    const showFill = this.hasAttribute("fill");
    const showDot = this.hasAttribute("dot");

    // Inset so the stroke/dot don't clip at the edges.
    const pad = 2;
    const innerW = Math.max(1, w - pad * 2);
    const innerH = Math.max(1, h - pad * 2);

    const n = values.length;
    let min = 0, max = 0, last = null;

    if (n === 0) {
      // Nothing to draw — degrade gracefully.
      this._line.setAttribute("points", "");
      this._area.setAttribute("points", "");
      this._dot.setAttribute("r", "0");
    } else {
      min = Math.min(...values);
      max = Math.max(...values);
      last = values[n - 1];
      const span = max - min || 1; // flat series -> centered horizontal line

      // x spreads across the inner width; a single point sits centered.
      const xAt = (i) => (n === 1 ? pad + innerW / 2 : pad + (i / (n - 1)) * innerW);
      // y inverts (SVG origin top-left); flat series renders mid-height.
      const yAt = (v) =>
        max === min ? pad + innerH / 2 : pad + innerH - ((v - min) / span) * innerH;

      const pts = values.map((v, i) => `${round(xAt(i))},${round(yAt(v))}`);
      this._line.setAttribute("points", pts.join(" "));

      if (showFill && n > 1) {
        // Close the polygon along the baseline to fill the area below the line.
        const baseline = pad + innerH;
        const poly = [`${round(pad)},${round(baseline)}`, ...pts, `${round(pad + innerW)},${round(baseline)}`];
        this._area.setAttribute("points", poly.join(" "));
        this._area.style.display = "";
      } else {
        this._area.setAttribute("points", "");
        this._area.style.display = "none";
      }

      if (showDot) {
        this._dot.setAttribute("cx", round(xAt(n - 1)));
        this._dot.setAttribute("cy", round(yAt(last)));
        this._dot.setAttribute("r", "2");
        this._dot.style.display = "";
      } else {
        this._dot.setAttribute("r", "0");
        this._dot.style.display = "none";
      }
    }

    // ARIA: self-describing summary for assistive tech / agents.
    const label = n === 0
      ? "Sparkline, no data"
      : `Sparkline of ${n} value${n === 1 ? "" : "s"}, min ${min}, max ${max}, last ${last}`;
    this._svg.setAttribute("aria-label", label);

    // Agent-native: stable, machine-readable mirror of the parsed series.
    this.setAttribute("data-pura-sparkline-count", String(n));
    this.setAttribute("data-pura-sparkline-values", values.join(","));
    if (n === 0) {
      this.removeAttribute("data-pura-sparkline-min");
      this.removeAttribute("data-pura-sparkline-max");
      this.removeAttribute("data-pura-sparkline-last");
    } else {
      this.setAttribute("data-pura-sparkline-min", String(min));
      this.setAttribute("data-pura-sparkline-max", String(max));
      this.setAttribute("data-pura-sparkline-last", String(last));
    }
  }
}

// Keep coordinate strings short; sub-pixel precision is invisible at this scale.
function round(n) {
  return Math.round(n * 100) / 100;
}

const CSS = `
  :host { display: inline-block; line-height: 0; }

  .chart {
    display: block;
    overflow: visible;
    color: var(--spark-color, var(--pura-fg));
  }

  .line {
    fill: none;
    stroke: currentColor;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }

  .area {
    fill: currentColor;
    opacity: 0.14;
    stroke: none;
  }

  .dot {
    fill: currentColor;
    stroke: var(--pura-bg);
    stroke-width: 1;
  }
`;

define("pura-sparkline", PuraSparkline);
export { PuraSparkline };
