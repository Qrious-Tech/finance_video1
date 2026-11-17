/**
 * Bengali Story Motion — Environments & Staging Layout Engine
 * Provides authentic storytelling backdrops: Dormitory Room, Corporate Bank Office,
 * Village Homestead, Two-Way Phone Call Split-Screen, and Suspense Cliffhanger.
 */

const TAU = Math.PI * 2;

// 1. Dormitory Room (হলের রুম)
export function drawDormRoom(ctx, W, H, t) {
  ctx.save();
  // Deep Night Wall
  const wallGrad = ctx.createLinearGradient(0, 0, 0, H);
  wallGrad.addColorStop(0, '#0f172a');
  wallGrad.addColorStop(1, '#1e293b');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, W, H);

  // Night Window with Moon
  const winW = W * 0.42;
  const winH = H * 0.22;
  const winX = W - winW - 35;
  const winY = H * 0.12;

  // Window Frame
  ctx.fillStyle = '#020617';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 6;
  ctx.fillRect(winX, winY, winW, winH);
  ctx.strokeRect(winX, winY, winW, winH);

  // Night Sky & Moon inside window
  ctx.save();
  ctx.beginPath();
  ctx.rect(winX, winY, winW, winH);
  ctx.clip();
  ctx.fillStyle = '#090d16';
  ctx.fillRect(winX, winY, winW, winH);

  // Pale Glowing Moon
  ctx.fillStyle = '#fef08a';
  ctx.shadowColor = '#fef08a';
  ctx.shadowBlur = 16;
  ctx.beginPath();
  ctx.arc(winX + winW - 38, winY + 38, 20, 0, TAU);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.restore();

  // Study Shelf with Books and Glowing Night Lamp
  const shelfY = winY + winH + 45;
  ctx.fillStyle = '#78350f'; // Dark wood
  ctx.fillRect(winX - 20, shelfY, winW + 40, 14);

  // Books on shelf
  const bookColors = ['#dc2626', '#2563eb', '#16a34a', '#d97706'];
  bookColors.forEach((bc, idx) => {
    ctx.fillStyle = bc;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;
    ctx.fillRect(winX + winW - 20 - (idx + 1) * 22, shelfY - 42, 18, 42);
    ctx.strokeRect(winX + winW - 20 - (idx + 1) * 22, shelfY - 42, 18, 42);
  });

  // Glowing Night Lamp
  const lampX = winX + 30;
  ctx.fillStyle = '#facc15';
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 24;
  ctx.beginPath();
  ctx.roundRect(lampX - 16, shelfY - 46, 32, 46, [14, 14, 2, 2]);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Floor
  const floorY = H * 0.65;
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, floorY, W, H - floorY);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, floorY);
  ctx.lineTo(W, floorY);
  ctx.stroke();

  // Wooden hostel bed ledge
  ctx.fillStyle = '#e2e8f0';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.0;
  ctx.fillRect(0, floorY - 50, W * 0.44, 40);
  ctx.strokeRect(0, floorY - 50, W * 0.44, 40);

  ctx.restore();
}

// 2. Bank Head Office (ব্যাংক • প্রধান কার্যালয়)
export function drawBankOffice(ctx, W, H, t) {
  ctx.save();
  // Clean Modern Corporate Grey / Steel Gradient
  const wallGrad = ctx.createLinearGradient(0, 0, 0, H);
  wallGrad.addColorStop(0, '#94a3b8');
  wallGrad.addColorStop(0.7, '#cbd5e1');
  wallGrad.addColorStop(1, '#64748b');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, W, H);

  // Vertical Architectural Panel Dividers
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2.5;
  const colStep = W / 5;
  for (let c = 1; c < 5; c++) {
    ctx.beginPath();
    ctx.moveTo(c * colStep, 0);
    ctx.lineTo(c * colStep, H * 0.65);
    ctx.stroke();
  }

  // Workstation Counter / Desks
  const deskY = H * 0.52;
  ctx.fillStyle = '#475569';
  ctx.fillRect(0, deskY, W, 22);

  // Desktop Computer Monitors on workstations
  [W * 0.16, W * 0.84].forEach(mx => {
    // Monitor Screen
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(mx - 45, deskY - 60, 90, 56, 4);
    ctx.fill(); ctx.stroke();
    // Stand
    ctx.fillStyle = '#334155';
    ctx.fillRect(mx - 8, deskY - 4, 16, 6);
    ctx.fillRect(mx - 20, deskY + 2, 40, 4);
  });

  // Floor Base
  const floorY = H * 0.65;
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(0, floorY, W, H - floorY);
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, floorY); ctx.lineTo(W, floorY); ctx.stroke();

  // Subtle Vignette around edges for focus
  drawVignette(ctx, W, H, 0.45);

  ctx.restore();
}

// 3. Lunch Cafeteria Counter (লাঞ্চের টেবিল)
export function drawLunchTable(ctx, W, H, t) {
  ctx.save();
  // Warm Beige Cafeteria Wall
  const bgGrad = ctx.createRadialGradient(W / 2, H * 0.4, 40, W / 2, H * 0.4, W * 0.8);
  bgGrad.addColorStop(0, '#fef3c7');
  bgGrad.addColorStop(1, '#d97706');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Lunch Counter Table
  const tableY = H * 0.55;
  ctx.fillStyle = '#78350f';
  ctx.fillRect(0, tableY, W, 36);

  // Ceramic Plates on Table
  [W * 0.22, W * 0.5, W * 0.78].forEach(px => {
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(px, tableY + 12, 38, 14, 0, 0, TAU);
    ctx.fill(); ctx.stroke();
  });

  // Lower Floor
  ctx.fillStyle = '#b45309';
  ctx.fillRect(0, tableY + 36, W, H - (tableY + 36));

  drawVignette(ctx, W, H, 0.4);
  ctx.restore();
}

// 4. Village Homestead (নীলফামারীর গ্রাম)
export function drawVillageHome(ctx, W, H, t) {
  ctx.save();
  // Daylight Rural Sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.6);
  skyGrad.addColorStop(0, '#bae6fd');
  skyGrad.addColorStop(1, '#fef08a');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H * 0.6);

  // Lush Green Trees in background
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.arc(W * 0.25, H * 0.28, 90, 0, TAU);
  ctx.arc(W * 0.35, H * 0.22, 110, 0, TAU);
  ctx.arc(W * 0.15, H * 0.32, 80, 0, TAU);
  ctx.fill();

  // Village Tin / Mud House
  const houseX = W * 0.48;
  const houseY = H * 0.26;
  const houseW = W * 0.48;
  const houseH = H * 0.34;

  // Brown Tin Roof
  ctx.fillStyle = '#991b1b';
  ctx.beginPath();
  ctx.moveTo(houseX - 15, houseY);
  ctx.lineTo(houseX + houseW / 2, houseY - 50);
  ctx.lineTo(houseX + houseW + 15, houseY);
  ctx.closePath();
  ctx.fill();

  // Mud Wall
  ctx.fillStyle = '#d97706';
  ctx.fillRect(houseX, houseY, houseW, houseH);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(houseX, houseY, houseW, houseH);

  // Green Courtyard Grass
  const grassY = H * 0.6;
  ctx.fillStyle = '#65a30d';
  ctx.fillRect(0, grassY, W, H - grassY);

  drawVignette(ctx, W, H, 0.35);
  ctx.restore();
}

// 5. Interactive Two-Way Phone Call Split-Screen (স্প্লিট-স্ক্রিন কল)
export function drawSplitScreenCall(ctx, W, H, t) {
  ctx.save();

  // TOP HALF (Village Father)
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, W, H * 0.5);
  ctx.clip();
  drawVillageHome(ctx, W, H * 0.5, t);
  ctx.restore();

  // BOTTOM HALF (City Bank Office Son)
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, H * 0.5, W, H * 0.5);
  ctx.clip();
  ctx.translate(0, H * 0.5);
  drawBankOffice(ctx, W, H * 0.5, t);
  ctx.restore();

  // CRISP CENTER SPLIT DIVIDER LINE
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 5;
  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(0, H * 0.5);
  ctx.lineTo(W, H * 0.5);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Call Connecting Pulsing Badge
  const pulse = Math.abs(Math.sin(t * 4)) * 0.15 + 0.9;
  ctx.save();
  ctx.translate(W / 2, H * 0.5);
  ctx.scale(pulse, pulse);
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.roundRect(-54, -14, 108, 28, 14);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 12px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('📞 ফোন সংযোগ', 0, 0);
  ctx.restore();

  ctx.restore();
}

// 6. Suspense Cliffhanger Outro (পরের পর্বে... সাসপেন্স এন্ডিং)
export function drawSuspenseOutro(ctx, W, H, t) {
  ctx.save();
  // Deep Dramatic Pitch Black / Vignette
  const grad = ctx.createRadialGradient(W / 2, H * 0.38, 20, W / 2, H * 0.45, W * 0.75);
  grad.addColorStop(0, '#292524');
  grad.addColorStop(0.5, '#0c0a09');
  grad.addColorStop(1, '#000000');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Dramatic Overhead Spotlight Cone
  ctx.save();
  ctx.fillStyle = 'rgba(250, 204, 21, 0.04)';
  ctx.beginPath();
  ctx.moveTo(W / 2, 0);
  ctx.lineTo(W * 0.15, H);
  ctx.lineTo(W * 0.85, H);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Floating Mystery Dust Motes
  for (let i = 0; i < 18; i++) {
    const px = (Math.sin(t * 0.8 + i * 1.5) * 0.5 + 0.5) * W;
    const py = ((t * 22 + i * 45) % H);
    ctx.fillStyle = 'rgba(250, 204, 21, 0.25)';
    ctx.beginPath();
    ctx.arc(px, py, (i % 3) + 1, 0, TAU);
    ctx.fill();
  }

  // Suspense Title: "পরের পর্বে..." in Glowing Golden Bengali
  ctx.save();
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 18;
  ctx.fillStyle = '#facc15';
  ctx.font = '900 42px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('পরের পর্বে...', W / 2, H * 0.14);
  ctx.restore();

  drawVignette(ctx, W, H, 0.7);
  ctx.restore();
}

