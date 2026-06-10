export default {
  "name": "true-focus",
  "tag": "pura-true-focus",
  "category": "Animation",
  "animation": true,
  "title": "True Focus",
  "role": "",
  "summary": "Keeps one word at a time in sharp focus inside an animated corner-bracket viewfinder while the other words blur out, cycling through the sentence. Blur is pure CSS; the frame travels between words with a FLIP step via WAAPI.",
  "attributes": [
    {
      "name": "interval",
      "type": "number",
      "default": "1500",
      "desc": "Milliseconds each word stays focused while auto-cycling."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "400",
      "desc": "Frame travel and blur transition time in ms."
    },
    {
      "name": "blur",
      "type": "number",
      "default": "5",
      "desc": "Blur radius in px applied to unfocused words."
    },
    {
      "name": "manual",
      "type": "boolean",
      "default": "false",
      "desc": "Focus follows pointer hover over the words instead of auto-cycling."
    }
  ],
  "events": [
    "focuschange"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
