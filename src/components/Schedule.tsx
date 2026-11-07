import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon } from 'lucide-react';
import { events, weddingDate } from '../data/events';
import { EventPhaseIcon } from './EventPhaseIcon';
import { RevealHeading } from './RevealHeading';
import { DayNightTracker } from './DayNightTracker';
import { useLanguage } from '../contexts/LanguageContext';
import { formatTime } from '../utils/time';
import type { EventId } from '../types/wedding';

const tones: Record<EventId, {band: string;muted: string;pill: string;}> = {
  welcome: { band: 'bg-night text-ivory', muted: 'text-ivory/60', pill: 'border-ivory/30' },
  // Day → night: greens for the ceremony (his side), deepening reds into the night (hers)
  tea: { band: 'bg-olive-deep text-ivory', muted: 'text-ivory/65', pill: 'border-ivory/30' },
  matrimony: { band: 'bg-olive text-ivory', muted: 'text-ivory/70', pill: 'border-ivory/30' },
  photos: { band: 'bg-sage text-ink', muted: 'text-ink/65', pill: 'border-ink/25' },
  cocktails: { band: 'bg-burgundy text-ivory', muted: 'text-ivory/70', pill: 'border-ivory/30' },
  reception: { band: 'bg-burgundy-deep text-ivory', muted: 'text-ivory/70', pill: 'border-ivory/30' },
  afterparty: { band: 'bg-oxblood text-ivory', muted: 'text-ivory/65', pill: 'border-ivory/30' }
};

const ease = [0.23, 1, 0.32, 1] as const;

export function Schedule() {
  const bandsRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLanguage();
  const welcome = events.find((e) => e.dayLabel);
  const dayEvents = events.filter((e) => !e.dayLabel);

  return (
    <section id="schedule" aria-labelledby="schedule-title">
      {welcome && welcome.dayLabel &&
      <div className="bg-night text-ivory">
          <motion.div
          className="mx-auto grid max-w-7xl gap-4 px-6 py-12 md:grid-cols-[240px_1fr_auto] md:items-center md:gap-10 md:px-10 md:py-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 0.3, ease }}>
          
            <p className="font-display text-xl italic text-blush md:col-span-3">
              {t({ en: 'The night before', id: 'Malam sebelumnya' })} · {t(welcome.dayLabel)}
            </p>
            <div className="flex items-center gap-3">
              <EventPhaseIcon id={welcome.id} className="h-5 w-5 shrink-0" />
              <p className="whitespace-nowrap font-display text-4xl tabular-nums md:text-5xl">
                {formatTime(welcome.time, lang)}
              </p>
            </div>
            <div>
              <h3 className="font-display text-3xl md:text-4xl">{t(welcome.name)}</h3>
              <p className="mt-1 text-sm italic text-blush/90">
                {t({ en: 'Casual Welcome Dinner', id: 'Casual Welcome Dinner' })}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-ivory/60">
                <MapPinIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t(welcome.venue)}
              </p>
              <p className="mt-1 text-sm text-ivory/60">
                {t({ en: 'Dress code: White for Beach', id: 'Dress code: White for Beach' })}
              </p>
            </div>
            <span className="justify-self-start whitespace-nowrap rounded-full border border-ivory/30 px-4 py-1.5 text-sm md:justify-self-end">
              {t(welcome.audience)}
            </span>
          </motion.div>
        </div>
      }
      <div className="bg-oxblood text-ivory">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 pb-16 pt-24 md:grid-cols-2 md:items-end md:px-10 md:pt-32">
          <div>
            <p className="text-sm text-ivory/60">{t(weddingDate)}</p>
            <RevealHeading
              key={lang}
              id="schedule-title"
              className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl"
              lines={[t({ en: 'Wedding Day', id: 'Hari Pernikahan' })]} />
            
          </div>
          <p className="max-w-md text-lg leading-relaxed text-ivory/70 md:justify-self-end">
            {t({
              en: 'All wedding-day events take place at The Ritz-Carlton, Bali in Nusa Dua.',
              id: 'Seluruh acara di hari pernikahan berlangsung di The Ritz-Carlton, Bali, Nusa Dua.'
            })}
          </p>
        </div>
      </div>

      <div ref={bandsRef} className="relative">
        <ol>
          {dayEvents.map((event) => {
            const tone = tones[event.id];
            return (
              <li key={event.id} className={tone.band}>
                <motion.div
                  className="mx-auto grid max-w-7xl gap-4 px-6 py-10 md:grid-cols-[240px_1fr_auto] md:items-center md:gap-10 md:px-10 md:py-14"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                  transition={{ duration: 0.3, ease }}>
                  
                  <div>
                    <div className="flex items-center gap-3">
                      <EventPhaseIcon id={event.id} className="h-5 w-5 shrink-0" />
                      <p className="whitespace-nowrap font-display text-4xl tabular-nums md:text-5xl">
                        {formatTime(event.time, lang)}
                      </p>
                    </div>
                    {event.endTime &&
                    <p className={`mt-1 pl-8 text-sm ${tone.muted}`}>
                        {t({ en: 'until', id: 'hingga' })} {formatTime(event.endTime, lang)}
                      </p>
                    }
                  </div>
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl">{t(event.name)}</h3>
                    <p className={`mt-2 flex items-center gap-2 text-sm ${tone.muted}`}>
                      <MapPinIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {t(event.venue)}
                    </p>
                    {event.note && <p className={`mt-1 text-sm ${tone.muted}`}>{t(event.note)}</p>}
                  </div>
                  <span
                    className={`justify-self-start whitespace-nowrap rounded-full border px-4 py-1.5 text-sm md:justify-self-end ${tone.pill}`}>
                    
                    {t(event.audience)}
                  </span>
                </motion.div>
              </li>);

          })}
        </ol>
        <DayNightTracker target={bandsRef} />
      </div>
    </section>);

}