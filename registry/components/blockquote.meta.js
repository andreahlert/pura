export default {
  "name": "blockquote",
  "tag": "pura-blockquote",
  "category": "Primitives",
  "title": "Blockquote",
  "role": "",
  "summary": "A quotation block with an accent border and optional citation.",
  "attributes": [
    {
      "name": "variant",
      "type": "string",
      "default": "default",
      "desc": "Accent color for the border and citation. One of: default, accent, primary, success, warning, danger, info."
    },
    {
      "name": "cite",
      "type": "string",
      "default": "",
      "desc": "Citation text rendered as a <cite> line. Hidden when content is supplied via the author slot."
    }
  ],
  "events": [],
  "slots": [
    "(default) — the quoted content",
    "author — citation markup when richer than the cite attribute"
  ],
  "i18nKeys": []
};
