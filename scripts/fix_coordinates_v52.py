# -*- coding: utf-8 -*-
"""
Fine-tuning Script V5.2:
1. Fixes question mark and crown Y coordinates so they float properly above character's head.
2. Fixes arm rotation angles for 'discipline' (hand on heart) and 'point_chart' (pointing up-right to curve).
"""

# 1. Update characters.js for discipline and point_chart arm angles
with open('src/characters.js', 'r', encoding='utf-8') as f:
    char_code = f.read()

# Replace point_chart and discipline in characters.js
old_point = """  } else if (pose === 'point_chart') {
    // Left arm explaining
    drawArticulatedArm(lShoulderX, true, 0.25, 0.10, 'explain');

    // Right arm pointing high towards compounding peak
    drawArticulatedArm(rShoulderX, false, -1.65, -0.45, 'point');"""

new_point = """  } else if (pose === 'point_chart') {
    // Left arm explaining
    drawArticulatedArm(lShoulderX, true, 0.25, 0.10, 'explain');

    // Right arm pointing high towards compounding peak
    drawArticulatedArm(rShoulderX, false, -1.95, -0.20, 'point');"""

old_disc = """  } else if (pose === 'discipline') {
    // Left arm resting
    drawArticulatedArm(lShoulderX, true, 0.06, 0.06, 'open');

    // Right arm hand on heart / chest
    drawArticulatedArm(rShoulderX, false, 0.20, -1.75, 'open');"""

new_disc = """  } else if (pose === 'discipline') {
    // Left arm resting
    drawArticulatedArm(lShoulderX, true, 0.06, 0.06, 'open');

    // Right arm hand on heart / chest
    drawArticulatedArm(rShoulderX, false, -0.18, -2.15, 'open');"""

char_code = char_code.replace(old_point, new_point)
char_code = char_code.replace(old_disc, new_disc)

with open('src/characters.js', 'w', encoding='utf-8') as f:
    f.write(char_code)
print("✓ Updated characters.js arm angles")

# 2. Update story.js for ? and 👑 Y offsets
with open('src/story.js', 'r', encoding='utf-8') as f:
    story_code = f.read()

# Scene 1: Floating ?
story_code = story_code.replace(
    "ctx.fillText('?', walkX + 32 * charScale, charY - 240 * charScale + qFloat);",
    "ctx.fillText('?', walkX + 28 * charScale, charY - 325 * charScale + qFloat);"
)

# Scene 4: Floating 👑
story_code = story_code.replace(
    "ctx.fillText('👑', W * 0.5, charY - 260 * charScale + Math.sin(t * 3) * 4);",
    "ctx.fillText('👑', W * 0.5, charY - 330 * charScale + Math.sin(t * 3) * 4);"
)

with open('src/story.js', 'w', encoding='utf-8') as f:
    f.write(story_code)
print("✓ Updated story.js floating icon offsets")
