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
import { timePickerTemplate } from "./time-picker.template.js";

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
    const { html, css } = timePickerTemplate(this);
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


define("pura-time-picker", PuraTimePicker, meta);
export { PuraTimePicker };
