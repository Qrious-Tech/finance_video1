/**
 * Bengali Story Motion — 2D Vector Character Rigging Engine
 * Implements the authentic Bengali storytelling vector character aesthetics
 * with expressive droopy eyelids, lip-sync visemes, and Bengali cultural attire.
 */

const TAU = Math.PI * 2;

// Shared Helper: Draw Droopy Eyelids and Eyes
function drawExpressiveEyes(ctx, leftX, rightX, eyeY, t, gaze = 'center', droop = 0.5) {
  const blink = (t % 3.4 > 3.25) ? 1.0 : 0.0;
  const gazeOffsetX = gaze === 'left' ? -2.2 : (gaze === 'right' ? 2.2 : 0);
  const gazeOffsetY = gaze === 'down' ? 1.5 : (gaze === 'up' ? -1.5 : 0);

  [leftX, rightX].forEach(ex => {
    ctx.save();
    ctx.translate(ex, eyeY);

    if (blink > 0.5) {
      // Closed blinking eyelid slit
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(-11, 0);
      ctx.quadraticCurveTo(0, 3, 11, 0);
      ctx.stroke();
      ctx.restore();
      return;
    }

    // Eyeball base (White)
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(0, 0, 11, 0, TAU);
    ctx.fill();
    ctx.stroke();

    // Pupil with Catchlight
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(gazeOffsetX, gazeOffsetY, 4.2, 0, TAU);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(gazeOffsetX - 1.5, gazeOffsetY - 1.5, 1.4, 0, TAU);
    ctx.fill();

    // Signature Droopy Bengali Eyelid (Sleepy / Thoughtful Hood)
    ctx.fillStyle = '#dfa58a';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(0, 0, 11, Math.PI, 0, false);
    const droopDepth = -11 + droop * 13;
    ctx.quadraticCurveTo(0, droopDepth, -11, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  });
}

// Shared Helper: Dynamic Talking Visemes vs. Closed Expressions
function drawCharacterMouth(ctx, mouthY, isTalking, emotion = 'neutral', t = 0) {
  ctx.save();
  ctx.translate(0, mouthY);

  if (!isTalking) {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    if (emotion === 'sad' || emotion === 'guilt') {
      ctx.arc(0, 5, 8, Math.PI + 0.4, -0.4);
    } else if (emotion === 'smile') {
      ctx.arc(0, -2, 7, 0.2, Math.PI - 0.2);
    } else {
      // Calm, straight thoughtful mouth
      ctx.moveTo(-7, 0);
      ctx.lineTo(7, 0);
    }
    ctx.stroke();
  } else {
    // Active Spoken Dialogue: Viseme Lip-Sync Cycle
    const speechOpen = Math.abs(Math.sin(t * 11.0)) * 5.5 + 2.0;
    const speechW = 8.0 + Math.cos(t * 7.0) * 2.0;

    ctx.fillStyle = '#7f1d1d';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.ellipse(0, 0, speechW, speechOpen, 0, 0, TAU);
    ctx.fill();
    ctx.stroke();

    // Teeth highlight inside open mouth
    if (speechOpen > 3.5) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-speechW * 0.6, -speechOpen + 1, speechW * 1.2, Math.min(2.8, speechOpen * 0.7));
    }
  }

  ctx.restore();
}

// -------------------------------------------------------------
// 0. CINEMATIC MUSLIM STORYTELLER CONTROLLER (REFERENCE RIG & HIGH-FIDELITY VECTOR SYSTEM)
// -------------------------------------------------------------
export function drawStoryteller(ctx, x, y, scale = 1.0, t = 0, opts = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const poseName = opts.pose || 'hero';
  const isTalking = Boolean(opts.talking);
  const breathe = Math.sin(t * 2.6) * 2.2;
  const sway = Math.sin(t * 1.3) * 1.0;

  const poseMap = {
    'hero': 'char_hero',
    'welcome': 'char_pose1',
    'point': 'char_pose2',
    'heart': 'char_pose3',
    'explain': 'char_pose4',
    'think': 'char_pose5',
    'victory': 'char_pose6',
    'boy': 'char_boy',
    'female': 'char_female'
  };

  const imgId = poseMap[poseName] || 'char_hero';
  let img = null;
  if (typeof document !== 'undefined') {
    const el = document.getElementById(imgId);
    if (el && el.complete && el.naturalWidth > 0) img = el;
  }

  if (img) {
    // Soft Ground Shadow
    ctx.save();
    ctx.scale(1, 0.22);
    ctx.beginPath();
    ctx.arc(0, 15, 65, 0, TAU);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
    ctx.fill();
    ctx.restore();

    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    const aspect = iw / ih;

    // Display height calibrated so character proportions look natural
    const targetH = (poseName === 'hero') ? 440 : 340;
    const dw = targetH * aspect;
    const dh = targetH;

    ctx.save();
    ctx.translate(sway, breathe - dh);
    ctx.drawImage(img, -dw / 2, 0, dw, dh);

    // Dynamic Talking Lip-Sync Anchor
    if (isTalking) {
      const speechOpen = Math.abs(Math.sin(t * 11.5)) * 4.2 + 1.2;
      const mouthY = dh * 0.40;
      ctx.save();
      ctx.fillStyle = '#7f1d1d';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.ellipse(0, mouthY, 6.5, speechOpen, 0, 0, TAU);
      ctx.fill();
      ctx.stroke();
      if (speechOpen > 2.8) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-3.5, mouthY - speechOpen + 1, 7, 2.0);
      }
      ctx.restore();
    }
    ctx.restore();
  } else {
    // Fallback to pure vector implementation
    drawMuslimStoryteller(ctx, 0, 0, 1.0, t, opts);
  }

  ctx.restore();
}

