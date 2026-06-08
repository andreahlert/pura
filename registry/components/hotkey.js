// <pura-hotkey> — AGENT-NATIVE, invisible declarative global keyboard-shortcut
// binder. It parses a key combo, listens on `document`, and fires a bubbling
// `trigger` event (optionally activating a `target` element) when the combo is
// pressed. It renders no chrome (display:contents) and never blocks layout.
//
// The combo language understands `mod` (⌘ on Apple platforms, Ctrl elsewhere),
// the other modifiers (ctrl/control/⌃, alt/option/opt/⌥, shift/⇧, meta/cmd/⌘)
// and a final printable key. Tokens may be "+"- or space-separated and are
// case-insensitive, e.g. keys="mod+k", keys="Ctrl Shift P", keys="⌘ /".
//
// Attributes:
//   keys      — the combo to bind (e.g. "mod+k"). Empty/absent => no binding.
//   target    — optional CSS selector; when the combo fires, the first match in
//               the document is activated (focus + click for buttons/links, or
//               .show()/.open()/.click() if exposed) so a hotkey can drive any
//               control declaratively without script.
//   when      — optional CSS selector that MUST match somewhere in the document
//               for the binding to be live (scope the shortcut to a state).
//   disabled  — boolean; while present the binding is inert.
//   allow-in-input — boolean; by default the combo is ignored while the user is
//               typing in an input/textarea/select/contenteditable. Set this to
//               let the hotkey fire even inside fields (pure-modifier combos
//               such as mod+k are always allowed regardless).
//   prevent-default — boolean (default ON for combos with a modifier); when set
//               the matched keydown's default browser action is prevented.
//
// Slots: none. The element is non-visual; any children flow through untouched.
//
// Events:
//   trigger — bubbling + composed CustomEvent fired on activation. detail:
//             { keys, combo, target, event } where `combo` is the parsed combo,
//             `target` is the activated element (or null) and `event` is the
//             originating KeyboardEvent.
//
// API:
//   .combo            -> parsed combo descriptor (or null)
//   .label            -> human/agent-readable rendering of the combo ("⌘K")
//   .matches(event)   -> boolean: does a KeyboardEvent satisfy this binding
//   .trigger(event?)  -> fire the binding programmatically (emit + activate)
//   .isEnabled()      -> boolean: not disabled and `when` (if any) matches
//
// Agent-native layer: each instance reflects stable data-* attributes onto the
// HOST (data-pura-hotkey id, data-keys, data-combo, data-target, data-disabled)
// and exposes role="application" semantics with an aria-keyshortcuts hint so the
// a11y tree and DOM crawlers can discover the binding. Every connected instance
// also registers itself in the global window.__puraHotkeys Map, keyed by id,
// with { id, keys, combo, label, target, el, trigger() } entries plus helpers
// .list(), .find(keys) and .trigger(keys) so an agent can enumerate and invoke
// every shortcut on the page without touching any shadow DOM.
import { PuraElement, define } from "../base.js";
import meta from "./hotkey.meta.js";
import { hotkeyTemplate } from "./hotkey.template.js";

// Module-level counter for stable, unique ids per instance (mirrors the
// anchor-name minting convention used by pura's floating components).
let uid = 0;

// Detect Apple-style platforms so `mod` maps to ⌘ (Meta) there and Ctrl
// elsewhere. Guarded for non-browser/SSR contexts.
const IS_APPLE = (() => {
  try {
    const p =
      (navigator.userAgentData && navigator.userAgentData.platform) ||
      navigator.platform ||
      navigator.userAgent ||
      "";
    return /mac|iphone|ipad|ipod/i.test(p);
  } catch (_) {
    return false;
  }
})();

// Symbols used when rendering a combo back to a human/agent-readable label.
const SYMBOLS = IS_APPLE
  ? { meta: "⌘", ctrl: "⌃", alt: "⌥", shift: "⇧" }
  : { meta: "Win", ctrl: "Ctrl", alt: "Alt", shift: "Shift" };

// Live global registry so agents can enumerate + invoke every hotkey on the
// page directly via window.__puraHotkeys, without reaching into shadow roots.
function registry() {
  if (!window.__puraHotkeys) {
    const map = new Map();
    // Snapshot of all connected bindings as machine-readable descriptors.
    map.list = () =>
      [...map.values()].map((h) => ({
        id: h.id,
        keys: h.keys,
        combo: h.combo,
        label: h.label,
        target: h.target,
      }));
    // All entries whose `keys` match the given combo string (normalized).
    map.find = (keys) => {
      const want = String(keys || "").trim().toLowerCase();
      return [...map.values()].filter(
        (h) => (h.keys || "").trim().toLowerCase() === want
      );
    };
    // Programmatically fire the first binding matching a combo string. Returns
    // true if something was triggered.
    map.trigger = (keys) => {
      const hit = map.find(keys)[0];
      if (hit && typeof hit.trigger === "function") {
        hit.trigger();
        return true;
      }
      return false;
    };
    window.__puraHotkeys = map;
  }
  return window.__puraHotkeys;
}

