export default {
  "name": "mediaquery",
  "tag": "pura-mediaquery",
  "category": "Utility",
  "title": "Media Query",
  "role": "",
  "summary": "Conditionally renders content based on a CSS media query, with agent-readable responsive state.",
  "attributes": [
    {
      "name": "query",
      "type": "string",
      "default": "",
      "desc": "The CSS media query to evaluate, for example \"(max-width: 640px)\". Absent or invalid never matches, so the default content is shown. Observed: it swaps live when changed."
    }
  ],
  "events": [
    "pura-mediaquery:change"
  ],
  "slots": [
    "match",
    "default"
  ],
  "i18nKeys": []
};
