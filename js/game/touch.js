import * as THREE from 'three';

export const IS_TOUCH = (typeof window !== 'undefined') &&
  (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0);

const LOOK_SPEED = 0.0042;
const PI_2 = Math.PI / 2;

// Virtual joystick (left half) + drag-look (right half) + jump button.
// Feeds Player via player.touchMove {f,r} and rotates the camera directly.
export class TouchControls {
  constructor(player, camera, root) {
    this.player = player;
    this.camera = camera;
    this.enabled = false;
    this._euler = new THREE.Euler(0, 0, 0, 'YXZ');

    this.el = document.createElement('div');
    this.el.id = 'touch-ui';
    this.el.innerHTML = `
      <div id="joy-zone"><div id="joy-base"><div id="joy-nub"></div></div></div>
      <div id="look-zone"></div>
      <button id="btn-jump" aria-label="jump">▲</button>
      <button id="btn-pause-touch" aria-label="pause">II</button>
    `;
    root.appendChild(this.el);

    this.joyZone = this.el.querySelector('#joy-zone');
    this.joyBase = this.el.querySelector('#joy-base');
    this.joyNub = this.el.querySelector('#joy-nub');
    this.lookZone = this.el.querySelector('#look-zone');
    this.jumpBtn = this.el.querySelector('#btn-jump');
    this.pauseBtn = this.el.querySelector('#btn-pause-touch');
    this.onPause = null;

    this._joyId = null;
    this._joyOrigin = { x: 0, y: 0 };
    this._lookId = null;
    this._lookLast = { x: 0, y: 0 };

    this._bind();
  }

  setEnabled(v) {
    this.enabled = v;
    this.el.style.display = v ? 'block' : 'none';
    if (!v) this.player.touchMove = { f: 0, r: 0 };
  }

  _bind() {
    const joy = this.joyZone;
    joy.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (this._joyId !== null) return;
      const t = e.changedTouches[0];
      this._joyId = t.identifier;
      this._joyOrigin = { x: t.clientX, y: t.clientY };
      this.joyBase.style.left = (t.clientX - 60) + 'px';
      this.joyBase.style.top = (t.clientY - 60) + 'px';
      this.joyBase.style.opacity = '1';
    }, { passive: false });

    joy.addEventListener('touchmove', (e) => {
      e.preventDefault();
      for (const t of e.changedTouches) {
        if (t.identifier !== this._joyId) continue;
        let dx = t.clientX - this._joyOrigin.x;
        let dy = t.clientY - this._joyOrigin.y;
        const len = Math.hypot(dx, dy);
        const max = 52;
        if (len > max) { dx = dx / len * max; dy = dy / len * max; }
        this.joyNub.style.transform = `translate(${dx}px, ${dy}px)`;
        if (this.player.enabled) {
          this.player.touchMove = { f: -dy / max, r: dx / max };
          this.player.sprint = len > max * 0.92;
        }
      }
    }, { passive: false });

    const joyEnd = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier !== this._joyId) continue;
        this._joyId = null;
        this.joyNub.style.transform = 'translate(0,0)';
        this.joyBase.style.opacity = '0.5';
        this.player.touchMove = { f: 0, r: 0 };
        this.player.sprint = false;
      }
    };
    joy.addEventListener('touchend', joyEnd);
    joy.addEventListener('touchcancel', joyEnd);

    const look = this.lookZone;
    look.addEventListener('touchstart', (e) => {
      if (this._lookId !== null) return;
      const t = e.changedTouches[0];
      this._lookId = t.identifier;
      this._lookLast = { x: t.clientX, y: t.clientY };
    }, { passive: true });

    look.addEventListener('touchmove', (e) => {
      e.preventDefault();
      for (const t of e.changedTouches) {
        if (t.identifier !== this._lookId) continue;
        const dx = t.clientX - this._lookLast.x;
        const dy = t.clientY - this._lookLast.y;
        this._lookLast = { x: t.clientX, y: t.clientY };
        if (!this.player.enabled) continue;
        this._euler.setFromQuaternion(this.camera.quaternion);
        this._euler.y -= dx * LOOK_SPEED;
        this._euler.x -= dy * LOOK_SPEED;
        this._euler.x = Math.max(-PI_2 + 0.05, Math.min(PI_2 - 0.05, this._euler.x));
        this.camera.quaternion.setFromEuler(this._euler);
      }
    }, { passive: false });

    const lookEnd = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier === this._lookId) this._lookId = null;
      }
    };
    look.addEventListener('touchend', lookEnd);
    look.addEventListener('touchcancel', lookEnd);

    this.jumpBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.player.tryJump();
    }, { passive: false });

    this.pauseBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (this.onPause) this.onPause();
    }, { passive: false });
  }
}
