// <pura-avatar-group> — overlapping stack of <pura-avatar> children. Overlaps
// slotted avatars with a ring gap; attr `max` collapses the overflow into a
// trailing "+N" bubble that opens a popover listing the hidden people.
// Attributes:
//   max   — max avatars shown before collapsing into "+N" (number; 0/absent = all)
//   size  — passthrough applied to every slotted <pura-avatar> (sm | md | lg)
//   label — accessible name for the group (default: "Avatar group")
// Slots: default = the <pura-avatar> children.
// Events: pura-overflow-toggle ({ open }) when the +N popover opens/closes.
// Agent-native: role="group", stable data-* (data-pura, data-total, data-shown,
// data-overflow), and a window.__puraAvatarGroups registry keyed by instance id.
// Sub-element: <pura-avatar-more> — the standalone "+N" overflow bubble/trigger.
import { PuraElement, define } from "../base.js";
import meta from "./avatar-group.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "avatar-group.label": {
    en: "Avatar group",
    "pt-BR": "Grupo de avatares",
    fr: "Groupe d'avatars",
    de: "Avatar-Gruppe",
    it: "Gruppo di avatar",
  },
  "avatar-group.hidden": {
    en: "Hidden members",
    "pt-BR": "Membros ocultos",
    fr: "Membres masqués",
    de: "Verborgene Mitglieder",
    it: "Membri nascosti",
  },
  "avatar-group.member": {
    en: "Member",
    "pt-BR": "Membro",
    fr: "Membre",
    de: "Mitglied",
    it: "Membro",
  },
  "avatar-group.more": {
    en: "{n} more",
    "pt-BR": "mais {n}",
    fr: "{n} de plus",
    de: "{n} weitere",
    it: "altri {n}",
  },
});

let uid = 0;

// Global machine-readable registry of every live avatar-group instance.
const REGISTRY = (window.__puraAvatarGroups ||= new Map());

class PuraAvatarGroup extends PuraElement {
  static observedAttributes = ["max", "size", "label"];

  connectedCallback() {
    if (!this._id) {
      this._n = uid++;
      this._id = `pura-avatar-group-${this._n}`;
    }
    this._anchor = `--pura-avg-${this._n}`;
    const label = this.getAttribute("label") || t("avatar-group.label");

    this.render(
      `<div part="group" role="group" aria-label="${esc(label)}" data-pura="avatar-group">
         <slot></slot>
         <button part="more" id="more" class="more" type="button"
                 hidden aria-expanded="false" aria-controls="overflow">
           <span class="more-count" part="more-count" aria-hidden="true"></span>
         </button>
         <div part="overflow" id="overflow" popover="auto" aria-label="${esc(t("avatar-group.hidden"))}">
           <ul part="overflow-list" class="ovf-list" role="list"></ul>
         </div>
       </div>`,
      CSS.replaceAll("ANCHOR", this._anchor)
    );

    this._group = this.$('[part="group"]');
    this._more = this.$("#more");
    this._moreCount = this.$('[part="more-count"]');
    this._slot = this.$("slot");
    this._pop = this.$('[part="overflow"]');
    this._ovfList = this.$('[part="overflow-list"]');

    REGISTRY.set(this._id, this);

    this._onSlotChange = () => this._sync();
    this._slot.addEventListener("slotchange", this._onSlotChange);

    this._more.addEventListener("click", () => this._pop.togglePopover());
    this._pop.addEventListener("toggle", (e) => {
      const open = e.newState === "open";
      this._more.setAttribute("aria-expanded", open ? "true" : "false");
      this.dispatchEvent(
        new CustomEvent("pura-overflow-toggle", { detail: { open }, bubbles: true })
      );
    });

    this._sync();

    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._slot?.removeEventListener("slotchange", this._onSlotChange);
    this._i18nOff?.();
    REGISTRY.delete(this._id);
  }

  // Update only the already-rendered i18n nodes in place (no re-render).
  _applyI18n() {
    if (!this._group) return;
    if (!this.getAttribute("label")) {
      this._group.setAttribute("aria-label", t("avatar-group.label"));
    }
    this._pop.setAttribute("aria-label", t("avatar-group.hidden"));
    // _sync() refreshes the +N aria-label and the overflow-member list text.
    // It adds no document/window listeners, so it is safe to re-run here.
    this._sync();
  }

