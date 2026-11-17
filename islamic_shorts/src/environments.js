/**
 * Islamic Shorts — Environment Renderer
 * Deen & Direction Production
 *
 * Environments:
 * 1. desert_night_hook       - Dramatic hook: dark sky, crescent moon, old stone well silhouette
 * 2. desert_village_path     - Dusty desert village lane, warm afternoon light
 * 3. stone_well_scene        - Old stone well, dry ground, palm trees
 * 4. stone_well_rescue       - Same well, woman at edge, water visible
 * 5. desert_golden_light     - Open desert, divine golden sky glow
 * 6. divine_light_scene      - Warm golden rays, peaceful woman silhouette
 * 7. teaching_stage_warm     - Warm study/storytelling setting
 * 8. golden_ending_stage     - Inspirational ending with golden gradient
 */

export function drawDesertNightHook(ctx, W, H, t) {
  // Deep indigo-to-black night sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.65);
  sky.addColorStop(0, '#0d0820');
  sky.addColorStop(0.5, '#1a0d35');
  sky.addColorStop(1, '#2d1a0a');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Stars
  ctx.save();
  const stars = [
    [0.08,0.06],[0.15,0.12],[0.22,0.04],[0.31,0.09],[0.42,0.03],[0.55,0.11],
    [0.63,0.07],[0.71,0.14],[0.80,0.05],[0.90,0.10],[0.95,0.08],[0.37,0.17],
    [0.48,0.19],[0.74,0.03],[0.86,0.17],[0.12,0.20],[0.60,0.02],[0.28,0.15],
  ];
  stars.forEach(([sx,sy]) => {
    const twinkle = 0.5 + 0.5 * Math.sin(t * 2.1 + sx * 20);
    ctx.globalAlpha = 0.4 + 0.6 * twinkle;
    ctx.fillStyle = '#fff8e1';
    const r = 1.5 + twinkle * 1.5;
    ctx.beginPath();
    ctx.arc(sx * W, sy * H, r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  ctx.restore();

  // Crescent moon
  const moonX = W * 0.78;
  const moonY = H * 0.08;
  const moonR = W * 0.05;
  ctx.save();
  ctx.fillStyle = '#f5d78e';
  ctx.shadowColor = '#f5d78e';
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1a0d35';
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.arc(moonX + moonR * 0.4, moonY - moonR * 0.1, moonR * 0.82, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Distant mountains silhouette
  ctx.save();
  ctx.fillStyle = '#150a2a';
  ctx.beginPath();
  ctx.moveTo(0, H * 0.60);
  for (let x = 0; x <= W; x += W * 0.08) {
    const peak = H * 0.42 + Math.sin(x * 0.015 + 1) * H * 0.08;
    ctx.lineTo(x, peak);
  }
  ctx.lineTo(W, H * 0.60);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Ground (sandy desert floor)
  const ground = ctx.createLinearGradient(0, H * 0.60, 0, H);
  ground.addColorStop(0, '#3d2008');
  ground.addColorStop(1, '#1a0d04');
  ctx.fillStyle = ground;
  ctx.fillRect(0, H * 0.60, W, H * 0.40);

  // Ground texture lines
  ctx.save();
  ctx.strokeStyle = 'rgba(90,50,10,0.3)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    const y = H * (0.65 + i * 0.04);
    ctx.beginPath();
    ctx.moveTo(W * 0.05, y);
    ctx.bezierCurveTo(W * 0.3, y - 5, W * 0.7, y + 5, W * 0.95, y);
    ctx.stroke();
  }
  ctx.restore();

  // Well silhouette (center)
  drawOldStoneWell(ctx, W * 0.5, H * 0.62, W * 0.09, 'silhouette', t);

  // Palm tree silhouettes
  drawPalmSilhouette(ctx, W * 0.15, H * 0.60, H * 0.18, '#0d0820');
  drawPalmSilhouette(ctx, W * 0.85, H * 0.58, H * 0.15, '#0d0820');

  // Vignette
  drawVignette(ctx, W, H, 0.75);
}

export function drawDesertVillagePath(ctx, W, H, t) {
  // Warm golden-orange sky
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.60);
  sky.addColorStop(0, '#1a1240');
  sky.addColorStop(0.3, '#5c2e00');
  sky.addColorStop(0.65, '#c86400');
  sky.addColorStop(1, '#f5a623');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H * 0.60);

  // Sun (setting)
  ctx.save();
  const sg = ctx.createRadialGradient(W * 0.65, H * 0.38, 0, W * 0.65, H * 0.38, W * 0.14);
  sg.addColorStop(0, 'rgba(255,235,100,0.95)');
  sg.addColorStop(0.5, 'rgba(255,160,50,0.6)');
  sg.addColorStop(1, 'rgba(255,100,0,0)');
  ctx.fillStyle = sg;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();

  // Sandy hills in background
  ctx.save();
  const hillColors = ['#8b4513', '#a0522d', '#c68642'];
  hillColors.forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.moveTo(0, H * (0.52 + i * 0.02));
    for (let x = 0; x <= W; x += W * 0.1) {
      const h = H * (0.44 + i * 0.02) + Math.sin(x * 0.008 + i * 2) * H * 0.05;
      ctx.lineTo(x, h);
    }
    ctx.lineTo(W, H * (0.60 + i * 0.02));
    ctx.lineTo(0, H * (0.60 + i * 0.02));
    ctx.closePath();
    ctx.fill();
  });
  ctx.restore();

  // Sandy ground
  const ground = ctx.createLinearGradient(0, H * 0.60, 0, H);
  ground.addColorStop(0, '#d4a054');
  ground.addColorStop(0.5, '#c8903a');
  ground.addColorStop(1, '#b07020');
  ctx.fillStyle = ground;
  ctx.fillRect(0, H * 0.60, W, H * 0.40);

  // Path (dusty road)
  ctx.save();
  ctx.fillStyle = '#c8a060';
  ctx.beginPath();
  ctx.moveTo(W * 0.35, H * 0.60);
  ctx.quadraticCurveTo(W * 0.45, H * 0.75, W * 0.42, H);
  ctx.lineTo(W * 0.58, H);
  ctx.quadraticCurveTo(W * 0.55, H * 0.75, W * 0.65, H * 0.60);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Ancient mud-brick buildings
  drawAncientBuilding(ctx, W * 0.05, H * 0.42, W * 0.22, H * 0.22);
  drawAncientBuilding(ctx, W * 0.73, H * 0.44, W * 0.20, H * 0.18);

  // Palm trees
  drawPalmSilhouette(ctx, W * 0.25, H * 0.60, H * 0.20, '#5c2e00');
  drawPalmSilhouette(ctx, W * 0.80, H * 0.60, H * 0.17, '#4a2200');

  // Ground dust particles
  ctx.save();
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = '#d4a054';
  for (let i = 0; i < 12; i++) {
    const px = (Math.sin(i * 2.5 + t * 0.5) * 0.4 + 0.5) * W;
    const py = H * 0.75 + Math.cos(i * 1.8) * H * 0.15;
    ctx.beginPath();
    ctx.arc(px, py, 2 + Math.random() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  drawVignette(ctx, W, H, 0.5);
}

export function drawStoneWellScene(ctx, W, H, t) {
  // Warm afternoon desert sky
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.58);
  sky.addColorStop(0, '#2c1a6e');
  sky.addColorStop(0.4, '#8b4800');
  sky.addColorStop(1, '#f0a030');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H * 0.58);

  // Large sun
  const sg = ctx.createRadialGradient(W * 0.72, H * 0.25, 0, W * 0.72, H * 0.25, W * 0.18);
  sg.addColorStop(0, 'rgba(255,230,100,1)');
  sg.addColorStop(0.4, 'rgba(255,160,40,0.7)');
  sg.addColorStop(1, 'rgba(255,80,0,0)');
  ctx.fillStyle = sg;
  ctx.fillRect(0, 0, W, H);

  // Sandy ground
  const ground = ctx.createLinearGradient(0, H * 0.58, 0, H);
  ground.addColorStop(0, '#e8c070');
  ground.addColorStop(0.4, '#d4a040');
  ground.addColorStop(1, '#b88020');
  ctx.fillStyle = ground;
  ctx.fillRect(0, H * 0.58, W, H * 0.42);

  // Cracked dry earth lines
  ctx.save();
  ctx.strokeStyle = 'rgba(120,70,0,0.25)';
  ctx.lineWidth = 1.5;
  [[0.2,0.72,0.35,0.78],[0.6,0.70,0.75,0.68],[0.4,0.85,0.55,0.80],
   [0.1,0.82,0.25,0.88],[0.72,0.80,0.88,0.75]].forEach(([x1,y1,x2,y2]) => {
    ctx.beginPath();
    ctx.moveTo(x1*W, y1*H);
    ctx.lineTo(x2*W, y2*H);
    ctx.stroke();
  });
  ctx.restore();

  // Ancient stone well (center, prominent)
  drawOldStoneWell(ctx, W * 0.50, H * 0.60, W * 0.12, 'detailed', t);

  // Rocks around well
  [[0.35,0.68,18,10],[0.68,0.70,14,8],[0.42,0.75,10,6],[0.60,0.73,12,7]].forEach(([rx,ry,rw,rh]) => {
    ctx.fillStyle = '#8b6a40';
    ctx.beginPath();
    ctx.ellipse(rx*W, ry*H, rw, rh, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#a07840';
    ctx.beginPath();
    ctx.ellipse(rx*W-2, ry*H-2, rw*0.6, rh*0.5, 0, 0, Math.PI*2);
    ctx.fill();
  });

  // Palm trees
  drawPalmTree(ctx, W * 0.18, H * 0.58, H * 0.22, t);
  drawPalmTree(ctx, W * 0.85, H * 0.57, H * 0.19, t);

  // Small shrubs
  drawShrub(ctx, W * 0.30, H * 0.65, 20);
  drawShrub(ctx, W * 0.72, H * 0.67, 16);

  drawVignette(ctx, W, H, 0.4);
}

