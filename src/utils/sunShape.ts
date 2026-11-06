/**
 * Geometry for the sun → "A" morph, in a 200×200 box shared with the moon.
 * The A sits inside the moon's hollow (centred on x=130) so it nestles against the crescent "C".
 */

export type Point = [number, number];

/** The full sun disc, as points, clockwise from the top */
export function sunDisc(cx = 100, cy = 100, r = 54, steps = 72): Point[] {
  return Array.from({ length: steps }, (_, i) => {
    const a = i / steps * Math.PI * 2 - Math.PI / 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  });
}

/** Outer silhouette of the A, clockwise from the apex */
export const aOutline: Point[] = [
[124, 44],
[136, 44],
[160, 150],
[142, 150],
[136, 124],
[124, 124],
[118, 150],
[100, 150]];


/** The triangular counter (the hole above the crossbar) */
export const aCounter: Point[] = [
[130, 70],
[137, 106],
[123, 106]];


export function toPath(points: Point[]) {
  return `M${points.map(([x, y]) => `${x} ${y}`).join(' L')} Z`;
}