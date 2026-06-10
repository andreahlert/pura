// Pure render for <pura-snow>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

// Deterministic per-index scatter so the server and client paint byte-identical
// snowfields (no Math.random, which would diverge between renders). Three depth
// layers cycle by index: far flakes are smaller, dimmer and slower; near flakes
// are bigger, brighter and faster, which reads as parallax.
function flakeStyle(i) {
  const layer = i % 3; // 0 = far, 1 = mid, 2 = near
  const left = (i * 137) % 100; // golden-ish horizontal spread
  const top = (i * 53) % 100; // static resting spot (reduced motion / pre-anim)
  const size = (2 + layer * 1.6 + ((i * 7) % 10) / 10).toFixed(1);
  const dur = (16 - layer * 4 + ((i * 1.3) % 4)).toFixed(2);
  const delay = (-((i * 1.7) % dur)).toFixed(2); // negative: field is mid-fall at first paint
  const sway = 6 + ((i * 13) % 18);
  const swayDur = (2.5 + ((i * 0.37) % 2.5)).toFixed(2);
  const swayDelay = (-((i * 0.9) % swayDur)).toFixed(2);
  const opacity = (0.45 + layer * 0.25 + ((i * 11) % 10) / 100).toFixed(2);
  return (
    `left:${left}%;` +
    `--pura-snow-flake-top:${top}%;` +
    `--pura-snow-flake-size:${size}px;` +
    `--pura-snow-flake-dur:${dur}s;` +
    `--pura-snow-flake-delay:${delay}s;` +
    `--pura-snow-flake-sway:${sway}px;` +
    `--pura-snow-flake-sway-dur:${swayDur}s;` +
    `--pura-snow-flake-sway-delay:${swayDelay}s;` +
    `--pura-snow-flake-opacity:${opacity}`
  );
}

export function snowTemplate(el = EMPTY_SHIM) {
  const raw = parseInt(el.getAttribute("count"), 10);
  const count = Number.isFinite(raw) && raw > 0 ? Math.min(raw, 160) : 48;
  let spans = "";
  for (let i = 0; i < count; i++) {
    spans += `<span class="flake" part="flake" style="${flakeStyle(i)}"></span>`;
  }
  const html = `<span class="field" part="field" aria-hidden="true">${spans}</span><slot></slot>`;
  return { html, css: SNOW_CSS };
}

export const SNOW_CSS = `
  :host {
    position: relative;
    display: block;
    overflow: hidden;
  }

  .field {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .flake {
    position: absolute;
    /* Static scattered position: this is what SSR paints before the animation
       kicks in and what reduced motion keeps, so the page looks like a still
       snowfall snapshot rather than an empty box. */
    top: var(--pura-snow-flake-top, 50%);
    width: calc(var(--pura-snow-flake-size, 4px) * var(--pura-snow-size, 1));
    height: calc(var(--pura-snow-flake-size, 4px) * var(--pura-snow-size, 1));
    border-radius: var(--pura-radius-full, 999px);
    background: var(--pura-snow-color, #fff);
    box-shadow: 0 0 4px 0 var(--pura-snow-glow, color-mix(in oklab, var(--pura-snow-color, #fff) 55%, transparent));
    opacity: var(--pura-snow-flake-opacity, 0.8);
  }

  @media (prefers-reduced-motion: no-preference) {
    .flake {
      animation:
        pura-snow-fall calc(var(--pura-snow-flake-dur, 12s) / var(--pura-snow-speed, 1)) linear infinite,
        pura-snow-sway var(--pura-snow-flake-sway-dur, 3s) ease-in-out infinite alternate;
      animation-delay:
        var(--pura-snow-flake-delay, 0s),
        var(--pura-snow-flake-sway-delay, 0s);
    }
  }

  /* Fall animates top in container percentages, so flakes traverse the host at
     any height; sway animates transform on the same element (different
     properties, so the two animations compose). */
  @keyframes pura-snow-fall {
    from { top: -6%; }
    to { top: 106%; }
  }

  @keyframes pura-snow-sway {
    from { transform: translateX(calc(-1 * var(--pura-snow-flake-sway, 10px) * var(--pura-snow-drift, 1))); }
    to { transform: translateX(calc(var(--pura-snow-flake-sway, 10px) * var(--pura-snow-drift, 1))); }
  }
`;
