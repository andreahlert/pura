export default {
  "name": "toggle",
  "tag": "pura-toggle",
  "category": "Form",
  "title": "Toggle",
  "role": "",
  "summary": "Two-state button that switches between on and off.",
  "attributes": [
    {
      "name": "pressed",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects the active (on) state of the toggle; present when pressed."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the toggle and prevents switching via click or keyboard."
    },
    {
      "name": "variant",
      "type": "string",
      "default": "default",
      "desc": "Visual style: \"default\" (subtle) or \"outline\" (with a border)."
    },
    {
      "name": "size",
      "type": "string",
      "default": "md",
      "desc": "Button size: \"sm\", \"md\" or \"lg\"."
    },
    {
      "name": "value",
      "type": "string",
      "default": "textContent",
      "desc": "Value associated with the toggle; used by pura-toggle-group and sent in the change event."
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
