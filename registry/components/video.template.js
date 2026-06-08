// Pure render(s) for <video> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

const svg = (g) => `<svg viewBox="0 0 24 24" aria-hidden="true">${g}</svg>`;
const ICON = {
  play: '<path d="M7 5v14l12-7z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" stroke="none"/>',
  vol: '<path d="M4 9v6h4l5 4V5L8 9zM16 9a3 3 0 0 1 0 6M18.5 6.5a7 7 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  mute: '<path d="M4 9v6h4l5 4V5L8 9zM17 9l4 6M21 9l-4 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  full: '<path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
};

export function videoTemplate(el = EMPTY_SHIM) {
  const native = el.hasAttribute("controls");
  const src = el.getAttribute("src");
  const poster = el.getAttribute("poster");
  const html = `<div class="wrap" part="root">
         <video part="video"
           ${src ? `src="${src}"` : ""}
           ${poster ? `poster="${poster}"` : ""}
           ${el.hasAttribute("autoplay") ? "autoplay" : ""}
           ${el.hasAttribute("loop") ? "loop" : ""}
           ${el.hasAttribute("muted") ? "muted" : ""}
           ${native ? "controls" : ""}
           playsinline>${native || src ? "" : "<slot></slot>"}</video>
         ${native ? "" : `
         <div class="bar" part="controls">
           <button class="btn play" part="button" aria-label="${t("video.play")}">${svg(ICON.play)}</button>
           <span class="time" part="time"><span class="cur">0:00</span> / <span class="dur">0:00</span></span>
           <input class="seek" part="scrubber" type="range" min="0" max="100" value="0" step="0.1" aria-label="${t("video.seek")}" />
           <button class="btn mute" part="button" aria-label="${t("video.mute")}">${svg(ICON.vol)}</button>
           <input class="vol" part="scrubber" type="range" min="0" max="1" step="0.05" value="1" aria-label="${t("video.volume")}" />
           <button class="btn full" part="button" aria-label="${t("video.fullscreen")}">${svg(ICON.full)}</button>
         </div>`}
       </div>`;
  return { html, css: VIDEO_CSS };
}

export const VIDEO_CSS = `
  :host { display: block; outline: none; }
  :host(:focus-visible) .wrap { box-shadow: 0 0 0 3px var(--pura-ring); }
  .wrap {
    position: relative; display: block; overflow: hidden; background: #000;
    border-radius: var(--pura-radius); box-shadow: var(--pura-shadow);
  }
  video { display: block; width: 100%; height: 100%; background: #000; }

  .bar {
    position: absolute; left: 0; right: 0; bottom: 0;
    display: flex; align-items: center; gap: var(--pura-space-2);
    padding: var(--pura-space-2) var(--pura-space-3);
    background: linear-gradient(to top, rgb(0 0 0 / 0.7), transparent);
    color: #fff; font: inherit;
    opacity: 0; transition: opacity var(--pura-dur) var(--pura-ease);
  }
  .wrap:hover .bar, .wrap:focus-within .bar { opacity: 1; }

  .btn {
    display: grid; place-items: center; flex: none;
    width: 2rem; height: 2rem; padding: 0;
    border: none; background: transparent; color: #fff; cursor: pointer;
    border-radius: var(--pura-radius-sm);
  }
  .btn:hover { background: rgb(255 255 255 / 0.18); }
  .btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .btn svg { width: 1.25rem; height: 1.25rem; }

  .time {
    flex: none; font-size: var(--pura-text-xs); font-variant-numeric: tabular-nums;
    color: rgb(255 255 255 / 0.9); white-space: nowrap;
  }

  input[type="range"] {
    -webkit-appearance: none; appearance: none;
    height: 0.25rem; background: transparent; cursor: pointer; margin: 0;
  }
  .seek { flex: 1; min-width: 4rem; }
  .vol { flex: none; width: 4.5rem; }
  input[type="range"]::-webkit-slider-runnable-track {
    height: 0.25rem; border-radius: var(--pura-radius-full);
    background: rgb(255 255 255 / 0.35);
  }
  input[type="range"]::-moz-range-track {
    height: 0.25rem; border-radius: var(--pura-radius-full);
    background: rgb(255 255 255 / 0.35);
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none; margin-top: -0.3rem;
    width: 0.85rem; height: 0.85rem; border-radius: var(--pura-radius-full);
    background: #fff; border: none;
  }
  input[type="range"]::-moz-range-thumb {
    width: 0.85rem; height: 0.85rem; border-radius: var(--pura-radius-full);
    background: #fff; border: none;
  }
  input[type="range"]:focus-visible { outline: none; }
  input[type="range"]:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 3px var(--pura-ring); }
  input[type="range"]:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 3px var(--pura-ring); }
`;
