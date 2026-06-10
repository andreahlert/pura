export default {
  "name": "focus-hover",
  "tag": "pura-focus-hover",
  "category": "Animation",
  "animation": true,
  "title": "Focus Hover",
  "role": "",
  "summary": "Focus-cards container: the item under the cursor (or keyboard focus) stays sharp while its siblings blur, dim and shrink. Pure CSS on slotted children, zero per-frame JS, SSR-safe.",
  "attributes": [
    {
      "name": "columns",
      "type": "number",
      "default": "3",
      "desc": "Grid column count."
    },
    {
      "name": "blur",
      "type": "number",
      "default": "4",
      "desc": "Blur in px applied to non-focused siblings."
    },
    {
      "name": "dim",
      "type": "number",
      "default": "0.55",
      "desc": "Opacity of non-focused siblings, 0..1."
    },
    {
      "name": "shrink",
      "type": "number",
      "default": "0.97",
      "desc": "Scale of non-focused siblings."
    },
    {
      "name": "grow",
      "type": "number",
      "default": "1.02",
      "desc": "Scale of the focused item."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
