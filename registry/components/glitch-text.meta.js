export default {
  "name": "glitch-text",
  "tag": "pura-glitch-text",
  "category": "Animation",
  "animation": true,
  "title": "Glitch Text",
  "role": "",
  "summary": "Digital glitch text: two RGB-shifted copies with jumping horizontal clip-path slices over the always-present real text, signal-error style. Pure CSS keyframes, glitch turns off under reduced motion.",
  "attributes": [
    {
      "name": "speed",
      "type": "number",
      "default": "3",
      "desc": "Glitch cycle duration in seconds; the second layer runs 1.4x slower so the tracks desync."
    },
    {
      "name": "intensity",
      "type": "\"low\" | \"medium\" | \"high\"",
      "default": "medium",
      "desc": "Horizontal shift distance of the RGB layers (1px / 2px / 5px)."
    },
    {
      "name": "hover",
      "type": "boolean",
      "default": "false",
      "desc": "Only glitch while hovered; the text renders static otherwise."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
