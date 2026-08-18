// CHAPTER 02 — THE VOICE ROOM
// Verified story data ONLY. No invented dialogue, translations, emotions,
// dates, code, or UI states. Story data must never import animation logic
// and animation must never import this file.
//
// Scope: text → voice transition born from the HelloTalk voice-room origin.
// This chapter stops BEFORE the daily-call cadence and BEFORE July 17 / the
// July 18 confession. It must NOT include those or formal call rhythm.
//
// [VERIFY]-marked fields are carried internally (comments) and must stay
// verified against PROJECT_CONTEXT.md / MEMORY_MOTIFS.md before display.

export const chapter02Data = {
  meta: {
    chapter: '02',
    id: 'chapter-02',
    anchor: 'chapter-02',
    title: 'The Voice Room',
  },
  beats: {
    beat01: {
      id: 'the-voice-room',
      chapter: 'Chapter 02',
      title: 'The Voice Room',
      platform: 'HelloTalk',
      roomLabel: 'Voice Room',
      introLines: ['the typing', 'became a voice.'],
    },
    beat02: {
      id: 'the-signal',
      title: 'The Signal',
      bodyLines: ['the hellotalk signal', 'was often weak.'],
    },
    beat03: {
      id: 'the-voice',
      title: 'In the Voice',
      fragments: [
        { word: 'thambi', note: 'she kept calling you thambi.' },
        { word: 'akka', note: 'you joked: call me akka.' },
        { word: 'vanga · ponga', note: 'two ways of saying "come".' },
        { word: '日本語', note: 'she asked you to teach her japanese.' },
        { word: 'english', note: 'you knew less; she was fluent.' },
      ],
    },
    beat04: {
      id: 'continuing',
      title: 'Continuing',
      recordLines: ['so we continued on instagram.', 'later, telegram.'],
    },
  },
}