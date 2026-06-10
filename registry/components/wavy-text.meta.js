export default {
  "name": "wavy-text",
  "tag": "pura-wavy-text",
  "category": "Animation",
  "animation": true,
  "title": "Wavy Text",
  "role": "",
  "summary": "Characters bob on a continuous sine wave, phase-shifted per character: the classic wavy text of footers and playful CTAs. 100% CSS keyframes, SSR-safe, still under reduced motion.",
  "attributes": [
    {
      "name": "text",
      "type": "string",
      "default": "",
      "desc": "String to animate. When absent, the slotted text is lifted into it on connect."
    },
    {
      "name": "amplitude",
      "type": "string",
      "default": "0.3em",
      "desc": "CSS length for the bob height."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "1.6",
      "desc": "Seconds for one full wave cycle."
    },
    {
      "name": "stagger",
      "type": "number",
      "default": "90",
      "desc": "Milliseconds of phase shift between adjacent characters."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
