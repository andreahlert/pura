export default {
  "name": "rich-text",
  "tag": "pura-rich-text",
  "category": "Form",
  "title": "Rich Text",
  "role": "",
  "summary": "WYSIWYG rich-text editor with a formatting toolbar (bold, italic, underline, headings, lists, link, blockquote, code) and a contenteditable region.",
  "attributes": [
    { "name": "placeholder", "type": "string", "default": "", "desc": "Placeholder text shown when the editor is empty." },
    { "name": "value", "type": "string", "default": "", "desc": "Initial HTML content for the editable area." },
    { "name": "disabled", "type": "boolean", "default": "", "desc": "Blocks editing and disables all toolbar buttons." }
  ],
  "events": ["input", "change"],
  "slots": [],
  "i18nKeys": []
};
