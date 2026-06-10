// Pure render for <pura-noise>. No DOM; safe on server (SSR/DSD) and client.
// Animated film-grain overlay: an SVG feTurbulence tile embedded as a data URI
// in the background of an absolutely positioned layer, shuffled by a steps()
// @keyframes on background-position to read as living analog grain. The tile
// repeats, so shifting the position never exposes an edge. Zero JS, fully
// deterministic (no Math.random, no clock), byte-identical on server and client.
//
// SSR / pre-JS: the static grain texture paints immediately.
// Reduced motion: the shuffle animation is gated behind
//   prefers-reduced-motion: no-preference, so the grain holds still.
import { EMPTY_SHIM } from "../base.js";

// Clamped numeric attribute read; falls back to a deterministic default.
function num(el, name, fallback, min, max) {
  const n = parseFloat(el.getAttribute(name));
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

const BLEND_RE = /^[a-z][a-z-]*$/;

export function noiseTemplate(el = EMPTY_SHIM) {
  const opacity = num(el, "opacity", 0.08, 0, 1);
  const size = num(el, "size", 256, 16, 1024);
  const frequency = num(el, "frequency", 0.8, 0.05, 4);
  const fps = num(el, "fps", 12, 1, 60);
  const rawBlend = el.getAttribute("blend") || "";
  const blend = BLEND_RE.test(rawBlend) ? rawBlend : "overlay";
  // 10 shuffle frames per loop; duration derives from the requested grain fps.
  const duration = (10 / fps).toFixed(3);

  // Monochrome fractal-noise tile (feColorMatrix saturate 0 strips the color
  // that feTurbulence emits), URI-encoded for use inside url("...").
  const tile =
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E` +
    `%3Cfilter id='n'%3E` +
    `%3CfeTurbulence type='fractalNoise' baseFrequency='${frequency}' numOctaves='4' stitchTiles='stitch'/%3E` +
    `%3CfeColorMatrix type='saturate' values='0'/%3E` +
    `%3C/filter%3E` +
    `%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E` +
    `%3C/svg%3E`;

  const html = `<slot></slot><span class="grain" part="grain" aria-hidden="true"></span>`;

  const css = `
    :host {
      position: relative;
      display: block;
    }

    .grain {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image: url("${tile}");
      background-size: var(--pura-noise-size, ${size}px);
      opacity: var(--pura-noise-opacity, ${opacity});
      mix-blend-mode: var(--pura-noise-blend, ${blend});
    }

    /* Deterministic 10-frame shuffle; with steps(1, end) each frame holds,
       then jumps, which is what makes the grain read as live film stock. */
    @keyframes pura-noise-shift {
      0% { background-position: 0 0; }
      10% { background-position: -32px -16px; }
      20% { background-position: 24px -48px; }
      30% { background-position: -64px 32px; }
      40% { background-position: 48px 56px; }
      50% { background-position: -24px 64px; }
      60% { background-position: 64px -32px; }
      70% { background-position: -48px -64px; }
      80% { background-position: 16px 40px; }
      90% { background-position: -56px 8px; }
      100% { background-position: 0 0; }
    }

    @media (prefers-reduced-motion: no-preference) {
      :host(:not([static])) .grain {
        animation: pura-noise-shift var(--pura-noise-duration, ${duration}s) steps(1, end) infinite;
      }
    }
  `;

  return { html, css };
}
