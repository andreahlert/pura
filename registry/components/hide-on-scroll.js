// <pura-hide-on-scroll> — the shy navbar: a sticky (or fixed) bar that slides
// out of view when the user scrolls down and reappears as soon as they scroll
// up. Below `threshold` the bar always stays visible; the `shrink` variant
// also condenses the bar (tighter padding plus a shadow) once past the
// threshold. A single passive scroll listener (rAF-throttled) compares the
// previous scroll position and only flips data attributes on the host; the
// pure template's CSS transitions do all the motion.
//
// Attributes:
//   threshold — px of scroll below which the bar never hides (default 80).
//   tolerance — min px of scroll delta before a direction flip counts,
//               a jitter guard (default 8).
//   shrink    — boolean; condense the bar after passing the threshold.
//   position  — "top" (default) | "bottom"; bottom bars slide down to hide.
//   fixed     — boolean; use position:fixed instead of sticky.
//
// Events:
//   hide — the bar started sliding out (bubbles, composed).
//   show — the bar started sliding back in (bubbles, composed).
//
// Tokens: --pura-hide-on-scroll-duration, --pura-hide-on-scroll-ease,
//   --pura-hide-on-scroll-z, --pura-hide-on-scroll-bg,
//   --pura-hide-on-scroll-padding, --pura-hide-on-scroll-shrink-padding,
//   --pura-hide-on-scroll-shrink-shadow.
// Part: bar.
// SSR / pre-JS: the bar renders visible and pinned (plain sticky header).
// Reduced motion: hide/show and shrink become a hard cut, no slide.
//
// Agent-native layer: each instance registers in window.__puraHideOnScrolls by
//   data-pura-id with { show, hide, el }; data-direction mirrors the last
//   scroll direction and data-pura-hos-hidden / data-pura-hos-shrunk /
//   data-pura-hos-threshold mirror state and config.
import { PuraElement, define } from "../base.js";
import meta from "./hide-on-scroll.meta.js";
import { hideOnScrollTemplate } from "./hide-on-scroll.template.js";

let uid = 0;

function registry() {
  return (window.__puraHideOnScrolls ||= new Map());
}

// Nearest scrollable ancestor, so the bar also works inside overflow panels
// (like the docs demo). Falls back to the window.
function findScroller(el) {
  let node = el.parentElement;
  while (node) {
    const { overflowY } = getComputedStyle(node);
    if ((overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight) {
      return node;
    }
    node = node.parentElement;
  }
  return window;
}

class PuraHideOnScroll extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-hide-on-scroll-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = hideOnScrollTemplate(this);
    this.render(html, css);

    this._hidden = false;
    this._shrunk = false;
    this._raf = 0;
    this._scroller = findScroller(this);
    this._lastY = Math.max(0, this._scrollY());

    this._onScroll = () => {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = 0;
        this._update();
      });
    };
    this._scroller.addEventListener("scroll", this._onScroll, { passive: true });

    this.setAttribute("data-pura-hos-threshold", String(this.threshold));
    registry().set(this._id, {
      id: this._id,
      show: () => this.show(),
      hide: () => this.hide(),
      el: this,
    });
  }

  disconnectedCallback() {
    this._scroller?.removeEventListener("scroll", this._onScroll);
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get threshold() {
    const n = parseFloat(this.getAttribute("threshold"));
    return Number.isFinite(n) && n >= 0 ? n : 80;
  }
  get tolerance() {
    const n = parseFloat(this.getAttribute("tolerance"));
    return Number.isFinite(n) && n >= 0 ? n : 8;
  }
  get isHidden() {
    return this._hidden;
  }
  get isShrunk() {
    return this._shrunk;
  }

  // ---- public API -----------------------------------------------------------
  show() {
    this._setHidden(false);
  }

  hide() {
    this._setHidden(true);
  }

  // ---- internals ------------------------------------------------------------
  _scrollY() {
    return this._scroller === window ? window.scrollY : this._scroller.scrollTop;
  }

  _update() {
    // Clamp so rubber-band overscroll never reads as an upward flick.
    const y = Math.max(0, this._scrollY());
    const delta = y - this._lastY;

    if (Math.abs(delta) >= this.tolerance) {
      this.setAttribute("data-direction", delta > 0 ? "down" : "up");
      if (y <= this.threshold || delta < 0) this.show();
      else this.hide();
      this._lastY = y;
    } else if (y <= this.threshold) {
      // Back inside the safe zone: always visible, even on tiny scrolls.
      this.show();
      this._lastY = y;
    }

    this._setShrunk(this.bool("shrink") && y > this.threshold);
  }

  _setHidden(hidden) {
    if (hidden === this._hidden) return;
    this._hidden = hidden;
    this.toggleAttribute("data-pura-hos-hidden", hidden);
    this.dispatchEvent(
      new CustomEvent(hidden ? "hide" : "show", { bubbles: true, composed: true })
    );
  }

  _setShrunk(shrunk) {
    if (shrunk === this._shrunk) return;
    this._shrunk = shrunk;
    this.toggleAttribute("data-pura-hos-shrunk", shrunk);
  }
}

define("pura-hide-on-scroll", PuraHideOnScroll, meta);
export { PuraHideOnScroll };
