import * as THREE from 'three';

function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

export class Cutscene {
  constructor(camera, fadeEl) {
    this.camera = camera;
    this.fadeEl = fadeEl;
    this.playing = false;
  }

  fadeOut(duration = 0.6) {
    this.fadeEl.style.transition = `opacity ${duration}s ease`;
    this.fadeEl.classList.add('show');
    return new Promise((res) => setTimeout(res, duration * 1000));
  }
  fadeIn(duration = 0.6) {
    this.fadeEl.style.transition = `opacity ${duration}s ease`;
    this.fadeEl.classList.remove('show');
    return new Promise((res) => setTimeout(res, duration * 1000));
  }

  async playPath(keyframes) {
    this.playing = true;
    for (let i = 0; i < keyframes.length - 1; i++) {
      await this._segment(keyframes[i], keyframes[i + 1]);
    }
    this.playing = false;
  }

  _segment(a, b) {
    return new Promise((resolve) => {
      const start = performance.now();
      const dur = (b.duration ?? 2) * 1000;
      const pos = new THREE.Vector3();
      const look = new THREE.Vector3();
      const step = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const e = easeInOut(t);
        pos.lerpVectors(a.pos, b.pos, e);
        look.lerpVectors(a.look, b.look, e);
        this.camera.position.copy(pos);
        this.camera.lookAt(look);
        if (t < 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });
  }
}
