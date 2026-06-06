export default {
  "name": "sheet",
  "tag": "pura-sheet",
  "category": "Overlay",
  "title": "Sheet",
  "role": "",
  "summary": "Sliding panel over a modal backdrop, anchored to any edge of the screen.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Controls visibility; present opens the panel via showModal(), absent closes it."
    },
    {
      "name": "side",
      "type": "string",
      "default": "right",
      "desc": "Edge the panel originates from: right, left, top, or bottom."
    },
    {
      "name": "title",
      "type": "string",
      "default": "\"\"",
      "desc": "Header text shown when the header slot is not used."
    }
  ],
  "events": [
    "close"
  ],
  "slots": [
    "default",
    "header",
    "footer"
  ],
  "i18nKeys": []
};
