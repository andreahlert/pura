// <pura-live-region> — AGENT-NATIVE managed ARIA live announcer. A polite (or
// assertive) live region that screen readers and autonomous agents observe for
// dynamic, out-of-band status updates. Visually minimal: hidden by default
// (sr-only), opt-in visible for authoring / debugging.
//
// The "managed" part is the announce technique: setting the same text twice, or
// twice within one frame, would not be seen as a change by AT and would be
// skipped. .announce() clears the region then writes the new text on a later
// tick so every call is reliably announced.
//
// Attributes:
//   live    — politeness: polite (default) | assertive. Reflected to aria-live.
//   visible — opt-in escape hatch: render the announced text visibly.
//   label   — optional aria-label for the region.
//
// Slots: default — optional initial/static content (also announced on connect).
//
// Properties / methods:
//   .announce(message)  — announce a string (managed clear-then-set). Returns it.
//   .message            — last announced message (get).
//   .clear()            — empty the region.
//
// Machine-readable layer (the point of the component):
//   - ARIA on the HOST (light DOM, where crawlers + AT reliably see it):
//     role=status, aria-live=<live>, aria-atomic=true, optional aria-label.
//   - stable data-* attributes: data-pura-live-region, data-live-id, data-live
//     (mirrors politeness).
//   - global window.__puraLiveRegions registry: a live Map keyed by region id,
//     with { id, live, message, history, el } entries plus a query(id) helper
//     and a latest() helper. Agents can read the last announcement without a
//     screen reader.
//
// Events: `pura-live-region:announce` (bubbles) on every announcement, with
//   detail { id, message, live }.
import { PuraElement, define } from "../base.js";
import meta from "./live-region.meta.js";
import { liveRegionTemplate } from "./live-region.template.js";

// Module-level counter for stable, unique ids per instance.
let uid = 0;

// Maximum announcements retained per region for agent inspection.
const HISTORY_MAX = 20;

const POLITENESS = new Set(["polite", "assertive"]);

// Live global registry so agents can enumerate every live region on the page
// and read the latest announcement of each without assistive tech.
function registry() {
  if (!window.__puraLiveRegions) {
    const map = new Map();
    // Convenience: the entry for a given region id (or undefined).
    map.query = (id) => map.get(id);
    // Convenience: the most recently announced entry across all regions.
    map.latest = () => {
      let best = null;
      for (const e of map.values()) {
        if (!best || (e._at || 0) > (best._at || 0)) best = e;
      }
      return best;
    };
    window.__puraLiveRegions = map;
  }
  return window.__puraLiveRegions;
}

class PuraLiveRegion extends PuraElement {
  static observedAttributes = ["live", "visible", "label"];

  connectedCallback() {
    if (this._regionId == null) this._regionId = this.id || `pura-live-region-${uid++}`;
    this._history = this._history || [];
    this._message = this._message || "";

    // Two zones: a <slot> for any static/initial content the author provides,
    // and a dedicated [part="output"] node that .announce() mutates — so
    // announcing never destroys the projected slot content.
    const { html, css } = liveRegionTemplate(this);
    this.render(html, css);

    this._region = this.$("[part='region']");
    this._output = this.$("[part='output']");
    this._slot = this.$("slot");

    // Reflect the host ARIA + machine-readable layer.
    this._reflect();

    // Seed the tracked message from any slotted (static) content at connect, but
    // do NOT synthesize an announce event for content already present on load
    // (AT does not announce load-time content either).
    const slotted = (this.textContent || "").replace(/\s+/g, " ").trim();
    if (slotted && !this._message) {
      this._message = slotted;
      this._lastAt = this._lastAt || Date.now();
    }
    this._register();

    // Later slot changes are genuine updates: record + announce them.
    this._slot.addEventListener("slotchange", () => {
      const text = (this.textContent || "").replace(/\s+/g, " ").trim();
      if (text && text !== this._message) {
        this._message = text;
        this._record(text);
      }
    });
  }

  disconnectedCallback() {
    if (this._timer) { clearTimeout(this._timer); this._timer = null; }
    const reg = window.__puraLiveRegions;
    if (reg) reg.delete(this._regionId);
  }

  attributeChangedCallback() {
    // attributeChangedCallback can fire before connectedCallback; guard on the
    // rendered region (degrade gracefully when used with no attributes).
    if (this._region) this._reflect();
  }

  // --- public API ------------------------------------------------------------

  // The most recently announced message.
  get message() {
    return this._message || "";
  }

  // Politeness level (polite | assertive).
  get live() {
    const l = (this.getAttribute("live") || "polite").toLowerCase();
    return POLITENESS.has(l) ? l : "polite";
  }
  set live(v) {
    const l = String(v || "").toLowerCase();
    this.setAttribute("live", POLITENESS.has(l) ? l : "polite");
  }

