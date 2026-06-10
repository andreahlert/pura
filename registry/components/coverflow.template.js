// Pure render for <pura-coverflow>. No DOM; safe on server (SSR/DSD) and client.
// A horizontal scroll-snap carousel where side slides rotate, scale and recede
// in 3D perspective around the centered slide, the classic coverflow move.
// Each slotted slide is tied 1:1 to its own inline view progress inside the
// scroller (animation-timeline: view(inline)), so the 3D pose updates live
// while dragging with zero per-frame JS.
//
// SSR / pre-JS and browsers without scroll-driven timelines: a flat, perfectly
// presentable scroll-snap row. Reduced motion: same flat row, no 3D pose.
import { EMPTY_SHIM } from "../base.js";

// Clamp a numeric attribute into [min, max], falling back when absent/invalid.
function num(value, fallback, min, max) {
  const n = parseFloat(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

// Shared attribute parsing so the element class and the template agree.
export function coverflowConfig(el = EMPTY_SHIM) {
  return {
    rotate: num(el.getAttribute("rotate"), 45, 0, 90),
    scale: num(el.getAttribute("scale"), 0.85, 0.1, 1),
    depth: num(el.getAttribute("depth"), 120, 0, 1000),
    perspective: num(el.getAttribute("perspective"), 1000, 100, 5000),
  };
}

export function coverflowTemplate(el = EMPTY_SHIM) {
  const { rotate, scale, depth, perspective } = coverflowConfig(el);
  const label = el.getAttribute("label") || "Coverflow";

  const html = `<div class="viewport" part="viewport" tabindex="0" role="group" aria-roledescription="carousel" aria-label="${label}"><slot></slot></div>`;

  const css = `
    :host {
      display: block;
      --pura-coverflow-rotate: ${rotate}deg;
      --pura-coverflow-scale: ${scale};
      --pura-coverflow-depth: ${depth}px;
      --pura-coverflow-perspective: ${perspective}px;
    }

    .viewport {
      display: flex;
      gap: var(--pura-coverflow-gap, 0.75rem);
      overflow-x: auto;
      overscroll-behavior-x: contain;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      /* inline padding lets the first and last slides snap to the center */
      padding-inline: calc((100% - var(--pura-coverflow-slide, 62%)) / 2);
      padding-block: var(--pura-coverflow-pad, 0.75rem);
      perspective: var(--pura-coverflow-perspective);
      border-radius: var(--pura-radius, 8px);
      scrollbar-width: none;
    }
    .viewport::-webkit-scrollbar { display: none; }
    .viewport:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--pura-ring, #93c5fd);
    }

    ::slotted(*) {
      flex: 0 0 var(--pura-coverflow-slide, 62%);
      min-width: 0;
      scroll-snap-align: center;
    }

    /* view(inline) progress runs 0 -> 1 as a slide crosses the scrollport from
       the right edge to the left edge; the centered slide sits at 50%, flat.
       Side slides recede (translateZ), turn toward the center (rotateY) and
       shrink (scale). */
    @keyframes pura-coverflow {
      0% {
        transform:
          translateZ(calc(-1 * var(--pura-coverflow-depth)))
          rotateY(calc(-1 * var(--pura-coverflow-rotate)))
          scale(var(--pura-coverflow-scale));
      }
      50% {
        transform: translateZ(0) rotateY(0deg) scale(1);
      }
      100% {
        transform:
          translateZ(calc(-1 * var(--pura-coverflow-depth)))
          rotateY(var(--pura-coverflow-rotate))
          scale(var(--pura-coverflow-scale));
      }
    }

    /* scrub: tie each slide's 3D pose 1:1 to its inline view progress */
    @supports (animation-timeline: view()) {
      @media (prefers-reduced-motion: no-preference) {
        ::slotted(*) {
          animation: pura-coverflow linear both;
          animation-timeline: view(inline);
        }
      }
    }
  `;

  return { html, css };
}
