export default {
  "name": "stack",
  "tag": "pura-stack",
  "category": "Primitives",
  "title": "Stack",
  "role": "",
  "summary": "A vertical flex column that spaces its children with a consistent gap.",
  "attributes": [
    {
      "name": "gap",
      "type": "string",
      "default": "4",
      "desc": "Space scale 0-6 that sets the gap between children; maps to --pura-space-N (0 means no gap)."
    },
    {
      "name": "align",
      "type": "string",
      "default": "stretch",
      "desc": "Cross-axis alignment of children: start, center, end, or stretch."
    },
    {
      "name": "justify",
      "type": "string",
      "default": "start",
      "desc": "Main-axis distribution of children: start, center, end, between, or around."
    },
    {
      "name": "divide",
      "type": "boolean",
      "default": "false",
      "desc": "When present, draws a 1px border between children, using the gap value as padding around each rule."
    }
  ],
  "events": [],
  "slots": [
    "default — the stacked children"
  ],
  "i18nKeys": []
};
