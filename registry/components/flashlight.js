// <pura-flashlight> — hidden content revealed by a light beam that follows the
// pointer across the section, the iconic awwwards hero flashlight. The default
// slot is the always-visible base layer; the "reveal" slot is an overlay
// clipped by a radial-gradient mask-image whose centre is steered by
// --pura-flashlight-x / --pura-flashlight-y on pointermove. Different from
// pura-spotlight (onboarding) and pura-magic-card (card-scoped glow).
//
// Attributes:
//   size     — flashlight beam diameter, px number or CSS length (default 220px).
//   softness — edge feather of the beam, 0..1 (default 0.25).
//   resting  — "closed" (default) | "center": the pre-pointer / SSR paint.
//              closed hides the reveal layer until hover; center shows it
//              through a centred beam.
//
// Tokens: --pura-flashlight-size, --pura-flashlight-glow (halo color),
//   --pura-flashlight-radius. All with fallbacks.
//
// Motion: the beam is pointer-driven, not a keyframe; the opacity fade is
//   gated by @media (prefers-reduced-motion: no-preference). Under reduced
//   motion the reveal layer renders fully visible (final state) and JS skips
//   pointer tracking entirely.
//
// Agent-native layer: each instance registers in window.__puraFlashlights by
//   data-pura-id with { size, resting, el }; data-pura-flashlight-* mirror
//   config and live state ("rest" | "tracking" | "static").
import { PuraElement, define } from "../base.js";
import meta from "./flashlight.meta.js";
import { flashlightTemplate } from "./flashlight.template.js";

let uid = 0;

function registry() {
  return (window.__puraFlashlights ||= new Map());
}

class PuraFlashlight extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-flashlight-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = flashlightTemplate(this);
    this.render(html, css);

    this.setAttribute("data-pura-flashlight-size", this.size);
    this.setAttribute("data-pura-flashlight-resting", this.resting);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // Final state: the reveal layer is shown by CSS; no tracking.
      this.setAttribute("data-pura-flashlight-state", "static");
    } else {
      this.setAttribute("data-pura-flashlight-state", "rest");
      this._onMove = (e) => {
        const r = this.getBoundingClientRect();
        this.style.setProperty("--pura-flashlight-x", `${e.clientX - r.left}px`);
        this.style.setProperty("--pura-flashlight-y", `${e.clientY - r.top}px`);
      };
      this._onEnter = () => this.setAttribute("data-pura-flashlight-state", "tracking");
      this._onLeave = () => this.setAttribute("data-pura-flashlight-state", "rest");
      this.addEventListener("pointermove", this._onMove);
      this.addEventListener("pointerenter", this._onEnter);
      this.addEventListener("pointerleave", this._onLeave);
    }

    registry().set(this._id, {
      id: this._id,
      size: this.size,
      resting: this.resting,
      el: this,
    });
  }

  disconnectedCallback() {
    if (this._onMove) this.removeEventListener("pointermove", this._onMove);
    if (this._onEnter) this.removeEventListener("pointerenter", this._onEnter);
    if (this._onLeave) this.removeEventListener("pointerleave", this._onLeave);
    const entry = registry().get(this._id);
    if (entry && entry.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get size() {
    const raw = this.getAttribute("size");
    if (!raw) return "220px";
    return /^\d+(\.\d+)?$/.test(raw) ? `${raw}px` : raw;
  }

  get softness() {
    const n = parseFloat(this.getAttribute("softness"));
    return Number.isFinite(n) && n >= 0 && n <= 1 ? n : 0.25;
  }

  get resting() {
    return this.getAttribute("resting") === "center" ? "center" : "closed";
  }
}

define("pura-flashlight", PuraFlashlight, meta);
export { PuraFlashlight };
