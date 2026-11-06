import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SunGlyph } from './SunGlyph';
import { MoonGlyph } from './MoonGlyph';

/** A sun that sets into a moon as guests scroll through the day's schedule. */
export function DayNightTracker({ target }: {target: React.RefObject<HTMLElement>;}) {
  const { scrollYProgress } = useScroll({ target, offset: ['start center', 'end center'] });
  const sunOpacity = useTransform(scrollYProgress, [0.42, 0.62], [1, 0]);
  const moonOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const sunScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.7]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const color = useTransform(scrollYProgress, [0.44, 0.5], ['#CDD0B6', '#F5F1E8']);
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-5 hidden w-12 min-[1440px]:block"
      aria-hidden="true">
      
      <div className="sticky top-[calc(50vh-1.5rem)] flex flex-col items-center gap-3">
        <motion.div style={{ color }} className="relative h-12 w-12">
          <motion.div style={{ opacity: sunOpacity, scale: sunScale, rotate }} className="absolute inset-0">
            <SunGlyph spin={false} className="h-full w-full" />
          </motion.div>
          <motion.div style={{ opacity: moonOpacity }} className="absolute inset-0">
            <MoonGlyph className="h-full w-full" />
          </motion.div>
        </motion.div>
        <motion.div style={{ backgroundColor: color, opacity: 0.25 }} className="relative h-24 w-px overflow-hidden">
          <motion.div style={{ height: fill, backgroundColor: color }} className="absolute inset-x-0 top-0" />
        </motion.div>
      </div>
    </div>);

}