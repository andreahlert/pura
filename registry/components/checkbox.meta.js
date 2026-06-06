export default {
  "name": "checkbox",
  "tag": "pura-checkbox",
  "category": "Form",
  "title": "Checkbox",
  "role": "",
  "summary": "Accessible checkbox for boolean options.",
  "attributes": [
    {
      "name": "checked",
      "type": "boolean",
      "default": "false",
      "desc": "Sets whether the box is checked; reflects the state and syncs aria-checked."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables interaction and removes keyboard focus."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
