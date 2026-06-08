// <pura-presence> — realtime-style presence stack. Overlapping <pura-avatar>
// children (each carrying a `status`), a derived online count, and a subtle live
// pulse. Demo/static data is driven entirely by the slotted children; `max`
// collapses the overflow into a trailing "+N" bubble that opens a popover
// listing the remaining people.
// Attributes:
//   max   — max avatars shown before collapsing into "+N" (number; 0/absent = all)
//   size  — passthrough applied to every slotted <pura-avatar> (sm | md | lg)
//   label — accessible name for the presence stack (default: "Online presence")
// Slots: default = the <pura-avatar> children (use status="online|busy|offline").
// Events: pura-overflow-toggle ({ open }) when the +N roster popover opens/closes.
// Agent-native: role="group", live count region, stable data-* (data-pura,
// data-total, data-online, data-overflow) on host + inner group, and a
// window.__puraPresence registry keyed by instance id.
import { PuraElement, define } from "../base.js";
import meta from "./presence.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { presenceTemplate } from "./presence.template.js";

registerMessages({
  "presence.label": {
    en: "Online presence",
    "pt-BR": "Presença online",
    fr: "Présence en ligne",
    de: "Online-Präsenz",
    it: "Presenza online",
  },
  "presence.members": {
    en: "Online members",
    "pt-BR": "Membros online",
    fr: "Membres en ligne",
    de: "Online-Mitglieder",
    it: "Membri online",
  },
  "presence.member": {
    en: "Member",
    "pt-BR": "Membro",
    fr: "Membre",
    de: "Mitglied",
    it: "Membro",
  },
  "presence.more": {
    en: "{n} more",
    "pt-BR": "mais {n}",
    fr: "{n} de plus",
    de: "{n} weitere",
    it: "altri {n}",
  },
  "presence.online": {
    en: "{n} online",
    "pt-BR": "{n} online",
    fr: "{n} en ligne",
    de: "{n} online",
    it: "{n} online",
  },
});

let uid = 0;

// Global machine-readable registry of every live presence instance.
const REGISTRY = (window.__puraPresence ||= new Map());

class PuraPresence extends PuraElement {
  static observedAttributes = ["max", "size", "label"];

  connectedCallback() {
    if (!this._id) {
      this._n = uid++;
      this._id = `pura-presence-${this._n}`;
    }
    this._anchor = `--pura-presence-${this._n}`;
    const label = this.getAttribute("label") || t("presence.label");

    const { html, css } = presenceTemplate(this);
    this.render(html, css);

    this._presence = this.$('[part="presence"]');
    this._more = this.$("#more");
    this._moreCount = this.$('[part="more-count"]');
    this._slot = this.$("slot");
    this._pop = this.$('[part="roster"]');
    this._rosterList = this.$('[part="roster-list"]');
    this._countText = this.$('[part="count-text"]');
    this._pulse = this.$('[part="pulse"]');

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

  // Update already-rendered i18n nodes in place (no re-render, no new listeners).
  _applyI18n() {
    if (!this._presence) return;
    // Group label: only the component-owned default tracks the locale; a
    // consumer-provided `label` attribute is left untouched.
    if (!this.getAttribute("label")) {
      this._presence.setAttribute("aria-label", t("presence.label"));
    }
    // Static roster aria-label.
    this._pop.setAttribute("aria-label", t("presence.members"));
    // Dynamic strings (more aria-label, count text, roster member names).
    this._sync();
  }

  attributeChangedCallback() {
    if (this._presence) this._sync();
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
      t("presence.member")
    );
  }

  _isOnline(av) {
    return av.getAttribute("status") === "online";
  }

  // Recompute visibility, size passthrough, online count, overflow + registry.
  _sync() {
    const avatars = this._avatars();
    const total = avatars.length;
    const online = avatars.filter((av) => this._isOnline(av)).length;

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
      this._more.setAttribute("aria-label", t("presence.more", { n: overflow }));
      if (size) this._more.setAttribute("data-size", size);
      else this._more.removeAttribute("data-size");

      // (re)build the roster of the remaining (hidden) people.
      this._rosterList.replaceChildren();
      for (let i = shown; i < total; i++) {
        const av = avatars[i];
        const li = document.createElement("li");
        li.className = "roster-item";
        li.setAttribute("part", "roster-item");
        if (this._isOnline(av)) li.setAttribute("data-online", "true");
        const dot = document.createElement("span");
        dot.className = "roster-dot";
        dot.setAttribute("part", "roster-dot");
        dot.setAttribute("data-status", av.getAttribute("status") || "offline");
        dot.setAttribute("aria-hidden", "true");
        const name = document.createElement("span");
        name.textContent = this._label(av);
        li.append(dot, name);
        this._rosterList.appendChild(li);
      }
    } else {
      this._more.hidden = true;
      this._more.setAttribute("aria-expanded", "false");
      if (this._pop.matches(":popover-open")) this._pop.hidePopover();
      this._rosterList.replaceChildren();
    }

    // Online count: derived, with a non-motion affordance (text + static color).
    // The pulse animation is decorative and stops under reduced-motion.
    this._countText.textContent = t("presence.online", { n: online });
    this._presence.toggleAttribute("data-live", online > 0);

    // machine-readable state on host + inner group.
    this.dataset.pura = "presence";
    this.dataset.total = String(total);
    this.dataset.online = String(online);
    this.dataset.overflow = String(overflow);
    this._presence.setAttribute("data-total", String(total));
    this._presence.setAttribute("data-online", String(online));
    this._presence.setAttribute("data-overflow", String(overflow));

    REGISTRY.set(this._id, this);
  }

  // Public, agent-callable API.
  get total() { return this._avatars().length; }
  get online() { return this._avatars().filter((av) => this._isOnline(av)).length; }
  get overflow() { return parseInt(this.dataset.overflow || "0", 10); }
  showRoster() { this._pop?.showPopover(); }
  hideRoster() { this._pop?.hidePopover(); }
}



define("pura-presence", PuraPresence, meta);
export { PuraPresence };
