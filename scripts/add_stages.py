import os

code_to_add = """
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
"""

with open('src/environments.js', 'r', encoding='utf-8') as f:
    orig = f.read()

target = 'export function drawEnvironment'
if 'export function drawSavingsStudyStage' not in orig:
    new_content = orig.replace(target, code_to_add + '\n' + target)
    with open('src/environments.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Successfully added stages to environments.js')
else:
    print('Stages already present in environments.js')
