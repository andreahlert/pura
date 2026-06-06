export default {
  "name": "select",
  "tag": "pura-select",
  "category": "Form",
  "title": "Select",
  "role": "",
  "summary": "A styled native select that is accessible and agent-readable.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Label text shown above the select."
    },
    {
      "name": "hint",
      "type": "string",
      "default": "",
      "desc": "Helper text shown below the select."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Selected value; also reflected as a property and updated on change."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the select when present."
    },
    {
      "name": "invalid",
      "type": "boolean",
      "default": "false",
      "desc": "Applies an error style and aria-invalid when present."
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
