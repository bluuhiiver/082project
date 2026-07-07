// Procedural Web-Audio soundscape: ambient bed, generative pads, SFX.
export class AudioSystem {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.volume = 0.7;
    this._padTimer = null;
    this._eventTimer = null;
    this._stepFlip = false;
  }

  ensure() {
    if (this.ctx) { this._resume(); return; }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.volume;
    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 6;
    this.master.connect(comp).connect(this.ctx.destination);

    this._resume();
    // mobile browsers suspend the context outside gestures — re-resume on any input
    const kick = () => this._resume();
    document.addEventListener('touchstart', kick, { passive: true });
    document.addEventListener('pointerdown', kick, { passive: true });
    document.addEventListener('keydown', kick);

    this._startAmbient();
    this._startPads();
    this._scheduleAmbientEvent();
  }

  _resume() {
    if (this.ctx && this.ctx.state !== 'running') this.ctx.resume().catch(() => {});
  }

  setVolume(v) {
    this.volume = v;
    if (this.master) this.master.gain.setTargetAtTime(v, this.ctx.currentTime, 0.05);
  }

  // ── ambient bed ─────────────────────────────────────
  _startAmbient() {
    const ctx = this.ctx;

    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.16;
    droneGain.connect(this.master);
    for (const [freq, gain, type] of [[55, 0.9, 'sine'], [110.5, 0.35, 'sine'], [164.8, 0.12, 'triangle']]) {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = gain;
      o.connect(g).connect(droneGain);
      o.start();
      if (freq === 55) {
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.06;
        const lg = ctx.createGain();
        lg.gain.value = 2.5;
        lfo.connect(lg).connect(o.frequency);
        lfo.start();
      }
    }

    // air-system hiss
    const noise = this._noiseSource();
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 520;
    bp.Q.value = 0.6;
    const ng = ctx.createGain();
    ng.gain.value = 0.028;
    noise.connect(bp).connect(ng).connect(this.master);
    noise.start();

    // deep rumble
    const rumble = this._noiseSource();
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 90;
    const rg = ctx.createGain();
    rg.gain.value = 0.10;
    rumble.connect(lp).connect(rg).connect(this.master);
    rumble.start();
  }

  _noiseSource() {
    const ctx = this.ctx;
    const len = 2 * ctx.sampleRate;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    return src;
  }

  // ── generative pads (slow sci-fi chords) ────────────
  _startPads() {
    const chords = [
      [146.83, 220.00, 293.66],          // D minor-ish
      [130.81, 196.00, 311.13],          // C / Eb color
      [174.61, 220.00, 261.63],          // F
      [146.83, 185.00, 246.94],          // D + F# tension
    ];
    let idx = 0;
    const playChord = () => {
      if (!this.ctx) return;
      const ctx = this.ctx;
      const notes = chords[idx % chords.length];
      idx++;
      const dur = 11;
      for (const f of notes) {
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = f;
        const o2 = ctx.createOscillator();
        o2.type = 'triangle';
        o2.frequency.value = f * 2.003; // slight detune shimmer
        const g = ctx.createGain();
        g.gain.value = 0;
        g.gain.linearRampToValueAtTime(0.045, ctx.currentTime + dur * 0.4);
        g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + dur);
        const g2 = ctx.createGain();
        g2.gain.value = 0.25;
        o.connect(g);
        o2.connect(g2).connect(g);
        g.connect(this.master);
        o.start(); o2.start();
        o.stop(ctx.currentTime + dur + 0.1);
        o2.stop(ctx.currentTime + dur + 0.1);
      }
      this._padTimer = setTimeout(playChord, (dur - 3.5) * 1000);
    };
    playChord();
  }

  // ── random station noises ───────────────────────────
  _scheduleAmbientEvent() {
    const next = 9000 + Math.random() * 14000;
    this._eventTimer = setTimeout(() => {
      const pick = Math.random();
      if (pick < 0.4) this._metalGroan();
      else if (pick < 0.7) this._electricChirp();
      else this._distantThud();
      this._scheduleAmbientEvent();
    }, next);
  }

  _metalGroan() {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(60 + Math.random() * 30, ctx.currentTime);
    o.frequency.linearRampToValueAtTime(40 + Math.random() * 20, ctx.currentTime + 1.8);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 200;
    const g = ctx.createGain();
    g.gain.value = 0;
    g.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.5);
    g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 2.0);
    o.connect(lp).connect(g).connect(this.master);
    o.start();
    o.stop(ctx.currentTime + 2.1);
  }

  _electricChirp() {
    const ctx = this.ctx;
    for (let i = 0; i < 3; i++) {
      const t = ctx.currentTime + i * 0.09;
      const o = ctx.createOscillator();
      o.type = 'square';
      o.frequency.value = 1400 + Math.random() * 900;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.03, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      o.connect(g).connect(this.master);
      o.start(t);
      o.stop(t + 0.06);
    }
  }

  _distantThud() {
    const ctx = this.ctx;
    const noise = this._noiseSource();
    noise.loop = false;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(120, ctx.currentTime);
    lp.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.5);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.22, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    noise.connect(lp).connect(g).connect(this.master);
    noise.start();
    noise.stop(ctx.currentTime + 0.7);
  }

  // ── SFX ─────────────────────────────────────────────
  footstep() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    this._stepFlip = !this._stepFlip;
    const noise = this._noiseSource();
    noise.loop = false;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(this._stepFlip ? 340 : 300, ctx.currentTime);
    lp.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.09);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.35, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.11);
    noise.connect(lp).connect(g).connect(this.master);
    noise.start();
    noise.stop(ctx.currentTime + 0.13);
  }

  jump() { this._blip(240, 0.12, 'triangle', 0.10, 360); }
  land() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const noise = this._noiseSource();
    noise.loop = false;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 150;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.4, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
    noise.connect(lp).connect(g).connect(this.master);
    noise.start();
    noise.stop(ctx.currentTime + 0.18);
  }

  doorOpen() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    // pneumatic hiss sweep
    const noise = this._noiseSource();
    noise.loop = false;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(400, ctx.currentTime);
    bp.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.5);
    bp.Q.value = 1.2;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.12, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
    noise.connect(bp).connect(g).connect(this.master);
    noise.start();
    noise.stop(ctx.currentTime + 0.6);
    // servo
    this._blip(160, 0.4, 'sawtooth', 0.03, 90);
  }

  typeTick() { this._blip(2100 + Math.random() * 300, 0.018, 'square', 0.035); }
  uiHover() { this._blip(660, 0.05, 'sine', 0.05); }
  uiSelect() { this._blip(740, 0.07, 'sine', 0.10, 990); }
  promptShow() { this._blip(980, 0.06, 'sine', 0.06, 1180); }
  dialogueOpen() { this._blip(520, 0.1, 'sine', 0.09, 620); }

  endingSting() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    for (const [f, delay] of [[146.83, 0], [220, 0.15], [293.66, 0.3], [440, 0.45]]) {
      const t = ctx.currentTime + delay;
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.09, t + 0.4);
      g.gain.linearRampToValueAtTime(0.0001, t + 3.6);
      o.connect(g).connect(this.master);
      o.start(t);
      o.stop(t + 3.8);
    }
  }

  _blip(freq = 880, dur = 0.08, type = 'sine', gain = 0.18, glideTo = null) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, ctx.currentTime + dur);
    const g = ctx.createGain();
    g.gain.value = gain;
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    o.connect(g).connect(this.master);
    o.start();
    o.stop(ctx.currentTime + dur + 0.02);
  }
}
