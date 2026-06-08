// Pure render for <pura-reveal>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function revealTemplate(el = EMPTY_SHIM) {
  const html = `<div class="content" part="content"><slot></slot></div>`;
  return { html, css: REVEAL_CSS };
}

export const REVEAL_CSS = `
  :host { display: block; }

  .content { will-change: opacity, transform; }

  /* The hidden initial state and the delay are scoped to no-preference so that
     reduced-motion users see the content immediately, from first paint, with
     zero delay and zero dependence on the observer firing. opacity/transform
     keep slotted content in the accessibility tree the whole time. */
  @media (prefers-reduced-motion: no-preference) {
    .content {
      opacity: 1;
      transform: none;
      transition:
        opacity var(--pura-dur) var(--pura-ease),
        transform var(--pura-dur) var(--pura-ease);
      transition-delay: var(--_reveal-delay, 0ms);
    }

    :host(:not([revealed])) .content { opacity: 0; }

    :host([animation="slide-up"]:not([revealed])) .content {
      transform: translateY(var(--pura-space-5));
    }
    :host([animation="zoom"]:not([revealed])) .content {
      transform: scale(0.94);
    }
  }
`;
