// Pure render for <pura-calendar>. No DOM; SSR/DSD + client safe.
// Builds the full month view (header + localized weekday row + 6-week day grid)
// from [month]/[value] plus the live focus cursor (el._cursor) on the client.
// Everything is derived from attributes + locale; under EMPTY_SHIM month/value
// fall back to null → the current month renders, and el._cursor is absent so a
// default cursor (selected-in-month, else today-in-month, else day 1) is
// computed — matching the component's original establish-block behavior exactly.
// Date helpers iso/parseDate are owned here and re-exported for the component's
// navigation + selection handlers.
import { EMPTY_SHIM } from "../base.js";
import { t, getLocale } from "../i18n.js";

const pad = (n) => String(n).padStart(2, "0");
export const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const sameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

// Parse "yyyy-mm-dd" / "yyyy-mm" into a local Date (avoids UTC shift of new Date(str)).
export function parseDate(str) {
  if (!str) return null;
  const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(str.trim());
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3] || "1"));
  return Number.isNaN(d.getTime()) ? null : d;
}

// Locale-aware short weekday names (Su..Sa style, week starts Sunday).
function buildWeekdays() {
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

function monthLabel(year, month) {
  try {
    return new Intl.DateTimeFormat(getLocale(), { month: "long", year: "numeric" })
      .format(new Date(year, month, 1));
  } catch {
    return `${year}-${pad(month + 1)}`;
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
  /* Adjacent-month days are real, focusable buttons, so they must meet text
     contrast: lean on the muted token alone, no opacity multiplier that would
     drag the effective ratio below 4.5. */
  .day.adjacent { color: var(--pura-muted); }

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

export function calendarTemplate(el = EMPTY_SHIM) {
  const displayed = parseDate(el.getAttribute("month")) || new Date();
  const year = displayed.getFullYear();
  const month = displayed.getMonth();
  const selected = parseDate(el.getAttribute("value"));
  const today = new Date();

  // Focusable cursor day: honor the live cursor when it sits in this month view,
  // else default to selected-in-month, else today-in-month, else day 1.
  let cursor = el._cursor;
  if (!cursor || cursor.getFullYear() !== year || cursor.getMonth() !== month) {
    if (selected && selected.getFullYear() === year && selected.getMonth() === month) {
      cursor = new Date(selected);
    } else if (today.getFullYear() === year && today.getMonth() === month) {
      cursor = new Date(year, month, today.getDate());
    } else {
      cursor = new Date(year, month, 1);
    }
  }

  const weekdays = buildWeekdays();
  const first = new Date(year, month, 1);
  const lead = first.getDay(); // 0 = Sunday
  const start = new Date(year, month, 1 - lead);

  const head = weekdays
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
      const isCursor = sameDay(cur, cursor);
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

  const lbl = monthLabel(year, month);
  const html = `<div class="cal" part="calendar">
         <div class="header" part="header">
           <button type="button" class="nav prev" part="nav nav-prev" aria-label="${t("calendar.prev")}">
             <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
           </button>
           <div class="label" part="label" aria-live="polite">${lbl}</div>
           <button type="button" class="nav next" part="nav nav-next" aria-label="${t("calendar.next")}">
             <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
           </button>
         </div>
         <div class="grid" part="grid" role="grid" aria-label="${lbl}">
           <div class="weekdays" role="row">${head}</div>
           ${rows}
         </div>
       </div>`;
  return { html, css: CSS };
}
