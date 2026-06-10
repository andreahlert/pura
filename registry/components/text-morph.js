// <pura-text-morph> — gooey morphing text: the current phrase melts and fuses
// fluidly into the next one, cycling forever. Two stacked text layers crossfade
// blur + opacity (WAAPI) under an SVG alpha-threshold filter, so wherever the
// blurred glyphs overlap the snapped alpha reads as one liquid blob. Unlike
// <pura-morph>, which interpolates SVG paths, and <pura-type-morph>, which
// drives variable font axes, this one melts whole phrases into each other.
//
// Attributes:
//   texts — pipe separated phrases to cycle, e.g. "Build|Launch|Scale".
//   morph — seconds the gooey crossfade takes (default 1.2).
//   hold  — seconds each phrase stays sharp between morphs (default 1.5).
//   blur  — peak blur in px during the melt (default 8, internally capped at 3x).
//
// Tokens: --pura-text-morph-smoothing (post-threshold softening blur, 0.6px).
// SSR / pre-JS: the slotted first phrase renders sharp; once JS takes over it
// stays as the accessible copy (the animated layers are aria-hidden).
// Reduced motion: the loop never starts and the slotted text stays settled;
// the template also force-hides the morph layers under reduce.
// The loop only runs while the element is in view (IntersectionObserver).
//
// Agent-native layer: each instance registers in window.__puraTextMorphs by
//   data-pura-id with { texts, next, pause, resume, el };
//   data-pura-text-morph-* mirror index / current / count / state.
import { PuraElement, define } from "../base.js";
import meta from "./text-morph.meta.js";
import { textMorphTemplate } from "./text-morph.template.js";

let uid = 0;

function registry() {
  return (window.__puraTextMorphs ||= new Map());
}

// Sampled keyframes for the gooey ramp: blur grows hyperbolically
// (peak / fraction - peak) while opacity follows fraction^0.4, so glyph edges
// go soft long before they go transparent and the threshold filter has enough
// shared alpha to fuse the two phrases. Deterministic: pure index math.
function gooeyFrames(peak, dirIn) {
  const STEPS = 10;
  const cap = peak * 3;
  const frames = [];
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    const f = dirIn ? t : 1 - t; // visible fraction of this layer
    const blur = f <= 0 ? cap : Math.min(peak / f - peak, cap);
    frames.push({
      offset: t,
      filter: `blur(${blur.toFixed(2)}px)`,
      opacity: +(f ** 0.4).toFixed(3),
    });
  }
  return frames;
}

class PuraTextMorph extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-text-morph-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = textMorphTemplate(this);
    this.render(html, css);

    this._texts = this.texts;
    this._index = 0;
    this._frontIdx = 0;
    this._layers = [this.$('[data-layer="0"]'), this.$('[data-layer="1"]')];
    this._anims = [];
    this._timer = 0;
    this._running = false;
    this._visible = true;

    this._mirror();
    registry().set(this._id, {
      id: this._id,
      texts: this._texts,
      next: () => this.next(),
      pause: () => this.pause(),
      resume: () => this.resume(),
      el: this,
    });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (this._texts.length < 2 || reduce) return; // slotted text stays as the settled paint

    this._layers[0].textContent = this._texts[0];
    this._layers[1].textContent = this._texts[1];
    this.setAttribute("data-pura-text-morph-ready", "");
    this._running = true;
    this._mirror();
    this._observe();
  }

  disconnectedCallback() {
    clearTimeout(this._timer);
    for (const a of this._anims) a.cancel?.();
    this._anims = [];
    this._io?.disconnect();
    this._io = null;
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get texts() {
    const raw = this.getAttribute("texts");
    const list = (raw || "").split("|").map((s) => s.trim()).filter(Boolean);
    if (list.length) return list;
    const slotted = (this.textContent || "").trim();
    return slotted ? [slotted] : [];
  }
  get morph() {
    return this._num("morph", 1.2, 0.05);
  }
  get hold() {
    return this._num("hold", 1.5, 0);
  }
  get blur() {
    return this._num("blur", 8, 0.5);
  }

  // ---- public API -----------------------------------------------------------
  next() {
    if (!this._running) return;
    clearTimeout(this._timer);
    this._morph();
  }
  pause() {
    if (!this._running) return;
    this._running = false;
    clearTimeout(this._timer);
    this._mirror();
  }
  resume() {
    if (this._running || !this.hasAttribute("data-pura-text-morph-ready")) return;
    this._running = true;
    this._mirror();
    this._schedule();
  }

  // ---- internals ------------------------------------------------------------
  // Only loop while in view; melting offscreen is wasted battery.
  _observe() {
    if (typeof IntersectionObserver === "undefined") {
      this._schedule();
      return;
    }
    this._io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        this._visible = e.isIntersecting;
        if (this._visible) this._schedule();
        else clearTimeout(this._timer);
      }
    });
    this._io.observe(this);
  }

  _schedule() {
    if (!this._running || !this._visible) return;
    clearTimeout(this._timer);
    this._timer = setTimeout(() => this._morph(), this.hold * 1000);
  }

  _morph() {
    if (!this._running || !this._visible || !this.isConnected) return;
    const front = this._layers[this._frontIdx];
    const back = this._layers[1 - this._frontIdx];
    if (typeof front.animate !== "function") {
      this._commit(); // no WAAPI: hard swap, still cycles
      return;
    }
    const ms = this.morph * 1000;
    const peak = this.blur;
    this._anims = [
      front.animate(gooeyFrames(peak, false), { duration: ms, easing: "linear", fill: "forwards" }),
      back.animate(gooeyFrames(peak, true), { duration: ms, easing: "linear", fill: "forwards" }),
    ];
    this._anims[1].onfinish = () => this._commit();
  }

  _commit() {
    for (const a of this._anims) a.cancel?.();
    this._anims = [];
    const n = this._texts.length;
    const front = this._layers[this._frontIdx];
    const back = this._layers[1 - this._frontIdx];
    // The back layer just blurred in: it becomes the new front. The old front
    // is parked blurred + transparent and preloaded with the phrase after next.
    back.style.opacity = "1";
    back.style.filter = "blur(0px)";
    front.style.opacity = "0";
    front.style.filter = `blur(${this.blur * 3}px)`;
    this._frontIdx = 1 - this._frontIdx;
    this._index = (this._index + 1) % n;
    front.textContent = this._texts[(this._index + 1) % n];
    this._mirror();
    this.dispatchEvent(
      new CustomEvent("pura-text-morph-change", {
        detail: { index: this._index, text: this._texts[this._index] },
        bubbles: true,
        composed: true,
      }),
    );
    this._schedule();
  }

  _mirror() {
    this.setAttribute("data-pura-text-morph-index", String(this._index));
    this.setAttribute("data-pura-text-morph-current", this._texts[this._index] || "");
    this.setAttribute("data-pura-text-morph-count", String(this._texts.length));
    this.setAttribute("data-pura-text-morph-state", this._running ? "running" : "paused");
  }

  _num(attr, fallback, min) {
    const n = parseFloat(this.getAttribute(attr));
    return Number.isFinite(n) && n >= min ? n : fallback;
  }
}

define("pura-text-morph", PuraTextMorph, meta);
export { PuraTextMorph };
