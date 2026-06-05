// Auto-applies the persisted theme (and, later, locale) on any surface that
// loads pura. Imported by pura.js so every page — docs and standalone
// templates alike — restores the user's chosen theme without extra wiring.
import { bootTheme } from "./theme.js";
import { bootLocale } from "./i18n.js";

try { bootTheme(); } catch (_) {}
try { bootLocale(); } catch (_) {}