// -------------------------------------------------------------
// 5. MUSLIM MALE STORYTELLER (ক্রিম রঙের পাঞ্জাবি ও এমব্রয়ডারি করা কুফি/টুপি)
// -------------------------------------------------------------
export function drawMuslimStoryteller(ctx, x, y, scale = 1.0, t = 0, opts = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const isTalking = Boolean(opts.talking);
  const emotion = opts.emotion || 'smile';
  const gaze = opts.gaze || 'center';

  const skinTone = '#fcd3b0';
  const skinShadow = '#f0b892';
  const panjabiCream = '#fef3c7';
  const panjabiGold = '#d97706';
  const pyjamaWhite = '#f8fafc';
  const breathe = Math.sin(t * 2.4) * 1.5;

  ctx.translate(0, breathe);

  // Soft Ground Shadow
  ctx.save();
  ctx.scale(1, 0.22);
  ctx.beginPath();
  ctx.arc(0, 15, 42, 0, TAU);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
  ctx.fill();
  ctx.restore();

  // 1. Legs & White Pyjama
  const hipY = -140;
  const legLen = 136;
  const legW = 15;
  const legSpread = 16;

  [-legSpread, legSpread].forEach(lx => {
    ctx.fillStyle = pyjamaWhite;
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.roundRect(lx - legW / 2, hipY + 14, legW, legLen - 14, [0, 0, 3, 3]);
    ctx.fill();
    ctx.stroke();

    // Traditional Leather Peshawari / Kolhapuri Sandals
    const shoeY = hipY + legLen;
    ctx.save();
    ctx.translate(lx, shoeY);
    ctx.fillStyle = '#78350f';
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.roundRect(-9, -10, 20, 10, [4, 4, 2, 2]);
    ctx.fill(); ctx.stroke();
    ctx.restore();
  });

  // 2. Cream Panjabi Torso & Draping Hem
  const torsoH = 95;
  const torsoY = hipY - torsoH + 18;
  const shoulderW = 66;
  const waistW = 58;

  ctx.fillStyle = panjabiCream;
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-shoulderW / 2, torsoY);
  ctx.lineTo(shoulderW / 2, torsoY);
  ctx.lineTo(waistW / 2 + 4, torsoY + torsoH);
  ctx.lineTo(-waistW / 2 - 4, torsoY + torsoH);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Embroidered Mandarin Collar & Placket
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = panjabiGold;
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.roundRect(-10, torsoY - 8, 20, 12, 3);
  ctx.fill(); ctx.stroke();

  ctx.fillStyle = '#fef08a';
  ctx.fillRect(-4, torsoY + 4, 8, 48);
  ctx.strokeRect(-4, torsoY + 4, 8, 48);
  ctx.fillStyle = panjabiGold;
  [12, 24, 36].forEach(by => {
    ctx.beginPath();
    ctx.arc(0, torsoY + by, 2.0, 0, TAU);
    ctx.fill();
  });

  // 3. Neck & Head
  ctx.fillStyle = skinTone;
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.roundRect(-7, torsoY - 14, 14, 16, 2);
  ctx.fill(); ctx.stroke();

  const headW = 56;
  const headH = 68;
  const headCenterY = torsoY - 48;

  [-headW / 2 - 2, headW / 2 + 2].forEach(ex => {
    ctx.fillStyle = skinTone;
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 2.0;
    ctx.beginPath(); ctx.arc(ex, headCenterY + 2, 9, 0, TAU); ctx.fill(); ctx.stroke();
  });

  ctx.fillStyle = skinTone;
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.ellipse(0, headCenterY, headW / 2, headH / 2, 0, 0, TAU);
  ctx.fill(); ctx.stroke();

  // Embroidered White Kufi / Islamic Prayer Cap
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.arc(0, headCenterY - 10, headW / 2 + 2, Math.PI, 0, false);
  ctx.lineTo(headW / 2 + 2, headCenterY - 10);
  ctx.lineTo(-headW / 2 - 2, headCenterY - 10);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  ctx.strokeStyle = 'rgba(217, 119, 6, 0.5)';
  ctx.lineWidth = 1.2;
  for (let k = -18; k <= 18; k += 9) {
    ctx.beginPath();
    ctx.moveTo(k, headCenterY - 24);
    ctx.lineTo(k + 4, headCenterY - 18);
    ctx.lineTo(k, headCenterY - 12);
    ctx.lineTo(k - 4, headCenterY - 18);
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();

  // Groomed Short Beard & Mustache
  ctx.fillStyle = '#18181b';
  ctx.beginPath();
  ctx.roundRect(-12, headCenterY + 11, 24, 4.0, 2);
  ctx.arc(0, headCenterY + 22, 14, 0.2, Math.PI - 0.2, false);
  ctx.fill();

  drawExpressiveEyes(ctx, -11, 11, headCenterY - 4, t, gaze, 0.45);

  ctx.strokeStyle = skinShadow;
  ctx.lineWidth = 2.0;
  ctx.beginPath(); ctx.moveTo(0, headCenterY - 1); ctx.lineTo(2, headCenterY + 7); ctx.lineTo(-2, headCenterY + 9); ctx.stroke();

  drawCharacterMouth(ctx, headCenterY + 17, isTalking, emotion, t);

  // 4. Arms & Gestures
  ctx.strokeStyle = panjabiCream;
  ctx.lineWidth = 13;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(-shoulderW / 2 + 6, torsoY + 6);
  ctx.lineTo(-shoulderW / 2 - 12, torsoY + 40);
  ctx.lineTo(-20, torsoY + 34);
  ctx.stroke();
  ctx.fillStyle = skinTone;
  ctx.beginPath(); ctx.arc(-20, torsoY + 34, 7, 0, TAU); ctx.fill(); ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(shoulderW / 2 - 6, torsoY + 6);
  ctx.lineTo(shoulderW / 2 + 20, torsoY + 32);
  ctx.lineTo(shoulderW / 2 + 48, torsoY + 18);
  ctx.stroke();
  ctx.beginPath(); ctx.arc(shoulderW / 2 + 48, torsoY + 18, 7.5, 0, TAU); ctx.fill(); ctx.stroke();

  ctx.restore();
}

// -------------------------------------------------------------
// 6. YOUNGER BOY (টিল কুর্তা ও হালকা রঙের কুফি)
// -------------------------------------------------------------
export function drawYoungBoy(ctx, x, y, scale = 0.85, t = 0, opts = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const isTalking = Boolean(opts.talking);
  const emotion = opts.emotion || 'happy';
  const gaze = opts.gaze || 'center';

  const skinTone = '#fed7aa';
  const skinShadow = '#fbd1a2';
  const kurtaTeal = '#0d9488';
  const pyjamaBeige = '#fef3c7';

  const breathe = Math.sin(t * 2.8) * 1.4;
  ctx.translate(0, breathe);

  // Ground Shadow
  ctx.save();
  ctx.scale(1, 0.22);
  ctx.beginPath(); ctx.arc(0, 15, 36, 0, TAU);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.4)'; ctx.fill();
  ctx.restore();

  // Legs & Pyjama
  const hipY = -120;
  const legLen = 118;
  [-13, 13].forEach(lx => {
    ctx.fillStyle = pyjamaBeige;
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.8;
    ctx.fillRect(lx - 6, hipY + 10, 12, legLen - 10);
    ctx.strokeRect(lx - 6, hipY + 10, 12, legLen - 10);

    // Shoes
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(lx - 7, hipY + legLen, 16, 7);
  });

  // Teal Kurta
  const torsoH = 75;
  const torsoY = hipY - torsoH + 12;
  const shoulderW = 54;
  ctx.fillStyle = kurtaTeal;
  ctx.strokeStyle = '#0f766e';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.roundRect(-shoulderW / 2, torsoY, shoulderW, torsoH, 6);
  ctx.fill(); ctx.stroke();

  // White Mandarin Collar
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-8, torsoY - 4, 16, 8);
  ctx.strokeRect(-8, torsoY - 4, 16, 8);

  // Head
  const headW = 52;
  const headH = 58;
  const headCenterY = torsoY - 42;

  [-headW / 2 - 2, headW / 2 + 2].forEach(ex => {
    ctx.fillStyle = skinTone; ctx.strokeStyle = '#020617'; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.arc(ex, headCenterY + 2, 8, 0, TAU); ctx.fill(); ctx.stroke();
  });

  ctx.fillStyle = skinTone;
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 2.2;
  ctx.beginPath(); ctx.ellipse(0, headCenterY, headW / 2, headH / 2, 0, 0, TAU); ctx.fill(); ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.arc(0, headCenterY - 8, headW / 2 + 1, Math.PI, 0);
  ctx.fill(); ctx.stroke();

  drawExpressiveEyes(ctx, -10, 10, headCenterY - 2, t, gaze, 0.35);
  drawCharacterMouth(ctx, headCenterY + 16, isTalking, emotion, t);

  // Arms: Holding a coin / savings jar
  ctx.strokeStyle = kurtaTeal;
  ctx.lineWidth = 11;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-shoulderW / 2 + 4, torsoY + 6);
  ctx.lineTo(-shoulderW / 2 - 10, torsoY + 36);
  ctx.lineTo(-8, torsoY + 36);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(shoulderW / 2 - 4, torsoY + 6);
  ctx.lineTo(shoulderW / 2 + 10, torsoY + 36);
  ctx.lineTo(8, torsoY + 36);
  ctx.stroke();

  // Golden Coin in hands
  ctx.fillStyle = '#facc15';
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.arc(0, torsoY + 36, 9, 0, TAU); ctx.fill(); ctx.stroke();

  ctx.restore();
}

