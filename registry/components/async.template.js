// Pure render for <pura-async>. No DOM; SSR/DSD + client safe.
// The region's data-state derives from the [state] attribute; under EMPTY_SHIM no
// attribute is set so it normalizes to "idle" (renders nothing visible). The
// state slots are revealed by attribute-driven CSS at runtime.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

const STATES = new Set(["idle", "loading", "error", "empty", "ready"]);
const DEFAULT_STATE = "idle";

// Human/agent-readable announcement per state (sr-only live region text).
// idle has no announcement; the rest resolve through i18n at read time.
const LABELS = {
  idle: () => "",
  loading: () => t("async.loading"),
  error: () => t("async.error"),
  empty: () => t("async.empty"),
  ready: () => t("async.ready"),
};

const CSS = `
  :host { display: block; }

  [part="region"] { display: contents; }

  /* By default every state slot is hidden; the active state reveals exactly one.
     idle (and any unknown value normalized to it) shows nothing. */
  [part="region"] > slot { display: none; }

  :host([state="loading"]) [part="region"] > slot[name="loading"],
  :host([state="error"])   [part="region"] > slot[name="error"],
  :host([state="empty"])   [part="region"] > slot[name="empty"],
  :host([state="ready"])   [part="region"] > slot:not([name]) {
    display: block;
  }

  /* default loading spinner (only the fallback inside the loading slot) */
  .spin {
    display: inline-block; width: 1.25rem; height: 1.25rem;
    border: 2.5px solid color-mix(in srgb, var(--pura-fg) 18%, transparent);
    border-top-color: var(--pura-fg); border-radius: 50%;
    animation: pura-spin 0.65s linear infinite;
    margin: var(--pura-space-4) auto;
  }
  @keyframes pura-spin { to { transform: rotate(360deg); } }

  /* visually-hidden live region for state announcements */
  .sr-only {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0 0 0 0); clip-path: inset(50%);
    white-space: nowrap; border: 0;
  }
`;

export function asyncTemplate(el = EMPTY_SHIM) {
  // _currentState(): normalized state (unknown/missing -> "idle").
  const s = el.getAttribute("state");
  const currentState = STATES.has(s) ? s : DEFAULT_STATE;
  const html = `<div part="region" data-pura-async data-state="${currentState}">
         <slot name="loading">
           <span class="spin" part="spinner" role="status" aria-label="${LABELS.loading()}"></span>
         </slot>
         <slot name="error"></slot>
         <slot name="empty"></slot>
         <slot></slot>
       </div>
       <span part="status" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></span>`;
  return { html, css: CSS };
}
