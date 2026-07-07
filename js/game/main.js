import * as THREE from 'three';
import { Engine } from './engine.js';
import { Player } from './player.js';
import { Level } from './level.js';
import { InteractionSystem } from './interaction.js';
import { DialogueSystem } from './dialogue.js';
import { Cutscene } from './cutscene.js';
import { AudioSystem } from './audio.js';
import { makeHologramFigure, makeHumanFigure } from './npc.js';
import { graph as storyGraph, endings, makeState } from './story.js';
import { TouchControls, IS_TOUCH } from './touch.js';

const $ = (sel) => document.querySelector(sel);

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

  const level = new Level(engine.scene);
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

  const dlgRoot = $('#dialogue');
  const dialogue = new DialogueSystem(dlgRoot, state);
  dialogue.loadGraph(storyGraph);

  const interaction = new InteractionSystem(player, level.interactables, $('#interact-prompt'), $('#interact-label'));
  const cutscene = new Cutscene(engine.camera, $('#fade'));

  // ── touch / no-pointer-lock support ──
  const touch = new TouchControls(player, engine.camera, document.body);
  touch.setEnabled(false);
  if (IS_TOUCH) {
    player.noLockMode = true;
    document.body.classList.add('touch');
    // lower render cost on phones
    engine.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  }
  // pointer lock denied (e.g. embedded iframe) → fall back to drag-look
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
  // tappable interact prompt (mobile has no E key)
  $('#interact-prompt').addEventListener('click', () => interaction.tryInteract());

  const objectiveText = $('#objective-text');
  const subtitleLog = $('#subtitle-log');
  const vitalFill = $('#vital-fill');

  const usedStory = new Set();

  function updateObjective() {
    if (state.ending) { objectiveText.textContent = '항해 기록 종료'; return; }
    if (!usedStory.has('aria_intro')) objectiveText.textContent = '신호가 발생한 연구실(LAB)의 AI 코어를 찾아라';
    else if (!state.metVoss) objectiveText.textContent = '함교(BRIDGE)로 이동해 생존자를 확인하라';
    else if (!usedStory.has('final_choice_done')) objectiveText.textContent = 'ARIA의 운명을 결정하라';
    else objectiveText.textContent = '항해 기록 종료';
  }
  updateObjective();

  let subtitleTimer = 0;
  const ambientLines = [
    '[방송] 산소 재순환 시스템, 정상 가동 중.',
    'ARIA · ...누가 있나요?',
    '[방송] 3구역 기압, 안정권 유지.',
    '멀리서 금속이 삐걱이는 소리가 들린다.',
  ];
  function showSubtitle(text, dur = 3.2) {
    subtitleLog.textContent = text;
    subtitleLog.classList.add('show');
    subtitleTimer = dur;
  }

  dialogue.onNodeEnter = (node) => {
    audio.dialogueOpen();
  };
  dialogue.onType = () => audio.typeTick();
  dialogue.onChoice = () => audio.uiSelect();

  dialogue.onEnd = () => {
    updateObjective();
    if (state.ending) {
      showEnding(state.ending);
      return;
    }
    player.enabled = true;
    if (!paused && !player.noLockMode) player.lock();
  };

  interaction.onInteract = (it) => {
    if (it.kind === 'log') {
      player.enabled = false;
      dialogue.start('log_' + it.logKey);
      player.controls.unlock();
    } else if (it.kind === 'story') {
      player.enabled = false;
      player.controls.unlock();
      if (it.storyKey === 'aria_intro') {
        if (usedStory.has('aria_intro')) dialogue.start('aria_revisit');
        else dialogue.start('aria_intro');
        usedStory.add('aria_intro');
      } else if (it.storyKey === 'bridge_intro') {
        voss.visible = true;
        if (!state.metVoss) dialogue.start('bridge_intro');
        else if (!state.ending) dialogue.start('final_choice');
        usedStory.add('bridge_intro');
      }
    }
  };

  // detect when final_choice concluded (any end_* node) to freeze objective text properly
  const origGoTo = dialogue._goTo.bind(dialogue);
  dialogue._goTo = (id) => { if (id && id.startsWith('end_')) usedStory.add('final_choice_done'); origGoTo(id); };

  function showEnding(id) {
    audio.endingSting();
    const e = endings[id];
    $('#end-title').textContent = e.title;
    $('#end-desc').textContent = e.desc;
    $('#hud').classList.add('hidden');
    $('#ending').classList.remove('hidden');
    player.controls.unlock();
    document.exitPointerLock && document.exitPointerLock();
  }

  $('#btn-restart').addEventListener('click', () => location.reload());

  // ── pause ──
  let paused = false;
  let inCutscene = true; // true until intro finishes
  function openPause() {
    if (inCutscene || dialogue.active || state.ending) return;
    paused = true;
    player.controls.unlock();
    $('#pause').classList.remove('hidden');
  }
  function closePause() {
    paused = false;
    $('#pause').classList.add('hidden');
    if (!player.noLockMode) player.lock();
  }
  touch.onPause = () => { if (paused) closePause(); else openPause(); };
  $('#btn-resume').addEventListener('click', closePause);
  $('#btn-quit').addEventListener('click', () => location.reload());
  $('#sens').addEventListener('input', (e) => player.setSensitivity(parseFloat(e.target.value)));
  $('#vol').addEventListener('input', (e) => audio.setVolume(parseFloat(e.target.value)));

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      if (paused) closePause(); else openPause();
    }
    if (dialogue.active && /^Digit[1-9]$/.test(e.code)) {
      dialogue.handleNumberKey(parseInt(e.code.slice(5), 10));
    }
  });

  // clicking canvas re-locks if appropriate
  canvas.addEventListener('click', () => {
    if (!paused && !dialogue.active && !inCutscene && !state.ending && !player.noLockMode) player.lock();
  });

  // ── title / start flow ──
  $('#btn-howto').addEventListener('click', () => $('#howto').classList.toggle('hidden'));

  $('#btn-start').addEventListener('click', async () => {
    audio.ensure();
    $('#title').classList.add('hidden');
    $('#hud').classList.remove('hidden');
    player.enabled = false;
    if (!player.noLockMode) player.lock();

    player.teleport(level.markers.spawn.x, level.markers.spawn.y, level.markers.spawn.z, level.markers.spawnYaw);
    await runIntro();
    player.teleport(level.markers.spawn.x, level.markers.spawn.y, level.markers.spawn.z, level.markers.spawnYaw);
    inCutscene = false;
    player.enabled = true;
    if (IS_TOUCH) touch.setEnabled(true);
    cutscene.fadeIn(0.8);
    showSubtitle('K-42 · 시스템 재가동 완료. 신호원을 추적한다.', 4);
  });

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

  // ── main loop ──
  for (const d of level.doors) d._prevOpen = false;
  engine.onUpdate((dt) => {
    const elapsed = engine.clock.elapsedTime;
    if (!inCutscene && !paused) {
      player.update(dt);
    }
    level.updateDoors(dt, player.position);
    for (const d of level.doors) {
      if (d.open && !d._prevOpen) audio.doorOpen();
      d._prevOpen = d.open;
    }
    level.update(dt, elapsed);

    aria.rotation.y += dt * 0.4;
    const t = elapsed * 2;
    aria.userData.parts.ring.rotation.z += dt * 0.8;
    const flicker = 0.85 + Math.sin(t * 3.1) * 0.1 + (Math.random() < 0.02 ? -0.3 : 0);
    aria.userData.parts.light.intensity = 3.2 * flicker;
    aria.children.forEach(c => { if (c.material && c.material.opacity !== undefined && c !== aria.userData.parts.ring) c.material.opacity = 0.5 * flicker; });

    if (voss.visible) voss.position.y = level.markers.voss.y + Math.sin(elapsed * 1.3) * 0.01;

    if (!dialogue.active) {
      const prevNearest = interaction.nearest;
      interaction.update();
      if (interaction.nearest && interaction.nearest !== prevNearest) audio.promptShow();
    } else {
      $('#interact-prompt').classList.add('hidden');
    }
    dialogue.update(dt);

    if (IS_TOUCH) {
      const showTouch = !inCutscene && !dialogue.active && !paused && !state.ending;
      if (touch.enabled !== showTouch) touch.setEnabled(showTouch);
    }

    if (subtitleTimer > 0) {
      subtitleTimer -= dt;
      if (subtitleTimer <= 0) subtitleLog.classList.remove('show');
    } else if (!inCutscene && !dialogue.active && !paused && !state.ending && Math.random() < dt * 0.01) {
      showSubtitle(ambientLines[Math.floor(Math.random() * ambientLines.length)]);
    }

    if (!state.ending) {
      const vitalPulse = 92 + Math.sin(elapsed * 0.7) * 5;
      vitalFill.style.width = vitalPulse + '%';
    }
  });

  engine.start();

  window.__game = { player, state, level, dialogue, usedStory, engine, interaction, audio, get inCutscene() { return inCutscene; } };
}

boot();
