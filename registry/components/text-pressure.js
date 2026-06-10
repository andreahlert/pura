// <pura-text-pressure> — variable-font pressure. Each letter thickens (wght)
// and widens (wdth) as the pointer approaches it and relaxes as it leaves, so
// the cursor presses a bulge through the type. Where <pura-type-morph>
// interpolates the whole text's axes by scroll or time, here the driver is the
// pointer distance per glyph.
//
// The axes ride the native font-weight / font-stretch properties (not
// font-variation-settings) so every value change re-rasterizes the glyph. A
// window pointermove handler, throttled to one rAF, measures each glyph's
// center (read phase) and writes interpolated --pura-tp-w / --pura-tp-s custom
// properties per span (write phase); a short CSS transition smooths the steps.
//
// Attributes:
//   text                  — optional. When set, the per-glyph spans render in the
//                           pure template (server paint included); otherwise the
//                           slotted text is split on the client.
//   from-wght / to-wght   — weight at rest / under the pointer (default 400 -> 900).
//   from-wdth / to-wdth   — width axis endpoints (default 100 -> 100, i.e. off;
//                           needs a font carrying wdth, e.g. Roboto Flex).
//   radius                — falloff radius in px around the pointer (default 160).
//
// Tokens: --pura-text-pressure-duration (smoothing transition, default 0.16s),
//   --pura-text-pressure-ease (default ease-out).
// Parts: text (glyph container), word, char.
//
// Accessibility & SSR: the animated spans are aria-hidden; the accessible copy
// (text attribute value or slotted original) stays readable. Server paint is
// the settled base axes. Reduced motion: pointer tracking never starts and the
// smoothing transition is gated behind no-preference, so the text sits still.
//
// Agent-native layer: each instance registers in window.__puraTextPressures by
//   data-pura-id with { from, to, radius, glyphs, el }; data-pura-tp-* mirror
//   config and data-pura-tp-active mirrors whether any glyph is under pressure.
import { PuraElement, define } from "../base.js";
import meta from "./text-pressure.meta.js";
import { textPressureTemplate, pressureSpans } from "./text-pressure.template.js";

let uid = 0;

function registry() {
  return (window.__puraTextPressures ||= new Map());
}

class PuraTextPressure extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-text-pressure-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = textPressureTemplate(this);
    this.render(html, css);
    this._src = this.$(".src");

    // No text attribute: split the slotted light-DOM text into the same
    // word/char spans the template would have produced, then flip visibility.
    if (!this.hasAttribute("text")) {
      const text = (this.textContent || "").replace(/\s+/g, " ").trim();
      if (text) {
        this._src.innerHTML = pressureSpans(text);
        this.setAttribute("data-pura-tp-ready", "");
      }
    }
    this._chars = this.$$(".char");
    this._x = null;
    this._y = null;
    this._raf = 0;
    this._pressed = false;

    this.setAttribute("data-pura-tp-glyphs", String(this._chars.length));
    this.setAttribute("data-pura-tp-radius", String(this.radius));

    registry().set(this._id, {
      id: this._id,
      from: { wght: this._num("from-wght", 400), wdth: this._num("from-wdth", 100) },
      to: { wght: this._num("to-wght", 900), wdth: this._num("to-wdth", 100) },
      radius: this.radius,
      glyphs: this._chars.length,
      el: this,
    });

    const reduce =
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && this._chars.length) this._track();
  }

  disconnectedCallback() {
    if (this._onMove) {
      window.removeEventListener("pointermove", this._onMove);
      window.removeEventListener("pointerdown", this._onMove);
      document.documentElement.removeEventListener("pointerleave", this._onLeave);
      this._onMove = null;
    }
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get radius() {
    const n = parseFloat(this.getAttribute("radius"));
    return Number.isFinite(n) && n > 0 ? n : 160;
  }

  // ---- internals ------------------------------------------------------------
  _track() {
    this._onMove = (e) => {
      this._x = e.clientX;
      this._y = e.clientY;
      this._queue();
    };
    this._onLeave = () => {
      this._x = null;
      this._queue();
    };
    window.addEventListener("pointermove", this._onMove, { passive: true });
    window.addEventListener("pointerdown", this._onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", this._onLeave);
  }

  _queue() {
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => {
      this._raf = 0;
      this._frame();
    });
  }

  _frame() {
    const r = this.radius;

    // Cheap reject: pointer far outside the host (inflated by the radius) and
    // nothing currently pressed means there is nothing to measure or relax.
    if (this._x != null && !this._pressed) {
      const b = this.getBoundingClientRect();
      if (
        this._x < b.left - r || this._x > b.right + r ||
        this._y < b.top - r || this._y > b.bottom + r
      ) return;
    }

    const fw = this._num("from-wght", 400);
    const tw = this._num("to-wght", 900);
    const fs = this._num("from-wdth", 100);
    const ts = this._num("to-wdth", 100);

    // Read phase: measure every glyph center before any style write, so layout
    // reads and writes never interleave within the frame.
    const pts = this._chars.map((c) => {
      const cb = c.getBoundingClientRect();
      return [cb.left + cb.width / 2, cb.top + cb.height / 2];
    });

    let active = false;
    this._chars.forEach((c, i) => {
      let f = 0;
      if (this._x != null) {
        const d = Math.hypot(pts[i][0] - this._x, pts[i][1] - this._y);
        f = Math.max(0, 1 - d / r);
        f = f * f * (3 - 2 * f); // smoothstep falloff
      }
      if (f > 0.001) {
        active = true;
        c.style.setProperty("--pura-tp-w", (fw + (tw - fw) * f).toFixed(1));
        if (ts !== fs) c.style.setProperty("--pura-tp-s", (fs + (ts - fs) * f).toFixed(2));
      } else {
        c.style.removeProperty("--pura-tp-w");
        c.style.removeProperty("--pura-tp-s");
      }
    });

    this._pressed = active;
    this.toggleAttribute("data-pura-tp-active", active);
  }

  _num(attr, fallback) {
    const n = Number(this.getAttribute(attr));
    return Number.isFinite(n) ? n : fallback;
  }
}

define("pura-text-pressure", PuraTextPressure, meta);
export { PuraTextPressure };
