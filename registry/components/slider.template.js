// Pure render for <pura-slider>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function sliderTemplate(el = EMPTY_SHIM) {
  const min = el.getAttribute("min") ?? "0";
  const max = el.getAttribute("max") ?? "100";
  const step = el.getAttribute("step") ?? "1";
  const html = `<div class="wrap" part="root">
         <output class="bubble" part="bubble" aria-hidden="true"></output>
         <input type="range" part="input"
           min="${min}" max="${max}" step="${step}"
           ${el.hasAttribute("disabled") ? "disabled" : ""}
           ${el.getAttribute("aria-label") ? `aria-label="${el.getAttribute("aria-label")}"` : ""} />
       </div>`;
  return { html, css: SLIDER_CSS };
}

export const SLIDER_CSS = `
  :host { display: block; --pura-slider-fill: 0%; }
  :host([disabled]) { opacity: 0.55; cursor: not-allowed; }

  .wrap { position: relative; display: block; padding: var(--pura-space-2) 0; }

  input {
    -webkit-appearance: none; appearance: none;
    width: 100%; margin: 0; background: transparent; cursor: pointer;
    font: inherit;
  }
  input:disabled { cursor: not-allowed; }
  input:focus { outline: none; }

  /* track — filled portion via gradient since WebKit has no progress pseudo */
  input::-webkit-slider-runnable-track {
    height: 0.375rem; border-radius: var(--pura-radius-full);
    background: linear-gradient(to right,
      var(--pura-primary) var(--pura-slider-fill),
      var(--pura-subtle) var(--pura-slider-fill));
  }
  input::-moz-range-track {
    height: 0.375rem; border-radius: var(--pura-radius-full);
    background: linear-gradient(to right,
      var(--pura-primary) var(--pura-slider-fill),
      var(--pura-subtle) var(--pura-slider-fill));
  }

  /* thumb */
  input::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 1.125rem; height: 1.125rem; border-radius: var(--pura-radius-full);
    background: #fff; border: 1px solid var(--pura-border-strong);
    box-shadow: var(--pura-shadow-sm);
    margin-top: -0.375rem; /* center on the 0.375rem track */
    transition: box-shadow var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }
  input::-moz-range-thumb {
    width: 1.125rem; height: 1.125rem; border-radius: var(--pura-radius-full);
    background: #fff; border: 1px solid var(--pura-border-strong);
    box-shadow: var(--pura-shadow-sm);
    transition: box-shadow var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }

  input:hover::-webkit-slider-thumb { border-color: var(--pura-fg); }
  input:hover::-moz-range-thumb { border-color: var(--pura-fg); }
  input:focus-visible::-webkit-slider-thumb {
    border-color: var(--pura-accent); box-shadow: 0 0 0 3px var(--pura-ring);
  }
  input:focus-visible::-moz-range-thumb {
    border-color: var(--pura-accent); box-shadow: 0 0 0 3px var(--pura-ring);
  }

  /* value bubble (opt-in via show-value) */
  .bubble {
    display: none; position: absolute; bottom: 100%; left: 0;
    transform: translateX(-50%); white-space: nowrap; pointer-events: none;
    padding: var(--pura-space-1) var(--pura-space-2);
    margin-bottom: var(--pura-space-1);
    font-size: var(--pura-text-xs); font-weight: 550; line-height: 1;
    color: var(--pura-primary-fg); background: var(--pura-primary);
    border-radius: var(--pura-radius-sm); box-shadow: var(--pura-shadow-sm);
  }
  :host([show-value]) .bubble { display: block; }
`;
