// Pure render for <pura-video-text>. No DOM; safe on server (SSR/DSD) and client.
// Giant typography whose fill is a playing video: an inline SVG <text> built
// from the `text` attribute is applied as a CSS mask-image over the slotted
// video, so the glyphs act as a window onto the footage. The mask is static
// markup generated right here, which makes the initial paint SSR-safe with
// zero JS and zero per-frame work; the only motion is the video itself.
//
// The SVG has no viewBox: it inherits the element's box, the text is centered
// with percent coordinates and sized by the `font-size` attribute (an SVG
// length, default 20em). Glyphs are CSS, not content, so a visually hidden
// span carries the text for assistive tech and the slotted media wrapper is
// aria-hidden (the video is decorative fill).
//
// Without a `text` attribute (the attribute-free SSR form included) no mask is
// applied and the slotted media renders full bleed, so the pre-JS paint is
// always presentable.
//
// Reduced motion: a mask cannot pause a <video>; the component JS pauses the
// slotted video under prefers-reduced-motion, leaving a static masked frame.
import { EMPTY_SHIM } from "../base.js";

// Escape for SVG/XML text nodes and single-quoted attribute values; also safe
// for the HTML accessible copy.
function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function videoTextTemplate(el = EMPTY_SHIM) {
  const text = (el.getAttribute("text") || "").trim();
  const fontSize = el.getAttribute("font-size") || "20em";
  const fontWeight = el.getAttribute("font-weight") || "900";
  const fontFamily = el.getAttribute("font-family") || "system-ui, sans-serif";

  // The mask: white glyphs = visible video, everything else transparent.
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>` +
    `<text x='50%' y='50%' text-anchor='middle' dominant-baseline='central'` +
    ` font-family='${escapeXml(fontFamily)}' font-size='${escapeXml(fontSize)}'` +
    ` font-weight='${escapeXml(fontWeight)}' fill='white'>${escapeXml(text)}</text></svg>`;
  const mask = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

  const html =
    `<div class="frame" part="frame">` +
    `<div class="media" part="media" aria-hidden="true"><slot></slot></div>` +
    (text ? `<span class="a11y" part="text">${escapeXml(text)}</span>` : "") +
    `</div>`;

  const css = `
    :host {
      display: block;
    }
    .frame {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: var(--pura-video-text-bg, transparent);
    }
    .media {
      width: 100%;
      height: 100%;
    }
    ::slotted(video), ::slotted(img) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: var(--pura-video-text-fit, cover);
    }
    ${text ? `
    .media {
      -webkit-mask-image: ${mask};
      mask-image: ${mask};
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
      -webkit-mask-position: center;
      mask-position: center;
    }` : ""}
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
  `;

  return { html, css };
}