// Shared Soft Dark Vignette Helper
export function drawVignette(ctx, W, H, opacity = 0.5) {
  ctx.save();
  const grad = ctx.createRadialGradient(W / 2, H / 2, W * 0.35, W / 2, H / 2, W * 0.8);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  grad.addColorStop(1, `rgba(0, 0, 0, ${opacity})`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

// 7. Habits & Barrier Stage (প্রতিদিনের অভ্যাস ও কোটি টাকার বাধা)
export function drawHabitsBarrierStage(ctx, W, H, t) {
  ctx.save();
  // Deep elegant indigo/slate gradient
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#090d16');
  grad.addColorStop(0.5, '#0f172a');
  grad.addColorStop(1, '#1e1b4b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Soft overhead spotlight
  ctx.save();
  const spotGrad = ctx.createRadialGradient(W / 2, H * 0.25, 20, W / 2, H * 0.45, W * 0.65);
  spotGrad.addColorStop(0, 'rgba(250, 204, 21, 0.12)');
  spotGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.05)');
  spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = spotGrad;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();

  // Floating glowing coins and money symbols (৳) drifting
  for (let i = 0; i < 9; i++) {
    const px = (W * 0.12 + (i * 97) % (W * 0.78)) + Math.sin(t * 1.5 + i) * 12;
    const py = (H * 0.18 + (i * 83) % (H * 0.48)) + Math.cos(t * 1.2 + i * 2) * 10;
    const scale = 0.8 + 0.3 * Math.sin(t * 2 + i);

    ctx.save();
    ctx.translate(px, py);
    ctx.scale(scale, scale);
    ctx.fillStyle = 'rgba(250, 204, 21, 0.25)';
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, TAU);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'rgba(254, 240, 138, 0.85)';
    ctx.font = '700 14px "Noto Sans Bengali", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('৳', 0, 1);
    ctx.restore();
  }

  // Floor stage
  const floorY = H * 0.68;
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, H);
  floorGrad.addColorStop(0, '#1e293b');
  floorGrad.addColorStop(1, '#090d16');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, W, H - floorY);

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, floorY);
  ctx.lineTo(W, floorY);
  ctx.stroke();

  drawVignette(ctx, W, H, 0.45);
  ctx.restore();
}

// 8. Bengali Roadside Tea Stall & Adda Stage (চা-নাশতা ও আড্ডা)
export function drawTeaStallStage(ctx, W, H, t) {
  ctx.save();
  const isPortrait = W < H;
  const floorY = H * (isPortrait ? 0.78 : 0.84);

  // Warm atmospheric evening street gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  bgGrad.addColorStop(0, '#0c0a09');
  bgGrad.addColorStop(0.5, '#1c1917');
  bgGrad.addColorStop(1, '#292524');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, floorY);

  // Distant warm city street glow
  const streetGlow = ctx.createRadialGradient(W * 0.2, H * 0.3, 20, W * 0.2, H * 0.3, W * 0.6);
  streetGlow.addColorStop(0, 'rgba(251, 146, 60, 0.22)');
  streetGlow.addColorStop(0.6, 'rgba(234, 88, 12, 0.08)');
  streetGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = streetGlow;
  ctx.fillRect(0, 0, W, floorY);

  // Wooden Stall Canopy Roof at top
  const canopyY = H * 0.18;
  ctx.fillStyle = '#451a03';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, canopyY - 20);
  ctx.lineTo(W, canopyY - 20);
  ctx.lineTo(W, canopyY + 18);
  ctx.lineTo(0, canopyY + 18);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Red & White Striped Canopy Trim (ঐতিহ্যবাহী চায়ের দোকানের ছাউনি)
  const stripeW = 32;
  for (let x = 0; x < W; x += stripeW) {
    ctx.fillStyle = (Math.floor(x / stripeW) % 2 === 0) ? '#b91c1c' : '#f8fafc';
    ctx.beginPath();
    ctx.roundRect(x, canopyY + 16, stripeW, 16, [0, 0, 8, 8]);
    ctx.fill();
  }

  // Hanging String of Warm Bulbs
  const bulbs = [
    { x: W * 0.18, y: canopyY + 45 },
    { x: W * 0.38, y: canopyY + 52 },
    { x: W * 0.62, y: canopyY + 50 },
    { x: W * 0.82, y: canopyY + 44 }
  ];
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(0, canopyY + 30);
  bulbs.forEach(b => ctx.lineTo(b.x, b.y - 10));
  ctx.lineTo(W, canopyY + 30);
  ctx.stroke();

  bulbs.forEach(b => {
    // Halo glow
    const bGlow = ctx.createRadialGradient(b.x, b.y, 2, b.x, b.y, 28);
    bGlow.addColorStop(0, 'rgba(254, 240, 138, 0.55)');
    bGlow.addColorStop(0.5, 'rgba(245, 158, 11, 0.18)');
    bGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = bGlow;
    ctx.beginPath(); ctx.arc(b.x, b.y, 28, 0, Math.PI * 2); ctx.fill();

    // Bulb glass
    ctx.fillStyle = '#fef08a';
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(b.x, b.y, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  });

  // Hanging Bunch of Yellow Bananas (কলার ছড়ি)
  const bananaX = W * (isPortrait ? 0.12 : 0.08);
  const bananaY = canopyY + 60;
  ctx.save();
  ctx.fillStyle = '#eab308';
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 1.8;
  for (let b = -2; b <= 2; b++) {
    ctx.beginPath();
    ctx.ellipse(bananaX + b * 7, bananaY + Math.abs(b) * 4, 6, 16, b * 0.15, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
  }
  ctx.restore();

  // Glass Biscuit Jar on wooden wall shelf
  const shelfX = W * (isPortrait ? 0.88 : 0.90);
  const shelfY = canopyY + 65;
  ctx.fillStyle = 'rgba(226, 232, 240, 0.55)';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(shelfX - 20, shelfY - 30, 40, 42, 6);
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#d97706';
  for (let k = 0; k < 3; k++) {
    ctx.fillRect(shelfX - 14, shelfY - 24 + k * 10, 28, 7);
  }

  // Street Floor
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, H);
  floorGrad.addColorStop(0, '#1c1917');
  floorGrad.addColorStop(0.3, '#18181b');
  floorGrad.addColorStop(1, '#09090b');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, W, H - floorY);

  ctx.strokeStyle = '#44403c';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, floorY);
  ctx.lineTo(W, floorY);
  ctx.stroke();

  // Tea Counter Table on left
  const tableX = isPortrait ? W * 0.18 : W * 0.14;
  const tableY = floorY - 70;
  ctx.fillStyle = '#78350f';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(tableX - 55, tableY, 110, 80, 6);
  ctx.fill(); ctx.stroke();

  // Traditional Tea Kettle on Counter with Steam
  const kettleX = tableX;
  const kettleY = tableY - 16;
  ctx.fillStyle = '#e2e8f0';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.arc(kettleX, kettleY, 18, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  // Spout
  ctx.beginPath();
  ctx.moveTo(kettleX - 16, kettleY - 4);
  ctx.lineTo(kettleX - 28, kettleY - 14);
  ctx.stroke();

  // Animated Steam Waves from Kettle
  ctx.save();
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.65)';
  ctx.lineWidth = 2.2;
  ctx.lineCap = 'round';
  for (let s = 0; s < 2; s++) {
    const sx = kettleX - 24 + s * 8;
    const sy = kettleY - 16 - ((t * 26 + s * 18) % 45);
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.quadraticCurveTo(sx + 5, sy - 8, sx, sy - 16);
    ctx.quadraticCurveTo(sx - 5, sy - 24, sx, sy - 30);
    ctx.stroke();
  }
  ctx.restore();

  // Tea Cups & Saucers on Counter
  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.roundRect(tableX + 22, tableY - 12, 18, 12, [2, 2, 4, 4]);
  ctx.fill(); ctx.stroke();

  drawVignette(ctx, W, H, 0.28);
  ctx.restore();
}

// 9. Investment & Compounding Growth Stage (মিউচুয়াল ফান্ড ও ১৫ লাখ টাকা)
export function drawInvestmentStage(ctx, W, H, t) {
  ctx.save();
  // Modern Tech Cyan / Deep Navy Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#061325');
  grad.addColorStop(0.5, '#0b2046');
  grad.addColorStop(1, '#020617');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Digital Grid Lines
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
  ctx.lineWidth = 1;
  const gridStep = 45;
  for (let x = 0; x < W; x += gridStep) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += gridStep) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Glowing Exponential Compounding Curve (12% CAGR Growth Chart)
  const isPortrait = W < H;
  const chartX = isPortrait ? W * 0.10 : W * 0.36;
  const chartW = isPortrait ? W * 0.80 : W * 0.58;
  const chartY = isPortrait ? H * 0.52 : H * 0.60;
  const chartH = isPortrait ? H * 0.24 : H * 0.34;

  // Chart axes
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(chartX, chartY - chartH);
  ctx.lineTo(chartX, chartY);
  ctx.lineTo(chartX + chartW, chartY);
  ctx.stroke();

  // Year Markers on X-Axis
  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 13px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('০ বছর', chartX, chartY + 20);
  ctx.fillText('৫ বছর', chartX + chartW * 0.33, chartY + 20);
  ctx.fillText('১০ বছর', chartX + chartW * 0.66, chartY + 20);
  ctx.fillText('১৫ বছর', chartX + chartW, chartY + 20);

  // Compounding Curve Fill & Stroke
  const curvePoints = [];
  const steps = 30;
  for (let i = 0; i <= steps; i++) {
    const prog = i / steps;
    const px = chartX + prog * chartW;
    // Exponential power curve
    const expFactor = Math.pow(prog, 2.2);
    const py = chartY - expFactor * chartH;
    curvePoints.push({ x: px, y: py });
  }

  // Gradient Area under curve
  const areaGrad = ctx.createLinearGradient(0, chartY - chartH, 0, chartY);
  areaGrad.addColorStop(0, 'rgba(34, 197, 94, 0.35)');
  areaGrad.addColorStop(1, 'rgba(34, 197, 94, 0.02)');
  ctx.fillStyle = areaGrad;
  ctx.beginPath();
  ctx.moveTo(curvePoints[0].x, chartY);
  curvePoints.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(chartX + chartW, chartY);
  ctx.closePath();
  ctx.fill();

  // Bright Emerald/Yellow Curve line with glow
  ctx.save();
  ctx.shadowColor = '#22c55e';
  ctx.shadowBlur = 14;
  ctx.strokeStyle = '#4ade80';
  ctx.lineWidth = 4.0;
  ctx.beginPath();
  ctx.moveTo(curvePoints[0].x, curvePoints[0].y);
  curvePoints.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.stroke();
  ctx.restore();

  // Upward Arrow at peak
  const peak = curvePoints[curvePoints.length - 1];
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(peak.x, peak.y, 8, 0, TAU);
  ctx.fill();

  // Floor
  const floorY = H * 0.70;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, floorY, W, H - floorY);
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, floorY);
  ctx.lineTo(W, floorY);
  ctx.stroke();

  drawVignette(ctx, W, H, 0.4);
  ctx.restore();
}

