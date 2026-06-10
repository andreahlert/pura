// Pure render for <pura-status-badge>. No DOM; safe on server (SSR/DSD) and client.
// A pill that morphs between states (idle -> loading -> success / error): the
// icon crossfades and scales in per state, the label swaps, the colors tween,
// and the width morph is a FLIP animation driven by the element (the only JS).
// The motion.dev "statuses" move.
//
// All four states are in the markup at once; data-pura-status on the host picks
// which one shows. SSR / pre-JS: the idle state shows.
import { EMPTY_SHIM } from "../base.js";

const STATES = new Set(["idle", "loading", "success", "error"]);

export function badgeState(el = EMPTY_SHIM) {
  const v = el.getAttribute("state");
  return STATES.has(v) ? v : "idle";
}

export function statusBadgeTemplate(el = EMPTY_SHIM) {
  const labels = {
    idle: el.getAttribute("idle-label") || "Submit",
    loading: el.getAttribute("loading-label") || "Loading",
    success: el.getAttribute("success-label") || "Done",
    error: el.getAttribute("error-label") || "Failed",
  };

  const html =
    `<span part="badge" class="badge" role="status">` +
    `<span class="state s-idle" part="state">` +
    `<span class="label">${labels.idle}</span></span>` +
    `<span class="state s-loading" part="state">` +
    `<span class="icon ring" aria-hidden="true"></span>` +
    `<span class="label">${labels.loading}</span></span>` +
    `<span class="state s-success" part="state">` +
    `<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path class="mark" pathLength="1" d="M 3.5 8.5 L 6.5 11.5 L 12.5 4.5" /></svg>` +
    `<span class="label">${labels.success}</span></span>` +
    `<span class="state s-error" part="state">` +
    `<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path class="mark" pathLength="1" d="M 4.5 4.5 L 11.5 11.5 M 11.5 4.5 L 4.5 11.5" /></svg>` +
    `<span class="label">${labels.error}</span></span>` +
    `</span>`;

  const css = `
    :host {
      display: inline-block;
      --pura-status-dur: 350ms;
    }
    .badge {
      display: inline-grid;
      align-items: center;
      justify-items: center;
      padding: 0.45em 1em;
      border-radius: 999px;
      font: inherit;
      white-space: nowrap;
      color: var(--pura-status-fg, var(--pura-bg));
      background: var(--pura-status-idle-bg, var(--pura-fg));
      transition: background var(--pura-status-dur) ease, color var(--pura-status-dur) ease;
    }
    .state {
      grid-area: 1 / 1;
      display: inline-flex;
      align-items: center;
      gap: 0.45em;
      opacity: 0;
      transform: scale(0.8);
      transition: opacity var(--pura-status-dur) ease, transform var(--pura-status-dur) cubic-bezier(0.34, 1.56, 0.64, 1);
      pointer-events: none;
      /* hidden states must not stretch the pill */
      visibility: hidden;
      width: 0;
      overflow: hidden;
    }
    .icon { width: 1em; height: 1em; flex: none; }
    .ring {
      border-radius: 50%;
      border: 2px solid color-mix(in srgb, currentColor 30%, transparent);
      border-top-color: currentColor;
      box-sizing: border-box;
      animation: pura-status-spin 0.65s linear infinite;
    }
    @keyframes pura-status-spin { to { transform: rotate(360deg); } }
    .mark {
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
    }

    /* which state shows (idle is the pre-JS / default state) */
    :host(:not([data-pura-status])) .s-idle,
    :host([data-pura-status="idle"]) .s-idle,
    :host([data-pura-status="loading"]) .s-loading,
    :host([data-pura-status="success"]) .s-success,
    :host([data-pura-status="error"]) .s-error {
      opacity: 1;
      transform: none;
      visibility: visible;
      width: auto;
    }
    :host([data-pura-status="success"]) .s-success .mark,
    :host([data-pura-status="error"]) .s-error .mark {
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 300ms ease-out 100ms;
    }

    /* state colors */
    :host([data-pura-status="loading"]) .badge {
      background: var(--pura-status-loading-bg, color-mix(in srgb, var(--pura-fg) 75%, transparent));
    }
    :host([data-pura-status="success"]) .badge {
      background: var(--pura-status-success-bg, #16a34a);
    }
    :host([data-pura-status="error"]) .badge {
      background: var(--pura-status-error-bg, #dc2626);
    }

    @media (prefers-reduced-motion: reduce) {
      .badge, .state, .mark { transition: none !important; }
      .ring { animation-duration: 1.5s; }
    }
  `;

  return { html, css };
}
