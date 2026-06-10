// <pura-pointer-parallax> — Atropos-style hover parallax: slotted layers with
// different data-depth values translate in distinct directions and intensities
// as the pointer moves across the surface, creating depth without rotating the
// block (that move is <pura-tilt>'s). Event-driven (pointermove writes
// --pura-pp-x/--pura-pp-y on the host); each layer applies
// translate3d(calc(offset * depth * strength)) in CSS, no rAF loop. Layers
// spring back to center on leave with a sampled spring linear(...) easing,
// same mechanism as <pura-tilt> and <pura-magnetic>.
//
// Layers: any direct child with data-depth="<number>". Positive depth moves
//   toward the pointer (foreground); negative moves away (background); 0 or
//   missing stays put. e.g. data-depth="-0.5", data-depth="1.5".
//
// Attributes:
//   strength    — max shift in px per unit of depth at the surface edge (default 16).
//   perspective — perspective depth in px for the 3D scene (default 1000).
//   axis        — "both" (default) | "x" | "y". Restrict the parallax axis.
//   preset / stiffness / damping / mass — spring() easing for the settle.
//
// Tokens: --pura-pointer-parallax-strength, --pura-pointer-parallax-dur,
//   --pura-pointer-parallax-ease.
// Reduced motion: pointer logic never binds, layers render stacked and flat.
// SSR: flat stacked layers; the parallax only engages on the client.
//
// Agent-native layer: each instance registers in window.__puraPointerParallaxs
//   by data-pura-id with { strength, axis, layers, reset, el };
//   data-pura-pp-active mirrors hover state, data-pura-pp-strength and
//   data-pura-pp-layers mirror config.
import { PuraElement, define } from "../base.js";
import meta from "./pointer-parallax.meta.js";
import { pointerParallaxTemplate } from "./pointer-parallax.template.js";
import { spring } from "./spring.js";

let uid = 0;

function registry() {
  return (window.__puraPointerParallaxs ||= new Map());
}

function reducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

// Pure: pointer offset (-0.5..0.5 across each axis) -> normalized -1..1 shift
// factors, with the configured axis restriction applied.
export function parallaxShift(nx, ny, axis) {
  return {
    x: axis === "y" ? "0" : (nx * 2).toFixed(3),
    y: axis === "x" ? "0" : (ny * 2).toFixed(3),
  };
}

class PuraPointerParallax extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-pointer-parallax-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = pointerParallaxTemplate(this);
    this.render(html, css);

    const p = spring({
      preset: this.getAttribute("preset"),
      stiffness: this.getAttribute("stiffness"),
      damping: this.getAttribute("damping"),
      mass: this.getAttribute("mass"),
    });
    this.style.setProperty("--pura-pointer-parallax-dur", `${p.duration}ms`);
    this.style.setProperty("--pura-pointer-parallax-ease", p.easing);

    this._syncLayers();
    this._slot = this.$("slot");
    this._onSlot = () => this._syncLayers();
    this._slot?.addEventListener("slotchange", this._onSlot);

    if (!reducedMotion()) this._bind();

    this.setAttribute("data-pura-pp-strength", String(this.strength));
    registry().set(this._id, {
      id: this._id,
      strength: this.strength,
      axis: this.axis,
      layers: () => this._layers(),
      reset: () => this._reset(),
      el: this,
    });
  }

  disconnectedCallback() {
    this._unbind();
    this._slot?.removeEventListener("slotchange", this._onSlot);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get strength() {
    const n = parseFloat(this.getAttribute("strength"));
    return Number.isFinite(n) && n >= 0 ? n : 16;
  }
  get axis() {
    const v = this.getAttribute("axis");
    return v === "x" || v === "y" ? v : "both";
  }

  // ---- binding --------------------------------------------------------------
  _bind() {
    this._onEnter = () => this.setAttribute("data-pura-pp-active", "");
    this._onMove = (e) => this._track(e);
    this._onLeave = () => this._reset();
    this.addEventListener("pointerenter", this._onEnter);
    this.addEventListener("pointermove", this._onMove);
    this.addEventListener("pointerleave", this._onLeave);
  }
  _unbind() {
    this.removeEventListener("pointerenter", this._onEnter);
    this.removeEventListener("pointermove", this._onMove);
    this.removeEventListener("pointerleave", this._onLeave);
  }

  // ---- internals ------------------------------------------------------------
  _layers() {
    return [...this.children].filter((c) => c.hasAttribute?.("data-depth"));
  }

  // Mirror each layer's data-depth into an inline --pura-pp-depth so the pure
  // CSS calc can pick it up; depth is per-layer, the pointer vars are shared.
  _syncLayers() {
    const layers = this._layers();
    for (const layer of layers) {
      const n = parseFloat(layer.getAttribute("data-depth"));
      layer.style.setProperty("--pura-pp-depth", Number.isFinite(n) ? String(n) : "0");
    }
    this.setAttribute("data-pura-pp-layers", String(layers.length));
  }

  _track(e) {
    const r = this.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    const { x, y } = parallaxShift(nx, ny, this.axis);
    this.style.setProperty("--pura-pp-x", x);
    this.style.setProperty("--pura-pp-y", y);
  }

  _reset() {
    this.removeAttribute("data-pura-pp-active"); // re-enable spring transition
    this.style.setProperty("--pura-pp-x", "0");
    this.style.setProperty("--pura-pp-y", "0");
  }
}

define("pura-pointer-parallax", PuraPointerParallax, meta);
export { PuraPointerParallax };