class PuraHotkey extends PuraElement {
  static observedAttributes = [
    "keys",
    "target",
    "when",
    "disabled",
    "allow-in-input",
    "prevent-default",
  ];

  connectedCallback() {
    if (this._id == null) this._id = `pura-hotkey-${uid++}`;

    // Non-visual: project any children through, expose nothing visible. The
    // semantic + machine-readable layer lives on the host in the light DOM.
    const { html, css } = hotkeyTemplate(this);
    this.render(html, css);

    // role=application keeps the (invisible) host in the a11y tree as an
    // interactive shortcut owner without claiming any visible widget role.
    if (!this.hasAttribute("role")) this.setAttribute("role", "application");

    this._combo = this._parseCombo(this.getAttribute("keys"));
    this._reflect();
    this._register();

    // Bind on the document so the shortcut is truly global. Capture phase keeps
    // it working even when inner handlers stop propagation.
    this._onKey = (e) => this._onKeydown(e);
    document.addEventListener("keydown", this._onKey, true);
  }

  disconnectedCallback() {
    if (this._onKey) document.removeEventListener("keydown", this._onKey, true);
    this._unregister();
  }

  attributeChangedCallback(name) {
    // attributeChangedCallback can fire before connectedCallback runs.
    if (!this.isConnected) return;
    if (name === "keys") this._combo = this._parseCombo(this.getAttribute("keys"));
    this._reflect();
    this._updateRegistry();
  }

  // --- public API ------------------------------------------------------------

  get combo() {
    return this._combo;
  }

  // Human/agent-readable rendering of the bound combo, e.g. "⌘K" / "Ctrl+Shift+P".
  get label() {
    const c = this._combo;
    if (!c) return "";
    const parts = [];
    if (c.meta) parts.push(SYMBOLS.meta);
    if (c.ctrl) parts.push(SYMBOLS.ctrl);
    if (c.alt) parts.push(SYMBOLS.alt);
    if (c.shift) parts.push(SYMBOLS.shift);
    if (c.key) parts.push(c.key.length === 1 ? c.key.toUpperCase() : c.key);
    // On Apple the modifier glyphs read better without separators.
    return IS_APPLE ? parts.join("") : parts.join("+");
  }

  // Whether the binding is currently live (not disabled + `when` selector, if
  // any, matches somewhere in the document).
  isEnabled() {
    if (this.hasAttribute("disabled")) return false;
    const when = this.getAttribute("when");
    if (when) {
      try {
        if (!document.querySelector(when)) return false;
      } catch (_) {
        /* invalid selector → treat as no constraint */
      }
    }
    return true;
  }

  // Does a KeyboardEvent satisfy this binding's combo + modifier state?
  matches(e) {
    const c = this._combo;
    if (!c || !e) return false;
    if (c.meta !== e.metaKey) return false;
    if (c.ctrl !== e.ctrlKey) return false;
    if (c.alt !== e.altKey) return false;
    // Only enforce shift when the combo explicitly requires it; printable keys
    // like "?" already imply shift and we don't want to double-count.
    if (c.shift && !e.shiftKey) return false;
    const pressed = (e.key || "").toLowerCase();
    return pressed === c.key;
  }

  // Fire the binding: activate the optional target, then emit `trigger`.
  // `event` is the originating KeyboardEvent when called from the listener.
  trigger(event = null) {
    const target = this._activateTarget();
    this.dispatchEvent(
      new CustomEvent("trigger", {
        bubbles: true,
        composed: true,
        detail: {
          keys: this.getAttribute("keys") || "",
          combo: this._combo,
          target,
          event,
        },
      })
    );
    return target;
  }

  // --- internals --------------------------------------------------------------

  _onKeydown(e) {
    if (!this._combo || !this.isEnabled()) return;
    if (!this.matches(e)) return;

    // Pure-modifier combos (e.g. mod+k) are safe to fire even inside fields;
    // single-key combos are suppressed while typing unless allow-in-input.
    const hasModifier = this._combo.meta || this._combo.ctrl || this._combo.alt;
    if (!hasModifier && !this.hasAttribute("allow-in-input") && this._isTyping(e.target)) {
      return;
    }

    if (this._shouldPreventDefault()) e.preventDefault();
    this.trigger(e);
  }

