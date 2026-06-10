// Pure render for <pura-velocity-marquee>. No DOM; safe on server (SSR/DSD)
// and client. Same paint as <pura-marquee>: two identical groups sit side by
// side and the track translates by exactly half its width, so the loop is
// seamless. The base loop is pure CSS at constant speed; the JS layer only
// modulates the playbackRate of that animation (WAAPI handle from
// getAnimations()) using live scroll velocity. SSR / pre-JS therefore renders
// an ordinary, presentable marquee. The mirror group is aria-hidden so
// assistive tech reads the slotted content exactly once.
// Reduced motion: the loop never starts and the track stays static.
import { EMPTY_SHIM } from "../base.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

export function velocityMarqueeTemplate(el = EMPTY_SHIM) {
  const right = el.getAttribute("direction") === "right";
  const speedAttr = parseFloat(el.getAttribute("speed"));
  const speed = Number.isFinite(speedAttr) && speedAttr > 0 ? speedAttr : 20;

  const html = `<div class="marquee" part="marquee" role="marquee"
       aria-label="${esc(el.getAttribute("label") || "Scrolling content")}">
    <div class="track" part="track">
      <div class="group" part="group"><slot></slot></div>
      <div class="group mirror" part="group-mirror" aria-hidden="true"></div>
    </div>
  </div>`;

  const css = `
    :host { display: block; overflow: hidden; }

    .marquee { display: block; width: 100%; overflow: hidden; }

    /* Two identical groups side by side; translating the track by exactly half
       its width swaps the mirror into the first group's place: seamless loop. */
    .track {
      display: flex; width: max-content; flex-wrap: nowrap;
      will-change: transform;
    }

    .group {
      display: flex; flex-wrap: nowrap; align-items: center;
      gap: var(--pura-velocity-marquee-gap, var(--pura-space-4, 1rem));
      padding-inline-end: var(--pura-velocity-marquee-gap, var(--pura-space-4, 1rem));
      white-space: nowrap;
    }

    @keyframes pura-velocity-marquee {
      from { transform: translateX(var(--pura-velocity-marquee-from, ${right ? "-50%" : "0%"})); }
      to   { transform: translateX(var(--pura-velocity-marquee-to, ${right ? "0%" : "-50%"})); }
    }

    /* Continuous animation only when the user is fine with motion. */
    @media (prefers-reduced-motion: no-preference) {
      .track {
        animation: pura-velocity-marquee var(--pura-velocity-marquee-speed, ${speed}s) linear infinite;
      }
      :host([paused]) .track { animation-play-state: paused; }
    }

    /* Reduced motion: no loop at all, content rests at its start position. */
    @media (prefers-reduced-motion: reduce) {
      .track { animation: none; transform: none; }
    }
  `;

  return { html, css };
}
