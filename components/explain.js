// <pura-explain> — wraps content (default slot) and attaches a plain-language
// explanation to it. A small "?" affordance reveals the explanation in a
// floating popover for humans, while the explanation is ALWAYS present in the
// accessibility tree (aria-description on the host) so screen readers and
// agents can read it without opening anything.
//
// The explanation source is either the `text` attribute or a slotted element
// with slot="explanation". The `text` attribute wins when both are present.
//
// Attributes:
//   text       — the plain-language explanation (string). Optional if a
//                slot="explanation" child is provided.
//   placement  — popover placement: bottom (default) | top | left | right.
//   label      — accessible label for the "?" trigger button
//                (default "Explanation").
//   open       — reflected boolean; present while the popover is open.
// Slots:
//   (default)            — the content being explained.
//   explanation          — rich explanation markup (fallback when no `text`).
// Parts:
//   content, trigger, panel, panel-text
// Events:
//   open  — fired when the popover opens (bubbles).
//   close — fired when the popover closes (bubbles).
//
// Agent-native layer: the host exposes a stable data-pura-id and
// data-pura-explain="" marker plus the plain-text explanation in
// data-pura-explanation, mirrors open state in data-pura-open, and registers
// in window.__puraExplains (data-pura-id -> { id, text, open, element }) so an
// agent can enumerate every explanation on the page and read it as a string
// without opening the popover or piercing the shadow DOM. The wrapped content
// also carries aria-description with the explanation text.
import { PuraElement, define } from "../base.js";

let uid = 0;
let anchorSeq = 0;

// Lazily-created global registry: data-pura-id -> { id, text, open, element }.
function registry() {
  return (window.__puraExplains ||= new Map());
}

const PLACEMENTS = new Set(["bottom", "top", "left", "right"]);

