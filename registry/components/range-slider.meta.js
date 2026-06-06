export default {
  "name": "range-slider",
  "tag": "pura-range-slider",
  "category": "Form",
  "title": "Range Slider",
  "role": "",
  "summary": "A range slider with two handles for selecting an interval between a minimum and a maximum.",
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
      "desc": "Maximum value of the range. If it is less than or equal to min, it becomes min + 1."
    },
    {
      "name": "step",
      "type": "number",
      "default": "1",
      "desc": "Increment between values; values are snapped to the nearest step."
    },
    {
      "name": "value-min",
      "type": "number",
      "default": "min",
      "desc": "Position of the lower handle. Reflected back to the host; it never exceeds value-max."
    },
    {
      "name": "value-max",
      "type": "number",
      "default": "max",
      "desc": "Position of the upper handle. Reflected back to the host; it never falls below value-min."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables pointer and keyboard interaction and removes the handles from the tab order."
    },
    {
      "name": "aria-label",
      "type": "string",
      "default": "\"Range\"",
      "desc": "Base label used to name the handles as \"<label> minimum\" and \"<label> maximum\"."
    }
  ],
  "events": [
    "input",
    "change"
  ],
  "slots": [],
  "i18nKeys": []
};
