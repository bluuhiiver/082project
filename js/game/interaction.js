import * as THREE from 'three';

export class InteractionSystem {
  constructor(player, interactables, hudPrompt, hudLabel) {
    this.player = player;
    this.interactables = interactables;
    this.promptEl = hudPrompt;
    this.labelEl = hudLabel;
    this.nearest = null;
    this.onInteract = null;
    this._tmp = new THREE.Vector3();
    this._used = new Set();

    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyE') this.tryInteract();
    });
  }

  update() {
    const feet = this._tmp.set(this.player.position.x, this.player.position.y - this.player.eyeHeight, this.player.position.z);
    let best = null, bestD = Infinity;
    for (const it of this.interactables) {
      if (it.when && !it.when()) continue;
      const dx = it.position.x - feet.x, dz = it.position.z - feet.z, dy = (it.position.y - feet.y) * 0.4;
      const d = dx * dx + dz * dz + dy * dy;
      if (d < it.radius * it.radius && d < bestD) { best = it; bestD = d; }
    }
    this.nearest = best;
    if (best && this.player.enabled) {
      this.promptEl.classList.remove('hidden');
      this.labelEl.textContent = best.label;
    } else {
      this.promptEl.classList.add('hidden');
    }
  }

  tryInteract() {
    if (!this.nearest || !this.player.enabled) return;
    if (this.onInteract) this.onInteract(this.nearest);
  }
}
