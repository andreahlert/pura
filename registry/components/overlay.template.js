// Pure render for <pura-overlay>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

export function overlayTemplate(el = EMPTY_SHIM) {
  const showSpinner = el.bool("spinner");
  const message = el.getAttribute("message") || "";
  const html = `<div class="scrim" part="scrim" role="presentation"
         aria-label="${t("overlay.loading")}">
         <div class="content" part="content">
           ${showSpinner ? `<span class="spinner" aria-hidden="true"></span>` : ""}
           ${showSpinner && message ? `<span class="msg">${esc(message)}</span>` : ""}
           <slot></slot>
         </div>
       </div>`;
  return { html, css: OVERLAY_CSS };
}

export const OVERLAY_CSS = `
  :host { display: contents; }

  .scrim {
    position: fixed; inset: 0; z-index: 1000;
    display: none; align-items: center; justify-content: center;
    background: rgb(0 0 0 / 0.45);
    opacity: 0; transition: opacity var(--pura-dur) var(--pura-ease);
  }
  :host([open]) .scrim { display: flex; opacity: 1; }
  :host([blur]) .scrim { backdrop-filter: blur(3px); }

  /* target=parent covers the nearest positioned ancestor of the host */
  :host([target="parent"]) .scrim { position: absolute; }

  .content {
    display: flex; flex-direction: column; align-items: center;
    gap: var(--pura-space-3); color: var(--pura-primary-fg);
    text-align: center; max-width: 90%;
  }

  .spinner {
    width: 2rem; height: 2rem;
    border: 3px solid color-mix(in srgb, #fff 30%, transparent);
    border-top-color: #fff; border-radius: 50%;
    animation: pura-spin 0.65s linear infinite;
  }
  .msg { font-size: var(--pura-text-sm); color: #fff; }

  @keyframes pura-spin { to { transform: rotate(360deg); } }
`;
