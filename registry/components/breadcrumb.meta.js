export default {
  "name": "breadcrumb",
  "tag": "pura-breadcrumb",
  "category": "Navigation",
  "title": "Breadcrumb",
  "role": "",
  "summary": "Navigation trail that shows the current page's location within the site hierarchy.",
  "attributes": [
    {
      "name": "href",
      "type": "string",
      "default": "",
      "desc": "On pura-breadcrumb-item: renders the crumb as a link (<a>) to the given URL."
    },
    {
      "name": "current",
      "type": "boolean",
      "default": "false",
      "desc": "On pura-breadcrumb-item: marks the current page (aria-current=page) and renders it as highlighted text, without a link."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
