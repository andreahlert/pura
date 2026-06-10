// Pure render for <pura-falling-text>. No DOM; safe on server (SSR/DSD) and client.
// Lays out two layers inside a positioned stage: .src holds the JS-built word
// spans (aria-hidden) whose transforms the physics loop drives, and the slotted
// original sentence stays as the accessible copy. Before JS runs, .src is empty
// and the slot is visible, so the sentence reads intact from first paint with no
// script and on the server. Once the words are built the host gets
// data-pura-falling-ready, which flips visibility to the animated copy and
// visually-hides (but keeps readable) the original.
//
// Reduced motion: the JS never drops anything, and a CSS guard pins the word
// transforms, so the sentence simply stays in place.
import { EMPTY_SHIM } from "../base.js";

export function fallingTextTemplate(el = EMPTY_SHIM) {
  const html = `<div class="stage" part="stage"><span class="src" part="text" aria-hidden="true"></span><span class="a11y"><slot></slot></span></div>`;

  const css = `
    :host {
      display: block;
    }
    .stage {
      position: relative;
      min-height: var(--pura-falling-text-height, auto);
      overflow: hidden;
    }
    :host([trigger="click"]) .stage { cursor: pointer; }

    .src { display: none; color: var(--pura-falling-text-color, inherit); }
    :host([data-pura-falling-ready]) .src { display: block; }
    :host([data-pura-falling-ready]) .a11y {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
      border: 0;
    }

    .word {
      display: inline-block;
      will-change: transform;
    }
    :host([data-pura-falling-state="falling"]) .word,
    :host([data-pura-falling-state="settled"]) .word {
      user-select: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .word { transform: none !important; }
    }
  `;

  return { html, css };
}
