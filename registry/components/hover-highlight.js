// <pura-hover-highlight> — a single highlight rectangle that slides and
// resizes smoothly from one item to another as hover moves (Vercel docs
// style), for lists, menus and card grids. The highlight lives in the shadow
// root behind the slotted items; each move is a FLIP step (measure the
// highlight's current rect, snap inline styles to the hovered item's rect,
// animate between the two with WAAPI). On leave it fades out in place.
//
// Attributes:
//   selector — CSS selector for the hoverable items inside the slot
//              (default: the direct slotted children).
//   duration — slide/resize time in ms (default 300).
//   padding  — px outset of the highlight around the item rect (default 0,
//              negative values inset).
//   easing   — easing for the slide (default "cubic-bezier(0.22, 1, 0.36, 1)").
//
// Events:
//   highlight — the highlight moved to an item; detail { index, item }.
//   clear     — pointer/focus left the items; the highlight faded out.
//
// Keyboard: focus moving through the items drives the highlight too (focusin/
//   focusout), so keyboard users get the same affordance as hover.
// Tokens: --pura-hover-highlight-bg, --pura-hover-highlight-radius,
//   --pura-hover-highlight-fade.
// SSR / pre-JS: the items render with no highlight (the final static state).
// Reduced motion: the highlight jumps instantly between items, no slide.
//
// Agent-native layer: each instance registers in window.__puraHoverHighlights
//   by data-pura-id with { highlight(index), clear, el }; data-pura-hh-active
//   mirrors the active item index, data-pura-hh-duration the configured time.
import { PuraElement, define } from "../base.js";
import meta from "./hover-highlight.meta.js";
import { hoverHighlightTemplate } from "./hover-highlight.template.js";

let uid = 0;

function registry() {
  return (window.__puraHoverHighlights ||= new Map());
}

class PuraHoverHighlight extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-hover-highlight-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = hoverHighlightTemplate(this);
    this.render(html, css);

    this._hl = this.$(".highlight");
    this._active = null;
    this._bind();
    this.setAttribute("data-pura-hh-duration", String(this.duration));

    registry().set(this._id, {
      id: this._id,
      highlight: (i) => {
        const item = this.items[i];
        if (item) this.highlight(item);
      },
      clear: () => this.clear(),
      el: this,
    });
  }

  disconnectedCallback() {
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 300;
  }
  get padding() {
    const n = parseFloat(this.getAttribute("padding"));
    return Number.isFinite(n) ? n : 0;
  }
  get easing() {
    return this.getAttribute("easing") || "cubic-bezier(0.22, 1, 0.36, 1)";
  }
  // The hoverable items: selector matches inside the slotted content; without
  // one, the direct light-DOM children are the items.
  get items() {
    const sel = this.getAttribute("selector");
    return sel ? [...this.querySelectorAll(sel)] : [...this.children];
  }

  // ---- public API -----------------------------------------------------------
  // Slide (or, first time, fade in) the highlight to cover the given item.
  highlight(item) {
    if (!item || item === this._active) return;
    const host = this.getBoundingClientRect();
    const rect = item.getBoundingClientRect();
    const pad = this.padding;
    const to = {
      top: rect.top - host.top - pad,
      left: rect.left - host.left - pad,
      width: rect.width + 2 * pad,
      height: rect.height + 2 * pad,
    };

    const hl = this._hl;
    const wasVisible = this._active != null;
    // FLIP "first": measure where the highlight is now, mid-animation included.
    const first = wasVisible ? hl.getBoundingClientRect() : null;
    this._anim?.cancel();

    // inline styles hold the landing rect so the finish never flashes
    hl.style.top = `${to.top}px`;
    hl.style.left = `${to.left}px`;
    hl.style.width = `${to.width}px`;
    hl.style.height = `${to.height}px`;
    hl.classList.add("show");

    this._active = item;
    const index = this.items.indexOf(item);
    this.setAttribute("data-pura-hh-active", String(index));

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (wasVisible && !reduce && typeof hl.animate === "function") {
      this._anim = hl.animate(
        [
          {
            top: `${first.top - host.top}px`,
            left: `${first.left - host.left}px`,
            width: `${first.width}px`,
            height: `${first.height}px`,
          },
          {
            top: `${to.top}px`,
            left: `${to.left}px`,
            width: `${to.width}px`,
            height: `${to.height}px`,
          },
        ],
        { duration: this.duration, easing: this.easing },
      );
    }
    this.dispatchEvent(
      new CustomEvent("highlight", { bubbles: true, composed: true, detail: { index, item } }),
    );
  }

  // Fade the highlight out in place (it keeps its last rect for the next entry).
  clear() {
    if (this._active == null) return;
    this._active = null;
    this._hl.classList.remove("show");
    this.removeAttribute("data-pura-hh-active");
    this.dispatchEvent(new CustomEvent("clear", { bubbles: true, composed: true }));
  }

  // ---- internals ------------------------------------------------------------
  _bind() {
    this.addEventListener("pointerover", (e) => {
      const item = this._itemFor(e.target);
      if (item) this.highlight(item);
    });
    this.addEventListener("pointerleave", () => this.clear());
    this.addEventListener("focusin", (e) => {
      const item = this._itemFor(e.target);
      if (item) this.highlight(item);
    });
    this.addEventListener("focusout", (e) => {
      if (!(e.relatedTarget instanceof Element) || !this.contains(e.relatedTarget)) this.clear();
    });
  }

  // Resolve the hoverable item that contains the event target, or null when
  // the pointer is over a gap (the highlight then stays where it is).
  _itemFor(target) {
    if (!(target instanceof Element) || target === this) return null;
    const sel = this.getAttribute("selector");
    if (sel) {
      const item = target.closest(sel);
      return item && this.contains(item) ? item : null;
    }
    let node = target;
    while (node && node.parentElement !== this) node = node.parentElement;
    return node;
  }
}

define("pura-hover-highlight", PuraHoverHighlight, meta);
export { PuraHoverHighlight };
