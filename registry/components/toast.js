// <pura-toaster> — fixed container that stacks toasts in a corner. Attribute:
// position (bottom-right default | top-left | top-center | top-right |
// bottom-left | bottom-center). It is an aria-live polite region (role=status).
//
// <pura-toast> — a single toast. Attributes: title, variant (info default |
// success | warning | danger), duration (ms, default 4000). Renders an accent
// icon, optional title + message, optional action button and a close button.
// Animates in (slide + fade), auto-dismisses after duration, pauses on hover.
//
// Module exports a `toast(message, opts)` function (default + named export) with
// opts = { title, variant, duration, action: { label, onClick } } and the
// convenience methods toast.success/error/warning/info. Calling toast() ensures
// a default <pura-toaster> exists (auto-created on <body>) then shows a toast.
import { PuraElement, define } from "../base.js";
import meta from "./toast.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "toast.close": { en: "Close", "pt-BR": "Fechar", fr: "Fermer", de: "Schließen", it: "Chiudi" },
});

const ICONS = {
  info: '<path d="M12 16v-4M12 8h.01" stroke-width="2"/><circle cx="12" cy="12" r="9" fill="none" stroke-width="2"/>',
  success: '<circle cx="12" cy="12" r="9" fill="none" stroke-width="2"/><path d="M8 12l3 3 5-6" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  warning: '<path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  danger: '<circle cx="12" cy="12" r="9" fill="none" stroke-width="2"/><path d="M12 8v5M12 16h.01" stroke-width="2" stroke-linecap="round"/>',
};

const POSITIONS = new Set([
  "top-left", "top-center", "top-right",
  "bottom-left", "bottom-center", "bottom-right",
]);

// ---------------------------------------------------------------------------
// <pura-toaster>
// ---------------------------------------------------------------------------
class PuraToaster extends PuraElement {
  static observedAttributes = ["position"];

  connectedCallback() {
    // normalize an unknown position to the default
    const pos = this.getAttribute("position");
    if (pos && !POSITIONS.has(pos)) this.setAttribute("position", "bottom-right");
    this.render(
      `<div part="region" role="status" aria-live="polite" aria-atomic="false">
         <ol role="list"><slot></slot></ol>
       </div>`,
      TOASTER_CSS
    );
  }

  // Create + append a <pura-toast> for the given message/opts and return it.
  show(message, opts = {}) {
    const el = document.createElement("pura-toast");
    if (opts.title != null) el.setAttribute("title", String(opts.title));
    if (opts.variant) el.setAttribute("variant", opts.variant);
    if (opts.duration != null) el.setAttribute("duration", String(opts.duration));
    el._message = message != null ? String(message) : "";
    el._action = opts.action || null;
    // newest on top for top-* positions, newest at bottom otherwise
    const top = (this.getAttribute("position") || "bottom-right").startsWith("top");
    if (top) this.prepend(el);
    else this.append(el);
    return el;
  }
}

