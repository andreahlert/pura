// Pure render for <pura-dot-pattern>. No DOM; safe on server (SSR/DSD) and client.
// A dot field backdrop (with hexagon and diagonal-stripe variants) behind slotted
// content, faded through a radial-gradient mask, with an optional brighter copy
// revealed by a moving radial mask = a glow that sweeps the field. Dots and
// stripes are CSS gradient tiles; hexagons are an inline SVG <pattern> stroked
// with currentColor so every variant themes through the same color tokens. All
// geometry is derived from attributes with plain math, so server and client
// paint byte-identical markup.
import { EMPTY_SHIM } from "../base.js";

const VARIANTS = ["dots", "hex", "stripes"];
const FADES = ["edges", "center", "none"];

// Honeycomb tile: pointy-top hexagon of width w plus the vertical edge that
// stitches it to the offset row below. Tile repeats at w x 3s (s = w / sqrt(3));
// neighboring tiles complete every shared edge exactly once.
function hexSvg(cls, partName, idSuffix, gap) {
  const f = (n) => +n.toFixed(2);
  const w = f(gap);
  const s = gap / Math.sqrt(3);
  const h = f(3 * s);
  const id = `pura-hex-${idSuffix}`;
  const d =
    `M${f(w / 2)} 0L${w} ${f(s / 2)}L${w} ${f(1.5 * s)}L${f(w / 2)} ${f(2 * s)}` +
    `L0 ${f(1.5 * s)}L0 ${f(s / 2)}Z` +
    `M${f(w / 2)} ${f(2 * s)}L${f(w / 2)} ${h}`;
  return (
    `<svg class="layer hex ${cls}" part="${partName}" aria-hidden="true">` +
    `<defs><pattern id="${id}" width="${w}" height="${h}" patternUnits="userSpaceOnUse">` +
    `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1"></path>` +
    `</pattern></defs>` +
    `<rect width="100%" height="100%" fill="url(#${id})"></rect>` +
    `</svg>`
  );
}

export function dotPatternTemplate(el = EMPTY_SHIM) {
  const variantRaw = el.getAttribute("variant");
  const variant = VARIANTS.includes(variantRaw) ? variantRaw : "dots";
  const fadeRaw = el.getAttribute("fade");
  const fade = FADES.includes(fadeRaw) ? fadeRaw : "edges";
  const gapRaw = parseFloat(el.getAttribute("gap"));
  const gap = Number.isFinite(gapRaw) && gapRaw >= 8 && gapRaw <= 240 ? gapRaw : 24;
  const glow = el.hasAttribute("glow");

  const layer = (cls, partName, idSuffix) =>
    variant === "hex"
      ? hexSvg(cls, partName, idSuffix, gap)
      : `<span class="layer ${variant} ${cls}" part="${partName}" aria-hidden="true"></span>`;

  const html =
    `<span class="field fade-${fade}" part="field" aria-hidden="true">` +
    layer("base", "pattern", "base") +
    (glow ? layer("glow", "glow", "glow") : "") +
    `</span>` +
    `<slot></slot>`;

  const css = `
    :host {
      position: relative;
      display: block;
      overflow: hidden;
    }

    .field {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }

    /* Radial-gradient fade mask on the whole field, independent of the glow
       mask on the .glow layer (masks nest across elements). */
    .field.fade-edges {
      -webkit-mask-image: radial-gradient(ellipse at center, #000 35%, transparent 78%);
      mask-image: radial-gradient(ellipse at center, #000 35%, transparent 78%);
    }
    .field.fade-center {
      -webkit-mask-image: radial-gradient(ellipse at center, transparent 22%, #000 68%);
      mask-image: radial-gradient(ellipse at center, transparent 22%, #000 68%);
    }

    .layer {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
    }

    /* Every variant paints with currentColor, so one color per layer themes all. */
    .base {
      color: var(--pura-dot-pattern-color, color-mix(in oklab, var(--pura-fg, #71717a) 30%, transparent));
      opacity: var(--pura-dot-pattern-opacity, 0.65);
    }

    .layer.dots {
      background-image: radial-gradient(circle,
        currentColor var(--pura-dot-pattern-size, 1.2px),
        transparent calc(var(--pura-dot-pattern-size, 1.2px) + 0.4px));
      background-size: var(--pura-dot-pattern-gap, ${gap}px) var(--pura-dot-pattern-gap, ${gap}px);
      background-position: center;
    }

    .layer.stripes {
      background-image: repeating-linear-gradient(45deg,
        currentColor 0,
        currentColor var(--pura-dot-pattern-line, 1px),
        transparent var(--pura-dot-pattern-line, 1px),
        transparent var(--pura-dot-pattern-gap, ${gap}px));
    }

    /* Brighter copy revealed only through a radial mask patch = the glow. It
       rests centered; the sweep below moves the mask when motion is allowed. */
    .glow {
      color: var(--pura-dot-pattern-glow, var(--pura-primary, #6366f1));
      opacity: var(--pura-dot-pattern-glow-opacity, 0.9);
      -webkit-mask-image: radial-gradient(circle at center, #000 0%, transparent 70%);
      mask-image: radial-gradient(circle at center, #000 0%, transparent 70%);
      -webkit-mask-size: var(--pura-dot-pattern-spot, 280px) var(--pura-dot-pattern-spot, 280px);
      mask-size: var(--pura-dot-pattern-spot, 280px) var(--pura-dot-pattern-spot, 280px);
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-position: 50% 50%;
      mask-position: 50% 50%;
    }

    /* Continuous sweep only when the user allows motion; under reduce the glow
       stays at its resting center position (and base.js RESET backstops). */
    @media (prefers-reduced-motion: no-preference) {
      .glow {
        animation: pura-dot-sweep var(--pura-dot-pattern-duration, 10s) ease-in-out infinite alternate;
      }
    }

    @keyframes pura-dot-sweep {
      0%   { -webkit-mask-position: 0% 0%;    mask-position: 0% 0%; }
      33%  { -webkit-mask-position: 100% 30%; mask-position: 100% 30%; }
      66%  { -webkit-mask-position: 20% 100%; mask-position: 20% 100%; }
      100% { -webkit-mask-position: 90% 80%;  mask-position: 90% 80%; }
    }
  `;

  return { html, css };
}
