// <pura-pin> — ScrollTrigger pin. A section that pins (position: sticky) while you
// scroll past it, and scrubs its panels horizontally as it stays pinned, the gsap
// horizontal-scroll move done with native scroll-driven animations: a view-timeline
// on the outer drives a `translateX` keyframe on the track. No IntersectionObserver,
// no scroll listener, no per-frame JS.
//
// Each slotted child is one full-viewport panel. The number of panels sets the
// scroll length (--pura-pin-count -> outer height) and the horizontal travel maps
// progress 0..1 to translateX(0 .. -(n-1) * 100vw).
//
// Where scroll timelines are unsupported (or reduced motion is on) the panels fall
// back to a snap-scrollable horizontal row, fully usable. SSR-safe: pure template.
//
// Parts: outer (scroll length), sticky (pinned viewport), track (the moving row).
// Agent-native layer: each instance registers in window.__puraPins by data-pura-id
//   with { panels, native, el }; data-pura-pin-* mirror the resolved config.
import { PuraElement, define } from "../base.js";
import meta from "./pin.meta.js";
import { pinTemplate } from "./pin.template.js";

let uid = 0;

function registry() {
  return (window.__puraPins ||= new Map());
}

class PuraPin extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-pin-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = pinTemplate(this);
    this.render(html, css);

    this._native =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("animation-timeline: scroll()");

    if (typeof MutationObserver !== "undefined") {
      this._mo = new MutationObserver(() => this._sync());
      this._mo.observe(this, { childList: true });
    }

    this._sync();
  }

  disconnectedCallback() {
    this._mo?.disconnect();
    this._mo = null;
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  get panels() {
    return this.children.length;
  }
  get native() {
    return !!this._native;
  }

  _sync() {
    const n = Math.max(1, this.panels);
    this.style.setProperty("--pura-pin-count", String(n));
    this.setAttribute("data-pura-pin-panels", String(n));
    this.setAttribute("data-pura-pin-native", this.native ? "true" : "false");
    registry().set(this._id, { id: this._id, panels: n, native: this.native, el: this });
  }
}

define("pura-pin", PuraPin, meta);
export { PuraPin };
