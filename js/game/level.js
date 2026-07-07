import * as THREE from 'three';

const WALL_H = 3.4;

function mat(color, emissive = 0x000000, emissiveIntensity = 1, rough = 0.75, metal = 0.3) {
  return new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity, roughness: rough, metalness: metal });
}

export class Level {
  constructor(scene) {
    this.scene = scene;
    this.colliders = [];
    this.doors = [];
    this.interactables = [];
    this.npcs = {};
    this.markers = {};
    this.lights = [];
    this._buildAll();
  }

  // ── primitives ─────────────────────────────────────────
  addBox(w, h, d, x, y, z, material, castShadow = true) {
    const geo = new THREE.BoxGeometry(w, h, d);
    const m = new THREE.Mesh(geo, material);
    m.position.set(x, y, z);
    m.castShadow = castShadow;
    m.receiveShadow = true;
    this.scene.add(m);
    return m;
  }

  addWallCollider(x, z, w, d, minY = 0, maxY = WALL_H) {
    this.colliders.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2, minY, maxY });
  }

  addFloor(w, d, x, y, z, color = 0x11161d) {
    const geo = new THREE.PlaneGeometry(w, d);
    const m = new THREE.Mesh(geo, mat(color, 0x000000, 0, 0.9, 0.15));
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, y, z);
    m.receiveShadow = true;
    this.scene.add(m);
    return m;
  }

  addCeiling(w, d, x, y, z, color = 0x05070a) {
    const geo = new THREE.PlaneGeometry(w, d);
    const m = new THREE.Mesh(geo, mat(color, 0x000000, 0, 1, 0));
    m.rotation.x = Math.PI / 2;
    m.position.set(x, y, z);
    this.scene.add(m);
    return m;
  }

  addStrip(w, h, x, y, z, color = 0x47e6ff, ry = 0, intensity = 2.2) {
    const geo = new THREE.BoxGeometry(w, h, 0.04);
    const m = new THREE.Mesh(geo, mat(0x0a0a0a, color, intensity, 0.4, 0));
    m.position.set(x, y, z);
    m.rotation.y = ry;
    this.scene.add(m);
    return m;
  }

  // build a solid rectangular room: floor+ceiling, walls with gaps for given openings
  // opening: {side:'north'|'south'|'east'|'west', center, width}
  room(cx, cz, sx, sz, opts = {}) {
    const color = opts.wallColor ?? 0x151b23;
    const y0 = opts.y ?? 0;
    this.addFloor(sx, sz, cx, y0, cz, opts.floorColor ?? 0x11161d);
    this.addCeiling(sx, sz, cx, y0 + WALL_H, cz);

    const openings = opts.openings ?? [];
    const wallMat = mat(color, 0x000000, 0, 0.8, 0.25);

    const buildWallWithGap = (isNS, fixedCoord, from, to, thickness) => {
      const gaps = openings.filter(o => (isNS ? (o.side === 'north' || o.side === 'south') : (o.side === 'east' || o.side === 'west')));
      // sort segments left to right by removing gap ranges from [from,to]
      let segments = [[from, to]];
      for (const g of gaps) {
        const gFrom = g.center - g.width / 2, gTo = g.center + g.width / 2;
        const next = [];
        for (const [s, e] of segments) {
          if (gTo <= s || gFrom >= e) { next.push([s, e]); continue; }
          if (gFrom > s) next.push([s, gFrom]);
          if (gTo < e) next.push([gTo, e]);
        }
        segments = next;
      }
      for (const [s, e] of segments) {
        const len = e - s;
        if (len <= 0.02) continue;
        const mid = (s + e) / 2;
        if (isNS) {
          this.addBox(len, WALL_H, thickness, mid, y0 + WALL_H / 2, fixedCoord, wallMat);
          this.addWallCollider(mid, fixedCoord, len, thickness, y0, y0 + WALL_H);
        } else {
          this.addBox(thickness, WALL_H, len, fixedCoord, y0 + WALL_H / 2, mid, wallMat);
          this.addWallCollider(fixedCoord, mid, thickness, len, y0, y0 + WALL_H);
        }
      }
    };

    const thick = 0.25;
    buildWallWithGap(true, cz - sz / 2, cx - sx / 2, cx + sx / 2, thick); // north (min z)
    buildWallWithGap(true, cz + sz / 2, cx - sx / 2, cx + sx / 2, thick); // south (max z)
    buildWallWithGap(false, cx - sx / 2, cz - sz / 2, cz + sz / 2, thick); // west (min x)
    buildWallWithGap(false, cx + sx / 2, cz - sz / 2, cz + sz / 2, thick); // east (max x)

    // ceiling strip light down the middle
    if (opts.stripAxis === 'x') {
      this.addStrip(sx * 0.7, 0.08, cx, y0 + WALL_H - 0.06, cz, opts.stripColor ?? 0x47e6ff, 0);
      const l = new THREE.PointLight(opts.stripColor ?? 0x47e6ff, 2.4, sx * 1.4, 2);
      l.position.set(cx, y0 + WALL_H - 0.3, cz);
      this.scene.add(l);
      this.lights.push(l);
    } else {
      this.addStrip(sz * 0.7, 0.08, cx, y0 + WALL_H - 0.06, cz, opts.stripColor ?? 0x47e6ff, Math.PI / 2);
      const l = new THREE.PointLight(opts.stripColor ?? 0x47e6ff, 2.4, sz * 1.4, 2);
      l.position.set(cx, y0 + WALL_H - 0.3, cz);
      this.scene.add(l);
      this.lights.push(l);
    }

    return { cx, cz, sx, sz, y0 };
  }

  addDoor(x, z, width, axis, id) {
    // axis 'x' = door spans along X (in a north/south wall), 'z' = spans along Z (east/west wall)
    const h = 2.5, thick = 0.22;
    const group = new THREE.Group();
    const geo = axis === 'x' ? new THREE.BoxGeometry(width, h, thick) : new THREE.BoxGeometry(thick, h, width);
    const panel = new THREE.Mesh(geo, mat(0x232c33, 0x000000, 0, 0.55, 0.55));
    panel.castShadow = true; panel.receiveShadow = true;
    group.add(panel);

    // thin glowing seam down the middle so the door reads as detail, not a flat glowing slab
    const seamGeo = axis === 'x' ? new THREE.BoxGeometry(width * 0.94, 0.05, thick + 0.02) : new THREE.BoxGeometry(thick + 0.02, 0.05, width * 0.94);
    const seam = new THREE.Mesh(seamGeo, mat(0x0a0a0a, 0x47e6ff, 1.4, 0.4, 0));
    group.add(seam);

    group.position.set(x, h / 2, z);
    this.scene.add(group);

    const collider = axis === 'x'
      ? { minX: x - width / 2, maxX: x + width / 2, minZ: z - thick / 2, maxZ: z + thick / 2, minY: 0, maxY: h }
      : { minX: x - thick / 2, maxX: x + thick / 2, minZ: z - width / 2, maxZ: z + width / 2, minY: 0, maxY: h };
    this.colliders.push(collider);

    const door = { id, mesh: group, collider, x, z, open: false, baseY: h / 2 };
    this.doors.push(door);
    return door;
  }

  updateDoors(dt, playerPos) {
    for (const d of this.doors) {
      const dx = playerPos.x - d.x, dz = playerPos.z - d.z;
      const near = (dx * dx + dz * dz) < 9;
      d.open = near;
      const targetY = d.open ? d.baseY + 2.4 : d.baseY;
      d.mesh.position.y += (targetY - d.mesh.position.y) * Math.min(1, dt * 6);
      d.collider.disabled = d.mesh.position.y > d.baseY + 1.6;
    }
  }

  addCrate(x, z, size = 1, ry = 0) {
    const m = this.addBox(size, size, size, x, size / 2, z, mat(0x3a2f22, 0x000000, 0, 0.95, 0));
    m.rotation.y = ry;
    this.addWallCollider(x, z, size * 0.9, size * 0.9, 0, size);
  }

  addPillarGreeble(x, z, h = WALL_H) {
    this.addBox(0.3, h, 0.3, x, h / 2, z, mat(0x1a222b, 0x000000, 0, 0.6, 0.4), false);
  }

  markInteractable(obj) {
    // obj: {position:Vector3, radius, label, id, prompt}
    this.interactables.push(obj);
  }

  // ── layout ─────────────────────────────────────────
  _buildAll() {
    // starfield backdrop
    this._starfield();
    this._buildAirlock();
    this._buildCorridorSpine();
    this._buildQuarters();
    this._buildLab();
    this._buildCargo();
    this._buildBridge();

    this.markers.spawn = new THREE.Vector3(0, 0, -21.5);
    this.markers.spawnYaw = Math.PI;
  }

  _starfield() {
    const geo = new THREE.BufferGeometry();
    const N = 1400;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 90 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = Math.abs(r * Math.cos(phi)) * 0.6 + 8;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({ color: 0xbfe8ee, size: 0.35, sizeAttenuation: true });
    this.scene.add(new THREE.Points(geo, m));
  }

  // corridor: cx=0, cz=1, sx=3.6, sz=36  ->  x:[-1.8,1.8]  z:[-17,19]
  _buildAirlock() {
    // south wall (z=-17) must coincide with corridor's north wall (z=-17)
    this.room(0, -20, 6, 6, { openings: [{ side: 'south', center: 0, width: 2.2 }], stripAxis: 'x', wallColor: 0x121820 });
    this.addPillarGreeble(-2.6, -22.6);
    this.addPillarGreeble(2.6, -22.6);
    this.markInteractable({
      id: 'airlock_terminal', position: new THREE.Vector3(-2.2, 1.1, -19.2), radius: 1.6,
      label: '입장 로그 확인', kind: 'log', logKey: 'airlock'
    });
  }

  _buildCorridorSpine() {
    // long hallway from z=-17 to z=19, openings on both sides at several z's
    this.room(0, 1, 3.6, 36, {
      openings: [
        { side: 'north', center: 0, width: 2.2 },   // -> airlock (x=0)
        { side: 'west', center: -7, width: 2.4 },   // -> quarters (z=-7)
        { side: 'east', center: 3, width: 2.4 },    // -> lab (z=3)
        { side: 'west', center: 11, width: 2.4 },   // -> cargo (z=11)
        { side: 'south', center: 0, width: 2.6 },   // -> bridge (x=0)
      ],
      stripAxis: 'z', wallColor: 0x131a22, stripColor: 0x2fb7c9,
    });
    for (let z = -13; z <= 15; z += 4) {
      this.addPillarGreeble(-1.55, z);
      this.addPillarGreeble(1.55, z);
    }
    this.addDoor(0, -17, 2.2, 'x', 'door_airlock');
    this.addDoor(-1.8, -7, 2.4, 'z', 'door_quarters');
    this.addDoor(1.8, 3, 2.4, 'z', 'door_lab');
    this.addDoor(-1.8, 11, 2.4, 'z', 'door_cargo');
    this.addDoor(0, 19, 2.6, 'x', 'door_bridge');
  }

  _buildQuarters() {
    // east wall (x=-1.8) must coincide with corridor's west wall
    this.room(-5.3, -7, 7, 6, { openings: [{ side: 'east', center: -7, width: 2.4 }], stripAxis: 'x', wallColor: 0x161016, stripColor: 0xffb454 });
    this.addBox(1.6, 0.9, 0.7, -7.6, 0.45, -9.2, mat(0x2b2320));
    this.addBox(1.6, 0.9, 0.7, -7.6, 0.45, -4.8, mat(0x2b2320));
    this.markInteractable({ id: 'crew_photo', position: new THREE.Vector3(-7.6, 1.2, -7), radius: 1.8, label: '선원 사진 살펴보기', kind: 'log', logKey: 'quarters_photo' });
    this.markers.quarters = new THREE.Vector3(-5.3, 0, -7);
  }

  _buildLab() {
    // west wall (x=1.8) must coincide with corridor's east wall
    this.room(5.8, 3, 8, 8, { openings: [{ side: 'west', center: 3, width: 2.4 }], stripAxis: 'x', wallColor: 0x0f1a1c, stripColor: 0x47e6ff });
    // AI core centerpiece
    const coreGeo = new THREE.CylinderGeometry(0.9, 0.9, 2.6, 24, 1, true);
    const coreMat = new THREE.MeshStandardMaterial({ color: 0x0a2530, emissive: 0x47e6ff, emissiveIntensity: 1.6, roughness: 0.3, metalness: 0.6, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.set(8.5, 1.5, 3);
    this.scene.add(core);
    this._aiCore = core;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.05, 8, 32), mat(0x0a0a0a, 0x47e6ff, 3));
    ring.position.copy(core.position);
    ring.rotation.x = Math.PI / 2;
    this.scene.add(ring);
    this._aiRing = ring;
    const coreLight = new THREE.PointLight(0x47e6ff, 4, 12, 2);
    coreLight.position.copy(core.position);
    this.scene.add(coreLight);
    this.addWallCollider(8.5, 3, 2, 2, 0, 2.6);
    this.markInteractable({ id: 'aria_core', position: new THREE.Vector3(8.5, 1.5, 3), radius: 2.4, label: 'ARIA와 대화하기', kind: 'story', storyKey: 'aria_intro' });
    this.markers.lab = new THREE.Vector3(5.8, 0, 3);
    this.markers.ariaCore = core.position.clone();
  }

  _buildCargo() {
    // east wall (x=-1.8) must coincide with corridor's west wall
    this.room(-5.3, 11, 7, 7, { openings: [{ side: 'east', center: 11, width: 2.4 }], stripAxis: 'x', wallColor: 0x14181a, stripColor: 0xff9d4d });
    this.addCrate(-7.7, 9.2, 1.1, 0.3);
    this.addCrate(-6.4, 9.4, 1.1, -0.2);
    this.addCrate(-7.7, 12.8, 1.3, 0.6);
    this.markInteractable({ id: 'cargo_manifest', position: new THREE.Vector3(-7.7, 1.1, 9.2), radius: 1.8, label: '화물 목록 확인', kind: 'log', logKey: 'cargo' });
    this.markers.cargo = new THREE.Vector3(-5.3, 0, 11);
  }

  _buildBridge() {
    // north wall (z=19) must coincide with corridor's south wall
    this.room(0, 24, 12, 10, { openings: [{ side: 'north', center: 0, width: 2.6 }], stripAxis: 'x', wallColor: 0x0c1116, stripColor: 0x47e6ff });
    // big viewport window strip on far wall (visual only, no collider gap needed physically)
    this.addBox(8, 1.8, 0.05, 0, 2, 28.9, new THREE.MeshBasicMaterial({ color: 0x0a1a22 }), false);
    this.addBox(9, 0.15, 1.2, 0, 0.9, 22.5, mat(0x1a222b, 0x47e6ff, 0.4), true); // console
    this.markInteractable({ id: 'bridge_console', position: new THREE.Vector3(0, 1.1, 22.5), radius: 2.2, label: '조타 콘솔', kind: 'story', storyKey: 'bridge_intro' });
    this.markers.bridge = new THREE.Vector3(0, 0, 24);
    this.markers.voss = new THREE.Vector3(-3, 0, 25.5);
  }

  update(dt, elapsed) {
    if (this._aiCore) {
      this._aiCore.rotation.y += dt * 0.3;
      this._aiRing.rotation.z += dt * 0.6;
      const pulse = 1.2 + Math.sin(elapsed * 2) * 0.4;
      this._aiCore.material.emissiveIntensity = pulse;
    }
  }
}
