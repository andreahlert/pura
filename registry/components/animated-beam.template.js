// Pure render for <pura-animated-beam>. No DOM; safe on server (SSR/DSD) and client.
// The shadow markup is a positioned container: an absolutely positioned SVG layer
// (track path + beam path + gradient defs, all geometry-less until the client
// measures the anchors) behind a relative content wrapper that slots the nodes.
// The client fills in the path "d", the viewBox and the gradient endpoints, then
// drives the moving light pulse with a CSS keyframe over stroke-dashoffset using
// --pura-animated-beam-len / --pura-animated-beam-seg (set from getTotalLength()).
//
// SSR / pre-JS: only the container and the slotted anchors paint (paths without
// "d" draw nothing) — the beam is progressive enhancement.
// Reduced motion: the dash is removed, so the beam shows as a static gradient
// stroke connecting the anchors instead of a travelling pulse.
import { EMPTY_SHIM } from "../base.js";

export function animatedBeamTemplate(el = EMPTY_SHIM) {
  const html = `
    <div class="layer" part="layer" aria-hidden="true">
      <svg class="svg" part="svg" focusable="false">
        <defs>
          <linearGradient id="pura-animated-beam-gradient" class="gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="0">
            <stop class="stop-edge-a" offset="0"></stop>
            <stop class="stop-from" offset="0.15"></stop>
            <stop class="stop-to" offset="0.85"></stop>
            <stop class="stop-edge-b" offset="1"></stop>
          </linearGradient>
        </defs>
        <path class="track" part="track"></path>
        <path class="beam" part="beam" stroke="url(#pura-animated-beam-gradient)"></path>
      </svg>
    </div>
    <div class="content" part="content"><slot></slot></div>
  `;

  const css = `
    :host {
      display: block;
      position: relative;
    }
    .layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .content {
      position: relative;
      height: 100%;
    }
    .track {
      fill: none;
      stroke: var(--pura-animated-beam-track, rgba(148, 163, 184, 0.4));
      stroke-width: var(--pura-animated-beam-width, 2);
      stroke-linecap: round;
    }
    .beam {
      fill: none;
      stroke-width: var(--pura-animated-beam-width, 2);
      stroke-linecap: round;
      stroke-dasharray: var(--pura-animated-beam-seg, 0px) var(--pura-animated-beam-len, 0px);
      stroke-dashoffset: var(--pura-animated-beam-len, 0px);
    }
    .stop-edge-a { stop-color: var(--pura-animated-beam-from, #ffaa40); stop-opacity: 0; }
    .stop-from   { stop-color: var(--pura-animated-beam-from, #ffaa40); }
    .stop-to     { stop-color: var(--pura-animated-beam-to, #9c40ff); }
    .stop-edge-b { stop-color: var(--pura-animated-beam-to, #9c40ff); stop-opacity: 0; }

    /* the light pulse: one dash segment swept along the whole path length */
    @keyframes pura-animated-beam {
      from { stroke-dashoffset: var(--pura-animated-beam-len, 0px); }
      to   { stroke-dashoffset: calc(-1 * var(--pura-animated-beam-seg, 0px)); }
    }

    @media (prefers-reduced-motion: no-preference) {
      :host([data-pura-beam-state="animating"]) .beam {
        animation: pura-animated-beam var(--pura-animated-beam-duration, 2000ms)
          linear var(--pura-animated-beam-delay, 0ms) infinite;
      }
      :host([reverse]) .beam {
        animation-direction: reverse;
      }
    }

    /* reduced motion: no pulse — show the full gradient stroke, statically */
    @media (prefers-reduced-motion: reduce) {
      .beam {
        stroke-dasharray: none;
        stroke-dashoffset: 0;
      }
    }
  `;

  return { html, css };
}
