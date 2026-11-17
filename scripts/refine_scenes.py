import re

# 1. Update src/environments.js drawTeaStallStage
with open('src/environments.js', 'r', encoding='utf-8') as f:
    env_code = f.read()

old_tea_start = "export function drawTeaStallStage(ctx, W, H, t) {"
old_tea_end = "// 9. Investment & Compounding Growth Stage"

new_tea_stage = """export function drawTeaStallStage(ctx, W, H, t) {
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

"""

pos1 = env_code.find(old_tea_start)
pos2 = env_code.find(old_tea_end)
if pos1 != -1 and pos2 != -1:
    env_code = env_code[:pos1] + new_tea_stage + env_code[pos2:]
    with open('src/environments.js', 'w', encoding='utf-8') as f:
        f.write(env_code)
    print('Updated drawTeaStallStage in src/environments.js')

# 2. Update Scene 2 and Scene 4 in src/story.js
with open('src/story.js', 'r', encoding='utf-8') as f:
    story_code = f.read()

# In Scene 2: replace supporting friend with young boy in teal kurta!
old_scene2_supporting = """    // Adda Colleague / Friend on the right listening
    drawSupportingCharacter(ctx, W * (isPortrait ? 0.75 : 0.70), charY, charScale * 0.95, t, {
      shirtColor: '#f97316',
      mustache: false
    });"""

new_scene2_supporting = """    // Curious young boy in teal kurta on the right listening attentively
    const boySpeaking = (local >= 8.2);
    drawStoryteller(ctx, W * (isPortrait ? 0.76 : 0.70), charY, charScale * 0.88, t, {
      pose: 'boy',
      talking: boySpeaking
    });"""

story_code = story_code.replace(old_scene2_supporting, new_scene2_supporting)

# Update speech bubble pointing to the boy
old_bubble = """    // Speech Bubble: "এতে কী আর এমন যায় আসে?"
    if (isHeroSpeaking) {
      const bubbleScale = easeOutBack(cl((local - 8.2) / 0.4));
      ctx.save();
      ctx.translate(W * (isPortrait ? 0.42 : 0.40), isPortrait ? H * 0.28 : H * 0.25);
      ctx.scale(bubbleScale, bubbleScale);
      drawSpeechBubble(ctx, 0, 0, 'এতে কী আর এমন যায় আসে?', {
        tailX: -18
      });
      ctx.restore();
    }"""

new_bubble = """    // Speech Bubble: "এতে কী আর এমন যায় আসে?" pointing directly to speaking boy!
    if (boySpeaking) {
      const bubbleScale = easeOutBack(cl((local - 8.2) / 0.4));
      ctx.save();
      ctx.translate(W * (isPortrait ? 0.68 : 0.66), isPortrait ? H * 0.32 : H * 0.28);
      ctx.scale(bubbleScale, bubbleScale);
      drawSpeechBubble(ctx, 0, 0, 'এতে কী আর এমন যায় আসে?', {
        tailX: 20
      });
      ctx.restore();
    }"""

story_code = story_code.replace(old_bubble, new_bubble)

# Fix crown position in Scene 4
story_code = story_code.replace("charY - 260 * charScale + Math.sin(t * 3) * 4", "charY - 365 * charScale + Math.sin(t * 3) * 4")

with open('src/story.js', 'w', encoding='utf-8') as f:
    f.write(story_code)

print('Updated src/story.js scene 2 and scene 4 successfully')
