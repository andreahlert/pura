// <pura-speed-dial> — a floating action button (FAB) pinned to a viewport corner
// that expands on click (and optionally hover) into a fanned-out stack of
// secondary action buttons, each with a label. Toggles open/closed; Esc closes;
// clicking outside dismisses (native Popover light-dismiss + top layer).
//
// Built on the native Popover API + CSS anchor positioning (a UNIQUE
// anchor-name per instance, like components/popover.js) so the action stack
// lives in the top layer, gets Esc + light-dismiss for free, and is correctly
// positioned relative to the FAB regardless of stacking context.
//
// Attributes:
//   position — bottom-end (default) | bottom-start | top-end | top-start.
//              Chooses the viewport corner and the fan-out direction.
//   open     — reflects/controls open state.
//   hover    — when present, also expands on pointer hover (click still toggles).
//   label    — accessible label for the FAB toggle (default "Ações rápidas").
// Slots:
//   default       — <pura-speed-dial-action> children (the secondary actions).
//   name="icon"   — custom FAB icon (defaults to a plus that rotates to an x).
// Events:
//   open / close  — CustomEvent (bubbles) when the stack opens/closes.
// API: .open() / .close() / .toggle().
//
// Sub-element <pura-speed-dial-action>:
//   Slots: default = label text, name="icon" = action icon.
//   Attributes: disabled. Emits CustomEvent('action',{bubbles:true,detail:{id}}).
//   Activating an action closes the dial.
//
// Agent-native layer: the FAB toggle carries role=button + aria-haspopup=menu +
//   aria-expanded; the stack is role=menu and each action role=menuitem with a
//   stable data-pura-action-id. The host mirrors live state via
//   data-pura-speed-dial-* attributes and registers in window.__puraSpeedDials
//   keyed by its data-pura-id, so agents can enumerate dials, read open state and
//   actions, and invoke them without scraping the shadow DOM.
import { PuraElement, define } from "../base.js";
import meta from "./speed-dial.meta.js";
import { speedDialActionTemplate } from "./speed-dial.template.js";

let uid = 0;
let anchorUid = 0;
let actionUid = 0;

// Lazily-created global registry: data-pura-id -> element.
function registry() {
  return (window.__puraSpeedDials ||= new Map());
}

const POSITIONS = ["bottom-end", "bottom-start", "top-end", "top-start"];

