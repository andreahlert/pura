// Pure render for <pura-gallery-3d>. No DOM; safe on server (SSR/DSD) and client.
// A 3D ring gallery: the slotted items are arranged around a cylinder
// (rotateY(i * 360/n) translateZ(radius), set inline by the element) inside a
// perspective scene. Drag to spin: the element tracks the angle in
// --pura-g3d-angle and the release glide is a plain CSS transition on the
// ring's transform (changing the var triggers it) — no rAF loop. Optional
// auto attribute spins the ring with a CSS animation until first grab.
//
// SSR / pre-JS: items render in a flat row (no transforms applied yet), so
// the content is all there before the script runs.
import { EMPTY_SHIM } from "../base.js";

export function gallery3dTemplate(el = EMPTY_SHIM) {
  const html = `<div class="scene" part="scene"><div class="ring" part="ring"><slot></slot></div></div>`;

  const css = `
    :host {
      display: block;
      --pura-g3d-angle: 0deg;
      --pura-g3d-perspective: 1200px;
      touch-action: pan-y;
    }
    .scene {
      width: 100%;
      height: 100%;
      perspective: var(--pura-g3d-perspective);
      display: grid;
      place-items: center;
    }
    .ring {
      position: relative;
      transform-style: preserve-3d;
      transform: rotateY(var(--pura-g3d-angle));
    }
    ::slotted(*) {
      backface-visibility: hidden;
    }

    /* ready: items leave the flat row and take their ring positions */
    :host([data-pura-g3d-ready]) ::slotted(*) {
      position: absolute;
      top: 50%;
      left: 50%;
    }

    /* drag settle: the angle itself transitions (registered property) */
    :host([data-pura-g3d-settle]) .ring {
      transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    /* auto: slow infinite spin until first grab */
    @media (prefers-reduced-motion: no-preference) {
      :host([auto]:not([data-pura-g3d-grabbed])) .ring {
        animation: pura-g3d-spin var(--pura-g3d-speed, 40s) linear infinite;
      }
    }
    @keyframes pura-g3d-spin {
      from { transform: rotateY(0deg); }
      to { transform: rotateY(360deg); }
    }

    :host([data-pura-g3d-ready]) { cursor: grab; }
    :host([data-pura-g3d-dragging]) { cursor: grabbing; }
  `;

  return { html, css };
}
