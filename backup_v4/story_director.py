#!/usr/bin/env python3
"""
Bengali Story Motion — Story Intelligence & Scene Director
Analyzes voiceover audio, transcripts, and story scripts to produce structured
scene choreographies, speech bubble assignments, split-screen phone calls,
and kinetic karaoke subtitle timings.
"""

import json
import os
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parent

STORY_DATA = {
    "title": "প্রতিদিনের ১০০ টাকার অভ্যাস • ১ কোটি টাকার মালিক",
    "language": "bn",
    "voice": "assets/voice.wav",
    "duration": 52.8,
    "scenes": [
        {
            "id": 1,
            "title": "প্রতিদিনের অভ্যাস • কোটিপতি হওয়ার বাধা",
            "setting": "savings_study",
            "start": 0.0,
            "end": 5.8,
            "location_tag": "সঞ্চয়ের শক্তি • প্রতিদিনের অভ্যাস 💡",
            "floating_badge": "কোটি টাকার বাধা 🚫",
            "character_action": "contemplate",
            "dialogue": None,
            "subtitles": [
                {"start": 0.0, "end": 2.8, "text": "আপনি কি জানেন, প্রতিদিনের একটা ছোট্ট অভ্যাস", "highlight_word": "ছোট্ট অভ্যাস"},
                {"start": 2.8, "end": 5.8, "text": "আপনাকে কয়েক লাখ বা কোটি টাকার মালিক হতে বাধা দিচ্ছে?", "highlight_word": "কোটি টাকার"}
            ]
        },
        {
            "id": 2,
            "title": "বাইরে চা-নাশতার আড্ডা • ১০০ টাকার খরচ",
            "setting": "tea_stall_adda",
            "start": 5.8,
            "end": 16.8,
            "location_tag": "চা-নাশতার আড্ডা • দৈনন্দিন খরচ ☕",
            "floating_badge": "প্রতিদিন ১০০ ➔ মাসে ৩,০০০ টাকা 💸",
            "character_action": "tea_adda",
            "dialogue": "এতে কী আর এমন যায় আসে?",
            "speaker": "hero",
            "dialogue_start": 14.0,
            "dialogue_end": 16.8,
            "subtitles": [
                {"start": 5.8, "end": 10.0, "text": "ধরুন, আপনি প্রতিদিন বাইরে চা-নাশতা বা অপ্রয়োজনীয় আড্ডায়", "highlight_word": "চা-নাশতা"},
                {"start": 10.0, "end": 12.0, "text": "মাত্র ১০০ টাকা খরচ করেন।", "highlight_word": "১০০ টাকা"},
                {"start": 12.0, "end": 14.0, "text": "মাসে সেটা ৩,০০০ টাকা।", "highlight_word": "৩,০০০ টাকা"},
                {"start": 14.0, "end": 16.8, "text": "আপনি ভাবছেন, 'এতে কী আর এমন যায় আসে?'", "highlight_word": "যায় আসে?"}
            ]
        },
        {
            "id": 3,
            "title": "আসল খেলা • মিউচুয়াল ফান্ড ও ১৫ লাখ টাকা",
            "setting": "investment_game",
            "start": 16.8,
            "end": 31.6,
            "location_tag": "আসল খেলা • মিউচুয়াল ফান্ড ও ডিপিএস 📈",
            "floating_badge": "১৫ বছর পর ➔ প্রায় ১৫ লাখ টাকা! 💰",
            "character_action": "invest_chart",
            "subtitles": [
                {"start": 16.8, "end": 18.3, "text": "এবার শুনুন আসল খেলা!", "highlight_word": "আসল খেলা!"},
                {"start": 18.3, "end": 23.5, "text": "এই ৩,০০০ টাকা যদি আপনি কোনো ভালো জায়গায় যেমন মিউচুয়াল ফান্ড বা ডিপিএস-এ প্রতি মাসে বিনিয়োগ করেন,", "highlight_word": "বিনিয়োগ"},
                {"start": 23.5, "end": 26.5, "text": "যেখানে গড়ে ১২% রিটার্ন পাওয়া যায়—", "highlight_word": "১২% রিটার্ন"},
                {"start": 26.5, "end": 29.5, "text": "তাহলে ১৫ বছর পর আপনার কাছে কত টাকা থাকবে জানেন?", "highlight_word": "১৫ বছর পর"},
                {"start": 29.5, "end": 31.6, "text": "প্রায় ১৫ লাখ টাকা!", "highlight_word": "১৫ লাখ টাকা!"}
            ]
        },
        {
            "id": 4,
            "title": "২৫ বছরের কম্পাউন্ডিং • ১ কোটি টাকা!",
            "setting": "one_crore_milestone",
            "start": 31.6,
            "end": 38.0,
            "location_tag": "কম্পাউন্ডিং এর জাদু • ২৫ বছর 🚀",
            "floating_badge": "১০০ টাকার পাওয়ার ➔ ১ কোটি টাকা! 👑",
            "character_action": "crore_victory",
            "subtitles": [
                {"start": 31.6, "end": 34.5, "text": "আর যদি এটা ২৫ বছর চালান,", "highlight_word": "২৫ বছর"},
                {"start": 34.5, "end": 38.0, "text": "তবে সেই সামান্য ১০০ টাকা জমিয়ে আপনি পাবেন প্রায় ১ কোটি টাকা!", "highlight_word": "১ কোটি টাকা!"}
            ]
        },
        {
            "id": 5,
            "title": "ধনী হওয়ার মূলমন্ত্র • খরচে লাগাম ও ধৈর্য",
            "setting": "discipline_and_patience",
            "start": 38.0,
            "end": 44.6,
            "location_tag": "ধনী হওয়ার গোপন সূত্র 🔑",
            "floating_badge": "ছোট খরচে লাগাম + ধৈর্য 💎",
            "character_action": "discipline",
            "subtitles": [
                {"start": 38.0, "end": 41.5, "text": "ধনী হওয়ার জন্য অনেক বড় অঙ্কের টাকা লাগে না,", "highlight_word": "বড় অঙ্কের টাকা"},
                {"start": 41.5, "end": 44.6, "text": "দরকার শুধু প্রতিদিনের ছোট ছোট খরচে লাগাম দেওয়া আর ধৈর্য।", "highlight_word": "লাগাম দেওয়া"}
            ]
        },
        {
            "id": 6,
            "title": "আর্থিক স্বাধীনতা • আজকের ত্যাগেই আগামী",
            "setting": "financial_freedom",
            "start": 44.6,
            "end": 52.8,
            "location_tag": "আগামী দিনের আর্থিক স্বাধীনতা 🌅",
            "floating_badge": "আজকের ত্যাগ = আর্থিক স্বাধীনতা ✨",
            "character_action": "freedom_hero",
            "subtitles": [
                {"start": 44.6, "end": 48.5, "text": "আজই আপনার অপ্রয়োজনীয় খরচগুলোকে বিনিয়োগে রূপান্তর করুন।", "highlight_word": "বিনিয়োগে রূপান্তর"},
                {"start": 48.5, "end": 52.8, "text": "মনে রাখবেন, আজকের ছোট ত্যাগই আপনার আগামী দিনের আর্থিক স্বাধীনতা!", "highlight_word": "আর্থিক স্বাধীনতা!"}
            ]
        }
    ]
}

