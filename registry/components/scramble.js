// <pura-scramble> — ScrambleText decode. The text resolves out of random glyph
// noise, locking in character by character from the left (the hacker/decode
// move from gsap ScrambleText). JS drives the per-tick character swap (its
// purpose); everything around it is accessible by design: the host aria-label
// always carries the real text, the animated span is aria-hidden, and SSR /
// no-JS / reduced motion all show the full final text.
//
// Attributes:
//   text     — the string to decode (required; also what SSR renders).
//   chars    — glyph pool for the noise (default "upper" set). Or one of
//              "upper" | "lower" | "digits" | "binary" | "blocks".
//   speed    — ms per tick (default 35).
//   step     — characters locked in per tick (default 1).
//   trigger  — "view" (default) | "load" | "hover" | "manual".
//              hover re-decodes on every pointerenter (nav-link move).
//   from     — lock direction: "left" (default) | "right" | "center" (resolves
//              center-out) | "edges" (resolves edges-in).
//
// Methods: play(), stop(). Events: pura-scramble (composed) when a decode
//   finishes; detail = { id, text }.
//
// Deterministic noise: glyphs are picked by a seeded LCG, not Math.random, so
// runs are reproducible and testable.
//
// Agent-native layer: registers in window.__puraScrambles keyed by data-pura-id
//   with { text, play, el }; data-pura-scramble-state mirrors idle|playing|done.
import { PuraElement, define } from "../base.js";
import meta from "./scramble.meta.js";
import { scrambleTemplate } from "./scramble.template.js";

let uid = 0;

function registry() {
  return (window.__puraScrambles ||= new Map());
}

function reducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

const POOLS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
  binary: "01",
  blocks: "▖▗▘▙▚▛▜▝▞▟█░▒▓",
};

const TRIGGERS = new Set(["view", "load", "hover", "manual"]);
const FROMS = new Set(["left", "right", "center", "edges"]);

class PuraScramble extends PuraElement {
  static observedAttributes = ["text"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-scramble-${uid++}`;
    this.dataset.puraId = this._id;
    this._seed = 1;

    const { html, css } = scrambleTemplate(this);
    this.render(html, css);
    this._glyphs = this.$(".glyphs");
    this.setAttribute("aria-label", this.text);
    this._state("idle");

    registry().set(this._id, { id: this._id, text: this.text, play: () => this.play(), el: this });

    if (reducedMotion()) { this._state("done"); return; }

    switch (this.trigger) {
      case "load":
        this.play();
        break;
      case "hover":
        this._onEnter = () => this.play();
        this.addEventListener("pointerenter", this._onEnter);
        break;
      case "manual":
        break;
      default:
        this._observe();
    }
  }

  disconnectedCallback() {
    this.stop();
    this._io?.disconnect();
    this._io = null;
    this.removeEventListener("pointerenter", this._onEnter);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this._glyphs) return;
    this.stop();
    this._glyphs.textContent = this.text;
    this.setAttribute("aria-label", this.text);
    this._state("idle");
  }

  // ---- config ---------------------------------------------------------------
  get text() {
    return this.getAttribute("text") || "";
  }
  get trigger() {
    const v = this.getAttribute("trigger");
    return TRIGGERS.has(v) ? v : "view";
  }
  get speed() {
    const n = parseFloat(this.getAttribute("speed"));
    return Number.isFinite(n) && n >= 8 ? n : 35;
  }
  get step() {
    const n = parseFloat(this.getAttribute("step"));
    return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1;
  }
  get pool() {
    const v = this.getAttribute("chars");
    if (v && POOLS[v]) return POOLS[v];
    if (v && v.length >= 2) return v;
    return POOLS.upper;
  }

  get from() {
    const v = this.getAttribute("from");
    return FROMS.has(v) ? v : "left";
  }

  // ---- public API -----------------------------------------------------------
  play() {
    if (reducedMotion()) { this._finish(); return; }
    this.stop();
    this._locked = 0;
    this._order = this._buildOrder();
    this._state("playing");
    this._tick();
  }

  stop() {
    if (this._timer) clearTimeout(this._timer);
    this._timer = null;
  }

  // ---- internals ------------------------------------------------------------
  // Index lock order for the decode. "left" is the classic prefix lock; the
  // others sort indices by distance to the chosen origin so characters resolve
  // center-out, edges-in or right-to-left.
  _buildOrder() {
    const n = this.text.length;
    const mid = (n - 1) / 2;
    const idx = Array.from({ length: n }, (_, i) => i);
    switch (this.from) {
      case "right": return idx.reverse();
      case "center": return idx.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid) || a - b);
      case "edges": return idx.sort((a, b) => Math.abs(b - mid) - Math.abs(a - mid) || a - b);
      default: return idx;
    }
  }

  _tick() {
    const text = this.text;
    if (this._locked >= text.length) { this._finish(); return; }

    this._locked = Math.min(text.length, this._locked + this.step);
    const locked = new Set(this._order.slice(0, this._locked));
    let out = "";
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      out += locked.has(i) || /\s/.test(ch) ? ch : this._glyph();
    }
    this._glyphs.textContent = out;
    this._timer = setTimeout(() => this._tick(), this.speed);
  }

  _finish() {
    this.stop();
    if (this._glyphs) this._glyphs.textContent = this.text;
    this._state("done");
    this.dispatchEvent(new CustomEvent("pura-scramble", {
      bubbles: true,
      composed: true,
      detail: { id: this._id, text: this.text },
    }));
  }

  _observe() {
    if (typeof IntersectionObserver === "undefined") { this.play(); return; }
    this._io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { this.play(); this._io.disconnect(); this._io = null; break; }
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    this._io.observe(this);
  }

  // Seeded LCG so the noise is deterministic (reproducible runs, testable).
  _glyph() {
    this._seed = (this._seed * 48271) % 2147483647;
    const pool = this.pool;
    return pool[this._seed % pool.length];
  }

  _state(s) {
    this.setAttribute("data-pura-scramble-state", s);
  }
}

define("pura-scramble", PuraScramble, meta);
export { PuraScramble };
