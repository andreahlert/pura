// Pure render for <pura-blobs>. No DOM; safe on server (SSR/DSD) and client.
// A field of organic circles drifting slowly behind the slotted content. The
// circles sit in one container routed through an inline SVG goo filter
// (feGaussianBlur + feColorMatrix alpha threshold + feComposite atop), so
// blobs fuse into liquid metaball shapes as they approach (lava-lamp style).
//
// Every blob's position, size, color pick, drift path, duration and phase is
// deterministic index math (golden-ratio-ish strides), never Math.random, so
// the server and client paint byte-identical fields and the whole effect runs
// with zero client JS.
//
// SSR / pre-JS: the CSS field is already the final presentable state.
// Reduced motion: drift keyframes are gated behind
//   @media (prefers-reduced-motion: no-preference), so the blobs hold still
//   in their scattered layout (still a pretty static backdrop).
// Browsers that cannot resolve the shadow-scoped filter reference degrade to
// plain soft circles, still presentable.
import { EMPTY_SHIM } from "../base.js";

const COLOR_FALLBACKS = ["#8b5cf6", "#22d3ee", "#f472b6"];

// Deterministic per-index scatter so server and client renders never diverge.
function blobStyle(i, speed) {
  const left = 6 + ((i * 137) % 72); // golden-ish horizontal spread, %
  const top = 8 + ((i * 89) % 58); // %
  const scale = (0.55 + ((i * 47) % 75) / 100).toFixed(2); // 0.55..1.29
  const dur = (speed * (0.7 + ((i * 37) % 60) / 100)).toFixed(2);
  const delay = ((i * speed * 0.31) % speed).toFixed(2); // negative phase offset
  const color = (i % 3) + 1;
  return (
    `left:${left}%;top:${top}%;--pura-blob-s:${scale};` +
    `--pura-blob-dur:${dur}s;--pura-blob-delay:-${delay}s;` +
    `background:var(--pura-blobs-color-${color}, ${COLOR_FALLBACKS[color - 1]})`
  );
}

export function blobsTemplate(el = EMPTY_SHIM) {
  const rawCount = parseInt(el.getAttribute("count"), 10);
  const count = Number.isFinite(rawCount) && rawCount > 0 ? Math.min(rawCount, 12) : 5;

  const rawSpeed = parseFloat(el.getAttribute("speed"));
  const speed = Number.isFinite(rawSpeed) && rawSpeed > 0 ? Math.min(rawSpeed, 120) : 18;

  const rawGoo = parseFloat(el.getAttribute("goo"));
  const goo = Number.isFinite(rawGoo) && rawGoo > 0 ? Math.min(rawGoo, 40) : 14;

  let blobs = "";
  for (let i = 0; i < count; i++) {
    blobs += `<span class="blob v${i % 3}" part="blob" style="${blobStyle(i, speed)}"></span>`;
  }

  const html =
    `<svg class="goo-defs" aria-hidden="true" focusable="false">` +
    `<defs><filter id="pura-goo" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">` +
    `<feGaussianBlur in="SourceGraphic" stdDeviation="${goo}" result="blur"/>` +
    `<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo"/>` +
    `<feComposite in="SourceGraphic" in2="goo" operator="atop"/>` +
    `</filter></defs></svg>` +
    `<span class="field" part="field" aria-hidden="true">${blobs}</span>` +
    `<div class="content" part="content"><slot></slot></div>`;

  const css = `
    :host {
      position: relative;
      display: block;
      overflow: hidden;
    }
    .goo-defs {
      position: absolute;
      width: 0;
      height: 0;
      overflow: hidden;
    }
    .field {
      position: absolute;
      inset: 0;
      display: block;
      pointer-events: none;
      filter: url(#pura-goo);
    }
    .blob {
      position: absolute;
      width: calc(var(--pura-blobs-size, 10rem) * var(--pura-blob-s, 1));
      aspect-ratio: 1;
      border-radius: 50%;
      opacity: var(--pura-blobs-opacity, 0.85);
      will-change: transform;
    }
    .content {
      position: relative;
      z-index: 1;
      height: 100%;
    }

    @keyframes pura-blobs-drift-0 {
      0%, 100% { transform: translate(0%, 0%) scale(1); }
      33% { transform: translate(55%, -35%) scale(1.12); }
      66% { transform: translate(-35%, 45%) scale(0.92); }
    }
    @keyframes pura-blobs-drift-1 {
      0%, 100% { transform: translate(0%, 0%) scale(1); }
      25% { transform: translate(-45%, 30%) scale(0.9); }
      60% { transform: translate(40%, 55%) scale(1.15); }
      80% { transform: translate(20%, -30%) scale(1.05); }
    }
    @keyframes pura-blobs-drift-2 {
      0%, 100% { transform: translate(0%, 0%) scale(1); }
      40% { transform: translate(30%, 50%) scale(1.1); }
      70% { transform: translate(-50%, -25%) scale(0.88); }
    }

    /* Continuous drift only when the user is fine with motion; under reduce
       the blobs simply hold their deterministic scattered layout. */
    @media (prefers-reduced-motion: no-preference) {
      .blob {
        animation: pura-blobs-drift-0 var(--pura-blob-dur, 18s) ease-in-out infinite;
        animation-delay: var(--pura-blob-delay, 0s);
      }
      .v1 { animation-name: pura-blobs-drift-1; }
      .v2 { animation-name: pura-blobs-drift-2; }
    }
  `;

  return { html, css };
}
