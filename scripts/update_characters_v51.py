# -*- coding: utf-8 -*-
"""
Characters Engine Upgrade V5.1:
Fixes arm rotation angles, hand orientation (pointing along +Y), wrist watch styling,
and perfect joint pivots.
"""

characters_code = '''/**
 * Bengali Story Motion — Master 2D Character Rigging Engine V5.1
 * Pure Vector Hierarchy: Head, natural dark hair, realistic eyes, articulated arms,
 * rolled-up shirt sleeves with wrist watch, chinos, shoes, and anchored mouth visemes.
 * NO kufi, NO hat, NO religious costume, NO distortion.
 */

const TAU = Math.PI * 2;

function cl(x, min = 0, max = 1) {
  return Math.max(min, Math.min(max, x));
}

// ----------------------------------------------------------------------------
// 1. ANATOMICAL SUB-COMPONENTS
// ----------------------------------------------------------------------------

/**
 * Realistic Expressive Eyes with blinking cycle and gaze tracking.
 */
function drawRealisticEyes(ctx, leftX, rightX, eyeY, t, gaze = 'center', emotion = 'smile') {
  ctx.save();
  // Natural blink cycle: every ~3.2 seconds for 140ms
  const blinkCycle = t % 3.2;
  const isBlinking = blinkCycle < 0.14;

  let gazeOffsetX = 0;
  let gazeOffsetY = 0;
  if (gaze === 'left') gazeOffsetX = -2.2;
  else if (gaze === 'right') gazeOffsetX = 2.2;
  else if (gaze === 'up') gazeOffsetY = -1.8;
  else if (gaze === 'down') gazeOffsetY = 1.8;

  [leftX, rightX].forEach((ex, idx) => {
    ctx.save();
    ctx.translate(ex, eyeY);

    // Eyebrows (Realistic groomed natural arch)
    ctx.strokeStyle = '#1e1b18';
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    const browTilt = (idx === 0) ? -1 : 1;
    if (emotion === 'surprised') {
      ctx.moveTo(-7 * browTilt, -14);
      ctx.quadraticCurveTo(0, -17, 7 * browTilt, -13);
    } else if (emotion === 'neutral') {
      ctx.moveTo(-7 * browTilt, -10);
      ctx.quadraticCurveTo(0, -11, 7 * browTilt, -9);
    } else { // smile / confident
      ctx.moveTo(-7 * browTilt, -11);
      ctx.quadraticCurveTo(0, -13, 7 * browTilt, -10);
    }
    ctx.stroke();

    if (isBlinking) {
      // Natural closed eyelid crease
      ctx.strokeStyle = '#1e1b18';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0.2, Math.PI - 0.2);
      ctx.stroke();
    } else {
      // Sclera (White of the eye)
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#1e1b18';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.ellipse(0, 0, 7.5, 6.2, 0, 0, TAU);
      ctx.fill();
      ctx.stroke();

      // Clip iris within sclera
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(0, 0, 7.0, 5.8, 0, 0, TAU);
      ctx.clip();

      // Dark brown South Asian Iris
      ctx.fillStyle = '#3b2214';
      ctx.beginPath();
      ctx.arc(gazeOffsetX, gazeOffsetY, 4.0, 0, TAU);
      ctx.fill();

      // Deep Black Pupil
      ctx.fillStyle = '#0f0c08';
      ctx.beginPath();
      ctx.arc(gazeOffsetX, gazeOffsetY, 2.2, 0, TAU);
      ctx.fill();

      // White gloss catchlight (upper right)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.beginPath();
      ctx.arc(gazeOffsetX + 1.2, gazeOffsetY - 1.2, 1.2, 0, TAU);
      ctx.fill();

      ctx.restore(); // end clip

      // Subtle upper eyelid fold
      ctx.strokeStyle = '#7c523d';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, -2, 7.2, 3.4, 6.0);
      ctx.stroke();
    }

    ctx.restore();
  });

  ctx.restore();
}

/**
 * Anchored Mouth Viseme Engine: Keeps facial structure fixed while speaking.
 */
function drawAnchoredMouth(ctx, mouthY, isTalking, emotion, t) {
  ctx.save();
  ctx.translate(0, mouthY);

  if (!isTalking) {
    // Naturally closed mouth
    ctx.strokeStyle = '#5a2e1d';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    if (emotion === 'smile' || emotion === 'happy') {
      ctx.moveTo(-9, -1);
      ctx.quadraticCurveTo(0, 4.5, 9, -1);
    } else if (emotion === 'surprised') {
      ctx.ellipse(0, 0, 4.5, 6.0, 0, 0, TAU);
      ctx.fillStyle = '#7f1d1d';
      ctx.fill();
    } else {
      ctx.moveTo(-8, 0);
      ctx.lineTo(8, 0);
    }
    ctx.stroke();
  } else {
    // Active Spoken Dialogue Viseme
    const speechCycle = Math.sin(t * 12.0);
    const openAmount = Math.abs(speechCycle) * 5.0 + 2.0;
    const mouthW = 9.0 + Math.cos(t * 8.0) * 1.5;

    ctx.fillStyle = '#7f1d1d';
    ctx.strokeStyle = '#1e1b18';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.ellipse(0, 0, mouthW, openAmount, 0, 0, TAU);
    ctx.fill();
    ctx.stroke();

    // Clean white teeth bar inside
    if (openAmount > 3.0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-mouthW * 0.6, -openAmount + 1, mouthW * 1.2, Math.min(3.0, openAmount * 0.6));
    }
  }

  ctx.restore();
}

/**
 * Articulated Hand Component with anatomical fingers extending along +Y (away from wrist).
 */
function drawArticulatedHand(ctx, x, y, scale = 1.0, pose = 'open', skinTone = '#dfa58a') {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.fillStyle = skinTone;
  ctx.strokeStyle = '#1e1b18';
  ctx.lineWidth = 1.8;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  if (pose === 'open' || pose === 'explain') {
    // Palm from wrist (0) down to 12
    ctx.beginPath();
    ctx.roundRect(-6.5, 0, 13, 12, 3);
    ctx.fill(); ctx.stroke();

    // Thumb on side
    ctx.beginPath();
    ctx.roundRect(-9.5, 2, 4.5, 8, 2);
    ctx.fill(); ctx.stroke();

    // 4 fingers extending downward from 12 to 19
    [-3.5, -1.0, 1.5, 4.0].forEach((fx, idx) => {
      const fLen = (idx === 1 || idx === 2) ? 8.0 : 6.5;
      ctx.beginPath();
      ctx.moveTo(fx, 12);
      ctx.lineTo(fx, 12 + fLen);
      ctx.stroke();
    });
  } else if (pose === 'point') {
    // Palm
    ctx.beginPath();
    ctx.roundRect(-6, 0, 12, 11, 3);
    ctx.fill(); ctx.stroke();

    // Index finger extending forward/downward
    ctx.beginPath();
    ctx.roundRect(-1.5, 11, 4.5, 12, 2);
    ctx.fill(); ctx.stroke();

    // Curled thumb
    ctx.beginPath();
    ctx.arc(-5.5, 4, 3.2, 0, TAU);
    ctx.fill(); ctx.stroke();
  } else if (pose === 'hold_glass') {
    // Hand gripping tea glass
    ctx.beginPath();
    ctx.roundRect(-7, -4, 14, 14, 3);
    ctx.fill(); ctx.stroke();

    for (let f = 0; f < 3; f++) {
      ctx.beginPath();
      ctx.roundRect(-5, -2 + f * 4.5, 12, 3.8, 1.8);
      ctx.fill(); ctx.stroke();
    }
  } else if (pose === 'hold_note') {
    // Hand holding currency note
    ctx.beginPath();
    ctx.roundRect(-6, 0, 12, 12, 3);
    ctx.fill(); ctx.stroke();

    // Crisp Green ৳১০০ Note extending outward
    ctx.save();
    ctx.fillStyle = '#22c55e';
    ctx.strokeStyle = '#15803d';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(4, -4, 32, 18, 2);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#166534';
    ctx.font = '700 8.5px "Noto Sans Bengali", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('৳১০০', 20, 5);
    ctx.restore();

    // Thumb over bill
    ctx.beginPath();
    ctx.roundRect(0, 2, 6, 7, 2);
    ctx.fill(); ctx.stroke();
  } else if (pose === 'fist' || pose === 'victory') {
    // Clenched fist
    ctx.beginPath();
    ctx.roundRect(-7, 0, 14, 12, 4);
    ctx.fill(); ctx.stroke();

    for (let f = 0; f < 3; f++) {
      ctx.beginPath();
      ctx.moveTo(-4 + f * 3.5, 3);
      ctx.lineTo(-4 + f * 3.5, 10);
      ctx.stroke();
    }
  } else {
    // Relaxed resting hand
    ctx.beginPath();
    ctx.roundRect(-6.5, 0, 13, 12, 3);
    ctx.fill(); ctx.stroke();
    [-3.5, -1.0, 1.5, 4.0].forEach((fx) => {
      ctx.beginPath();
      ctx.moveTo(fx, 12);
      ctx.lineTo(fx, 18);
      ctx.stroke();
    });
  }

  ctx.restore();
}

// ----------------------------------------------------------------------------
// 2. MASTER CHARACTER: RAFIQ (রাফিক — ২৭-৩৫ বছর বয়সী বাংলাদেশি তরুণ)
// ----------------------------------------------------------------------------

export function drawMainCharacter(ctx, x, y, scale = 1.0, t = 0, opts = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Normalize incoming action / pose options
  let pose = opts.pose || opts.armAction || opts.character_action || 'standing';
  if (pose === 'coffee_cup' || pose === 'tea_cup' || pose === 'tea_adda') pose = 'drink_tea';
  if (pose === 'hold_100_taka' || pose === 'pay_100') pose = 'pay_cash';
  if (pose === 'gesture_point' || pose === 'invest_chart') pose = 'point_chart';
  if (pose === 'victory_celebration' || pose === 'crore_victory') pose = 'celebrate';
  if (pose === 'contemplate') pose = 'walk';
  if (pose === 'freedom_hero') pose = 'standing';

  const posture = opts.posture || 'standing';
  const isTalking = Boolean(opts.talking);
  const emotion = opts.emotion || 'smile';
  const gaze = opts.gaze || 'center';

  // Natural South Asian Palette
  const skinTone = '#dfa58a';
  const skinShadow = '#c98569';
  const hairDark = '#1c1917';
  const hairSheen = '#292524';
  const shirtColor = opts.shirtColor || '#38bdf8'; // Sky blue casual button-down
  const shirtShadow = '#0284c7';
  const trouserColor = opts.trouserColor || '#1e293b'; // Charcoal chinos
  const shoeColor = '#3b1c0b'; // Leather oxford/sneakers

  // Subtle natural breathing and idle sway
  const breathe = Math.sin(t * 2.4) * 2.0;
  const idleSway = (pose === 'walk') ? Math.sin(t * 5.5) * 2.5 : Math.sin(t * 1.2) * 1.0;

  // Ground Shadow
  ctx.save();
  ctx.scale(1, 0.22);
  ctx.beginPath();
  ctx.arc(0, 15, posture === 'sitting' ? 55 : 48, 0, TAU);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
  ctx.fill();
  ctx.restore();

  // ---------------------------------------------------------
  // A. LEGS & LOWER BODY
  // ---------------------------------------------------------
  const hipY = -150;
  const legLen = 145;
  const legW = 18;

  if (posture === 'sitting') {
    // SITTING POSE
    const seatY = hipY + 45;
    const thighLen = 65;
    const shinLen = 100;

    // Wooden Stool
    ctx.save();
    ctx.fillStyle = '#78350f';
    ctx.strokeStyle = '#1e1b18';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(-30, seatY, 60, 12, 3);
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-22, seatY + 12); ctx.lineTo(-26, 0);
    ctx.moveTo(22, seatY + 12); ctx.lineTo(26, 0);
    ctx.stroke();
    ctx.restore();

    [-14, 14].forEach(lx => {
      ctx.fillStyle = trouserColor;
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.roundRect(lx - legW / 2, seatY - 6, legW, thighLen, 4);
      ctx.fill(); ctx.stroke();

      const kneeX = lx;
      const kneeY = seatY + thighLen - 8;
      ctx.beginPath();
      ctx.roundRect(kneeX - legW / 2, kneeY, legW, shinLen - 40, 4);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = shoeColor;
      ctx.strokeStyle = '#1e1b18';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.roundRect(kneeX - 10, kneeY + shinLen - 46, 26, 12, [4, 4, 2, 2]);
      ctx.fill(); ctx.stroke();
    });
  } else if (pose === 'walk') {
    // WALKING POSE: Dynamic alternating stride
    const walkPhase = Math.sin(t * 5.5);
    const leftAngle = walkPhase * 0.38;
    const rightAngle = -walkPhase * 0.38;

    // Left Leg
    ctx.save();
    ctx.translate(-14, hipY + 10);
    ctx.rotate(leftAngle);
    ctx.fillStyle = trouserColor;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.roundRect(-legW / 2, 0, legW, legLen, [0, 0, 4, 4]);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = shoeColor;
    ctx.strokeStyle = '#1e1b18';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.roundRect(-10, legLen - 6, 28, 12, [4, 4, 2, 2]);
    ctx.fill(); ctx.stroke();
    ctx.restore();

    // Right Leg
    ctx.save();
    ctx.translate(14, hipY + 10);
    ctx.rotate(rightAngle);
    ctx.fillStyle = trouserColor;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.roundRect(-legW / 2, 0, legW, legLen, [0, 0, 4, 4]);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = shoeColor;
    ctx.strokeStyle = '#1e1b18';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.roundRect(-10, legLen - 6, 28, 12, [4, 4, 2, 2]);
    ctx.fill(); ctx.stroke();
    ctx.restore();
  } else {
    // NATURAL STANDING POSE
    [-15, 15].forEach(lx => {
      ctx.fillStyle = trouserColor;
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.roundRect(lx - legW / 2, hipY + 12, legW, legLen - 12, [0, 0, 4, 4]);
      ctx.fill(); ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.10)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(lx, hipY + 20);
      ctx.lineTo(lx, hipY + legLen - 12);
      ctx.stroke();

      ctx.fillStyle = shoeColor;
      ctx.strokeStyle = '#1e1b18';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.roundRect(lx - 10, hipY + legLen - 6, 26, 12, [4, 4, 2, 2]);
      ctx.fill(); ctx.stroke();
    });
  }

  // ---------------------------------------------------------
  // B. TORSO & CASUAL BUTTON-UP SHIRT
  // ---------------------------------------------------------
  const torsoH = 92;
  const torsoY = (posture === 'sitting' ? hipY + 45 : hipY) - torsoH + 15 + breathe;
  const shoulderW = 68;
  const waistW = 54;

  ctx.save();
  ctx.translate(idleSway, 0);

  // Shirt Body
  ctx.fillStyle = shirtColor;
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(-shoulderW / 2, torsoY);
  ctx.lineTo(shoulderW / 2, torsoY);
  ctx.lineTo(waistW / 2, torsoY + torsoH);
  ctx.lineTo(-waistW / 2, torsoY + torsoH);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Dark Belt
  ctx.fillStyle = '#451a03';
  ctx.strokeStyle = '#1e1b18';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.roundRect(-waistW / 2, torsoY + torsoH - 8, waistW, 8, 2);
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(-5, torsoY + torsoH - 8, 10, 8);

  // Vertical Placket & Buttons
  ctx.strokeStyle = shirtShadow;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(0, torsoY + 12);
  ctx.lineTo(0, torsoY + torsoH - 8);
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  [torsoY + 22, torsoY + 42, torsoY + 62].forEach(by => {
    ctx.beginPath();
    ctx.arc(0, by, 2.0, 0, TAU);
    ctx.fill();
  });

  // Chest Pocket
  ctx.strokeStyle = shirtShadow;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.roundRect(-shoulderW / 2 + 10, torsoY + 22, 16, 18, [0, 0, 3, 3]);
  ctx.stroke();

  // ---------------------------------------------------------
  // C. NECK & HEAD
  // ---------------------------------------------------------
  // Neck
  ctx.fillStyle = skinTone;
  ctx.strokeStyle = '#1e1b18';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.roundRect(-8, torsoY - 14, 16, 18, 2);
  ctx.fill(); ctx.stroke();

  // Shirt Collar
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-16, torsoY + 4); ctx.lineTo(0, torsoY + 14); ctx.lineTo(-6, torsoY - 8);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(16, torsoY + 4); ctx.lineTo(0, torsoY + 14); ctx.lineTo(6, torsoY - 8);
  ctx.closePath(); ctx.fill(); ctx.stroke();

  // Head Dimensions
  const headW = 54;
  const headH = 68;
  const headY = torsoY - 48;

  // Ears
  [-headW / 2 - 2, headW / 2 + 2].forEach(ex => {
    ctx.fillStyle = skinTone;
    ctx.strokeStyle = '#1e1b18';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(ex, headY + 4, 8, 0, TAU);
    ctx.fill(); ctx.stroke();
  });

  // Face Base
  ctx.fillStyle = skinTone;
  ctx.strokeStyle = '#1e1b18';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.ellipse(0, headY, headW / 2, headH / 2, 0, 0, TAU);
  ctx.fill(); ctx.stroke();

  // Light groomed stubble shadow on jawline
  ctx.save();
  ctx.fillStyle = 'rgba(30, 27, 24, 0.08)';
  ctx.beginPath();
  ctx.arc(0, headY + 12, headW / 2 - 2, 0.2, Math.PI - 0.2);
  ctx.fill();
  ctx.restore();

  // Natural Dark Hair (Authentic South Asian hairstyle, no hat)
  ctx.save();
  ctx.fillStyle = hairDark;
  ctx.strokeStyle = '#0f0c08';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(-headW / 2 - 2, headY - 4);
  ctx.quadraticCurveTo(-headW / 2 - 4, headY - 28, -headW * 0.25, headY - 38);
  ctx.quadraticCurveTo(0, headY - 42, headW * 0.35, headY - 36);
  ctx.quadraticCurveTo(headW / 2 + 4, headY - 26, headW / 2 + 2, headY - 4);
  ctx.quadraticCurveTo(headW * 0.25, headY - 14, 0, headY - 20);
  ctx.quadraticCurveTo(-headW * 0.35, headY - 22, -headW / 2 - 2, headY - 4);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Sheen
  ctx.strokeStyle = hairSheen;
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.arc(headW * 0.1, headY - 32, 14, -0.6, 0.8);
  ctx.stroke();
  ctx.restore();

  // Nose contour
  ctx.strokeStyle = skinShadow;
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(0, headY - 6); ctx.lineTo(2.5, headY + 4); ctx.lineTo(-2.0, headY + 6);
  ctx.stroke();

  // Eyes and Anchored Mouth
  drawRealisticEyes(ctx, -14, 14, headY - 2, t, gaze, emotion);
  drawAnchoredMouth(ctx, headY + 18, isTalking, emotion, t);

  // ---------------------------------------------------------
  // D. ARTICULATED ARMS (NATURAL PROPORTIONS & PIVOTS)
  // ---------------------------------------------------------
  const lShoulderX = -shoulderW / 2 + 4;
  const rShoulderX = shoulderW / 2 - 4;
  const shoulderY = torsoY + 6;

  // Helper: Draw articulated arm with sleeve, forearm, wrist watch, and hand
  function drawArticulatedArm(shoulderX, isLeft, armAngle1, armAngle2, handPose = 'open') {
    ctx.save();
    ctx.translate(shoulderX, shoulderY);
    ctx.rotate(armAngle1);

    // 1. Upper Arm (36px long)
    ctx.strokeStyle = shirtColor;
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 36);
    ctx.stroke();

    // Rolled-up cuff fold
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = shirtShadow;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.roundRect(-8, 30, 16, 7, 2);
    ctx.fill(); ctx.stroke();

    // 2. Forearm (34px long)
    ctx.translate(0, 36);
    ctx.rotate(armAngle2);

    ctx.strokeStyle = skinTone;
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 32);
    ctx.stroke();

    // Wrist Watch on Left Wrist
    if (isLeft) {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-6, 22, 12, 5);
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(0, 24.5, 2.5, 0, TAU);
      ctx.fill();
    }

    // 3. Articulated Hand at Wrist (32px down from elbow)
    drawArticulatedHand(ctx, 0, 32, 1.0, handPose, skinTone);

    ctx.restore();
  }

  if (pose === 'drink_tea') {
    // Left arm resting naturally
    drawArticulatedArm(lShoulderX, true, 0.06, 0.06, 'open');

    // Right arm raised holding tea cup
    ctx.save();
    ctx.translate(rShoulderX, shoulderY);
    ctx.rotate(-0.45);

    ctx.strokeStyle = shirtColor; ctx.lineWidth = 15;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 34); ctx.stroke();

    ctx.translate(0, 34);
    ctx.rotate(-1.65);
    ctx.strokeStyle = skinTone; ctx.lineWidth = 12;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 32); ctx.stroke();

    // Hand holding glass
    drawArticulatedHand(ctx, 0, 30, 1.0, 'hold_glass', skinTone);

    // Hot Milk Tea Glass with Rising Steam
    const cupX = 2;
    const cupY = 28;
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.70)';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(cupX - 7, cupY - 14);
    ctx.lineTo(cupX + 7, cupY - 14);
    ctx.lineTo(cupX + 5, cupY + 6);
    ctx.lineTo(cupX - 5, cupY + 6);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Tea inside
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.moveTo(cupX - 6, cupY - 8);
    ctx.lineTo(cupX + 6, cupY - 8);
    ctx.lineTo(cupX + 4.5, cupY + 5);
    ctx.lineTo(cupX - 4.5, cupY + 5);
    ctx.closePath();
    ctx.fill();

    // Rising steam
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.75)';
    ctx.lineWidth = 1.6;
    for (let s = 0; s < 2; s++) {
      const sy = cupY - 16 - ((t * 22 + s * 14) % 26);
      const sx = cupX + Math.sin(t * 3 + s) * 3;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.quadraticCurveTo(sx + 3, sy - 5, sx, sy - 10);
      ctx.stroke();
    }
    ctx.restore();

    ctx.restore();
  } else if (pose === 'pay_cash') {
    // Left arm resting
    drawArticulatedArm(lShoulderX, true, 0.06, 0.06, 'open');

    // Right arm extending forward with crisp ৳100 note
    drawArticulatedArm(rShoulderX, false, -0.65, -0.45, 'hold_note');
  } else if (pose === 'point_chart') {
    // Left arm explaining
    drawArticulatedArm(lShoulderX, true, 0.25, 0.10, 'explain');

    // Right arm pointing high towards compounding peak
    drawArticulatedArm(rShoulderX, false, -1.65, -0.45, 'point');
  } else if (pose === 'celebrate') {
    // Both arms raised triumphantly in V-shape!
    // Left arm up-left: positive angle rotates clockwise from +Y to up-left
    drawArticulatedArm(lShoulderX, true, 2.45, -0.15, 'victory');
    // Right arm up-right: negative angle rotates counter-clockwise from +Y to up-right
    drawArticulatedArm(rShoulderX, false, -2.45, 0.15, 'victory');
  } else if (pose === 'discipline') {
    // Left arm resting
    drawArticulatedArm(lShoulderX, true, 0.06, 0.06, 'open');

    // Right arm hand on heart / chest
    drawArticulatedArm(rShoulderX, false, 0.20, -1.75, 'open');
  } else if (pose === 'walk') {
    // Dynamic walking arm swing
    const armSwing = Math.sin(t * 5.5) * 0.40;
    drawArticulatedArm(lShoulderX, true, -armSwing, 0.15, 'open');
    drawArticulatedArm(rShoulderX, false, armSwing, 0.15, 'open');
  } else {
    // Natural standing arms
    drawArticulatedArm(lShoulderX, true, 0.06, 0.06, 'open');
    drawArticulatedArm(rShoulderX, false, -0.06, -0.06, 'open');
  }

  ctx.restore(); // end sway
  ctx.restore(); // end root transform
}

// ----------------------------------------------------------------------------
// 3. SECONDARY CHARACTER: TEA STALL VENDOR (চায়ের মামু)
// ----------------------------------------------------------------------------

export function drawTeaVendor(ctx, x, y, scale = 1.0, t = 0, opts = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const skinTone = '#c98569';
  const skinShadow = '#a8654c';
  const shirtColor = '#f59e0b'; // Amber cotton shirt
  const towelColor = '#dc2626'; // Red checked gamcha

  const breathe = Math.sin(t * 2.2) * 1.5;
  ctx.translate(0, breathe);

  // Torso / Apron
  const torsoY = -120;
  ctx.fillStyle = shirtColor;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.roundRect(-24, torsoY, 48, 68, 4);
  ctx.fill(); ctx.stroke();

  // White apron over shirt
  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.roundRect(-18, torsoY + 12, 36, 56, 3);
  ctx.fill(); ctx.stroke();

  // Red Gamcha (Towel) draped over right shoulder
  ctx.fillStyle = towelColor;
  ctx.strokeStyle = '#991b1b';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.roundRect(8, torsoY - 4, 14, 46, 3);
  ctx.fill(); ctx.stroke();

  // Head
  const headY = torsoY - 26;
  ctx.fillStyle = skinTone;
  ctx.strokeStyle = '#1e1b18';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.ellipse(0, headY, 20, 24, 0, 0, TAU);
  ctx.fill(); ctx.stroke();

  // Vendor Mustache (ক্লাসিক খাঁটি মামুর গোঁফ)
  ctx.fillStyle = '#1c1917';
  ctx.beginPath();
  ctx.moveTo(-12, headY + 8);
  ctx.quadraticCurveTo(0, headY + 3, 12, headY + 8);
  ctx.quadraticCurveTo(0, headY + 13, -12, headY + 8);
  ctx.fill();

  // Friendly Vendor Eyes
  [-7, 7].forEach(ex => {
    ctx.strokeStyle = '#1e1b18';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(ex, headY - 1, 4.2, 0.2, Math.PI - 0.2);
    ctx.stroke();
  });

  // Short cropped dark hair
  ctx.fillStyle = '#1c1917';
  ctx.beginPath();
  ctx.arc(0, headY - 12, 19, Math.PI, 0);
  ctx.fill();

  // Arms resting on counter
  ctx.strokeStyle = skinTone;
  ctx.lineWidth = 9;
  ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-22, torsoY + 10); ctx.lineTo(-32, torsoY + 38); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(22, torsoY + 10); ctx.lineTo(34, torsoY + 36); ctx.stroke();

  ctx.restore();
}

// Aliases for compatibility
export const drawHero = drawMainCharacter;
export const drawStoryteller = drawMainCharacter;
export const drawSupportingCharacter = drawTeaVendor;
export const drawFather = drawMainCharacter;
export const drawSister = drawMainCharacter;
export const drawSuspenseSilhouette = drawMainCharacter;
'''

with open('src/characters.js', 'w', encoding='utf-8') as f:
    f.write(characters_code)
print("✓ Updated src/characters.js V5.1 successfully")
