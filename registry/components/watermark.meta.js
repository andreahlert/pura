export default {
  "name": "watermark",
  "tag": "pura-watermark",
  "category": "Display",
  "title": "Watermark",
  "role": "",
  "summary": "Overlays a repeating, non-interactive watermark of tiled text or image over slotted content.",
  "attributes": [
    { "name": "text", "type": "string", "default": "", "desc": "Watermark text (tiled)" },
    { "name": "image", "type": "string", "default": "", "desc": "Image URL tiled instead of text" },
    { "name": "opacity", "type": "string", "default": "0.08", "desc": "Overlay opacity" },
    { "name": "rotate", "type": "string", "default": "-22", "desc": "Tile rotation in degrees" },
    { "name": "gap", "type": "string", "default": "120", "desc": "Pixel spacing between tiles" },
    { "name": "font-size", "type": "string", "default": "16", "desc": "Text size in px" }
  ],
  "events": [],
  "slots": ["default"],
  "i18nKeys": []
};
