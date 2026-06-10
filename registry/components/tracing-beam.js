// <pura-tracing-beam> — a vertical gradient beam with a glowing dot that draws
// itself down a rail beside the slotted content, 1:1 with reading progress,
// the Aceternity "Tracing Beam" / changelog-timeline move. Unlike <pura-draw>
// (generic, needs a supplied SVG path), the track here is generated and sized
// from the content height: a ResizeObserver fits the SVG viewBox, paths and
// gradient to the slot, and the draw itself is pure CSS, stroke-dashoffset and
// dot position riding the host's named view timeline (animation-timeline) with
// zero per-frame JS.
//
// Attributes:
//   side     — "left" (default) | "right": which side the rail sits on.
//   range    — animation-range (default "cover 0% cover 100%").
//   timeline — "view" (default, host view timeline) | "scroll" (nearest
//              scroll container progress).
//
// Tokens: --pura-tracing-beam-track (faint rail), --pura-tracing-beam-from /
//   -via / -to (gradient stops), --pura-tracing-beam-width (stroke width),
//   --pura-tracing-beam-rail (rail column width), --pura-tracing-beam-gap,
//   --pura-tracing-beam-dot (dot color), --pura-tracing-beam-dot-size.
//
// SSR / pre-JS, unsupported browsers and reduced motion: the faint track plus
// the fully drawn gradient beam render statically; the dot stays hidden.
//
// Agent-native layer: each instance registers in window.__puraTracingBeams by
//   data-pura-id with { side, height, el }; data-pura-tb-* mirror config and
//   the measured content height.
import { PuraElement, define } from "../base.js";
import meta from "./tracing-beam.meta.js";
import { tracingBeamTemplate, tracingBeamSide } from "./tracing-beam.template.js";

let uid = 0;

function registry() {
  return (window.__puraTracingBeams ||= new Map());
}

class PuraTracingBeam extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-tracing-beam-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = tracingBeamTemplate(this);
    this.render(html, css);

    const tl = this.getAttribute("timeline") === "scroll" ? "scroll()" : "--pura-tb";
    this.style.setProperty("--pura-tb-timeline", tl);
    const range = this.getAttribute("range");
    if (range) this.style.setProperty("--pura-tb-range", range);

    this.setAttribute("data-pura-tb-scrub", "");
    this.setAttribute("data-pura-tb-side", this.side);

    registry().set(this._id, { id: this._id, side: this.side, height: 0, el: this });

    // Fit the generated SVG to the content height, now and on every resize.
    const content = this.$(".content");
    this._fit(content.getBoundingClientRect().height);
    if (typeof ResizeObserver !== "undefined") {
      this._ro = new ResizeObserver((entries) => {
        for (const e of entries) this._fit(e.contentRect.height);
      });
      this._ro.observe(content);
    }
  }

  disconnectedCallback() {
    this._ro?.disconnect();
    this._ro = null;
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get side() {
    return tracingBeamSide(this);
  }

  // ---- internals ------------------------------------------------------------
  // Resize the SVG coordinate space to the measured content height so the
  // gradient maps onto real pixels. pathLength="1" keeps the dash math
  // invariant, so the scrub never needs recomputing.
  _fit(h) {
    const height = Math.max(1, Math.round(h || 0));
    if (height === this._height) return;
    this._height = height;
    const d = `M 10 0 V ${height}`;
    this.$("svg")?.setAttribute("viewBox", `0 0 20 ${height}`);
    this.$(".track")?.setAttribute("d", d);
    this.$(".beam")?.setAttribute("d", d);
    this.$("linearGradient")?.setAttribute("y2", String(height));
    this.setAttribute("data-pura-tb-height", String(height));
    const entry = registry().get(this._id);
    if (entry) entry.height = height;
  }
}

define("pura-tracing-beam", PuraTracingBeam, meta);
export { PuraTracingBeam };
