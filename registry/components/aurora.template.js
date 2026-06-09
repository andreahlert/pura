// Pure render for <pura-aurora>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function auroraTemplate(el = EMPTY_SHIM) {
  // A blurred, slowly drifting field of layered color blobs behind the slotted
  // content, evoking the northern lights. Motion is a single CSS @keyframes pan
  // and rotate, so the server paints a static gradient and the client animates.
  const html = `<span class="aurora" part="aurora" aria-hidden="true"></span><slot></slot>`;
  return { html, css: AURORA_CSS };
}

export const AURORA_CSS = `
  :host {
    position: relative;
    display: block;
    overflow: hidden;
    isolation: isolate;
  }

  .aurora {
    position: absolute;
    inset: -60%;
    z-index: -1;
    pointer-events: none;
    opacity: var(--pura-aurora-opacity, 0.7);
    filter: blur(var(--pura-aurora-blur, 48px));
    background:
      radial-gradient(40% 50% at 25% 30%, var(--pura-aurora-1, #6366f1) 0%, transparent 60%),
      radial-gradient(35% 45% at 70% 25%, var(--pura-aurora-2, #d946ef) 0%, transparent 60%),
      radial-gradient(45% 55% at 55% 75%, var(--pura-aurora-3, #06b6d4) 0%, transparent 60%),
      radial-gradient(30% 40% at 85% 70%, var(--pura-aurora-4, #22c55e) 0%, transparent 60%);
    background-size: 200% 200%;
    /* base.js RESET collapses animation-duration under reduced motion, so the
       field comes to rest with no separate guard. */
    animation: pura-aurora-drift var(--pura-aurora-duration, 18s) ease-in-out infinite alternate;
  }

  @keyframes pura-aurora-drift {
    0%   { background-position: 0% 50%; transform: rotate(0deg) scale(1.1); }
    50%  { background-position: 100% 50%; transform: rotate(8deg) scale(1.25); }
    100% { background-position: 50% 100%; transform: rotate(-6deg) scale(1.1); }
  }
`;
