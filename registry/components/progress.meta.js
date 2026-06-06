export default {
  "name": "progress",
  "tag": "pura-progress",
  "category": "Display",
  "title": "Progress",
  "role": "",
  "summary": "Determinate or indeterminate progress bar to indicate the advancement of a task.",
  "attributes": [
    {
      "name": "value",
      "type": "number",
      "default": "0",
      "desc": "Current progress from 0 to 100; out-of-range values are clamped."
    },
    {
      "name": "indeterminate",
      "type": "boolean",
      "default": "false",
      "desc": "When present, shows an indefinite progress animation and ignores value."
    }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};
