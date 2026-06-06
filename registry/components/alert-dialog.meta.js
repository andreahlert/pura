export default {
  "name": "alert-dialog",
  "tag": "pura-alert-dialog",
  "category": "Overlay",
  "title": "Alert Dialog",
  "role": "",
  "summary": "Confirmation modal that requires a decision from the user before closing.",
  "attributes": [
    {
      "name": "title",
      "type": "string",
      "default": "\"\"",
      "desc": "Title shown in the dialog header."
    },
    {
      "name": "description",
      "type": "string",
      "default": "\"\"",
      "desc": "Body text, used when the default slot is empty."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Controls visibility; present = open (reflects the state and triggers showModal/close)."
    }
  ],
  "events": [
    "confirm",
    "cancel",
    "close"
  ],
  "slots": [
    "default",
    "cancel",
    "action"
  ],
  "i18nKeys": []
};
