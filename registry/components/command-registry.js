// <pura-command-registry> — AGENT-NATIVE (WebMCP-style) capability registry.
// Invisible UI. Collects <pura-command-action> children and registers them on a
// global window.__puraCommands so an agent (or a command palette) can enumerate
// and invoke page capabilities programmatically.
//
// Attributes: namespace (optional string, prefixes ids in the global registry),
//   disabled (boolean, hides all owned actions from list()/run()).
// Slots: default = one or more <pura-command-action> elements.
// API:
//   .list()            -> Array<{ id, title, description, keywords, disabled, namespace }>
//   .run(id, args)     -> result of the matching action's invoke (or throws if unknown)
//   .get(id)           -> the <pura-command-action> element for id (or null)
//   .register(el)/.unregister(el) — managed automatically via slotchange.
// Events (bubble, composed): 'register', 'unregister', 'run' (detail: { id, action, args }).
//
// Global window.__puraCommands (created lazily, shared across all registries):
//   .list()            -> flat array of all action descriptors across registries
//   .run(id, args)     -> invoke an action by (namespaced) id, returns its result
//   .get(id)           -> descriptor for id
//   .subscribe(fn)     -> fn(list) on any change; returns an unsubscribe function
//   .version           -> registry protocol version string
//
// <pura-command-action> — a single invocable capability. Invisible by default.
// Attributes: id (required for addressing; auto-generated if absent), title,
//   description, keywords (space/comma separated), disabled, when (CSS selector
//   that must match in document for the action to be enabled, optional).
// API: .invoke(args) — runs the action; dispatches 'run' { detail: { id, args } }.
//   .descriptor() — machine-readable {} describing the action.
// Set .handler = (args, action) => result to give it imperative behavior;
// otherwise invoking just emits 'run' for listeners to react to.
import { PuraElement, define } from "../base.js";
import meta from "./command-registry.meta.js";

const PROTOCOL_VERSION = "1.0";
let uid = 0;

// ---------------------------------------------------------------------------
// global registry (window.__puraCommands) — shared singleton
// ---------------------------------------------------------------------------
function ensureGlobal() {
  if (typeof window === "undefined") return null;
  if (window.__puraCommands && window.__puraCommands.__pura) return window.__puraCommands;

  const registries = new Set();
  const subscribers = new Set();

  const notify = () => {
    const snapshot = api.list();
    for (const fn of [...subscribers]) {
      try { fn(snapshot); } catch (_) { /* swallow subscriber errors */ }
    }
  };

  const api = {
    __pura: true,
    version: PROTOCOL_VERSION,
    // internal hooks used by registries
    _attach(reg) { registries.add(reg); notify(); },
    _detach(reg) { registries.delete(reg); notify(); },
    _changed() { notify(); },
    // public, machine-readable surface
    list() {
      const out = [];
      for (const reg of registries) {
        try { out.push(...reg.list()); } catch (_) { /* skip broken registry */ }
      }
      return out;
    },
    get(id) {
      return api.list().find((d) => d.id === id) || null;
    },
    run(id, args) {
      for (const reg of registries) {
        const el = reg.get(id);
        if (el) return el.invoke(args);
      }
      throw new Error(`pura: no command registered with id "${id}"`);
    },
    subscribe(fn) {
      if (typeof fn !== "function") return () => {};
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    },
  };

  window.__puraCommands = api;
  return api;
}

// ---------------------------------------------------------------------------
// <pura-command-action>
// ---------------------------------------------------------------------------
class PuraCommandAction extends PuraElement {
  static observedAttributes = ["id", "title", "description", "keywords", "disabled", "when"];

  connectedCallback() {
    if (!this.getAttribute("id")) this.setAttribute("id", `pura-cmd-${uid++}`);
    // Invisible by default, but render through the helper to stay on-convention
    // and to expose a machine-readable part for tooling / a11y trees.
    this.render(
      `<span part="action" hidden></span>`,
      CSS
    );
    // ARIA + stable data-* so an a11y tree / agent can read capabilities even
    // without touching the JS registry.
    this.setAttribute("role", "button");
    this.setAttribute("data-pura-command", "");
    this._syncMachineAttrs();
    // Let the owning registry pick it up (registry also scans on slotchange).
    this.dispatchEvent(new CustomEvent("pura-action-connected", { bubbles: true, composed: true }));
  }

  attributeChangedCallback() {
    if (!this.isConnected) return;
    this._syncMachineAttrs();
    // ask the global to re-notify subscribers (palettes, agents)
    ensureGlobal()?._changed();
  }

  _syncMachineAttrs() {
    const title = this.getAttribute("title") || "";
    const desc = this.getAttribute("description") || "";
    if (title) this.setAttribute("aria-label", title);
    else this.removeAttribute("aria-label");
    if (desc) this.setAttribute("aria-description", desc);
    else this.removeAttribute("aria-description");
    this.setAttribute("aria-disabled", this.isEnabled() ? "false" : "true");
    this.setAttribute("data-pura-command-id", this.getAttribute("id") || "");
  }

  // Whether this action may currently run (not disabled + `when` selector matches).
  isEnabled() {
    if (this.hasAttribute("disabled")) return false;
    const when = this.getAttribute("when");
    if (when) {
      try { if (!document.querySelector(when)) return false; }
      catch (_) { /* invalid selector → treat as no constraint */ }
    }
    return true;
  }

  keywords() {
    const raw = this.getAttribute("keywords") || "";
    return raw.split(/[\s,]+/).map((s) => s.trim()).filter(Boolean);
  }

