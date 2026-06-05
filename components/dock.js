// <pura-dock> — macOS-style dock. A centered rounded bar of icon buttons that
// MAGNIFY (scale up) on pointer proximity: the hovered item grows the most and
// its neighbors grow less, with a smooth springy falloff. Pointer leaves → the
// row settles back to rest size.
//
// Attributes (pura-dock):
//   fixed       — pin the dock to the bottom-center of the viewport.
//   magnify     — max scale of the hovered item (number, default 1.6).
//   reach       — proximity radius in px over which magnification falls off
//                 (default 110). Larger = more neighbors lift.
//   label       — accessible name for the dock (aria-label). Defaults to "Dock".
// Slots:
//   default     — one or more <pura-dock-item> (or any element; non-item nodes
//                 are laid out but not magnified/roved).
//
// <pura-dock-item> — a single dock entry. Wraps an icon (slot) and is the
// magnified, focusable unit.
//   Attributes:
//     label     — tooltip text + accessible name; shown in a native Popover
//                 tooltip on hover/focus and used as aria-label.
//     href      — render as a link instead of a button.
//     active     — show the running/active indicator dot.
//     disabled  — non-interactive, dropped from roving focus.
//   Slots:
//     default   — the icon (an <img>, inline <svg>, emoji, etc.).
//   Events:
//     dock-item-activate — fired (bubbles, composed) on click / Enter / Space.
//
// Keyboard: roving tabindex across enabled items; ArrowLeft/Right (and Up/Down)
// move focus, Home/End jump to the ends, Enter/Space activate.
//
// Agent-native layer: the dock exposes role="toolbar" + aria-orientation on its
// internal track; each item exposes role + aria-label + data-pura-dock-item.
// Every dock mirrors live state via data-pura-dock-* attributes on the host and
// registers in window.__puraDocks keyed by data-pura-id, so agents can
// enumerate docks and read item counts / labels without touching shadow DOM.
//
// Motion: magnification is pointer-driven transform only. Under
// prefers-reduced-motion the base reset neutralizes transitions AND we disable
// the proximity scaling entirely, so nothing depends on motion to be usable.
import { PuraElement, define } from "../base.js";

let dockUid = 0;
let tipUid = 0;

// Lazily-created global registry: data-pura-id -> dock element.
function registry() {
  return (window.__puraDocks ||= new Map());
}

const REDUCED = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ───────────────────────────── pura-dock ───────────────────────────── */

class PuraDock extends PuraElement {
  static observedAttributes = ["fixed", "magnify", "reach", "label"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-dock-${dockUid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    this.render(
      `<div part="dock" class="track" role="toolbar"
            aria-orientation="horizontal"
            aria-label="${(this.getAttribute("label") || "Dock").replace(/"/g, "&quot;")}">
         <slot></slot>
       </div>`,
      CSS
    );

    this._track = this.$("[part=dock]");
    this._slot = this.$("slot");

    this._onMove = this._onMove.bind(this);
    this._onLeave = this._onLeave.bind(this);
    this._onSlotChange = this._onSlotChange.bind(this);
    this._onKeydown = this._onKeydown.bind(this);

    this._track.addEventListener("pointermove", this._onMove);
    this._track.addEventListener("pointerleave", this._onLeave);
    this.addEventListener("keydown", this._onKeydown);
    this._slot.addEventListener("slotchange", this._onSlotChange);

    this._sync();
  }

  disconnectedCallback() {
    if (this._track) {
      this._track.removeEventListener("pointermove", this._onMove);
      this._track.removeEventListener("pointerleave", this._onLeave);
    }
    this.removeEventListener("keydown", this._onKeydown);
    if (this._slot) this._slot.removeEventListener("slotchange", this._onSlotChange);
    cancelAnimationFrame(this._raf);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this._track) return;
    if (name === "label") {
      this._track.setAttribute("aria-label", this.getAttribute("label") || "Dock");
    }
    this._reflectAgentState();
  }

