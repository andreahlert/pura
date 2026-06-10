export default {
  "name": "pulse-rings",
  "tag": "pura-pulse-rings",
  "category": "Animation",
  "animation": true,
  "title": "Pulse Rings",
  "role": "",
  "summary": "Concentric rings that expand and fade from the center behind the slotted content, the classic soft signal or radar backdrop. Pure CSS keyframes with a deterministic stagger, zero per-frame JS, static frozen frame under reduced motion.",
  "attributes": [
    {
      "name": "count",
      "type": "number",
      "default": "4",
      "desc": "Number of rings, capped at 8."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "3",
      "desc": "Seconds per expand and fade cycle."
    },
    {
      "name": "scale",
      "type": "number",
      "default": "2.5",
      "desc": "Expansion factor each ring grows to before vanishing."
    },
    {
      "name": "filled",
      "type": "boolean",
      "default": "false",
      "desc": "Tints each ring with a faint background fill."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
