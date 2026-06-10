export default {
  "name": "type-morph",
  "tag": "pura-type-morph",
  "category": "Animation",
  "animation": true,
  "title": "Type Morph",
  "role": "",
  "summary": "Variable-font axis morph: slotted text physically thickens (wght) and widens (wdth) as the native font-weight and font-stretch axes interpolate. Defaults to a scroll-scrubbed timeline so the letters morph as you scroll. Zero-runtime, native scroll-driven animation, no per-frame JS.",
  "attributes": [
    {
      "name": "trigger",
      "type": "\"scrub\" | \"view\" | \"load\"",
      "default": "scrub",
      "desc": "scrub ties the axes 1:1 to a scroll-driven timeline; view morphs once when scrolled into view; load morphs once on connect."
    },
    {
      "name": "timeline",
      "type": "\"view\" | \"scroll\"",
      "default": "view",
      "desc": "Scrub only. view maps the element's own view progress; scroll maps the nearest scroll container."
    },
    {
      "name": "from-wght",
      "type": "number",
      "default": "400",
      "desc": "Starting weight axis."
    },
    {
      "name": "to-wght",
      "type": "number",
      "default": "800",
      "desc": "Ending weight axis."
    },
    {
      "name": "from-wdth",
      "type": "number",
      "default": "100",
      "desc": "Starting width axis (percent)."
    },
    {
      "name": "to-wdth",
      "type": "number",
      "default": "100",
      "desc": "Ending width axis (percent)."
    },
    {
      "name": "range",
      "type": "string",
      "default": "cover 0% cover 50%",
      "desc": "animation-range for the scrub timeline. Default completes the morph as the word reaches viewport center, then holds."
    },
    {
      "name": "preset",
      "type": "\"default\" | \"gentle\" | \"wobbly\" | \"stiff\" | \"slow\" | \"snappy\"",
      "default": "default",
      "desc": "Spring easing for view/load triggers. Or set stiffness/damping/mass directly."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
