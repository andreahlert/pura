// <pura-matrix-rain> — Matrix-style digital rain behind the slotted content,
// in the spirit of React Bits' Letter Glitch / Faulty Terminal (2D take).
// Columns of glyphs fall on a Canvas 2D layer using the classic technique: a
// translucent background fillRect each step fades the previous frame into the
// trail, while the lead glyph is drawn bright with a glow. Progressive
// enhancement: SSR and the pre-JS paint show a dark backdrop with a
// deterministic frozen glyph field from the pure template; the canvas takes
// over only after the client has measured it (data-pura-matrix-ready).
//
// Attributes:
//   speed     : fall speed multiplier, 0.1..10 (default 1).
//   font-size : glyph cell size in CSS px, 8..64 (default 16).
//   glyphs    : custom glyph set drawn on the canvas (default katakana + digits).
//   fade      : trail fade alpha per step, 0.01..1 (default 0.08). Lower keeps
//               longer trails.
//
// Tokens: --pura-matrix-rain-color (rain green), --pura-matrix-rain-lead-color
//   (glowing head), --pura-matrix-rain-bg (backdrop), --pura-matrix-rain-font
//   (glyph font family). Parts: canvas, field, content.
//
// Reduced motion: JS never starts the canvas, and the template CSS only shows
//   the canvas under prefers-reduced-motion: no-preference, so the frozen
//   static field is shown in every reduced-motion path.
//
// Per-step randomness (glyph pick, column reset) is native on purpose: it is
// ephemeral visual noise on a canvas, never serialized markup, so SSR
// determinism is unaffected (the deterministic-seed rule applies to templates).
//
// Agent-native layer: each instance registers in window.__puraMatrixRains by
//   data-pura-id with { speed, fontSize, columns, pause, resume, refresh, el };
//   data-pura-matrix-* mirror config, data-pura-matrix-state mirrors
//   static|raining|paused and data-pura-matrix-columns the live column count.
import { PuraElement, define } from "../base.js";
import meta from "./matrix-rain.meta.js";
import { matrixRainTemplate, MATRIX_GLYPHS } from "./matrix-rain.template.js";

let uid = 0;

function registry() {
  return (window.__puraMatrixRains ||= new Map());
}

function reducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

class PuraMatrixRain extends PuraElement {
  static observedAttributes = ["speed", "font-size", "glyphs", "fade"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-matrix-rain-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = matrixRainTemplate(this);
    this.render(html, css);
    this._canvas = this.$(".canvas");
    this._running = false;
    this._paused = false;
    this._last = 0;
    this._mirror();
    this._state("static");

    registry().set(this._id, {
      id: this._id,
      speed: this.speed,
      fontSize: this.fontSize,
      columns: 0,
      pause: () => this.pause(),
      resume: () => this.resume(),
      refresh: () => this.refresh(),
      el: this,
    });

    if (reducedMotion()) return;

    this._ro = new ResizeObserver(() => this.refresh());
    this._ro.observe(this);
    // Wait one frame so layout and inherited tokens are resolved before
    // measuring the canvas.
    requestAnimationFrame(() => this.refresh());
  }