// -------------------------------------------------------------
// 7. FEMALE CHARACTER IN MODEST ROSE-COLORED HIJAB (গোলাপি হিজাব)
// -------------------------------------------------------------
export function drawHijabFemale(ctx, x, y, scale = 0.95, t = 0, opts = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const isTalking = Boolean(opts.talking);
  const emotion = opts.emotion || 'smile';
  const gaze = opts.gaze || 'center';

  const skinTone = '#fed7aa';
  const skinShadow = '#fbd1a2';
  const hijabRose = '#f43f5e';
  const dressMauve = '#be123c';

  const breathe = Math.sin(t * 2.3) * 1.4;
  ctx.translate(0, breathe);

  // Ground Shadow
  ctx.save();
  ctx.scale(1, 0.22);
  ctx.beginPath(); ctx.arc(0, 15, 40, 0, TAU);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.4)'; ctx.fill();
  ctx.restore();

  // Full-length modest Abaya / Dress
  const hipY = -135;
  const dressH = 135;
  ctx.fillStyle = dressMauve;
  ctx.strokeStyle = '#881337';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-22, hipY);
  ctx.lineTo(22, hipY);
  ctx.lineTo(36, hipY + dressH);
  ctx.lineTo(-36, hipY + dressH);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Torso
  const torsoH = 75;
  const torsoY = hipY - torsoH + 10;
  ctx.fillStyle = dressMauve;
  ctx.fillRect(-24, torsoY, 48, torsoH);

  // Head & Face
  const headW = 54;
  const headH = 64;
  const headCenterY = torsoY - 44;

  ctx.fillStyle = skinTone;
  ctx.beginPath(); ctx.ellipse(0, headCenterY, headW / 2 - 4, headH / 2 - 4, 0, 0, TAU); ctx.fill();

  // Elegant Rose Hijab with draped folds
  ctx.save();
  ctx.fillStyle = hijabRose;
  ctx.strokeStyle = '#be123c';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.arc(0, headCenterY - 4, headW / 2 + 5, Math.PI + 0.1, -0.1, false);
  ctx.lineTo(headW / 2 + 10, torsoY + 28);
  ctx.quadraticCurveTo(0, torsoY + 44, -headW / 2 - 10, torsoY + 28);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Face Oval Cutout in Hijab
  ctx.fillStyle = skinTone;
  ctx.strokeStyle = '#be123c';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.ellipse(0, headCenterY + 2, headW * 0.36, headH * 0.42, 0, 0, TAU);
  ctx.fill(); ctx.stroke();
  ctx.restore();

  // Kind Expressive Eyes with Eyelashes
  drawExpressiveEyes(ctx, -9, 9, headCenterY, t, gaze, 0.4);

  // Small nose
  ctx.strokeStyle = skinShadow;
  ctx.lineWidth = 1.8;
  ctx.beginPath(); ctx.moveTo(0, headCenterY + 3); ctx.lineTo(1.5, headCenterY + 8); ctx.stroke();

  // Gentle pleasant smile
  drawCharacterMouth(ctx, headCenterY + 16, isTalking, emotion, t);

  // Arms & Modest sleeves
  ctx.strokeStyle = dressMauve;
  ctx.lineWidth = 12;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-24, torsoY + 12);
  ctx.lineTo(-34, torsoY + 45);
  ctx.lineTo(-12, torsoY + 54);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(24, torsoY + 12);
  ctx.lineTo(34, torsoY + 45);
  ctx.lineTo(12, torsoY + 54);
  ctx.stroke();

  ctx.restore();
}