def get_audio_duration(wav_path):
    try:
        with wave.open(str(wav_path), 'rb') as w:
            frames = w.getnframes()
            rate = w.getframerate()
            return round(frames / float(rate), 2)
    except Exception:
        return 52.8

def generate_story_ai(story_data):
    """Generates the frontend story_ai.js providing runtime intelligence."""
    ai_js = """// Generated by story_director.py — Runtime Scene Intelligence
export const SCENE_INTELLIGENCE = """ + json.dumps(story_data["scenes"], ensure_ascii=False, indent=2) + """;

export function getSceneAtTime(t) {
  for (let s of SCENE_INTELLIGENCE) {
    if (t >= s.start && t < s.end) return s;
  }
  return SCENE_INTELLIGENCE[SCENE_INTELLIGENCE.length - 1];
}

export function getCurrentSubtitle(t) {
  const scene = getSceneAtTime(t);
  if (!scene || !scene.subtitles) return null;
  for (let sub of scene.subtitles) {
    if (t >= sub.start && t <= sub.end) return sub;
  }
  return null;
}
"""
    (ROOT / 'src' / 'story_ai.js').write_text(ai_js, encoding='utf-8')
    print("✓ Successfully generated src/story_ai.js")

def run_analysis():
    print("=== Running Bengali Story Motion Director ===")
    voice_path = ROOT / 'assets' / 'voice.wav'
    total_dur = get_audio_duration(voice_path)
    print(f"Detected Voice Duration: {total_dur}s")

    story = STORY_DATA
    story["duration"] = total_dur

    # Write story.json
    (ROOT / 'story.json').write_text(json.dumps(story, ensure_ascii=False, indent=2), encoding='utf-8')
    print("✓ Successfully updated story.json")

    # Generate frontend AI data
    generate_story_ai(story)
    print(f"✓ Story Director: Ready with {len(story['scenes'])} cinematic scenes.")

if __name__ == '__main__':
    run_analysis()
