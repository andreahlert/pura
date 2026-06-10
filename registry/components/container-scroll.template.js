// Pure render for <pura-container-scroll>. No DOM; safe on server (SSR/DSD) and client.
// The famous 3D flatten hero: the slotted screenshot/card starts tilted back in
// perspective (rotateX) and flattens, grows and lifts to face-on as it crosses
// the viewport, tied 1:1 to a scroll-driven timeline (animation-timeline: view())
// with zero per-frame JS. An optional header slot drifts up in sync.
//
// SSR / pre-JS: the card paints in its tilted starting pose, a presentable
// static hero. Browsers without scroll-driven timelines and reduced motion:
// static flat card (the final state), no tilt, no animation.
import { EMPTY_SHIM } from "../base.js";

function clampNum(raw, fallback, min, max) {
  const n = parseFloat(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

// Shared attribute parsing so the element class and the template agree.
export function containerScrollConfig(el = EMPTY_SHIM) {
  return {
    tilt: clampNum(el.getAttribute("tilt"), 20, 0, 80),
    from: clampNum(el.getAttribute("from"), 0.9, 0.1, 2),
    lift: clampNum(el.getAttribute("lift"), 24, -400, 400),
  };
}

export function containerScrollTemplate(el = EMPTY_SHIM) {
  const { tilt, from, lift } = containerScrollConfig(el);

  const html = `<div class="scene" part="scene"><div class="header" part="header"><slot name="header"></slot></div><div class="card" part="card"><slot></slot></div></div>`;

  const css = `
    :host {
      display: block;
      --pura-container-scroll-tilt: ${tilt}deg;
      --pura-container-scroll-from: ${from};
      --pura-container-scroll-lift: ${lift}px;
      --pura-container-scroll-perspective: 1000px;
      --pura-container-scroll-radius: 16px;
      --pura-container-scroll-shadow: 0 30px 60px -24px rgb(0 0 0 / 0.4);
    }
    .scene {
      perspective: var(--pura-container-scroll-perspective);
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .header {
      text-align: center;
    }
    .card {
      flex: 1;
      min-height: 0;
      overflow: hidden;
      border-radius: var(--pura-container-scroll-radius);
      box-shadow: var(--pura-container-scroll-shadow);
      transform-origin: 50% 0;
      /* Starting pose: tilted back in perspective. This is also the SSR paint. */
      transform: rotateX(var(--pura-container-scroll-tilt)) scale(var(--pura-container-scroll-from));
      will-change: transform;
    }
    ::slotted(img), ::slotted(video) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @keyframes pura-container-scroll-card {
      from {
        transform: rotateX(var(--pura-container-scroll-tilt))
          scale(var(--pura-container-scroll-from)) translateY(0);
      }
      to {
        transform: rotateX(0deg) scale(1)
          translateY(calc(-1 * var(--pura-container-scroll-lift)));
      }
    }
    @keyframes pura-container-scroll-header {
      from { transform: translateY(0); }
      to { transform: translateY(calc(-2 * var(--pura-container-scroll-lift))); }
    }

    /* scrub: tie flatten + grow 1:1 to the element's view progress */
    @supports (animation-timeline: scroll()) {
      @media (prefers-reduced-motion: no-preference) {
        :host([data-pura-cs-scrub]) .card {
          animation: pura-container-scroll-card linear both;
          animation-timeline: var(--pura-cs-timeline, view());
          animation-range: var(--pura-cs-range, cover 0% cover 60%);
        }
        :host([data-pura-cs-scrub]) .header {
          animation: pura-container-scroll-header linear both;
          animation-timeline: var(--pura-cs-timeline, view());
          animation-range: var(--pura-cs-range, cover 0% cover 60%);
        }
      }
    }

    /* No scroll-driven timelines: static flat card, the final state. */
    @supports not (animation-timeline: scroll()) {
      .card { transform: none; }
    }

    /* Reduced motion: never tilt, never animate. Land flat. */
    @media (prefers-reduced-motion: reduce) {
      .card { transform: none; animation: none; }
      .header { animation: none; }
    }
  `;

  return { html, css };
}
