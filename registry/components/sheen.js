// <pura-sheen> — glare hover: a diagonal light streak sweeps across the
// slotted content once per hover, without tilting anything. The flat
// counterpart to <pura-tilt glare>: drop a button, card or image inside and
// the streak (a translucent linear-gradient overlay) crosses it via a
// transform transition triggered by :hover / :focus-within. Pure CSS after
// first paint; JS only renders the template and exposes the agent layer.
//
// Attributes:
//   duration — sweep duration in ms (default 800).
//   angle    — gradient angle in degrees (default 120).
//   loop     — boolean. Sweep continuously without a pointer (ambient mode).
//
// Tokens: --pura-sheen-color (default rgba(255,255,255,0.45)),
//   --pura-sheen-width (band half-width, default 15%), --pura-sheen-duration,
//   --pura-sheen-ease, --pura-sheen-angle, --pura-sheen-radius (frame corner
//   radius, default 0px).
//
// Reduced motion: the hover transition collapses to 0.01ms (streak jumps
// straight off-frame, effectively invisible) and the loop animation is gated
// behind prefers-reduced-motion: no-preference, so nothing moves.
// SSR: the streak sits fully off-frame; content paints normally.
//
// Agent-native layer: each instance registers in window.__puraSheens by
//   data-pura-id with { duration, angle, sweep, el }; data-pura-sheen-*
//   mirror config and data-pura-sheen-sweep mirrors an in-flight sweep.
import { PuraElement, define } from "../base.js";
import meta from "./sheen.meta.js";
import { sheenTemplate } from "./sheen.template.js";

let uid = 0;

function registry() {
  return (window.__puraSheens ||= new Map());
}

class PuraSheen extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-sheen-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = sheenTemplate(this);
    this.render(html, css);

    this.setAttribute("data-pura-sheen-duration", String(this.duration));
    this.setAttribute("data-pura-sheen-angle", String(this.angle));
    if (this.hasAttribute("loop")) this.setAttribute("data-pura-sheen-loop", "");

    registry().set(this._id, {
      id: this._id,
      duration: this.duration,
      angle: this.angle,
      sweep: () => this.sweep(),
      el: this,
    });
  }

  disconnectedCallback() {
    clearTimeout(this._sweepTimer);
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 800;
  }
  get angle() {
    const n = parseFloat(this.getAttribute("angle"));
    return Number.isFinite(n) ? n : 120;
  }

  // ---- imperative API ---------------------------------------------------------
  // Trigger one sweep programmatically (same move as a hover pass). The
  // attribute mirrors in-flight state for agents and is cleared once the
  // streak has crossed, snapping it back off-frame for the next pass.
  sweep() {
    clearTimeout(this._sweepTimer);
    this.removeAttribute("data-pura-sheen-sweep");
    void this.offsetWidth; // restyle so back-to-back calls restart the move
    this.setAttribute("data-pura-sheen-sweep", "");
    this._sweepTimer = setTimeout(
      () => this.removeAttribute("data-pura-sheen-sweep"),
      this.duration + 50,
    );
  }
}

define("pura-sheen", PuraSheen, meta);
export { PuraSheen };
