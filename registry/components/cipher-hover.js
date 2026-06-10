// <pura-cipher-hover>: an Evervault-style encrypted card. The surface is
// covered by pseudo-random characters that only appear under a radial spotlight
// following the cursor, and the characters rewrite on every throttled rAF frame
// while the pointer is over the card. Different from pura-scramble, which
// decodes real text once; here the cipher never resolves, it is pure texture.
//
// Attributes:
//   chars  — charset the field is drawn from (default letters/digits/symbols).
//   length — number of characters in the field (default 1500, capped at 6000).
//   size   — spotlight diameter, px number or CSS length (default 200px).
//   fps    — scramble rewrites per second (default 18, clamped 1..60).
//   seed   — integer seeding the deterministic SSR field (default 1).
//   static — when present, the spotlight reveals the seeded field but the
//            per-frame rewrite never runs.
//
// Tokens: --pura-cipher-hover-size, --pura-cipher-hover-gradient (character
//   ink), --pura-cipher-hover-font-size, --pura-cipher-hover-radius (corner
//   radius), --pura-cipher-hover-bg. All with fallbacks.
//
// Motion: the spotlight is pointer-driven, not a keyframe; the opacity fade is
//   gated by @media (prefers-reduced-motion: no-preference). Under reduced
//   motion JS skips pointer tracking and the scramble loop entirely and the
//   cipher layer stays hidden (calm final state).
//
// Accessibility: the character field is decorative and aria-hidden; the slotted
//   content is the accessible layer and stays readable above it.
//
// Agent-native layer: each instance registers in window.__puraCipherHovers by
//   data-pura-id with { fps, seed, el }; data-pura-cipher-* mirror config and
//   live state ("rest" | "tracking" | "static").
import { PuraElement, define } from "../base.js";
import meta from "./cipher-hover.meta.js";
import {
  cipherHoverTemplate,
  cipherField,
  DEFAULT_CIPHER_CHARS,
} from "./cipher-hover.template.js";

let uid = 0;

function registry() {
  return (window.__puraCipherHovers ||= new Map());
}

class PuraCipherHover extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-cipher-hover-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = cipherHoverTemplate(this);
    this.render(html, css);
    this._layer = this.$(".cipher");
    this._frame = 0;
    this._raf = 0;
    this._last = 0;

    this.setAttribute("data-pura-cipher-fps", String(this.fps));
    this.setAttribute("data-pura-cipher-seed", String(this.seed));
    if (this.bool("static")) this.setAttribute("data-pura-cipher-static", "");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // Final state: no tracking, no scramble; CSS keeps the layer hidden.
      this.setAttribute("data-pura-cipher-state", "static");
    } else {
      this.setAttribute("data-pura-cipher-state", "rest");
      this._onMove = (e) => {
        const r = this.getBoundingClientRect();
        this.style.setProperty("--pura-cipher-x", `${e.clientX - r.left}px`);
        this.style.setProperty("--pura-cipher-y", `${e.clientY - r.top}px`);
      };
      this._onEnter = () => {
        this.setAttribute("data-pura-cipher-state", "tracking");
        if (!this.bool("static")) this._start();
        this.dispatchEvent(
          new CustomEvent("pura-cipher-hover-show", { bubbles: true, detail: { id: this._id } }),
        );
      };
      this._onLeave = () => {
        this.setAttribute("data-pura-cipher-state", "rest");
        this._stop();
        this.dispatchEvent(
          new CustomEvent("pura-cipher-hover-hide", { bubbles: true, detail: { id: this._id } }),
        );
      };
      this.addEventListener("pointermove", this._onMove);
      this.addEventListener("pointerenter", this._onEnter);
      this.addEventListener("pointerleave", this._onLeave);
    }

    registry().set(this._id, { id: this._id, fps: this.fps, seed: this.seed, el: this });
  }

  disconnectedCallback() {
    this._stop();
    if (this._onMove) this.removeEventListener("pointermove", this._onMove);
    if (this._onEnter) this.removeEventListener("pointerenter", this._onEnter);
    if (this._onLeave) this.removeEventListener("pointerleave", this._onLeave);
    const entry = registry().get(this._id);
    if (entry && entry.el === this) registry().delete(this._id);
  }

  // ---- scramble loop --------------------------------------------------------
  _start() {
    if (this._raf) return;
    const step = (now) => {
      this._raf = requestAnimationFrame(step);
      if (now - this._last < 1000 / this.fps) return;
      this._last = now;
      // Index math, not native randomness: each frame re-derives the field
      // from seed + frame counter through the same LCG the SSR paint used.
      this._frame++;
      this._layer.textContent = cipherField(
        this.seed + this._frame * 7919,
        this.length,
        this.chars,
      );
    };
    this._raf = requestAnimationFrame(step);
  }

  _stop() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
  }

  // ---- config ---------------------------------------------------------------
  get chars() {
    return this.getAttribute("chars") || DEFAULT_CIPHER_CHARS;
  }

  get length() {
    const n = parseInt(this.getAttribute("length"), 10);
    return Number.isFinite(n) && n > 0 ? Math.min(n, 6000) : 1500;
  }

  get fps() {
    const n = parseInt(this.getAttribute("fps"), 10);
    return Number.isFinite(n) ? Math.min(Math.max(n, 1), 60) : 18;
  }

  get seed() {
    const n = parseInt(this.getAttribute("seed"), 10);
    return Number.isFinite(n) ? n : 1;
  }
}

define("pura-cipher-hover", PuraCipherHover, meta);
export { PuraCipherHover };