  attributeChangedCallback() {
    if (this._group) this._sync();
  }

  // All slotted <pura-avatar> elements, in order.
  _avatars() {
    if (!this._slot) return [];
    return this._slot
      .assignedElements()
      .filter((el) => el.tagName && el.tagName.toLowerCase() === "pura-avatar");
  }

  _label(av) {
    return (
      av.getAttribute("alt") ||
      av.getAttribute("initials") ||
      av.getAttribute("name") ||
      t("avatar-group.member")
    );
  }

  // Recompute visibility, size passthrough, overflow bubble + registry state.
  _sync() {
    const avatars = this._avatars();
    const total = avatars.length;

    // size passthrough onto each child avatar.
    const size = this.getAttribute("size");
    for (const av of avatars) {
      if (size) av.setAttribute("size", size);
      else av.removeAttribute("size");
    }

    // max: 0, absent, or non-positive => show all.
    const rawMax = parseInt(this.getAttribute("max"), 10);
    const max = Number.isFinite(rawMax) && rawMax > 0 ? rawMax : Infinity;

    // When collapsing, reserve one slot for the "+N" bubble (unless max >= total).
    let shown = total;
    let overflow = 0;
    if (total > max) {
      shown = Math.max(max - 1, 0);
      overflow = total - shown;
    }

    avatars.forEach((av, i) => {
      av.toggleAttribute("hidden", i >= shown);
    });

    if (overflow > 0) {
      this._more.hidden = false;
      this._moreCount.textContent = `+${overflow}`;
      this._more.setAttribute("aria-label", t("avatar-group.more", { n: overflow }));
      if (size) this._more.setAttribute("data-size", size);
      else this._more.removeAttribute("data-size");

      // (re)build the hidden-members popover list.
      this._ovfList.replaceChildren();
      for (let i = shown; i < total; i++) {
        const li = document.createElement("li");
        li.className = "ovf-item";
        li.setAttribute("part", "overflow-item");
        li.textContent = this._label(avatars[i]);
        this._ovfList.appendChild(li);
      }
    } else {
      this._more.hidden = true;
      this._more.setAttribute("aria-expanded", "false");
      if (this._pop.matches(":popover-open")) this._pop.hidePopover();
      this._ovfList.replaceChildren();
    }

    // machine-readable state.
    this.dataset.pura = "avatar-group";
    this.dataset.total = String(total);
    this.dataset.shown = String(Math.min(shown, total));
    this.dataset.overflow = String(overflow);
    this._group.setAttribute("data-total", String(total));
    this._group.setAttribute("data-shown", String(Math.min(shown, total)));
    this._group.setAttribute("data-overflow", String(overflow));

    REGISTRY.set(this._id, this);
  }

  // Public, agent-callable API.
  get total() { return this._avatars().length; }
  get overflow() { return parseInt(this.dataset.overflow || "0", 10); }
  showOverflow() { this._pop?.showPopover(); }
  hideOverflow() { this._pop?.hidePopover(); }
}

// <pura-avatar-more> — standalone "+N" bubble matching the group's overflow chip.
// Attributes: count (number), size (sm | md | lg). Purely presentational.
class PuraAvatarMore extends PuraElement {
  static observedAttributes = ["count", "size"];

  connectedCallback() {
    const n = parseInt(this.getAttribute("count"), 10);
    const count = Number.isFinite(n) ? n : 0;
    this.render(
      `<span part="more" class="more" role="img"
             aria-label="${esc(t("avatar-group.more", { n: count }))}" data-pura="avatar-more">+${count}</span>`,
      MORE_CSS
    );
  }

