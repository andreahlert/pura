// Pure render for <pura-wavy-text>. No DOM; safe on server (SSR/DSD) and client.
// The classic wavy footer text: the template splits the `text` attribute into
// per-character spans, each carrying its index in --i so a single CSS keyframe
// animation, phase-shifted by a negative incremental animation-delay, makes the
// whole string bob on a continuous sine wave. 100% CSS, zero per-frame JS.
//
// Accessibility: the animated character spans are aria-hidden; a visually hidden
// copy of the full string is the accessible text. Characters are grouped into
// inline-block .word wrappers so line wrapping happens at word boundaries.
//
// SSR / pre-JS: with a `text` attribute the full wave markup is emitted and the
// animation runs from first paint (pure CSS). Without it (EMPTY_SHIM form) the
// slotted text renders statically, readable with no script at all.
// Reduced motion: the animation only runs under prefers-reduced-motion:
// no-preference; under reduce every character sits still at the baseline.
import { EMPTY_SHIM } from "../base.js";

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ESC[c]);
}

// Validate a CSS length so attribute values cannot inject arbitrary CSS.
function cssLength(v) {
  const s = String(v ?? "").trim();
  return /^-?\d*\.?\d+(px|em|rem|ch|ex|%|vh|vw)$/.test(s) ? s : null;
}

export function wavyTextTemplate(el = EMPTY_SHIM) {
  const raw = el.getAttribute("text");
  const text = raw == null ? "" : String(raw).replace(/\s+/g, " ").trim();

  const dur = parseFloat(el.getAttribute("duration"));
  const stagger = parseFloat(el.getAttribute("stagger"));
  const amp = cssLength(el.getAttribute("amplitude"));
  const overrides = [
    Number.isFinite(dur) && dur > 0 ? `--pura-wavy-text-duration: ${dur}s;` : "",
    Number.isFinite(stagger) && stagger >= 0 ? `--pura-wavy-text-stagger: ${stagger}ms;` : "",
    amp ? `--pura-wavy-text-amplitude: ${amp};` : "",
  ].join("");

  let html;
  if (!text) {
    // No text attribute (e.g. the SSR no-attribute form): show the slotted
    // text statically. Readable and presentable with zero JS.
    html = `<span class="wave" part="wave"><slot></slot></span>`;
  } else {
    let i = 0;
    const words = text.split(" ").map((w) => {
      let chars = "";
      for (const ch of w) {
        chars += `<span class="ch" part="char" style="--i:${i}">${esc(ch)}</span>`;
        i++;
      }
      return `<span class="word" part="word">${chars}</span>`;
    });
    html =
      `<span class="wave" part="wave" aria-hidden="true">${words.join(" ")}</span>` +
      `<span class="a11y" part="text">${esc(text)}</span>` +
      `<slot></slot>`;
  }

  const css = `
    :host {
      display: inline-block;
      --pura-wavy-text-amplitude: 0.3em;
      --pura-wavy-text-duration: 1.6s;
      --pura-wavy-text-stagger: 90ms;
      ${overrides}
    }
    .wave { display: inline-block; }
    .word { display: inline-block; }
    .ch { display: inline-block; will-change: transform; }

    /* When the text attribute drives the wave, any slotted original (the copy
       the client lifted into the attribute) is hidden to avoid doubling. */
    :host([text]) slot { display: none; }

    /* Visually hidden accessible copy; the animated spans are aria-hidden. */
    .a11y {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
      border: 0;
    }

    /* Full sine bob: up, through baseline, down, back. Negative delays put
       every character mid-wave from the first frame, phase-shifted by index. */
    @keyframes pura-wavy-text-bob {
      0%, 50%, 100% { transform: translateY(0); }
      25% { transform: translateY(calc(-1 * var(--pura-wavy-text-amplitude))); }
      75% { transform: translateY(var(--pura-wavy-text-amplitude)); }
    }

    @media (prefers-reduced-motion: no-preference) {
      .ch {
        animation: pura-wavy-text-bob var(--pura-wavy-text-duration) ease-in-out infinite;
        animation-delay: calc(var(--i, 0) * -1 * var(--pura-wavy-text-stagger));
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .ch { animation: none !important; transform: none; }
    }
  `;

  return { html, css };
}
