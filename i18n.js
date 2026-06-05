// pura i18n runtime. English is the default; components register their own
// message tables (colocated, self-contained) and read strings via t(key).
// Switching locale fires a window event; components update only their own text
// nodes/aria-labels via a targeted handler (never a full re-render — that would
// re-subscribe listeners and drop focus/state).
//
// Supported: en (default), pt-BR, fr, de, it.
export const LOCALES = [
  ["en", "English"],
  ["pt-BR", "Português"],
  ["fr", "Français"],
  ["de", "Deutsch"],
  ["it", "Italiano"],
];

const SUPPORTED = new Set(LOCALES.map((l) => l[0]));
const DICT = { en: {}, "pt-BR": {}, fr: {}, de: {}, it: {} };
let current = "en";

// Merge a message table: { "ns.key": { en, "pt-BR", fr, de, it } }.
export function registerMessages(messages) {
  for (const [key, vals] of Object.entries(messages)) {
    for (const [loc, val] of Object.entries(vals)) {
      if (DICT[loc]) DICT[loc][key] = val;
    }
  }
}

export function setLocale(loc) {
  if (!SUPPORTED.has(loc)) loc = "en";
  current = loc;
  try { document.documentElement.setAttribute("lang", loc); } catch (_) {}
  try { localStorage.setItem("pura-locale", loc); } catch (_) {}
  try { window.dispatchEvent(new CustomEvent("pura:locale", { detail: { locale: loc } })); } catch (_) {}
  return loc;
}

export function getLocale() {
  return current;
}

// Translate a key. Falls back to English, then to the raw key. Supports
// {placeholder} interpolation via the optional `vars` map.
export function t(key, vars) {
  let s = (DICT[current] && DICT[current][key]) ?? DICT.en[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v));
  return s;
}

// Subscribe to locale changes. Returns an unsubscribe fn. The callback receives
// the new locale. Call the returned fn in disconnectedCallback to avoid leaks.
export function onLocaleChange(cb) {
  const h = (e) => cb(e.detail?.locale ?? current);
  window.addEventListener("pura:locale", h);
  return () => window.removeEventListener("pura:locale", h);
}

// Restore the persisted locale (or default to English). Called on boot.
export function bootLocale() {
  let l = "en";
  try { l = localStorage.getItem("pura-locale") || "en"; } catch (_) {}
  return setLocale(l);
}