  // Numeric attrs with safe defaults.
  get _magnify() {
    const v = parseFloat(this.getAttribute("magnify"));
    return Number.isFinite(v) && v >= 1 ? v : 1.6;
  }
  get _reach() {
    const v = parseFloat(this.getAttribute("reach"));
    return Number.isFinite(v) && v > 0 ? v : 110;
  }

  // Top-level <pura-dock-item> (or any element) nodes.
  get items() {
    return this._slot ? this._slot.assignedElements() : [...this.children];
  }

  _dockItems() {
    return this.items.filter((el) => el.localName === "pura-dock-item");
  }

  // Enabled, focusable items for roving focus.
  _focusable() {
    return this._dockItems().filter(
      (el) => !el.hasAttribute("disabled") && !el.hidden
    );
  }

  _onSlotChange() {
    this._sync();
  }

  _sync() {
    // Ensure slotted <pura-dock-item> children are upgraded before calling
    // their methods (slotchange can fire before the items upgrade).
    try { customElements.upgrade(this); } catch (_) {}
    const focusable = this._focusable();
    focusable.forEach((el, i) => el._setRoving?.(i === 0));
    // Reset any magnification when the set changes.
    this._reset();
    this._reflectAgentState();
  }

  _reset() {
    for (const el of this._dockItems()) el._setScale?.(1, 0);
  }

  _onLeave() {
    this._reset();
  }

  _onMove(e) {
    if (REDUCED()) return; // motion-free: no proximity scaling
    // Throttle to one computation per frame.
    this._lastX = e.clientX;
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => {
      this._raf = 0;
      this._apply(this._lastX);
    });
  }

  _apply(pointerX) {
    const items = this._dockItems();
    const max = this._magnify;
    const reach = this._reach;
    for (const el of items) {
      if (el.hasAttribute("disabled") || el.hidden) {
        el._setScale?.(1, 0);
        continue;
      }
      const r = el.getBoundingClientRect();
      const center = r.left + r.width / 2;
      const dist = Math.abs(pointerX - center);
      // Cosine falloff: 1 at center, smoothly to 0 at `reach`.
      let f = 0;
      if (dist < reach) f = 0.5 + 0.5 * Math.cos((dist / reach) * Math.PI);
      const scale = 1 + (max - 1) * f;
      const lift = (scale - 1) * 14; // px upward lift, proportional to growth
      el._setScale?.(scale, lift);
    }
  }

  // Deepest active element across shadow boundaries.
  _deepActive() {
    let a = document.activeElement;
    while (a?.shadowRoot?.activeElement) a = a.shadowRoot.activeElement;
    return a;
  }

  _onKeydown(e) {
    const keys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Home", "End"];
    if (!keys.includes(e.key)) return;
    const focusable = this._focusable();
    if (!focusable.length) return;

    const active = this._deepActive();
    // Find which dock-item owns focus (the item itself or its inner control).
    const current = focusable.findIndex(
      (el) => el === active || el.contains(active) || el.shadowRoot?.contains(active)
    );

    let i = current;
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      i = current < 0 ? 0 : (current + 1) % focusable.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      i = current < 0 ? focusable.length - 1 : (current - 1 + focusable.length) % focusable.length;
    else if (e.key === "Home") i = 0;
    else if (e.key === "End") i = focusable.length - 1;

    e.preventDefault();
    focusable.forEach((el, j) => el._setRoving?.(j === i));
    focusable[i].focus();
  }

  _reflectAgentState() {
    this.setAttribute("data-pura-dock", "");
    this.setAttribute("data-pura-dock-items", String(this._dockItems().length));
    this.setAttribute("data-pura-dock-fixed", this.hasAttribute("fixed") ? "true" : "false");
  }
}

