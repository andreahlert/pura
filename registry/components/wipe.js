// <pura-wipe> — page-transition wipe. A full-viewport panel sweeps across the
// screen: in (covers the page), hold, out (exits on the far side). Call play()
// and swap your content in the "cover" event, while the screen is hidden — the
// classic awwwards route-change move. Each phase is one CSS transform
// transition; the element only sequences timeouts.
//
// Attributes:
//   direction — "left" (default) | "right" | "up" | "down": the side the panel
//               enters from (it exits on the opposite side).
//   duration  — ms per sweep phase, in and out (default 600).
//   hold      — ms the panel stays fully covering (default 100).
//
// Slot: optional content shown centered on the panel (a logo, a word).
//
// Events:
//   cover — the screen is fully covered: swap your content now.
//   done  — the panel has finished leaving.
//
// Tokens: --pura-wipe-color (default --pura-fg), --pura-wipe-dur,
//   --pura-wipe-ease, --pura-wipe-z.
// Reduced motion: the panel snaps instead of sweeping; events still fire on
//   the same clock so content swaps keep working.
//
// Agent-native layer: each instance registers in window.__puraWipes by
//   data-pura-id with { direction, play, el }.
import { PuraElement, define } from "../base.js";
import meta from "./wipe.meta.js";
import { wipeTemplate, wipeDirection } from "./wipe.template.js";

let uid = 0;

function registry() {
  return (window.__puraWipes ||= new Map());
}

class PuraWipe extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-wipe-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = wipeTemplate(this);
    this.render(html, css);

    this.style.setProperty("--pura-wipe-dur", `${this.duration}ms`);
    this.setAttribute("data-pura-wipe-direction", wipeDirection(this));
    registry().set(this._id, {
      id: this._id,
      direction: wipeDirection(this),
      play: () => this.play(),
      el: this,
    });
  }

  disconnectedCallback() {
    this._clear();
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 600;
  }
  get hold() {
    const n = parseFloat(this.getAttribute("hold"));
    return Number.isFinite(n) && n >= 0 ? n : 100;
  }

  // ---- public API -----------------------------------------------------------
  // Sweep in -> "cover" -> hold -> sweep out -> "done". Returns a promise that
  // resolves with the screen fully covered (handy for awaiting a swap).
  play() {
    if (this._timers?.length) return Promise.resolve(); // already running
    this._timers = [];
    this.setAttribute("data-pura-wipe-phase", "in");

    return new Promise((resolve) => {
      this._timers.push(setTimeout(() => {
        this.setAttribute("data-pura-wipe-phase", "hold");
        this.dispatchEvent(new CustomEvent("cover", { bubbles: true, composed: true }));
        resolve();

        this._timers.push(setTimeout(() => {
          this.setAttribute("data-pura-wipe-phase", "out");

          this._timers.push(setTimeout(() => {
            this.setAttribute("data-pura-wipe-phase", "idle");
            this._timers = [];
            this.dispatchEvent(new CustomEvent("done", { bubbles: true, composed: true }));
          }, this.duration));
        }, this.hold));
      }, this.duration));
    });
  }

  // ---- internals ------------------------------------------------------------
  _clear() {
    for (const t of this._timers || []) clearTimeout(t);
    this._timers = [];
  }
}

define("pura-wipe", PuraWipe, meta);
export { PuraWipe };
