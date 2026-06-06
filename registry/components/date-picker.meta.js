export default {
  "name": "date-picker",
  "tag": "pura-date-picker",
  "category": "Date",
  "title": "Date Picker",
  "role": "",
  "summary": "Date field that opens a calendar in a popover to pick a day.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "\"\"",
      "desc": "Selected date in yyyy-mm-dd format; also available as the .value property."
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "\"Pick a date\"",
      "desc": "Text shown when no date is selected."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the trigger and prevents the calendar from opening."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "i18nKeys": []
};
