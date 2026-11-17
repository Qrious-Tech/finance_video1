# Bengali Story Motion — Autonomous Step-by-Step Instructions

Whenever a user provides a story script, audio recording, or theme in the chat, execute this exact workflow:

## Step 1: Voice & Script Intake
1. Save or convert the user's audio file to `assets/voice.wav` (16kHz or 48kHz mono PCM).
2. If the user provides a story script in chat, write it to `script.txt`.
3. If no script is provided, run `python story_director.py` to analyze audio timing and generate the baseline structure.

## Step 2: Scene Intelligence & Scene Segmentation
Run `python story_director.py`. It inspects the script and detects:
- **Location Setting**:
  - `dorm_room`: Night hostel room with lamp, window, moon, currency notes with odor waves.
  - `bank_office`: Corporate head office with desktop monitors, pillar panels, suit & tie badge.
  - `lunch_table`: Cafeteria lunch counter with plates and colleagues.
  - `phone_split_call`: Split-screen with Father (village) at top and Son (office) at bottom.
  - `calendar_counter`: Fast montage of 5 calendar tear-off pads flipping over 6 years.
  - `sister_call`: Split-screen or village home with Sister on phone.
  - `father_night_craft`: Village home at night with Father looking at mystery covered object.
  - `suspense_cliffhanger`: Dark spotlight vignette with character silhouette, yellow `?`, and "পরের পর্বে...".
- **Dialogue & Speech Bubbles**:
  - Lines containing quotes `""` or dialogue markers are assigned speech bubbles with directional tails pointing to the speaker.
  - `character_speaking` is flagged `true` only for the active speaker.
- **Kinetic Karaoke Subtitles**:
  - Generates word-by-word timing arrays for golden karaoke highlighting (`#facc15`).

## Step 3: Build & Bundling
Run `python build.py`:
- Combines `lib/sound.js`, `src/characters.js`, `src/environments.js`, `src/story.js`, and `src/player.js` into self-contained HTML previews:
  - `preview/portrait.html` (9:16 mobile format)
  - `preview/landscape.html` (16:9 desktop format)
  - `preview/storyboard.html` (frame grid overview)

## Step 4: Test Frame Verification
Run `node render.mjs --test`:
- Captures snapshots from every scene into `exports/portrait-*.png` and `exports/landscape-*.png`.
- Inspect using `read_file` to verify:
  - Characters have proper anatomy, expressive droopy eyes, and closed mouths when listening.
  - Split-screen dividing lines are crisp and aligned.
  - Speech bubbles have pointer tails pointing to the correct characters.
  - Subtitles have golden keyword highlighting.
  - Zero watermarks or logos.

## Step 5: Full Master Video Export
Run `node render.mjs`:
- Renders all frames at 30 fps using headless Playwright.
- Synthesizes procedural foley sound effects (`exports/*_effects.wav`).
- Muxes voiceover (100%) + procedural foley and lo-fi BGM (ducked) into `exports/portrait.mp4` and `exports/landscape.mp4`.
- Delivers clickable links to the user in chat.