  // Machine-readable description of this capability.
  descriptor() {
    return {
      id: this.getAttribute("id") || "",
      title: this.getAttribute("title") || "",
      description: this.getAttribute("description") || "",
      keywords: this.keywords(),
      disabled: !this.isEnabled(),
      namespace: this._namespace || null,
    };
  }

  // Invoke the capability. Emits 'run' and calls an optional `.handler`.
  // Returns the handler's result (undefined if none). No-op when disabled.
  invoke(args) {
    if (!this.isEnabled()) {
      throw new Error(`pura: command "${this.getAttribute("id")}" is disabled`);
    }
    this.dispatchEvent(new CustomEvent("run", {
      bubbles: true, composed: true,
      detail: { id: this.getAttribute("id"), args: args ?? null, action: this },
    }));
    if (typeof this.handler === "function") {
      return this.handler(args, this);
    }
    return undefined;
  }
}

const CSS = `
  :host { display: none !important; }
  [part="action"] { display: none; }
`;

// ---------------------------------------------------------------------------
// <pura-command-registry>
// ---------------------------------------------------------------------------
class PuraCommandRegistry extends PuraElement {
  static observedAttributes = ["disabled", "namespace"];

  connectedCallback() {
    this._name = `--pura-cmdreg-${uid++}`;
    // Invisible host; render through the helper to follow house conventions.
    // role=region + aria-label keeps it discoverable in the a11y tree without
    // showing any pixels.
    this.render(
      `<div part="registry" role="region" aria-hidden="true" hidden><slot></slot></div>`,
      REGISTRY_CSS.replaceAll("ANCHOR", this._name)
    );
    this.setAttribute("data-pura-command-registry", "");
    if (!this.hasAttribute("aria-label")) {
      this.setAttribute("aria-label", "Command registry");
    }

    this._slot = this.$("slot");
    this._onSlotChange = () => this._sync();
    this._slot.addEventListener("slotchange", this._onSlotChange);

    // Catch actions announcing themselves (handles dynamic insertion too).
    this._onActionConnected = (e) => {
      if (e.target instanceof PuraCommandAction) this._sync();
    };
    this.addEventListener("pura-action-connected", this._onActionConnected);

    // Re-emit child 'run' so listeners on the registry hear every invocation.
    this._onRun = (e) => {
      if (!(e.target instanceof PuraCommandAction)) return;
      // event already bubbles past us; nothing to re-dispatch, but keep hook
      // available for future aggregation. Intentionally left as a pass-through.
    };
    this.addEventListener("run", this._onRun);

    this._global = ensureGlobal();
    this._global?._attach(this);
    this._sync();
  }

  disconnectedCallback() {
    this._slot?.removeEventListener("slotchange", this._onSlotChange);
    this.removeEventListener("pura-action-connected", this._onActionConnected);
    this.removeEventListener("run", this._onRun);
    this._global?._detach(this);
  }

  attributeChangedCallback() {
    if (!this.isConnected) return;
    this._sync();
  }

  // Re-scan owned actions, stamp them with this registry's namespace, then tell
  // the global registry that something changed (drives subscribers/palettes).
  _sync() {
    const ns = this.getAttribute("namespace") || null;
    for (const el of this._actionEls()) {
      el._namespace = ns;
    }
    ensureGlobal()?._changed();
    this.dispatchEvent(new CustomEvent("register", { bubbles: true, composed: true }));
  }

  // The <pura-command-action> elements assigned to the default slot.
  _actionEls() {
    if (!this._slot) {
      return [...this.querySelectorAll("pura-command-action")];
    }
    const assigned = this._slot.assignedElements({ flatten: true });
    const out = [];
    for (const node of assigned) {
      if (node instanceof PuraCommandAction) out.push(node);
      // also collect nested actions (e.g. wrapped in a group element)
      out.push(...node.querySelectorAll("pura-command-action"));
    }
    return out;
  }

  // Compose the externally-addressable id: namespace prefix when present.
  _idOf(el) {
    const base = el.getAttribute("id") || "";
    const ns = this.getAttribute("namespace");
    return ns ? `${ns}:${base}` : base;
  }

  // ---- public API ---------------------------------------------------------

  // Enumerate this registry's capabilities as machine-readable descriptors.
  list() {
    if (this.hasAttribute("disabled")) return [];
    return this._actionEls().map((el) => {
      const d = el.descriptor();
      return { ...d, id: this._idOf(el) };
    });
  }

  // Resolve an addressable id to its <pura-command-action> element.
  get(id) {
    if (this.hasAttribute("disabled")) return null;
    return this._actionEls().find((el) => this._idOf(el) === id || el.getAttribute("id") === id) || null;
  }

  // Invoke a capability by id. Throws if unknown or disabled.
  run(id, args) {
    const el = this.get(id);
    if (!el) throw new Error(`pura: no command registered with id "${id}"`);
    return el.invoke(args);
  }

  register(el) {
    if (el instanceof PuraCommandAction && !el.isConnected) this.appendChild(el);
    this._sync();
  }

  unregister(el) {
    if (el instanceof PuraCommandAction && el.parentNode === this) this.removeChild(el);
    this._sync();
  }
}

const REGISTRY_CSS = `
  :host { display: none !important; }
  .anchor { anchor-name: ANCHOR; }
  [part="registry"] { display: none; }
`;

define("pura-command-action", PuraCommandAction);
define("pura-command-registry", PuraCommandRegistry, meta);

export { PuraCommandRegistry, PuraCommandAction };