  // Managed announce. The machine-readable layer (registry + event) updates
  // SYNCHRONOUSLY so agents and listeners see the latest message instantly, in
  // any tab state. Only the visual/AT textContent write is deferred: we clear
  // the output then re-set it after a short delay so AT perceives a change even
  // on identical, repeated messages. Returns the message string.
  announce(message) {
    const text = message == null ? "" : String(message);
    this._message = text;

    // Machine-readable layer first — never gated behind a timer.
    this._record(text);

    // The region may not be rendered yet (announce before connect): the slot
    // will pick up nothing, but connectedCallback + registry already reflect it.
    if (!this._output) return text;

    // Clear first so an identical / repeated message still registers as a change
    // for assistive tech, then write after a beat (~100ms, the de-facto value
    // used by managed live regions). setTimeout runs in background tabs.
    this._output.textContent = "";
    if (this._timer) { clearTimeout(this._timer); this._timer = null; }
    this._timer = setTimeout(() => {
      this._timer = null;
      if (this._output) this._output.textContent = text;
    }, 100);
    return text;
  }

  // Empty the region (and clear the tracked message).
  clear() {
    this._message = "";
    if (this._timer) { clearTimeout(this._timer); this._timer = null; }
    if (this._output) this._output.textContent = "";
    this._updateEntry("");
  }

  // --- machine-readable layer ------------------------------------------------

  // Reflect politeness + identity onto the HOST so agents and AT see them via
  // light-DOM queries ([data-pura-live-region]) and the accessibility tree.
  _reflect() {
    const live = this.live;

    // Keep role=status literally per spec, even for assertive politeness.
    this.setAttribute("role", "status");
    this.setAttribute("aria-live", live);
    this.setAttribute("aria-atomic", "true");

    const label = this.getAttribute("label");
    if (label) this.setAttribute("aria-label", label);
    else this.removeAttribute("aria-label");

    // Stable machine-readable attributes on the host (light DOM).
    this.setAttribute("data-pura-live-region", "");
    this.setAttribute("data-live-id", this._regionId);
    this.setAttribute("data-live", live);

    // Keep the registry entry's politeness in sync.
    this._updateEntry(this._message, { reflectOnly: true });
  }

  _register() {
    registry().set(this._regionId, {
      id: this._regionId,
      live: this.live,
      message: this._message || "",
      history: this._history.slice(),
      el: this,
      _at: this._lastAt || 0,
    });
  }

  // Append a message to history + the registry, then emit the announce event.
  _record(text) {
    this._lastAt = Date.now();
    this._history.push({ message: text, at: this._lastAt });
    if (this._history.length > HISTORY_MAX) this._history.shift();
    this._updateEntry(text);
    this.dispatchEvent(
      new CustomEvent("pura-live-region:announce", {
        bubbles: true,
        detail: { id: this._regionId, message: text, live: this.live },
      })
    );
  }

  // Sync the live registry entry without re-announcing.
  _updateEntry(text, opts = {}) {
    if (this._regionId == null) return;
    const reg = registry();
    let entry = reg.get(this._regionId);
    if (!entry) {
      entry = { id: this._regionId, el: this, history: [], _at: 0 };
      reg.set(this._regionId, entry);
    }
    entry.live = this.live;
    if (!opts.reflectOnly) {
      entry.message = text == null ? "" : String(text);
      entry.history = this._history.slice();
      entry._at = this._lastAt || entry._at || 0;
    }
  }

  // Snapshot (array) of all connected live regions.
  static registry() {
    return [...(window.__puraLiveRegions || new Map()).values()];
  }
}


// ---------------------------------------------------------------------------
// imperative API
// ---------------------------------------------------------------------------
let _defaultRegion = null;

// Find or auto-create the default live region appended to <body>.
function ensureLiveRegion(live = "polite") {
  if (_defaultRegion && _defaultRegion.isConnected) return _defaultRegion;
  _defaultRegion = document.querySelector("pura-live-region[data-pura-default]");
  if (!_defaultRegion) {
    _defaultRegion = document.createElement("pura-live-region");
    _defaultRegion.setAttribute("data-pura-default", "");
    _defaultRegion.setAttribute("live", POLITENESS.has(live) ? live : "polite");
    document.body.appendChild(_defaultRegion);
  }
  return _defaultRegion;
}

// announce(message, { live }) — announce via the default page live region.
// Returns the message string.
function announce(message, opts = {}) {
  const region = ensureLiveRegion(opts.live || "polite");
  if (opts.live && POLITENESS.has(opts.live)) region.setAttribute("live", opts.live);
  return region.announce(message);
}

announce.polite = (message) => announce(message, { live: "polite" });
announce.assertive = (message) => announce(message, { live: "assertive" });

define("pura-live-region", PuraLiveRegion, meta);

export { PuraLiveRegion, announce };
export default announce;
