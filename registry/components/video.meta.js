export default {
  "name": "video",
  "tag": "pura-video",
  "category": "Display",
  "title": "Video",
  "role": "",
  "summary": "Styled wrapper around native video with a custom control bar including play/pause, seek, volume, mute, and fullscreen.",
  "attributes": [
    { "name": "src", "type": "string", "default": "", "desc": "Video URL" },
    { "name": "poster", "type": "string", "default": "", "desc": "Poster image URL" },
    { "name": "autoplay", "type": "boolean", "default": "", "desc": "Start playing on load (implies muted in most browsers)" },
    { "name": "loop", "type": "boolean", "default": "", "desc": "Loop playback" },
    { "name": "muted", "type": "boolean", "default": "", "desc": "Start muted" },
    { "name": "controls", "type": "boolean", "default": "", "desc": "Show browser native controls instead of the custom bar" }
  ],
  "events": [],
  "slots": ["default"],
  "i18nKeys": []
};
