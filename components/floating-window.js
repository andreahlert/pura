// <pura-floating-window>, a draggable, resizable floating window/panel.
// Title bar drags to move, body is the default slot, optional close/minimize/
// maximize controls. A bottom-right handle resizes. Stays within the viewport.
//
// Attributes: open (bool), x, y, width, height, title,
//   resizable (default true, set ="false" to disable),
//   draggable-window (default true, set ="false" to disable),
//   modal (dim behind).
// Methods: open(), close(), toggleMaximize().
// Parts: window, titlebar, title, controls, body, resize.
// Emits move, resize, close. Buttons get i18n aria-labels.
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "window.close": { en: "Close", "pt-BR": "Fechar", fr: "Fermer", de: "Schließen", it: "Chiudi" },
  "window.minimize": { en: "Minimize", "pt-BR": "Minimizar", fr: "Réduire", de: "Minimieren", it: "Riduci" },
  "window.maximize": { en: "Maximize", "pt-BR": "Maximizar", fr: "Agrandir", de: "Maximieren", it: "Ingrandisci" },
});

// Module-level z-index counter so the most recently focused window sits on top.
const Z_BASE = 1000;
let zTop = Z_BASE;

function num(raw, fallback) {
  if (raw == null || raw === "") return fallback;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}

class PuraFloatingWindow extends PuraElement {
  static observedAttributes = ["open", "x", "y", "width", "height", "title", "modal"];

  connectedCallback() {
    this.render(
      `<div class="backdrop" part="backdrop" hidden></div>
       <div class="win" part="window" role="dialog" aria-modal="false">
         <div class="bar" part="titlebar">
           <span class="title" part="title">${this._titleText()}</span>
           <div class="controls" part="controls">
             <button class="ctl min" part="control" data-act="min" aria-label="${t("window.minimize")}">
               <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
             </button>
             <button class="ctl max" part="control" data-act="max" aria-label="${t("window.maximize")}">
               <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>
             </button>
             <button class="ctl close" part="control" data-act="close" aria-label="${t("window.close")}">
               <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
             </button>
           </div>
         </div>
         <div class="body" part="body"><slot></slot></div>
         <div class="resize" part="resize" aria-hidden="true">
           <svg viewBox="0 0 24 24"><path d="M22 10L10 22M22 16L16 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
         </div>
       </div>`,
      CSS
    );

    this._win = this.$(".win");
    this._bar = this.$(".bar");
    this._titleEl = this.$(".title");
    this._body = this.$(".body");
    this._resizeHandle = this.$(".resize");
    this._backdrop = this.$(".backdrop");

    // Initial geometry.
    this._x = num(this.getAttribute("x"), 80);
    this._y = num(this.getAttribute("y"), 80);
    this._w = num(this.getAttribute("width"), 360);
    this._h = num(this.getAttribute("height"), 240);
    this._maximized = false;
    this._minimized = false;

    // Drag and resize handlers (attached to document during a gesture).
    this._onDragMove = (e) => this._dragMove(e);
    this._onDragUp = (e) => this._dragUp(e);
    this._onResizeMove = (e) => this._resizeMove(e);
    this._onResizeUp = (e) => this._resizeUp(e);

    this._bar.addEventListener("pointerdown", (e) => this._dragDown(e));
    this._resizeHandle.addEventListener("pointerdown", (e) => this._resizeDown(e));
    this._win.addEventListener("pointerdown", () => this._raise());
    this.$(".controls").addEventListener("click", (e) => this._onControl(e));

    this._i18nOff = onLocaleChange(() => this._applyI18n());

    this._applyGeometry();
    this._reflectOpen();
    this._raise();
  }

