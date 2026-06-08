// <pura-truncate> — clamps slotted text to N lines with an ellipsis and a
// 'mais'/'menos' toggle to expand/collapse. The FULL text always stays in the
// DOM (only visually clamped via -webkit-line-clamp), so screen readers and
// agents always read the complete content. The toggle only appears when the
// content actually overflows the clamp.
//
// Attributes:
//   lines        number of visible lines when collapsed (default 3, min 1)
//   expanded     present = start expanded (reflected as state)
//   more-label   label for the expand button (default "mais")
//   less-label   label for the collapse button (default "menos")
// Slots:
//   (default)    the text/markup to clamp
// Events:
//   toggle       { detail: { expanded } } when the user expands/collapses
// Parts:
//   content      the clamped text region
//   toggle       the expand/collapse button
// Agent-native:
//   data-pura-truncate, data-lines, data-expanded, data-overflowing on host;
//   global window.__puraTruncate registry keyed by id.
import { PuraElement, define } from "../base.js";
import meta from "./truncate.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { truncateTemplate } from "./truncate.template.js";

registerMessages({
  "truncate.more": { en: "more", "pt-BR": "mais", fr: "plus", de: "mehr", it: "altro" },
  "truncate.less": { en: "less", "pt-BR": "menos", fr: "moins", de: "weniger", it: "meno" },
});

let uid = 0;

class PuraTruncate extends PuraElement {
  static observedAttributes = ["lines", "expanded", "more-label", "less-label"];

  connectedCallback() {
    this._id = `pura-truncate-${uid++}`;
    const { html, css } = truncateTemplate(this);
    this.render(html, css);
    this._content = this.$('[part="content"]');
    this._toggle = this.$('[part="toggle"]');
    this._slot = this.$("slot");

    this._toggle.addEventListener("click", () => this.toggle());
    this._slot.addEventListener("slotchange", () => this._measure());

    // Re-measure when the box geometry changes (resize, font load, etc.).
    if (typeof ResizeObserver !== "undefined") {
      this._ro = new ResizeObserver(() => this._measure());
      this._ro.observe(this._content);
    }

    this._registry();
    this._sync();
    // First measure after layout settles.
    queueMicrotask(() => this._measure());

    // Update rendered i18n text in place when the locale changes.
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._ro?.disconnect();
    this._i18nOff?.();
    if (window.__puraTruncate) delete window.__puraTruncate[this._id];
  }

  // Refresh only the already-rendered i18n nodes (the toggle label) in place.
  // _sync() touches shadow elements + host attributes only — no document/window
  // listeners — so it is safe to re-run here.
  _applyI18n() {
    if (!this._content) return;
    this._sync();
  }

  attributeChangedCallback(name) {
    if (!this._content) return;
    this._sync();
    if (name === "lines") this._measure();
  }

  // --- public API ---------------------------------------------------------
  get expanded() {
    return this.hasAttribute("expanded");
  }
  set expanded(v) {
    this.toggleAttribute("expanded", !!v);
  }
  get lines() {
    const n = parseInt(this.getAttribute("lines"), 10);
    return Number.isFinite(n) && n > 0 ? n : 3;
  }
  expand() {
    this._set(true);
  }
  collapse() {
    this._set(false);
  }
  toggle() {
    this._set(!this.expanded);
  }

  // --- internals ----------------------------------------------------------
  _set(next) {
    if (next === this.expanded) return;
    this.toggleAttribute("expanded", next);
    this.dispatchEvent(
      new CustomEvent("toggle", { bubbles: true, detail: { expanded: next } })
    );
  }

  // Reflect line count + expanded/overflow state into the shadow CSS, the
  // toggle button, and the machine-readable data-* layer.
  _sync() {
    const expanded = this.expanded;
    this._content.style.setProperty("--pura-truncate-lines", String(this.lines));
    this._content.toggleAttribute("data-clamped", !expanded);

    this._toggle.textContent = expanded
      ? this.getAttribute("less-label") || t("truncate.less")
      : this.getAttribute("more-label") || t("truncate.more");
    this._toggle.setAttribute("aria-expanded", expanded ? "true" : "false");

    // Agent-native layer (always present, stable attribute names).
    this.setAttribute("data-pura-truncate", "");
    this.setAttribute("data-lines", String(this.lines));
    this.setAttribute("data-expanded", expanded ? "true" : "false");

    this._registry();
  }

  // Show the toggle only when the content overflows the clamp. When expanded,
  // we always keep the toggle visible (so it can be collapsed again) as long as
  // it overflowed at least once.
  _measure() {
    if (!this._content) return;
    let overflowing = this._overflowing;
    if (!this.expanded) {
      // scrollHeight > clientHeight means the clamp is hiding lines.
      overflowing = this._content.scrollHeight - this._content.clientHeight > 1;
    }
    this._overflowing = overflowing;
    const showToggle = overflowing || this.expanded;
    this._toggle.hidden = !showToggle;
    this.toggleAttribute("data-overflowing", !!overflowing);
    this._registry();
  }

  _registry() {
    const reg = (window.__puraTruncate = window.__puraTruncate || {});
    reg[this._id] = {
      lines: this.lines,
      expanded: this.expanded,
      overflowing: !!this._overflowing,
      text: (this.textContent || "").trim(),
    };
  }
}


define("pura-truncate", PuraTruncate, meta);
export { PuraTruncate };
