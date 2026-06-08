// Pure render for <pura-skeleton>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function skeletonTemplate(el = EMPTY_SHIM) {
  const html = `<div part="skeleton" role="presentation" aria-hidden="true"></div>`;
  return { html, css: SKELETON_CSS };
}

export const SKELETON_CSS = `
  :host { display: block; }
  :host([circle]) { display: inline-block; }

  [part="skeleton"] {
    width: 100%;
    height: 1em;
    border-radius: var(--pura-radius-sm);
    background-color: var(--pura-subtle);
    /* moving shimmer over the subtle base */
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      var(--pura-subtle-hover) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    background-repeat: no-repeat;
    background-position: 200% 0;
    animation: pura-skeleton-shimmer 1.4s var(--pura-ease) infinite;
  }

  :host([circle]) [part="skeleton"] {
    border-radius: var(--pura-radius-full);
    aspect-ratio: 1 / 1;
  }

  @keyframes pura-skeleton-shimmer {
    to { background-position: -200% 0; }
  }

  /* Reduced motion: drop the moving gradient, keep a gentle opacity pulse.
     The base reset clamps animation-duration, so pulse stays effectively
     static while preserving the placeholder appearance. */
  @media (prefers-reduced-motion: reduce) {
    [part="skeleton"] {
      background-image: none;
      animation-name: pura-skeleton-pulse;
    }
  }

  @keyframes pura-skeleton-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.55; }
  }
`;
