// <pura-affix> - pins slotted content to the viewport once its scroll position
// passes a threshold (sticky-on-scroll). Prefers position:sticky when offset-top
// is given; falls back to fixed positioning (driven by an IntersectionObserver
// sentinel) so layout never jumps, thanks to a reserved placeholder.
// Attributes:
//   offset-top    - px gap from the top of the viewport when affixed
//   offset-bottom - px gap from the bottom of the viewport when affixed
// Events:
//   change - CustomEvent (bubbles), detail { affixed: boolean }
// Part: content
import { PuraElement, define } from "../base.js";

class PuraAffix extends PuraElement {
  static observedAttributes = ["offset-top", "offset-bottom"];

  connectedCallback() {
    this._affixed = false;
    this.render(
      `<div class="sentinel" aria-hidden="true"></div>
       <div class="placeholder"><div part="content" class="content"><slot></slot></div></div>`,
      CSS
    );
    this._sentinel = this.$(".sentinel");
    this._placeholder = this.$(".placeholder");
    this._content = this.$(".content");
    this._setup();
  }

  disconnectedCallback() {
    this._io?.disconnect();
    this._io = null;
  }

  attributeChangedCallback() {
    if (this.shadowRoot.childElementCount) this._setup();
  }

  get offsetTop() {
    return numOrNull(this.getAttribute("offset-top"));
  }

  get offsetBottom() {
    return numOrNull(this.getAttribute("offset-bottom"));
  }

  get affixed() {
    return this._affixed;
  }

  _setup() {
    this._io?.disconnect();
    this._io = null;

    const top = this.offsetTop;
    const bottom = this.offsetBottom;

    // Simple, robust path: native sticky when offset-top is set and bottom is not.
    if (top != null && bottom == null) {
      this._content.style.position = "sticky";
      this._content.style.top = `${top}px`;
      this._content.style.bottom = "";
      // Observe the sentinel to surface affixed state via the change event.
      this._observe(top, bottom);
      return;
    }

    // Advanced path: fixed positioning toggled by sentinel visibility. The
    // placeholder reserves the content box so flow does not collapse.
    this._content.style.position = "";
    this._content.style.top = "";
    this._content.style.bottom = "";
    this._observe(top, bottom);
  }

  _observe(top, bottom) {
    const rootMargin = bottom != null && top == null
      ? `0px 0px -${bottom}px 0px`
      : `-${top ?? 0}px 0px 0px 0px`;

    this._io = new IntersectionObserver(
      ([entry]) => {
        // Sentinel out of view (scrolled past) => affixed.
        const affixed = !entry.isIntersecting;
        this._apply(affixed, top, bottom);
      },
      { threshold: [0], rootMargin }
    );
    this._io.observe(this._sentinel);
  }

  _apply(affixed, top, bottom) {
    const usingSticky = top != null && bottom == null;

    if (!usingSticky) {
      if (affixed) {
        // Freeze placeholder height so flow does not jump, then fix the content.
        this._placeholder.style.height = `${this._content.offsetHeight}px`;
        this._placeholder.style.width = `${this._content.offsetWidth}px`;
        this._content.style.position = "fixed";
        this._content.style.width = `${this._content.offsetWidth}px`;
        if (bottom != null) this._content.style.bottom = `${bottom}px`;
        else this._content.style.top = `${top ?? 0}px`;
      } else {
        this._placeholder.style.height = "";
        this._placeholder.style.width = "";
        this._content.style.position = "";
        this._content.style.width = "";
        this._content.style.top = "";
        this._content.style.bottom = "";
      }
    }

    if (affixed === this._affixed) return;
    this._affixed = affixed;
    this.toggleAttribute("data-affixed", affixed);
    this.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { affixed } }));
  }
}

function numOrNull(v) {
  if (v == null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

const CSS = `
  :host { display: block; }
  .sentinel { width: 100%; height: 1px; margin-bottom: -1px; }
  .placeholder { display: block; }
  [part="content"] { z-index: 10; }
`;

define("pura-affix", PuraAffix);
export { PuraAffix };
