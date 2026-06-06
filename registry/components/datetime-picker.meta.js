export default {
  "name": "datetime-picker",
  "tag": "pura-datetime-picker",
  "category": "Date",
  "title": "Datetime Picker",
  "role": "dialog",
  "summary": "A date and time picker that combines a calendar grid and hour/minute selects in a popover, with a value of \"YYYY-MM-DDTHH:MM\".",
  "attributes": [
    { "name": "value", "type": "string", "default": "", "desc": "Date-time value in YYYY-MM-DDTHH:MM format" },
    { "name": "use24", "type": "boolean", "default": "", "desc": "Use 24-hour time format" },
    { "name": "minuteStep", "type": "number", "default": "5", "desc": "Minute select step interval" },
    { "name": "disabled", "type": "boolean", "default": "", "desc": "Disables the trigger" }
  ],
  "events": ["change"],
  "slots": [],
  "i18nKeys": []
};
