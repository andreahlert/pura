// <pura-split> — SplitText. Splits slotted text into lines, words or characters,
// each wrapped in a clipping mask, and reveals them with a staggered spring rise
// from below the mask. This is the gsap SplitText / awwwards hero move, done with
// the native spring primitive (<pura-spring>): no per-frame JS, the motion is a
// CSS transition whose timing function is a sampled `linear(...)` spring.
//
// Accessibility & SSR: the original text stays in the light DOM as the accessible
// copy; the animated per-unit spans are aria-hidden. Before the script runs the
// slot is visible, so the text is readable with no JS and on the server; once the
// split is built the host gets data-pura-split-ready and the animated copy shows.
//
// Attributes:
//   by       — "line" | "word" | "char" (default "word"). Line splitting measures
//              layout (offsetTop) and survives wrapping.
//   stagger  — ms between consecutive units (default 40 for word/char, 90 line).
//   trigger  — "view" (default) reveals when scrolled into view; "load" reveals on
//              connect.
//   effect   — "rise" (default) clip-masked rise from below; "scatter" units fly
//              in from seeded random offsets/rotations; "wave" units fade in and
//              bob on an infinite phase-shifted sine (motion.dev wavy text).
//   preset / stiffness / damping / mass — forwarded to spring() for the rise.
//
// Parts: text — the animated container. Each unit is a .mask > .inner pair.
// Reduced motion: base.js collapses the transition duration, so units appear.
//
// Agent-native layer: each instance registers in window.__puraSplits by
//   data-pura-id with { by, units, replay, el }; data-pura-split-* mirror config.
import { PuraElement, define } from "../base.js";
import meta from "./split.meta.js";
import { splitTemplate } from "./split.template.js";
import { spring } from "./spring.js";

let uid = 0;

function registry() {
  return (window.__puraSplits ||= new Map());
}

const MODES = new Set(["line", "word", "char"]);
const EFFECTS = new Set(["rise", "scatter", "wave"]);