export function drawDesertGoldenLight(ctx, W, H, t) {
  // Golden divine atmosphere
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#1a0d40');
  sky.addColorStop(0.3, '#8b4800');
  sky.addColorStop(0.6, '#f0a030');
  sky.addColorStop(1, '#d4a040');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Ethereal golden light rays from above
  ctx.save();
  const pulse = 0.7 + 0.3 * Math.sin(t * 1.5);
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI - Math.PI * 0.25;
    const startX = W * 0.5 + Math.cos(angle) * W * 0.05;
    const startY = H * 0.08;
    const endX = startX + Math.cos(angle) * W * 0.9;
    const endY = startY + Math.sin(angle) * H * 0.9;
    const rayGrad = ctx.createLinearGradient(startX, startY, endX, endY);
    rayGrad.addColorStop(0, `rgba(255,220,80,${0.12 * pulse})`);
    rayGrad.addColorStop(1, 'rgba(255,180,0,0)');
    ctx.strokeStyle = rayGrad;
    ctx.lineWidth = W * 0.06;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
  ctx.restore();

  // Ground
  ctx.fillStyle = '#c08020';
  ctx.fillRect(0, H * 0.70, W, H * 0.30);

  // Stone well far away
  drawOldStoneWell(ctx, W * 0.5, H * 0.72, W * 0.07, 'silhouette', t);
  drawPalmSilhouette(ctx, W * 0.25, H * 0.70, H * 0.15, '#3d1800');
  drawPalmSilhouette(ctx, W * 0.80, H * 0.70, H * 0.13, '#3d1800');

  drawVignette(ctx, W, H, 0.55);
}

