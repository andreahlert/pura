export default {
  "name": "sidebar",
  "tag": "pura-sidebar",
  "category": "Navigation",
  "title": "Sidebar",
  "role": "",
  "summary": "Side navigation panel with a header, scrollable body and footer that turns into a drawer on mobile.",
  "attributes": [
    {
      "name": "collapsible",
      "type": "boolean",
      "default": "false",
      "desc": "Enables collapsing the sidebar to a rail of icons (pura-sidebar)."
    },
    {
      "name": "collapsed",
      "type": "boolean",
      "default": "false",
      "desc": "Collapses to the narrow rail and hides the labels; only takes effect with collapsible (pura-sidebar)."
    },
    {
      "name": "href",
      "type": "string",
      "default": "",
      "desc": "When present on pura-sidebar-item, renders an <a>; otherwise a <button>."
    },
    {
      "name": "active",
      "type": "boolean",
      "default": "false",
      "desc": "Highlights the item as current and adds aria-current=\"page\" (pura-sidebar-item)."
    }
  ],
  "events": [
    "open",
    "close"
  ],
  "slots": [
    "header",
    "default",
    "footer",
    "icon"
  ],
  "i18nKeys": []
};