// -------------------------------------------------------------
// 1. PROTAGONIST / SON (Realistic 2D Corporate Banker & Student)
// Modeled after authentic modern motion-explainer 2D vector art:
// Tailored navy suit jacket, crisp white collared shirt, emerald tie,
// articulated hands with fingers, takeaway coffee cup, tailored slacks.
// -------------------------------------------------------------
export function drawHero(ctx, x, y, scale = 1.0, t = 0, opts = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const attire = opts.attire || 'corporate'; // 'corporate' (navy suit + tie) or 'student' (casual button shirt)
  const armAction = opts.armAction || 'normal'; // 'normal', 'coffee_cup', 'gesture_point', 'phone_ear', 'hold_taka', 'tea_cup', 'hold_100_taka', 'shrug', 'victory_celebration', 'contemplate'
  const isTalking = Boolean(opts.talking);
  const emotion = opts.emotion || 'smile'; // 'smile', 'neutral', 'worried', 'happy'
  const gaze = opts.gaze || 'center';
  const tieColor = opts.tieColor || '#059669'; // Signature emerald green tie (or red in specific bank scenes)

  const skinTone = '#fcd3b0';
  const skinShadow = '#f0b892';
  const suitNavy = '#172554';
  const suitLapel = '#1e3a5f';
  const slacksNavy = '#0f172a';
  const breathe = Math.sin(t * 2.4) * 1.5;

  ctx.translate(0, breathe);

  // Soft Elliptical Ground Shadow
  ctx.save();
  ctx.scale(1, 0.22);
  ctx.beginPath();
  ctx.arc(0, 15, 42, 0, TAU);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
  ctx.fill();
  ctx.restore();

  // -----------------------------------------------------------
  // 1. LEGS & TAILORED TROUSERS (বাস্তবধর্মী ট্রাউজার্স ও জুতো)
  // -----------------------------------------------------------
  const hipY = -140;
  const legLen = 136;
  const legW = 14;
  const legSpread = 16;

  // Pelvis / Hip Base
  ctx.fillStyle = slacksNavy;
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.roundRect(-22, hipY, 44, 28, 4);
  ctx.fill();
  ctx.stroke();

  // Left & Right Tailored Pant Legs
  [-legSpread, legSpread].forEach(lx => {
    // Pant leg silhouette
    ctx.fillStyle = slacksNavy;
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.roundRect(lx - legW / 2, hipY + 12, legW, legLen - 12, [0, 0, 3, 3]);
    ctx.fill();
    ctx.stroke();

    // Center Pressed Crease Line (বাস্তবধর্মী ট্রাউজার ভাজ লাইন)
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(lx, hipY + 18);
    ctx.lineTo(lx, hipY + legLen - 4);
    ctx.stroke();

    // Formal Oxford Leather Dress Shoes
    const shoeY = hipY + legLen;
    ctx.save();
    ctx.translate(lx, shoeY);

    // Shoe sole
    ctx.fillStyle = '#020617';
    ctx.fillRect(-10, -2, 22, 6);

    // Shoe upper
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.roundRect(-10, -12, 21, 12, [5, 6, 2, 2]);
    ctx.fill();
    ctx.stroke();

    // Toe cap highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.ellipse(3, -9, 4, 2, 0, 0, TAU);
    ctx.fill();
    ctx.restore();
  });

  // -----------------------------------------------------------
  // 2. TORSO, SUIT JACKET & CRISP COLLAR (স্যুট ব্লেজার, কলার ও টাই)
  // -----------------------------------------------------------
  const torsoH = 80;
  const torsoY = hipY - torsoH + 6;
  const shoulderW = 66;
  const waistW = 54;

  if (attire === 'corporate') {
    // White shirt peeking out slightly at the bottom hem
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-waistW / 2 + 4, torsoY + torsoH - 5, waistW - 8, 8);

    // Navy Suit Blazer Torso Body
    ctx.fillStyle = suitNavy;
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(-shoulderW / 2, torsoY);
    ctx.lineTo(shoulderW / 2, torsoY);
    ctx.lineTo(waistW / 2, torsoY + torsoH);
    ctx.lineTo(-waistW / 2, torsoY + torsoH);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Center White Dress Shirt Inset (V-Neck opening)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-13, torsoY);
    ctx.lineTo(13, torsoY);
    ctx.lineTo(0, torsoY + 56);
    ctx.closePath();
    ctx.fill();

    // Long Emerald Green or Ruby Red Necktie
    ctx.fillStyle = tieColor;
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 1.6;
    // Tie knot
    ctx.beginPath();
    ctx.roundRect(-5, torsoY + 4, 10, 8, 2);
    ctx.fill();
    ctx.stroke();
    // Tie body extending straight down
    ctx.beginPath();
    ctx.moveTo(-4, torsoY + 12);
    ctx.lineTo(4, torsoY + 12);
    ctx.lineTo(6, torsoY + 68);
    ctx.lineTo(0, torsoY + 76);
    ctx.lineTo(-6, torsoY + 68);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Pointed White Wing Collars (folded over blazer lapels)
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 2.0;
    // Left collar point
    ctx.beginPath();
    ctx.moveTo(-6, torsoY - 2);
    ctx.lineTo(-18, torsoY + 16);
    ctx.lineTo(-6, torsoY + 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Right collar point
    ctx.beginPath();
    ctx.moveTo(6, torsoY - 2);
    ctx.lineTo(18, torsoY + 16);
    ctx.lineTo(6, torsoY + 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Peaked Blazer Lapels
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.0;
    // Left lapel
    ctx.beginPath();
    ctx.moveTo(-shoulderW / 2 + 10, torsoY);
    ctx.lineTo(-14, torsoY + 36);
    ctx.lineTo(-18, torsoY + 42);
    ctx.lineTo(-4, torsoY + 65);
    ctx.stroke();
    // Right lapel
    ctx.beginPath();
    ctx.moveTo(shoulderW / 2 - 10, torsoY);
    ctx.lineTo(14, torsoY + 36);
    ctx.lineTo(18, torsoY + 42);
    ctx.lineTo(4, torsoY + 65);
    ctx.stroke();

  } else {
    // Smart Casual Student Attire (Button-Down Blue Shirt)
    ctx.fillStyle = '#2563eb';
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(-shoulderW / 2 + 4, torsoY);
    ctx.lineTo(shoulderW / 2 - 4, torsoY);
    ctx.lineTo(waistW / 2, torsoY + torsoH);
    ctx.lineTo(-waistW / 2, torsoY + torsoH);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // White V-Collar
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(-12, torsoY);
    ctx.lineTo(0, torsoY + 14);
    ctx.lineTo(12, torsoY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Shirt Placket & Buttons
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(0, torsoY + 14);
    ctx.lineTo(0, torsoY + torsoH);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    [26, 44, 62].forEach(by => {
      ctx.beginPath();
      ctx.arc(0, torsoY + by, 2.2, 0, TAU);
      ctx.fill();
    });
  }

  // -----------------------------------------------------------
  // 3. NECK & PROPORTIONAL HEAD (উন্নত ও বাস্তবসম্মত মুখমণ্ডল)
  // -----------------------------------------------------------
  // Smooth Neck
  ctx.fillStyle = skinTone;
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.roundRect(-7, torsoY - 14, 14, 18, 2);
  ctx.fill();
  ctx.stroke();

  const headW = 56;
  const headH = 68;
  const headCenterY = torsoY - 48;

  // Ears with Inner Rings & Blush
  [-headW / 2 - 2, headW / 2 + 2].forEach((ex, idx) => {
    ctx.save();
    ctx.fillStyle = skinTone;
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(ex, headCenterY + 1, 9.5, 0, TAU);
    ctx.fill();
    ctx.stroke();

    // Inner ear contour
    ctx.fillStyle = '#f0b892';
    ctx.beginPath();
    ctx.arc(ex + (idx === 0 ? 1.5 : -1.5), headCenterY + 1, 4.5, 0, TAU);
    ctx.fill();
    ctx.restore();
  });

  // Face Silhouette (Smooth oval with pleasant chin)
  ctx.fillStyle = skinTone;
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(0, headCenterY, headW / 2, headH / 2, 0, 0, TAU);
  ctx.fill();
  ctx.stroke();

  // Subtle Pink Cheek Blush (রেফারেন্স ইমেজের মতো কিউট নরম গাল)
  ctx.fillStyle = 'rgba(248, 113, 113, 0.40)';
  ctx.beginPath();
  ctx.arc(-headW / 2 + 10, headCenterY + 8, 6.0, 0, TAU);
  ctx.arc(headW / 2 - 10, headCenterY + 8, 6.0, 0, TAU);
  ctx.fill();

  // Modern Cropped Black Hair (রেফারেন্স ইমেজের মতো সুন্দর গোল মাথার আকৃতি)
  ctx.fillStyle = '#18181b';
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.arc(0, headCenterY - 4, headW / 2 + 1, Math.PI + 0.15, -0.15, false);
  ctx.quadraticCurveTo(headW / 2 - 6, headCenterY - headH / 2 + 14, 0, headCenterY - headH / 2 + 12);
  ctx.quadraticCurveTo(-headW / 2 + 6, headCenterY - headH / 2 + 14, -headW / 2 - 1, headCenterY - 4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Eyebrows (Curved, expressive black eyebrows)
  ctx.strokeStyle = '#18181b';
  ctx.lineWidth = 3.2;
  ctx.lineCap = 'round';
  const browY = headCenterY - 14;
  ctx.beginPath();
  if (emotion === 'worried') {
    ctx.moveTo(-18, browY + 2); ctx.quadraticCurveTo(-11, browY - 4, -4, browY - 6);
    ctx.moveTo(4, browY - 6);   ctx.quadraticCurveTo(11, browY - 4, 18, browY + 2);
  } else {
    ctx.moveTo(-18, browY); ctx.quadraticCurveTo(-11, browY - 4, -4, browY - 2);
    ctx.moveTo(4, browY - 2);   ctx.quadraticCurveTo(11, browY - 4, 18, browY);
  }
  ctx.stroke();

  // Large Expressive Eyes (সাদা ও গভীর চোখের মণি এবং ক্যাচলাইট)
  const eyeY = headCenterY - 4;
  const blink = (t % 3.6 > 3.42) ? 1.0 : 0.0;
  const gazeX = gaze === 'left' ? -2.0 : (gaze === 'right' ? 2.0 : 0);
  const gazeY = gaze === 'down' ? 1.5 : (gaze === 'up' ? -1.5 : 0);

  [-11, 11].forEach(ex => {
    ctx.save();
    ctx.translate(ex, eyeY);

    if (blink > 0.5) {
      // Natural blink slit
      ctx.strokeStyle = '#020617';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(-7, 0);
      ctx.quadraticCurveTo(0, 3, 7, 0);
      ctx.stroke();
      ctx.restore();
      return;
    }

    // White Sclera
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(0, 0, 7.5, 0, TAU);
    ctx.fill();
    ctx.stroke();

    // Dark Brown/Black Iris & Pupil
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.arc(gazeX, gazeY, 4.0, 0, TAU);
    ctx.fill();

    // Bright White Catchlight Reflection (চোখের উজ্জ্বল প্রতিফলন)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(gazeX - 1.2, gazeY - 1.2, 1.5, 0, TAU);
    ctx.fill();

    ctx.restore();
  });

  // Small Defined Nose Bridge
  ctx.strokeStyle = '#e29578';
  ctx.lineWidth = 2.0;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, headCenterY - 1);
  ctx.lineTo(2, headCenterY + 7);
  ctx.lineTo(-2, headCenterY + 9);
  ctx.stroke();

  // Expressive Mouth with Coral Lip Color (রেফারেন্স ইমেজের মতো সুন্দর হাসি)
  const mouthY = headCenterY + 17;
  ctx.save();
  ctx.translate(0, mouthY);

  if (!isTalking) {
    ctx.strokeStyle = '#dc2626'; // Pleasant bright red/coral lip color
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    if (emotion === 'smile' || emotion === 'happy') {
      ctx.arc(0, -2, 7.0, 0.2, Math.PI - 0.2);
    } else if (emotion === 'worried') {
      ctx.arc(0, 6, 6.5, Math.PI + 0.3, -0.3);
    } else {
      ctx.moveTo(-6, 0);
      ctx.lineTo(6, 0);
    }
    ctx.stroke();
  } else {
    // Spoken dialogue visemes with teeth
    const speechOpen = Math.abs(Math.sin(t * 11.0)) * 5.5 + 2.5;
    const speechW = 8.5 + Math.cos(t * 7.0) * 2.0;

    ctx.fillStyle = '#881337';
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.ellipse(0, 0, speechW, speechOpen, 0, 0, TAU);
    ctx.fill();
    ctx.stroke();

    if (speechOpen > 3.5) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-speechW * 0.6, -speechOpen + 1, speechW * 1.2, Math.min(2.8, speechOpen * 0.7));
    }
  }
  ctx.restore();

  // -----------------------------------------------------------
  // 4. ARTICULATED ARMS, HANDS & PROPS (বাস্তবধর্মী হাত ও কফি কাপ)
  // -----------------------------------------------------------
  const sleeveColor = (attire === 'corporate') ? suitNavy : '#2563eb';

  // Helper: Draw detailed realistic hand with 4 fingers and thumb
  function drawArticulatedHand(hx, hy, angle = 0, isHolding = false) {
    ctx.save();
    ctx.translate(hx, hy);
    ctx.rotate(angle);
    ctx.fillStyle = skinTone;
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 1.8;

    // Palm base
    ctx.beginPath();
    ctx.roundRect(-6, -6, 12, 13, 4);
    ctx.fill();
    ctx.stroke();

    if (!isHolding) {
      // Upward curving thumb (matching reference)
      ctx.beginPath();
      ctx.roundRect(0, -11, 7, 7, 3);
      ctx.fill();
      ctx.stroke();

      // Extended 4 fingers pointing forward
      const fingerLengths = [12, 13, 12, 10];
      for (let f = 0; f < 4; f++) {
        const fy = -4 + f * 3.4;
        const fl = fingerLengths[f];
        ctx.beginPath();
        ctx.roundRect(5, fy, fl, 3.2, 1.6);
        ctx.fill();
        ctx.stroke();
      }
    } else {
      // Gripping fingers wrapped around object
      for (let f = 0; f < 4; f++) {
        const fy = -5 + f * 3.4;
        ctx.beginPath();
        ctx.roundRect(4, fy, 7, 3.4, 1.7);
        ctx.fill();
        ctx.stroke();
      }
      // Gripping thumb
      ctx.beginPath();
      ctx.roundRect(-3, -9, 7, 6, 2.5);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  // Helper: Draw takeaway paper coffee cup with sleeve & lid
  function drawPaperCoffeeCup(cx, cy) {
    ctx.save();
    ctx.translate(cx, cy);

    // Cup Body (White)
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(-10, -18);
    ctx.lineTo(10, -18);
    ctx.lineTo(8, 16);
    ctx.lineTo(-8, 16);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Kraft Brown Cardboard Cup Sleeve
    ctx.fillStyle = '#b45309';
    ctx.fillRect(-9, -6, 18, 14);
    ctx.strokeRect(-9, -6, 18, 14);

    // Black Sip Lid
    ctx.fillStyle = '#18181b';
    ctx.fillRect(-12, -22, 24, 5);
    ctx.strokeRect(-12, -22, 24, 5);

    ctx.restore();
  }

  // -----------------------------------------------------------
  // ARM ACTIONS (হাতের বিভিন্ন বাস্তবসম্মত অঙ্গভঙ্গি)
  // -----------------------------------------------------------
  if (armAction === 'coffee_cup' || (attire === 'corporate' && armAction === 'normal')) {
    // LEFT ARM: Holding Takeaway Coffee Cup close to chest (রেফারেন্স ইমেজের মতো)
    const lShoulderX = -shoulderW / 2 + 6;
    const lElbowX = -shoulderW / 2 - 10;
    const lElbowY = torsoY + 36;
    const lHandX = -18;
    const lHandY = torsoY + 28;

    // Sleeve
    ctx.strokeStyle = sleeveColor;
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lShoulderX, torsoY + 6);
    ctx.lineTo(lElbowX, lElbowY);
    ctx.lineTo(lHandX, lHandY);
    ctx.stroke();

    // White shirt cuff peeking out
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(lHandX - 6, lHandY - 2);
    ctx.lineTo(lHandX, lHandY);
    ctx.stroke();

    // Paper Coffee Cup
    drawPaperCoffeeCup(lHandX + 4, lHandY);

    // Left Hand gripping cup
    drawArticulatedHand(lHandX - 2, lHandY, 0, true);

    // RIGHT ARM: Outstretched Gesturing / Explaining forward (রেফারেন্স ইমেজের মতো)
    const rShoulderX = shoulderW / 2 - 6;
    const rElbowX = shoulderW / 2 + 18;
    const rElbowY = torsoY + 16;
    const rHandX = shoulderW / 2 + 46;
    const rHandY = torsoY + 18;

    // Sleeve
    ctx.strokeStyle = sleeveColor;
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(rShoulderX, torsoY + 6);
    ctx.lineTo(rElbowX, rElbowY);
    ctx.lineTo(rHandX, rHandY);
    ctx.stroke();

    // White shirt cuff
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(rHandX - 6, rHandY);
    ctx.lineTo(rHandX, rHandY);
    ctx.stroke();

    // Gesturing Hand with distinct pointing fingers
    drawArticulatedHand(rHandX + 2, rHandY, 0.1, false);

  } else if (armAction === 'gesture_point') {
    // Left arm relaxed at side
    const lShoulderX = -shoulderW / 2 + 6;
    const lHandX = -shoulderW / 2 - 8;
    const lHandY = torsoY + 64;

    ctx.strokeStyle = sleeveColor;
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lShoulderX, torsoY + 6);
    ctx.lineTo(lHandX, lHandY);
    ctx.stroke();

    // Cuff & Hand
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(lHandX, lHandY - 6); ctx.lineTo(lHandX, lHandY); ctx.stroke();
    drawArticulatedHand(lHandX, lHandY + 4, 1.5, false);

    // Right arm dynamically pointing towards chart / badge
    const rShoulderX = shoulderW / 2 - 6;
    const rElbowX = shoulderW / 2 + 20;
    const rElbowY = torsoY + 22;
    const rHandX = shoulderW / 2 + 54;
    const rHandY = torsoY - 8;

    ctx.strokeStyle = sleeveColor;
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(rShoulderX, torsoY + 6);
    ctx.lineTo(rElbowX, rElbowY);
    ctx.lineTo(rHandX, rHandY);
    ctx.stroke();

    // Cuff & Pointing Hand
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(rHandX - 6, rHandY + 2); ctx.lineTo(rHandX, rHandY); ctx.stroke();
    drawArticulatedHand(rHandX + 4, rHandY, -0.3, false);

  } else if (armAction === 'phone_ear') {
    // Left arm relaxed
    const lShoulderX = -shoulderW / 2 + 6;
    const lHandX = -shoulderW / 2 - 8;
    const lHandY = torsoY + 64;
    ctx.strokeStyle = sleeveColor;
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lShoulderX, torsoY + 6);
    ctx.lineTo(lHandX, lHandY);
    ctx.stroke();
    drawArticulatedHand(lHandX, lHandY + 4, 1.5, false);

    // Right arm raised holding smartphone to ear
    const phoneX = headW / 2 + 14;
    const phoneY = headCenterY;
    const rElbowX = shoulderW / 2 + 22;
    const rElbowY = torsoY + 36;

    ctx.strokeStyle = sleeveColor;
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(shoulderW / 2 - 6, torsoY + 6);
    ctx.lineTo(rElbowX, rElbowY);
    ctx.lineTo(phoneX - 4, phoneY + 12);
    ctx.stroke();

    // Smartphone
    ctx.save();
    ctx.translate(phoneX, phoneY);
    ctx.rotate(-0.12);
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.roundRect(-7, -18, 14, 34, 4);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-5, -14, 10, 26);
    ctx.restore();

    // Hand gripping phone
    drawArticulatedHand(phoneX - 2, phoneY + 6, 0, true);

  } else if (armAction === 'tea_cup' || armAction === 'hold_100_taka') {
    // Left arm relaxed
    const lHandX = -shoulderW / 2 - 8;
    const lHandY = torsoY + 64;
    ctx.strokeStyle = sleeveColor;
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-shoulderW / 2 + 6, torsoY + 6);
    ctx.lineTo(lHandX, lHandY);
    ctx.stroke();
    drawArticulatedHand(lHandX, lHandY + 4, 1.5, false);

    // Right arm bent holding tea glass or 100 Taka
    const rHandX = shoulderW / 2 + 32;
    const rHandY = torsoY + 38;
    ctx.strokeStyle = sleeveColor;
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(shoulderW / 2 - 6, torsoY + 6);
    ctx.lineTo(shoulderW / 2 + 18, torsoY + 32);
    ctx.lineTo(rHandX, rHandY);
    ctx.stroke();

    if (armAction === 'tea_cup') {
      // Hot glass tea cup with milk tea & steam
      ctx.save();
      ctx.translate(rHandX + 12, rHandY - 6);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.strokeStyle = '#020617';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-8, -14); ctx.lineTo(8, -14); ctx.lineTo(6, 12); ctx.lineTo(-6, 12);
      ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#b45309';
      ctx.fillRect(-6, -4, 12, 14);

      // Steam
      ctx.strokeStyle = 'rgba(254, 240, 138, 0.7)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(0, -16); ctx.quadraticCurveTo(4, -22, 0, -28); ctx.stroke();
      ctx.restore();
    } else {
      // 100 Taka Note
      ctx.save();
      ctx.translate(rHandX + 16, rHandY - 4);
      ctx.fillStyle = '#93c5fd';
      ctx.strokeStyle = '#020617';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.roundRect(-24, -14, 52, 28, 2);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#1e3a8a';
      ctx.font = '700 12px "Noto Sans Bengali", sans-serif';
      ctx.fillText('৳১০০', -12, 5);
      ctx.restore();
    }

    drawArticulatedHand(rHandX, rHandY, 0, true);

  } else if (armAction === 'shrug') {
    // Both arms raised in questioning shrug with open palms
    [-1, 1].forEach(side => {
      const elbowX = side * (shoulderW / 2 + 18);
      const handX = side * (shoulderW / 2 + 34);
      const handY = torsoY + 22;

      ctx.strokeStyle = sleeveColor;
      ctx.lineWidth = 13;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(side * (shoulderW / 2 - 6), torsoY + 6);
      ctx.lineTo(elbowX, torsoY + 38);
      ctx.lineTo(handX, handY);
      ctx.stroke();

      // Open upward palms
      drawArticulatedHand(handX, handY, side * 0.4, false);
    });

  } else if (armAction === 'victory_celebration') {
    // Both arms raised high in triumphant victory celebration!
    [-1, 1].forEach(side => {
      const handX = side * (shoulderW / 2 + 24);
      const handY = torsoY - 26;

      ctx.strokeStyle = sleeveColor;
      ctx.lineWidth = 13;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(side * (shoulderW / 2 - 6), torsoY + 6);
      ctx.lineTo(side * (shoulderW / 2 + 18), torsoY - 6);
      ctx.lineTo(handX, handY);
      ctx.stroke();

      // Clenched victory fist
      drawArticulatedHand(handX, handY, side * 0.2, true);
    });

  } else if (armAction === 'contemplate') {
    // Left arm relaxed
    const lHandX = -shoulderW / 2 - 8;
    const lHandY = torsoY + 64;
    ctx.strokeStyle = sleeveColor;
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-shoulderW / 2 + 6, torsoY + 6);
    ctx.lineTo(lHandX, lHandY);
    ctx.stroke();
    drawArticulatedHand(lHandX, lHandY + 4, 1.5, false);

    // Right arm bent touching chin thoughtfully
    const elbowX = shoulderW / 2 + 18;
    const elbowY = torsoY + 38;
    const chinX = 14;
    const chinY = headCenterY + 20;

    ctx.strokeStyle = sleeveColor;
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(shoulderW / 2 - 6, torsoY + 6);
    ctx.lineTo(elbowX, elbowY);
    ctx.lineTo(chinX, chinY);
    ctx.stroke();

    drawArticulatedHand(chinX, chinY, -0.6, true);

  } else {
    // Default / Natural stance: Left arm holding coffee cup, Right arm relaxed or gesturing
    const lShoulderX = -shoulderW / 2 + 6;
    const lElbowX = -shoulderW / 2 - 10;
    const lElbowY = torsoY + 36;
    const lHandX = -18;
    const lHandY = torsoY + 28;

    ctx.strokeStyle = sleeveColor;
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lShoulderX, torsoY + 6);
    ctx.lineTo(lElbowX, lElbowY);
    ctx.lineTo(lHandX, lHandY);
    ctx.stroke();

    drawPaperCoffeeCup(lHandX + 4, lHandY);
    drawArticulatedHand(lHandX - 2, lHandY, 0, true);

    const rShoulderX = shoulderW / 2 - 6;
    const rHandX = shoulderW / 2 + 10;
    const rHandY = torsoY + 62;

    ctx.strokeStyle = sleeveColor;
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(rShoulderX, torsoY + 6);
    ctx.lineTo(rHandX, rHandY);
    ctx.stroke();

    drawArticulatedHand(rHandX, rHandY + 4, 1.5, false);
  }

  ctx.restore();
}

