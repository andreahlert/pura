// <pura-date-range-picker>: pick a start and end date. The trigger shows the
// formatted range; clicking opens a popover (native Popover API + CSS anchor
// positioning) with one or two side-by-side month grids. First click sets the
// start, second sets the end; while choosing the end, hovering previews the
// range. Reversed picks swap so start <= end. Attributes: start, end
// ("YYYY-MM-DD"), months (1|2, default 2), disabled. The `value` getter returns
// { start, end }. Emits CustomEvent('change', { detail: { start, end } }).
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages, getLocale } from "../i18n.js";

registerMessages({
  "date-range.dialog": {
    en: "Choose date range", "pt-BR": "Escolher período",
    fr: "Choisir une plage de dates", de: "Datumsbereich wählen",
    it: "Scegli un intervallo",
  },
  "date-range.placeholder": {
    en: "Pick a date range", "pt-BR": "Selecione um período",
    fr: "Sélectionner une plage", de: "Zeitraum auswählen",
    it: "Seleziona un intervallo",
  },
  "date-range.prev": {
    en: "Previous month", "pt-BR": "Mês anterior", fr: "Mois précédent",
    de: "Vorheriger Monat", it: "Mese precedente",
  },
  "date-range.next": {
    en: "Next month", "pt-BR": "Próximo mês", fr: "Mois suivant",
    de: "Nächster Monat", it: "Mese successivo",
  },
  "date-range.clear": {
    en: "Clear", "pt-BR": "Limpar", fr: "Effacer", de: "Löschen", it: "Cancella",
  },
});

let uid = 0;
const pad = (n) => String(n).padStart(2, "0");
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function parseDate(str) {
  if (!str) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str.trim());
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

// Compare two yyyy-mm-dd strings (lexicographic order matches chronological).
const before = (a, b) => a < b;

class PuraDateRangePicker extends PuraElement {
  static observedAttributes = ["start", "end", "months", "disabled"];

  connectedCallback() {
    this._name = `--pura-rangepicker-${uid++}`;
    // First day of the left-hand month shown in the popover.
    this._view = (parseDate(this.getAttribute("start")) || new Date());
    this._view = new Date(this._view.getFullYear(), this._view.getMonth(), 1);
    this._hover = null; // hovered day while selecting the end

    this.render(
      `<button class="anchor" part="trigger" type="button"
         aria-haspopup="dialog" aria-expanded="false"
         ${this.hasAttribute("disabled") ? "disabled" : ""}>
         <svg class="icon" viewBox="0 0 24 24" part="icon" aria-hidden="true">
           <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
         </svg>
         <span class="label" part="label"></span>
       </button>
       <div class="panel" part="panel" popover="auto" role="dialog"
         aria-label="${t("date-range.dialog")}"></div>`,
      CSS.replaceAll("ANCHOR", this._name)
    );

    this._trigger = this.$(".anchor");
    this._pop = this.$("[popover]");

    this._syncLabel();

    this._trigger.addEventListener("click", () => {
      if (this.hasAttribute("disabled")) return;
      this._pop.togglePopover();
    });

    this._pop.addEventListener("toggle", (e) => {
      const open = e.newState === "open";
      this._trigger.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        const s = parseDate(this.getAttribute("start"));
        if (s) this._view = new Date(s.getFullYear(), s.getMonth(), 1);
        this._hover = null;
        this._renderPanel();
      }
    });

    this._pop.addEventListener("click", (e) => {
      const nav = e.target.closest(".nav");
      if (nav) { this._shiftMonth(nav.classList.contains("prev") ? -1 : 1); return; }
      if (e.target.closest(".clear")) { this._clear(); return; }
      const cell = e.target.closest(".day:not(.adjacent)");
      if (cell) this._pick(cell.dataset.date);
    });

    this._pop.addEventListener("mouseover", (e) => {
      const cell = e.target.closest(".day:not(.adjacent)");
      if (!cell) return;
      // only preview when we are waiting for the end date
      if (this.getAttribute("start") && !this.getAttribute("end")) {
        this._hover = cell.dataset.date;
        this._paintRange();
      }
    });

    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  attributeChangedCallback(name) {
    if (!this._trigger) return;
    if (name === "start" || name === "end") this._syncLabel();
    if (name === "disabled") {
      this._trigger.disabled = this.hasAttribute("disabled");
      if (this.hasAttribute("disabled")) this._pop?.hidePopover();
    }
    if (this._pop?.matches(":popover-open")) this._renderPanel();
  }

  // ---- public API -------------------------------------------------------
  get value() {
    return { start: this.getAttribute("start") || "", end: this.getAttribute("end") || "" };
  }
  set value(v) {
    v?.start ? this.setAttribute("start", v.start) : this.removeAttribute("start");
    v?.end ? this.setAttribute("end", v.end) : this.removeAttribute("end");
  }

