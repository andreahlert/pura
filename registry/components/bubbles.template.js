// Pure render for <pura-bubbles>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

// Deterministic per-index scatter so the server and client paint byte-identical
// bubble fields (no Math.random, which would diverge between renders).
function bubbleStyle(i) {
  const left = (i * 137) % 100; // golden-ish horizontal spread
  const size = 10 + ((i * 29) % 34); // diameter px
  const seat = 4 + ((i * 47) % 72); // static resting bottom % (SSR / reduced motion)
  const delay = ((i * 0.67) % 7).toFixed(2);
  const dur = (6 + ((i * 0.93) % 7)).toFixed(2);
  const sway = 6 + ((i * 13) % 22); // lateral oscillation px
  const swayDur = (2 + ((i * 0.41) % 2.6)).toFixed(2);
  return (
    `left:${left}%;width:${size}px;height:${size}px;` +
    `--pura-bubble-seat:${seat}%;--pura-bubble-delay:${delay}s;` +
    `--pura-bubble-duration:${dur}s;--pura-bubble-sway:${sway}px;` +
    `--pura-bubble-sway-duration:${swayDur}s`
  );
}

export function bubblesTemplate(el = EMPTY_SHIM) {
  const raw = parseInt(el.getAttribute("count"), 10);
  const count = Number.isFinite(raw) && raw > 0 ? Math.min(raw, 80) : 16;
  let spans = "";
  for (let i = 0; i < count; i++) {
    spans += `<span class="bubble" part="bubble" style="${bubbleStyle(i)}"></span>`;
  }
  const html = `<span class="field" part="field" aria-hidden="true">${spans}</span><slot></slot>`;
  return { html, css: BUBBLES_CSS };
}

export const BUBBLES_CSS = `
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

  /* Static state (SSR pre-JS, reduced motion, no animation support): bubbles
     rest scattered at their deterministic seat positions, fully presentable. */
  .bubble {
    position: absolute;
    bottom: var(--pura-bubble-seat, 20%);
    border-radius: 50%;
    opacity: var(--pura-bubbles-opacity, 0.7);
    border: 1px solid var(--pura-bubbles-color, rgba(125, 211, 252, 0.45));
    background:
      radial-gradient(
        circle at 30% 30%,
        var(--pura-bubbles-highlight, rgba(255, 255, 255, 0.85)),
        transparent 45%
      ),
      radial-gradient(
        circle at 50% 50%,
        transparent 55%,
        var(--pura-bubbles-color, rgba(125, 211, 252, 0.45)) 100%
      );
  }

  /* Inner sway carrier: the visual circle oscillates laterally while the outer
     span rises, so two transform animations compose without conflict. */
  .bubble::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }

  @keyframes pura-bubble-rise {
    0% {
      transform: translateY(0) scale(1);
      opacity: 0;
    }
    8% {
      opacity: var(--pura-bubbles-opacity, 0.7);
    }
    88% {
      opacity: var(--pura-bubbles-opacity, 0.7);
      transform: translateY(calc(var(--pura-bubbles-travel, -105vh) * 0.88)) scale(1);
    }
    100% {
      /* soft pop: grow slightly and dissolve near the top */
      transform: translateY(var(--pura-bubbles-travel, -105vh)) scale(1.35);
      opacity: 0;
    }
  }

  @keyframes pura-bubble-sway {
    from { transform: translateX(calc(-1 * var(--pura-bubble-sway, 12px))); }
    to { transform: translateX(var(--pura-bubble-sway, 12px)); }
  }

  /* Continuous motion only when the user has not asked for reduced motion. */
  @media (prefers-reduced-motion: no-preference) {
    .bubble {
      bottom: -12%;
      animation: pura-bubble-rise var(--pura-bubble-duration, 8s) linear infinite;
      animation-delay: var(--pura-bubble-delay, 0s);
      opacity: 0;
    }
    .bubble::before {
      animation: pura-bubble-sway var(--pura-bubble-sway-duration, 3s)
        ease-in-out infinite alternate;
    }
  }
`;
