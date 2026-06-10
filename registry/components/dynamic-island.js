// <pura-dynamic-island> — the iOS Dynamic Island: a floating black pill that
// morphs between named states (compact, expanded, player, timer, ...). Each
// state is a named slot; set the `state` attribute and the island FLIPs its
// size: it measures the pill before and after the swap and interpolates
// width/height/border-radius with WAAPI using a real spring `linear(...)`
// easing sampled by pura-spring's exported math. The outgoing pane fades and
// blurs out while the incoming pane fades, unblurs and scales in.
//
// Attributes:
//   state     — active state name, must match an entry of `states`
//               (default: the first entry, "compact").
//   states    — comma-separated state/slot names (default "compact,expanded").
//   spring    — spring preset for the morph: default | gentle | wobbly | stiff
//               | slow | snappy (default "snappy").
//   stiffness, damping, mass — numeric overrides for the spring profile.
//
// Slots: one named slot per state ("compact", "expanded", ...); the default
//   slot lands in the first state's pane.
//
// Events:
//   statechange — fired on every state swap, detail { from, to }.
//
// Tokens: --pura-dynamic-island-bg, -fg, -radius, -<state>-radius, -padding,
//   -gap, -shadow, -min-width, -min-height.
// Reduced motion: states swap instantly, no morph, no crossfade.
//
// Agent-native layer: each instance registers in window.__puraDynamicIslands
//   by data-pura-id with { state, states, setState, el };
//   data-pura-island-state / data-pura-island-states mirror live state.
import { PuraElement, define } from "../base.js";
import { spring } from "./spring.js";
import meta from "./dynamic-island.meta.js";
import { dynamicIslandTemplate, parseIslandStates } from "./dynamic-island.template.js";

let uid = 0;

function registry() {
  return (window.__puraDynamicIslands ||= new Map());
}

class PuraDynamicIsland extends PuraElement {
  static observedAttributes = ["state"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-dynamic-island-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = dynamicIslandTemplate(this);
    this.render(html, css);

    this._island = this.$(".island");
    this.setAttribute("data-pura-island-state", this.state);
    this.setAttribute("data-pura-island-states", this.states.join(","));
    this._publish();
  }

  disconnectedCallback() {
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name !== "state" || !this.isConnected || !this._island) return;
    if (oldValue === newValue) return;
    this._morph(this.state);
  }

  // ---- config ---------------------------------------------------------------
  get states() {
    return parseIslandStates(this.getAttribute("states"));
  }
  get state() {
    const states = this.states;
    const s = (this.getAttribute("state") || "").trim().toLowerCase();
    return states.includes(s) ? s : states[0];
  }
  get springProfile() {
    const presets = ["default", "gentle", "wobbly", "stiff", "slow", "snappy"];
    const preset = (this.getAttribute("spring") || "snappy").trim().toLowerCase();
    return spring({
      preset: presets.includes(preset) ? preset : "snappy",
      stiffness: this.getAttribute("stiffness"),
      damping: this.getAttribute("damping"),
      mass: this.getAttribute("mass"),
    });
  }

  // ---- public API -----------------------------------------------------------
  setState(next) {
    this.setAttribute("state", String(next));
  }

  // ---- internals ------------------------------------------------------------
  // FLIP: measure the pill in the old state, swap the CSS-driving mirror
  // attribute, measure again, then animate between the two rects with the
  // sampled spring easing. The mirror attribute (not `state` itself) keys the
  // CSS so the "before" measurement is still possible inside this callback.
  _morph(next) {
    const island = this._island;
    const prev = this.getAttribute("data-pura-island-state") || this.states[0];
    if (prev === next) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
      typeof island.animate !== "function";

    const before = reduce ? null : island.getBoundingClientRect();
    const beforeRadius = reduce ? "" : getComputedStyle(island).borderRadius;
    const prevPane = this.$(`.pane[data-state="${prev}"]`);

    this.setAttribute("data-pura-island-state", next);
    this._publish();
    this.dispatchEvent(
      new CustomEvent("statechange", {
        bubbles: true,
        composed: true,
        detail: { from: prev, to: next },
      }),
    );
    if (reduce) return;

    const after = island.getBoundingClientRect();
    const afterRadius = getComputedStyle(island).borderRadius;
    const p = this.springProfile;

    island.animate(
      [
        {
          width: `${before.width}px`,
          height: `${before.height}px`,
          borderRadius: beforeRadius,
        },
        {
          width: `${after.width}px`,
          height: `${after.height}px`,
          borderRadius: afterRadius,
        },
      ],
      { duration: p.duration, easing: p.easing },
    );

    // crossfade: ghost the outgoing pane out, ease the incoming pane in
    if (prevPane) {
      prevPane.setAttribute("data-leaving", "");
      const out = prevPane.animate(
        [
          { opacity: 1, filter: "blur(0px)", transform: "scale(1)" },
          { opacity: 0, filter: "blur(6px)", transform: "scale(0.85)" },
        ],
        { duration: 180, easing: "ease-out", fill: "forwards" },
      );
      out.onfinish = out.oncancel = () => {
        prevPane.removeAttribute("data-leaving");
        out.cancel();
      };
    }
    const nextPane = this.$(`.pane[data-state="${next}"]`);
    nextPane?.animate(
      [
        { opacity: 0, filter: "blur(6px)", transform: "scale(0.9)" },
        { opacity: 1, filter: "blur(0px)", transform: "scale(1)" },
      ],
      {
        duration: Math.min(p.duration, 380),
        delay: 70,
        fill: "backwards",
        easing: "ease-out",
      },
    );
  }

  _publish() {
    registry().set(this._id, {
      id: this._id,
      state: this.getAttribute("data-pura-island-state") || this.state,
      states: this.states,
      setState: (s) => this.setState(s),
      el: this,
    });
  }
}

define("pura-dynamic-island", PuraDynamicIsland, meta);
export { PuraDynamicIsland };