// -------------------------------------------------------------
// 2. FATHER / আব্বা (Elderly Bengali Villager in Lungi & Spectacles)
// -------------------------------------------------------------
export function drawFather(ctx, x, y, scale = 1.0, t = 0, opts = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const armAction = opts.armAction || 'phone_ear'; // 'phone_ear', 'gesturing', 'normal'
  const isTalking = Boolean(opts.talking);
  const gaze = opts.gaze || 'center';

  const skinTone = '#f6b89f';
  const skinShadow = '#dfa58a';
  const breathe = Math.sin(t * 2.1) * 1.6;
  ctx.translate(0, breathe);

  // Soft Floor Shadow
  ctx.save();
  ctx.scale(1, 0.25);
  ctx.beginPath();
  ctx.arc(0, 10, 38, 0, TAU);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.fill();
  ctx.restore();

  const hipY = -125;

  // 1. Authentic Blue-White Checkered Lungi (নীল-সাদা চেকের লুঙ্গি)
  const lungiW = 54;
  const lungiH = 115;
  ctx.fillStyle = '#60a5fa'; // Blue lungi base
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.roundRect(-lungiW / 2, hipY, lungiW, lungiH, [0, 0, 4, 4]);
  ctx.fill();
  ctx.stroke();

  // White and Dark Blue Checkered Grid on Lungi
  ctx.save();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.2;
  for (let lx = -lungiW / 2 + 9; lx < lungiW / 2; lx += 9) {
    ctx.beginPath(); ctx.moveTo(lx, hipY); ctx.lineTo(lx, hipY + lungiH); ctx.stroke();
  }
  for (let ly = hipY + 12; ly < hipY + lungiH; ly += 12) {
    ctx.beginPath(); ctx.moveTo(-lungiW / 2, ly); ctx.lineTo(lungiW / 2, ly); ctx.stroke();
  }
  ctx.restore();

  // Stick Legs under lungi & slippers
  [-11, 11].forEach(lx => {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4.0;
    ctx.beginPath();
    ctx.moveTo(lx, hipY + lungiH);
    ctx.lineTo(lx, 0);
    ctx.stroke();

    // Brown leather slippers
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.ellipse(lx + 2, 0, 8, 4.5, 0, 0, TAU);
    ctx.fill();
    ctx.stroke();
  });

  // 2. Torso (Sleeveless Vest / Fatua)
  const torsoY = hipY - 72;
  const torsoW = 56;
  const torsoH = 72;

  ctx.fillStyle = '#78716c'; // Olive / Stone grey vest
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.roundRect(-torsoW / 2, torsoY, torsoW, torsoH, 6);
  ctx.fill();
  ctx.stroke();

  // V-Neck opening
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-10, torsoY); ctx.lineTo(0, torsoY + 16); ctx.lineTo(10, torsoY);
  ctx.stroke();

  // 3. Neck
  ctx.fillStyle = skinTone;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.rect(-8, torsoY - 14, 16, 16);
  ctx.fill(); ctx.stroke();

  // 4. Head with Distinguished White Hair, Spectacles & White Mustache
  const headY = torsoY - 58;
  const headW = 76;
  const headH = 80;

  // Ears
  [-headW / 2 - 2, headW / 2 + 2].forEach(ex => {
    ctx.fillStyle = skinTone;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(ex, headY + 4, 11, 0, TAU);
    ctx.fill(); ctx.stroke();
  });

  // Head Outline
  ctx.fillStyle = skinTone;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3.0;
  ctx.beginPath();
  ctx.ellipse(0, headY, headW / 2, headH / 2, 0, 0, TAU);
  ctx.fill(); ctx.stroke();

  // Elderly White Hair (Parted with wrinkles)
  ctx.fillStyle = '#e2e8f0';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(-headW / 2 + 2, headY - 10);
  ctx.quadraticCurveTo(-headW / 2, headY - headH / 2 - 6, 0, headY - headH / 2 - 6);
  ctx.quadraticCurveTo(headW / 2, headY - headH / 2 - 6, headW / 2 - 2, headY - 10);
  ctx.quadraticCurveTo(24, headY - headH / 2 + 18, 0, headY - headH / 2 + 16);
  ctx.quadraticCurveTo(-24, headY - headH / 2 + 18, -headW / 2 + 2, headY - 10);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Forehead Wisdom Wrinkles
  ctx.strokeStyle = '#dfa58a';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-16, headY - 26); ctx.lineTo(16, headY - 26);
  ctx.moveTo(-12, headY - 22); ctx.lineTo(12, headY - 22);
  ctx.stroke();

  // Eyebrows (Grey/White)
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 3.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-22, headY - 18); ctx.lineTo(-8, headY - 18);
  ctx.moveTo(8, headY - 18);   ctx.lineTo(22, headY - 18);
  ctx.stroke();

  // Round Wireframe Spectacles (গোল চশমা)
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.4;
  [-15, 15].forEach(gx => {
    ctx.beginPath();
    ctx.arc(gx, headY - 8, 14, 0, TAU);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fill();
    ctx.stroke();
  });
  // Bridge connecting glasses
  ctx.beginPath();
  ctx.moveTo(-1, headY - 8); ctx.lineTo(1, headY - 8); ctx.stroke();

  // Eyes behind spectacles
  drawExpressiveEyes(ctx, -15, 15, headY - 8, t, gaze, 0.52);

  // Hooked Nose
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(0, headY - 4);
  ctx.lineTo(4, headY + 10);
  ctx.lineTo(-2, headY + 13);
  ctx.stroke();

  // White Mustache (পাকা সাদা গোঁফ)
  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(0, headY + 16);
  ctx.quadraticCurveTo(-14, headY + 12, -22, headY + 22);
  ctx.quadraticCurveTo(-10, headY + 24, 0, headY + 18);
  ctx.quadraticCurveTo(10, headY + 24, 22, headY + 22);
  ctx.quadraticCurveTo(14, headY + 12, 0, headY + 16);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Mouth
  drawCharacterMouth(ctx, headY + 27, isTalking, 'warm', t);

  // 5. Arms & Vintage Phone
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 6.0;
  ctx.lineCap = 'round';
  ctx.fillStyle = skinTone;

  if (armAction === 'phone_ear') {
    // Left arm relaxed
    ctx.beginPath();
    ctx.moveTo(-torsoW / 2 + 4, torsoY + 10);
    ctx.lineTo(-torsoW / 2 - 10, torsoY + 58);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(-torsoW / 2 - 10, torsoY + 63, 7, 0, TAU);
    ctx.fill(); ctx.stroke();

    // Right arm raised holding vintage keypad phone to ear
    const phoneX = headW / 2 + 12;
    const phoneY = headY + 6;
    ctx.beginPath();
    ctx.moveTo(torsoW / 2 - 4, torsoY + 10);
    ctx.lineTo(torsoW / 2 + 24, torsoY + 36);
    ctx.lineTo(phoneX, phoneY + 14);
    ctx.stroke();

    // Vintage button phone (Feature phone)
    ctx.fillStyle = '#1e293b';
    ctx.save();
    ctx.translate(phoneX, phoneY);
    ctx.rotate(-0.18);
    ctx.roundRect(-7, -18, 14, 32, 4);
    ctx.fill(); ctx.stroke();
    // Screen (Monochrome / Blue)
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(-5, -14, 10, 12);
    // Keypad dots
    ctx.fillStyle = '#cbd5e1';
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        ctx.fillRect(-4 + c * 3.2, 0 + r * 3.2, 2.0, 2.0);
      }
    }
    ctx.restore();

    // Hand gripping phone
    ctx.beginPath();
    ctx.arc(phoneX, phoneY + 8, 8, 0, TAU);
    ctx.fill(); ctx.stroke();

  } else {
    // Normal / Gesturing
    [-1, 1].forEach(side => {
      ctx.beginPath();
      ctx.moveTo(side * (torsoW / 2 - 4), torsoY + 10);
      ctx.lineTo(side * (torsoW / 2 + 10), torsoY + 58);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(side * (torsoW / 2 + 10), torsoY + 63, 7, 0, TAU);
      ctx.fill(); ctx.stroke();
    });
  }

  ctx.restore();
}

