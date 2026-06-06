// <pura-inspector> — a floating dev tool. Click the bubble to enter inspect
// mode: hovering highlights the nearest <pura-*> element with a colored overlay;
// clicking it opens a floating panel to edit that component's attributes LIVE
// (the component re-renders instantly because its API is its attributes).
// Edits persist in localStorage and can be exported as updated HTML.
//
// Attributes:
//   position — corner of the bubble: bottom-left (default) | bottom-right | top-left | top-right
//   hidden-in-prod — (informational) the host app decides whether to mount it.
// API: .activate() / .deactivate() / .toggle().
//
// Standalone + framework-agnostic. No backend: "Save" persists to localStorage
// and copies the updated markup. (Source-file saving needs a build plugin that
// injects data-pura-loc + a dev endpoint — phase 2.)
import { PuraElement, define } from "../base.js";
import meta from "./inspector.meta.js";

// attributes that read as boolean toggles across the pura set
const BOOL = new Set([
  "disabled", "checked", "open", "loading", "readonly", "required", "full", "dot",
  "striped", "indeterminate", "current", "active", "featured", "selected", "loop",
  "dismissible", "numbered", "bordered", "hover", "allow-half", "multiple", "visible", "launcher",
]);
// known enum attributes → rendered as a <select> dropdown
const ENUMS = {
  variant: ["primary", "secondary", "ghost", "danger", "outline", "success", "warning", "info"],
  size: ["sm", "md", "lg"],
  side: ["right", "left", "top", "bottom"],
  placement: ["top", "bottom", "left", "right"],
  position: ["bottom-right", "bottom-left", "top-right", "top-left"],
  orientation: ["horizontal", "vertical"],
  direction: ["row", "col", "row-reverse", "col-reverse"],
  align: ["start", "center", "end", "stretch", "baseline"],
  justify: ["start", "center", "end", "between", "around", "evenly"],
  type: ["single", "multiple"],
  trend: ["up", "down", "flat"],
  status: ["online", "offline", "busy"],
  level: ["info", "tip", "warning"],
  weight: ["normal", "medium", "semibold", "bold"],
  leading: ["tight", "normal", "relaxed"],
  fit: ["cover", "contain", "fill"],
  marker: ["disc", "decimal", "none", "check"],
  radius: ["sm", "md", "lg", "full"],
  shadow: ["none", "sm", "md", "lg"],
  as: ["p", "span", "div"],
  axis: ["both", "x", "y"],
};
// pura design tokens offered in the color dropdown (value -> var(--pura-*))
const COLOR_TOKENS = [
  ["primary", "--pura-primary"], ["accent", "--pura-accent"], ["fg", "--pura-fg"],
  ["muted", "--pura-muted"], ["muted-fg", "--pura-muted-fg"], ["subtle", "--pura-subtle"],
  ["bg", "--pura-bg"], ["border", "--pura-border"], ["success", "--pura-success"],
  ["warning", "--pura-warning"], ["danger", "--pura-danger"],
];
// attribute names that take a color value → color control
const COLOR_ATTRS = new Set(["color", "bg", "background", "fill", "stroke", "accent", "tint"]);
const isColorAttr = (name, val) => COLOR_ATTRS.has(name) || /^(#([0-9a-f]{3,8})|var\(--pura-)/i.test(val || "");
// common CSS props for the style mini-editor
const STYLE_PROPS = [
  ["display", "select", ["", "block", "flex", "inline-flex", "grid", "inline", "none"]],
  ["width", "text"], ["height", "text"], ["padding", "text"], ["margin", "text"],
  ["gap", "text"], ["align-items", "select", ["", "start", "center", "end", "stretch"]],
  ["justify-content", "select", ["", "flex-start", "center", "flex-end", "space-between"]],
  ["background", "text"], ["color", "text"], ["border", "text"], ["border-radius", "text"],
];

let uid = 0;
const STORE = "pura-inspector-overrides";

class PuraInspector extends PuraElement {
  connectedCallback() {
    this.render(HTML, CSS);
    this._bubble = this.$(".bubble");
    this._overlay = this.$(".overlay");
    this._box = this.$(".box");
    this._tip = this.$(".tip");
    this._panel = this.$(".panel");
    this._active = false;
    this._target = null;

    this._bubble.addEventListener("click", () => this.toggle());
    this.$(".close").addEventListener("click", () => this._closePanel());

    // bound handlers so we can add/remove cleanly
    this._onMove = (e) => this._hover(e);
    this._onClick = (e) => this._pick(e);
    this._onKey = (e) => { if (e.key === "Escape") this.deactivate(); };
    // keep the highlight box + (anchored) panel glued to the element on scroll/resize
    this._onScroll = () => { if (this._target) { this._drawBox(this._target); this._positionPanel(this._target); } };
    this._onResize = this._onScroll;

    this._wireDrag();

    // re-apply saved overrides once the page's components have defined
    queueMicrotask(() => this._restore());
  }

  // Drag the panel by its header. Once dragged, it stops auto-anchoring.
  _wireDrag() {
    const header = this.$(".panel header");
    if (!header) return;
    header.addEventListener("pointerdown", (e) => {
      if (e.target.closest("button")) return; // let header buttons work
      e.preventDefault();
      const r = this._panel.getBoundingClientRect();
      const ox = e.clientX - r.left, oy = e.clientY - r.top;
      this._dragged = true;
      header.setPointerCapture(e.pointerId);
      const move = (ev) => {
        const left = Math.max(4, Math.min(window.innerWidth - r.width - 4, ev.clientX - ox));
        const top = Math.max(4, Math.min(window.innerHeight - 40, ev.clientY - oy));
        this._panel.style.left = left + "px";
        this._panel.style.top = top + "px";
      };
      const up = (ev) => { header.releasePointerCapture(e.pointerId); header.removeEventListener("pointermove", move); header.removeEventListener("pointerup", up); };
      header.addEventListener("pointermove", move);
      header.addEventListener("pointerup", up);
    });
  }

  disconnectedCallback() { this.deactivate(); }

  toggle() { this._active ? this.deactivate() : this.activate(); }

  activate() {
    this._active = true;
    this.setAttribute("active", "");
    this._overlay.style.display = "block";
    document.addEventListener("mousemove", this._onMove, true);
    document.addEventListener("click", this._onClick, true);
    document.addEventListener("keydown", this._onKey, true);
    window.addEventListener("scroll", this._onScroll, true);
    window.addEventListener("resize", this._onResize, true);
  }

  deactivate() {
    this._active = false;
    this.removeAttribute("active");
    this._overlay.style.display = "none";
    this._box.style.display = "none";
    this._closePanel();
    document.removeEventListener("mousemove", this._onMove, true);
    document.removeEventListener("click", this._onClick, true);
    document.removeEventListener("keydown", this._onKey, true);
    window.removeEventListener("scroll", this._onScroll, true);
  }

  // element under the cursor — ANY element (pura components, divs, etc.),
  // skipping the inspector's own UI.
  _nearest(x, y) {
    let el = document.elementFromPoint(x, y);
    while (el && this._isSelf(el)) el = el.parentElement;
    return el || null;
  }
  _isSelf(el) {
    if (el === this) return true;
    const t = el.tagName && el.tagName.toLowerCase();
    if (t === "pura-inspector") return true;
    const root = el.getRootNode();
    return root instanceof ShadowRoot && root.host === this;
  }

  // Some components only read their attributes once (in connectedCallback) and
  // lack an attributeChangedCallback, so a live setAttribute won't reflect.
  // Re-inserting the node fires disconnected+connectedCallback → a fresh render
  // that reads the new attributes. The element reference stays the same.
  _forceRerender(el) {
    const parent = el.parentNode;
    if (!parent || el.tagName.toLowerCase() === "pura-inspector") return;
    const next = el.nextSibling;
    parent.removeChild(el);
    parent.insertBefore(el, next);
  }

  _onInspectorUI(e) {
    // true when the event originated inside the inspector's own UI (panel/bubble)
    return e.composedPath && e.composedPath().includes(this);
  }

  _hover(e) {
    if (this._panelOpen || this._onInspectorUI(e)) return;
    const el = this._nearest(e.clientX, e.clientY);
    if (!el) { this._box.style.display = "none"; return; }
    this._hovered = el;
    this._drawBox(el);
  }

  _drawBox(el) {
    const r = el.getBoundingClientRect();
    Object.assign(this._box.style, { display: "block", left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" });
    this._tip.textContent = `${el.tagName.toLowerCase()} · ${Math.round(r.width)}×${Math.round(r.height)}`;
  }

  _pick(e) {
    // clicks inside the inspector's own panel/bubble must NOT re-select the page
    if (this._onInspectorUI(e)) return;
    const el = this._nearest(e.clientX, e.clientY);
    if (!el) return;
    e.preventDefault();
    e.stopPropagation();
    this._openPanel(el);
  }

  _openPanel(el) {
    this._target = el;
    this._panelOpen = true;
    this._dragged = false; // new selection re-anchors the panel
    this._drawBox(el);
    const attrs = (el.constructor && el.constructor.observedAttributes) || [];
    const present = el.getAttributeNames().filter((n) => !n.startsWith("data-pura"));
    // always offer class + style so plain elements (divs) are tweakable
    const names = [...new Set([...attrs, ...present, "class", "style"])].sort();
    const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());

    this.$(".ptitle").textContent = el.tagName.toLowerCase();
    const rows = names.map((name) => this._row(el, name)).join("");
    const textRow = hasText
      ? `<label class="row"><span>slot text</span><input class="fld" data-text value="${esc(el.textContent.trim())}"></label>` : "";
    this.$(".fields").innerHTML = rows + textRow;

    // wire typed controls
    this.$$(".fld").forEach((inp) => inp.addEventListener("input", () => this._edit(inp)));
    this.$$(".chk").forEach((c) => c.addEventListener("change", () => this._edit(c)));
    this.$$(".sel").forEach((s) => s.addEventListener("change", () => this._edit(s)));
    // color control: token <select> + native picker, kept in sync
    this.$$(".csel").forEach((s) => s.addEventListener("change", () => this._editColor(s.dataset.attr)));
    this.$$(".cpick").forEach((p) => p.addEventListener("input", () => this._editColor(p.dataset.attr)));
    // style mini-editor
    this.$$("[data-style-toggle]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); this.$("[data-style-editor]")?.toggleAttribute("hidden"); }));
    this.$$("[data-style-prop]").forEach((c) => c.addEventListener("input", () => this._editStyle()));

    this._panel.style.display = "flex";
    this._positionPanel(el);
  }

  _row(el, name) {
    const val = el.getAttribute(name);
    // boolean → toggle
    if (BOOL.has(name)) {
      return `<label class="row"><span>${name}</span><input type="checkbox" class="chk" data-attr="${name}" ${val !== null ? "checked" : ""}></label>`;
    }
    // enum → <select>
    if (ENUMS[name]) {
      const opts = ['<option value="">—</option>', ...ENUMS[name].map((o) => `<option ${o === val ? "selected" : ""}>${o}</option>`)].join("");
      return `<label class="row"><span>${name}</span><select class="sel" data-attr="${name}">${opts}</select></label>`;
    }
    // style → text + ⚙ that opens a CSS mini-editor
    if (name === "style") {
      const ed = STYLE_PROPS.map(([prop, kind, opts]) => {
        const cur = this._styleGet(val, prop);
        if (kind === "select") {
          const o = opts.map((x) => `<option value="${x}" ${x === cur ? "selected" : ""}>${x || "—"}</option>`).join("");
          return `<label class="srow"><span>${prop}</span><select class="sed" data-style-prop="${prop}">${o}</select></label>`;
        }
        return `<label class="srow"><span>${prop}</span><input class="sed" data-style-prop="${prop}" value="${esc(cur)}" placeholder="—"></label>`;
      }).join("");
      return `<label class="row"><span>style</span><span class="stylefld"><input class="fld" data-attr="style" value="${esc(val ?? "")}"><button class="gear" data-style-toggle title="Edit CSS">⚙</button></span></label>
        <div class="styleed" data-style-editor hidden>${ed}</div>`;
    }
    // color → swatch + token dropdown + native picker
    if (isColorAttr(name, val)) {
      const opts = ['<option value="">custom…</option>', ...COLOR_TOKENS.map(([k, tok]) => `<option value="var(${tok})" ${val === `var(${tok})` ? "selected" : ""}>${k}</option>`)].join("");
      const isVar = /^var\(/.test(val || "");
      return `<div class="row"><span>${name}</span><span class="colorctl">
        <span class="cdot" style="background:${val || "transparent"}"></span>
        <select class="csel" data-attr="${name}">${opts}</select>
        <input type="color" class="cpick" data-attr="${name}" value="${isVar || !val ? "#000000" : val}" title="custom color">
      </span></div>`;
    }
    // default → text
    return `<label class="row"><span>${name}</span><input class="fld" data-attr="${name}" value="${esc(val ?? "")}" placeholder="—"></label>`;
  }

  // ---- color control ----
  _editColor(name) {
    const sel = this.$(`.csel[data-attr="${name}"]`);
    const pick = this.$(`.cpick[data-attr="${name}"]`);
    // a token selection wins; otherwise use the custom picker value
    const val = sel && sel.value ? sel.value : (pick ? pick.value : "");
    this._setAttr(name, val);
    const dot = this.$(`.colorctl .cdot`); // closest dot in this row
    this.$$(".colorctl").forEach((c) => { const s = c.querySelector(".csel"); if (s && s.dataset.attr === name) c.querySelector(".cdot").style.background = val || "transparent"; });
  }

  // ---- style mini-editor ----
  _styleGet(styleStr, prop) {
    const m = (styleStr || "").split(";").map((s) => s.trim()).find((s) => s.toLowerCase().startsWith(prop + ":"));
    return m ? m.slice(prop.length + 1).trim() : "";
  }
  _editStyle() {
    const parts = [];
    this.$$("[data-style-prop]").forEach((c) => { if (c.value) parts.push(`${c.dataset.styleProp}: ${c.value}`); });
    const css = parts.join("; ");
    this._setAttr("style", css);
    const raw = this.$('.fld[data-attr="style"]'); if (raw) raw.value = css;
  }

  // set/remove an attribute + re-render + persist (shared by typed controls)
  _setAttr(name, value) {
    if (!this._target) return;
    if (value === "" || value == null) this._target.removeAttribute(name);
    else this._target.setAttribute(name, value);
    this._forceRerender(this._target);
    this._drawBox(this._target);
    this._save();
  }

  _edit(ctrl) {
    if (!this._target) return;
    if (ctrl.dataset.text !== undefined) { this._target.textContent = ctrl.value; this._forceRerender(this._target); this._drawBox(this._target); this._save(); return; }
    const name = ctrl.dataset.attr;
    if (ctrl.type === "checkbox") {
      ctrl.checked ? this._target.setAttribute(name, "") : this._target.removeAttribute(name);
    } else {
      ctrl.value === "" ? this._target.removeAttribute(name) : this._target.setAttribute(name, ctrl.value);
    }
    // force components that don't observe the attribute to re-render
    this._forceRerender(this._target);
    this._drawBox(this._target);
    this._save();
  }

  // ---- persistence (best-effort, by structural path) ----
  _path(el) {
    const parts = [];
    let n = el;
    while (n && n.nodeType === 1 && n.tagName.toLowerCase() !== "body") {
      const tag = n.tagName.toLowerCase();
      const i = [...(n.parentNode ? n.parentNode.children : [])].filter((c) => c.tagName === n.tagName).indexOf(n);
      parts.unshift(`${tag}:${i}`);
      n = n.parentElement;
    }
    return parts.join(">");
  }
  _allStore() { try { return JSON.parse(localStorage.getItem(STORE) || "{}"); } catch { return {}; } }
  _save() {
    if (!this._target) return;
    const data = this._allStore();
    const key = location.pathname + "::" + this._path(this._target);
    const o = {};
    this._target.getAttributeNames().forEach((n) => { if (!n.startsWith("data-pura")) o[n] = this._target.getAttribute(n); });
    data[key] = { attrs: o, text: this._target.textContent.trim() };
    try { localStorage.setItem(STORE, JSON.stringify(data)); } catch {}
  }
  _restore() {
    const data = this._allStore();
    Object.entries(data).forEach(([key, v]) => {
      if (!key.startsWith(location.pathname + "::")) return;
      const path = key.split("::")[1];
      const el = this._fromPath(path);
      if (!el) return;
      Object.entries(v.attrs || {}).forEach(([n, val]) => el.setAttribute(n, val));
      if (typeof v.text === "string" && v.text) el.textContent = v.text;
      this._forceRerender(el);
    });
  }
  _fromPath(path) {
    let node = document.body;
    for (const part of path.split(">")) {
      const [tag, idx] = part.split(":");
      const matches = [...node.children].filter((c) => c.tagName.toLowerCase() === tag);
      node = matches[Number(idx)];
      if (!node) return null;
    }
    return node;
  }

  // Anchor the panel to the element's vertical middle, beside it, flipping side
  // and clamping vertically so it is always fully on screen. No-op once dragged.
  _positionPanel(el) {
    if (this._dragged) return;
    const r = el.getBoundingClientRect();
    const gap = 12;
    const pw = this._panel.offsetWidth || 300;
    const ph = Math.min(this._panel.offsetHeight || 320, window.innerHeight - 2 * gap);
    // horizontal: prefer right of the element, else left, else clamp on-screen
    let left = r.right + gap;
    if (left + pw > window.innerWidth - gap) left = r.left - pw - gap;
    left = Math.max(gap, Math.min(left, window.innerWidth - pw - gap));
    // vertical: centered on the element's middle, clamped into the viewport
    let top = r.top + r.height / 2 - ph / 2;
    top = Math.max(gap, Math.min(top, window.innerHeight - ph - gap));
    this._panel.style.left = left + "px";
    this._panel.style.top = top + "px";
    this._panel.style.maxHeight = `calc(100dvh - ${2 * gap}px)`;
  }

  _closePanel() {
    this._panelOpen = false;
    this._panel.style.display = "none";
  }
}

function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }

const HTML = `
  <button class="bubble" part="bubble" aria-label="Inspect components" title="Inspect components">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 3l7.5 18 2.5-7 7-2.5z"/></svg>
  </button>
  <div class="overlay">
    <div class="box"><span class="tip"></span></div>
  </div>
  <aside class="panel" part="panel" role="dialog" aria-label="Edit component">
    <header><b class="ptitle"></b>
      <button class="copy" title="Copy element HTML">Copy</button>
      <button class="close" aria-label="Close">✕</button>
    </header>
    <div class="fields"></div>
    <footer><span>Edits saved to localStorage</span></footer>
  </aside>`;

const CSS = `
  :host { font-family: var(--pura-font); }
  .bubble { position: fixed; z-index: 2147483600; width: 44px; height: 44px; border-radius: 999px;
    display: grid; place-items: center; cursor: pointer; border: 1px solid var(--pura-border);
    background: var(--pura-bg); color: var(--pura-fg); box-shadow: var(--pura-shadow-lg); }
  .bubble:hover { background: var(--pura-subtle); }
  :host([active]) .bubble { background: var(--pura-primary); color: var(--pura-primary-fg); border-color: transparent; }
  :host(:not([position])) .bubble, :host([position="bottom-left"]) .bubble { left: 18px; bottom: 18px; }
  :host([position="bottom-right"]) .bubble { right: 18px; bottom: 18px; }
  :host([position="top-left"]) .bubble { left: 18px; top: 18px; }
  :host([position="top-right"]) .bubble { right: 18px; top: 18px; }

  .overlay { display: none; position: fixed; inset: 0; z-index: 2147483500; pointer-events: none; }
  .box { display: none; position: fixed; pointer-events: none; box-sizing: border-box;
    background: color-mix(in srgb, var(--pura-accent) 14%, transparent);
    border: 1px solid var(--pura-accent); border-radius: 3px; transition: all .04s linear; }
  .tip { position: absolute; top: -22px; left: 0; white-space: nowrap; font-size: 11px; font-weight: 600;
    background: var(--pura-accent); color: #fff; padding: 1px 6px; border-radius: 4px; }

  .panel { display: none; position: fixed; z-index: 2147483601; flex-direction: column; width: 300px; max-height: 72vh;
    background: var(--pura-bg); color: var(--pura-fg); border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius-lg); box-shadow: var(--pura-shadow-lg); overflow: hidden; }
  .panel header { display: flex; align-items: center; gap: .5rem; padding: .6rem .75rem; border-bottom: 1px solid var(--pura-border); cursor: move; touch-action: none; user-select: none; }
  .panel header b { flex: 1; font-family: var(--pura-font-mono); font-size: .82rem; }
  .panel header button { font: inherit; font-size: .72rem; cursor: pointer; background: var(--pura-bg); color: var(--pura-muted-fg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm); padding: 2px 7px; }
  .panel header .close { border: none; font-size: .9rem; color: var(--pura-muted); }
  .fields { padding: .5rem .75rem; overflow-y: auto; display: flex; flex-direction: column; gap: .4rem; flex: 1; min-height: 0; }
  .row { display: flex; align-items: center; justify-content: space-between; gap: .6rem; font-size: .8rem; }
  .row span { color: var(--pura-muted-fg); font-family: var(--pura-font-mono); font-size: .72rem; }
  .row .fld { width: 150px; font: inherit; font-size: .76rem; padding: 3px 7px; border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius-sm); background: var(--pura-bg); color: var(--pura-fg); }
  .row .chk { width: 16px; height: 16px; accent-color: var(--pura-primary); }
  .row .sel { width: 162px; font: inherit; font-size: .76rem; padding: 3px 6px; border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius-sm); background: var(--pura-bg); color: var(--pura-fg); cursor: pointer; }
  .colorctl { display: inline-flex; align-items: center; gap: 5px; }
  .colorctl .cdot { width: 18px; height: 18px; border-radius: 5px; border: 1px solid var(--pura-border); flex: none; }
  .colorctl .csel { width: 96px; font: inherit; font-size: .72rem; padding: 3px 5px; border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius-sm); background: var(--pura-bg); color: var(--pura-fg); cursor: pointer; }
  .colorctl .cpick { width: 26px; height: 24px; padding: 0; border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm); background: none; cursor: pointer; flex: none; }
  .stylefld { display: inline-flex; align-items: center; gap: 4px; }
  .stylefld .fld { width: 124px; }
  .gear { font: inherit; font-size: .8rem; line-height: 1; cursor: pointer; background: var(--pura-bg); color: var(--pura-muted-fg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm); padding: 3px 6px; }
  .gear:hover { background: var(--pura-subtle); }
  .styleed { display: grid; gap: 4px; margin: 2px 0 4px; padding: .5rem; background: var(--pura-subtle); border-radius: var(--pura-radius-sm); }
  .srow { display: flex; align-items: center; justify-content: space-between; gap: .5rem; }
  .srow span { font-family: var(--pura-font-mono); font-size: .66rem; color: var(--pura-muted-fg); }
  .srow .sed { width: 130px; font: inherit; font-size: .72rem; padding: 2px 6px; border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius-sm); background: var(--pura-bg); color: var(--pura-fg); }
  .panel footer { padding: .45rem .75rem; border-top: 1px solid var(--pura-border); font-size: .68rem; color: var(--pura-muted); }
`;

// wire the Copy button after first render via event delegation
class _Patched extends PuraInspector {
  connectedCallback() {
    super.connectedCallback();
    this.$(".copy").addEventListener("click", () => {
      if (!this._target) return;
      navigator.clipboard?.writeText(this._target.outerHTML);
      const b = this.$(".copy"); const o = b.textContent; b.textContent = "Copied"; setTimeout(() => (b.textContent = o), 1200);
    });
  }
}

define("pura-inspector", _Patched, meta);
export { _Patched as PuraInspector };
