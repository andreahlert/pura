export default {
  "name": "sparkles-text",
  "tag": "pura-sparkles-text",
  "category": "Animation",
  "animation": true,
  "title": "Sparkles Text",
  "role": "",
  "summary": "Text decorated with tiny stars that twinkle and are born/die around the letters. Deterministic scatter (SSR-stable), pure CSS @keyframes, reduced-motion aware.",
  "attributes": [
    {
      "name": "count",
      "type": "number",
      "default": "10",
      "desc": "Number of sparkles to render (capped at 40)."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "1.6",
      "desc": "Seconds per twinkle cycle (birth to death of each star)."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
