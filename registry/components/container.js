// <pura-container> — AGENT-NATIVE size-aware wrapper. Observes its OWN width
// (ResizeObserver) and reflects a breakpoint as data-size (xs|sm|md|lg) so
// slotted content can adapt by CONTAINER size rather than viewport size — a
// container-query helper that works even where CSS @container is unavailable.
//
// Slots: default slot = the contained content.
// Attributes:
//   breakpoints — optional custom thresholds (min-width, px) as a comma list
//                 "sm:480, md:768, lg:1024". Anything below the smallest is xs.
//                 Defaults to sm:384, md:640, lg:896.
//   center      — boolean; horizontally centers the inner box (margin auto).
//   max         — optional max-width for the inner box (any CSS length, e.g.
//                 "72rem"); when omitted the container is fluid (100%).
//   pad         — boolean; applies symmetric inline padding that scales with
//                 the current breakpoint.
//   label       — optional aria-label exposed on the host region.
//
// Reflected (read-only, machine-readable) attributes:
//   data-pura-container, data-size (xs|sm|md|lg), data-width (rounded px).
//
// Machine-readable layer:
//   - global window.__puraContainers registry: a live Map keyed by container id
//     with { id, size, width, el } entries plus a query(size) helper. Agents can
//     read window.__puraContainers to enumerate every container + its size.
//   - role="group" + aria-label/aria-roledescription so AT/agents see the box.
//
// Events: `pura-container:resize` (bubbles) when the breakpoint changes, with
//   detail { id, size, prev, width }.
//
// CSS hooks for consumers (via ::part or descendant rules keyed on data-size):
//   exposes --pura-container-width as the live measured width on the host.
import { PuraElement, define } from "../base.js";
import meta from "./container.meta.js";
import { containerTemplate } from "./container.template.js";

// Module-level counter for stable, unique ids per instance.
let uid = 0;

const ORDER = ["xs", "sm", "md", "lg"];
const DEFAULT_BREAKPOINTS = [
  { size: "sm", min: 384 },
  { size: "md", min: 640 },
  { size: "lg", min: 896 },
];

// Live global registry so agents can enumerate every container on the page.
function registry() {
  if (!window.__puraContainers) {
    const map = new Map();
    // Convenience: all containers currently at a given size.
    map.query = (size) => [...map.values()].filter((c) => c.size === size);
    window.__puraContainers = map;
  }
  return window.__puraContainers;
}

class PuraContainer extends PuraElement {
  static observedAttributes = ["breakpoints", "max", "label", "center", "pad"];

  connectedCallback() {
    this._cid = this.id || `pura-container-${uid++}`;
    this._size = null;
    this._width = 0;

    const { html, css } = containerTemplate(this);
    this.render(html, css);
    this._box = this.$("[part='box']");

    // Stable host attributes for agents / consumer CSS.
    this.setAttribute("data-pura-container", "");
    this.setAttribute("role", "group");
    this.setAttribute("aria-roledescription", "size-aware container");
    this._syncLabel();
    this._applyMax();

    // Observe our OWN width. Degrade gracefully where ResizeObserver is absent.
    if (typeof ResizeObserver === "function") {
      this._ro = new ResizeObserver((entries) => {
        const e = entries[entries.length - 1];
        if (e) this._measure(e.contentRect.width);
      });
      this._ro.observe(this);
    } else if (typeof window !== "undefined") {
      // Fallback: measure on window resize (coarse, but never throws).
      this._onWin = () => this._measure(this.clientWidth);
      window.addEventListener("resize", this._onWin, { passive: true });
    }

    // Initial measurement (clientWidth may be 0 before layout; that maps to xs).
    this._measure(this.clientWidth);
  }

  disconnectedCallback() {
    if (this._ro) {
      this._ro.disconnect();
      this._ro = null;
    }
    if (this._onWin) {
      window.removeEventListener("resize", this._onWin);
      this._onWin = null;
    }
    registry().delete(this._cid);
  }

  attributeChangedCallback(name) {
    if (!this._box) return; // connectedCallback hasn't run yet
    if (name === "label") this._syncLabel();
    else if (name === "max") this._applyMax();
    else if (name === "breakpoints") this._measure(this._width); // re-bucket
  }

  // Current breakpoint name (read-only).
  get size() {
    return this._size;
  }

  // Parse the breakpoints attribute into an ascending [{ size, min }] list.
  // Falls back to defaults on any malformed input (never throws).
  _breakpoints() {
    const raw = (this.getAttribute("breakpoints") || "").trim();
    if (!raw) return DEFAULT_BREAKPOINTS;
    const out = [];
    for (const part of raw.split(",")) {
      const m = part.trim().match(/^(xs|sm|md|lg)\s*[:=]\s*(\d*\.?\d+)$/i);
      if (!m) continue;
      const size = m[1].toLowerCase();
      const min = parseFloat(m[2]);
      if (size === "xs" || !(min >= 0)) continue; // xs is the implicit floor
      out.push({ size, min });
    }
    if (!out.length) return DEFAULT_BREAKPOINTS;
    out.sort((a, b) => a.min - b.min);
    return out;
  }

  // Map a width (px) to the largest breakpoint whose min it meets; else "xs".
  _bucket(width) {
    let size = "xs";
    for (const bp of this._breakpoints()) {
      if (width >= bp.min) size = bp.size;
    }
    return size;
  }

  _measure(width) {
    const w = Math.round(Number.isFinite(width) ? width : 0);
    this._width = w;
    const size = this._bucket(w);

    // Always reflect the live measured width (cheap, useful for agents/CSS).
    this.setAttribute("data-width", String(w));
    this.style.setProperty("--pura-container-width", `${w}px`);

    const prev = this._size;
    // Publish to registry on every measure so reads are always current.
    registry().set(this._cid, { id: this._cid, size, width: w, el: this });

    if (size === prev) return; // breakpoint unchanged — no attr churn / events
    this._size = size;
    this.setAttribute("data-size", size);

    this.dispatchEvent(
      new CustomEvent("pura-container:resize", {
        bubbles: true,
        detail: { id: this._cid, size, prev, width: w },
      })
    );
  }

  _syncLabel() {
    const label = this.getAttribute("label");
    if (label) this.setAttribute("aria-label", label);
    else this.removeAttribute("aria-label");
  }

  _applyMax() {
    const max = (this.getAttribute("max") || "").trim();
    // Guard against CSS injection: only allow length-ish tokens.
    if (max && /^[\d.]+(px|rem|em|vw|ch|%)$|^none$/i.test(max)) {
      this._box.style.maxWidth = max;
    } else {
      this._box.style.removeProperty("max-width");
    }
  }
}


define("pura-container", PuraContainer, meta);
export { PuraContainer };
