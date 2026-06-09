// <pura-motion-budget> — an invisible, page-level governor for how much motion
// the whole library is allowed to spend. It does not render anything: its only
// job is to drive the existing global `--pura-motion` token on <html>, which
// pura components already multiply their durations by (see tokens.css), plus a
// machine-readable `data-pura-motion` mirror on <html>. Custom properties
// inherit across shadow boundaries, so one element calms or stops motion in
// every component's shadow root at once, without touching any of them.
//
// Three semantic modes:
//   normal — full motion. The governor stops overriding the token, so the
//            stylesheet / `prefers-reduced-motion` media rule governs as usual.
//   calm   — motion at half speed (--pura-motion: 0.5). Looping, vestibular
//            motion is dialled down without freezing one-shot transitions.
//   off    — a hard stop (--pura-motion: 0). Every token-driven duration
//            collapses to zero, library-wide.
//
// Attributes:
//   mode           — normal (default) | calm | off.
//   scale          — explicit 0..1 override for --pura-motion (wins over the
//                    mode's default, except `off` which always pins 0).
//   respect-system — when present, a system `prefers-reduced-motion: reduce`
//                    forces `off` regardless of `mode`.
//
// API: get/set .mode, .setMode(m), read-only .effectiveMode and .motion.
// Event: motionchange { mode, motion } (bubbles, composed) on every change.
//
// Agent-native layer: each instance registers in window.__puraMotionBudgets by
//   data-pura-id, and <html data-pura-motion> + the host's
//   data-pura-motion-mode mirror the live budget so an agent can read or drive
//   the page's motion ceiling from one place.
import { PuraElement, define } from "../base.js";
import meta from "./motion-budget.meta.js";

let uid = 0;

function registry() {
  return (window.__puraMotionBudgets ||= new Map());
}

const MODES = new Set(["normal", "calm", "off"]);

// Pure: resolve the effective mode + the numeric --pura-motion value from the
// raw inputs. `off` always pins 0; `respect-system` + a reduced-motion system
// preference force `off`; an explicit finite `scale` (0..1) otherwise wins.
export function resolveMotion({ mode, scale, systemReduced, respectSystem }) {
  let eff = MODES.has(mode) ? mode : "normal";
  if (respectSystem && systemReduced) eff = "off";

  const hasScale = scale != null && scale !== "" && Number.isFinite(Number(scale));
  let motion;
  if (eff === "off") motion = 0;
  else if (hasScale) motion = Math.max(0, Math.min(1, Number(scale)));
  else motion = eff === "calm" ? 0.5 : 1;

  // Whether the governor should actively override the token. In plain `normal`
  // with no explicit scale it steps aside so the system preference still wins.
  const override = eff !== "normal" || hasScale;
  return { mode: eff, motion, override };
}

class PuraMotionBudget extends PuraElement {
  static observedAttributes = ["mode", "scale", "respect-system"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-motion-budget-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    // Invisible controller: never paints, so there is no shadow render here
    // (and therefore no template — see scripts/ssr-completeness.test.mjs).
    this.style.display = "none";
    this.setAttribute("data-pura-motion-budget", "");

    this._mq =
      typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    this._onMq = () => this._apply();
    this._mq?.addEventListener?.("change", this._onMq);

    this._apply();
  }

  disconnectedCallback() {
    this._mq?.removeEventListener?.("change", this._onMq);
    if (registry().get(this._id) === this) registry().delete(this._id);
    // If no other governor remains, release the token back to the stylesheet.
    if (registry().size === 0) this._release();
  }

  attributeChangedCallback() {
    if (!this.isConnected) return;
    this._apply();
  }

  // ---- config ---------------------------------------------------------------
  get mode() {
    const m = this.getAttribute("mode");
    return MODES.has(m) ? m : "normal";
  }
  set mode(v) { this.setAttribute("mode", v); }
  setMode(v) { this.setAttribute("mode", v); }

  get effectiveMode() { return this._resolved?.mode ?? "normal"; }
  get motion() { return this._resolved?.motion ?? 1; }

  // ---- internals ------------------------------------------------------------
  _apply() {
    const systemReduced = !!(this._mq && this._mq.matches);
    const r = resolveMotion({
      mode: this.getAttribute("mode"),
      scale: this.getAttribute("scale"),
      systemReduced,
      respectSystem: this.hasAttribute("respect-system"),
    });
    this._resolved = r;

    const root = typeof document !== "undefined" ? document.documentElement : null;
    if (root) {
      if (r.override) {
        root.style.setProperty("--pura-motion", String(r.motion));
        root.setAttribute("data-pura-motion", r.mode);
      } else {
        root.style.removeProperty("--pura-motion");
        root.removeAttribute("data-pura-motion");
      }
    }

    this.setAttribute("data-pura-motion-mode", r.mode);
    this.dispatchEvent(new CustomEvent("motionchange", {
      bubbles: true,
      composed: true,
      detail: { mode: r.mode, motion: r.motion },
    }));
  }

  _release() {
    const root = typeof document !== "undefined" ? document.documentElement : null;
    if (!root) return;
    root.style.removeProperty("--pura-motion");
    root.removeAttribute("data-pura-motion");
  }
}

define("pura-motion-budget", PuraMotionBudget, meta);
export { PuraMotionBudget };
