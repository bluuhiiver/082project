import * as THREE from 'three';
import { Engine } from './engine.js';
import { Player } from './player.js';
import { Level } from './level.js';
import { InteractionSystem } from './interaction.js';
import { DialogueSystem } from './dialogue.js';
import { Cutscene } from './cutscene.js';
import { AudioSystem } from './audio.js';
import { makeHologramFigure, makeHumanFigure } from './npc.js';
import { graph as storyGraph, endings, makeState, EVIDENCE, ITEMS } from './story.js';
import { TouchControls, IS_TOUCH } from './touch.js';

const $ = (sel) => document.querySelector(sel);
const SAVE_KEY = 'lastsignal_save_v2';

function checkWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) { return false; }
}

async function boot() {
  if (!checkWebGL()) {
    $('#loading').classList.add('hidden');
    $('#unsupported').classList.remove('hidden');
    return;
  }

  const canvas = $('#scene');
  const engine = new Engine(canvas);
  const audio = new AudioSystem();
  const state = makeState();

  // ── lighting ──
  const hemi = new THREE.HemisphereLight(0x3a4a55, 0x05070a, 0.55);
  engine.scene.add(hemi);
  const fill = new THREE.PointLight(0x89c7d6, 0.4, 30);
  fill.position.set(0, 3, 0);
  engine.scene.add(fill);

  const level = new Level(engine.scene, state);
  const player = new Player(engine.camera, canvas);
  player.setColliders(level.colliders);
  player.onFootstep = () => audio.footstep();
  player.onJump = () => audio.jump();
  player.onLand = () => audio.land();

  // NPC actors
  const aria = makeHologramFigure(0x47e6ff);
  aria.position.copy(level.markers.ariaCore).add(new THREE.Vector3(0, -0.55, 0));
  engine.scene.add(aria);

  const voss = makeHumanFigure();
  voss.position.copy(level.markers.voss);
  voss.rotation.y = Math.PI * 0.6;
  voss.visible = false;
  engine.scene.add(voss);

  const dialogue = new DialogueSystem($('#dialogue'), state);
  dialogue.loadGraph(storyGraph);

  const interaction = new InteractionSystem(player, level.interactables, $('#interact-prompt'), $('#interact-label'));
  const cutscene = new Cutscene(engine.camera, $('#fade'));

  // ── touch / no-pointer-lock support ──
  const touch = new TouchControls(player, engine.camera, document.body);
  touch.setEnabled(false);
  if (IS_TOUCH) {
    player.noLockMode = true;
    document.body.classList.add('touch');
    engine.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  }
  document.addEventListener('pointerlockerror', () => {
    player.noLockMode = true;
    enableMouseDragLook();
  });
  let dragLookOn = false;
  function enableMouseDragLook() {
    if (dragLookOn || IS_TOUCH) return;
    dragLookOn = true;
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    let dragging = false, lastX = 0, lastY = 0;
    canvas.addEventListener('mousedown', (e) => { dragging = true; lastX = e.clientX; lastY = e.clientY; });
    window.addEventListener('mouseup', () => { dragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (!dragging || !player.enabled) return;
      euler.setFromQuaternion(engine.camera.quaternion);
      euler.y -= (e.clientX - lastX) * 0.004;
      euler.x -= (e.clientY - lastY) * 0.004;
      euler.x = Math.max(-Math.PI / 2 + 0.05, Math.min(Math.PI / 2 - 0.05, euler.x));
      engine.camera.quaternion.setFromEuler(euler);
      lastX = e.clientX; lastY = e.clientY;
    });
  }
  $('#interact-prompt').addEventListener('click', () => interaction.tryInteract());

  const objectiveText = $('#objective-text');
  const subtitleLog = $('#subtitle-log');
  const vitalFill = $('#vital-fill');

  // ── objective / chapter presentation ──
  const CHAPTERS = {
    1: 'ARRIVAL',
    2: 'BLACKOUT',
    3: 'THE SURVIVOR',
    4: 'EVIDENCE',
    5: 'THE TRUTH',
  };
  function coreEvidenceCount() {
    return state.evidence.filter(e => ['ev_manual_override', 'ev_time_mismatch', 'ev_pod_log', 'ev_voss_log', 'ev_refusal_log'].includes(e)).length;
  }
  function updateObjective() {
    let t;
    if (state.ending) t = '항해 기록 종료';
    else if (!state.flags.ariaIntroDone) t = '신호가 발생한 연구실(LAB)의 AI 코어를 찾아라';
    else if (!state.flags.powerRestored) t = state.flags.knowsBreakerOrder
      ? '기관실 브레이커를 순서대로 재시동하라 (B → A → C)'
      : '동쪽 윙 기관실에서 주 동력을 복구하라 — 재시동 순서를 적은 공지를 찾아라';
    else if (!state.flags.metVoss) t = '함교(BRIDGE)로 가서 생존자를 확인하라';
    else if (state.flags.confessed || state.ending) t = '결론을 내려라';
    else t = `그날 밤의 진실을 밝힐 증거를 모아라 (${coreEvidenceCount()}/5) — 충분하면 함교에서 대질`;
    objectiveText.textContent = t;
  }

  let shownChapter = 0;
  function showChapterCard(n) {
    if (n <= shownChapter) return;
    shownChapter = n;
    const el = $('#chapter-title');
    el.querySelector('.ct-num').textContent = `CHAPTER ${n}`;
    el.querySelector('.ct-name').textContent = CHAPTERS[n] || '';
    el.classList.remove('hidden');
    requestAnimationFrame(() => el.classList.add('show'));
    audio.dialogueOpen();
    setTimeout(() => el.classList.remove('show'), 4200);
    setTimeout(() => el.classList.add('hidden'), 5600);
  }

  let subtitleTimer = 0;
  function showSubtitle(text, dur = 3.4) {
    subtitleLog.textContent = text;
    subtitleLog.classList.add('show');
    subtitleTimer = dur;
  }

  function ambientPool() {
    if (!state.flags.powerRestored && state.flags.blackout) return [
      '[비상 방송] 보조 전력 잔량 경고.',
      '어둠 속 어딘가에서 금속이 수축하는 소리.',
      'ARIA · …아직 거기 있죠? 다행이에요.',
      '비상등이 심장박동처럼 깜박인다.',
    ];
    if (state.flags.metVoss) return [
      '[방송] 산소 재순환 시스템, 정상 가동 중.',
      '멀리서 금속이 삐걱이는 소리가 들린다.',
      'ARIA · 기록은 거짓말을 하지 않아요. 지워지지만 않는다면.',
      '창밖의 별들이 미동도 없이 이쪽을 보고 있다.',
      '보스 박사의 기침 소리가 함교 쪽에서 울린다.',
    ];
    return [
      '[방송] 산소 재순환 시스템, 정상 가동 중.',
      'ARIA · …누가 있나요?',
      '[방송] 3구역 기압, 안정권 유지.',
      '멀리서 금속이 삐걱이는 소리가 들린다.',
    ];
  }

  // ── journal ──
  const journalEl = $('#journal');
  function renderJournal() {
    $('#jr-objective').textContent = objectiveText.textContent;
    const evWrap = $('#jr-evidence');
    const itWrap = $('#jr-items');
    $('#jr-ev-count').textContent = `(${state.evidence.length})`;
    evWrap.innerHTML = state.evidence.length ? '' : '<div class="jr-empty">아직 확보한 증거가 없다.</div>';
    for (const id of state.evidence) {
      const meta = EVIDENCE[id];
      if (!meta) continue;
      const c = document.createElement('div');
      c.className = 'jr-card';
      c.innerHTML = `<div class="jr-name">${meta.name}</div><div class="jr-desc">${meta.desc}</div>`;
      evWrap.appendChild(c);
    }
    itWrap.innerHTML = state.items.length ? '' : '<div class="jr-empty">비어 있다.</div>';
    for (const id of state.items) {
      const meta = ITEMS[id];
      if (!meta) continue;
      const c = document.createElement('div');
      c.className = 'jr-card';
      c.innerHTML = `<div class="jr-name">${meta.name}</div><div class="jr-desc">${meta.desc}</div>`;
      itWrap.appendChild(c);
    }
  }
  let journalOpen = false;
  function openJournal() {
    if (inCutscene || dialogue.active || state.ending || paused) return;
    journalOpen = true;
    renderJournal();
    journalEl.classList.remove('hidden');
    player.enabled = false;
    player.controls.unlock();
    audio.uiSelect();
  }
  function closeJournal() {
    journalOpen = false;
    journalEl.classList.add('hidden');
    player.enabled = true;
    if (!player.noLockMode) player.lock();
  }
  $('#btn-journal').addEventListener('click', openJournal);
  $('#btn-journal-close').addEventListener('click', closeJournal);

  // ── keypad ──
  const keypadEl = $('#keypad');
  let kpBuffer = '', kpTarget = null, keypadOpen = false;
  function openKeypad(it) {
    keypadOpen = true;
    kpBuffer = '';
    kpTarget = it;
    renderKp();
    keypadEl.classList.remove('hidden');
    player.enabled = false;
    player.controls.unlock();
  }
  function closeKeypad() {
    keypadOpen = false;
    keypadEl.classList.add('hidden');
    player.enabled = true;
    if (!player.noLockMode) player.lock();
  }
  function renderKp(cls = '') {
    const disp = $('#kp-display');
    disp.className = 'kp-display ' + cls;
    const chars = kpBuffer.padEnd(4, '·').split('').join(' ');
    disp.textContent = chars.replace(/·/g, '—');
  }
  keypadEl.addEventListener('click', (e) => {
    const k = e.target.dataset && e.target.dataset.k;
    if (!k) return;
    audio.typeTick();
    if (k === 'X') { closeKeypad(); return; }
    if (k === 'C') { kpBuffer = ''; renderKp(); return; }
    if (kpBuffer.length >= 4) return;
    kpBuffer += k;
    renderKp();
    if (kpBuffer.length === 4) {
      if (kpBuffer === kpTarget.code) {
        renderKp('ok');
        audio.uiSelect();
        setTimeout(() => {
          level.unlockDoor(kpTarget.doorId);
          audio.doorOpen();
          showSubtitle('보안 코드 승인 — 포드 베이 개방.');
          closeKeypad();
          saveGame();
        }, 450);
      } else {
        renderKp('err');
        audio.land();
        setTimeout(() => { kpBuffer = ''; renderKp(); }, 500);
      }
    }
  });

  // ── dialogue hooks ──
  dialogue.onNodeEnter = () => audio.dialogueOpen();
  dialogue.onType = () => audio.typeTick();
  dialogue.onChoice = () => audio.uiSelect();

  dialogue.onEnd = () => {
    updateObjective();
    applyStateEffects();
    saveGame();
    if (state.ending) {
      showEnding(state.ending);
      return;
    }
    player.enabled = true;
    if (!paused && !player.noLockMode) player.lock();
  };

  // side-effects driven by story flags (called after dialogues & on load)
  function applyStateEffects() {
    if (state.chapter >= 2) level.unlockDoor('door_east');
    if (state.flags.blackout && !state.flags.powerRestored) {
      level.setPower(false);
      engine.scene.fog.density = 0.075;
    } else {
      level.setPower(true);
      engine.scene.fog.density = 0.045;
    }
    if (state.flags.powerRestored) level.unlockDoor('door_bridge');
    if (state.items.includes('item_med_key')) level.unlockDoor('door_medbay');
    voss.visible = !!state.flags.powerRestored;
    if (state.chapter >= 2) showChapterCard(state.chapter <= 5 ? state.chapter : 5);
  }

  // ── breaker puzzle ──
  const BREAKER_ORDER = ['B', 'A', 'C'];
  let breakerSeq = [];
  function pressBreaker(id) {
    if (state.flags.powerRestored) return;
    breakerSeq.push(id);
    const idx = breakerSeq.length - 1;
    if (BREAKER_ORDER[idx] !== id) {
      breakerSeq = [];
      for (const b of BREAKER_ORDER) level.setBreakerLit(b, false);
      audio.land();
      startDialogue('breaker_wrong');
      return;
    }
    level.setBreakerLit(id, true);
    audio.uiSelect();
    if (breakerSeq.length === 3) {
      audio.doorOpen();
      startDialogue('power_restored');
    } else {
      showSubtitle(`브레이커 ${id} — 릴레이 결합. (${breakerSeq.length}/3)`);
    }
  }

  // ── interactions ──
  function startDialogue(nodeId) {
    player.enabled = false;
    player.controls.unlock();
    dialogue.start(nodeId);
  }

  interaction.onInteract = (it) => {
    if (it.kind === 'log') {
      startDialogue('log_' + it.logKey);
    } else if (it.kind === 'breaker') {
      pressBreaker(it.breakerId);
    } else if (it.kind === 'keypad') {
      openKeypad(it);
    } else if (it.kind === 'drawer') {
      if (state.evidence.includes('ev_voss_log')) { showSubtitle('서랍은 비어 있다. 들을 것은 이미 들었다.'); return; }
      if (state.items.includes('item_drawer_key')) startDialogue('log_voss_drawer');
      else { showSubtitle('잠겨 있다. 개인 사물함용 열쇠가 필요하다.'); audio.land(); }
    } else if (it.kind === 'story') {
      if (it.storyKey === 'aria') {
        if (!state.flags.ariaIntroDone) {
          state.flags.ariaIntroDone = true;
          startDialogue('aria_intro');
        } else {
          startDialogue('aria_revisit');
        }
      } else if (it.storyKey === 'voss') {
        if (!state.flags.metVoss) startDialogue('voss_meet');
        else if (!state.ending) startDialogue('voss_hub');
      }
    }
  };

  function showEnding(id) {
    audio.endingSting();
    const e = endings[id];
    $('#end-title').textContent = e.title;
    $('#end-desc').textContent = e.desc;
    $('#end-eyebrow').textContent = `ENDING — ${Object.keys(endings).indexOf(id) + 1}/${Object.keys(endings).length}`;
    $('#hud').classList.add('hidden');
    $('#ending').classList.remove('hidden');
    player.controls.unlock();
    document.exitPointerLock && document.exitPointerLock();
    localStorage.removeItem(SAVE_KEY);
  }

  $('#btn-restart').addEventListener('click', () => { localStorage.removeItem(SAVE_KEY); location.reload(); });

  // ── save / load ──
  function saveGame() {
    if (state.ending) return;
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        state,
        pos: { x: player.position.x, y: player.position.y - player.eyeHeight, z: player.position.z },
        quat: engine.camera.quaternion.toArray(),
        shownChapter,
      }));
    } catch (e) { /* storage unavailable — play without saves */ }
  }
  function loadSave() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  }

  // ── pause ──
  let paused = false;
  let inCutscene = true;
  function openPause() {
    if (inCutscene || dialogue.active || state.ending || journalOpen || keypadOpen) return;
    paused = true;
    player.controls.unlock();
    $('#pause').classList.remove('hidden');
  }
  function closePause() {
    paused = false;
    $('#pause').classList.add('hidden');
    if (!player.noLockMode) player.lock();
  }
  touch.onPause = () => {
    if (journalOpen) { closeJournal(); return; }
    if (paused) closePause(); else openPause();
  };
  $('#btn-resume').addEventListener('click', closePause);
  $('#btn-quit').addEventListener('click', () => { saveGame(); location.reload(); });
  $('#sens').addEventListener('input', (e) => player.setSensitivity(parseFloat(e.target.value)));
  $('#vol').addEventListener('input', (e) => audio.setVolume(parseFloat(e.target.value)));

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      if (keypadOpen) { closeKeypad(); return; }
      if (journalOpen) { closeJournal(); return; }
      if (paused) closePause(); else openPause();
    }
    if (e.code === 'KeyJ' && !dialogue.active && !inCutscene) {
      if (journalOpen) closeJournal(); else openJournal();
    }
    if (dialogue.active && /^Digit[1-9]$/.test(e.code)) {
      dialogue.handleNumberKey(parseInt(e.code.slice(5), 10));
    }
  });

  canvas.addEventListener('click', () => {
    if (!paused && !dialogue.active && !inCutscene && !state.ending && !journalOpen && !keypadOpen && !player.noLockMode) player.lock();
  });

  // ── title / start flow ──
  $('#btn-howto').addEventListener('click', () => $('#howto').classList.toggle('hidden'));

  const existingSave = loadSave();
  if (existingSave) $('#btn-continue').classList.remove('hidden');

  async function beginSession({ fromSave }) {
    audio.ensure();
    $('#title').classList.add('hidden');
    $('#hud').classList.remove('hidden');
    player.enabled = false;
    if (!player.noLockMode) player.lock();

    if (fromSave && existingSave) {
      Object.assign(state, existingSave.state);
      state.flags = existingSave.state.flags || {};
      shownChapter = existingSave.shownChapter || state.chapter;
      applyStateEffects();
      updateObjective();
      const p = existingSave.pos;
      player.teleport(p.x, p.y, p.z, 0);
      if (existingSave.quat) engine.camera.quaternion.fromArray(existingSave.quat);
      $('#fade').classList.add('show');
      await new Promise(r => setTimeout(r, 120));
      inCutscene = false;
      player.enabled = true;
      cutscene.fadeIn(0.8);
      showSubtitle('K-42 · 기록 복원 완료. 조사를 재개한다.', 3.5);
    } else {
      localStorage.removeItem(SAVE_KEY);
      player.teleport(level.markers.spawn.x, level.markers.spawn.y, level.markers.spawn.z, level.markers.spawnYaw);
      await runIntro();
      player.teleport(level.markers.spawn.x, level.markers.spawn.y, level.markers.spawn.z, level.markers.spawnYaw);
      inCutscene = false;
      player.enabled = true;
      cutscene.fadeIn(0.8);
      showChapterCard(1);
      showSubtitle('K-42 · 시스템 재가동 완료. 신호원을 추적한다.', 4);
    }
    updateObjective();
  }

  $('#btn-start').addEventListener('click', () => beginSession({ fromSave: false }));
  $('#btn-continue').addEventListener('click', () => beginSession({ fromSave: true }));

  async function runIntro() {
    $('#fade').classList.add('show');
    $('#fade').style.transition = 'none';
    await new Promise(r => setTimeout(r, 60));
    const p0 = new THREE.Vector3(0, 1.8, -22);
    const p1 = new THREE.Vector3(0, 1.7, -18.5);
    const l0 = new THREE.Vector3(0, 1.6, -17);
    const l1 = new THREE.Vector3(0, 1.6, -9);
    engine.camera.position.copy(p0);
    engine.camera.lookAt(l0);
    await cutscene.fadeIn(0.9);
    await cutscene.playPath([
      { pos: p0, look: l0, duration: 0 },
      { pos: p1, look: l1, duration: 3.2 },
    ]);
    await cutscene.fadeOut(0.7);
  }

  // ── boot sequence ──
  const bootLines = ['initializing systems…', 'calibrating optical sensors…', 'loading station schematics…', 'signal lock acquired.'];
  let bi = 0;
  const bootFill = $('#boot-fill'), bootLine = $('#boot-line');
  const bootTimer = setInterval(() => {
    bi++;
    bootFill.style.width = Math.min(100, bi * 26) + '%';
    bootLine.textContent = bootLines[Math.min(bi, bootLines.length - 1)];
    if (bi >= 4) {
      clearInterval(bootTimer);
      setTimeout(() => {
        $('#loading').classList.add('hidden');
        $('#title').classList.remove('hidden');
      }, 260);
    }
  }, 260);

  // ── locked door feedback ──
  let lockedMsgCooldown = 0;

  // ── main loop ──
  for (const d of level.doors) d._prevOpen = false;
  let prevChapter = state.chapter;
  engine.onUpdate((dt) => {
    const elapsed = engine.clock.elapsedTime;
    if (!inCutscene && !paused && !journalOpen && !keypadOpen) {
      player.update(dt);
    }
    level.updateDoors(dt, player.position);
    for (const d of level.doors) {
      if (d.open && !d._prevOpen) audio.doorOpen();
      d._prevOpen = d.open;
    }
    level.update(dt, elapsed);

    // locked door hint
    lockedMsgCooldown -= dt;
    if (lockedMsgCooldown <= 0 && !dialogue.active && !inCutscene) {
      for (const d of level.doors) {
        if (d.locked && d.playerNear) {
          const dx = player.position.x - d.x, dz = player.position.z - d.z;
          if (dx * dx + dz * dz < 4.2) {
            showSubtitle(d.lockedMsg);
            lockedMsgCooldown = 5;
            break;
          }
        }
      }
    }

    // chapter transitions from story effects
    if (state.chapter !== prevChapter) {
      prevChapter = state.chapter;
      applyStateEffects();
      updateObjective();
      saveGame();
    }

    aria.rotation.y += dt * 0.4;
    aria.userData.parts.ring.rotation.z += dt * 0.8;
    const flicker = 0.85 + Math.sin(elapsed * 6.2) * 0.1 + (Math.random() < 0.02 ? -0.3 : 0);
    aria.userData.parts.light.intensity = (level.powered ? 3.2 : 1.6) * flicker;

    if (voss.visible) voss.position.y = Math.sin(elapsed * 1.3) * 0.01;

    if (!dialogue.active && !journalOpen && !keypadOpen) {
      const prevNearest = interaction.nearest;
      interaction.update();
      if (interaction.nearest && interaction.nearest !== prevNearest) audio.promptShow();
    } else {
      $('#interact-prompt').classList.add('hidden');
    }
    dialogue.update(dt);

    if (IS_TOUCH) {
      const showTouch = !inCutscene && !dialogue.active && !paused && !state.ending && !journalOpen && !keypadOpen;
      if (touch.enabled !== showTouch) touch.setEnabled(showTouch);
    }

    if (subtitleTimer > 0) {
      subtitleTimer -= dt;
      if (subtitleTimer <= 0) subtitleLog.classList.remove('show');
    } else if (!inCutscene && !dialogue.active && !paused && !state.ending && Math.random() < dt * 0.012) {
      const pool = ambientPool();
      showSubtitle(pool[Math.floor(Math.random() * pool.length)]);
    }

    if (!state.ending) {
      vitalFill.style.width = (92 + Math.sin(elapsed * 0.7) * 5) + '%';
    }
  });

  engine.start();

  window.__game = {
    player, state, level, dialogue, engine, interaction, audio,
    saveGame, pressBreaker,
    get inCutscene() { return inCutscene; },
    get journalOpen() { return journalOpen; },
    get keypadOpen() { return keypadOpen; },
  };
}

boot();
