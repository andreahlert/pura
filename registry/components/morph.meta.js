export default {
  "name": "morph",
  "tag": "pura-morph",
  "category": "Animation",
  "animation": true,
  "title": "Morph",
  "role": "",
  "summary": "SVG path morph: one shape bends into another as you scroll. The native `d` geometry property interpolates between two matched-command path() values on a scroll-driven timeline. Zero-runtime, no flubber, no per-frame JS. Source and target paths must share command structure.",
  "attributes": [
    {
      "name": "trigger",
      "type": "\"scrub\" | \"view\" | \"load\"",
      "default": "scrub",
      "desc": "scrub ties the path 1:1 to a scroll-driven timeline; view morphs once when scrolled into view; load morphs once on connect."
    },
    {
      "name": "timeline",
      "type": "\"view\" | \"scroll\"",
      "default": "view",
      "desc": "Scrub only. view maps the element's own view progress; scroll maps the nearest scroll container."
    },
    {
      "name": "from",
      "type": "string",
      "default": "square",
      "desc": "Starting SVG path d-string. Must share command structure with `to`."
    },
    {
      "name": "to",
      "type": "string",
      "default": "diamond",
      "desc": "Ending SVG path d-string. Same count and order of commands as `from`, or it snaps instead of morphing."
    },
    {
      "name": "viewbox",
      "type": "string",
      "default": "0 0 100 100",
      "desc": "SVG viewBox the paths are drawn in."
    },
    {
      "name": "fill",
      "type": "string",
      "default": "currentColor",
      "desc": "Shape fill."
    },
    {
      "name": "stroke",
      "type": "string",
      "default": "none",
      "desc": "Shape stroke color."
    },
    {
      "name": "stroke-width",
      "type": "number",
      "default": "0",
      "desc": "Shape stroke width, in viewBox units."
    },
    {
      "name": "range",
      "type": "string",
      "default": "cover 0% cover 50%",
      "desc": "animation-range for the scrub timeline. Default completes the morph as the shape reaches viewport center, then holds."
    },
    {
      "name": "preset",
      "type": "\"default\" | \"gentle\" | \"wobbly\" | \"stiff\" | \"slow\" | \"snappy\"",
      "default": "default",
      "desc": "Spring easing for view/load triggers. Or set stiffness/damping/mass directly."
    }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};