// 10. One Crore Milestone & Grand Compounding Stage (২৫ বছরে ১ কোটি টাকা)
export function drawCroreMilestoneStage(ctx, W, H, t) {
  ctx.save();
  // Deep Royal Purple / Midnight Gold Gradient
  const grad = ctx.createRadialGradient(W / 2, H * 0.38, 30, W / 2, H * 0.42, W * 0.75);
  grad.addColorStop(0, '#3b0764');
  grad.addColorStop(0.5, '#1e1b4b');
  grad.addColorStop(1, '#090514');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Golden Light Beams sweeping
  ctx.save();
  const beamAngle = Math.sin(t * 0.6) * 0.25;
  ctx.translate(W / 2, 0);
  ctx.rotate(beamAngle);
  ctx.fillStyle = 'rgba(250, 204, 21, 0.08)';
  ctx.beginPath();
  ctx.moveTo(-40, 0);
  ctx.lineTo(40, 0);
  ctx.lineTo(W * 0.65, H);
  ctx.lineTo(-W * 0.65, H);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Drifting Golden Confetti Particles
  for (let i = 0; i < 22; i++) {
    const cx = (W * 0.05 + (i * 73) % (W * 0.9)) + Math.sin(t * 2 + i) * 14;
    const cy = ((t * 45 + i * 58) % H);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(t * 3 + i);
    ctx.fillStyle = (i % 2 === 0) ? '#facc15' : '#fbbf24';
    ctx.fillRect(-4, -6, 8, 12);
    ctx.restore();
  }

  // Floor
  const floorY = H * 0.68;
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, H);
  floorGrad.addColorStop(0, '#2e1065');
  floorGrad.addColorStop(1, '#090514');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, W, H - floorY);

  ctx.strokeStyle = '#facc15';
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 12;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, floorY);
  ctx.lineTo(W, floorY);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Stacks of Gold Bars / Wealth Vault Base on stage
  const vaultX = W * 0.72;
  const vaultY = floorY - 50;
  ctx.fillStyle = '#eab308';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.2;
  for (let layer = 0; layer < 3; layer++) {
    const barsInLayer = 3 - layer;
    for (let b = 0; b < barsInLayer; b++) {
      const bx = vaultX - (barsInLayer * 20) / 2 + b * 22;
      const by = vaultY - layer * 14;
      ctx.beginPath();
      ctx.roundRect(bx, by, 24, 12, 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  drawVignette(ctx, W, H, 0.45);
  ctx.restore();
}

// 11. Discipline vs Impulse Spending Stage (খরচে লাগাম ও ধৈর্য)
export function drawDisciplineStage(ctx, W, H, t) {
  ctx.save();
  // Center Split Comparison Background
  // Left: Reddish Slate (Waste / Unnecessary Adda)
  const leftGrad = ctx.createLinearGradient(0, 0, W * 0.5, 0);
  leftGrad.addColorStop(0, '#1c1917');
  leftGrad.addColorStop(1, '#450a0a');
  ctx.fillStyle = leftGrad;
  ctx.fillRect(0, 0, W * 0.5, H);

  // Right: Lush Emerald Forest (Savings & Compounding Growth)
  const rightGrad = ctx.createLinearGradient(W * 0.5, 0, W, 0);
  rightGrad.addColorStop(0, '#022c22');
  rightGrad.addColorStop(1, '#064e3b');
  ctx.fillStyle = rightGrad;
  ctx.fillRect(W * 0.5, 0, W * 0.5, H);

  // Subtle Center Divider Line
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(W * 0.5, 0);
  ctx.lineTo(W * 0.5, H);
  ctx.stroke();
  ctx.setLineDash([]);

  // Left Side Icon: Crossed-out spending note
  const wasteX = W * 0.22;
  const wasteY = H * 0.32;
  ctx.save();
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(wasteX, wasteY, 32, 0, TAU);
  ctx.stroke();
  ctx.moveTo(wasteX - 22, wasteY - 22);
  ctx.lineTo(wasteX + 22, wasteY + 22);
  ctx.stroke();

  ctx.fillStyle = '#f87171';
  ctx.font = '700 15px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('অপচয় 🛑', wasteX, wasteY + 52);
  ctx.restore();

  // Right Side Icon: Sprouting Golden Wealth Sapling (ধৈর্য্যের গাছ)
  const plantX = W * 0.78;
  const plantY = H * 0.34;
  ctx.save();
  // Pot / Earth
  ctx.fillStyle = '#b45309';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(plantX - 22, plantY + 10, 44, 28, 4);
  ctx.fill(); ctx.stroke();

  // Green stem
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(plantX, plantY + 10);
  ctx.quadraticCurveTo(plantX + 4, plantY - 14, plantX, plantY - 28);
  ctx.stroke();

  // Golden leaves / coins
  ctx.fillStyle = '#facc15';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1.8;
  [-12, 12].forEach((lx, idx) => {
    ctx.beginPath();
    ctx.ellipse(plantX + lx, plantY - 18 + idx * 8, 10, 6, (idx === 0 ? -0.4 : 0.4), 0, TAU);
    ctx.fill(); ctx.stroke();
  });

  ctx.fillStyle = '#4ade80';
  ctx.font = '700 15px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ধৈর্য ও সঞ্চয় 🌱', plantX, plantY + 60);
  ctx.restore();

  // Floor
  const floorY = H * 0.68;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, floorY, W, H - floorY);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(0, floorY); ctx.lineTo(W, floorY); ctx.stroke();

  drawVignette(ctx, W, H, 0.4);
  ctx.restore();
}

// 12. Financial Freedom Sunrise Stage (আগামী দিনের আর্থিক স্বাধীনতা)
export function drawFinancialFreedomStage(ctx, W, H, t) {
  ctx.save();
  // Glorious Sunrise Gradient: Sky from blue to golden amber and peach
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.68);
  skyGrad.addColorStop(0, '#0284c7'); // Clear sky
  skyGrad.addColorStop(0.4, '#38bdf8');
  skyGrad.addColorStop(0.75, '#fb923c'); // Morning orange
  skyGrad.addColorStop(1, '#fde047'); // Golden dawn
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H * 0.68);

  // Rising Sun over horizon with radiant glow
  const sunX = W * 0.5;
  const sunY = H * 0.48;
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, W * 0.45);
  sunGrad.addColorStop(0, '#ffffff');
  sunGrad.addColorStop(0.2, '#fef08a');
  sunGrad.addColorStop(0.6, 'rgba(251, 146, 60, 0.45)');
  sunGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(sunX, sunY, W * 0.45, 0, TAU);
  ctx.fill();

  // City Skyline Silhouettes in the distance
  const cityY = H * 0.52;
  ctx.fillStyle = '#1e293b';
  const buildings = [
    { x: W * 0.05, w: W * 0.12, h: 90 },
    { x: W * 0.18, w: W * 0.09, h: 140 },
    { x: W * 0.28, w: W * 0.14, h: 110 },
    { x: W * 0.62, w: W * 0.12, h: 130 },
    { x: W * 0.75, w: W * 0.08, h: 160 },
    { x: W * 0.84, w: W * 0.12, h: 95 }
  ];
  buildings.forEach(b => {
    ctx.fillRect(b.x, cityY - b.h, b.w, b.h + 80);
  });

  // Flying bird silhouettes soaring across dawn sky
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.4;
  ctx.lineCap = 'round';
  const birds = [
    { x: W * 0.25 + Math.sin(t * 1.2) * 15, y: H * 0.22 },
    { x: W * 0.38 + Math.sin(t * 1.1 + 1) * 15, y: H * 0.16 },
    { x: W * 0.72 + Math.sin(t * 1.3 + 2) * 15, y: H * 0.20 }
  ];
  birds.forEach(b => {
    ctx.beginPath();
    ctx.moveTo(b.x - 12, b.y + 4);
    ctx.quadraticCurveTo(b.x - 6, b.y - 6, b.x, b.y);
    ctx.quadraticCurveTo(b.x + 6, b.y - 6, b.x + 12, b.y + 4);
    ctx.stroke();
  });

  // Modern High Observation Deck / Balcony Floor
  const floorY = H * 0.68;
  const deckGrad = ctx.createLinearGradient(0, floorY, 0, H);
  deckGrad.addColorStop(0, '#334155');
  deckGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = deckGrad;
  ctx.fillRect(0, floorY, W, H - floorY);

  // Modern Glass & Steel Balcony Railing
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(0, floorY - 25);
  ctx.lineTo(W, floorY - 25);
  ctx.stroke();

  drawVignette(ctx, W, H, 0.3);
  ctx.restore();
}

// ============================================================================
// 13. Ancient Desert Sunset Town & Arabian Bazaar (মরুশহর ও প্রাচীন বাজার সূর্যাস্ত)
// Masterpiece 2D animation background matching authentic painterly Ghibli/storybook aesthetic
// ============================================================================

