/* ═══════════════════════════════════════════════════════════════
   DJ School — engine.js
   덱(재생/템포/큐) + 믹서(EQ/페이더/크로스페이더) 오디오 엔진
   ═══════════════════════════════════════════════════════════════ */
'use strict';
window.DJS = window.DJS || {};
(function (DJS) {

  const dbToGain = (db) => Math.pow(10, db / 20);
  DJS.dbToGain = dbToGain;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  DJS.clamp = clamp;

  /* ═══════════════ Deck ═══════════════ */
  class Deck {
    /**
     * @param {AudioContext} ac
     * @param {'A'|'B'} id
     * @param {AudioNode} destination 믹서 입력
     */
    constructor(ac, id, destination) {
      this.ac = ac;
      this.id = id;

      // 신호 체인: source -> trim -> EQ(low/mid/hi) -> fader -> xf -> master
      this.trim = ac.createGain();
      this.eqLow = ac.createBiquadFilter();
      this.eqLow.type = 'lowshelf'; this.eqLow.frequency.value = 250;
      this.eqMid = ac.createBiquadFilter();
      this.eqMid.type = 'peaking'; this.eqMid.frequency.value = 1100; this.eqMid.Q.value = 0.8;
      this.eqHi = ac.createBiquadFilter();
      this.eqHi.type = 'highshelf'; this.eqHi.frequency.value = 6000;
      this.fader = ac.createGain();
      this.xf = ac.createGain();
      this.analyser = ac.createAnalyser();
      this.analyser.fftSize = 1024;
      this._meterBuf = new Float32Array(this.analyser.fftSize);

      this.trim.connect(this.eqLow);
      this.eqLow.connect(this.eqMid);
      this.eqMid.connect(this.eqHi);
      this.eqHi.connect(this.fader);
      this.fader.connect(this.xf);
      this.fader.connect(this.analyser); // 채널 미터 (크로스페이더 이전)
      this.xf.connect(destination);

      // 상태
      this.track = null;       // 트랙 정의
      this.buffer = null;      // AudioBuffer
      this.waveform = null;    // {peaks, lows, res}
      this.meta = null;        // trackMeta
      this.playing = false;
      this.rate = 1;           // 템포 슬라이더 배율
      this.nudgeMul = 1;       // 넛지 임시 배율
      this.basePos = 0;        // 마지막 기준 트랙 위치(초)
      this.baseTime = 0;       // 기준 시점의 ctx.currentTime
      this.cuePoint = 0;
      this.hotCues = [null, null, null, null];
      this.quantize = true;
      this.loading = false;
      this._src = null;
      this._gen = 0;

      // 값 저장 (dB)
      this.trimDb = 0;
      this.eqDb = { low: 0, mid: 0, hi: 0 };
      this.faderVal = 1;

      this.onChange = null;    // UI 갱신 콜백
      this.onEnded = null;
    }

    _emit() { if (this.onChange) this.onChange(this); }

    get duration() { return this.buffer ? this.buffer.duration : 0; }

    currentRate() { return this.rate * this.nudgeMul; }

    effBpm() { return this.track ? this.track.bpm * this.rate : 0; }

    posNow() {
      if (!this.buffer) return 0;
      if (!this.playing) return this.basePos;
      return clamp(this.basePos + (this.ac.currentTime - this.baseTime) * this.currentRate(), 0, this.duration);
    }

    /* 현재 위치의 비트 인덱스(소수, 트랙 그리드 기준) */
    beatPos(pos = this.posNow()) {
      if (!this.track) return 0;
      return pos * this.track.bpm / 60;
    }

    sectionNow() {
      if (!this.track) return null;
      return DJS.sectionAt(this.track, this.posNow());
    }

    /* 위치 기준점 갱신 (rate 변경/조회 안정화용) */
    _fold() {
      if (this.playing) {
        this.basePos = this.posNow();
        this.baseTime = this.ac.currentTime;
      }
    }

    /* 로드 요청 직렬화 — 로딩 중 새 요청이 와도 유실되지 않게 큐잉 */
    load(trackDef) {
      this._loadChain = (this._loadChain || Promise.resolve())
        .then(() => this._doLoad(trackDef));
      return this._loadChain;
    }

    async _doLoad(trackDef) {
      this.loading = true;
      this._emit();
      try {
        const buffer = await DJS.getTrackBuffer(trackDef);
        this.stopSource();
        this.playing = false;
        this.track = trackDef;
        this.buffer = buffer;
        this.meta = DJS.trackMeta(trackDef);
        this.waveform = DJS.computeWaveform(buffer);
        this.basePos = 0;
        this.cuePoint = 0;
        this.hotCues = [null, null, null, null];
        this.rate = 1;
        this.nudgeMul = 1;
      } finally {
        this.loading = false;
      }
      this._emit();
    }

    stopSource() {
      this._gen++;
      if (this._src) {
        try { this._src.stop(); } catch (e) { /* 이미 정지됨 */ }
        try { this._src.disconnect(); } catch (e) { /* noop */ }
        this._src = null;
      }
    }

    _startSource(offset) {
      const src = this.ac.createBufferSource();
      src.buffer = this.buffer;
      src.playbackRate.value = this.currentRate();
      src.connect(this.trim);
      const gen = ++this._gen;
      src.onended = () => {
        if (gen !== this._gen) return; // 우리가 교체/정지한 소스
        this.playing = false;
        this.basePos = this.duration;
        this._src = null;
        this._emit();
        if (this.onEnded) this.onEnded(this);
      };
      src.start(0, clamp(offset, 0, Math.max(0, this.duration - 0.001)));
      this._src = src;
    }

    play() {
      if (!this.buffer || this.playing) return;
      if (this.basePos >= this.duration - 0.01) this.basePos = 0;
      this._startSource(this.basePos);
      this.baseTime = this.ac.currentTime;
      this.playing = true;
      this._emit();
    }

    pause() {
      if (!this.playing) return;
      this.basePos = this.posNow();
      this.playing = false;
      this.stopSource();
      this._emit();
    }

    toggle() { this.playing ? this.pause() : this.play(); }

    seek(pos) {
      if (!this.buffer) return;
      pos = clamp(pos, 0, this.duration);
      if (this.playing) {
        this.stopSource();
        this._startSource(pos);
        this.basePos = pos;
        this.baseTime = this.ac.currentTime;
        this.playing = true;
      } else {
        this.basePos = pos;
      }
      this._emit();
    }

    /* CUE 버튼 (CDJ 스타일):
       - 재생 중: 큐 포인트로 돌아가 정지
       - 정지 중: 현재 위치를 큐 포인트로 설정 */
    cue() {
      if (!this.buffer) return;
      if (this.playing) {
        this.pause();
        this.seek(this.cuePoint);
      } else {
        this.cuePoint = this.quantize ? this.snapToBeat(this.basePos) : this.basePos;
        this.seek(this.cuePoint);
      }
      this._emit();
    }

    snapToBeat(pos) {
      if (!this.track) return pos;
      const beat = 60 / this.track.bpm;
      return clamp(Math.round(pos / beat) * beat, 0, this.duration);
    }

    setRate(r) {
      r = clamp(r, 0.7, 1.3);
      this._fold();
      this.rate = r;
      if (this._src) this._src.playbackRate.setValueAtTime(this.currentRate(), this.ac.currentTime);
      this._emit();
    }

    /* 템포 슬라이더 값(-8~+8%)으로 설정 */
    setTempoPercent(p) { this.setRate(1 + p / 100); }
    tempoPercent() { return (this.rate - 1) * 100; }

    nudge(mul) {
      this._fold();
      this.nudgeMul = mul;
      if (this._src) this._src.playbackRate.setValueAtTime(this.currentRate(), this.ac.currentTime);
    }
    nudgeEnd() { this.nudge(1); }

    /* HOT CUE: 미설정 → 현재 위치 저장 / 설정됨 → 점프(+재생) */
    hotCue(i) {
      if (!this.buffer) return;
      if (this.hotCues[i] === null) {
        const p = this.quantize ? this.snapToBeat(this.posNow()) : this.posNow();
        this.hotCues[i] = p;
      } else {
        this.seek(this.hotCues[i]);
        if (!this.playing) this.play();
      }
      this._emit();
    }

    clearHotCue(i) {
      this.hotCues[i] = null;
      this._emit();
    }

    /* 다른 덱에 BPM+비트 위상 동기화 */
    sync(other) {
      if (!this.track || !other.track) return;
      const target = other.effBpm();
      if (target > 0) this.setRate(clamp(target / this.track.bpm, 0.7, 1.3));
      if (this.playing && other.playing) {
        // 비트 위상 정렬: 소수 비트 차이만큼 이동
        const phA = other.beatPos() % 1;
        const phB = this.beatPos() % 1;
        let d = phA - phB;
        if (d > 0.5) d -= 1;
        if (d < -0.5) d += 1;
        const beatLocal = 60 / this.track.bpm;
        let target = this.posNow() + d * beatLocal;
        // 트랙 경계 밖이면 한 비트 반대쪽으로 (정렬 효과는 동일)
        if (target < 0) target += beatLocal;
        if (target > this.duration) target -= beatLocal;
        this.seek(target);
      }
      this._emit();
    }

    /* 믹서 파라미터 */
    setTrimDb(db) {
      this.trimDb = clamp(db, -12, 12);
      this.trim.gain.setTargetAtTime(dbToGain(this.trimDb), this.ac.currentTime, 0.01);
      this._emit();
    }
    setEqDb(band, db) {
      db = clamp(db, -26, 6);
      this.eqDb[band] = db;
      const node = band === 'low' ? this.eqLow : band === 'mid' ? this.eqMid : this.eqHi;
      node.gain.setTargetAtTime(db, this.ac.currentTime, 0.01);
      this._emit();
    }
    setFader(v) {
      this.faderVal = clamp(v, 0, 1);
      // 페이더 커브 (거듭제곱)
      this.fader.gain.setTargetAtTime(Math.pow(this.faderVal, 1.6), this.ac.currentTime, 0.01);
      this._emit();
    }

    meterLevel() {
      this.analyser.getFloatTimeDomainData(this._meterBuf);
      let sum = 0, pk = 0;
      for (let i = 0; i < this._meterBuf.length; i++) {
        const v = this._meterBuf[i];
        sum += v * v;
        const a = Math.abs(v);
        if (a > pk) pk = a;
      }
      return { rms: Math.sqrt(sum / this._meterBuf.length), peak: pk };
    }
  }

  /* ═══════════════ Mixer / 전체 시스템 ═══════════════ */
  class DJSystem {
    constructor() {
      this.ac = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: 'interactive' });

      this.masterIn = this.ac.createGain();
      this.masterGain = this.ac.createGain();
      this.limiter = this.ac.createDynamicsCompressor();
      this.limiter.threshold.value = -3;
      this.limiter.knee.value = 1;
      this.limiter.ratio.value = 16;
      this.limiter.attack.value = 0.002;
      this.limiter.release.value = 0.12;
      this.masterAnalyser = this.ac.createAnalyser();
      this.masterAnalyser.fftSize = 1024;
      this._masterBuf = new Float32Array(this.masterAnalyser.fftSize);

      this.masterIn.connect(this.masterGain);
      this.masterGain.connect(this.limiter);
      this.limiter.connect(this.masterAnalyser);
      this.masterAnalyser.connect(this.ac.destination);

      this.deckA = new Deck(this.ac, 'A', this.masterIn);
      this.deckB = new Deck(this.ac, 'B', this.masterIn);

      this.xfVal = 0.5;
      this.setCrossfader(0.5);
      this.setMasterVolume(0.85);
    }

    async resume() {
      if (this.ac.state !== 'running') await this.ac.resume();
    }

    deck(id) { return id === 'A' ? this.deckA : this.deckB; }

    /* 크로스페이더 0=A, 1=B (equal power) */
    setCrossfader(x) {
      this.xfVal = clamp(x, 0, 1);
      const gA = Math.cos(this.xfVal * Math.PI / 2);
      const gB = Math.cos((1 - this.xfVal) * Math.PI / 2);
      this.deckA.xf.gain.setTargetAtTime(gA, this.ac.currentTime, 0.008);
      this.deckB.xf.gain.setTargetAtTime(gB, this.ac.currentTime, 0.008);
    }

    xfGainOf(id) {
      const x = this.xfVal;
      return id === 'A' ? Math.cos(x * Math.PI / 2) : Math.cos((1 - x) * Math.PI / 2);
    }

    setMasterVolume(v) {
      this.masterVol = clamp(v, 0, 1);
      this.masterGain.gain.setTargetAtTime(this.masterVol * this.masterVol, this.ac.currentTime, 0.01);
    }

    masterLevel() {
      this.masterAnalyser.getFloatTimeDomainData(this._masterBuf);
      let sum = 0, pk = 0;
      for (let i = 0; i < this._masterBuf.length; i++) {
        const v = this._masterBuf[i];
        sum += v * v;
        const a = Math.abs(v);
        if (a > pk) pk = a;
      }
      return { rms: Math.sqrt(sum / this._masterBuf.length), peak: pk };
    }

    /* 덱이 실제로 들리는 정도 (0~1) — 레슨/피드백 판정용 */
    audibility(id) {
      const d = this.deck(id);
      if (!d.playing) return 0;
      return Math.pow(d.faderVal, 1.6) * this.xfGainOf(id) * dbToGain(Math.min(0, d.trimDb)) * this.masterVol;
    }

    /* 두 덱 모두 재생 중일 때 비트 위상 차 (ms, B가 늦으면 +) */
    beatOffsetMs() {
      const a = this.deckA, b = this.deckB;
      if (!a.track || !b.track || !a.playing || !b.playing) return null;
      const phA = a.beatPos() % 1;
      const phB = b.beatPos() % 1;
      let d = phA - phB;
      if (d > 0.5) d -= 1;
      if (d < -0.5) d += 1;
      const beatSec = 60 / a.effBpm();
      return d * beatSec * 1000;
    }
  }

  DJS.Deck = Deck;
  DJS.DJSystem = DJSystem;

})(window.DJS);
