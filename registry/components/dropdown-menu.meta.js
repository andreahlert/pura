export default {
  "name": "dropdown-menu",
  "tag": "pura-dropdown-menu",
  "category": "Overlay",
  "title": "Dropdown Menu",
  "role": "",
  "summary": "Action menu that opens from a trigger, with keyboard navigation.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Controls/reflects the open state of the menu; present when the popover is visible."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-menu-item>: disables the item, preventing selection and focus."
    }
  ],
  "events": [
    "open",
    "close",
    "select"
  ],
  "slots": [
    "trigger",
    "default",
    "icon",
    "shortcut"
  ],
  "i18nKeys": []
};
