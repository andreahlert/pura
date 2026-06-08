// Pure render(s) for <marquee> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

export function marqueeTemplate(el = EMPTY_SHIM) {
  const html = `<div class="marquee" part="marquee" role="marquee"
            aria-label="${esc(el.getAttribute("label") || "Scrolling content")}">
         <div class="track" part="track">
           <div class="group" part="group"><slot></slot></div>
           <div class="group mirror" part="group-mirror" aria-hidden="true"></div>
         </div>
       </div>`;
  return { html, css: MARQUEE_CSS };
}

export const MARQUEE_CSS = `
  :host { display: block; overflow: hidden; }

  .marquee { display: block; width: 100%; overflow: hidden; }

  /* Two identical groups sit side by side; translating the track by exactly
     half its width swaps the second group into the first's place, so the loop
     is seamless. */
  .track {
    display: flex; width: max-content; flex-wrap: nowrap;
    will-change: transform;
    animation: pura-marquee var(--pura-marquee-speed, 20s) linear infinite;
  }

  .group {
    display: flex; flex-wrap: nowrap; align-items: center;
    gap: var(--pura-space-4); padding-inline-end: var(--pura-space-4);
    white-space: nowrap;
  }

  @keyframes pura-marquee {
    from { transform: translateX(var(--pura-marquee-from, 0%)); }
    to   { transform: translateX(var(--pura-marquee-to, -50%)); }
  }

  /* Pause on hover/focus when opted in (not motion-only: state is also
     mirrored via attributes and the imperative API). */
  :host([pause-on-hover]) .track:hover,
  :host([pause-on-hover]:focus-within) .track {
    animation-play-state: paused;
  }

  /* Explicit paused state. */
  :host([paused]) .track { animation-play-state: paused; }

  /* Respect reduced motion: stop the loop entirely so there is no movement. */
  @media (prefers-reduced-motion: reduce) {
    .track { animation: none; transform: none; }
  }
`;