export function drawDivineLightScene(ctx, W, H, t) {
  // Ethereal divine warm light — no supernatural figures
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#2d1a00');
  bg.addColorStop(0.4, '#8b5500');
  bg.addColorStop(0.7, '#d48000');
  bg.addColorStop(1, '#8b4000');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Warm golden central glow (divine mercy symbolized by light only)
  const pulse = 0.8 + 0.2 * Math.sin(t * 1.2);
  const glow = ctx.createRadialGradient(W * 0.5, H * 0.3, 0, W * 0.5, H * 0.3, W * 0.55);
  glow.addColorStop(0, `rgba(255,230,100,${0.6 * pulse})`);
  glow.addColorStop(0.4, `rgba(255,180,30,${0.3 * pulse})`);
  glow.addColorStop(1, 'rgba(255,120,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Dust particles floating upward
  ctx.save();
  for (let i = 0; i < 20; i++) {
    const px = W * (0.2 + (i / 20) * 0.6 + Math.sin(t * 0.5 + i) * 0.03);
    const py = H * (0.9 - ((t * 0.05 + i * 0.05) % 0.8));
    ctx.globalAlpha = 0.3 + 0.3 * Math.sin(t + i);
    ctx.fillStyle = '#ffe080';
    ctx.beginPath();
    ctx.arc(px, py, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  // Sandy ground
  const ground = ctx.createLinearGradient(0, H * 0.72, 0, H);
  ground.addColorStop(0, '#8b5500');
  ground.addColorStop(1, '#4a2800');
  ctx.fillStyle = ground;
  ctx.fillRect(0, H * 0.72, W, H * 0.28);

  drawVignette(ctx, W, H, 0.6);
}

export function drawTeachingStageWarm(ctx, W, H, t) {
  // Warm cozy interior with Islamic aesthetic
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#1a0f05');
  bg.addColorStop(0.5, '#3d2010');
  bg.addColorStop(1, '#2a1508');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Geometric Islamic pattern on wall (subtle)
  drawIslamicPattern(ctx, W, H, 0.08);

  // Warm ambient light from lantern
  const lamp = ctx.createRadialGradient(W * 0.5, H * 0.15, 0, W * 0.5, H * 0.15, W * 0.6);
  lamp.addColorStop(0, 'rgba(255,180,80,0.35)');
  lamp.addColorStop(0.5, 'rgba(220,120,40,0.15)');
  lamp.addColorStop(1, 'rgba(180,80,0,0)');
  ctx.fillStyle = lamp;
  ctx.fillRect(0, 0, W, H);

  // Hanging lantern
  drawArabicLantern(ctx, W * 0.5, H * 0.08, W * 0.045, t);

  // Floor — wooden with carpet
  const floor = ctx.createLinearGradient(0, H * 0.64, 0, H);
  floor.addColorStop(0, '#5a3010');
  floor.addColorStop(1, '#3a1a08');
  ctx.fillStyle = floor;
  ctx.fillRect(0, H * 0.64, W, H * 0.36);

  // Prayer carpet (geometric pattern)
  drawPrayerCarpet(ctx, W * 0.5, H * 0.68, W * 0.70, H * 0.28);

  // Bookshelf on side
  drawIslamicBookshelf(ctx, W * 0.08, H * 0.28, W * 0.14, H * 0.40);

  drawVignette(ctx, W, H, 0.4);
}

export function drawGoldenEndingStage(ctx, W, H, t) {
  // Golden sunrise — majestic ending backdrop
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.65);
  sky.addColorStop(0, '#0d0820');
  sky.addColorStop(0.25, '#2d1a60');
  sky.addColorStop(0.55, '#8b4000');
  sky.addColorStop(0.85, '#f5a020');
  sky.addColorStop(1, '#ffd060');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H * 0.65);

  // Golden sunrise glow
  const pulse = 0.9 + 0.1 * Math.sin(t * 0.8);
  const sunGlow = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.45, W * 0.5);
  sunGlow.addColorStop(0, `rgba(255,220,80,${0.8 * pulse})`);
  sunGlow.addColorStop(0.3, `rgba(255,160,20,${0.4 * pulse})`);
  sunGlow.addColorStop(1, 'rgba(255,80,0,0)');
  ctx.fillStyle = sunGlow;
  ctx.fillRect(0, 0, W, H);

  // Ground
  const ground = ctx.createLinearGradient(0, H * 0.65, 0, H);
  ground.addColorStop(0, '#c48830');
  ground.addColorStop(1, '#7a4e10');
  ctx.fillStyle = ground;
  ctx.fillRect(0, H * 0.65, W, H * 0.35);

  // Mosque silhouette resting on ground
  drawMosqueSilhouette(ctx, W * 0.5, H * 0.65, W * 0.65, H * 0.28);

  // Flying birds (symbols of mercy/freedom)
  ctx.save();
  ctx.fillStyle = '#2a1400';
  for (let i = 0; i < 5; i++) {
    const bx = W * (0.18 + i * 0.16 + Math.sin(t * 0.4 + i) * 0.02);
    const by = H * (0.22 + Math.sin(t * 0.6 + i * 1.2) * 0.03);
    const wing = Math.sin(t * 3 + i * 0.8) * 0.3;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.quadraticCurveTo(bx - 12, by - 6 + wing * 8, bx - 20, by + 2);
    ctx.moveTo(bx, by);
    ctx.quadraticCurveTo(bx + 12, by - 6 + wing * 8, bx + 20, by + 2);
    ctx.stroke();
  }
  ctx.restore();

  drawVignette(ctx, W, H, 0.4);
}

