// Pure render for <pura-marquee-3d>. No DOM; safe on server (SSR/DSD) and client.
// Multiple vertical marquee columns laid on a statically tilted 3D plane
// (rotateX/rotateZ inside a perspective scene), the testimonial-hero / logo-wall
// composition. The loop itself is pure CSS @keyframes on each column track;
// adjacent columns scroll in alternating directions with deterministically
// staggered durations (index math set by the element, never randomness).
//
// SSR / pre-JS: the slotted items render as a static multi-column layout on the
// same tilted plane, so the page is fully presentable before any script runs.
// Once the element upgrades it clones the items into aria-hidden animated
// columns and visually hides (but keeps accessible) the original slot content.
// Reduced motion: the columns hold still (animation gated on no-preference,
// and the base reset collapses durations as a second guard).
import { EMPTY_SHIM } from "../base.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function num(v, fallback) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
}

export function marquee3dTemplate(el = EMPTY_SHIM) {
  const rawCols = parseInt(el.getAttribute("columns"), 10);
  const cols = Number.isFinite(rawCols) && rawCols > 0 ? Math.min(rawCols, 8) : 3;
  const rx = num(el.getAttribute("rotate-x"), 55);
  const rz = num(el.getAttribute("rotate-z"), -45);
  const label = esc(el.getAttribute("label") || "Scrolling gallery");

  const html = `<div class="scene" part="scene" role="marquee" aria-label="${label}">
      <div class="plane" part="plane">
        <div class="static" part="static"><slot></slot></div>
        <div class="cols" part="cols" aria-hidden="true"></div>
      </div>
    </div>`;

  const css = `
    :host { display: block; overflow: hidden; }

    .scene {
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: grid;
      place-items: center;
      perspective: var(--pura-marquee-3d-perspective, 1200px);
    }

    /* The plane is oversized and statically tilted; only the columns move. */
    .plane {
      display: grid;
      width: var(--pura-marquee-3d-plane-width, 150%);
      height: var(--pura-marquee-3d-plane-height, 150%);
      transform: scale(var(--pura-marquee-3d-scale, 1))
        rotateX(var(--pura-marquee-3d-rotate-x, ${rx}deg))
        rotateZ(var(--pura-marquee-3d-rotate-z, ${rz}deg));
      transform-style: preserve-3d;
    }

    .static, .cols { grid-area: 1 / 1; min-width: 0; min-height: 0; }

    /* SSR / pre-JS paint: a static multi-column layout of the slotted items. */
    .static {
      column-count: ${cols};
      column-gap: var(--pura-marquee-3d-gap, 1rem);
    }
    ::slotted(*) {
      display: block;
      width: 100%;
      break-inside: avoid;
      margin-block-end: var(--pura-marquee-3d-gap, 1rem);
    }

    /* Once the element built the animated clones, keep the originals in the
       accessibility tree but remove them from the visual layer (the clones are
       aria-hidden, so this preserves exactly one accessible copy). */
    :host([data-pura-m3d-ready]) .static {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    .cols {
      display: grid;
      grid-template-columns: repeat(${cols}, 1fr);
      gap: var(--pura-marquee-3d-gap, 1rem);
      height: 100%;
      overflow: hidden;
    }

    .col { overflow: hidden; min-height: 0; }

    .track {
      display: flex;
      flex-direction: column;
      width: 100%;
      will-change: transform;
    }

    .group {
      display: flex;
      flex-direction: column;
      gap: var(--pura-marquee-3d-gap, 1rem);
      padding-block-end: var(--pura-marquee-3d-gap, 1rem);
    }
    .group > * { width: 100%; }

    /* Two identical groups stacked; translating the track by exactly half its
       height swaps the second group into the first's place: a seamless loop. */
    @keyframes pura-marquee-3d-scroll {
      from { transform: translateY(0); }
      to   { transform: translateY(-50%); }
    }

    @media (prefers-reduced-motion: no-preference) {
      .track {
        animation: pura-marquee-3d-scroll
          var(--pura-m3d-col-duration, var(--pura-marquee-3d-speed, 25s))
          linear infinite;
        animation-direction: var(--pura-m3d-col-direction, normal);
      }
    }

    /* Pause on hover/focus when opted in (not motion-only: state is also
       mirrored via attributes and the imperative API). */
    :host([pause-on-hover]:hover) .track,
    :host([pause-on-hover]:focus-within) .track {
      animation-play-state: paused;
    }

    /* Explicit paused state. */
    :host([paused]) .track { animation-play-state: paused; }

    /* Respect reduced motion: stop the loop entirely so there is no movement. */
    @media (prefers-reduced-motion: reduce) {
      .track { animation: none; transform: none; }
    }
  `;

  return { html, css };
}
