export default {
  "name": "toolbar",
  "tag": "pura-toolbar",
  "category": "Navigation",
  "title": "Toolbar",
  "role": "",
  "summary": "Container that groups controls into a bar with roving focus via arrow keys and horizontal or vertical orientation.",
  "attributes": [
    {
      "name": "orientation",
      "type": "string",
      "default": "horizontal",
      "desc": "Sets the layout and which arrow keys move focus: 'horizontal' (Left/Right) or 'vertical' (Up/Down). It also adjusts the aria-orientation."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
