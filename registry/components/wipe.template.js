// Pure render for <pura-wipe>. No DOM; safe on server (SSR/DSD) and client.
// A full-viewport panel that sweeps across the screen: in (covers), hold,
// out (exits on the far side) — the page-transition wipe. The panel sits
// off-screen until play() phases it through data-pura-wipe-phase; each phase
// is one CSS transform transition, the element only sequences timeouts.
//
// SSR / pre-JS: the panel sits off-screen (translated 102%), pointer-events
// none, so it can never block the page before JS runs.
import { EMPTY_SHIM } from "../base.js";

// direction -> [resting transform (off-screen entry side), exit transform]
const SWEEPS = {
  left: ["translateX(-102%)", "translateX(102%)"],
  right: ["translateX(102%)", "translateX(-102%)"],
  up: ["translateY(102%)", "translateY(-102%)"],
  down: ["translateY(-102%)", "translateY(102%)"],
};

export function wipeDirection(el = EMPTY_SHIM) {
  const v = el.getAttribute("direction");
  return Object.prototype.hasOwnProperty.call(SWEEPS, v) ? v : "left";
}

export function wipeTemplate(el = EMPTY_SHIM) {
  const [rest, exit] = SWEEPS[wipeDirection(el)];

  const html = `<div class="panel" part="panel"><slot></slot></div>`;

  const css = `
    :host {
      display: contents;
      --pura-wipe-dur: 600ms;
      --pura-wipe-ease: cubic-bezier(0.76, 0, 0.24, 1);
    }
    .panel {
      position: fixed;
      inset: 0;
      z-index: var(--pura-wipe-z, 2147483645);
      background: var(--pura-wipe-color, var(--pura-fg));
      transform: ${rest};
      pointer-events: none;
      display: grid;
      place-items: center;
      transition: transform var(--pura-wipe-dur) var(--pura-wipe-ease);
    }
    :host([data-pura-wipe-phase="in"]) .panel,
    :host([data-pura-wipe-phase="hold"]) .panel {
      transform: none;
    }
    :host([data-pura-wipe-phase="out"]) .panel {
      transform: ${exit};
    }
    /* reset: jump home without animating back across the screen */
    :host([data-pura-wipe-phase="idle"]) .panel,
    :host(:not([data-pura-wipe-phase])) .panel {
      transition: none;
      transform: ${rest};
    }
    :host([data-pura-wipe-phase="in"]) .panel,
    :host([data-pura-wipe-phase="hold"]) .panel,
    :host([data-pura-wipe-phase="out"]) .panel {
      transition: transform var(--pura-wipe-dur) var(--pura-wipe-ease);
    }

    @media (prefers-reduced-motion: reduce) {
      .panel { transition: none !important; }
    }
  `;

  return { html, css };
}
