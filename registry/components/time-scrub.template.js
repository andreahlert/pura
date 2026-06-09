// Pure template for <pura-time-scrub>. Renders the scrubber chrome: a stage that
// holds the slotted steps and a rail (track + fill + ticks + thumb) whose
// geometry is driven entirely by two custom properties the component sets:
//   --pura-scrub        continuous playhead, 0..1
//   --pura-scrub-total  number of keyframes (for tick spacing fallbacks)
// Initial paint goes through here so the rail is byte-identical on server and
// client (the playhead defaults to 0). No DOM access, runs on the server.
import { EMPTY_SHIM } from "../base.js";

export const TIME_SCRUB_CSS = `
:host { display: block; }
.scrub { display: grid; gap: .75rem; }
.stage { display: block; }
.rail {
  position: relative;
  height: 24px;
  cursor: pointer;
  touch-action: none;
  outline: none;
}
.rail:focus-visible { outline: 2px solid var(--pura-ring, #6366f1); outline-offset: 4px; border-radius: 6px; }
.track, .fill {
  position: absolute;
  top: 50%;
  height: 6px;
  border-radius: 999px;
  transform: translateY(-50%);
}
.track { left: 0; right: 0; background: var(--pura-muted, #e4e4e7); box-shadow: inset 0 1px 2px rgb(0 0 0 / .08); }
.fill {
  left: 0;
  width: calc(var(--pura-scrub, 0) * 100%);
  background: linear-gradient(90deg, var(--pura-primary, #6366f1), color-mix(in oklab, var(--pura-primary, #6366f1) 60%, #a855f7));
  box-shadow: 0 0 10px color-mix(in oklab, var(--pura-primary, #6366f1) 55%, transparent);
  transition: width calc(.12s * var(--pura-motion, 1)) ease-out;
}
.ticks { position: absolute; inset: 0; pointer-events: none; }
.tick {
  position: absolute;
  top: 50%;
  width: 2px;
  height: 10px;
  margin-left: -1px;
  transform: translateY(-50%);
  border-radius: 1px;
  background: var(--pura-border, #d4d4d8);
  transition: background calc(.12s * var(--pura-motion, 1)) ease-out, transform calc(.12s * var(--pura-motion, 1)) ease-out;
}
.tick[data-reached] { background: color-mix(in oklab, var(--pura-primary, #6366f1) 70%, transparent); }
.tick[data-current] { transform: translateY(-50%) scaleY(1.6); background: var(--pura-primary, #6366f1); }
.thumb {
  position: absolute;
  top: 50%;
  left: calc(var(--pura-scrub, 0) * 100%);
  width: 16px;
  height: 16px;
  margin-left: -8px;
  border-radius: 50%;
  background: var(--pura-bg, #fff);
  border: 2px solid var(--pura-primary, #6366f1);
  box-shadow: 0 1px 3px rgb(0 0 0 / .2), 0 0 0 0 color-mix(in oklab, var(--pura-primary, #6366f1) 40%, transparent);
  transform: translateY(-50%);
  transition: left calc(.12s * var(--pura-motion, 1)) ease-out, box-shadow calc(.15s * var(--pura-motion, 1)) ease-out;
}
.rail:hover .thumb, .rail:focus-visible .thumb { box-shadow: 0 1px 3px rgb(0 0 0 / .2), 0 0 0 6px color-mix(in oklab, var(--pura-primary, #6366f1) 18%, transparent); }
/* dim steps that are ahead of the playhead so the history reads visually */
::slotted([data-pura-scrub-state="future"]) { opacity: .38; transition: opacity calc(.18s * var(--pura-motion, 1)) ease-out; }
::slotted([data-pura-scrub-state="current"]) { opacity: 1; }
::slotted([data-pura-scrub-state="past"]) { opacity: .72; transition: opacity calc(.18s * var(--pura-motion, 1)) ease-out; }
`;

export function timeScrubTemplate(el = EMPTY_SHIM) {
  void el; // geometry is custom-property driven; the playhead defaults to 0
  const html =
    '<div class="scrub" part="scrub">' +
      '<div class="stage" part="stage"><slot></slot></div>' +
      '<div class="rail" part="rail">' +
        '<div class="track" part="track"></div>' +
        '<div class="fill" part="fill"></div>' +
        '<div class="ticks" part="ticks"></div>' +
        '<div class="thumb" part="thumb"></div>' +
      '</div>' +
    '</div>';
  return { html, css: TIME_SCRUB_CSS };
}
