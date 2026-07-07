import * as THREE from 'three';

export function makeHologramFigure(color = 0x47e6ff) {
  const g = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55, wireframe: false });
  const wireMat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.35 });

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.75, 4, 8), mat);
  torso.position.y = 1.1;
  g.add(torso);
  const torsoWire = new THREE.Mesh(new THREE.CapsuleGeometry(0.29, 0.76, 4, 8), wireMat);
  torsoWire.position.y = 1.1;
  g.add(torsoWire);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.19, 12, 12), mat);
  head.position.y = 1.72;
  g.add(head);

  const ring = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.62, 32), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.02;
  g.add(ring);

  const light = new THREE.PointLight(color, 2, 5, 2);
  light.position.y = 1.3;
  g.add(light);

  g.userData.flicker = { base: color, t: Math.random() * 10 };
  g.userData.parts = { torso, torsoWire, head, ring, light };
  return g;
}

export function makeHumanFigure(skin = 0xc9a37a, suit = 0x33424e) {
  const g = new THREE.Group();
  const suitMat = new THREE.MeshStandardMaterial({ color: suit, roughness: 0.7, metalness: 0.15 });
  const skinMat = new THREE.MeshStandardMaterial({ color: skin, roughness: 0.85 });

  const legs = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.2, 0.9, 10), suitMat);
  legs.position.y = 0.45;
  legs.castShadow = true;
  g.add(legs);

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.26, 0.55, 4, 10), suitMat);
  torso.position.y = 1.2;
  torso.castShadow = true;
  g.add(torso);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 14, 14), skinMat);
  head.position.y = 1.68;
  head.castShadow = true;
  g.add(head);

  const armL = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 0.55, 4, 8), suitMat);
  armL.position.set(0.34, 1.15, 0);
  armL.rotation.z = 0.15;
  g.add(armL);
  const armR = armL.clone();
  armR.position.x = -0.34;
  armR.rotation.z = -0.15;
  g.add(armR);

  g.userData.parts = { legs, torso, head };
  return g;
}
