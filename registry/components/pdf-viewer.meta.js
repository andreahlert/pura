export default {
  "name": "pdf-viewer",
  "tag": "pura-pdf-viewer",
  "category": "Display",
  "title": "Pdf Viewer",
  "role": "",
  "summary": "Thin wrapper that embeds a PDF via the browser's native PDF renderer using an iframe, with an optional toolbar and download link.",
  "attributes": [
    { "name": "src", "type": "string", "default": "", "desc": "URL of the PDF to display." },
    { "name": "height", "type": "string", "default": "600", "desc": "Viewer height as a number (converted to px) or any CSS length." },
    { "name": "download", "type": "boolean", "default": "", "desc": "Shows a download link in the toolbar." },
    { "name": "title", "type": "string", "default": "", "desc": "Display name shown in the toolbar; falls back to the filename from src." }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};
