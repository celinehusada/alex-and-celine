import React, { useId, useMemo } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { interpolate } from 'flubber';
import { aCounter, aOutline, sunDisc, toPath } from '../utils/sunShape';

interface SunAGlyphProps {
  /** 0 = a full sun, 1 = the sun reshaped into an "A" */
  progress: MotionValue<number>;
  className?: string;
}

const rays = Array.from({ length: 24 }, (_, i) => i * 360 / 24);
// Rays on the open (right) side stay with the A so it still reads as a sun; the rest set behind the moon
const keptRay = (angle: number) => angle >= 30 && angle <= 135;

export function SunAGlyph({ progress, className = '' }: SunAGlyphProps) {
  const maskId = `sun-a-${useId().replace(/:/g, '')}`;
  const morph = useMemo(() => interpolate(sunDisc(), aOutline, { maxSegmentLength: 3 }), []);
  const d = useTransform(progress, (v) => morph(Math.min(1, Math.max(0, v))));
  const counterOpacity = useTransform(progress, [0.75, 1], [0, 1]);
  const keptX = useTransform(progress, [0, 1], [0, 30]);
  const keptScale = useTransform(progress, [0, 1], [1, 0.85]);
  const fadingOpacity = useTransform(progress, [0, 0.6], [1, 0]);

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" overflow="visible">
      <defs>
        <mask id={maskId}>
          <rect x="-50" y="-50" width="300" height="300" fill="white" />
          <motion.path d={toPath(aCounter)} fill="black" style={{ opacity: counterOpacity }} />
        </mask>
      </defs>

      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <motion.g style={{ x: keptX, scale: keptScale, transformOrigin: '100px 100px' }}>
          {rays.filter(keptRay).map((angle, i) =>
          <line
            key={angle}
            x1="100"
            y1={i % 2 === 0 ? 14 : 22}
            x2="100"
            y2="34"
            strokeOpacity={i % 2 === 0 ? 0.7 : 0.4}
            transform={`rotate(${angle} 100 100)`} />

          )}
        </motion.g>
        <motion.g style={{ opacity: fadingOpacity }}>
          {rays.
          filter((a) => !keptRay(a)).
          map((angle, i) =>
          <line
            key={angle}
            x1="100"
            y1={i % 2 === 0 ? 14 : 22}
            x2="100"
            y2="34"
            strokeOpacity={i % 2 === 0 ? 0.7 : 0.4}
            transform={`rotate(${angle} 100 100)`} />

          )}
        </motion.g>
      </g>

      <motion.path d={d} fill="currentColor" mask={`url(#${maskId})`} />
    </svg>);

}