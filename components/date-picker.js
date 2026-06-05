// <pura-date-picker> — date picker. Renders an input-like trigger showing the
// formatted selected date (or a placeholder). Clicking opens a popover (native
// Popover API + CSS anchor positioning) containing a <pura-calendar>. On the
// calendar's 'change' it updates the trigger label, sets .value/value attr,
// closes the popover, and emits CustomEvent('change', { detail: { value } }).
// The current value is passed down to the calendar via its value attr.
// Attributes: value (yyyy-mm-dd), placeholder, disabled.
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages, getLocale } from "../i18n.js";

registerMessages({
  "date-picker.dialog": {
    en: "Choose date",
    "pt-BR": "Escolher data",
    fr: "Choisir une date",
    de: "Datum wählen",
    it: "Scegli una data",
  },
  "date-picker.placeholder": {
    en: "Pick a date",
    "pt-BR": "Selecione uma data",
    fr: "Sélectionner une date",
    de: "Datum auswählen",
    it: "Seleziona una data",
  },
});

let uid = 0;

// Parse "yyyy-mm-dd" into a local Date (avoids the UTC shift of new Date(str)).
function parseDate(str) {
  if (!str) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str.trim());
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

// Locale-aware long date label, e.g. "May 29, 2026".
function formatDate(str) {
  const d = parseDate(str);
  if (!d) return "";
  try {
    return new Intl.DateTimeFormat(getLocale(), {
      year: "numeric", month: "long", day: "numeric",
    }).format(d);
  } catch {
    return str;
  }
}

class PuraDatePicker extends PuraElement {
  static observedAttributes = ["value", "placeholder", "disabled"];

  connectedCallback() {
    this._name = `--pura-datepicker-${uid++}`;
    this.render(
      `<button class="anchor" part="trigger" type="button"
         aria-haspopup="dialog" aria-expanded="false"
         ${this.hasAttribute("disabled") ? "disabled" : ""}>
         <svg class="icon" viewBox="0 0 24 24" part="icon" aria-hidden="true">
           <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
         </svg>
         <span class="label" part="label"></span>
       </button>
       <div class="panel" part="content" popover="auto" role="dialog" aria-label="${t("date-picker.dialog")}">
         <pura-calendar part="calendar"></pura-calendar>
       </div>`,
      CSS.replaceAll("ANCHOR", this._name)
    );

    this._trigger = this.$(".anchor");
    this._pop = this.$("[popover]");
    this._cal = this.$("pura-calendar");

    this._syncLabel();
    this._syncCalendar();

    this._trigger.addEventListener("click", () => {
      if (this.hasAttribute("disabled")) return;
      this._pop.togglePopover();
    });

    this._pop.addEventListener("toggle", (e) => {
      const open = e.newState === "open";
      this._trigger.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        this._syncCalendar();
        // move focus into the calendar's active day once it lays out
        queueMicrotask(() => this._cal.shadowRoot?.querySelector('[tabindex="0"]')?.focus());
      }
    });

    this._cal.addEventListener("change", (e) => {
      const value = e.detail?.value ?? this._cal.getAttribute("value") ?? "";
      // keep the calendar's own change from leaking as our public event
      e.stopPropagation();
      this.value = value;
      this._pop.hidePopover();
      this._trigger.focus();
      this.dispatchEvent(new CustomEvent("change", { detail: { value }, bubbles: true }));
    });

    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  attributeChangedCallback(name) {
    if (!this._trigger) return;
    if (name === "value" || name === "placeholder") this._syncLabel();
    if (name === "value") this._syncCalendar();
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
  _syncLabel() {
    const formatted = formatDate(this.value);
    const placeholder = this.getAttribute("placeholder") || t("date-picker.placeholder");
    this._trigger.classList.toggle("placeholder", !formatted);
    this.$(".label").textContent = formatted || placeholder;
  }

  // Update only the already-rendered i18n nodes in place (no re-render, no new listeners).
  _applyI18n() {
    if (!this._trigger) return;
    this._pop?.setAttribute("aria-label", t("date-picker.dialog"));
    this._syncLabel();
  }

  _syncCalendar() {
    if (!this._cal) return;
    const v = this.value;
    if (v) this._cal.setAttribute("value", v);
    else this._cal.removeAttribute("value");
  }
}

const CSS = `
  :host { display: inline-block; }

  .anchor {
    anchor-name: ANCHOR;
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
    min-width: 14rem; width: 100%; text-align: left;
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
  .label { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .anchor.placeholder .label { color: var(--pura-muted); }

  /* The panel is just a positioned wrapper; pura-calendar renders its own card
     (border + radius + shadow), so we don't double up the surface chrome here. */
  .panel {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box; padding: 0; border: 0; background: transparent;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    width: max-content; max-width: min(20rem, 92vw);
    box-shadow: var(--pura-shadow-lg); border-radius: var(--pura-radius-lg);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  .panel:popover-open { opacity: 1; transform: none; }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    :host { position: relative; }
    .panel { position: absolute; top: 100%; left: 0; inset: auto; }
  }
`;

define("pura-date-picker", PuraDatePicker);
export { PuraDatePicker };
