export default {
  "name": "heatmap",
  "tag": "pura-heatmap",
  "category": "Display",
  "title": "Heatmap",
  "role": "",
  "summary": "A calendar or matrix heatmap (GitHub contributions style) that accepts data via the data property or attribute and renders intensity buckets using design tokens.",
  "attributes": [
    { "name": "type", "type": "string", "default": "calendar", "desc": "Display mode: calendar or matrix" },
    { "name": "weeks", "type": "number", "default": "53", "desc": "Number of week columns to render in calendar mode" },
    { "name": "end", "type": "string", "default": "", "desc": "End date (YYYY-MM-DD) for calendar mode; defaults to today" },
    { "name": "data", "type": "string", "default": "", "desc": "JSON data: {YYYY-MM-DD: count} map for calendar or 2D number array for matrix" }
  ],
  "events": ["cellclick"],
  "slots": [],
  "i18nKeys": []
};
