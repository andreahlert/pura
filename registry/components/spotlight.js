// <pura-spotlight> — dims the whole page with a modal overlay that has a
// transparent cut-out around a target element, focusing attention on it. The
// overlay is a native <dialog> (showModal → top layer + ESC + focus trap for
// free); the cut-out is a transparent rect whose huge box-shadow dims
// everything around it. The hole is computed from the target's bounding rect
// and re-tracks the target on scroll/resize while shown.
//
// Attributes:
//   target — CSS selector for the element to spotlight (resolved live).
//   radius — corner radius of the cut-out (any CSS length). Defaults to the
//            --pura-radius token.
//   pad    — extra px around the target rect for breathing room (default 6).
//   label  — accessible name for the overlay (default "Spotlight").
//   open   — reflects shown state; present → shown.
// API: show() / hide() / toggle().
// Events (bubbling CustomEvents): spotlight-show {detail:{target}},
//   spotlight-hide. ESC hides (native dialog cancel).
//
// Agent-native: each instance registers in window.__puraSpotlights keyed by id;
//   the dialog carries stable data-pura-spotlight / data-target / data-active
//   attributes plus role=dialog, aria-modal and an accessible label. The cut-out
//   rect is aria-hidden (purely visual).
import { PuraElement, define } from "../base.js";

// Module-level counter for stable, unique ids per instance.
let uid = 0;

// Live global registry so agents / scripts can discover and drive spotlights.
const registry = (window.__puraSpotlights = window.__puraSpotlights || {});

class PuraSpotlight extends PuraElement {
  static observedAttributes = ["open", "target"];

  connectedCallback() {
    this._uid = uid++;
    this._id = this.id || `pura-spotlight-${this._uid}`;
    this._active = false;

    this.render(
      `<dialog part="overlay" role="dialog" aria-modal="true"
               aria-label="${(this.getAttribute("label") || "Spotlight").replace(/"/g, "&quot;")}"
               data-pura-spotlight="${this._id}" data-active="false">
         <div part="spot" class="spot" aria-hidden="true"></div>
       </dialog>`,
      CSS
    );

    this._dlg = this.$("dialog");
    this._spot = this.$(".spot");

    // ESC / dialog dismissal hides the spotlight.
    this._dlg.addEventListener("cancel", (e) => {
      e.preventDefault();
      this.hide();
    });
    this._dlg.addEventListener("close", () => {
      if (this._active) this.hide();
    });

    // Keep the cut-out aligned while the page scrolls / resizes.
    this._reposition = () => this._position();

    registry[this._id] = this;

    if (this.hasAttribute("open")) queueMicrotask(() => this.show());
  }

  disconnectedCallback() {
    this._teardownListeners();
    if (registry[this._id] === this) delete registry[this._id];
    try { if (this._dlg?.open) this._dlg.close(); } catch (_) {}
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._dlg) return; // connectedCallback may not have run yet
    if (name === "open") {
      if (val !== null && !this._active) this.show();
      else if (val === null && this._active) this.hide();
    } else if (name === "target" && this._active) {
      this._position();
    }
  }

  // ---- public API --------------------------------------------------------
  get target() {
    return this.getAttribute("target");
  }
  set target(v) {
    if (v == null) this.removeAttribute("target");
    else this.setAttribute("target", v);
  }

  show() {
    if (this._active) return;
    this._active = true;
    if (!this.hasAttribute("open")) this.setAttribute("open", "");
    this._dlg.dataset.active = "true";
    const sel = this.getAttribute("target") || "";
    this._dlg.dataset.target = sel;
    try { if (!this._dlg.open) this._dlg.showModal(); } catch (_) {}
    window.addEventListener("scroll", this._reposition, true);
    window.addEventListener("resize", this._reposition);
    this._position();
    this.dispatchEvent(
      new CustomEvent("spotlight-show", {
        bubbles: true,
        detail: { target: this._resolve() },
      })
    );
  }

  hide() {
    if (!this._active) return;
    this._active = false;
    this._teardownListeners();
    this._dlg.dataset.active = "false";
    this.removeAttribute("open");
    try { if (this._dlg.open) this._dlg.close(); } catch (_) {}
    this.dispatchEvent(new CustomEvent("spotlight-hide", { bubbles: true }));
  }

  toggle() {
    this._active ? this.hide() : this.show();
  }

  // ---- internals ---------------------------------------------------------
  _teardownListeners() {
    window.removeEventListener("scroll", this._reposition, true);
    window.removeEventListener("resize", this._reposition);
  }

  // Resolve the live target element from the selector, or null.
  _resolve() {
    const sel = this.getAttribute("target");
    if (!sel) return null;
    try { return document.querySelector(sel); } catch (_) { return null; }
  }

  // Position the cut-out over the target. With no/disconnected target, hide the
  // hole (the overlay just dims the page uniformly).
  _position() {
    const pad = parseFloat(this.getAttribute("pad"));
    const p = Number.isNaN(pad) ? 6 : pad;
    const el = this._resolve();
    if (el && el.isConnected) {
      const r = el.getBoundingClientRect();
      const top = Math.max(r.top - p, 0);
      const left = Math.max(r.left - p, 0);
      const w = Math.min(r.width + p * 2, window.innerWidth - left);
      const h = Math.min(r.height + p * 2, window.innerHeight - top);
      this._spot.style.display = "block";
      this._spot.style.top = `${top}px`;
      this._spot.style.left = `${left}px`;
      this._spot.style.width = `${Math.max(w, 0)}px`;
      this._spot.style.height = `${Math.max(h, 0)}px`;
      const radius = this.getAttribute("radius");
      this._spot.style.borderRadius = radius || "var(--pura-radius)";
    } else {
      this._spot.style.display = "none";
    }
  }
}

const CSS = `
  :host { display: contents; }

  dialog[part="overlay"] {
    border: none; background: transparent; padding: 0; margin: 0;
    max-width: 100vw; max-height: 100dvh; width: 100vw; height: 100dvh;
    inset: 0; overflow: visible; color: var(--pura-fg);
  }
  dialog[part="overlay"]::backdrop { background: transparent; }

  /* Cut-out: a transparent rect whose huge box-shadow dims everything else. */
  .spot {
    position: fixed; display: none; pointer-events: none;
    border-radius: var(--pura-radius);
    box-shadow: 0 0 0 9999px rgb(0 0 0 / 0.55);
    outline: 2px solid var(--pura-accent);
    outline-offset: 2px;
    transition: top var(--pura-dur) var(--pura-ease),
      left var(--pura-dur) var(--pura-ease),
      width var(--pura-dur) var(--pura-ease),
      height var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
`;

define("pura-spotlight", PuraSpotlight);
export { PuraSpotlight };
