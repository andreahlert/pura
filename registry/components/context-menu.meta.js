export default {
  "name": "context-menu",
  "tag": "pura-context-menu",
  "category": "Overlay",
  "title": "Context Menu",
  "role": "",
  "summary": "Right-click menu that opens a floating panel at the pointer position.",
  "attributes": [
    {
      "name": "target",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the host itself the contextmenu target instead of the default slot region."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables opening the menu on contextmenu."
    },
    {
      "name": "variant",
      "type": "string (default | danger)",
      "default": "default",
      "desc": "Attribute of pura-menu-item: item style, danger uses the danger color."
    },
    {
      "name": "inset",
      "type": "boolean",
      "default": "false",
      "desc": "Attribute of pura-menu-item: adds left indentation to align items without an icon."
    }
  ],
  "events": [
    "open",
    "close",
    "select"
  ],
  "slots": [
    "default",
    "menu",
    "icon",
    "shortcut"
  ],
  "i18nKeys": []
};
