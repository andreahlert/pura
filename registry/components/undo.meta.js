export default {
  "name": "undo",
  "tag": "pura-undo",
  "category": "Feedback",
  "title": "Undo",
  "role": "",
  "summary": "Runs an action and shows an \"undo\" snackbar for a window of time before committing the effect.",
  "attributes": [
    {
      "name": "timeout",
      "type": "number",
      "default": "5000",
      "desc": "Undo window in ms. Values <= 0 keep the snackbar pinned (sticky), resolved only via undo()/commit()."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Action performed.",
      "desc": "Message text when there's no content in the default slot."
    },
    {
      "name": "undo-label",
      "type": "string",
      "default": "Undo",
      "desc": "Text for the undo button."
    }
  ],
  "events": [
    "action",
    "undo",
    "commit"
  ],
  "slots": [
    "trigger",
    "default"
  ],
  "i18nKeys": []
};
