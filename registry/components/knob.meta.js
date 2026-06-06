export default {
  "name": "knob",
  "tag": "pura-knob",
  "category": "Form",
  "title": "Knob",
  "role": "slider",
  "summary": "A rotary knob input rendered as an SVG circular dial with a track arc and a value arc, supporting drag, wheel, and keyboard interactions.",
  "attributes": [
    { "name": "value", "type": "number", "default": "", "desc": "Current knob value" },
    { "name": "min", "type": "number", "default": "0", "desc": "Minimum value" },
    { "name": "max", "type": "number", "default": "100", "desc": "Maximum value" },
    { "name": "step", "type": "number", "default": "1", "desc": "Step increment for value changes" },
    { "name": "size", "type": "number", "default": "100", "desc": "Diameter of the knob in pixels" },
    { "name": "stroke-width", "type": "number", "default": "", "desc": "SVG stroke width for the arcs" },
    { "name": "readonly", "type": "boolean", "default": "", "desc": "Prevent interaction while keeping the knob visible" },
    { "name": "disabled", "type": "boolean", "default": "", "desc": "Disable interaction and remove from tab order" },
    { "name": "value-template", "type": "string", "default": "", "desc": "Template string for center readout, use {value} as placeholder" }
  ],
  "events": ["input", "change"],
  "slots": [],
  "i18nKeys": []
};
