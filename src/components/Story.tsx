import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import { milestones } from '../data/story';
import { FruitSketch } from './FruitSketch';
import { RevealHeading } from './RevealHeading';
import { useLanguage } from '../contexts/LanguageContext';

const ease = [0.23, 1, 0.32, 1] as const;

export function Story() {
  const [open, setOpen] = useState<string[]>([]);
  const { t, lang } = useLanguage();

  const toggle = (key: string) =>
  setOpen((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);

  return (
    <section id="story" className="bg-oxblood text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <RevealHeading
            key={lang}
            className="font-display text-5xl leading-[1.05] md:text-6xl"
            lines={[t({ en: 'Our story,', id: 'Kisah kami,' }), '2018 – 2027']} />
          
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-ivory/70">
            {t({
              en: 'A few moments from the years since we met. Tap a year to read more.',
              id: 'Beberapa momen sejak kami bertemu. Ketuk tahun untuk membaca kisahnya.'
            })}
          </p>
        </div>

        <ol className="border-b border-ivory/15">
          {milestones.map((m) => {
            const key = m.year;
            const isOpen = open.includes(key);
            const panelId = `story-${m.year}`;
            return (
              <li key={key} className="border-t border-ivory/15">
                <button
                  type="button"
                  onClick={() => toggle(key)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group grid w-full grid-cols-[72px_1fr_auto] items-center gap-6 py-6 text-left md:grid-cols-[110px_1fr_auto]">
                  
                  <span className="font-display text-3xl tabular-nums text-sage md:text-4xl">{m.year}</span>
                  <span className="font-display text-2xl transition-colors duration-150 group-hover:text-blush md:text-3xl">
                    {t(m.title)}
                  </span>
                  <PlusIcon
                    className={`h-5 w-5 text-ivory/50 transition-transform duration-200 ease-out ${isOpen ? 'rotate-45' : ''}`}
                    aria-hidden="true" />
                  
                </button>
                <AnimatePresence initial={false}>
                  {isOpen &&
                  <motion.div
                    id={panelId}
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease }}
                    className="overflow-hidden">
                    
                      <div className="flex items-start gap-6 pb-7 pl-[96px] md:pl-[134px]">
                        <p className="max-w-lg flex-1 leading-relaxed text-ivory/70">{t(m.body)}</p>
                        <FruitSketch kind={m.fruit} draw className="h-14 w-14 shrink-0 text-sage md:h-16 md:w-16" />
                      </div>
                    </motion.div>
                  }
                </AnimatePresence>
              </li>);

          })}
        </ol>
      </div>
    </section>);

}