// ═══════════════ HELPER DRAWING FUNCTIONS ═══════════════

function drawOldStoneWell(ctx, cx, cy, radius, style, t) {
  const r = radius;
  if (style === 'silhouette') {
    ctx.fillStyle = '#0d0820';
    // Well body
    ctx.fillRect(cx - r * 0.9, cy - r * 0.3, r * 1.8, r * 1.2);
    // Well rim
    ctx.beginPath();
    ctx.ellipse(cx, cy - r * 0.3, r * 0.9, r * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();
    // Posts
    ctx.fillRect(cx - r * 1.0, cy - r * 1.4, r * 0.12, r * 1.4);
    ctx.fillRect(cx + r * 0.88, cy - r * 1.4, r * 0.12, r * 1.4);
    // Cross beam
    ctx.fillRect(cx - r * 1.0, cy - r * 1.5, r * 2.0, r * 0.14);
  } else {
    // Stone texture well
    // Base cylinder
    const wellGrad = ctx.createLinearGradient(cx - r, cy, cx + r, cy);
    wellGrad.addColorStop(0, '#5a4030');
    wellGrad.addColorStop(0.3, '#8a6848');
    wellGrad.addColorStop(0.7, '#7a5838');
    wellGrad.addColorStop(1, '#4a3020');
    ctx.fillStyle = wellGrad;
    ctx.fillRect(cx - r * 0.85, cy - r * 0.3, r * 1.7, r * 1.3);

    // Stone courses (horizontal lines)
    ctx.save();
    ctx.strokeStyle = 'rgba(40,20,10,0.4)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.85, cy - r * 0.3 + i * r * 0.26 + r * 0.26);
      ctx.lineTo(cx + r * 0.85, cy - r * 0.3 + i * r * 0.26 + r * 0.26);
      ctx.stroke();
    }
    // Vertical mortar lines
    for (let i = 0; i < 4; i++) {
      const x = cx - r * 0.5 + i * r * 0.33;
      ctx.beginPath();
      ctx.moveTo(x, cy - r * 0.3);
      ctx.lineTo(x, cy + r);
      ctx.stroke();
    }
    ctx.restore();

    // Well rim ellipse
    ctx.fillStyle = '#a08060';
    ctx.beginPath();
    ctx.ellipse(cx, cy - r * 0.3, r * 0.85, r * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1a0d08';
    ctx.beginPath();
    ctx.ellipse(cx, cy - r * 0.3, r * 0.70, r * 0.17, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wooden posts
    ctx.fillStyle = '#6b4420';
    ctx.fillRect(cx - r * 0.95, cy - r * 1.5, r * 0.13, r * 1.4);
    ctx.fillRect(cx + r * 0.82, cy - r * 1.5, r * 0.13, r * 1.4);
    // Cross beam
    ctx.fillStyle = '#5a3810';
    ctx.fillRect(cx - r * 0.95, cy - r * 1.55, r * 1.9, r * 0.13);
    // Rope
    ctx.save();
    ctx.strokeStyle = '#8b6520';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy - r * 1.42);
    ctx.lineTo(cx, cy - r * 0.3);
    ctx.stroke();
    ctx.restore();

    // Water shimmer at top of well
    const shimmer = 0.5 + 0.5 * Math.sin(t * 2.5);
    ctx.save();
    ctx.globalAlpha = 0.4 + 0.3 * shimmer;
    ctx.fillStyle = `rgba(100,160,220,${0.5 + 0.3 * shimmer})`;
    ctx.beginPath();
    ctx.ellipse(cx, cy - r * 0.3, r * 0.68, r * 0.14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawPalmTree(ctx, x, groundY, height, t) {
  const sway = Math.sin(t * 0.8) * 4;
  // Trunk
  const trunkGrad = ctx.createLinearGradient(x - 8, groundY - height, x + 8, groundY);
  trunkGrad.addColorStop(0, '#6b4420');
  trunkGrad.addColorStop(1, '#8b6030');
  ctx.fillStyle = trunkGrad;
  ctx.save();
  ctx.translate(x, groundY);
  ctx.rotate(sway * 0.015);
  ctx.fillRect(-8, -height, 16, height);
  // Trunk rings
  ctx.strokeStyle = 'rgba(60,30,10,0.4)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(-8, -height + i * (height / 8));
    ctx.lineTo(8, -height + i * (height / 8));
    ctx.stroke();
  }
  // Palm fronds
  const frondColors = ['#2d6e1a', '#3a8020', '#487a28', '#264e14'];
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2 + sway * 0.03;
    const frondLen = height * 0.45;
    ctx.strokeStyle = frondColors[i % 4];
    ctx.lineWidth = 4 - i * 0.3;
    ctx.beginPath();
    ctx.moveTo(0, -height);
    ctx.quadraticCurveTo(
      Math.cos(angle) * frondLen * 0.5, -height + Math.sin(angle) * frondLen * 0.3 - frondLen * 0.3,
      Math.cos(angle) * frondLen, -height + Math.sin(angle) * frondLen * 0.5
    );
    ctx.stroke();
  }
  ctx.restore();
}

function drawPalmSilhouette(ctx, x, groundY, height, color) {
  ctx.fillStyle = color;
  // Simple trunk
  ctx.fillRect(x - 5, groundY - height, 10, height);
  // Simple fronds
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const frondLen = height * 0.4;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x, groundY - height);
    ctx.lineTo(x + Math.cos(angle) * frondLen, groundY - height + Math.sin(angle) * frondLen * 0.6);
    ctx.stroke();
    ctx.restore();
  }
}

