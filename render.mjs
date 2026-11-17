import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  const fallbackPaths = [
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'node_modules'),
    'c:\\Users\\mdsia\\Downloads\\Hasan-Skill-Zone\\node_modules'
  ];
  ({ chromium } = require(require.resolve('playwright', { paths: fallbackPaths })));
}

const root = path.dirname(fileURLToPath(import.meta.url));
const test = process.argv.includes('--test');
const config = JSON.parse(fs.readFileSync(path.join(root, 'story.json'), 'utf8'));
const out = path.join(root, 'exports');
fs.mkdirSync(out, { recursive: true });

function getFfmpegPath() {
  if (process.env.FFMPEG_PATH && fs.existsSync(process.env.FFMPEG_PATH)) return process.env.FFMPEG_PATH;
  const candidates = [
    'C:\\Users\\mdsia\\AppData\\Local\\Programs\\Python\\Python314\\Scripts\\ffmpeg.exe',
    'ffmpeg',
    'C:\\ffmpeg\\bin\\ffmpeg.exe'
  ];
  for (const c of candidates) {
    try {
      const r = spawnSync(c, ['-version'], { stdio: 'ignore' });
      if (r.status === 0) return c;
    } catch {}
  }
  return 'ffmpeg';
}

const FFMPEG_BIN = getFfmpegPath();

function command(args) {
  const r = spawnSync(FFMPEG_BIN, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('FFmpeg command failed');
}

function getExecutablePath() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return undefined;
}

const fps = 30;
const totalDuration = config.duration || 89.6;
const totalFrames = Math.ceil(totalDuration * fps);

async function renderFormat(format) {
  const isPortrait = format === 'portrait';
  const width = isPortrait ? 576 : 1024;
  const height = isPortrait ? 1024 : 576;
  const previewFile = path.join(root, 'preview', `${format}.html`);

  console.log(`\n=== Processing Format: ${format.toUpperCase()} (${width}x${height}) ===`);

  const browser = await chromium.launch({
    headless: true,
    executablePath: getExecutablePath(),
    args: [
      '--disable-web-security',
      '--allow-file-access-from-files',
      '--no-sandbox',
      '--disable-dev-shm-usage'
    ]
  });

  const page = await browser.newPage({
    viewport: { width, height: height + 100 }
  });

  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`[Browser Console Error] ${msg.text()}`);
  });
  page.on('pageerror', err => console.log(`[Browser Page Error] ${err.message}`));

  await page.goto(pathToFileURL(previewFile).href, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => typeof window.seekToFrame === 'function', { timeout: 30000 });

  if (test) {
    console.log(`Running --test frame verification for ${format}...`);
    for (let i = 0; i < config.scenes.length; i++) {
      const scene = config.scenes[i];
      const midTime = scene.start + (scene.end - scene.start) / 2;
      const frameIdx = Math.floor(midTime * fps);

      await page.evaluate(f => window.seekToFrame(f, 30), frameIdx);
      const canvas = await page.$('#storyCanvas');
      const pngPath = path.join(out, `${format}-${i + 1}.png`);
      await canvas.screenshot({ path: pngPath });
      console.log(`Captured frame: scene ${i + 1} (${scene.title}) -> ${pngPath}`);
    }
    await browser.close();
    console.log(`[PASS] ${format}: all test frames captured successfully.`);
    return;
  }

  // Full Master Video Render
  const silentMp4 = path.join(out, `${format}_silent.mp4`);
  const finalMp4 = path.join(out, `${format}.mp4`);
  const effectsWav = path.join(out, `${format}_effects.wav`);
  const voiceWav = path.join(root, config.voice || 'assets/voice.wav');

  console.log(`Rendering ${totalFrames} frames at ${fps} fps to ${silentMp4}...`);

  const ffmpeg = spawn(FFMPEG_BIN, [
    '-hide_banner',
    '-loglevel', 'error',
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'png',
    '-r', String(fps),
    '-i', '-',
    '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'fast',
    '-crf', '18',
    silentMp4
  ]);

  ffmpeg.stdin.on('error', err => {
    if (err.code !== 'EPIPE') console.error('[FFmpeg Stdin Error]', err);
  });
  ffmpeg.stderr.on('data', data => console.error(`[FFmpeg Error] ${data}`));

  const canvas = await page.$('#storyCanvas');
  const reportInterval = 150;

  for (let f = 0; f < totalFrames; f++) {
    await page.evaluate(({ f, fps }) => window.seekToFrame(f, fps), { f, fps });
    const buf = await canvas.screenshot({ type: 'png' });
    ffmpeg.stdin.write(buf);

    if (f % reportInterval === 0 || f === totalFrames - 1) {
      const pct = Math.round((f / (totalFrames - 1)) * 100);
      console.log(`${format}: frame ${f + 1}/${totalFrames} (${pct}%)`);
    }
  }

  ffmpeg.stdin.end();
  await new Promise((resolve, reject) => {
    ffmpeg.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
  });

  await browser.close();

  // Mux with voiceover + soft background music (BGM) + transition SFX
  console.log(`Muxing audio with soft BGM and motion SFX for ${format}...`);
  const bgmWav = path.join(root, 'assets/bgm.wav');
  const sfxWav = path.join(root, 'assets/sfx_transitions.wav');

  if (fs.existsSync(voiceWav) && fs.existsSync(bgmWav) && fs.existsSync(sfxWav)) {
    command([
      '-i', silentMp4,
      '-i', voiceWav,
      '-i', bgmWav,
      '-i', sfxWav,
      '-filter_complex', '[1:a]volume=1.0[v];[2:a]volume=0.22[b];[3:a]volume=0.35[s];[v][b][s]amix=inputs=3:duration=first:dropout_transition=2[aout]',
      '-map', '0:v',
      '-map', '[aout]',
      '-c:v', 'copy',
      '-c:a', 'aac',
      '-b:a', '192k',
      '-shortest',
      finalMp4
    ]);
  } else if (fs.existsSync(voiceWav)) {
    command([
      '-i', silentMp4,
      '-i', voiceWav,
      '-c:v', 'copy',
      '-c:a', 'aac',
      '-b:a', '192k',
      '-shortest',
      finalMp4
    ]);
  } else {
    fs.copyFileSync(silentMp4, finalMp4);
  }

  console.log(`Successfully exported: ${finalMp4} (Clean, ZERO watermark)`);
}

async function run() {
  await renderFormat('portrait');
  await renderFormat('landscape');
}

run().catch(err => {
  console.error('Render failed:', err);
  process.exit(1);
});
