/**
 * Islamic Shorts — Scene Choreography Engine
 * Deen & Direction Production
 * Total duration: ~45 seconds | Portrait: 1080×1920 | 30fps
 *
 * Scene timeline (adjusted to 44.88s actual voice):
 * 00:00–05.0  Hook — Desert night, well silhouette
 * 05.0–09.5   Woman walking in village path
 * 09.5–16.5   Dog at well (thirsty, panting)
 * 16.5–19.5   Dog dying close-up
 * 19.5–27.0   Woman rescue action at well
 * 27.0–30.5   Dramatic pause — golden light
 * 30.5–36.5   Forgiveness — divine light
 * 36.5–40.5   Lesson 1 — Storyteller speaking
 * 40.5–43.5   Lesson 2 — Storyteller gesture
 * 43.5–47.88  Ending + End card
 */

import {
  drawWoman,
  drawDog,
  drawStoryteller
} from './characters.js';

import {
  drawDesertNightHook,
  drawDesertVillagePath,
  drawStoneWellScene,
  drawDesertGoldenLight,
  drawDivineLightScene,
  drawTeachingStageWarm,
  drawGoldenEndingStage,
  drawVignette
} from './environments.js';

// ═══════════════ EASING FUNCTIONS ═══════════════
function easeInOut(x) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}
function easeOutBack(x) {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}
function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}
function sceneProgress(currentTime, sceneStart, sceneEnd) {
  return clamp((currentTime - sceneStart) / (sceneEnd - sceneStart), 0, 1);
}

// ═══════════════ SUBTITLE SYSTEM ═══════════════
const SUBTITLES = [
  { start: 0,    end: 5.0,  line1: "এক পাপী নারী!", line2: "আল্লাহ তার সমস্ত গুনাহ ক্ষমা করলেন!", highlight: "ক্ষমা" },
  { start: 5.0,  end: 9.5,  line1: "এক নারী, যার জীবন", line2: "ছিল পাপে ভরা।", highlight: "পাপে ভরা" },
  { start: 9.5,  end: 14.0, line1: "প্রচণ্ড তৃষ্ণায় একটি কুকুর", line2: "কুয়ার পাশে ছটফট করছে।", highlight: "তৃষ্ণায়" },
  { start: 14.0, end: 16.5, line1: "কুকুরটি যেন", line2: "মৃত্যুর দ্বারপ্রান্তে!", highlight: "মৃত্যুর দ্বারপ্রান্তে" },
  { start: 16.5, end: 22.0, line1: "নারীটি জুতা খুলে কুয়া থেকে", line2: "পানি তুললেন।", highlight: "পানি তুললেন" },
  { start: 22.0, end: 27.0, line1: "কুকুরটিকে পান করালেন।", line2: "", highlight: "" },
  { start: 27.0, end: 30.5, line1: "কিন্তু জানেন,", line2: "এরপর কী ঘটেছিল?", highlight: "কী ঘটেছিল" },
  { start: 30.5, end: 36.5, line1: "মহান আল্লাহ সেই নারীকে", line2: "ক্ষমা করে দিলেন!", highlight: "ক্ষমা করে দিলেন" },
  { start: 36.5, end: 40.5, line1: "আল্লাহর কাছে কোনো", line2: "ভালো কাজই ছোট নয়।", highlight: "ছোট নয়" },
  { start: 40.5, end: 43.5, line1: "কাউকে সাহায্য করার সুযোগ", line2: "পেলে অবহেলা করবেন না।", highlight: "অবহেলা করবেন না" },
  { start: 43.5, end: 47.88, line1: "হয়তো আপনার একটি ছোট্ট নেক আমলই", line2: "হবে আল্লাহর ক্ষমা লাভের উসিলা।", highlight: "নেক আমল" },
];

function getCurrentSubtitle(t) {
  return SUBTITLES.find(s => t >= s.start && t < s.end) || null;
}

