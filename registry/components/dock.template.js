// Pure render for <pura-dock> and <pura-dock-item>. No DOM; SSR/DSD + client safe.
// dockTemplate: a static magnify track wrapping a <slot> for the dock items;
//   only the [label] accessible name varies (defaults to "Dock").
// dockItemTemplate: an <a> or <button> (chosen from [href]) wrapping the icon
//   slot + indicator dot, plus an optional popover tooltip when [label] is set.
//   The per-instance anchor name comes from el._tipId on the client; under
//   EMPTY_SHIM it falls back to a literal so the CSS anchor stays valid.
import { EMPTY_SHIM } from "../base.js";

const CSS = `
  :host { display: block; --pura-dock-size: 3rem; }
  :host([fixed]) {
    position: fixed; left: 50%; bottom: var(--pura-space-4);
    transform: translateX(-50%); z-index: 50;
  }

  .track {
    display: inline-flex; align-items: flex-end; justify-content: center;
    gap: var(--pura-space-2);
    padding: var(--pura-space-2) var(--pura-space-3);
    /* leave headroom so lifted/scaled items are never clipped */
    padding-top: calc(var(--pura-dock-size) * 0.7);
    margin-top: calc(var(--pura-dock-size) * -0.7);
    background: color-mix(in srgb, var(--pura-bg) 78%, transparent);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-lg);
    box-shadow: var(--pura-shadow-lg);
    backdrop-filter: blur(12px) saturate(1.4);
    -webkit-backdrop-filter: blur(12px) saturate(1.4);
  }

  /* keep slotted dock items anchored to the baseline so they grow upward */
  ::slotted(pura-dock-item) { align-self: flex-end; }
`;

const ITEM_CSS = `
  :host {
    display: inline-block;
    anchor-name: ANCHOR;
    /* magnification state, driven by the parent dock */
    --dock-scale: 1;
    --dock-lift: 0px;
  }

  .item {
    display: grid; place-items: center;
    width: var(--pura-dock-size, 3rem);
    height: var(--pura-dock-size, 3rem);
    padding: 0; margin: 0;
    border: none; background: transparent; color: var(--pura-fg);
    cursor: pointer; font: inherit; position: relative;
    border-radius: var(--pura-radius);
    transform-origin: bottom center;
    transform: translateY(calc(var(--dock-lift) * -1)) scale(var(--dock-scale));
    transition: transform var(--pura-dur) var(--pura-ease),
      background var(--pura-dur) var(--pura-ease);
    will-change: transform;
    -webkit-tap-highlight-color: transparent;
    text-decoration: none;
  }
  .item:hover { background: var(--pura-subtle); }
  .item:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  :host([disabled]) .item {
    opacity: 0.45; cursor: not-allowed;
    transform: none; pointer-events: none;
  }

  .icon {
    display: grid; place-items: center;
    width: 70%; height: 70%;
    font-size: calc(var(--pura-dock-size, 3rem) * 0.55);
    line-height: 1; pointer-events: none;
  }
  /* normalize common slotted icon shapes */
  ::slotted(svg), ::slotted(img) {
    width: 100%; height: 100%; display: block; object-fit: contain;
  }

  /* running/active indicator dot */
  .dot {
    position: absolute; bottom: -0.2rem; left: 50%;
    width: 0.28rem; height: 0.28rem; border-radius: 50%;
    background: var(--pura-fg);
    transform: translateX(-50%) scale(0);
    transition: transform var(--pura-dur) var(--pura-ease);
  }
  :host([active]) .dot { transform: translateX(-50%) scale(1); }

  /* tooltip — native Popover + anchor positioning */
  .tip {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    bottom: anchor(top); left: anchor(center);
    translate: -50% 0; margin-bottom: var(--pura-space-3);
    width: max-content; max-width: 14rem;
    background: var(--pura-fg); color: var(--pura-bg);
    border-radius: var(--pura-radius-sm);
    padding: var(--pura-space-1) var(--pura-space-2);
    font-size: var(--pura-text-xs); font-weight: 550; line-height: 1.3;
    box-shadow: var(--pura-shadow);
    opacity: 0; transform: translateY(4px);
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .tip:popover-open { opacity: 1; transform: none; }

  @supports not (anchor-name: --x) {
    :host { position: relative; }
    .tip {
      position: absolute; bottom: 100%; left: 50%;
      translate: -50% 0; inset: auto;
    }
  }
`;

export function dockTemplate(el = EMPTY_SHIM) {
  const label = (el.getAttribute("label") || "Dock").replace(/"/g, "&quot;");
  const html = `<div part="dock" class="track" role="toolbar"
            aria-orientation="horizontal"
            aria-label="${label}">
         <slot></slot>
       </div>`;
  return { html, css: CSS };
}

export function dockItemTemplate(el = EMPTY_SHIM) {
  const tipId = el._tipId || "pura-dock-tip";
  const label = (el.getAttribute("label") || "").replace(/"/g, "&quot;");
  const href = el.getAttribute("href");
  const isLink = href !== null;
  const tag = isLink ? "a" : "button";
  const attrs = isLink
    ? `href="${href.replace(/"/g, "&quot;")}" role="button"`
    : `type="button"`;

  const html = `<${tag} part="item" class="item" ${attrs}
              ${label ? `aria-label="${label}" aria-describedby="${tipId}"` : ""}
              tabindex="-1">
         <span part="icon" class="icon"><slot></slot></span>
         <span part="indicator" class="dot" aria-hidden="true"></span>
       </${tag}>
       ${label ? `<div id="${tipId}" part="tooltip" class="tip" popover="manual" role="tooltip">${label}</div>` : ""}`;
  return { html, css: ITEM_CSS.replaceAll("ANCHOR", `--${tipId}`) };
}
