// Pure render for <pura-circular-text>. No DOM; safe on server (SSR/DSD) and
// client. The whole badge is static markup: an SVG circle path with the text
// justified around the full circumference via textLength, an optional center
// slot that stays still, and a visually-hidden accessible copy of the text
// (the SVG copy is aria-hidden). The continuous spin is a single CSS
// @keyframes on the SVG, gated behind prefers-reduced-motion: no-preference,
// so SSR / pre-JS / reduced motion all show the same presentable static seal.
import { EMPTY_SHIM } from "../base.js";

// Minimal escaping for interpolated text content / attribute values.
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

export function circularTextTemplate(el = EMPTY_SHIM) {
  const text = el.getAttribute("text") || "PURA • WEB COMPONENTS • ";

  const repeatN = parseInt(el.getAttribute("repeat") || "", 10);
  const repeat = Number.isFinite(repeatN) && repeatN >= 1 && repeatN <= 20 ? repeatN : 1;

  const radiusN = parseFloat(el.getAttribute("radius") || "");
  const r = Number.isFinite(radiusN) && radiusN > 0 ? radiusN : 80;

  const speedN = parseFloat(el.getAttribute("speed") || "");
  const speed = Number.isFinite(speedN) && speedN > 0 ? speedN : 20;

  const ccw = el.getAttribute("direction") === "ccw";

  // Headroom outside the circle so glyphs sitting on the path never clip.
  const pad = 28;
  const size = 2 * (r + pad);
  const c = size / 2;

  // Clockwise circle starting at 12 o'clock, so the text reads upright across
  // the top of the seal (glyph tops face outward).
  const d = `M ${c} ${pad} A ${r} ${r} 0 1 1 ${c} ${size - pad} A ${r} ${r} 0 1 1 ${c} ${pad}`;

  // Justify the (repeated) text around the exact circumference so the ring is
  // evenly filled and the loop point is seamless. Deterministic: pure math.
  const circumference = (2 * Math.PI * r).toFixed(2);
  const ringText = esc(text.repeat(repeat));

  const html = `<div class="wrap" part="wrap">
      <svg class="ring" part="ring" viewBox="0 0 ${size} ${size}" aria-hidden="true" focusable="false">
        <defs>
          <path id="pura-circular-text-path" d="${d}" fill="none"></path>
        </defs>
        <text class="label" part="label">
          <textPath href="#pura-circular-text-path" textLength="${circumference}" lengthAdjust="spacing">${ringText}</textPath>
        </text>
      </svg>
      <div class="center" part="center"><slot></slot></div>
      <span class="a11y">${esc(text)}</span>
    </div>`;

  const css = `
    :host {
      display: inline-block;
      --pura-circular-text-duration: ${speed}s;
      --pura-circular-text-to: ${ccw ? "-360deg" : "360deg"};
    }

    .wrap {
      position: relative;
      inline-size: var(--pura-circular-text-diameter, ${size}px);
      aspect-ratio: 1;
    }

    .ring {
      display: block;
      inline-size: 100%;
      block-size: 100%;
      overflow: visible;
    }

    .label {
      fill: var(--pura-circular-text-color, currentColor);
      font-size: var(--pura-circular-text-size, 14px);
      font-weight: var(--pura-circular-text-weight, 600);
      letter-spacing: var(--pura-circular-text-tracking, 0.16em);
      text-transform: var(--pura-circular-text-transform, uppercase);
    }

    /* Center content sits on top of the ring and does not spin. */
    .center {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
    }

    /* Visually-hidden accessible copy of the text (the SVG is aria-hidden). */
    .a11y {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
      border: 0;
    }

    @keyframes pura-circular-text-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(var(--pura-circular-text-to, 360deg)); }
    }

    /* The continuous spin only runs when motion is welcome; reduced motion
       keeps the static circle of text, which is the complete final state. */
    @media (prefers-reduced-motion: no-preference) {
      .ring {
        animation: pura-circular-text-spin var(--pura-circular-text-duration, 20s) linear infinite;
        will-change: transform;
      }

      /* Explicit paused state. */
      :host([paused]) .ring { animation-play-state: paused; }

      /* Pause on hover/focus when opted in (not motion-only: state is also
         mirrored via attributes and the imperative API). */
      :host([pause-on-hover]) .wrap:hover .ring,
      :host([pause-on-hover]:focus-within) .ring {
        animation-play-state: paused;
      }
    }
  `;

  return { html, css };
}
