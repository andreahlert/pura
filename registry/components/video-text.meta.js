export default {
  "name": "video-text",
  "tag": "pura-video-text",
  "category": "Animation",
  "animation": true,
  "title": "Video Text",
  "role": "",
  "summary": "Giant typography whose fill is a playing video: an SVG text mask generated in the pure template clips the slotted video to the glyphs. The mask is static CSS, so the initial paint is SSR-safe; reduced motion pauses the video.",
  "attributes": [
    {
      "name": "text",
      "type": "string",
      "default": "",
      "desc": "The string rendered as the video mask. Without it the slotted media shows full bleed."
    },
    {
      "name": "font-size",
      "type": "string",
      "default": "20em",
      "desc": "SVG length for the mask glyphs (any SVG font-size value)."
    },
    {
      "name": "font-weight",
      "type": "string",
      "default": "900",
      "desc": "Font weight of the mask glyphs."
    },
    {
      "name": "font-family",
      "type": "string",
      "default": "system-ui, sans-serif",
      "desc": "Font stack used to draw the mask glyphs."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
