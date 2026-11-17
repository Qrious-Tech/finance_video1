import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { spawnSync, spawn } from 'node:child_process';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  const fallback = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'node_modules');
  ({ chromium } = require(require.resolve('playwright', { paths: [fallback] })));
}

const root = path.dirname(fileURLToPath(import.meta.url));
const test = process.argv.includes('--test');
const config = JSON.parse(fs.readFileSync(path.join(root, 'story.json'), 'utf8'));
const out = path.join(root, 'exports');
fs.mkdirSync(out, { recursive: true });

// ── FFmpeg path resolution ──────────────────────────────────────────
function getFfmpegPath() {
  if (process.env.FFMPEG_PATH && fs.existsSync(process.env.FFMPEG_PATH)) return process.env.FFMPEG_PATH;
  for (const c of ['ffmpeg', 'C:\\ffmpeg\\bin\\ffmpeg.exe']) {
    try {
      if (spawnSync(c, ['-version'], { stdio: 'ignore' }).status === 0) return c;
    } catch {}
  }
  return 'ffmpeg';
}
const FFMPEG = getFfmpegPath();

function ffmpeg(args) {
  const r = spawnSync(FFMPEG, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('FFmpeg failed: ' + args.join(' '));
}

// ── Portrait and landscape configs ──────────────────────────────────
const PORTRAIT  = { w: 1080, h: 1920 };
const LANDSCAPE = { w: 1920, h: 1080 };
const FPS = 30;
const TOTAL_DURATION = 47.88; // actual voice duration + end card
const FRAME_TOTAL = Math.ceil(TOTAL_DURATION * FPS);

// ── Chrome executable ────────────────────────────────────────────────
function getChromePath() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return undefined;
}

