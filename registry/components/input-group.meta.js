export default {
  "name": "input-group",
  "tag": "pura-input-group",
  "category": "Form",
  "title": "Input Group",
  "role": "",
  "summary": "Groups a text field with prefixes and suffixes inside a single container with a shared border.",
  "attributes": [
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the group, lowering opacity and blocking interaction with the slotted content."
    },
    {
      "name": "invalid",
      "type": "boolean",
      "default": "false",
      "desc": "Applies the error style (border and ring in the danger color) to the container."
    }
  ],
  "events": [],
  "slots": [
    "default",
    "prefix",
    "suffix"
  ],
  "i18nKeys": []
};
