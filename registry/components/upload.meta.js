export default {
  "name": "upload",
  "tag": "pura-upload",
  "category": "Form",
  "title": "Upload",
  "role": "",
  "summary": "A managed file uploader with a drag-and-drop surface, file list with progress bars, status indicators, and an optional uploader function property.",
  "attributes": [
    { "name": "multiple", "type": "boolean", "default": "", "desc": "Allow multiple file selection" },
    { "name": "accept", "type": "string", "default": "", "desc": "Accepted file types (passed to native input)" },
    { "name": "auto", "type": "boolean", "default": "", "desc": "Automatically start upload on file selection" },
    { "name": "max-size", "type": "string", "default": "", "desc": "Maximum file size in bytes" },
    { "name": "disabled", "type": "boolean", "default": "", "desc": "Disables the drop zone and file input" }
  ],
  "events": ["change", "upload", "remove"],
  "slots": [],
  "i18nKeys": []
};
