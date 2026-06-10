// Pure render for <pura-parallax-columns>. No DOM; safe on server (SSR/DSD)
// and client. A grid of images split into columns that translate in opposite
// directions as you scroll, the Aceternity "Parallax Scroll" move done with
// native scroll-driven animations: the host carries a named view timeline
// (view-timeline: --pura-plc) and each column (selected by nth-child math on
// the slotted children) rides it with its own drift distance and sign, so the
// whole multi-track orchestration runs with zero per-frame JS. The hero
// variant additionally tilts the grid in perspective (rotateX) and fades it in
// over the entry range, the "Hero Parallax" look.
//
// Per-column drift is deterministic index math (sign alternates per column,
// magnitude cycles through fixed factors), never native randomness, so server
// and client paint byte-identical CSS.
//
// SSR / pre-JS and browsers without scroll-driven timelines: a static grid.
// Reduced motion: static grid, no drift, no tilt, full opacity.
import { EMPTY_SHIM } from "../base.js";

// Drift magnitude cycle per column, deterministic so SSR === client.
const DRIFT_FACTORS = [1, 0.7, 1.15];

// One rule per column: column k (1-based) gets its drift distance via
// nth-child(<cols>n+<k>), sign alternating so neighbours move opposite ways.
function columnRules(cols) {
  let rules = "";
  for (let k = 1; k <= cols; k++) {
    const sign = k % 2 === 1 ? -1 : 1;
    const factor = DRIFT_FACTORS[(k - 1) % DRIFT_FACTORS.length];
    const mult = (sign * factor).toFixed(2);
    rules += `
    ::slotted(:nth-child(${cols}n+${k})) {
      --pura-plc-drift: calc(var(--pura-parallax-columns-shift, 120px) * ${mult});
    }`;
  }
  return rules;
}

export function parallaxColumnsTemplate(el = EMPTY_SHIM) {
  const raw = parseInt(el.getAttribute("columns"), 10);
  const cols = Number.isFinite(raw) && raw >= 2 && raw <= 6 ? raw : 3;

  const html = `<div class="stage" part="stage"><div class="grid" part="grid"><slot></slot></div></div>`;

  const css = `
    :host {
      display: block;
      view-timeline: --pura-plc;
    }
    .stage {
      width: 100%;
      height: 100%;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(var(--pura-plc-cols, ${cols}), minmax(0, 1fr));
      gap: var(--pura-parallax-columns-gap, 1rem);
      align-items: start;
    }
    ::slotted(*) {
      min-width: 0;
    }
    ::slotted(img), ::slotted(video) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: var(--pura-parallax-columns-radius, 12px);
    }
    ${columnRules(cols)}

    @keyframes pura-plc-drift {
      from { transform: translateY(calc(var(--pura-plc-drift, 0px) * -1)); }
      to { transform: translateY(var(--pura-plc-drift, 0px)); }
    }
    @keyframes pura-plc-hero {
      from {
        transform: rotateX(var(--pura-parallax-columns-tilt, 15deg));
        opacity: var(--pura-parallax-columns-fade-from, 0.4);
      }
      to {
        transform: rotateX(0deg);
        opacity: 1;
      }
    }

    /* scrub: every column rides the host's view timeline, opposite directions */
    @supports (animation-timeline: scroll()) {
      @media (prefers-reduced-motion: no-preference) {
        ::slotted(*) {
          animation: pura-plc-drift linear both;
          animation-timeline: --pura-plc;
          animation-range: var(--pura-plc-range, cover 0% cover 100%);
        }
        :host([hero]) .stage {
          perspective: var(--pura-parallax-columns-perspective, 1200px);
        }
        :host([hero]) .grid {
          transform-origin: center top;
          animation: pura-plc-hero linear both;
          animation-timeline: --pura-plc;
          animation-range: var(--pura-plc-hero-range, entry 0% cover 35%);
        }
      }
    }

    /* reduced motion: static grid, no drift, no tilt, full opacity */
    @media (prefers-reduced-motion: reduce) {
      ::slotted(*) {
        animation: none;
        transform: none;
      }
      .grid {
        animation: none;
        transform: none;
        opacity: 1;
      }
    }
  `;

  return { html, css };
}
