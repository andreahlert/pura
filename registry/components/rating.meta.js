export default {
  "name": "rating",
  "tag": "pura-rating",
  "category": "Form",
  "title": "Rating",
  "role": "",
  "summary": "A star rating control, keyboard accessible and exposed as an ARIA slider.",
  "attributes": [
    {
      "name": "value",
      "type": "number",
      "default": "0",
      "desc": "Current rating. It can be fractional (0.5) when allow-half is active; it is clamped between 0 and max."
    },
    {
      "name": "max",
      "type": "number",
      "default": "5",
      "desc": "Number of stars."
    },
    {
      "name": "readonly",
      "type": "boolean",
      "default": "false",
      "desc": "Read-only mode: not interactive and not focusable (tabindex -1)."
    },
    {
      "name": "allow-half",
      "type": "boolean",
      "default": "false",
      "desc": "Allows half-star increments (0.5) on hover, click, and keyboard."
    },
    {
      "name": "label",
      "type": "string",
      "default": "\"Rating\"",
      "desc": "Accessible label (aria-label of the slider)."
    }
  ],
  "events": [
    "change",
    "input"
  ],
  "slots": [],
  "i18nKeys": []
};
