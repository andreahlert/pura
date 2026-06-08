// <pura-cron>, a cron expression builder and visualizer for standard 5-field
// expressions (minute hour day-of-month month day-of-week). Two modes:
//   mode="builder" (default), a preset <select> plus per-field inputs, with a
//     live human-readable description underneath.
//   mode="describe", read-only, just the description of `value`.
// The describer is self-contained English with core words localized via i18n
// (en/pt-BR/fr/de/it). Malformed fields show an invalid state.
//
// Attributes: value (5-field cron string), mode (builder|describe).
// Properties: .value (get/set the cron string).
// Events: 'change' { value, description } (bubbles) on every committed edit.
// Parts: field, description.
import { PuraElement, define } from "../base.js";
import meta from "./cron.meta.js";
import { getLocale, onLocaleChange, registerMessages } from "../i18n.js";
import {
  cronTemplate,
  parseCron,
  describe,
  matchPreset,
  validField,
  FIELDS,
  PRESETS,
} from "./cron.template.js";

registerMessages({
  "cron.preset": { en: "Schedule", "pt-BR": "Agendamento", fr: "Planification", de: "Zeitplan", it: "Pianificazione" },
  "cron.everyMinute": { en: "Every minute", "pt-BR": "A cada minuto", fr: "Chaque minute", de: "Jede Minute", it: "Ogni minuto" },
  "cron.hourly": { en: "Hourly", "pt-BR": "De hora em hora", fr: "Toutes les heures", de: "Stündlich", it: "Ogni ora" },
  "cron.daily": { en: "Daily", "pt-BR": "Diariamente", fr: "Quotidien", de: "Täglich", it: "Giornaliero" },
  "cron.weekly": { en: "Weekly", "pt-BR": "Semanalmente", fr: "Hebdomadaire", de: "Wöchentlich", it: "Settimanale" },
  "cron.monthly": { en: "Monthly", "pt-BR": "Mensalmente", fr: "Mensuel", de: "Monatlich", it: "Mensile" },
  "cron.custom": { en: "Custom", "pt-BR": "Personalizado", fr: "Personnalisé", de: "Benutzerdefiniert", it: "Personalizzato" },
  "cron.minute": { en: "Minute", "pt-BR": "Minuto", fr: "Minute", de: "Minute", it: "Minuto" },
  "cron.hour": { en: "Hour", "pt-BR": "Hora", fr: "Heure", de: "Stunde", it: "Ora" },
  "cron.dom": { en: "Day of month", "pt-BR": "Dia do mês", fr: "Jour du mois", de: "Tag des Monats", it: "Giorno del mese" },
  "cron.month": { en: "Month", "pt-BR": "Mês", fr: "Mois", de: "Monat", it: "Mese" },
  "cron.dow": { en: "Day of week", "pt-BR": "Dia da semana", fr: "Jour de la semaine", de: "Wochentag", it: "Giorno della settimana" },
  "cron.invalid": { en: "Invalid cron expression", "pt-BR": "Expressão cron inválida", fr: "Expression cron invalide", de: "Ungültiger Cron-Ausdruck", it: "Espressione cron non valida" },
  // Core description words (the dynamic sentence is built from these).
  "cron.w.at": { en: "at", "pt-BR": "às", fr: "à", de: "um", it: "alle" },
  "cron.w.every": { en: "every", "pt-BR": "a cada", fr: "toutes les", de: "alle", it: "ogni" },
  "cron.w.everyMinute": { en: "Every minute", "pt-BR": "A cada minuto", fr: "Chaque minute", de: "Jede Minute", it: "Ogni minuto" },
  "cron.w.everyHour": { en: "every hour", "pt-BR": "a cada hora", fr: "chaque heure", de: "jede Stunde", it: "ogni ora" },
  "cron.w.minutes": { en: "minutes", "pt-BR": "minutos", fr: "minutes", de: "Minuten", it: "minuti" },
  "cron.w.minute": { en: "minute", "pt-BR": "o minuto", fr: "la minute", de: "Minute", it: "il minuto" },
  "cron.w.of": { en: "of", "pt-BR": "de", fr: "de", de: "von", it: "di" },
  "cron.w.onDay": { en: "on day {n} of the month", "pt-BR": "no dia {n} do mês", fr: "le {n} du mois", de: "am {n}. Tag des Monats", it: "il giorno {n} del mese" },
  "cron.w.inMonth": { en: "in {m}", "pt-BR": "em {m}", fr: "en {m}", de: "im {m}", it: "in {m}" },
  "cron.w.on": { en: "on {d}", "pt-BR": "em {d}", fr: "le {d}", de: "am {d}", it: "il {d}" },
});

class PuraCron extends PuraElement {
  static observedAttributes = ["value", "mode"];

  connectedCallback() {
    this._mode = this.getAttribute("mode") === "describe" ? "describe" : "builder";
    this._value = this.getAttribute("value") || PRESETS.everyMinute;
    this._build();
    this._i18nOff = onLocaleChange(() => this._build());
  }

  disconnectedCallback() { this._i18nOff?.(); }

  attributeChangedCallback(name, _old, val) {
    if (!this.shadowRoot.firstChild) return;
    if (name === "mode") { this._mode = val === "describe" ? "describe" : "builder"; this._build(); }
    if (name === "value" && val !== this._value) { this._value = val || ""; this._build(); }
  }

  get value() { return this._value; }
  set value(v) {
    this._value = String(v || "");
    this.setAttribute("value", this._value);
    if (this.shadowRoot.firstChild) this._build();
  }

  // (Re)render the whole UI for the current mode + value.
  _build() {
    const { html, css } = cronTemplate(this);
    this.render(html, css);

    if (this._mode === "describe") return;

    const presetSel = this.$(".preset");
    presetSel.value = matchPreset(this._value);
    presetSel.addEventListener("change", () => {
      const v = presetSel.value;
      if (v !== "custom" && PRESETS[v]) {
        this._value = PRESETS[v];
        this.setAttribute("value", this._value);
        this._build();
        // User action: emit the committed change.
        this._emit(describe(parseCron(this._value).fields, getLocale()));
      }
    });

    this.$$(".fin").forEach((inp) => {
      const commit = () => this._fromFields();
      inp.addEventListener("change", commit);
      inp.addEventListener("input", commit);
    });
  }

  // Recompose the cron string from the field inputs, revalidate, redescribe.
  _fromFields() {
    const vals = {};
    this.$$(".fin").forEach((inp) => { vals[inp.dataset.key] = inp.value.trim() || "*"; });
    this._value = FIELDS.map((f) => vals[f.key]).join(" ");
    this.setAttribute("value", this._value);

    const { ok, fields } = parseCron(this._value);
    const desc = describe(fields, getLocale());

    // Update description + invalid state + preset selection in place.
    const descEl = this.$(".desc");
    if (descEl) { descEl.textContent = desc; descEl.classList.toggle("invalid", !ok); }
    this.$$(".fin").forEach((inp) => {
      const f = FIELDS.find((x) => x.key === inp.dataset.key);
      const valid = validField(inp.value.trim() || "*", f.min, f.max);
      inp.classList.toggle("bad", !valid);
    });
    const presetSel = this.$(".preset");
    if (presetSel) presetSel.value = matchPreset(this._value);

    this._emit(desc);
  }

  _emit(description) {
    this.dispatchEvent(new CustomEvent("change", {
      detail: { value: this._value, description },
      bubbles: true,
    }));
  }
}

define("pura-cron", PuraCron, meta);
export { PuraCron };
