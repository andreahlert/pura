export default {
  "name": "app-shell",
  "tag": "pura-app-shell",
  "category": "Layout",
  "title": "App Shell",
  "role": "",
  "summary": "A top-level page scaffold that wires app chrome together with named slots for header, sidebar, footer, and main content in a CSS grid layout.",
  "attributes": [
    { "name": "sidebar-collapsed", "type": "boolean", "default": "", "desc": "Hides or narrows the sidebar" },
    { "name": "sidebar-width", "type": "string", "default": "16rem", "desc": "Desktop sidebar width as a CSS length" },
    { "name": "header-height", "type": "string", "default": "3.5rem", "desc": "Header row height as a CSS length" },
    { "name": "fixed-header", "type": "boolean", "default": "", "desc": "Makes the header sticky at the top" }
  ],
  "events": ["sidebartoggle"],
  "slots": ["default", "header", "sidebar", "footer"],
  "i18nKeys": []
};
