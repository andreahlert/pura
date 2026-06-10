// Pure render for <pura-light-rays>. No DOM; safe on server (SSR/DSD) and client.
// Volumetric god rays falling from above: each ray is a narrow translucent
// conic-gradient wedge anchored to an origin point above the frame, softened
// with a shared blur and swaying slowly in angle and opacity via CSS
// @keyframes. The fan is scattered deterministically per index (no
// Math.random), so server and client paint byte-identical fields.
//
// SSR / pre-JS: the full ray field renders statically at peak opacity.
// Reduced motion: the sway animation is gated behind no-preference, so the
// rays simply hold still.
import { EMPTY_SHIM } from "../base.js";

// Deterministic per-index variation: slice width, peak opacity, sway angle,
// duration and (negative) delay all derive from index math so renders are
// reproducible across server and client.
function rayStyle(i, count, spread, intensity, speed) {
  const t = count === 1 ? 0.5 : i / (count - 1);
  const w = 2 + ((i * 1.7) % 4); // wedge width in degrees, 2..6
  const offset = (t - 0.5) * spread; // position across the fan
  const start = (180 + offset - w / 2).toFixed(2); // 180deg points straight down
  const peak = (intensity * (0.5 + ((i * 37) % 50) / 100)).toFixed(3);
  const dur = (speed * (0.75 + ((i * 29) % 50) / 100)).toFixed(2);
  const delay = (-((i * 1.3) % speed)).toFixed(2); // negative: desync from frame one
  const sway = (1.5 + ((i * 13) % 30) / 10).toFixed(2);
  return `--lr-start:${start}deg;--lr-w:${w}deg;--lr-peak:${peak};--lr-dur:${dur}s;--lr-delay:${delay}s;--lr-sway:${sway}deg`;
}

export function lightRaysTemplate(el = EMPTY_SHIM) {
  const rawCount = parseInt(el.getAttribute("count"), 10);
  const count = Number.isFinite(rawCount) && rawCount > 0 ? Math.min(rawCount, 32) : 8;

  const rawSpread = parseFloat(el.getAttribute("spread"));
  const spread =
    Number.isFinite(rawSpread) && rawSpread > 0 ? Math.min(Math.max(rawSpread, 5), 170) : 40;

  const rawIntensity = parseFloat(el.getAttribute("intensity"));
  const intensity =
    Number.isFinite(rawIntensity) && rawIntensity >= 0 ? Math.min(rawIntensity, 1) : 0.6;

  const rawSpeed = parseFloat(el.getAttribute("speed"));
  const speed = Number.isFinite(rawSpeed) && rawSpeed > 0 ? rawSpeed : 10;

  let rays = "";
  for (let i = 0; i < count; i++) {
    rays += `<span class="ray" part="ray" style="${rayStyle(i, count, spread, intensity, speed)}"></span>`;
  }
  const html = `<span class="rays" part="rays" aria-hidden="true">${rays}</span><slot></slot>`;
  return { html, css: LIGHT_RAYS_CSS };
}

export const LIGHT_RAYS_CSS = `
  :host {
    position: relative;
    display: block;
    overflow: hidden;
  }

  .rays {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    --lr-x: 50%;
    filter: blur(var(--pura-light-rays-blur, 12px));
  }
  :host([origin="left"]) .rays { --lr-x: 12%; }
  :host([origin="right"]) .rays { --lr-x: 88%; }

  /* Each ray is a narrow conic wedge anchored at the (off-frame) origin point.
     The oversized inset pushes the apex above the box and hides edges while
     the wedge sways. Static paint (SSR / reduced motion): peak opacity, no
     rotation, which is the final presentable state. */
  .ray {
    position: absolute;
    inset: -18%;
    opacity: var(--lr-peak, 0.5);
    transform-origin: var(--lr-x, 50%) 0%;
    background: conic-gradient(
      from var(--lr-start, 178deg) at var(--lr-x, 50%) 0%,
      transparent 0deg,
      var(--pura-light-rays-color, #fff7e0) calc(var(--lr-w, 4deg) / 2),
      transparent var(--lr-w, 4deg)
    );
  }

  @keyframes pura-light-rays-sway {
    0%, 100% {
      transform: rotate(calc(var(--lr-sway, 3deg) * -1));
      opacity: calc(var(--lr-peak, 0.5) * 0.55);
    }
    50% {
      transform: rotate(var(--lr-sway, 3deg));
      opacity: var(--lr-peak, 0.5);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .ray {
      animation: pura-light-rays-sway var(--lr-dur, 10s) ease-in-out var(--lr-delay, 0s) infinite;
    }
  }
`;
