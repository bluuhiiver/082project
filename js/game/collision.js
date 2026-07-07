// Simple AABB (in XZ) collision resolution for a circular player capsule.
// Colliders: { minX, maxX, minZ, maxZ, minY=0, maxY=Infinity, disabled? }

export function resolveXZ(pos, radius, colliders, playerMinY, playerMaxY) {
  for (const c of colliders) {
    if (c.disabled) continue;
    if (c.maxY !== undefined && playerMinY >= c.maxY) continue;
    if (c.minY !== undefined && playerMaxY <= c.minY) continue;

    const closestX = Math.max(c.minX, Math.min(pos.x, c.maxX));
    const closestZ = Math.max(c.minZ, Math.min(pos.z, c.maxZ));
    const dx = pos.x - closestX;
    const dz = pos.z - closestZ;
    const distSq = dx * dx + dz * dz;

    if (distSq < radius * radius) {
      const dist = Math.sqrt(distSq) || 0.0001;
      const overlap = radius - dist;
      pos.x += (dx / dist) * overlap;
      pos.z += (dz / dist) * overlap;
    }
  }
  return pos;
}

export function raycastFloor(pos, colliders) {
  // flat floor at y=0 unless a platform collider covers this XZ and is taller
  let floorY = 0;
  for (const c of colliders) {
    if (c.disabled || !c.isPlatform) continue;
    if (pos.x >= c.minX && pos.x <= c.maxX && pos.z >= c.minZ && pos.z <= c.maxZ) {
      if (c.topY > floorY) floorY = c.topY;
    }
  }
  return floorY;
}
