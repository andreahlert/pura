// Pure render for <pura-spinner>. No DOM; safe on server (SSR/DSD) and client.
// variant picks the loading move: ring (default, spinning arc), dots (jumping
// dots), pulse (pulsing dots), ripple (expanding rings) — the motion.dev
// loading set, in pure CSS keyframes.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

const VARIANTS = new Set(["ring", "dots", "pulse", "ripple"]);

export function spinnerVariant(el = EMPTY_SHIM) {
  const v = el.getAttribute("variant");
  return VARIANTS.has(v) ? v : "ring";
}

export function spinnerTemplate(el = EMPTY_SHIM) {
  const variant = spinnerVariant(el);
  let inner = "";
  if (variant === "dots" || variant === "pulse") {
    inner = `<span class="dot" part="dot"></span><span class="dot" part="dot"></span><span class="dot" part="dot"></span>`;
  } else if (variant === "ripple") {
    inner = `<span class="ripple" part="ripple"></span><span class="ripple" part="ripple"></span>`;
  }
  const html = `<span part="spinner" class="v-${variant}" role="status" aria-label="${el.getAttribute("label") || t("spinner.loading")}">${inner}</span>`;
  return { html, css: SPINNER_CSS };
}

export const SPINNER_CSS = `
  :host {
    display: inline-block; line-height: 0;
    --pura-spinner-size: 1.25rem;
    --pura-spinner-stroke: 2.5px;
  }
  :host([size="sm"]) { --pura-spinner-size: 0.9rem; --pura-spinner-stroke: 2px; }
  :host([size="lg"]) { --pura-spinner-size: 2rem; --pura-spinner-stroke: 3px; }

  /* ring (default): spinning arc */
  .v-ring {
    display: inline-block;
    width: var(--pura-spinner-size); height: var(--pura-spinner-size);
    border: var(--pura-spinner-stroke) solid color-mix(in srgb, var(--pura-fg) 18%, transparent);
    border-top-color: var(--pura-fg); border-radius: 50%;
    animation: pura-spin 0.65s linear infinite;
  }
  @keyframes pura-spin { to { transform: rotate(360deg); } }

  /* dots: jumping dots */
  .v-dots, .v-pulse {
    display: inline-flex;
    align-items: center;
    gap: calc(var(--pura-spinner-size) * 0.22);
    height: var(--pura-spinner-size);
  }
  .dot {
    width: calc(var(--pura-spinner-size) * 0.3);
    height: calc(var(--pura-spinner-size) * 0.3);
    border-radius: 50%;
    background: var(--pura-fg);
  }
  .v-dots .dot { animation: pura-spinner-jump 0.65s ease-in-out infinite; }
  .v-dots .dot:nth-child(2) { animation-delay: 0.11s; }
  .v-dots .dot:nth-child(3) { animation-delay: 0.22s; }
  @keyframes pura-spinner-jump {
    0%, 100% { transform: translateY(calc(var(--pura-spinner-size) * 0.18)); }
    50% { transform: translateY(calc(var(--pura-spinner-size) * -0.28)); }
  }

  /* pulse: pulsing dots */
  .v-pulse .dot { animation: pura-spinner-pulse 1s ease-in-out infinite; }
  .v-pulse .dot:nth-child(2) { animation-delay: 0.16s; }
  .v-pulse .dot:nth-child(3) { animation-delay: 0.32s; }
  @keyframes pura-spinner-pulse {
    0%, 100% { transform: scale(0.55); opacity: 0.35; }
    50% { transform: scale(1); opacity: 1; }
  }

  /* ripple: expanding rings */
  .v-ripple {
    position: relative;
    display: inline-block;
    width: var(--pura-spinner-size); height: var(--pura-spinner-size);
  }
  .ripple {
    position: absolute; inset: 0;
    border: var(--pura-spinner-stroke) solid var(--pura-fg);
    border-radius: 50%;
    opacity: 0;
    animation: pura-spinner-ripple 1.3s ease-out infinite;
  }
  .ripple:nth-child(2) { animation-delay: 0.65s; }
  @keyframes pura-spinner-ripple {
    0% { transform: scale(0.15); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
  }
`;
