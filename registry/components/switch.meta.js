export default {
  "name": "switch",
  "tag": "pura-switch",
  "category": "Form",
  "title": "Switch",
  "role": "",
  "summary": "An on/off toggle for flipping a setting, with an optional label.",
  "attributes": [
    {
      "name": "checked",
      "type": "boolean",
      "default": "false",
      "desc": "Sets whether the switch is on; reflects the .checked property."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables interaction and removes the switch from the focus order."
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
