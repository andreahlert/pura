export default {
  "name": "map",
  "tag": "pura-map",
  "category": "Display",
  "title": "Map",
  "role": "",
  "summary": "A thin iframe wrapper over a map provider embed that resolves a location from a full src URL, a place query string, or lat/lon coordinates and renders an OpenStreetMap embed.",
  "attributes": [
    { "name": "src", "type": "string", "default": "", "desc": "Full embed URL used verbatim" },
    { "name": "q", "type": "string", "default": "", "desc": "Place or query string; builds an OpenStreetMap export embed" },
    { "name": "lat", "type": "number", "default": "", "desc": "Latitude coordinate for the map center" },
    { "name": "lon", "type": "number", "default": "", "desc": "Longitude coordinate for the map center" },
    { "name": "zoom", "type": "number", "default": "14", "desc": "Zoom level for q or lat/lon based embeds" },
    { "name": "height", "type": "string", "default": "400", "desc": "Viewer height (number in px or any CSS length)" },
    { "name": "title", "type": "string", "default": "", "desc": "Iframe title for accessibility" }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};
