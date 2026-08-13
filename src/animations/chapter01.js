import gsap from './setup'

// Chapter 01 — GSAP timeline factories.
// Story-agnostic: these functions receive selectors/refs and orchestrate
// animation ONLY. They must never import story data.
//
// `createRoomEntranceTimeline` will be added in the next step (Scenes/rings).
// ScrollTrigger is intentionally NOT used here yet.

export function createRoomEntranceTimeline(scope) {
  // Placeholder — entrance timeline for the HelloTalk room scene.
  // Implemented in a later step; keeps the factory contract in place.
  return gsap.timeline({ paused: true, scope })
}