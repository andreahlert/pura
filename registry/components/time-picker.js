// <pura-time-picker>: time input. A trigger shows the formatted selected time;
// clicking opens a popover (native Popover API + CSS anchor positioning) with a
// scrollable list of selectable times (stepped by `step` minutes). On pick it
// updates the trigger, reflects the value attr, closes the popover, and emits
// CustomEvent('change', { detail: { value } }). Value is "HH:MM" (or "HH:MM:SS"
// when `seconds`). Attributes: value, step (minutes, default 30), use24 (bool),
// seconds (bool), min, max ("HH:MM"), disabled.
import { PuraElement, define } from "../base.js";
import meta from "./time-picker.meta.js";
import { t, onLocaleChange, registerMessages, getLocale } from "../i18n.js";

registerMessages({
  "time-picker.dialog": {
    en: "Choose time", "pt-BR": "Escolher horário", fr: "Choisir une heure",
    de: "Uhrzeit wählen", it: "Scegli un orario",
  },
  "time-picker.placeholder": {
    en: "Pick a time", "pt-BR": "Selecione um horário", fr: "Sélectionner une heure",
    de: "Uhrzeit auswählen", it: "Seleziona un orario",
  },
});

let uid = 0;
const pad = (n) => String(n).padStart(2, "0");

// Parse "HH:MM" / "HH:MM:SS" into total seconds since midnight, or null.
function parseTime(str) {
  if (!str) return null;
  const m = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(str.trim());
  if (!m) return null;
  const h = Number(m[1]), mi = Number(m[2]), s = Number(m[3] || "0");
  if (h > 23 || mi > 59 || s > 59) return null;
  return h * 3600 + mi * 60 + s;
}

// Total seconds back into canonical "HH:MM" or "HH:MM:SS".
function toValue(total, withSeconds) {
  const h = Math.floor(total / 3600) % 24;
  const mi = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return withSeconds ? `${pad(h)}:${pad(mi)}:${pad(s)}` : `${pad(h)}:${pad(mi)}`;
}

class PuraTimePicker extends PuraElement {
  static observedAttributes = ["value", "step", "use24", "seconds", "min", "max", "placeholder", "disabled"];

  connectedCallback() {
    this._name = `--pura-timepicker-${uid++}`;
    this.render(
      `<button class="anchor" part="trigger" type="button"
         aria-haspopup="listbox" aria-expanded="false"
         ${this.hasAttribute("disabled") ? "disabled" : ""}>
         <svg class="icon" viewBox="0 0 24 24" part="icon" aria-hidden="true">
           <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
         </svg>
         <span class="label" part="label"></span>
       </button>
       <div class="panel" part="panel" popover="auto" role="listbox"
         aria-label="${t("time-picker.dialog")}"></div>`,
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
        this._renderOptions();
        queueMicrotask(() => {
          const sel = this.$(".option[aria-selected='true']") || this.$(".option");
          sel?.scrollIntoView({ block: "center" });
          sel?.focus();
        });
      }
    });

    this._pop.addEventListener("click", (e) => {
      const opt = e.target.closest(".option");
      if (opt) this._pick(opt.dataset.value);
    });

    this._pop.addEventListener("keydown", (e) => {
      const opt = e.target.closest(".option");
      if (!opt) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this._pick(opt.dataset.value);
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const sib = e.key === "ArrowDown" ? opt.nextElementSibling : opt.previousElementSibling;
        sib?.focus();
      }
    });

    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  attributeChangedCallback(name) {
    if (!this._trigger) return;
    if (name === "value" || name === "use24" || name === "seconds" || name === "placeholder") this._syncLabel();
    if (name === "disabled") {
      this._trigger.disabled = this.hasAttribute("disabled");
      if (this.hasAttribute("disabled")) this._pop?.hidePopover();
    }
    if (this._pop?.matches(":popover-open")) this._renderOptions();
  }

  // ---- public API -------------------------------------------------------
  get value() { return this.getAttribute("value") || ""; }
  set value(v) {
    v == null || v === "" ? this.removeAttribute("value") : this.setAttribute("value", v);
  }

  // ---- internals --------------------------------------------------------
  get _step() {
    const s = Number(this.getAttribute("step"));
    return s > 0 ? s : 30;
  }
  get _use24() { return this.hasAttribute("use24"); }
  get _seconds() { return this.hasAttribute("seconds"); }

  // Locale + use24 aware label for a "HH:MM[:SS]" string.
  _format(str) {
    const total = parseTime(str);
    if (total == null) return "";
    const d = new Date(2000, 0, 1, 0, 0, 0);
    d.setSeconds(total);
    try {
      return new Intl.DateTimeFormat(getLocale(), {
        hour: "2-digit", minute: "2-digit",
        ...(this._seconds ? { second: "2-digit" } : {}),
        hour12: !this._use24,
      }).format(d);
    } catch {
      return str;
    }
  }

  _syncLabel() {
    const formatted = this._format(this.value);
    const placeholder = this.getAttribute("placeholder") || t("time-picker.placeholder");
    this._trigger.classList.toggle("placeholder", !formatted);
    this.$(".label").textContent = formatted || placeholder;
  }

  _applyI18n() {
    if (!this._trigger) return;
    this._pop?.setAttribute("aria-label", t("time-picker.dialog"));
    this._syncLabel();
    if (this._pop?.matches(":popover-open")) this._renderOptions();
  }

  _renderOptions() {
    const stepSec = this._step * 60;
    const min = parseTime(this.getAttribute("min")) ?? 0;
    const max = parseTime(this.getAttribute("max")) ?? 24 * 3600 - 1;
    const selected = parseTime(this.value);
    let html = "";
    for (let t0 = min; t0 <= max; t0 += stepSec) {
      const v = toValue(t0, this._seconds);
      const isSel = selected != null && t0 === selected;
      html +=
        `<button type="button" class="option${isSel ? " selected" : ""}" part="option"` +
        ` role="option" data-value="${v}" tabindex="-1"` +
        ` aria-selected="${isSel ? "true" : "false"}">${this._format(v)}</button>`;
    }
    this._pop.innerHTML = html;
  }

  _pick(value) {
    this.value = value;
    this._pop.hidePopover();
    this._trigger.focus();
    this.dispatchEvent(new CustomEvent("change", { detail: { value }, bubbles: true }));
  }
}

const CSS = `
  :host { display: inline-block; }

  .anchor {
    anchor-name: ANCHOR;
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
    min-width: 10rem; width: 100%; text-align: left;
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
    min-width: anchor-size(width); width: max-content; max-width: min(16rem, 92vw);
    max-height: 16rem; overflow-y: auto;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-1);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  .panel:popover-open { opacity: 1; transform: none; }

  .option {
    display: block; width: 100%; text-align: left; font: inherit;
    font-size: var(--pura-text-sm); font-variant-numeric: tabular-nums;
    color: var(--pura-fg); background: transparent; cursor: pointer;
    border: 1px solid transparent; border-radius: var(--pura-radius-sm);
    padding: 0 var(--pura-space-3); height: 2rem; line-height: 2rem;
    transition: background var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease);
  }
  .option:hover { background: var(--pura-subtle); }
  .option:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .option.selected {
    background: var(--pura-primary); color: var(--pura-primary-fg); font-weight: 550;
  }
  .option.selected:hover { background: var(--pura-primary-hover); }

  @supports not (anchor-name: --x) {
    :host { position: relative; }
    .panel { position: absolute; top: 100%; left: 0; inset: auto; }
  }
`;

define("pura-time-picker", PuraTimePicker, meta);
export { PuraTimePicker };
