// <pura-status-badge> — a pill that morphs between async states: idle ->
// loading -> success / error. The icon crossfades and scales in per state, the
// color tweens, the success check / error cross write themselves in, and the
// pill width morphs with a FLIP animation (measure old width, swap state,
// measure new width, animate between). The motion.dev "statuses" move.
//
// Attributes:
//   state — "idle" (default) | "loading" | "success" | "error". Reactive:
//           change it at any time and the badge morphs.
//   idle-label / loading-label / success-label / error-label — texts
//           (defaults: Submit / Loading / Done / Failed).
//
// Tokens: --pura-status-fg, --pura-status-idle-bg, --pura-status-loading-bg,
//   --pura-status-success-bg, --pura-status-error-bg, --pura-status-dur.
//
// SSR / pre-JS: the idle state renders. role="status" announces label swaps.
// Reduced motion: states swap without transitions; the width snaps.
//
// Agent-native layer: each instance registers in window.__puraStatusBadges by
//   data-pura-id with { state, set, el }; data-pura-status mirrors the state.
import { PuraElement, define } from "../base.js";
import meta from "./status-badge.meta.js";
import { statusBadgeTemplate, badgeState } from "./status-badge.template.js";

let uid = 0;

function registry() {
  return (window.__puraStatusBadges ||= new Map());
}

class PuraStatusBadge extends PuraElement {
  static get observedAttributes() {
    return ["state"];
  }

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-status-badge-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = statusBadgeTemplate(this);
    this.render(html, css);

    this.setAttribute("data-pura-status", badgeState(this));
    registry().set(this._id, {
      id: this._id,
      state: badgeState(this),
      set: (s) => this.setAttribute("state", s),
      el: this,
    });
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue === newValue || !this.shadowRoot) return;
    this._morph();
  }

  // ---- internals ------------------------------------------------------------
  // FLIP the pill width: measure before, swap state, measure after, animate.
  _morph() {
    const badge = this.$(".badge");
    const next = badgeState(this);
    const prev = this.getAttribute("data-pura-status");
    if (prev === next) return;

    const from = badge.getBoundingClientRect().width;
    this.setAttribute("data-pura-status", next);
    const entry = registry().get(this._id);
    if (entry) entry.state = next;

    const to = badge.getBoundingClientRect().width;
    if (from === to || typeof badge.animate !== "function") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    badge.animate(
      [{ width: `${from}px` }, { width: `${to}px` }],
      { duration: 350, easing: "cubic-bezier(0.34, 1.3, 0.64, 1)" },
    );
  }
}

define("pura-status-badge", PuraStatusBadge, meta);
export { PuraStatusBadge };
