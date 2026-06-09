// <pura-tour> — product tour / coachmarks. Steps through a sequence of targets,
// spotlighting each one and showing a coachmark popover with Back / Next / Done
// controls plus a step counter. The spotlight overlay is a native <dialog>
// (showModal → top layer + ESC + focus trap); the coachmark card is a native
// Popover positioned in JS relative to the target's bounding rect, with auto
// placement (bottom/top/right/left), viewport clamping, and a centered fallback
// when there is no target (CSS anchor positioning can't cross the shadow boundary).
//
// Steps are declared as <pura-tour-step> children:
//   <pura-tour-step target="#sel" title="Heading">Body text…</pura-tour-step>
// Attributes (<pura-tour>): open (reflects running state), index (current step,
//   reflected). API: start(i=0) / next() / back() / stop() / goTo(i).
// Events (bubbling CustomEvents): tour-start {detail:{total}},
//   tour-step {detail:{index,total,step}}, tour-end {detail:{completed}}.
// Agent-native: each tour registers in window.__puraTours keyed by id; the
//   dialog carries stable data-pura-tour / data-step / data-total / data-running
//   attributes and proper ARIA (role=dialog, aria-modal, labelled/described by
//   the coachmark title/body).
import { PuraElement, define } from "../base.js";
import meta from "./tour.meta.js";
import { tourStepTemplate } from "./tour.template.js";

let uid = 0;

// Global registry so agents / scripts can discover and drive tours.
const registry = (window.__puraTours = window.__puraTours || {});

class PuraTour extends PuraElement {
  static observedAttributes = ["index"];

  connectedCallback() {
    this._id = this.id || `pura-tour-${++uid}`;
    this._index = 0;
    this._running = false;
    this._target = null;

    this.render(
      `<dialog part="overlay" aria-modal="true" role="dialog"
               data-pura-tour="${this._id}" data-running="false">
         <div part="spotlight" class="spot" aria-hidden="true"></div>
         <section part="card" class="card"
                  popover="manual"
                  role="group"
                  aria-labelledby="t-title" aria-describedby="t-body">
           <header part="card-header" class="card-header">
             <h2 id="t-title" part="title" class="title"></h2>
             <span part="counter" class="counter" aria-hidden="true"></span>
           </header>
           <div id="t-body" part="body" class="body"></div>
           <footer part="footer" class="footer">
             <button part="skip" class="btn ghost skip" type="button">Skip</button>
             <span class="grow"></span>
             <button part="back" class="btn back" type="button">Back</button>
             <button part="next" class="btn primary next" type="button"></button>
           </footer>
         </section>
       </dialog>`,
      CSS
    );

    this._dlg = this.$("dialog");
    this._spot = this.$(".spot");
    this._card = this.$(".card");
    this._titleEl = this.$(".title");
    this._bodyEl = this.$(".body");
    this._counterEl = this.$(".counter");
    this._backBtn = this.$(".back");
    this._nextBtn = this.$(".next");
    this._skipBtn = this.$(".skip");

    this._backBtn.addEventListener("click", () => this.back());
    this._nextBtn.addEventListener("click", () => this.next());
    this._skipBtn.addEventListener("click", () => this.stop(false));

    // ESC / dialog dismissal ends the tour without completing.
    this._dlg.addEventListener("cancel", (e) => {
      e.preventDefault();
      this.stop(false);
    });
    this._dlg.addEventListener("close", () => {
      if (this._running) this.stop(false);
    });

    // Keep the spotlight + card aligned while the page scrolls / resizes.
    this._reposition = () => this._position();
    this._onKeydown = (e) => this._handleKeydown(e);

    registry[this._id] = this;

    if (this.hasAttribute("open")) queueMicrotask(() => this.start());
  }

  disconnectedCallback() {
    this._teardownListeners();
    if (registry[this._id] === this) delete registry[this._id];
    try { if (this._dlg?.open) this._dlg.close(); } catch (_) {}
  }

  attributeChangedCallback(name, _old, val) {
    if (name === "index" && this._running) {
      const i = parseInt(val, 10);
      if (!Number.isNaN(i) && i !== this._index) this.goTo(i);
    }
  }

  // ---- public API --------------------------------------------------------
  get steps() {
    return [...this.querySelectorAll(":scope > pura-tour-step")];
  }

  start(i = 0) {
    const steps = this.steps;
    if (!steps.length) return; // degrade gracefully: nothing to tour
    this._running = true;
    this.setAttribute("open", "");
    this._dlg.dataset.running = "true";
    try { if (!this._dlg.open) this._dlg.showModal(); } catch (_) {}
    try { this._card.showPopover(); } catch (_) {}
    window.addEventListener("scroll", this._reposition, true);
    window.addEventListener("resize", this._reposition);
    this._dlg.addEventListener("keydown", this._onKeydown);
    this.dispatchEvent(
      new CustomEvent("tour-start", { bubbles: true, detail: { total: steps.length } })
    );
    this.goTo(Math.min(Math.max(i, 0), steps.length - 1));
  }

