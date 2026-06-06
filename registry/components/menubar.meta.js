export default {
  "name": "menubar",
  "tag": "pura-menubar",
  "category": "Navigation",
  "title": "Menubar",
  "role": "",
  "summary": "Application menu bar with dropdown menus and keyboard navigation.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "\"\"",
      "desc": "Trigger text of a <pura-menubar-menu>."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables a <pura-menubar-menu> or a <pura-menu-item>, preventing opening/selection."
    },
    {
      "name": "inset",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-menu-item>, reserves icon space to align items that have no icon."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflected on <pura-menubar-menu> when its panel is open (read-only)."
    }
  ],
  "events": [
    "open",
    "close",
    "select"
  ],
  "slots": [
    "default",
    "icon",
    "shortcut"
  ],
  "i18nKeys": []
};
