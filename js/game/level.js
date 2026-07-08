import * as THREE from 'three';

const WALL_H = 3.4;

function mat(color, emissive = 0x000000, emissiveIntensity = 1, rough = 0.75, metal = 0.3) {
  return new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity, roughness: rough, metalness: metal });
}

export class Level {
  constructor(scene, state) {
    this.scene = scene;
    this.state = state;
    this.colliders = [];
    this.doors = [];
    this.doorById = {};
    this.interactables = [];
    this.markers = {};
    this.lights = [];
    this.emissiveStrips = [];
    this.powered = true;
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
    this.emissiveStrips.push({ mesh: m, base: intensity });
    return m;
  }

  room(cx, cz, sx, sz, opts = {}) {
    const color = opts.wallColor ?? 0x151b23;
    const y0 = opts.y ?? 0;
    this.addFloor(sx, sz, cx, y0, cz, opts.floorColor ?? 0x11161d);
    this.addCeiling(sx, sz, cx, y0 + WALL_H, cz);

    const openings = opts.openings ?? [];
    const wallMat = mat(color, 0x000000, 0, 0.8, 0.25);

    const buildWall = (side, isNS, fixedCoord, from, to, thickness) => {
      const gaps = openings.filter(o => o.side === side);
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
    buildWall('north', true, cz - sz / 2, cx - sx / 2, cx + sx / 2, thick);
    buildWall('south', true, cz + sz / 2, cx - sx / 2, cx + sx / 2, thick);
    buildWall('west', false, cx - sx / 2, cz - sz / 2, cz + sz / 2, thick);
    buildWall('east', false, cx + sx / 2, cz - sz / 2, cz + sz / 2, thick);

    const stripColor = opts.stripColor ?? 0x47e6ff;
    if (opts.stripAxis === 'x') this.addStrip(sx * 0.7, 0.08, cx, y0 + WALL_H - 0.06, cz, stripColor, 0);
    else this.addStrip(sz * 0.7, 0.08, cx, y0 + WALL_H - 0.06, cz, stripColor, Math.PI / 2);
    const l = new THREE.PointLight(stripColor, 2.4, Math.max(sx, sz) * 1.4, 2);
    l.position.set(cx, y0 + WALL_H - 0.3, cz);
    this.scene.add(l);
    this.lights.push({ light: l, base: 2.4 });

    return { cx, cz, sx, sz, y0 };
  }

  addDoor(x, z, width, axis, id, opts = {}) {
    const h = 2.5, thick = 0.22;
    const group = new THREE.Group();
    const geo = axis === 'x' ? new THREE.BoxGeometry(width, h, thick) : new THREE.BoxGeometry(thick, h, width);
    const panel = new THREE.Mesh(geo, mat(0x232c33, 0x000000, 0, 0.55, 0.55));
    panel.castShadow = true; panel.receiveShadow = true;
    group.add(panel);

    const seamGeo = axis === 'x' ? new THREE.BoxGeometry(width * 0.94, 0.05, thick + 0.02) : new THREE.BoxGeometry(thick + 0.02, 0.05, width * 0.94);
    const seamMat = mat(0x0a0a0a, opts.locked ? 0xff5470 : 0x47e6ff, 1.4, 0.4, 0);
    const seam = new THREE.Mesh(seamGeo, seamMat);
    group.add(seam);

    group.position.set(x, h / 2, z);
    this.scene.add(group);

    const collider = axis === 'x'
      ? { minX: x - width / 2, maxX: x + width / 2, minZ: z - thick / 2, maxZ: z + thick / 2, minY: 0, maxY: h }
      : { minX: x - thick / 2, maxX: x + thick / 2, minZ: z - width / 2, maxZ: z + width / 2, minY: 0, maxY: h };
    this.colliders.push(collider);

    const door = {
      id, mesh: group, seam, collider, x, z, open: false, baseY: h / 2,
      locked: !!opts.locked, lockedMsg: opts.lockedMsg || '잠겨 있다.',
    };
    this.doors.push(door);
    this.doorById[id] = door;
    return door;
  }

  unlockDoor(id) {
    const d = this.doorById[id];
    if (d && d.locked) {
      d.locked = false;
      d.seam.material.emissive.setHex(0x47e6ff);
      return true;
    }
    return false;
  }

  updateDoors(dt, playerPos) {
    for (const d of this.doors) {
      const dx = playerPos.x - d.x, dz = playerPos.z - d.z;
      const near = (dx * dx + dz * dz) < 9;
      d.playerNear = near;
      d.open = near && !d.locked;
      const targetY = d.open ? d.baseY + 2.4 : d.baseY;
      d.mesh.position.y += (targetY - d.mesh.position.y) * Math.min(1, dt * 6);
      d.collider.disabled = d.mesh.position.y > d.baseY + 1.6;
    }
  }

  setPower(on) {
    this.powered = on;
    for (const { light, base } of this.lights) light.intensity = on ? base : base * 0.12;
    for (const { mesh, base } of this.emissiveStrips) mesh.material.emissiveIntensity = on ? base : base * 0.1;
  }

  addCrate(x, z, size = 1, ry = 0) {
    const m = this.addBox(size, size, size, x, size / 2, z, mat(0x3a2f22, 0x000000, 0, 0.95, 0));
    m.rotation.y = ry;
    this.addWallCollider(x, z, size * 0.9, size * 0.9, 0, size);
  }

  addPillarGreeble(x, z, h = WALL_H) {
    this.addBox(0.3, h, 0.3, x, h / 2, z, mat(0x1a222b, 0x000000, 0, 0.6, 0.4), false);
  }

  addBody(x, z, ry = 0) {
    // a crew member under a dark thermal sheet — kept abstract
    const g = new THREE.Group();
    const sheet = new THREE.Mesh(new THREE.CapsuleGeometry(0.26, 1.15, 4, 10), mat(0x232830, 0x000000, 0, 0.95, 0));
    sheet.rotation.z = Math.PI / 2;
    sheet.position.y = 0.24;
    sheet.scale.y = 0.6;
    g.add(sheet);
    g.position.set(x, 0, z);
    g.rotation.y = ry;
    this.scene.add(g);
    return g;
  }

  addTerminal(x, z, ry = 0, screenColor = 0x47e6ff) {
    const g = new THREE.Group();
    const stand = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.0, 0.16), mat(0x1a222b));
    stand.position.y = 0.5;
    g.add(stand);
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.5, 0.06), mat(0x0a0f12, screenColor, 0.8, 0.4, 0.2));
    screen.position.y = 1.18;
    screen.rotation.x = -0.18;
    g.add(screen);
    g.position.set(x, 0, z);
    g.rotation.y = ry;
    this.scene.add(g);
    return g;
  }

  markInteractable(obj) { this.interactables.push(obj); }

  // ── layout ────────────────────────────────────────────
  // main spine: x[-1.8,1.8] z[-17,19]. east wing: z[9.5,12.5] x[1.8,15].
  _buildAll() {
    this._starfield();
    this._buildAirlock();
    this._buildCorridorSpine();
    this._buildQuarters();
    this._buildLab();
    this._buildCargo();
    this._buildBridge();
    this._buildEastWing();
    this._buildMedbay();
    this._buildPodBay();
    this._buildEngineering();

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
    this.scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xbfe8ee, size: 0.35, sizeAttenuation: true })));
  }

  _buildAirlock() {
    this.room(0, -20, 6, 6, { openings: [{ side: 'south', center: 0, width: 2.2 }], stripAxis: 'x', wallColor: 0x121820 });
    this.addPillarGreeble(-2.6, -22.6);
    this.addPillarGreeble(2.6, -22.6);
    this.markInteractable({ id: 'airlock_terminal', position: new THREE.Vector3(-2.2, 1.1, -19.2), radius: 1.7, label: '진입 로그 확인', kind: 'log', logKey: 'airlock' });
    this.addTerminal(-2.2, -19.4, 0.9);
  }

  _buildCorridorSpine() {
    this.room(0, 1, 3.6, 36, {
      openings: [
        { side: 'north', center: 0, width: 2.2 },
        { side: 'west', center: -7, width: 2.4 },
        { side: 'east', center: 3, width: 2.4 },
        { side: 'west', center: 11, width: 2.4 },
        { side: 'east', center: 11, width: 2.4 },
        { side: 'south', center: 0, width: 2.6 },
      ],
      stripAxis: 'z', wallColor: 0x131a22, stripColor: 0x2fb7c9,
    });
    for (let z = -13; z <= 15; z += 4) {
      if (Math.abs(z - 11) < 2 || Math.abs(z - 3) < 2) continue;
      this.addPillarGreeble(-1.55, z);
      this.addPillarGreeble(1.55, z);
    }
    this.addDoor(0, -17, 2.2, 'x', 'door_airlock');
    this.addDoor(-1.8, -7, 2.4, 'z', 'door_quarters');
    this.addDoor(1.8, 3, 2.4, 'z', 'door_lab');
    this.addDoor(-1.8, 11, 2.4, 'z', 'door_cargo');
    this.addDoor(1.8, 11, 2.4, 'z', 'door_east', { locked: true, lockedMsg: '동쪽 윙 — 보안 격리 중. 붉은 등이 깜박인다.' });
    this.addDoor(0, 19, 2.6, 'x', 'door_bridge', { locked: true, lockedMsg: '함교 격벽 — 주 동력이 복구되어야 개방된다.' });
  }

  _buildQuarters() {
    this.room(-5.3, -7, 7, 6, { openings: [{ side: 'east', center: -7, width: 2.4 }], stripAxis: 'x', wallColor: 0x161016, stripColor: 0xffb454 });
    this.addBox(1.6, 0.9, 0.7, -7.6, 0.45, -9.2, mat(0x2b2320));
    this.addBox(1.6, 0.9, 0.7, -7.6, 0.45, -4.8, mat(0x2b2320));
    this.markInteractable({ id: 'crew_photo', position: new THREE.Vector3(-7.6, 1.2, -9.2), radius: 1.7, label: '선원 사진 살펴보기', kind: 'log', logKey: 'quarters_photo' });
    this.markInteractable({ id: 'quarters_board', position: new THREE.Vector3(-5.3, 1.4, -4.4), radius: 1.7, label: '게시판 읽기', kind: 'log', logKey: 'mess' });
    this.markInteractable({ id: 'voss_drawer', position: new THREE.Vector3(-7.6, 0.6, -4.8), radius: 1.6, label: '잠긴 서랍', kind: 'drawer' });
    this.markers.quarters = new THREE.Vector3(-5.3, 0, -7);
  }

  _buildLab() {
    this.room(5.8, 3, 8, 8, { openings: [{ side: 'west', center: 3, width: 2.4 }], stripAxis: 'x', wallColor: 0x0f1a1c, stripColor: 0x47e6ff });
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
    this.markInteractable({ id: 'aria_core', position: new THREE.Vector3(8.5, 1.5, 3), radius: 2.4, label: 'ARIA와 대화하기', kind: 'story', storyKey: 'aria' });
    this.markers.lab = new THREE.Vector3(5.8, 0, 3);
    this.markers.ariaCore = core.position.clone();
  }

  _buildCargo() {
    this.room(-5.3, 11, 7, 7, { openings: [{ side: 'east', center: 11, width: 2.4 }], stripAxis: 'x', wallColor: 0x14181a, stripColor: 0xff9d4d });
    this.addCrate(-7.7, 9.2, 1.1, 0.3);
    this.addCrate(-6.4, 9.4, 1.1, -0.2);
    this.addCrate(-7.7, 12.8, 1.3, 0.6);
    // the sealed inner hold — three bodies behind glass
    this.addBox(3.2, WALL_H, 0.16, -5.3, WALL_H / 2, 13.6, new THREE.MeshStandardMaterial({ color: 0x0d232c, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.42 }));
    this.addWallCollider(-5.3, 13.6, 3.2, 0.2);
    this.addBody(-5.9, 14.1, 0.4);
    this.addBody(-4.8, 14.2, -0.5);
    this.addBody(-5.4, 14.4, 1.2);
    this.markInteractable({ id: 'cargo_panel', position: new THREE.Vector3(-5.3, 1.1, 13.4), radius: 1.9, label: '격벽 패널 살펴보기', kind: 'log', logKey: 'cargo' });
    this.markers.cargo = new THREE.Vector3(-5.3, 0, 11);
  }

  _buildBridge() {
    this.room(0, 24, 12, 10, { openings: [{ side: 'north', center: 0, width: 2.6 }], stripAxis: 'x', wallColor: 0x0c1116, stripColor: 0x47e6ff });
    this.addBox(8, 1.8, 0.05, 0, 2, 28.9, new THREE.MeshBasicMaterial({ color: 0x0a1a22 }), false);
    this.addBox(9, 0.15, 1.2, 0, 0.9, 22.5, mat(0x1a222b, 0x47e6ff, 0.4), true);
    this.markInteractable({ id: 'bridge_console', position: new THREE.Vector3(0, 1.1, 22.5), radius: 2.2, label: '보스 박사와 대화', kind: 'story', storyKey: 'voss' });
    this.markers.bridge = new THREE.Vector3(0, 0, 24);
    this.markers.voss = new THREE.Vector3(-3, 0, 25.5);
  }

  _buildEastWing() {
    this.room(8.4, 11, 13.2, 3, {
      openings: [
        { side: 'west', center: 11, width: 2.4 },
        { side: 'north', center: 13, width: 2.2 },
        { side: 'south', center: 8, width: 2.2 },
        { side: 'east', center: 11, width: 2.4 },
      ],
      stripAxis: 'x', wallColor: 0x141a1e, stripColor: 0x2fb7c9,
    });
    this.markInteractable({ id: 'east_notice', position: new THREE.Vector3(5.5, 1.4, 9.7), radius: 1.7, label: '벽면 공지 읽기', kind: 'log', logKey: 'east_notice' });
    this.addDoor(13, 9.5, 2.2, 'x', 'door_medbay', { locked: true, lockedMsg: '의무실 — MED 등급 키카드가 필요하다.' });
    this.addDoor(8, 12.5, 2.2, 'x', 'door_pod', { locked: true, lockedMsg: '포드 베이 — 4자리 보안 코드가 걸려 있다.' });
    this.addDoor(15, 11, 2.4, 'z', 'door_eng');
    this.markInteractable({ id: 'pod_keypad', position: new THREE.Vector3(9.5, 1.2, 12.2), radius: 1.7, label: '키패드 입력', kind: 'keypad', doorId: 'door_pod', code: '2201', when: () => this.doorById.door_pod.locked });
  }

  _buildMedbay() {
    // x[10,15] z[4.5,9.5] — east wall shares x=15 with engineering's west wall
    this.room(12.5, 7, 5, 5, { openings: [{ side: 'south', center: 13, width: 2.2 }], stripAxis: 'x', wallColor: 0x101a18, stripColor: 0x7ef0c8 });
    this.addBox(2.0, 0.75, 0.9, 11.3, 0.38, 5.6, mat(0xdfe8ea, 0x000000, 0, 0.6, 0));
    this.addBox(2.0, 0.75, 0.9, 13.7, 0.38, 5.6, mat(0xdfe8ea, 0x000000, 0, 0.6, 0));
    this.addWallCollider(11.3, 5.6, 2.0, 0.9, 0, 0.8);
    this.addWallCollider(13.7, 5.6, 2.0, 0.9, 0, 0.8);
    this.addTerminal(14.2, 7.2, -Math.PI / 2, 0x7ef0c8);
    this.markInteractable({ id: 'autopsy', position: new THREE.Vector3(14.2, 1.1, 7.2), radius: 1.8, label: '부검 단말 열람', kind: 'log', logKey: 'autopsy' });
    this.markInteractable({ id: 'med_locker', position: new THREE.Vector3(10.8, 1.1, 8.6), radius: 1.7, label: '보관함 열기', kind: 'log', logKey: 'med_locker' });
    this.addBox(0.9, 1.8, 0.5, 10.8, 0.9, 8.95, mat(0x25333a));
    this.markers.medbay = new THREE.Vector3(12.5, 0, 7);
  }

  _buildPodBay() {
    this.room(8, 15.5, 6, 6, { openings: [{ side: 'north', center: 8, width: 2.2 }], stripAxis: 'x', wallColor: 0x171512, stripColor: 0xffb454 });
    // remaining pod
    const pod = new THREE.Mesh(new THREE.CapsuleGeometry(0.7, 1.6, 4, 12), mat(0x2c3540, 0x47e6ff, 0.15, 0.4, 0.7));
    pod.rotation.z = Math.PI / 2;
    pod.position.set(9.3, 1.0, 17.2);
    pod.castShadow = true;
    this.scene.add(pod);
    this.addWallCollider(9.3, 17.2, 2.6, 1.6, 0, 2);
    // empty cradle
    this.addBox(2.6, 0.3, 1.4, 6.6, 0.15, 17.2, mat(0x1a1e24));
    this.addStrip(2.2, 0.06, 6.6, 0.35, 16.5, 0xff5470, 0, 1.2);
    this.addTerminal(6.2, 14.2, 0.6, 0xffb454);
    this.markInteractable({ id: 'pod_terminal', position: new THREE.Vector3(6.2, 1.1, 14.2), radius: 1.8, label: '사출 기록 열람', kind: 'log', logKey: 'pod_bay' });
    this.markers.podbay = new THREE.Vector3(8, 0, 15.5);
  }

  _buildEngineering() {
    this.room(19, 11, 8, 10, { openings: [{ side: 'west', center: 11, width: 2.4 }], stripAxis: 'z', wallColor: 0x1a1410, stripColor: 0xff9d4d });
    // reactor column
    const reactor = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.3, WALL_H, 20), mat(0x241d16, 0xff9d4d, 0.25, 0.5, 0.6));
    reactor.position.set(21, WALL_H / 2, 11);
    this.scene.add(reactor);
    this.addWallCollider(21, 11, 2.4, 2.4);
    // three breakers on the north wall
    const bx = [17.2, 18.6, 20.0];
    const ids = ['A', 'B', 'C'];
    this._breakerMeshes = {};
    for (let i = 0; i < 3; i++) {
      const box = this.addBox(0.7, 1.5, 0.3, bx[i], 1.1, 6.4, mat(0x2a2118, 0xff5470, 0.5, 0.6, 0.4));
      this._breakerMeshes[ids[i]] = box;
      this.markInteractable({ id: 'breaker_' + ids[i], position: new THREE.Vector3(bx[i], 1.1, 6.6), radius: 1.35, label: `브레이커 ${ids[i]} 작동`, kind: 'breaker', breakerId: ids[i], when: () => !this.state.flags.powerRestored });
    }
    // Han's body + datapad
    this.addBody(22.2, 14.6, 1.2);
    this.markInteractable({ id: 'han_body', position: new THREE.Vector3(22.2, 0.6, 14.6), radius: 1.8, label: '쓰러진 승무원 살펴보기', kind: 'log', logKey: 'han_body' });
    this.markInteractable({ id: 'han_pad', position: new THREE.Vector3(21.4, 0.6, 15.2), radius: 1.6, label: '데이터패드 읽기', kind: 'log', logKey: 'han_pad', when: () => !!this.state.flags.foundHan });
    // comm array (OMEGA message after power restored)
    this.addTerminal(16.6, 14.8, 2.4, 0xff5470);
    this.markInteractable({ id: 'comm_array', position: new THREE.Vector3(16.6, 1.1, 14.8), radius: 1.8, label: '통신 어레이 — 수신 메시지', kind: 'log', logKey: 'omega', when: () => !!this.state.flags.powerRestored && !this.state.evidence.includes('ev_omega') });
    this.markers.engineering = new THREE.Vector3(19, 0, 11);
  }

  setBreakerLit(id, on) {
    const m = this._breakerMeshes && this._breakerMeshes[id];
    if (m) m.material.emissive.setHex(on ? 0x7ef0c8 : 0xff5470);
  }

  update(dt, elapsed) {
    if (this._aiCore) {
      this._aiCore.rotation.y += dt * 0.3;
      this._aiRing.rotation.z += dt * 0.6;
      this._aiCore.material.emissiveIntensity = 1.2 + Math.sin(elapsed * 2) * 0.4;
    }
  }
}
