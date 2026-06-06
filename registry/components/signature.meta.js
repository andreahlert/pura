export default {
  "name": "signature",
  "tag": "pura-signature",
  "category": "Form",
  "title": "Signature",
  "role": "",
  "summary": "Canvas signature pad that captures pointer and touch strokes, HiDPI aware, with a clear button.",
  "attributes": [
    { "name": "width", "type": "string", "default": "400", "desc": "Canvas CSS width (number → px, or CSS length)" },
    { "name": "height", "type": "string", "default": "160", "desc": "Canvas CSS height (number → px, or CSS length)" },
    { "name": "color", "type": "string", "default": "var(--pura-fg)", "desc": "Stroke color" },
    { "name": "line-width", "type": "string", "default": "2.5", "desc": "Stroke width in px" },
    { "name": "disabled", "type": "boolean", "default": "", "desc": "Disables drawing and the Clear button" }
  ],
  "events": ["change"],
  "slots": [],
  "i18nKeys": []
};
