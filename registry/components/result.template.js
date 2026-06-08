// Pure render for <pura-result>. No DOM; SSR/DSD + client safe.
// status/title/subtitle derive from attributes (status defaults to "info"); under
// EMPTY_SHIM it emits the info icon with empty title/subtitle. `t` is module-global
// so http-code default titles resolve to the current locale.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

// status -> color token name + inline svg body (viewBox 0 0 24 24, currentColor).
const CHECK = '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>';
const CROSS = '<circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/>';
const WARN = '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>';
const INFO = '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>';
const LOCK = '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>';
const PLUG = '<path d="M12 3v6M9 9h6M8 9v3a4 4 0 0 0 8 0V9M12 16v5"/>';

const STATUS = {
  success: { token: "--pura-success", svg: CHECK },
  error:   { token: "--pura-danger",  svg: CROSS },
  warning: { token: "--pura-warning", svg: WARN },
  info:    { token: "--pura-info",    svg: INFO },
  "404":   { token: "--pura-info",    svg: INFO, key: "result.404.title" },
  "403":   { token: "--pura-warning", svg: LOCK, key: "result.403.title" },
  "500":   { token: "--pura-danger",  svg: PLUG, key: "result.500.title" },
};

function escText(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const CSS = `
  :host { display: block; }
  [part="result"] {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; gap: var(--pura-space-2);
    padding: var(--pura-space-6) var(--pura-space-5);
    color: var(--pura-fg);
  }
  .icon {
    display: grid; place-items: center;
    width: 4rem; height: 4rem; margin-bottom: var(--pura-space-2);
    border-radius: var(--pura-radius-full);
    color: STATUS_COLOR;
    background: color-mix(in srgb, STATUS_COLOR 12%, transparent);
  }
  .icon svg { width: 2.25rem; height: 2.25rem; display: block; }
  .title {
    margin: 0; font-size: var(--pura-text-xl); font-weight: 600; line-height: 1.25;
    color: var(--pura-fg);
  }
  .subtitle {
    margin: 0; font-size: var(--pura-text-base); line-height: 1.55;
    color: var(--pura-muted-fg); max-width: 32rem;
  }
  .body {
    margin-top: var(--pura-space-2); font-size: var(--pura-text-sm);
    color: var(--pura-muted-fg); max-width: 32rem;
  }
  .actions {
    display: flex; flex-wrap: wrap; align-items: center; justify-content: center;
    gap: var(--pura-space-2); margin-top: var(--pura-space-3);
  }
`;

export function resultTemplate(el = EMPTY_SHIM) {
  // status getter
  const sRaw = el.getAttribute("status") || "info";
  const status = STATUS[sRaw] ? sRaw : "info";
  const cfg = STATUS[status];
  // _title(): explicit title attr wins, else the http-code i18n default
  const attr = el.getAttribute("title");
  let title;
  if (attr != null && attr !== "") title = attr;
  else { const key = STATUS[status]?.key; title = key ? t(key) : ""; }
  // _subtitle()
  const subtitle = el.getAttribute("subtitle") || el.getAttribute("description") || "";

  const html = `<div part="result" role="status">
         <div part="icon" class="icon" aria-hidden="true">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                stroke-linecap="round" stroke-linejoin="round" focusable="false">${cfg.svg}</svg>
         </div>
         ${title ? `<h2 part="title" class="title">${escText(title)}</h2>` : ""}
         ${subtitle ? `<p part="subtitle" class="subtitle">${escText(subtitle)}</p>` : ""}
         <div class="body"><slot></slot></div>
         <div part="actions" class="actions"><slot name="actions"></slot></div>
       </div>`;
  return { html, css: CSS.replaceAll("STATUS_COLOR", `var(${cfg.token})`) };
}
