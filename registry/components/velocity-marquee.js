// <pura-velocity-marquee> — scroll velocity marquee (the Magic UI "Scroll
// Based Velocity" move). An infinite, seamless text strip whose speed and
// direction respond to how fast the page is scrolling: scroll down and it
// races ahead, scroll up and it runs backwards, stop and it eases back to its
// resting pace. Unlike <pura-marquee> (constant speed) and <pura-velocity>
// (skew only), this one modulates the loop itself.
//
// Mechanics: the base loop is pure CSS (identical paint to pura-marquee), so
// SSR / pre-JS shows a normal marquee. On the client a passive scroll listener
// samples scroll velocity (px/ms, signed) and raises a target playbackRate; a
// rAF loop lerps the WAAPI handle of the CSS animation (track.getAnimations())
// toward that target while the target itself decays back to 1, then STOPS once
// settled, so there is no idle per-frame work. Negative rates play the loop in
// reverse; whole-iteration time jumps keep reverse playback from underflowing.
//
// Attributes:
//   speed     — seconds for one full loop at rest (default 20). Lower = faster.
//   direction — left (default) | right. Resting scroll direction.
//   factor    — sensitivity: playbackRate gained per (px/ms) of scroll speed
//               (default 6).
//   max       — playbackRate magnitude cap (default 5).
//   decay     — settle lerp factor per frame, 0..1 (default 0.08).
//   paused    — reflected state; present when the loop is stopped.
//   label     — aria-label for the role=marquee container.
//
// Tokens: --pura-velocity-marquee-speed, --pura-velocity-marquee-gap,
//   --pura-velocity-marquee-from, --pura-velocity-marquee-to.
// Reduced motion: the loop never runs and no scroll listener binds.
// Slots: default — the content to scroll (it is cloned once into an
//   aria-hidden mirror, so assistive tech reads it exactly once).
// Imperative API: play(), pause(), toggle().
//
// Agent-native layer: each instance registers in window.__puraVelocityMarquees
//   by data-pura-id with { id, el }; data-pura-vm-* attributes mirror live
//   state (speed, direction, playing, rate, active) so agents can enumerate,
//   read and drive every instance without DOM spelunking.
import { PuraElement, define } from "../base.js";
import meta from "./velocity-marquee.meta.js";
import { velocityMarqueeTemplate } from "./velocity-marquee.template.js";

let uid = 0;

// Lazily-created global registry so agents can enumerate every instance.
function registry() {
  return (window.__puraVelocityMarquees ||= new Map());
}

function reducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

class PuraVelocityMarquee extends PuraElement {
  static observedAttributes = ["speed", "direction", "paused"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-velocity-marquee-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = velocityMarqueeTemplate(this);
    this.render(html, css);

    this._track = this.$(".track");
    this._slot = this.$("slot");
    this._mirror = this.$(".mirror");

    // Keep the aria-hidden mirror in sync with the real slotted content so the
    // loop stays seamless even when children change.
    this._slot.addEventListener("slotchange", () => this._syncMirror());
    this._syncMirror();

    this._rate = 1; // rendered playbackRate
    this._target = 1; // where scroll velocity wants us
    this._raf = null;
    this._sync();

    registry().set(this._id, { id: this._id, el: this });

    if (reducedMotion()) return;
    this._lastY = window.scrollY;
    this._lastT = 0;
    this._bind();
  }

