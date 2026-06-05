// <pura-chart>: a pure-SVG multi-series chart (line, bar, area). No deps.
//
// Data sources (first valid wins):
//   1. `data` attribute, a JSON string of either an array of numbers
//      ([1,2,3], one unlabeled series) or an array of series objects
//      ([{label, values:[...]}, ...]).
//   2. Slotted light DOM <pura-series label="X" values="1,2,3"> children.
//
// Attributes:
//   type    line (default) | bar | area
//   data    JSON series payload (see above)
//   width   chart width in px (default 480)
//   height  chart height in px (default 240)
//   smooth  boolean; curved line/area paths
//   labels  comma list of x-axis tick labels
//
// Parts: svg (the chart), axis (baseline + gridlines), legend (series list).
// Series colors cycle through var(--pura-chart-1..8) via .series-N classes,
// because var() does not resolve in raw SVG stroke/fill presentation attributes.
// Renders a graceful muted empty state when data is missing or invalid.
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "chart.empty": {
    en: "No data",
    "pt-BR": "Sem dados",
    fr: "Aucune donnée",
    de: "Keine Daten",
    it: "Nessun dato",
  },
});

const PAD = { top: 12, right: 12, bottom: 24, left: 36 };
const GRID_LINES = 4;

// Parse "3, 7, 4" into finite numbers, dropping junk. Mirrors sparkline.
function parseValues(raw) {
  if (!raw) return [];
  return String(raw)
    .split(",")
    .map((s) => parseFloat(s.trim()))
    .filter((n) => Number.isFinite(n));
}