export function drawDesertTownSunset(ctx, W, H, t, opts = {}) {
  ctx.save();
  const isPortrait = W < H;

  // Key horizon & layout coordinates
  const groundY = isPortrait ? H * 0.63 : H * 0.57;
  const sunX = isPortrait ? W * 0.66 : W * 0.64;
  const sunY = isPortrait ? groundY - (H * 0.20) : groundY - (H * 0.22);
  const sunRadius = isPortrait ? 32 : 38;

  // --------------------------------------------------------------------------
  // 1. SKY & CELESTIAL ELEMENTS (আকাশ, অস্তগামী সূর্য, একফালি চাঁদ ও মেঘমালা)
  // --------------------------------------------------------------------------
  const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
  skyGrad.addColorStop(0.00, '#42416b'); // Deep twilight purple-indigo
  skyGrad.addColorStop(0.20, '#5b4e79'); // Dusky violet
  skyGrad.addColorStop(0.40, '#825e83'); // Warm mauve
  skyGrad.addColorStop(0.60, '#b17183'); // Coral rose
  skyGrad.addColorStop(0.78, '#dc8a74'); // Sunset peach
  skyGrad.addColorStop(0.92, '#f8bc67'); // Golden amber
  skyGrad.addColorStop(1.00, '#fee79e'); // Radiant golden horizon
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, groundY + 10);

  // Delicate Crescent Moon high in the upper sky
  const moonX = isPortrait ? W * 0.49 : W * 0.47;
  const moonY = isPortrait ? H * 0.08 : H * 0.09;
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.arc(moonX, moonY, 13, -0.7, 1.9, false);
  ctx.arc(moonX + 5, moonY - 3, 12, 1.9, -0.7, true);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Painterly Volumetric Cumulus Clouds with multi-bubble lobes & sunset rim light
  drawPainterlyCloud(ctx, W * 0.16, H * 0.08, W * 0.36, 75, t * 0.02, '#664d73', '#fba27d');
  drawPainterlyCloud(ctx, W * 0.82, H * 0.12, W * 0.32, 68, -t * 0.015, '#6a4e76', '#fca984');
  drawPainterlyCloud(ctx, W * 0.45, H * 0.16, W * 0.26, 52, t * 0.016, '#7e5880', '#fdb68c');
  drawPainterlyCloud(ctx, W * 0.94, H * 0.22, W * 0.22, 45, -t * 0.01, '#855c82', '#fdc094');

  // Radiant Setting Sun with Multi-layered Corona Bloom & Atmospheric Light Spill
  ctx.save();
  // Huge atmospheric outer glow
  const sunOuterGrad = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.6, sunX, sunY, W * 0.48);
  sunOuterGrad.addColorStop(0.0, 'rgba(255, 245, 190, 0.95)');
  sunOuterGrad.addColorStop(0.2, 'rgba(254, 215, 140, 0.65)');
  sunOuterGrad.addColorStop(0.5, 'rgba(244, 114, 182, 0.20)');
  sunOuterGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sunOuterGrad;
  ctx.beginPath();
  ctx.arc(sunX, sunY, W * 0.48, 0, TAU);
  ctx.fill();

  // Medium Corona Ring
  const coronaGrad = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.8, sunX, sunY, sunRadius * 2.2);
  coronaGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  coronaGrad.addColorStop(0.5, 'rgba(254, 240, 138, 0.8)');
  coronaGrad.addColorStop(1, 'rgba(251, 146, 60, 0)');
  ctx.fillStyle = coronaGrad;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunRadius * 2.2, 0, TAU);
  ctx.fill();

  // Sun Core Disc
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#fde047';
  ctx.shadowBlur = 32;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunRadius, 0, TAU);
  ctx.fill();
  ctx.restore();

  // --------------------------------------------------------------------------
  // 2. DISTANT MOUNTAIN RANGES & ATMOSPHERIC HAZE (দূরবর্তী পর্বতমালা)
  // --------------------------------------------------------------------------
  // Far Mountain Ridge (Soft Atmospheric Lavender)
  ctx.save();
  ctx.fillStyle = '#7a5e84';
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(0, groundY - H * 0.12);
  const farPeaks = [
    { x: W * 0.10, y: groundY - H * 0.17 },
    { x: W * 0.24, y: groundY - H * 0.13 },
    { x: W * 0.36, y: groundY - H * 0.10 },
    { x: W * 0.50, y: groundY - H * 0.15 },
    { x: W * 0.62, y: groundY - H * 0.12 },
    { x: W * 0.78, y: groundY - H * 0.18 },
    { x: W * 0.90, y: groundY - H * 0.13 },
    { x: W, y: groundY - H * 0.15 }
  ];
  farPeaks.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(W, groundY);
  ctx.closePath();
  ctx.fill();

  // Mid Mountain Ridge with Sunset Edge Rim Glow
  const midGrad = ctx.createLinearGradient(0, groundY - H * 0.15, 0, groundY);
  midGrad.addColorStop(0, '#9c667f');
  midGrad.addColorStop(0.7, '#c57b7a');
  midGrad.addColorStop(1, '#e69a7c');
  ctx.fillStyle = midGrad;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(0, groundY - H * 0.09);
  const midPeaks = [
    { x: W * 0.16, y: groundY - H * 0.13 },
    { x: W * 0.30, y: groundY - H * 0.07 },
    { x: W * 0.44, y: groundY - H * 0.11 },
    { x: W * 0.58, y: groundY - H * 0.15 },
    { x: W * 0.72, y: groundY - H * 0.10 },
    { x: W * 0.86, y: groundY - H * 0.14 },
    { x: W, y: groundY - H * 0.08 }
  ];
  midPeaks.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(W, groundY);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Distant City Skyline Silhouette (Far minarets, domes, walls in golden haze)
  drawFarSkylineHaze(ctx, W, groundY, isPortrait);

  // --------------------------------------------------------------------------
  // 3. DATE PALM TREES (BACKGROUND & MIDGROUND) (খেজুর গাছ)
  // --------------------------------------------------------------------------
  // Left palm group behind the rose dome
  drawDetailedPalm(ctx, W * 0.30, groundY - 8, isPortrait ? 125 : 155, t, 0.0);
  drawDetailedPalm(ctx, W * 0.34, groundY - 4, isPortrait ? 100 : 130, t, 1.2);
  // Right palm cluster near the palace
  drawDetailedPalm(ctx, W * 0.93, groundY + 12, isPortrait ? 135 : 170, t, 2.1);
  drawDetailedPalm(ctx, W * 0.97, groundY + 22, isPortrait ? 110 : 140, t, 0.7);

  // --------------------------------------------------------------------------
  // 4. MIDGROUND ANCIENT ADOBE ARCHITECTURE & CITADEL (প্রাচীন দুর্গ ও স্থাপত্য)
  // --------------------------------------------------------------------------
  // Left Fortress Stone Tower with Cannon & Hanging Lanterns
  drawFortressTowerWithCannon(ctx, W, H, groundY, isPortrait, t);

  // Rose-Terracotta Domed Mosque / Pavilion (Left of Center)
  drawRoseDomePavilion(ctx, W, H, groundY, isPortrait, t);

  // Central Tall Desert Minaret / Watchtower with Projecting Timber Beams (Vigas)
  drawCentralWatchtower(ctx, W, H, groundY, isPortrait, t);

  // Midground Adobe Residential Houses & Arched Street Alleys
  drawMidgroundAdobeHouses(ctx, W, H, groundY, isPortrait, t);

  // Right Golden-Sunlit Palace & Mosque with Glowing Arched Gateway
  drawRightPalaceAndDome(ctx, W, H, groundY, isPortrait, t);

  // --------------------------------------------------------------------------
  // 5. GROUND, DESERT PLAZA & DRAMATIC CAST SHADOWS (মরুশহর প্রাঙ্গণ ও ছায়া)
  // --------------------------------------------------------------------------
  drawDesertGroundAndShadows(ctx, W, H, groundY, sunX, sunY, isPortrait, t);

  // --------------------------------------------------------------------------
  // 6. FOREGROUND MARKET STALLS, AWNINGS & PROPS (বাজারের তাবু, পিপা, মাটির কলসি)
  // --------------------------------------------------------------------------
  drawMarketStallsAndProps(ctx, W, H, groundY, isPortrait, t);

  // --------------------------------------------------------------------------
  // 7. ATMOSPHERIC SUNBEAM RAYS, DUST MOTES & VIGNETTE (সূর্যের রশ্মি ও ধূলিকণা)
  // --------------------------------------------------------------------------
  drawSunbeamLightSpill(ctx, W, H, sunX, sunY, groundY, t);
  drawAtmosphericDustMotes(ctx, W, H, t);
  drawVignette(ctx, W, H, 0.28);

  ctx.restore();
}

// Aliases for intuitive semantic use across different stories
export const drawArabianMarketSunset = drawDesertTownSunset;
export const drawAncientDesertTown = drawDesertTownSunset;
export const drawHistoricalTownSunset = drawDesertTownSunset;

// ----------------------------------------------------------------------------
// HELPER DRAWING SUB-ROUTINES FOR ANCIENT DESERT SUNSET TOWN
// ----------------------------------------------------------------------------

// Painterly Volumetric Cumulus Cloud with multi-bubble rounded lobes and soft rim lighting
function drawPainterlyCloud(ctx, cx, cy, w, h, tOffset, shadowColor, highlightColor) {
  ctx.save();
  const floatX = cx + Math.sin(tOffset) * 10;
  const floatY = cy + Math.cos(tOffset * 0.8) * 3;

  // Natural fluffy cloud cluster using circular/soft rounded puffs
  const baseR = h * 0.48;
  const puffs = [
    { dx: 0, dy: 0, rx: baseR * 1.35, ry: baseR * 1.05 },
    { dx: -baseR * 1.1, dy: baseR * 0.18, rx: baseR * 1.0, ry: baseR * 0.85 },
    { dx: baseR * 1.1, dy: baseR * 0.15, rx: baseR * 1.05, ry: baseR * 0.85 },
    { dx: -baseR * 0.6, dy: -baseR * 0.35, rx: baseR * 1.15, ry: baseR * 0.95 },
    { dx: baseR * 0.55, dy: -baseR * 0.32, rx: baseR * 1.1, ry: baseR * 0.9 }
  ];

  // Base shadow fill
  ctx.fillStyle = shadowColor;
  ctx.beginPath();
  puffs.forEach(p => {
    ctx.moveTo(floatX + p.dx + p.rx, floatY + p.dy);
    ctx.ellipse(floatX + p.dx, floatY + p.dy, p.rx, p.ry, 0, 0, TAU);
  });
  ctx.fill();

  // Sunlit top highlight puffs (offset upward towards light)
  ctx.fillStyle = highlightColor;
  ctx.beginPath();
  puffs.forEach(p => {
    const hlRx = p.rx * 0.88;
    const hlRy = p.ry * 0.82;
    ctx.moveTo(floatX + p.dx + hlRx, floatY + p.dy - baseR * 0.22);
    ctx.ellipse(floatX + p.dx, floatY + p.dy - baseR * 0.22, hlRx, hlRy, 0, 0, TAU);
  });
  ctx.fill();

  // Gentle white-gold top-edge highlight
  ctx.fillStyle = 'rgba(255, 248, 220, 0.45)';
  ctx.beginPath();
  ctx.ellipse(floatX - baseR * 0.3, floatY - baseR * 0.45, baseR * 0.7, baseR * 0.35, 0, 0, TAU);
  ctx.fill();

  ctx.restore();
}

