export default {
  "name": "beams",
  "tag": "pura-beams",
  "category": "Animation",
  "animation": true,
  "title": "Background Beams",
  "role": "",
  "summary": "Light beams traveling along curved SVG paths behind hero content: faint base traces plus a glowing gradient dash on a staggered infinite loop. Deterministic geometry (SSR-stable), pure CSS @keyframes, reduced-motion aware.",
  "attributes": [
    {
      "name": "count",
      "type": "number",
      "default": "8",
      "desc": "Number of beam paths to render (capped at 32)."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "7",
      "desc": "Base loop duration in seconds; each beam varies 0.75x..1.25x of it with a deterministic phase shift."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