// ── HTML page for frame rendering ───────────────────────────────────
function buildHTML(w, h) {
  const storyJsUrl = pathToFileURL(path.join(root, 'src', 'story.js')).href;
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${w}px; height: ${h}px; overflow: hidden; background: #000; }
  canvas { display: block; }
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body>
<canvas id="c" width="${w}" height="${h}"></canvas>
<script type="module">
  import { renderFrame } from '${storyJsUrl}';
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');
  window._renderFrame = (t) => {
    renderFrame(ctx, ${w}, ${h}, t, {});
  };
  window._ready = true;
</script>
</body>
</html>`;
}

// ── Frame capture ────────────────────────────────────────────────────
async function renderFrames(browser, w, h, name, frameDir, frameList) {
  console.log(`  📐 Rendering ${name} (${w}×${h})...`);
  fs.mkdirSync(frameDir, { recursive: true });

  const context = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  // Log browser console errors for debugging
  page.on('console', msg => {
    if (msg.type() === 'error') console.error(`  [Browser Error] ${msg.text()}`);
  });
  page.on('pageerror', err => console.error(`  [Page Error] ${err.message}`));

  const html = buildHTML(w, h);
  const htmlPath = path.join(root, `_islamic_${name}.html`);
  fs.writeFileSync(htmlPath, html, 'utf8');
  await page.goto(pathToFileURL(htmlPath).href);

  // Wait for module to fully load and _renderFrame to be callable
  await page.waitForFunction(() => typeof window._renderFrame === 'function' && window._ready === true, { timeout: 20000 });

  // Warm-up render to load fonts and trigger any lazy resources
  await page.evaluate(() => window._renderFrame(0));
  await page.waitForTimeout(3000); // Wait for fonts & assets to load

  for (let f = 0; f < frameList.length; f++) {
    const frameIdx = frameList[f];
    const t = frameIdx / FPS;
    await page.evaluate((time) => window._renderFrame(time), t);
    const frameFile = path.join(frameDir, `frame_${String(frameIdx).padStart(6, '0')}.png`);
    await page.screenshot({ path: frameFile, type: 'png' });

    if (f % 30 === 0) {
      process.stdout.write(`\r    Frame ${f + 1}/${frameList.length} (t=${t.toFixed(2)}s)`);
    }
  }
  console.log(`\n    ✓ ${frameList.length} frames captured`);

  await context.close();
  fs.unlinkSync(htmlPath);
  return frameDir;
}

// ── Audio mixing ────────────────────────────────────────────────────
function mixAudio(voicePath, bitmapDuration) {
  const mixedPath = path.join(root, 'assets', 'islamic_mixed.wav');

  if (!fs.existsSync(voicePath)) {
    console.log('  ⚠️  Voice file not found, skipping audio mix');
    return null;
  }

  // Layer soft desert wind ambience with normalized voice
  try {
    ffmpeg([
      '-i', voicePath,
      '-f', 'lavfi', '-i', `anoisesrc=d=${bitmapDuration}:c=pink:r=48000:a=0.006,lowpass=f=260`,
      '-filter_complex', '[0:a]loudnorm=I=-16:LRA=11:TP=-1.5[v];[1:a]volume=0.20[amb];[v][amb]amix=inputs=2:duration=first:dropout_transition=2[out]',
      '-map', '[out]',
      '-t', String(bitmapDuration),
      '-ar', '48000', '-ac', '2',
      mixedPath
    ]);
  } catch (err) {
    // Fallback simple normalization
    ffmpeg([
      '-i', voicePath,
      '-af', 'loudnorm=I=-16:LRA=11:TP=-1.5,apad',
      '-t', String(bitmapDuration),
      '-ar', '48000', '-ac', '2',
      mixedPath
    ]);
  }

  console.log(`  ✓ Audio mixed: islamic_mixed.wav`);
  return mixedPath;
}

// ── Video encode ─────────────────────────────────────────────────────
function encodeVideo(frameDir, audioPath, outputPath, w, h) {
  const args = [
    '-framerate', String(FPS),
    '-i', path.join(frameDir, 'frame_%06d.png'),
  ];

  if (audioPath && fs.existsSync(audioPath)) {
    args.push('-i', audioPath);
    args.push('-c:a', 'aac', '-b:a', '192k');
    args.push('-shortest');
  }

  args.push(
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '20',
    '-pix_fmt', 'yuv420p',
    '-vf', `scale=${w}:${h}`,
    '-movflags', '+faststart',
    outputPath
  );

  ffmpeg(args);
  const size = fs.statSync(outputPath).size;
  console.log(`  ✓ ${path.basename(outputPath)} (${(size / 1048576).toFixed(2)} MB)`);
}

// ── SRT subtitle generation ──────────────────────────────────────────
function generateSRT() {
  const SUBTITLES = [
    { start: 0,    end: 5.0,  text: "এক পাপী নারী!\nআল্লাহ তার সমস্ত গুনাহ ক্ষমা করলেন!" },
    { start: 5.0,  end: 9.5,  text: "এক নারী, যার জীবন ছিল পাপে ভরা।" },
    { start: 9.5,  end: 14.0, text: "প্রচণ্ড তৃষ্ণায় একটি কুকুর\nকুয়ার পাশে ছটফট করছে।" },
    { start: 14.0, end: 16.5, text: "কুকুরটি যেন মৃত্যুর দ্বারপ্রান্তে!" },
    { start: 16.5, end: 22.0, text: "নারীটি জুতা খুলে কুয়া থেকে পানি তুললেন।" },
    { start: 22.0, end: 27.0, text: "কুকুরটিকে পান করালেন।" },
    { start: 27.0, end: 30.5, text: "কিন্তু জানেন, এরপর কী ঘটেছিল?" },
    { start: 30.5, end: 36.5, text: "মহান আল্লাহ সেই নারীকে ক্ষমা করে দিলেন!" },
    { start: 36.5, end: 40.5, text: "আল্লাহর কাছে কোনো ভালো কাজই ছোট নয়।" },
    { start: 40.5, end: 43.5, text: "কাউকে সাহায্য করার সুযোগ পেলে অবহেলা করবেন না।" },
    { start: 43.5, end: 47.88, text: "হয়তো আপনার একটি ছোট্ট নেক আমলই হবে আল্লাহর ক্ষমা লাভের উসিলা।" },
  ];

  function toSRTTime(s) {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    const ms = Math.floor((s % 1) * 1000).toString().padStart(3, '0');
    return `${h}:${m}:${sec},${ms}`;
  }

  const srt = SUBTITLES.map((s, i) =>
    `${i + 1}\n${toSRTTime(s.start)} --> ${toSRTTime(s.end)}\n${s.text}\n`
  ).join('\n');

  const srtPath = path.join(out, 'subtitles.bn.srt');
  fs.writeFileSync(srtPath, srt, 'utf8');
  console.log(`  ✓ subtitles.bn.srt generated (${SUBTITLES.length} entries)`);
  return srtPath;
}

// ── MAIN ────────────────────────────────────────────────────────────
(async () => {
  console.log('🕌 Deen & Direction — Islamic Shorts Production');
  console.log('================================================');
  console.log(`  Total duration: ${TOTAL_DURATION}s | FPS: ${FPS} | Frames: ${FRAME_TOTAL}`);
  console.log();

  const chromePath = getChromePath();
  const browser = await chromium.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-web-security', '--allow-file-access-from-files'],
  });

  try {
    if (test) {
      // ── TEST MODE: render 1 frame per scene ───────────────────────
      console.log('🔬 Test mode — rendering 10 sample frames');
      const testFrames = [0, 7, 10, 18, 22, 29, 33, 38, 42, 46].map(s => Math.floor(s * FPS));

      // Portrait
      const pDir = path.join(out, '_test_portrait_frames');
      await renderFrames(browser, PORTRAIT.w, PORTRAIT.h, 'portrait', pDir, testFrames);
      for (let i = 0; i < testFrames.length; i++) {
        const src = path.join(pDir, `frame_${String(testFrames[i]).padStart(6, '0')}.png`);
        const dst = path.join(out, `islamic-portrait-${i+1}.png`);
        fs.copyFileSync(src, dst);
      }
      console.log('\n✅ Test frames saved to exports/islamic-portrait-*.png');

    } else {
      // ── FULL RENDER ──────────────────────────────────────────────
      console.log('🎬 Full production render starting...\n');

      // Generate SRT
      console.log('📝 Generating subtitles...');
      generateSRT();
      console.log();

      // Portrait render
      const portraitFrameDir = path.join(root, '_frames_portrait');
      const portraitFrames = Array.from({ length: FRAME_TOTAL }, (_, i) => i);
      await renderFrames(browser, PORTRAIT.w, PORTRAIT.h, 'portrait', portraitFrameDir, portraitFrames);

      const voicePath = path.join(root, 'assets', 'islamic_voice.wav');
      const mixedAudio = mixAudio(voicePath, TOTAL_DURATION);

      console.log('\n🎞️  Encoding portrait MP4...');
      encodeVideo(portraitFrameDir, mixedAudio, path.join(out, 'islamic_portrait.mp4'), PORTRAIT.w, PORTRAIT.h);

      // Landscape render
      const landscapeFrameDir = path.join(root, '_frames_landscape');
      await renderFrames(browser, LANDSCAPE.w, LANDSCAPE.h, 'landscape', landscapeFrameDir, portraitFrames);

      console.log('\n🎞️  Encoding landscape MP4...');
      encodeVideo(landscapeFrameDir, mixedAudio, path.join(out, 'islamic_landscape.mp4'), LANDSCAPE.w, LANDSCAPE.h);

      // Cleanup frame dirs
      console.log('\n🗑️  Cleaning up frame directories...');
      fs.rmSync(portraitFrameDir, { recursive: true, force: true });
      fs.rmSync(landscapeFrameDir, { recursive: true, force: true });

      // Deliverable aliases per SKILL.md specification
      fs.copyFileSync(path.join(out, 'islamic_portrait.mp4'), path.join(out, 'final_deen_direction_short.mp4'));
      fs.copyFileSync(path.join(root, 'assets', 'islamic_voice.wav'), path.join(out, 'narration.wav'));
      if (fs.existsSync(path.join(out, 'islamic-portrait-10.png'))) {
        fs.copyFileSync(path.join(out, 'islamic-portrait-10.png'), path.join(out, 'thumbnail.png'));
      }

      console.log('\n✅ Production complete!');
      console.log('   exports/final_deen_direction_short.mp4 — 1080×1920 Master Short');
      console.log('   exports/islamic_portrait.mp4           — 1080×1920 Shorts format');
      console.log('   exports/islamic_landscape.mp4          — 1920×1080 landscape');
      console.log('   exports/narration.wav                  — 48kHz master voiceover');
      console.log('   exports/subtitles.bn.srt               — Bengali subtitles');
      console.log('   exports/thumbnail.png                  — High-res cover thumbnail');
    }
  } finally {
    await browser.close();
  }
})();
