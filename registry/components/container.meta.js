export default {
  "name": "container",
  "tag": "pura-container",
  "category": "Layout",
  "title": "Container",
  "role": "",
  "summary": "Wrapper that observes its own width and reflects a breakpoint (xs/sm/md/lg) so content can adapt to container size rather than viewport size.",
  "attributes": [
    {
      "name": "breakpoints",
      "type": "string",
      "default": "sm:384, md:640, lg:896",
      "desc": "Custom min-width thresholds in px as a comma-separated list, e.g. \"sm:480, md:768, lg:1024\". Anything below the smallest becomes xs."
    },
    {
      "name": "center",
      "type": "boolean",
      "default": "false",
      "desc": "Horizontally centers the inner box (margin-inline auto)."
    },
    {
      "name": "max",
      "type": "string",
      "default": "(none)",
      "desc": "Optional max-width for the inner box (any CSS length, e.g. \"72rem\"); without it the container is fluid (100%)."
    },
    {
      "name": "pad",
      "type": "boolean",
      "default": "false",
      "desc": "Applies symmetric inline padding that scales with the current breakpoint."
    },
    {
      "name": "label",
      "type": "string",
      "default": "(none)",
      "desc": "aria-label exposed on the host region."
    }
  ],
  "events": [
    "pura-container:resize"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