// -------------------------------------------------------------
// 3. SISTER / ছোট বোন (Young Woman in Saree with Bindi & Bun)
// -------------------------------------------------------------
export function drawSister(ctx, x, y, scale = 1.0, t = 0, opts = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const isTalking = Boolean(opts.talking);
  const skinTone = '#f6b89f';
  const breathe = Math.sin(t * 2.3) * 1.5;
  ctx.translate(0, breathe);

  // Shadow
  ctx.save();
  ctx.scale(1, 0.25);
  ctx.beginPath();
  ctx.arc(0, 10, 36, 0, TAU);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.fill();
  ctx.restore();

  const hipY = -125;

  // Traditional Pink / Magenta Saree Drape
  const sareeW = 50;
  const sareeH = 118;
  ctx.fillStyle = '#db2777'; // Vibrant pink/magenta saree
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.roundRect(-sareeW / 2, hipY, sareeW, sareeH, [0, 0, 6, 6]);
  ctx.fill(); ctx.stroke();

  // Golden Saree Border (আঁচলের সোনালী পাড়)
  ctx.fillStyle = '#facc15';
  ctx.fillRect(-sareeW / 2, hipY + sareeH - 12, sareeW, 7);

  // Saree Pallu Diagonal Drape across chest
  const torsoY = hipY - 70;
  const torsoW = 50;
  const torsoH = 70;

  // Blouse Base (Crisp White / Light Pink)
  ctx.fillStyle = '#fce7f3';
  ctx.beginPath();
  ctx.roundRect(-torsoW / 2, torsoY, torsoW, torsoH, 6);
  ctx.fill(); ctx.stroke();

  // Saree Drape Over Shoulder
  ctx.fillStyle = '#db2777';
  ctx.beginPath();
  ctx.moveTo(-torsoW / 2, torsoY);
  ctx.lineTo(torsoW / 2 - 8, torsoY + torsoH);
  ctx.lineTo(-torsoW / 2 + 10, torsoY + torsoH);
  ctx.lineTo(-torsoW / 2, torsoY);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Neck
  ctx.fillStyle = skinTone;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.rect(-7, torsoY - 14, 14, 16);
  ctx.fill(); ctx.stroke();

  // Head with Hair Bun & Bindi
  const headY = torsoY - 56;
  const headW = 72;
  const headH = 76;

  // Neat Hair Bun at top/back
  ctx.fillStyle = '#18181b';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.arc(0, headY - headH / 2 - 8, 16, 0, TAU);
  ctx.fill(); ctx.stroke();

  // Ears
  [-headW / 2 - 2, headW / 2 + 2].forEach(ex => {
    ctx.fillStyle = skinTone;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(ex, headY + 4, 10, 0, TAU);
    ctx.fill(); ctx.stroke();
  });

  // Head Outline
  ctx.fillStyle = skinTone;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.ellipse(0, headY, headW / 2, headH / 2, 0, 0, TAU);
  ctx.fill(); ctx.stroke();

  // Sleek Center-Parted Black Hair
  ctx.fillStyle = '#18181b';
  ctx.beginPath();
  ctx.moveTo(-headW / 2 + 2, headY - 10);
  ctx.quadraticCurveTo(-headW / 2, headY - headH / 2 - 4, 0, headY - headH / 2 - 4);
  ctx.quadraticCurveTo(headW / 2, headY - headH / 2 - 4, headW / 2 - 2, headY - 10);
  ctx.quadraticCurveTo(20, headY - headH / 2 + 16, 0, headY - headH / 2 + 14);
  ctx.quadraticCurveTo(-20, headY - headH / 2 + 16, -headW / 2 + 2, headY - 10);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Round Red Bindi (কপালে লাল টিপ)
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(0, headY - 16, 4.0, 0, TAU);
  ctx.fill();

  // Gentle Eyebrows
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(-20, headY - 20); ctx.lineTo(-8, headY - 20);
  ctx.moveTo(8, headY - 20);   ctx.lineTo(20, headY - 20);
  ctx.stroke();

  // Soft Expressive Eyes
  drawExpressiveEyes(ctx, -14, 14, headY - 10, t, 'center', 0.44);

  // Small Nose
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(0, headY - 4); ctx.lineTo(2, headY + 6); ctx.lineTo(-1, headY + 8);
  ctx.stroke();

  // Soft Red Lips
  drawCharacterMouth(ctx, headY + 20, isTalking, 'smile', t);

  // Arms holding phone
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 5.5;
  ctx.lineCap = 'round';
  ctx.fillStyle = skinTone;

  // Left arm down
  ctx.beginPath();
  ctx.moveTo(-torsoW / 2 + 4, torsoY + 10);
  ctx.lineTo(-torsoW / 2 - 10, torsoY + 56);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(-torsoW / 2 - 10, torsoY + 61, 6.5, 0, TAU);
  ctx.fill(); ctx.stroke();

  // Right arm raised holding phone to ear
  const phoneX = headW / 2 + 10;
  const phoneY = headY + 6;
  ctx.beginPath();
  ctx.moveTo(torsoW / 2 - 4, torsoY + 10);
  ctx.lineTo(torsoW / 2 + 22, torsoY + 34);
  ctx.lineTo(phoneX, phoneY + 12);
  ctx.stroke();

  ctx.fillStyle = '#09090b';
  ctx.save();
  ctx.translate(phoneX, phoneY);
  ctx.rotate(-0.15);
  ctx.roundRect(-6, -14, 12, 26, 3);
  ctx.fill(); ctx.stroke();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(phoneX, phoneY + 6, 7.5, 0, TAU);
  ctx.fill(); ctx.stroke();

  ctx.restore();
}