const CSS = `
  :host { display: block; --pura-dock-size: 3rem; }
  :host([fixed]) {
    position: fixed; left: 50%; bottom: var(--pura-space-4);
    transform: translateX(-50%); z-index: 50;
  }

  .track {
    display: inline-flex; align-items: flex-end; justify-content: center;
    gap: var(--pura-space-2);
    padding: var(--pura-space-2) var(--pura-space-3);
    /* leave headroom so lifted/scaled items are never clipped */
    padding-top: calc(var(--pura-dock-size) * 0.7);
    margin-top: calc(var(--pura-dock-size) * -0.7);
    background: color-mix(in srgb, var(--pura-bg) 78%, transparent);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-lg);
    box-shadow: var(--pura-shadow-lg);
    backdrop-filter: blur(12px) saturate(1.4);
    -webkit-backdrop-filter: blur(12px) saturate(1.4);
  }

  /* keep slotted dock items anchored to the baseline so they grow upward */
  ::slotted(pura-dock-item) { align-self: flex-end; }
`;

/* ──────────────────────────── pura-dock-item ─────────────────────────── */

class PuraDockItem extends PuraElement {
  static observedAttributes = ["label", "href", "active", "disabled"];

  connectedCallback() {
    this._tipId = `pura-dock-tip-${tipUid++}`;
    this._render();
    this._reflectAgentState();
  }

  attributeChangedCallback(name) {
    if (!this._control) return;
    if (name === "href") {
      // tag changes between <a> and <button>; re-render to keep it correct.
      this._render();
    } else {
      this._syncControl();
    }
    this._reflectAgentState();
  }

  _render() {
    const label = (this.getAttribute("label") || "").replace(/"/g, "&quot;");
    const href = this.getAttribute("href");
    const isLink = href !== null;
    const tag = isLink ? "a" : "button";
    const attrs = isLink
      ? `href="${href.replace(/"/g, "&quot;")}" role="button"`
      : `type="button"`;

    this.render(
      `<${tag} part="item" class="item" ${attrs}
              ${label ? `aria-label="${label}" aria-describedby="${this._tipId}"` : ""}
              tabindex="-1">
         <span part="icon" class="icon"><slot></slot></span>
         <span part="indicator" class="dot" aria-hidden="true"></span>
       </${tag}>
       ${label ? `<div id="${this._tipId}" part="tooltip" class="tip" popover="manual" role="tooltip">${label}</div>` : ""}`,
      ITEM_CSS.replaceAll("ANCHOR", `--${this._tipId}`)
    );

    this._control = this.$(".item");
    this._tip = this.$(".tip");

    this._control.addEventListener("click", (e) => this._activate(e));
    this._control.addEventListener("pointerenter", () => this._showTip());
    this._control.addEventListener("pointerleave", () => this._hideTip());
    this._control.addEventListener("focus", () => this._showTip());
    this._control.addEventListener("blur", () => this._hideTip());
    if (!this.hasAttribute("href")) {
      this._control.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this._activate(e);
        }
      });
    }

    this._syncControl();
  }

  _syncControl() {
    const disabled = this.hasAttribute("disabled");
    if (this._control.tagName === "BUTTON") {
      this._control.disabled = disabled;
    } else {
      this._control.setAttribute("aria-disabled", disabled ? "true" : "false");
      if (disabled) this._control.removeAttribute("href");
      else if (this.hasAttribute("href"))
        this._control.setAttribute("href", this.getAttribute("href"));
    }
    const label = this.getAttribute("label");
    if (label) {
      this._control.setAttribute("aria-label", label);
      if (this._tip) this._tip.textContent = label;
    } else {
      this._control.removeAttribute("aria-label");
    }
  }

  _activate(e) {
    if (this.hasAttribute("disabled")) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    this.dispatchEvent(
      new CustomEvent("dock-item-activate", {
        bubbles: true,
        composed: true,
        detail: { label: this.getAttribute("label") || null },
      })
    );
  }

  _showTip() {
    if (!this._tip || this.hasAttribute("disabled")) return;
    try {
      if (!this._tip.matches(":popover-open")) this._tip.showPopover();
    } catch (_) {
      /* Popover API unsupported → CSS fallback handles visibility */
    }
  }

  _hideTip() {
    if (!this._tip) return;
    try {
      if (this._tip.matches(":popover-open")) this._tip.hidePopover();
    } catch (_) {
      /* no-op */
    }
  }

  // Called by the parent dock to drive magnification (transform only).
  _setScale(scale, lift) {
    this.style.setProperty("--dock-scale", String(scale));
    this.style.setProperty("--dock-lift", `${lift}px`);
  }

  // Called by the parent dock to set roving tabindex.
  _setRoving(tabbable) {
    if (this._control) this._control.tabIndex = tabbable ? 0 : -1;
  }

  focus() {
    this._control?.focus();
  }

  _reflectAgentState() {
    this.setAttribute("data-pura-dock-item", "");
    if (this.getAttribute("label"))
      this.setAttribute("data-pura-dock-item-label", this.getAttribute("label"));
    else this.removeAttribute("data-pura-dock-item-label");
    this.setAttribute("data-pura-dock-item-active", this.hasAttribute("active") ? "true" : "false");
    this.setAttribute("data-pura-dock-item-disabled", this.hasAttribute("disabled") ? "true" : "false");
  }
}

