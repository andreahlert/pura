// <pura-resizable> — two resizable split panes separated by a draggable divider.
// Slots: start, end. Attributes: orientation (horizontal default | vertical),
// min (minimum percentage for either panel, default 10), value (initial split %
// for the start panel, default 50). Drag the divider with a pointer or focus it
// (role=separator, tabindex 0) and use arrow keys to nudge the split.
import { PuraElement, define } from "../base.js";
import meta from "./resizable.meta.js";
import { resizableTemplate } from "./resizable.template.js";

class PuraResizable extends PuraElement {
  static observedAttributes = ["orientation", "min", "value"];

  connectedCallback() {
    const { html, css } = resizableTemplate(this);
    this.render(html, css);

    this._container = this.$(".container");
    this._start = this.$(".start");
    this._end = this.$(".end");
    this._handle = this.$(".handle");

    this._value = this._clamp(parseFloat(this.getAttribute("value")) || 50);
    this._dragging = false;

    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);

    this._handle.addEventListener("pointerdown", this._onPointerDown);
    this._handle.addEventListener("keydown", this._onKeyDown);

    this._sync();
  }

  disconnectedCallback() {
    window.removeEventListener("pointermove", this._onPointerMove);
    window.removeEventListener("pointerup", this._onPointerUp);
  }

  attributeChangedCallback(name, _old, value) {
    if (!this._handle) return;
    if (name === "value") this._value = this._clamp(parseFloat(value) || 50);
    this._sync();
  }

  get _vertical() {
    return this.getAttribute("orientation") === "vertical";
  }

  get _min() {
    const m = parseFloat(this.getAttribute("min"));
    return Number.isFinite(m) ? Math.max(0, Math.min(45, m)) : 10;
  }

  _clamp(v) {
    const min = this._min;
    return Math.max(min, Math.min(100 - min, v));
  }

  _sync() {
    this._value = this._clamp(this._value);
    const v = this._value;
    this._start.style.flexBasis = `${v}%`;
    this._end.style.flexBasis = `${100 - v}%`;
    this._handle.setAttribute("aria-orientation", this._vertical ? "horizontal" : "vertical");
    this._handle.setAttribute("aria-valuenow", String(Math.round(v)));
  }

  _setValue(v) {
    const next = this._clamp(v);
    if (next === this._value) return;
    this._value = next;
    this._sync();
    this.dispatchEvent(
      new CustomEvent("change", { detail: { value: this._value }, bubbles: true })
    );
  }

  _onPointerDown(e) {
    e.preventDefault();
    this._dragging = true;
    this._handle.setPointerCapture?.(e.pointerId);
    this.setAttribute("data-active", "");
    window.addEventListener("pointermove", this._onPointerMove);
    window.addEventListener("pointerup", this._onPointerUp);
  }

  _onPointerMove(e) {
    if (!this._dragging) return;
    const rect = this._container.getBoundingClientRect();
    const pct = this._vertical
      ? ((e.clientY - rect.top) / rect.height) * 100
      : ((e.clientX - rect.left) / rect.width) * 100;
    this._setValue(pct);
  }

  _onPointerUp(e) {
    if (!this._dragging) return;
    this._dragging = false;
    this._handle.releasePointerCapture?.(e.pointerId);
    this.removeAttribute("data-active");
    window.removeEventListener("pointermove", this._onPointerMove);
    window.removeEventListener("pointerup", this._onPointerUp);
  }

  _onKeyDown(e) {
    const step = e.shiftKey ? 10 : 2;
    let handled = true;
    if (this._vertical) {
      if (e.key === "ArrowUp") this._setValue(this._value - step);
      else if (e.key === "ArrowDown") this._setValue(this._value + step);
      else handled = false;
    } else {
      if (e.key === "ArrowLeft") this._setValue(this._value - step);
      else if (e.key === "ArrowRight") this._setValue(this._value + step);
      else handled = false;
    }
    if (e.key === "Home") this._setValue(this._min);
    else if (e.key === "End") this._setValue(100 - this._min);
    else if (!handled) return;
    e.preventDefault();
  }
}


define("pura-resizable", PuraResizable, meta);
export { PuraResizable };
