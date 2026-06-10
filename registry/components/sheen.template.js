// Pure render for <pura-sheen>. No DOM; safe on server (SSR/DSD) and client.
// A flat wrapper that sweeps a diagonal light streak across the slotted
// content once per hover. The streak is an absolutely positioned overlay with
// a translucent linear-gradient band parked fully off-frame (translateX(-100%));
// :hover / :focus-within / [data-pura-sheen-sweep] transition it to
// translateX(100%), so it crosses the surface exactly once and rests off-frame.
// Leaving removes the transition, snapping it back instantly, ready to sweep
// again. No 3D, no tilt, pure CSS.
//
// SSR / pre-JS: streak sits off-frame, content paints normally.
// Reduced motion: the shared reset collapses the transition to 0.01ms (the
// streak jumps straight off-frame, effectively invisible) and the optional
// loop animation is gated behind prefers-reduced-motion: no-preference.
import { EMPTY_SHIM } from "../base.js";

function posNum(raw, fallback) {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function anyNum(raw, fallback) {
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

export function sheenTemplate(el = EMPTY_SHIM) {
  const duration = posNum(el.getAttribute("duration"), 800);
  const angle = anyNum(el.getAttribute("angle"), 120);
  // Loop cycle: the sweep takes the first 45% of the cycle, then the streak
  // rests off-frame for the remainder. Deterministic index math, no clock.
  const loopMs = Math.round(duration / 0.45);

  const html = `<div class="frame" part="frame">
      <slot></slot>
      <div class="sheen" part="sheen" aria-hidden="true"></div>
    </div>`;

  const css = `
    :host {
      display: inline-block;
      --pura-sheen-duration: ${duration}ms;
      --pura-sheen-angle: ${angle}deg;
      --pura-sheen-color: rgba(255, 255, 255, 0.45);
      --pura-sheen-width: 15%;
      --pura-sheen-ease: cubic-bezier(0.4, 0, 0.2, 1);
      --pura-sheen-radius: 0px;
    }
    .frame {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: var(--pura-sheen-radius);
    }
    ::slotted(img), ::slotted(video) {
      display: block;
      max-width: 100%;
    }

    /* The streak: a diagonal translucent band painted across the overlay,
       parked fully off-frame to the left. translateX is the whole move. */
    .sheen {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background: linear-gradient(
        var(--pura-sheen-angle),
        transparent calc(50% - var(--pura-sheen-width)),
        var(--pura-sheen-color) 50%,
        transparent calc(50% + var(--pura-sheen-width))
      );
      transform: translateX(-100%);
      will-change: transform;
    }

    /* One sweep per hover: the transition only exists while hovered, so the
       streak crosses once and rests off-frame right; on leave it snaps back
       (no transition) ready for the next pass. focus-within mirrors the
       affordance for keyboard users; [data-pura-sheen-sweep] is the
       programmatic trigger (PuraSheen.sweep()). */
    :host(:hover) .sheen,
    :host(:focus-within) .sheen,
    :host([data-pura-sheen-sweep]) .sheen {
      transform: translateX(100%);
      transition: transform var(--pura-sheen-duration) var(--pura-sheen-ease);
    }

    /* Opt-in ambient mode: sweep continuously without a pointer. Gated so
       reduced-motion users get the static (off-frame) streak instead. */
    @keyframes pura-sheen-loop {
      0%   { transform: translateX(-100%); }
      45%  { transform: translateX(100%); }
      100% { transform: translateX(100%); }
    }
    @media (prefers-reduced-motion: no-preference) {
      :host([loop]) .sheen {
        animation: pura-sheen-loop ${loopMs}ms linear infinite;
      }
    }
  `;

  return { html, css };
}
