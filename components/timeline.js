// <pura-timeline> — vertical timeline. A connector line runs through the dots
// of its items. Container only; place <pura-timeline-item> elements inside it
// (default slot).
//   Parts: list
//   ARIA: role="list" with an accessible label via `label` attribute.
//   Attributes: label (accessible name for the list).
//   Agent layer: gets a stable data-pura-timeline id; registers a live,
//     machine-readable snapshot in window.__puraTimelines keyed by that id.
//
// <pura-timeline-item> — one node on the timeline.
//   Slots: time (timestamp/eyebrow), title (heading), default = body content.
//   Parts: item, marker, dot, content, time, title, body
//   Attributes: variant (neutral default | primary | success | warning |
//     danger | info) — sets the dot color.
//   ARIA: role="listitem". The dot is decorative (aria-hidden).
//   Agent layer: stable data-pura-timeline-item id + data-variant; its text
//     content is reflected into the parent timeline's registry snapshot.
import { PuraElement, define } from "../base.js";

let uid = 0;

// Global, machine-readable registry of every mounted timeline. Agents can read
// window.__puraTimelines[id] to get { label, items: [{ time, title, body,
// variant }] } without scraping the DOM. Created lazily, never overwritten.
function registry() {
  if (!window.__puraTimelines) {
    Object.defineProperty(window, "__puraTimelines", {
      value: {},
      writable: false,
      configurable: true,
      enumerable: false,
    });
  }
  return window.__puraTimelines;
}

class PuraTimeline extends PuraElement {
  static observedAttributes = ["label"];

  connectedCallback() {
    this._id = this.getAttribute("data-pura-timeline") || `pura-timeline-${++uid}`;
    this.setAttribute("data-pura-timeline", this._id);

    if (!this.hasAttribute("role")) this.setAttribute("role", "list");
    this._syncLabel();

    this.render(
      `<div part="list" class="list"><slot></slot></div>`,
      CSS
    );

    this._slot = this.$("slot");
    this._slot.addEventListener("slotchange", () => this._sync());
    this._sync();
  }

  disconnectedCallback() {
    delete registry()[this._id];
  }

  attributeChangedCallback(name) {
    if (name === "label") this._syncLabel();
  }

  _syncLabel() {
    const label = this.getAttribute("label");
    if (label) this.setAttribute("aria-label", label);
    else this.removeAttribute("aria-label");
    if (this._id) {
      const entry = registry()[this._id];
      if (entry) entry.label = label || null;
    }
  }

  _items() {
    return this._slot
      ? this._slot
          .assignedElements()
          .filter((el) => el.tagName === "PURA-TIMELINE-ITEM")
      : [];
  }

  // Rebuild this timeline's registry snapshot. Called on slotchange and when an
  // item announces it changed.
  _sync() {
    const items = this._items();
    registry()[this._id] = {
      label: this.getAttribute("label") || null,
      get items() {
        return items.map((el) => el.snapshot());
      },
    };
  }
}

class PuraTimelineItem extends PuraElement {
  static observedAttributes = ["variant"];

  connectedCallback() {
    this._id =
      this.getAttribute("data-pura-timeline-item") ||
      `pura-timeline-item-${++uid}`;
    this.setAttribute("data-pura-timeline-item", this._id);

    if (!this.hasAttribute("role")) this.setAttribute("role", "listitem");
    this._reflectVariant();

    this.render(
      `<div part="item" class="item">
         <div part="marker" class="marker" aria-hidden="true">
           <span part="dot" class="dot"></span>
           <span class="line"></span>
         </div>
         <div part="content" class="content">
           <div part="time" class="time"><slot name="time"></slot></div>
           <div part="title" class="title"><slot name="title"></slot></div>
           <div part="body" class="body"><slot></slot></div>
         </div>
       </div>`,
      ITEM_CSS
    );

    // Hide the time/title rows when their slots are empty so spacing collapses.
    for (const name of ["time", "title"]) {
      const slot = this.$(`slot[name="${name}"]`);
      const host = slot.closest(`[part="${name}"]`);
      const upd = () => {
        host.style.display = slot.assignedNodes().length ? "" : "none";
        this._notify();
      };
      slot.addEventListener("slotchange", upd);
      upd();
    }
    const body = this.$("[part='body'] slot");
    body.addEventListener("slotchange", () => this._notify());
  }

  attributeChangedCallback(name) {
    if (name === "variant") {
      this._reflectVariant();
      this._notify();
    }
  }

  _reflectVariant() {
    this.setAttribute("data-variant", this.getAttribute("variant") || "neutral");
  }

  // Tell the parent timeline to refresh its registry snapshot.
  _notify() {
    const tl = this.closest("pura-timeline");
    if (tl && typeof tl._sync === "function") tl._sync();
  }

  // Machine-readable view of this item, used by the timeline registry.
  snapshot() {
    const txt = (sel) => {
      const slot = this.shadowRoot && this.shadowRoot.querySelector(sel);
      if (!slot) return null;
      const text = slot
        .assignedNodes()
        .map((n) => (n.textContent || "").trim())
        .join(" ")
        .trim();
      return text || null;
    };
    return {
      id: this._id,
      variant: this.getAttribute("variant") || "neutral",
      time: txt('slot[name="time"]'),
      title: txt('slot[name="title"]'),
      body: txt('[part="body"] slot'),
    };
  }
}

const CSS = `
  :host { display: block; }
  .list { display: block; }
`;

const ITEM_CSS = `
  :host { display: block; }

  .item {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: var(--pura-space-4);
  }

  /* marker column: the dot sits at the top, the connector line fills the rest */
  .marker {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 0.75rem;
  }
  .dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: var(--pura-radius-full);
    background: var(--pura-bg);
    border: 2px solid var(--pura-border-strong);
    box-shadow: var(--pura-shadow-sm);
    flex: none;
    margin-top: 0.2rem;
    z-index: 1;
  }
  .line {
    flex: 1 1 auto;
    width: 2px;
    background: var(--pura-border);
    margin-top: var(--pura-space-1);
  }
  /* the last item has no trailing connector */
  :host(:last-of-type) .line { display: none; }

  .content {
    padding-bottom: var(--pura-space-5);
    min-width: 0;
  }
  :host(:last-of-type) .content { padding-bottom: 0; }

  [part="time"] {
    font-size: var(--pura-text-xs);
    color: var(--pura-muted);
    line-height: 1.4;
  }
  [part="title"] {
    font-size: var(--pura-text-sm);
    font-weight: 600;
    color: var(--pura-fg);
    line-height: 1.4;
    margin-top: 0.1rem;
  }
  [part="body"] {
    font-size: var(--pura-text-sm);
    color: var(--pura-muted-fg);
    line-height: 1.6;
    margin-top: var(--pura-space-1);
  }

  /* dot variants — color/border driven entirely by tokens */
  :host([variant="primary"]) .dot { background: var(--pura-primary); border-color: var(--pura-primary); }
  :host([variant="success"]) .dot { background: var(--pura-success); border-color: var(--pura-success); }
  :host([variant="warning"]) .dot { background: var(--pura-warning); border-color: var(--pura-warning); }
  :host([variant="danger"])  .dot { background: var(--pura-danger);  border-color: var(--pura-danger); }
  :host([variant="info"])    .dot { background: var(--pura-info);    border-color: var(--pura-info); }
`;

define("pura-timeline", PuraTimeline);
define("pura-timeline-item", PuraTimelineItem);
export { PuraTimeline, PuraTimelineItem };
