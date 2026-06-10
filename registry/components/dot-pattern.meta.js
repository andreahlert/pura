export default {
  "name": "dot-pattern",
  "tag": "pura-dot-pattern",
  "category": "Animation",
  "animation": true,
  "title": "Dot Pattern",
  "role": "",
  "summary": "A dot field backdrop with hexagon and diagonal-stripe variants, faded through a radial-gradient mask, plus an optional glow that sweeps the field. Pure CSS, SSR-safe, reduced-motion aware.",
  "attributes": [
    {
      "name": "variant",
      "type": "\"dots\" | \"hex\" | \"stripes\"",
      "default": "dots",
      "desc": "Pattern style: dot grid, honeycomb outlines, or diagonal stripes."
    },
    {
      "name": "gap",
      "type": "number",
      "default": "24",
      "desc": "Tile spacing in px (8 to 240). Also sets the hexagon cell width."
    },
    {
      "name": "glow",
      "type": "boolean",
      "default": "false",
      "desc": "Reveal a brighter copy of the pattern through a radial mask that sweeps the field."
    },
    {
      "name": "fade",
      "type": "\"edges\" | \"center\" | \"none\"",
      "default": "edges",
      "desc": "Radial-gradient mask: fade the pattern out toward the edges, at the center, or not at all."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
