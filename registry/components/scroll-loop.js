// <pura-scroll-loop> — infinite looping scroll: when the user reaches the end
// of the content the scroll wraps around and continues from the start with no
// visible seam, the circular-gallery pattern of awwwards portfolios (Lenis
// "infinite", Locomotive Scroll infinite mode). Unlike <pura-infinite-scroll>,
// nothing is loaded: the same content repeats forever.
//
// How: the slotted content is cloned once into an aria-hidden head clone and
// once into a tail clone (head | original | tail). The scroll offset is kept
// inside the original copy: crossing a seam repositions scrollTop/scrollLeft
// by exactly one copy-length, which lands on identical pixels, so the jump is
// imperceptible. No per-frame work; only a passive scroll handler.
//
// Attributes:
//   axis     — "y" (default) | "x". Scroll axis of the loop.
//   disabled — turn the loop off; content scrolls normally and ends.
//   label    — accessible name of the scroll region (default "Looping scroll gallery").
//
// Events:
//   loop — fired each time the scroll wraps; detail: { direction: "forward" | "backward" }.
//
// Tokens: --pura-scroll-loop-height (default 24rem), --pura-scroll-loop-radius,
//   --pura-scroll-loop-overscroll (default contain), --pura-scroll-loop-ring.
// SSR / pre-JS: clones are empty and hidden; a single copy scrolls normally.
// Reduced motion: the loop never activates (an endless scroller is
//   disorienting); the single-copy fallback with a finite end is kept.
// Accessibility: clones are aria-hidden and inert; the viewport is a labelled,
//   keyboard-focusable region so arrow keys scroll it.
//
// Agent-native layer: each instance registers in window.__puraScrollLoops by
//   data-pura-id with { el, refresh, scrollToStart }; data-pura-loop-active,
//   data-pura-loop-axis and data-pura-loop-count mirror live state.
import { PuraElement, define } from "../base.js";
import meta from "./scroll-loop.meta.js";
import { scrollLoopTemplate } from "./scroll-loop.template.js";

let uid = 0;

function registry() {
  return (window.__puraScrollLoops ||= new Map());
}

class PuraScrollLoop extends PuraElement {
  static observedAttributes = ["disabled", "axis"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-scroll-loop-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = scrollLoopTemplate(this);
    this.render(html, css);

    this._viewport = this.$(".viewport");
    this._original = this.$(".original");
    this._head = this.$(".clone-head");
    this._tail = this.$(".clone-tail");
    this._slot = this.$("slot");
    this._size = 0; // measured length of one copy along the scroll axis
    this._wraps = 0;
    this.setAttribute("data-pura-loop-count", "0");

    // Clones must never receive focus or AT exposure.
    this._head.inert = true;
    this._tail.inert = true;

    this._onScroll = () => this._wrap();
    this._viewport.addEventListener("scroll", this._onScroll, { passive: true });
    this._slot.addEventListener("slotchange", () => {
      this._syncClones();
      this._refresh();
    });

    this._reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    this._onMotion = () => this._refresh();
    this._reduce?.addEventListener?.("change", this._onMotion);

    // Re-measure when content size changes (late images, responsive layout).
    this._ro = typeof ResizeObserver === "function"
      ? new ResizeObserver(() => this._refresh())
      : null;
    this._ro?.observe(this._original);
    this._ro?.observe(this._viewport);

    this._syncClones();
    requestAnimationFrame(() => this._refresh());

    registry().set(this._id, {
      id: this._id,
      el: this,
      refresh: () => this._refresh(),
      scrollToStart: () => this.scrollToStart(),
    });
  }

  disconnectedCallback() {
    this._ro?.disconnect();
    this._reduce?.removeEventListener?.("change", this._onMotion);
    this._viewport?.removeEventListener("scroll", this._onScroll);
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this._viewport) this._refresh();
  }

  // ---- config ---------------------------------------------------------------
  get axis() {
    return this.getAttribute("axis") === "x" ? "x" : "y";
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  get active() {
    return this.hasAttribute("data-pura-loop-active");
  }

  // ---- public API -----------------------------------------------------------
  // Jump to the logical start of the content (top of the original copy).
  scrollToStart() {
    const pos = this.active ? this._size : 0;
    if (this.axis === "x") this._viewport.scrollLeft = pos;
    else this._viewport.scrollTop = pos;
  }

  // ---- internals ------------------------------------------------------------
  // Mirror the real slotted nodes into both clones so the loop is seamless.
  _syncClones() {
    this._head.replaceChildren();
    this._tail.replaceChildren();
    for (const node of this._slot.assignedNodes({ flatten: true })) {
      this._head.appendChild(node.cloneNode(true));
      this._tail.appendChild(node.cloneNode(true));
    }
  }

  // Measure, decide whether the loop can run, and park the scroll offset
  // inside the original copy while preserving the current visual position.
  _refresh() {
    const horizontal = this.axis === "x";
    const vp = this._viewport;
    const size = horizontal ? this._original.offsetWidth : this._original.offsetHeight;
    const view = horizontal ? vp.clientWidth : vp.clientHeight;
    const reduce = !!this._reduce?.matches;
    const wasActive = this.active;

    this.setAttribute("data-pura-loop-axis", horizontal ? "x" : "y");

    // The loop only makes sense when one copy overflows the viewport.
    const canLoop =
      !this.disabled && !reduce && size > view + 1 && this._head.childNodes.length > 0;

    if (!canLoop) {
      this.removeAttribute("data-pura-loop-active");
      this._size = 0;
      return;
    }

    const pos = horizontal ? vp.scrollLeft : vp.scrollTop;
    const base = wasActive && this._size > 0 ? this._size : 0;
    const offset = (((pos - base) % size) + size) % size;

    this.setAttribute("data-pura-loop-active", "");
    this._size = size;
    const next = size + offset;
    if (horizontal) vp.scrollLeft = next;
    else vp.scrollTop = next;
  }

  // Keep the offset within [size, 2*size): crossing a seam moves it by exactly
  // one copy-length, which shows identical pixels, so the jump is invisible.
  _wrap() {
    if (!this.active) return;
    const size = this._size;
    if (size <= 0) return;
    const horizontal = this.axis === "x";
    const vp = this._viewport;
    const pos = horizontal ? vp.scrollLeft : vp.scrollTop;

    let direction = null;
    let next = pos;
    if (pos >= 2 * size) {
      next = pos - size;
      direction = "forward";
    } else if (pos < size) {
      next = pos + size;
      direction = "backward";
    }
    if (!direction) return;

    if (horizontal) vp.scrollLeft = next;
    else vp.scrollTop = next;

    this._wraps++;
    this.setAttribute("data-pura-loop-count", String(this._wraps));
    this.dispatchEvent(
      new CustomEvent("loop", { bubbles: true, composed: true, detail: { direction } })
    );
  }
}

define("pura-scroll-loop", PuraScrollLoop, meta);
export { PuraScrollLoop };
