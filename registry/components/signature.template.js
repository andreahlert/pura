// Pure render for <pura-signature>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

export function signatureTemplate(el = EMPTY_SHIM) {
  const html = `<div class="root" part="root">
         <div class="pad">
           <canvas part="canvas"></canvas>
         </div>
         <div class="toolbar" part="toolbar">
           <button class="clear" part="button" type="button">${t("signature.clear")}</button>
         </div>
       </div>`;
  return { html, css: SIGNATURE_CSS };
}

export const SIGNATURE_CSS = `
  :host { display: inline-block; }
  :host([disabled]) { opacity: 0.6; }
  .root {
    display: inline-flex; flex-direction: column; gap: var(--pura-space-2);
  }
  .pad {
    position: relative; width: var(--_w, 400px); height: var(--_h, 160px);
    background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm); overflow: hidden;
  }
  /* subtle baseline guideline */
  .pad::after {
    content: ""; position: absolute; left: 8%; right: 8%; bottom: 22%;
    border-bottom: 1px dashed var(--pura-border-strong); pointer-events: none;
  }
  canvas {
    position: relative; display: block; width: 100%; height: 100%;
    touch-action: none; cursor: crosshair;
  }
  :host([disabled]) canvas { cursor: not-allowed; }

  .toolbar { display: flex; justify-content: flex-end; }
  .clear {
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550; cursor: pointer;
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    padding: var(--pura-space-1) var(--pura-space-3);
  }
  .clear:hover { background: var(--pura-subtle); }
  .clear:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .clear:disabled { opacity: 0.55; cursor: not-allowed; }
`;
