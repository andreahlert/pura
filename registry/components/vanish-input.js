// <pura-vanish-input> — the chat-composer vanish input: on submit the typed
// text dissolves into particles that fly out of the field before it clears.
// The text is rasterized onto a canvas overlaid on the input (Canvas 2D), then
// the lit pixels are animated as particles sweeping left to right. Optional
// rotating placeholders cycle while the field is empty. Inspired by Aceternity
// UI's "Placeholders And Vanish Input".
//
// Attributes:
//   placeholder  — static placeholder text.
//   placeholders — pipe-separated rotating placeholder list (overrides placeholder).
//   interval     — placeholder rotation interval in ms (default 3000).
//   value        — initial value.
//   duration     — particle dissolve time in ms (default 900).
//   label        — accessible name for the inner input.
//   submit-label — aria-label for the submit button (default "Submit").
//   disabled     — disables the field and button.
//
// Events:
//   submit — fired with { value } when the field is submitted (bubbles, composed).
//   vanish — fired when the particle effect finishes and the field is clear.
//
// Tokens: --pura-vanish-input-height, -bg, -fg, -border, -radius, -submit-bg,
//   -submit-fg. Internals exposed via part="root|input|placeholder|canvas|
//   submit|submit-icon".
//
// SSR / pre-JS: a fully usable form (input + button), no effect. Reduced
// motion: submit clears instantly, no particles, no placeholder rotation.
//
// Agent-native layer: each instance registers in window.__puraVanishInputs by
//   data-pura-id with { id, value, submit, el }; data-pura-vanish-state and
//   data-pura-vanish-last mirror runtime state.
import { PuraElement, define } from "../base.js";
import meta from "./vanish-input.meta.js";
import { vanishInputTemplate } from "./vanish-input.template.js";

let uid = 0;

function registry() {
  return (window.__puraVanishInputs ||= new Map());
}

