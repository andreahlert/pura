export default {
  "name": "image",
  "tag": "pura-image",
  "category": "Primitives",
  "title": "Image",
  "role": "",
  "summary": "A lazy-loaded image primitive that wraps an img inside an aspect-ratio box with configurable fit and corner rounding.",
  "attributes": [
    {
      "name": "src",
      "type": "string",
      "default": "",
      "desc": "Image URL. When omitted, the frame renders empty with a subtle background."
    },
    {
      "name": "alt",
      "type": "string",
      "default": "\"\"",
      "desc": "Alternative text for the image. Defaults to an empty string."
    },
    {
      "name": "ratio",
      "type": "string",
      "default": "auto",
      "desc": "Aspect ratio of the frame, e.g. \"16/9\", \"1/1\", \"4/3\"."
    },
    {
      "name": "fit",
      "type": "\"cover\" | \"contain\" | \"fill\"",
      "default": "cover",
      "desc": "object-fit behavior of the image within the frame."
    },
    {
      "name": "radius",
      "type": "\"sm\" | \"md\" | \"lg\" | \"full\"",
      "default": "",
      "desc": "Corner rounding applied to the frame, mapped to the --pura-radius tokens."
    },
    {
      "name": "w",
      "type": "string | number",
      "default": "auto",
      "desc": "Explicit width. A bare number is coerced to px; any other CSS length is passed through."
    },
    {
      "name": "h",
      "type": "string | number",
      "default": "auto",
      "desc": "Explicit height. A bare number is coerced to px; any other CSS length is passed through."
    }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};
