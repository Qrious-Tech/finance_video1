#!/usr/bin/env python3
"""
Bengali Story Motion — Build & Bundling Orchestrator
Generates self-contained preview players (portrait and landscape) with
Noto Sans Bengali typography and audio integration.
"""

import os
import json
from pathlib import Path
import story_director

ROOT = Path(__file__).resolve().parent
PREVIEW_DIR = ROOT / 'preview'
PREVIEW_DIR.mkdir(exist_ok=True)

def generate_player_html(width, height, is_portrait=True):
    story_file = ROOT / 'story.json'
    duration = 52.8
    if story_file.exists():
        try:
            data = json.loads(story_file.read_text(encoding='utf-8'))
            duration = data.get('duration', 52.8)
        except Exception:
            pass

    title = "Bengali Story Motion — " + ("Portrait (9:16 Shorts/Reels)" if is_portrait else "Landscape (16:9)")
    aspect_style = f"width: {width}px; height: {height}px;"

    mins = int(duration // 60)
    secs = int(duration % 60)
    dur_str = f"{mins:02d}:{secs:02d}"

    html = f"""<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background: #09090b;
      color: #f8fafc;
      font-family: 'Noto Sans Bengali', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow: hidden;
    }}
    .stage-container {{
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #27272a;
    }}
    canvas {{
      display: block;
      background: #000000;
      {aspect_style}
    }}
    .controls {{
      width: 100%;
      background: #18181b;
      padding: 12px 18px;
      display: flex;
      align-items: center;
      gap: 14px;
      border-top: 1px solid #27272a;
    }}
    button {{
      background: #facc15;
      color: #000000;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s;
    }}
    button:hover {{ background: #eab308; }}
    input[type=range] {{
      flex: 1;
      accent-color: #facc15;
      cursor: pointer;
    }}
    .time {{
      font-family: monospace;
      font-size: 13px;
      color: #a1a1aa;
      min-width: 80px;
      text-align: right;
    }}
  </style>
</head>
<body>
  <div id="asset-preloads" style="display:none;">
    <img id="env_savings" src="../assets/env_savings_study.jpg">
    <img id="env_investment" src="../assets/env_investment_office.jpg">
    <img id="env_growth" src="../assets/env_growth_city.jpg">
    <img id="char_hero" src="../assets/char_storyteller_hero.png">
    <img id="char_pose1" src="../assets/char_pose1_welcome.png">
    <img id="char_pose2" src="../assets/char_pose2_point.png">
    <img id="char_pose3" src="../assets/char_pose3_heart.png">
    <img id="char_pose4" src="../assets/char_pose4_explain.png">
    <img id="char_pose5" src="../assets/char_pose5_think.png">
    <img id="char_pose6" src="../assets/char_pose6_victory.png">
    <img id="char_boy" src="../assets/char_boy_hero.png">
    <img id="char_female" src="../assets/char_female_hero.png">
  </div>
  <div class="stage-container">
    <canvas id="storyCanvas" width="{width}" height="{height}"></canvas>
    <div class="controls">
      <button id="playBtn">Play / Pause</button>
      <input type="range" id="timeSlider" min="0" max="{duration}" step="0.05" value="0">
      <span class="time" id="timeDisplay">00:00 / {dur_str}</span>
    </div>
  </div>

  <script type="module">
    import {{ StoryPlayer }} from '../src/player.js';
    import '../lib/sound.js';

    const player = new StoryPlayer('storyCanvas', {{
      width: {width},
      height: {height},
      fps: 30,
      duration: {duration},
      audioSrc: '../assets/voice.wav'
    }});

    window.player = player;
    player.render();

    const playBtn = document.getElementById('playBtn');
    const timeSlider = document.getElementById('timeSlider');
    const timeDisplay = document.getElementById('timeDisplay');

    playBtn.addEventListener('click', () => player.togglePlay());
    timeSlider.addEventListener('input', (e) => {{
      player.seek(parseFloat(e.target.value));
    }});

    function formatTime(s) {{
      const m = Math.floor(s / 60);
      const sec = Math.floor(s % 60);
      return `${{m.toString().padStart(2, '0')}}:${{sec.toString().padStart(2, '0')}}`;
    }}

    setInterval(() => {{
      if (player.isPlaying) {{
        timeSlider.value = player.currentTime;
      }}
      timeDisplay.textContent = `${{formatTime(player.currentTime)}} / {dur_str}`;
    }}, 100);
  </script>
</body>
</html>
"""
    return html

def build_all():
    print("=== Building Bengali Story Motion Previews ===")
    story_director.run_analysis()

    # Portrait (576x1024 or 1080x1920)
    (PREVIEW_DIR / 'portrait.html').write_text(generate_player_html(576, 1024, is_portrait=True), encoding='utf-8')
    # Landscape (1024x576)
    (PREVIEW_DIR / 'landscape.html').write_text(generate_player_html(1024, 576, is_portrait=False), encoding='utf-8')

    print("✓ Successfully generated preview/portrait.html and preview/landscape.html")

if __name__ == '__main__':
    build_all()
