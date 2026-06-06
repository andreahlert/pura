export default {
  "name": "combobox",
  "tag": "pura-combobox",
  "category": "Form",
  "title": "Combobox",
  "role": "",
  "summary": "Autocomplete field that filters a list of options as the user types.",
  "attributes": [
    {
      "name": "placeholder",
      "type": "string",
      "default": "\"\"",
      "desc": "Placeholder text shown in the input when no value is selected."
    },
    {
      "name": "value",
      "type": "string",
      "default": "\"\"",
      "desc": "Initial/current value; must match the value of one of the options to populate the label."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the input and prevents the listbox from opening."
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
