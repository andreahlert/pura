export default {
  "name": "word-rotate",
  "tag": "pura-word-rotate",
  "category": "Animation",
  "animation": true,
  "title": "Word Rotate",
  "role": "",
  "summary": "Cycles one word inside a sentence with an animated swap (slide, flip or fade) while the container width animates to fit the next word. Unlike pura-typewriter, which types phrases out, this is a whole-word swap.",
  "attributes": [
    {
      "name": "words",
      "type": "string",
      "default": "",
      "desc": "\"|\"-separated words to cycle through."
    },
    {
      "name": "effect",
      "type": "\"slide\" | \"flip\" | \"fade\"",
      "default": "slide",
      "desc": "How the outgoing and incoming words animate."
    },
    {
      "name": "interval",
      "type": "number",
      "default": "2500",
      "desc": "Milliseconds a word stays before rotating."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "500",
      "desc": "Swap animation time in milliseconds."
    },
    {
      "name": "start",
      "type": "\"view\" | \"load\" | \"manual\"",
      "default": "view",
      "desc": "When the rotation starts: on entering the viewport, immediately, or only via start()."
    }
  ],
  "events": [
    "pura-word-rotate"
  ],
  "slots": [],
  "i18nKeys": []
};
