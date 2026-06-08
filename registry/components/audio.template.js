// Pure render(s) for <audio> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

const svg = (g) => `<svg viewBox="0 0 24 24" aria-hidden="true">${g}</svg>`;
const ICON = {
  play: '<path d="M7 5v14l12-7z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" stroke="none"/>',
  vol: '<path d="M4 9v6h4l5 4V5L8 9zM16 9a3 3 0 0 1 0 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  mute: '<path d="M4 9v6h4l5 4V5L8 9zM17 9l4 6M21 9l-4 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
};

export function audioTemplate(el = EMPTY_SHIM) {
  const src = el.getAttribute("src");
  const title = el.getAttribute("title");
  const artist = el.getAttribute("artist");
  const html = `<div class="player" part="root">
         <audio
           ${src ? `src="${src}"` : ""}
           ${el.hasAttribute("autoplay") ? "autoplay" : ""}
           ${el.hasAttribute("loop") ? "loop" : ""}
           preload="metadata"></audio>
         ${title || artist ? `<div class="meta">
           ${title ? `<span class="ttl" part="title">${title}</span>` : ""}
           ${artist ? `<span class="art" part="artist">${artist}</span>` : ""}
         </div>` : ""}
         <div class="bar" part="controls">
           <button class="btn play" part="button" aria-label="${t("audio.play")}">${svg(ICON.play)}</button>
           <span class="time cur" part="time">0:00</span>
           <input class="seek" part="scrubber" type="range" min="0" max="100" value="0" step="0.1" aria-label="${t("audio.seek")}" />
           <span class="time dur" part="time">0:00</span>
           <button class="btn mute" part="button" aria-label="${t("audio.mute")}">${svg(ICON.vol)}</button>
           <input class="vol" part="scrubber" type="range" min="0" max="1" step="0.05" value="1" aria-label="${t("audio.volume")}" />
         </div>
       </div>`;
  return { html, css: AUDIO_CSS };
}

export const AUDIO_CSS = `
  :host { display: block; }
  .player {
    display: flex; flex-direction: column; gap: var(--pura-space-2);
    padding: var(--pura-space-3) var(--pura-space-4);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm);
  }

  .meta { display: flex; flex-direction: column; line-height: 1.3; min-width: 0; }
  .ttl { font-size: var(--pura-text-sm); font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .art { font-size: var(--pura-text-xs); color: var(--pura-muted); }

  .bar { display: flex; align-items: center; gap: var(--pura-space-2); }

  .btn {
    display: grid; place-items: center; flex: none;
    width: 2rem; height: 2rem; padding: 0;
    border: none; background: transparent; color: var(--pura-fg); cursor: pointer;
    border-radius: var(--pura-radius-sm);
  }
  .btn:hover { background: var(--pura-subtle); }
  .btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .btn svg { width: 1.25rem; height: 1.25rem; }

  .time {
    flex: none; font-size: var(--pura-text-xs); color: var(--pura-muted);
    font-variant-numeric: tabular-nums; white-space: nowrap;
  }

  input[type="range"] {
    -webkit-appearance: none; appearance: none;
    height: 0.3rem; background: transparent; cursor: pointer; margin: 0;
  }
  .seek { flex: 1; min-width: 4rem; }
  .vol { flex: none; width: 4rem; }
  input[type="range"]::-webkit-slider-runnable-track {
    height: 0.3rem; border-radius: var(--pura-radius-full); background: var(--pura-subtle);
  }
  input[type="range"]::-moz-range-track {
    height: 0.3rem; border-radius: var(--pura-radius-full); background: var(--pura-subtle);
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none; margin-top: -0.3rem;
    width: 0.9rem; height: 0.9rem; border-radius: var(--pura-radius-full);
    background: var(--pura-primary); border: none;
  }
  input[type="range"]::-moz-range-thumb {
    width: 0.9rem; height: 0.9rem; border-radius: var(--pura-radius-full);
    background: var(--pura-primary); border: none;
  }
  input[type="range"]:focus-visible { outline: none; }
  input[type="range"]:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 3px var(--pura-ring); }
  input[type="range"]:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 3px var(--pura-ring); }
`;