const ITEM_CSS = `
  :host {
    display: inline-block;
    anchor-name: ANCHOR;
    /* magnification state, driven by the parent dock */
    --dock-scale: 1;
    --dock-lift: 0px;
  }

  .item {
    display: grid; place-items: center;
    width: var(--pura-dock-size, 3rem);
    height: var(--pura-dock-size, 3rem);
    padding: 0; margin: 0;
    border: none; background: transparent; color: var(--pura-fg);
    cursor: pointer; font: inherit; position: relative;
    border-radius: var(--pura-radius);
    transform-origin: bottom center;
    transform: translateY(calc(var(--dock-lift) * -1)) scale(var(--dock-scale));
    transition: transform var(--pura-dur) var(--pura-ease),
      background var(--pura-dur) var(--pura-ease);
    will-change: transform;
    -webkit-tap-highlight-color: transparent;
    text-decoration: none;
  }
  .item:hover { background: var(--pura-subtle); }
  .item:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  :host([disabled]) .item {
    opacity: 0.45; cursor: not-allowed;
    transform: none; pointer-events: none;
  }

  .icon {
    display: grid; place-items: center;
    width: 70%; height: 70%;
    font-size: calc(var(--pura-dock-size, 3rem) * 0.55);
    line-height: 1; pointer-events: none;
  }
  /* normalize common slotted icon shapes */
  ::slotted(svg), ::slotted(img) {
    width: 100%; height: 100%; display: block; object-fit: contain;
  }

  /* running/active indicator dot */
  .dot {
    position: absolute; bottom: -0.2rem; left: 50%;
    width: 0.28rem; height: 0.28rem; border-radius: 50%;
    background: var(--pura-fg);
    transform: translateX(-50%) scale(0);
    transition: transform var(--pura-dur) var(--pura-ease);
  }
  :host([active]) .dot { transform: translateX(-50%) scale(1); }

  /* tooltip — native Popover + anchor positioning */
  .tip {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    bottom: anchor(top); left: anchor(center);
    translate: -50% 0; margin-bottom: var(--pura-space-3);
    width: max-content; max-width: 14rem;
    background: var(--pura-fg); color: var(--pura-bg);
    border-radius: var(--pura-radius-sm);
    padding: var(--pura-space-1) var(--pura-space-2);
    font-size: var(--pura-text-xs); font-weight: 550; line-height: 1.3;
    box-shadow: var(--pura-shadow);
    opacity: 0; transform: translateY(4px);
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .tip:popover-open { opacity: 1; transform: none; }

  @supports not (anchor-name: --x) {
    :host { position: relative; }
    .tip {
      position: absolute; bottom: 100%; left: 50%;
      translate: -50% 0; inset: auto;
    }
  }
`;

define("pura-dock", PuraDock);
define("pura-dock-item", PuraDockItem);
export { PuraDock, PuraDockItem };
