export default {
  "name": "gauge",
  "tag": "pura-gauge",
  "category": "Display",
  "title": "Gauge",
  "role": "",
  "summary": "Semicircular meter that shows a value within a range, with a filled arc, needle, and center readout.",
  "attributes": [
    {
      "name": "value",
      "type": "number",
      "default": "0",
      "desc": "Current reading, clamped within [min, max]."
    },
    {
      "name": "min",
      "type": "number",
      "default": "0",
      "desc": "Start of the scale."
    },
    {
      "name": "max",
      "type": "number",
      "default": "100",
      "desc": "End of the scale. If max <= min, it becomes min+1."
    },
    {
      "name": "label",
      "type": "string",
      "default": "\"\"",
      "desc": "Caption shown below the value and used as the accessible name."
    }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};
