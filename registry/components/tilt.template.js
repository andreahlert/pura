// Pure render for <pura-tilt>. No DOM; safe on server (SSR/DSD) and client.
// A perspective wrapper whose .content rotates by --pura-tilt-rx/--pura-tilt-ry
// (set from pointer position by the JS layer) around its center. The optional
// glare is a radial highlight that follows the pointer across the surface.
// At rest all vars are 0/50%, so SSR renders a flat, untransformed card.
import { EMPTY_SHIM } from "../base.js";

function safeNum(raw, fallback) {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function tiltTemplate(el = EMPTY_SHIM) {
  const perspective = safeNum(el.getAttribute("perspective"), 900);
  const glare = el.hasAttribute("glare");

  const glareHtml = glare ? `<div class="glare" part="glare" aria-hidden="true"></div>` : "";
  const html = `<div class="content" part="content"><slot></slot>${glareHtml}</div>`;

  const css = `
    :host {
      display: inline-block;
      perspective: ${perspective}px;
      --pura-tilt-rx: 0deg;
      --pura-tilt-ry: 0deg;
      --pura-tilt-scale: 1;
      --pura-tilt-gx: 50%;
      --pura-tilt-gy: 50%;
      --pura-tilt-dur: 0.6s;
      --pura-tilt-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .content {
      position: relative;
      transform-style: preserve-3d;
      transform:
        rotateX(var(--pura-tilt-rx))
        rotateY(var(--pura-tilt-ry))
        scale(var(--pura-tilt-scale));
      transition: transform var(--pura-tilt-dur) var(--pura-tilt-ease);
      will-change: transform;
    }
    /* While the pointer drives, track it raw; the spring eases the settle. */
    :host([data-pura-tilt-active]) .content {
      transition: none;
    }
    .glare {
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: inherit;
      background: radial-gradient(
        circle at var(--pura-tilt-gx) var(--pura-tilt-gy),
        rgba(255, 255, 255, 0.35),
        transparent 55%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    :host([data-pura-tilt-active]) .glare {
      opacity: 1;
    }
  `;

  return { html, css };
}
