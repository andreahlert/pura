// <pura-angle-slider>, a circular angle picker (Mantine AngleSlider style).
// A round dial with a draggable handle on the circumference and a line from the
// center. Dragging sets the angle in degrees, 0..360.
//
// Attributes: value (deg), size (px, default 120), step (snap, default 1),
//   marks (comma list of degrees to show ticks), disabled.
// Parts: dial, thumb, line, mark.
// ARIA: role=slider with aria-valuenow/min/max. Emits change. Arrow keys adjust
//   by step.
import { PuraElement, define } from "../base.js";
import meta from "./angle-slider.meta.js";
import { angleSliderTemplate } from "./angle-slider.template.js";

const CX = 50;
const CY = 50;
const R = 42; // handle ring radius in the 0..100 viewBox

function num(raw, fallback) {
  if (raw == null || raw === "") return fallback;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}

// Normalize any degree into 0..360 (360 maps to 0).
function norm(deg) {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

// Point on a circle of radius r for an angle measured clockwise from the top
// (12 o'clock = 0 degrees), matching the conventional compass dial.
function point(deg, r) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function parseMarks(raw) {
  if (!raw) return [];
  return String(raw)
    .split(",")
    .map((s) => parseFloat(s.trim()))
    .filter((n) => Number.isFinite(n))
    .map(norm);
}

class PuraAngleSlider extends PuraElement {
  static observedAttributes = ["value", "size", "step", "marks", "disabled"];

  connectedCallback() {
    const { html, css } = angleSliderTemplate(this);
    this.render(html, css);
    this._svg = this.$(".svg");
    this._line = this.$(".line");
    this._thumb = this.$(".thumb");
    this._marksG = this.$(".marks");

    if (!this.hasAttribute("value")) this.setAttribute("value", "0");

    this._onDown = (e) => this._down(e);
    this._onMove = (e) => this._move(e);
    this._onUp = (e) => this._up(e);
    this._onKey = (e) => this._key(e);

    this._svg.addEventListener("pointerdown", this._onDown);
    this._svg.addEventListener("keydown", this._onKey);

    this._renderMarks();
    this._sync();
  }

  disconnectedCallback() {
    document.removeEventListener("pointermove", this._onMove);
    document.removeEventListener("pointerup", this._onUp);
  }

  attributeChangedCallback(name) {
    if (!this._svg) return;
    if (name === "marks") this._renderMarks();
    this._sync();
  }

  // ---- public API ----
  get value() { return norm(num(this.getAttribute("value"), 0)); }
  set value(v) { this._set(norm(v)); }

  // ---- internals ----
  _step() {
    const s = num(this.getAttribute("step"), 1);
    return s > 0 ? s : 1;
  }

  _set(deg) {
    const step = this._step();
    let next = norm(Math.round(deg / step) * step);
    if (next === this.value) { this._sync(); return; }
    this.setAttribute("value", String(next));
    this._sync();
    this.dispatchEvent(new CustomEvent("change", { detail: { value: next }, bubbles: true }));
  }

  _renderMarks() {
    if (!this._marksG) return;
    const marks = parseMarks(this.getAttribute("marks"));
    this._marksG.textContent = "";
    for (const m of marks) {
      const a = point(m, R + 1);
      const b = point(m, R - 5);
      const ln = document.createElementNS("http://www.w3.org/2000/svg", "line");
      ln.setAttribute("class", "mark");
      ln.setAttribute("part", "mark");
      ln.setAttribute("x1", a.x);
      ln.setAttribute("y1", a.y);
      ln.setAttribute("x2", b.x);
      ln.setAttribute("y2", b.y);
      this._marksG.appendChild(ln);
    }
  }

  _sync() {
    const size = num(this.getAttribute("size"), 120);
    this.style.setProperty("--angle-size", `${size}px`);
    const p = point(this.value, R);
    this._thumb.setAttribute("cx", p.x);
    this._thumb.setAttribute("cy", p.y);
    this._line.setAttribute("x2", p.x);
    this._line.setAttribute("y2", p.y);
    this._svg.setAttribute("aria-valuenow", String(this.value));
    this._svg.setAttribute("aria-valuemin", "0");
    this._svg.setAttribute("aria-valuemax", "360");
    const disabled = this.hasAttribute("disabled");
    this._svg.setAttribute("aria-disabled", disabled ? "true" : "false");
    if (disabled) this._svg.removeAttribute("tabindex");
    else this._svg.setAttribute("tabindex", "0");
  }

  // Convert a client point to a dial angle (deg, clockwise from top).
  _angleAt(clientX, clientY) {
    const rect = this._svg.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    return norm(deg);
  }

  _down(e) {
    if (this.hasAttribute("disabled")) return;
    e.preventDefault();
    this._svg.focus();
    this._svg.setPointerCapture?.(e.pointerId);
    document.addEventListener("pointermove", this._onMove);
    document.addEventListener("pointerup", this._onUp);
    this._set(this._angleAt(e.clientX, e.clientY));
  }

  _move(e) {
    if (this.hasAttribute("disabled")) return;
    this._set(this._angleAt(e.clientX, e.clientY));
  }

  _up(e) {
    document.removeEventListener("pointermove", this._onMove);
    document.removeEventListener("pointerup", this._onUp);
    this._svg.releasePointerCapture?.(e.pointerId);
  }

  _key(e) {
    if (this.hasAttribute("disabled")) return;
    const step = this._step();
    let handled = true;
    switch (e.key) {
      case "ArrowUp":
      case "ArrowRight": this._set(this.value + step); break;
      case "ArrowDown":
      case "ArrowLeft": this._set(this.value - step); break;
      case "Home": this._set(0); break;
      case "End": this._set(360 - step); break;
      default: handled = false;
    }
    if (handled) e.preventDefault();
  }
}


define("pura-angle-slider", PuraAngleSlider, meta);
export { PuraAngleSlider };
