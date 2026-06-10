// Pure render for <pura-scroll-zoom>. No DOM; safe on server (SSR/DSD) and client.
// The Apple-style scroll zoom: the slotted media starts small and rounded in
// the middle of the viewport and grows to full bleed as you scroll, tied 1:1
// to a scroll-driven timeline (animation-timeline: view()) — zero per-frame JS.
// The frame animates scale + border-radius; the slotted image just fills it.
//
// SSR / pre-JS and unsupported browsers: the media renders at full size.
// Reduced motion: full size, no zoom.
import { EMPTY_SHIM } from "../base.js";

export function scrollZoomTemplate(el = EMPTY_SHIM) {
  const html = `<div class="frame" part="frame"><slot></slot></div>`;

  const css = `
    :host {
      display: block;
      --pura-scroll-zoom-from: 0.5;
      --pura-scroll-zoom-radius: 24px;
    }
    .frame {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 0;
    }
    ::slotted(img), ::slotted(video) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @keyframes pura-scroll-zoom {
      from {
        transform: scale(var(--pura-scroll-zoom-from));
        border-radius: var(--pura-scroll-zoom-radius);
      }
      to {
        transform: scale(1);
        border-radius: 0px;
      }
    }

    /* scrub: tie the zoom 1:1 to the element's view progress */
    @supports (animation-timeline: scroll()) {
      @media (prefers-reduced-motion: no-preference) {
        :host([data-pura-sz-scrub]) .frame {
          animation: pura-scroll-zoom linear both;
          animation-timeline: var(--pura-sz-timeline, view());
          animation-range: var(--pura-sz-range, cover 0% cover 65%);
        }
      }
    }
  `;

  return { html, css };
}
