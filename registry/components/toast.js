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
import { toasterTemplate, toastTemplate } from "./toast.template.js";

registerMessages({
  "toast.close": { en: "Close", "pt-BR": "Fechar", fr: "Fermer", de: "Schließen", it: "Chiudi" },
});


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
    const { html, css } = toasterTemplate(this);
    this.render(html, css);
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


// ---------------------------------------------------------------------------
// <pura-toast>
// ---------------------------------------------------------------------------
class PuraToast extends PuraElement {
  static observedAttributes = ["variant"];

  connectedCallback() {
    const action = this._action;
    const { html, css } = toastTemplate(this);
    this.render(html, css);

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
