// <pura-calendar> — month calendar. Attributes: value (yyyy-mm-dd selected day),
// month (yyyy-mm displayed; defaults to current month). Renders a header with the
// month/year label and prev/next buttons, a localized weekday row, and a 7-col
// grid of day cells (adjacent-month days shown muted). Clicking or pressing
// Enter/Space on a day sets value, reflects the attribute, and emits
// CustomEvent('change', { detail: { value } }). Arrow keys move focus across days,
// rolling over to the previous/next month at the edges. role=grid + gridcell.
import { PuraElement, define } from "../base.js";
import meta from "./calendar.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { calendarTemplate, iso, parseDate } from "./calendar.template.js";

registerMessages({
  "calendar.prev": { en: "Previous month", "pt-BR": "Mês anterior", fr: "Mois précédent", de: "Vorheriger Monat", it: "Mese precedente" },
  "calendar.next": { en: "Next month", "pt-BR": "Próximo mês", fr: "Mois suivant", de: "Nächster Monat", it: "Mese successivo" },
});

class PuraCalendar extends PuraElement {
  static observedAttributes = ["value", "month"];

  connectedCallback() {
    // The cursor is the focused day; defaults to selected day, else today within
    // the month (computed by the template when null).
    this._cursor = null;
    this._renderMonth();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  // Locale changed: repaint (the template rebuilds weekday + month names fresh).
  _applyI18n() {
    this._renderMonth();
  }

  attributeChangedCallback(name, oldV, newV) {
    if (oldV === newV || !this.shadowRoot.firstChild) return;
    if (name === "month") this._cursor = null;
    this._renderMonth();
  }

  // ---- public API -------------------------------------------------------
  get value() { return this.getAttribute("value") || ""; }
  set value(v) { v == null ? this.removeAttribute("value") : this.setAttribute("value", v); }

  get month() {
    return this.getAttribute("month") || iso(new Date()).slice(0, 7);
  }
  set month(v) { this.setAttribute("month", v); }

  // ---- internals --------------------------------------------------------
  _displayed() {
    const d = parseDate(this.month) || new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  }

  _renderMonth() {
    const { html, css } = calendarTemplate(this);
    this.render(html, css);
    this._wired = false;
    this._wire();
  }

  _wire() {
    if (this._wired) return;
    this._wired = true;
    const grid = this.$(".grid");
    this.$(".prev").addEventListener("click", () => this._shiftMonth(-1));
    this.$(".next").addEventListener("click", () => this._shiftMonth(1));

    grid.addEventListener("click", (e) => {
      const cell = e.target.closest(".day");
      if (cell) this._select(cell.dataset.date);
    });

    grid.addEventListener("keydown", (e) => {
      const cell = e.target.closest(".day");
      if (!cell) return;
      const base = parseDate(cell.dataset.date);
      let next = null;
      switch (e.key) {
        case "ArrowLeft": next = this._addDays(base, -1); break;
        case "ArrowRight": next = this._addDays(base, 1); break;
        case "ArrowUp": next = this._addDays(base, -7); break;
        case "ArrowDown": next = this._addDays(base, 7); break;
        case "Home": next = new Date(base.getFullYear(), base.getMonth(), 1); break;
        case "End": next = new Date(base.getFullYear(), base.getMonth() + 1, 0); break;
        case "PageUp": next = this._addMonths(base, -1); break;
        case "PageDown": next = this._addMonths(base, 1); break;
        case "Enter":
        case " ":
          e.preventDefault();
          this._select(cell.dataset.date);
          return;
        default:
          return;
      }
      e.preventDefault();
      this._moveTo(next);
    });
  }

  _addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
  _addMonths(d, n) { const r = new Date(d); r.setMonth(r.getMonth() + n); return r; }

  // Move focus (cursor) to a day, switching the displayed month if it crossed an edge.
  _moveTo(date) {
    const { year, month } = this._displayed();
    this._cursor = date;
    if (date.getFullYear() !== year || date.getMonth() !== month) {
      this.setAttribute("month", iso(date).slice(0, 7)); // triggers re-render
    } else {
      this._renderMonth();
    }
    const focus = this.shadowRoot.querySelector(`.day[data-date="${iso(date)}"]`);
    focus?.focus();
  }

  _shiftMonth(dir) {
    const { year, month } = this._displayed();
    const next = new Date(year, month + dir, 1);
    this._cursor = null;
    this.setAttribute("month", iso(next).slice(0, 7));
  }

  _select(dateStr) {
    this.setAttribute("value", dateStr);
    this._cursor = parseDate(dateStr);
    // Ensure the displayed month follows the selection.
    const m = dateStr.slice(0, 7);
    if (m !== this.month) this.setAttribute("month", m);
    else this._renderMonth();
    this.shadowRoot.querySelector(`.day[data-date="${dateStr}"]`)?.focus();
    this.dispatchEvent(new CustomEvent("change", { detail: { value: dateStr }, bubbles: true }));
  }
}

define("pura-calendar", PuraCalendar, meta);
export { PuraCalendar };