  // ---- internals --------------------------------------------------------
  get _months() {
    return this.getAttribute("months") === "1" ? 1 : 2;
  }

  _fmtOne(str) {
    const d = parseDate(str);
    if (!d) return "";
    try {
      return new Intl.DateTimeFormat(getLocale(), {
        year: "numeric", month: "short", day: "numeric",
      }).format(d);
    } catch {
      return str;
    }
  }

  _syncLabel() {
    const s = this._fmtOne(this.getAttribute("start"));
    const e = this._fmtOne(this.getAttribute("end"));
    let text = "";
    if (s && e) text = `${s} → ${e}`; // arrow separator
    else if (s) text = s;
    const placeholder = this.getAttribute("placeholder") || t("date-range.placeholder");
    this._trigger.classList.toggle("placeholder", !text);
    this.$(".label").textContent = text || placeholder;
  }

  _monthLabel(d) {
    try {
      return new Intl.DateTimeFormat(getLocale(), { month: "long", year: "numeric" })
        .format(d);
    } catch {
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
    }
  }

  _weekdays() {
    try {
      const fmt = new Intl.DateTimeFormat(getLocale(), { weekday: "short" });
      return Array.from({ length: 7 }, (_, i) =>
        fmt.format(new Date(2024, 8, 1 + i)).replace(/\.$/, ""));
    } catch {
      return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    }
  }

  _shiftMonth(dir) {
    this._view = new Date(this._view.getFullYear(), this._view.getMonth() + dir, 1);
    this._renderPanel();
  }

  _renderPanel() {
    const wk = this._weekdays();
    const grids = [];
    for (let i = 0; i < this._months; i++) {
      const base = new Date(this._view.getFullYear(), this._view.getMonth() + i, 1);
      grids.push(this._monthGrid(base, wk, i === 0, i === this._months - 1));
    }
    this._pop.innerHTML =
      `<div class="grids">${grids.join("")}</div>
       <div class="foot">
         <button type="button" class="clear" part="clear">${t("date-range.clear")}</button>
       </div>`;
    this._paintRange();
  }

  _monthGrid(base, wk, showPrev, showNext) {
    const year = base.getFullYear(), month = base.getMonth();
    const lead = new Date(year, month, 1).getDay();
    const start = new Date(year, month, 1 - lead);

    const head = wk
      .map((w) => `<div class="weekday" part="weekday" role="columnheader">${w}</div>`)
      .join("");

    let cells = "";
    const cur = new Date(start);
    for (let n = 0; n < 42; n++) {
      const inMonth = cur.getMonth() === month;
      const cls = ["day", inMonth ? "" : "adjacent"].filter(Boolean).join(" ");
      cells +=
        `<button type="button" class="${cls}" part="day" role="gridcell"` +
        ` data-date="${iso(cur)}"${inMonth ? "" : " tabindex=\"-1\" aria-hidden=\"true\""}>` +
        `${cur.getDate()}</button>`;
      cur.setDate(cur.getDate() + 1);
    }

    return `<div class="month" part="month">
      <div class="header">
        <button type="button" class="nav prev" part="nav" aria-label="${t("date-range.prev")}"
          ${showPrev ? "" : "style=\"visibility:hidden\""}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div class="mlabel" part="label">${this._monthLabel(base)}</div>
        <button type="button" class="nav next" part="nav" aria-label="${t("date-range.next")}"
          ${showNext ? "" : "style=\"visibility:hidden\""}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
      <div class="grid" role="grid" aria-label="${this._monthLabel(base)}">
        <div class="weekdays" role="row">${head}</div>
        <div class="cells">${cells}</div>
      </div>
    </div>`;
  }

  // Apply start/end/in-range/hover classes to the already-rendered cells.
  _paintRange() {
    const start = this.getAttribute("start");
    const end = this.getAttribute("end");
    // when selecting the end, use the hovered day as the provisional far edge
    let lo = start, hi = end;
    if (start && !end && this._hover) {
      lo = before(start, this._hover) ? start : this._hover;
      hi = before(start, this._hover) ? this._hover : start;
    }
    for (const cell of this.$$(".day:not(.adjacent)")) {
      const d = cell.dataset.date;
      cell.classList.toggle("start", d === start);
      cell.classList.toggle("end", d === end);
      const inRange = lo && hi && !before(d, lo) && !before(hi, d);
      cell.classList.toggle("in-range", !!inRange && d !== start && d !== end);
    }
  }

  _pick(dateStr) {
    const start = this.getAttribute("start");
    const end = this.getAttribute("end");

    // No start yet, or a full range already set -> begin a fresh range.
    if (!start || (start && end)) {
      this.removeAttribute("end");
      this.setAttribute("start", dateStr);
      this._hover = null;
      this._renderPanel();
      return;
    }

    // We have a start and are choosing the end; swap if reversed.
    let s = start, e = dateStr;
    if (before(e, s)) [s, e] = [e, s];
    this.setAttribute("start", s);
    this.setAttribute("end", e);
    this._hover = null;
    this._renderPanel();
    this.dispatchEvent(new CustomEvent("change", {
      detail: { start: s, end: e }, bubbles: true,
    }));
  }

