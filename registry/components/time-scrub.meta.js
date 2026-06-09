export default {
  "name": "time-scrub",
  "tag": "pura-time-scrub",
  "category": "Utility",
  "animation": true,
  "title": "Time Scrub",
  "role": "slider",
  "summary": "A scrubbable master timeline over a sequence of steps. Each slotted child is a keyframe; an accessible slider seeks a continuous playhead across them (undo/redo by position), exposing a continuous fraction for interpolation and a snapped index as the discrete state, with a scrub event per change.",
  "attributes": [],
  "events": [
    {
      "name": "scrub",
      "detail": "{ index, segment, fraction, position, total, label }",
      "desc": "Fired on every playhead change. index is the snapped discrete state; segment + fraction are the interpolation pair (fraction is 0..1 into [segment, segment+1])."
    }
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
