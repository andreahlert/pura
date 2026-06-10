// Pure render for <pura-sparkles-text>. No DOM; safe on server (SSR/DSD) and client.
// Decorates the slotted text with a field of tiny four-point SVG stars that are
// born, twinkle (scale/opacity/rotate) and die around the letters. The stars are
// scattered deterministically per index (no Math.random), so the server and
// client paint byte-identical fields and the effect runs with zero client JS.
//
// SSR / pre-JS: the CSS keyframes animate from first paint; without any JS the
// headline already sparkles. Reduced motion: stars hold still at a soft static
// scale/opacity instead of pulsing.
import { EMPTY_SHIM } from "../base.js";

// Deterministic per-index scatter (golden-ratio style stepping, like
// pura-meteors) so SSR and client renders never diverge.
function sparkleStyle(i, dur) {
  const left = ((i * 137 + 9) % 104) - 2; // -2..102% — spill past the edges
  const top = ((i * 53 + 17) % 120) - 10; // -10..110% — above and below the line
  const delay = ((i * 0.41) % dur).toFixed(2);
  const scale = (0.5 + ((i * 29) % 60) / 100).toFixed(2); // 0.50..1.09
  const spin = (i * 47) % 360;
  return (
    `left:${left}%;top:${top}%;` +
    `--pura-st-delay:${delay}s;--pura-st-scale:${scale};--pura-st-spin:${spin}deg`
  );
}

const STAR_PATH =
  "M12 0c.7 6.8 4.5 10.6 11.3 11.3v1.4C16.5 13.4 12.7 17.2 12 24h-1.4C9.9 17.2 6.1 13.4-.7 12.7v-1.4C6.1 10.6 9.9 6.8 10.6 0H12z";

export function sparklesTextTemplate(el = EMPTY_SHIM) {
  const rawCount = parseInt(el.getAttribute("count"), 10);
  const count = Number.isFinite(rawCount) && rawCount > 0 ? Math.min(rawCount, 40) : 10;
  const rawDur = parseFloat(el.getAttribute("duration"));
  const dur = Number.isFinite(rawDur) && rawDur > 0 ? rawDur : 1.6;

  let stars = "";
  for (let i = 0; i < count; i++) {
    stars +=
      `<span class="sparkle ${i % 2 ? "alt" : ""}" part="sparkle" style="${sparkleStyle(i, dur)}">` +
      `<svg viewBox="0 0 24 24" fill="currentColor"><path d="${STAR_PATH}"/></svg>` +
      `</span>`;
  }

  // The sparkles are purely decorative (aria-hidden); the slotted text stays in
  // the light DOM untouched, so it is the accessible copy from first paint.
  const html =
    `<span class="field" part="field" aria-hidden="true">${stars}</span>` +
    `<slot></slot>`;

  const css = `
    :host {
      position: relative;
      display: inline-block;
      --pura-st-duration: ${dur}s;
    }

    .field {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: visible;
    }

    .sparkle {
      position: absolute;
      width: var(--pura-sparkles-text-size, 0.55em);
      height: var(--pura-sparkles-text-size, 0.55em);
      color: var(--pura-sparkles-text-color, #f5c518);
      /* static fallback: a soft, visible star (reduced motion, old browsers) */
      opacity: 0.75;
      transform: translate(-50%, -50%) rotate(var(--pura-st-spin, 0deg))
        scale(calc(var(--pura-st-scale, 1) * 0.8));
    }
    .sparkle.alt {
      color: var(--pura-sparkles-text-color-alt, #a855f7);
    }
    .sparkle svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    @keyframes pura-sparkle-twinkle {
      0%, 100% {
        opacity: 0;
        transform: translate(-50%, -50%) rotate(var(--pura-st-spin, 0deg)) scale(0);
      }
      50% {
        opacity: 1;
        transform: translate(-50%, -50%)
          rotate(calc(var(--pura-st-spin, 0deg) + 120deg))
          scale(var(--pura-st-scale, 1));
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      .sparkle {
        animation: pura-sparkle-twinkle var(--pura-st-duration, 1.6s) ease-in-out infinite;
        animation-delay: var(--pura-st-delay, 0s);
      }
    }
  `;

  return { html, css };
}
