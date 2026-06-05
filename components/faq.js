// <pura-faq> — FAQ accordion list. Wraps <pura-faq-item> children, each built on
// native <details>/<summary> for free a11y + keyboard. Single-open by default
// (opening one item closes the others); set `multi` to allow several open at once.
// Attributes (pura-faq):
//   multi  — allow multiple items open simultaneously (default: single-open)
//   label  — accessible name for the FAQ region (default: "Frequently asked questions")
// Slots (pura-faq): default = the <pura-faq-item> children.
//
// <pura-faq-item> — one question/answer pair.
// Attributes (pura-faq-item):
//   open   — reflected; whether the answer is expanded
// Slots (pura-faq-item):
//   question — the question text (rendered in the clickable summary)
//   (default) — the answer body
// Events (pura-faq-item): "open"/"close" (bubbling) on toggle.
//
// Agent-native: role="region"/"list" + per-item ARIA, stable data-* attributes
// (data-pura, data-total, data-open, data-open-index), and a window.__puraFaqs
// registry keyed by instance id. Each entry exposes a machine-readable snapshot
// of every item's question text and open state.
import { PuraElement, define } from "../base.js";

let uid = 0;

// Global machine-readable registry of every live <pura-faq> instance.
const REGISTRY = (window.__puraFaqs ||= new Map());

class PuraFaqItem extends PuraElement {
  static observedAttributes = ["open"];

  connectedCallback() {
    this.render(
      `<details part="item" ${this.hasAttribute("open") ? "open" : ""}>
         <summary part="trigger">
           <span class="q" part="question"><slot name="question"></slot></span>
           <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
         </summary>
         <div part="content"><div class="answer" part="answer"><slot></slot></div></div>
       </details>`,
      ITEM_CSS
    );
    this._d = this.$("details");
    this._onToggle = () => {
      // keep the reflected attribute in sync without re-triggering work
      this._syncing = true;
      this.toggleAttribute("open", this._d.open);
      this._syncing = false;
      this.dispatchEvent(
        new CustomEvent(this._d.open ? "open" : "close", { bubbles: true })
      );
    };
    this._d.addEventListener("toggle", this._onToggle);
    this.dataset.pura = "faq-item";
  }

  attributeChangedCallback(name, oldV, newV) {
    if (name === "open" && this._d && !this._syncing) {
      this._d.open = newV !== null;
    }
  }

  // Plain-text question for machine-readable snapshots; tolerant of empty slots.
  questionText() {
    const slot = this.$('slot[name="question"]');
    if (!slot) return "";
    const text = slot
      .assignedNodes({ flatten: true })
      .map((n) => n.textContent || "")
      .join("")
      .trim();
    return text;
  }

  get open() { return !!this._d?.open; }
  set open(v) { if (this._d) this._d.open = !!v; }
}

class PuraFaq extends PuraElement {
  static observedAttributes = ["multi", "label"];

  connectedCallback() {
    if (!this._id) {
      this._n = uid++;
      this._id = `pura-faq-${this._n}`;
    }
    const label = this.getAttribute("label") || "Frequently asked questions";

    this.render(
      `<div part="list" role="region" aria-label="${esc(label)}" data-pura="faq"><slot></slot></div>`,
      LIST_CSS
    );

    this._list = this.$('[part="list"]');
    this._slot = this.$("slot");

    REGISTRY.set(this._id, this);

    // Single-open coordination across shadow boundaries: native <details name>
    // can't group items in separate shadow roots, so we close siblings in JS.
    this._onOpen = (e) => {
      if (!this.hasAttribute("multi")) {
        for (const it of this._items()) {
          if (it !== e.target) it.open = false;
        }
      }
      this._sync();
    };
    this._onClose = () => this._sync();
    this.addEventListener("open", this._onOpen);
    this.addEventListener("close", this._onClose);

    this._onSlotChange = () => this._sync();
    this._slot.addEventListener("slotchange", this._onSlotChange);

    this._sync();
  }

  disconnectedCallback() {
    this._slot?.removeEventListener("slotchange", this._onSlotChange);
    this.removeEventListener("open", this._onOpen);
    this.removeEventListener("close", this._onClose);
    REGISTRY.delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this._list) return;
    if (name === "label") {
      this._list.setAttribute(
        "aria-label",
        this.getAttribute("label") || "Frequently asked questions"
      );
    }
    if (name === "multi" && !this.hasAttribute("multi")) {
      // collapsing to single-open: keep only the first open item, if any.
      let seen = false;
      for (const it of this._items()) {
        if (it.open) {
          if (seen) it.open = false;
          seen = true;
        }
      }
    }
    this._sync();
  }

  // Slotted <pura-faq-item> elements, in document order.
  _items() {
    if (!this._slot) return [];
    return this._slot
      .assignedElements()
      .filter((el) => el.tagName && el.tagName.toLowerCase() === "pura-faq-item");
  }

  // Recompute machine-readable state + registry snapshot.
  _sync() {
    const items = this._items();
    const openIndex = items.findIndex((it) => it.open);
    const anyOpen = openIndex !== -1;

    this.dataset.pura = "faq";
    this.dataset.total = String(items.length);
    this.dataset.open = String(anyOpen);
    this.dataset.openIndex = String(openIndex);
    if (this._list) {
      this._list.setAttribute("data-total", String(items.length));
      this._list.setAttribute("data-open", String(anyOpen));
      this._list.setAttribute("data-open-index", String(openIndex));
    }

    REGISTRY.set(this._id, this);
  }

  // Public, agent-callable API.
  get total() { return this._items().length; }
  get openIndex() { return this._items().findIndex((it) => it.open); }

  // Machine-readable snapshot of every question + its open state.
  snapshot() {
    return this._items().map((it, i) => ({
      index: i,
      question: typeof it.questionText === "function" ? it.questionText() : "",
      open: !!it.open,
    }));
  }

  // Open the item at `i` (closing siblings unless `multi`).
  openItem(i) {
    const items = this._items();
    if (items[i]) items[i].open = true;
  }

  // Close the item at `i`.
  closeItem(i) {
    const items = this._items();
    if (items[i]) items[i].open = false;
  }

  // Close every item.
  collapseAll() {
    for (const it of this._items()) it.open = false;
  }
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const LIST_CSS = `
  :host { display: block; }
  [part="list"] {
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-lg);
    overflow: hidden;
    background: var(--pura-bg);
  }
  ::slotted(pura-faq-item:not(:last-child)) {
    border-bottom: 1px solid var(--pura-border);
  }
`;

const ITEM_CSS = `
  :host { display: block; }
  details { background: transparent; }
  summary {
    display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-3); cursor: pointer; list-style: none;
    padding: var(--pura-space-4) var(--pura-space-5);
    font-size: var(--pura-text-sm); font-weight: 550; color: var(--pura-fg);
    transition: background var(--pura-dur) var(--pura-ease);
  }
  summary::-webkit-details-marker { display: none; }
  summary::marker { content: ""; }
  summary:hover { background: var(--pura-subtle); }
  summary:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--pura-ring); }
  .q { min-width: 0; }
  .chev {
    width: 1rem; height: 1rem; color: var(--pura-muted); flex: none;
    transition: transform var(--pura-dur) var(--pura-ease);
  }
  details[open] .chev { transform: rotate(180deg); }
  [part="content"] {
    padding: 0 var(--pura-space-5) var(--pura-space-4);
    font-size: var(--pura-text-sm); color: var(--pura-muted-fg); line-height: 1.6;
  }
`;

define("pura-faq-item", PuraFaqItem);
define("pura-faq", PuraFaq);
export { PuraFaq, PuraFaqItem };
