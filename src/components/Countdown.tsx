import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ceremonyStart } from '../data/events';
import { useCountdown } from '../hooks/useCountdown';
import { useLanguage } from '../contexts/LanguageContext';

export function Countdown() {
  const { days, hours, minutes, seconds, done } = useCountdown(ceremonyStart);
  const reduceMotion = useReducedMotion();
  const { t, lang } = useLanguage();

  if (done) {
    return (
      <p className="font-display text-3xl italic text-blush">
        {t({ en: 'Today’s the day.', id: 'Hari ini harinya.' })}
      </p>);

  }

  const units = [
  { label: t({ en: 'days', id: 'hari' }), value: String(days) },
  { label: t({ en: 'hours', id: 'jam' }), value: String(hours).padStart(2, '0') },
  { label: t({ en: 'min', id: 'menit' }), value: String(minutes).padStart(2, '0') },
  { label: t({ en: 'sec', id: 'detik' }), value: String(seconds).padStart(2, '0') }];


  const aria =
  lang === 'id' ?
  `${days} hari, ${hours} jam, dan ${minutes} menit menuju pemberkatan` :
  `${days} days, ${hours} hours and ${minutes} minutes until the ceremony`;

  return (
    <div role="timer" aria-label={aria}>
      <div className="flex items-end gap-5 md:gap-7" aria-hidden="true">
        {units.map((u) =>
        <div key={u.label} className="flex flex-col items-center">
            <span className="relative block h-[1.1em] overflow-hidden font-display text-4xl leading-[1.1] tabular-nums text-ivory">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                key={u.value}
                className="block"
                initial={reduceMotion ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { y: '100%', opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}>
                
                  {u.value}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="mt-1 text-xs text-ivory/55">{u.label}</span>
          </div>
        )}
      </div>
    </div>);

}