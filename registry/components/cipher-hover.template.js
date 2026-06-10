// Pure render for <pura-cipher-hover>. No DOM; safe on server (SSR/DSD) and client.
// An Evervault-style encrypted card: a layer of pseudo-random characters sits
// behind the slotted content and is clipped by a radial-gradient mask-image
// centred on --pura-cipher-x / --pura-cipher-y, which the element steers on
// pointermove. The character field is generated here with seed/index math (no
// Math.random) so the server and client paint byte-identical markup; the client
// then rewrites it per throttled rAF frame while the pointer is over the card.
//
// SSR / pre-JS: the card renders with the cipher layer present but hidden
// (opacity 0), so the page looks finished, a clean card, before any JS runs.
// Reduced motion: the reveal fade is gated under prefers-reduced-motion:
// no-preference; under reduce the layer stays hidden (calm final state) and the
// element never starts the per-frame scramble.
import { EMPTY_SHIM } from "../base.js";

// Default charset deliberately excludes & < > " so the unescaped fast path is
// HTML-safe; custom `chars` values are escaped before injection.
export const DEFAULT_CIPHER_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%*+=?@^~";

// Deterministic character field: a tiny LCG advanced from the seed picks one
// charset index per position. Same (seed, length, chars) in Node and in the
// browser yields the same string; the client animates by bumping the seed per
// frame, so even the runtime scramble is index math, not native randomness.
export function cipherField(seed, length, chars) {
  let s = (seed >>> 0) || 1;
  let out = "";
  for (let i = 0; i < length; i++) {
    s = (s * 1664525 + 1013904223) >>> 0;
    out += chars[s % chars.length];
  }
  return out;
}

function esc(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function cipherHoverTemplate(el = EMPTY_SHIM) {
  const rawSize = el.getAttribute("size");
  const size = !rawSize ? "200px" : /^\d+(\.\d+)?$/.test(rawSize) ? `${rawSize}px` : rawSize;

  const rawSeed = parseInt(el.getAttribute("seed"), 10);
  const seed = Number.isFinite(rawSeed) ? rawSeed : 1;

  const rawLen = parseInt(el.getAttribute("length"), 10);
  const length = Number.isFinite(rawLen) && rawLen > 0 ? Math.min(rawLen, 6000) : 1500;

  const chars = el.getAttribute("chars") || DEFAULT_CIPHER_CHARS;
  const field = esc(cipherField(seed, length, chars));

  const beam = `radial-gradient(
      var(--pura-cipher-hover-size, ${size}) circle at var(--pura-cipher-x, 50%) var(--pura-cipher-y, 50%),
      #000 25%,
      transparent 100%
    )`;

  const html = `
    <div class="cipher" part="cipher" aria-hidden="true">${field}</div>
    <div class="content" part="content"><slot></slot></div>
  `;

  const css = `
    :host {
      position: relative;
      display: block;
      overflow: hidden;
      isolation: isolate;
      border-radius: var(--pura-cipher-hover-radius, 16px);
      background: var(--pura-cipher-hover-bg, transparent);
    }

    /* Decorative character field, clipped to the beam that follows the pointer.
       Gradient ink via background-clip: text; slight inset bleed hides ragged
       wrap edges at the card border. */
    .cipher {
      position: absolute;
      inset: -4px;
      z-index: 1;
      pointer-events: none;
      overflow: hidden;
      user-select: none;
      font-family: var(--pura-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
      font-size: var(--pura-cipher-hover-font-size, 0.8rem);
      font-weight: 600;
      line-height: 1.45;
      word-break: break-all;
      color: transparent;
      background: var(--pura-cipher-hover-gradient, linear-gradient(120deg, #34d399, #22d3ee 50%, #818cf8));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-mask-image: ${beam};
      mask-image: ${beam};
      opacity: 0;
    }

    .content {
      position: relative;
      z-index: 2;
    }

    @media (prefers-reduced-motion: no-preference) {
      .cipher { transition: opacity 0.3s ease; }
      :host(:hover) .cipher,
      :host([data-pura-cipher-state="tracking"]) .cipher { opacity: 1; }
    }

    /* Reduced motion: the per-frame flicker never starts (JS gate) and the
       layer holds its calm final state, a plain card with no scramble. */
    @media (prefers-reduced-motion: reduce) {
      .cipher { opacity: 0; }
    }
  `;

  return { html, css };
}
