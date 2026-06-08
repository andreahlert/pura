// <pura-swipe> swipeable container.
//   Pointer/touch drag on slotted content. Once past the threshold a "swipe"
//   event (bubbles) is dispatched with detail {direction, distance}.
//     direction: "left" | "right" | "up" | "down"
//     distance:  absolute px travelled along the axis
//   Optional action panels revealed as the content drags (swipe-to-delete):
//   slots name="left-action" / name="right-action" snap open/closed.
//   Attributes:
//     direction (horizontal | vertical)  → drag axis (default: horizontal)
//     threshold (px)                      → trigger / snap distance (default 64)
//   Parts: content, action.
import { PuraElement, define } from "../base.js";
import meta from "./swipe.meta.js";
import { swipeTemplate } from "./swipe.template.js";

class PuraSwipe extends PuraElement {
  static observedAttributes = ["direction", "threshold"];

  connectedCallback() {
    const { html, css } = swipeTemplate(this);
    this.render(html, css);
    this._content = this.$(".content");
    this._track = this.$(".track");

    this._active = false;
    this._startX = 0;
    this._startY = 0;
    this._offset = 0; // current snapped offset (horizontal action reveal)
    this._delta = 0;

    this._onDown = (e) => this._down(e);
    this._onMove = (e) => this._move(e);
    this._onUp = (e) => this._up(e);
    this._content.addEventListener("pointerdown", this._onDown);
    this._content.addEventListener("pointermove", this._onMove);
    this._content.addEventListener("pointerup", this._onUp);
    this._content.addEventListener("pointercancel", this._onUp);

    this._sync();
  }

  disconnectedCallback() {
    this._content?.removeEventListener("pointerdown", this._onDown);
    this._content?.removeEventListener("pointermove", this._onMove);
    this._content?.removeEventListener("pointerup", this._onUp);
    this._content?.removeEventListener("pointercancel", this._onUp);
  }

  attributeChangedCallback() {
    if (this._content) this._sync();
  }

  get _vertical() {
    return this.getAttribute("direction") === "vertical";
  }

  _threshold() {
    return parseInt(this.getAttribute("threshold"), 10) || 64;
  }

  _sync() {
    // touch-action lets the cross-axis page scroll survive.
    this._content.style.touchAction = this._vertical ? "pan-x" : "pan-y";
    this._snap(this._offset);
  }

  _down(e) {
    this._active = true;
    this._startX = e.clientX;
    this._startY = e.clientY;
    this._delta = 0;
    this._content.setPointerCapture?.(e.pointerId);
    this._content.style.transition = "none";
  }

  _move(e) {
    if (!this._active) return;
    const axis = this._vertical ? e.clientY - this._startY : e.clientX - this._startX;
    this._delta = axis;
    e.preventDefault();
    this._translate(this._offset + axis);
  }

  _up() {
    if (!this._active) return;
    this._active = false;
    this._content.style.removeProperty("transition");

    const thr = this._threshold();
    const d = this._delta;
    const abs = Math.abs(d);

    if (abs >= thr) {
      const direction = this._vertical
        ? d < 0 ? "up" : "down"
        : d < 0 ? "left" : "right";
      this.dispatchEvent(
        new CustomEvent("swipe", { bubbles: true, detail: { direction, distance: abs } })
      );
      // Snap a horizontal action panel open, if one exists; else snap back.
      if (!this._vertical && this._hasAction(direction)) {
        this._offset = direction === "left" ? -thr : thr;
      } else {
        this._offset = 0;
      }
    } else {
      this._offset = 0;
    }
    this._snap(this._offset);
  }

  _hasAction(direction) {
    // Swiping left reveals the right action panel, and vice versa.
    const name = direction === "left" ? "right-action" : "left-action";
    return this.querySelector(`[slot="${name}"]`) != null;
  }

  _translate(px) {
    if (this._vertical) this._content.style.transform = `translateY(${px}px)`;
    else this._content.style.transform = `translateX(${px}px)`;
  }

  _snap(px) {
    this._translate(px);
  }
}


define("pura-swipe", PuraSwipe, meta);
export { PuraSwipe };
