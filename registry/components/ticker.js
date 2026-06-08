// <pura-ticker> — animated rolling number. Counts up (or down) from the previous
// value to the new one over a short duration, formatted with locale separators.
// Attributes:
//   value     — target number (animates from the previous value on change)
//   duration  — animation length in ms (default 800; ignored under reduced motion)
//   decimals  — fixed number of fraction digits (default: inferred from value)
//   locale    — Intl locale for grouping/separators (default: document locale)
//   prefix    — text rendered before the number (e.g. "$")
//   suffix    — text rendered after the number (e.g. "%")
//   label     — accessible label for the value (aria-label)
// Parts: ticker, prefix, number, suffix
// Events: ticker:start, ticker:end (bubbles; detail = { from, to })
// Agent-native: role="status" + aria-live, stable data-* mirror of the live
// numeric state, and a window.__puraTickers registry of all live instances.
import { PuraElement, define } from "../base.js";
import meta from "./ticker.meta.js";
import { tickerTemplate } from "./ticker.template.js";

let uid = 0;

// Global registry so agents/tooling can enumerate and read every live ticker.
const REGISTRY = (window.__puraTickers ||= new Map());

const clampNum = (v) => {
  const n = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

class PuraTicker extends PuraElement {
  static observedAttributes = ["value", "duration", "decimals", "locale", "prefix", "suffix", "label"];

  connectedCallback() {
    this._id = `pura-ticker-${uid++}`;
    this._raf = 0;
    this._current = clampNum(this.getAttribute("value"));
    this._displayed = this._current;

    const { html, css } = tickerTemplate(this);
    this.render(html, css);
    this._root = this.$('[part="ticker"]');
    this._prefixEl = this.$(".prefix");
    this._numberEl = this.$(".number");
    this._suffixEl = this.$(".suffix");

    REGISTRY.set(this._id, this);
    this._renderStatic();
    this._paint(this._current);
    this._syncAria(this._current);
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._raf);
    if (this._id) REGISTRY.delete(this._id);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._numberEl) return; // not connected yet
    if (oldValue === newValue) return;
    if (name === "value") {
      this._animateTo(clampNum(newValue));
    } else {
      // formatting / static text change — re-render without re-animating
      this._renderStatic();
      this._paint(this._displayed);
      this._syncAria(this._current);
    }
  }

  // Public API
  get value() { return this._current; }
  set value(v) { this.setAttribute("value", String(v)); }

  // --- internals ------------------------------------------------------------

  _reducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  _duration() {
    const d = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(d) && d >= 0 ? d : 800;
  }

  _decimals(forValue) {
    const attr = this.getAttribute("decimals");
    if (attr != null && attr !== "") {
      const d = parseInt(attr, 10);
      if (Number.isFinite(d) && d >= 0) return Math.min(d, 20);
    }
    // infer from the literal target value (e.g. "3.14" -> 2)
    const raw = String(forValue ?? this.getAttribute("value") ?? "");
    const dot = raw.indexOf(".");
    return dot === -1 ? 0 : Math.min(raw.length - dot - 1, 20);
  }

  _locale() {
    return this.getAttribute("locale") || undefined;
  }

  _format(n) {
    const decimals = this._decimals();
    try {
      return new Intl.NumberFormat(this._locale(), {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(n);
    } catch {
      // bad locale → fall back to fixed notation, never throw
      return Number(n).toFixed(decimals);
    }
  }

  _renderStatic() {
    const prefix = this.getAttribute("prefix") || "";
    const suffix = this.getAttribute("suffix") || "";
    this._prefixEl.textContent = prefix;
    this._suffixEl.textContent = suffix;
    this._prefixEl.style.display = prefix ? "" : "none";
    this._suffixEl.style.display = suffix ? "" : "none";
  }

  _paint(n) {
    this._displayed = n;
    this._numberEl.textContent = this._format(n);
  }

  _syncAria(n) {
    const prefix = this.getAttribute("prefix") || "";
    const suffix = this.getAttribute("suffix") || "";
    const label = this.getAttribute("label");
    const formatted = `${prefix}${this._format(n)}${suffix}`;
    // Accessible name reflects the semantic value, not per-frame noise.
    this._root.setAttribute("aria-label", label ? `${label}: ${formatted}` : formatted);
    // Stable machine-readable mirror for agents/tooling.
    this.dataset.value = String(n);
    this.dataset.formatted = formatted;
    this.setAttribute("data-pura", "ticker");
    this.setAttribute("data-pura-id", this._id);
  }

  _animateTo(to) {
    cancelAnimationFrame(this._raf);
    const from = this._displayed;
    this._current = to;

    // Reduced motion: jump straight to the value, no count animation.
    if (this._reducedMotion() || from === to) {
      this._paint(to);
      this._syncAria(to);
      this.dispatchEvent(new CustomEvent("ticker:end", { bubbles: true, detail: { from, to } }));
      return;
    }

    const dur = this._duration();
    if (dur <= 0) {
      this._paint(to);
      this._syncAria(to);
      this.dispatchEvent(new CustomEvent("ticker:end", { bubbles: true, detail: { from, to } }));
      return;
    }

    const start = performance.now();
    // easeOutCubic for a calm settle.
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    this.dispatchEvent(new CustomEvent("ticker:start", { bubbles: true, detail: { from, to } }));

    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = ease(t);
      const val = from + (to - from) * eased;
      this._paint(t >= 1 ? to : val);
      if (t < 1) {
        this._raf = requestAnimationFrame(step);
      } else {
        this._raf = 0;
        this._syncAria(to);
        this.dispatchEvent(new CustomEvent("ticker:end", { bubbles: true, detail: { from, to } }));
      }
    };
    // Keep the accessible/machine value pinned to the target during the run.
    this._syncAria(to);
    this._raf = requestAnimationFrame(step);
  }
}


define("pura-ticker", PuraTicker, meta);
export { PuraTicker };
