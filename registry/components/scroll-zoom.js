// <pura-scroll-zoom> — the Apple-style scroll zoom: the slotted media starts
// small and rounded in the middle of the viewport and grows to full bleed as
// you scroll, tied 1:1 to a scroll-driven timeline (animation-timeline: view())
// with zero per-frame JS.
//
// Attributes:
//   from     — starting scale 0..1 (default 0.5).
//   range    — animation-range (default "cover 0% cover 65%").
//   timeline — "view" (default) | "scroll".
//
// Tokens: --pura-scroll-zoom-radius (starting corner radius, default 24px).
// SSR / pre-JS, unsupported browsers and reduced motion: full size, no zoom.
//
// Agent-native layer: each instance registers in window.__puraScrollZooms by
//   data-pura-id with { from, el }; data-pura-sz-* mirror config.
import { PuraElement, define } from "../base.js";
import meta from "./scroll-zoom.meta.js";
import { scrollZoomTemplate } from "./scroll-zoom.template.js";

let uid = 0;

function registry() {
  return (window.__puraScrollZooms ||= new Map());
}

class PuraScrollZoom extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-scroll-zoom-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = scrollZoomTemplate(this);
    this.render(html, css);

    const from = this.from;
    this.style.setProperty("--pura-scroll-zoom-from", String(from));
    const tl = this.getAttribute("timeline") === "scroll" ? "scroll()" : "view()";
    this.style.setProperty("--pura-sz-timeline", tl);
    const range = this.getAttribute("range");
    if (range) this.style.setProperty("--pura-sz-range", range);
    this.setAttribute("data-pura-sz-scrub", "");
    this.setAttribute("data-pura-sz-from", String(from));

    registry().set(this._id, { id: this._id, from, el: this });
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get from() {
    const n = parseFloat(this.getAttribute("from"));
    return Number.isFinite(n) && n > 0 && n <= 1 ? n : 0.5;
  }
}

define("pura-scroll-zoom", PuraScrollZoom, meta);
export { PuraScrollZoom };
