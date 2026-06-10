export default {
  "name": "waves",
  "tag": "pura-waves",
  "category": "Animation",
  "animation": true,
  "title": "Wavy Background",
  "role": "",
  "summary": "Layered sine waves drifting along the bottom or top of a section, as thin lines or filled shapes, with per-layer parallax. Seamless CSS keyframe loop over deterministic SVG paths, no per-frame JS.",
  "attributes": [
    {
      "name": "layers",
      "type": "number",
      "default": "3",
      "desc": "Number of wave layers, 1 to 5."
    },
    {
      "name": "amplitude",
      "type": "number",
      "default": "32",
      "desc": "Crest height in viewBox units (the viewBox is 1440x320)."
    },
    {
      "name": "speed",
      "type": "number",
      "default": "16",
      "desc": "Drift duration in seconds for the front layer; deeper layers move slower for parallax."
    },
    {
      "name": "lines",
      "type": "boolean",
      "default": "false",
      "desc": "Render thin stroked lines instead of filled wave shapes."
    },
    {
      "name": "position",
      "type": "\"bottom\" | \"top\"",
      "default": "bottom",
      "desc": "Which edge of the host the wave band hugs; top flips the waves."
    },
    {
      "name": "paused",
      "type": "boolean",
      "default": "false",
      "desc": "Freeze the drift in place."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
