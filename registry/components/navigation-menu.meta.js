export default {
  "name": "navigation-menu",
  "tag": "pura-navigation-menu",
  "category": "Navigation",
  "title": "Navigation Menu",
  "role": "",
  "summary": "Horizontal navigation bar with rich panels that open on hover or click.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "\"\"",
      "desc": "Trigger text of the item (pura-navigation-menu-item)."
    },
    {
      "name": "href",
      "type": "string",
      "default": "(none)",
      "desc": "If present, the item becomes a simple link (anchor) instead of opening a panel."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects whether the item's panel is open; also readable via the .open property."
    },
    {
      "name": "aria-label",
      "type": "string",
      "default": "\"Main\"",
      "desc": "Accessible label of the bar (pura-navigation-menu); defaults to \"Main\" if omitted."
    }
  ],
  "events": [
    "open",
    "close"
  ],
  "slots": [
    "default",
    "label"
  ],
  "i18nKeys": []
};
