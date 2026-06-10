// <pura-smooth-scroll> — the awwwards-signature smoothed page scroll (Lenis /
// GSAP ScrollSmoother / Locomotive style): wrap the page content and wheel,
// touch and scrollbar input become fluid movement with inertia via lerp.
// Progressive enhancement is the whole trick: SSR renders the children in
// normal flow with native scroll intact; on connect the content becomes a
// fixed, transform-driven layer, a spacer keeps the document at the real
// height (native scrollbar preserved), and a rAF loop lerps a translate
// toward window.scrollY. No wheel hijacking, no synthetic scroll events:
// keyboard scrolling, the scrollbar and assistive tech keep working.
//
// Attributes:
//   lerp       — interpolation factor per frame at 60fps, 0..1 (default 0.1).
//                Lower is floatier; 1 follows the scrollbar exactly.
//   horizontal — map the vertical scrollbar/wheel to horizontal movement.
//   duration   — default scrollTo() duration in ms (default 1000).
//   offset     — default scrollTo() pixel offset (default 0; negative stops
//                short of the target, e.g. for a fixed header).
//   disabled   — keep native scrolling. Toggle at runtime to stop/start.
//
// Public API: scrollTo(target, { offset, duration, easing }) — target is a
//   pixel number, a CSS selector or an element; easing is fn(t 0..1) -> 0..1
//   (default easeOutExpo). scrollPosition getter reads the smoothed value.
//
// Events:
//   pura-smooth-scroll — each animation frame while moving (bubbles, composed)
//     with { scroll, targetScroll, velocity, progress }.
//
// Tokens: --pura-smooth-scroll-width, --pura-smooth-scroll-z,
//   --pura-smooth-scroll-min-height. Parts: spacer, content.
// Reduced motion: never activates (JS checks the media query, and the template
//   CSS forces the static in-flow layout under prefers-reduced-motion: reduce).
//
// Agent-native layer: each instance registers in window.__puraSmoothScrolls by
//   data-pura-id with { lerp, horizontal, scrollTo, el }; data-pura-ss-*
//   attributes mirror config (lerp, horizontal, active) and live progress.
import { PuraElement, define } from "../base.js";
import meta from "./smooth-scroll.meta.js";
import { smoothScrollTemplate } from "./smooth-scroll.template.js";

let uid = 0;

// Lazily-created global registry: data-pura-id -> { id, lerp, horizontal, scrollTo, el }.
function registry() {
  return (window.__puraSmoothScrolls ||= new Map());
}