// Deterministic LCG in [0, 1): runs are reproducible and testable (same reason
// scramble seeds its noise).
function lcg(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// Pure: split a normalized string into word tokens, preserving the spaces between
// them so they can be re-emitted. Returns [{ text }] of non-space words.
export function splitWords(text) {
  return String(text).replace(/\s+/g, " ").trim().split(" ").filter(Boolean).map((w) => ({ text: w }));
}

class PuraSplit extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-split-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = splitTemplate(this);
    this.render(html, css);
    this._src = this.$(".src");

    this._text = (this.textContent || "").replace(/\s+/g, " ").trim();
    this._units = [];

    this._build();
  }

  disconnectedCallback() {
    this._io?.disconnect();
    this._io = null;
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get by() {
    const v = this.getAttribute("by");
    return MODES.has(v) ? v : "word";
  }
  get trigger() {
    return this.getAttribute("trigger") === "load" ? "load" : "view";
  }
  get effect() {
    const v = this.getAttribute("effect");
    return EFFECTS.has(v) ? v : "rise";
  }
  get stagger() {
    const n = parseFloat(this.getAttribute("stagger"));
    if (Number.isFinite(n) && n >= 0) return n;
    return this.by === "line" ? 90 : 40;
  }

  // ---- public API -----------------------------------------------------------
  get units() {
    return this._units.length;
  }
  replay() {
    this.removeAttribute("data-pura-split-in");
    // Force reflow so the removal takes before re-adding plays again.
    void this.offsetWidth;
    requestAnimationFrame(() => this.setAttribute("data-pura-split-in", ""));
  }

  // ---- internals ------------------------------------------------------------
  async _build() {
    if (!this._text) return;

    const p = spring({
      preset: this.getAttribute("preset"),
      stiffness: this.getAttribute("stiffness"),
      damping: this.getAttribute("damping"),
      mass: this.getAttribute("mass"),
    });
    this.style.setProperty("--pura-split-ease", p.easing);
    this.style.setProperty("--pura-split-dur", `${p.duration}ms`);

    // Wait for fonts so line measurement (offsetTop) is correct.
    if (typeof document !== "undefined" && document.fonts?.ready) {
      try { await document.fonts.ready; } catch {} // best-effort
    }
    if (!this.isConnected) return;

    this.by === "line" ? this._buildLines() : this._buildInline(this.by);

    this.setAttribute("data-pura-split-ready", "");
    this.setAttribute("data-pura-split-by", this.by);
    this.setAttribute("data-pura-split-units", String(this._units.length));
    this.setAttribute("data-pura-split-effect", this.effect);

    this._stamp();
    registry().set(this._id, {
      id: this._id, by: this.by, units: this._units.length,
      replay: () => this.replay(), el: this,
    });

    this.trigger === "load" ? this._reveal() : this._observe();
  }

  // Build word or char masks inline. A trailing space follows each word.
  _buildInline(kind) {
    this._src.textContent = "";
    const words = splitWords(this._text);
    let i = 0;
    words.forEach((w, wi) => {
      if (kind === "word") {
        i = this._appendUnit(w.text, i);
      } else {
        for (const ch of w.text) i = this._appendUnit(ch, i);
      }
      if (wi < words.length - 1) this._src.appendChild(document.createTextNode(" "));
    });
  }

  // Build word masks, then group by vertical position into line masks so each
  // visual line rises as one block (survives wrapping).
  _buildLines() {
    this._src.textContent = "";
    const probe = [];
    const words = splitWords(this._text);
    words.forEach((w, wi) => {
      const span = document.createElement("span");
      span.textContent = w.text;
      span.style.display = "inline-block";
      this._src.appendChild(span);
      probe.push(span);
      if (wi < words.length - 1) this._src.appendChild(document.createTextNode(" "));
    });
    // Group consecutive words sharing an offsetTop into lines.
    const lines = [];
    let cur = null;
    let top = null;
    probe.forEach((span) => {
      const t = span.offsetTop;
      if (cur === null || t !== top) { cur = []; lines.push(cur); top = t; }
      cur.push(span.textContent);
    });
    this._src.textContent = "";
    let i = 0;
    lines.forEach((line) => { i = this._appendUnit(line.join(" "), i, "line"); });
  }

  // Append one masked unit; stagger its delay by index. Returns next index.
  _appendUnit(text, i, kind) {
    const mask = document.createElement("span");
    mask.className = "mask";
    mask.setAttribute("part", "mask");
    if (kind === "line") mask.setAttribute("data-kind", "line");
    const inner = document.createElement("span");
    inner.className = "inner";
    inner.setAttribute("part", "inner");
    inner.textContent = text;
    inner.style.setProperty("--d", `${i * this.stagger}ms`);
    if (this.effect === "scatter") {
      // Seeded per-unit start pose so every run scatters identically.
      this._rand ||= lcg(this._text.length * 31 + this._units.length + 7);
      const r = this._rand;
      inner.style.setProperty("--sx", `${((r() * 2 - 1) * 60).toFixed(1)}px`);
      inner.style.setProperty("--sy", `${((r() * 2 - 1) * 50).toFixed(1)}px`);
      inner.style.setProperty("--sr", `${((r() * 2 - 1) * 25).toFixed(1)}deg`);
    }
    mask.appendChild(inner);
    this._src.appendChild(mask);
    this._units.push(inner);
    return i + 1;
  }

  _observe() {
    if (typeof IntersectionObserver === "undefined") { this._reveal(); return; }
    this._io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { this._reveal(); this._io.disconnect(); this._io = null; break; }
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    this._io.observe(this);
  }

  _reveal() {
    requestAnimationFrame(() => this.setAttribute("data-pura-split-in", ""));
  }

  _stamp() {
    this.setAttribute("data-pura-split-trigger", this.trigger);
  }
}

define("pura-split", PuraSplit, meta);
export { PuraSplit };