  disconnectedCallback() {
    this._unbind();
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this._track) this._sync();
  }

  // ---- config ---------------------------------------------------------------
  get speed() {
    const n = parseFloat(this.getAttribute("speed"));
    return Number.isFinite(n) && n > 0 ? n : 20;
  }
  get direction() {
    return this.getAttribute("direction") === "right" ? "right" : "left";
  }
  get factor() {
    const n = parseFloat(this.getAttribute("factor"));
    return Number.isFinite(n) && n > 0 ? n : 6;
  }
  get max() {
    const n = parseFloat(this.getAttribute("max"));
    return Number.isFinite(n) && n > 0 ? n : 5;
  }
  get decay() {
    const n = parseFloat(this.getAttribute("decay"));
    return Number.isFinite(n) && n > 0 && n <= 1 ? n : 0.08;
  }
  get paused() {
    return this.hasAttribute("paused");
  }

  // ---- imperative API --------------------------------------------------------
  play() {
    this.removeAttribute("paused");
  }
  pause() {
    this.setAttribute("paused", "");
  }
  toggle() {
    this.paused ? this.play() : this.pause();
  }

  // ---- internals --------------------------------------------------------------
  // Clone the real slotted nodes into the hidden mirror for a gap-free loop.
  _syncMirror() {
    if (!this._mirror) return;
    this._mirror.replaceChildren();
    for (const node of this._slot.assignedNodes({ flatten: true })) {
      this._mirror.appendChild(node.cloneNode(true));
    }
  }

  _sync() {
    this.style.setProperty("--pura-velocity-marquee-speed", `${this.speed}s`);
    this.style.setProperty(
      "--pura-velocity-marquee-from",
      this.direction === "right" ? "-50%" : "0%"
    );
    this.style.setProperty(
      "--pura-velocity-marquee-to",
      this.direction === "right" ? "0%" : "-50%"
    );
    this._reflectAgentState();
  }

  // Stable machine-readable mirror of state on the host element.
  _reflectAgentState() {
    this.setAttribute("data-pura-vm-speed", String(this.speed));
    this.setAttribute("data-pura-vm-direction", this.direction);
    this.setAttribute("data-pura-vm-playing", this.paused ? "false" : "true");
    if (!this.hasAttribute("data-pura-vm-rate")) {
      this.setAttribute("data-pura-vm-rate", "1.00");
    }
  }

  // WAAPI handle of the CSS loop animation, fetched lazily (it only exists
  // once the shadow styles have applied and motion is allowed).
  _anim() {
    const anims = this._track?.getAnimations?.() || [];
    return anims.find((a) => a.animationName === "pura-velocity-marquee") || anims[0] || null;
  }

  _bind() {
    this._onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = now - this._lastT;
      if (dt > 0 && dt < 200) {
        const v = (y - this._lastY) / dt; // px per ms, signed
        const rate = 1 + v * this.factor;
        this._target = Math.max(-this.max, Math.min(this.max, rate));
      }
      this._lastY = y;
      this._lastT = now;
      if (!this._raf) this._loop();
    };
    window.addEventListener("scroll", this._onScroll, { passive: true });
  }

  _unbind() {
    if (this._onScroll) window.removeEventListener("scroll", this._onScroll);
  }

  // Lerp the rendered rate toward the target while the target itself decays
  // back to the resting rate of 1; stop the loop once both settle so there is
  // no idle per-frame work.
  _loop() {
    this.setAttribute("data-pura-vm-active", "");
    this._raf = requestAnimationFrame(() => {
      this._target += (1 - this._target) * this.decay;
      this._rate += (this._target - this._rate) * 0.2;
      const anim = this._anim();
      if (anim) {
        // Reverse playback would underflow time 0 and finish; the loop is
        // exactly periodic, so jumping forward by whole iterations is
        // invisible. Keep plenty of runway while running backwards.
        if (this._rate < 0 && typeof anim.currentTime === "number") {
          const timing = anim.effect?.getComputedTiming?.();
          const dur = timing && typeof timing.duration === "number" ? timing.duration : 0;
          if (dur > 0 && anim.currentTime < dur * 2) {
            anim.currentTime += dur * 1000;
          }
        }
        anim.playbackRate = this._rate;
      }
      this.setAttribute("data-pura-vm-rate", this._rate.toFixed(2));
      const settled = Math.abs(this._rate - 1) < 0.01 && Math.abs(this._target - 1) < 0.01;
      this._raf = null;
      if (!settled) {
        this._loop();
      } else {
        this._rate = 1;
        this._target = 1;
        if (anim) anim.playbackRate = 1;
        this.setAttribute("data-pura-vm-rate", "1.00");
        this.removeAttribute("data-pura-vm-active");
      }
    });
  }
}

define("pura-velocity-marquee", PuraVelocityMarquee, meta);
export { PuraVelocityMarquee };
