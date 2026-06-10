// <pura-deck> — sticky card deck (the awwwards stacking-cards move). Each
// slotted card sticks near the top of the viewport while the next one scrolls
// up and over it; earlier cards peek out above the pile and recede slightly.
//
//   <pura-deck>
//     <div class="card">one</div>
//     <div class="card">two</div>
//     <div class="card">three</div>
//   </pura-deck>
//
// The stacking itself is pure CSS (position: sticky on the children). This
// class only numbers the children: --pura-deck-i (0,1,2...) staggers each
// card's sticky top by `peek` px, and --pura-deck-rev (count from the bottom)
// drives the depth scale of covered cards. A slotchange listener renumbers
// when cards are added or removed.
//
// Attributes:
//   top      — sticky top of the first card in px (default 96).
//   peek     — px each later card's top steps down, exposing the cards
//              beneath (default 14).
//   gap      — margin between cards in flow, i.e. how far apart they start
//              before piling (default 24).
//   no-depth — boolean. Disable the recede scale on covered cards.
//
// Scrolling does all the animation work; no JS per frame, no timers. SSR
// renders the same markup with all indexes at 0 (flat pile).
//
// Agent-native layer: registers in window.__puraDecks by data-pura-id with
//   { count, el }; data-pura-deck-count mirrors the card count.
import { PuraElement, define } from "../base.js";
import meta from "./deck.meta.js";
import { deckTemplate } from "./deck.template.js";

let uid = 0;

function registry() {
  return (window.__puraDecks ||= new Map());
}

class PuraDeck extends PuraElement {
  static observedAttributes = ["top", "peek", "gap", "no-depth"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-deck-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = deckTemplate(this);
    this.render(html, css);

    this._number();
    this._onSlot = () => this._number();
    this.shadowRoot.querySelector("slot")?.addEventListener("slotchange", this._onSlot);

    registry().set(this._id, { id: this._id, count: this.children.length, el: this });
  }

  disconnectedCallback() {
    this.shadowRoot?.querySelector("slot")?.removeEventListener("slotchange", this._onSlot);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this.shadowRoot?.childNodes.length) return;
    const { html, css } = deckTemplate(this);
    this.render(html, css);
    this.shadowRoot.querySelector("slot")?.addEventListener("slotchange", this._onSlot);
    this._number();
  }

  // ---- internals ------------------------------------------------------------
  // Number the cards: --pura-deck-i from the top of the source order,
  // --pura-deck-rev counting up from the last card (cards stacked on top of a
  // card = its rev), which drives the recede scale.
  _number() {
    const cards = Array.from(this.children);
    const n = cards.length;
    cards.forEach((card, i) => {
      card.style.setProperty("--pura-deck-i", String(i));
      card.style.setProperty("--pura-deck-rev", String(n - 1 - i));
    });
    this.setAttribute("data-pura-deck-count", String(n));
    const entry = registry().get(this._id);
    if (entry) entry.count = n;
  }
}

define("pura-deck", PuraDeck, meta);
export { PuraDeck };