  disconnectedCallback() {
    this._i18nOff?.();
    document.removeEventListener("pointermove", this._onDragMove);
    document.removeEventListener("pointerup", this._onDragUp);
    document.removeEventListener("pointermove", this._onResizeMove);
    document.removeEventListener("pointerup", this._onResizeUp);
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._win) return;
    if (name === "open") this._reflectOpen();
    else if (name === "title") this._titleEl.textContent = this._titleText();
    else if (name === "modal") this._reflectOpen();
    else if (["x", "y", "width", "height"].includes(name)) {
      if (name === "x") this._x = num(val, this._x);
      if (name === "y") this._y = num(val, this._y);
      if (name === "width") this._w = num(val, this._w);
      if (name === "height") this._h = num(val, this._h);
      this._applyGeometry();
    }
  }

  // ---- public API ----
  open() { this.setAttribute("open", ""); }
  close() {
    this.removeAttribute("open");
    this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
  }

  toggleMaximize() {
    if (this._maximized) {
      this._maximized = false;
      if (this._prevRect) {
        ({ x: this._x, y: this._y, w: this._w, h: this._h } = this._prevRect);
      }
    } else {
      this._prevRect = { x: this._x, y: this._y, w: this._w, h: this._h };
      this._maximized = true;
    }
    this._minimized = false;
    this._applyGeometry();
  }

  // ---- internals ----
  _titleText() { return this.getAttribute("title") || ""; }

  _resizable() { return this.getAttribute("resizable") !== "false"; }
  _draggable() { return this.getAttribute("draggable-window") !== "false"; }

  _reflectOpen() {
    const open = this.hasAttribute("open");
    this._win.style.display = open ? "" : "none";
    const modal = this.hasAttribute("modal");
    this._backdrop.hidden = !(open && modal);
    this._win.setAttribute("aria-modal", modal ? "true" : "false");
    if (open) this._raise();
  }

  _raise() {
    zTop += 1;
    this.style.setProperty("--win-z", String(zTop));
  }

  _applyGeometry() {
    if (this._maximized) {
      this._win.classList.add("maximized");
      this._win.style.left = "0px";
      this._win.style.top = "0px";
      this._win.style.width = "100vw";
      this._win.style.height = "100vh";
    } else {
      this._win.classList.remove("maximized");
      this._clamp();
      this._win.style.left = `${this._x}px`;
      this._win.style.top = `${this._y}px`;
      this._win.style.width = `${this._w}px`;
      this._win.style.height = this._minimized ? "" : `${this._h}px`;
    }
    this._win.classList.toggle("minimized", this._minimized);
    this._resizeHandle.style.display = this._resizable() && !this._maximized && !this._minimized ? "" : "none";
  }

  // Keep the window within the viewport bounds.
  _clamp() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    this._w = Math.max(160, Math.min(this._w, vw));
    this._h = Math.max(80, Math.min(this._h, vh));
    this._x = Math.max(0, Math.min(this._x, vw - this._w));
    this._y = Math.max(0, Math.min(this._y, vh - this._h));
  }

  // ---- drag ----
  _dragDown(e) {
    if (!this._draggable() || this._maximized) return;
    if (e.target.closest(".controls")) return;
    e.preventDefault();
    this._raise();
    this._dragOffX = e.clientX - this._x;
    this._dragOffY = e.clientY - this._y;
    this._bar.setPointerCapture?.(e.pointerId);
    document.addEventListener("pointermove", this._onDragMove);
    document.addEventListener("pointerup", this._onDragUp);
  }

  _dragMove(e) {
    this._x = e.clientX - this._dragOffX;
    this._y = e.clientY - this._dragOffY;
    this._applyGeometry();
    this.dispatchEvent(new CustomEvent("move", { detail: { x: this._x, y: this._y }, bubbles: true }));
  }

  _dragUp() {
    document.removeEventListener("pointermove", this._onDragMove);
    document.removeEventListener("pointerup", this._onDragUp);
  }

  // ---- resize ----
  _resizeDown(e) {
    if (!this._resizable() || this._maximized) return;
    e.preventDefault();
    e.stopPropagation();
    this._raise();
    this._resStartX = e.clientX;
    this._resStartY = e.clientY;
    this._resStartW = this._w;
    this._resStartH = this._h;
    this._resizeHandle.setPointerCapture?.(e.pointerId);
    document.addEventListener("pointermove", this._onResizeMove);
    document.addEventListener("pointerup", this._onResizeUp);
  }

  _resizeMove(e) {
    this._w = this._resStartW + (e.clientX - this._resStartX);
    this._h = this._resStartH + (e.clientY - this._resStartY);
    this._applyGeometry();
    this.dispatchEvent(new CustomEvent("resize", { detail: { width: this._w, height: this._h }, bubbles: true }));
  }

  _resizeUp() {
    document.removeEventListener("pointermove", this._onResizeMove);
    document.removeEventListener("pointerup", this._onResizeUp);
  }

  // ---- controls ----
  _onControl(e) {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const act = btn.getAttribute("data-act");
    if (act === "close") this.close();
    else if (act === "max") this.toggleMaximize();
    else if (act === "min") { this._minimized = !this._minimized; this._maximized = false; this._applyGeometry(); }
  }

  _applyI18n() {
    this.$(".min")?.setAttribute("aria-label", t("window.minimize"));
    this.$(".max")?.setAttribute("aria-label", t("window.maximize"));
    this.$(".close")?.setAttribute("aria-label", t("window.close"));
  }
}

const CSS = `
  :host { --win-z: 1000; }

  .backdrop {
    position: fixed; inset: 0; z-index: calc(var(--win-z) - 1);
    background: rgb(0 0 0 / 0.45); backdrop-filter: blur(2px);
  }
  .backdrop[hidden] { display: none; }

  .win {
    position: fixed; z-index: var(--win-z);
    display: flex; flex-direction: column;
    min-width: 160px; min-height: 80px;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg);
    box-shadow: var(--pura-shadow-lg); overflow: hidden;
  }
  .win.maximized { border-radius: 0; }
  .win.minimized { height: auto !important; }
  .win.minimized .body, .win.minimized .resize { display: none; }

  .bar {
    display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-3); flex: none;
    padding: var(--pura-space-2) var(--pura-space-3);
    background: var(--pura-subtle); border-bottom: 1px solid var(--pura-border);
    cursor: grab; user-select: none; touch-action: none;
  }
  .bar:active { cursor: grabbing; }
  .title {
    font-size: var(--pura-text-sm); font-weight: 600;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }

  .controls { display: flex; align-items: center; gap: var(--pura-space-1); flex: none; }
  .ctl {
    display: grid; place-items: center; width: 1.6rem; height: 1.6rem;
    border: none; background: transparent; color: var(--pura-muted);
    border-radius: var(--pura-radius-sm); cursor: pointer;
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur) var(--pura-ease);
  }
  .ctl:hover { background: var(--pura-subtle-hover); color: var(--pura-fg); }
  .ctl.close:hover { background: var(--pura-danger-bg); color: var(--pura-danger); }
  .ctl svg { width: 1rem; height: 1rem; }

  .body {
    flex: 1 1 auto; min-height: 0; overflow: auto;
    padding: var(--pura-space-4);
    font-size: var(--pura-text-sm); color: var(--pura-fg);
  }

  .resize {
    position: absolute; right: 0; bottom: 0;
    width: 1.1rem; height: 1.1rem;
    color: var(--pura-muted); cursor: nwse-resize; touch-action: none;
    display: grid; place-items: end;
  }
  .resize svg { width: 1rem; height: 1rem; }
`;

define("pura-floating-window", PuraFloatingWindow);
export { PuraFloatingWindow };
