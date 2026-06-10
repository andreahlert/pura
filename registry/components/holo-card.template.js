// Pure render for <pura-holo-card>. No DOM; safe on server (SSR/DSD) and client.
// A trading-card holographic foil: an iridescent rainbow gradient and a soft
// glare are blended over the slotted content, and their background-position /
// center are read from --pura-holo-mx / --pura-holo-my, which the JS layer
// updates on pointermove (plus --pura-holo-rx/-ry when tilt is enabled).
// At rest every var sits at 50% / 0deg, so the server paints a flat card with
// a centred, dimmed sheen: a finished, presentable static state.
import { EMPTY_SHIM } from "../base.js";

function clamp01(raw, fallback) {
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 && n <= 1 ? n : fallback;
}

function safeAngle(raw, fallback) {
  const n = Number(raw);
  return Number.isFinite(n) ? ((n % 360) + 360) % 360 : fallback;
}

export function holoCardTemplate(el = EMPTY_SHIM) {
  const intensity = clamp01(el.getAttribute("intensity"), 0.75);
  const angle = safeAngle(el.getAttribute("angle"), 115);
  const sparkle = el.hasAttribute("sparkle");

  const sparkleHtml = sparkle
    ? `<span class="sparkle" part="sparkle" aria-hidden="true"></span>`
    : "";
  const html = `<div class="frame" part="frame"><slot></slot><span class="foil" part="foil" aria-hidden="true"></span>${sparkleHtml}<span class="glare" part="glare" aria-hidden="true"></span></div>`;

  const css = `
    :host {
      display: block;
      perspective: 900px;
      --pura-holo-mx: 50%;
      --pura-holo-my: 50%;
      --pura-holo-rx: 0deg;
      --pura-holo-ry: 0deg;
    }
    .frame {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: var(--pura-holo-card-radius, 16px);
      background: var(--pura-holo-card-bg, var(--pura-surface, #18181b));
      overflow: hidden;
      isolation: isolate;
      transform: rotateX(var(--pura-holo-rx)) rotateY(var(--pura-holo-ry));
      transition: transform 0.5s ease;
      will-change: transform;
    }
    .foil,
    .sparkle,
    .glare {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
    }

    /* Iridescent rainbow stripes; background-position slides with the pointer. */
    .foil {
      background-image: linear-gradient(
        ${angle}deg,
        hsl(2 100% 73%) 0%,
        hsl(53 100% 69%) 9%,
        hsl(93 100% 69%) 18%,
        hsl(176 100% 76%) 27%,
        hsl(228 100% 74%) 36%,
        hsl(283 100% 73%) 45%,
        hsl(2 100% 73%) 54%,
        hsl(53 100% 69%) 63%,
        hsl(93 100% 69%) 72%,
        hsl(176 100% 76%) 81%,
        hsl(228 100% 74%) 90%,
        hsl(283 100% 73%) 100%
      );
      background-size: 300% 300%;
      background-position: var(--pura-holo-mx) var(--pura-holo-my);
      mix-blend-mode: color-dodge;
      filter: saturate(1.2) contrast(1.05);
      opacity: ${(intensity * 0.55).toFixed(3)};
      transition: background-position 0.5s ease, opacity 0.4s ease;
    }

    /* Glitter dots drifting against the foil for extra texture. */
    .sparkle {
      background-image:
        radial-gradient(circle at 25% 35%, rgba(255, 255, 255, 0.9) 0 1px, transparent 2.5px),
        radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.8) 0 1px, transparent 2.5px),
        radial-gradient(circle at 45% 80%, rgba(255, 255, 255, 0.7) 0 1px, transparent 2px);
      background-size: 28px 28px, 34px 34px, 22px 22px;
      background-position:
        calc(100% - var(--pura-holo-mx)) calc(100% - var(--pura-holo-my)),
        var(--pura-holo-mx) calc(100% - var(--pura-holo-my)),
        calc(100% - var(--pura-holo-mx)) var(--pura-holo-my);
      mix-blend-mode: overlay;
      opacity: ${(intensity * 0.5).toFixed(3)};
      transition: background-position 0.5s ease, opacity 0.4s ease;
    }

    /* Soft white glare that follows the pointer; hidden at rest. */
    .glare {
      background: radial-gradient(
        farthest-corner circle at var(--pura-holo-mx) var(--pura-holo-my),
        rgba(255, 255, 255, 0.55) 5%,
        rgba(255, 255, 255, 0.12) 35%,
        transparent 70%
      );
      mix-blend-mode: soft-light;
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    /* While the pointer drives, track it raw; the transition eases the settle. */
    :host([data-pura-holo-active]) .frame,
    :host([data-pura-holo-active]) .foil,
    :host([data-pura-holo-active]) .sparkle {
      transition: none;
    }
    :host([data-pura-holo-active]) .foil { opacity: ${intensity.toFixed(3)}; }
    :host([data-pura-holo-active]) .sparkle { opacity: ${Math.min(1, intensity * 0.9).toFixed(3)}; }
    :host([data-pura-holo-active]) .glare { opacity: 1; }

    /* Reduced motion: keep the resting sheen, never engage glare or tilt. */
    @media (prefers-reduced-motion: reduce) {
      .frame { transform: none; }
      .foil { background-position: 50% 50%; }
      .glare { opacity: 0 !important; }
    }

    ::slotted(*) { position: relative; }
  `;

  return { html, css };
}
