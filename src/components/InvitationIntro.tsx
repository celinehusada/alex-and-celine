import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { PlaneIcon } from 'lucide-react';
import { Monogram } from './Monogram';
import { FruitSketch } from './FruitSketch';
import { boardingPass } from '../data/boardingPass';
import { weddingDate } from '../data/events';
import { useLanguage } from '../contexts/LanguageContext';
import { useMediaQuery } from '../hooks/useMediaQuery';

const ease = [0.23, 1, 0.32, 1] as const;
const TEAR_THRESHOLD = 70;
// Decorative barcode bar widths
const bars = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 2, 3, 1];

export function InvitationIntro({ onDone }: {onDone: () => void;}) {
  const [torn, setTorn] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const reduceMotion = useReducedMotion();
  const wide = useMediaQuery('(min-width: 768px)');
  const { t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Hand the page back immediately — never let the fading overlay swallow clicks or scrolling
  const close = () => {
    if (leaving) return;
    setLeaving(true);
    document.body.style.overflow = '';
    onDone();
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const pulled = wide ? info.offset.x : info.offset.y;
    if (pulled > TEAR_THRESHOLD) setTorn(true);
  };

  // Stub tears away to the right on desktop, downward on mobile
  const tornPose = wide ?
  { x: 180, y: 80, rotate: 16, opacity: 0 } :
  { x: 40, y: 200, rotate: 10, opacity: 0 };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Alex & Celine"
      className={`fixed inset-0 z-[60] overflow-y-auto overflow-x-hidden bg-night text-ink ${
      leaving ? 'pointer-events-none' : ''}`
      }
      exit={{ opacity: 0, transitionEnd: { display: 'none' } }}
      transition={{ duration: 0.3, ease }}>
      
      <motion.div
        className="flex min-h-full flex-col items-center justify-center px-5 py-16"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease }}>
        
        <div className="flex w-[min(92vw,360px)] flex-col drop-shadow-[0_40px_50px_rgba(0,0,0,0.55)] md:w-[min(92vw,760px)] md:flex-row">
          {/* main pass */}
          <div className="relative flex-1 rounded-t-xl bg-ivory px-6 py-6 md:rounded-l-xl md:rounded-tr-none md:px-8 md:py-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Monogram className="h-9 w-9" />
                <span className="font-display text-lg leading-none">Alex &amp; Celine</span>
              </div>
              <span className="text-xs text-burgundy/70">Boarding pass</span>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
              <div>
                <p className="font-display text-5xl leading-none text-burgundy md:text-6xl">{boardingPass.from.code}</p>
                <p className="mt-1 text-xs text-ink/55">{boardingPass.from.city}</p>
              </div>
              <div className="flex flex-1 items-center gap-2 text-olive" aria-hidden="true">
                <span className="h-px flex-1 border-t border-dashed border-olive/40" />
                <PlaneIcon className="h-5 w-5 rotate-45" />
                <span className="h-px flex-1 border-t border-dashed border-olive/40" />
              </div>
              <div className="text-right">
                <p className="font-display text-5xl leading-none text-burgundy md:text-6xl">{boardingPass.to.code}</p>
                <p className="mt-1 text-xs text-ink/55">{boardingPass.to.city}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-5 border-t border-ink/10 pt-5 md:flex-row md:items-end md:justify-between">
              <dl className="flex flex-col gap-4 sm:flex-row sm:gap-10">
                {boardingPass.details.map((d) =>
                <div key={d.label}>
                    <dt className="text-xs text-ink/45">{d.label}</dt>
                    <dd className="mt-0.5 font-display text-xl leading-tight">{d.value}</dd>
                  </div>
                )}
              </dl>
              <div className="flex h-9 shrink-0 items-stretch gap-[2px]" aria-hidden="true">
                {bars.map((w, i) =>
                <span key={i} className="bg-ink/80" style={{ width: w }} />
                )}
              </div>
            </div>
          </div>

          {/* perforation */}
          <div className="relative h-0 md:h-auto md:w-0" aria-hidden="true">
            <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-night md:-left-3 md:-top-3" />
            <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-night md:-bottom-3 md:-left-3 md:right-auto md:top-auto" />
          </div>

          {/* tear-off stub */}
          <motion.div
            drag={torn ? false : wide ? 'x' : 'y'}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={{ left: 0, top: 0, right: 0.6, bottom: 0.6 }}
            onDragEnd={onDragEnd}
            animate={torn ? tornPose : { x: 0, y: 0, rotate: 0, opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease }}
            className={`relative flex flex-col justify-between rounded-b-xl border-t-2 border-dashed border-ink/15 bg-ivory px-6 py-5 md:w-44 md:rounded-r-xl md:rounded-bl-none md:border-l-2 md:border-t-0 md:py-7 ${
            torn ? 'pointer-events-none' : 'cursor-grab active:cursor-grabbing'}`
            }
            style={{ touchAction: 'none' }}
            aria-hidden={torn}>
            
            <div className="flex items-start justify-between md:block">
              <div>
                <p className="text-xs text-ink/45">Flight</p>
                <p className="font-display text-xl">{boardingPass.flight}</p>
              </div>
              <div className="text-right md:mt-4 md:text-left">
                <p className="text-xs text-ink/45">Route</p>
                <p className="font-display text-xl">
                  {boardingPass.from.code} → {boardingPass.to.code}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between md:mt-6">
              <p className="text-xs text-burgundy/70">{wide ? 'Pull to tear →' : 'Pull down to tear ↓'}</p>
              <FruitSketch kind="mango" className="h-8 w-8 text-olive/50" />
            </div>
          </motion.div>
        </div>

        <div className="mt-10 flex min-h-[140px] flex-col items-center text-center">
          <AnimatePresence mode="wait">
            {torn ?
            <motion.div
              key="invite"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease, delay: reduceMotion ? 0 : 0.15 }}
              className="flex flex-col items-center">
              
                <p className="max-w-md text-lg leading-relaxed text-ivory/80">
                  Alex and Celine invite you to celebrate their wedding on {t(weddingDate)} at The Ritz-Carlton, Nusa
                  Dua, Bali.
                </p>
                <button
                type="button"
                onClick={close}
                autoFocus
                className="mt-7 whitespace-nowrap rounded-full bg-blush px-7 py-3 text-sm font-medium text-oxblood transition-colors duration-150 hover:bg-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush focus-visible:ring-offset-2 focus-visible:ring-offset-night">
                
                  Open the invitation
                </button>
              </motion.div> :

            <motion.div key="hint" exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex flex-col items-center">
                <p className="font-display text-lg italic text-blush/80">Your boarding pass to Bali</p>
                <button
                type="button"
                onClick={() => setTorn(true)}
                className="mt-5 whitespace-nowrap rounded-full border border-ivory/25 px-6 py-2.5 text-sm text-ivory transition-colors duration-150 hover:border-blush hover:text-blush focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush">
                
                  Tear the stub
                </button>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </motion.div>

      <button
        type="button"
        onClick={close}
        className="absolute right-6 top-6 text-sm text-ivory/45 underline underline-offset-4 hover:text-ivory md:right-10 md:top-10">
        
        Skip
      </button>
    </motion.div>);

}