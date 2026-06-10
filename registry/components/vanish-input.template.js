// Pure render for <pura-vanish-input>. No DOM; safe on server (SSR/DSD) and client.
// A pill text field with a submit arrow: on submit the typed text dissolves into
// particles drawn on a canvas overlaid on the field (the chat-composer vanish
// microinteraction). The canvas effect is pure progressive enhancement; this
// template renders a complete, presentable form that works without any JS.
//
// SSR / pre-JS: a normal input plus the first rotating placeholder (static).
// Reduced motion: the placeholder swap animation is gated behind
// (prefers-reduced-motion: no-preference); the particle effect is skipped in JS.
import { EMPTY_SHIM } from "../base.js";

export function vanishInputTemplate(el = EMPTY_SHIM) {
  const value = el.getAttribute("value") || "";
  const submitLabel = el.getAttribute("submit-label") || "Submit";
  const ariaName = el.getAttribute("label") || el.getAttribute("placeholder") || "";

  // Rotating placeholders: pipe-separated list. When present, the native
  // placeholder is a single space (keeps :placeholder-shown working) and the
  // visible text lives in an aria-hidden overlay span the client JS rotates.
  const list = (el.getAttribute("placeholders") || "")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
  const rotating = list.length > 0;
  const placeholder = rotating ? " " : (el.getAttribute("placeholder") || "");

  const html = `<form class="root" part="root">
       <input class="input" part="input" type="text" autocomplete="off"
         placeholder="${placeholder}"
         ${ariaName ? `aria-label="${ariaName}"` : ""}
         ${el.hasAttribute("disabled") ? "disabled" : ""}
         value="${value}" />
       ${rotating ? `<span class="ph" part="placeholder" aria-hidden="true">${list[0]}</span>` : ""}
       <canvas class="canvas" part="canvas" aria-hidden="true"></canvas>
       <button class="submit" part="submit" type="submit"
         aria-label="${submitLabel}" ${value ? "" : "disabled"}>
         <svg part="submit-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
       </button>
     </form>`;

  const css = `
    :host { display: block; }
    :host([disabled]) { opacity: 0.6; }

    .root {
      position: relative;
      display: flex; align-items: center; gap: var(--pura-space-2, 0.5rem);
      width: 100%;
      height: var(--pura-vanish-input-height, 3rem);
      background: var(--pura-vanish-input-bg, var(--pura-bg, #fff));
      border: 1px solid var(--pura-vanish-input-border, var(--pura-border-strong, #d4d4d8));
      border-radius: var(--pura-vanish-input-radius, 9999px);
      box-shadow: var(--pura-shadow-sm, 0 1px 2px rgb(0 0 0 / 0.06));
      overflow: hidden;
      transition: border-color var(--pura-dur, 150ms) var(--pura-ease, ease),
        box-shadow var(--pura-dur, 150ms) var(--pura-ease, ease);
    }
    .root:focus-within {
      border-color: var(--pura-accent, var(--pura-fg, #18181b));
      box-shadow: 0 0 0 3px var(--pura-ring, rgb(0 0 0 / 0.1));
    }

    .input {
      flex: 1 1 auto; min-width: 0; height: 100%;
      font: inherit; font-size: var(--pura-text-sm, 0.875rem);
      color: var(--pura-vanish-input-fg, var(--pura-fg, #18181b));
      background: transparent; border: none; outline: none;
      padding: 0 var(--pura-space-2, 0.5rem) 0 var(--pura-space-4, 1.25rem);
    }
    .input::placeholder { color: var(--pura-muted, #a1a1aa); }
    .input:disabled { cursor: not-allowed; }
    /* while the canvas is replaying the text as particles, hide the real text */
    :host([data-pura-vanish-state="vanishing"]) .input { color: transparent; caret-color: transparent; }

    /* rotating placeholder overlay; hidden as soon as the field has content */
    .ph {
      position: absolute; left: var(--pura-space-4, 1.25rem); top: 50%;
      transform: translateY(-50%);
      max-width: calc(100% - 5.5rem);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      font-size: var(--pura-text-sm, 0.875rem);
      color: var(--pura-muted, #a1a1aa);
      pointer-events: none; user-select: none;
    }
    .root:has(.input:not(:placeholder-shown)) .ph { opacity: 0; }
    .root:focus-within .ph { opacity: 0.7; }
    .root:has(.input:not(:placeholder-shown)):focus-within .ph { opacity: 0; }

    @keyframes pura-vanish-ph-in {
      from { opacity: 0; transform: translateY(calc(-50% + 0.65em)); }
      to { opacity: 1; transform: translateY(-50%); }
    }
    @media (prefers-reduced-motion: no-preference) {
      .ph[data-swap] { animation: pura-vanish-ph-in 320ms var(--pura-ease, ease) both; }
    }

    .canvas {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none;
    }

    .submit {
      flex: none; display: inline-grid; place-items: center;
      width: 2rem; height: 2rem;
      margin-right: var(--pura-space-2, 0.5rem);
      font: inherit; cursor: pointer;
      color: var(--pura-vanish-input-submit-fg, var(--pura-primary-fg, #fff));
      background: var(--pura-vanish-input-submit-bg, var(--pura-primary, #18181b));
      border: 1px solid transparent; border-radius: 50%;
      transition: background var(--pura-dur, 150ms) var(--pura-ease, ease),
        transform var(--pura-dur, 150ms) var(--pura-ease, ease);
    }
    .submit svg { width: 1rem; height: 1rem; }
    .submit:hover:not(:disabled) { background: var(--pura-primary-hover, var(--pura-vanish-input-submit-bg, var(--pura-primary, #18181b))); }
    .submit:active:not(:disabled) { transform: scale(0.94); }
    .submit:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring, rgb(0 0 0 / 0.1)); }
    .submit:disabled { opacity: 0.35; cursor: not-allowed; }
  `;

  return { html, css };
}
