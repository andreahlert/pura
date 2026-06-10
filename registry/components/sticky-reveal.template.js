// Pure render for <pura-sticky-reveal>. No DOM; safe on server (SSR/DSD) and client.
// The classic SaaS landing-page feature walkthrough (Aceternity's sticky scroll
// reveal): text steps scroll in one column while a media panel sticks in the
// other; the active media crossfades as each step enters the viewport. The
// layout is pure CSS (grid + position: sticky); the JS layer only toggles
// data-active on the slotted steps/media via IntersectionObserver.
//
// SSR / pre-JS: the sticky two-column layout already works and exactly one
// media is visible. The frame is a flex row of full-width items with
// overflow: hidden, so the first slotted media fills it and the rest overflow
// out of view; no [data-active] markup is required for the static paint.
// Once JS marks the host ready (data-pura-sr-ready) the media stack switches
// to absolute layering with an opacity crossfade.
//
// Reduced motion: the crossfade transition and the small enter shift are
// disabled; the active media simply swaps.
import { EMPTY_SHIM } from "../base.js";

function safeNum(raw, fallback) {
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

export function stickyRevealTemplate(el = EMPTY_SHIM) {
  const side = el.getAttribute("side") === "left" ? "left" : "right";
  const top = safeNum(el.getAttribute("top"), 96);
  const dim = !el.hasAttribute("no-dim");

  const html = `
    <div class="layout" part="layout">
      <div class="steps" part="steps"><slot name="step"></slot></div>
      <div class="media" part="media">
        <div class="frame" part="frame"><slot name="media"></slot></div>
      </div>
    </div>
  `;

  const css = `
    :host {
      display: block;
    }
    .layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--pura-sticky-reveal-gap, 3rem);
      align-items: start;
    }
    .media {
      order: ${side === "left" ? -1 : 1};
      align-self: stretch;
    }
    .steps {
      display: flex;
      flex-direction: column;
      gap: var(--pura-sticky-reveal-step-gap, 40vh);
      padding-block: var(--pura-sticky-reveal-pad, 20vh);
    }
    .frame {
      position: sticky;
      top: ${top}px;
      height: var(--pura-sticky-reveal-height, min(60vh, 480px));
      overflow: hidden;
      border-radius: var(--pura-sticky-reveal-radius, 16px);
      background: var(--pura-sticky-reveal-bg, transparent);
      /* pre-JS: a flex row of full-width items; the first media fills the
         frame and the rest overflow out of view (a static, JS-free paint). */
      display: flex;
    }
    ::slotted([slot="media"]) {
      flex: 0 0 100%;
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin: 0;
    }

    /* ready: stack the media in the frame and crossfade via [data-active] */
    :host([data-pura-sr-ready]) ::slotted([slot="media"]) {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity var(--pura-sticky-reveal-duration, 0.5s) ease,
                  transform var(--pura-sticky-reveal-duration, 0.5s) ease;
    }
    :host([data-pura-sr-ready]) ::slotted([slot="media"][data-active]) {
      opacity: 1;
    }
    @media (prefers-reduced-motion: no-preference) {
      :host([data-pura-sr-ready]) ::slotted([slot="media"]) {
        transform: translateY(10px) scale(0.98);
      }
      :host([data-pura-sr-ready]) ::slotted([slot="media"][data-active]) {
        transform: none;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host([data-pura-sr-ready]) ::slotted([slot="media"]) {
        transition: none;
      }
    }
    ${dim ? `
    /* inactive steps recede so the active one reads as current */
    :host([data-pura-sr-ready]) ::slotted([slot="step"]) {
      opacity: var(--pura-sticky-reveal-dim, 0.35);
      transition: opacity var(--pura-sticky-reveal-duration, 0.5s) ease;
    }
    :host([data-pura-sr-ready]) ::slotted([slot="step"][data-active]) {
      opacity: 1;
    }
    @media (prefers-reduced-motion: reduce) {
      :host([data-pura-sr-ready]) ::slotted([slot="step"]) {
        transition: none;
      }
    }
    ` : ""}
    /* narrow screens: single column, media sticks on top of the text flow */
    @media (max-width: 720px) {
      .layout {
        grid-template-columns: 1fr;
      }
      .media {
        order: -1;
      }
      .frame {
        top: 0;
        height: var(--pura-sticky-reveal-height-sm, 40vh);
      }
      .steps {
        gap: var(--pura-sticky-reveal-step-gap, 30vh);
        padding-block: var(--pura-sticky-reveal-pad, 10vh);
      }
    }
  `;

  return { html, css };
}
