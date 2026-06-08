// Pure render(s) for <toast> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

const ICONS = {
  info: '<path d="M12 16v-4M12 8h.01" stroke-width="2"/><circle cx="12" cy="12" r="9" fill="none" stroke-width="2"/>',
  success: '<circle cx="12" cy="12" r="9" fill="none" stroke-width="2"/><path d="M8 12l3 3 5-6" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  warning: '<path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  danger: '<circle cx="12" cy="12" r="9" fill="none" stroke-width="2"/><path d="M12 8v5M12 16h.01" stroke-width="2" stroke-linecap="round"/>',
};

export function toasterTemplate(el = EMPTY_SHIM) {
  const html = `<div part="region" role="status" aria-live="polite" aria-atomic="false">
         <ol role="list"><slot></slot></ol>
       </div>`;
  return { html, css: TOASTER_CSS };
}

export function toastTemplate(el = EMPTY_SHIM) {
  const v = el.getAttribute("variant") || "info";
  const title = el.getAttribute("title");
  const message = el._message != null ? el._message : "";
  const action = el._action;
  const html = `<div part="toast" role="listitem">
         <svg class="ico" part="icon" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" fill="none">${ICONS[v] || ICONS.info}</svg>
         <div class="body">
           ${title ? `<strong part="title">${title}</strong>` : ""}
           ${message ? `<div part="message">${message}</div>` : ""}
         </div>
         ${action && action.label ? `<button class="action" part="action" type="button">${action.label}</button>` : ""}
         <button class="x" part="close" type="button" aria-label="${t("toast.close")}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
       </div>`;
  return { html, css: TOAST_CSS };
}

export const TOASTER_CSS = `
  :host {
    position: fixed; z-index: 9999; inset: auto;
    padding: var(--pura-space-4); max-width: 100vw;
    pointer-events: none;
  }
  /* default: bottom-right */
  :host { bottom: 0; right: 0; }

  :host([position="top-left"]) { top: 0; left: 0; bottom: auto; right: auto; }
  :host([position="top-center"]) { top: 0; left: 50%; bottom: auto; right: auto; transform: translateX(-50%); }
  :host([position="top-right"]) { top: 0; right: 0; bottom: auto; left: auto; }
  :host([position="bottom-left"]) { bottom: 0; left: 0; top: auto; right: auto; }
  :host([position="bottom-center"]) { bottom: 0; left: 50%; top: auto; right: auto; transform: translateX(-50%); }
  :host([position="bottom-right"]) { bottom: 0; right: 0; top: auto; left: auto; }

  [part="region"] { display: contents; }
  ol {
    list-style: none; margin: 0; padding: 0;
    display: flex; flex-direction: column; gap: var(--pura-space-3);
    align-items: flex-end;
  }
  :host([position$="-left"]) ol { align-items: flex-start; }
  :host([position$="-center"]) ol { align-items: center; }
`;

export const TOAST_CSS = `
  :host { display: block; pointer-events: auto; width: max-content; max-width: min(24rem, 92vw); }

  [part="toast"] {
    display: flex; gap: var(--pura-space-3); align-items: flex-start;
    padding: var(--pura-space-4); border-radius: var(--pura-radius);
    border: 1px solid var(--pura-border); background: var(--pura-bg);
    color: var(--pura-fg); box-shadow: var(--pura-shadow-lg);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: translateY(8px) scale(0.98);
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  [part="toast"].in { opacity: 1; transform: none; }
  [part="toast"].out { opacity: 0; transform: translateY(8px) scale(0.98); }

  .ico { width: 1.15rem; height: 1.15rem; flex: none; margin-top: 1px; color: var(--pura-muted); }
  .body { flex: 1; min-width: 0; }
  [part="title"] { display: block; font-size: var(--pura-text-sm); font-weight: 600; margin-bottom: 2px; }
  [part="message"] { font-size: var(--pura-text-sm); color: var(--pura-muted-fg); line-height: 1.55; word-wrap: break-word; }

  .action {
    flex: none; align-self: center; font: inherit; font-size: var(--pura-text-xs);
    font-weight: 550; line-height: 1; white-space: nowrap; cursor: pointer;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    background: var(--pura-bg); color: var(--pura-fg);
    padding: var(--pura-space-2) var(--pura-space-3);
    transition: background var(--pura-dur) var(--pura-ease);
  }
  .action:hover { background: var(--pura-subtle); }
  .action:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }

  .x {
    display: grid; place-items: center; width: 1.5rem; height: 1.5rem; flex: none;
    border: none; background: transparent; color: var(--pura-muted); cursor: pointer;
    border-radius: var(--pura-radius-sm);
  }
  .x:hover { background: color-mix(in srgb, currentColor 12%, transparent); color: var(--pura-fg); }
  .x:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .x svg { width: 0.95rem; height: 0.95rem; }

  :host([variant="info"]) .ico { color: var(--pura-info); }
  :host([variant="info"]) [part="toast"] { border-color: color-mix(in srgb, var(--pura-info) 25%, transparent); }
  :host([variant="success"]) .ico { color: var(--pura-success-fg); }
  :host([variant="success"]) [part="toast"] { border-color: color-mix(in srgb, var(--pura-success) 25%, transparent); }
  :host([variant="warning"]) .ico { color: var(--pura-warning); }
  :host([variant="warning"]) [part="toast"] { border-color: color-mix(in srgb, var(--pura-warning) 25%, transparent); }
  :host([variant="danger"]) .ico { color: var(--pura-danger); }
  :host([variant="danger"]) [part="toast"] { border-color: color-mix(in srgb, var(--pura-danger) 25%, transparent); }
`;
