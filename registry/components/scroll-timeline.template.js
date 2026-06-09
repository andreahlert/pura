// Pure template for <pura-scroll-timeline>. Wraps content and shows a thin
// progress fill that advances as the element travels through the viewport. The
// fill geometry is driven by one custom property the component sets:
//   --pura-timeline-progress   0..1, how far the section has scrolled
//   --pura-timeline-paused     1 while intent (hover/focus) is freezing it
// Initial paint goes through here (progress defaults to 0) so server and client
// agree. No DOM access; runs on the server.
import { EMPTY_SHIM } from "../base.js";

export const SCROLL_TIMELINE_CSS = `
:host { display: block; position: relative; }
.bar {
  position: sticky;
  top: 0;
  z-index: 1;
  height: var(--_stl-height, 3px);
  background: var(--pura-muted, #e4e4e7);
  border-radius: 999px;
  overflow: hidden;
}
.fill {
  height: 100%;
  width: calc(var(--pura-timeline-progress, 0) * 100%);
  border-radius: 999px;
  background: linear-gradient(90deg, var(--pura-primary, #6366f1), color-mix(in oklab, var(--pura-primary, #6366f1) 55%, #a855f7));
  box-shadow: 0 0 8px color-mix(in oklab, var(--pura-primary, #6366f1) 50%, transparent);
  transition: width calc(.1s * var(--pura-motion, 1)) linear, opacity calc(.2s * var(--pura-motion, 1)) ease-out;
}
/* while intent freezes the timeline, the fill dims to a held, attentive state */
:host([data-pura-intent="engaged"]) .fill { opacity: .55; }
.content { display: block; }
`;

export function scrollTimelineTemplate(el = EMPTY_SHIM) {
  void el; // progress is custom-property driven and defaults to 0
  const html =
    '<div class="bar" part="bar"><div class="fill" part="fill"></div></div>' +
    '<div class="content" part="content"><slot></slot></div>';
  return { html, css: SCROLL_TIMELINE_CSS };
}
