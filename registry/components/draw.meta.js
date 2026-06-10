export default {
  "name": "draw",
  "tag": "pura-draw",
  "category": "Animation",
  "animation": true,
  "title": "Draw",
  "role": "",
  "summary": "SVG draw-on: a stroke writes itself in as you scroll. The path is normalized to pathLength=1 and its stroke-dashoffset ramps 1 to 0 on a scroll-driven timeline. Zero-runtime, no per-frame JS.",
  "attributes": [
    {
      "name": "trigger",
      "type": "\"scrub\" | \"view\" | \"load\"",
      "default": "scrub",
      "desc": "scrub ties the stroke 1:1 to a scroll-driven timeline; view draws once when scrolled into view; load draws once on connect."
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
      "desc": "SVG path d-string to draw on."
    },
    {
      "name": "viewbox",
      "type": "string",
      "default": "0 0 100 100",
      "desc": "SVG viewBox the path is drawn in."
    },
    {
      "name": "stroke",
      "type": "string",
      "default": "currentColor",
      "desc": "Stroke color."
    },
    {
      "name": "stroke-width",
      "type": "number",
      "default": "4",
      "desc": "Stroke width, in viewBox units."
    },
    {
      "name": "fill",
      "type": "string",
      "default": "none",
      "desc": "Path fill (usually none for a pure line-draw)."
    },
    {
      "name": "linecap",
      "type": "\"round\" | \"butt\" | \"square\"",
      "default": "round",
      "desc": "Stroke line cap."
    },
    {
      "name": "range",
      "type": "string",
      "default": "cover 0% cover 50%",
      "desc": "animation-range for the scrub timeline. Default completes the draw as the path reaches viewport center, then holds."
    },
    {
      "name": "loop",
      "type": "boolean",
      "default": "false",
      "desc": "A stroke segment chases around the path forever (infinite loading). Overrides trigger."
    },
    {
      "name": "loop-dur",
      "type": "number",
      "default": "1.6",
      "desc": "Loop only. Seconds per lap around the path."
    },
    {
      "name": "loop-dash",
      "type": "number",
      "default": "0.3",
      "desc": "Loop only. Visible fraction of the path (0..1) in the chasing segment."
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
