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
    // Beat 01 — The Voice Room: the room where the typed signal becomes a voice.
    // platform / roomLabel reuse the established labels from chapter01.js.
    beat01: {
      id: 'the-voice-room',
      chapter: 'Chapter 02',
      title: 'The Voice Room',
      platform: 'HelloTalk',
      roomLabel: 'Voice Room',
      // Minimal connector lines (approved-copy category) expressing the chapter
      // thesis: text → voice. Restrained, not a paragraph.
      introLines: ['the typing', 'became a voice.'],
    },

    // Beat 02 — The Signal: the fragility of the HelloTalk connection.
    // "HelloTalk signal was often weak" -> PROJECT_CONTEXT §1; MEMORY_MOTIFS §1.
    beat02: {
      id: 'the-signal',
      title: 'The Signal',
      bodyLines: [
        'the hellotalk signal',
        'was often weak.', // [VERIFY] PROJECT_CONTEXT §1 / MEMORY_MOTIFS §1
      ],
    },

    // Beat 03 — In the Voice: restrained, small factual fragments (NOT paragraphs).
    // Story-safety: "thambi" and "akka" form ONE visual pair — the two terms of
    // address in the connection. They carry NO explanatory note: no speaker, no
    // event, no dialogue, joke, or teasing is assigned to either word.
    // vanga·ponga / 日本語 / english carry only their source-supported notes
    // (PROJECT_CONTEXT §1/§3, MEMORY_MOTIFS §2).
    beat03: {
      id: 'the-voice',
      title: 'In the Voice',
      fragments: [
        { word: 'thambi' },
        { word: 'akka' },
        // "vanga" / "ponga" — recurring verbal motif, both roughly "come". (§3)
        { word: 'vanga · ponga', note: 'two ways of saying "come".' }, // [VERIFY] exact usage
        // Early Japanese study; the other person asked to be taught. (§1)
        { word: '日本語', note: 'she asked you to teach her japanese.' }, // [VERIFY] timing
        // User knew less English; other person fluent. (§3)
        { word: 'english', note: 'you knew less; she was fluent.' }, // [VERIFY] phrasing
      ],
    },

    // Beat 04 — Continuing: the pivot for a steadier connection.
    // Obtained Instagram because the HelloTalk signal was weak; later Telegram.
    beat04: {
      id: 'continuing',
      title: 'Continuing',
      recordLines: [
        'so we continued on instagram.', // [VERIFY] exact date — PROJECT_CONTEXT §2
        'later, telegram.', // [VERIFY] when Telegram entered — PROJECT_CONTEXT §2
      ],
    },
  },
}