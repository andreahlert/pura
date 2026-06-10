// <pura-coverflow> — coverflow carousel: a horizontal scroll-snap row where
// the side slides rotate, scale and recede in 3D perspective around the
// centered slide. Each slotted slide is tied 1:1 to its own inline view
// progress (animation-timeline: view(inline)), so the 3D pose updates live
// while dragging with zero per-frame JS. Prev/next/seek API plus Left/Right
// keys when the viewport is focused; "change" fires with the active index.
//
// Attributes:
//   rotate      — side slide rotateY angle in degrees (default 45).
//   scale       — side slide scale 0.1..1 (default 0.85).
//   depth       — side slide translateZ push-back in px (default 120).
//   perspective — viewport perspective in px (default 1000).
//   label       — accessible label for the carousel (default "Coverflow").
//
// Tokens: --pura-coverflow-slide (slide width, default 62%),
//   --pura-coverflow-gap (default 0.75rem), --pura-coverflow-pad (block
//   padding, default 0.75rem), plus attribute-backed --pura-coverflow-rotate/
//   scale/depth/perspective.
//
// SSR / pre-JS, unsupported browsers and reduced motion: a flat scroll-snap
// carousel, fully usable, no 3D pose.
//
// Agent-native layer: each instance registers in window.__puraCoverflows by
//   data-pura-id with { seek, next, prev, el }; data-pura-cf-* mirror config
//   and active state (index, count).
import { PuraElement, define } from "../base.js";
import meta from "./coverflow.meta.js";
import { coverflowTemplate, coverflowConfig } from "./coverflow.template.js";

let uid = 0;

function registry() {
  return (window.__puraCoverflows ||= new Map());
}

class PuraCoverflow extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-coverflow-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = coverflowTemplate(this);
    this.render(html, css);

    this._viewport = this.$(".viewport");
    this._slot = this.$("slot");
    this._slides = [];
    this._index = 0;

    this._viewport.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); this.prev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); this.next(); }
    });

    // Recompute slide bookkeeping when light-DOM children change.
    this._slot.addEventListener("slotchange", () => this._refresh());

    // Track the most-visible slide as the user scrolls/snaps/drags.
    if (typeof IntersectionObserver !== "undefined") {
      this._io = new IntersectionObserver(
        (entries) => {
          let best = null;
          for (const en of entries) {
            if (!best || en.intersectionRatio > best.intersectionRatio) best = en;
          }
          if (best && best.intersectionRatio > 0.5) {
            const i = this._slides.indexOf(best.target);
            if (i >= 0 && i !== this._index) this._setIndex(i);
          }
        },
        { root: this._viewport, threshold: [0.25, 0.5, 0.75, 1] }
      );
    }

    const { rotate, scale, depth } = coverflowConfig(this);
    this.setAttribute("data-pura-cf-rotate", String(rotate));
    this.setAttribute("data-pura-cf-scale", String(scale));
    this.setAttribute("data-pura-cf-depth", String(depth));

    this._refresh();

    registry().set(this._id, {
      id: this._id,
      seek: (i) => this.seek(i),
      next: () => this.next(),
      prev: () => this.prev(),
      el: this,
    });
  }

  disconnectedCallback() {
    this._io?.disconnect();
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- public API -----------------------------------------------------------
  get index() { return this._index; }
  get slideCount() { return this._slides.length; }

  seek(i) {
    const n = this._slides.length;
    if (n === 0) return;
    i = Math.max(0, Math.min(n - 1, i));
    this._setIndex(i);
    this._scrollTo(i);
  }

  next() { this.seek(this._index + 1); }
  prev() { this.seek(this._index - 1); }

  // ---- internals ------------------------------------------------------------
  _refresh() {
    this._io?.disconnect();
    this._slides = this._slot.assignedElements({ flatten: true });

    this._slides.forEach((el, i) => {
      el.setAttribute("part", "slide");
      el.setAttribute("role", "group");
      el.setAttribute("aria-roledescription", "slide");
      el.setAttribute("aria-label", `${i + 1} / ${this._slides.length}`);
      this._io?.observe(el);
    });

    this.setAttribute("data-pura-cf-count", String(this._slides.length));
    this._index = Math.min(this._index, Math.max(0, this._slides.length - 1));
    this._setIndex(this._index);
  }

  _setIndex(i) {
    this._index = i;
    this.setAttribute("data-pura-cf-index", String(i));
    this._slides.forEach((el, j) => {
      el.toggleAttribute("data-pura-cf-active", j === i);
    });
    this.dispatchEvent(
      new CustomEvent("change", { detail: { index: i }, bubbles: true })
    );
  }

  // Scroll a slide to the center of the viewport (snap settles the rest).
  _scrollTo(i) {
    const el = this._slides[i];
    if (!el) return;
    const left =
      el.offsetLeft - this._viewport.offsetLeft -
      (this._viewport.clientWidth - el.offsetWidth) / 2;
    this._viewport.scrollTo({ left, behavior: "smooth" });
  }
}

define("pura-coverflow", PuraCoverflow, meta);
export { PuraCoverflow };
