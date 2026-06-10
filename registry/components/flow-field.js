// <pura-flow-field> — the awwwards generative backdrop: particles flow along
// a seeded noise vector field on a Canvas 2D layer, drawing organic
// topographic lines that accumulate behind the slotted content (Vanta TOPOLOGY
// style). Trails build up via a translucent destination-out fade, so old
// strokes dissolve slowly while new ones layer on top. The "vortex" preset
// swaps the field for a perturbed inward spiral around the center (the
// Aceternity Vortex effect on the same engine). One rAF loop runs the O(n)
// integration and is paused while the element is offscreen. The pure template
// paints static deterministic streamlines (SVG) traced through the same seeded
// field for SSR; client JS takes the canvas over and hides the static field.
//
// Attributes:
//   count      — number of particles (default 500, max 1500).
//   preset     — "flow" (default, noise field) | "vortex" (perturbed spiral).
//   seed       — noise seed; same seed, same field, deterministic (default 1).
//   scale      — noise field frequency per px; smaller is broader (default 0.004).
//   speed      — particle speed in px per second (default 60).
//   fade       — trail fade per frame, 0..1; lower keeps longer trails (default 0.04).
//   line-width — stroke width of the trails in px (default 1).
//
// Tokens: --pura-flow-field-color (lines, default --pura-fg),
//   --pura-flow-field-opacity (lines, default 0.35),
//   --pura-flow-field-bg (host background, default transparent).
//
// Reduced motion: no loop; the canvas holds a single static frame, the
//   accumulated topographic drawing after a fixed number of pre-run steps,
//   tracked live via media query.
//
// Agent-native layer: each instance registers in window.__puraFlowFields by
//   data-pura-id with { id, preset, count, seed, pause, resume, el };
//   data-pura-ff-preset / -count / -state mirror config and run state.
import { PuraElement, define } from "../base.js";
import meta from "./flow-field.meta.js";
import { flowFieldTemplate, flowFieldAngle } from "./flow-field.template.js";

let uid = 0;
const MAX_COUNT = 1500;

function registry() {
  return (window.__puraFlowFields ||= new Map());
}

