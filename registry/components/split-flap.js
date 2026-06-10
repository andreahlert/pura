// <pura-split-flap> — airport-style split-flap text board. Each character is a
// cell with two halves; on reveal every cell flips through intermediate glyphs
// in 3D (rotateX leaves under perspective, driven by WAAPI) until it locks on
// the target character, staggered left to right like a real departures board.
//
// Attributes:
//   text          — target text. Falls back to the slotted text. Changing it
//                   flips the board to the new value.
//   chars         — custom glyph ring (a string). Default: space, A-Z, 0-9 and
//                   basic punctuation. With the default ring the text is
//                   uppercased, like a real board.
//   flip-duration — ms per single flap step (default 90).
//   stagger       — ms between consecutive cells starting (default 60).
//   steps         — max intermediate flips per cell before locking (default 8).
//   trigger       — "view" (default) starts when scrolled into view; "load"
//                   starts on connect.
//
// Events: flip-start, settled (both bubble, composed, detail = { text }).
// Parts: board, cell, flap. Tokens: --pura-split-flap-bg/-fg/-divider/-gap/
//   -width/-height/-radius/-font/-weight/-perspective/-sheen.
//
// Accessibility & SSR: the board cells are aria-hidden; the original text stays
// readable in the light DOM (slot, with the text attribute as slot fallback).
// With `text` set the pure template prerenders the final static cells, so the
// server paint is the finished board. Reduced motion (or no WAAPI) skips the
// flips and shows the final glyphs immediately.
//
// Agent-native layer: each instance registers in window.__puraSplitFlaps by
//   data-pura-id with { text, flipTo, replay, el }; data-pura-flap-* mirror
//   state (text, cells, state: idle | flipping | settled).
import { PuraElement, define } from "../base.js";
import meta from "./split-flap.meta.js";
import { splitFlapTemplate } from "./split-flap.template.js";

let uid = 0;

function registry() {
  return (window.__puraSplitFlaps ||= new Map());
}

const DEFAULT_GLYPHS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:!?+/#$&@";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

class PuraSplitFlap extends PuraElement {
  static get observedAttributes() {
    return ["text"];
  }

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-split-flap-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = splitFlapTemplate(this);
    this.render(html, css);
    this._board = this.$(".board");
    this._board.textContent = ""; // drop any SSR-prerendered static cells
    this._cells = [];
    this._run = 0;

    this._target = this._readTarget();
    this._resize(this._target.length);

    this.setAttribute("data-pura-flap-ready", "");
    this.setAttribute("data-pura-flap-state", "idle");
    this.setAttribute("data-pura-flap-text", this._target);

    registry().set(this._id, {
      id: this._id,
      text: this._target,
      flipTo: (t) => this.flipTo(t),
      replay: () => this.replay(),
      el: this,
    });

