// <pura-pricing-table> — responsive grid of pricing tiers. Columns auto-fit to
// the available width; one tier can be emphasised (ring + badge). Container
// only: place <pura-pricing-tier> elements in the default slot.
//   Parts: grid
//   ARIA: role="list" with an accessible name from the `label` attribute; each
//     child tier is a role="listitem".
//   Attributes:
//     label — accessible name for the pricing group.
//     min   — minimum column width (CSS length, e.g. "16rem"); default 15rem.
//   Agent layer: gets a stable data-pura-pricing-table id and registers a live,
//     machine-readable snapshot in window.__puraPricing keyed by that id:
//     { label, tiers: [{ id, name, price, period, featured, features: [...] }] }.
//
// <pura-pricing-tier> — a single pricing column.
//   Slots: default = features list (e.g. a <ul>), action = the CTA button,
//     description (small text under the price).
//   Parts: tier, header, name, price, amount, period, badge, features, action
//   Attributes:
//     name     — tier name (e.g. "Pro").
//     price    — price text (e.g. "$29" or "Free").
//     period   — billing period suffix (e.g. "/mo").
//     featured — boolean; emphasises this tier with a ring + "Popular" badge.
//     badge    — custom text for the featured badge (default "Popular").
//   ARIA: role="listitem"; the host carries aria-label = "<name>, <price> <period>"
//     so the whole tier reads as one labelled unit. featured -> data-featured.
//   Agent layer: stable data-pura-pricing-tier id; content reflected into the
//     parent table's registry snapshot.
import { PuraElement, define } from "../base.js";
import meta from "./pricing-table.meta.js";

let uid = 0;

// Global, machine-readable registry of every mounted pricing table. Agents can
// read window.__puraPricing[id] to get { label, tiers: [...] } without scraping
// the DOM. Created lazily, non-enumerable, never overwritten.
function registry() {
  if (!window.__puraPricing) {
    Object.defineProperty(window, "__puraPricing", {
      value: {},
      writable: false,
      configurable: true,
      enumerable: false,
    });
  }
  return window.__puraPricing;
}

class PuraPricingTable extends PuraElement {
  static observedAttributes = ["label", "min"];

  connectedCallback() {
    this._id = this.getAttribute("data-pura-pricing-table") || `pura-pricing-table-${++uid}`;
    this.setAttribute("data-pura-pricing-table", this._id);

    if (!this.hasAttribute("role")) this.setAttribute("role", "list");
    this._syncLabel();

    this.render(`<div part="grid" class="grid"><slot></slot></div>`, CSS);

    this._applyMin();
    this._slot = this.$("slot");
    this._slot.addEventListener("slotchange", () => this._sync());
    this._sync();
  }

  disconnectedCallback() {
    delete registry()[this._id];
  }

  attributeChangedCallback(name) {
    if (name === "label") this._syncLabel();
    else if (name === "min") this._applyMin();
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

  _applyMin() {
    const grid = this.$(".grid");
    if (!grid) return;
    const min = this.getAttribute("min");
    grid.style.setProperty("--pura-pricing-min", min || "15rem");
  }

  _items() {
    return this._slot
      ? this._slot.assignedElements().filter((el) => el.tagName === "PURA-PRICING-TIER")
      : [];
  }

  // Rebuild this table's registry snapshot. Called on slotchange and when a
  // child tier announces it changed.
  _sync() {
    const items = this._items();
    registry()[this._id] = {
      label: this.getAttribute("label") || null,
      get tiers() {
        return items.map((el) => el.snapshot());
      },
    };
  }
}

class PuraPricingTier extends PuraElement {
  static observedAttributes = ["name", "price", "period", "featured", "badge"];

  connectedCallback() {
    this._id = this.getAttribute("data-pura-pricing-tier") || `pura-pricing-tier-${++uid}`;
    this.setAttribute("data-pura-pricing-tier", this._id);

    if (!this.hasAttribute("role")) this.setAttribute("role", "listitem");
    this._reflectFeatured();

    this.render(
      `<div part="tier" class="tier">
         <span part="badge" class="badge" hidden></span>
         <div part="header" class="header">
           <div part="name" class="name">${esc(this.getAttribute("name"))}</div>
           <div part="price" class="price">
             <span part="amount" class="amount">${esc(this.getAttribute("price"))}</span>
             <span part="period" class="period">${esc(this.getAttribute("period"))}</span>
           </div>
           <div part="description" class="description"><slot name="description"></slot></div>
         </div>
         <div part="features" class="features"><slot></slot></div>
         <div part="action" class="action"><slot name="action"></slot></div>
       </div>`,
      TIER_CSS
    );

    this._badge = this.$("[part='badge']");
    this._updateBadge();
    this._syncLabel();

    // Hide the description row when its slot is empty so spacing collapses.
    const descSlot = this.$('slot[name="description"]');
    const descHost = descSlot.closest('[part="description"]');
    const descUpd = () => {
      descHost.style.display = descSlot.assignedNodes().length ? "" : "none";
    };
    descSlot.addEventListener("slotchange", descUpd);
    descUpd();

    // Notify the parent table whenever feature/action content changes.
    for (const sel of ['[part="features"] slot', 'slot[name="action"]']) {
      const slot = this.$(sel);
      slot.addEventListener("slotchange", () => this._notify());
    }
  }

