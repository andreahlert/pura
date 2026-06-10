export default {
  "name": "text-morph",
  "tag": "pura-text-morph",
  "category": "Animation",
  "animation": true,
  "title": "Morphing Text",
  "role": "",
  "summary": "Gooey morphing text: each phrase melts and fuses fluidly into the next, cycling forever. Two stacked layers crossfade blur and opacity under an SVG alpha-threshold filter; the slotted first phrase is the SSR paint and the accessible copy.",
  "attributes": [
    {
      "name": "texts",
      "type": "string",
      "default": "",
      "desc": "Pipe separated phrases to cycle through, e.g. \"Build|Launch|Scale\". Falls back to the slotted text (static) when absent."
    },
    {
      "name": "morph",
      "type": "number",
      "default": "1.2",
      "desc": "Seconds the gooey crossfade between two phrases takes."
    },
    {
      "name": "hold",
      "type": "number",
      "default": "1.5",
      "desc": "Seconds each phrase stays sharp before melting into the next."
    },
    {
      "name": "blur",
      "type": "number",
      "default": "8",
      "desc": "Peak blur in px during the melt; higher values fuse more aggressively."
    }
  ],
  "events": [
    "pura-text-morph-change"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