// Distant City Skyline in golden sunset haze
function drawFarSkylineHaze(ctx, W, groundY, isPortrait) {
  ctx.save();
  const hazeGrad = ctx.createLinearGradient(0, groundY - 80, 0, groundY);
  hazeGrad.addColorStop(0, 'rgba(215, 142, 118, 0.7)');
  hazeGrad.addColorStop(1, 'rgba(248, 180, 102, 0.9)');
  ctx.fillStyle = hazeGrad;

  // Far spires, domes, towers
  const farBuildings = [
    { x: W * 0.38, w: W * 0.05, h: 48 },
    { x: W * 0.44, w: W * 0.04, h: 62 },
    { x: W * 0.50, w: W * 0.06, h: 42 },
    { x: W * 0.57, w: W * 0.05, h: 54 },
    { x: W * 0.63, w: W * 0.04, h: 36 },
    { x: W * 0.68, w: W * 0.06, h: 46 }
  ];
  farBuildings.forEach(b => {
    ctx.fillRect(b.x, groundY - b.h, b.w, b.h);
    // Tiny dome or pyramid roof
    ctx.beginPath();
    ctx.arc(b.x + b.w / 2, groundY - b.h, b.w / 2, Math.PI, 0);
    ctx.fill();
  });
  ctx.restore();
}

// Detailed Date Palm Tree with segmented trunk and swaying fronds
function drawDetailedPalm(ctx, x, baseY, height, t, swayPhase) {
  ctx.save();
  const sway = Math.sin(t * 1.5 + swayPhase) * 6;
  const topX = x + sway;
  const topY = baseY - height;

  // Segmented Trunk with slight organic curve
  ctx.save();
  ctx.strokeStyle = '#5c3a27';
  ctx.lineWidth = 9;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, baseY);
  ctx.quadraticCurveTo(x + sway * 0.3 - 4, baseY - height * 0.5, topX, topY);
  ctx.stroke();

  // Bark ridge texture lines
  ctx.strokeStyle = '#7c4f34';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x + 2, baseY);
  ctx.quadraticCurveTo(x + sway * 0.3 - 2, baseY - height * 0.5, topX + 2, topY);
  ctx.stroke();
  ctx.restore();

  // Drooping Feathered Palm Fronds radiating from top (Lush filled fronds)
  const frondCount = 10;
  const frondColors = ['#284227', '#365934', '#456e43', '#223820'];
  for (let i = 0; i < frondCount; i++) {
    const angle = (TAU / frondCount) * i + Math.sin(t * 1.5 + swayPhase + i) * 0.05;
    const frondLen = height * 0.44 + (i % 3) * 10;
    const endX = topX + Math.cos(angle) * frondLen;
    const endY = topY + Math.sin(angle) * (frondLen * 0.55) + 16;
    const ctrlX = topX + Math.cos(angle) * (frondLen * 0.6);
    const ctrlY = topY - 18;

    ctx.save();
    ctx.fillStyle = frondColors[i % frondColors.length];
    ctx.strokeStyle = '#182b17';
    ctx.lineWidth = 1.2;

    // Curved palm blade
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.quadraticCurveTo(ctrlX - 6, ctrlY, endX, endY);
    ctx.quadraticCurveTo(ctrlX + 6, ctrlY + 8, topX, topY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Leaflet side pinnate lines
    ctx.strokeStyle = frondColors[(i + 1) % frondColors.length];
    ctx.lineWidth = 1.8;
    for (let step = 0.25; step <= 0.85; step += 0.12) {
      const lx = topX + (endX - topX) * step;
      const ly = topY + (endY - topY) * step;
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(lx - 9, ly + 10);
      ctx.moveTo(lx, ly);
      ctx.lineTo(lx + 9, ly + 10);
      ctx.stroke();
    }
    ctx.restore();
  }
  ctx.restore();
}

