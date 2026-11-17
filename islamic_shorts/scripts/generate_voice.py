"""
Islamic Shorts — Bengali Voice Generator v2
Uses edge-tts bn-BD-PradeepNeural (Male, 35yo RJ style)
Fixed: pitch/rate format for newer edge-tts
"""
import asyncio
import subprocess
import os
import json

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets')
os.makedirs(OUT_DIR, exist_ok=True)

# Full script segments
SEGMENTS = [
    ("hook",         "এক পাপী নারী! অথচ একটি ছোট্ট কাজের কারণে আল্লাহ তার সমস্ত গুনাহ ক্ষমা করে দিলেন! কী ছিল সেই কাজ?"),
    ("s1_woman",     "এক নারী, যার জীবন ছিল পাপে ভরা।"),
    ("s2_dog_well",  "একদিন তিনি দেখতে পেলেন, প্রচণ্ড তৃষ্ণায় একটি কুকুর কুয়ার পাশে ছটফট করছে।"),
    ("s3_dying",     "কুকুরটি যেন মৃত্যুর দ্বারপ্রান্তে!"),
    ("s4_rescue",    "নারীটি নিজের জুতা খুললেন, কুয়া থেকে পানি তুললেন এবং কুকুরটিকে পান করালেন।"),
    ("s5_pause",     "কিন্তু জানেন, এরপর কী ঘটেছিল?"),
    ("s6_forgive",   "এই সামান্য দয়ার কাজের কারণে মহান আল্লাহ সেই নারীকে ক্ষমা করে দিলেন!"),
    ("s7_lesson1",   "মনে রাখবেন, আল্লাহর কাছে কোনো ভালো কাজই ছোট নয়।"),
    ("s8_lesson2",   "তাই কাউকে সাহায্য করার সুযোগ পেলে অবহেলা করবেন না।"),
    ("s9_ending",    "হয়তো আপনার একটি ছোট্ট নেক আমলই হয়ে উঠবে আল্লাহর ক্ষমা লাভের উসিলা।"),
]

FULL_TEXT = "\n".join(seg[1] for seg in SEGMENTS)

async def gen_seg(seg_id, text):
    import edge_tts
    # Use simpler rate-only approach (no pitch) for maximum compatibility
    comm = edge_tts.Communicate(text, "bn-BD-PradeepNeural", rate="-5%")
    out_path = os.path.join(OUT_DIR, f"voice_{seg_id}.mp3")
    await comm.save(out_path)
    size = os.path.getsize(out_path)
    print(f"  ✓ {seg_id}: {size} bytes")
    return out_path

async def main():
    print("🎙️ Islamic Shorts — Bengali Voice Generation")
    print("   Voice: bn-BD-PradeepNeural (Male, Bengali RJ)")
    print()

    files = []
    for seg_id, text in SEGMENTS:
        try:
            f = await gen_seg(seg_id, text)
            files.append(f)
        except Exception as e:
            print(f"  ✗ {seg_id}: {e}")
            files.append(None)

    # Concat using ffmpeg
    valid_files = [f for f in files if f and os.path.exists(f)]
    concat_txt = os.path.join(OUT_DIR, "islamic_concat.txt")
    with open(concat_txt, "w", encoding="utf-8") as f:
        for fp in valid_files:
            f.write(f"file '{fp.replace(chr(92), '/')}'\n")

    final_wav = os.path.join(OUT_DIR, "islamic_voice.wav")
    r = subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
        "-i", concat_txt,
        "-ar", "48000", "-ac", "1", final_wav
    ], capture_output=True, text=True)

    if r.returncode == 0:
        size = os.path.getsize(final_wav)
        print(f"\n✅ islamic_voice.wav created ({size:,} bytes)")
    else:
        print(f"\n✗ ffmpeg error: {r.stderr[:300]}")

    # Get duration
    probe = subprocess.run([
        "ffmpeg", "-i", final_wav, "-f", "null", "-"
    ], capture_output=True, text=True)
    for line in probe.stderr.split("\n"):
        if "Duration" in line:
            print(f"⏱️  {line.strip()}")
            break

    # Save manifest
    manifest = {
        "voice": "bn-BD-PradeepNeural",
        "segments": [{"id": s[0], "text": s[1]} for s in SEGMENTS],
        "output": "islamic_voice.wav"
    }
    with open(os.path.join(OUT_DIR, "voice_manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print("📄 voice_manifest.json saved")

if __name__ == "__main__":
    asyncio.run(main())
