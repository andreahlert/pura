// <pura-glitch-text> — digital glitch text: two RGB-shifted copies of the text
// (pseudo-elements fed by data-text) with horizontal clip-path inset() slices
// that jump on hand-authored CSS keyframes, the classic signal-error look for
// tech/gaming heros. The real slotted text is always present, so SSR and the
// pre-JS paint show clean readable text; JS only mirrors the text into
// data-text so the glitch layers light up.
//
// Attributes:
//   speed     — glitch cycle duration in seconds (default 3). The second layer
//               runs 1.4x slower so the two tracks desync.
//   intensity — "low" | "medium" | "high" (default "medium"): RGB shift distance.
//   hover     — boolean; glitch only while hovered, static text otherwise.
//
// Tokens: --pura-glitch-text-dur (cycle duration), --pura-glitch-text-shift
//   (layer offset), --pura-glitch-text-color-a (default red #ff3b6b),
//   --pura-glitch-text-color-b (default cyan #00fff9).
// Reduced motion: the glitch layers are removed; only the static text shows.
//
// Agent-native layer: each instance registers in window.__puraGlitchTexts by
//   data-pura-id with { text, speed, intensity, hover, refresh, el };
//   data-pura-glitch-* mirror config on the host. Call refresh() after
//   changing the slotted text so the glitch layers re-sync.
import { PuraElement, define } from "../base.js";
import meta from "./glitch-text.meta.js";
import { glitchTextTemplate } from "./glitch-text.template.js";

let uid = 0;

function registry() {
  return (window.__puraGlitchTexts ||= new Map());
}

const SHIFTS = { low: "1px", medium: "2px", high: "5px" };

class PuraGlitchText extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-glitch-text-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = glitchTextTemplate(this);
    this.render(html, css);

    this.refresh();

    registry().set(this._id, {
      id: this._id,
      text: this._text,
      speed: this.speed,
      intensity: this.intensity,
      hover: this.bool("hover"),
      refresh: () => this.refresh(),
      el: this,
    });
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get speed() {
    const n = parseFloat(this.getAttribute("speed"));
    return Number.isFinite(n) && n > 0 ? n : 3;
  }
  get intensity() {
    const v = this.getAttribute("intensity");
    return v in SHIFTS ? v : "medium";
  }

  // ---- public API -----------------------------------------------------------
  // Re-read the slotted text and config; call after changing either.
  refresh() {
    this._text = (this.textContent || "").replace(/\s+/g, " ").trim();
    const glitch = this.$(".glitch");
    if (glitch) glitch.setAttribute("data-text", this._text);

    this.style.setProperty("--pura-glitch-text-dur", `${this.speed}s`);
    this.style.setProperty("--pura-glitch-text-shift", SHIFTS[this.intensity]);

    this.setAttribute("data-pura-glitch-speed", String(this.speed));
    this.setAttribute("data-pura-glitch-intensity", this.intensity);
    if (this.bool("hover")) this.setAttribute("data-pura-glitch-hover", "");
    else this.removeAttribute("data-pura-glitch-hover");
  }
}

define("pura-glitch-text", PuraGlitchText, meta);
export { PuraGlitchText };
