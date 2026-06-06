export default {
  "name": "markdown-editor",
  "tag": "pura-markdown-editor",
  "category": "Form",
  "title": "Markdown Editor",
  "role": "group",
  "summary": "A split editor with a markdown textarea and a live rendered preview, including a toolbar for inserting common markdown syntax and a self-contained zero-dependency markdown renderer.",
  "attributes": [
    { "name": "value", "type": "string", "default": "", "desc": "Initial markdown text content" },
    { "name": "placeholder", "type": "string", "default": "", "desc": "Textarea placeholder text" },
    { "name": "preview", "type": "string", "default": "side", "desc": "Preview layout: side (textarea and preview side by side), tab (toggle), or off (textarea only)" }
  ],
  "events": ["input"],
  "slots": [],
  "i18nKeys": []
};
