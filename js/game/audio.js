export class AudioSystem {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.volume = 0.6;
  }

  ensure() {
    if (this.ctx) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.volume;
    this.master.connect(this.ctx.destination);
    this._startAmbient();
  }

  setVolume(v) {
    this.volume = v;
    if (this.master) this.master.gain.setTargetAtTime(v, this.ctx.currentTime, 0.05);
  }

  _startAmbient() {
    const ctx = this.ctx;
    // low drone
    const drone = ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 48;
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.18;
    drone.connect(droneGain).connect(this.master);
    drone.start();

    const drone2 = ctx.createOscillator();
    drone2.type = 'sine';
    drone2.frequency.value = 72.5;
    const droneGain2 = ctx.createGain();
    droneGain2.gain.value = 0.07;
    drone2.connect(droneGain2).connect(this.master);
    drone2.start();

    // filtered noise hum
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 220;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.05;
    noise.connect(filter).connect(noiseGain).connect(this.master);
    noise.start();

    // slow LFO on drone1 for unease
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 3;
    lfo.connect(lfoGain).connect(drone.frequency);
    lfo.start();
  }

  _blip(freq = 880, dur = 0.08, type = 'sine', gain = 0.18) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.value = gain;
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    o.connect(g).connect(this.master);
    o.start();
    o.stop(ctx.currentTime + dur + 0.02);
  }

  footstep() { this._blip(90 + Math.random() * 20, 0.05, 'triangle', 0.10); }
  jump() { this._blip(300, 0.09, 'square', 0.08); }
  land() { this._blip(120, 0.1, 'triangle', 0.12); }
  uiHover() { this._blip(660, 0.05, 'sine', 0.05); }
  uiSelect() { this._blip(880, 0.09, 'sine', 0.12); }
  doorOpen() { this._blip(200, 0.25, 'sawtooth', 0.05); }
  dialogueOpen() { this._blip(520, 0.12, 'sine', 0.08); }
}
