// Pure render for <pura-cron>. No DOM; SSR/DSD + client safe.
// Two modes: "describe" renders a single read-only description <p>; "builder"
// renders the preset <select> + 5 field inputs + live description. Everything is
// derived from [value]/[mode] (or the already-parsed el._value on the client) via
// the cron parsing/description helpers, which are owned here and re-exported for
// the component's edit handlers. Under EMPTY_SHIM value falls back to the
// every-minute preset, so a valid builder renders.
import { EMPTY_SHIM } from "../base.js";
import { t, getLocale } from "../i18n.js";

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

export const PRESETS = {
  everyMinute: "* * * * *",
  hourly: "0 * * * *",
  daily: "0 0 * * *",
  weekly: "0 0 * * 0",
  monthly: "0 0 1 * *",
};

export const FIELDS = [
  { key: "minute", min: 0, max: 59 },
  { key: "hour", min: 0, max: 23 },
  { key: "dom", min: 1, max: 31 },
  { key: "month", min: 1, max: 12 },
  { key: "dow", min: 0, max: 7 },
];

// Validate one cron field against its [min,max] range. Accepts *, n, a-b,
// */step, lists of those. Returns true when well formed.
export function validField(raw, min, max) {
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
export function parseCron(value) {
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
export function describe(fields, loc) {
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

// Which preset (if any) the value matches; "custom" otherwise.
export function matchPreset(value) {
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

export function cronTemplate(el = EMPTY_SHIM) {
  const mode = el.getAttribute("mode") === "describe" ? "describe" : "builder";
  const value = el._value != null ? el._value : (el.getAttribute("value") || PRESETS.everyMinute);
  const { ok, fields } = parseCron(value);
  const desc = describe(fields, getLocale());

  if (mode === "describe") {
    const html = `<p part="description" class="desc ${ok ? "" : "invalid"}">${esc(desc)}</p>`;
    return { html, css: CSS };
  }

  // Builder: preset select + 5 field inputs + live description.
  const html = `<div class="root">
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
       </div>`;
  return { html, css: CSS };
}
