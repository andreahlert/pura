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
import { t, getLocale, onLocaleChange, registerMessages } from "../i18n.js";

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

const MONTHS = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  "pt-BR": ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
  fr: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
  de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  it: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
};
const DAYS = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  "pt-BR": ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
  fr: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
  de: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
  it: ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"],
};

const PRESETS = {
  everyMinute: "* * * * *",
  hourly: "0 * * * *",
  daily: "0 0 * * *",
  weekly: "0 0 * * 0",
  monthly: "0 0 1 * *",
};

const FIELDS = [
  { key: "minute", min: 0, max: 59 },
  { key: "hour", min: 0, max: 23 },
  { key: "dom", min: 1, max: 31 },
  { key: "month", min: 1, max: 12 },
  { key: "dow", min: 0, max: 7 },
];

// Validate one cron field against its [min,max] range. Accepts *, n, a-b,
// */step, lists of those. Returns true when well formed.
function validField(raw, min, max) {
  if (raw == null || raw === "") return false;
  for (const part of String(raw).split(",")) {
    let body = part, step = null;
    if (part.includes("/")) {
      const [b, s] = part.split("/");
      body = b; step = s;
      if (!/^\d+$/.test(s) || Number(s) < 1) return false;
    }
    if (body === "*") continue;
    if (body.includes("-")) {
      const [a, b] = body.split("-");
      if (!/^\d+$/.test(a) || !/^\d+$/.test(b)) return false;
      if (Number(a) < min || Number(b) > max || Number(a) > Number(b)) return false;
      continue;
    }
    if (step != null && body === "") continue; // e.g. "/15" tolerated
    if (!/^\d+$/.test(body)) return false;
    if (Number(body) < min || Number(body) > max) return false;
  }
  return true;
}

// Split + validate a full 5-field expression. Returns { ok, fields } where
// fields is { minute, hour, dom, month, dow } (raw strings).
function parseCron(value) {
  const parts = String(value || "").trim().split(/\s+/);
  if (parts.length !== 5) return { ok: false, fields: null };
  const fields = {};
  let ok = true;
  FIELDS.forEach((f, i) => {
    fields[f.key] = parts[i];
    if (!validField(parts[i], f.min, f.max)) ok = false;
  });
  return { ok, fields };
}

// Build a human-readable description from a validated field set.
function describe(fields, loc) {
  if (!fields) return t("cron.invalid");
  const { minute, hour, dom, month, dow } = fields;
  const months = MONTHS[loc] || MONTHS.en;
  const days = DAYS[loc] || DAYS.en;
  const parts = [];

  // Time-of-day clause.
  if (minute === "*" && hour === "*") {
    parts.push(t("cron.w.everyMinute"));
  } else if (minute.startsWith("*/") && hour === "*") {
    parts.push(`${t("cron.w.every")} ${minute.slice(2)} ${t("cron.w.minutes")}`);
  } else if (minute !== "*" && hour === "*") {
    parts.push(`${t("cron.w.at")} ${t("cron.w.minute")} ${minute} ${t("cron.w.of")} ${t("cron.w.everyHour")}`);
  } else if (minute !== "*" && hour !== "*" && /^\d+$/.test(minute) && /^\d+$/.test(hour)) {
    parts.push(`${t("cron.w.at")} ${pad(hour)}:${pad(minute)}`);
  } else {
    parts.push(`${t("cron.w.at")} ${hour}:${minute}`);
  }

  // Day-of-month clause (single day named; ranges/lists echo the raw token).
  if (dom !== "*") parts.push(t("cron.w.onDay", { n: dom }));

  // Month clause (name a single month; otherwise echo the token).
  if (month !== "*") {
    const m = /^\d+$/.test(month) ? (months[Number(month) - 1] || month) : month;
    parts.push(t("cron.w.inMonth", { m }));
  }

  // Day-of-week clause. A single number names the day (7 and 0 both = Sunday);
  // ranges/lists echo the raw token (e.g. "1-5").
  if (dow !== "*") {
    const d = /^\d+$/.test(dow) ? (days[Number(dow) % 7] || dow) : dow;
    parts.push(t("cron.w.on", { d }));
  }

  const s = parts.join(" ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function pad(n) { return String(n).padStart(2, "0"); }

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
    const { ok, fields } = parseCron(this._value);
    const desc = describe(fields, getLocale());

    if (this._mode === "describe") {
      this.render(
        `<p part="description" class="desc ${ok ? "" : "invalid"}">${esc(desc)}</p>`,
        CSS
      );
      return;
    }

    // Builder: preset select + 5 field inputs + live description.
    const preset = matchPreset(this._value);
    this.render(
      `<div class="root">
         <label class="presetwrap">
           <span class="lbl">${esc(t("cron.preset"))}</span>
           <select part="field" class="preset">
             <option value="everyMinute">${esc(t("cron.everyMinute"))}</option>
             <option value="hourly">${esc(t("cron.hourly"))}</option>
             <option value="daily">${esc(t("cron.daily"))}</option>
             <option value="weekly">${esc(t("cron.weekly"))}</option>
             <option value="monthly">${esc(t("cron.monthly"))}</option>
             <option value="custom">${esc(t("cron.custom"))}</option>
           </select>
         </label>
         <div class="fields">
           ${FIELDS.map((f) => `
             <label class="fieldwrap">
               <span class="lbl">${esc(t("cron." + f.key))}</span>
               <input part="field" class="fin" data-key="${f.key}"
                 value="${esc(fields ? fields[f.key] : "*")}" autocomplete="off" spellcheck="false" />
             </label>`).join("")}
         </div>
         <p part="description" class="desc ${ok ? "" : "invalid"}">${esc(desc)}</p>
       </div>`,
      CSS
    );

    const presetSel = this.$(".preset");
    presetSel.value = preset;
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

// Which preset (if any) the value matches; "custom" otherwise.
function matchPreset(value) {
  const norm = String(value || "").trim().replace(/\s+/g, " ");
  for (const [k, v] of Object.entries(PRESETS)) if (v === norm) return k;
  return "custom";
}

function esc(v) {
  return v == null ? "" : String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

const CSS = `
  :host { display: block; }
  .root { display: flex; flex-direction: column; gap: var(--pura-space-3); }
  .lbl { display: block; font-size: var(--pura-text-xs); font-weight: 600; color: var(--pura-muted-fg); margin-bottom: var(--pura-space-1); }

  .fields { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: var(--pura-space-2); }
  @media (max-width: 480px) { .fields { grid-template-columns: repeat(2, minmax(0, 1fr)); } }

  select, input {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-3); height: 2.25rem; box-shadow: var(--pura-shadow-sm);
    transition: border-color var(--pura-dur) var(--pura-ease), box-shadow var(--pura-dur) var(--pura-ease);
  }
  input { font-family: var(--pura-font-mono); text-align: center; }
  select:hover, input:hover { border-color: var(--pura-fg); }
  select:focus, input:focus { outline: none; border-color: var(--pura-accent); box-shadow: 0 0 0 3px var(--pura-ring); }
  input.bad { border-color: var(--pura-danger); box-shadow: 0 0 0 3px color-mix(in srgb, var(--pura-danger) 30%, transparent); }

  .desc {
    margin: 0; font-size: var(--pura-text-sm); color: var(--pura-fg);
    background: var(--pura-subtle); border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius); padding: var(--pura-space-2) var(--pura-space-3);
  }
  .desc.invalid { color: var(--pura-danger); background: var(--pura-danger-bg); border-color: var(--pura-danger); }
`;

define("pura-cron", PuraCron, meta);
export { PuraCron };
