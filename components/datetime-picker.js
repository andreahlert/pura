// <pura-datetime-picker>: date + time in one popover. A trigger shows the
// formatted date and time; clicking opens a popover (native Popover API + CSS
// anchor positioning) with a <pura-calendar> and hour/minute selects below.
// Value is "YYYY-MM-DDTHH:MM". On any change it reflects the value attr and
// emits CustomEvent('change', { detail: { value } }). The calendar carries the
// date half; the selects carry the time half. Attributes: value, use24 (bool),
// minuteStep (default 5), disabled.
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages, getLocale } from "../i18n.js";

registerMessages({
  "datetime-picker.dialog": {
    en: "Choose date and time", "pt-BR": "Escolher data e hora",
    fr: "Choisir date et heure", de: "Datum und Uhrzeit wählen",
    it: "Scegli data e ora",
  },
  "datetime-picker.placeholder": {
    en: "Pick date & time", "pt-BR": "Selecione data e hora",
    fr: "Date et heure", de: "Datum & Uhrzeit", it: "Data e ora",
  },
  "datetime-picker.hour": {
    en: "Hour", "pt-BR": "Hora", fr: "Heure", de: "Stunde", it: "Ora",
  },
  "datetime-picker.minute": {
    en: "Minute", "pt-BR": "Minuto", fr: "Minute", de: "Minute", it: "Minuto",
  },
});

let uid = 0;
const pad = (n) => String(n).padStart(2, "0");

// Split "YYYY-MM-DDTHH:MM" into { date, h, mi }; tolerates space separator and
// a missing time half. Returns null only when the date part is unparseable.
function parse(str) {
  if (!str) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{1,2}):(\d{2}))?/.exec(str.trim());
  if (!m) return null;
  return {
    date: `${m[1]}-${m[2]}-${m[3]}`,
    h: m[4] != null ? Number(m[4]) : 0,
    mi: m[5] != null ? Number(m[5]) : 0,
  };
}

class PuraDatetimePicker extends PuraElement {
  static observedAttributes = ["value", "use24", "minuteStep", "disabled"];

  connectedCallback() {
    this._name = `--pura-datetimepicker-${uid++}`;
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
         aria-label="${t("datetime-picker.dialog")}">
         <pura-calendar part="calendar"></pura-calendar>
         <div class="time" part="time">
           <label class="field">
             <span class="flabel hour-label">${t("datetime-picker.hour")}</span>
             <select class="hour" part="hour"></select>
           </label>
           <span class="sep">:</span>
           <label class="field">
             <span class="flabel min-label">${t("datetime-picker.minute")}</span>
             <select class="minute" part="minute"></select>
           </label>
         </div>
       </div>`,
      CSS.replaceAll("ANCHOR", this._name)
    );

    this._trigger = this.$(".anchor");
    this._pop = this.$("[popover]");
    this._cal = this.$("pura-calendar");
    this._hour = this.$(".hour");
    this._minute = this.$(".minute");

    this._buildSelects();
    this._syncLabel();
    this._syncChildren();

    this._trigger.addEventListener("click", () => {
      if (this.hasAttribute("disabled")) return;
      this._pop.togglePopover();
    });

    this._pop.addEventListener("toggle", (e) => {
      const open = e.newState === "open";
      this._trigger.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        this._syncChildren();
        queueMicrotask(() => this._cal.shadowRoot?.querySelector('[tabindex="0"]')?.focus());
      }
    });

    // Calendar picks a date; keep the popover open so the user can set the time.
    this._cal.addEventListener("change", (e) => {
      e.stopPropagation();
      const date = e.detail?.value ?? this._cal.getAttribute("value") ?? "";
      this._commit(date, Number(this._hour.value), Number(this._minute.value));
    });

    this._hour.addEventListener("change", () => this._onTimeChange());
    this._minute.addEventListener("change", () => this._onTimeChange());

    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  attributeChangedCallback(name) {
    if (!this._trigger) return;
    if (name === "value" || name === "use24") this._syncLabel();
    if (name === "value") this._syncChildren();
    if (name === "minuteStep") { this._buildSelects(); this._syncChildren(); }
    if (name === "disabled") {
      this._trigger.disabled = this.hasAttribute("disabled");
      if (this.hasAttribute("disabled")) this._pop?.hidePopover();
    }
  }

  // ---- public API -------------------------------------------------------
  get value() { return this.getAttribute("value") || ""; }
  set value(v) {
    v == null || v === "" ? this.removeAttribute("value") : this.setAttribute("value", v);
  }

  // ---- internals --------------------------------------------------------
  get _use24() { return this.hasAttribute("use24"); }
  get _minuteStep() {
    const s = Number(this.getAttribute("minuteStep"));
    return s > 0 ? s : 5;
  }

  _format(str) {
    const p = parse(str);
    if (!p) return "";
    const [y, mo, d] = p.date.split("-").map(Number);
    const dt = new Date(y, mo - 1, d, p.h, p.mi);
    try {
      return new Intl.DateTimeFormat(getLocale(), {
        year: "numeric", month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit", hour12: !this._use24,
      }).format(dt);
    } catch {
      return str;
    }
  }

  _buildSelects() {
    if (!this._hour) return;
    const hours = Array.from({ length: 24 }, (_, h) =>
      `<option value="${h}">${this._formatHour(h)}</option>`).join("");
    const mins = [];
    for (let m = 0; m < 60; m += this._minuteStep) {
      mins.push(`<option value="${m}">${pad(m)}</option>`);
    }
    this._hour.innerHTML = hours;
    this._minute.innerHTML = mins.join("");
  }

  // Hour option label, honoring use24.
  _formatHour(h) {
    if (this._use24) return pad(h);
    const ap = h < 12 ? "AM" : "PM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12} ${ap}`;
  }

