export default {
  "name": "resizable",
  "tag": "pura-resizable",
  "category": "Layout",
  "title": "Resizable",
  "role": "",
  "summary": "Two resizable panels separated by a draggable divider.",
  "attributes": [
    {
      "name": "orientation",
      "type": "\"horizontal\" | \"vertical\"",
      "default": "horizontal",
      "desc": "Split direction: horizontal (panels side by side) or vertical (stacked)."
    },
    {
      "name": "min",
      "type": "number",
      "default": "10",
      "desc": "Minimum percentage allowed for each panel (clamped between 0 and 45)."
    },
    {
      "name": "value",
      "type": "number",
      "default": "50",
      "desc": "Initial split percentage assigned to the start panel."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "start",
    "end"
  ],
  "i18nKeys": []
};
