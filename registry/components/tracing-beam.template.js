// Pure render for <pura-tracing-beam>. No DOM; safe on server (SSR/DSD) and client.
// A vertical gradient beam draws itself down a rail beside the slotted content,
// 1:1 with reading progress, the Aceternity "Tracing Beam" move done natively.
// The rail holds an SVG with two stacked paths normalized to pathLength="1":
// .track is the faint full-height rail, .beam is the gradient stroke whose
// stroke-dashoffset ramps 1 -> 0 on the host's named view timeline
// (view-timeline: --pura-tb), while a glowing dot rides the same timeline from
// top to bottom. Zero per-frame JS on the happy path; the client only resizes
// the SVG viewBox/gradient to the content height (ResizeObserver).
//
// The viewBox is a placeholder 0 0 20 100 until the client measures the slot;
// preserveAspectRatio="none" plus vector-effect="non-scaling-stroke" keep the
// stretched line crisp either way, so the pre-JS paint is already correct.
//
// SSR / pre-JS and browsers without scroll-driven timelines: the faint track
// plus the fully drawn gradient beam render statically; the dot stays hidden.
// Reduced motion: same fully drawn state, nothing moves.
import { EMPTY_SHIM } from "../base.js";

export function tracingBeamSide(el = EMPTY_SHIM) {
  return el.getAttribute("side") === "right" ? "right" : "left";
}

export function tracingBeamTemplate(el = EMPTY_SHIM) {
  const side = tracingBeamSide(el);

  const html =
    `<div class="rail" part="rail" aria-hidden="true">` +
    `<svg part="svg" viewBox="0 0 20 100" preserveAspectRatio="none" fill="none">` +
    `<defs><linearGradient id="pura-tb-grad" gradientUnits="userSpaceOnUse" x1="10" y1="0" x2="10" y2="100">` +
    `<stop class="stop-from" offset="0"></stop>` +
    `<stop class="stop-via" offset="0.5"></stop>` +
    `<stop class="stop-to" offset="1"></stop>` +
    `</linearGradient></defs>` +
    `<path class="track" part="track" d="M 10 0 V 100" pathLength="1" vector-effect="non-scaling-stroke" />` +
    `<path class="beam" part="beam" d="M 10 0 V 100" pathLength="1" vector-effect="non-scaling-stroke" />` +
    `</svg>` +
    `<span class="dot" part="dot"></span>` +
    `</div>` +
    `<div class="content" part="content"><slot></slot></div>`;

  const css = `
    :host {
      display: grid;
      grid-template-columns: ${side === "right" ? "1fr auto" : "auto 1fr"};
      gap: var(--pura-tracing-beam-gap, 1.5rem);
      view-timeline: --pura-tb;
    }
    .rail {
      position: relative;
      width: var(--pura-tracing-beam-rail, 20px);
      ${side === "right" ? "order: 2;" : ""}
    }
    .content { min-width: 0; }
    svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .track {
      stroke: var(--pura-tracing-beam-track, color-mix(in srgb, currentColor 14%, transparent));
      stroke-width: var(--pura-tracing-beam-width, 2.5);
      stroke-linecap: round;
    }
    .beam {
      stroke: url(#pura-tb-grad);
      stroke-width: var(--pura-tracing-beam-width, 2.5);
      stroke-linecap: round;
      stroke-dasharray: 1;
      stroke-dashoffset: 0; /* fully drawn: the SSR / no-JS / fallback paint */
    }
    .stop-from { stop-color: var(--pura-tracing-beam-from, #06b6d4); }
    .stop-via { stop-color: var(--pura-tracing-beam-via, #6366f1); }
    .stop-to { stop-color: var(--pura-tracing-beam-to, #a855f7); }
    .dot {
      position: absolute;
      left: 50%;
      top: 0%;
      width: var(--pura-tracing-beam-dot-size, 12px);
      height: var(--pura-tracing-beam-dot-size, 12px);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background: var(--pura-tracing-beam-dot, var(--pura-tracing-beam-from, #06b6d4));
      box-shadow: 0 0 10px 2px
        color-mix(in srgb, var(--pura-tracing-beam-dot, var(--pura-tracing-beam-from, #06b6d4)) 60%, transparent);
      opacity: 0;
    }

    @keyframes pura-tracing-beam-draw {
      from { stroke-dashoffset: 1; }
      to { stroke-dashoffset: 0; }
    }
    @keyframes pura-tracing-beam-dot {
      from { top: 0%; }
      to { top: 100%; }
    }

    /* scrub: beam and dot ride the host's view timeline, no per-frame JS */
    @supports (animation-timeline: scroll()) {
      @media (prefers-reduced-motion: no-preference) {
        :host([data-pura-tb-scrub]) .beam {
          animation: pura-tracing-beam-draw linear both;
          animation-timeline: var(--pura-tb-timeline, --pura-tb);
          animation-range: var(--pura-tb-range, cover 0% cover 100%);
        }
        :host([data-pura-tb-scrub]) .dot {
          opacity: 1;
          animation: pura-tracing-beam-dot linear both;
          animation-timeline: var(--pura-tb-timeline, --pura-tb);
          animation-range: var(--pura-tb-range, cover 0% cover 100%);
        }
      }
    }

    /* Reduced motion: never scrub. Beam fully drawn, dot hidden. */
    @media (prefers-reduced-motion: reduce) {
      :host([data-pura-tb-scrub]) .beam {
        animation: none;
        stroke-dashoffset: 0;
      }
      :host([data-pura-tb-scrub]) .dot {
        animation: none;
        opacity: 0;
      }
    }
  `;

  return { html, css };
}
