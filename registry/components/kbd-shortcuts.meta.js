export default {
  "name": "kbd-shortcuts",
  "tag": "pura-kbd-shortcuts",
  "category": "Overlay",
  "title": "Keyboard Shortcuts",
  "role": "",
  "summary": "Help modal that lists the page's keyboard shortcuts, grouped by section.",
  "attributes": [
    {
      "name": "title",
      "type": "string",
      "default": "Keyboard shortcuts",
      "desc": "Title shown in the dialog header (the \"header\" slot takes priority when filled)."
    },
    {
      "name": "key",
      "type": "string",
      "default": "",
      "desc": "Key combo that opens/toggles the help when pressed anywhere in the document, e.g. \"?\" or \"Meta+/\" / \"⌘ /\". Empty = no binding. Accepts symbol tokens (⌘ ⌥ ⌃ ⇧) or names (Meta Cmd Ctrl Control Alt Option Shift) plus a final key, separated by a space or \"+\"."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects and controls the open state; the presence of the attribute opens the dialog (showModal)."
    }
  ],
  "events": [
    "open",
    "close"
  ],
  "slots": [
    "default",
    "header",
    "footer"
  ],
  "i18nKeys": []
};
