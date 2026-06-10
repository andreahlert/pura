// Pure render for <pura-gooey-cursor>. No DOM; safe on server (SSR/DSD) and client.
// A fixed full-viewport overlay carrying a stack of circular blobs that the JS
// rAF loop drags behind the pointer in a staggered lerp chain. The blobs sit in
// one container routed through an inline SVG goo filter (feGaussianBlur +
// feColorMatrix alpha threshold + feComposite atop), so overlapping circles
// fuse into one liquid metaball shape. Blob count and sizes are deterministic
// index math over the `count` attribute, never random.
//
// Everything is invisible until the first real pointer move sets
// data-pura-gooey-live, so SSR and pre-JS paint nothing (the page stays clean,
// no stray blob at 0,0). Touch devices ((pointer: coarse)) and reduced motion
// hide the overlay entirely. Browsers that cannot resolve the shadow-scoped
// filter reference degrade to plain (unfused) circles, still presentable.
import { EMPTY_SHIM } from "../base.js";

export function gooeyCursorTemplate(el = EMPTY_SHIM) {
  const blend = el.hasAttribute("blend");

  const rawCount = parseFloat(el.getAttribute("count"));
  const count =
    Number.isFinite(rawCount) ? Math.max(2, Math.min(8, Math.round(rawCount))) : 4;

  const rawStrength = parseFloat(el.getAttribute("strength"));
  const strength =
    Number.isFinite(rawStrength) && rawStrength > 0
      ? Math.min(40, rawStrength)
      : 12;

  // Deterministic per-blob scale: lead blob full size, trail shrinking to ~45%.
  const step = 0.55 / Math.max(1, count - 1);
  let blobs = "";
  for (let i = 0; i < count; i++) {
    const s = (1 - i * step).toFixed(3);
    blobs += `<div class="blob" part="blob" style="--s:${s};"></div>`;
  }

  const html =
    `<svg class="goo-defs" aria-hidden="true" focusable="false">` +
    `<defs><filter id="pura-goo" color-interpolation-filters="sRGB">` +
    `<feGaussianBlur in="SourceGraphic" stdDeviation="${strength}" result="blur"/>` +
    `<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo"/>` +
    `<feComposite in="SourceGraphic" in2="goo" operator="atop"/>` +
    `</filter></defs></svg>` +
    `<div class="blobs" part="blobs" aria-hidden="true">${blobs}</div>`;

  const css = `
    :host {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 2147483646;
      display: block;
      ${blend ? "mix-blend-mode: difference;" : ""}
    }
    .goo-defs {
      position: absolute;
      width: 0;
      height: 0;
      overflow: hidden;
    }
    .blobs {
      position: absolute;
      inset: 0;
      filter: url(#pura-goo);
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    /* Visible only after the first real pointer move (set by JS). */
    :host([data-pura-gooey-live]) .blobs {
      opacity: 1;
    }
    .blob {
      position: absolute;
      top: 0;
      left: 0;
      width: calc(var(--pura-gooey-cursor-size, 36px) * var(--s, 1));
      height: calc(var(--pura-gooey-cursor-size, 36px) * var(--s, 1));
      margin: calc(var(--pura-gooey-cursor-size, 36px) * var(--s, 1) / -2) 0 0
        calc(var(--pura-gooey-cursor-size, 36px) * var(--s, 1) / -2);
      border-radius: 50%;
      background: var(--pura-gooey-cursor-color, ${blend ? "#fff" : "var(--pura-fg, #09090b)"});
      will-change: transform;
    }
    /* Touch / no fine pointer: never show. */
    @media (pointer: coarse) {
      :host { display: none; }
    }
    /* Reduced motion: a trailing cursor is pure motion; render nothing. */
    @media (prefers-reduced-motion: reduce) {
      :host { display: none; }
    }
  `;

  return { html, css };
}
