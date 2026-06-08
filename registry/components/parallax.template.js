// Pure render for <pura-parallax>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function parallaxTemplate(el = EMPTY_SHIM) {
  const image = el.getAttribute("image");
  const html = `<div class="viewport" part="viewport">
         ${image ? `<div class="bg" part="layer" data-speed="${el._num(el.getAttribute("speed"), 0.5)}"></div>` : ""}
         <div class="content" part="layer"><slot></slot></div>
       </div>`;
  return { html, css: PARALLAX_CSS };
}

export const PARALLAX_CSS = `
  :host { display: block; position: relative; overflow: hidden; }

  .viewport {
    position: relative;
    width: 100%; height: 100%;
    overflow: hidden;
  }

  .bg {
    position: absolute; inset: -15% 0;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    will-change: transform;
    z-index: 0;
  }

  .content {
    position: relative;
    z-index: 1;
    will-change: transform;
  }

  ::slotted([data-speed]) { will-change: transform; }
`;
