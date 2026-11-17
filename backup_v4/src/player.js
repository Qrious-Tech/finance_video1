/**
 * Bengali Story Motion — HTML5 Interactive Canvas Player & Headless Renderer Hook
 */

import { renderStoryFrame } from './story.js';

export class StoryPlayer {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = options.width || 576;
    this.height = options.height || 1024;
    this.fps = options.fps || 30;
    this.duration = options.duration || 89.6;

    this.currentTime = 0;
    this.isPlaying = false;
    this.audio = null;
    this.audioStarted = false;

    this.initAudio(options.audioSrc || '../assets/voice.wav');
    this.setupHooks();
  }

  initAudio(src) {
    this.audio = new Audio(src);
    this.audio.preload = 'auto';
  }

  setupHooks() {
    // Expose headless render hook to window for Playwright/Puppeteer
    window.seekToFrame = (frameIndex, targetFps = 30) => {
      this.currentTime = frameIndex / targetFps;
      this.render();
      return true;
    };

    window.getTotalFrames = (targetFps = 30) => {
      return Math.ceil(this.duration * targetFps);
    };

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePlay();
      }
    });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    if (window.storyAudio) {
      window.storyAudio.init();
    }

    if (this.audio) {
      this.audio.currentTime = this.currentTime;
      this.audio.play().catch(() => {});
    }

    let lastTime = performance.now();
    const loop = (now) => {
      if (!this.isPlaying) return;
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (this.audio && !this.audio.paused) {
        this.currentTime = this.audio.currentTime;
      } else {
        this.currentTime += dt;
      }

      if (this.currentTime >= this.duration) {
        this.currentTime = 0;
        this.pause();
      }

      this.render();
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  pause() {
    this.isPlaying = false;
    if (this.audio) {
      this.audio.pause();
    }
  }

  seek(time) {
    this.currentTime = Math.max(0, Math.min(this.duration, time));
    if (this.audio) {
      this.audio.currentTime = this.currentTime;
    }
    this.render();
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    renderStoryFrame(this.ctx, this.width, this.height, this.currentTime);
  }
}
