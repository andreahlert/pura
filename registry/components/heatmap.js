// <pura-heatmap>, a calendar/matrix heatmap (GitHub contributions style).
// Data via property .data or attribute `data` (JSON). Calendar mode expects a
// {"YYYY-MM-DD": count} map. Matrix mode expects a 2D array of numbers.
//
// Attributes: type (calendar|matrix, default calendar), weeks (default 53),
//   end (end date YYYY-MM-DD for calendar, default today).
// Intensity: 5 buckets. Level 0 is var(--pura-subtle); levels 1..4 mix
//   var(--pura-accent) over var(--pura-subtle) via color-mix.
// Parts: grid, cell, legend. Emits cellclick with detail {key, value}.
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "heatmap.less": { en: "Less", "pt-BR": "Menos", fr: "Moins", de: "Weniger", it: "Meno" },
  "heatmap.more": { en: "More", "pt-BR": "Mais", fr: "Plus", de: "Mehr", it: "Più" },
});

const DAY_MS = 86400000;

function pad2(n) { return String(n).padStart(2, "0"); }
function isoDate(d) { return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; }

// Bucket a value into 0..4 given the dataset max.
function bucket(v, max) {
  if (!v || v <= 0) return 0;
  if (max <= 0) return 1;
  return Math.max(1, Math.min(4, Math.ceil((v / max) * 4)));
}

// Fill for a level, using design tokens only (no hex).
function levelFill(level) {
  if (level <= 0) return "var(--pura-subtle)";
  const pct = level * 25; // 25, 50, 75, 100
  return `color-mix(in srgb, var(--pura-accent) ${pct}%, var(--pura-subtle))`;
}

class PuraHeatmap extends PuraElement {
  static observedAttributes = ["type", "weeks", "end", "data"];

