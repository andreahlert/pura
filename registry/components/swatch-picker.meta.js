export default {
  "name": "swatch-picker",
  "tag": "pura-swatch-picker",
  "category": "Form",
  "title": "Swatch Picker",
  "role": "radiogroup",
  "summary": "A grid of preset color chips to pick from, lighter than a full color picker.",
  "attributes": [
    { "name": "colors", "type": "string", "default": "", "desc": "Comma-separated hex color list" },
    { "name": "value", "type": "string", "default": "", "desc": "Selected color" },
    { "name": "columns", "type": "string", "default": "", "desc": "Number of grid columns" },
    { "name": "size", "type": "string", "default": "1.75rem", "desc": "Swatch size (CSS length or number of px)" },
    { "name": "allow-clear", "type": "boolean", "default": "", "desc": "When set, clicking the selected swatch clears the value" }
  ],
  "events": ["change"],
  "slots": [],
  "i18nKeys": []
};
