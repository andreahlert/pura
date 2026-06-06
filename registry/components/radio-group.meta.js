export default {
  "name": "radio-group",
  "tag": "pura-radio-group",
  "category": "Form",
  "title": "Radio Group",
  "role": "",
  "summary": "Groups mutually exclusive radio options with keyboard navigation.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Heading/legend text for the group, also used as the aria-label."
    },
    {
      "name": "orientation",
      "type": "\"vertical\" | \"horizontal\"",
      "default": "vertical",
      "desc": "Layout direction of the options."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Value of the selected option; it reflects and is reflected by the checked radio."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the entire group, blocking interaction."
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
