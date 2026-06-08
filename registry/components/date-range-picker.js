// <pura-date-range-picker>: pick a start and end date. The trigger shows the
// formatted range; clicking opens a popover (native Popover API + CSS anchor
// positioning) with one or two side-by-side month grids. First click sets the
// start, second sets the end; while choosing the end, hovering previews the
// range. Reversed picks swap so start <= end. Attributes: start, end
// ("YYYY-MM-DD"), months (1|2, default 2), disabled. The `value` getter returns
// { start, end }. Emits CustomEvent('change', { detail: { start, end } }).
import { PuraElement, define } from "../base.js";
import meta from "./date-range-picker.meta.js";
import { t, onLocaleChange, registerMessages, getLocale } from "../i18n.js";
import { dateRangePickerTemplate } from "./date-range-picker.template.js";

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

    const { html, css } = dateRangePickerTemplate(this);
    this.render(html, css);

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


define("pura-date-range-picker", PuraDateRangePicker, meta);
export { PuraDateRangePicker };
