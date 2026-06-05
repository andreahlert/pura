// <pura-signature> - canvas signature pad. Pointer/touch strokes draw onto a
// <canvas>; HiDPI aware (scales by devicePixelRatio). Zero deps, platform only.
// Attributes:
//   width       - canvas CSS width (number → px, or CSS length). Default 400.
//   height      - canvas CSS height (number → px, or CSS length). Default 160.
//   color       - stroke color. Default var(--pura-fg).
//   line-width  - stroke width in px. Default 2.5.
//   disabled    - disables drawing and the Clear button.
// Methods / props:
//   .toDataURL(type?)  - returns a data URL (PNG by default).
//   .isEmpty           - true while nothing has been drawn.
//   .clear()           - wipes the pad.
// Events: dispatches "change" (bubbles) on stroke end with detail { dataUrl }.
// Parts: root, canvas, toolbar, button.
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "signature.clear": { en: "Clear", "pt-BR": "Limpar", fr: "Effacer", de: "Löschen", it: "Cancella" },
});

function len(v, fallback) {
  if (v == null || v === "") return fallback;
  return /^-?\d*\.?\d+$/.test(String(v).trim()) ? `${String(v).trim()}px` : v;
}

class PuraSignature extends PuraElement {
  connectedCallback() {
    this.style.setProperty("--_w", len(this.getAttribute("width"), "400px"));
    this.style.setProperty("--_h", len(this.getAttribute("height"), "160px"));

    this.render(
      `<div class="root" part="root">
         <div class="pad">
           <canvas part="canvas"></canvas>
         </div>
         <div class="toolbar" part="toolbar">
           <button class="clear" part="button" type="button">${t("signature.clear")}</button>
         </div>
       </div>`,
      CSS
    );

    this._canvas = this.$("canvas");
    this._ctx = this._canvas.getContext("2d");
    this._empty = true;
    this._drawing = false;

    this._clearBtn = this.$(".clear");
    this._clearBtn.disabled = this.hasAttribute("disabled");
    this._clearBtn.addEventListener("click", () => this.clear());

    this._onDown = (e) => this._start(e);
    this._onMove = (e) => this._move(e);
    this._onUp = () => this._end();
    this._canvas.addEventListener("pointerdown", this._onDown);
    this._canvas.addEventListener("pointermove", this._onMove);
    window.addEventListener("pointerup", this._onUp);

    // Resize after layout so the canvas has measurable dimensions.
    this._ro = new ResizeObserver(() => this._resize());
    this._ro.observe(this._canvas);
    requestAnimationFrame(() => this._resize());

    this._i18nOff = onLocaleChange(() => { this._clearBtn.textContent = t("signature.clear"); });
  }

  disconnectedCallback() {
    this._i18nOff?.();
    this._ro?.disconnect();
    window.removeEventListener("pointerup", this._onUp);
  }

  // Public API.
  get isEmpty() { return this._empty; }

  toDataURL(type = "image/png", quality) {
    return this._canvas.toDataURL(type, quality);
  }

  clear() {
    const r = this._dpr || 1;
    this._ctx.clearRect(0, 0, this._canvas.width / r, this._canvas.height / r);
    this._empty = true;
  }

  // Match the backing store to CSS size * devicePixelRatio, preserving content.
  _resize() {
    const rect = this._canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = window.devicePixelRatio || 1;
    const prev = this._empty ? null : this._canvas.toDataURL();
    this._dpr = dpr;
    this._canvas.width = Math.round(rect.width * dpr);
    this._canvas.height = Math.round(rect.height * dpr);
    this._ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this._applyStyle();
    if (prev) {
      const img = new Image();
      img.onload = () => this._ctx.drawImage(img, 0, 0, rect.width, rect.height);
      img.src = prev;
    }
  }

  _applyStyle() {
    const cs = getComputedStyle(this);
    const color = this.getAttribute("color") || cs.getPropertyValue("--pura-fg").trim() || "currentColor";
    this._ctx.strokeStyle = color === "currentColor" ? cs.color : color;
    this._ctx.lineWidth = Number(this.getAttribute("line-width")) || 2.5;
    this._ctx.lineCap = "round";
    this._ctx.lineJoin = "round";
  }

  _pos(e) {
    const rect = this._canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  _start(e) {
    if (this.hasAttribute("disabled")) return;
    e.preventDefault();
    this._drawing = true;
    this._canvas.setPointerCapture?.(e.pointerId);
    this._applyStyle();
    const p = this._pos(e);
    this._ctx.beginPath();
    this._ctx.moveTo(p.x, p.y);
    // Dot for a tap with no movement.
    this._ctx.lineTo(p.x + 0.01, p.y + 0.01);
    this._ctx.stroke();
    this._empty = false;
  }

  _move(e) {
    if (!this._drawing) return;
    e.preventDefault();
    const p = this._pos(e);
    this._ctx.lineTo(p.x, p.y);
    this._ctx.stroke();
  }

  _end() {
    if (!this._drawing) return;
    this._drawing = false;
    this.dispatchEvent(new CustomEvent("change", {
      detail: { dataUrl: this.toDataURL() }, bubbles: true,
    }));
  }
}

const CSS = `
  :host { display: inline-block; }
  :host([disabled]) { opacity: 0.6; }
  .root {
    display: inline-flex; flex-direction: column; gap: var(--pura-space-2);
  }
  .pad {
    position: relative; width: var(--_w, 400px); height: var(--_h, 160px);
    background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm); overflow: hidden;
  }
  /* subtle baseline guideline */
  .pad::after {
    content: ""; position: absolute; left: 8%; right: 8%; bottom: 22%;
    border-bottom: 1px dashed var(--pura-border-strong); pointer-events: none;
  }
  canvas {
    position: relative; display: block; width: 100%; height: 100%;
    touch-action: none; cursor: crosshair;
  }
  :host([disabled]) canvas { cursor: not-allowed; }

  .toolbar { display: flex; justify-content: flex-end; }
  .clear {
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550; cursor: pointer;
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    padding: var(--pura-space-1) var(--pura-space-3);
  }
  .clear:hover { background: var(--pura-subtle); }
  .clear:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .clear:disabled { opacity: 0.55; cursor: not-allowed; }
`;

define("pura-signature", PuraSignature);
export { PuraSignature };
