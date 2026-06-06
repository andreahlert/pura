export default {
  "name": "time-picker",
  "tag": "pura-time-picker",
  "category": "Date",
  "title": "Time Picker",
  "role": "",
  "summary": "A time input that shows formatted selected time via a trigger and opens a popover with a scrollable list of selectable times stepped by minutes.",
  "attributes": [
    { "name": "value", "type": "string", "default": "", "desc": "Selected time as HH:MM or HH:MM:SS" },
    { "name": "step", "type": "string", "default": "30", "desc": "Step between time options in minutes" },
    { "name": "use24", "type": "boolean", "default": "", "desc": "Use 24-hour time format" },
    { "name": "seconds", "type": "boolean", "default": "", "desc": "Include seconds in value and display" },
    { "name": "min", "type": "string", "default": "", "desc": "Minimum selectable time as HH:MM" },
    { "name": "max", "type": "string", "default": "", "desc": "Maximum selectable time as HH:MM" },
    { "name": "placeholder", "type": "string", "default": "Pick a time", "desc": "Placeholder text when no time is selected" },
    { "name": "disabled", "type": "boolean", "default": "", "desc": "Disables the picker" }
  ],
  "events": ["change"],
  "slots": [],
  "i18nKeys": []
};
