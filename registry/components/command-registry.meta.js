export default {
  "name": "command-registry",
  "tag": "pura-command-registry",
  "category": "Agent",
  "title": "Command Registry",
  "role": "",
  "summary": "Invisible registry of page capabilities that exposes actions enumerable and invocable by AI agents and command palettes.",
  "attributes": [
    {
      "name": "namespace",
      "type": "string",
      "default": "",
      "desc": "Prefixes the action ids in the global registry (e.g. \"account:save\"), avoiding collisions between registries. Applied on <pura-command-registry>."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-command-registry>, hides all of this registry's actions from list()/get()/run(). On <pura-command-action>, marks the action as unavailable (cannot be invoked)."
    },
    {
      "name": "id",
      "type": "string",
      "default": "pura-cmd-N (auto)",
      "desc": "Action identifier for addressing; auto-generated if absent. Attribute of <pura-command-action>."
    },
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Readable label for the action; also becomes aria-label. Attribute of <pura-command-action>."
    },
    {
      "name": "description",
      "type": "string",
      "default": "",
      "desc": "Machine-readable description of the action; also becomes aria-description. Attribute of <pura-command-action>."
    },
    {
      "name": "keywords",
      "type": "string",
      "default": "",
      "desc": "Search terms separated by spaces or commas, used by palettes/agents to find the action. Attribute of <pura-command-action>."
    },
    {
      "name": "when",
      "type": "string",
      "default": "",
      "desc": "CSS selector that must match in the document for the action to be enabled; otherwise it appears as disabled. Attribute of <pura-command-action>."
    }
  ],
  "events": [
    "register",
    "unregister",
    "run"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
