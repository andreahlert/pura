// Pure render for <pura-draw>. No DOM; safe on server (SSR/DSD) and client.
// The element draws an SVG stroke on as you scroll: the path is normalized to
// pathLength="1", hidden with stroke-dasharray:1 / stroke-dashoffset:1, then the
// offset ramps 1 -> 0 so the line writes itself in. stroke-dashoffset is a
// long-proven animatable property that always re-paints, so this needs no var()
// trickery and no per-frame JS.
//
// scrub (default): ties the offset 1:1 to a scroll-driven timeline.
// view / load: transitions the offset 1 -> 0 once.
// SSR / pre-JS: the stroke sits fully drawn (offset 0) so nothing is missing
// before the script runs; the hide/redraw only engages once a trigger applies.
import { EMPTY_SHIM } from "../base.js";

const DEFAULT_PATH = "M 8 50 C 28 8, 72 8, 92 50 S 72 92, 8 50";
const DEFAULT_VIEWBOX = "0 0 100 100";

function safePath(raw, fallback) {
  if (raw == null || raw === "") return fallback;
  const cleaned = String(raw).replace(/[^0-9eE.,+\-\s MLHVCQSTAZmlhvcqstaz]/g, "");
  return cleaned.trim() || fallback;
}
function safeViewBox(raw) {
  if (raw == null || raw === "") return DEFAULT_VIEWBOX;
  const cleaned = String(raw).replace(/[^0-9.\-\s]/g, "").trim();
  return cleaned || DEFAULT_VIEWBOX;
}
function safePaint(raw, fallback) {
  if (raw == null || raw === "") return fallback;
  const cleaned = String(raw).replace(/[^0-9a-zA-Z#%.,()\-\s]/g, "").trim();
  return cleaned || fallback;
}

export function drawTemplate(el = EMPTY_SHIM) {
  const path = safePath(el.getAttribute("path"), DEFAULT_PATH);
  const viewBox = safeViewBox(el.getAttribute("viewbox"));
  const stroke = safePaint(el.getAttribute("stroke"), "currentColor");
  const strokeWidth = safePaint(el.getAttribute("stroke-width"), "4");
  const fill = safePaint(el.getAttribute("fill"), "none");
  const cap = el.getAttribute("linecap") === "butt" || el.getAttribute("linecap") === "square"
    ? el.getAttribute("linecap")
    : "round";

  const html =
    `<svg part="svg" viewBox="${viewBox}" aria-hidden="true">` +
    `<path part="line" class="line" pathLength="1" d="${path}" /></svg>`;

  const css = `
    :host {
      display: inline-block;
      line-height: 0;
      --pura-draw-dur: 1s;
      --pura-draw-ease: cubic-bezier(0.65, 0, 0.35, 1);
    }
    svg { display: block; width: 100%; height: 100%; overflow: visible; }
    .line {
      fill: ${fill};
      stroke: ${stroke};
      stroke-width: ${strokeWidth};
      stroke-linecap: ${cap};
      stroke-linejoin: round;
    }

    /* Any trigger first hides the stroke; only then does it write on. */
    :host([data-pura-draw-anim]) .line,
    :host([data-pura-draw-scrub]) .line {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
    }

    /* view / load: transition the offset to 0. */
    :host([data-pura-draw-anim]) .line {
      transition: stroke-dashoffset var(--pura-draw-dur) var(--pura-draw-ease);
    }
    :host([data-pura-draw-in]) .line {
      stroke-dashoffset: 0;
    }

    @keyframes pura-draw {
      to { stroke-dashoffset: 0; }
    }

    /* scrub: tie the offset 1:1 to a scroll-driven timeline. */
    @supports (animation-timeline: scroll()) {
      @media (prefers-reduced-motion: no-preference) {
        :host([data-pura-draw-scrub]) .line {
          animation: pura-draw linear both;
          animation-timeline: var(--pura-draw-timeline, view());
          animation-range: var(--pura-draw-range, cover 0% cover 50%);
        }
      }
    }

    /* loop: a stroke segment chases around the path forever (loading move).
       Dash pattern sums to the full pathLength (1), so animating the offset by
       exactly one period loops seamlessly. */
    :host([data-pura-draw-loop]) .line {
      stroke-dasharray: var(--pura-draw-loop-dash, 0.3) calc(1 - var(--pura-draw-loop-dash, 0.3));
      stroke-dashoffset: 1;
      animation: pura-draw-loop var(--pura-draw-loop-dur, 1.6s) linear infinite;
    }
    @keyframes pura-draw-loop {
      to { stroke-dashoffset: 0; }
    }

    /* Reduced motion: never scrub, never loop. Show the stroke fully drawn. */
    @media (prefers-reduced-motion: reduce) {
      :host([data-pura-draw-scrub]) .line { stroke-dashoffset: 0; }
      :host([data-pura-draw-loop]) .line {
        animation: none;
        stroke-dasharray: none;
        stroke-dashoffset: 0;
      }
    }
  `;

  return { html, css };
}
