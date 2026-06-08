// <pura-parallax>. A scroll parallax container. Slotted content moves at a
// different speed than the page scroll to create a sense of depth. The whole
// default slot is translated by the host `speed` factor; individual children
// carrying a `data-speed` attribute move at their own factor instead, so several
// layers can be composed. The effect is rAF throttled and only runs while the
// viewport is on screen (IntersectionObserver). prefers-reduced-motion disables
// it. An optional `image` attribute renders a parallaxed background image layer.
//
// Attributes:
//   speed   parallax factor for the default content (0.5 = half scroll speed,
//           negative moves the opposite way). Default 0.5.
//   axis    "y" (default) or "x".
//   image   optional background image URL for a built-in background layer.
//
// Children:
//   data-speed   per-child factor overriding the host speed for that element.
//
// Parts: viewport, layer
import { PuraElement, define } from "../base.js";
import meta from "./parallax.meta.js";
import { parallaxTemplate } from "./parallax.template.js";

class PuraParallax extends PuraElement {
  static observedAttributes = ["speed", "axis", "image"];

  connectedCallback() {
    const image = this.getAttribute("image");
    const { html, css } = parallaxTemplate(this);
    this.render(html, css);

    this._viewport = this.$(".viewport");
    this._content = this.$(".content");
    this._bg = this.$(".bg");
    if (this._bg && image) this._bg.style.backgroundImage = `url("${image}")`;

    this._reduced = matchMedia("(prefers-reduced-motion: reduce)");
    this._inView = false;
    this._ticking = false;
    this._raf = 0;

    this._onScroll = () => this._schedule();
    this._onResize = () => this._schedule();

    // Only animate while the viewport intersects the screen.
    this._io = new IntersectionObserver((entries) => {
      for (const entry of entries) this._inView = entry.isIntersecting;
      if (this._inView) this._schedule();
    });
    this._io.observe(this);

    window.addEventListener("scroll", this._onScroll, { passive: true });
    window.addEventListener("resize", this._onResize, { passive: true });

    // Apply an initial frame.
    this._schedule();
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this._onScroll);
    window.removeEventListener("resize", this._onResize);
    this._io?.disconnect();
    this._io = null;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._viewport) return;
    if (name === "image") {
      // Rebuild so the background layer appears/disappears with the attribute.
      // Tear down current listeners/observer/rAF first to avoid orphaning them.
      this.disconnectedCallback();
      this.connectedCallback();
      return;
    }
    if (name === "speed" && this._bg) this._bg.dataset.speed = String(this._num(val, 0.5));
    this._schedule();
  }

  _schedule() {
    if (this._reduced?.matches) {
      // Reduced motion: keep everything in its natural place.
      this._reset();
      return;
    }
    if (!this._inView || this._ticking) return;
    this._ticking = true;
    this._raf = requestAnimationFrame(() => {
      this._ticking = false;
      this._apply();
    });
  }

  _apply() {
    const axis = (this.getAttribute("axis") || "y").toLowerCase() === "x" ? "x" : "y";
    const speed = this._num(this.getAttribute("speed"), 0.5);

    // Progress of the element through the viewport, centered. Positive when the
    // element sits above center, negative below. Range roughly [-1, 1].
    const rect = this.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const center = rect.top + rect.height / 2;
    const progress = (vh / 2 - center) / vh;
    const base = progress * vh;

    // Default content layer (skipped when it carries its own per-child layers
    // only; the content wrapper itself moves at the host speed).
    this._translate(this._content, base * speed, axis);
    if (this._bg) this._translate(this._bg, base * this._num(this._bg.dataset.speed, speed), axis);

    // Per-child overrides via data-speed. These children are slotted inside the
    // .content wrapper, which is already moved by base*speed, so compensate so
    // the child's net movement equals its own factor (base*f).
    for (const child of this.children) {
      if (child.hasAttribute && child.hasAttribute("data-speed")) {
        const f = this._num(child.getAttribute("data-speed"), speed);
        this._translate(child, base * f - base * speed, axis);
      }
    }
  }

  _translate(el, px, axis) {
    if (!el) return;
    el.style.transform = axis === "x" ? `translateX(${px}px)` : `translateY(${px}px)`;
  }

  _reset() {
    this._translate(this._content, 0, "y");
    if (this._bg) this._bg.style.transform = "none";
    for (const child of this.children) {
      if (child.style) child.style.transform = "none";
    }
  }

  _num(v, fallback) {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : fallback;
  }
}


define("pura-parallax", PuraParallax, meta);
export { PuraParallax };
