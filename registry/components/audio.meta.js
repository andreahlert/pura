export default {
  "name": "audio",
  "tag": "pura-audio",
  "category": "Display",
  "title": "Audio",
  "role": "",
  "summary": "A styled audio player over native <audio> with play/pause, seek, volume, and mute controls.",
  "attributes": [
    { "name": "src", "type": "string", "default": "", "desc": "Audio URL" },
    { "name": "autoplay", "type": "boolean", "default": "", "desc": "Start playing on load" },
    { "name": "loop", "type": "boolean", "default": "", "desc": "Loop playback" },
    { "name": "title", "type": "string", "default": "", "desc": "Optional track title display" },
    { "name": "artist", "type": "string", "default": "", "desc": "Optional artist display" }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};