// Seeded LCG (same family as pura-scramble): particle spawn points are
// deterministic for a given seed, so the drawing is reproducible.
function lcg(seed) {
  let s = ((Math.floor(Math.abs(seed * 9301 + 49297)) % 2147483646) + 2147483646) % 2147483646 + 1;
  return () => {
    s = (s * 48271) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

class PuraFlowField extends PuraElement {
  static observedAttributes = ["count", "preset", "seed", "scale", "speed", "fade", "line-width"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-flow-field-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = flowFieldTemplate(this);
    this.render(html, css);
    this._canvas = this.$(".canvas");
    this._ctx = this._canvas.getContext("2d");
    this._visible = true;
    this._paused = false;
    this._raf = 0;
    this._t = 0;
    this._tick = this._tick.bind(this);

    this._reduceMq = window.matchMedia?.("(prefers-reduced-motion: reduce)") || null;
    this._onReduce = () => this._sync();
    this._reduceMq?.addEventListener?.("change", this._onReduce);

    if (typeof ResizeObserver === "function") {
      this._ro = new ResizeObserver(() => this._resize());
      this._ro.observe(this);
    }
    if (typeof IntersectionObserver === "function") {
      this._io = new IntersectionObserver((entries) => {
        this._visible = entries[entries.length - 1].isIntersecting;
        this._sync();
      });
      this._io.observe(this);
    }

    this._resize();
    this._mirror();
    registry().set(this._id, {
      id: this._id,
      preset: this.preset,
      count: this.count,
      seed: this.seed,
      pause: () => { this._paused = true; this._sync(); },
      resume: () => { this._paused = false; this._sync(); },
      el: this,
    });
    this._sync();
  }

  disconnectedCallback() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
    this._ro?.disconnect();
    this._io?.disconnect();
    this._reduceMq?.removeEventListener?.("change", this._onReduce);
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this._ctx) return;
    if (name === "count" || name === "seed" || name === "preset") this._seed();
    this._mirror();
    const entry = registry().get(this._id);
    if (entry) {
      entry.preset = this.preset;
      entry.count = this.count;
      entry.seed = this.seed;
    }
    if (this._reduce()) this._drawStatic();
    else if (!this._raf) this._warmup();
  }

  // ---- config ---------------------------------------------------------------
  get count() {
    const n = parseInt(this.getAttribute("count"), 10);
    return Number.isFinite(n) && n > 0 ? Math.min(n, MAX_COUNT) : 500;
  }
  get preset() {
    return this.getAttribute("preset") === "vortex" ? "vortex" : "flow";
  }
  get seed() {
    const n = parseFloat(this.getAttribute("seed"));
    return Number.isFinite(n) ? n : 1;
  }
  get scale() {
    const n = parseFloat(this.getAttribute("scale"));
    return Number.isFinite(n) && n > 0 ? n : 0.004;
  }
  get speed() {
    const n = parseFloat(this.getAttribute("speed"));
    return Number.isFinite(n) && n >= 0 ? n : 60;
  }
  get fade() {
    const n = parseFloat(this.getAttribute("fade"));
    return Number.isFinite(n) && n >= 0 && n <= 1 ? n : 0.04;
  }
  get lineWidth() {
    const n = parseFloat(this.getAttribute("line-width"));
    return Number.isFinite(n) && n > 0 ? n : 1;
  }

  // ---- internals ------------------------------------------------------------
  _reduce() {
    return !!this._reduceMq?.matches;
  }

  _mirror() {
    this.setAttribute("data-pura-ff-preset", this.preset);
    this.setAttribute("data-pura-ff-count", String(this.count));
  }

  _resize() {
    const rect = this.getBoundingClientRect();
    this._w = Math.max(1, rect.width);
    this._h = Math.max(1, rect.height);
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this._canvas.width = Math.max(1, Math.round(this._w * dpr));
    this._canvas.height = Math.max(1, Math.round(this._h * dpr));
    this._ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this._resolveColors();
    this._seed();
    // resizing clears the canvas; repaint so the backdrop never goes blank
    if (this._reduce()) this._drawStatic();
    else this._warmup();
  }

  // Tokens are resolved once per resize (and on attribute change); a live theme
  // swap settles on the next layout change.
  _resolveColors() {
    const cs = getComputedStyle(this);
    const get = (name, fallback) => (cs.getPropertyValue(name) || "").trim() || fallback;
    const opacity = parseFloat(get("--pura-flow-field-opacity", "0.35"));
    this._colors = {
      line: get("--pura-flow-field-color", get("--pura-fg", "#a1a1aa")),
      opacity: Number.isFinite(opacity) ? opacity : 0.35,
    };
  }

  // Deterministic spawn points from the seeded LCG; the same seed always
  // produces the same drawing.
  _seed() {
    this._rand = lcg(this.seed);
    this._t = 0;
    const r = this._rand;
    const pts = [];
    for (let i = 0; i < this.count; i++) {
      const x = r() * this._w;
      const y = r() * this._h;
      pts.push({ x, y, px: x, py: y, life: 2 + r() * 6 });
    }
    this._pts = pts;
  }

  _respawn(p) {
    const r = this._rand;
    p.x = p.px = r() * this._w;
    p.y = p.py = r() * this._h;
    p.life = 2 + r() * 6;
  }

  // Start/stop the loop from the current gates: visibility (IntersectionObserver),
  // reduced motion, agent pause, and connectedness. Under reduced motion the
  // canvas holds one accumulated static frame instead of animating.
  _sync() {
    const reduce = this._reduce();
    const shouldRun = !reduce && this._visible && !this._paused && this.isConnected;
    if (shouldRun && !this._raf) {
      this._last = 0;
      this._raf = requestAnimationFrame(this._tick);
    } else if (!shouldRun && this._raf) {
      cancelAnimationFrame(this._raf);
      this._raf = 0;
    }
    if (reduce && this._ctx) this._drawStatic();
    this.setAttribute("data-pura-ff-state", reduce ? "static" : this._raf ? "running" : "paused");
  }

  _tick(t) {
    this._raf = requestAnimationFrame(this._tick);
    const dt = this._last ? Math.min(0.05, (t - this._last) / 1000) : 0;
    this._last = t;
    if (dt) {
      this._step(dt);
      this._draw();
    }
  }

  _step(dt) {
    this._t += dt;
    const { _w: w, _h: h } = this;
    const speed = this.speed;
    const scale = this.scale;
    const seed = this.seed;
    const vortex = this.preset === "vortex";
    for (const p of this._pts) {
      p.px = p.x;
      p.py = p.y;
      const a = flowFieldAngle(p.x, p.y, w, h, scale, seed, vortex, this._t);
      p.x += Math.cos(a) * speed * dt;
      p.y += Math.sin(a) * speed * dt;
      p.life -= dt;
      const out = p.x < -8 || p.x > w + 8 || p.y < -8 || p.y > h + 8;
      const core = vortex && Math.hypot(p.x - w / 2, p.y - h / 2) < 8;
      if (out || core || p.life <= 0) this._respawn(p);
    }
  }

  // One frame: fade the accumulated trails a notch (destination-out keeps the
  // canvas transparent, so the host bg token shows through), then stroke every
  // particle's last segment in a single path.
  _draw() {
    const ctx = this._ctx;
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = `rgba(0, 0, 0, ${this.fade})`;
    ctx.fillRect(0, 0, this._w, this._h);
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = this._colors.line;
    ctx.globalAlpha = this._colors.opacity;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = "round";
    ctx.beginPath();
    for (const p of this._pts) {
      ctx.moveTo(p.px, p.py);
      ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
    // first painted frame: retire the static SSR field
    this.setAttribute("data-pura-ff-live", "");
  }

  // Pre-roll the simulation so the canvas already shows accumulated trails on
  // reveal instead of starting from an empty frame.
  _warmup() {
    for (let i = 0; i < 70; i++) {
      this._step(1 / 60);
      this._draw();
    }
  }

  // Reduced motion: a single static frame, the full topographic accumulation
  // of a fixed pre-run (no fade, so the strokes layer into a finished drawing).
  _drawStatic() {
    this._seed();
    const ctx = this._ctx;
    ctx.clearRect(0, 0, this._w, this._h);
    ctx.strokeStyle = this._colors.line;
    ctx.globalAlpha = Math.min(1, this._colors.opacity * 0.6);
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = "round";
    for (let s = 0; s < 220; s++) {
      this._step(1 / 60);
      ctx.beginPath();
      for (const p of this._pts) {
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    this.setAttribute("data-pura-ff-live", "");
  }
}

define("pura-flow-field", PuraFlowField, meta);
export { PuraFlowField };
