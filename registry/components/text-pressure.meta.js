export default {
  "name": "text-pressure",
  "tag": "pura-text-pressure",
  "category": "Animation",
  "animation": true,
  "title": "Text Pressure",
  "role": "",
  "summary": "Variable-font pressure: each letter thickens (wght) and widens (wdth) as the pointer approaches it and relaxes as it leaves, driven per glyph by pointer distance on a rAF with a CSS transition smoothing the steps.",
  "attributes": [
    {
      "name": "text",
      "type": "string",
      "default": "",
      "desc": "Optional. When set, the per-glyph spans render in the pure template (server paint included); otherwise the slotted text is split on the client."
    },
    {
      "name": "from-wght",
      "type": "number",
      "default": "400",
      "desc": "Weight axis at rest, away from the pointer."
    },
    {
      "name": "to-wght",
      "type": "number",
      "default": "900",
      "desc": "Weight axis directly under the pointer."
    },
    {
      "name": "from-wdth",
      "type": "number",
      "default": "100",
      "desc": "Width axis at rest. Needs a font that carries wdth, e.g. Roboto Flex."
    },
    {
      "name": "to-wdth",
      "type": "number",
      "default": "100",
      "desc": "Width axis directly under the pointer. Equal to from-wdth means the axis is off."
    },
    {
      "name": "radius",
      "type": "number",
      "default": "160",
      "desc": "Falloff radius in px around the pointer; glyphs farther than this sit at rest."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
