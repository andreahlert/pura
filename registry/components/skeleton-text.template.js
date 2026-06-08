// Pure render for <pura-skeleton-text>. No DOM; SSR/DSD + client safe.
// Line count / gap / last-line width derive from attributes with defaults, so the
// server form emits the default 3-line placeholder.
import { EMPTY_SHIM } from "../base.js";

const CSS = `
  :host { display: block; }

  [part="text"] {
    display: flex;
    flex-direction: column;
    gap: var(--pura-skeleton-gap, var(--pura-space-2));
    width: 100%;
  }

  [part="line"] {
    display: block;
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
    animation: pura-skeleton-text-shimmer 1.4s var(--pura-ease) infinite;
  }

  @keyframes pura-skeleton-text-shimmer {
    to { background-position: -200% 0; }
  }

  /* Reduced motion: drop the moving gradient, keep a gentle opacity pulse.
     The base reset clamps animation-duration, so pulse stays effectively
     static while preserving the placeholder appearance. */
  @media (prefers-reduced-motion: reduce) {
    [part="line"] {
      background-image: none;
      animation-name: pura-skeleton-text-pulse;
    }
  }

  @keyframes pura-skeleton-text-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.55; }
  }
`;

export function skeletonTextTemplate(el = EMPTY_SHIM) {
  const raw = parseInt(el.getAttribute("lines"), 10);
  const count = Number.isFinite(raw) && raw > 0 ? raw : 3;
  const gap = el.getAttribute("gap") || "var(--pura-space-2)";
  const last = el.getAttribute("last") || "60%";

  let lines = "";
  for (let i = 0; i < count; i++) {
    const isLast = i === count - 1 && count > 1;
    const style = isLast ? ` style="width:${last}"` : "";
    lines += `<span part="line"${style} data-line="${i}"></span>`;
  }

  const html = `<div part="text" role="presentation" aria-hidden="true" style="--pura-skeleton-gap:${gap}">${lines}</div>`;
  return { html, css: CSS };
}
