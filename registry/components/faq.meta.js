export default {
  "name": "faq",
  "tag": "pura-faq",
  "category": "Disclosure",
  "title": "FAQ",
  "role": "",
  "summary": "Question-and-answer accordion built on native details/summary, with single or multiple open items.",
  "attributes": [
    {
      "name": "multi",
      "type": "boolean",
      "default": "false",
      "desc": "Allows several items open at the same time. Without it, the FAQ is single-open: opening one item closes the others."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Frequently asked questions",
      "desc": "Accessible name for the FAQ region (aria-label)."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "On pura-faq-item: reflected, indicates whether the answer is expanded."
    }
  ],
  "events": [
    "open",
    "close"
  ],
  "slots": [
    "default",
    "question"
  ],
  "i18nKeys": []
};
