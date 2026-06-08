// Pure render for <pura-spotlight>. No DOM; SSR/DSD + client safe.
// A closed <dialog> shell with an empty cut-out rect; the hole is positioned at
// runtime from the live target's bounding rect, so the initial markup is static
// apart from the [label] accessible name and the instance id. On the client the
// id comes from the already-assigned el._id; under EMPTY_SHIM it derives from the
// [id] attribute (or empty), and the label falls back to "Spotlight".
import { EMPTY_SHIM } from "../base.js";

const CSS = `
  :host { display: contents; }

  dialog[part="overlay"] {
    border: none; background: transparent; padding: 0; margin: 0;
    max-width: 100vw; max-height: 100dvh; width: 100vw; height: 100dvh;
    inset: 0; overflow: visible; color: var(--pura-fg);
  }
  dialog[part="overlay"]::backdrop { background: transparent; }

  /* Cut-out: a transparent rect whose huge box-shadow dims everything else. */
  .spot {
    position: fixed; display: none; pointer-events: none;
    border-radius: var(--pura-radius);
    box-shadow: 0 0 0 9999px rgb(0 0 0 / 0.55);
    outline: 2px solid var(--pura-accent);
    outline-offset: 2px;
    transition: top var(--pura-dur) var(--pura-ease),
      left var(--pura-dur) var(--pura-ease),
      width var(--pura-dur) var(--pura-ease),
      height var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
`;

export function spotlightTemplate(el = EMPTY_SHIM) {
  const id = el._id || el.getAttribute("id") || "";
  const label = (el.getAttribute("label") || "Spotlight").replace(/"/g, "&quot;");
  const html = `<dialog part="overlay" role="dialog" aria-modal="true"
               aria-label="${label}"
               data-pura-spotlight="${id}" data-active="false">
         <div part="spot" class="spot" aria-hidden="true"></div>
       </dialog>`;
  return { html, css: CSS };
}
