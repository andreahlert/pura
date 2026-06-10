export default {
  "name": "wipe",
  "tag": "pura-wipe",
  "category": "Animation",
  "animation": true,
  "title": "Wipe",
  "role": "",
  "summary": "Page-transition wipe: a full-viewport panel sweeps in, covers the screen (swap your content in the cover event), and sweeps out the far side. Each phase is one CSS transform transition.",
  "attributes": [
    {
      "name": "direction",
      "type": "\"left\" | \"right\" | \"up\" | \"down\"",
      "default": "left",
      "desc": "Side the panel enters from; it exits on the opposite side."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "600",
      "desc": "Milliseconds per sweep phase (in and out)."
    },
    {
      "name": "hold",
      "type": "number",
      "default": "100",
      "desc": "Milliseconds the panel stays fully covering the screen."
    }
  ],
  "events": ["cover", "done"],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
