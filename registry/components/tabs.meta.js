export default {
  "name": "tabs",
  "tag": "pura-tabs",
  "category": "Navigation",
  "title": "Tabs",
  "role": "tablist",
  "summary": "Switches between content panels with an accessible tab bar.",
  "attributes": [
    {
      "name": "active",
      "type": "number",
      "default": "0",
      "desc": "Zero-based index of the active tab on pura-tabs; reflected when switching tabs."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Tab {n}",
      "desc": "Text of the tab button, set on each child pura-tab."
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
