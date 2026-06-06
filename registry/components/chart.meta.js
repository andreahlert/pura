export default {
  "name": "chart",
  "tag": "pura-chart",
  "category": "Display",
  "title": "Chart",
  "role": "img",
  "summary": "A pure-SVG multi-series chart supporting line, bar, and area types with no external dependencies.",
  "attributes": [
    { "name": "type", "type": "string", "default": "line", "desc": "Chart type: \"line\", \"bar\", or \"area\"" },
    { "name": "data", "type": "string", "default": "", "desc": "JSON series payload: array of numbers or array of {label,values} objects" },
    { "name": "width", "type": "number", "default": "480", "desc": "Chart width in px" },
    { "name": "height", "type": "number", "default": "240", "desc": "Chart height in px" },
    { "name": "smooth", "type": "boolean", "default": "", "desc": "Curved line/area paths" },
    { "name": "labels", "type": "string", "default": "", "desc": "Comma list of x-axis tick labels" }
  ],
  "events": [],
  "slots": ["default"],
  "i18nKeys": []
};
