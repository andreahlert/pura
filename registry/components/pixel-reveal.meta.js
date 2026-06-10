export default {
  "name": "pixel-reveal",
  "tag": "pura-pixel-reveal",
  "category": "Animation",
  "animation": true,
  "title": "Pixel Reveal",
  "role": "",
  "summary": "Retro pixel-block transition: a grid of cells flickers in pseudo-random, deterministic (SSR-stable) order to swap between two slotted states or dissolve away and reveal content, triggered by attribute, hover, or entering the viewport. Pure CSS keyframes, no per-frame JS.",
  "attributes": [
    {
      "name": "mode",
      "type": "\"swap\" | \"reveal\"",
      "default": "swap",
      "desc": "swap replaces the default slot with the alt slot under a one-shot pixel burst; reveal covers the content with cells and snaps them off one by one."
    },
    {
      "name": "trigger",
      "type": "\"attr\" | \"hover\" | \"view\"",
      "default": "attr",
      "desc": "attr toggles via the active attribute; hover toggles on pointer enter/leave (and focus); view activates once when scrolled into view."
    },
    {
      "name": "active",
      "type": "boolean",
      "default": "false",
      "desc": "Current state: alt slot shown (swap) or content revealed (reveal). Kept in sync by hover/view triggers."
    },
    {
      "name": "cols",
      "type": "number",
      "default": "12",
      "desc": "Pixel grid columns, capped at 32."
    },
    {
      "name": "rows",
      "type": "number",
      "default": "8",
      "desc": "Pixel grid rows, capped at 32."
    }
  ],
  "events": [
    "pura-pixel-reveal-toggle"
  ],
  "slots": [
    "default",
    "alt"
  ],
  "i18nKeys": []
};
