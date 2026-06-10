export default {
  "name": "noise",
  "tag": "pura-noise",
  "category": "Animation",
  "animation": true,
  "title": "Noise / Film Grain",
  "role": "",
  "summary": "Animated film-grain overlay: an SVG feTurbulence tile shuffled by a steps() keyframe on background-position, the analog texture finish seen on nearly every awwwards site. Zero JS, deterministic, SSR-safe, static under reduced motion.",
  "attributes": [
    {
      "name": "opacity",
      "type": "number",
      "default": "0.08",
      "desc": "Grain opacity, 0..1."
    },
    {
      "name": "size",
      "type": "number",
      "default": "256",
      "desc": "Rendered tile size in px; smaller means finer grain."
    },
    {
      "name": "frequency",
      "type": "number",
      "default": "0.8",
      "desc": "feTurbulence baseFrequency, 0.05..4; higher means denser noise."
    },
    {
      "name": "fps",
      "type": "number",
      "default": "12",
      "desc": "Grain shuffle frames per second, 1..60."
    },
    {
      "name": "blend",
      "type": "string",
      "default": "overlay",
      "desc": "mix-blend-mode of the grain layer, e.g. overlay, soft-light, normal."
    },
    {
      "name": "static",
      "type": "boolean",
      "default": "false",
      "desc": "Keep the grain texture but never animate it."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
