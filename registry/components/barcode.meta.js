export default {
  "name": "barcode",
  "tag": "pura-barcode",
  "category": "Display",
  "title": "Barcode",
  "role": "",
  "summary": "A zero-dependency SVG barcode renderer supporting CODE128 (auto B/C) and EAN13 formats with optional human-readable text.",
  "attributes": [
    { "name": "value", "type": "string", "default": "", "desc": "The value to encode as a barcode" },
    { "name": "format", "type": "string", "default": "code128", "desc": "Barcode format: \"code128\" or \"ean13\"" },
    { "name": "height", "type": "number", "default": "80", "desc": "Bar height in px" },
    { "name": "displayValue", "type": "boolean", "default": "", "desc": "Show human-readable text under the bars" }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};
