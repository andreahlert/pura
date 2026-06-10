// <pura-card-stack>: a pile of cards with decreasing offset and scale that
// trade places on an automatic cycle or by dragging the top card (Tinder
// style, testimonials): past the threshold the card flies out with inertia
// and the next one rises; below it, it springs back. Unlike <pura-deck>
// (scroll-driven sticky pile), the stack stays in place and the cards swap
// depths.
//
// SSR paints the resting pile via static nth-child transforms (pure template);
// on the client a FLIP pass with WAAPI re-ranks the cards on every cycle, and
// Pointer Events + the spring linear() easing (from pura-spring) drive the
// drag, the fling and the return.
//
// Attributes:
//   visible   - how many depths show behind the top card, 1..6 (default 3).
//   offset    - px each depth steps down (default 14).
//   scale     - scale lost per depth, 0..0.2 (default 0.05).
//   autoplay  - boolean; cycle the stack automatically.
//   interval  - autoplay period in ms (default 4000, min 800).
//   threshold - horizontal travel in px, after inertia projection, that
//               commits a swipe (default 80).
//   spring    - spring preset for the return and the FLIP re-rank:
//               gentle | wobbly | stiff | slow | snappy | default
//               (default snappy).
//
// Events:
//   swipe  - a swipe was committed; detail { direction, index }.
//   change - a new card reached the top; detail { index }.
//
// Keyboard: the stack is focusable; ArrowLeft / ArrowRight swipe the top card.
// Tokens: --pura-card-stack-offset, --pura-card-stack-scale,
//   --pura-card-stack-radius (focus ring radius).
// Reduced motion: no autoplay, no WAAPI; swipes and cycles reorder instantly.
//
// Agent-native layer: each instance registers in window.__puraCardStacks by
//   data-pura-id with { next, swipe, el }; data-pura-stack-top / -count /
//   -dragging / -autoplay mirror state.
import { PuraElement, define } from "../base.js";
import meta from "./card-stack.meta.js";
import { cardStackTemplate } from "./card-stack.template.js";
import { spring } from "./spring.js";

let uid = 0;

function registry() {
  return (window.__puraCardStacks ||= new Map());
}

const FLING_EASE = "cubic-bezier(0.18, 0.7, 0.35, 1)";