function reducedMotion() {
  return !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

class PuraSmoothScroll extends PuraElement {
  static observedAttributes = ["disabled"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-smooth-scroll-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = smoothScrollTemplate(this);
    this.render(html, css);
    this._content = this.$(".content");
    this._spacer = this.$(".spacer");

    this._active = false;
    this._running = false;
    this._raf = 0;
    this._toRaf = 0;
    this._current = 0; // smoothed scroll value (px)
    this._top = 0; // document offset of the host, so mid-page wraps line up
    this._max = 0; // scrollable range of the wrapped content (px)
    this._last = 0;
    this._onScroll = () => this._wake();
    this._onResize = () => {
      this._measure();
      this._wake();
    };

    // Agent-native config mirror.
    this.setAttribute("data-pura-ss-lerp", String(this.lerp));
    if (this.bool("horizontal")) this.setAttribute("data-pura-ss-horizontal", "");

    registry().set(this._id, {
      id: this._id,
      lerp: this.lerp,
      horizontal: this.bool("horizontal"),
      scrollTo: (target, opts) => this.scrollTo(target, opts),
      el: this,
    });

    if (!this.bool("disabled")) this._activate();
  }

  disconnectedCallback() {
    this._deactivate();
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (name !== "disabled" || !this._content) return;
    if (this.bool("disabled")) this._deactivate();
    else this._activate();
  }

  // ---- config ---------------------------------------------------------------
  get lerp() {
    const n = parseFloat(this.getAttribute("lerp"));
    return Number.isFinite(n) && n > 0 && n <= 1 ? n : 0.1;
  }
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 1000;
  }
  get offset() {
    const n = parseFloat(this.getAttribute("offset"));
    return Number.isFinite(n) ? n : 0;
  }
  // Current smoothed scroll value in px (falls back to the native position).
  get scrollPosition() {
    return this._active ? this._current : window.scrollY || 0;
  }

  // ---- public API -----------------------------------------------------------
  // Programmatic scroll with easing. Animates the native scroll position so
  // the scrollbar follows; the lerp loop adds its inertia on top. Falls back
  // to an instant jump when inactive or under reduced motion.
  scrollTo(target, opts) {
    const o = opts && typeof opts === "object" ? opts : {};
    const base = this._resolve(target);
    if (base == null) return;
    const off = Number.isFinite(o.offset) ? o.offset : this.offset;
    const doc = document.documentElement;
    const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
    const to = Math.max(0, Math.min(base + off, maxScroll));
    cancelAnimationFrame(this._toRaf);
    if (!this._active || reducedMotion()) {
      window.scrollTo(0, to);
      return;
    }
    const from = window.scrollY || 0;
    const dur = Number.isFinite(o.duration) && o.duration > 0 ? o.duration : this.duration;
    const ease =
      typeof o.easing === "function"
        ? o.easing
        : (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)); // easeOutExpo
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      window.scrollTo(0, from + (to - from) * ease(p));
      if (p < 1) this._toRaf = requestAnimationFrame(step);
    };
    this._toRaf = requestAnimationFrame(step);
  }

  // ---- internals ------------------------------------------------------------
  _activate() {
    if (this._active || reducedMotion()) return;
    this._active = true;
    this.setAttribute("data-pura-ss-active", "");
    this._current = window.scrollY || 0;
    this._measure();
    this._apply(this._current);
    this._ro =
      typeof ResizeObserver === "function"
        ? new ResizeObserver(() => {
            this._measure();
            this._wake();
          })
        : null;
    this._ro?.observe(this._content);
    window.addEventListener("scroll", this._onScroll, { passive: true });
    window.addEventListener("resize", this._onResize, { passive: true });
    this._wake();
  }

  _deactivate() {
    cancelAnimationFrame(this._toRaf);
    if (!this._active) return;
    this._active = false;
    this._running = false;
    cancelAnimationFrame(this._raf);
    this._ro?.disconnect();
    this._ro = null;
    window.removeEventListener("scroll", this._onScroll);
    window.removeEventListener("resize", this._onResize);
    this.removeAttribute("data-pura-ss-active");
    this._content.style.transform = "";
    this._spacer.style.height = "";
  }

  // Size the spacer to the real content so the native scrollbar keeps the
  // document's true range, and record the host's document offset.
  _measure() {
    if (!this._active) return;
    const rect = this._spacer.getBoundingClientRect();
    this._top = Math.round(rect.top + (window.scrollY || 0));
    if (this.bool("horizontal")) {
      const w = Math.ceil(this._content.scrollWidth);
      this._max = Math.max(0, w - window.innerWidth);
      this._spacer.style.height = `${this._max + window.innerHeight}px`;
    } else {
      const h = Math.ceil(this._content.getBoundingClientRect().height);
      this._max = Math.max(0, h - window.innerHeight);
      this._spacer.style.height = `${h}px`;
    }
  }

  _apply(v) {
    this._content.style.transform = this.bool("horizontal")
      ? `translate3d(${-v}px, ${this._top}px, 0)`
      : `translate3d(0, ${this._top - v}px, 0)`;
  }

  // Run the rAF loop only while there is distance to cover; idle otherwise.
  _wake() {
    if (!this._active || this._running) return;
    this._running = true;
    this._last = performance.now();
    this._raf = requestAnimationFrame((t) => this._frame(t));
  }

  _frame(now) {
    if (!this._active) {
      this._running = false;
      return;
    }
    const dt = Math.min(0.064, Math.max(0.001, (now - this._last) / 1000));
    this._last = now;
    const targetScroll = window.scrollY || 0;
    // Frame-rate independent lerp: `lerp` is the per-frame factor at 60fps.
    const k = 1 - Math.pow(1 - this.lerp, dt * 60);
    const prev = this._current;
    this._current += (targetScroll - this._current) * k;
    if (Math.abs(targetScroll - this._current) < 0.05) this._current = targetScroll;
    this._apply(this._current);

    const velocity = (this._current - prev) / dt; // px/s
    const progress =
      this._max > 0 ? Math.max(0, Math.min(1, (this._current - this._top) / this._max)) : 0;
    const p = progress.toFixed(3);
    if (this.getAttribute("data-pura-ss-progress") !== p) {
      this.setAttribute("data-pura-ss-progress", p);
    }
    this.dispatchEvent(
      new CustomEvent("pura-smooth-scroll", {
        bubbles: true,
        composed: true,
        detail: { scroll: this._current, targetScroll, velocity, progress },
      })
    );

    if (this._current === targetScroll) {
      this._running = false;
      return;
    }
    this._raf = requestAnimationFrame((t) => this._frame(t));
  }

  // Resolve a scrollTo target (number | selector | element) to a document
  // scroll value along the active axis, compensating for the live transform.
  _resolve(target) {
    if (typeof target === "number" && Number.isFinite(target)) return target;
    let node = target;
    if (typeof target === "string") {
      try {
        node = document.querySelector(target);
      } catch {
        node = null;
      }
    }
    if (!node || typeof node.getBoundingClientRect !== "function") return null;
    const rect = node.getBoundingClientRect();
    if (this.bool("horizontal")) {
      return this._active ? rect.left + this._current : rect.left + (window.scrollX || 0);
    }
    return this._active ? rect.top + this._current : rect.top + (window.scrollY || 0);
  }
}

define("pura-smooth-scroll", PuraSmoothScroll, meta);
export { PuraSmoothScroll };
