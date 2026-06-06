export default {
  "name": "lightbox",
  "tag": "pura-lightbox",
  "category": "Overlay",
  "title": "Lightbox",
  "role": "",
  "summary": "Thumbnail gallery that opens images in a fullscreen viewer with navigation, built on the native dialog element.",
  "attributes": [
    {
      "name": "start",
      "type": "number",
      "default": "0",
      "desc": "Index of the image opened when .open() is called with no argument."
    },
    {
      "name": "loop",
      "type": "boolean",
      "default": "false",
      "desc": "Makes navigation wrap around: from the last to the first and vice versa."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Image gallery",
      "desc": "Accessible label for the gallery region and the modal (aria-label)."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects and controls the open/closed state of the modal viewer."
    }
  ],
  "events": [
    "open",
    "close",
    "change"
  ],
  "slots": [
    "(default)"
  ],
  "i18nKeys": []
};