  _clear() {
    this.removeAttribute("start");
    this.removeAttribute("end");
    this._hover = null;
    this._renderPanel();
    this.dispatchEvent(new CustomEvent("change", {
      detail: { start: "", end: "" }, bubbles: true,
    }));
  }

  _applyI18n() {
    if (!this._trigger) return;
    this._pop?.setAttribute("aria-label", t("date-range.dialog"));
    this._syncLabel();
    if (this._pop?.matches(":popover-open")) this._renderPanel();
  }
}

const CSS = `
  :host { display: inline-block; }

  .anchor {
    anchor-name: ANCHOR;
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
    min-width: 16rem; width: 100%; text-align: left;
    font: inherit; font-size: var(--pura-text-sm); line-height: 1;
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm); cursor: pointer;
    padding: 0 var(--pura-space-3); height: 2.25rem;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease),
      background var(--pura-dur) var(--pura-ease);
  }
  .anchor:hover { border-color: var(--pura-fg); }
  .anchor:focus-visible { outline: none; border-color: var(--pura-accent); box-shadow: 0 0 0 3px var(--pura-ring); }
  .anchor:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }

  .icon { width: 1rem; height: 1rem; flex: none; color: var(--pura-muted);
    fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .label { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    font-variant-numeric: tabular-nums; }
  .anchor.placeholder .label { color: var(--pura-muted); }

  .panel {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    width: max-content; max-width: min(42rem, 96vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-3);
    font-size: var(--pura-text-sm); user-select: none;
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  .panel:popover-open { opacity: 1; transform: none; }

  .grids { display: flex; gap: var(--pura-space-4); }

  .header {
    display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-2); padding: 0 var(--pura-space-1) var(--pura-space-2);
  }
  .mlabel { font-weight: 550; font-size: var(--pura-text-sm); text-align: center; flex: 1; }

  .nav {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1.875rem; height: 1.875rem; flex: none;
    background: transparent; color: var(--pura-fg); cursor: pointer;
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-sm);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }
  .nav:hover { background: var(--pura-subtle); }
  .nav:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .nav svg { width: 1rem; height: 1rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

  .weekdays, .cells { display: grid; grid-template-columns: repeat(7, 1fr); gap: var(--pura-space-1); }

  .weekday {
    display: flex; align-items: center; justify-content: center;
    height: 2rem; font-size: var(--pura-text-xs); font-weight: 550; color: var(--pura-muted);
  }

  .day {
    position: relative;
    display: inline-flex; align-items: center; justify-content: center;
    width: 2.25rem; height: 2.25rem; padding: 0; margin: 0; font: inherit;
    font-size: var(--pura-text-sm); font-variant-numeric: tabular-nums;
    color: var(--pura-fg); background: transparent; cursor: pointer;
    border: 1px solid transparent; border-radius: var(--pura-radius-sm);
    transition: background var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease);
  }
  .day:hover { background: var(--pura-subtle); }
  .day:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .day.adjacent { color: var(--pura-muted); opacity: 0.4; cursor: default; }
  .day.adjacent:hover { background: transparent; }

  /* mid-range fill: squared so adjacent days read as a continuous band */
  .day.in-range {
    background: var(--pura-subtle); border-radius: 0;
  }
  /* range edges: filled with primary */
  .day.start, .day.end {
    background: var(--pura-primary); color: var(--pura-primary-fg); font-weight: 550;
  }
  .day.start:hover, .day.end:hover { background: var(--pura-primary-hover); }
  .day.start { border-top-right-radius: 0; border-bottom-right-radius: 0; }
  .day.end { border-top-left-radius: 0; border-bottom-left-radius: 0; }

  .foot {
    display: flex; justify-content: flex-end;
    margin-top: var(--pura-space-3); padding-top: var(--pura-space-3);
    border-top: 1px solid var(--pura-border);
  }
  .clear {
    font: inherit; font-size: var(--pura-text-sm); color: var(--pura-fg);
    background: transparent; cursor: pointer;
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-sm);
    padding: 0 var(--pura-space-3); height: 2rem;
    transition: background var(--pura-dur) var(--pura-ease);
  }
  .clear:hover { background: var(--pura-subtle); }
  .clear:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }

  @media (max-width: 34rem) {
    .grids { flex-direction: column; }
  }

  @supports not (anchor-name: --x) {
    :host { position: relative; }
    .panel { position: absolute; top: 100%; left: 0; inset: auto; }
  }
`;

define("pura-date-range-picker", PuraDateRangePicker);
export { PuraDateRangePicker };