// -------------------------------------------------------------
// 5. MUSLIM MALE STORYTELLER (ক্রিম রঙের পাঞ্জাবি ও এমব্রয়ডারি করা কুফি/টুপি)
// -------------------------------------------------------------
// -------------------------------------------------------------
// 4. SUSPENSE SILHOUETTE (পরের পর্বে... Cliffhanger Hook)
// -------------------------------------------------------------
export function drawSuspenseSilhouette(ctx, x, y, scale = 1.0, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Pure dark silhouette of a mysterious character
  ctx.fillStyle = '#09090b';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.0;

  // Legs & Robe
  ctx.beginPath();
  ctx.roundRect(-22, -120, 44, 90, [4, 4, 0, 0]);
  ctx.fill();
  [-11, 11].forEach(lx => {
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(lx, -30); ctx.lineTo(lx, 0); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(lx + 2, 0, 9, 5, 0, 0, TAU); ctx.fill();
  });

  // Torso
  ctx.beginPath();
  ctx.roundRect(-26, -180, 52, 65, 6);
  ctx.fill();

  // Neck
  ctx.fillRect(-8, -196, 16, 18);

  // Big Rounded Head
  ctx.beginPath();
  ctx.ellipse(0, -238, 38, 42, 0, 0, TAU);
  ctx.fill();

  // Ears
  [-39, 39].forEach(ex => {
    ctx.beginPath();
    ctx.arc(ex, -236, 11, 0, TAU);
    ctx.fill();
  });

  // Arms hanging down mysteriously
  [-32, 32].forEach(ax => {
    ctx.beginPath();
    ctx.roundRect(ax - 5, -175, 10, 60, 5);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(ax, -112, 8, 0, TAU);
    ctx.fill();
  });

  // GLOWING GOLDEN QUESTION MARK (?) OVER THE FACE
  const pulse = Math.sin(t * 4.5) * 2.5;
  ctx.save();
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 18;
  ctx.fillStyle = '#facc15';
  ctx.font = '900 48px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('?', 0, -238 + pulse * 0.4);
  ctx.restore();

  ctx.restore();
}



