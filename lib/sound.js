/**
 * Procedural Web Audio Sound Synthesizer for Bengali Story Motion
 * Generates phone rings, pickup clicks, ambient room tone, lo-fi storytelling chord bed,
 * and foley without any external audio sample dependencies.
 */
class StoryAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.musicGain = null;
    this.sfxGain = null;
    this.ambGain = null;
    this.masterGain = null;
    this.isDucked = false;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    this.musicGain.connect(this.masterGain);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(0.60, this.ctx.currentTime);
    this.sfxGain.connect(this.masterGain);

    this.ambGain = this.ctx.createGain();
    this.ambGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    this.ambGain.connect(this.masterGain);

    this.startAmbientBed();
  }

  duckMusic(duck = true) {
    if (!this.musicGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    const target = duck ? 0.20 : 0.40;
    this.musicGain.gain.cancelScheduledValues(now);
    this.musicGain.gain.linearRampToValueAtTime(target, now + 0.3);
  }

  // Soft melancholic storytelling chord progression
  startAmbientBed() {
    if (!this.ctx) return;
    // Emotional minor chord loop (A minor - F major - C major - G major)
    const chords = [
      [220.0, 261.63, 329.63], // Am (A3, C4, E4)
      [174.61, 220.0, 261.63], // F  (F3, A3, C4)
      [130.81, 164.81, 196.0], // C  (C3, E3, G3)
      [196.0, 246.94, 293.66]  // G  (G3, B3, D4)
    ];

    let chordIdx = 0;
    const playChord = () => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = chords[chordIdx % chords.length];
      chordIdx++;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Warm detuning for tape aesthetic
        osc.detune.setValueAtTime((idx - 1) * 3, now);

        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(0.045, now + 1.2);
        g.gain.exponentialRampToValueAtTime(0.001, now + 5.5);

        osc.connect(g);
        g.connect(this.musicGain);

        osc.start(now);
        osc.stop(now + 6.0);
      });

      // Schedule next chord
      setTimeout(playChord, 5200);
    };

    playChord();
  }

  // Phone Ring (Trr-Trr dual frequency standard)
  playPhoneRing() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [440, 480].forEach(freq => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Pulse 1
      g.gain.setValueAtTime(0.12, now);
      g.gain.setValueAtTime(0.12, now + 0.4);
      g.gain.setValueAtTime(0.001, now + 0.45);
      // Pulse 2
      g.gain.setValueAtTime(0.12, now + 0.6);
      g.gain.setValueAtTime(0.12, now + 1.0);
      g.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

      osc.connect(g);
      g.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 1.2);
    });
  }

  // Phone Pickup Click
  playPhonePickup() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

    g.gain.setValueAtTime(0.25, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(g);
    g.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Phone Disconnect / Busy Tone
  playPhoneDisconnect() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(425, now);

    for (let i = 0; i < 3; i++) {
      const t = now + i * 0.35;
      g.gain.setValueAtTime(0.08, t);
      g.gain.setValueAtTime(0.001, t + 0.2);
    }

    osc.connect(g);
    g.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 1.1);
  }

  // Currency Rustle / Card Pop
  playPop() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

    g.gain.setValueAtTime(0.18, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(g);
    g.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.15);
  }
}

window.storyAudio = new StoryAudioEngine();
