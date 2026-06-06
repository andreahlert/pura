export default {
  "name": "aspect-ratio",
  "tag": "pura-aspect-ratio",
  "category": "Display",
  "title": "Aspect Ratio",
  "role": "",
  "summary": "Keeps content at a fixed ratio and crops media to fill the box.",
  "attributes": [
    {
      "name": "ratio",
      "type": "string",
      "default": "1/1",
      "desc": "Desired ratio. Accepts \"16/9\", \"16:9\", \"1.78\" or a single number; an invalid value falls back to 1/1."
    },
    {
      "name": "rounded",
      "type": "boolean",
      "default": "false",
      "desc": "When present, applies the theme's border radius (var(--pura-radius)) and rounds the corners."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
