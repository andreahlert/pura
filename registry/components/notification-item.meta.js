export default {
  "name": "notification-item",
  "tag": "pura-notification-item",
  "category": "Display",
  "title": "Notification Item",
  "role": "",
  "summary": "A notification row with icon, title, description, time, and an optional dismiss button.",
  "attributes": [
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Bold text for the row title. When omitted, the title line is hidden."
    },
    {
      "name": "time",
      "type": "string",
      "default": "",
      "desc": "Short time or relative time shown on the right (e.g., \"2 min ago\"). Mirrored in the datetime attribute of the <time>."
    },
    {
      "name": "unread",
      "type": "boolean",
      "default": "false",
      "desc": "Shows the unread dot and applies emphasized styling to the title."
    },
    {
      "name": "dismissible",
      "type": "boolean",
      "default": "false",
      "desc": "Renders the dismiss button (×) on the right."
    },
    {
      "name": "dismiss-label",
      "type": "string",
      "default": "Dispensar",
      "desc": "Accessible label (aria-label) for the dismiss button."
    }
  ],
  "events": [
    "read",
    "dismiss"
  ],
  "slots": [
    "icon",
    "(default)"
  ],
  "i18nKeys": []
};
