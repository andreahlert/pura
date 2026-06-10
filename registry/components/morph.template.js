// Pure render for <pura-morph>. No DOM; safe on server (SSR/DSD) and client.
// The element morphs one SVG path into another. We bake the from-path as the
// static `d` and the to-path into a `@keyframes` / transition end-state, both as
// LITERAL path() strings in the CSS — never routed through a var() into the `d`
// geometry property. (Chromium reliably interpolates and re-paints a literal
// path() keyframe, the way it does NOT for an animated value reaching
// font-variation-settings via var().) The two paths MUST share command
// structure (same count and order of M/L/C/Z…); matched commands interpolate
// smoothly under scrub, mismatched commands snap.
//
// scrub (default): ties `d` 1:1 to a scroll-driven timeline, no frame JS.
// view / load: transitions `d` from -> to once.
// SSR / pre-JS: the shape sits at its from-path, fully painted.
import { EMPTY_SHIM } from "../base.js";

const DEFAULT_FROM = "M 10 10 L 90 10 L 90 90 L 10 90 Z";
const DEFAULT_TO = "M 50 6 L 94 50 L 50 94 L 6 50 Z";
const DEFAULT_VIEWBOX = "0 0 100 100";

// Keep only characters legal inside an SVG path d-string so a baked value can
// never break out of path("…") or the surrounding rule.
function safePath(raw, fallback) {
  if (raw == null || raw === "") return fallback;
  const cleaned = String(raw).replace(/[^0-9eE.,+\-\s MLHVCQSTAZmlhvcqstaz]/g, "");
  return cleaned.trim() || fallback;
}

function safeViewBox(raw) {
  if (raw == null || raw === "") return DEFAULT_VIEWBOX;
  const cleaned = String(raw).replace(/[^0-9.\-\s]/g, "").trim();
  return cleaned || DEFAULT_VIEWBOX;
}

// Paint attrs are echoed into CSS; allow only a conservative token set.
function safePaint(raw, fallback) {
  if (raw == null || raw === "") return fallback;
  const cleaned = String(raw).replace(/[^0-9a-zA-Z#%.,()\-\s]/g, "").trim();
  return cleaned || fallback;
}

export function morphTemplate(el = EMPTY_SHIM) {
  const from = safePath(el.getAttribute("from"), DEFAULT_FROM);
  const to = safePath(el.getAttribute("to"), DEFAULT_TO);
  const viewBox = safeViewBox(el.getAttribute("viewbox"));
  const fill = safePaint(el.getAttribute("fill"), "currentColor");
  const stroke = safePaint(el.getAttribute("stroke"), "none");
  const strokeWidth = safePaint(el.getAttribute("stroke-width"), "0");

  const html =
    `<svg part="svg" viewBox="${viewBox}" aria-hidden="true">` +
    `<path part="shape" class="shape" /></svg>`;

  const css = `
    :host {
      display: inline-block;
      line-height: 0;
      --pura-morph-dur: 0.8s;
      --pura-morph-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    svg { display: block; width: 100%; height: 100%; overflow: visible; }
    .shape {
      d: path("${from}");
      fill: ${fill};
      stroke: ${stroke};
      stroke-width: ${strokeWidth};
    }

    /* view / load: transition d from -> to. */
    :host([data-pura-morph-anim]) .shape {
      transition: d var(--pura-morph-dur) var(--pura-morph-ease);
    }
    :host([data-pura-morph-in]) .shape {
      d: path("${to}");
    }

    @keyframes pura-morph {
      to { d: path("${to}"); }
    }

    /* scrub: tie d 1:1 to a scroll-driven timeline, reversible, no JS frame. */
    @supports (animation-timeline: scroll()) {
      @media (prefers-reduced-motion: no-preference) {
        :host([data-pura-morph-scrub]) .shape {
          animation: pura-morph linear both;
          animation-timeline: var(--pura-morph-timeline, view());
          animation-range: var(--pura-morph-range, cover 0% cover 50%);
        }
      }
    }

    /* Reduced motion: never scrub. Land at the destination shape. */
    @media (prefers-reduced-motion: reduce) {
      :host([data-pura-morph-scrub]) .shape { d: path("${to}"); }
    }
  `;

  return { html, css };
}
