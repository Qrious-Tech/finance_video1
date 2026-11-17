/**
 * Bengali Story Motion — Scene Choreography & Motion Engine
 * Renders all narrative scenes with authentic Bengali vector art,
 * responsive multi-aspect layouts, directional speech bubbles, and kinetic karaoke typography.
 */

import {
  drawHero,
  drawFather,
  drawSister,
  drawSuspenseSilhouette,
  drawSupportingCharacter
} from './characters.js';

import {
  drawDormRoom,
  drawBankOffice,
  drawLunchTable,
  drawVillageHome,
  drawSplitScreenCall,
  drawSuspenseOutro,
  drawVignette,
  drawHabitsBarrierStage,
  drawTeaStallStage,
  drawInvestmentStage,
  drawCroreMilestoneStage,
  drawDisciplineStage,
  drawFinancialFreedomStage,
  drawDesertTownSunset,
  drawEnvironment
} from './environments.js';

import { getSceneAtTime, getCurrentSubtitle } from './story_ai.js';

const TAU = Math.PI * 2;

// Snappy Easing Functions
function easeOutBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function cl(x) {
  return Math.max(0, Math.min(1, x));
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
  const bw = Math.min(400, textMetrics.width + padX * 2);
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
  ctx.lineTo(tailX - 20, tailY + 15);
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
  const fontSize = isPortrait ? 20 : 18;
  ctx.font = `700 ${fontSize}px "Noto Sans Bengali", sans-serif`;
  const tm = ctx.measureText(text);
  const pw = tm.width + (isPortrait ? 42 : 36);
  const ph = isPortrait ? 46 : 40;

  ctx.fillStyle = bgColor;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.roundRect(cx - pw / 2, cy - ph / 2, pw, ph, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, cx, cy);
  ctx.restore();
}

// Dynamic Kinetic Karaoke Subtitles with Translucent Frosted-Glass Pill Container
export function drawKineticSubtitle(ctx, W, H, subtitleObj, t) {
  if (!subtitleObj || !subtitleObj.text) return;

  ctx.save();
  const isPortrait = W < H;
  const fullText = subtitleObj.text;
  const highlightWord = subtitleObj.highlight_word || '';

  const fontSize = isPortrait ? 24 : 22;
  ctx.font = `700 ${fontSize}px "Noto Sans Bengali", sans-serif`;
  ctx.textBaseline = 'middle';

  const maxW = W - (isPortrait ? 64 : 120);
  const words = fullText.split(' ');

  // Split into lines if needed
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

  // Calculate maximum line width for box sizing
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

  // 1. Frosted Glass Translucent Backdrop Pill (ব্যবহারকারীর অনুরোধে সুন্দর ট্রান্সপারেন্ট গ্লাসি ব্যাকগ্রাউন্ড)
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 4;

  // Dark Glassy Gradient Fill
  const bgGrad = ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxH);
  bgGrad.addColorStop(0.0, 'rgba(15, 23, 42, 0.85)'); // Slate-900 with 85% opacity
  bgGrad.addColorStop(1.0, 'rgba(2, 6, 23, 0.90)');
  ctx.fillStyle = bgGrad;

  // Soft Glowing Border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.lineWidth = 1.8;

  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, [16, 16, 16, 16]);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Subtle interior glass highlight line along the top of the pill
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
        // Golden Karaoke Glow and smooth energetic bounce (+8%)
        const bounce = Math.sin(t * 8.0) * 1.8;
        ctx.fillStyle = '#facc15'; // Vibrant bright gold
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 14;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4.2;
        ctx.strokeText(w, curX, lineY - bounce);
        ctx.fillText(w, curX, lineY - bounce);
      } else {
        // Clean crisp pure white with subtle shadow
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
  const charScale = isPortrait ? 1.25 : 0.85;
  const charY = isPortrait ? H * 0.70 : H * 0.80;
  const pillY = isPortrait ? 65 : 44;
  const badgeY = isPortrait ? 130 : 94;

  // -----------------------------------------------------------
  // SCENE 1: 0.0s - 5.8s (প্রতিদিনের অভ্যাস • কোটিপতি হওয়ার বাধা)
  // -----------------------------------------------------------
  if (scene.id === 1) {
    if (scene.setting === 'desert_town_sunset' || scene.setting === 'desert_sunset' || scene.setting === 'arabian_bazaar' || scene.setting === 'ancient_town') {
      drawDesertTownSunset(ctx, W, H, t);
    } else {
      drawHabitsBarrierStage(ctx, W, H, t);
    }

    // Hero in realistic modern 2D explainer pose (navy suit, emerald tie, coffee cup, gesturing)
    drawHero(ctx, W * 0.5, charY, charScale, t, {
      attire: 'corporate',
      armAction: 'coffee_cup',
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
    ctx.fillText('?', W * (isPortrait ? 0.64 : 0.58), charY - 240 * charScale + qFloat);
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
    drawTeaStallStage(ctx, W, H, t);

    const isHeroSpeaking = (local >= 8.2); // "এতে কী আর এমন যায় আসে?" at 14.0s
    const heroArmAction = (local < 6.2) ? 'tea_cup' : (local < 8.2 ? 'hold_100_taka' : 'shrug');

    // Hero standing beside tea counter
    drawHero(ctx, W * (isPortrait ? 0.38 : 0.38), charY, charScale, t, {
      attire: 'student',
      armAction: heroArmAction,
      gaze: 'right',
      talking: isHeroSpeaking,
      emotion: isHeroSpeaking ? 'surprised' : 'neutral'
    });

    // Adda Colleague / Friend on the right
    drawSupportingCharacter(ctx, W * (isPortrait ? 0.74 : 0.68), charY, charScale * 0.95, t, {
      shirtColor: '#f97316',
      mustache: false
    });

    // Speech Bubble: "এতে কী আর এমন যায় আসে?"
    if (isHeroSpeaking) {
      const bubbleScale = easeOutBack(cl((local - 8.2) / 0.4));
      ctx.save();
      ctx.translate(W * (isPortrait ? 0.42 : 0.40), isPortrait ? H * 0.28 : H * 0.25);
      ctx.scale(bubbleScale, bubbleScale);
      drawSpeechBubble(ctx, 0, 0, 'এতে কী আর এমন যায় আসে?', {
        tailX: -18
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
    drawInvestmentStage(ctx, W, H, t);

    // Hero watching and pointing dynamically to the compounding chart
    drawHero(ctx, W * (isPortrait ? 0.28 : 0.18), charY, charScale, t, {
      attire: 'corporate',
      armAction: 'gesture_point',
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

    // Hero in Corporate Banker Suit triumphantly celebrating 1 Crore
    drawHero(ctx, W * 0.5, charY, charScale, t, {
      attire: 'corporate',
      armAction: 'victory_celebration',
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

    // Hero in Center with calm, disciplined, focused posture
    drawHero(ctx, W * 0.5, charY, charScale, t, {
      attire: 'student',
      armAction: 'normal',
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

    // Hero standing looking towards the dawn
    drawHero(ctx, W * (isPortrait ? 0.42 : 0.32), charY, charScale, t, {
      attire: 'corporate',
      armAction: 'normal',
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
