// URL helpers for the configured Astro base path (e.g. "/pura/").
// Astro does NOT auto-prefix absolute refs, so internal route links and
// root-level assets (favicon, /templates/*.html) must be passed through
// withBase() to resolve under the deploy base.
//
// Refs that already start with the base — the "/pura/..." runtime assets
// (tokens.css, pura.js, i18n.js, theme.js, lib/*.js) — are correct as-is and
// must NOT be passed through withBase (doing so would double the prefix).
const BASE = import.meta.env.BASE_URL;

// Join the base with an absolute-from-root path: withBase("/docs/x") -> "/pura/docs/x".
export function withBase(path = "/") {
  const rel = path.startsWith("/") ? path.slice(1) : path;
  return BASE.endsWith("/") ? BASE + rel : BASE + "/" + rel;
}

// Strip the base prefix from a pathname so route matching compares cleanly.
// stripBase("/pura/docs/x") -> "/docs/x"; stripBase("/pura/") -> "/".
export function stripBase(pathname) {
  let p = pathname;
  if (BASE !== "/" && p.startsWith(BASE)) p = "/" + p.slice(BASE.length);
  return p.replace(/\/+$/, "") || "/";
}
