# -*- coding: utf-8 -*-
"""
Story Choreography Upgrade Script: Master 2D Animation Engine V5
Updates src/story.js with authentic character poses, tea stall vendor placement,
and responsive multi-aspect staging.
"""

story_code = '''/**
 * Bengali Story Motion — Scene Choreography & Motion Engine V5
 * Renders all narrative scenes with authentic Bengali vector art,
 * responsive multi-aspect layouts, directional speech bubbles, and kinetic karaoke typography.
 */

import {
  drawHero,
  drawTeaVendor,
  drawMainCharacter
} from './characters.js';

import {
  drawDhakaCityStreet,
  drawAuthenticTeaStall,
  drawHomeStudyOffice,
  drawCroreMilestoneStage,
  drawDisciplineStage,
  drawFinancialFreedomStage,
  drawVignette
} from './environments.js';

import { getSceneAtTime, getCurrentSubtitle } from './story_ai.js';

const TAU = Math.PI * 2;

// Snappy Easing Functions
function easeOutBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function cl(x, min = 0, max = 1) {
  return Math.max(min, Math.min(max, x));
}

// -------------------------------------------------------------
// UI COMPONENTS: Speech Bubbles, Location Pills & Kinetic Subtitles
// -------------------------------------------------------------

// Directional Speech Bubble with Pointer Tail
export function drawSpeechBubble(ctx, cx, cy, text, opts = {}) {
  ctx.save();
  ctx.font = '700 20px "Noto Sans Bengali", sans-serif';
  const textMetrics = ctx.measureText(text);
  const padX = 22;
  const padY = 14;
  const bw = Math.min(420, textMetrics.width + padX * 2);
  const bh = 54;
  const bx = cx - bw / 2;
  const by = cy - bh / 2;

  // Bubble Body
  ctx.fillStyle = opts.bgColor || '#ffffff';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.roundRect(bx, by, bw, bh, 14);
  ctx.fill();
  ctx.stroke();

  // Pointer Tail pointing downwards
  const tailX = opts.tailX || cx - 20;
  const tailY = by + bh;
  ctx.beginPath();
  ctx.moveTo(tailX - 10, tailY - 1);
  ctx.lineTo(tailX - 20, tailY + 16);
  ctx.lineTo(tailX + 4, tailY - 1);
  ctx.closePath();
  ctx.fillStyle = opts.bgColor || '#ffffff';
  ctx.fill();
  ctx.stroke();

  // Text inside bubble
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, cx, cy);

  ctx.restore();
}

// Thematic Location Pill
export function drawLocationPill(ctx, cx, cy, text, bgColor = '#1e3a8a', textColor = '#ffffff', isPortrait = true) {
  ctx.save();
  const fontSize = isPortrait ? 20 : 18;
  ctx.font = `700 ${fontSize}px "Noto Sans Bengali", sans-serif`;
  const tm = ctx.measureText(text);
  const pw = tm.width + (isPortrait ? 40 : 34);
  const ph = isPortrait ? 44 : 38;

  ctx.fillStyle = bgColor;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.roundRect(cx - pw / 2, cy - ph / 2, pw, ph, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, cx, cy);
  ctx.restore();
}

// Floating Context Badge
export function drawFloatingBadge(ctx, cx, cy, text, bgColor = '#ffffff', textColor = '#0f172a', isPortrait = true) {
  ctx.save();
  const fontSize = isPortrait ? 21 : 19;
  ctx.font = `800 ${fontSize}px "Noto Sans Bengali", sans-serif`;
  const tm = ctx.measureText(text);
  const bw = tm.width + (isPortrait ? 36 : 30);
  const bh = isPortrait ? 44 : 38;

  ctx.fillStyle = bgColor;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.roundRect(cx - bw / 2, cy - bh / 2, bw, bh, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, cx, cy);
  ctx.restore();
}

// Kinetic Karaoke Subtitle Component
export function drawKineticSubtitle(ctx, W, H, subtitleObj, t) {
  if (!subtitleObj || !subtitleObj.text) return;

  const fullText = subtitleObj.text;
  const highlightWord = subtitleObj.highlight_word || '';
  const isPortrait = W < H;

  ctx.save();
  const fontSize = isPortrait ? 24 : 22;
  ctx.font = `700 ${fontSize}px "Noto Sans Bengali", sans-serif`;
  ctx.textBaseline = 'middle';

  const maxW = W - (isPortrait ? 64 : 120);
  const words = fullText.split(' ');

  const lines = [];
  let curLine = [];
  let curLineW = 0;
  const spaceW = 8;

  for (let w of words) {
    const ww = ctx.measureText(w).width;
    if (curLine.length > 0 && curLineW + spaceW + ww > maxW) {
      lines.push(curLine);
      curLine = [w];
      curLineW = ww;
    } else {
      curLine.push(w);
      curLineW += (curLine.length === 1 ? 0 : spaceW) + ww;
    }
  }
  if (curLine.length > 0) lines.push(curLine);

  const lineHeight = fontSize * 1.45;
  const totalTextH = lines.length * lineHeight;

  let maxMeasuredLineWidth = 0;
  lines.forEach(lineWords => {
    const lw = lineWords.reduce((acc, w) => acc + ctx.measureText(w).width, 0) + spaceW * (lineWords.length - 1);
    if (lw > maxMeasuredLineWidth) maxMeasuredLineWidth = lw;
  });

  const padX = isPortrait ? 24 : 32;
  const padY = isPortrait ? 12 : 14;
  const boxW = Math.min(W - 28, maxMeasuredLineWidth + padX * 2);
  const boxH = totalTextH + padY * 2 - 4;
  const boxX = (W - boxW) / 2;
  const boxY = H * (isPortrait ? 0.86 : 0.88) - boxH / 2;

  // 1. Frosted Glass Translucent Backdrop Pill
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 4;

  const bgGrad = ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxH);
  bgGrad.addColorStop(0.0, 'rgba(15, 23, 42, 0.85)');
  bgGrad.addColorStop(1.0, 'rgba(2, 6, 23, 0.90)');
  ctx.fillStyle = bgGrad;

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.lineWidth = 1.8;

  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, [16, 16, 16, 16]);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Glass top highlight
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.roundRect(boxX + 10, boxY + 2, boxW - 20, 2, [2, 2, 2, 2]);
  ctx.stroke();
  ctx.restore();

  // 2. High-Contrast Kinetic Karaoke Subtitle Text
  const startY = boxY + padY + lineHeight * 0.5;

  lines.forEach((lineWords, lineIdx) => {
    const lineY = startY + lineIdx * lineHeight;
    const lineW = lineWords.reduce((acc, w) => acc + ctx.measureText(w).width, 0) + spaceW * (lineWords.length - 1);
    let curX = (W - lineW) / 2;

    lineWords.forEach((w) => {
      const isHighlight = highlightWord && w.includes(highlightWord);
      const width = ctx.measureText(w).width;

      ctx.save();
      if (isHighlight) {
        // Golden Karaoke Glow and smooth energetic bounce
        const bounce = Math.sin(t * 8.0) * 1.8;
        ctx.fillStyle = '#facc15';
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 14;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4.2;
        ctx.strokeText(w, curX, lineY - bounce);
        ctx.fillText(w, curX, lineY - bounce);
      } else {
        // Clean crisp pure white with dark outline
        ctx.fillStyle = '#f8fafc';
        ctx.strokeStyle = '#020617';
        ctx.lineWidth = 3.6;
        ctx.strokeText(w, curX, lineY);
        ctx.fillText(w, curX, lineY);
      }
      ctx.restore();

      curX += width + spaceW;
    });
  });

  ctx.restore();
}

// -------------------------------------------------------------
// MAIN MASTER SCENE FRAME RENDERER
// -------------------------------------------------------------
export function renderStoryFrame(ctx, W, H, t) {
  const scene = getSceneAtTime(t);
  const local = t - scene.start;
  const isPortrait = W < H;

  // Responsive character scaling and baseline Y coordinates
  const charScale = isPortrait ? 1.25 : 0.88;
  const charY = isPortrait ? H * 0.70 : H * 0.78;
  const pillY = isPortrait ? 65 : 44;
  const badgeY = isPortrait ? 130 : 94;

  // -----------------------------------------------------------
  // SCENE 1: 0.0s - 5.8s (প্রতিদিনের অভ্যাস • কোটিপতি হওয়ার বাধা)
  // -----------------------------------------------------------
  if (scene.id === 1) {
    drawDhakaCityStreet(ctx, W, H, t);

    // Rafiq walking casually down modern sidewalk
    const walkX = W * 0.48 + Math.sin(t * 1.5) * (isPortrait ? 20 : 35);
    drawHero(ctx, walkX, charY, charScale, t, {
      pose: 'walk',
      gaze: 'center',
      emotion: 'smile',
      talking: false
    });

    // Floating glowing question mark
    const qFloat = Math.sin(t * 3) * 5;
    ctx.save();
    ctx.fillStyle = '#facc15';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 14;
    ctx.font = `900 ${isPortrait ? 36 : 28}px "Noto Sans Bengali", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('?', walkX + 32 * charScale, charY - 240 * charScale + qFloat);
    ctx.restore();

    // Location Pill & Floating Badge
    const pillScale = easeOutBack(cl(local / 0.45));
    ctx.save();
    ctx.translate(W / 2, pillY);
    ctx.scale(pillScale, pillScale);
    drawLocationPill(ctx, 0, 0, scene.location_tag, '#1e1b4b', '#facc15', isPortrait);
    ctx.restore();

    if (local > 2.2) {
      const badgeScale = easeOutBack(cl((local - 2.2) / 0.45));
      ctx.save();
      ctx.translate(W / 2, badgeY);
      ctx.scale(badgeScale, badgeScale);
      drawFloatingBadge(ctx, 0, 0, scene.floating_badge, '#fef08a', '#0f172a', isPortrait);
      ctx.restore();
    }

  // -----------------------------------------------------------
  // SCENE 2: 5.8s - 16.8s (বাইরে চা-নাশতার আড্ডা • ১০০ টাকার খরচ)
  // -----------------------------------------------------------
  } else if (scene.id === 2) {
    drawAuthenticTeaStall(ctx, W, H, t);

    // Tea Vendor behind counter on the right
    const vendorX = isPortrait ? W * 0.74 : W * 0.74;
    const vendorY = charY - (isPortrait ? 12 : 18);
    drawTeaVendor(ctx, vendorX, vendorY, charScale * 0.96, t);

    // Dialogue trigger at 14.0s (local >= 8.2)
    const isHeroSpeaking = (local >= 8.2);

    // Determine Rafiq pose:
    // local 0.0 - 4.2: drinking tea
    // local 4.2 - 8.2: paying ৳100 note forward
    // local 8.2+: shrugging and asking "এতে কী আর এমন যায় আসে?"
    let heroPose = 'drink_tea';
    if (local >= 4.2 && local < 8.2) {
      heroPose = 'pay_cash';
    } else if (isHeroSpeaking) {
      heroPose = 'standing';
    }

    const heroX = isPortrait ? W * 0.36 : W * 0.35;
    drawHero(ctx, heroX, charY, charScale, t, {
      pose: heroPose,
      gaze: isHeroSpeaking ? 'center' : 'right',
      talking: isHeroSpeaking,
      emotion: isHeroSpeaking ? 'surprised' : 'smile'
    });

    // Speech Bubble: "এতে কী আর এমন যায় আসে?"
    if (isHeroSpeaking) {
      const bubbleScale = easeOutBack(cl((local - 8.2) / 0.4));
      ctx.save();
      ctx.translate(heroX + (isPortrait ? 20 : 30), isPortrait ? H * 0.28 : H * 0.25);
      ctx.scale(bubbleScale, bubbleScale);
      drawSpeechBubble(ctx, 0, 0, 'এতে কী আর এমন যায় আসে?', {
        tailX: -20
      });
      ctx.restore();
    }

    // Location Pill & Floating Badge
    const pScale = easeOutBack(cl(local / 0.45));
    ctx.save();
    ctx.translate(W / 2, pillY);
    ctx.scale(pScale, pScale);
    drawLocationPill(ctx, 0, 0, scene.location_tag, '#451a03', '#fef08a', isPortrait);
    ctx.restore();

    if (local > 2.5) {
      const bScale = easeOutBack(cl((local - 2.5) / 0.45));
      ctx.save();
      ctx.translate(W / 2, badgeY);
      ctx.scale(bScale, bScale);
      drawFloatingBadge(ctx, 0, 0, scene.floating_badge, '#ffffff', '#0f172a', isPortrait);
      ctx.restore();
    }

  // -----------------------------------------------------------
  // SCENE 3: 16.8s - 31.6s (আসল খেলা • মিউচুয়াল ফান্ড ও ১৫ লাখ টাকা)
  // -----------------------------------------------------------
  } else if (scene.id === 3) {
    drawHomeStudyOffice(ctx, W, H, t);

    // Rafiq pointing high to the 12% compounding growth chart
    drawHero(ctx, W * (isPortrait ? 0.26 : 0.18), charY, charScale, t, {
      pose: 'point_chart',
      gaze: 'right',
      talking: false,
      emotion: 'happy'
    });

    // Location Tag
    const pScale = easeOutBack(cl(local / 0.45));
    ctx.save();
    ctx.translate(W / 2, pillY);
    ctx.scale(pScale, pScale);
    drawLocationPill(ctx, 0, 0, scene.location_tag, '#0369a1', '#ffffff', isPortrait);
    ctx.restore();

    // Floating compounding rate badge (১২% রিটার্ন)
    if (local > 2.0 && local < 9.5) {
      const bScale = easeOutBack(cl((local - 2.0) / 0.45));
      ctx.save();
      ctx.translate(W * (isPortrait ? 0.66 : 0.72), isPortrait ? H * 0.24 : H * 0.22);
      ctx.scale(bScale, bScale);
      drawFloatingBadge(ctx, 0, 0, 'গড়ে ১২% চক্রবৃদ্ধি রিটার্ন 📈', '#0284c7', '#ffffff', isPortrait);
      ctx.restore();
    }

    // Grand 15 Lakh Celebration Milestone (At ~29.5s -> local ~12.7s)
    if (local >= 9.5) {
      const cScale = easeOutBack(cl((local - 9.5) / 0.45));
      ctx.save();
      ctx.translate(W / 2, badgeY);
      ctx.scale(cScale, cScale);
      drawFloatingBadge(ctx, 0, 0, '১৫ বছর পর = ১৫,০০,০০০ টাকা! 💰', '#facc15', '#0f172a', isPortrait);
      ctx.restore();
    }

  // -----------------------------------------------------------
  // SCENE 4: 31.6s - 38.0s (২৫ বছরের কম্পাউন্ডিং • ১ কোটি টাকা!)
  // -----------------------------------------------------------
  } else if (scene.id === 4) {
    drawCroreMilestoneStage(ctx, W, H, t);

    // Rafiq triumphantly celebrating 1 Crore with both fists raised
    drawHero(ctx, W * 0.5, charY, charScale, t, {
      pose: 'celebrate',
      gaze: 'center',
      talking: false,
      emotion: 'happy'
    });

    // Golden Crown Icon Floating over head
    ctx.save();
    ctx.fillStyle = '#facc15';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 16;
    ctx.font = `900 ${isPortrait ? 34 : 26}px "Noto Sans Bengali", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('👑', W * 0.5, charY - 260 * charScale + Math.sin(t * 3) * 4);
    ctx.restore();

    // Location Pill & Giant Golden Milestone Badge
    const pScale = easeOutBack(cl(local / 0.45));
    ctx.save();
    ctx.translate(W / 2, pillY);
    ctx.scale(pScale, pScale);
    drawLocationPill(ctx, 0, 0, scene.location_tag, '#581c87', '#fde047', isPortrait);
    ctx.restore();

    const bScale = easeOutBack(cl((local - 1.2) / 0.45));
    ctx.save();
    ctx.translate(W / 2, badgeY);
    ctx.scale(bScale, bScale);
    drawFloatingBadge(ctx, 0, 0, '১০০ টাকা ➔ প্রায় ১ কোটি টাকা! 🏆', '#facc15', '#0f172a', isPortrait);
    ctx.restore();

  // -----------------------------------------------------------
  // SCENE 5: 38.0s - 44.6s (ধনী হওয়ার মূলমন্ত্র • খরচে লাগাম ও ধৈর্য)
  // -----------------------------------------------------------
  } else if (scene.id === 5) {
    drawDisciplineStage(ctx, W, H, t);

    // Rafiq in Center with calm, disciplined, hand-on-heart posture
    drawHero(ctx, W * 0.5, charY, charScale, t, {
      pose: 'discipline',
      gaze: 'center',
      talking: false,
      emotion: 'neutral'
    });

    // Location Pill: ধনী হওয়ার গোপন সূত্র 🔑
    const pScale = easeOutBack(cl(local / 0.45));
    ctx.save();
    ctx.translate(W / 2, pillY);
    ctx.scale(pScale, pScale);
    drawLocationPill(ctx, 0, 0, scene.location_tag, '#0f172a', '#38bdf8', isPortrait);
    ctx.restore();

    if (local > 2.0) {
      const bScale = easeOutBack(cl((local - 2.0) / 0.45));
      ctx.save();
      ctx.translate(W / 2, badgeY);
      ctx.scale(bScale, bScale);
      drawFloatingBadge(ctx, 0, 0, scene.floating_badge, '#f8fafc', '#0f172a', isPortrait);
      ctx.restore();
    }

  // -----------------------------------------------------------
  // SCENE 6: 44.6s - 52.8s (আর্থিক স্বাধীনতা • আজকের ত্যাগেই আগামী)
  // -----------------------------------------------------------
  } else if (scene.id === 6) {
    drawFinancialFreedomStage(ctx, W, H, t);

    // Rafiq standing looking towards the dawn on balcony
    drawHero(ctx, W * (isPortrait ? 0.38 : 0.30), charY, charScale, t, {
      pose: 'standing',
      gaze: 'right',
      talking: false,
      emotion: 'happy'
    });

    // Location Pill: আগামী দিনের আর্থিক স্বাধীনতা 🌅
    const pScale = easeOutBack(cl(local / 0.45));
    ctx.save();
    ctx.translate(W / 2, pillY);
    ctx.scale(pScale, pScale);
    drawLocationPill(ctx, 0, 0, scene.location_tag, '#0284c7', '#ffffff', isPortrait);
    ctx.restore();

    // Climax Inspirational Banner
    if (local > 2.0) {
      const bScale = easeOutBack(cl((local - 2.0) / 0.45));
      ctx.save();
      ctx.translate(W / 2, badgeY);
      ctx.scale(bScale, bScale);
      drawFloatingBadge(ctx, 0, 0, 'আজকের ত্যাগ = আর্থিক স্বাধীনতা ✨', '#facc15', '#0f172a', isPortrait);
      ctx.restore();
    }
  }

  // DYNAMIC KINETIC KARAOKE SUBTITLE RENDERER (ACTIVE WORD IN GOLD)
  const currentSub = getCurrentSubtitle(t);
  if (currentSub) {
    drawKineticSubtitle(ctx, W, H, currentSub, t);
  }
}
'''

with open('src/story.js', 'w', encoding='utf-8') as f:
    f.write(story_code)
print("✓ Updated src/story.js successfully")