  disconnectedCallback() {
    this._running = false;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
    this._ro?.disconnect();
    this._ro = null;
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this.shadowRoot) return;
    this._mirror();
    // Cell size bounds the column grid, so font-size changes re-measure.
    if (name === "font-size" && this._ctx) this.refresh();
  }

  // ---- config ---------------------------------------------------------------
  get speed() {
    const n = parseFloat(this.getAttribute("speed"));
    return Number.isFinite(n) && n >= 0.1 && n <= 10 ? n : 1;
  }
  get fontSize() {
    const n = parseFloat(this.getAttribute("font-size"));
    return Number.isFinite(n) && n >= 8 && n <= 64 ? n : 16;
  }
  get fade() {
    const n = parseFloat(this.getAttribute("fade"));
    return Number.isFinite(n) && n >= 0.01 && n <= 1 ? n : 0.08;
  }
  get glyphs() {
    const g = this.getAttribute("glyphs");
    return g && g.length ? g : MATRIX_GLYPHS;
  }

  // ---- public API -----------------------------------------------------------
  // Re-measure the canvas against the host size and theme tokens and (re)start
  // the rain. Call after changing color tokens or the host font token.
  refresh() {
    if (reducedMotion()) return;
    const w = this.clientWidth;
    const h = this.clientHeight;
    if (!w || !h || typeof this._canvas?.getContext !== "function") return;

    this._dpr = Math.max(1, window.devicePixelRatio || 1);
    this._canvas.width = Math.round(w * this._dpr);
    this._canvas.height = Math.round(h * this._dpr);
    const ctx = this._canvas.getContext("2d");
    if (!ctx) return;
    this._ctx = ctx;

    const cs = getComputedStyle(this);
    const token = (name, fallback) => (cs.getPropertyValue(name) || "").trim() || fallback;
    this._color = token("--pura-matrix-rain-color", "#00ff66");
    this._lead = token("--pura-matrix-rain-lead-color", "#eafff2");
    this._bg = token("--pura-matrix-rain-bg", "#050505");
    const family = token("--pura-matrix-rain-font", 'ui-monospace, "SF Mono", Menlo, monospace');

    this._cell = this.fontSize * this._dpr;
    ctx.font = `700 ${this._cell}px ${family}`;
    ctx.textBaseline = "top";

    const cols = Math.max(1, Math.ceil(this._canvas.width / this._cell));
    const drops = new Array(cols);
    // Deterministic stagger for fresh columns; existing columns keep falling.
    for (let i = 0; i < cols; i++) drops[i] = this._drops?.[i] ?? -((i * 7) % 40);
    this._drops = drops;
    this._heads = new Array(cols).fill(null);

    ctx.fillStyle = this._bg;
    ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

    this.setAttribute("data-pura-matrix-ready", "");
    this.setAttribute("data-pura-matrix-columns", String(cols));
    const entry = registry().get(this._id);
    if (entry) {
      entry.speed = this.speed;
      entry.fontSize = this.fontSize;
      entry.columns = cols;
    }

    if (!this._running && !this._paused) {
      this._running = true;
      this._last = 0;
      this._state("raining");
      this._raf = requestAnimationFrame(this._frame);
    }
  }

  // Freeze the rain in place (the canvas keeps its last frame).
  pause() {
    if (!this._running) return;
    this._running = false;
    this._paused = true;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
    this._state("paused");
  }

  // Resume a paused rain. No-op under reduced motion or before first measure.
  resume() {
    this._paused = false;
    if (this._running || reducedMotion() || !this._ctx) return;
    this._running = true;
    this._last = 0;
    this._state("raining");
    this._raf = requestAnimationFrame(this._frame);
  }

  // ---- internals ------------------------------------------------------------
  _frame = (ts) => {
    if (!this._running || !this._ctx) return;
    this._raf = requestAnimationFrame(this._frame);
    // Classic rain steps at ~20 cells/s; speed scales the step rate.
    if (ts - this._last < 50 / this.speed) return;
    this._last = ts;
    this._step();
  };

  _step() {
    const ctx = this._ctx;
    const w = this._canvas.width;
    const h = this._canvas.height;
    const cell = this._cell;
    const glyphs = this.glyphs;

    // Translucent backdrop pass: fades the previous frame into the trail.
    ctx.globalAlpha = this.fade;
    ctx.fillStyle = this._bg;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;

    for (let i = 0; i < this._drops.length; i++) {
      const x = i * cell;

      // Repaint last step's head in the trail color so only the head glows.
      const head = this._heads[i];
      if (head) {
        ctx.fillStyle = this._color;
        ctx.fillText(head.g, x, head.y);
      }

      // Ephemeral per-step canvas noise: native randomness is fine here.
      const g = glyphs[(Math.random() * glyphs.length) | 0];
      const y = this._drops[i] * cell;
      if (y >= -cell && y < h) {
        ctx.fillStyle = this._lead;
        ctx.shadowColor = this._color;
        ctx.shadowBlur = cell * 0.5;
        ctx.fillText(g, x, y);
        ctx.shadowBlur = 0;
        this._heads[i] = { g, y };
      } else {
        this._heads[i] = null;
      }

      if (y > h && Math.random() > 0.975) this._drops[i] = 0;
      else this._drops[i]++;
    }
  }

  _mirror() {
    this.setAttribute("data-pura-matrix-speed", String(this.speed));
    this.setAttribute("data-pura-matrix-font-size", String(this.fontSize));
    this.setAttribute("data-pura-matrix-fade", String(this.fade));
  }

  _state(s) {
    this.setAttribute("data-pura-matrix-state", s);
  }
}

define("pura-matrix-rain", PuraMatrixRain, meta);
export { PuraMatrixRain };