function drawKineticSubtitle(ctx, W, H, sub, t) {
  if (!sub) return;

  const lines = [sub.line1, sub.line2].filter(Boolean);
  const maxLen = Math.max(...lines.map(l => l.length));
  const fontSize = maxLen > 24 ? H * 0.032 : (maxLen > 16 ? H * 0.036 : H * 0.040);
  const lineHeight = fontSize * 1.35;
  const safeY = (t >= 43.5) ? H * 0.59 : H * 0.72; // above end-card when card is showing

  // Frosted glass pill background
  const pillW = W * 0.92;
  const pillH = lineHeight * lines.length + 28;
  const pillX = (W - pillW) / 2;
  const pillY = safeY - 14;

  ctx.save();
  ctx.globalAlpha = 0.78;
  ctx.fillStyle = 'rgba(12,10,22,0.88)';
  _roundRect(ctx, pillX, pillY, pillW, pillH, 20);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();

  // Border glow
  ctx.save();
  ctx.strokeStyle = 'rgba(212,160,30,0.55)';
  ctx.lineWidth = 1.5;
  _roundRect(ctx, pillX, pillY, pillW, pillH, 20);
  ctx.stroke();
  ctx.restore();

  // Text
  ctx.save();
  ctx.textAlign = 'center';

  lines.forEach((line, lineIdx) => {
    const y = safeY + lineIdx * lineHeight + fontSize * 0.9;

    if (sub.highlight && line.includes(sub.highlight)) {
      // Split at highlight word
      const parts = line.split(sub.highlight);
      const fullText = line;
      const measure = (txt, fs) => {
        ctx.font = `700 ${fs}px 'Hind Siliguri', 'Noto Sans Bengali', sans-serif`;
        return ctx.measureText(txt).width;
      };
      const totalW = measure(fullText, fontSize);
      let startX = W / 2 - totalW / 2;

      parts.forEach((part, partIdx) => {
        // Normal text
        ctx.font = `600 ${fontSize}px 'Hind Siliguri', 'Noto Sans Bengali', sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0,0,0,0.9)';
        ctx.shadowBlur = 6;
        ctx.strokeStyle = 'rgba(0,0,0,0.85)';
        ctx.lineWidth = 4;

        if (part) {
          ctx.strokeText(part, startX + measure(part, fontSize) / 2, y);
          ctx.fillText(part, startX + measure(part, fontSize) / 2, y);
          startX += measure(part, fontSize);
        }

        // Highlight word
        if (partIdx < parts.length - 1) {
          const hPulse = 1 + 0.08 * Math.sin(t * 4);
          ctx.save();
          ctx.translate(startX + measure(sub.highlight, fontSize) / 2, y);
          ctx.scale(hPulse, hPulse);
          ctx.font = `700 ${fontSize}px 'Hind Siliguri', 'Noto Sans Bengali', sans-serif`;
          ctx.fillStyle = '#fbbf24';
          ctx.shadowColor = 'rgba(251,191,36,0.6)';
          ctx.shadowBlur = 12;
          ctx.strokeStyle = 'rgba(120,60,0,0.7)';
          ctx.lineWidth = 3;
          ctx.strokeText(sub.highlight, 0, 0);
          ctx.fillText(sub.highlight, 0, 0);
          ctx.restore();
          startX += measure(sub.highlight, fontSize);
        }
      });
    } else {
      // Normal line without highlight
      ctx.font = `600 ${fontSize}px 'Hind Siliguri', 'Noto Sans Bengali', sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0,0,0,0.9)';
      ctx.shadowBlur = 6;
      ctx.strokeStyle = 'rgba(0,0,0,0.85)';
      ctx.lineWidth = 4;
      ctx.strokeText(line, W / 2, y);
      ctx.fillText(line, W / 2, y);
    }
  });

  ctx.restore();
}

function _roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

// ═══════════════ CAMERA PUSH-IN ═══════════════
function applyCameraEffect(ctx, W, H, zoom, panX, panY) {
  if (zoom === 1 && panX === 0 && panY === 0) return;
  ctx.translate(W / 2 + panX, H / 2 + panY);
  ctx.scale(zoom, zoom);
  ctx.translate(-W / 2, -H / 2);
}

// ═══════════════ SCENE TRANSITION ═══════════════
function drawTransition(ctx, W, H, progress, type = 'fade') {
  if (type === 'fade' && progress > 0) {
    ctx.save();
    ctx.globalAlpha = progress;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }
}

function getTransitionAlpha(t, sceneStart, sceneEnd, fadeDuration = 0.4) {
  const local = t - sceneStart;
  const totalDur = sceneEnd - sceneStart;
  if (local < fadeDuration) return local / fadeDuration; // fade in
  if (local > totalDur - fadeDuration) return (totalDur - local) / fadeDuration; // fade out
  return 1;
}

// ═══════════════ END CARD ═══════════════
function drawEndCard(ctx, W, H, t, progress) {
  const alpha = easeInOut(clamp(progress, 0, 1));
  if (alpha < 0.01) return;

  ctx.save();
  ctx.globalAlpha = alpha;

  // Semi-transparent overlay at bottom
  const cardH = H * 0.16;
  const cardY = H * 0.80;
  ctx.fillStyle = 'rgba(10,8,20,0.88)';
  _roundRect(ctx, W * 0.05, cardY, W * 0.90, cardH, 18);
  ctx.fill();
  ctx.strokeStyle = 'rgba(212,160,30,0.6)';
  ctx.lineWidth = 2;
  _roundRect(ctx, W * 0.05, cardY, W * 0.90, cardH, 18);
  ctx.stroke();

  // Brand name
  ctx.textAlign = 'center';
  ctx.font = `700 ${H * 0.034}px 'Hind Siliguri', 'Noto Sans Bengali', serif`;
  ctx.fillStyle = '#fbbf24';
  ctx.shadowColor = 'rgba(251,191,36,0.4)';
  ctx.shadowBlur = 10;
  ctx.fillText('Deen & Direction', W / 2, cardY + cardH * 0.40);

  // Source citation
  ctx.font = `500 ${H * 0.024}px 'Hind Siliguri', 'Noto Sans Bengali', sans-serif`;
  ctx.fillStyle = '#c8d0e0';
  ctx.shadowBlur = 0;
  ctx.fillText('সহিহ বুখারি ৩৪৬৭ | সহিহ মুসলিম ২২৪৫', W / 2, cardY + cardH * 0.76);

  // Small decorative divider
  ctx.strokeStyle = 'rgba(212,160,30,0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W * 0.25, cardY + cardH * 0.56);
  ctx.lineTo(W * 0.75, cardY + cardH * 0.56);
  ctx.stroke();

  ctx.restore();
}

// ═══════════════ MAIN RENDER FUNCTION ═══════════════
export function renderFrame(ctx, W, H, t, config) {
  const totalDur = 47.88;
  ctx.clearRect(0, 0, W, H);

  // ── HOOK (0–5s) ────────────────────────────────
  if (t < 5.0) {
    const p = sceneProgress(t, 0, 5.0);
    const zoom = 1 + 0.03 * p;
    ctx.save();
    applyCameraEffect(ctx, W, H, zoom, 0, -10 * p);
    drawDesertNightHook(ctx, W, H, t);
    ctx.restore();

    // Dramatic hook title overlay
    if (t < 4.5) {
      const titleAlpha = t < 0.6 ? t / 0.6 : (t > 4.0 ? (4.5 - t) / 0.5 : 1);
      ctx.save();
      ctx.globalAlpha = titleAlpha;
      ctx.textAlign = 'center';

      // Question mark burst
      const qScale = 1 + 0.05 * Math.sin(t * 2.5);
      ctx.save();
      ctx.translate(W / 2, H * 0.26);
      ctx.scale(qScale, qScale);
      ctx.font = `900 ${H * 0.09}px 'Hind Siliguri', serif`;
      ctx.fillStyle = '#fbbf24';
      ctx.shadowColor = 'rgba(251,191,36,0.7)';
      ctx.shadowBlur = 25;
      ctx.fillText('?', 0, 0);
      ctx.restore();

      ctx.restore();
    }
  }

  // ── WOMAN WALKING (5–9.5s) ────────────────────
  else if (t < 9.5) {
    const p = sceneProgress(t, 5.0, 9.5);
    const zoom = 1.02 + 0.02 * p;
    ctx.save();
    applyCameraEffect(ctx, W, H, zoom, -15 * p, 0);
    drawDesertVillagePath(ctx, W, H, t);

    // Woman walking away (rear view, center-left)
    const womanX = W * (0.48 - 0.04 * p);
    const womanY = H * 0.62;
    drawWoman(ctx, womanX, womanY, 0.85, 'walking', t);
    ctx.restore();
  }

  // ── DOG AT WELL (9.5–16.5s) ──────────────────
  else if (t < 16.5) {
    const p = sceneProgress(t, 9.5, 16.5);
    const zoom = 1.0 + 0.04 * p;
    ctx.save();
    applyCameraEffect(ctx, W, H, zoom, 0, -8 * p);
    drawStoneWellScene(ctx, W, H, t);

    // Dog on ground beside well, panting
    const dogX = W * 0.66;
    const dogY = H * 0.67;
    drawDog(ctx, dogX, dogY, 0.75, 'panting_thirsty', t);

    // Woman in background watching
    if (p > 0.3) {
      const watchAlpha = easeInOut(clamp((p - 0.3) / 0.4, 0, 1));
      ctx.save();
      ctx.globalAlpha = watchAlpha;
      drawWoman(ctx, W * 0.25, H * 0.58, 0.70, 'watching', t);
      ctx.restore();
    }
    ctx.restore();
  }

  // ── DOG DYING (16.5–19.5s) ───────────────────
  else if (t < 19.5) {
    const p = sceneProgress(t, 16.5, 19.5);
    // Close-up pan toward dog
    const zoom = 1.08 + 0.06 * p;
    ctx.save();
    applyCameraEffect(ctx, W, H, zoom, 60 * p, -40 * p);
    drawStoneWellScene(ctx, W, H, t);
    drawDog(ctx, W * 0.58, H * 0.66, 0.95, 'panting_thirsty', t);
    ctx.restore();

    // Desperation overlay — slight red tint vignette
    ctx.save();
    ctx.globalAlpha = 0.08 + 0.05 * Math.sin(t * 3);
    const desp = ctx.createRadialGradient(W/2, H/2, H * 0.1, W/2, H/2, H * 0.65);
    desp.addColorStop(0, 'rgba(0,0,0,0)');
    desp.addColorStop(1, 'rgba(80,10,0,0.6)');
    ctx.fillStyle = desp;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  // ── RESCUE ACTION (19.5–27s) ─────────────────
  else if (t < 27.0) {
    const p = sceneProgress(t, 19.5, 27.0);
    const zoom = 1.05 - 0.03 * easeInOut(p);
    ctx.save();
    applyCameraEffect(ctx, W, H, zoom, 20 * (1-p), 0);
    drawStoneWellScene(ctx, W, H, t);

    // Woman at well rescuing
    drawWoman(ctx, W * 0.38, H * 0.57, 0.82, 'rescue_bend', t);

    // Dog below well drinking
    if (p > 0.45) {
      const dogAlpha = easeInOut(clamp((p - 0.45) / 0.3, 0, 1));
      ctx.save();
      ctx.globalAlpha = dogAlpha;
      drawDog(ctx, W * 0.65, H * 0.67, 0.72, 'drinking', t);
      ctx.restore();
    }

    // Water sparkle effect
    if (p > 0.2 && p < 0.85) {
      _drawWaterPour(ctx, W * 0.44, H * 0.58, t);
    }

    ctx.restore();
  }

  // ── DRAMATIC PAUSE (27–30.5s) ────────────────
  else if (t < 30.5) {
    const p = sceneProgress(t, 27.0, 30.5);
    const zoom = 1.0 + 0.02 * Math.sin(t * 0.5);
    ctx.save();
    applyCameraEffect(ctx, W, H, zoom, 0, 0);
    drawDesertGoldenLight(ctx, W, H, t);
    ctx.restore();
  }

  // ── FORGIVENESS (30.5–36.5s) ─────────────────
  else if (t < 36.5) {
    const p = sceneProgress(t, 30.5, 36.5);
    const zoom = 1.02 + 0.02 * easeInOut(p);
    ctx.save();
    applyCameraEffect(ctx, W, H, zoom, 0, -15 * p);
    drawDivineLightScene(ctx, W, H, t);

    // Woman silhouette in golden light
    const wAlpha = easeInOut(clamp(p / 0.4, 0, 1));
    ctx.save();
    ctx.globalAlpha = 0.85 * wAlpha;
    drawWoman(ctx, W * 0.5, H * 0.58, 0.88, 'standing_peaceful', t);
    ctx.restore();
    ctx.restore();
  }

  // ── LESSON 1 (36.5–40.5s) ────────────────────
  else if (t < 40.5) {
    const p = sceneProgress(t, 36.5, 40.5);
    ctx.save();
    applyCameraEffect(ctx, W, H, 1.0 + 0.01 * Math.sin(t * 0.8), 0, 0);
    drawTeachingStageWarm(ctx, W, H, t);
    drawStoryteller(ctx, W * 0.5, H * 0.50, 0.90, 'speaking', t);
    ctx.restore();
  }

  // ── LESSON 2 (40.5–43.5s) ────────────────────
  else if (t < 43.5) {
    ctx.save();
    drawTeachingStageWarm(ctx, W, H, t);
    drawStoryteller(ctx, W * 0.5, H * 0.50, 0.90, 'gesture_point', t);
    ctx.restore();
  }

  // ── ENDING (43.5–47.88s) ─────────────────────
  else {
    const p = sceneProgress(t, 43.5, 47.88);
    ctx.save();
    drawGoldenEndingStage(ctx, W, H, t);
    // Humble storyteller
    const storyAlpha = easeInOut(clamp(p / 0.3, 0, 1));
    ctx.save();
    ctx.globalAlpha = storyAlpha;
    drawStoryteller(ctx, W * 0.5, H * 0.48, 0.80, 'humble', t);
    ctx.restore();
    ctx.restore();

    // End card
    const cardProgress = easeInOut(clamp((p - 0.4) / 0.4, 0, 1));
    drawEndCard(ctx, W, H, t, cardProgress);
  }

  // ── SUBTITLES (always on top) ────────────────
  const sub = getCurrentSubtitle(t);
  drawKineticSubtitle(ctx, W, H, sub, t);

  // ── SCENE FADE TRANSITIONS ────────────────────
  const transitions = [5.0, 9.5, 16.5, 19.5, 27.0, 30.5, 36.5, 40.5, 43.5];
  for (const tr of transitions) {
    const diff = t - tr;
    if (diff >= 0 && diff < 0.35) {
      const fadeIn = diff / 0.35;
      const fadeInAlpha = 1 - easeOutExpo(fadeIn);
      if (fadeInAlpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = fadeInAlpha * 0.75;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
        break;
      }
    }
  }

  // ── TOP BRAND PILL ────────────────────────────
  if (t > 1.5) {
    const brandAlpha = clamp((t - 1.5) / 1.0, 0, 0.9);
    ctx.save();
    ctx.globalAlpha = brandAlpha * 0.85;
    ctx.fillStyle = 'rgba(10,8,20,0.75)';
    _roundRect(ctx, W * 0.25, H * 0.025, W * 0.50, H * 0.038, 12);
    ctx.fill();
    ctx.textAlign = 'center';
    ctx.font = `600 ${H * 0.022}px 'Hind Siliguri', serif`;
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('Deen & Direction', W * 0.5, H * 0.025 + H * 0.027);
    ctx.restore();
  }
}

// ═══════════════ HELPERS ═══════════════
function _drawWaterPour(ctx, x, y, t) {
  ctx.save();
  ctx.globalAlpha = 0.65;
  ctx.strokeStyle = '#80c8f8';
  ctx.lineWidth = 3;
  for (let i = 0; i < 4; i++) {
    const offset = (t * 2 + i * 0.3) % 1;
    ctx.globalAlpha = 0.4 * (1 - offset);
    ctx.beginPath();
    ctx.moveTo(x + (i - 2) * 6, y + offset * 60);
    ctx.quadraticCurveTo(
      x + (i - 2) * 4, y + offset * 60 + 20,
      x + (i - 2) * 8, y + offset * 60 + 40
    );
    ctx.stroke();
  }
  // Water splash at bottom
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = '#80c8f8';
  ctx.beginPath();
  ctx.ellipse(x, y + 70, 15, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
