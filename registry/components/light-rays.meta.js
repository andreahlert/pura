export default {
  "name": "light-rays",
  "tag": "pura-light-rays",
  "category": "Animation",
  "animation": true,
  "title": "Light Rays",
  "role": "",
  "summary": "Volumetric god rays falling from above the content: narrow translucent conic-gradient wedges from an off-frame origin, blurred and slowly swaying in angle and intensity. Pure CSS, deterministic scatter, SSR-stable, reduced-motion aware.",
  "attributes": [
    {
      "name": "count",
      "type": "number",
      "default": "8",
      "desc": "Number of rays to render (capped at 32)."
    },
    {
      "name": "origin",
      "type": "\"left\" | \"center\" | \"right\"",
      "default": "center",
      "desc": "Horizontal position of the off-frame light source."
    },
    {
      "name": "spread",
      "type": "number",
      "default": "40",
      "desc": "Total fan width in degrees (clamped 5..170)."
    },
    {
      "name": "intensity",
      "type": "number",
      "default": "0.6",
      "desc": "Peak ray opacity, 0..1."
    },
    {
      "name": "speed",
      "type": "number",
      "default": "10",
      "desc": "Base sway cycle in seconds; per-ray durations and delays derive from it."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
