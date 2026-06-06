export default {
  "name": "stat-grid",
  "tag": "pura-stat-grid",
  "category": "Display",
  "title": "Stat Grid",
  "role": "",
  "summary": "Responsive grid of metrics that arranges statistic cells with automatic dividers.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Accessible name for the group (becomes the aria-label and the snapshot's label field in the registry). Attribute of <pura-stat-grid>."
    },
    {
      "name": "min",
      "type": "string (CSS length)",
      "default": "11rem",
      "desc": "Minimum width of each column before it wraps to the next row. Attribute of <pura-stat-grid>."
    },
    {
      "name": "dividers",
      "type": "string",
      "default": "(present)",
      "desc": "Controls the 1px lines between cells. Use dividers=\"none\" to remove them. Attribute of <pura-stat-grid>."
    },
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Text for the cell's label, used when the label slot is empty. Attribute of <pura-stat>."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Text for the cell's value, used when the default slot is empty. Attribute of <pura-stat>."
    },
    {
      "name": "delta",
      "type": "string",
      "default": "",
      "desc": "Change text (e.g. \"+12.5%\") rendered next to the value. Attribute of <pura-stat>."
    },
    {
      "name": "trend",
      "type": "up | down | flat",
      "default": "",
      "desc": "Change direction: colors the delta (green/red/neutral), adds an arrow, and exposes the direction via data-trend and aria-label. Attribute of <pura-stat>."
    }
  ],
  "events": [],
  "slots": [
    "label",
    "default",
    "help"
  ],
  "i18nKeys": []
};