class PuraCardStack extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-card-stack-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = cardStackTemplate(this);
    this.render(html, css);

    this._cards = [...this.children]; // original order, for stable indices
    this._spring = spring({ preset: this.getAttribute("spring") || "snappy" });
    this._busy = false;
    this._drag = null;

    this._mirror();
    this._bind();
    this._startAutoplay();

    registry().set(this._id, {
      id: this._id,
      next: () => this.next(),
      swipe: (dir) => this.swipe(dir),
      el: this,
    });
  }

  disconnectedCallback() {
    this._stopAutoplay();
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get interval() {
    const n = parseFloat(this.getAttribute("interval"));
    return Number.isFinite(n) && n >= 800 ? n : 4000;
  }
  get threshold() {
    const n = parseFloat(this.getAttribute("threshold"));
    return Number.isFinite(n) && n > 0 ? n : 80;
  }
  get topIndex() {
    return this._cards.indexOf(this.children[0]);
  }

  // ---- public API -----------------------------------------------------------
  next() {
    this.swipe("left");
  }

  swipe(direction) {
    if (this._busy || this._drag || this.children.length < 2) return;
    const dir = direction === "right" || direction === 1 ? 1 : -1;
    this._flyOut(this.children[0], dir, "translate(0px, 0px) rotate(0deg)", 0);
  }

  // ---- internals ------------------------------------------------------------
  _reduced() {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }

  _mirror() {
    this.setAttribute("data-pura-stack-count", String(this.children.length));
    this.setAttribute("data-pura-stack-top", String(this.topIndex));
  }

  _bind() {
    const stack = this.$(".stack");
    stack.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        this.swipe("left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        this.swipe("right");
      }
    });
    this.$("slot").addEventListener("slotchange", () => {
      for (const c of this.children) if (!this._cards.includes(c)) this._cards.push(c);
      this._mirror();
    });
    this.addEventListener("dragstart", (e) => e.preventDefault());
    this.addEventListener("pointerdown", (e) => this._onDown(e));
    this.addEventListener("pointermove", (e) => this._onMove(e));
    this.addEventListener("pointerup", (e) => this._onUp(e));
    this.addEventListener("pointercancel", () => this._onCancel());
    this.addEventListener("pointerenter", () => {
      if (!this._drag) this._stopAutoplay();
    });
    this.addEventListener("pointerleave", () => {
      if (!this._drag) this._startAutoplay();
    });
  }

  _onDown(e) {
    if (this._busy || this._drag || e.button !== 0) return;
    if (this.children.length < 2) return;
    // only the top card is draggable; find which slotted card was hit
    let card = e.target;
    while (card && card.parentElement !== this) card = card.parentElement;
    if (!card || card !== this.children[0]) return;
    this._drag = {
      card,
      id: e.pointerId,
      sx: e.clientX,
      sy: e.clientY,
      dx: 0,
      dy: 0,
      active: false,
      samples: [{ x: e.clientX, t: e.timeStamp }],
    };
    this.setPointerCapture(e.pointerId);
    this._stopAutoplay();
  }

  _onMove(e) {
    const d = this._drag;
    if (!d || e.pointerId !== d.id) return;
    d.dx = e.clientX - d.sx;
    d.dy = e.clientY - d.sy;
    // 6px slop so plain clicks (links, buttons inside a card) stay clicks
    if (!d.active) {
      if (Math.abs(d.dx) < 6 && Math.abs(d.dy) < 6) return;
      d.active = true;
      this.setAttribute("data-pura-stack-dragging", "");
    }
    d.samples.push({ x: e.clientX, t: e.timeStamp });
    if (d.samples.length > 6) d.samples.shift();
    d.card.style.transform = this._dragTransform(d);
  }

  _onUp(e) {
    const d = this._drag;
    if (!d || e.pointerId !== d.id) return;
    this._drag = null;
    this.removeAttribute("data-pura-stack-dragging");
    this._startAutoplay();
    if (!d.active) return;

    // velocity over the last few samples; project it to decide with inertia
    const first = d.samples[0];
    const last = d.samples[d.samples.length - 1];
    const vx = (last.x - first.x) / Math.max(1, last.t - first.t); // px/ms
    const projected = d.dx + vx * 150;
    const from = this._dragTransform(d);

    if (Math.abs(projected) > this.threshold) {
      this._flyOut(d.card, projected > 0 ? 1 : -1, from, vx);
      return;
    }
    // below the threshold: spring back to rest
    d.card.style.transform = "";
    if (!this._reduced() && typeof d.card.animate === "function") {
      d.card.animate(
        [{ transform: from }, { transform: "translate(0px, 0px) rotate(0deg)" }],
        { duration: this._spring.duration, easing: this._spring.easing },
      );
    }
  }

  _onCancel() {
    const d = this._drag;
    if (!d) return;
    this._drag = null;
    this.removeAttribute("data-pura-stack-dragging");
    if (d.active) d.card.style.transform = "";
    this._startAutoplay();
  }

  _dragTransform(d) {
    return `translate(${d.dx}px, ${d.dy * 0.35}px) rotate(${(d.dx * 0.05).toFixed(2)}deg)`;
  }

  // The committed swipe: the top card flies off with inertia, then tucks
  // behind the pile while the rest FLIP into their new depth.
  _flyOut(card, dir, from, vx) {
    this._busy = true;
    const width = this.getBoundingClientRect().width || 320;
    this.dispatchEvent(
      new CustomEvent("swipe", {
        bubbles: true,
        composed: true,
        detail: { direction: dir > 0 ? "right" : "left", index: this._cards.indexOf(card) },
      }),
    );
    if (this._reduced() || typeof card.animate !== "function") {
      card.style.transform = "";
      this._cycle(card);
      return;
    }
    // inertia: a fast fling exits faster, clamped to a sane window
    const speed = Math.max(0.6, Math.abs(vx));
    const duration = Math.max(180, Math.min(460, Math.round(width / speed)));
    const anim = card.animate(
      [
        { transform: from, opacity: 1 },
        { transform: `translate(${dir * width * 1.4}px, 0px) rotate(${dir * 22}deg)`, opacity: 0 },
      ],
      { duration, easing: FLING_EASE, fill: "forwards" },
    );
    anim.onfinish = () => {
      anim.cancel(); // release the fill; the reorder below repaints in the same task
      card.style.transform = "";
      this._cycle(card);
    };
  }

  // FLIP: measure every remaining card, move the flung card to the back of the
  // DOM (the template's nth-child CSS re-ranks everything), then animate each
  // card from its old computed transform to the new one with the spring easing.
  _cycle(card) {
    const rest = [...this.children].filter((c) => c !== card);
    const animate = !this._reduced() && typeof card.animate === "function";
    const before = animate ? new Map(rest.map((c) => [c, getComputedStyle(c).transform])) : null;
    this.appendChild(card);
    this._mirror();
    if (before) {
      for (const [c, from] of before) {
        const to = getComputedStyle(c).transform;
        if (from !== to) {
          c.animate(
            [{ transform: from }, { transform: to }],
            { duration: this._spring.duration, easing: this._spring.easing },
          );
        }
      }
    }
    this._busy = false;
    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
        composed: true,
        detail: { index: this.topIndex },
      }),
    );
  }

  _startAutoplay() {
    this._stopAutoplay();
    if (!this.hasAttribute("autoplay") || this._reduced()) return;
    this.setAttribute("data-pura-stack-autoplay", "");
    this._timer = setInterval(() => {
      if (!this._drag && !this._busy && !document.hidden) this.next();
    }, this.interval);
  }

  _stopAutoplay() {
    if (this._timer) clearInterval(this._timer);
    this._timer = null;
    this.removeAttribute("data-pura-stack-autoplay");
  }
}

define("pura-card-stack", PuraCardStack, meta);
export { PuraCardStack };
