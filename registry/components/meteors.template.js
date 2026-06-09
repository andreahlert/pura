// Pure render for <pura-meteors>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

// Deterministic per-index scatter so the server and client paint byte-identical
// meteor fields (no Math.random, which would diverge between renders).
function meteorStyle(i) {
  const left = (i * 137) % 100; // golden-ish horizontal spread
  const delay = ((i * 0.53) % 5).toFixed(2);
  const dur = (3 + ((i * 0.7) % 5)).toFixed(2);
  const len = 50 + ((i * 23) % 60); // tail length px
  return `left:${left}%;--pura-meteor-delay:${delay}s;--pura-meteor-duration:${dur}s;--pura-meteor-tail:${len}px`;
}

export function meteorsTemplate(el = EMPTY_SHIM) {
  const raw = parseInt(el.getAttribute("count"), 10);
  const count = Number.isFinite(raw) && raw > 0 ? Math.min(raw, 80) : 14;
  let spans = "";
  for (let i = 0; i < count; i++) {
    spans += `<span class="meteor" part="meteor" style="${meteorStyle(i)}"></span>`;
  }
  const html = `<span class="field" part="field" aria-hidden="true">${spans}</span><slot></slot>`;
  return { html, css: METEORS_CSS };
}

export const METEORS_CSS = `
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

  .meteor {
    position: absolute;
    top: -10%;
    width: 2px;
    height: 2px;
    border-radius: var(--pura-radius-full, 999px);
    background: var(--pura-meteor-color, var(--pura-fg, #94a3b8));
    box-shadow: 0 0 6px 1px var(--pura-meteor-glow, color-mix(in oklab, var(--pura-fg, #94a3b8) 60%, transparent));
    transform: rotate(215deg);
    /* base.js RESET collapses animation-duration under reduced motion, so the
       meteors hold still with no separate guard. */
    animation: pura-meteor-fall var(--pura-meteor-duration, 5s) linear infinite;
    animation-delay: var(--pura-meteor-delay, 0s);
    opacity: 0;
  }

  .meteor::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: var(--pura-meteor-tail, 60px);
    height: 1px;
    transform: translateY(-50%);
    background: linear-gradient(
      90deg,
      var(--pura-meteor-color, var(--pura-fg, #94a3b8)),
      transparent
    );
  }

  @keyframes pura-meteor-fall {
    0% { transform: rotate(215deg) translateX(0); opacity: 1; }
    70% { opacity: 1; }
    100% { transform: rotate(215deg) translateX(140vw); opacity: 0; }
  }
`;
