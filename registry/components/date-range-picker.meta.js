export default {
  "name": "date-range-picker",
  "tag": "pura-date-range-picker",
  "category": "Date",
  "title": "Date Range Picker",
  "role": "dialog",
  "summary": "A date range picker with a trigger that shows the formatted range and opens a popover with one or two month grids for selecting start and end dates.",
  "attributes": [
    { "name": "start", "type": "string", "default": "", "desc": "Start date in YYYY-MM-DD format" },
    { "name": "end", "type": "string", "default": "", "desc": "End date in YYYY-MM-DD format" },
    { "name": "months", "type": "number", "default": "2", "desc": "Number of month grids shown: 1 or 2" },
    { "name": "disabled", "type": "boolean", "default": "", "desc": "Disables the trigger" }
  ],
  "events": ["change"],
  "slots": [],
  "i18nKeys": []
};