class PuraExplain extends PuraElement {
  static observedAttributes = ["text", "placement", "label", "open"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-explain-${uid++}`;
    this.dataset.puraId = this._id;
    this.setAttribute("data-pura-explain", "");
    this._anchor = `--pura-explain-${anchorSeq++}`;

    this.render(
      `<span class="content" part="content"><slot></slot></span><button
         class="trigger" part="trigger" type="button"
         aria-expanded="false">
         <svg class="ico" viewBox="0 0 24 24" aria-hidden="true" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
           <circle cx="12" cy="12" r="9"></circle>
           <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7v.3"></path>
           <path d="M12 17h.01"></path>
         </svg>
       </button><div class="panel" part="panel" popover="auto" role="note">
         <span part="panel-text"></span>
         <span class="explanation-slot"><slot name="explanation"></slot></span>
       </div>`,
      CSS.replaceAll("ANCHOR", this._anchor)
    );

    this._trigger = this.$(".trigger");
    this._panel = this.$(".panel");
    this._panelText = this.$("[part='panel-text']");

    // Wire the trigger to the popover. We toggle imperatively (rather than
    // popovertarget) so behaviour is identical across browsers and the
    // attribute can stay empty when there is nothing to explain.
    this._trigger.addEventListener("click", () => {
      if (!this._hasExplanation()) return;
      this._panel.togglePopover();
    });

    this._panel.addEventListener("toggle", (e) => {
      const open = e.newState === "open";
      this._trigger.setAttribute("aria-expanded", open ? "true" : "false");
      // Avoid reentrant attributeChangedCallback loops: only touch the
      // attribute when it disagrees with the popover's real state.
      if (open !== this.hasAttribute("open")) this.toggleAttribute("open", open);
      this.dataset.puraOpen = open ? "true" : "false";
      this._updateRegistry();
      this.dispatchEvent(
        new CustomEvent(open ? "open" : "close", { bubbles: true })
      );
    });

    this._slot = this.$("slot[name='explanation']");
    this._slot.addEventListener("slotchange", () => this._sync());

    this._sync();
    registry().set(this._id, this._record());
  }

  disconnectedCallback() {
    if (registry().get(this._id)?.element === this) registry().delete(this._id);
  }

  attributeChangedCallback(name, oldV, newV) {
    if (!this._trigger || oldV === newV) return;
    if (name === "open") {
      const wantOpen = this.hasAttribute("open");
      const isOpen = this._panel.matches(":popover-open");
      if (wantOpen && !isOpen && this._hasExplanation()) this._panel.showPopover();
      else if (!wantOpen && isOpen) this._panel.hidePopover();
    } else {
      this._sync();
    }
  }

  // The plain-text explanation string, preferring the `text` attribute and
  // falling back to the trimmed text content of the slotted explanation.
  get explanation() {
    const text = this.getAttribute("text");
    if (text != null && text.trim() !== "") return text.trim();
    const slotted = this._slot
      ? this._slot.assignedNodes().map((n) => n.textContent || "").join(" ").trim()
      : "";
    return slotted;
  }

  _hasExplanation() {
    return this.explanation !== "";
  }

  // Re-derive ARIA, the visible panel text, the trigger affordance and the
  // machine-readable data-* / registry layer from current attributes + slots.
  _sync() {
    // normalize an unknown placement to the default
    const pl = this.getAttribute("placement");
    if (pl && !PLACEMENTS.has(pl)) {
      this.setAttribute("placement", "bottom");
      return; // re-enters _sync via attributeChangedCallback
    }

    const text = this.explanation;
    const has = text !== "";
    const label = this.getAttribute("label") || "Explanation";

    // Always-on a11y description so the explanation is in the tree even closed.
    if (has) this.setAttribute("aria-description", text);
    else this.removeAttribute("aria-description");

    // The trigger only matters when there is something to explain.
    this._trigger.hidden = !has;
    this._trigger.setAttribute(
      "aria-label",
      has ? `${label}: ${text}` : label
    );
    this._trigger.disabled = !has;

    // Visible panel text mirrors the `text` attribute; when the explanation
    // comes from the slot we leave panel-text empty and let the slot render.
    const fromAttr = (this.getAttribute("text") || "").trim();
    this._panelText.textContent = fromAttr;

    // Machine-readable mirror on the host.
    if (has) this.dataset.puraExplanation = text;
    else delete this.dataset.puraExplanation;
    this.dataset.puraOpen = this.hasAttribute("open") ? "true" : "false";

    // Close a now-empty popover so it cannot linger.
    if (!has && this._panel.matches(":popover-open")) this._panel.hidePopover();

    this._updateRegistry();
  }

  _record() {
    return {
      id: this._id,
      text: this.explanation,
      open: this.hasAttribute("open"),
      element: this,
    };
  }

  _updateRegistry() {
    registry().set(this._id, this._record());
  }

  // Imperative open/close.
  show() {
    if (this._hasExplanation()) this._panel?.showPopover();
  }
  hide() {
    this._panel?.hidePopover();
  }
}

const CSS = `
  :host {
    display: inline; position: relative;
    text-decoration-line: underline;
    text-decoration-style: dotted;
    text-decoration-color: var(--pura-border-strong);
    text-underline-offset: 0.18em;
  }

  .content { color: inherit; }

  .trigger {
    anchor-name: ANCHOR;
    display: inline-grid; place-items: center; vertical-align: baseline;
    width: 1.05em; height: 1.05em; margin-inline-start: 0.15em;
    padding: 0; flex: none; cursor: help;
    color: var(--pura-muted); background: transparent;
    border: none; border-radius: var(--pura-radius-full);
    transition: color var(--pura-dur) var(--pura-ease),
      background var(--pura-dur) var(--pura-ease);
  }
  .trigger[hidden] { display: none; }
  .trigger:hover { color: var(--pura-fg); background: var(--pura-subtle); }
  .trigger:focus-visible {
    outline: none; box-shadow: 0 0 0 3px var(--pura-ring);
  }
  .trigger:disabled { display: none; }
  .ico { width: 100%; height: 100%; }

  .panel {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    width: max-content; max-width: min(20rem, 92vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-3) var(--pura-space-4);
    font-size: var(--pura-text-sm); line-height: 1.55;
    text-decoration: none;
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .panel:popover-open { opacity: 1; transform: none; }

  [part="panel-text"]:empty { display: none; }
  .explanation-slot { display: contents; }

  :host([placement="top"]) .panel { top: auto; bottom: anchor(top); margin: 0 0 var(--pura-space-2); transform: translateY(4px); }
  :host([placement="right"]) .panel { top: anchor(top); left: anchor(right); margin: 0 0 0 var(--pura-space-2); transform: translateX(-4px); }
  :host([placement="left"]) .panel { top: anchor(top); left: auto; right: anchor(left); margin: 0 var(--pura-space-2) 0 0; transform: translateX(4px); }
  :host([placement="top"]) .panel:popover-open,
  :host([placement="left"]) .panel:popover-open,
  :host([placement="right"]) .panel:popover-open { transform: none; }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    .panel { position: absolute; top: 100%; left: 0; inset: auto; }
  }
`;

define("pura-explain", PuraExplain);
export { PuraExplain };
