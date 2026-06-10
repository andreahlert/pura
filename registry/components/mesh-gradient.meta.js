export default {
  "name": "mesh-gradient",
  "tag": "pura-mesh-gradient",
  "category": "Animation",
  "animation": true,
  "title": "Animated Mesh Gradient",
  "role": "",
  "summary": "Animated mesh-gradient background: large blurred color blobs drift and blend slowly behind the slotted content, the full-bleed multicolor SaaS-hero backdrop. Pure CSS keyframes with prime durations per layer so the pattern never visibly repeats; freezes under reduced motion.",
  "attributes": [
    {
      "name": "blobs",
      "type": "number",
      "default": "5",
      "desc": "Number of color blobs, clamped to 2..8."
    },
    {
      "name": "speed",
      "type": "number",
      "default": "1",
      "desc": "Drift speed multiplier; 2 is twice as fast, 0.5 is half speed."
    },
    {
      "name": "static",
      "type": "boolean",
      "default": "false",
      "desc": "Freezes the mesh at its painted state (no drift)."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