const TOASTER_CSS = `
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

// ---------------------------------------------------------------------------
// <pura-toast>
// ---------------------------------------------------------------------------
class PuraToast extends PuraElement {
  static observedAttributes = ["variant"];

  connectedCallback() {
    const v = this.getAttribute("variant") || "info";
    const title = this.getAttribute("title");
    const message = this._message != null ? this._message : "";
    const action = this._action;
    this.render(
      `<div part="toast" role="listitem">
         <svg class="ico" part="icon" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" fill="none">${ICONS[v] || ICONS.info}</svg>
         <div class="body">
           ${title ? `<strong part="title">${title}</strong>` : ""}
           ${message ? `<div part="message">${message}</div>` : ""}
         </div>
         ${action && action.label ? `<button class="action" part="action" type="button">${action.label}</button>` : ""}
         <button class="x" part="close" type="button" aria-label="${t("toast.close")}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
       </div>`,
      TOAST_CSS
    );

    this._toast = this.$("[part='toast']");
    this._remaining = this._durationMs();
    this._timerStart = 0;
    this._timer = null;

    this.$(".x").addEventListener("click", () => this.dismiss());
    const actionBtn = this.$(".action");
    if (actionBtn) {
      actionBtn.addEventListener("click", () => {
        try { action.onClick?.(); } catch (_) { /* swallow */ }
        this.dismiss();
      });
    }

    // pause on hover / focus, resume on leave / blur
    this.addEventListener("mouseenter", () => this._pause());
    this.addEventListener("mouseleave", () => this._resume());
    this.addEventListener("focusin", () => this._pause());
    this.addEventListener("focusout", () => this._resume());

    // ESC dismisses when focus is within the toast
    this.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { e.stopPropagation(); this.dismiss(); }
    });

    // animate in on next frame, then start the auto-dismiss timer
    requestAnimationFrame(() => {
      this._toast.classList.add("in");
      this._start();
    });

    // update i18n nodes in place on locale change (no re-render)
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    clearTimeout(this._timer);
    this._i18nOff?.();
  }

  // Update already-rendered i18n nodes in place (no re-render).
  _applyI18n() {
    const x = this.$(".x");
    if (x) x.setAttribute("aria-label", t("toast.close"));
  }

  _durationMs() {
    const d = parseInt(this.getAttribute("duration") || "", 10);
    return Number.isFinite(d) && d >= 0 ? d : 4000;
  }

  _start() {
    if (this._remaining <= 0) return; // 0 / negative => sticky
    clearTimeout(this._timer);
    this._timerStart = Date.now();
    this._timer = setTimeout(() => this.dismiss(), this._remaining);
  }

  _pause() {
    if (this._remaining <= 0 || !this._timer) return;
    clearTimeout(this._timer);
    this._timer = null;
    this._remaining -= Date.now() - this._timerStart;
  }

  _resume() {
    if (this._remaining <= 0 || this._timer) return;
    this._start();
  }

  // Animate out, then remove from the DOM and emit `dismiss`.
  dismiss() {
    if (this._dismissing) return;
    this._dismissing = true;
    clearTimeout(this._timer);
    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      clearTimeout(this._fallback);
      this.dispatchEvent(new CustomEvent("dismiss", { bubbles: true }));
      this.remove();
    };
    if (!this._toast) return done();
    this._toast.addEventListener("transitionend", done, { once: true });
    this._toast.classList.remove("in");
    this._toast.classList.add("out");
    // fallback if transitionend never fires (e.g. reduced motion)
    this._fallback = setTimeout(done, 300);
  }
}

const TOAST_CSS = `
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
  :host([variant="success"]) .ico { color: var(--pura-success); }
  :host([variant="success"]) [part="toast"] { border-color: color-mix(in srgb, var(--pura-success) 25%, transparent); }
  :host([variant="warning"]) .ico { color: var(--pura-warning); }
  :host([variant="warning"]) [part="toast"] { border-color: color-mix(in srgb, var(--pura-warning) 25%, transparent); }
  :host([variant="danger"]) .ico { color: var(--pura-danger); }
  :host([variant="danger"]) [part="toast"] { border-color: color-mix(in srgb, var(--pura-danger) 25%, transparent); }
`;

// ---------------------------------------------------------------------------
// imperative API
// ---------------------------------------------------------------------------
let _defaultToaster = null;

// Find or auto-create the default toaster appended to <body>.
function ensureToaster() {
  if (_defaultToaster && _defaultToaster.isConnected) return _defaultToaster;
  _defaultToaster = document.querySelector("pura-toaster");
  if (!_defaultToaster) {
    _defaultToaster = document.createElement("pura-toaster");
    _defaultToaster.setAttribute("position", "bottom-right");
    document.body.appendChild(_defaultToaster);
  }
  return _defaultToaster;
}

// toast(message, opts) — show a toast in the default toaster. Returns the
// <pura-toast> element (call .dismiss() to close it programmatically).
function toast(message, opts = {}) {
  const toaster = ensureToaster();
  return toaster.show(message, opts);
}

toast.success = (message, opts = {}) => toast(message, { ...opts, variant: "success" });
toast.error = (message, opts = {}) => toast(message, { ...opts, variant: "danger" });
toast.warning = (message, opts = {}) => toast(message, { ...opts, variant: "warning" });
toast.info = (message, opts = {}) => toast(message, { ...opts, variant: "info" });

define("pura-toaster", PuraToaster);
define("pura-toast", PuraToast, meta);

export { PuraToast, PuraToaster, toast };
export default toast;
