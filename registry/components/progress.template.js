// Pure render for <pura-progress>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function progressTemplate(el = EMPTY_SHIM) {
  const html = `<div part="track" role="progressbar" aria-valuemin="0" aria-valuemax="100">
         <div class="fill" part="fill"></div>
       </div>`;
  return { html, css: PROGRESS_CSS };
}

export const PROGRESS_CSS = `
  :host { display: block; }
  [part="track"] {
    width: 100%; height: 0.5rem; border-radius: var(--pura-radius-full);
    background: var(--pura-subtle); overflow: hidden;
  }
  .fill {
    height: 100%; width: 0%; border-radius: inherit;
    background: var(--pura-primary);
    transition: width var(--pura-dur) var(--pura-ease);
  }
  :host([indeterminate]) .fill {
    width: 40% !important;
    animation: pura-indet 1.1s var(--pura-ease) infinite;
  }
  @keyframes pura-indet {
    0% { transform: translateX(-120%); }
    100% { transform: translateX(280%); }
  }
`;
