import re

with open('src/story.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Update imports
old_char_import = """import {
  drawHero,
  drawFather,
  drawSister,
  drawSuspenseSilhouette,
  drawSupportingCharacter
} from './characters.js';"""

new_char_import = """import {
  drawStoryteller,
  drawHero,
  drawMuslimStoryteller,
  drawYoungBoy,
  drawHijabFemale,
  drawFather,
  drawSister,
  drawSuspenseSilhouette,
  drawSupportingCharacter
} from './characters.js';"""

old_env_import = """import {
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
} from './environments.js';"""

new_env_import = """import {
  drawDormRoom,
  drawBankOffice,
  drawLunchTable,
  drawVillageHome,
  drawSplitScreenCall,
  drawSuspenseOutro,
  drawVignette,
  drawHabitsBarrierStage,
  drawSavingsStudyStage,
  drawTeaStallStage,
  drawInvestmentStage,
  drawInvestmentOfficeStage,
  drawCroreMilestoneStage,
  drawGrowthCityStage,
  drawDisciplineStage,
  drawFinancialFreedomStage,
  drawDesertTownSunset,
  drawEnvironment
} from './environments.js';"""

code = code.replace(old_char_import, new_char_import)
code = code.replace(old_env_import, new_env_import)

# Now replace renderStoryFrame scenes
old_frame_start = "export function renderStoryFrame(ctx, W, H, t) {"

new_frame_body = """export function renderStoryFrame(ctx, W, H, t) {
  const scene = getSceneAtTime(t);
  const local = t - scene.start;
  const isPortrait = W < H;

  // Responsive character scaling and baseline Y coordinates
  const charScale = isPortrait ? 1.05 : 0.88;
  const charY = isPortrait ? H * 0.76 : H * 0.84;
  const pillY = isPortrait ? 65 : 44;
  const badgeY = isPortrait ? 130 : 94;

  // -----------------------------------------------------------
  // SCENE 1: 0.0s - 5.8s (প্রতিদিনের অভ্যাস • কোটিপতি হওয়ার বাধা)
  // -----------------------------------------------------------
  if (scene.id === 1) {
    if (scene.setting === 'desert_town_sunset' || scene.setting === 'desert_sunset') {
      drawDesertTownSunset(ctx, W, H, t);
    } else {
      drawSavingsStudyStage(ctx, W, H, t);
    }

    // Muslim Storyteller in thoughtful posture (hand on chin, contemplating savings habits)
    drawStoryteller(ctx, W * (isPortrait ? 0.65 : 0.62), charY, charScale, t, {
      pose: 'think',
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
    ctx.fillText('?', W * (isPortrait ? 0.40 : 0.45), charY - 260 * charScale + qFloat);
    ctx.restore();

    // Location Pill & Floating Badge
    const pillScale = easeOutBack(cl(local / 0.45));
    ctx.save();
    ctx.translate(W / 2, pillY);
    ctx.scale(pillScale, pillScale);
    drawLocationPill(ctx, 0, 0, scene.location_tag, '#1e1b4b', '#facc15', isPortrait);
    ctx.restore();

    if (local > 2.0) {
      const badgeScale = easeOutBack(cl((local - 2.0) / 0.45));
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
    const heroPose = (local < 8.2) ? 'explain' : 'welcome';

    // Storyteller standing beside tea counter explaining daily expense
    drawStoryteller(ctx, W * (isPortrait ? 0.38 : 0.36), charY, charScale, t, {
      pose: heroPose,
      talking: isHeroSpeaking
    });

    // Adda Colleague / Friend on the right listening
    drawSupportingCharacter(ctx, W * (isPortrait ? 0.75 : 0.70), charY, charScale * 0.95, t, {
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
    drawInvestmentOfficeStage(ctx, W, H, t);

    // Storyteller pointing index finger dynamically to the compounding chart
    drawStoryteller(ctx, W * (isPortrait ? 0.32 : 0.28), charY, charScale, t, {
      pose: 'point',
      talking: false
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
    drawGrowthCityStage(ctx, W, H, t, { celebration: true });

    // Storyteller with fist raised triumphantly celebrating 1 Crore
    drawStoryteller(ctx, W * 0.5, charY, charScale * 1.06, t, {
      pose: 'victory',
      talking: false
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

    // Storyteller with hand on heart/chest with discipline and sincerity
    drawStoryteller(ctx, W * 0.5, charY, charScale, t, {
      pose: 'heart',
      talking: false
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
    drawGrowthCityStage(ctx, W, H, t, { sunrise: true });

    // Storyteller with welcoming hands looking towards the dawn
    drawStoryteller(ctx, W * (isPortrait ? 0.42 : 0.38), charY, charScale, t, {
      pose: 'welcome',
      talking: false
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
}"""

# Cut from old_frame_start to the end of file and replace with new_frame_body
frame_idx = code.find(old_frame_start)
if frame_idx != -1:
    code = code[:frame_idx] + new_frame_body

with open('src/story.js', 'w', encoding='utf-8') as f:
    f.write(code)

print('Updated src/story.js with cinematic choreography successfully')
