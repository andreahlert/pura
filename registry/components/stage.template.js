// Pure render for <pura-stage>. No DOM; safe on server (SSR/DSD) and client.
// A stage is a viewport-tall, internally-scrollable box whose slotted children
// are full-height sections. With the `snap` attribute it becomes a scroll-snap
// container: each scroll lands on the next section (the fullpage / one-section-
// at-a-time feel), driven entirely by native CSS scroll snapping, no JS.
//
// Because the box is its own scroll container, any scrub child inside a section
// that uses timeline="scroll" (pura-type-morph / pura-morph / pura-draw, …) binds
// to the STAGE's scroll, so a shape can morph as that section scrolls in.
// scroll(nearest) resolves across the shadow boundary to this box.
//
//   snap   — "" / "mandatory" hard-snaps to each section; "proximity" snaps only
//            when you come to rest near a boundary; absent = free scroll.
//   height — section height and box height (default 100vh).
//   axis   — "y" (default) vertical sections, or "x" for horizontal.
//
// SSR / pre-JS: sections stack and the box scrolls natively; nothing depends on
// script to be usable.
import { EMPTY_SHIM } from "../base.js";

function safeHeight(raw) {
  if (raw == null || raw === "") return "100vh";
  const cleaned = String(raw).replace(/[^0-9.a-z%]/gi, "").trim();
  return /^[0-9.]+(vh|svh|lvh|dvh|vw|px|rem|em|%)$/.test(cleaned) ? cleaned : "100vh";
}

export function stageTemplate(el = EMPTY_SHIM) {
  const height = safeHeight(el.getAttribute("height"));
  const horizontal = el.getAttribute("axis") === "x";

  const snapRaw = el.getAttribute("snap");
  const hasSnap = snapRaw != null;
  const strictness = snapRaw === "proximity" ? "proximity" : "mandatory";
  const axis = horizontal ? "x" : "y";

  // Box scrolls along the section axis; sections are sized on that axis.
  const overflowMain = horizontal ? "overflow-x: auto; overflow-y: hidden;" : "overflow-y: auto; overflow-x: hidden;";
  const slotSize = horizontal ? `width: ${height}; height: 100%;` : `height: ${height}; width: 100%;`;
  const slotFlow = horizontal ? "display: flex; flex-direction: row;" : "";

  const css = `
    :host {
      display: block;
      height: ${height};
      ${overflowMain}
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
      ${hasSnap ? `scroll-snap-type: ${axis} ${strictness};` : ""}
    }
    .track { ${slotFlow} ${horizontal ? "height: 100%;" : ""} }
    ::slotted(*) {
      ${slotSize}
      box-sizing: border-box;
      ${hasSnap ? "scroll-snap-align: start; scroll-snap-stop: always;" : ""}
      flex: ${horizontal ? "0 0 auto" : "initial"};
    }
    @media (prefers-reduced-motion: reduce) {
      :host { scroll-behavior: auto; }
    }
  `;

  const html = `<div class="track" part="track"><slot></slot></div>`;

  return { html, css };
}