// Left Fortified Stone Tower with Cannon, Crenellations & Hanging Lantern String
function drawFortressTowerWithCannon(ctx, W, H, groundY, isPortrait, t) {
  ctx.save();
  const towerW = isPortrait ? W * 0.28 : W * 0.19;
  const towerH = isPortrait ? H * 0.42 : H * 0.38;
  const towerX = isPortrait ? W * 0.02 : W * 0.03;
  const towerY = groundY - towerH;

  // Adobe Stone Tower Base & Walls with warm sunset masonry shading
  const wallGrad = ctx.createLinearGradient(towerX, towerY, towerX + towerW, towerY);
  wallGrad.addColorStop(0.0, '#754a3e'); // Shadowed left
  wallGrad.addColorStop(0.35, '#8c5a4b');
  wallGrad.addColorStop(1.0, '#ad735e'); // Sun-warmed right edge
  ctx.fillStyle = wallGrad;
  ctx.fillRect(towerX, towerY, towerW, towerH + 20);

  // Stone block mortar lines
  ctx.strokeStyle = '#5a362b';
  ctx.lineWidth = 1.5;
  for (let r = towerY + 30; r < groundY; r += 28) {
    ctx.beginPath();
    ctx.moveTo(towerX, r);
    ctx.lineTo(towerX + towerW, r);
    ctx.stroke();
  }

  // Notched Crenellations (Battlements on top)
  const numCrenels = 4;
  const cWidth = towerW / (numCrenels * 2 - 1);
  const cHeight = 22;
  ctx.fillStyle = '#8c5a4b';
  for (let c = 0; c < numCrenels; c++) {
    const cx = towerX + c * cWidth * 2;
    ctx.fillRect(cx, towerY - cHeight, cWidth, cHeight);
    ctx.strokeStyle = '#5a362b';
    ctx.lineWidth = 1.8;
    ctx.strokeRect(cx, towerY - cHeight, cWidth, cHeight);
  }

  // Deep Arched Windows
  const winY1 = towerY + 54;
  const winY2 = towerY + 120;
  [winY1, winY2].forEach((wy, idx) => {
    const wx = towerX + towerW * (idx === 0 ? 0.42 : 0.36);
    ctx.fillStyle = '#2a1a15';
    ctx.beginPath();
    ctx.roundRect(wx - 10, wy, 20, 36, [10, 10, 2, 2]);
    ctx.fill();
    ctx.strokeStyle = '#543026';
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Authentic Rooftop Cannon perched atop the fortress deck
  const cannonBaseX = towerX + towerW * 0.55;
  const cannonBaseY = towerY - cHeight - 6;
  ctx.save();
  // Wooden wheeled carriage
  ctx.fillStyle = '#5c3a27';
  ctx.strokeStyle = '#2a1a15';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cannonBaseX - 8, cannonBaseY + 6, 12, 0, TAU); // Big carriage wheel
  ctx.fill(); ctx.stroke();
  // Spokes
  ctx.strokeStyle = '#2a1a15';
  ctx.beginPath();
  ctx.moveTo(cannonBaseX - 20, cannonBaseY + 6);
  ctx.lineTo(cannonBaseX + 4, cannonBaseY + 6);
  ctx.moveTo(cannonBaseX - 8, cannonBaseY - 6);
  ctx.lineTo(cannonBaseX - 8, cannonBaseY + 18);
  ctx.stroke();

  // Iron Cannon Barrel angled towards the sky
  ctx.save();
  ctx.translate(cannonBaseX, cannonBaseY);
  ctx.rotate(-0.35); // 20-degree upward tilt
  const cannonGrad = ctx.createLinearGradient(0, -7, 0, 7);
  cannonGrad.addColorStop(0, '#4b4847');
  cannonGrad.addColorStop(0.5, '#262423');
  cannonGrad.addColorStop(1, '#111010');
  ctx.fillStyle = cannonGrad;
  ctx.beginPath();
  ctx.roundRect(-12, -7, 44, 14, [4, 7, 7, 4]);
  ctx.fill();
  // Muzzle rim
  ctx.fillStyle = '#1c1917';
  ctx.fillRect(30, -9, 5, 18);
  ctx.restore();
  ctx.restore();

  // Forged Iron Wall Bracket with Warm Glowing Lantern
  const bracketX = towerX + towerW + 4;
  const bracketY = towerY + 80;
  ctx.save();
  ctx.strokeStyle = '#27272a';
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.moveTo(towerX + towerW, bracketY);
  ctx.lineTo(bracketX + 16, bracketY);
  ctx.quadraticCurveTo(bracketX + 22, bracketY + 4, bracketX + 20, bracketY + 16);
  ctx.stroke();

  // Glowing Lantern
  const lanternX = bracketX + 18;
  const lanternY = bracketY + 22;
  const lanternGlow = ctx.createRadialGradient(lanternX, lanternY, 2, lanternX, lanternY, 48);
  lanternGlow.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
  lanternGlow.addColorStop(0.4, 'rgba(251, 146, 60, 0.55)');
  lanternGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = lanternGlow;
  ctx.beginPath();
  ctx.arc(lanternX, lanternY, 48, 0, TAU);
  ctx.fill();

  // Lantern glass & metal frame
  ctx.fillStyle = '#fef08a';
  ctx.strokeStyle = '#18181b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(lanternX - 7, lanternY - 10, 14, 20, 3);
  ctx.fill(); ctx.stroke();
  ctx.restore();

  // Festoon String of Fairy Light Bulbs draped from tower towards center
  drawFestiveBulbString(ctx, towerX + towerW * 0.1, towerY + 15, towerX + towerW + (isPortrait ? 80 : 130), towerY + 95, 24, t);

  ctx.restore();
}

// Festoon hanging bulb string with gentle sway
function drawFestiveBulbString(ctx, x1, y1, x2, y2, sag, t) {
  ctx.save();
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 + sag + Math.sin(t * 1.4) * 2;

  // Connecting wire
  ctx.strokeStyle = '#27272a';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo(midX, midY, x2, y2);
  ctx.stroke();

  // Hanging glowing light bulbs
  const numBulbs = 6;
  for (let b = 1; b < numBulbs; b++) {
    const prog = b / numBulbs;
    // Quadratic bezier point
    const bx = (1 - prog) * (1 - prog) * x1 + 2 * (1 - prog) * prog * midX + prog * prog * x2;
    const by = (1 - prog) * (1 - prog) * y1 + 2 * (1 - prog) * prog * midY + prog * prog * y2;

    // Bulb glow
    const bulbGlow = ctx.createRadialGradient(bx, by + 4, 1, bx, by + 4, 16);
    bulbGlow.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
    bulbGlow.addColorStop(0.5, 'rgba(251, 146, 60, 0.4)');
    bulbGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = bulbGlow;
    ctx.beginPath();
    ctx.arc(bx, by + 4, 16, 0, TAU);
    ctx.fill();

    // Bulb glass
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(bx, by + 4, 3.5, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

// Rose-Terracotta Domed Mosque / Pavilion with arched windows and cloth awning
function drawRoseDomePavilion(ctx, W, H, groundY, isPortrait, t) {
  ctx.save();
  const bW = isPortrait ? W * 0.22 : W * 0.16;
  const bX = isPortrait ? W * 0.22 : W * 0.21;
  const wallH = isPortrait ? H * 0.24 : H * 0.22;
  const wallY = groundY - wallH;

  // Base building walls (Warm sandstone/clay)
  const wallGrad = ctx.createLinearGradient(bX, wallY, bX + bW, wallY);
  wallGrad.addColorStop(0, '#8d5a49');
  wallGrad.addColorStop(1, '#af745e');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(bX, wallY, bW, wallH);
  ctx.strokeStyle = '#5a362b';
  ctx.lineWidth = 2;
  ctx.strokeRect(bX, wallY, bW, wallH);

  // Arched windows in drum base
  const winCount = 3;
  const winW = 12;
  const winH = 22;
  for (let i = 0; i < winCount; i++) {
    const wx = bX + (bW / (winCount + 1)) * (i + 1);
    ctx.fillStyle = '#2a1a15';
    ctx.beginPath();
    ctx.roundRect(wx - winW / 2, wallY + 28, winW, winH, [winW / 2, winW / 2, 2, 2]);
    ctx.fill();
  }

  // Beautiful Bulbous Rose-Terracotta Onion Dome
  const domeRadius = bW * 0.52;
  const domeCenterX = bX + bW / 2;
  const domeCenterY = wallY;

  ctx.save();
  const domeGrad = ctx.createRadialGradient(
    domeCenterX + domeRadius * 0.35, domeCenterY - domeRadius * 0.4, domeRadius * 0.1,
    domeCenterX, domeCenterY, domeRadius * 1.1
  );
  domeGrad.addColorStop(0.0, '#d9727e'); // Golden-pink sun highlight
  domeGrad.addColorStop(0.35, '#b04a5c'); // Deep rose
  domeGrad.addColorStop(0.85, '#782d3b'); // Rich terracotta-crimson shadow
  domeGrad.addColorStop(1.0, '#531d27');
  ctx.fillStyle = domeGrad;

  // Dome shape with pointy onion arch tip
  ctx.beginPath();
  ctx.moveTo(domeCenterX - domeRadius, domeCenterY);
  ctx.bezierCurveTo(
    domeCenterX - domeRadius * 1.15, domeCenterY - domeRadius * 0.65,
    domeCenterX - domeRadius * 0.35, domeCenterY - domeRadius * 1.35,
    domeCenterX, domeCenterY - domeRadius * 1.45
  );
  ctx.bezierCurveTo(
    domeCenterX + domeRadius * 0.35, domeCenterY - domeRadius * 1.35,
    domeCenterX + domeRadius * 1.15, domeCenterY - domeRadius * 0.65,
    domeCenterX + domeRadius, domeCenterY
  );
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#531d27';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Brass Spire & Crescent Finial
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(domeCenterX, domeCenterY - domeRadius * 1.45);
  ctx.lineTo(domeCenterX, domeCenterY - domeRadius * 1.45 - 22);
  ctx.stroke();
  // Tiny crescent tip
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(domeCenterX, domeCenterY - domeRadius * 1.45 - 24, 5, 0, TAU);
  ctx.fill();
  ctx.restore();

  // Slanted Canvas Cloth Awning / Sunshade below dome
  const awningW = bW * 1.15;
  const awningH = 24;
  const awningY = wallY + wallH * 0.48;
  const awningX = bX - (awningW - bW) / 2;

  ctx.fillStyle = '#c89a65';
  ctx.strokeStyle = '#7c4d28';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(awningX, awningY);
  ctx.lineTo(awningX + awningW, awningY);
  ctx.lineTo(awningX + awningW + 10, awningY + awningH);
  ctx.lineTo(awningX - 10, awningY + awningH);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Wooden support struts
  ctx.strokeStyle = '#5c3a27';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(awningX + 6, awningY + awningH);
  ctx.lineTo(awningX + 6, groundY);
  ctx.moveTo(awningX + awningW - 6, awningY + awningH);
  ctx.lineTo(awningX + awningW - 6, groundY);
  ctx.stroke();

  ctx.restore();
}

// Central Tall Desert Minaret / Watchtower with Projecting Timber Beams (Vigas)
function drawCentralWatchtower(ctx, W, H, groundY, isPortrait, t) {
  ctx.save();
  const minW = isPortrait ? W * 0.16 : W * 0.11;
  const minX = isPortrait ? W * 0.48 : W * 0.46;
  const minH = isPortrait ? H * 0.40 : H * 0.36;
  const minY = groundY - minH;

  // Tower Body Gradient (Warm ochre/sandstone clay)
  const towerGrad = ctx.createLinearGradient(minX, minY, minX + minW, minY);
  towerGrad.addColorStop(0.0, '#7c4f40');
  towerGrad.addColorStop(0.4, '#996350');
  towerGrad.addColorStop(1.0, '#bd7e66'); // Sunlit right side
  ctx.fillStyle = towerGrad;
  ctx.fillRect(minX, minY, minW, minH);
  ctx.strokeStyle = '#5c372b';
  ctx.lineWidth = 2;
  ctx.strokeRect(minX, minY, minW, minH);

  // Stepped notched crenellations at top
  const crenW = minW / 5;
  ctx.fillStyle = '#996350';
  for (let k = 0; k < 3; k++) {
    ctx.fillRect(minX + k * crenW * 2, minY - 14, crenW, 14);
  }

  // Projecting Timber Beams (Vigas) extending horizontally
  ctx.strokeStyle = '#4a2818';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  const beamYLevels = [minY + 36, minY + 84, minY + 140];
  beamYLevels.forEach(by => {
    // Left projecting beam
    ctx.beginPath();
    ctx.moveTo(minX - 8, by);
    ctx.lineTo(minX + 6, by);
    ctx.stroke();
    // Right projecting beam
    ctx.beginPath();
    ctx.moveTo(minX + minW - 6, by);
    ctx.lineTo(minX + minW + 8, by);
    ctx.stroke();
  });

  // Arched Viewing Windows & Balcony Gallery
  const winY = minY + 48;
  ctx.fillStyle = '#24140f';
  ctx.beginPath();
  ctx.roundRect(minX + minW * 0.32, winY, minW * 0.36, 32, [8, 8, 2, 2]);
  ctx.fill();

  // Arched Ground Doorway with Warm Interior Lantern Light
  const doorW = minW * 0.44;
  const doorH = 38;
  const doorX = minX + (minW - doorW) / 2;
  const doorY = groundY - doorH;

  // Doorway glow
  const doorGlow = ctx.createRadialGradient(doorX + doorW / 2, doorY + doorH / 2, 2, doorX + doorW / 2, doorY + doorH / 2, 28);
  doorGlow.addColorStop(0, '#fef08a');
  doorGlow.addColorStop(0.6, '#ea580c');
  doorGlow.addColorStop(1, '#24140f');
  ctx.fillStyle = doorGlow;
  ctx.beginPath();
  ctx.roundRect(doorX, doorY, doorW, doorH, [doorW / 2, doorW / 2, 2, 2]);
  ctx.fill();

  ctx.restore();
}

// Midground Adobe Residential Houses & Street Alleys
function drawMidgroundAdobeHouses(ctx, W, H, groundY, isPortrait, t) {
  ctx.save();
  const houses = [
    { x: W * 0.37, w: W * 0.08, h: H * 0.18, color: '#9d6653' },
    { x: W * 0.41, w: W * 0.07, h: H * 0.22, color: '#885544' },
    { x: W * 0.54, w: W * 0.10, h: H * 0.19, color: '#a36d59' },
    { x: W * 0.61, w: W * 0.08, h: H * 0.15, color: '#95604d' }
  ];

  houses.forEach(h => {
    ctx.fillStyle = h.color;
    ctx.fillRect(h.x, groundY - h.h, h.w, h.h);
    ctx.strokeStyle = '#5c372b';
    ctx.lineWidth = 1.8;
    ctx.strokeRect(h.x, groundY - h.h, h.w, h.h);

    // Flat roof parapet
    ctx.fillStyle = '#6e3f32';
    ctx.fillRect(h.x - 2, groundY - h.h, h.w + 4, 6);

    // Arched door or window
    ctx.fillStyle = '#26150f';
    ctx.beginPath();
    ctx.roundRect(h.x + h.w * 0.35, groundY - h.h + 20, h.w * 0.30, 22, [6, 6, 2, 2]);
    ctx.fill();
  });
  ctx.restore();
}

// Right Golden-Sunlit Palace & Mosque with Glowing Arched Gateway
function drawRightPalaceAndDome(ctx, W, H, groundY, isPortrait, t) {
  ctx.save();
  const palW = isPortrait ? W * 0.24 : W * 0.18;
  const palX = isPortrait ? W * 0.68 : W * 0.68;
  const palH = isPortrait ? H * 0.28 : H * 0.25;
  const palY = groundY - palH;

  // Palace Walls bathed in warm golden sunset light
  const wallGrad = ctx.createLinearGradient(palX, palY, palX + palW, palY);
  wallGrad.addColorStop(0.0, '#a26b58');
  wallGrad.addColorStop(0.6, '#c4856f');
  wallGrad.addColorStop(1.0, '#e5a289'); // Radiant right side
  ctx.fillStyle = wallGrad;
  ctx.fillRect(palX, palY, palW, palH);
  ctx.strokeStyle = '#6e4032';
  ctx.lineWidth = 2;
  ctx.strokeRect(palX, palY, palW, palH);

  // Stepped upper terrace
  ctx.fillStyle = '#b77964';
  ctx.fillRect(palX + 12, palY - 18, palW - 24, 18);
  ctx.strokeRect(palX + 12, palY - 18, palW - 24, 18);

  // Golden Sunlit Mosque Dome
  const domeRadius = (palW - 32) * 0.48;
  const domeX = palX + palW / 2;
  const domeY = palY - 18;

  ctx.save();
  const domeGrad = ctx.createRadialGradient(
    domeX + domeRadius * 0.4, domeY - domeRadius * 0.4, domeRadius * 0.1,
    domeX, domeY, domeRadius * 1.1
  );
  domeGrad.addColorStop(0.0, '#fef08a'); // Brilliant sun reflection
  domeGrad.addColorStop(0.4, '#f59e0b');
  domeGrad.addColorStop(0.85, '#b45309');
  domeGrad.addColorStop(1.0, '#78350f');
  ctx.fillStyle = domeGrad;
  ctx.beginPath();
  ctx.arc(domeX, domeY, domeRadius, Math.PI, 0);
  ctx.fill();
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Brass spire
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(domeX, domeY - domeRadius);
  ctx.lineTo(domeX, domeY - domeRadius - 16);
  ctx.stroke();
  ctx.restore();

  // Grand Arched Palace Portal with Light Streaming Outward
  const gateW = palW * 0.38;
  const gateH = 48;
  const gateX = palX + palW * 0.32;
  const gateY = groundY - gateH;

  // Spilling golden portal light
  ctx.save();
  const portalGlow = ctx.createRadialGradient(gateX + gateW / 2, gateY + gateH / 2, 2, gateX + gateW / 2, gateY + gateH / 2, 45);
  portalGlow.addColorStop(0, '#ffffff');
  portalGlow.addColorStop(0.3, '#fef08a');
  portalGlow.addColorStop(0.7, '#f97316');
  portalGlow.addColorStop(1, '#451a03');
  ctx.fillStyle = portalGlow;
  ctx.beginPath();
  ctx.roundRect(gateX, gateY, gateW, gateH, [gateW / 2, gateW / 2, 2, 2]);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

// Desert Ground, Town Square & Dramatic Sunset Cast Shadows
function drawDesertGroundAndShadows(ctx, W, H, groundY, sunX, sunY, isPortrait, t) {
  ctx.save();

  // Warm desert sand & clay ground gradient
  const groundGrad = ctx.createLinearGradient(0, groundY, 0, H);
  groundGrad.addColorStop(0.00, '#e49f69'); // Sunlit golden ochre
  groundGrad.addColorStop(0.35, '#c9804e');
  groundGrad.addColorStop(0.70, '#a55e37');
  groundGrad.addColorStop(1.00, '#6d3923'); // Deep earthy foreground
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, groundY, W, H - groundY);

  // Soft Horizon Boundary Line
  ctx.strokeStyle = '#99593a';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(W, groundY);
  ctx.stroke();

  // Dramatic Diagonal Cast Shadows stretching from left buildings across the plaza
  ctx.save();
  ctx.fillStyle = 'rgba(74, 34, 25, 0.38)'; // Cool violet-red cast shadow tone
  // Shadow from Left Fortress Tower
  ctx.beginPath();
  ctx.moveTo(W * 0.02, groundY);
  ctx.lineTo(W * 0.28, groundY);
  ctx.lineTo(W * 0.48, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fill();

  // Shadow from Dome Pavilion
  ctx.beginPath();
  ctx.moveTo(W * 0.22, groundY);
  ctx.lineTo(W * 0.38, groundY);
  ctx.lineTo(W * 0.62, H * 0.82);
  ctx.lineTo(W * 0.44, H * 0.82);
  ctx.closePath();
  ctx.fill();

  // Shadow from Central Tower
  ctx.beginPath();
  ctx.moveTo(W * 0.46, groundY);
  ctx.lineTo(W * 0.54, groundY);
  ctx.lineTo(W * 0.76, H * 0.78);
  ctx.lineTo(W * 0.68, H * 0.78);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Scattered Desert Rocks & Pebbles with mini cast shadows
  const rocks = [
    { x: W * 0.48, y: groundY + 45, r: 8 },
    { x: W * 0.66, y: groundY + 70, r: 12 },
    { x: W * 0.28, y: groundY + 95, r: 7 },
    { x: W * 0.54, y: groundY + 130, r: 10 }
  ];
  rocks.forEach(rk => {
    // Mini shadow
    ctx.fillStyle = 'rgba(74, 34, 25, 0.4)';
    ctx.beginPath();
    ctx.ellipse(rk.x + rk.r * 1.2, rk.y + rk.r * 0.4, rk.r * 1.6, rk.r * 0.6, 0.2, 0, TAU);
    ctx.fill();
    // Rock body
    ctx.fillStyle = '#8b5a45';
    ctx.beginPath();
    ctx.roundRect(rk.x - rk.r, rk.y - rk.r * 0.8, rk.r * 2, rk.r * 1.4, 4);
    ctx.fill();
    // Sunlit top edge
    ctx.fillStyle = '#dca078';
    ctx.fillRect(rk.x - rk.r + 2, rk.y - rk.r * 0.8, rk.r * 1.5, 3);
  });

  ctx.restore();
}

// Foreground Market Stalls, Canopies, Crates, Barrels & Clay Pots (মটকা ও কলসি)
function drawMarketStallsAndProps(ctx, W, H, groundY, isPortrait, t) {
  ctx.save();

  // LEFT MARKET STALL PROPS: Stacked wooden crates & earthen clay jars
  const leftX = isPortrait ? W * 0.26 : W * 0.24;
  const leftY = groundY + 12;

  // Wooden Crates
  ctx.fillStyle = '#7c4d28';
  ctx.strokeStyle = '#422410';
  ctx.lineWidth = 1.8;
  ctx.fillRect(leftX, leftY - 24, 28, 24);
  ctx.strokeRect(leftX, leftY - 24, 28, 24);
  ctx.fillRect(leftX + 26, leftY - 18, 22, 18);
  ctx.strokeRect(leftX + 26, leftY - 18, 22, 18);

  // Earthen Clay Pots / Amphorae (মটকা ও কলসি)
  drawClayPot(ctx, leftX + 56, leftY - 4, 1.2, '#aa5839');
  drawClayPot(ctx, leftX + 72, leftY - 2, 0.9, '#c26e4e');

  // RIGHT FOREGROUND MARKET TENT & PROPS (লাল/বাদামি তাবু, কাঠের পিপা ও মটকা)
  const tentX = isPortrait ? W * 0.74 : W * 0.78;
  const tentY = isPortrait ? groundY + 45 : groundY + 30;
  const tentW = isPortrait ? W * 0.26 : W * 0.22;
  const tentH = isPortrait ? H * 0.22 : H * 0.24;

  // Wooden Tent Frame Poles
  ctx.strokeStyle = '#543018';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(tentX, tentY + tentH);
  ctx.lineTo(tentX + 10, tentY);
  ctx.moveTo(tentX + tentW, tentY + tentH);
  ctx.lineTo(tentX + tentW - 10, tentY);
  ctx.stroke();

  // Draped Reddish Terracotta Canvas Canopy with scalloped flap
  ctx.save();
  const tentGrad = ctx.createLinearGradient(tentX, tentY, tentX + tentW, tentY + tentH);
  tentGrad.addColorStop(0, '#9e343f');
  tentGrad.addColorStop(0.5, '#ba434e');
  tentGrad.addColorStop(1, '#6b1f28');
  ctx.fillStyle = tentGrad;
  ctx.strokeStyle = '#4a1219';
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.moveTo(tentX + 10, tentY);
  ctx.lineTo(tentX + tentW - 10, tentY);
  ctx.lineTo(tentX + tentW + 15, tentY + tentH * 0.55);
  ctx.quadraticCurveTo(tentX + tentW / 2, tentY + tentH * 0.70, tentX - 10, tentY + tentH * 0.60);
  ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.restore();

  // Wooden Barrels (পিপা) beside right tent
  drawWoodenBarrel(ctx, tentX + tentW * 0.45, tentY + tentH * 0.85, 26, 36);

  // Large Clay Water Amphora (বড় মাটির মটকা)
  drawClayPot(ctx, tentX + tentW * 0.20, tentY + tentH * 0.88, 1.6, '#b86343');

  ctx.restore();
}

// Realistic Earthen Clay Pot (কলসি / মটকা)
function drawClayPot(ctx, x, y, scale, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Cast shadow
  ctx.fillStyle = 'rgba(74, 34, 25, 0.45)';
  ctx.beginPath();
  ctx.ellipse(3, 10, 10, 4, 0, 0, TAU);
  ctx.fill();

  // Clay Body
  ctx.fillStyle = color;
  ctx.strokeStyle = '#4a2416';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(0, 0, 11, 0, TAU);
  ctx.fill(); ctx.stroke();

  // Neck and Rim
  ctx.fillRect(-5, -14, 10, 6);
  ctx.strokeRect(-5, -14, 10, 6);
  ctx.beginPath();
  ctx.ellipse(0, -14, 7, 3, 0, 0, TAU);
  ctx.fill(); ctx.stroke();

  // Sunlit highlight reflection
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.beginPath();
  ctx.ellipse(4, -3, 3, 7, 0.3, 0, TAU);
  ctx.fill();

  ctx.restore();
}

// Wooden Barrel (কাঠের পিপা)
function drawWoodenBarrel(ctx, x, y, w, h) {
  ctx.save();
  ctx.fillStyle = '#6e4125';
  ctx.strokeStyle = '#2d180c';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x - w / 2, y - h, w, h, [6, 6, 4, 4]);
  ctx.fill(); ctx.stroke();

  // Metal barrel hoops
  ctx.strokeStyle = '#18181b';
  ctx.lineWidth = 2.5;
  [y - h + 7, y - h / 2, y - 7].forEach(hy => {
    ctx.beginPath();
    ctx.moveTo(x - w / 2, hy);
    ctx.lineTo(x + w / 2, hy);
    ctx.stroke();
  });
  ctx.restore();
}

// Sunbeam Atmospheric Light Spill radiating from sun
function drawSunbeamLightSpill(ctx, W, H, sunX, sunY, groundY, t) {
  ctx.save();
  ctx.fillStyle = 'rgba(254, 240, 138, 0.04)';
  const numBeams = 5;
  for (let b = 0; b < numBeams; b++) {
    const angle = 0.55 + (b * 0.22) + Math.sin(t * 0.4 + b) * 0.03;
    const spread = 0.16;
    ctx.beginPath();
    ctx.moveTo(sunX, sunY);
    ctx.lineTo(sunX + Math.cos(angle - spread) * (W * 0.7), sunY + Math.sin(angle - spread) * (H * 0.8));
    ctx.lineTo(sunX + Math.cos(angle + spread) * (W * 0.7), sunY + Math.sin(angle + spread) * (H * 0.8));
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

// Floating Golden Atmospheric Dust Motes & Sparks
function drawAtmosphericDustMotes(ctx, W, H, t) {
  ctx.save();
  const moteCount = 20;
  for (let i = 0; i < moteCount; i++) {
    const mx = (W * 0.05 + (i * 97) % (W * 0.90)) + Math.sin(t * 1.2 + i * 2) * 16;
    const my = (H * 0.15 + (i * 73) % (H * 0.70)) + Math.cos(t * 0.9 + i) * 12;
    const size = (i % 3 === 0) ? 2.5 : 1.5;
    const alpha = 0.35 + Math.sin(t * 2 + i) * 0.25;

    ctx.fillStyle = `rgba(254, 240, 138, ${alpha})`;
    ctx.beginPath();
    ctx.arc(mx, my, size, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

// ----------------------------------------------------------------------------
// GLOBAL ENVIRONMENT DISPATCHER (সার্বজনীন ব্যাকগ্রাউন্ড ম্যানেজার)
// ----------------------------------------------------------------------------

// Helper: Draw full-cover image preserving aspect ratio
export function drawCoverImage(ctx, img, W, H, focalX = 0.5, focalY = 0.5) {
  if (!img) return false;
  const imgW = img.naturalWidth || img.width;
  const imgH = img.naturalHeight || img.height;
  if (!imgW || !imgH) return false;

  const canvasRatio = W / H;
  const imgRatio = imgW / imgH;

  let sW, sH, sX, sY;
  if (canvasRatio > imgRatio) {
    sW = imgW;
    sH = imgW / canvasRatio;
    sX = 0;
    sY = (imgH - sH) * focalY;
  } else {
    sH = imgH;
    sW = imgH * canvasRatio;
    sX = (imgW - sW) * focalX;
    sY = 0;
  }
  ctx.drawImage(img, sX, sY, sW, sH, 0, 0, W, H);
  return true;
}

// 7b. Savings Home Study Stage (সঞ্চয়ের ঘর ও কয়েন ভর্তি জার)
export function drawSavingsStudyStage(ctx, W, H, t) {
  let img = null;
  if (typeof document !== 'undefined') {
    const el = document.getElementById('env_savings');
    if (el && el.complete && el.naturalWidth > 0) img = el;
  }

  if (img) {
    ctx.save();
    drawCoverImage(ctx, img, W, H, 0.45, 0.5);

    // Warm volumetric sunbeam streaming across desk
    const sunbeam = ctx.createLinearGradient(W * 0.2, 0, W * 0.7, H * 0.8);
    sunbeam.addColorStop(0, 'rgba(254, 240, 138, 0.18)');
    sunbeam.addColorStop(0.5, 'rgba(251, 191, 36, 0.08)');
    sunbeam.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = sunbeam;
    ctx.fillRect(0, 0, W, H);

    // Golden sparkles rising from coin jar
    const isPortrait = W < H;
    const jarX = isPortrait ? W * 0.35 : W * 0.31;
    const jarY = isPortrait ? H * 0.72 : H * 0.68;
    for (let i = 0; i < 6; i++) {
      const spX = jarX + Math.sin(t * 2 + i) * 28;
      const spY = jarY - ((t * 25 + i * 22) % 65);
      const alpha = Math.max(0, 1 - ((t * 25 + i * 22) % 65) / 65);
      ctx.save();
      ctx.fillStyle = `rgba(250, 204, 21, ${alpha * 0.8})`;
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(spX, spY, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    drawVignette(ctx, W, H, 0.25);
    ctx.restore();
  } else {
    drawHabitsBarrierStage(ctx, W, H, t);
  }
}

// 9b. Professional Investment Workspace Stage (ইনভেস্টমেন্ট অফিস ও ১২% গ্রাফ)
export function drawInvestmentOfficeStage(ctx, W, H, t) {
  let img = null;
  if (typeof document !== 'undefined') {
    const el = document.getElementById('env_investment');
    if (el && el.complete && el.naturalWidth > 0) img = el;
  }

  if (img) {
    ctx.save();
    drawCoverImage(ctx, img, W, H, 0.5, 0.5);

    // Glowing Compounding 12% Growth Curve Overlay on Board
    const isPortrait = W < H;
    const boardX = isPortrait ? W * 0.58 : W * 0.63;
    const boardY = isPortrait ? H * 0.36 : H * 0.38;
    const boardW = isPortrait ? W * 0.34 : W * 0.28;
    const boardH = isPortrait ? H * 0.16 : H * 0.22;

    // Animated compounding curve progress
    const curveProgress = Math.min(1.0, (t % 8.0) / 4.0);
    const steps = 24;
    ctx.save();
    ctx.strokeStyle = '#4ade80';
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    for (let i = 0; i <= steps * curveProgress; i++) {
      const p = i / steps;
      const px = boardX + p * boardW;
      const py = boardY - Math.pow(p, 2.2) * boardH;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Glowing pointer head
    if (curveProgress > 0.05) {
      const p = curveProgress;
      const px = boardX + p * boardW;
      const py = boardY - Math.pow(p, 2.2) * boardH;
      ctx.fillStyle = '#facc15';
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();

      // Badge '১২%'
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 13px "Noto Sans Bengali", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('+১২%', px + 8, py - 4);
    }
    ctx.restore();

    // Coffee Steam rising gently
    const coffeeX = isPortrait ? W * 0.41 : W * 0.40;
    const coffeeY = isPortrait ? H * 0.68 : H * 0.67;
    for (let s = 0; s < 3; s++) {
      const steamY = coffeeY - ((t * 18 + s * 14) % 35);
      const steamX = coffeeX + Math.sin(t * 3 + s) * 5;
      const steamAlpha = Math.max(0, 0.4 - ((t * 18 + s * 14) % 35) / 70);
      ctx.fillStyle = `rgba(255, 255, 255, ${steamAlpha})`;
      ctx.beginPath();
      ctx.arc(steamX, steamY, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    drawVignette(ctx, W, H, 0.22);
    ctx.restore();
  } else {
    drawInvestmentStage(ctx, W, H, t);
  }
}

// 10b. City Growth & 1 Crore Milestone Stage (সিটি প্রমেনেড ও ১ কোটি মাইলফলক)
export function drawGrowthCityStage(ctx, W, H, t, opts = {}) {
  let img = null;
  if (typeof document !== 'undefined') {
    const el = document.getElementById('env_growth');
    if (el && el.complete && el.naturalWidth > 0) img = el;
  }

  if (img) {
    ctx.save();
    drawCoverImage(ctx, img, W, H, 0.5, 0.5);

    // River Water Shimmer Highlights
    const isPortrait = W < H;
    const riverY = isPortrait ? H * 0.54 : H * 0.56;
    for (let r = 0; r < 7; r++) {
      const rx = (W * 0.35 + (r * 67) % (W * 0.5)) + Math.sin(t * 3 + r) * 12;
      const ry = riverY + (r * 11) % (H * 0.08);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.fillRect(rx, ry, 18 + Math.sin(t * 4 + r) * 6, 2.5);
    }

    // Celebration Confetti for 1 Crore milestone if requested
    if (opts.celebration) {
      for (let i = 0; i < 20; i++) {
        const cx = (W * 0.05 + (i * 73) % (W * 0.9)) + Math.sin(t * 2 + i) * 14;
        const cy = ((t * 45 + i * 58) % H);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * 3 + i);
        ctx.fillStyle = (i % 2 === 0) ? '#facc15' : '#fbbf24';
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 6;
        ctx.fillRect(-4, -6, 8, 12);
        ctx.restore();
      }
    }

    // Sunrise dawn warmth if freedom stage
    if (opts.sunrise) {
      const sunFlare = ctx.createRadialGradient(W * 0.5, H * 0.25, 20, W * 0.5, H * 0.25, W * 0.75);
      sunFlare.addColorStop(0, 'rgba(254, 240, 138, 0.22)');
      sunFlare.addColorStop(0.5, 'rgba(251, 146, 60, 0.12)');
      sunFlare.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunFlare;
      ctx.fillRect(0, 0, W, H);
    }

    drawVignette(ctx, W, H, 0.22);
    ctx.restore();
  } else {
    if (opts.celebration) drawCroreMilestoneStage(ctx, W, H, t);
    else if (opts.sunrise) drawFinancialFreedomStage(ctx, W, H, t);
    else drawCroreMilestoneStage(ctx, W, H, t);
  }
}

export function drawEnvironment(ctx, W, H, t, setting = 'desert_town_sunset') {
  switch (setting) {
    case 'desert_town_sunset':
    case 'arabian_bazaar':
    case 'desert_sunset':
    case 'ancient_town':
    case 'historical_sunset':
      drawDesertTownSunset(ctx, W, H, t);
      break;
    case 'dorm_room':
      drawDormRoom(ctx, W, H, t);
      break;
    case 'bank_office':
      drawBankOffice(ctx, W, H, t);
      break;
    case 'lunch_table':
      drawLunchTable(ctx, W, H, t);
      break;
    case 'village_home':
      drawVillageHome(ctx, W, H, t);
      break;
    case 'phone_split_call':
      drawSplitScreenCall(ctx, W, H, t);
      break;
    case 'habits_barrier':
      drawHabitsBarrierStage(ctx, W, H, t);
      break;
    case 'tea_stall_adda':
      drawTeaStallStage(ctx, W, H, t);
      break;
    case 'investment_game':
      drawInvestmentStage(ctx, W, H, t);
      break;
    case 'one_crore_milestone':
      drawCroreMilestoneStage(ctx, W, H, t);
      break;
    case 'discipline_and_patience':
      drawDisciplineStage(ctx, W, H, t);
      break;
    case 'financial_freedom':
      drawFinancialFreedomStage(ctx, W, H, t);
      break;
    case 'suspense_cliffhanger':
      drawSuspenseOutro(ctx, W, H, t);
      break;
    default:
      drawDesertTownSunset(ctx, W, H, t);
      break;
  }
}

