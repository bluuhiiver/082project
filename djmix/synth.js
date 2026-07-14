/* ═══════════════════════════════════════════════════════════════
   DJ School — synth.js
   내장 데모 트랙 신디사이저 (OfflineAudioContext 렌더링)
   각 트랙은 BPM 그리드/섹션 구조 메타데이터를 갖고 있어
   비트매칭·구간 믹싱 레슨의 기준이 된다.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
window.DJS = window.DJS || {};
(function (DJS) {

  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

  /* ── 섹션 타입별 색 (파형/라벨 공용) ── */
  DJS.SECTION_COLORS = {
    intro:  '#5b7a99',
    verse:  '#2dd4a7',
    chorus: '#f471b5',
    outro:  '#8b7ad9',
  };
  DJS.SECTION_NAMES = {
    intro: '인트로', verse: '벌스', chorus: '코러스', outro: '아웃트로',
  };

  /* ── 16스텝 패턴 프리셋 ──
     kick/clap/hat/ohat: velocity(0~1) 16스텝
     bass: 세미톤 오프셋(코드 루트 기준) 또는 null, 16스텝
     stab: 코드 스탭 velocity 16스텝
     lead: 세미톤 오프셋 또는 null, 32스텝(2마디) */
  const FOUR_FLOOR = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
  const CLAP_24    = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];

  /* ── 데모 트랙 정의 ── */
  DJS.TRACKS = [
    {
      id: 'sunrise', title: 'Sunrise Drive', artist: 'DJ School', bpm: 124,
      key: 'A min', style: 'House', color: '#f59e0b',
      root: 33, // A1
      prog: [{ o: 0, m: true }, { o: 8, m: false }, { o: 3, m: false }, { o: 10, m: false }], // Am F C G
      patterns: {
        kick: FOUR_FLOOR, clap: CLAP_24,
        hat:  [0, 0, .5, 0, 0, 0, .5, 0, 0, 0, .5, 0, 0, 0, .5, .3],
        ohat: [0, 0, .9, 0, 0, 0, .9, 0, 0, 0, .9, 0, 0, 0, .9, 0],
        bass: [0, null, 0, null, 0, null, 0, 12, 0, null, 0, null, 0, null, 7, 10],
        stab: [0, 0, .9, 0, 0, 0, 0, .6, 0, 0, .9, 0, 0, 0, 0, 0],
        lead: [12, null, 15, null, 12, 10, null, 8, 7, null, null, 10, 12, null, null, null,
               15, null, 17, null, 15, 12, null, 10, 12, null, null, null, null, null, null, null],
      },
      leadWave: 'sawtooth',
      sections: [
        { type: 'intro',  bars: 16 },
        { type: 'verse',  bars: 16 },
        { type: 'chorus', bars: 16 },
        { type: 'verse',  bars: 8  },
        { type: 'chorus', bars: 16 },
        { type: 'outro',  bars: 16 },
      ],
    },
    {
      id: 'midnight', title: 'Midnight Seoul', artist: 'DJ School', bpm: 121,
      key: 'G min', style: 'Deep House', color: '#38bdf8',
      root: 31, // G1
      prog: [{ o: 0, m: true }, { o: 0, m: true }, { o: 8, m: false }, { o: 10, m: false }], // Gm Gm Eb F
      patterns: {
        kick: FOUR_FLOOR, clap: CLAP_24,
        hat:  [.3, 0, .5, .2, .3, 0, .5, 0, .3, 0, .5, .2, .3, 0, .5, 0],
        ohat: [0, 0, .7, 0, 0, 0, .7, 0, 0, 0, .7, 0, 0, 0, .7, 0],
        bass: [0, null, null, 0, null, null, 0, null, 0, null, null, 0, null, 3, null, 5],
        stab: [0, 0, 0, .7, 0, 0, .7, 0, 0, 0, 0, .7, 0, 0, 0, 0],
        lead: [7, null, null, 7, null, 10, null, null, 12, null, null, 10, null, null, 7, null,
               5, null, null, 5, null, 7, null, null, 10, null, null, null, 7, null, null, null],
      },
      leadWave: 'triangle',
      sections: [
        { type: 'intro',  bars: 16 },
        { type: 'verse',  bars: 16 },
        { type: 'chorus', bars: 16 },
        { type: 'verse',  bars: 8  },
        { type: 'chorus', bars: 16 },
        { type: 'outro',  bars: 16 },
      ],
    },
    {
      id: 'neon', title: 'Neon Night', artist: 'DJ School', bpm: 118,
      key: 'C min', style: 'Synth Pop', color: '#a78bfa',
      root: 36, // C2
      prog: [{ o: 0, m: true }, { o: 8, m: false }, { o: 3, m: false }, { o: 10, m: false }], // Cm Ab Eb Bb
      patterns: {
        kick: [1, 0, 0, 0, 1, 0, 0, .6, 1, 0, 0, 0, 1, 0, 0, 0],
        clap: CLAP_24,
        hat:  [.4, 0, .4, 0, .4, 0, .4, 0, .4, 0, .4, 0, .4, 0, .4, .4],
        ohat: [0, 0, 0, 0, 0, 0, .8, 0, 0, 0, 0, 0, 0, 0, .8, 0],
        bass: [0, 0, null, 0, null, 0, 0, null, 0, 0, null, 0, null, 0, null, 0],
        stab: [.8, 0, 0, 0, 0, 0, 0, 0, .8, 0, 0, 0, 0, 0, .5, 0],
        lead: [15, null, 12, null, null, 15, null, 17, null, null, 15, null, 12, null, null, null,
               10, null, 8, null, null, 10, null, 12, null, null, null, null, null, null, null, null],
      },
      leadWave: 'square',
      sections: [
        { type: 'intro',  bars: 16 },
        { type: 'verse',  bars: 16 },
        { type: 'chorus', bars: 16 },
        { type: 'verse',  bars: 8  },
        { type: 'chorus', bars: 16 },
        { type: 'outro',  bars: 16 },
      ],
    },
    {
      id: 'hanriver', title: 'Han River Bounce', artist: 'DJ School', bpm: 128,
      key: 'D min', style: 'Tech House', color: '#34d399',
      root: 38, // D2
      prog: [{ o: 0, m: true }, { o: 0, m: true }, { o: 10, m: false }, { o: 8, m: false }], // Dm Dm C Bb
      patterns: {
        kick: FOUR_FLOOR, clap: CLAP_24,
        hat:  [.5, .2, .6, .2, .5, .2, .6, .2, .5, .2, .6, .2, .5, .2, .6, .4],
        ohat: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
        bass: [null, 0, null, 0, null, 0, 0, null, null, 0, null, 0, null, 0, 5, 3],
        stab: [0, .8, 0, 0, 0, .8, 0, 0, 0, .8, 0, 0, 0, .8, 0, 0],
        lead: [0, null, null, 3, null, null, 5, null, null, 7, null, 5, null, 3, null, null,
               0, null, null, 3, null, null, 5, null, 7, null, 10, null, 7, null, 5, 3],
      },
      leadWave: 'sawtooth',
      sections: [
        { type: 'intro',  bars: 16 },
        { type: 'verse',  bars: 16 },
        { type: 'chorus', bars: 16 },
        { type: 'verse',  bars: 8  },
        { type: 'chorus', bars: 16 },
        { type: 'outro',  bars: 16 },
      ],
    },
  ];

  /* ── 트랙 메타 계산: 섹션 절대 위치(초/마디) ── */
  DJS.trackMeta = function (def) {
    const beat = 60 / def.bpm;
    const bar = beat * 4;
    let barCursor = 0;
    const sections = def.sections.map((s) => {
      const out = {
        type: s.type,
        name: DJS.SECTION_NAMES[s.type],
        color: DJS.SECTION_COLORS[s.type],
        startBar: barCursor,
        bars: s.bars,
        startTime: barCursor * bar,
        endTime: (barCursor + s.bars) * bar,
      };
      barCursor += s.bars;
      return out;
    });
    return {
      beatSec: beat,
      barSec: bar,
      totalBars: barCursor,
      duration: barCursor * bar,
      sections,
    };
  };

  DJS.sectionAt = function (def, timeSec) {
    const meta = DJS.trackMeta(def);
    for (const s of meta.sections) {
      if (timeSec >= s.startTime && timeSec < s.endTime) return s;
    }
    return timeSec < 0 ? meta.sections[0] : meta.sections[meta.sections.length - 1];
  };

  /* 첫 번째로 등장하는 특정 타입 섹션 */
  DJS.firstSection = function (def, type) {
    return DJS.trackMeta(def).sections.find((s) => s.type === type) || null;
  };
  /* 마지막으로 등장하는 특정 타입 섹션 */
  DJS.lastSection = function (def, type) {
    const list = DJS.trackMeta(def).sections.filter((s) => s.type === type);
    return list.length ? list[list.length - 1] : null;
  };

  /* ═══════════════ 악기 ═══════════════ */

  function makeNoise(ctx, seconds) {
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    // 결정적(deterministic) 의사난수 — 렌더 결과가 항상 동일해 테스트 가능
    let seed = 0x2f6e2b1;
    for (let i = 0; i < len; i++) {
      seed = (seed * 48271) % 0x7fffffff;
      d[i] = (seed / 0x7fffffff) * 2 - 1;
    }
    return buf;
  }

  function playNoise(ctx, noise, out, t, dur, { hp, bp, bpQ, gain, decay }) {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.loop = true;
    let node = src;
    if (hp) {
      const f = ctx.createBiquadFilter();
      f.type = 'highpass'; f.frequency.value = hp;
      node.connect(f); node = f;
    }
    if (bp) {
      const f = ctx.createBiquadFilter();
      f.type = 'bandpass'; f.frequency.value = bp; f.Q.value = bpQ || 1;
      node.connect(f); node = f;
    }
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0008, t + decay);
    node.connect(g); g.connect(out);
    src.start(t); src.stop(t + Math.max(dur, decay) + 0.02);
    return g;
  }

  /* ── 드럼 킷 프리렌더링 ──
     각 타격음을 짧은 버퍼로 미리 렌더링해두고, 트랙 렌더링에서는
     bufferSource 1개로 재생 → 노드 수를 크게 줄여 렌더링이 빨라진다 */
  const kitCache = new Map(); // sampleRate -> kit

  async function renderOneShot(sampleRate, seconds, build) {
    const ctx = new OfflineAudioContext(2, Math.ceil(seconds * sampleRate), sampleRate);
    const noise = makeNoise(ctx, Math.max(0.5, seconds));
    build(ctx, noise, ctx.destination);
    return ctx.startRendering();
  }

  async function getDrumKit(sampleRate) {
    if (kitCache.has(sampleRate)) return kitCache.get(sampleRate);
    const [kick, hatC, hatO, clap, crash] = await Promise.all([
      renderOneShot(sampleRate, 0.35, (ctx, noise, out) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(155, 0);
        o.frequency.exponentialRampToValueAtTime(46, 0.10);
        g.gain.setValueAtTime(1.05, 0);
        g.gain.exponentialRampToValueAtTime(0.001, 0.30);
        o.connect(g); g.connect(out);
        o.start(0); o.stop(0.32);
      }),
      renderOneShot(sampleRate, 0.08, (ctx, noise, out) => {
        const p = ctx.createStereoPanner(); p.pan.value = 0.25; p.connect(out);
        playNoise(ctx, noise, p, 0, 0.06, { hp: 8200, gain: 0.17, decay: 0.045 });
      }),
      renderOneShot(sampleRate, 0.35, (ctx, noise, out) => {
        const p = ctx.createStereoPanner(); p.pan.value = 0.25; p.connect(out);
        playNoise(ctx, noise, p, 0, 0.32, { hp: 8200, gain: 0.24, decay: 0.28 });
      }),
      renderOneShot(sampleRate, 0.32, (ctx, noise, out) => {
        for (let i = 0; i < 3; i++) {
          playNoise(ctx, noise, out, i * 0.012, 0.25, {
            bp: 1800, bpQ: 1.2, gain: 0.30 * (1 - i * 0.22), decay: i === 2 ? 0.22 : 0.03,
          });
        }
      }),
      renderOneShot(sampleRate, 1.3, (ctx, noise, out) => {
        playNoise(ctx, noise, out, 0, 1.25, { hp: 5200, gain: 0.22, decay: 1.1 });
      }),
    ]);
    const kit = { kick, hatC, hatO, clap, crash };
    kitCache.set(sampleRate, kit);
    return kit;
  }

  function hit(ctx, sample, out, t, vel) {
    const src = ctx.createBufferSource();
    src.buffer = sample;
    if (vel !== 1) {
      const g = ctx.createGain();
      g.gain.value = vel;
      src.connect(g); g.connect(out);
    } else {
      src.connect(out);
    }
    src.start(t);
  }

  function bass(ctx, out, t, freq, dur) {
    const o = ctx.createOscillator();
    o.type = 'sawtooth'; o.frequency.value = freq;
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass'; f.Q.value = 1.5;
    f.frequency.setValueAtTime(900, t);
    f.frequency.exponentialRampToValueAtTime(220, t + Math.min(0.2, dur));
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.5, t + 0.006);
    g.gain.setValueAtTime(0.5, t + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(f); f.connect(g); g.connect(out);
    o.start(t); o.stop(t + dur + 0.02);
  }

  function chordStab(ctx, out, t, rootMidi, minor, vel, dur, soft) {
    const iv = minor ? [0, 3, 7, 12] : [0, 4, 7, 12];
    const g = ctx.createGain();
    const atk = soft ? 0.35 : 0.004;
    const peak = (soft ? 0.11 : 0.17) * vel;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(peak, t + atk);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.value = soft ? 1600 : 3200; f.Q.value = 0.5;
    g.connect(f); f.connect(out);
    iv.forEach((semi, i) => {
      const o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = mtof(rootMidi + semi);
      o.detune.value = i % 2 === 0 ? -6 : 6;
      o.connect(g);
      o.start(t); o.stop(t + dur + 0.02);
    });
  }

  function leadNote(ctx, out, t, freq, dur, wave) {
    const o = ctx.createOscillator();
    o.type = wave; o.frequency.value = freq;
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.value = 4500; f.Q.value = 0.7;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.13, t + 0.01);
    g.gain.setValueAtTime(0.13, t + dur * 0.6);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(f); f.connect(g); g.connect(out);
    o.start(t); o.stop(t + dur + 0.02);
  }

  function riser(ctx, noise, out, t, dur) {
    const src = ctx.createBufferSource();
    src.buffer = noise; src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = 'bandpass'; f.Q.value = 1.4;
    f.frequency.setValueAtTime(350, t);
    f.frequency.exponentialRampToValueAtTime(5200, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0008, t);
    g.gain.exponentialRampToValueAtTime(0.16, t + dur);
    g.gain.setValueAtTime(0.16, t + dur);
    g.gain.linearRampToValueAtTime(0, t + dur + 0.05);
    src.connect(f); f.connect(g); g.connect(out);
    src.start(t); src.stop(t + dur + 0.1);
  }

  /* ═══════════════ 트랙 렌더링 ═══════════════ */

  const bufferCache = new Map(); // trackId -> AudioBuffer
  const CACHE_MAX = 4;
  const SR = 32000; // 렌더링 샘플레이트 (신스 음원엔 충분, 메모리/속도 절약)
  const LOOP_BARS = 4; // 코드 진행 1사이클 = 4마디 루프

  /* 섹션 타입별 활성 레이어 */
  const LAYERS = {
    intro:  { kick: 1, hat: 1, ohat: 0, clap: 0, bass: 0, stab: 0, pad: 0, lead: 0 },
    verse:  { kick: 1, hat: 1, ohat: 1, clap: 1, bass: 1, stab: 0, pad: 1, lead: 0 },
    chorus: { kick: 1, hat: 1, ohat: 1, clap: 1, bass: 1, stab: 1, pad: 0, lead: 1 },
    outro:  { kick: 1, hat: 1, ohat: 0, clap: 0, bass: 1, stab: 0, pad: 0, lead: 0 },
  };

  /* 4마디 루프 렌더링 (테일 포함) — 트랙은 이 루프를 타일링해 조립 */
  async function renderLoop(def, sectionType, kit) {
    const beat = 60 / def.bpm;
    const bar = beat * 4;
    const step = bar / 16;
    const TAIL = 1.2;
    const ctx = new OfflineAudioContext(2, Math.ceil((bar * LOOP_BARS + TAIL) * SR), SR);

    const master = ctx.createGain();
    master.gain.value = 0.85;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.knee.value = 8;
    comp.ratio.value = 3.5; comp.attack.value = 0.004; comp.release.value = 0.18;
    master.connect(comp); comp.connect(ctx.destination);
    const panLead = ctx.createStereoPanner(); panLead.pan.value = -0.2; panLead.connect(master);

    const L = LAYERS[sectionType];
    const P = def.patterns;

    for (let b = 0; b < LOOP_BARS; b++) {
      const t0 = b * bar;
      const chord = def.prog[b % def.prog.length];
      const chordRoot = def.root + chord.o;
      for (let s = 0; s < 16; s++) {
        const t = t0 + s * step;
        if (L.kick && P.kick[s]) hit(ctx, kit.kick, master, t, P.kick[s]);
        if (L.hat && P.hat[s]) hit(ctx, kit.hatC, master, t, P.hat[s]);
        if (L.ohat && P.ohat[s]) hit(ctx, kit.hatO, master, t, P.ohat[s]);
        if (L.clap && P.clap[s]) hit(ctx, kit.clap, master, t, P.clap[s]);
        if (L.bass && P.bass[s] !== null && P.bass[s] !== undefined) {
          bass(ctx, master, t, mtof(chordRoot + P.bass[s]), step * 1.7);
        }
        if (L.stab && P.stab[s]) {
          chordStab(ctx, master, t, chordRoot + 24, chord.m, P.stab[s], beat * 0.9, false);
        }
        if (L.lead) {
          const li = (b % 2) * 16 + s;
          const n = P.lead[li];
          if (n !== null && n !== undefined) {
            leadNote(ctx, panLead, t, mtof(chordRoot + 36 + n), step * 1.8, def.leadWave);
          }
        }
      }
      if (L.pad) {
        chordStab(ctx, master, t0, chordRoot + 24, chord.m, 0.9, bar * 0.98, true);
      }
    }
    return ctx.startRendering();
  }

  /* 라이저(1마디) 렌더링 */
  async function renderRiser(def) {
    const bar = (60 / def.bpm) * 4;
    const ctx = new OfflineAudioContext(2, Math.ceil((bar + 0.3) * SR), SR);
    const noise = makeNoise(ctx, 1.0);
    riser(ctx, noise, ctx.destination, 0, bar);
    return ctx.startRendering();
  }

  /* src 버퍼를 dst(Float32Array 채널 배열)의 offset 샘플 위치에 더하기 */
  function mixInto(dstL, dstR, src, offset, gain = 1) {
    const sL = src.getChannelData(0);
    const sR = src.numberOfChannels > 1 ? src.getChannelData(1) : sL;
    const n = Math.min(src.length, dstL.length - offset);
    for (let i = 0; i < n; i++) {
      dstL[offset + i] += sL[i] * gain;
      dstR[offset + i] += sR[i] * gain;
    }
  }

  DJS.renderTrack = async function (def) {
    const meta = DJS.trackMeta(def);
    const kit = await getDrumKit(SR);

    // 필요한 섹션 타입별 루프를 병렬 렌더링
    const types = [...new Set(meta.sections.map((s) => s.type))];
    const loopList = await Promise.all(types.map((tp) => renderLoop(def, tp, kit)));
    const loops = {};
    types.forEach((tp, i) => { loops[tp] = loopList[i]; });
    const riserBuf = await renderRiser(def);

    // 조립
    const totalLen = Math.ceil((meta.duration + 1.2) * SR);
    const L = new Float32Array(totalLen);
    const R = new Float32Array(totalLen);
    const barSamples = meta.barSec * SR;

    for (let si = 0; si < meta.sections.length; si++) {
      const sec = meta.sections[si];
      const next = meta.sections[si + 1];
      const loop = loops[sec.type];
      for (let b = 0; b < sec.bars; b += LOOP_BARS) {
        const off = Math.round((sec.startBar + b) * barSamples);
        mixInto(L, R, loop, off);
      }
      // 코러스 직전 마디에 라이저, 코러스 첫 박에 크래시
      if (next && next.type === 'chorus') {
        mixInto(L, R, riserBuf, Math.round((next.startBar - 1) * barSamples));
        mixInto(L, R, kit.crash, Math.round(next.startBar * barSamples));
      }
    }

    // 피크 노멀라이즈 (0.95)
    let peak = 0;
    for (let i = 0; i < totalLen; i++) {
      const a = Math.abs(L[i]), b2 = Math.abs(R[i]);
      if (a > peak) peak = a;
      if (b2 > peak) peak = b2;
    }
    if (peak > 0) {
      const k = 0.95 / peak;
      for (let i = 0; i < totalLen; i++) { L[i] *= k; R[i] *= k; }
    }

    const buffer = new AudioBuffer({ numberOfChannels: 2, length: totalLen, sampleRate: SR });
    buffer.copyToChannel(L, 0);
    buffer.copyToChannel(R, 1);
    return buffer;
  };

  /* 캐시를 통한 버퍼 획득 (LRU) */
  DJS.getTrackBuffer = async function (def) {
    if (bufferCache.has(def.id)) {
      const buf = bufferCache.get(def.id);
      bufferCache.delete(def.id);
      bufferCache.set(def.id, buf); // LRU 갱신
      return buf;
    }
    const buf = await DJS.renderTrack(def);
    bufferCache.set(def.id, buf);
    while (bufferCache.size > CACHE_MAX) {
      const oldest = bufferCache.keys().next().value;
      bufferCache.delete(oldest);
    }
    return buf;
  };

  /* ── 파형 피크 계산 (그리기용) ──
     res: 초당 샘플 수. { peaks, lows, res } 반환 */
  DJS.computeWaveform = function (buffer, res = 75) {
    const sr = buffer.sampleRate;
    const chunk = Math.floor(sr / res);
    const n = Math.ceil(buffer.length / chunk);
    const peaks = new Float32Array(n);
    const lows = new Float32Array(n);
    const L = buffer.getChannelData(0);
    const R = buffer.numberOfChannels > 1 ? buffer.getChannelData(1) : L;
    // 원-폴 로우패스로 저역 에너지 추출 (~200Hz)
    const alpha = 1 - Math.exp(-2 * Math.PI * 200 / sr);
    let lp = 0;
    for (let i = 0; i < n; i++) {
      const start = i * chunk;
      const end = Math.min(start + chunk, buffer.length);
      let pk = 0, lowAcc = 0;
      for (let j = start; j < end; j++) {
        const v = (L[j] + R[j]) * 0.5;
        const a = Math.abs(v);
        if (a > pk) pk = a;
        lp += alpha * (v - lp);
        const la = Math.abs(lp);
        if (la > lowAcc) lowAcc = la;
      }
      peaks[i] = pk;
      lows[i] = lowAcc;
    }
    return { peaks, lows, res };
  };

})(window.DJS);
