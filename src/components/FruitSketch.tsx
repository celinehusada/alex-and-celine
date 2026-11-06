import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { SketchKind } from '../types/wedding';

const circle = (cx: number, cy: number, r: number) =>
`M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`;

const radial = (count: number, cx: number, cy: number, r1: number, r2: number) =>
Array.from({ length: count }, (_, i) => {
  const a = i / count * Math.PI * 2;
  return `M ${cx + Math.cos(a) * r1} ${cy + Math.sin(a) * r1} L ${cx + Math.cos(a) * r2} ${cy + Math.sin(a) * r2}`;
});

const sketches: Record<SketchKind, string[]> = {
  // — food they cook and eat together —
  dumpling: [
  'M8 42 C14 22 50 22 56 42 C46 46 18 46 8 42 Z',
  'M22 30 L24 35',
  'M32 27 L32 33',
  'M42 30 L40 35'],

  noodles: [
  'M10 32 H54 C54 44 44 52 32 52 C20 52 10 44 10 32 Z',
  'M24 52 L26 56 H38 L40 52',
  'M30 30 L42 8',
  'M35 31 L49 10',
  'M16 32 C18 26 22 26 24 32',
  'M40 32 C42 26 46 26 48 32'],

  wok: [
  'M8 32 C10 44 22 48 32 48 C42 48 54 44 56 32 Z',
  'M56 33 L61 30',
  circle(24, 22, 2.5),
  circle(34, 15, 2.5),
  circle(42, 23, 2)],

  egg: [
  'M14 34 C10 22 22 12 32 16 C42 10 56 20 50 32 C56 44 42 54 32 48 C20 54 10 46 14 34 Z',
  circle(32, 32, 8)],

  bao: [
  'M10 46 C10 28 22 20 32 20 C42 20 54 28 54 46 Z',
  'M32 20 L32 26',
  'M26 22 L28 27',
  'M38 22 L36 27'],

  pot: [
  'M14 28 H50 V46 C50 50 46 52 42 52 H22 C18 52 14 50 14 46 Z',
  'M12 28 C16 21 48 21 52 28',
  'M14 34 H9',
  'M50 34 H55',
  'M26 15 C24 12 28 10 26 7',
  'M38 15 C36 12 40 10 38 7'],

  // — fruit —
  apple: [
  'M32 20 C26 14 12 16 12 32 C12 46 22 56 32 52 C42 56 52 46 52 32 C52 16 38 14 32 20 Z',
  'M32 20 C32 14 34 10 37 8',
  'M34 14 C38 8 46 9 46 9 C44 14 38 16 34 14 Z'],

  kiwi: [circle(32, 32, 22), circle(32, 32, 7), ...radial(12, 32, 32, 11, 15)],
  mandarin: [circle(32, 34, 20), ...radial(8, 32, 34, 3, 19), 'M32 14 C34 8 42 7 44 8 C42 13 36 15 32 14 Z'],
  grapes: [
  circle(24, 24, 6),
  circle(38, 24, 6),
  circle(31, 35, 6),
  circle(45, 35, 6),
  circle(24, 46, 6),
  circle(38, 46, 6),
  circle(31, 56, 5),
  'M31 18 C31 12 34 8 39 6'],

  pear: [
  'M32 14 C27 14 27 22 24 28 C18 34 16 42 20 48 C24 55 40 55 44 48 C48 42 46 34 40 28 C37 22 37 14 32 14 Z',
  'M32 14 C32 10 33 7 35 5'],

  cherries: [
  circle(22, 46, 7),
  circle(43, 48, 7),
  'M22 39 C24 26 30 18 36 12',
  'M43 41 C41 28 39 20 36 12',
  'M36 12 C40 6 48 6 50 7 C48 12 41 14 36 12 Z'],

  mango: [
  'M18 40 C12 28 22 14 36 14 C50 14 54 28 48 40 C42 52 24 52 18 40 Z',
  'M36 14 C36 10 38 7 41 6',
  'M38 10 C42 4 50 5 52 6 C50 11 43 12 38 10 Z'],

  strawberry: [
  'M32 56 C20 48 13 34 17 25 C21 19 43 19 47 25 C51 34 44 48 32 56 Z',
  'M21 22 L27 14 L32 20 L37 14 L43 22',
  'M26 32 L26.5 34',
  'M36 30 L36.5 32',
  'M31 40 L31.5 42',
  'M40 40 L40.5 42',
  'M24 42 L24.5 44'],

  lychee: [circle(32, 38, 18), circle(32, 38, 8), 'M32 20 C32 14 34 10 38 8', 'M35 12 C40 6 47 7 49 8 C47 13 40 14 35 12 Z'],
  watermelon: [
  'M8 26 A24 24 0 0 0 56 26 Z',
  'M13 26 A19 19 0 0 0 51 26',
  'M24 32 L25 35',
  'M32 34 L32 37',
  'M40 32 L39 35']

};

interface FruitSketchProps {
  kind: SketchKind;
  className?: string;
  /** Draw the lines in when mounted */
  draw?: boolean;
  /** Draw the lines in when scrolled into view */
  drawInView?: boolean;
  delay?: number;
}

export function FruitSketch({ kind, className = '', draw = false, drawInView = false, delay = 0 }: FruitSketchProps) {
  const reduceMotion = useReducedMotion();
  const animated = (draw || drawInView) && !reduceMotion;
  const ease = [0.23, 1, 0.32, 1] as const;

  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      {sketches[kind].map((d, i) => {
        const transition = { duration: 0.3, delay: delay + Math.min(i * 0.03, 0.3), ease };
        return (
          <motion.path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={animated ? { pathLength: 0 } : false}
            {...drawInView ?
            { whileInView: { pathLength: 1 }, viewport: { once: true, margin: '0px 0px -10% 0px' } } :
            { animate: { pathLength: 1 } }}
            transition={transition} />);


      })}
    </svg>);

}