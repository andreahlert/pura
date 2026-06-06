export default {
  "name": "toast",
  "tag": "pura-toast",
  "category": "Feedback",
  "title": "Toast",
  "role": "",
  "summary": "Temporary notifications stacked in a corner of the screen, with auto-dismiss and an optional action.",
  "attributes": [
    {
      "name": "position",
      "type": "\"bottom-right\" | \"top-left\" | \"top-center\" | \"top-right\" | \"bottom-left\" | \"bottom-center\"",
      "default": "bottom-right",
      "desc": "Corner where <pura-toaster> stacks the toasts (an invalid value falls back to the default)."
    },
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Optional bold title for the <pura-toast>."
    },
    {
      "name": "variant",
      "type": "\"info\" | \"success\" | \"warning\" | \"danger\"",
      "default": "info",
      "desc": "Accent color and icon for the <pura-toast>."
    },
    {
      "name": "duration",
      "type": "number (ms)",
      "default": "4000",
      "desc": "Time until auto-dismiss; 0 or negative keeps the toast pinned."
    }
  ],
  "events": [
    "dismiss"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
