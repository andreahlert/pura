export default {
  "name": "blur-text",
  "tag": "pura-blur-text",
  "category": "Animation",
  "animation": true,
  "title": "Blur Text",
  "role": "",
  "summary": "Text that enters word by word out of a blur: each unit starts blurred, transparent and slightly offset, then sharpens into place with a stagger. Pure CSS keyframes, zero per-frame JS; the original text stays as the accessible copy and SSR paints it sharp.",
  "attributes": [
    {
      "name": "by",
      "type": "\"word\" | \"char\"",
      "default": "word",
      "desc": "Unit to split and stagger."
    },
    {
      "name": "stagger",
      "type": "number",
      "default": "60",
      "desc": "Milliseconds between consecutive units (defaults to 35 for char)."
    },
    {
      "name": "trigger",
      "type": "\"view\" | \"load\"",
      "default": "view",
      "desc": "view reveals when scrolled into view; load reveals on connect."
    },
    {
      "name": "blur",
      "type": "number",
      "default": "8",
      "desc": "Starting blur radius in px."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "600",
      "desc": "Per-unit animation duration in ms."
    },
    {
      "name": "direction",
      "type": "\"up\" | \"down\"",
      "default": "up",
      "desc": "up settles units upward into place; down settles them downward."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
