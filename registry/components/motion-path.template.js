// Pure render for <pura-motion-path>. No DOM; safe on server (SSR/DSD) and client.
// The slotted content rides an SVG path: native `offset-path: path(...)` places
// it on the curve and `offset-distance` 0% -> 100% moves it along. Both are
// natively animatable and the path is baked into the CSS as a LITERAL path()
// string (never routed through var() into geometry). Path coordinates are in px
// of the host's coordinate space (offset-path does not use a viewBox).
//
// scrub (default): ties offset-distance 1:1 to a scroll-driven timeline.
// view / load: transitions the distance 0% -> 100% once.
// SSR / pre-JS: the content sits at the path start, fully visible.
import { EMPTY_SHIM } from "../base.js";

const DEFAULT_PATH = "M 20 110 C 80 10, 200 10, 260 110 S 420 210, 480 110";

function safePath(raw, fallback) {
  if (raw == null || raw === "") return fallback;
  const cleaned = String(raw).replace(/[^0-9eE.,+\-\s MLHVCQSTAZmlhvcqstaz]/g, "");
  return cleaned.trim() || fallback;
}
function safePaint(raw, fallback) {
  if (raw == null || raw === "") return fallback;
  const cleaned = String(raw).replace(/[^0-9a-zA-Z#%.,()\-\s]/g, "").trim();
  return cleaned || fallback;
}

export function motionPathTemplate(el = EMPTY_SHIM) {
  const path = safePath(el.getAttribute("path"), DEFAULT_PATH);
  const rotate = el.hasAttribute("no-rotate") ? "0deg" : "auto";
  const showPath = el.hasAttribute("show-path");
  const lineColor = safePaint(el.getAttribute("line-color"), "currentColor");

  // The guide line is drawn in the same px user units offset-path uses, so the
  // two always coincide; the svg just spans the host.
  const guide = showPath
    ? `<svg class="guide" part="guide" aria-hidden="true">` +
      `<path d="${path}" pathLength="1" /></svg>`
    : "";

  const html =
    `${guide}<div class="mover" part="mover"><slot></slot></div>`;

  const css = `
    :host {
      display: block;
      position: relative;
      --pura-mp-dur: 1.2s;
      --pura-mp-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .guide {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
      pointer-events: none;
    }
    .guide path {
      fill: none;
      stroke: ${lineColor};
      stroke-width: 1;
      stroke-dasharray: 0.008 0.008;
      opacity: 0.35;
    }
    .mover {
      position: absolute;
      top: 0;
      left: 0;
      width: max-content;
      offset-path: path("${path}");
      offset-rotate: ${rotate};
      offset-distance: 0%;
    }

    /* view / load: travel the path once. */
    :host([data-pura-mp-anim]) .mover {
      transition: offset-distance var(--pura-mp-dur) var(--pura-mp-ease);
    }
    :host([data-pura-mp-in]) .mover {
      offset-distance: 100%;
    }

    @keyframes pura-motion-path {
      to { offset-distance: 100%; }
    }

    /* scrub: tie the travel 1:1 to a scroll-driven timeline, no JS frame. */
    @supports (animation-timeline: scroll()) {
      @media (prefers-reduced-motion: no-preference) {
        :host([data-pura-mp-scrub]) .mover {
          animation: pura-motion-path linear both;
          animation-timeline: var(--pura-mp-timeline, view());
          animation-range: var(--pura-mp-range, cover 0% cover 50%);
        }
      }
    }

    /* Reduced motion: never scrub. Land at the destination. */
    @media (prefers-reduced-motion: reduce) {
      :host([data-pura-mp-scrub]) .mover { offset-distance: 100%; }
    }
  `;

  return { html, css };
}
