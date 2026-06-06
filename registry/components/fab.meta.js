export default {
  "name": "fab",
  "tag": "pura-fab",
  "category": "Layout",
  "title": "Floating Action Button",
  "role": "",
  "summary": "Floating action button pinned to a corner of the viewport, round or extended into a pill.",
  "attributes": [
    {
      "name": "position",
      "type": "string",
      "default": "bottom-right",
      "desc": "Corner where the button is pinned: bottom-right, bottom-left, top-right, or top-left."
    },
    {
      "name": "extended",
      "type": "boolean",
      "default": "false",
      "desc": "Shows the text label next to the icon (pill shape instead of a circle)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Action",
      "desc": "Accessible name for the icon-only button. Ignored when extended and the label slot has text."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the button non-interactive."
    },
    {
      "name": "hidden",
      "type": "boolean",
      "default": "false",
      "desc": "Standard HTML; removes the host from layout."
    }
  ],
  "events": [
    "pura-fab-click"
  ],
  "slots": [
    "(default)",
    "icon"
  ],
  "i18nKeys": []
};
