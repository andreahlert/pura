export default {
  "name": "qr-code",
  "tag": "pura-qr-code",
  "category": "Utility",
  "title": "Qr Code",
  "role": "",
  "summary": "Zero-dependency QR code encoder (byte mode, versions 1–10) that renders an SVG matrix using theme foreground and background colors.",
  "attributes": [
    { "name": "value", "type": "string", "default": "", "desc": "Text or URL to encode into the QR code." },
    { "name": "size", "type": "number", "default": "200", "desc": "Width and height of the rendered SVG in pixels." },
    { "name": "level", "type": "string", "default": "M", "desc": "Error correction level: L, M, Q, or H." }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};
