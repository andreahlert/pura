export default {
  "name": "diff-motion",
  "tag": "pura-diff-motion",
  "category": "Utility",
  "animation": true,
  "title": "Diff Motion",
  "role": "",
  "summary": "Watches its children and on every mutation computes a keyed semantic diff, emitting { added, removed, moved, changed } and colour-coding each: added glow green and scale in, moved FLIP-slide blue, changed flash amber.",
  "attributes": [
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Stops observing; children mutate with no diff or animation."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "(token)",
      "desc": "Overrides the token-derived FLIP duration in milliseconds."
    }
  ],
  "events": [
    {
      "name": "diffmotion",
      "detail": "{ added, removed, moved, changed }",
      "desc": "Fired after every observed mutation; each field is an array of child keys."
    }
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
