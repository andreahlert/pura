// <pura-audio> - styled player over native <audio>.
// Attributes:
//   src       - audio URL.
//   autoplay  - start playing on load.
//   loop      - loop playback.
//   title     - optional track title display.
//   artist    - optional artist display.
// Controls: play/pause, seek slider, current/total time, volume, mute.
// Parts: controls, button, scrubber, time. Theming via var(--pura-*).
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "audio.play": { en: "Play", "pt-BR": "Reproduzir", fr: "Lecture", de: "Abspielen", it: "Riproduci" },
  "audio.pause": { en: "Pause", "pt-BR": "Pausar", fr: "Pause", de: "Pause", it: "Pausa" },
  "audio.mute": { en: "Mute", "pt-BR": "Silenciar", fr: "Couper le son", de: "Stummschalten", it: "Disattiva audio" },
  "audio.unmute": { en: "Unmute", "pt-BR": "Ativar som", fr: "Activer le son", de: "Ton an", it: "Attiva audio" },
  "audio.seek": { en: "Seek", "pt-BR": "Avançar", fr: "Rechercher", de: "Suchen", it: "Cerca" },
  "audio.volume": { en: "Volume", "pt-BR": "Volume", fr: "Volume", de: "Lautstärke", it: "Volume" },
});

const ICON = {
  play: '<path d="M7 5v14l12-7z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" stroke="none"/>',
  vol: '<path d="M4 9v6h4l5 4V5L8 9zM16 9a3 3 0 0 1 0 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  mute: '<path d="M4 9v6h4l5 4V5L8 9zM17 9l4 6M21 9l-4 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
};

const svg = (g) => `<svg viewBox="0 0 24 24" aria-hidden="true">${g}</svg>`;

function fmt(s) {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

class PuraAudio extends PuraElement {
  connectedCallback() {
    const src = this.getAttribute("src");
    const title = this.getAttribute("title");
    const artist = this.getAttribute("artist");
    this.render(
      `<div class="player" part="root">
         <audio
           ${src ? `src="${src}"` : ""}
           ${this.hasAttribute("autoplay") ? "autoplay" : ""}
           ${this.hasAttribute("loop") ? "loop" : ""}
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
       </div>`,
      CSS
    );

    this._a = this.$("audio");
    this._play = this.$(".play");
    this._muteBtn = this.$(".mute");
    this._seek = this.$(".seek");
    this._vol = this.$(".vol");
    this._cur = this.$(".cur");
    this._dur = this.$(".dur");
    this._seeking = false;

    this._play.addEventListener("click", () => this._toggle());
    this._muteBtn.addEventListener("click", () => { this._a.muted = !this._a.muted; this._syncVol(); });
    this._seek.addEventListener("input", () => {
      this._seeking = true;
      if (this._a.duration) this._a.currentTime = (this._seek.value / 100) * this._a.duration;
    });
    this._seek.addEventListener("change", () => { this._seeking = false; });
    this._vol.addEventListener("input", () => { this._a.volume = Number(this._vol.value); this._a.muted = this._a.volume === 0; this._syncVol(); });

    this._a.addEventListener("play", () => this._syncPlay());
    this._a.addEventListener("pause", () => this._syncPlay());
    this._a.addEventListener("loadedmetadata", () => this._syncTime());
    this._a.addEventListener("timeupdate", () => this._syncTime());
    this._a.addEventListener("volumechange", () => this._syncVol());

    this._syncPlay();
    this._syncVol();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  get audio() { return this._a; }
  play() { return this._a?.play(); }
  pause() { this._a?.pause(); }

  _toggle() { this._a.paused ? this._a.play() : this._a.pause(); }

  _syncPlay() {
    const playing = !this._a.paused;
    this._play.innerHTML = svg(playing ? ICON.pause : ICON.play);
    this._play.setAttribute("aria-label", playing ? t("audio.pause") : t("audio.play"));
  }

  _syncTime() {
    this._cur.textContent = fmt(this._a.currentTime);
    this._dur.textContent = fmt(this._a.duration);
    if (!this._seeking && this._a.duration) {
      this._seek.value = (this._a.currentTime / this._a.duration) * 100;
    }
  }

  _syncVol() {
    const muted = this._a.muted || this._a.volume === 0;
    this._muteBtn.innerHTML = svg(muted ? ICON.mute : ICON.vol);
    this._muteBtn.setAttribute("aria-label", muted ? t("audio.unmute") : t("audio.mute"));
    this._vol.value = muted ? 0 : this._a.volume;
  }

  _applyI18n() {
    this._syncPlay();
    this._syncVol();
    this._seek.setAttribute("aria-label", t("audio.seek"));
    this._vol.setAttribute("aria-label", t("audio.volume"));
  }
}

const CSS = `
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

define("pura-audio", PuraAudio);
export { PuraAudio };
