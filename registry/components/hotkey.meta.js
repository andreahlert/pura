export default {
  "name": "hotkey",
  "tag": "pura-hotkey",
  "category": "Agent",
  "title": "Hotkey",
  "role": "",
  "summary": "Declarative, invisible binder for global keyboard shortcuts, with a machine-readable layer.",
  "attributes": [
    {
      "name": "keys",
      "type": "string",
      "default": "",
      "desc": "The combo to bind, e.g. \"mod+k\", \"Ctrl Shift P\", \"⌘ /\". `mod` becomes ⌘ on Apple and Ctrl elsewhere. Empty/absent => no binding."
    },
    {
      "name": "target",
      "type": "string",
      "default": "",
      "desc": "Optional CSS selector; on trigger, the first match is activated (focus + click on buttons/links, or .show()/.open()/.click() if exposed)."
    },
    {
      "name": "when",
      "type": "string",
      "default": "",
      "desc": "Optional CSS selector that must exist in the document for the binding to be active (scopes the shortcut to a state)."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "While present, the binding is inert."
    },
    {
      "name": "allow-in-input",
      "type": "boolean",
      "default": "false",
      "desc": "By default the combo is ignored while typing in input/textarea/select/contenteditable. Enable to let it fire inside fields (modifier combos, such as mod+k, always fire)."
    },
    {
      "name": "prevent-default",
      "type": "boolean",
      "default": "true para combos com modificador",
      "desc": "When set, prevents the browser's default action on keydown. On by default for combos that have a modifier."
    }
  ],
  "events": [
    "trigger"
  ],
  "slots": [],
  "i18nKeys": []
};
