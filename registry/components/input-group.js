// <pura-input-group> — input with addons. A single bordered, rounded container
// that holds an optional prefix (slot name="prefix"), the default-slotted
// control (a plain <input> or <pura-input>, rendered borderless to blend), and
// an optional suffix (slot name="suffix"). The container shows a shared focus
// ring whenever focus is within it (:focus-within). Attributes: disabled, invalid.
import { PuraElement, define } from "../base.js";
import meta from "./input-group.meta.js";

class PuraInputGroup extends PuraElement {
  static observedAttributes = ["disabled", "invalid"];

  connectedCallback() {
    this.render(
      `<div class="group" part="group" role="group">
         <span class="prefix" part="prefix"><slot name="prefix"></slot></span>
         <span class="control" part="control"><slot></slot></span>
         <span class="suffix" part="suffix"><slot name="suffix"></slot></span>
       </div>`,
      CSS
    );
    this._sync();
  }

  attributeChangedCallback() {
    if (this.isConnected) this._sync();
  }

  _sync() {
    const group = this.$(".group");
    if (!group) return;
    group.setAttribute("aria-disabled", this.hasAttribute("disabled") ? "true" : "false");
  }

  get disabled() { return this.hasAttribute("disabled"); }
  set disabled(v) { this.toggleAttribute("disabled", !!v); }
  get invalid() { return this.hasAttribute("invalid"); }
  set invalid(v) { this.toggleAttribute("invalid", !!v); }
}

const CSS = `
  :host { display: block; }

  .group {
    display: flex; align-items: stretch;
    width: 100%; min-width: 0;
    background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm);
    overflow: hidden;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .group:hover { border-color: var(--pura-fg); }

  /* Shared focus ring on the whole container when focus is within. */
  .group:focus-within {
    border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  /* Addon wrappers: icon/text/button live here. */
  .prefix, .suffix {
    display: inline-flex; align-items: center; flex: none;
    color: var(--pura-muted);
    font-size: var(--pura-text-sm);
  }
  .prefix:not(:empty) { padding-inline-start: var(--pura-space-3); }
  .suffix:not(:empty) { padding-inline-end: var(--pura-space-3); }

  /* The default-slotted control fills remaining space. */
  .control {
    display: flex; align-items: stretch;
    flex: 1 1 auto; min-width: 0;
  }

  /* Make the slotted control blend: strip its border/ring/shadow/background so
     the container owns the visual chrome. Targets both a bare <input> and the
     library's <pura-input> via its ::part(input). */
  ::slotted(input),
  ::slotted(pura-input) {
    flex: 1 1 auto; min-width: 0; width: 100%;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    background: transparent !important;
    border-radius: 0 !important;
  }
  ::slotted(input) {
    font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg);
    padding: 0 var(--pura-space-3); height: 2.25rem;
  }
  ::slotted(input)::placeholder { color: var(--pura-muted); }

  /* Tighten addon buttons so they sit flush against the container edges. */
  ::slotted(button),
  ::slotted(pura-button) {
    flex: none; align-self: center;
  }

  /* Disabled + invalid states mirror <pura-input>. */
  :host([disabled]) .group {
    opacity: 0.55; cursor: not-allowed;
    background: var(--pura-subtle);
  }
  :host([disabled]) ::slotted(*) { pointer-events: none; }

  :host([invalid]) .group {
    border-color: var(--pura-danger);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--pura-danger) 30%, transparent);
  }
  :host([invalid]) .group:focus-within {
    border-color: var(--pura-danger);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--pura-danger) 40%, transparent);
  }
`;

define("pura-input-group", PuraInputGroup, meta);
export { PuraInputGroup };
