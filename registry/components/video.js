// <pura-video> - styled wrapper around native <video> with a custom control bar.
// Attributes:
//   src       - video URL (alternatively slot <source> elements).
//   poster    - poster image URL.
//   autoplay  - start playing on load (implies muted in most browsers).
//   loop      - loop playback.
//   muted     - start muted.
//   controls  - show the browser's native controls instead of the custom bar.
// Custom controls: play/pause, time / duration, seek slider, volume, mute,
// fullscreen. Keyboard: space=play/pause, left/right=seek, up/down=volume.
// Parts: video, controls, button, scrubber, time. Theming via var(--pura-*).
import { PuraElement, define } from "../base.js";
import meta from "./video.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "video.play": { en: "Play", "pt-BR": "Reproduzir", fr: "Lecture", de: "Abspielen", it: "Riproduci" },
  "video.pause": { en: "Pause", "pt-BR": "Pausar", fr: "Pause", de: "Pause", it: "Pausa" },
  "video.mute": { en: "Mute", "pt-BR": "Silenciar", fr: "Couper le son", de: "Stummschalten", it: "Disattiva audio" },
  "video.unmute": { en: "Unmute", "pt-BR": "Ativar som", fr: "Activer le son", de: "Ton an", it: "Attiva audio" },
  "video.seek": { en: "Seek", "pt-BR": "Avançar", fr: "Rechercher", de: "Suchen", it: "Cerca" },
  "video.volume": { en: "Volume", "pt-BR": "Volume", fr: "Volume", de: "Lautstärke", it: "Volume" },
  "video.fullscreen": { en: "Fullscreen", "pt-BR": "Tela cheia", fr: "Plein écran", de: "Vollbild", it: "Schermo intero" },
});

const ICON = {
  play: '<path d="M7 5v14l12-7z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" stroke="none"/>',
  vol: '<path d="M4 9v6h4l5 4V5L8 9zM16 9a3 3 0 0 1 0 6M18.5 6.5a7 7 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  mute: '<path d="M4 9v6h4l5 4V5L8 9zM17 9l4 6M21 9l-4 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  full: '<path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
};

const svg = (g) => `<svg viewBox="0 0 24 24" aria-hidden="true">${g}</svg>`;

function fmt(s) {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

class PuraVideo extends PuraElement {
  connectedCallback() {
    const native = this.hasAttribute("controls");
    const src = this.getAttribute("src");
    const poster = this.getAttribute("poster");
    this.render(
      `<div class="wrap" part="root">
         <video part="video"
           ${src ? `src="${src}"` : ""}
           ${poster ? `poster="${poster}"` : ""}
           ${this.hasAttribute("autoplay") ? "autoplay" : ""}
           ${this.hasAttribute("loop") ? "loop" : ""}
           ${this.hasAttribute("muted") ? "muted" : ""}
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
       </div>`,
      CSS
    );

    this._v = this.$("video");
    if (native) return;

    this._play = this.$(".play");
    this._muteBtn = this.$(".mute");
    this._full = this.$(".full");
    this._seek = this.$(".seek");
    this._vol = this.$(".vol");
    this._cur = this.$(".cur");
    this._dur = this.$(".dur");
    this._seeking = false;

    this._play.addEventListener("click", () => this._toggle());
    this._muteBtn.addEventListener("click", () => { this._v.muted = !this._v.muted; this._syncVol(); });
    this._full.addEventListener("click", () => this._toggleFull());
    this._seek.addEventListener("input", () => {
      this._seeking = true;
      if (this._v.duration) this._v.currentTime = (this._seek.value / 100) * this._v.duration;
    });
    this._seek.addEventListener("change", () => { this._seeking = false; });
    this._vol.addEventListener("input", () => { this._v.volume = Number(this._vol.value); this._v.muted = this._v.volume === 0; this._syncVol(); });

    this._v.addEventListener("play", () => this._syncPlay());
    this._v.addEventListener("pause", () => this._syncPlay());
    this._v.addEventListener("loadedmetadata", () => this._syncTime());
    this._v.addEventListener("timeupdate", () => this._syncTime());
    this._v.addEventListener("volumechange", () => this._syncVol());

    this.tabIndex = this.tabIndex < 0 ? 0 : this.tabIndex;
    this._onKey = (e) => this._key(e);
    this.addEventListener("keydown", this._onKey);

    this._syncPlay();
    this._syncVol();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
    if (this._onKey) this.removeEventListener("keydown", this._onKey);
  }

  // Public surface.
  get video() { return this._v; }
  play() { return this._v?.play(); }
  pause() { this._v?.pause(); }

  _toggle() { this._v.paused ? this._v.play() : this._v.pause(); }

  _toggleFull() {
    const root = this.$(".wrap");
    if (document.fullscreenElement) document.exitFullscreen?.();
    else root.requestFullscreen?.();
  }

  _key(e) {
    if (!this._v) return;
    switch (e.key) {
      case " ": case "k": e.preventDefault(); this._toggle(); break;
      case "ArrowLeft": e.preventDefault(); this._v.currentTime = Math.max(0, this._v.currentTime - 5); break;
      case "ArrowRight": e.preventDefault(); this._v.currentTime = Math.min(this._v.duration || 0, this._v.currentTime + 5); break;
      case "ArrowUp": e.preventDefault(); this._v.volume = Math.min(1, this._v.volume + 0.1); break;
      case "ArrowDown": e.preventDefault(); this._v.volume = Math.max(0, this._v.volume - 0.1); break;
      case "m": this._v.muted = !this._v.muted; break;
      case "f": this._toggleFull(); break;
    }
  }

  _syncPlay() {
    const playing = !this._v.paused;
    this._play.innerHTML = svg(playing ? ICON.pause : ICON.play);
    this._play.setAttribute("aria-label", playing ? t("video.pause") : t("video.play"));
  }

  _syncTime() {
    this._cur.textContent = fmt(this._v.currentTime);
    this._dur.textContent = fmt(this._v.duration);
    if (!this._seeking && this._v.duration) {
      this._seek.value = (this._v.currentTime / this._v.duration) * 100;
    }
  }

  _syncVol() {
    const muted = this._v.muted || this._v.volume === 0;
    this._muteBtn.innerHTML = svg(muted ? ICON.mute : ICON.vol);
    this._muteBtn.setAttribute("aria-label", muted ? t("video.unmute") : t("video.mute"));
    this._vol.value = muted ? 0 : this._v.volume;
  }

  _applyI18n() {
    this._syncPlay();
    this._syncVol();
    this._seek.setAttribute("aria-label", t("video.seek"));
    this._vol.setAttribute("aria-label", t("video.volume"));
    this._full.setAttribute("aria-label", t("video.fullscreen"));
  }
}

const CSS = `
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

define("pura-video", PuraVideo, meta);
export { PuraVideo };
