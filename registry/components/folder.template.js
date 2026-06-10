// Pure render for <pura-folder>. No DOM; safe on server (SSR/DSD) and client.
// A stylized paper folder drawn entirely in CSS: a back panel with a tab, a
// stack of papers (named slots) and a front cover. Opening tilts the front
// cover back (rotateX under perspective) while the papers rise and fan out,
// each with an index-based stagger and rotation; everything is plain CSS
// transitions, zero per-frame JS. The fan math is deterministic (index math,
// no randomness) so server and client output are byte-identical.
//
// Open state is pure CSS: :host([open]) always, plus :host(:hover) when the
// trigger is "hover" (the default). With trigger="click" the hover selector is
// omitted and the client JS toggles the open attribute instead.
//
// SSR / pre-JS: paints the closed folder (or open, if the attribute is set in
// the markup); no JS is required for the hover interaction.
// Reduced motion: the shared reset collapses transitions, so open/close snap
// instantly to their final state.
import { EMPTY_SHIM } from "../base.js";

export function folderTemplate(el = EMPTY_SHIM) {
  const nRaw = parseInt(el.getAttribute("papers") || "", 10);
  const n = Number.isFinite(nRaw) ? Math.min(3, Math.max(1, nRaw)) : 3;
  const click = el.getAttribute("trigger") === "click";
  const colorRaw = el.getAttribute("color");
  const color = colorRaw && /^[#a-zA-Z0-9(),.%\s-]+$/.test(colorRaw) ? colorRaw : null;
  const fallback = color || "var(--pura-accent, #5227ff)";

  const papersHtml = Array.from({ length: n }, (_, i) =>
    `<div class="paper p${i + 1}" part="paper paper-${i + 1}"><slot name="paper-${i + 1}"></slot></div>`,
  ).join("");

  const html =
    `<div class="scene" part="scene">` +
    `<div class="folder" part="folder"${click ? ` role="button" tabindex="0" aria-expanded="${el.hasAttribute("open")}"` : ""}>` +
    `<div class="back" part="back"></div>` +
    papersHtml +
    `<div class="front" part="front"></div>` +
    `</div>` +
    `</div>`;

  // Host states that mean "open". Hover trigger adds :hover on top of [open].
  const states = click ? [":host([open])"] : [":host([open])", ":host(:hover)"];
  const sel = (inner) => states.map((s) => `${s} ${inner}`).join(", ");

  // Deterministic fan: center offset c in [-1..1] drives x shift, lift and tilt.
  const paperRules = Array.from({ length: n }, (_, i) => {
    const c = i - (n - 1) / 2;
    const spread = Math.min(1, Math.abs(c));
    const x = (-50 + c * 56).toFixed(1);
    const lift = (64 + 12 * (1 - spread)).toFixed(1);
    const rot = (c * 13).toFixed(1);
    const scale = (1 - spread * 0.04).toFixed(2);
    const closedY = 2 - i * 3;
    return `
    .p${i + 1} { transform: translateX(-50%) translateY(${closedY}%); transition-delay: ${i * 55}ms; }
    ${sel(`.p${i + 1}`)} {
      transform: translateX(${x}%) translateY(-${lift}%) rotate(${rot}deg) scale(${scale});
    }`;
  }).join("\n");

  const css = `
    :host {
      display: inline-block;
      --_col: var(--pura-folder-color, ${fallback});
      --_dur: var(--pura-folder-duration, 320ms);
      --_radius: var(--pura-folder-radius, 0.6rem);
    }
    .scene {
      display: inline-block;
      perspective: 900px;
    }
    .folder {
      position: relative;
      width: var(--pura-folder-size, 10rem);
      aspect-ratio: 10 / 8;
      transform-style: preserve-3d;
      transition: transform var(--_dur) ease;
      ${click ? "cursor: pointer;" : ""}
    }
    .folder:focus-visible {
      outline: 2px solid var(--pura-ring, var(--_col));
      outline-offset: 4px;
      border-radius: var(--_radius);
    }
    ${sel(".folder")} { transform: translateY(-2%); }

    .back {
      position: absolute;
      inset: 10% 0 0 0;
      z-index: 0;
      border-radius: 0 var(--_radius) var(--_radius) var(--_radius);
      background: color-mix(in srgb, var(--_col) 78%, #000);
    }
    .back::before {
      content: "";
      position: absolute;
      top: -10%;
      left: 0;
      width: 40%;
      height: 12%;
      border-radius: var(--_radius) var(--_radius) 0 0;
      background: inherit;
    }

    .paper {
      position: absolute;
      left: 50%;
      bottom: 10%;
      z-index: 1;
      width: 70%;
      height: 84%;
      overflow: hidden;
      border-radius: calc(var(--_radius) * 0.6);
      background: var(--pura-folder-paper, #fff);
      color: #18181b;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16);
      transform-origin: bottom center;
      transition: transform var(--_dur) cubic-bezier(0.34, 1.45, 0.5, 1);
      font-size: 0.7rem;
    }
    .paper ::slotted(img) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    ${paperRules}

    .front {
      position: absolute;
      inset: 10% 0 0 0;
      z-index: 2;
      border-radius: var(--_radius);
      background: linear-gradient(
        to bottom,
        color-mix(in srgb, var(--_col) 90%, #fff),
        var(--_col)
      );
      box-shadow: 0 6px 18px color-mix(in srgb, var(--_col) 35%, transparent);
      transform-origin: bottom center;
      transition: transform var(--_dur) ease;
    }
    ${sel(".front")} { transform: rotateX(-38deg); }
  `;

  return { html, css };
}
