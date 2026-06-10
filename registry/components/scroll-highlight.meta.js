export default {
  "name": "scroll-highlight",
  "tag": "pura-scroll-highlight",
  "category": "Animation",
  "animation": true,
  "title": "Scroll Highlight",
  "role": "",
  "summary": "Text that highlights word by word as you scroll: every word rides the host's named view timeline on its own animation-range slice, so the highlight sweeps through the text 1:1 with scroll. Zero per-frame JS.",
  "attributes": [
    {
      "name": "start",
      "type": "number",
      "default": "10",
      "desc": "View progress (cover %) where the first word begins highlighting."
    },
    {
      "name": "end",
      "type": "number",
      "default": "75",
      "desc": "View progress (cover %) where the last word finishes highlighting."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
