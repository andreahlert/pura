// <pura-fuzzy-text>: TV-static fuzzy text, in the style of React Bits' Fuzzy
// Text. The glyphs are drawn once to an offscreen canvas; every animation frame
// the visible canvas redraws them as thin horizontal slices, each shifted
// sideways by random noise, so the text vibrates like a weak analog signal.
// Hovering cranks the jitter amplitude. Progressive enhancement: SSR and the
// pre-JS paint show the real slotted text; the canvas takes over only after the
// client has measured and drawn it (data-pura-fuzzy-ready), and the original
// stays in the tree as the accessible copy.
//
// Attributes:
//   intensity       : baseline jitter as a fraction of font size (default 0.18).
//   hover-intensity : jitter while hovered (default 0.5). Set it equal to
//                     intensity to disable the hover boost.
//   slice           : height in CSS px of each jittered slice (default 2).
//
// Tokens: --pura-fuzzy-text-color (canvas fill, defaults to the computed
//   color of the host so it follows currentColor and theme tokens).
// Parts: canvas, text.
//
// Reduced motion: JS never starts the canvas, and the template CSS only shows
//   the canvas under prefers-reduced-motion: no-preference, so the static real
//   text is shown in every reduced-motion path.
//
// Per-frame randomness is native (Math.random) on purpose: it is ephemeral
// visual noise on a canvas, never serialized markup, so SSR determinism is
// unaffected (the deterministic-seed rule applies to templates only).
//
// Agent-native layer: each instance registers in window.__puraFuzzyTexts by
//   data-pura-id with { text, intensity, hoverIntensity, refresh, el };
//   data-pura-fuzzy-* mirror config, data-pura-fuzzy-state mirrors
//   static|fuzzing and data-pura-fuzzy-hover mirrors the hover boost. Call
//   refresh() after changing the slotted text or host font/color.
import { PuraElement, define } from "../base.js";
import meta from "./fuzzy-text.meta.js";
import { fuzzyTextTemplate } from "./fuzzy-text.template.js";

let uid = 0;

function registry() {
  return (window.__puraFuzzyTexts ||= new Map());
}

function reducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

class PuraFuzzyText extends PuraElement {
  static observedAttributes = ["intensity", "hover-intensity", "slice"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-fuzzy-text-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = fuzzyTextTemplate(this);
    this.render(html, css);
    this._canvas = this.$(".canvas");
    this._hover = false;
    this._running = false;
    this._mirror();
    this._state("static");

    registry().set(this._id, {
      id: this._id,
      text: (this.textContent || "").trim(),
      intensity: this.intensity,
      hoverIntensity: this.hoverIntensity,
      refresh: () => this.refresh(),
      el: this,
    });

    if (reducedMotion()) return;

    this._onEnter = () => {
      this._hover = true;
      this.setAttribute("data-pura-fuzzy-hover", "true");
    };
    this._onLeave = () => {
      this._hover = false;
      this.setAttribute("data-pura-fuzzy-hover", "false");
    };
    this.addEventListener("pointerenter", this._onEnter);
    this.addEventListener("pointerleave", this._onLeave);

    // Wait one frame so layout and the inherited font are resolved before
    // measuring; re-measure once web fonts finish loading.
    requestAnimationFrame(() => this.refresh());
    document.fonts?.ready?.then?.(() => {
      if (this.isConnected && this._running) this.refresh();
    });
  }