function drawAncientBuilding(ctx, x, y, width, height) {
  const wallColor = ctx.createLinearGradient(x, y, x + width, y + height);
  wallColor.addColorStop(0, '#c8a070');
  wallColor.addColorStop(0.5, '#d4a860');
  wallColor.addColorStop(1, '#b88840');
  ctx.fillStyle = wallColor;
  ctx.fillRect(x, y, width, height);

  // Shadow side
  ctx.fillStyle = 'rgba(60,30,0,0.35)';
  ctx.fillRect(x + width * 0.75, y, width * 0.25, height);

  // Arch window
  ctx.fillStyle = '#2a1508';
  ctx.beginPath();
  ctx.rect(x + width * 0.3, y + height * 0.3, width * 0.4, height * 0.35);
  ctx.fill();
  ctx.fillStyle = '#2a1508';
  ctx.beginPath();
  ctx.arc(x + width * 0.5, y + height * 0.3, width * 0.2, Math.PI, 0);
  ctx.fill();

  // Roof parapet
  ctx.fillStyle = '#c0906a';
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(x + (i * width * 0.28), y - height * 0.07, width * 0.18, height * 0.07);
  }
}

function drawShrub(ctx, x, y, size) {
  ctx.fillStyle = '#3a6818';
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2a5010';
  ctx.beginPath();
  ctx.arc(x - size * 0.4, y + size * 0.2, size * 0.7, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + size * 0.5, y + size * 0.3, size * 0.6, 0, Math.PI * 2);
  ctx.fill();
}

