// pura theme runtime. A theme is a set of --pura-* token overrides applied via
// an injected <style>, layered over tokens.css and respecting [data-theme] light/
// dark. Components and templates restyle live because they all consume the tokens
// through the shadow boundary. Choice persists in localStorage.
import { PRESETS } from "./theme-presets.js";

const STYLE_ID = "pura-theme-style";
const STORE_KEY = "pura-theme";
const CUSTOM_KEY = "pura-theme-custom";

export function listPresets() {
  return PRESETS.slice();
}
export function getPreset(id) {
  return PRESETS.find((p) => p.id === id) || null;
}

function mapToCss(map) {
  if (!map) return "";
  return Object.entries(map).map(([k, v]) => `${k}:${v};`).join("");
}

// Build the CSS for a preset's vars object ({base, light, dark}) scoped to a
// selector that also carries the active data-theme (light/dark).
function buildCss(vars, sel) {
  if (!vars || (!vars.base && !vars.light && !vars.dark)) return "";
  const base = vars.base || {};
  const light = { ...base, ...(vars.light || {}) };
  const dark = { ...base, ...(vars.dark || {}) };
  return [
    `${sel}{${mapToCss(light)}}`,
    `${sel}[data-theme="dark"]{${mapToCss(dark)}}`,
    `@media (prefers-color-scheme: dark){${sel}:not([data-theme="light"]){${mapToCss(dark)}}}`,
  ].join("\n");
}

function styleEl() {
  let el = document.getElementById(STYLE_ID);
  if (!el) {
    el = document.createElement("style");
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  return el;
}

// Apply a preset by id (persisted). Pass a vars object for ad-hoc/custom themes.
export function applyTheme(idOrVars) {
  const root = document.documentElement;
  let vars, id;
  if (typeof idOrVars === "string") {
    id = idOrVars;
    const p = getPreset(id);
    vars = p ? p.vars : {};
  } else {
    id = "custom";
    vars = idOrVars || {};
  }
  styleEl().textContent = buildCss(vars, `:root[data-pura-theme="${id}"]`);
  root.setAttribute("data-pura-theme", id);
  try { localStorage.setItem(STORE_KEY, id); } catch (_) {}
  if (id === "custom") {
    try { localStorage.setItem(CUSTOM_KEY, JSON.stringify(vars)); } catch (_) {}
  }
  window.dispatchEvent(new CustomEvent("pura:theme", { detail: { id, vars } }));
  return id;
}

export function getTheme() {
  return document.documentElement.getAttribute("data-pura-theme") || "default";
}

export function getCustom() {
  try { return JSON.parse(localStorage.getItem(CUSTOM_KEY) || "null"); } catch (_) { return null; }
}

// Apply the persisted choice (called by theme-boot on every surface).
export function bootTheme() {
  let id = "default";
  try { id = localStorage.getItem(STORE_KEY) || "default"; } catch (_) {}
  if (id === "custom") {
    const vars = getCustom();
    if (vars) return applyTheme(vars);
  }
  return applyTheme(id);
}
