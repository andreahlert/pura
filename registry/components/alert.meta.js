export default {
  "name": "alert",
  "tag": "pura-alert",
  "category": "Feedback",
  "title": "Alert",
  "role": "alert",
  "summary": "Callout to highlight information, success, warning, or error messages.",
  "attributes": [
    {
      "name": "variant",
      "type": "\"info\" | \"success\" | \"warning\" | \"danger\"",
      "default": "info",
      "desc": "Semantic variant that sets the callout's color and icon."
    },
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Optional title shown in bold above the description."
    },
    {
      "name": "dismissible",
      "type": "boolean",
      "default": "false",
      "desc": "When present, shows a close button that removes the alert."
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
