// <pura-calendar> — month calendar. Attributes: value (yyyy-mm-dd selected day),
// month (yyyy-mm displayed; defaults to current month). Renders a header with the
// month/year label and prev/next buttons, a localized weekday row, and a 7-col
// grid of day cells (adjacent-month days shown muted). Clicking or pressing
// Enter/Space on a day sets value, reflects the attribute, and emits
// CustomEvent('change', { detail: { value } }). Arrow keys move focus across days,
// rolling over to the previous/next month at the edges. role=grid + gridcell.
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages, getLocale } from "../i18n.js";

registerMessages({
  "calendar.prev": { en: "Previous month", "pt-BR": "Mês anterior", fr: "Mois précédent", de: "Vorheriger Monat", it: "Mese precedente" },
  "calendar.next": { en: "Next month", "pt-BR": "Próximo mês", fr: "Mois suivant", de: "Nächster Monat", it: "Mese successivo" },
});

const pad = (n) => String(n).padStart(2, "0");
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const sameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

// Parse "yyyy-mm-dd" / "yyyy-mm" into a local Date (avoids UTC shift of new Date(str)).
function parseDate(str) {
  if (!str) return null;
  const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(str.trim());
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3] || "1"));
  return Number.isNaN(d.getTime()) ? null : d;
}

class PuraCalendar extends PuraElement {
  static observedAttributes = ["value", "month"];

  connectedCallback() {
    // First-paint locale-aware short weekday names (Su..Sa style, week starts Sunday).
    this._weekdays = this._buildWeekdays();
    // The cursor is the focused day; defaults to selected day, else today within the month.
    this._cursor = null;
    this.render("", CSS);
    this._renderMonth();
    this._wired || this._wire();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  // Update only the already-rendered i18n nodes in place (no re-render, no new listeners).
  _applyI18n() {
    this.$(".prev")?.setAttribute("aria-label", t("calendar.prev"));
    this.$(".next")?.setAttribute("aria-label", t("calendar.next"));
    // rebuild locale-aware weekday + month names and repaint
    this._weekdays = this._buildWeekdays();
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
  _buildWeekdays() {
    try {
      const fmt = new Intl.DateTimeFormat(getLocale(), { weekday: "short" });
      // 2024-09-01 is a Sunday — walk a known week to get localized short names.
      return Array.from({ length: 7 }, (_, i) =>
        fmt.format(new Date(2024, 8, 1 + i)).replace(/\.$/, "")
      );
    } catch {
      return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    }
  }

  _monthLabel(year, month) {
    try {
      return new Intl.DateTimeFormat(getLocale(), { month: "long", year: "numeric" })
        .format(new Date(year, month, 1));
    } catch {
      return `${year}-${pad(month + 1)}`;
    }
  }

  _displayed() {
    const d = parseDate(this.month) || new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  }

  _renderMonth() {
    const { year, month } = this._displayed();
    const selected = parseDate(this.value);
    const today = new Date();

    // Establish the focusable cursor day for this month view.
    if (!this._cursor || this._cursor.getFullYear() !== year || this._cursor.getMonth() !== month) {
      if (selected && selected.getFullYear() === year && selected.getMonth() === month) {
        this._cursor = new Date(selected);
      } else if (today.getFullYear() === year && today.getMonth() === month) {
        this._cursor = new Date(year, month, today.getDate());
      } else {
        this._cursor = new Date(year, month, 1);
      }
    }

    const first = new Date(year, month, 1);
    const lead = first.getDay(); // 0 = Sunday
    const start = new Date(year, month, 1 - lead);

    const head = this._weekdays
      .map((w) => `<div class="weekday" part="weekday" role="columnheader" abbr="${w}">${w}</div>`)
      .join("");

    let rows = "";
    const cur = new Date(start);
    for (let week = 0; week < 6; week++) {
      let cells = "";
      for (let i = 0; i < 7; i++) {
        const inMonth = cur.getMonth() === month;
        const isToday = sameDay(cur, today);
        const isSelected = sameDay(cur, selected);
        const isCursor = sameDay(cur, this._cursor);
        const cls = [
          "day",
          inMonth ? "" : "adjacent",
          isToday ? "today" : "",
          isSelected ? "selected" : "",
        ].filter(Boolean).join(" ");
        const label = new Date(cur).toDateString();
        cells +=
          `<button type="button" class="${cls}" part="day${isToday ? " day-today" : ""}${isSelected ? " day-selected" : ""}"` +
          ` role="gridcell" data-date="${iso(cur)}"` +
          ` tabindex="${isCursor ? "0" : "-1"}"` +
          ` aria-selected="${isSelected ? "true" : "false"}"` +
          (isToday ? ` aria-current="date"` : "") +
          ` aria-label="${label}">${cur.getDate()}</button>`;
        cur.setDate(cur.getDate() + 1);
      }
      rows += `<div class="week" role="row">${cells}</div>`;
    }

    this.render(
      `<div class="cal" part="calendar">
         <div class="header" part="header">
           <button type="button" class="nav prev" part="nav nav-prev" aria-label="${t("calendar.prev")}">
             <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
           </button>
           <div class="label" part="label" aria-live="polite">${this._monthLabel(year, month)}</div>
           <button type="button" class="nav next" part="nav nav-next" aria-label="${t("calendar.next")}">
             <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
           </button>
         </div>
         <div class="grid" part="grid" role="grid" aria-label="${this._monthLabel(year, month)}">
           <div class="weekdays" role="row">${head}</div>
           ${rows}
         </div>
       </div>`,
      CSS
    );
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

const CSS = `
  :host { display: inline-block; }
  .cal {
    display: inline-block; padding: var(--pura-space-3);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg);
    box-shadow: var(--pura-shadow-sm); font-size: var(--pura-text-sm);
    user-select: none;
  }

  .header {
    display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-2); padding: 0 var(--pura-space-1) var(--pura-space-2);
  }
  .label { font-weight: 550; font-size: var(--pura-text-sm); text-align: center; flex: 1; }

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

  .weekdays, .week {
    display: grid; grid-template-columns: repeat(7, 1fr); gap: var(--pura-space-1);
  }
  .week { margin-top: var(--pura-space-1); }

  .weekday {
    display: flex; align-items: center; justify-content: center;
    height: 2rem; font-size: var(--pura-text-xs); font-weight: 550;
    color: var(--pura-muted);
  }

  .day {
    display: inline-flex; align-items: center; justify-content: center;
    width: 2.25rem; height: 2.25rem; padding: 0; margin: 0; font: inherit;
    font-size: var(--pura-text-sm); font-variant-numeric: tabular-nums;
    color: var(--pura-fg); background: transparent; cursor: pointer;
    border: 1px solid transparent; border-radius: var(--pura-radius-sm);
    transition: background var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .day:hover { background: var(--pura-subtle); }
  .day:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .day.adjacent { color: var(--pura-muted); opacity: 0.6; }

  /* today — subtle ring */
  .day.today { box-shadow: inset 0 0 0 1px var(--pura-border-strong); }
  .day.today:focus-visible { box-shadow: 0 0 0 3px var(--pura-ring); }

  /* selected — filled with primary */
  .day.selected {
    background: var(--pura-primary); color: var(--pura-primary-fg);
    font-weight: 550; opacity: 1;
  }
  .day.selected:hover { background: var(--pura-primary-hover); }
  .day.selected.today { box-shadow: none; }
`;

define("pura-calendar", PuraCalendar);
export { PuraCalendar };
