export default {
  "name": "infinite-scroll",
  "tag": "pura-infinite-scroll",
  "category": "Utility",
  "title": "Infinite Scroll",
  "role": "",
  "summary": "Fires a load event when the user nears the bottom of the content using an IntersectionObserver on a sentinel element, with optional loading and done states.",
  "attributes": [
    { "name": "threshold", "type": "number", "default": "200", "desc": "Pixels of rootMargin slack before the sentinel triggers a load event" },
    { "name": "disabled", "type": "boolean", "default": "", "desc": "Stop observing the sentinel when present" },
    { "name": "loading", "type": "boolean", "default": "", "desc": "Show spinner and loading label, suppress further loads" },
    { "name": "done", "type": "boolean", "default": "", "desc": "Show end message and stop firing load events" },
    { "name": "height", "type": "string", "default": "", "desc": "Host scroll container height (px or CSS length)" },
    { "name": "window", "type": "boolean", "default": "", "desc": "Observe the document viewport instead of the host container" }
  ],
  "events": ["load"],
  "slots": ["default"],
  "i18nKeys": []
};
