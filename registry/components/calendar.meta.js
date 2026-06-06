export default {
  "name": "calendar",
  "tag": "pura-calendar",
  "category": "Date",
  "title": "Calendar",
  "role": "",
  "summary": "Month calendar with date selection, navigation, and accessible keyboard support.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "\"\"",
      "desc": "Selected day in yyyy-mm-dd format; reflects the user's selection."
    },
    {
      "name": "month",
      "type": "string",
      "default": "current month (yyyy-mm)",
      "desc": "Displayed month in yyyy-mm format; defaults to the current month."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "i18nKeys": []
};
