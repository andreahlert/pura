export default {
  "name": "code",
  "tag": "pura-code",
  "category": "Primitives",
  "title": "Code",
  "role": "",
  "summary": "An inline code chip for rendering short snippets, identifiers, and keyboard input within text.",
  "attributes": [
    {
      "name": "variant",
      "type": "\"subtle\" | \"plain\"",
      "default": "subtle",
      "desc": "Visual style. \"subtle\" (default) renders a chip with background, border, and padding; \"plain\" renders bare monospace text with no chip decoration."
    }
  ],
  "events": [],
  "slots": [
    "default — the code text to display"
  ],
  "i18nKeys": []
};
