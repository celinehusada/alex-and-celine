import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRightIcon, ChevronDownIcon } from 'lucide-react';
import { SunAGlyph } from './SunAGlyph';
import { MoonGlyph } from './MoonGlyph';
import { Countdown } from './Countdown';
import { replyBy, weddingDate } from '../data/events';
import { useLanguage } from '../contexts/LanguageContext';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { couple } from '../data/couple';
import { PersonDetails } from './PersonDetails';

// Mobile: glyphs centred and stacked; desktop: side by side
const glyphBox =
'absolute left-1/2 top-[42%] -ml-14 -mt-14 h-28 w-28 md:top-[22%] md:-ml-32 md:mt-0 md:h-64 md:w-64';

/**
 * Scroll-driven: the sun (left / top) and moon (right / bottom) travel together, the sun reshapes
 * into an "A" that nestles into the moon's "C" — all within the first half of the pinned scroll,
 * so the finished monogram stays on screen for a while before the next section arrives.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const sunX = useTransform(p, [0, 0.35], isDesktop ? ['-25vw', '0vw'] : ['0vw', '0vw']);
  const moonX = useTransform(p, [0, 0.35], isDesktop ? ['25vw', '0vw'] : ['0vw', '0vw']);
  const sunY = useTransform(p, [0, 0.35], isDesktop ? ['0vh', '0vh'] : ['-16vh', '0vh']);
  const moonY = useTransform(p, [0, 0.35], isDesktop ? ['0vh', '0vh'] : ['16vh', '0vh']);
  const moonRotate = useTransform(p, [0, 0.35], [-40, 0]);
  const morph = useTransform(p, [0.22, 0.48], [0, 1]);
  // Once joined, nudge the pair left so the finished monogram sits centred
  const pairShift = useTransform(p, [0.3, 0.48], ['0%', '-10%']);
  const ampOpacity = useTransform(p, [0.08, 0.25], [1, 0]);
  const revealOpacity = useTransform(p, [0.46, 0.58], [0, 1]);
  const revealY = useTransform(p, [0.46, 0.58], [12, 0]);
  const hintOpacity = useTransform(p, [0, 0.05], [1, 0]);
  // One sky: day (olive) → dusk (burgundy) → night (oxblood) as they meet
  const skyColor = useTransform(p, [0, 0.22, 0.45], ['#4F5A33', '#6B1610', '#2E0E0B']);

  return (
    <>
      <section ref={ref} id="top" className="relative h-[260svh]">
        <h1 className="sr-only">Alex &amp; Celine are getting married</h1>
        <div className="sticky top-0 grid h-[100svh] grid-cols-2 overflow-hidden">
          <motion.div style={{ backgroundColor: skyColor }} className="absolute inset-0" aria-hidden="true" />
          <div className="relative flex flex-col justify-end px-5 pb-12 text-ivory md:px-12 md:pb-16">
            <p className="font-display text-5xl leading-none md:text-8xl lg:text-9xl" aria-hidden="true">
              Alex
            </p>
            <PersonDetails person={couple.alex} />
          </div>
          <div className="relative flex flex-col items-end justify-end px-5 pb-12 text-right text-ivory md:px-12 md:pb-16">
            <p className="font-display text-5xl leading-none md:text-8xl lg:text-9xl" aria-hidden="true">
              Celine
            </p>
            <PersonDetails person={couple.celine} align="right" />
          </div>

          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <motion.div style={{ x: sunX, y: sunY }} className={glyphBox}>
              <motion.div style={{ x: pairShift }} className="h-full w-full">
                <SunAGlyph progress={morph} className="h-full w-full text-ivory" />
              </motion.div>
            </motion.div>
            <motion.div style={{ x: moonX, y: moonY }} className={glyphBox}>
              <motion.div style={{ x: pairShift }} className="h-full w-full">
                <motion.div style={{ rotate: moonRotate }} className="h-full w-full">
                  <MoonGlyph className="h-full w-full text-blush" stars={false} />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ opacity: ampOpacity }}
              className="absolute left-1/2 top-[62%] -ml-10 hidden h-20 w-20 items-center justify-center rounded-full bg-ivory font-display text-4xl italic text-burgundy md:flex">
              
              &amp;
            </motion.div>

            <motion.div
              style={{ opacity: revealOpacity, y: revealY }}
              className="absolute inset-x-0 top-[54%] px-6 text-center text-ivory md:top-[calc(22%+16.5rem)]">
              
              <p className="font-display text-[1.75rem] italic leading-tight md:text-4xl xl:text-[2.75rem]">
                are getting married
              </p>
              <p className="mt-2 text-sm text-ivory/75">{t(weddingDate)}</p>
            </motion.div>

            <motion.div
              style={{ opacity: hintOpacity }}
              className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center text-xs text-ivory/70">
              
              Scroll
              <ChevronDownIcon className="mt-1 h-4 w-4" />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="border-b border-ivory/10 bg-oxblood text-ivory">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-3 md:items-center md:px-10">
          <div>
            <p className="font-display text-2xl">{t(weddingDate)}</p>
            <p className="mt-1 text-sm text-ivory/60">The Ritz-Carlton · Nusa Dua, Bali</p>
          </div>
          <div className="md:justify-self-center">
            <Countdown />
          </div>
          <a
            href="#rsvp"
            className="group inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-blush md:justify-self-end">
            
            Kindly reply by {t(replyBy).replace(' 2027', '')}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </>);

}