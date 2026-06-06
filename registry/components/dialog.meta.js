export default {
  "name": "dialog",
  "tag": "pura-dialog",
  "category": "Overlay",
  "title": "Dialog",
  "role": "dialog",
  "summary": "Modal window built on the native dialog element, with backdrop, focus trapping, and ESC to close.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Controls the visibility of the modal; when present, opens the dialog in modal mode."
    },
    {
      "name": "title",
      "type": "string",
      "default": "\"\"",
      "desc": "Text shown in the header when the header slot is not used."
    }
  ],
  "events": [
    "close"
  ],
  "slots": [
    "default",
    "header",
    "footer"
  ],
  "i18nKeys": []
};