  disconnectedCallback() {
    this._running = false;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
    this.removeEventListener("pointerenter", this._onEnter);
    this.removeEventListener("pointerleave", this._onLeave);
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this.shadowRoot) return;
    this._mirror();
    // Amplitude bounds the canvas margin, so config changes re-measure.
    if (this._running) this.refresh();
  }

  // ---- config ---------------------------------------------------------------
  get intensity() {
    const n = parseFloat(this.getAttribute("intensity"));
    return Number.isFinite(n) && n >= 0 && n <= 2 ? n : 0.18;
  }
  get hoverIntensity() {
    const n = parseFloat(this.getAttribute("hover-intensity"));
    return Number.isFinite(n) && n >= 0 && n <= 2 ? n : 0.5;
  }
  get slice() {
    const n = parseFloat(this.getAttribute("slice"));
    return Number.isFinite(n) && n >= 1 && n <= 24 ? n : 2;
  }

  // ---- public API -----------------------------------------------------------
  // Re-measure the slotted text against the host's computed font and color,
  // redraw the offscreen pass and (re)start the frame loop. Call after changing
  // the slotted text, the font, or the color token.
  refresh() {
    if (reducedMotion()) return;
    this._text = (this.textContent || "").replace(/\s+/g, " ").trim();
    const entry = registry().get(this._id);
    if (entry) {
      entry.text = this._text;
      entry.intensity = this.intensity;
      entry.hoverIntensity = this.hoverIntensity;
    }
    if (!this._text || typeof this._canvas?.getContext !== "function") return;

    const cs = getComputedStyle(this);
    this._fontSize = parseFloat(cs.fontSize) || 16;
    const font = `${cs.fontStyle} ${cs.fontWeight} ${this._fontSize}px ${cs.fontFamily}`;
    const color = (cs.getPropertyValue("--pura-fuzzy-text-color") || "").trim() || cs.color;
    this._dpr = Math.max(1, window.devicePixelRatio || 1);

    // Offscreen pass: draw the clean glyphs once; frames only re-slice them.
    const off = document.createElement("canvas");
    let octx = off.getContext("2d");
    if (!octx) return;
    octx.font = font;
    const m = octx.measureText(this._text);
    const ascent = Math.ceil(m.actualBoundingBoxAscent ?? this._fontSize);
    const descent = Math.ceil(m.actualBoundingBoxDescent ?? this._fontSize * 0.3);
    const textW = Math.max(1, Math.ceil(m.width));
    const textH = Math.max(1, ascent + descent);
    this._margin = Math.ceil(this._fontSize * Math.max(this.intensity, this.hoverIntensity));

    off.width = textW * this._dpr;
    off.height = textH * this._dpr;
    octx = off.getContext("2d"); // resizing reset the context state
    octx.scale(this._dpr, this._dpr);
    octx.font = font;
    octx.fillStyle = color;
    octx.textBaseline = "alphabetic";
    octx.fillText(this._text, 0, ascent);
    this._off = off;

    this._canvas.width = (textW + this._margin * 2) * this._dpr;
    this._canvas.height = textH * this._dpr;
    this._canvas.style.width = `${textW + this._margin * 2}px`;
    this._canvas.style.height = `${textH}px`;
    this._ctx = this._canvas.getContext("2d");

    this.setAttribute("data-pura-fuzzy-ready", "");
    this._state("fuzzing");
    if (!this._running) {
      this._running = true;
      this._frame();
    }
  }

  // ---- internals ------------------------------------------------------------
  _frame = () => {
    if (!this._running || !this._ctx || !this._off) return;
    const amp = (this._hover ? this.hoverIntensity : this.intensity) * this._fontSize * this._dpr;
    const sliceH = Math.max(1, Math.round(this.slice * this._dpr));
    const marginPx = this._margin * this._dpr;
    const ctx = this._ctx;
    const off = this._off;
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    for (let y = 0; y < off.height; y += sliceH) {
      const h = Math.min(sliceH, off.height - y);
      // Ephemeral per-frame canvas noise: native randomness is fine here.
      const dx = (Math.random() - 0.5) * 2 * amp;
      ctx.drawImage(off, 0, y, off.width, h, marginPx + dx, y, off.width, h);
    }
    this._raf = requestAnimationFrame(this._frame);
  };

  _mirror() {
    this.setAttribute("data-pura-fuzzy-intensity", String(this.intensity));
    this.setAttribute("data-pura-fuzzy-hover-intensity", String(this.hoverIntensity));
    this.setAttribute("data-pura-fuzzy-slice", String(this.slice));
  }

  _state(s) {
    this.setAttribute("data-pura-fuzzy-state", s);
  }
}

define("pura-fuzzy-text", PuraFuzzyText, meta);
export { PuraFuzzyText };