    this.trigger === "load" ? this.flipTo(this._target) : this._observe();
  }

  disconnectedCallback() {
    this._run++; // abort in-flight flip loops
    this._io?.disconnect();
    this._io = null;
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(name, oldV, newV) {
    if (name !== "text" || !this._board || oldV === newV) return;
    this.flipTo(newV || "");
  }

  // ---- config ---------------------------------------------------------------
  get glyphs() {
    const v = this.getAttribute("chars");
    return v && v.length >= 2 ? v : DEFAULT_GLYPHS;
  }
  get flipDuration() {
    const n = parseFloat(this.getAttribute("flip-duration"));
    return Number.isFinite(n) && n > 0 ? n : 90;
  }
  get stagger() {
    const n = parseFloat(this.getAttribute("stagger"));
    return Number.isFinite(n) && n >= 0 ? n : 60;
  }
  get steps() {
    const n = parseInt(this.getAttribute("steps"), 10);
    return Number.isFinite(n) && n > 0 ? n : 8;
  }
  get trigger() {
    return this.getAttribute("trigger") === "load" ? "load" : "view";
  }

  // ---- public API -----------------------------------------------------------
  // Flip the board to a new text. Resolves when every cell has settled.
  async flipTo(text) {
    const target = this._normalize(text);
    this._target = target;
    this.setAttribute("data-pura-flap-text", target);
    this._resize(target.length);
    const entry = registry().get(this._id);
    if (entry) entry.text = target;

    const run = ++this._run;
    const blank = this.glyphs[0];
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const canAnimate = !reduce && typeof Element.prototype.animate === "function";

    this.setAttribute("data-pura-flap-state", "flipping");
    this.dispatchEvent(new CustomEvent("flip-start", {
      bubbles: true, composed: true, detail: { text: target },
    }));

    await Promise.all(this._cells.map((c, i) =>
      this._flipCell(c, target[i] ?? blank, i, run, canAnimate)));
    if (run !== this._run) return;

    this.setAttribute("data-pura-flap-state", "settled");
    this.dispatchEvent(new CustomEvent("settled", {
      bubbles: true, composed: true, detail: { text: target },
    }));
  }

  // Reset every cell to blank and flip the current text in again.
  replay() {
    this._run++;
    const blank = this.glyphs[0];
    for (const c of this._cells) this._show(c, blank);
    return this.flipTo(this._target);
  }

  // ---- internals ------------------------------------------------------------
  _readTarget() {
    const attr = this.getAttribute("text");
    const raw = attr != null ? attr : (this.textContent || "").replace(/\s+/g, " ").trim();
    return this._normalize(raw);
  }

  // The default ring is uppercase only, so uppercase the target to match.
  _normalize(text) {
    const s = String(text ?? "");
    return this.hasAttribute("chars") ? s : s.toUpperCase();
  }

  _resize(n) {
    while (this._cells.length > n) this._cells.pop().el.remove();
    while (this._cells.length < n) this._cells.push(this._makeCell());
    this.setAttribute("data-pura-flap-cells", String(n));
  }

  _makeCell() {
    const blank = this.glyphs[0];
    const el = document.createElement("span");
    el.className = "cell";
    el.setAttribute("part", "cell");
    const piece = (cls, part) => {
      const half = document.createElement("span");
      half.className = cls;
      if (part) half.setAttribute("part", part);
      const g = document.createElement("span");
      g.className = "g";
      g.textContent = blank;
      half.appendChild(g);
      el.appendChild(half);
      return { half, g };
    };
    const top = piece("half top");
    const bot = piece("half bottom");
    const flapTop = piece("flap top", "flap");
    const flapBot = piece("flap bottom", "flap");
    this._board.appendChild(el);
    return {
      el,
      topG: top.g,
      botG: bot.g,
      flapTop: flapTop.half,
      flapTopG: flapTop.g,
      flapBot: flapBot.half,
      flapBotG: flapBot.g,
      cur: blank,
    };
  }

  _show(c, ch) {
    c.topG.textContent = ch;
    c.botG.textContent = ch;
    c.cur = ch;
  }

  // Glyph path from a cell's current glyph to the target, walking forward
  // around the ring and capped at `steps` flips. Deterministic: distance math
  // only, no randomness. Glyphs outside the ring lock in a single flip.
  _path(cur, target, glyphs) {
    if (cur === target) return [];
    const ti = glyphs.indexOf(target);
    if (ti === -1) return [target];
    const ci = Math.max(0, glyphs.indexOf(cur));
    let dist = (ti - ci + glyphs.length) % glyphs.length;
    if (dist === 0) dist = glyphs.length;
    const cap = this.steps;
    const out = [];
    for (let k = dist > cap ? dist - cap + 1 : 1; k <= dist; k++) {
      out.push(glyphs[(ci + k) % glyphs.length]);
    }
    return out;
  }

  async _flipCell(c, ch, index, run, canAnimate) {
    if (!canAnimate) {
      this._show(c, ch);
      return;
    }
    await sleep(index * this.stagger);
    if (run !== this._run || !this.isConnected) return;
    const path = this._path(c.cur, ch, this.glyphs);
    const dur = this.flipDuration;
    for (const g of path) {
      if (run !== this._run || !this.isConnected) return;
      await this._step(c, g, dur);
    }
  }

  // One flap: the top leaf (showing the current glyph) folds down past the
  // seam, then the bottom leaf (showing the next glyph) unfolds into place.
  async _step(c, next, dur) {
    const cur = c.cur;
    c.topG.textContent = next; // static top already reveals the next glyph
    c.flapTopG.textContent = cur;
    c.flapBotG.textContent = next;
    c.flapTop.style.visibility = "visible";
    c.flapBot.style.visibility = "visible";

    const a1 = c.flapTop.animate(
      [{ transform: "rotateX(0deg)" }, { transform: "rotateX(-90deg)" }],
      { duration: dur / 2, easing: "ease-in", fill: "forwards" },
    );
    await a1.finished.catch(() => {});
    c.flapTop.style.visibility = "hidden";

    const a2 = c.flapBot.animate(
      [{ transform: "rotateX(90deg)" }, { transform: "rotateX(0deg)" }],
      { duration: dur / 2, easing: "ease-out", fill: "forwards" },
    );
    await a2.finished.catch(() => {});

    c.botG.textContent = next;
    c.flapBot.style.visibility = "hidden";
    a1.cancel();
    a2.cancel();
    c.cur = next;
  }

  _observe() {
    if (typeof IntersectionObserver === "undefined") {
      this.flipTo(this._target);
      return;
    }
    this._io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          this.flipTo(this._target);
          this._io.disconnect();
          this._io = null;
          break;
        }
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    this._io.observe(this);
  }
}

define("pura-split-flap", PuraSplitFlap, meta);
export { PuraSplitFlap };
