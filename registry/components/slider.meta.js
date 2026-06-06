export default {
  "name": "slider",
  "tag": "pura-slider",
  "category": "Form",
  "title": "Slider",
  "role": "",
  "summary": "A slider control for selecting a numeric value within a range.",
  "attributes": [
    {
      "name": "min",
      "type": "number",
      "default": "0",
      "desc": "Minimum value of the range."
    },
    {
      "name": "max",
      "type": "number",
      "default": "100",
      "desc": "Maximum value of the range."
    },
    {
      "name": "step",
      "type": "number",
      "default": "1",
      "desc": "Increment between allowed values."
    },
    {
      "name": "value",
      "type": "number",
      "default": "(midpoint of min/max)",
      "desc": "Current value; mirrored back into the attribute and available via the .value property."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables interaction with the slider."
    },
    {
      "name": "show-value",
      "type": "boolean",
      "default": "false",
      "desc": "Shows a bubble with the current value following the thumb."
    }
  ],
  "events": [
    "input",
    "change"
  ],
  "slots": [],
  "i18nKeys": []
};
