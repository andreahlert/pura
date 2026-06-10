export default {
  "name": "flashlight",
  "tag": "pura-flashlight",
  "category": "Animation",
  "animation": true,
  "title": "Flashlight",
  "role": "",
  "summary": "Hidden content revealed by a beam of light that follows the pointer across the section, via a radial-gradient mask-image steered by CSS vars. SSR paints the resting state; reduced motion shows the final state.",
  "attributes": [
    {
      "name": "size",
      "type": "string",
      "default": "220px",
      "desc": "Beam diameter. A bare number is treated as px; any CSS length works."
    },
    {
      "name": "softness",
      "type": "number",
      "default": "0.25",
      "desc": "Edge feather of the beam, 0 (hard circle) to 1 (fully diffuse)."
    },
    {
      "name": "resting",
      "type": "\"closed\" | \"center\"",
      "default": "closed",
      "desc": "Pre-pointer and SSR paint: closed hides the reveal layer until hover; center shows it through a centred beam."
    }
  ],
  "events": [],
  "slots": [
    "default",
    "reveal"
  ],
  "i18nKeys": []
};