class PuraSpeedDial extends PuraElement {
  static observedAttributes = ["open", "position", "label", "hover"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-speed-dial-${uid++}`;
    this.dataset.puraId = this._id;
    // Dedicated counter so the anchor-name is unique per instance regardless of
    // whether the id came from a preset data-pura-id.
    this._name ||= `--pura-speed-dial-anchor-${anchorUid++}`;
    registry().set(this._id, this);

    this.render(
      `<div class="anchor" part="fab-wrap">
         <button class="fab" part="fab" type="button" aria-haspopup="menu" aria-expanded="false">
           <span class="icon" part="fab-icon" aria-hidden="true">
             <slot name="icon">
               <svg viewBox="0 0 24 24" aria-hidden="true">
                 <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
               </svg>
             </slot>
           </span>
         </button>
       </div>
       <div class="stack" part="stack" role="menu" popover="manual">
         <slot></slot>
       </div>`,
      CSS.replaceAll("ANCHOR", this._name)
    );

    this._fab = this.$(".fab");
    this._stack = this.$("[popover]");
    this._slot = this.$(".stack slot");

    // Click on the FAB toggles the stack.
    this._fab.addEventListener("click", () => this.toggle());

    // Optional hover-to-open. Click still works as a toggle.
    this.addEventListener("pointerenter", this._onPointerEnter);
    this.addEventListener("pointerleave", this._onPointerLeave);

    // Native popover gives us Esc + light dismiss; mirror to the open attr.
    this._stack.addEventListener("toggle", (e) => {
      const open = e.newState === "open";
      // Reflect without re-triggering attributeChangedCallback side effects.
      if (open && !this.hasAttribute("open")) this.setAttribute("open", "");
      if (!open && this.hasAttribute("open")) this.removeAttribute("open");
      this._fab.setAttribute("aria-expanded", open ? "true" : "false");
      this.toggleAttribute("data-pura-open", open);
      this._propagate();
      this._reflectAgentState();
      if (open) {
        requestAnimationFrame(() => this._focusFirst());
      } else {
        this._fab.focus();
      }
      this.dispatchEvent(new CustomEvent(open ? "open" : "close", { bubbles: true }));
    });

    // Keyboard roving inside the stack (arrow keys + Home/End).
    this.addEventListener("keydown", this._onKeydown);

    // Activating an action closes the dial.
    this.addEventListener("action", () => this.close());

    this._slot.addEventListener("slotchange", this._onSlotChange);

    this._sync();
    this._propagate();
    this._reflectAgentState();

    if (this.hasAttribute("open")) queueMicrotask(() => this._show());
  }

  disconnectedCallback() {
    this.removeEventListener("pointerenter", this._onPointerEnter);
    this.removeEventListener("pointerleave", this._onPointerLeave);
    this.removeEventListener("keydown", this._onKeydown);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this._fab) return;
    if (name === "open") {
      const want = this.hasAttribute("open");
      const isOpen = this._stack.matches(":popover-open");
      if (want && !isOpen) this._show();
      if (!want && isOpen) this._hide();
    } else if (name === "label") {
      this._sync();
    } else if (name === "position") {
      this._propagate();
      this._reflectAgentState();
    }
  }

  _position() {
    const p = this.getAttribute("position");
    return POSITIONS.includes(p) ? p : "bottom-end";
  }

  _sync() {
    this._fab.setAttribute("aria-label", this.getAttribute("label") || "Ações rápidas");
  }

  _onSlotChange = () => {
    this._sync();
    this._propagate();
    this._reflectAgentState();
  };

  // Push open + corner state onto slotted actions as plain attributes so their
  // shadow CSS can react with :host([...]) selectors (avoids :host-context,
  // which lacks Firefox support). Staggers the fan-out reveal slightly.
  _propagate() {
    const open = this.hasAttribute("open");
    const isStart = this._position().endsWith("-start");
    this._allActions().forEach((el, i) => {
      el.toggleAttribute("data-open", open);
      el.toggleAttribute("data-start", isStart);
      el.style.setProperty("--pura-speed-dial-index", String(i));
    });
  }

  _onPointerEnter = () => {
    if (!this.hasAttribute("hover")) return;
    clearTimeout(this._leaveTimer);
    this._show();
  };

  _onPointerLeave = () => {
    if (!this.hasAttribute("hover")) return;
    clearTimeout(this._leaveTimer);
    // Small grace period so moving toward an action does not snap closed.
    this._leaveTimer = setTimeout(() => this._hide(), 180);
  };

  // Enabled actions currently slotted, in document order.
  _actions() {
    return this._slot
      .assignedElements({ flatten: true })
      .filter((el) => el.tagName === "PURA-SPEED-DIAL-ACTION" && !el.hasAttribute("disabled"));
  }

  _focusFirst() {
    this._actions()[0]?.focus();
  }

  _focusAt(index) {
    const items = this._actions();
    if (!items.length) return;
    const i = (index + items.length) % items.length;
    items[i].focus();
  }

  _onKeydown = (e) => {
    if (!this._stack.matches(":popover-open")) return;
    const items = this._actions();
    if (!items.length) return;
    // Active element may live in the light DOM; compare against the list.
    const current = items.indexOf(document.activeElement);

    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        this._focusAt(current < 0 ? 0 : current + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        this._focusAt(current < 0 ? items.length - 1 : current - 1);
        break;
      case "Home":
        e.preventDefault();
        this._focusAt(0);
        break;
      case "End":
        e.preventDefault();
        this._focusAt(items.length - 1);
        break;
      case "Enter":
      case " ":
        if (current >= 0) {
          e.preventDefault();
          items[current].click();
        }
        break;
    }
  };

  _show() { try { this._stack.showPopover(); } catch {} }
  _hide() { try { this._stack.hidePopover(); } catch {} }

  // Stable machine-readable mirror of state on the host element.
  _reflectAgentState() {
    this.setAttribute("data-pura-speed-dial-position", this._position());
    this.setAttribute("data-pura-speed-dial-open", this.hasAttribute("open") ? "true" : "false");
    this.setAttribute("data-pura-speed-dial-actions", String(this._actions().length));
  }

  open() { this.setAttribute("open", ""); }
  close() { this.removeAttribute("open"); }
  toggle() {
    if (this.hasAttribute("open")) this.close();
    else this.open();
  }

  // Agent helper: read a JSON snapshot without touching the shadow DOM.
  get state() {
    return {
      id: this._id,
      position: this._position(),
      open: this.hasAttribute("open"),
      actions: this._allActions().map((el) => ({
        id: el.dataset.puraActionId,
        label: (el.textContent || "").trim(),
        disabled: el.hasAttribute("disabled"),
      })),
    };
  }

  _allActions() {
    return this._slot
      .assignedElements({ flatten: true })
      .filter((el) => el.tagName === "PURA-SPEED-DIAL-ACTION");
  }
}

const CSS = `
  :host {
    position: fixed; z-index: 1000;
    display: block; width: max-content; height: max-content;
  }
  /* Corner placement of the host itself. */
  :host, :host([position="bottom-end"]) { inset: auto var(--pura-space-5) var(--pura-space-5) auto; }
  :host([position="bottom-start"]) { inset: auto auto var(--pura-space-5) var(--pura-space-5); }
  :host([position="top-end"]) { inset: var(--pura-space-5) var(--pura-space-5) auto auto; }
  :host([position="top-start"]) { inset: var(--pura-space-5) auto auto var(--pura-space-5); }

  .anchor { anchor-name: ANCHOR; display: inline-flex; }

  .fab {
    display: inline-flex; align-items: center; justify-content: center;
    width: 3.5rem; height: 3.5rem; flex: none;
    border: 1px solid transparent; border-radius: var(--pura-radius-full);
    background: var(--pura-primary); color: var(--pura-primary-fg);
    box-shadow: var(--pura-shadow-lg); cursor: pointer; padding: 0;
    transition: background var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .fab:hover { background: var(--pura-primary-hover); }
  .fab:active { transform: scale(0.96); }
  .fab:focus-visible { outline: none; box-shadow: var(--pura-shadow-lg), 0 0 0 3px var(--pura-ring); }

  .icon { display: inline-flex; align-items: center; justify-content: center;
    width: 1.5rem; height: 1.5rem;
    transition: transform var(--pura-dur) var(--pura-ease); }
  .icon svg { width: 1.5rem; height: 1.5rem; }
  :host([open]) .icon { transform: rotate(135deg); }

  /* The fan-out stack, anchored to the FAB, in the top layer. */
  [part="stack"] {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; padding: 0; border: none; background: transparent;
    overflow: visible; box-sizing: border-box;
    display: flex; flex-direction: column; gap: var(--pura-space-3);
    width: max-content;
  }
  /* Default (bottom corners): stack grows UPWARD, items right-aligned. */
  [part="stack"] {
    bottom: anchor(top); right: anchor(right);
    margin-bottom: var(--pura-space-3);
    align-items: flex-end; flex-direction: column-reverse;
  }
  :host([position="bottom-start"]) [part="stack"] {
    bottom: anchor(top); left: anchor(left); right: auto;
    align-items: flex-start;
  }
  /* Top corners: stack grows DOWNWARD. */
  :host([position="top-end"]) [part="stack"] {
    bottom: auto; top: anchor(bottom); right: anchor(right);
    margin-top: var(--pura-space-3); margin-bottom: 0;
    flex-direction: column; align-items: flex-end;
  }
  :host([position="top-start"]) [part="stack"] {
    bottom: auto; top: anchor(bottom); left: anchor(left); right: auto;
    margin-top: var(--pura-space-3); margin-bottom: 0;
    flex-direction: column; align-items: flex-start;
  }

  /* Hidden state: popover display:none is toggled by the API; we animate the
     items via the host's [open] flag (see action CSS). The container itself
     just needs to be display:none when closed for layout. */
  [part="stack"]:not(:popover-open) { display: none; }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    .anchor { position: relative; }
    [part="stack"] { position: absolute; right: 0; bottom: 100%; inset: auto auto auto auto; }
    :host([position="top-end"]) [part="stack"],
    :host([position="top-start"]) [part="stack"] { top: 100%; bottom: auto; }
    :host([position="bottom-start"]) [part="stack"],
    :host([position="top-start"]) [part="stack"] { left: 0; right: auto; }
  }
`;

define("pura-speed-dial", PuraSpeedDial, meta);

// ---------------------------------------------------------------------------
// <pura-speed-dial-action> — one secondary action: a circular icon button with
// a label pill beside it. Slots: default = label, name="icon" = icon. Attr:
// disabled. Emits CustomEvent('action',{bubbles:true,detail:{id,label}}).
class PuraSpeedDialAction extends PuraElement {
  static observedAttributes = ["disabled"];

  connectedCallback() {
    this._id = this.dataset.puraActionId || `pura-speed-dial-action-${actionUid++}`;
    this.dataset.puraActionId = this._id;

    const { html, css } = speedDialActionTemplate(this);
    this.render(html, css);

    this.setAttribute("role", "menuitem");
    this._sync();

    this.addEventListener("click", (e) => {
      if (this.hasAttribute("disabled")) {
        e.stopImmediatePropagation();
        e.preventDefault();
        return;
      }
      this.dispatchEvent(
        new CustomEvent("action", {
          bubbles: true,
          detail: { id: this._id, label: (this.textContent || "").trim() },
        })
      );
    });
  }

  attributeChangedCallback() {
    if (this.shadowRoot && this.shadowRoot.childNodes.length) this._sync();
  }

  _sync() {
    const disabled = this.hasAttribute("disabled");
    this.setAttribute("aria-disabled", disabled ? "true" : "false");
    this.setAttribute("tabindex", disabled ? "-1" : "0");
  }
}


define("pura-speed-dial-action", PuraSpeedDialAction);

export { PuraSpeedDial, PuraSpeedDialAction };
