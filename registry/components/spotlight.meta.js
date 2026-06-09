export default {
  "name": "spotlight",
  "tag": "pura-spotlight",
  "category": "Overlay",
  "animation": true,
  "title": "Spotlight",
  "role": "",
  "summary": "Dims the entire page, leaving only one element highlighted through a transparent cutout.",
  "attributes": [
    {
      "name": "target",
      "type": "string",
      "default": "",
      "desc": "CSS selector of the element to highlight (resolved live). With no target, the overlay just dims the page uniformly."
    },
    {
      "name": "radius",
      "type": "string",
      "default": "var(--pura-radius)",
      "desc": "Corner radius of the cutout (any CSS length)."
    },
    {
      "name": "pad",
      "type": "number",
      "default": "6",
      "desc": "Extra px around the target's rectangle, for breathing room."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Spotlight",
      "desc": "Accessible name of the overlay (aria-label)."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects the visible state; present -> shown."
    }
  ],
  "events": [
    "spotlight-show",
    "spotlight-hide"
  ],
  "slots": [],
  "i18nKeys": []
};
