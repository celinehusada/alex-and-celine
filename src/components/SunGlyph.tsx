import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SunGlyphProps {
  className?: string;
  spin?: boolean;
}

export function SunGlyph({ className = '', spin = true }: SunGlyphProps) {
  const reduceMotion = useReducedMotion();
  const rays = Array.from({ length: 24 }, (_, i) => i * 360 / 24);

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <motion.g
        style={{ transformOrigin: '100px 100px' }}
        animate={spin && !reduceMotion ? { rotate: 360 } : undefined}
        transition={{ duration: 120, ease: 'linear', repeat: Infinity }}>
        
        {rays.map((angle, i) =>
        <line
          key={angle}
          x1="100"
          y1={i % 2 === 0 ? 14 : 22}
          x2="100"
          y2="34"
          stroke="currentColor"
          strokeOpacity={i % 2 === 0 ? 0.7 : 0.4}
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${angle} 100 100)`} />

        )}
      </motion.g>
      <circle cx="100" cy="100" r="54" fill="currentColor" />
    </svg>);

}