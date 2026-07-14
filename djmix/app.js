/* ═══════════════════════════════════════════════════════════════
   DJ School — app.js
   UI 컴포넌트(노브/슬라이더/파형) + 덱·믹서 바인딩 + 레슨 패널
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function () {
  const DJS = window.DJS;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const clamp = DJS.clamp;

  /* ═══════════════ 재사용 컴포넌트 ═══════════════ */

  /** 로터리 노브: 세로 드래그로 조절, 더블클릭 초기화, 화살표 키 지원 */
  class Knob {
    constructor(el, onChange) {
      this.el = el;
      this.min = parseFloat(el.dataset.min);
      this.max = parseFloat(el.dataset.max);
      this.def = parseFloat(el.dataset.value);
      this.value = this.def;
      this.onChange = onChange;
      el.tabIndex = 0;
      this._render();

      let startY = 0, startVal = 0, dragging = false;
      el.addEventListener('pointerdown', (e) => {
        dragging = true;
        startY = e.clientY;
        startVal = this.value;
        el.setPointerCapture(e.pointerId);
        e.preventDefault();
      });
      el.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const range = this.max - this.min;
        const dv = (startY - e.clientY) * range / 150;
        this.set(startVal + dv);
      });
      const end = () => { dragging = false; };
      el.addEventListener('pointerup', end);
      el.addEventListener('pointercancel', end);
      el.addEventListener('dblclick', () => this.set(this.def));
      el.addEventListener('keydown', (e) => {
        const step = (this.max - this.min) / 26;
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { this.set(this.value + step); e.preventDefault(); }
        if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { this.set(this.value - step); e.preventDefault(); }
      });
    }
    set(v, silent) {
      this.value = clamp(v, this.min, this.max);
      this._render();
      if (!silent && this.onChange) this.onChange(this.value);
    }
    _render() {
      const f = (this.value - this.min) / (this.max - this.min);
      this.el.style.setProperty('--rot', `${(-135 + f * 270).toFixed(1)}deg`);
      this.el.classList.toggle('killed', this.min < -20 && this.value <= this.min + 0.5);
    }
  }

  /** 슬라이더 (세로/가로 공용) */
  class Slider {
    constructor(el, { vertical, onChange }) {
      this.el = el;
      this.vertical = vertical;
      this.min = parseFloat(el.dataset.min);
      this.max = parseFloat(el.dataset.max);
      this.value = parseFloat(el.dataset.value);
      this.onChange = onChange;
      this.thumb = $(vertical ? '.vslider-thumb' : '.hslider-thumb', el);
      this._render();

      let dragging = false;
      const valFromEvent = (e) => {
        const r = el.getBoundingClientRect();
        let f;
        if (vertical) {
          f = 1 - clamp((e.clientY - r.top - 8) / (r.height - 16), 0, 1);
        } else {
          f = clamp((e.clientX - r.left - 8) / (r.width - 16), 0, 1);
        }
        return this.min + f * (this.max - this.min);
      };
      el.addEventListener('pointerdown', (e) => {
        dragging = true;
        el.setPointerCapture(e.pointerId);
        this.set(valFromEvent(e));
        e.preventDefault();
      });
      el.addEventListener('pointermove', (e) => { if (dragging) this.set(valFromEvent(e)); });
      const end = () => { dragging = false; };
      el.addEventListener('pointerup', end);
      el.addEventListener('pointercancel', end);
      this.thumb.addEventListener('keydown', (e) => {
        const step = (this.max - this.min) / 40;
        const inc = this.vertical
          ? (e.key === 'ArrowUp' ? step : e.key === 'ArrowDown' ? -step : 0)
          : (e.key === 'ArrowRight' ? step : e.key === 'ArrowLeft' ? -step : 0);
        if (inc) { this.set(this.value + inc); e.preventDefault(); }
      });
    }
    set(v, silent) {
      this.value = clamp(v, this.min, this.max);
      this._render();
      if (!silent && this.onChange) this.onChange(this.value);
    }
    _render() {
      const f = (this.value - this.min) / (this.max - this.min);
      if (this.vertical) {
        this.thumb.style.top = `${(1 - f) * 100}%`;
      } else {
        this.thumb.style.left = `${f * 100}%`;
      }
    }
  }

  /* ═══════════════ 파형 뷰 ═══════════════ */
  const ZOOM_WINDOW = 10; // 확대 파형에 보이는 시간(초)

  class WaveView {
    constructor(deckEl, deck, app) {
      this.deck = deck;
      this.app = app;
      this.zoomC = $('.wave-zoom', deckEl);
      this.overC = $('.wave-over', deckEl);
      this.label = $('.wave-section-label', deckEl);
      this.overCache = null;
      this._bindZoomDrag();
      this._bindOverSeek();
    }

    _bindZoomDrag() {
      const c = this.zoomC;
      let dragging = false, lastX = 0;
      c.addEventListener('pointerdown', (e) => {
        if (!this.deck.buffer) return;
        dragging = true; lastX = e.clientX;
        c.setPointerCapture(e.pointerId);
      });
      c.addEventListener('pointermove', (e) => {
        if (!dragging || !this.deck.buffer) return;
        const pxPerSec = c.clientWidth / ZOOM_WINDOW;
        const dt = (lastX - e.clientX) / pxPerSec;
        lastX = e.clientX;
        this.deck.seek(this.deck.posNow() + dt);
      });
      const end = () => { dragging = false; };
      c.addEventListener('pointerup', end);
      c.addEventListener('pointercancel', end);
    }

    _bindOverSeek() {
      const c = this.overC;
      const seekTo = (e) => {
        if (!this.deck.buffer) return;
        const r = c.getBoundingClientRect();
        const f = clamp((e.clientX - r.left) / r.width, 0, 1);
        let pos = f * this.deck.duration;
        if (this.deck.quantize) pos = this.deck.snapToBeat(pos);
        this.deck.seek(pos);
      };
      let dragging = false;
      c.addEventListener('pointerdown', (e) => {
        dragging = true; c.setPointerCapture(e.pointerId); seekTo(e);
      });
      c.addEventListener('pointermove', (e) => { if (dragging) seekTo(e); });
      const end = () => { dragging = false; };
      c.addEventListener('pointerup', end);
      c.addEventListener('pointercancel', end);
    }

    invalidate() { this.overCache = null; }

    _sizeCanvas(c) {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.round(c.clientWidth * dpr), h = Math.round(c.clientHeight * dpr);
      if (c.width !== w || c.height !== h) { c.width = w; c.height = h; this.overCache = null; }
      return dpr;
    }

    draw() {
      this._drawZoom();
      this._drawOver();
      const sec = this.deck.sectionNow();
      if (sec) {
        this.label.textContent = sec.name;
        this.label.style.color = sec.color;
        this.label.style.display = '';
      } else {
        this.label.style.display = 'none';
      }
    }

    _drawZoom() {
      const c = this.zoomC;
      const dpr = this._sizeCanvas(c);
      const ctx = c.getContext('2d');
      const W = c.width, H = c.height;
      ctx.clearRect(0, 0, W, H);
      const d = this.deck;
      if (!d.buffer || !d.waveform) {
        ctx.fillStyle = '#2a3145';
        ctx.font = `${12 * dpr}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('LOAD 버튼으로 트랙을 불러오세요', W / 2, H / 2 + 4 * dpr);
        return;
      }
      const { peaks, lows, res } = d.waveform;
      const pos = d.posNow();
      const pxPerSec = W / ZOOM_WINDOW;
      const t0 = pos - ZOOM_WINDOW / 2;
      const meta = d.meta;
      const midY = H * 0.55;

      // 섹션 배경 띠 (상단)
      for (const s of meta.sections) {
        const x1 = (s.startTime - t0) * pxPerSec;
        const x2 = (s.endTime - t0) * pxPerSec;
        if (x2 < 0 || x1 > W) continue;
        ctx.fillStyle = s.color + '33';
        ctx.fillRect(Math.max(0, x1), 0, Math.min(W, x2) - Math.max(0, x1), 5 * dpr);
      }

      // 파형
      const colW = Math.max(1, Math.floor(dpr));
      for (let x = 0; x < W; x += colW) {
        const t = t0 + x / pxPerSec;
        if (t < 0 || t >= d.duration) continue;
        const i = Math.floor(t * res);
        if (i < 0 || i >= peaks.length) continue;
        const sec = DJS.sectionAt(d.track, t);
        const pk = peaks[i], lo = lows[i];
        const hPk = pk * (H * 0.42);
        const hLo = lo * (H * 0.42);
        ctx.fillStyle = sec.color + 'aa';
        ctx.fillRect(x, midY - hPk, colW, hPk * 2);
        ctx.fillStyle = '#ffffff55';
        ctx.fillRect(x, midY - hLo, colW, hLo * 2);
      }

      // 비트 그리드
      const beat = meta.beatSec;
      const firstBeat = Math.max(0, Math.floor(t0 / beat));
      const lastBeat = Math.min(Math.ceil(meta.duration / beat), Math.ceil((t0 + ZOOM_WINDOW) / beat));
      for (let b = firstBeat; b <= lastBeat; b++) {
        const x = (b * beat - t0) * pxPerSec;
        if (x < 0 || x > W) continue;
        const isBar = b % 4 === 0;
        ctx.fillStyle = isBar ? 'rgba(255,255,255,.45)' : 'rgba(255,255,255,.14)';
        ctx.fillRect(x, isBar ? 6 * dpr : H * 0.25, dpr, isBar ? H : H * 0.6);
      }

      // 큐/핫큐 마커
      this._marker(ctx, (d.cuePoint - t0) * pxPerSec, H, dpr, '#f59e0b', 'CUE');
      d.hotCues.forEach((hc, i) => {
        if (hc !== null) this._marker(ctx, (hc - t0) * pxPerSec, H, dpr, '#34d399', String(i + 1));
      });

      // 중앙 재생 헤드
      ctx.fillStyle = '#ff5555';
      ctx.fillRect(W / 2 - dpr, 0, dpr * 2, H);
      ctx.fillStyle = 'rgba(255,85,85,.25)';
      ctx.fillRect(W / 2 - 4 * dpr, 0, dpr * 8, H);
    }

    _marker(ctx, x, H, dpr, color, text) {
      if (x < -20 || x > ctx.canvas.width + 20) return;
      ctx.fillStyle = color;
      ctx.fillRect(x, 0, dpr * 1.5, H);
      ctx.font = `bold ${9 * dpr}px sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText(text, x + 3 * dpr, 10 * dpr);
    }

    _drawOver() {
      const c = this.overC;
      const dpr = this._sizeCanvas(c);
      const ctx = c.getContext('2d');
      const W = c.width, H = c.height;
      const d = this.deck;
      if (!d.buffer || !d.waveform) { ctx.clearRect(0, 0, W, H); return; }

      if (!this.overCache) {
        const off = document.createElement('canvas');
        off.width = W; off.height = H;
        const octx = off.getContext('2d');
        const { peaks, res } = d.waveform;
        const midY = H / 2;
        for (let x = 0; x < W; x++) {
          const t = (x / W) * d.duration;
          const i = Math.floor(t * res);
          if (i >= peaks.length) break;
          // 다운샘플: 구간 최대값
          const i2 = Math.floor(((x + 1) / W) * d.duration * res);
          let pk = 0;
          for (let j = i; j <= Math.min(i2, peaks.length - 1); j++) pk = Math.max(pk, peaks[j]);
          const sec = DJS.sectionAt(d.track, t);
          ctx.fillStyle = sec.color;
          octx.fillStyle = sec.color;
          const h = pk * (H * 0.46);
          octx.fillRect(x, midY - h, 1, h * 2);
        }
        this.overCache = off;
      }
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(this.overCache, 0, 0);
      // 지나간 부분 어둡게
      const px = (d.posNow() / d.duration) * W;
      ctx.fillStyle = 'rgba(0,0,0,.45)';
      ctx.fillRect(0, 0, px, H);
      // 핫큐 틱
      d.hotCues.forEach((hc) => {
        if (hc === null) return;
        ctx.fillStyle = '#34d399';
        ctx.fillRect((hc / d.duration) * W, 0, dpr, H);
      });
      // 플레이헤드
      ctx.fillStyle = '#ff5555';
      ctx.fillRect(px - dpr / 2, 0, dpr * 1.5, H);
    }
  }

  /* ═══════════════ 앱 본체 ═══════════════ */
  class App {
    constructor() {
      this.sys = new DJS.DJSystem();
      this.lessonState = {};
      this.lessons = new DJS.LessonEngine(this);
      this.grad = new DJS.GradRecorder(this);
      this.knobs = { A: {}, B: {} };
      this.deckUI = {};
      this.waves = {};
      this._loadTargetDeck = 'A';

      this._buildDeckUI('A');
      this._buildDeckUI('B');
      this._buildMixerUI();
      this._buildLibrary();
      this._buildLessonUI();
      this._buildGradUI();
      this._bindModals();
      this._bindKeys();
      this._bindStart();

      this.lessons.onUpdate = () => this._renderLessonActive();
      this.lessons.onComplete = (lesson) => {
        this._renderLessonList();
        this._showLessonList();
        this.toast(`🎉 「${lesson.session} ${lesson.title}」 완료! 다음 레슨이 열렸어요.`);
      };

      requestAnimationFrame(() => this._frame());
    }

    /* ── 시작 오버레이 ── */
    _bindStart() {
      $('#startBtn').addEventListener('click', async () => {
        await this.sys.resume();
        $('#startOverlay').classList.add('hidden');
        this._renderLessonList();
        // 바로 놀 수 있게 기본 트랙을 백그라운드 로드
        const first = !localStorage.getItem('djs-visited');
        localStorage.setItem('djs-visited', '1');
        this.loadTo('A', DJS.TRACKS[0]).then(() => this.loadTo('B', DJS.TRACKS[3])).catch(() => {});
        if (first) {
          setTimeout(() => this.toast('👋 처음이라면 왼쪽 「1회 · 장비의 이해」부터 시작해보세요!'), 800);
        }
      });
    }

    /* ── 덱 UI ── */
    _buildDeckUI(id) {
      const deck = this.sys.deck(id);
      const el = $(`#deck${id}`);
      const other = () => this.sys.deck(id === 'A' ? 'B' : 'A');

      const ui = {
        el,
        title: $('.track-title', el),
        sub: $('.track-sub', el),
        bpm: $('.bpm-val', el),
        timeCur: $('.time-cur', el),
        timeTotal: $('.time-total', el),
        keyBox: $('.key-box', el),
        playBtn: $('.play-btn', el),
        cueBtn: $('.cue-btn', el),
        syncBtn: $('.sync-btn', el),
        loadBtn: $('.load-btn', el),
        pads: $$('.hotcue-pad', el),
        tempoReadout: $('.tempo-readout', el),
        loading: $('.wave-loading', el),
      };
      this.deckUI[id] = ui;
      this.waves[id] = new WaveView(el, deck, this);

      ui.playBtn.addEventListener('click', () => {
        if (!deck.buffer) { this.toast('먼저 LOAD로 트랙을 불러오세요'); return; }
        deck.toggle();
      });
      ui.cueBtn.addEventListener('click', () => deck.cue());
      ui.syncBtn.addEventListener('click', () => {
        if (!deck.track || !other().track) { this.toast('두 덱 모두 트랙이 있어야 SYNC할 수 있어요'); return; }
        deck.sync(other());
        ui.syncBtn.classList.add('flash');
        setTimeout(() => ui.syncBtn.classList.remove('flash'), 700);
        this.toast(`덱 ${id}를 ${id === 'A' ? 'B' : 'A'}에 맞췄어요 (${deck.effBpm().toFixed(1)} BPM)`);
      });
      ui.loadBtn.addEventListener('click', () => {
        this._loadTargetDeck = id;
        this._openModal('#libraryModal');
      });

      // HOT CUE: 클릭 = 저장/점프, 길게 = 삭제
      ui.pads.forEach((pad, i) => {
        let lpTimer = null, longPressed = false;
        pad.addEventListener('pointerdown', () => {
          longPressed = false;
          lpTimer = setTimeout(() => {
            longPressed = true;
            if (deck.hotCues[i] !== null) {
              deck.clearHotCue(i);
              this.toast(`HOT CUE ${i + 1} 삭제`);
            }
          }, 600);
        });
        const cancel = () => { if (lpTimer) clearTimeout(lpTimer); };
        pad.addEventListener('pointerleave', cancel);
        pad.addEventListener('pointercancel', cancel);
        pad.addEventListener('pointerup', () => {
          cancel();
          if (!longPressed) deck.hotCue(i);
        });
      });

      // 넛지
      const bindNudge = (btn, mul) => {
        const start = (e) => {
          if (!deck.playing) return;
          btn.classList.add('active');
          deck.nudge(mul);
          e.preventDefault();
        };
        const stop = () => { btn.classList.remove('active'); deck.nudgeEnd(); };
        btn.addEventListener('pointerdown', start);
        btn.addEventListener('pointerup', stop);
        btn.addEventListener('pointerleave', stop);
        btn.addEventListener('pointercancel', stop);
      };
      bindNudge($('.nudge-back', el), 0.97);
      bindNudge($('.nudge-fwd', el), 1.03);

      // 템포 슬라이더 (CDJ 방향: 아래 = 빠르게 → UI값 부호 반전)
      ui.tempoSlider = new Slider($('.tempo-slider', el), {
        vertical: true,
        onChange: (v) => deck.setTempoPercent(-v),
      });

      deck.onChange = () => this._refreshDeck(id);
      deck.onEnded = () => this.toast(`덱 ${id} 트랙이 끝났어요`);
      this._refreshDeck(id);
    }

    _refreshDeck(id) {
      const deck = this.sys.deck(id);
      const ui = this.deckUI[id];
      if (deck.track) {
        ui.title.textContent = deck.track.title;
        ui.sub.textContent = `${deck.track.artist} · ${deck.track.style}`;
        ui.keyBox.textContent = deck.track.key;
        ui.bpm.textContent = deck.effBpm().toFixed(1);
        const total = deck.duration;
        ui.timeTotal.textContent = `/ ${Math.floor(total / 60)}:${String(Math.floor(total % 60)).padStart(2, '0')}`;
      } else {
        ui.title.textContent = '트랙 없음';
        ui.sub.textContent = '';
        ui.keyBox.textContent = '';
        ui.bpm.textContent = '--.-';
        ui.timeTotal.textContent = '/ 0:00';
      }
      ui.playBtn.textContent = deck.playing ? '❚❚' : '▶';
      ui.playBtn.classList.toggle('playing', deck.playing);
      ui.loading.classList.toggle('hidden', !deck.loading);
      ui.pads.forEach((pad, i) => pad.classList.toggle('set', deck.hotCues[i] !== null));
      const pct = deck.tempoPercent();
      ui.tempoReadout.textContent = `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;
      ui.tempoSlider.set(-pct, true);
    }

    /* ── 믹서 UI ── */
    _buildMixerUI() {
      $$('#mixer .knob[data-deck]').forEach((el) => {
        const deckId = el.dataset.deck;
        const param = el.dataset.param;
        const deck = this.sys.deck(deckId);
        const knob = new Knob(el, (v) => {
          if (param === 'trim') deck.setTrimDb(v);
          else deck.setEqDb(param, v);
        });
        this.knobs[deckId][param] = knob;
      });
      this.masterKnob = new Knob($('#masterKnob'), (v) => this.sys.setMasterVolume(v));

      this.faders = {
        A: new Slider($('.ch-fader[data-deck="A"]'), { vertical: true, onChange: (v) => this.sys.deckA.setFader(v) }),
        B: new Slider($('.ch-fader[data-deck="B"]'), { vertical: true, onChange: (v) => this.sys.deckB.setFader(v) }),
      };
      this.xfSlider = new Slider($('#crossfader'), { horizontal: true, onChange: (v) => this.sys.setCrossfader(v) });

      this.meterFills = {
        A: $('.mx-ch[data-deck="A"] .meter-fill'),
        B: $('.mx-ch[data-deck="B"] .meter-fill'),
        master: $('#masterMeterFill'),
      };
      this.beatLights = { A: $$('#beatLightsA i'), B: $$('#beatLightsB i') };
      this.beatOffsetEl = $('#beatOffset');
    }

    xfVal() { return this.sys.xfVal; }
    setCrossfader(x) {
      this.sys.setCrossfader(x);
      this.xfSlider.set(x, true);
    }
    resetEq() {
      for (const id of ['A', 'B']) {
        const deck = this.sys.deck(id);
        deck.setTrimDb(0);
        for (const band of ['low', 'mid', 'hi']) deck.setEqDb(band, 0);
        this.knobs[id].trim.set(0, true);
        this.knobs[id].low.set(0, true);
        this.knobs[id].mid.set(0, true);
        this.knobs[id].hi.set(0, true);
      }
    }

    async loadTo(deckId, trackDef) {
      const deck = this.sys.deck(deckId);
      this._refreshDeck(deckId);
      await deck.load(trackDef);
      this.waves[deckId].invalidate();
      this._refreshDeck(deckId);
    }

    /* ── 라이브러리 ── */
    _buildLibrary() {
      const list = $('#libraryList');
      list.innerHTML = '';
      for (const t of DJS.TRACKS) {
        const meta = DJS.trackMeta(t);
        const item = document.createElement('div');
        item.className = 'lib-item';
        item.innerHTML = `
          <div class="lib-color" style="background:${t.color}"></div>
          <div class="lib-info">
            <div class="lib-title">${t.title}</div>
            <div class="lib-meta"><b>${t.bpm} BPM</b> · ${t.key} · ${t.style} · ${Math.floor(meta.duration / 60)}:${String(Math.floor(meta.duration % 60)).padStart(2, '0')}</div>
          </div>
          <div class="lib-actions">
            <button class="lib-load to-a" data-track="${t.id}" data-deck="A">덱 A에<br/>로드</button>
            <button class="lib-load to-b" data-track="${t.id}" data-deck="B">덱 B에<br/>로드</button>
          </div>`;
        list.appendChild(item);
      }
      list.addEventListener('click', async (e) => {
        const btn = e.target.closest('.lib-load');
        if (!btn) return;
        const track = DJS.TRACKS.find((t) => t.id === btn.dataset.track);
        const deckId = btn.dataset.deck;
        this._closeModals();
        this.toast(`「${track.title}」 → 덱 ${deckId} 로드 중...`);
        await this.loadTo(deckId, track);
        this.toast(`✅ 「${track.title}」 덱 ${deckId} 준비 완료 (${track.bpm} BPM)`);
      });
    }

    /* ── 레슨 UI ── */
    _buildLessonUI() {
      $('#lessonToggleBtn').addEventListener('click', () => {
        $('#layout').classList.toggle('no-lesson');
        $('#lessonToggleBtn').classList.toggle('active');
      });
      $('#laExit').addEventListener('click', () => {
        this.lessons.stop();
        this._showLessonList();
      });
      $('#laNext').addEventListener('click', () => this.lessons.next());
      this._renderLessonList();
    }

    _renderLessonList() {
      const list = $('#lessonList');
      list.innerHTML = `<p class="lesson-head-note">🎓 <b>정규반 커리큘럼</b> — 실제 DJ 학원 정규반(총 8회)과 같은 순서로 배워요. 위에서부터 차례대로!</p>`;
      for (const lesson of DJS.LESSONS) {
        const done = this.lessons.isDone(lesson.id);
        const unlocked = this.lessons.isUnlocked(lesson.id);
        const card = document.createElement('div');
        card.className = 'lesson-card' + (unlocked ? '' : ' locked') + (lesson.graduation ? ' grad-card' : '');
        card.dataset.lesson = lesson.id;
        const gradData = lesson.graduation ? this.lessons.progressData()[lesson.id] : null;
        card.innerHTML = `
          <div class="lc-top">
            <span class="lc-session">${lesson.session}</span>
            <span class="lc-title">${lesson.icon} ${lesson.title}</span>
            ${done ? '<span class="lc-done">✓</span>' : unlocked ? '' : '<span class="lc-lock">🔒</span>'}
          </div>
          <div class="lc-desc">${lesson.desc}${gradData && gradData.score ? `<br/><b style="color:var(--good)">최고 기록: ${gradData.score}점</b>` : ''}</div>
          ${unlocked ? `<button class="lc-start">${done ? '다시 하기' : lesson.graduation ? '졸업셋 도전' : '레슨 시작'}</button>` : ''}`;
        if (unlocked) {
          $('.lc-start', card).addEventListener('click', () => this._startLesson(lesson));
        }
        list.appendChild(card);
      }
    }

    async _startLesson(lesson) {
      $('#layout').classList.remove('no-lesson');
      $('#lessonToggleBtn').classList.add('active');
      if (lesson.graduation) {
        this.lessons.stop();
        $('#lessonList').classList.add('hidden');
        $('#lessonActive').classList.add('hidden');
        $('#gradPanel').classList.remove('hidden');
        return;
      }
      $('#gradPanel').classList.add('hidden');
      $('#lessonList').classList.add('hidden');
      $('#lessonActive').classList.remove('hidden');
      await this.lessons.start(lesson);
    }

    _showLessonList() {
      $('#lessonActive').classList.add('hidden');
      $('#gradPanel').classList.add('hidden');
      $('#lessonList').classList.remove('hidden');
      this._spotlight(null);
      this._renderLessonList();
    }

    _renderLessonActive() {
      const eng = this.lessons;
      if (!eng.lesson) { this._spotlight(null); return; }
      const step = eng.step();
      if (!step) return;
      $('#laBadge').textContent = `${eng.lesson.session} · ${eng.lesson.title}`;
      $('#laTitle').textContent = `${eng.lesson.icon} ${eng.lesson.title}`;
      $('#laProgressFill').style.width = `${(eng.stepIndex / Math.max(1, eng.lesson.steps.length - 1)) * 100}%`;
      if (eng.busy) {
        $('#laStepText').textContent = '⏳ 준비 중...';
        $('#laStepDetail').innerHTML = '연습용 트랙과 장비를 세팅하고 있어요.';
        $('#laNext').classList.add('hidden');
        $('#laLive').classList.add('hidden');
        $('#laHold').classList.add('hidden');
        this._spotlight(null);
        return;
      }
      $('#laStepText').textContent = `${eng.stepIndex + 1}/${eng.lesson.steps.length} · ${step.text}`;
      $('#laStepDetail').innerHTML = step.detail || '';
      $('#laNext').classList.toggle('hidden', !!step.check);

      const live = $('#laLive');
      if (step.progress) {
        const msg = step.progress(this);
        live.textContent = msg || '';
        live.classList.toggle('hidden', !msg);
      } else {
        live.classList.add('hidden');
      }
      const hold = $('#laHold');
      if (step.holdSec) {
        hold.classList.remove('hidden');
        $('#laHoldFill').style.width = `${eng.holdProgress() * 100}%`;
      } else {
        hold.classList.add('hidden');
      }
      this._spotlight(step.target || null);
    }

    _spotlight(selector) {
      const sp = $('#spotlight');
      if (!selector) { sp.classList.add('hidden'); this._spotTarget = null; return; }
      const el = $(selector);
      if (!el) { sp.classList.add('hidden'); return; }
      this._spotTarget = el;
      sp.classList.remove('hidden');
      const r = el.getBoundingClientRect();
      sp.style.left = `${r.left - 6}px`;
      sp.style.top = `${r.top - 6}px`;
      sp.style.width = `${r.width + 12}px`;
      sp.style.height = `${r.height + 12}px`;
    }

    /* ── 졸업셋 UI ── */
    _buildGradUI() {
      $('#gradExit').addEventListener('click', () => {
        if (this.grad.active) this.grad.stopAndReport();
        $('#gradStatus').classList.add('hidden');
        $('#gradStart').classList.remove('hidden');
        $('#gradStop').classList.add('hidden');
        this._showLessonList();
      });
      $('#gradStart').addEventListener('click', () => {
        this.grad.start();
        $('#gradStatus').classList.remove('hidden');
        $('#gradStart').classList.add('hidden');
        $('#gradStop').classList.remove('hidden');
        this.toast('🎬 졸업셋 시작! 배운 기술을 모두 보여주세요.');
      });
      $('#gradStop').addEventListener('click', () => {
        const report = this.grad.stopAndReport();
        $('#gradStatus').classList.add('hidden');
        $('#gradStart').classList.remove('hidden');
        $('#gradStop').classList.add('hidden');
        this._showReport(report);
      });
    }

    _showReport(report) {
      const tooShort = report.durMin < 2;
      const passed = report.passed && !tooShort;
      if (passed) {
        this.lessons.markDone('grad', { score: report.score });
      }
      const body = $('#reportBody');
      body.innerHTML = `
        <div class="report-score"><span class="num ${passed ? '' : 'fail'}">${report.score}</span><span style="color:var(--dim)"> / 100</span></div>
        <div class="report-verdict ${passed ? 'pass' : 'fail'}">${
          passed ? '🎓 축하합니다, 졸업입니다!' : tooShort ? `⏱️ 셋이 너무 짧아요 (${report.durMin.toFixed(1)}분) — 2분 이상 플레이하세요` : '조금만 더! 80점 이상이면 졸업이에요'
        }</div>
        <div class="report-sub">플레이 ${report.durMin.toFixed(1)}분 · 전환 ${report.transitions}회 · 트랙 ${report.tracks}곡</div>
        ${report.items.map((it) => `
          <div class="report-item">
            <div class="ri-head"><span>${it.name}</span><span class="ri-pts">${it.got} / ${it.max}</span></div>
            <div class="ri-bar"><div class="ri-fill" style="width:${(it.got / it.max) * 100}%"></div></div>
            <div class="ri-note">${it.note}</div>
          </div>`).join('')}
        <div class="report-actions">
          <button class="btn-primary" id="reportRetry">다시 도전</button>
        </div>`;
      $('#reportRetry').addEventListener('click', () => {
        this._closeModals();
        $('#gradStart').click();
      });
      this._openModal('#reportModal');
      this._renderLessonList();
    }

    /* ── 모달/토스트 ── */
    _bindModals() {
      $$('.modal').forEach((m) => {
        m.addEventListener('click', (e) => { if (e.target === m) this._closeModals(); });
      });
      $$('.modal-close').forEach((b) => b.addEventListener('click', () => this._closeModals()));
      $('#helpBtn').addEventListener('click', () => this._openModal('#helpModal'));
    }
    _openModal(sel) { this._closeModals(); $(sel).classList.remove('hidden'); }
    _closeModals() { $$('.modal').forEach((m) => m.classList.add('hidden')); }

    toast(msg, ms = 2600) {
      const t = $('#toast');
      t.textContent = msg;
      t.classList.add('show');
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => t.classList.remove('show'), ms);
    }

    /* ── 키보드 ── */
    _bindKeys() {
      document.addEventListener('keydown', (e) => {
        if (e.repeat) return;
        if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) return;
        const k = e.key.toLowerCase();
        const A = this.sys.deckA, B = this.sys.deckB;
        if (k === 'q') A.toggle();
        else if (k === 'p') B.toggle();
        else if (k === 'a') A.cue();
        else if (k === 'l') B.cue();
        else if (k === 's') A.sync(B);
        else if (k === 'k') B.sync(A);
        else if (k === 'z') this.setCrossfader(this.sys.xfVal - 0.06);
        else if (k === 'x') this.setCrossfader(this.sys.xfVal + 0.06);
        else if (['1', '2', '3', '4'].includes(k)) A.hotCue(parseInt(k) - 1);
        else if (['7', '8', '9'].includes(k)) B.hotCue(parseInt(k) - 7);
        else if (k === '0') B.hotCue(3);
      });
    }

    /* ── 프레임 루프 (파형/미터/비트등/시간) ── */
    _frame() {
      for (const id of ['A', 'B']) {
        const deck = this.sys.deck(id);
        const ui = this.deckUI[id];
        this.waves[id].draw();
        // 시간 표시
        if (deck.buffer) {
          const p = deck.posNow();
          ui.timeCur.textContent = `${Math.floor(p / 60)}:${String(Math.floor(p % 60)).padStart(2, '0')}.${Math.floor((p % 1) * 10)}`;
          if (deck.playing) ui.bpm.textContent = deck.effBpm().toFixed(1);
        }
        // 채널 미터
        const lvl = deck.meterLevel();
        this.meterFills[id].style.height = `${Math.min(100, lvl.rms * 300)}%`;
        // 비트 등
        const lights = this.beatLights[id];
        if (deck.track && deck.playing) {
          const beatInBar = Math.floor(deck.beatPos()) % 4;
          lights.forEach((li, i) => {
            li.className = i === beatInBar ? (id === 'A' ? 'on-a' : 'on-b') : '';
          });
        } else {
          lights.forEach((li) => (li.className = ''));
        }
      }
      // 마스터 미터
      const m = this.sys.masterLevel();
      this.meterFills.master.style.width = `${Math.min(100, m.rms * 300)}%`;
      // 비트 오프셋
      const off = this.sys.beatOffsetMs();
      if (off !== null) {
        const a = Math.abs(off);
        this.beatOffsetEl.textContent = a < 3 ? '완벽! 0ms' : `${off > 0 ? 'B가 ' + a.toFixed(0) + 'ms 늦음' : 'B가 ' + a.toFixed(0) + 'ms 빠름'}`;
        this.beatOffsetEl.classList.toggle('ok', a < 30);
      } else {
        this.beatOffsetEl.textContent = '--';
        this.beatOffsetEl.classList.remove('ok');
      }
      // 졸업셋 상태
      if (this.grad.active) {
        const el = this.grad.elapsed();
        $('#gradTimer').textContent = `${Math.floor(el / 60)}:${String(Math.floor(el % 60)).padStart(2, '0')}`;
        const warns = [];
        const audA = this.sys.audibility('A'), audB = this.sys.audibility('B');
        if (audA > 0.25 && audB > 0.25) {
          const o = this.sys.beatOffsetMs();
          if (o !== null && Math.abs(o) > 45) warns.push('⚠️ 박자 어긋남 — 넛지/SYNC!');
          if (this.sys.deckA.eqDb.low > -8 && this.sys.deckB.eqDb.low > -8) warns.push('⚠️ 저음 겹침 — 한쪽 LOW를 내리세요');
        }
        if (audA <= 0.03 && audB <= 0.03) warns.push('🔇 무음 상태 — 음악을 이어가세요!');
        $('#gradLive').innerHTML = warns.length ? warns.join('<br/>') : '👀 모니터링 중 — 좋아요, 계속하세요!';
      }
      // 스포트라이트 위치 추적
      if (this._spotTarget) {
        const r = this._spotTarget.getBoundingClientRect();
        const sp = $('#spotlight');
        sp.style.left = `${r.left - 6}px`;
        sp.style.top = `${r.top - 6}px`;
        sp.style.width = `${r.width + 12}px`;
        sp.style.height = `${r.height + 12}px`;
      }
      requestAnimationFrame(() => this._frame());
    }
  }

  /* 부팅 */
  window.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
  });
})();