  next() {
    const steps = this.steps;
    if (!this._running) return;
    if (this._index >= steps.length - 1) {
      this.stop(true);
      return;
    }
    this.goTo(this._index + 1);
  }

  back() {
    if (!this._running) return;
    if (this._index <= 0) return;
    this.goTo(this._index - 1);
  }

  goTo(i) {
    const steps = this.steps;
    if (!steps.length) return;
    i = Math.min(Math.max(i, 0), steps.length - 1);
    this._index = i;
    if (this.getAttribute("index") !== String(i)) this.setAttribute("index", String(i));

    const step = steps[i];
    const sel = step.getAttribute("target");
    this._releaseTarget();
    this._target = sel ? document.querySelector(sel) : null;
    if (this._target) {
      this._target.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
    }

    this._titleEl.textContent = step.getAttribute("title") || "";
    this._titleEl.style.display = this._titleEl.textContent ? "" : "none";
    this._bodyEl.textContent = step.textContent.trim();
    this._counterEl.textContent = `${i + 1} / ${steps.length}`;

    const last = i === steps.length - 1;
    this._nextBtn.textContent = last ? "Done" : "Next";
    this._backBtn.disabled = i === 0;
    this._backBtn.style.visibility = i === 0 ? "hidden" : "";

    // stable machine-readable state on the overlay
    this._dlg.dataset.step = String(i);
    this._dlg.dataset.total = String(steps.length);
    this._wantPlacement = step.getAttribute("placement") || "auto";

    this._position();
    requestAnimationFrame(() => this._nextBtn.focus());

    this.dispatchEvent(
      new CustomEvent("tour-step", {
        bubbles: true,
        detail: { index: i, total: steps.length, step },
      })
    );
  }

  stop(completed = false) {
    if (!this._running) return;
    this._running = false;
    this._teardownListeners();
    this._releaseTarget();
    this._dlg.dataset.running = "false";
    this.removeAttribute("open");
    try { this._card.hidePopover(); } catch (_) {}
    try { if (this._dlg.open) this._dlg.close(); } catch (_) {}
    this.dispatchEvent(
      new CustomEvent("tour-end", { bubbles: true, detail: { completed: !!completed } })
    );
  }

  // ---- internals ---------------------------------------------------------
  _teardownListeners() {
    window.removeEventListener("scroll", this._reposition, true);
    window.removeEventListener("resize", this._reposition);
    this._dlg?.removeEventListener("keydown", this._onKeydown);
  }

  _releaseTarget() {
    if (this._target) {
      this._target = null;
    }
  }

  _handleKeydown(e) {
    if (!this._running) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      this.next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      this.back();
    }
  }

  // Position the spotlight hole over the target, and place the card via JS as a
  // fallback for when CSS anchor positioning is unavailable / target is offscreen.
  _position() {
    const pad = 6;
    if (this._target && this._target.isConnected) {
      const r = this._target.getBoundingClientRect();
      const top = Math.max(r.top - pad, 0);
      const left = Math.max(r.left - pad, 0);
      const w = Math.min(r.width + pad * 2, window.innerWidth - left);
      const h = Math.min(r.height + pad * 2, window.innerHeight - top);
      this._spot.style.display = "block";
      this._spot.style.top = `${top}px`;
      this._spot.style.left = `${left}px`;
      this._spot.style.width = `${w}px`;
      this._spot.style.height = `${h}px`;
      this._card.dataset.anchored = "true";
      this._positionCard(r);
    } else {
      // No target → center the card, no spotlight hole. Drop the JS coords so
      // the [data-anchored="false"] CSS rule can center it.
      this._spot.style.display = "none";
      this._card.dataset.anchored = "false";
      this._card.style.removeProperty("top");
      this._card.style.removeProperty("left");
      this._card.style.removeProperty("translate");
    }
  }

  // Place the coachmark card relative to the target with JS. CSS anchor
  // positioning can't cross the shadow boundary (anchor-name is declared on the
  // light-DOM target, position-anchor lives in this shadow tree, so anchor()
  // resolves to 0 → top-left). Inline top/left override the stylesheet's
  // anchor() values; we measure the card and clamp it inside the viewport.
  _positionCard(r) {
    const gap = 8;   // distance from the target
    const edge = 8;  // min margin from the viewport edge
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const c = this._card.getBoundingClientRect();
    const cw = c.width;
    const ch = c.height;

    const fits = {
      bottom: r.bottom + gap + ch <= vh - edge,
      top: r.top - gap - ch >= edge,
      right: r.right + gap + cw <= vw - edge,
      left: r.left - gap - cw >= edge,
    };
    const order = ["bottom", "top", "right", "left"];
    let place = this._wantPlacement || "auto";
    if (place === "auto" || !fits[place]) {
      place = order.find((p) => fits[p]) || "bottom";
    }

    let top;
    let left;
    if (place === "bottom" || place === "top") {
      left = r.left + r.width / 2 - cw / 2;
      top = place === "bottom" ? r.bottom + gap : r.top - gap - ch;
    } else {
      top = r.top + r.height / 2 - ch / 2;
      left = place === "right" ? r.right + gap : r.left - gap - cw;
    }

    left = Math.min(Math.max(left, edge), Math.max(edge, vw - cw - edge));
    top = Math.min(Math.max(top, edge), Math.max(edge, vh - ch - edge));

    this._card.dataset.placement = place; // resolved side (for styling hooks / tests)
    this._card.style.translate = "0";
    this._card.style.top = `${top}px`;
    this._card.style.left = `${left}px`;
  }
}