// -------------------------------------------------------------
// 5. MUSLIM MALE STORYTELLER (ক্রিম রঙের পাঞ্জাবি ও এমব্রয়ডারি করা কুফি/টুপি)
// -------------------------------------------------------------
// -------------------------------------------------------------
// 5. ROOMMATE / COLLEAGUE (Supporting Characters)
// -------------------------------------------------------------
export function drawSupportingCharacter(ctx, x, y, scale = 1.0, t = 0, opts = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const shirtColor = opts.shirtColor || '#f97316'; // Orange / Grey
  const hasMustache = Boolean(opts.mustache);
  const showDisgustedEmoji = Boolean(opts.disgusted);

  const skinTone = '#f6b89f';
  const hipY = -120;

  // Legs
  [-11, 11].forEach(lx => {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4.0;
    ctx.beginPath(); ctx.moveTo(lx, hipY + 30); ctx.lineTo(lx, 0); ctx.stroke();
    ctx.fillStyle = '#09090b';
    ctx.beginPath(); ctx.ellipse(lx + 2, 0, 8.5, 4.5, 0, 0, TAU); ctx.fill(); ctx.stroke();
  });

  // Shorts
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.4;
  ctx.beginPath(); ctx.roundRect(-20, hipY, 40, 32, 4); ctx.fill(); ctx.stroke();

  // Torso
  const torsoY = hipY - 72;
  ctx.fillStyle = shirtColor;
  ctx.beginPath(); ctx.roundRect(-24, torsoY, 48, 72, 6); ctx.fill(); ctx.stroke();

  // Head
  const headY = torsoY - 56;
  ctx.fillStyle = skinTone;
  [-36, 36].forEach(ex => {
    ctx.beginPath(); ctx.arc(ex, headY + 4, 10, 0, TAU); ctx.fill(); ctx.stroke();
  });
  ctx.beginPath(); ctx.ellipse(0, headY, 35, 38, 0, 0, TAU); ctx.fill(); ctx.stroke();

  // Hair
  ctx.fillStyle = '#18181b';
  ctx.beginPath();
  ctx.arc(0, headY - 14, 34, Math.PI, 0);
  ctx.fill(); ctx.stroke();

  // Eyes
  drawExpressiveEyes(ctx, -14, 14, headY - 8, t, 'left', 0.5);

  // Nose
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.2;
  ctx.beginPath(); ctx.moveTo(0, headY - 4); ctx.lineTo(2, headY + 8); ctx.stroke();

  // Mustache if colleague
  if (hasMustache) {
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.roundRect(-12, headY + 12, 24, 4.5, 2);
    ctx.fill();
  }

  // Mouth
  ctx.beginPath();
  ctx.moveTo(-6, headY + 22); ctx.lineTo(6, headY + 22);
  ctx.stroke();

  // Arms
  [-1, 1].forEach(side => {
    ctx.beginPath();
    ctx.moveTo(side * 20, torsoY + 10);
    ctx.lineTo(side * 28, torsoY + 58);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(side * 28, torsoY + 63, 6.5, 0, TAU);
    ctx.fill(); ctx.stroke();
  });

  // Disgusted Green Emoji (🤢) floating above head when smelling glue
  if (showDisgustedEmoji) {
    const floatY = headY - 60 + Math.sin(t * 3.5) * 5;
    ctx.save();
    ctx.translate(0, floatY);
    ctx.fillStyle = '#22c55e'; // Sick green face
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.0;
    ctx.beginPath(); ctx.arc(0, 0, 16, 0, TAU); ctx.fill(); ctx.stroke();

    // Cross eyes (X X)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.0;
    [-6, 6].forEach(ex => {
      ctx.beginPath();
      ctx.moveTo(ex - 3, -4); ctx.lineTo(ex + 3, 2);
      ctx.moveTo(ex + 3, -4); ctx.lineTo(ex - 3, 2);
      ctx.stroke();
    });

    // Wavy green sick mouth
    ctx.beginPath();
    ctx.moveTo(-7, 7);
    ctx.quadraticCurveTo(-3, 4, 0, 7);
    ctx.quadraticCurveTo(4, 10, 7, 7);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}

