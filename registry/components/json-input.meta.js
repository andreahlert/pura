export default {
  "name": "json-input",
  "tag": "pura-json-input",
  "category": "Form",
  "title": "Json Input",
  "role": "",
  "summary": "A textarea specialized for JSON that validates on blur, shows an error state with the parse message when invalid, and provides a Format button to pretty-print valid JSON.",
  "attributes": [
    { "name": "value", "type": "string", "default": "", "desc": "The JSON string content of the textarea" },
    { "name": "placeholder", "type": "string", "default": "", "desc": "Textarea placeholder text" },
    { "name": "rows", "type": "number", "default": "6", "desc": "Number of textarea rows" },
    { "name": "format-on-blur", "type": "boolean", "default": "", "desc": "Pretty-print valid JSON automatically on blur" },
    { "name": "disabled", "type": "boolean", "default": "", "desc": "Block editing of the textarea" },
    { "name": "label", "type": "string", "default": "", "desc": "Field label rendered above the textarea" },
    { "name": "indent", "type": "number", "default": "2", "desc": "Number of spaces used when pretty-printing" }
  ],
  "events": ["input", "change"],
  "slots": [],
  "i18nKeys": []
};
