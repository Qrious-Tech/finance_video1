---
name: bengali-story-motion
description: Production-grade 2D Bengali storytelling and character motion animation engine. Creates viral vertical Reels/Shorts (9:16) and landscape (16:9) narrative explainer videos with authentic Bengali character rigs, split-screen phone calls, speech bubbles, and kinetic karaoke typography. Zero paid subscription required.
---

# Bengali Story Motion — 2D Character Animation & Explainer Engine

This skill automates the creation of broadcast-quality 2D animated story videos in Bengali, modeled after top viral YouTube Shorts and Facebook Reels creators (such as Hasan Skill Zone and Antik Mahmud).

## Core Capabilities
- **Signature 2D Vector Characters**:
  - Young Son / Protagonist (Student casual look with Tk notes, Corporate banker look with suit and tie).
  - Village Father (Elderly with round spectacles, white mustache, vest, and authentic blue-white checked lungi).
  - Sister (Pink/magenta saree with golden pallu, bindi, hair bun).
  - Roommates & Colleagues with emotional floating emojis (🤢, etc.).
  - Suspense Silhouette with glowing question mark `?` for "পরের পর্বে...".
- **Dynamic Camera & Staging**:
  - Single room environments (Dorm room, Bank Head Office, Village Home).
  - Interactive Split-Screen phone calls with synchronized talking visemes and phone props.
  - Directional speech bubbles with pointer tails.
  - Location and thematic pill badges (`স্যুট • টাই 👔`, `হলের রুম • আব্বার পাঠানো টাকা`).
- **Kinetic Karaoke Typography**:
  - Dynamic word-by-word karaoke highlighting in vibrant gold (`#facc15`).
  - High-contrast text with bold stroke and drop shadow.
- **100% Free & Local Stack**:
  - HTML5 Canvas 2D + Node.js (Playwright) + FFmpeg + Web Audio Procedural Synthesizer.
  - Zero cloud API keys or subscriptions needed.

## Autonomous Workflow for Agents
1. Accept user's voiceover audio (`assets/voice.wav`) and/or story script text.
2. Run `python story_director.py` to parse scenes, dialogues, split-screens, and timings.
3. Update `story.json` and choreograph scenes in `src/story.js`.
4. Compile preview bundle: `python build.py`.
5. Verify test frames: `node render.mjs --test`.
6. Export full master videos: `node render.mjs`.
7. Deliver clean `exports/portrait.mp4` (1080x1920) and `exports/landscape.mp4` (1920x1080).
