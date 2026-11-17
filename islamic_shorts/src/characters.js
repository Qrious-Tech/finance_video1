/**
 * Islamic Shorts — Character Library
 * Deen & Direction Production
 *
 * Characters:
 * - drawWoman(ctx, x, y, scale, pose, t) — Modest woman, mostly profile/back, dark earth tones
 * - drawDog(ctx, x, y, scale, pose, t)   — Medium thirsty dog, tan/sandy coat
 * - drawStoryteller(ctx, x, y, scale, pose, t) — Cream panjabi + kufi, male 35yo
 */

export function drawWoman(ctx, x, y, scale, pose, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Woman shown respectfully from BEHIND or profile (per SKILL.md guidelines)
  // Dark earth-tone clothing, hijab fully covering

  if (pose === 'walking' || pose === 'walking_away') {
    _drawWomanWalking(ctx, t, false);
  } else if (pose === 'watching') {
    _drawWomanWatching(ctx, t);
  } else if (pose === 'rescue_bend') {
    _drawWomanRescue(ctx, t);
  } else if (pose === 'standing_peaceful') {
    _drawWomanStanding(ctx, t);
  } else {
    _drawWomanStanding(ctx, t);
  }

  ctx.restore();
}

function _drawWomanWalking(ctx, t, faceFront) {
  // Rear view — modest, dignified
  const walk = Math.sin(t * 3.5) * 5;

  // Shadow
  ctx.save();
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.ellipse(0, 160, 55, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();

  // Long abaya (dark brown/earth tone)
  const abaGrad = ctx.createLinearGradient(-45, -150, 45, 160);
  abaGrad.addColorStop(0, '#3d2510');
  abaGrad.addColorStop(0.5, '#4a2e14');
  abaGrad.addColorStop(1, '#2a1a08');
  ctx.fillStyle = abaGrad;
  ctx.beginPath();
  ctx.moveTo(-10, -150);
  ctx.bezierCurveTo(-45, -100, -50, 0, -48, 160);
  ctx.lineTo(48, 160);
  ctx.bezierCurveTo(50, 0, 45, -100, 10, -150);
  ctx.closePath();
  ctx.fill();

  // Walking motion — slight fabric swing
  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = '#5a3a18';
  ctx.beginPath();
  ctx.moveTo(-40 + walk, 50);
  ctx.lineTo(-48, 160);
  ctx.lineTo(-20, 160);
  ctx.lineTo(-25 + walk, 50);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Hijab (dark olive/earth — rear view, covering head fully)
  const hijabGrad = ctx.createRadialGradient(0, -170, 0, 0, -170, 70);
  hijabGrad.addColorStop(0, '#5a4020');
  hijabGrad.addColorStop(1, '#3a2810');
  ctx.fillStyle = hijabGrad;
  ctx.beginPath();
  ctx.arc(0, -170, 50, 0, Math.PI * 2);
  ctx.fill();

  // Hijab drape over shoulders (rear)
  ctx.fillStyle = '#4a3018';
  ctx.beginPath();
  ctx.moveTo(-50, -170);
  ctx.bezierCurveTo(-60, -130, -55, -100, -48, -80);
  ctx.lineTo(-10, -150);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(50, -170);
  ctx.bezierCurveTo(60, -130, 55, -100, 48, -80);
  ctx.lineTo(10, -150);
  ctx.closePath();
  ctx.fill();

  // Simple feet showing from abaya
  ctx.fillStyle = '#8b6a40'; // leather sandal
  const footSwing = Math.sin(t * 3.5) * 10;
  ctx.beginPath();
  ctx.ellipse(-15 + footSwing, 162, 14, 6, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(15 - footSwing, 162, 14, 6, 0.2, 0, Math.PI * 2);
  ctx.fill();
}

function _drawWomanWatching(ctx, t) {
  // 3/4 rear profile — head turned slightly toward well
  _drawWomanWalking(ctx, t, false);

  // Add slight head turn
  ctx.save();
  ctx.translate(0, -170);
  ctx.rotate(-0.3);
  // Profile hint of face — just cheek/jaw in shadow
  ctx.fillStyle = '#5a3a1a';
  ctx.beginPath();
  ctx.arc(28, 0, 20, -0.5, 0.5);
  ctx.fill();
  ctx.restore();
}

function _drawWomanRescue(ctx, t) {
  // Bent-forward pose at well — removing shoe, reaching into well
  const reach = Math.sin(t * 2) * 4;

  // Shadow
  ctx.save();
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.ellipse(10, 165, 65, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();

  // Abaya — bent forward (shifted arc)
  const abaGrad = ctx.createLinearGradient(-45, -130, 45, 165);
  abaGrad.addColorStop(0, '#3d2510');
  abaGrad.addColorStop(1, '#2a1a08');
  ctx.fillStyle = abaGrad;
  ctx.save();
  ctx.rotate(0.25);
  ctx.beginPath();
  ctx.moveTo(-10, -140);
  ctx.bezierCurveTo(-50, -80, -55, 10, -50, 165);
  ctx.lineTo(50, 165);
  ctx.bezierCurveTo(55, 10, 50, -80, 10, -140);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Hijab
  ctx.fillStyle = '#4a3018';
  ctx.beginPath();
  ctx.arc(-10, -150, 50, 0, Math.PI * 2);
  ctx.fill();

  // Extended arm (reaching into well)
  ctx.fillStyle = '#5a3a18';
  ctx.save();
  ctx.rotate(0.3);
  ctx.fillRect(-10 + reach, -150, 12, 100);
  ctx.restore();

  // Shoe in hand (leather sandal)
  ctx.fillStyle = '#8b6a40';
  ctx.save();
  ctx.rotate(0.3);
  ctx.beginPath();
  ctx.ellipse(5 + reach, -55, 20, 8, 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function _drawWomanStanding(ctx, t) {
  // Standing, side profile, peaceful
  const breathe = Math.sin(t * 1.5) * 2;
  _drawWomanWalking(ctx, 0, false);
  // Slight golden rim light from divine scene
  ctx.save();
  ctx.globalAlpha = 0.15 + 0.05 * Math.sin(t * 1.2);
  ctx.fillStyle = '#ffe080';
  ctx.fillRect(-55, -230, 110, 400);
  ctx.globalAlpha = 1;
  ctx.restore();
}

// ═══════════════ DOG ═══════════════

export function drawDog(ctx, x, y, scale, pose, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  if (pose === 'panting_thirsty') {
    _drawDogPanting(ctx, t);
  } else if (pose === 'drinking') {
    _drawDogDrinking(ctx, t);
  } else if (pose === 'lying') {
    _drawDogLying(ctx, t);
  } else {
    _drawDogPanting(ctx, t);
  }

  ctx.restore();
}

function _drawDogBody(ctx, x, y, legState) {
  // Tan/sandy colored medium-sized dog
  const fur = '#c8903a';
  const shadow = '#a07028';
  const belly = '#d4a860';

  // Body
  const bodyGrad = ctx.createLinearGradient(x - 70, y - 50, x + 70, y + 20);
  bodyGrad.addColorStop(0, shadow);
  bodyGrad.addColorStop(0.4, fur);
  bodyGrad.addColorStop(1, belly);
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(x, y, 70, 42, 0, 0, Math.PI * 2);
  ctx.fill();

  // Neck
  ctx.fillStyle = fur;
  ctx.beginPath();
  ctx.ellipse(x + 55, y - 25, 28, 22, 0.4, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.fillStyle = fur;
  ctx.beginPath();
  ctx.ellipse(x + 90, y - 35, 32, 28, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Snout
  ctx.fillStyle = belly;
  ctx.beginPath();
  ctx.ellipse(x + 115, y - 28, 20, 14, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Nose (dark)
  ctx.fillStyle = '#3d2010';
  ctx.beginPath();
  ctx.ellipse(x + 128, y - 30, 7, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eye
  ctx.fillStyle = '#2a1808';
  ctx.beginPath();
  ctx.arc(x + 100, y - 42, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(x + 101, y - 43, 2, 0, Math.PI * 2);
  ctx.fill();

  // Ear (floppy)
  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.moveTo(x + 80, y - 55);
  ctx.bezierCurveTo(x + 68, y - 50, x + 65, y - 30, x + 72, y - 20);
  ctx.bezierCurveTo(x + 85, y - 25, x + 90, y - 42, x + 80, y - 55);
  ctx.fill();

  // Tail (curled up)
  ctx.strokeStyle = fur;
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x - 68, y - 20);
  ctx.bezierCurveTo(x - 90, y - 50, x - 80, y - 70, x - 65, y - 55);
  ctx.stroke();

  // Legs
  ctx.fillStyle = fur;
  if (legState === 'standing') {
    [[x+40,y+30],[x+10,y+32],[x-20,y+30],[x-50,y+28]].forEach(([lx,ly]) => {
      ctx.fillRect(lx - 8, ly, 16, 35);
      // Paws
      ctx.beginPath();
      ctx.ellipse(lx, ly + 35, 10, 7, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  } else if (legState === 'lying') {
    [[x+30,y+30],[x+5,y+32],[x-25,y+30],[x-50,y+28]].forEach(([lx,ly]) => {
      ctx.save();
      ctx.rotate(0.6);
      ctx.fillRect(lx - 8, ly, 16, 22);
      ctx.restore();
    });
  }
}

function _drawDogPanting(ctx, t) {
  // Thirsty dog — lying/crouched, tongue out, panting
  const pant = Math.sin(t * 6) * 3;

  // Shadow
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.ellipse(0, 60, 80, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();

  _drawDogBody(ctx, 0, 20, 'lying');

  // Panting tongue (drooping, red)
  ctx.fillStyle = '#c82030';
  ctx.beginPath();
  ctx.moveTo(115, -5);
  ctx.bezierCurveTo(108, 0 + pant, 112, 20 + pant, 115, 22 + pant);
  ctx.bezierCurveTo(122, 20 + pant, 125, 0 + pant, 115, -5);
  ctx.fill();
  // Tongue highlight
  ctx.fillStyle = '#e03040';
  ctx.beginPath();
  ctx.ellipse(115, 8 + pant, 4, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Panting breath particles
  ctx.save();
  ctx.globalAlpha = 0.2 + 0.2 * Math.sin(t * 6);
  ctx.fillStyle = 'rgba(200,200,255,0.6)';
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(130 + i * 12, -5 - i * 8, 4 - i * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}

function _drawDogDrinking(ctx, t) {
  // Dog drinking from shoe — relief expression
  _drawDogBody(ctx, 0, 10, 'standing');

  // Water drip from mouth
  ctx.save();
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = '#80c8f0';
  ctx.beginPath();
  ctx.ellipse(118, 10, 5, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();

  // Happy eye (closed/squinting)
  ctx.strokeStyle = '#2a1808';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(100, -25, 5, Math.PI + 0.3, -0.3);
  ctx.stroke();
}

function _drawDogLying(ctx, t) {
  // Exhausted dog lying flat
  ctx.save();
  ctx.scale(1, 0.75);
  _drawDogBody(ctx, 0, 30, 'lying');
  ctx.restore();

  // Labored breathing
  const breathe = Math.sin(t * 2.5) * 3;
  ctx.save();
  ctx.globalAlpha = 0.15 + 0.1 * Math.abs(Math.sin(t * 2.5));
  ctx.fillStyle = '#c0d8f0';
  ctx.beginPath();
  ctx.ellipse(80, -20 + breathe, 25, 15, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();
}

// ═══════════════ STORYTELLER ═══════════════

export function drawStoryteller(ctx, x, y, scale, pose, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  if (pose === 'speaking' || pose === 'explaining') {
    _drawStorytellerSpeaking(ctx, t);
  } else if (pose === 'gesture_point') {
    _drawStorytellerGesture(ctx, t);
  } else if (pose === 'humble') {
    _drawStorytellerHumble(ctx, t);
  } else {
    _drawStorytellerSpeaking(ctx, t);
  }

  ctx.restore();
}

function _drawStorytellerSpeaking(ctx, t) {
  const breathe = Math.sin(t * 1.5) * 2;

  // Shadow
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.ellipse(0, 320, 70, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();

  // Cream panjabi (long shirt)
  const panjabi = ctx.createLinearGradient(-55, -180, 55, 320);
  panjabi.addColorStop(0, '#f5f0e0');
  panjabi.addColorStop(0.5, '#ede5c5');
  panjabi.addColorStop(1, '#d4c89a');
  ctx.fillStyle = panjabi;
  ctx.beginPath();
  ctx.moveTo(-10, -180);
  ctx.bezierCurveTo(-55, -130, -60, 50, -55, 220);
  ctx.lineTo(55, 220);
  ctx.bezierCurveTo(60, 50, 55, -130, 10, -180);
  ctx.closePath();
  ctx.fill();

  // Panjabi collar embroidery
  ctx.strokeStyle = '#c8a040';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-8, -180);
  ctx.lineTo(0, -120);
  ctx.lineTo(8, -180);
  ctx.stroke();
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(-4 + i * 3, -175 + i * 15, 3, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Trousers (white/off-white)
  ctx.fillStyle = '#ece8d8';
  ctx.fillRect(-45, 220, 90, 100);

  // Sandals
  ctx.fillStyle = '#8b6030';
  ctx.beginPath();
  ctx.ellipse(-22, 325, 24, 8, -0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(22, 325, 24, 8, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Neck
  ctx.fillStyle = '#c8a070';
  ctx.fillRect(-12, -195, 24, 20);

  // Head
  const headGrad = ctx.createRadialGradient(5, -225, 0, 5, -225, 50);
  headGrad.addColorStop(0, '#d4a070');
  headGrad.addColorStop(1, '#b88050');
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.ellipse(0, -225, 46, 52, 0, 0, Math.PI * 2);
  ctx.fill();

  // Beard (short, natural)
  ctx.fillStyle = '#2a1a0a';
  ctx.beginPath();
  ctx.moveTo(-28, -210);
  ctx.bezierCurveTo(-35, -188, -25, -175, 0, -172);
  ctx.bezierCurveTo(25, -175, 35, -188, 28, -210);
  ctx.closePath();
  ctx.fill();

  // Mouth (speaking — open slightly)
  const mouthOpen = 2 + 3 * Math.abs(Math.sin(t * 3.5));
  ctx.fillStyle = '#5a2010';
  ctx.beginPath();
  ctx.ellipse(0, -204, 10, mouthOpen, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#c8b0a0';
  ctx.beginPath();
  ctx.rect(-8, -206, 16, 2);
  ctx.fill();

  // Nose
  ctx.fillStyle = '#c08060';
  ctx.beginPath();
  ctx.ellipse(0, -214, 7, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyes (warm, kind expression)
  [-16, 16].forEach((ex) => {
    ctx.fillStyle = '#3d2010';
    ctx.beginPath();
    ctx.arc(ex, -232, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1a0d08';
    ctx.beginPath();
    ctx.arc(ex, -232, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ex + 2, -234, 2, 0, Math.PI * 2);
    ctx.fill();
    // Eyebrow (natural)
    ctx.fillStyle = '#2a1a0a';
    ctx.beginPath();
    ctx.moveTo(ex - 9, -242);
    ctx.bezierCurveTo(ex - 5, -246, ex + 5, -246, ex + 9, -242);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#2a1a0a';
    ctx.stroke();
  });

  // Kufi (embroidered white cap)
  drawKufi(ctx, 0, -265, 48, t);

  // Gesturing right arm
  const armSway = Math.sin(t * 2.2) * 8;
  ctx.fillStyle = '#ede5c5';
  ctx.save();
  ctx.translate(55, -150);
  ctx.rotate(0.4 + armSway * 0.02);
  ctx.fillRect(-10, 0, 20, 100);
  // Hand
  ctx.fillStyle = '#c8a070';
  ctx.beginPath();
  ctx.ellipse(0, 100 + armSway, 16, 20, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Left arm (resting at side)
  ctx.fillStyle = '#ede5c5';
  ctx.fillRect(-65, -150, 20, 90);
  ctx.fillStyle = '#c8a070';
  ctx.beginPath();
  ctx.ellipse(-55, -55, 16, 18, -0.2, 0, Math.PI * 2);
  ctx.fill();
}

function _drawStorytellerGesture(ctx, t) {
  _drawStorytellerSpeaking(ctx, t);
  // Extra emphasis: right hand raised pointing upward
  ctx.save();
  ctx.translate(55, -150);
  ctx.rotate(-0.8 + Math.sin(t * 2) * 0.1);
  ctx.fillStyle = '#ede5c5';
  ctx.fillRect(-10, -60, 20, 60);
  ctx.fillStyle = '#c8a070';
  ctx.beginPath();
  ctx.ellipse(0, -65, 14, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  // Index finger pointing up
  ctx.fillStyle = '#c8a070';
  ctx.fillRect(-4, -88, 8, 25);
  ctx.restore();
}

function _drawStorytellerHumble(ctx, t) {
  _drawStorytellerSpeaking(ctx, t);
  // Both hands at chest (humble dua gesture)
  ctx.save();
  ctx.translate(0, -100);
  ctx.fillStyle = '#ede5c5';
  ctx.fillRect(-45, -50, 20, 70);
  ctx.fillRect(25, -50, 20, 70);
  ctx.fillStyle = '#c8a070';
  ctx.beginPath();
  ctx.ellipse(-35, 20, 18, 14, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(35, 20, 18, 14, 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawKufi(ctx, cx, cy, radius, t) {
  // White kufi cap with embroidery
  ctx.fillStyle = '#f5f0e8';
  ctx.beginPath();
  ctx.ellipse(cx, cy + radius * 0.3, radius, radius * 0.65, 0, Math.PI, 0);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx, cy + radius * 0.3, radius, radius * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();
  // Embroidery pattern (geometric, gold)
  ctx.strokeStyle = '#c8a040';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI;
    const x1 = cx + Math.cos(a) * radius * 0.7;
    const y1 = cy + radius * 0.3 - Math.sin(a) * radius * 0.5;
    ctx.beginPath();
    ctx.arc(x1, y1, 3, 0, Math.PI * 2);
    ctx.stroke();
  }
  // Band around base
  ctx.fillStyle = '#ede0c0';
  ctx.beginPath();
  ctx.ellipse(cx, cy + radius * 0.3, radius, radius * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#c8a040';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(cx, cy + radius * 0.3, radius, radius * 0.2, 0, 0, Math.PI * 2);
  ctx.stroke();
}
