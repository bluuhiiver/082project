import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { resolveXZ, raycastFloor } from './collision.js';

const WALK_SPEED = 3.1;
const SPRINT_SPEED = 5.4;
const CROUCH_SPEED = 1.7;
const ACCEL = 28;
const JUMP_SPEED = 4.6;
const GRAVITY = 12.5;
const RADIUS = 0.34;
const EYE_STAND = 1.68;
const EYE_CROUCH = 1.02;

export class Player {
  constructor(camera, domElement) {
    this.camera = camera;
    this.controls = new PointerLockControls(camera, domElement);
    this.position = new THREE.Vector3(0, EYE_STAND, 0);
    this.camera.position.copy(this.position);

    this.velocity = new THREE.Vector3();
    this.moveState = { f: 0, r: 0 };
    this.sprint = false;
    this.crouch = false;
    this.grounded = true;
    this.locked = false;
    this.enabled = true; // false during cutscenes/dialogue

    this.eyeHeight = EYE_STAND;
    this._bobT = 0;
    this._footTimer = 0;
    this.onFootstep = null;
    this.onJump = null;
    this.onLand = null;
    this._wasGrounded = true;

    this.colliders = [];

    this.controls.addEventListener('lock', () => { this.locked = true; });
    this.controls.addEventListener('unlock', () => { this.locked = false; });

    this._keys = new Set();
    window.addEventListener('keydown', (e) => this._onKey(e, true));
    window.addEventListener('keyup', (e) => this._onKey(e, false));
  }

  setSensitivity(mult) { this.controls.pointerSpeed = mult; }
  setColliders(colliders) { this.colliders = colliders; }

  lock() { this.controls.lock(); }
  unlock() { this.controls.unlock(); }

  teleport(x, y, z, yaw = 0) {
    this.position.set(x, y + this.eyeHeight, z);
    this.camera.position.copy(this.position);
    this.velocity.set(0, 0, 0);
    const e = new THREE.Euler(0, yaw, 0, 'YXZ');
    this.camera.quaternion.setFromEuler(e);
  }

  _onKey(e, down) {
    if (e.repeat) return;
    const k = e.code;
    if (['KeyW','KeyA','KeyS','KeyD','Space','ShiftLeft','ShiftRight','ControlLeft','ControlRight'].includes(k)) {
      if (down) this._keys.add(k); else this._keys.delete(k);
    }
    if (k === 'Space' && down && this.enabled && this.grounded) {
      this.velocity.y = JUMP_SPEED;
      this.grounded = false;
      if (this.onJump) this.onJump();
    }
    this.sprint = this._keys.has('ShiftLeft') || this._keys.has('ShiftRight');
    this.crouch = this._keys.has('ControlLeft') || this._keys.has('ControlRight');
  }

  getForward() {
    const v = new THREE.Vector3();
    this.camera.getWorldDirection(v);
    v.y = 0; v.normalize();
    return v;
  }
  getRight() {
    const f = this.getForward();
    return new THREE.Vector3(f.z, 0, -f.x);
  }

  update(dt) {
    const keys = this._keys;
    let f = 0, r = 0;
    if (this.enabled && this.locked) {
      if (keys.has('KeyW')) f += 1;
      if (keys.has('KeyS')) f -= 1;
      if (keys.has('KeyD')) r += 1;
      if (keys.has('KeyA')) r -= 1;
    }
    const len = Math.hypot(f, r) || 1;
    f /= len; r /= len;

    const targetSpeed = this.crouch ? CROUCH_SPEED : (this.sprint ? SPRINT_SPEED : WALK_SPEED);
    const fwd = this.getForward();
    const right = this.getRight();
    const wishX = (fwd.x * f + right.x * r) * targetSpeed;
    const wishZ = (fwd.z * f + right.z * r) * targetSpeed;

    this.velocity.x += (wishX - this.velocity.x) * Math.min(1, ACCEL * dt);
    this.velocity.z += (wishZ - this.velocity.z) * Math.min(1, ACCEL * dt);

    // gravity
    this.velocity.y -= GRAVITY * dt;
    if (this.velocity.y < -20) this.velocity.y = -20;

    // integrate XZ with collision
    this.position.x += this.velocity.x * dt;
    this.position.z += this.velocity.z * dt;
    const feetY = this.position.y - this.eyeHeight;
    resolveXZ(this.position, RADIUS, this.colliders, feetY, feetY + this.eyeHeight + 0.3);

    // integrate Y with floor
    this.position.y += this.velocity.y * dt;
    const floorY = raycastFloor(this.position, this.colliders);
    const targetEye = this.crouch ? EYE_CROUCH : EYE_STAND;
    this.eyeHeight += (targetEye - this.eyeHeight) * Math.min(1, 10 * dt);
    const minEyeY = floorY + this.eyeHeight;
    if (this.position.y <= minEyeY) {
      this.position.y = minEyeY;
      this.velocity.y = 0;
      if (!this.grounded) { this.grounded = true; }
    } else {
      this.grounded = false;
    }
    if (this.grounded && !this._wasGrounded && this.onLand) this.onLand();
    this._wasGrounded = this.grounded;

    // head bob
    const speed = Math.hypot(this.velocity.x, this.velocity.z);
    let bobY = 0, bobX = 0;
    if (speed > 0.2 && this.grounded) {
      const rate = this.sprint ? 11 : (this.crouch ? 7 : 9);
      this._bobT += dt * rate;
      bobY = Math.sin(this._bobT * 2) * 0.028;
      bobX = Math.sin(this._bobT) * 0.018;
      this._footTimer -= dt;
      if (this._footTimer <= 0) {
        this._footTimer = this.sprint ? 0.29 : 0.42;
        if (this.onFootstep) this.onFootstep();
      }
    } else {
      this._bobT = 0;
      this._footTimer = 0.1;
    }

    this.camera.position.set(
      this.position.x + right.x * bobX,
      this.position.y + bobY,
      this.position.z + right.z * bobX
    );
  }
}