function drawIslamicPattern(ctx, W, H, opacity) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = '#d4a030';
  ctx.lineWidth = 1.5;
  const size = 60;
  for (let row = 0; row < Math.ceil(H / size) + 1; row++) {
    for (let col = 0; col < Math.ceil(W / size) + 1; col++) {
      const cx2 = col * size;
      const cy2 = row * size;
      // Simple geometric star pattern
      ctx.save();
      ctx.translate(cx2, cy2);
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        const r1 = size * 0.4;
        const r2 = size * 0.2;
        if (i === 0) ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
        else {
          const aMid = a - Math.PI / 8;
          ctx.lineTo(Math.cos(aMid) * r2, Math.sin(aMid) * r2);
          ctx.lineTo(Math.cos(a) * r1, Math.sin(a) * r1);
        }
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawArabicLantern(ctx, x, y, size, t) {
  const flicker = 0.8 + 0.2 * Math.sin(t * 8.5);
  // Glow — large fill to simulate light spread across screen
  ctx.save();
  const glow = ctx.createRadialGradient(x, y + size * 2, 0, x, y + size * 2, size * 5);
  glow.addColorStop(0, `rgba(255,180,60,${0.5 * flicker})`);
  glow.addColorStop(1, 'rgba(255,100,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(-500, -500, 3000, 3000);

  // Lantern body
  ctx.fillStyle = '#8b6020';
  ctx.fillRect(x - size * 0.6, y + size, size * 1.2, size * 2);
  // Top cap
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - size * 0.6, y + size);
  ctx.lineTo(x + size * 0.6, y + size);
  ctx.closePath();
  ctx.fill();
  // Bottom tassel
  ctx.strokeStyle = '#d4a030';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y + size * 3);
  ctx.lineTo(x, y + size * 4);
  ctx.stroke();
  // Flame
  ctx.fillStyle = `rgba(255,${180 + 40 * flicker},60,${0.9 * flicker})`;
  ctx.beginPath();
  ctx.ellipse(x, y + size * 2, size * 0.2, size * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPrayerCarpet(ctx, cx, cy, cw, ch) {
  ctx.save();
  const carpet = ctx.createLinearGradient(cx - cw/2, cy, cx + cw/2, cy + ch);
  carpet.addColorStop(0, '#8b1a2a');
  carpet.addColorStop(0.5, '#a02035');
  carpet.addColorStop(1, '#6b1420');
  ctx.fillStyle = carpet;
  ctx.fillRect(cx - cw/2, cy, cw, ch);
  // Border
  ctx.strokeStyle = '#d4a030';
  ctx.lineWidth = 3;
  ctx.strokeRect(cx - cw/2 + 8, cy + 6, cw - 16, ch - 12);
  ctx.strokeRect(cx - cw/2 + 14, cy + 11, cw - 28, ch - 22);
  // Mihrab arch
  ctx.fillStyle = 'rgba(212,160,48,0.4)';
  ctx.beginPath();
  ctx.arc(cx, cy + ch * 0.4, cw * 0.15, Math.PI, 0);
  ctx.rect(cx - cw * 0.15, cy + ch * 0.4, cw * 0.30, ch * 0.35);
  ctx.fill();
  ctx.restore();
}

function drawIslamicBookshelf(ctx, x, y, w, h) {
  ctx.fillStyle = '#5a3010';
  ctx.fillRect(x, y, w, h);
  // Shelves
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = '#4a2808';
    ctx.fillRect(x, y + i * h/4 + h/4 - 3, w, 6);
    // Books on shelf
    const bookColors = ['#8b1a1a','#1a3d8b','#1a6b1a','#8b6b1a','#5a1a8b'];
    for (let b = 0; b < 5; b++) {
      ctx.fillStyle = bookColors[b];
      ctx.fillRect(x + 4 + b * (w-8)/5, y + i * h/4 + 5, (w-8)/5 - 2, h/4 - 10);
    }
  }
}

function drawMosqueSilhouette(ctx, cx, groundY, width, height) {
  ctx.save();
  ctx.fillStyle = '#1e1008';

  // Base building
  const bW = width * 0.65;
  const bH = height * 0.45;
  ctx.fillRect(cx - bW / 2, groundY - bH, bW, bH);

  // Arched entrance silhouette (lit from within)
  ctx.fillStyle = '#f5a020';
  ctx.beginPath();
  ctx.arc(cx, groundY - bH * 0.40, bW * 0.12, Math.PI, 0);
  ctx.rect(cx - bW * 0.12, groundY - bH * 0.40, bW * 0.24, bH * 0.40);
  ctx.fill();

  ctx.fillStyle = '#1e1008';
  // Central dome
  const domeR = width * 0.22;
  ctx.beginPath();
  ctx.arc(cx, groundY - bH, domeR, Math.PI, 0);
  ctx.fill();

  // Crescent on dome
  ctx.fillStyle = '#ffd060';
  ctx.beginPath();
  ctx.arc(cx, groundY - bH - domeR - 8, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0d0820';
  ctx.beginPath();
  ctx.arc(cx + 3, groundY - bH - domeR - 8, 6, 0, Math.PI * 2);
  ctx.fill();

  // Left Minaret
  ctx.fillStyle = '#1e1008';
  const minW = width * 0.07;
  const minH = height * 0.95;
  ctx.fillRect(cx - width * 0.42, groundY - minH, minW, minH);
  ctx.beginPath();
  ctx.arc(cx - width * 0.42 + minW / 2, groundY - minH, minW * 0.8, Math.PI, 0);
  ctx.fill();

  // Right Minaret
  ctx.fillRect(cx + width * 0.42 - minW, groundY - minH, minW, minH);
  ctx.beginPath();
  ctx.arc(cx + width * 0.42 - minW / 2, groundY - minH, minW * 0.8, Math.PI, 0);
  ctx.fill();

  ctx.restore();
}

export function drawVignette(ctx, W, H, strength = 0.5) {
  const vg = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, H*0.75);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, `rgba(0,0,0,${strength})`);
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);
}