  connectedCallback() {
    this._data = this._data ?? this._parseAttr();
    this.render(
      `<div class="root" part="grid"></div>
       <div class="legend" part="legend" aria-hidden="true"></div>`,
      CSS
    );
    this._root = this.$(".root");
    this._legend = this.$(".legend");
    this._root.addEventListener("click", (e) => this._onClick(e));
    this._i18nOff = onLocaleChange(() => this._applyI18n());
    this._sync();
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  attributeChangedCallback(name) {
    if (!this._root) return;
    if (name === "data") this._data = this._parseAttr();
    this._sync();
  }

  // ---- public API ----
  get data() { return this._data; }
  set data(v) {
    this._data = v;
    if (this._root) this._sync();
  }

  _parseAttr() {
    const raw = this.getAttribute("data");
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (_) { return null; }
  }

  _type() {
    const t2 = (this.getAttribute("type") || "calendar").toLowerCase();
    return t2 === "matrix" ? "matrix" : "calendar";
  }

  // ---- render ----
  _sync() {
    if (this._type() === "matrix") this._renderMatrix();
    else this._renderCalendar();
    this._renderLegend();
  }

  _renderCalendar() {
    const map = (this._data && !Array.isArray(this._data)) ? this._data : {};
    const weeks = Math.max(1, parseInt(this.getAttribute("weeks") || "53", 10) || 53);

    // End date: attr or today. Align the last column to the end-of-week.
    let end = new Date();
    const endAttr = this.getAttribute("end");
    if (endAttr) {
      const parsed = new Date(`${endAttr}T00:00:00`);
      if (!Number.isNaN(parsed.getTime())) end = parsed;
    }
    end.setHours(0, 0, 0, 0);

    // Start so that we render `weeks` columns of 7 days ending at `end`.
    const totalDays = weeks * 7;
    // Back up to the Sunday of end's week, then go back weeks-1 more weeks.
    const endDow = end.getDay();
    const lastColStart = new Date(end.getTime() - endDow * DAY_MS);
    const firstColStart = new Date(lastColStart.getTime() - (weeks - 1) * 7 * DAY_MS);

    let max = 0;
    for (const k of Object.keys(map)) {
      const n = Number(map[k]);
      if (Number.isFinite(n) && n > max) max = n;
    }

    const cell = 12;
    const gap = 3;
    const w = weeks * (cell + gap) - gap;
    const h = 7 * (cell + gap) - gap;

    let cells = "";
    for (let col = 0; col < weeks; col++) {
      for (let row = 0; row < 7; row++) {
        const date = new Date(firstColStart.getTime() + (col * 7 + row) * DAY_MS);
        if (date > end) continue;
        const key = isoDate(date);
        const val = Number(map[key]) || 0;
        const lvl = bucket(val, max);
        const x = col * (cell + gap);
        const y = row * (cell + gap);
        cells += `<rect class="cell" part="cell" data-key="${key}" data-value="${val}"
          x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2.5"
          style="fill:${levelFill(lvl)}"><title>${key}: ${val}</title></rect>`;
      }
    }

    this._root.innerHTML =
      `<svg class="svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img"
            aria-label="Calendar heatmap">${cells}</svg>`;
  }

  _renderMatrix() {
    const rows = Array.isArray(this._data) ? this._data : [];
    let max = 0;
    for (const r of rows) {
      if (!Array.isArray(r)) continue;
      for (const v of r) {
        const n = Number(v);
        if (Number.isFinite(n) && n > max) max = n;
      }
    }
    const cols = rows.reduce((m, r) => Math.max(m, Array.isArray(r) ? r.length : 0), 0);
    const cell = 24;
    const gap = 3;
    const w = cols * (cell + gap) - gap;
    const h = rows.length * (cell + gap) - gap;

    let cells = "";
    rows.forEach((r, ri) => {
      if (!Array.isArray(r)) return;
      r.forEach((v, ci) => {
        const val = Number(v) || 0;
        const lvl = bucket(val, max);
        const key = `${ri},${ci}`;
        const x = ci * (cell + gap);
        const y = ri * (cell + gap);
        cells += `<rect class="cell" part="cell" data-key="${key}" data-value="${val}"
          x="${x}" y="${y}" width="${cell}" height="${cell}" rx="3"
          style="fill:${levelFill(lvl)}"><title>${key}: ${val}</title></rect>`;
      });
    });

    this._root.innerHTML =
      `<svg class="svg" viewBox="0 0 ${Math.max(w, 1)} ${Math.max(h, 1)}"
            width="${Math.max(w, 1)}" height="${Math.max(h, 1)}" role="img"
            aria-label="Matrix heatmap">${cells}</svg>`;
  }

  _renderLegend() {
    let swatches = "";
    for (let lvl = 0; lvl <= 4; lvl++) {
      swatches += `<span class="sw" style="background:${levelFill(lvl)}"></span>`;
    }
    this._legend.innerHTML =
      `<span class="lg-less">${t("heatmap.less")}</span>${swatches}<span class="lg-more">${t("heatmap.more")}</span>`;
  }

  _applyI18n() {
    const less = this._legend?.querySelector(".lg-less");
    const more = this._legend?.querySelector(".lg-more");
    if (less) less.textContent = t("heatmap.less");
    if (more) more.textContent = t("heatmap.more");
  }

  _onClick(e) {
    const rect = e.target.closest(".cell");
    if (!rect) return;
    const key = rect.getAttribute("data-key");
    const value = Number(rect.getAttribute("data-value")) || 0;
    this.dispatchEvent(new CustomEvent("cellclick", { detail: { key, value }, bubbles: true }));
  }
}

const CSS = `
  :host { display: inline-block; color: var(--pura-fg); }

  .root { display: block; overflow-x: auto; }
  .svg { display: block; max-width: 100%; height: auto; }

  .cell {
    stroke: var(--pura-border);
    stroke-width: 0.5;
    cursor: pointer;
    transition: stroke var(--pura-dur) var(--pura-ease);
  }
  .cell:hover { stroke: var(--pura-border-strong); }

  .legend {
    display: flex; align-items: center; gap: var(--pura-space-1);
    margin-top: var(--pura-space-2);
    font-size: var(--pura-text-xs); color: var(--pura-muted-fg);
  }
  .legend .sw {
    display: inline-block; width: 12px; height: 12px;
    border-radius: 2.5px; border: 1px solid var(--pura-border);
  }
  .lg-less { margin-right: var(--pura-space-1); }
  .lg-more { margin-left: var(--pura-space-1); }
`;

define("pura-heatmap", PuraHeatmap);
export { PuraHeatmap };
