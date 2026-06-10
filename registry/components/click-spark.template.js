// Pure render for <pura-click-spark>. No DOM; safe on server (SSR/DSD) and client.
// The shadow markup is just the slotted surface plus an empty overlay layer:
// spark spans exist only transiently at click time (spawned and WAAPI-animated
// by the client JS, removed on finish), so the SSR paint is the final resting
// state by construction and nothing animates before JS loads.
import { EMPTY_SHIM } from "../base.js";

export function clickSparkTemplate(el = EMPTY_SHIM) {
  // The overlay comes after the slot so sparks paint above the content;
  // overflow stays visible so sparks can radiate past the host edge.
  const html = `<slot></slot><span class="sparks" part="sparks" aria-hidden="true"></span>`;

  const css = `
    :host {
      position: relative;
      display: inline-block;
    }
    .sparks {
      position: absolute;
      inset: 0;
      overflow: visible;
      pointer-events: none;
    }
    .spark {
      position: absolute;
      border-radius: 999px;
      background: var(--pura-click-spark-color, var(--pura-accent, currentColor));
      pointer-events: none;
      will-change: transform, opacity;
    }
    .spark.emoji {
      background: none;
      line-height: 1;
    }
  `;

  return { html, css };
}
