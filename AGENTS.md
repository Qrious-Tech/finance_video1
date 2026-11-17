# Bengali Story Motion — Agent Contract & Autonomous Workflow

> **CRITICAL INSTRUCTION FOR ANTIGRAVITY & AI AGENTS**:
> Whenever the user provides a voiceover audio file, a story script, or a narrative topic in the chat, **YOU MUST READ `INSTRUCTIONS.md` FIRST**.
> Do NOT ask for more instructions or clarifications. Take the user's voice audio and/or story script, automatically segment the scenes, adapt `story.json`, choreograph realistic 2D character movements, split-screen phone calls, speech bubbles, and kinetic karaoke subtitles in `src/story.js`, compile previews (`python build.py`), test frames (`node render.mjs --test`), and render final broadcast-quality MP4 videos (`node render.mjs`).

---

## 7 Inviolable Agent Rules

1. **Strict Zero Watermark Policy (কঠোরভাবে ওয়াটারমার্ক নিষিদ্ধ)**:
   - Absolutely NO channel logo, watermark, creator tag, or branding overlay anywhere on the canvas or exported videos.
   - Both Portrait (1080x1920 / 576x1024) and Landscape (1920x1080) videos must be completely clean and broadcast-ready.

2. **Authentic Bengali 2D Vector Character Rigging**:
   - Signature expressive character archetypes:
     - **Main Character / Son**: Student casual look (blue button shirt & shorts/slacks) and Corporate banker look (dark formal shirt & red tie).
     - **Father (আব্বা)**: Elderly Bengali villager with white hair, round wireframe spectacles, white mustache, vest (গেঞ্জি/ফতুয়া), and checked lungi (নীল-সাদা চেক লুঙ্গি).
     - **Sister (বোন)**: Traditional pink/magenta saree with golden pallu border, blouse, round red bindi, and hair bun.
     - **Roommates / Colleagues**: Distinct expressive facial styles, emojis, and gestures.
     - **Mystery Silhouette**: Pitch black silhouette with glowing golden question mark `?` for suspense ending ("পরের পর্বে...").
   - **Eye Kinematics**: Signature calm/tired/droopy eyelids (`= =` or curved contemplative eyes), natural blink cycles every $\approx 3.2\text{s}$, pupil gaze tracking.
   - **Intelligent Lip-Syncing**: Characters must **ONLY** open their mouths during direct character dialogue (quotes or dialogue lines). During 3rd-person narration, mouths remain naturally closed.

3. **Cinematic Phone Call Split-Screen Layout**:
   - When a telephone call takes place between two characters (e.g. Village Father & City Son):
     - Automatically trigger a horizontal split-screen stage with a crisp divider line.
     - Top half displays the caller in their authentic setting (e.g. village home, green trees).
     - Bottom half displays the receiver in their setting (e.g. bank office, computers).
     - Hands naturally raised holding phones to their ears with phone call status indicators.

4. **Interactive Speech Bubbles & Thematic Location Pills**:
   - Spoken dialogues must be accompanied by rounded speech bubbles with directional tails pointing directly to the speaking character.
   - Contextual location tags and pill badges (e.g., `হলের রুম • আব্বার পাঠানো টাকা`, `ব্যাংক • প্রধান কার্যালয়`, `স্যুট • টাই 👔`, `৬ বছরে`) must pop into view with snappy overshoot easing (`easeOutBack`).

5. **Dynamic Word-by-Word Kinetic Karaoke Subtitles**:
   - Subtitles rendered in standard high-contrast Bengali using `Noto Sans Bengali` / `Hind Siliguri`.
   - Dynamic karaoke highlighting: the active spoken word lights up in vibrant golden yellow (`#facc15` / `#f59e0b`) with a subtle scale bounce (+12%) while the remaining sentence is crisp white with a bold black stroke and drop shadow.

6. **Procedural Foley & Lo-Fi Audio Design**:
   - The Web Audio synthesizer (`lib/sound.js`) procedural audio engine provides:
     - Realistic phone ring tones (`trr-trr`), phone pickup clicks, and hangup tones.
     - Gentle ambient room tone and melancholy lo-fi acoustic/piano chords.
     - During speech, background music is automatically ducked so narration remains crystal clear.

7. **End-to-End Delivery Guarantee**:
   - Do not stop after editing JSON or JS files.
   - Always run `python build.py`, execute verification (`node render.mjs --test`), and render full master videos (`node render.mjs`).
   - Deliver verifiable outputs in `exports/portrait.mp4` and `exports/landscape.mp4`.