  attributeChangedCallback(name) {
    if (!this.shadowRoot || !this.shadowRoot.childNodes.length) return;
    if (name === "featured" || name === "badge") {
      this._reflectFeatured();
      this._updateBadge();
    } else if (name === "name") {
      this._refresh("[part='name']", this.getAttribute("name"));
      this._syncLabel();
    } else if (name === "price") {
      this._refresh("[part='amount']", this.getAttribute("price"));
      this._syncLabel();
    } else if (name === "period") {
      this._refresh("[part='period']", this.getAttribute("period"));
      this._syncLabel();
    }
    this._notify();
  }

  _refresh(sel, value) {
    const el = this.$(sel);
    if (el) el.textContent = value || "";
  }

  _reflectFeatured() {
    if (this.hasAttribute("featured")) this.setAttribute("data-featured", "true");
    else this.removeAttribute("data-featured");
  }

  _updateBadge() {
    if (!this._badge) return;
    if (this.hasAttribute("featured")) {
      this._badge.textContent = this.getAttribute("badge") || "Popular";
      this._badge.hidden = false;
    } else {
      this._badge.textContent = "";
      this._badge.hidden = true;
    }
  }

  // Keep an accessible name on the host so the whole tier reads as one unit.
  _syncLabel() {
    const parts = [
      this.getAttribute("name"),
      this.getAttribute("price"),
      this.getAttribute("period"),
    ].filter(Boolean);
    if (parts.length) this.setAttribute("aria-label", parts.join(" "));
    else this.removeAttribute("aria-label");
  }

  // Tell the parent table to refresh its registry snapshot.
  _notify() {
    const table = this.closest("pura-pricing-table");
    if (table && typeof table._sync === "function") table._sync();
  }

  _featureTexts() {
    const slot = this.shadowRoot && this.shadowRoot.querySelector('[part="features"] slot');
    if (!slot) return [];
    const out = [];
    for (const node of slot.assignedElements()) {
      const lis = node.matches("li") ? [node] : [...node.querySelectorAll("li")];
      if (lis.length) {
        for (const li of lis) {
          const t = (li.textContent || "").trim();
          if (t) out.push(t);
        }
      } else {
        const t = (node.textContent || "").trim();
        if (t) out.push(t);
      }
    }
    return out;
  }

  // Machine-readable view of this tier, used by the table registry.
  snapshot() {
    return {
      id: this._id,
      name: this.getAttribute("name") || null,
      price: this.getAttribute("price") || null,
      period: this.getAttribute("period") || null,
      featured: this.hasAttribute("featured"),
      features: this._featureTexts(),
    };
  }
}

// Escape attribute-sourced text before injecting into the template.
function esc(v) {
  if (v == null) return "";
  return String(v).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

const CSS = `
  :host { display: block; }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--pura-pricing-min, 15rem), 1fr));
    gap: var(--pura-space-4);
    align-items: stretch;
  }
`;

const TIER_CSS = `
  :host { display: block; height: 100%; }

  .tier {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--pura-space-4);
    height: 100%;
    padding: var(--pura-space-5);
    background: var(--pura-bg);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-lg);
    box-shadow: var(--pura-shadow-sm);
    transition: box-shadow var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }

  /* Featured tier: accent ring + lift + badge. */
  :host([featured]) .tier {
    border-color: var(--pura-accent);
    box-shadow: var(--pura-shadow-lg), 0 0 0 1px var(--pura-accent);
  }

  .badge {
    position: absolute;
    top: 0;
    right: var(--pura-space-5);
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    font-size: var(--pura-text-xs);
    font-weight: 600;
    line-height: 1;
    padding: 0.3rem var(--pura-space-3);
    border-radius: var(--pura-radius-full);
    background: var(--pura-accent);
    color: #fff;
    box-shadow: var(--pura-shadow-sm);
  }
  .badge[hidden] { display: none; }

  .header {
    display: flex;
    flex-direction: column;
    gap: var(--pura-space-2);
  }
  [part="name"] {
    font-size: var(--pura-text-base);
    font-weight: 600;
    color: var(--pura-fg);
    line-height: 1.2;
  }
  [part="name"]:empty { display: none; }

  .price {
    display: flex;
    align-items: baseline;
    gap: var(--pura-space-1);
    flex-wrap: wrap;
  }
  [part="amount"] {
    font-size: var(--pura-text-xl);
    font-weight: 700;
    color: var(--pura-fg);
    line-height: 1.1;
  }
  [part="amount"]:empty { display: none; }
  [part="period"] {
    font-size: var(--pura-text-sm);
    color: var(--pura-muted);
    line-height: 1.2;
  }
  [part="period"]:empty { display: none; }

  [part="description"] {
    font-size: var(--pura-text-sm);
    color: var(--pura-muted-fg);
    line-height: 1.5;
  }

  /* Features sit between the header and the pinned action. */
  [part="features"] {
    flex: 1;
    font-size: var(--pura-text-sm);
    color: var(--pura-muted-fg);
    line-height: 1.6;
  }
  ::slotted(ul), ::slotted(ol) {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--pura-space-2);
  }

  [part="action"] {
    display: flex;
    flex-direction: column;
    gap: var(--pura-space-2);
  }
  ::slotted([slot="action"]) { width: 100%; }
`;

define("pura-pricing-table", PuraPricingTable, meta);
define("pura-pricing-tier", PuraPricingTier);
export { PuraPricingTable, PuraPricingTier };
