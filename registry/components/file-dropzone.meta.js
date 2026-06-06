export default {
  "name": "file-dropzone",
  "tag": "pura-file-dropzone",
  "category": "Form",
  "title": "File Dropzone",
  "role": "",
  "summary": "Drag-and-drop upload area that lists the selected files as removable chips.",
  "attributes": [
    {
      "name": "accept",
      "type": "string",
      "default": "",
      "desc": "Passed through to the native input to filter file types (e.g. \"image/*,.pdf\")."
    },
    {
      "name": "multiple",
      "type": "boolean",
      "default": "false",
      "desc": "Allows selecting more than one file; without it, each new selection replaces the previous one."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Blocks click, keyboard, and drop, and hides the chips' remove button."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Drop files here or click to browse",
      "desc": "Visible instruction text and aria-label of the zone."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "i18nKeys": []
};
