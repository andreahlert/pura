// Pure render for <pura-pointer-parallax>. No DOM; safe on server (SSR/DSD)
// and client. A perspective scene that stacks every slotted layer into the
// same grid cell; each layer translates by
//   pointer offset (--pura-pp-x/--pura-pp-y, written by the JS layer)
//   x its own depth (--pura-pp-depth, mirrored from the layer's data-depth)
//   x the strength token.
// At rest all vars are 0, so SSR renders the layers stacked flat and
// untransformed. Reduced motion: the pointer logic never binds, layers stay flat.
import { EMPTY_SHIM } from "../base.js";

function safeNum(raw, fallback) {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function pointerParallaxTemplate(el = EMPTY_SHIM) {
  const perspective = safeNum(el.getAttribute("perspective"), 1000);
  const strength = safeNum(el.getAttribute("strength"), 16);

  const html = `<div class="scene" part="scene"><slot></slot></div>`;

  const css = `
    :host {
      display: inline-block;
      perspective: ${perspective}px;
      --pura-pp-x: 0;
      --pura-pp-y: 0;
      --pura-pointer-parallax-strength: ${strength}px;
      --pura-pointer-parallax-dur: 0.6s;
      --pura-pointer-parallax-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .scene {
      position: relative;
      display: grid;
      transform-style: preserve-3d;
    }
    /* Every layer occupies the same cell: a flat, stacked paint pre-JS. */
    ::slotted(*) {
      grid-area: 1 / 1;
      transform: translate3d(
        calc(var(--pura-pp-x, 0) * var(--pura-pp-depth, 0) * var(--pura-pointer-parallax-strength, 16px)),
        calc(var(--pura-pp-y, 0) * var(--pura-pp-depth, 0) * var(--pura-pointer-parallax-strength, 16px)),
        0
      );
      will-change: transform;
    }
    /* The settle back to center is a spring transition; while the pointer
       drives, the transition is disabled so layers track raw. */
    @media (prefers-reduced-motion: no-preference) {
      ::slotted(*) {
        transition: transform var(--pura-pointer-parallax-dur, 0.6s) var(--pura-pointer-parallax-ease, ease);
      }
      :host([data-pura-pp-active]) ::slotted(*) {
        transition: none;
      }
    }
  `;

  return { html, css };
}
