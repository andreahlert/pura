// Pure render for <pura-gradient-text>. No DOM; safe on server (SSR/DSD) and client.
// Multicolor gradient fill that flows continuously across the glyphs (aurora
// style): a wide linear-gradient clipped to the text (background-clip: text)
// with background-position animated in a seamless ping-pong loop. Pure CSS
// @keyframes; no per-frame JS. Distinct from <pura-text-shimmer>, which sweeps
// a single highlight band over a base color.
//
// SSR / pre-JS: the static gradient paints immediately, fully presentable.
// Reduced motion: the flow is gated behind prefers-reduced-motion: no-preference
// (and base.js RESET collapses durations), so the gradient freezes in place.
import { EMPTY_SHIM } from "../base.js";

// Aurora default palette; first color repeated so the gradient tiles smoothly.
const DEFAULT_COLORS = "#40ffaa, #4079ff, #a855f7, #ff6ec4, #40ffaa";

// Keep attribute values safe to inline in CSS (colors, functions, percents).
const SAFE_COLOR_RE = /^[#a-zA-Z0-9(),.%\s-]+$/;
const SAFE_ANGLE_RE = /^-?\d+(\.\d+)?(deg|grad|rad|turn)$/;

export function gradientTextTemplate(el = EMPTY_SHIM) {
  const rawColors = el.getAttribute("colors");
  const colors =
    rawColors && SAFE_COLOR_RE.test(rawColors)
      ? rawColors
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean)
          .join(", ")
      : DEFAULT_COLORS;

  const rawAngle = el.getAttribute("angle");
  const angle = rawAngle && SAFE_ANGLE_RE.test(rawAngle.trim()) ? rawAngle.trim() : "90deg";

  const rawDuration = parseFloat(el.getAttribute("duration"));
  const duration = Number.isFinite(rawDuration) && rawDuration > 0 ? rawDuration : 8;

  const html = `<span class="gradient" part="text"><slot></slot></span>`;

  const css = `
    :host {
      display: inline-block;
    }

    .gradient {
      background-image: var(
        --pura-gradient-text-gradient,
        linear-gradient(var(--pura-gradient-text-angle, ${angle}), ${colors})
      );
      background-size: var(--pura-gradient-text-size, 300% 100%);
      background-position: 0% 50%;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
    }

    /* Seamless ping-pong loop: 0% -> 100% -> 0% needs no duplicated end stop. */
    @keyframes pura-gradient-text-flow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @media (prefers-reduced-motion: no-preference) {
      .gradient {
        animation: pura-gradient-text-flow
          var(--pura-gradient-text-duration, ${duration}s) linear infinite;
      }
    }
  `;

  return { html, css };
}
