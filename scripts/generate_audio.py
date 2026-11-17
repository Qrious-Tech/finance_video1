#!/usr/bin/env python3
"""
Bengali Story Motion — High-Fidelity Audio Generator
Generates soft ambient lo-fi storytelling music bed (BGM) and transition SFX.
"""

import math
import struct
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / 'assets'
ASSETS.mkdir(exist_ok=True)

RATE = 48000  # 48kHz studio audio

def generate_bgm(duration=55.0, filename="bgm.wav"):
    total_samples = int(duration * RATE)
    out_path = ASSETS / filename
    
    # Emotional storytelling chord progression (Am9 -> Fmaj7 -> Cmaj -> Gadd9)
    # Each chord lasts ~5.5 seconds
    chords = [
        # Am9: A3 (220), C4 (261.63), E4 (329.63), B4 (493.88)
        [220.0, 261.63, 329.63, 493.88],
        # Fmaj7: F3 (174.61), A3 (220.0), C4 (261.63), E4 (329.63)
        [174.61, 220.0, 261.63, 329.63],
        # Cmaj: C3 (130.81), G3 (196.0), C4 (261.63), E4 (329.63)
        [130.81, 196.0, 261.63, 329.63],
        # Gadd9: G3 (196.0), B3 (246.94), D4 (293.66), A4 (440.0)
        [196.0, 246.94, 293.66, 440.0]
    ]
    chord_len = 5.5  # seconds per chord

    samples = []
    
    for i in range(total_samples):
        t = i / RATE
        chord_idx = int(t / chord_len) % len(chords)
        t_in_chord = t % chord_len
        
        chord = chords[chord_idx]
        
        # Soft envelope: smooth attack, long gentle decay
        env = math.sin(min(1.0, t_in_chord / 1.2) * (math.pi / 2)) * math.exp(-t_in_chord * 0.35)
        
        val_l = 0.0
        val_r = 0.0
        
        for n_idx, freq in enumerate(chord):
            # Harmonic richness with slight detuning for analog warmth
            detune = (n_idx - 1.5) * 0.4
            phase = (freq + detune) * 2 * math.pi * t
            
            # Gentle soft piano/rhodes timbre (fundamental + soft octave harmonic)
            note = math.sin(phase) + 0.35 * math.sin(phase * 2) + 0.12 * math.sin(phase * 3)
            
            # Subtle stereo panning across notes
            pan = (n_idx / (len(chord) - 1)) * 0.5 + 0.25  # 0.25 to 0.75
            val_l += note * (1.0 - pan)
            val_r += note * pan
        
        # Soft tape hiss / warmth texture
        subtle_pad = math.sin(110.0 * 2 * math.pi * t) * 0.08 * math.exp(-t_in_chord * 0.2)
        
        # Master volume scaling for background music
        master_gain = 0.28
        sample_l = (val_l * env * master_gain + subtle_pad * 0.05)
        sample_r = (val_r * env * master_gain + subtle_pad * 0.05)
        
        # Fade in at start and fade out at end
        if t < 2.0:
            fade = t / 2.0
            sample_l *= fade
            sample_r *= fade
        elif t > duration - 2.5:
            fade = max(0.0, (duration - t) / 2.5)
            sample_l *= fade
            sample_r *= fade
            
        # Clamp to 16-bit range
        sample_l = max(-0.95, min(0.95, sample_l))
        sample_r = max(-0.95, min(0.95, sample_r))
        
        int_l = int(sample_l * 32767)
        int_r = int(sample_r * 32767)
        
        samples.append(struct.pack('<hh', int_l, int_r))
        
    with wave.open(str(out_path), 'wb') as wav_file:
        wav_file.setnchannels(2)  # Stereo
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(RATE)
        wav_file.writeframes(b''.join(samples))
        
    print(f"✓ Generated soft background soundtrack: {out_path} ({duration}s)")
    return out_path

def generate_sfx(duration=55.0, filename="sfx_transitions.wav"):
    total_samples = int(duration * RATE)
    out_path = ASSETS / filename
    
    # Scene transition times in story.json: 5.8s, 16.8s, 31.6s, 38.0s, 44.6s
    transition_times = [5.8, 16.8, 31.6, 38.0, 44.6]
    
    samples = []
    
    for i in range(total_samples):
        t = i / RATE
        val = 0.0
        
        # Check if near any transition point (smooth subtle whoosh)
        for tt in transition_times:
            dt = t - (tt - 0.25)
            if 0.0 <= dt <= 0.6:
                # Whoosh frequency sweep
                prog = dt / 0.6
                freq = 180 + 350 * math.sin(prog * math.pi)
                env = math.sin(prog * math.pi) ** 2
                whoosh = math.sin(freq * 2 * math.pi * dt) * env * 0.20
                val += whoosh
                
        # Milestone celebration chime at 31.6s (Scene 4: 1 Crore milestone!)
        dt_chime = t - 31.6
        if 0.0 <= dt_chime <= 2.5:
            # Crystal chime harmonics (E6 = 1318.5Hz, B6 = 1975.5Hz)
            env_c = math.exp(-dt_chime * 2.5) * 0.25
            chime = (math.sin(1318.5 * 2 * math.pi * dt_chime) + 0.6 * math.sin(1975.5 * 2 * math.pi * dt_chime)) * env_c
            val += chime
            
        val = max(-0.95, min(0.95, val))
        int_s = int(val * 32767)
        samples.append(struct.pack('<hh', int_s, int_s))
        
    with wave.open(str(out_path), 'wb') as wav_file:
        wav_file.setnchannels(2)
        wav_file.setsampwidth(2)
        wav_file.setframerate(RATE)
        wav_file.writeframes(b''.join(samples))
        
    print(f"✓ Generated transition SFX track: {out_path} ({duration}s)")
    return out_path

if __name__ == '__main__':
    generate_bgm()
    generate_sfx()
