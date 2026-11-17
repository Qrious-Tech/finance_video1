"""
Islamic Shorts — Voice Generator v3
Generates full narration as ONE file (avoids rate limiting per-segment)
"""
import asyncio
import subprocess
import os
import time

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets')
os.makedirs(OUT_DIR, exist_ok=True)

FULL_SCRIPT = """এক পাপী নারী! অথচ একটি ছোট্ট কাজের কারণে আল্লাহ তার সমস্ত গুনাহ ক্ষমা করে দিলেন! কী ছিল সেই কাজ?

এক নারী, যার জীবন ছিল পাপে ভরা।

একদিন তিনি দেখতে পেলেন, প্রচণ্ড তৃষ্ণায় একটি কুকুর কুয়ার পাশে ছটফট করছে।

কুকুরটি যেন মৃত্যুর দ্বারপ্রান্তে!

নারীটি নিজের জুতা খুললেন, কুয়া থেকে পানি তুললেন এবং কুকুরটিকে পান করালেন।

কিন্তু জানেন, এরপর কী ঘটেছিল?

এই সামান্য দয়ার কাজের কারণে মহান আল্লাহ সেই নারীকে ক্ষমা করে দিলেন!

মনে রাখবেন, আল্লাহর কাছে কোনো ভালো কাজই ছোট নয়।

তাই কাউকে সাহায্য করার সুযোগ পেলে অবহেলা করবেন না।

হয়তো আপনার একটি ছোট্ট নেক আমলই হয়ে উঠবে আল্লাহর ক্ষমা লাভের উসিলা।"""

async def generate_with_retry(text, out_mp3, voice="bn-BD-PradeepNeural", retries=5):
    import edge_tts
    for attempt in range(retries):
        try:
            comm = edge_tts.Communicate(text, voice)
            await comm.save(out_mp3)
            if os.path.exists(out_mp3) and os.path.getsize(out_mp3) > 1000:
                print(f"  ✓ Generated: {os.path.basename(out_mp3)} ({os.path.getsize(out_mp3):,} bytes)")
                return True
        except Exception as e:
            print(f"  Attempt {attempt+1} failed: {e}")
            if attempt < retries - 1:
                wait = 3 * (attempt + 1)
                print(f"  Waiting {wait}s before retry...")
                await asyncio.sleep(wait)
    return False

async def main():
    print("🎙️  Islamic Shorts — Full Narration Generator")
    print("    Voice: bn-BD-PradeepNeural")
    print()

    mp3_path = os.path.join(OUT_DIR, "islamic_full_narration.mp3")
    wav_path = os.path.join(OUT_DIR, "islamic_voice.wav")

    success = await generate_with_retry(FULL_SCRIPT, mp3_path)
    if not success:
        print("❌ Could not generate audio after all retries")
        return

    # Convert to WAV 48kHz mono
    r = subprocess.run([
        "ffmpeg", "-y", "-i", mp3_path,
        "-ar", "48000", "-ac", "1",
        wav_path
    ], capture_output=True, text=True)

    if r.returncode == 0:
        size = os.path.getsize(wav_path)
        print(f"  ✓ islamic_voice.wav ({size:,} bytes)")
    else:
        print(f"  ✗ WAV conversion failed: {r.stderr[:200]}")
        # Use mp3 directly
        wav_path = mp3_path
        print(f"  → Using MP3 directly: {mp3_path}")

    # Get duration
    probe = subprocess.run(["ffmpeg", "-i", wav_path, "-f", "null", "-"],
                           capture_output=True, text=True)
    for line in probe.stderr.split("\n"):
        if "Duration" in line:
            print(f"  ⏱️  {line.strip()}")
            break

    print("\n✅ Voice generation complete!")

if __name__ == "__main__":
    asyncio.run(main())