// Escape text injected into SVG/HTML markup.
function esc(v) {
  if (v == null) return "";
  return String(v).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

// Trim sub-pixel noise from coordinate strings.
function round(n) {
  return Math.round(n * 100) / 100;
}

class PuraChart extends PuraElement {
  static observedAttributes = ["type", "data", "width", "height", "smooth", "labels"];

  connectedCallback() {
    if (!this.hasAttribute("role")) this.setAttribute("role", "img");

    // Shell rendered once. A real (hidden) slot lets us react to slotchange.
    this.render(
      `<div class="wrap">
         <svg class="chart" part="svg" preserveAspectRatio="xMidYMid meet"></svg>
         <div class="legend" part="legend"></div>
       </div>
       <slot hidden></slot>`,
      CSS
    );

    this._svg = this.$(".chart");
    this._legend = this.$(".legend");
    this._slot = this.$("slot");
    this._slot.addEventListener("slotchange", () => this._draw());

    this._i18nOff = onLocaleChange(() => this._draw());
    this._draw();
  }

  disconnectedCallback() {
    if (this._i18nOff) this._i18nOff();
  }

  attributeChangedCallback() {
    if (this._svg) this._draw();
  }

  _num(attr, fallback) {
    const raw = this.getAttribute(attr);
    if (raw == null) return fallback;
    const n = parseFloat(raw);
    return Number.isFinite(n) && n > 0 ? n : fallback;
  }

  // Normalize every input to [{label, values:[finite numbers]}].
  _series() {
    // 1. `data` attribute wins when present and parseable.
    const raw = this.getAttribute("data");
    if (raw && raw.trim()) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          if (parsed.every((v) => typeof v === "number")) {
            const values = parsed.filter((n) => Number.isFinite(n));
            if (values.length) return [{ label: null, values }];
          } else {
            const out = parsed
              .filter((s) => s && Array.isArray(s.values))
              .map((s) => ({
                label: s.label != null ? String(s.label) : null,
                values: s.values.filter((n) => Number.isFinite(n)),
              }))
              .filter((s) => s.values.length);
            if (out.length) return out;
          }
        }
      } catch (_) {
        // Invalid JSON degrades to slotted data / empty state.
      }
    }

    // 2. Slotted <pura-series> children.
    const els = this._slot ? this._slot.assignedElements() : [];
    const out = els
      .filter((el) => el.tagName === "PURA-SERIES")
      .map((el) => ({
        label: el.getAttribute("label"),
        values: parseValues(el.getAttribute("values")),
      }))
      .filter((s) => s.values.length);
    return out;
  }

  _labels() {
    return (this.getAttribute("labels") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  _draw() {
    const w = this._num("width", 480);
    const h = this._num("height", 240);
    const type = (this.getAttribute("type") || "line").toLowerCase();
    const smooth = this.bool("smooth");
    const series = this._series();

    this._svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    this._svg.setAttribute("width", w);
    this._svg.setAttribute("height", h);

    // Empty / invalid: graceful muted state.
    if (!series.length) {
      const msg = t("chart.empty");
      this._svg.innerHTML =
        `<text class="empty" x="${w / 2}" y="${h / 2}" text-anchor="middle" dominant-baseline="middle">${esc(msg)}</text>`;
      this._legend.innerHTML = "";
      this.setAttribute("aria-label", msg);
      return;
    }

    const plotW = Math.max(1, w - PAD.left - PAD.right);
    const plotH = Math.max(1, h - PAD.top - PAD.bottom);
    const x0 = PAD.left;
    const y0 = PAD.top;
    const baseY = y0 + plotH; // pixel baseline (bottom of plot)

    const maxLen = Math.max(...series.map((s) => s.values.length));
    const flat = series.flatMap((s) => s.values);
    let dataMin = Math.min(...flat);
    let dataMax = Math.max(...flat);

    // Bars and area anchor at zero; lines hug the data range.
    const isBars = type === "bar";
    const isArea = type === "area";
    let yMin = isBars || isArea ? Math.min(0, dataMin) : dataMin;
    let yMax = Math.max(0, dataMax);
    if (yMax === yMin) yMax = yMin + 1; // flat series stays drawable
    const span = yMax - yMin;

    const yAt = (v) => round(y0 + plotH - ((v - yMin) / span) * plotH);
    // Slot index across the x axis. Single point sits centered.
    const xAt = (i) =>
      round(maxLen === 1 ? x0 + plotW / 2 : x0 + (i / (maxLen - 1)) * plotW);

    let svg = "";

    // ---- axis: gridlines + baseline ------------------------------------
    let axis = `<g part="axis" class="axis">`;
    for (let g = 0; g <= GRID_LINES; g++) {
      const gy = round(y0 + (g / GRID_LINES) * plotH);
      axis += `<line class="grid" x1="${x0}" y1="${gy}" x2="${round(x0 + plotW)}" y2="${gy}"></line>`;
    }
    // Emphasize the zero baseline when it sits within the plotted range.
    if (yMin < 0 && yMax > 0) {
      const zy = yAt(0);
      axis += `<line class="baseline" x1="${x0}" y1="${zy}" x2="${round(x0 + plotW)}" y2="${zy}"></line>`;
    } else {
      axis += `<line class="baseline" x1="${x0}" y1="${baseY}" x2="${round(x0 + plotW)}" y2="${baseY}"></line>`;
    }
    axis += `</g>`;
    svg += axis;

    // ---- x-axis tick labels --------------------------------------------
    const labels = this._labels();
    if (labels.length) {
      let ticks = `<g class="ticks">`;
      const n = Math.min(labels.length, maxLen);
      for (let i = 0; i < n; i++) {
        ticks += `<text class="tick" x="${xAt(i)}" y="${round(baseY + 16)}" text-anchor="middle">${esc(labels[i])}</text>`;
      }
      ticks += `</g>`;
      svg += ticks;
    }

    // ---- series ---------------------------------------------------------
    if (isBars) {
      // Grouped bars: each slot holds nSeries bars side by side.
      const slots = maxLen;
      const bandW = plotW / Math.max(1, slots);
      const inner = bandW * 0.7;
      const barW = inner / series.length;
      const zeroY = yAt(0);
      series.forEach((s, si) => {
        const cls = `series-${(si % 8) + 1}`;
        s.values.forEach((v, i) => {
          const bandX = x0 + i * bandW + (bandW - inner) / 2;
          const bx = round(bandX + si * barW);
          const vy = yAt(v);
          const top = Math.min(vy, zeroY);
          const bh = round(Math.abs(vy - zeroY));
          const title = s.label ? `${esc(s.label)}: ${v}` : String(v);
          svg += `<rect class="bar ${cls}" x="${bx}" y="${round(top)}" width="${round(Math.max(0, barW - 1))}" height="${bh}"><title>${title}</title></rect>`;
        });
      });
    } else {
      series.forEach((s, si) => {
        const cls = `series-${(si % 8) + 1}`;
        const pts = s.values.map((v, i) => [xAt(i), yAt(v)]);
        const d = pathD(pts, smooth);

        if (isArea && pts.length) {
          const aZero = yAt(Math.max(yMin, Math.min(yMax, 0)));
          const areaD = `${d} L ${pts[pts.length - 1][0]} ${aZero} L ${pts[0][0]} ${aZero} Z`;
          svg += `<path class="area ${cls}" d="${areaD}"></path>`;
        }
        svg += `<path class="line ${cls}" d="${d}"></path>`;

        // Hover dots carry a <title> tooltip per point.
        s.values.forEach((v, i) => {
          const label = s.label ? `${esc(s.label)}: ${v}` : String(v);
          svg += `<circle class="dot ${cls}" cx="${pts[i][0]}" cy="${pts[i][1]}" r="2.5"><title>${label}</title></circle>`;
        });
      });
    }

    this._svg.innerHTML = svg;
    this._renderLegend(series);

    const named = series.filter((s) => s.label).map((s) => s.label);
    this.setAttribute(
      "aria-label",
      `${type} chart, ${series.length} series${named.length ? ", " + named.join(", ") : ""}`
    );
  }

  _renderLegend(series) {
    // Skip the legend when there is nothing to name (single unlabeled series).
    const named = series.some((s) => s.label);
    if (!named) {
      this._legend.innerHTML = "";
      return;
    }
    this._legend.innerHTML = series
      .map((s, si) => {
        const color = `var(--pura-chart-${(si % 8) + 1})`;
        const label = s.label != null ? esc(s.label) : `Series ${si + 1}`;
        return `<span class="legend-item"><span class="swatch" style="background:${color}"></span>${label}</span>`;
      })
      .join("");
  }
}

// Build a path "d" from [x,y] points. smooth uses a Catmull-Rom to bezier pass.
function pathD(pts, smooth) {
  if (!pts.length) return "";
  if (pts.length === 1) return `M ${pts[0][0]} ${pts[0][1]}`;
  if (!smooth) {
    return "M " + pts.map((p) => `${p[0]} ${p[1]}`).join(" L ");
  }
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = round(p1[0] + (p2[0] - p0[0]) / 6);
    const c1y = round(p1[1] + (p2[1] - p0[1]) / 6);
    const c2x = round(p2[0] - (p3[0] - p1[0]) / 6);
    const c2y = round(p2[1] - (p3[1] - p1[1]) / 6);
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

// Inert helper element. Holds data via attributes; renders nothing itself.
class PuraSeries extends PuraElement {
  connectedCallback() {
    this.render("", ":host { display: none; }");
  }
}

const CSS = `
  :host { display: block; color: var(--pura-fg); }

  .wrap { display: flex; flex-direction: column; gap: var(--pura-space-3); }

  .chart {
    display: block;
    max-width: 100%;
    height: auto;
    overflow: visible;
    font-family: var(--pura-font);
  }

  .grid {
    stroke: var(--pura-border);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }
  .baseline {
    stroke: var(--pura-border-strong);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }

  .tick { fill: var(--pura-muted); font-size: var(--pura-text-xs); }
  .empty { fill: var(--pura-muted); font-size: var(--pura-text-sm); }

  .line {
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }
  .area { stroke: none; opacity: 0.16; }
  .dot { stroke: var(--pura-bg); stroke-width: 1; }
  .bar { stroke: none; }

  /* Series palette. var() does not resolve in SVG presentation attributes,
     so map the chart tokens through CSS classes instead. */
  .series-1 { stroke: var(--pura-chart-1); fill: var(--pura-chart-1); }
  .series-2 { stroke: var(--pura-chart-2); fill: var(--pura-chart-2); }
  .series-3 { stroke: var(--pura-chart-3); fill: var(--pura-chart-3); }
  .series-4 { stroke: var(--pura-chart-4); fill: var(--pura-chart-4); }
  .series-5 { stroke: var(--pura-chart-5); fill: var(--pura-chart-5); }
  .series-6 { stroke: var(--pura-chart-6); fill: var(--pura-chart-6); }
  .series-7 { stroke: var(--pura-chart-7); fill: var(--pura-chart-7); }
  .series-8 { stroke: var(--pura-chart-8); fill: var(--pura-chart-8); }

  /* Lines must not be filled by the series fill rule. */
  .line.series-1, .line.series-2, .line.series-3, .line.series-4,
  .line.series-5, .line.series-6, .line.series-7, .line.series-8 { fill: none; }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: var(--pura-space-3);
    font-size: var(--pura-text-xs);
    color: var(--pura-muted-fg);
  }
  .legend:empty { display: none; }
  .legend-item { display: inline-flex; align-items: center; gap: var(--pura-space-2); }
  .swatch {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: var(--pura-radius-sm);
    flex: none;
  }
`;

define("pura-chart", PuraChart);
define("pura-series", PuraSeries);
export { PuraChart, PuraSeries };
