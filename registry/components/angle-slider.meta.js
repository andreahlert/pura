export default {
  "name": "angle-slider",
  "tag": "pura-angle-slider",
  "category": "Form",
  "title": "Angle Slider",
  "role": "slider",
  "summary": "A circular angle picker dial with a draggable handle on the circumference for selecting an angle in degrees (0..360).",
  "attributes": [
    { "name": "value", "type": "number", "default": "0", "desc": "Current angle in degrees" },
    { "name": "size", "type": "number", "default": "120", "desc": "Diameter of the dial in px" },
    { "name": "step", "type": "number", "default": "1", "desc": "Snap step in degrees" },
    { "name": "marks", "type": "string", "default": "", "desc": "Comma-separated list of degrees to show tick marks" },
    { "name": "disabled", "type": "boolean", "default": "", "desc": "Disables interaction" }
  ],
  "events": ["change"],
  "slots": [],
  "i18nKeys": []
};