  // prevent-default is opt-in via attribute, but defaults ON for combos that
  // carry a modifier (those usually shadow browser/OS shortcuts like ⌘K).
  _shouldPreventDefault() {
    if (this.hasAttribute("prevent-default")) return true;
    const c = this._combo;
    return !!(c && (c.meta || c.ctrl || c.alt));
  }

  // Is the user currently typing into an editable element?
  _isTyping(t) {
    if (!t) return false;
    if (t.isContentEditable) return true;
    return /^(input|textarea|select)$/i.test(t.tagName || "");
  }

  // Resolve + activate the `target` selector. Prefers an exposed imperative API
  // (show/open) and falls back to focus()+click() for plain controls.
  _activateTarget() {
    const sel = this.getAttribute("target");
    if (!sel) return null;
    let el = null;
    try {
      el = document.querySelector(sel);
    } catch (_) {
      return null; // invalid selector degrades to no-op
    }
    if (!el) return null;
    try {
      if (typeof el.focus === "function") el.focus();
      if (typeof el.show === "function") el.show();
      else if (typeof el.open === "function") el.open();
      else if (typeof el.click === "function") el.click();
    } catch (_) {
      /* never let a misbehaving target throw out of the keydown handler */
    }
    return el;
  }

  // Parse "mod+k" / "Ctrl Shift P" / "⌘ /" into a normalized combo descriptor.
  // `mod` resolves to Meta on Apple platforms and Ctrl elsewhere. Returns null
  // when no printable key is present (an incomplete binding never fires).
  _parseCombo(raw) {
    if (!raw) return null;
    const tokens = String(raw).split(/[\s+]+/).filter(Boolean);
    const combo = { meta: false, ctrl: false, alt: false, shift: false, key: null };
    for (const tok of tokens) {
      const t = tok.toLowerCase();
      if (t === "mod") {
        if (IS_APPLE) combo.meta = true;
        else combo.ctrl = true;
      } else if (tok === "⌘" || t === "meta" || t === "cmd" || t === "command") {
        combo.meta = true;
      } else if (tok === "⌃" || t === "ctrl" || t === "control") {
        combo.ctrl = true;
      } else if (tok === "⌥" || t === "alt" || t === "option" || t === "opt") {
        combo.alt = true;
      } else if (tok === "⇧" || t === "shift") {
        combo.shift = true;
      } else {
        combo.key = tok.length === 1 ? tok.toLowerCase() : t;
      }
    }
    return combo.key ? combo : null;
  }

  // --- machine-readable layer -------------------------------------------------

  // Reflect the binding onto the HOST so DOM crawlers ([data-pura-hotkey]) and
  // assistive tech (aria-keyshortcuts) can discover it without any script.
  _reflect() {
    this.setAttribute("data-pura-hotkey", this._id);
    const keys = this.getAttribute("keys") || "";
    this.setAttribute("data-keys", keys);
    this.setAttribute("data-combo", this.label);
    const target = this.getAttribute("target");
    if (target) this.setAttribute("data-target", target);
    else this.removeAttribute("data-target");
    this.setAttribute("data-disabled", this.hasAttribute("disabled") ? "true" : "false");

    // aria-keyshortcuts uses the W3C token form (e.g. "Meta+K"). Build it from
    // the parsed combo so it stays in sync with what actually fires.
    const aria = this._ariaKeyshortcuts();
    if (aria) this.setAttribute("aria-keyshortcuts", aria);
    else this.removeAttribute("aria-keyshortcuts");
  }

  // W3C aria-keyshortcuts token string, e.g. "Meta+K" / "Control+Shift+P".
  _ariaKeyshortcuts() {
    const c = this._combo;
    if (!c) return "";
    const parts = [];
    if (c.meta) parts.push("Meta");
    if (c.ctrl) parts.push("Control");
    if (c.alt) parts.push("Alt");
    if (c.shift) parts.push("Shift");
    if (c.key) parts.push(c.key.length === 1 ? c.key.toUpperCase() : c.key);
    return parts.join("+");
  }

  _entry() {
    return {
      id: this._id,
      keys: this.getAttribute("keys") || "",
      combo: this._combo,
      label: this.label,
      target: this.getAttribute("target") || null,
      el: this,
      trigger: () => this.trigger(),
    };
  }

  _register() {
    registry().set(this._id, this._entry());
  }

  _updateRegistry() {
    registry().set(this._id, this._entry());
  }

  _unregister() {
    const reg = window.__puraHotkeys;
    if (reg) reg.delete(this._id);
  }
}


define("pura-hotkey", PuraHotkey, meta);

export { PuraHotkey };
export default PuraHotkey;
