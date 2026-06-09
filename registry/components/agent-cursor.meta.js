export default {
  "name": "agent-cursor",
  "tag": "pura-agent-cursor",
  "category": "Tools",
  "animation": true,
  "title": "Agent Cursor",
  "role": "",
  "summary": "A replayable ghost cursor that drives over slotted content from a portable JSON trace: tweens between points, pulses on click, shows a per-step label. SSR-safe, reduced-motion aware, agent-enumerable.",
  "attributes": [
    {
      "name": "trace",
      "type": "string",
      "default": "\"\"",
      "desc": "URL to a JSON trace { version, steps:[{x,y,t,action,target,label,value}] }. An inline <script type=\"application/json\"> child or the .trace property take priority."
    },
    {
      "name": "autoplay",
      "type": "boolean",
      "default": "false",
      "desc": "Start replaying as soon as a trace is applied."
    },
    {
      "name": "loop",
      "type": "boolean",
      "default": "false",
      "desc": "Restart from the beginning when the replay ends."
    },
    {
      "name": "speed",
      "type": "number",
      "default": "1",
      "desc": "Playback rate multiplier (2 = twice as fast)."
    }
  ],
  "events": [
    {
      "name": "cursorstep",
      "detail": "{ index, action, target, label, value, t }",
      "desc": "Fired when the replay enters a new step."
    },
    {
      "name": "cursorplay",
      "detail": "{}",
      "desc": "Fired when playback starts."
    },
    {
      "name": "cursorpause",
      "detail": "{}",
      "desc": "Fired when playback pauses."
    },
    {
      "name": "cursorend",
      "detail": "{}",
      "desc": "Fired when a non-looping replay reaches the end."
    }
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": [
    "agentCursor.replaying"
  ]
};