  _syncLabel() {
    const formatted = this._format(this.value);
    const placeholder = this.getAttribute("placeholder") || t("datetime-picker.placeholder");
    this._trigger.classList.toggle("placeholder", !formatted);
    this.$(".label").textContent = formatted || placeholder;
  }

  _syncChildren() {
    if (!this._cal) return;
    const p = parse(this.value);
    if (p) {
      this._cal.setAttribute("value", p.date);
      this._hour.value = String(p.h);
      // snap minute to the nearest available step option
      this._minute.value = String(this._snapMinute(p.mi));
    } else {
      this._cal.removeAttribute("value");
    }
  }

  _snapMinute(mi) {
    const step = this._minuteStep;
    return Math.min(59 - ((59) % step), Math.round(mi / step) * step) % 60;
  }

  _onTimeChange() {
    const date = this._cal.getAttribute("value");
    if (!date) return; // need a date before a datetime exists
    this._commit(date, Number(this._hour.value), Number(this._minute.value));
  }

  _commit(date, h, mi) {
    const value = `${date}T${pad(h)}:${pad(mi)}`;
    this.value = value;
    this.dispatchEvent(new CustomEvent("change", { detail: { value }, bubbles: true }));
  }

  _applyI18n() {
    if (!this._trigger) return;
    this._pop?.setAttribute("aria-label", t("datetime-picker.dialog"));
    this.$(".hour-label").textContent = t("datetime-picker.hour");
    this.$(".min-label").textContent = t("datetime-picker.minute");
    this._buildSelects();
    this._syncChildren();
    this._syncLabel();
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
    width: max-content; max-width: min(22rem, 92vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-3);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  .panel:popover-open { opacity: 1; transform: none; }

  /* the inner calendar is borderless here; the panel provides the surface */
  pura-calendar::part(calendar) { border: 0; box-shadow: none; padding: 0; }

  .time {
    display: flex; align-items: flex-end; gap: var(--pura-space-2);
    margin-top: var(--pura-space-3); padding-top: var(--pura-space-3);
    border-top: 1px solid var(--pura-border);
  }
  .field { display: flex; flex-direction: column; gap: var(--pura-space-1); flex: 1; }
  .flabel { font-size: var(--pura-text-xs); font-weight: 550; color: var(--pura-muted); }
  .sep { padding-bottom: 0.55rem; color: var(--pura-muted); font-weight: 600; }

  select {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    font-variant-numeric: tabular-nums;
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-2); height: 2.25rem; cursor: pointer;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  select:hover { border-color: var(--pura-fg); }
  select:focus-visible { outline: none; border-color: var(--pura-accent); box-shadow: 0 0 0 3px var(--pura-ring); }

  @supports not (anchor-name: --x) {
    :host { position: relative; }
    .panel { position: absolute; top: 100%; left: 0; inset: auto; }
  }
`;

define("pura-datetime-picker", PuraDatetimePicker);
export { PuraDatetimePicker };
