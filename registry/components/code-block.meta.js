export default {
  "name": "code-block",
  "tag": "pura-code-block",
  "category": "Display",
  "title": "Code Block",
  "role": "",
  "summary": "Code block with a header, language label and a built-in copy button.",
  "attributes": [
    {
      "name": "language",
      "type": "string",
      "default": "",
      "desc": "Language label shown in the header (e.g. \"js\", \"css\"). Optional."
    },
    {
      "name": "filename",
      "type": "string",
      "default": "",
      "desc": "Filename shown in the header. Optional; it also becomes the block's aria-label."
    },
    {
      "name": "numbered",
      "type": "boolean",
      "default": "false",
      "desc": "When present, shows a gutter with line numbers."
    }
  ],
  "events": [
    "pura-copy"
  ],
  "slots": [
    "(default)"
  ],
  "i18nKeys": []
};
