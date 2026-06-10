// Pure render for <pura-pulse-rings>. No DOM; safe on server (SSR/DSD) and client.
// Concentric rings expand and fade from the center behind the slotted content,
// the classic soft radar / signal backdrop. Each ring is a CSS @keyframes loop
// with a deterministic per-index negative delay, so the field is already
// mid-cycle on first paint and the server and client output byte-identical
// markup (no Math.random, no clock).
//
// SSR / pre-JS: CSS animations need no JS, so the live effect works from the
// static markup alone. Reduced motion: the animation is gated behind
// prefers-reduced-motion: no-preference; the per-ring static scale/opacity
// (a frozen radar frame) holds instead.
import { EMPTY_SHIM } from "../base.js";

function num(el, name, fallback, min) {
  const n = parseFloat(el.getAttribute(name));
  return Number.isFinite(n) && n >= min ? n : fallback;
}

export function pulseRingsTemplate(el = EMPTY_SHIM) {
  const rawCount = parseInt(el.getAttribute("count"), 10);
  const count = Number.isFinite(rawCount) && rawCount > 0 ? Math.min(rawCount, 8) : 4;
  const dur = num(el, "duration", 3, 0.1);
  const scale = num(el, "scale", 2.5, 1);

  // Deterministic stagger: ring i sits at fraction i/count of the cycle. The
  // negative delay spreads the live animation; --pr-scale/--pr-fade paint the
  // same frozen frame when the animation is off (SSR snapshot, reduced motion).
  let rings = "";
  for (let i = 0; i < count; i++) {
    const frac = i / count;
    const delay = (-frac * dur).toFixed(2);
    const staticScale = (1 + (scale - 1) * frac).toFixed(3);
    const fade = (1 - frac).toFixed(3);
    rings += `<span class="ring" part="ring" style="--pr-delay:${delay}s;--pr-scale:${staticScale};--pr-fade:${fade}"></span>`;
  }

  const html = `
    <span class="rings" part="rings" aria-hidden="true" style="--pr-dur:${dur}s;--pr-max:${scale}">${rings}</span>
    <span class="content" part="content"><slot></slot></span>
  `;

  const css = `
    :host {
      position: relative;
      display: grid;
      place-items: center;
    }

    .rings {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      pointer-events: none;
    }

    .ring {
      position: absolute;
      width: var(--pura-pulse-rings-size, 180px);
      height: var(--pura-pulse-rings-size, 180px);
      border-radius: var(--pura-radius-full, 999px);
      border: var(--pura-pulse-rings-border, 1px) solid
        var(--pura-pulse-rings-color, var(--pura-fg, #94a3b8));
      /* static paint: SSR snapshot and reduced motion show a frozen radar frame */
      transform: scale(var(--pr-scale, 1));
      opacity: calc(var(--pura-pulse-rings-opacity, 0.5) * var(--pr-fade, 1));
    }

    :host([filled]) .ring {
      background: color-mix(
        in oklab,
        var(--pura-pulse-rings-color, var(--pura-fg, #94a3b8)) 10%,
        transparent
      );
    }

    .content {
      position: relative;
      display: grid;
      place-items: center;
    }

    @keyframes pura-pulse-ring {
      0% {
        transform: scale(1);
        opacity: var(--pura-pulse-rings-opacity, 0.5);
      }
      100% {
        transform: scale(var(--pr-max, 2.5));
        opacity: 0;
      }
    }

    /* live loop only when the user is fine with motion; negative delays put
       every ring mid-cycle on the very first frame, no pop-in. */
    @media (prefers-reduced-motion: no-preference) {
      .ring {
        animation: pura-pulse-ring var(--pr-dur, 3s) cubic-bezier(0, 0, 0.2, 1) infinite;
        animation-delay: var(--pr-delay, 0s);
      }
    }
  `;

  return { html, css };
}
