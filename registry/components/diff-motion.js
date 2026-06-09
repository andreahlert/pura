// <pura-diff-motion> — watches its light-DOM children and, on every mutation,
// computes a *keyed semantic diff* and both narrates and animates it. Where
// <pura-auto-animate> silently FLIP-tweens layout, this answers the agent-facing
// question "what actually changed?": it emits `diffmotion { added, removed,
// moved, changed }` (lists of keys) and colour-codes each operation, added items
// glow green and scale in, moved items FLIP-slide with a blue tint, changed
// items flash amber. Identity comes from each child's `data-key` (falling back
// to `id`, then index), and "changed" is detected from a content signature
// (`data-sig`, falling back to textContent).
//
// Attributes:
//   disabled — boolean. Stops observing; children mutate with no diff/animation.
//   duration — number (ms). Overrides the token-derived FLIP duration.
//
// Slots: default — the children to watch (light DOM).
//
// Methods: .snapshot() -> [{ key, sig }] current child snapshot;
//   .diff(prev?) -> the diff of `prev` (default: last snapshot) vs now.
//
// Event: diffmotion { added, removed, moved, changed } (bubbles, composed),
//   each an array of keys. Fired after every observed mutation that changes
//   the child set or their signatures/order.
//
// Reduced motion / <pura-motion-budget>: the highlight durations multiply
//   var(--pura-motion) and the FLIP slide checks reducedMotion(), so motion can
//   be calmed or stopped page-wide; the diff EVENT still fires regardless.
//
// Agent-native layer: registers in window.__puraDiffMotion by data-pura-id and
//   mirrors the latest counts in data-pura-diff-* attributes.
import { PuraElement, define } from "../base.js";
import meta from "./diff-motion.meta.js";
import { diffMotionTemplate } from "./diff-motion.template.js";
import { reducedMotion, tokenDuration } from "../animate.js";

let uid = 0;

function registry() {
  return (window.__puraDiffMotion ||= new Map());
}

// Pure: diff two ordered snapshots (arrays of { key, sig }) into key lists.
//   added   — keys present only in next
//   removed — keys present only in prev
//   changed — surviving keys whose sig differs
//   moved   — surviving keys whose position among survivors changed
export function diffSnapshots(prev = [], next = []) {
  const prevMap = new Map(prev.map((e) => [e.key, e]));
  const nextMap = new Map(next.map((e) => [e.key, e]));

  const added = next.filter((e) => !prevMap.has(e.key)).map((e) => e.key);
  const removed = prev.filter((e) => !nextMap.has(e.key)).map((e) => e.key);

  const survivorsNext = next.filter((e) => prevMap.has(e.key)).map((e) => e.key);
  const survivorsPrev = prev.filter((e) => nextMap.has(e.key)).map((e) => e.key);

  const changed = survivorsNext.filter((k) => prevMap.get(k).sig !== nextMap.get(k).sig);

  const prevOrder = new Map(survivorsPrev.map((k, i) => [k, i]));
  const moved = survivorsNext.filter((k, i) => prevOrder.get(k) !== i);

  return { added, removed, moved, changed };
}

class PuraDiffMotion extends PuraElement {
  static observedAttributes = ["disabled", "duration"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-diff-motion-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = diffMotionTemplate(this);
    this.render(html, css);

    this._prev = this.snapshot();
    this._prevRects = this._measure();
    this._timers = new Map();

    if (!this.hasAttribute("disabled")) this._observe();
    this._reflect({ added: [], removed: [], moved: [], changed: [] });
  }

  disconnectedCallback() {
    this._mo?.disconnect();
    this._mo = null;
    for (const t of this._timers?.values() || []) clearTimeout(t);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this.shadowRoot?.childNodes.length) return;
    if (name === "disabled") {
      if (this.hasAttribute("disabled")) { this._mo?.disconnect(); this._mo = null; }
      else if (!this._mo) { this._prev = this.snapshot(); this._prevRects = this._measure(); this._observe(); }
    }
  }

  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n >= 0 ? n : undefined;
  }

  // ---- snapshot / diff (public) ---------------------------------------------
  _keyOf(child, i) {
    return child.getAttribute?.("data-key") ?? child.id ?? `idx:${i}`;
  }
  _sigOf(child) {
    return child.getAttribute?.("data-sig") ?? (child.textContent || "").trim();
  }

  snapshot() {
    const out = [];
    const kids = this.children || [];
    let i = 0;
    for (const child of kids) { out.push({ key: this._keyOf(child, i), sig: this._sigOf(child) }); i++; }
    return out;
  }

  diff(prev = this._prev) {
    return diffSnapshots(prev, this.snapshot());
  }

  // ---- observation ----------------------------------------------------------
  _observe() {
    if (typeof MutationObserver === "undefined") return;
    this._mo = new MutationObserver(() => this._onMutate());
    this._mo.observe(this, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ["data-key", "data-sig"] });
  }

  _onMutate() {
    const prevRects = this._prevRects;
    const next = this.snapshot();
    const d = diffSnapshots(this._prev, next);

    const empty = !d.added.length && !d.removed.length && !d.moved.length && !d.changed.length;
    if (!empty) {
      this._flipSurvivors(prevRects);
      this._stamp(d);
      this._reflect(d);
      this.dispatchEvent(new CustomEvent("diffmotion", { bubbles: true, composed: true, detail: d }));
    }

    this._prev = next;
    this._prevRects = this._measure();
  }

  _measure() {
    const map = new Map();
    let i = 0;
    for (const child of this.children || []) {
      if (child.getBoundingClientRect) map.set(this._keyOf(child, i), child.getBoundingClientRect());
      i++;
    }
    return map;
  }

  // FLIP every surviving child from its cached position to its new one.
  _flipSurvivors(prevRects) {
    if (reducedMotion() || !prevRects) return;
    const duration = this.duration ?? tokenDuration(this);
    let i = 0;
    for (const child of this.children || []) {
      const key = this._keyOf(child, i); i++;
      const prev = prevRects.get(key);
      if (!prev || !child.getBoundingClientRect || !child.animate) continue;
      const now = child.getBoundingClientRect();
      const dx = prev.left - now.left;
      const dy = prev.top - now.top;
      if (!dx && !dy) continue;
      child.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }],
        { duration, easing: "cubic-bezier(0.2, 0, 0, 1)" },
      );
    }
  }

  // Stamp the transient data-pura-diff attribute that drives the ::slotted glow.
  _stamp(d) {
    const role = new Map();
    for (const k of d.changed) role.set(k, "changed");
    for (const k of d.moved) role.set(k, "moved");
    for (const k of d.added) role.set(k, "added"); // added wins if a key is both
    let i = 0;
    for (const child of this.children || []) {
      const key = this._keyOf(child, i); i++;
      const r = role.get(key);
      if (!r) continue;
      // restart the animation even on a repeat role
      child.removeAttribute?.("data-pura-diff");
      void child.offsetWidth;
      child.setAttribute?.("data-pura-diff", r);
      const old = this._timers.get(key);
      if (old) clearTimeout(old);
      const timer = setTimeout(() => { child.removeAttribute?.("data-pura-diff"); this._timers.delete(key); }, 800);
      this._timers.set(key, timer);
    }
  }

  _reflect(d) {
    this.setAttribute("data-pura-diff-added", String(d.added.length));
    this.setAttribute("data-pura-diff-removed", String(d.removed.length));
    this.setAttribute("data-pura-diff-moved", String(d.moved.length));
    this.setAttribute("data-pura-diff-changed", String(d.changed.length));
  }
}

define("pura-diff-motion", PuraDiffMotion, meta);
export { PuraDiffMotion };
