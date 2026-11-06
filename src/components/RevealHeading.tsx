import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface RevealHeadingProps {
  lines: React.ReactNode[];
  className?: string;
  as?: 'h2' | 'h3';
  id?: string;
}

/** Editorial heading: each line rises out of its own mask once the heading scrolls into view. */
export function RevealHeading({ lines, className = '', as = 'h2', id }: RevealHeadingProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  // Observe the heading itself — the hidden lines sit outside their masks, so they can't be observed directly
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const Tag = as;
  const shown = reduceMotion || inView;

  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((line, i) =>
      <span key={i} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <motion.span
          className="block"
          initial={reduceMotion ? false : { y: '110%' }}
          animate={shown ? { y: '0%' } : { y: '110%' }}
          transition={{ duration: 0.3, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}>
          
            {line}
          </motion.span>
        </span>
      )}
    </Tag>);

}