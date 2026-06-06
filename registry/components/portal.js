// <pura-portal> — AGENT-NATIVE. Teleports its slotted content to another
// location in the DOM (default <body>) while keeping logical ownership, then
// restores the content to its original position on disconnect. Useful for
// overlays/menus that must escape an ancestor's clipping (overflow), transform,
// filter or z-index stacking context.
//
// It is a teleporter, NOT a floating/modal primitive: it does not open a popover
// or a <dialog>. It physically moves child nodes into a mount element appended
// to the target, and moves them back when removed from the DOM. Components that
// actually need a top layer (popover/sheet) already handle that themselves.
//
// Slots: default slot = the content to teleport (moved out of the shadow's slot;
//   the nodes live in the target, the portal keeps a logical link to them).
// Attributes:
//   to        — destination. "body" keyword (default) → document.body; otherwise
//               a CSS selector resolved with document.querySelector. If it
//               matches nothing the content is left in place (graceful degrade).
//   disabled  — when present, the portal does NOT teleport: content stays inline.
//
// Machine-readable layer:
//   - stable data-* on the host: data-pura-portal, data-portal-id, data-to,
//     data-active ("true"|"false").
//   - the mount element placed in the target carries data-pura-portal-mount and
//     data-portal-owner (the portal id) so an agent can trace teleported content
//     back to its logical owner across the DOM.
//   - a shadow part="placeholder" marker stays at the logical position.
//   - global window.__puraPortals registry: a live Map keyed by portal id with
//     { id, host, mount, target, to, active } entries, plus query(selector) and
//     forTarget(node) helpers so agents can enumerate every active portal.
//
// Events: `pura-portal:mount` (bubbles, detail { id, target }) when content is
//   teleported; `pura-portal:unmount` (bubbles, detail { id }) when restored.
// API: .reparent() re-resolves `to` and moves the mount; .target getter.
import { PuraElement, define } from "../base.js";
import meta from "./portal.meta.js";

// Module-level counter for stable, unique ids per instance.
let uid = 0;

// Live global registry so agents can enumerate every portal on the page.
function registry() {
  if (!window.__puraPortals) {
    const map = new Map();
    // All active portals whose target matches a selector.
    map.query = (selector) =>
      [...map.values()].filter(
        (p) => p.active && p.target && p.target.matches?.(selector)
      );
    // All active portals teleporting into a given node.
    map.forTarget = (node) =>
      [...map.values()].filter((p) => p.active && p.target === node);
    window.__puraPortals = map;
  }
  return window.__puraPortals;
}

class PuraPortal extends PuraElement {
  static observedAttributes = ["to", "disabled"];

  connectedCallback() {
    if (!this._portalId) this._portalId = this.id || `pura-portal-${uid++}`;

    // First connect: build the shadow placeholder + mount. Subsequent connects
    // (e.g. the host itself was re-parented) must NOT re-snapshot children —
    // they already live in the mount — so just re-resolve + re-attach.
    if (!this._mount) {
      this.render(
        `<slot></slot><span part="placeholder" aria-hidden="true" hidden></span>`,
        CSS
      );
      this._slot = this.$("slot");

      // The mount is a plain div that lives in the target (light DOM). It is the
      // honest cross-boundary handle: part= can't reach outside the shadow, so
      // the mount is tagged with data-* instead.
      this._mount = document.createElement("div");
      this._mount.setAttribute("data-pura-portal-mount", "");
      this._mount.setAttribute("data-portal-owner", this._portalId);
      this._mount.style.display = "contents";

      // Move newly-added children into the mount as they appear (handles
      // parser-timed children and later DOM mutations). Moving a node OUT of the
      // host produces a "removed" record, not "added", so this does not loop.
      this._observer = new MutationObserver((records) => {
        if (!this._active) return;
        for (const r of records) {
          for (const node of r.addedNodes) this._mount.appendChild(node);
        }
      });
    }

    this._active = false;
    this._sync();

    // Observe after the initial sweep so we only react to genuinely new nodes.
    if (this._active && this._observer) {
      this._observer.observe(this, { childList: true });
    }
  }

  disconnectedCallback() {
    this._observer?.disconnect();
    this._restore();
    registry().delete(this._portalId);
  }

  attributeChangedCallback() {
    // connectedCallback may not have run yet; guard on the built mount.
    if (this._mount) {
      this._observer?.disconnect();
      this._sync();
      if (this._active && this._observer) {
        this._observer.observe(this, { childList: true });
      }
    }
  }

  // Resolved destination node (or null when teleport is off / unresolved).
  get target() {
    return this._active ? this._target || null : null;
  }

  // Re-resolve `to` and move the mount to the (possibly new) target.
  reparent() {
    this._observer?.disconnect();
    this._sync();
    if (this._active && this._observer) {
      this._observer.observe(this, { childList: true });
    }
  }

  // Resolve the `to` attribute to a destination node.
  _resolveTarget() {
    const to = (this.getAttribute("to") || "body").trim();
    if (to === "body" || to === "") return document.body;
    let node = null;
    try {
      node = document.querySelector(to);
    } catch (_) {
      node = null; // invalid selector → degrade gracefully
    }
    return node;
  }

  _sync() {
    // Always refresh the machine-readable host attributes.
    this.setAttribute("data-pura-portal", "");
    this.setAttribute("data-portal-id", this._portalId);
    this.setAttribute("data-to", this.getAttribute("to") || "body");

    const off = this.hasAttribute("disabled");
    const target = off ? null : this._resolveTarget();

    // No (valid) target, or disabled → keep content inline, restore if needed.
    if (!target) {
      this._restore();
      this._active = false;
      this._target = null;
      this.setAttribute("data-active", "false");
      this._publish();
      return;
    }

    const wasActive = this._active;
    const changedTarget = this._target && this._target !== target;

    // Sweep current children into the mount (initial teleport or new nodes that
    // arrived while inactive). Reverse moves nothing on re-activation since the
    // nodes already live in the mount.
    while (this.firstChild) this._mount.appendChild(this.firstChild);

    // Place / move the mount into the resolved target.
    if (this._mount.parentNode !== target) target.appendChild(this._mount);

    this._active = true;
    this._target = target;
    this.setAttribute("data-active", "true");
    this._publish();

    if (!wasActive || changedTarget) {
      this.dispatchEvent(
        new CustomEvent("pura-portal:mount", {
          bubbles: true,
          detail: { id: this._portalId, target },
        })
      );
    }
  }

  // Move teleported nodes back inside the host and detach the mount.
  _restore() {
    if (!this._mount) return;
    const wasActive = this._active;
    while (this._mount.firstChild) this.appendChild(this._mount.firstChild);
    if (this._mount.parentNode) this._mount.parentNode.removeChild(this._mount);
    this._active = false;
    if (wasActive) {
      this.dispatchEvent(
        new CustomEvent("pura-portal:unmount", {
          bubbles: true,
          detail: { id: this._portalId },
        })
      );
    }
  }

  // Publish a live entry to the global registry.
  _publish() {
    registry().set(this._portalId, {
      id: this._portalId,
      host: this,
      mount: this._mount || null,
      target: this._active ? this._target : null,
      to: this.getAttribute("to") || "body",
      active: !!this._active,
    });
  }
}

const CSS = `
  /* The portal host is a logical anchor only; it has no visual footprint. Its
     teleported content lives in the target (light DOM) where tokens still
     inherit, so this shadow CSS intentionally styles nothing but the host. */
  :host { display: contents; }
  [part="placeholder"] { display: none; }
`;

define("pura-portal", PuraPortal, meta);
export { PuraPortal };
