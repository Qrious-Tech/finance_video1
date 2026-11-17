# -*- coding: utf-8 -*-
"""
Environments Upgrade Script: Master 2D Animation Engine V5
Injects the 6 authentic, production-grade vector environments into src/environments.js.
"""

env_code = '''/**
 * Bengali Story Motion — Master 2D Environments & Staging Engine V5
 * Authentic, scene-specific vector environments:
 * 1. Dhaka City Street & Sidewalk (প্রতিদিনের অভ্যাস • কোটি টাকার বাধা)
 * 2. Authentic Roadside Tea Stall & Adda (চা-নাশতার আড্ডা • ১০০ টাকার খরচ)
 * 3. Home Study & Compounding Growth Desk (আসল খেলা • মিউচুয়াল ফান্ড ও ১৫ লাখ টাকা)
 * 4. Grand 25-Year 1 Crore Compounding Stage (২৫ বছরের কম্পাউন্ডিং • ১ কোটি টাকা)
 * 5. Financial Discipline & Habit Matrix (ধনী হওয়ার মূলমন্ত্র • খরচে লাগাম ও ধৈর্য)
 * 6. Financial Freedom Sunrise Balcony (আগামী দিনের আর্থিক স্বাধীনতা)
 */

const TAU = Math.PI * 2;

// Utility: Soft Vignette
export function drawVignette(ctx, W, H, intensity = 0.35) {
  ctx.save();
  const radius = Math.max(W, H) * 0.75;
  const vigGrad = ctx.createRadialGradient(W / 2, H / 2, radius * 0.4, W / 2, H / 2, radius);
  vigGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  vigGrad.addColorStop(1, `rgba(0, 0, 0, ${intensity})`);
  ctx.fillStyle = vigGrad;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

// ============================================================================
// 1. SCENE 1: DHAKA CITY STREET & SIDEWALK (আধুনিক শহরের ফুটপাত)
// ============================================================================
export function drawDhakaCityStreet(ctx, W, H, t) {
  ctx.save();
  const isPortrait = W < H;
  const horizonY = isPortrait ? H * 0.58 : H * 0.62;
  const sidewalkY = isPortrait ? H * 0.68 : H * 0.72;

  // A. Evening Golden Hour Sky Gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
  skyGrad.addColorStop(0, '#0f172a'); // Deep dusk slate
  skyGrad.addColorStop(0.45, '#1e293b');
  skyGrad.addColorStop(0.75, '#b45309'); // Warm sunset amber
  skyGrad.addColorStop(1.0, '#f59e0b'); // Golden horizon glow
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, horizonY);

  // Soft atmospheric sunset clouds
  ctx.save();
  ctx.fillStyle = 'rgba(254, 215, 170, 0.18)';
  for (let c = 0; c < 4; c++) {
    const cx = ((W * 0.25 * c + t * 6) % (W + 200)) - 100;
    const cy = horizonY * 0.35 + Math.sin(c + t * 0.5) * 15;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 90, 18, 0, 0, TAU);
    ctx.ellipse(cx + 40, cy - 8, 70, 22, 0, 0, TAU);
    ctx.fill();
  }
  ctx.restore();

  // B. Distant City Skyline Silhouettes
  const skylineY = horizonY;
  ctx.fillStyle = '#1e1b4b'; // Deep navy silhouette
  const buildings = [
    { x: 0.00, w: 0.10, h: 140 },
    { x: 0.08, w: 0.12, h: 210 },
    { x: 0.18, w: 0.09, h: 170 },
    { x: 0.25, w: 0.14, h: 260 },
    { x: 0.37, w: 0.10, h: 190 },
    { x: 0.45, w: 0.12, h: 240 },
    { x: 0.55, w: 0.09, h: 160 },
    { x: 0.62, w: 0.15, h: 280 },
    { x: 0.75, w: 0.11, h: 200 },
    { x: 0.84, w: 0.16, h: 150 }
  ];
  buildings.forEach(b => {
    const bx = W * b.x;
    const bw = W * b.w;
    const bh = b.h * (isPortrait ? 0.75 : 1.0);
    ctx.fillRect(bx, skylineY - bh, bw, bh);

    // Glowing window grids on skyscrapers
    ctx.fillStyle = 'rgba(254, 240, 138, 0.45)';
    for (let wy = skylineY - bh + 15; wy < skylineY - 15; wy += 22) {
      for (let wx = bx + 8; wx < bx + bw - 8; wx += 16) {
        if ((wx + wy) % 5 === 0) {
          ctx.fillRect(wx, wy, 6, 8);
        }
      }
    }
    ctx.fillStyle = '#1e1b4b'; // Reset for next building
  });

  // Communication tower with blinking red beacon
  const towerX = W * 0.32;
  const towerY = skylineY - (isPortrait ? 210 : 280);
  ctx.strokeStyle = '#312e81';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(towerX, skylineY);
  ctx.lineTo(towerX, towerY);
  ctx.stroke();
  // Blinking red beacon
  if (Math.sin(t * 4.0) > 0) {
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(towerX, towerY, 3.5, 0, TAU);
    ctx.fill();
  }

  // C. Midground Road & Green Trees
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, horizonY, W, sidewalkY - horizonY);

  // Street Trees along road
  for (let tr = 0; tr < 6; tr++) {
    const tx = W * (0.05 + tr * 0.18);
    const ty = sidewalkY - 8;
    // Trunk
    ctx.fillStyle = '#451a03';
    ctx.fillRect(tx - 3, ty - 32, 6, 32);
    // Leaf crown
    ctx.fillStyle = (tr % 2 === 0) ? '#15803d' : '#166534';
    ctx.beginPath();
    ctx.arc(tx, ty - 42, 22, 0, TAU);
    ctx.fill();
  }

  // D. Foreground Sidewalk & Pavement
  const groundGrad = ctx.createLinearGradient(0, sidewalkY, 0, H);
  groundGrad.addColorStop(0, '#334155'); // Slate pavement
  groundGrad.addColorStop(0.5, '#1e293b');
  groundGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, sidewalkY, W, H - sidewalkY);

  // Sidewalk Curb Stone Line
  ctx.fillStyle = '#64748b';
  ctx.fillRect(0, sidewalkY, W, 8);
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.5;
  for (let cx = 0; cx < W; cx += 34) {
    ctx.beginPath(); ctx.moveTo(cx, sidewalkY); ctx.lineTo(cx, sidewalkY + 8); ctx.stroke();
  }

  // Pavement Brick Grid Lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1.2;
  const tileH = 28;
  for (let py = sidewalkY + 14; py < H; py += tileH) {
    ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(W, py); ctx.stroke();
    // Alternating vertical joints
    const shift = (Math.floor(py / tileH) % 2) * 24;
    for (let px = shift; px < W; px += 48) {
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + tileH); ctx.stroke();
    }
  }

  // E. Modern Street Lamp on Right
  const lampX = W * (isPortrait ? 0.88 : 0.82);
  const lampBaseY = sidewalkY + 12;
  const lampH = isPortrait ? 180 : 220;
  const lampHeadY = lampBaseY - lampH;

  // Lamp Post
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 5.0;
  ctx.beginPath();
  ctx.moveTo(lampX, lampBaseY);
  ctx.lineTo(lampX, lampHeadY + 15);
  ctx.quadraticCurveTo(lampX, lampHeadY, lampX - 25, lampHeadY);
  ctx.stroke();

  // Lamp Fixture
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(lampX - 32, lampHeadY - 4, 18, 8);

  // Warm Golden Light Pool on Sidewalk
  const lightGlow = ctx.createRadialGradient(lampX - 24, lampHeadY, 5, lampX - 24, sidewalkY + 30, isPortrait ? 160 : 200);
  lightGlow.addColorStop(0, 'rgba(254, 240, 138, 0.40)');
  lightGlow.addColorStop(0.5, 'rgba(245, 158, 11, 0.15)');
  lightGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = lightGlow;
  ctx.beginPath();
  ctx.ellipse(lampX - 24, sidewalkY + 35, 120, 60, 0, 0, TAU);
  ctx.fill();

  // F. Drifting Question / Cost Motes
  for (let i = 0; i < 7; i++) {
    const px = (W * 0.15 + (i * 123) % (W * 0.7)) + Math.sin(t * 1.5 + i) * 12;
    const py = (H * 0.22 + (i * 71) % (H * 0.35)) + Math.cos(t * 1.2 + i) * 8;
    ctx.save();
    ctx.translate(px, py);
    ctx.fillStyle = 'rgba(250, 204, 21, 0.25)';
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.45)';
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(0, 0, 14, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(254, 240, 138, 0.85)';
    ctx.font = '700 12px "Noto Sans Bengali", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('৳', 0, 1);
    ctx.restore();
  }

  drawVignette(ctx, W, H, 0.35);
  ctx.restore();
}

export const drawHabitsBarrierStage = drawDhakaCityStreet;

// ============================================================================
// 2. SCENE 2: AUTHENTIC ROADSIDE TEA STALL (ঐতিহ্যবাহী চায়ের দোকান)
// ============================================================================
export function drawAuthenticTeaStall(ctx, W, H, t) {
  ctx.save();
  const isPortrait = W < H;
  const floorY = H * (isPortrait ? 0.74 : 0.78);

  // A. Atmospheric Warm Evening Street Background
  const bgGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  bgGrad.addColorStop(0, '#090d16');
  bgGrad.addColorStop(0.5, '#1c1917');
  bgGrad.addColorStop(1, '#292524');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, floorY);

  // Ambient city bokeh lights
  for (let b = 0; b < 6; b++) {
    const bx = W * (0.15 + b * 0.14);
    const by = floorY * 0.45 + Math.sin(b * 2) * 20;
    const bGlow = ctx.createRadialGradient(bx, by, 2, bx, by, 32);
    bGlow.addColorStop(0, 'rgba(251, 146, 60, 0.25)');
    bGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = bGlow;
    ctx.beginPath(); ctx.arc(bx, by, 32, 0, TAU); ctx.fill();
  }

  // B. Corrugated Tin Canopy Roof & Awning
  const canopyY = H * (isPortrait ? 0.14 : 0.12);
  ctx.fillStyle = '#451a03'; // Dark wood frame
  ctx.strokeStyle = '#1e1b18';
  ctx.lineWidth = 3.0;
  ctx.fillRect(0, canopyY - 24, W, 24);
  ctx.strokeRect(0, canopyY - 24, W, 24);

  // Red & White Striped Scalloped Awning
  const stripeW = 34;
  for (let x = 0; x < W; x += stripeW) {
    ctx.fillStyle = (Math.floor(x / stripeW) % 2 === 0) ? '#b91c1c' : '#f8fafc';
    ctx.beginPath();
    ctx.roundRect(x, canopyY, stripeW, 18, [0, 0, 8, 8]);
    ctx.fill();
  }

  // C. Hanging Warm Edison Bulbs with Ambient Light Pool
  const bulbs = [
    { x: W * 0.18, y: canopyY + 38 },
    { x: W * 0.38, y: canopyY + 44 },
    { x: W * 0.62, y: canopyY + 42 },
    { x: W * 0.82, y: canopyY + 36 }
  ];
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(0, canopyY + 18);
  bulbs.forEach(b => ctx.lineTo(b.x, b.y - 10));
  ctx.lineTo(W, canopyY + 18);
  ctx.stroke();

  bulbs.forEach(b => {
    // Halo glow
    const bGlow = ctx.createRadialGradient(b.x, b.y, 2, b.x, b.y, 42);
    bGlow.addColorStop(0, 'rgba(254, 240, 138, 0.55)');
    bGlow.addColorStop(0.5, 'rgba(245, 158, 11, 0.18)');
    bGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = bGlow;
    ctx.beginPath(); ctx.arc(b.x, b.y, 42, 0, TAU); ctx.fill();

    // Bulb glass
    ctx.fillStyle = '#fef08a';
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(b.x, b.y, 7.5, 0, TAU); ctx.fill(); ctx.stroke();
  });

  // D. Hanging Banana Bunch (সবরি কলার ছড়ি)
  const bananaX = W * (isPortrait ? 0.12 : 0.08);
  const bananaY = canopyY + 54;
  ctx.save();
  ctx.fillStyle = '#eab308';
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 1.6;
  for (let b = -2; b <= 2; b++) {
    ctx.beginPath();
    ctx.ellipse(bananaX + b * 6.5, bananaY + Math.abs(b) * 4, 5.5, 16, b * 0.18, 0, TAU);
    ctx.fill(); ctx.stroke();
  }
  ctx.restore();

  // Glass Biscuit & Toast Jar
  const jarX = W * (isPortrait ? 0.88 : 0.90);
  const jarY = canopyY + 62;
  ctx.fillStyle = 'rgba(226, 232, 240, 0.50)';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.roundRect(jarX - 18, jarY - 26, 36, 38, 5);
  ctx.fill(); ctx.stroke();
  // Biscuits inside
  ctx.fillStyle = '#d97706';
  for (let k = 0; k < 3; k++) {
    ctx.fillRect(jarX - 12, jarY - 20 + k * 9, 24, 6.5);
  }

  // E. Paved Ground
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, H);
  floorGrad.addColorStop(0, '#1c1917');
  floorGrad.addColorStop(0.5, '#18181b');
  floorGrad.addColorStop(1, '#09090b');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, W, H - floorY);

  ctx.strokeStyle = '#44403c';
  ctx.lineWidth = 3.0;
  ctx.beginPath(); ctx.moveTo(0, floorY); ctx.lineTo(W, floorY); ctx.stroke();

  // F. Tea Counter Table & Boiling Kettle
  const tableX = isPortrait ? W * 0.68 : W * 0.70;
  const tableY = floorY - 95;
  const tableW = isPortrait ? W * 0.36 : W * 0.28;

  // Wooden counter
  ctx.fillStyle = '#78350f';
  ctx.strokeStyle = '#1e1b18';
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.roundRect(tableX - tableW / 2, tableY, tableW, 105, 4);
  ctx.fill(); ctx.stroke();

  // Brass/Aluminium Boiling Kettle
  const kettleX = tableX - tableW * 0.22;
  const kettleY = tableY - 18;

  // Blue gas flame burner under kettle
  ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
  ctx.beginPath();
  ctx.ellipse(kettleX, tableY, 14, 5, 0, 0, TAU);
  ctx.fill();

  // Kettle Body
  ctx.fillStyle = '#cbd5e1';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(kettleX, kettleY, 18, 0, TAU);
  ctx.fill(); ctx.stroke();

  // Kettle spout
  ctx.beginPath();
  ctx.moveTo(kettleX - 16, kettleY - 3);
  ctx.lineTo(kettleX - 28, kettleY - 14);
  ctx.stroke();

  // Rising Animated Steam Waves
  ctx.save();
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.70)';
  ctx.lineWidth = 2.2;
  ctx.lineCap = 'round';
  for (let s = 0; s < 2; s++) {
    const sx = kettleX - 25 + s * 9;
    const sy = kettleY - 18 - ((t * 26 + s * 16) % 48);
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.quadraticCurveTo(sx + 5, sy - 8, sx, sy - 16);
    ctx.quadraticCurveTo(sx - 5, sy - 24, sx, sy - 32);
    ctx.stroke();
  }
  ctx.restore();

  // Stack of clear tea glasses
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.6;
  for (let g = 0; g < 3; g++) {
    ctx.beginPath();
    ctx.roundRect(tableX + 10 + g * 14, tableY - 14, 11, 14, [2, 2, 3, 3]);
    ctx.fill(); ctx.stroke();
  }

  drawVignette(ctx, W, H, 0.30);
  ctx.restore();
}

export const drawTeaStallStage = drawAuthenticTeaStall;

// ============================================================================
// 3. SCENE 3: STUDY WORKSPACE & 15 LAKH COMPOUNDING STAGE (আসল খেলা)
// ============================================================================
export function drawHomeStudyOffice(ctx, W, H, t) {
  ctx.save();
  const isPortrait = W < H;
  const deskY = isPortrait ? H * 0.70 : H * 0.72;

  // A. Deep Sapphire / Midnight Blue Technical Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#061325');
  grad.addColorStop(0.5, '#0b2046');
  grad.addColorStop(1, '#020617');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Digital Financial Grid Lines
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.10)';
  ctx.lineWidth = 1;
  const gridStep = 45;
  for (let x = 0; x < W; x += gridStep) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += gridStep) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // B. Glowing Exponential Compounding Curve (12% CAGR Growth Chart)
  const chartX = isPortrait ? W * 0.10 : W * 0.34;
  const chartW = isPortrait ? W * 0.80 : W * 0.60;
  const chartY = isPortrait ? H * 0.50 : H * 0.56;
  const chartH = isPortrait ? H * 0.25 : H * 0.32;

  // Chart Axes
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(chartX, chartY - chartH);
  ctx.lineTo(chartX, chartY);
  ctx.lineTo(chartX + chartW, chartY);
  ctx.stroke();

  // Year Labels on X-Axis
  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 13px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('০ বছর', chartX, chartY + 22);
  ctx.fillText('৫ বছর', chartX + chartW * 0.33, chartY + 22);
  ctx.fillText('১০ বছর', chartX + chartW * 0.66, chartY + 22);
  ctx.fillText('১৫ বছর (১৫ লাখ 💰)', chartX + chartW, chartY + 22);

  // Compounding Curve Points (12% CAGR)
  const curvePoints = [];
  const steps = 30;
  for (let i = 0; i <= steps; i++) {
    const prog = i / steps;
    const px = chartX + prog * chartW;
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

  // Bright Emerald Glowing Line
  ctx.save();
  ctx.shadowColor = '#22c55e';
  ctx.shadowBlur = 14;
  ctx.strokeStyle = '#4ade80';
  ctx.lineWidth = 4.0;
  ctx.beginPath();
  ctx.moveTo(curvePoints[0].x, curvePoints[0].y);
  curvePoints.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.stroke();

  // Animated Tracer Pulse Ball along curve
  const pulseProg = (t * 0.35) % 1.0;
  const pulseIdx = Math.floor(pulseProg * steps);
  const pulsePoint = curvePoints[pulseIdx] || curvePoints[steps];
  ctx.fillStyle = '#facc15';
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.arc(pulsePoint.x, pulsePoint.y, 6.5, 0, TAU);
  ctx.fill();
  ctx.restore();

  // Peak 15 Lakh Gold Orb
  const peak = curvePoints[steps];
  ctx.save();
  ctx.fillStyle = '#facc15';
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.arc(peak.x, peak.y, 9, 0, TAU);
  ctx.fill();
  ctx.restore();

  // C. Wooden Desk Workspace at Base
  const deskGrad = ctx.createLinearGradient(0, deskY, 0, H);
  deskGrad.addColorStop(0, '#1e293b');
  deskGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = deskGrad;
  ctx.fillRect(0, deskY, W, H - deskY);

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.6;
  ctx.beginPath(); ctx.moveTo(0, deskY); ctx.lineTo(W, deskY); ctx.stroke();

  // Desk Props: Digital Calculator with '3000' LCD on Left
  const calcX = isPortrait ? W * 0.18 : W * 0.12;
  const calcY = deskY + 18;
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.roundRect(calcX - 22, calcY, 44, 52, 4);
  ctx.fill(); ctx.stroke();

  // Calculator Screen (Green LCD)
  ctx.fillStyle = '#14532d';
  ctx.fillRect(calcX - 18, calcY + 5, 36, 15);
  ctx.fillStyle = '#4ade80';
  ctx.font = '700 11px monospace';
  ctx.textAlign = 'right';
  ctx.fillText('3000', calcX + 15, calcY + 17);

  // Open Financial Notebook on Right
  const noteX = isPortrait ? W * 0.82 : W * 0.88;
  const noteY = deskY + 16;
  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.roundRect(noteX - 35, noteY, 70, 52, 3);
  ctx.fill(); ctx.stroke();

  // Notebook lines & ৳ symbol
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.2;
  for (let l = 0; l < 4; l++) {
    ctx.beginPath();
    ctx.moveTo(noteX - 28, noteY + 12 + l * 10);
    ctx.lineTo(noteX + 28, noteY + 12 + l * 10);
    ctx.stroke();
  }

  drawVignette(ctx, W, H, 0.35);
  ctx.restore();
}

export const drawInvestmentStage = drawHomeStudyOffice;

// ============================================================================
// 4. SCENE 4: 25-YEAR 1 CRORE COMPOUNDING STAGE (২৫ বছরের কম্পাউন্ডিং)
// ============================================================================
export function drawCroreMilestoneStage(ctx, W, H, t) {
  ctx.save();
  const isPortrait = W < H;
  const floorY = H * (isPortrait ? 0.70 : 0.74);

  // A. Deep Royal Purple & Cosmic Indigo Gradient
  const grad = ctx.createRadialGradient(W / 2, H * 0.38, 30, W / 2, H * 0.42, W * 0.75);
  grad.addColorStop(0, '#3b0764');
  grad.addColorStop(0.5, '#1e1b4b');
  grad.addColorStop(1, '#090514');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // B. Sweeping Golden Spotlight Beams
  ctx.save();
  const beamAngle = Math.sin(t * 0.6) * 0.25;
  ctx.translate(W / 2, 0);
  ctx.rotate(beamAngle);
  ctx.fillStyle = 'rgba(250, 204, 21, 0.08)';
  ctx.beginPath();
  ctx.moveTo(-40, 0);
  ctx.lineTo(40, 0);
  ctx.lineTo(W * 0.70, H);
  ctx.lineTo(-W * 0.70, H);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // C. Drifting Golden Confetti & Star Sparks
  for (let i = 0; i < 24; i++) {
    const cx = (W * 0.05 + (i * 73) % (W * 0.90)) + Math.sin(t * 2 + i) * 14;
    const cy = ((t * 45 + i * 58) % H);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(t * 3 + i);
    ctx.fillStyle = (i % 2 === 0) ? '#facc15' : '#fbbf24';
    ctx.fillRect(-4, -6, 8, 12);
    ctx.restore();
  }

  // D. Stacks of 3D Gold Coins at the sides
  [W * 0.15, W * 0.85].forEach((sx, idx) => {
    const stackBaseY = floorY - 5;
    for (let c = 0; c < 7; c++) {
      const cy = stackBaseY - c * 10;
      ctx.fillStyle = '#f59e0b';
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.ellipse(sx, cy, 26, 8, 0, 0, TAU);
      ctx.fill(); ctx.stroke();
      // Top face
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.ellipse(sx, cy - 2, 24, 6.5, 0, 0, TAU);
      ctx.fill();
    }
  });

  // E. Stage Floor
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, H);
  floorGrad.addColorStop(0, '#2e1065');
  floorGrad.addColorStop(1, '#090514');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, W, H - floorY);

  ctx.strokeStyle = '#facc15';
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 14;
  ctx.lineWidth = 3.2;
  ctx.beginPath(); ctx.moveTo(0, floorY); ctx.lineTo(W, floorY); ctx.stroke();
  ctx.shadowBlur = 0;

  drawVignette(ctx, W, H, 0.40);
  ctx.restore();
}

// ============================================================================
// 5. SCENE 5: DISCIPLINE & PATIENCE MATRIX (ধনী হওয়ার মূলমন্ত্র)
// ============================================================================
export function drawDisciplineStage(ctx, W, H, t) {
  ctx.save();
  const isPortrait = W < H;
  const floorY = H * (isPortrait ? 0.70 : 0.74);

  // A. Sleek Minimalist Indigo Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#090d16');
  grad.addColorStop(0.5, '#0f172a');
  grad.addColorStop(1, '#1e1b4b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // B. Left Card: "ছোট ছোট খরচ" (Impulsive Spending Fading Away)
  const cardW = isPortrait ? W * 0.38 : W * 0.28;
  const cardH = isPortrait ? 130 : 150;
  const cardY = isPortrait ? H * 0.28 : H * 0.32;
  const leftX = isPortrait ? W * 0.22 : W * 0.22;
  const rightX = isPortrait ? W * 0.78 : W * 0.78;

  // Left Card Body (Translucent Crimson)
  ctx.save();
  ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.roundRect(leftX - cardW / 2, cardY, cardW, cardH, 12);
  ctx.fill(); ctx.stroke();

  // Left Card Content
  ctx.fillStyle = '#f87171';
  ctx.font = `700 ${isPortrait ? 16 : 18}px "Noto Sans Bengali", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('অপ্রয়োজনীয় খরচ 🚫', leftX, cardY + 28);
  ctx.fillStyle = '#fca5a5';
  ctx.font = `500 ${isPortrait ? 12 : 14}px "Noto Sans Bengali", sans-serif`;
  ctx.fillText('প্রতিদিন ৳১০০', leftX, cardY + 58);
  ctx.fillText('মাসে ৩,০০০ টাকা', leftX, cardY + 84);
  ctx.fillText('যা নষ্ট হয়', leftX, cardY + 110);
  ctx.restore();

  // Right Card: "ধৈর্য ও সঞ্চয়" (Disciplined Compounding)
  ctx.save();
  ctx.fillStyle = 'rgba(34, 197, 94, 0.14)';
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.roundRect(rightX - cardW / 2, cardY, cardW, cardH, 12);
  ctx.fill(); ctx.stroke();

  // Right Card Content
  ctx.fillStyle = '#4ade80';
  ctx.font = `700 ${isPortrait ? 16 : 18}px "Noto Sans Bengali", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('ধৈর্য ও বিনিয়োগ 💎', rightX, cardY + 28);
  ctx.fillStyle = '#86efac';
  ctx.font = `500 ${isPortrait ? 12 : 14}px "Noto Sans Bengali", sans-serif`;
  ctx.fillText('প্রতিদিন ৳১০০ সঞ্চয়', rightX, cardY + 58);
  ctx.fillText('১২% চক্রবৃদ্ধি', rightX, cardY + 84);
  ctx.fillText('১ কোটি টাকার সম্পদ!', rightX, cardY + 110);
  ctx.restore();

  // C. Stage Floor
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, H);
  floorGrad.addColorStop(0, '#1e293b');
  floorGrad.addColorStop(1, '#090d16');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, W, H - floorY);

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.8;
  ctx.beginPath(); ctx.moveTo(0, floorY); ctx.lineTo(W, floorY); ctx.stroke();

  drawVignette(ctx, W, H, 0.35);
  ctx.restore();
}

// ============================================================================
// 6. SCENE 6: FINANCIAL FREEDOM SUNRISE BALCONY (আর্থিক স্বাধীনতা)
// ============================================================================
export function drawFinancialFreedomStage(ctx, W, H, t) {
  ctx.save();
  const isPortrait = W < H;
  const floorY = H * (isPortrait ? 0.70 : 0.74);
  const horizonY = isPortrait ? H * 0.52 : H * 0.56;

  // A. Radiant Morning Sunrise Sky Gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
  skyGrad.addColorStop(0, '#0284c7'); // Clear crisp morning cyan
  skyGrad.addColorStop(0.35, '#38bdf8');
  skyGrad.addColorStop(0.70, '#fb923c'); // Vibrant dawn orange
  skyGrad.addColorStop(1.0, '#fde047'); // Golden sunrise sunlight
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, horizonY);

  // Radiant Morning Sun with volumetric radial sunbeams
  const sunX = W * 0.5;
  const sunY = horizonY;
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, W * 0.55);
  sunGrad.addColorStop(0, '#ffffff');
  sunGrad.addColorStop(0.2, '#fef08a');
  sunGrad.addColorStop(0.6, 'rgba(251, 146, 60, 0.40)');
  sunGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(sunX, sunY, W * 0.55, 0, TAU);
  ctx.fill();

  // Distant City Skyline Silhouettes with Glowing Windows
  ctx.fillStyle = '#1e293b';
  const buildings = [
    { x: 0.04, w: 0.12, h: 100 },
    { x: 0.16, w: 0.10, h: 160 },
    { x: 0.26, w: 0.14, h: 125 },
    { x: 0.60, w: 0.12, h: 145 },
    { x: 0.72, w: 0.09, h: 180 },
    { x: 0.81, w: 0.15, h: 110 }
  ];
  buildings.forEach(b => {
    const bx = W * b.x;
    const bw = W * b.w;
    const bh = b.h * (isPortrait ? 0.8 : 1.0);
    ctx.fillRect(bx, horizonY - bh, bw, bh + 30);
  });

  // Birds Soaring across the dawn sky in V-formation
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.4;
  ctx.lineCap = 'round';
  const birds = [
    { x: W * 0.25 + Math.sin(t * 1.2) * 15, y: horizonY * 0.42 },
    { x: W * 0.38 + Math.sin(t * 1.1 + 1) * 15, y: horizonY * 0.32 },
    { x: W * 0.72 + Math.sin(t * 1.3 + 2) * 15, y: horizonY * 0.38 }
  ];
  birds.forEach(b => {
    ctx.beginPath();
    ctx.moveTo(b.x - 12, b.y + 4);
    ctx.quadraticCurveTo(b.x - 6, b.y - 6, b.x, b.y);
    ctx.quadraticCurveTo(b.x + 6, b.y - 6, b.x + 12, b.y + 4);
    ctx.stroke();
  });

  // B. Balcony Observation Deck Floor
  const deckGrad = ctx.createLinearGradient(0, floorY, 0, H);
  deckGrad.addColorStop(0, '#334155');
  deckGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = deckGrad;
  ctx.fillRect(0, floorY, W, H - floorY);

  // Modern Glass & Steel Balcony Railing
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.moveTo(0, floorY - 28); ctx.lineTo(W, floorY - 28); ctx.stroke();

  // Glass Balcony Panels
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 1.4;
  const panelW = 75;
  for (let px = 8; px < W - 8; px += panelW + 10) {
    ctx.beginPath();
    ctx.roundRect(px, floorY - 26, panelW, 26, 2);
    ctx.fill(); ctx.stroke();
  }

  // Potted Green Balcony Plants on Left & Right
  [W * 0.08, W * 0.92].forEach(px => {
    const potY = floorY - 4;
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.roundRect(px - 14, potY - 18, 28, 18, [2, 2, 6, 6]);
    ctx.fill();
    // Lush green palm leaves
    ctx.fillStyle = '#15803d';
    for (let l = -2; l <= 2; l++) {
      ctx.beginPath();
      ctx.ellipse(px + l * 7, potY - 26, 6, 16, l * 0.3, 0, TAU);
      ctx.fill();
    }
  });

  drawVignette(ctx, W, H, 0.30);
  ctx.restore();
}

// Compatibility Aliases
export function drawDormRoom(ctx, W, H, t) { drawHomeStudyOffice(ctx, W, H, t); }
export function drawBankOffice(ctx, W, H, t) { drawHomeStudyOffice(ctx, W, H, t); }
export function drawLunchTable(ctx, W, H, t) { drawAuthenticTeaStall(ctx, W, H, t); }
export function drawVillageHome(ctx, W, H, t) { drawAuthenticTeaStall(ctx, W, H, t); }
export function drawSplitScreenCall(ctx, W, H, t) { drawAuthenticTeaStall(ctx, W, H, t); }
export function drawSuspenseOutro(ctx, W, H, t) { drawCroreMilestoneStage(ctx, W, H, t); }
export function drawDesertTownSunset(ctx, W, H, t) { drawDhakaCityStreet(ctx, W, H, t); }
export function drawCoverImage(ctx, W, H) { drawDhakaCityStreet(ctx, W, H, 0); }
export function drawSavingsStudyStage(ctx, W, H, t) { drawHomeStudyOffice(ctx, W, H, t); }
export function drawInvestmentOfficeStage(ctx, W, H, t) { drawHomeStudyOffice(ctx, W, H, t); }
export function drawGrowthCityStage(ctx, W, H, t) { drawFinancialFreedomStage(ctx, W, H, t); }
export function drawEnvironment(ctx, W, H, t, setting = 'dhaka_city') {
  if (setting.includes('tea')) drawAuthenticTeaStall(ctx, W, H, t);
  else if (setting.includes('study') || setting.includes('invest')) drawHomeStudyOffice(ctx, W, H, t);
  else if (setting.includes('crore')) drawCroreMilestoneStage(ctx, W, H, t);
  else if (setting.includes('discipline')) drawDisciplineStage(ctx, W, H, t);
  else if (setting.includes('freedom')) drawFinancialFreedomStage(ctx, W, H, t);
  else drawDhakaCityStreet(ctx, W, H, t);
}
'''

with open('src/environments.js', 'w', encoding='utf-8') as f:
    f.write(env_code)
print("✓ Updated src/environments.js successfully")
