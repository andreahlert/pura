export default {
  "name": "motion-path",
  "tag": "pura-motion-path",
  "category": "Animation",
  "animation": true,
  "title": "Motion Path",
  "role": "",
  "summary": "Slotted content rides an SVG path: native offset-path places it on the curve and offset-distance 0% to 100% moves it along, by default scrubbed 1:1 by a scroll-driven timeline. offset-rotate keeps it facing the direction of travel. Zero-runtime, no per-frame JS.",
  "attributes": [
    {
      "name": "trigger",
      "type": "\"scrub\" | \"view\" | \"load\"",
      "default": "scrub",
      "desc": "scrub ties the travel 1:1 to a scroll-driven timeline; view travels once when scrolled into view; load travels once on connect."
    },
    {
      "name": "timeline",
      "type": "\"view\" | \"scroll\"",
      "default": "view",
      "desc": "Scrub only. view maps the element's own view progress; scroll maps the nearest scroll container."
    },
    {
      "name": "path",
      "type": "string",
      "default": "wave",
      "desc": "SVG path d-string to travel. Coordinates are px in the host's box (offset-path has no viewBox)."
    },
    {
      "name": "no-rotate",
      "type": "boolean",
      "default": "false",
      "desc": "Keep the content upright instead of rotating to face the direction of travel."
    },
    {
      "name": "show-path",
      "type": "boolean",
      "default": "false",
      "desc": "Draw a faint dotted guide of the path behind the moving content."
    },
    {
      "name": "line-color",
      "type": "string",
      "default": "currentColor",
      "desc": "Guide stroke color (with show-path)."
    },
    {
      "name": "range",
      "type": "string",
      "default": "cover 0% cover 50%",
      "desc": "animation-range for the scrub timeline. Default completes the travel as the element reaches viewport center, then holds."
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