class PuraVanishInput extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-vanish-input-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = vanishInputTemplate(this);
    this.render(html, css);

    this._form = this.$("form");
    this._input = this.$(".input");
    this._button = this.$(".submit");
    this._canvas = this.$(".canvas");
    this._ph = this.$(".ph");
    this._phList = (this.getAttribute("placeholders") || "")
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
    this._phIdx = 0;

    this._onSubmit = (e) => {
      e.preventDefault();
      this.vanish();
    };
    this._form.addEventListener("submit", this._onSubmit);

    this._onInput = () => {
      this._button.disabled = this.hasAttribute("disabled") || !this._input.value;
      this.dispatchEvent(new CustomEvent("input", { detail: { value: this._input.value }, bubbles: true }));
    };
    this._input.addEventListener("input", this._onInput);

    if (this._ph && this._phList.length > 1 && !this._reduced()) {
      const ms = this.interval;
      this._timer = setInterval(() => this._rotate(), ms);
    }

    this.setAttribute("data-pura-vanish-state", "idle");
    registry().set(this._id, {
      id: this._id,
      get value() { return this.el._input?.value ?? ""; },
      submit: () => this.vanish(),
      el: this,
    });
  }

  disconnectedCallback() {
    clearInterval(this._timer);
    cancelAnimationFrame(this._raf);
    this._form?.removeEventListener("submit", this._onSubmit);
    this._input?.removeEventListener("input", this._onInput);
    const entry = registry().get(this._id);
    if (entry && entry.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 900;
  }
  get interval() {
    const n = parseFloat(this.getAttribute("interval"));
    return Number.isFinite(n) && n >= 800 ? n : 3000;
  }
  get value() {
    return this._input?.value ?? this.getAttribute("value") ?? "";
  }
  set value(v) {
    if (this._input) {
      this._input.value = v;
      this._button.disabled = this.hasAttribute("disabled") || !v;
    }
  }

  // ---- public API -----------------------------------------------------------
  // Submit the current value: emit "submit", dissolve the text into particles,
  // clear the field, then emit "vanish". No particles under reduced motion.
  vanish() {
    if (this.hasAttribute("disabled")) return;
    const value = this._input.value;
    if (!value) return;

    this.setAttribute("data-pura-vanish-last", value);
    this.dispatchEvent(new CustomEvent("submit", { detail: { value }, bubbles: true, composed: true }));

    const ctx = this._canvas?.getContext?.("2d");
    if (this._reduced() || !ctx) {
      this._clear();
      this.dispatchEvent(new CustomEvent("vanish", { bubbles: true, composed: true }));
      return;
    }
    this._dissolve(ctx, value);
  }

  // ---- internals ------------------------------------------------------------
  _reduced() {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }

  _clear() {
    this._input.value = "";
    this._button.disabled = true;
    this.setAttribute("data-pura-vanish-state", "idle");
  }

  _rotate() {
    // skip while the user is composing; the overlay is hidden anyway
    if (this._input.value) return;
    this._phIdx = (this._phIdx + 1) % this._phList.length;
    this._ph.removeAttribute("data-swap");
    void this._ph.offsetWidth; // restart the swap animation
    this._ph.textContent = this._phList[this._phIdx];
    this._ph.setAttribute("data-swap", "");
  }

  // Rasterize the input text onto the overlay canvas, sample the lit pixels as
  // particles, then animate them flying up and out in a left-to-right sweep.
  // Math.random here is fine: ephemeral runtime visuals, never SSR output.
  _dissolve(ctx, value) {
    cancelAnimationFrame(this._raf);
    const canvas = this._canvas;
    const rect = this._input.getBoundingClientRect();
    const host = this._form.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(host.width * dpr));
    canvas.height = Math.max(1, Math.round(host.height * dpr));

    const cs = getComputedStyle(this._input);
    const fontPx = parseFloat(cs.fontSize) * dpr;
    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${fontPx}px ${cs.fontFamily}`;
    ctx.textBaseline = "middle";
    ctx.fillStyle = cs.color;
    const x0 = (rect.left - host.left + parseFloat(cs.paddingLeft)) * dpr;
    const y0 = canvas.height / 2;
    ctx.fillText(value, x0, y0);

    // sample step sized so long strings stay near ~1500 particles
    const textW = Math.min(ctx.measureText(value).width, canvas.width - x0);
    const gap = Math.max(Math.round(dpr), Math.ceil(Math.sqrt((textW * fontPx) / 1500)));
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const particles = [];
    for (let y = 0; y < canvas.height; y += gap) {
      for (let x = 0; x < canvas.width; x += gap) {
        const i = (y * canvas.width + x) * 4;
        if (img.data[i + 3] > 140) {
          particles.push({
            x, y,
            color: `rgba(${img.data[i]},${img.data[i + 1]},${img.data[i + 2]},`,
            vx: (Math.random() - 0.3) * 1.6 * dpr,
            vy: (Math.random() - 0.7) * 1.8 * dpr,
            size: Math.max(1, gap * 0.9),
            delay: ((x - x0) / Math.max(1, textW * dpr)) * 0.35,
          });
        }
      }
    }

    this._clear();
    this.setAttribute("data-pura-vanish-state", "vanishing");

    const duration = this.duration;
    const start = performance.now();
    const tick = (now) => {
      const t = (now - start) / duration;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (t >= 1) {
        canvas.width = canvas.width; // reset
        this.setAttribute("data-pura-vanish-state", "idle");
        this.dispatchEvent(new CustomEvent("vanish", { bubbles: true, composed: true }));
        return;
      }
      for (const p of particles) {
        const lp = Math.min(1, Math.max(0, (t - p.delay) / 0.65));
        if (lp <= 0) {
          ctx.fillStyle = p.color + "1)";
          ctx.fillRect(p.x, p.y, p.size, p.size);
          continue;
        }
        if (lp >= 1) continue;
        const drift = lp * lp * duration * 0.06;
        ctx.fillStyle = p.color + `${1 - lp})`;
        const s = p.size * (1 - lp * 0.7);
        ctx.fillRect(p.x + p.vx * drift, p.y + p.vy * drift, s, s);
      }
      this._raf = requestAnimationFrame(tick);
    };
    this._raf = requestAnimationFrame(tick);
  }
}

define("pura-vanish-input", PuraVanishInput, meta);
export { PuraVanishInput };
