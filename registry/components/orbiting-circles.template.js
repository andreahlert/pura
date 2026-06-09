// Pure render for <pura-orbiting-circles>. No DOM; safe on server (SSR/DSD) and
// client. Deterministic per-index placement so server and client paint
// byte-identically (no Math.random).
import { EMPTY_SHIM } from "../base.js";

export function orbitingCirclesTemplate(el = EMPTY_SHIM) {
  // Satellites ride a circular orbit around slotted centre content, in the style
  // of Magic UI's Orbiting Circles. One CSS @keyframes rotates each satellite's
  // arm; a negative animation-delay spreads them evenly around the ring, so the
  // field is filled from the first frame. Motion is pure CSS, no runtime.
  const raw = parseInt(el.getAttribute("count"), 10);
  const count = Number.isFinite(raw) && raw > 0 ? Math.min(raw, 24) : 5;
  const dur = el.getAttribute("duration") || "20";
  const reverse = el.hasAttribute("reverse");

  let arms = "";
  for (let i = 0; i < count; i++) {
    // Negative delay = fraction of the loop already elapsed, spreading satellites
    // around the circle. Deterministic, no randomness.
    const delay = -((i / count) * Number(dur)).toFixed(3);
    arms += `<span class="arm" part="arm" style="animation-delay:${delay}s"><span class="sat" part="satellite"></span></span>`;
  }

  const dirClass = reverse ? " reverse" : "";
  const html =
    `<span class="ring" part="ring" aria-hidden="true"></span>` +
    `<span class="orbit${dirClass}" part="orbit" aria-hidden="true">${arms}</span>` +
    `<span class="center" part="center"><slot></slot></span>`;
  return { html, css: orbitingCss(dur) };
}

function orbitingCss(dur) {
  return `
  :host {
    position: relative;
    display: grid;
    place-items: center;
    width: var(--pura-orbit-size, 240px);
    height: var(--pura-orbit-size, 240px);
  }

  .center {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
  }

  /* The dashed path the satellites travel. */
  .ring {
    position: absolute;
    width: calc(var(--pura-orbit-radius, 90px) * 2);
    height: calc(var(--pura-orbit-radius, 90px) * 2);
    border-radius: 50%;
    border: 1px dashed var(--pura-orbit-ring, color-mix(in oklab, var(--pura-fg, #71717a) 22%, transparent));
    pointer-events: none;
  }

  .orbit {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .arm {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    /* base.js RESET collapses animation-duration under reduced motion, so the
       satellites come to rest with no separate guard. */
    animation: pura-orbit-spin var(--pura-orbit-duration, ${dur}s) linear infinite;
  }

  .orbit.reverse .arm { animation-direction: reverse; }

  .sat {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--pura-orbit-dot, 14px);
    height: var(--pura-orbit-dot, 14px);
    margin: calc(var(--pura-orbit-dot, 14px) / -2) 0 0 calc(var(--pura-orbit-dot, 14px) / -2);
    border-radius: 50%;
    background: var(--pura-orbit-color, var(--pura-primary, #6366f1));
    box-shadow: 0 0 12px 1px var(--pura-orbit-glow, color-mix(in oklab, var(--pura-primary, #6366f1) 55%, transparent));
    /* Sit the satellite out on the radius; the arm's rotation carries it around. */
    transform: translateX(var(--pura-orbit-radius, 90px));
  }

  @keyframes pura-orbit-spin {
    to { transform: rotate(360deg); }
  }
`;
}
