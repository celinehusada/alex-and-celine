declare module 'flubber' {
  type Shape = string | [number, number][];
  export function interpolate(
  fromShape: Shape,
  toShape: Shape,
  options?: {maxSegmentLength?: number;string?: boolean;})
  : (t: number) => string;
}