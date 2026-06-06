export default {
  "name": "terminal",
  "tag": "pura-terminal",
  "category": "Display",
  "title": "Terminal",
  "role": "group",
  "summary": "An interactive terminal emulator with a monospace output area and a prompt input line that dispatches a command event on Enter.",
  "attributes": [
    { "name": "prompt", "type": "string", "default": "$ ", "desc": "The prompt string shown before the input" },
    { "name": "welcome", "type": "string", "default": "", "desc": "A line printed into the output on first connect" }
  ],
  "events": ["command"],
  "slots": [],
  "i18nKeys": []
};