  attributeChangedCallback() {
    if (this.shadowRoot && this.shadowRoot.childNodes.length) this.connectedCallback();
  }
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const RING = `
  /* the gap/ring that separates overlapping avatars */
  border-radius: var(--pura-radius-full);
  box-shadow: 0 0 0 var(--ring-w, 2px) var(--pura-bg);
`;

const CSS = `
  :host { display: inline-flex; vertical-align: middle; --ring-w: 2px; }
  :host([size="sm"]) { --ring-w: 2px; }
  :host([size="lg"]) { --ring-w: 3px; }

  [part="group"] {
    display: inline-flex; align-items: center; isolation: isolate;
    padding: var(--ring-w);
  }

  /* overlap: pull every avatar/bubble after the first leftward by ~35% */
  ::slotted(pura-avatar) {
    margin-left: -0.875rem;
    border-radius: var(--pura-radius-full);
    box-shadow: 0 0 0 var(--ring-w) var(--pura-bg);
    transition: transform var(--pura-dur) var(--pura-ease), margin var(--pura-dur) var(--pura-ease);
  }
  ::slotted(pura-avatar:first-child) { margin-left: 0; }
  ::slotted(pura-avatar:hover) { transform: translateY(-2px); z-index: 1; }
  ::slotted(pura-avatar[hidden]) { display: none; }

  /* tighter / looser overlap by size */
  :host([size="sm"]) ::slotted(pura-avatar) { margin-left: -0.625rem; }
  :host([size="sm"]) ::slotted(pura-avatar:first-child) { margin-left: 0; }
  :host([size="lg"]) ::slotted(pura-avatar) { margin-left: -1.25rem; }
  :host([size="lg"]) ::slotted(pura-avatar:first-child) { margin-left: 0; }

  /* the +N overflow bubble (acts as popover trigger) */
  .more {
    anchor-name: ANCHOR;
    position: relative;
    display: inline-grid; place-items: center;
    width: 2.5rem; height: 2.5rem; margin-left: -0.875rem;
    border: none; cursor: pointer; font: inherit;
    border-radius: var(--pura-radius-full);
    background: var(--pura-subtle); color: var(--pura-muted-fg);
    font-size: var(--pura-text-sm); font-weight: 600; user-select: none;
    box-shadow: inset 0 0 0 1px var(--pura-border), 0 0 0 var(--ring-w) var(--pura-bg);
    transition: background var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  .more[hidden] { display: none; }
  .more:hover { background: var(--pura-subtle-hover); }
  .more:focus-visible { outline: none; box-shadow: inset 0 0 0 1px var(--pura-border), 0 0 0 3px var(--pura-ring); }
  .more[data-size="sm"] { width: 1.75rem; height: 1.75rem; font-size: var(--pura-text-xs); margin-left: -0.625rem; }
  .more[data-size="lg"] { width: 3.5rem; height: 3.5rem; font-size: var(--pura-text-lg); margin-left: -1.25rem; }

  /* overflow popover (native Popover API + CSS anchor positioning) */
  [part="overflow"] {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(center); translate: -50% 0;
    margin-top: var(--pura-space-2);
    width: max-content; max-width: min(18rem, 92vw); max-height: 60vh; overflow: auto;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-2);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  [part="overflow"]:popover-open { opacity: 1; transform: none; }
  .ovf-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.125rem; }
  .ovf-item {
    padding: var(--pura-space-2) var(--pura-space-3); border-radius: var(--pura-radius-sm);
    color: var(--pura-fg); white-space: nowrap;
  }
  .ovf-item:hover { background: var(--pura-subtle); }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    [part="group"] { position: relative; }
    [part="overflow"] { position: absolute; top: 100%; left: 0; translate: none; inset: auto; }
  }
`;

const MORE_CSS = `
  :host { display: inline-block; vertical-align: middle; }
  .more {
    display: inline-grid; place-items: center;
    width: 2.5rem; height: 2.5rem;
    border-radius: var(--pura-radius-full);
    background: var(--pura-subtle); color: var(--pura-muted-fg);
    font-size: var(--pura-text-sm); font-weight: 600; user-select: none;
    box-shadow: inset 0 0 0 1px var(--pura-border);
  }
  :host([size="sm"]) .more { width: 1.75rem; height: 1.75rem; font-size: var(--pura-text-xs); }
  :host([size="lg"]) .more { width: 3.5rem; height: 3.5rem; font-size: var(--pura-text-lg); }
`;

define("pura-avatar-group", PuraAvatarGroup, meta);
define("pura-avatar-more", PuraAvatarMore);
export { PuraAvatarGroup, PuraAvatarMore };
