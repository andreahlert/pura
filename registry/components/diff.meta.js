export default {
  "name": "diff",
  "tag": "pura-diff",
  "category": "Utility",
  "title": "Diff",
  "role": "",
  "summary": "Shows the word-by-word difference between two texts inline, with removals struck through and additions highlighted.",
  "attributes": [
    {
      "name": "before",
      "type": "string",
      "default": "\"\"",
      "desc": "Original text. Can be overridden by slot[name=\"before\"]."
    },
    {
      "name": "after",
      "type": "string",
      "default": "\"\"",
      "desc": "New text. Can be overridden by slot[name=\"after\"]."
    },
    {
      "name": "mode",
      "type": "\"words\" | \"chars\"",
      "default": "\"words\"",
      "desc": "Diff granularity: by words (default) or by characters."
    },
    {
      "name": "label",
      "type": "string",
      "default": "\"Text diff\"",
      "desc": "Accessible label (aria-label) for the diff region."
    },
    {
      "name": "block",
      "type": "boolean",
      "default": "false",
      "desc": "When present, displays the component as a block instead of inline."
    }
  ],
  "events": [
    "diff"
  ],
  "slots": [
    "before",
    "after"
  ],
  "i18nKeys": []
};