const CSS = `
  :host { display: contents; }

  dialog[part="overlay"] {
    border: none; background: transparent; padding: 0; margin: 0;
    max-width: 100vw; max-height: 100dvh; width: 100vw; height: 100dvh;
    inset: 0; overflow: visible; color: var(--pura-fg);
  }
  dialog[part="overlay"]::backdrop {
    background: transparent;
  }

  /* Spotlight: a transparent rect whose huge box-shadow dims everything else. */
  .spot {
    position: fixed; display: none; pointer-events: none;
    border-radius: var(--pura-radius);
    box-shadow: 0 0 0 9999px rgb(0 0 0 / 0.55);
    outline: 2px solid var(--pura-accent);
    outline-offset: 2px;
    transition: top var(--pura-dur) var(--pura-ease),
      left var(--pura-dur) var(--pura-ease),
      width var(--pura-dur) var(--pura-ease),
      height var(--pura-dur) var(--pura-ease);
  }

  /* Coachmark card — native popover in the top layer. JS owns top/left/translate
     (CSS anchor positioning can't cross the shadow boundary, see _positionCard). */
  .card {
    position: fixed; inset: auto;
    margin: 0; box-sizing: border-box;
    width: max-content; max-width: min(22rem, 92vw);
    display: flex; flex-direction: column; gap: var(--pura-space-3);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-5);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .card:popover-open { opacity: 1; transform: none; }

  /* No target → center on screen (JS clears inline top/left/translate). */
  .card[data-anchored="false"] {
    top: 50%; left: 50%; translate: -50% -50%;
  }

  .card-header { display: flex; align-items: flex-start; gap: var(--pura-space-3); }
  .title { margin: 0; font-size: var(--pura-text-lg); font-weight: 600; line-height: 1.25; flex: 1; }
  .counter {
    flex: none; margin-left: auto; padding: 2px var(--pura-space-2);
    font-size: var(--pura-text-xs); font-weight: 600; color: var(--pura-muted);
    background: var(--pura-subtle); border-radius: var(--pura-radius-full);
    font-variant-numeric: tabular-nums; white-space: nowrap;
  }
  .body { color: var(--pura-muted-fg); line-height: 1.6; }
  .body:empty { display: none; }

  .footer { display: flex; align-items: center; gap: var(--pura-space-2); }
  .grow { flex: 1; }

  .btn {
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550; line-height: 1;
    white-space: nowrap; cursor: pointer;
    border: 1px solid transparent; border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-4); height: 2.25rem;
    background: var(--pura-bg); color: var(--pura-fg);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .btn:disabled { opacity: 0.55; cursor: not-allowed; }

  .btn.primary { background: var(--pura-primary); color: var(--pura-primary-fg); }
  .btn.primary:hover { background: var(--pura-primary-hover); }

  .btn.back { background: var(--pura-bg); color: var(--pura-fg); border-color: var(--pura-border-strong); box-shadow: var(--pura-shadow-sm); }
  .btn.back:hover:not(:disabled) { background: var(--pura-subtle); }

  .btn.ghost { background: transparent; color: var(--pura-muted); padding: 0 var(--pura-space-2); }
  .btn.ghost:hover { background: var(--pura-subtle); color: var(--pura-fg); }
`;

define("pura-tour", PuraTour, meta);

// ---------------------------------------------------------------------------
// <pura-tour-step> — declarative step descriptor. Not rendered itself; the parent
// <pura-tour> reads its attributes/content. Attributes: target (CSS selector),
// title, placement (auto default | top | bottom | left | right). Slot: default =
// body text. Kept display:none so step content never shows inline.
class PuraTourStep extends PuraElement {
  connectedCallback() {
    // Inert descriptor: stay out of the layout, expose state for tooling.
    this.setAttribute("hidden", "");
    this.setAttribute("role", "none");
    this.dataset.puraTourStep = this.getAttribute("target") || "";
    // Minimal shadow so the element is well-formed even if styled/queried.
    if (!this.shadowRoot.childElementCount) {
      const { html, css } = tourStepTemplate(this);
      this.render(html, css);
    }
  }
}

define("pura-tour-step", PuraTourStep);

export { PuraTour, PuraTourStep };
