# Bengali Story Motion — 2D Animated Narrative Explainer Engine

A 100% free, local, open-source 2D animation and storytelling video production engine built for Antigravity. It creates viral vertical (9:16 Shorts/Reels/TikTok) and landscape (16:9) narrative explainer videos directly from Bengali voice audio and story scripts.

---

## 🚀 Quick Start for Users

### How to generate a new animated video:
1. Put your voiceover audio file into `assets/voice.wav`.
2. Write or paste your Bengali story script in the Antigravity chat.
3. Antigravity will automatically:
   - Run `python story_director.py` to analyze scenes, dialogues, and split-screen phone calls.
   - Compile preview bundles via `python build.py`.
   - Test keyframes via `node render.mjs --test`.
   - Render the master MP4 videos via `node render.mjs`.

Outputs are saved in:
- `exports/portrait.mp4` (1080x1920 / 576x1024 vertical Reels & Shorts)
- `exports/landscape.mp4` (1920x1080 / 1024x576 horizontal YouTube)

---

## 🎨 Signature Visual Features

1. **Authentic Bengali 2D Vector Characters**:
   - Signature calm, tired, and thoughtful droopy eyelids (`= =`).
   - Natural eye blinking cycles every $\approx 3.2\text{s}$ and pupil gaze tracking.
   - Intelligent viseme lip-syncing: mouth *only* opens during spoken dialogues; stays closed during narration.
   - Character archetypes: Student Son, Corporate Banker with suit and tie, Elderly Father with spectacles, mustache, and checked lungi, Sister in traditional pink saree with red bindi and hair bun, Roommates with disgusted floating emojis (🤢), and Suspense Silhouette with a glowing golden question mark (`?`).

2. **Cinematic Phone Call Split-Screen**:
   - Horizontal split screen dividing Village caller (Father) and City receiver (Son).
   - Dynamic directional speech bubbles pointing to speakers.
   - Phone call status indicator and call disconnected badge (📵).

3. **Dynamic Kinetic Karaoke Subtitles**:
   - Modern bold typography using `Noto Sans Bengali`.
   - Active word lights up in glowing golden yellow (`#facc15`) with a subtle bounce animation.
   - Heavy black outline and drop shadow for maximum legibility on any background.

4. **100% Free & Subscription-Free Stack**:
   - HTML5 Canvas 2D + Node.js (Playwright) + FFmpeg + Web Audio Procedural Synthesizer.
   - Zero paid cloud APIs (no Higgsfield, no Haiper, no Midjourney subscription needed).
   - Fully deterministic and reproducible.

---

## 📁 Project Architecture
```
bengali_story_motion/
├── assets/
│   └── voice.wav              # Voiceover audio
├── lib/
│   └── sound.js               # Web Audio procedural sound synthesizer (foley, phone tones, lo-fi bed)
├── src/
│   ├── characters.js          # Complete 2D vector character rigging
│   ├── environments.js        # Backgrounds (Dorm, Office, Village, Split-Screen, Suspense)
│   ├── story.js               # Master scene choreography, speech bubbles, karaoke typography
│   ├── story_ai.js            # Generated runtime intelligence
│   └── player.js              # HTML5 canvas interactive preview player
├── preview/
│   ├── portrait.html          # Interactive 9:16 mobile player
│   └── landscape.html         # Interactive 16:9 desktop player
├── exports/                   # Test frames and exported MP4 videos
├── story.json                 # Structured scene data
├── story_director.py          # Script & dialogue analyzer
├── build.py                   # Build orchestrator
├── render.mjs                 # High-speed Playwright frame renderer & FFmpeg muxer
├── AGENTS.md                  # Strict agent contract & zero-watermark policy
├── INSTRUCTIONS.md            # Step-by-step instructions
└── SKILL.md                   # Antigravity skill specification
```
