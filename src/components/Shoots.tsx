import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { galleries } from '../data/shoots';
import { RevealHeading } from './RevealHeading';
import { Lightbox } from './Lightbox';
import { coupleInstagram, hashtags } from '../data/couple';
import { useLanguage } from '../contexts/LanguageContext';

const ease = [0.23, 1, 0.32, 1] as const;

export function Shoots() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const gallery = galleries[active];
  const { t, lang } = useLanguage();

  const scrollRail = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * rail.clientWidth * 0.7, behavior: 'smooth' });
  };

  const selectCity = (i: number) => {
    setActive(i);
    railRef.current?.scrollTo({ left: 0 });
  };

  return (
    <section id="shoots" className="overflow-hidden bg-olive text-ivory">
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-32">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <RevealHeading
            key={lang}
            className="font-display text-5xl leading-[1.05] md:text-6xl"
            lines={lang === 'id' ? ['Galeri', 'Pre-Wedding'] : ['Pre-Wedding', 'Gallery']} />
          
          <p className="max-w-md text-lg leading-relaxed text-ivory/75 md:justify-self-end">
            {t({
              en: 'Hong Kong, London and Bali — three places that mean a lot to us. Tap a photo to view it larger.',
              id: 'Hong Kong, London, dan Bali — tiga tempat yang sangat berarti bagi kami. Ketuk foto untuk memperbesar.'
            })}
            <span className="mt-3 block text-base">
              {t({ en: 'More on', id: 'Lihat lebih banyak di' })}{' '}
              <a
                href={`https://instagram.com/${coupleInstagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory underline underline-offset-4 hover:text-blush">
                
                @{coupleInstagram}
              </a>
              <span className="text-ivory/75">
                {' '}
                · {t({ en: 'tag us with', id: 'tandai kami dengan' })} {hashtags.map((h) => `#${h}`).join(' ')}
              </span>
            </span>
          </p>
        </div>

        <div className="mt-14 flex items-end justify-between gap-6 border-b border-ivory/15">
          <div role="tablist" aria-label={t({ en: 'Photo galleries', id: 'Galeri foto' })} className="flex gap-6 md:gap-10">
            {galleries.map((g, i) => {
              const selected = i === active;
              return (
                <button
                  key={g.city}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="gallery-panel"
                  onClick={() => selectCity(i)}
                  className={`relative whitespace-nowrap pb-4 font-display text-2xl transition-colors duration-150 md:text-3xl ${
                  selected ? 'text-ivory' : 'text-ivory/50 hover:text-ivory/80'}`
                  }>
                  
                  {g.city}
                  {selected &&
                  <motion.span
                    layoutId="gallery-tab"
                    className="absolute inset-x-0 -bottom-px h-px bg-ivory"
                    transition={{ duration: 0.25, ease }} />

                  }
                </button>);

            })}
          </div>
          <div className="hidden gap-2 pb-4 md:flex">
            <button
              type="button"
              onClick={() => scrollRail(-1)}
              aria-label={t({ en: 'Scroll gallery left', id: 'Geser galeri ke kiri' })}
              className="rounded-full border border-ivory/25 p-2.5 transition-colors duration-150 hover:bg-ivory hover:text-olive">
              
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollRail(1)}
              aria-label={t({ en: 'Scroll gallery right', id: 'Geser galeri ke kanan' })}
              className="rounded-full border border-ivory/25 p-2.5 transition-colors duration-150 hover:bg-ivory hover:text-olive">
              
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={gallery.city}
          id="gallery-panel"
          role="tabpanel"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25, ease }}>
          
          <p className="mx-auto mt-6 max-w-7xl px-6 text-ivory/70 md:px-10">{t(gallery.blurb)}</p>
          <ul
            ref={railRef}
            className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-24 [scrollbar-width:none] md:gap-8 md:px-10 md:pb-32 xl:px-[calc((100vw-80rem)/2+2.5rem)] [&::-webkit-scrollbar]:hidden">
            
            {gallery.photos.map((photo, i) =>
            <li key={photo.src} className="shrink-0 snap-start">
                <motion.button
                type="button"
                onClick={() => setLightbox(i)}
                className="group block text-left focus-visible:outline-none"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06, ease }}>
                
                  <div
                  className={`overflow-hidden rounded-lg bg-olive-deep ring-ivory ring-offset-4 ring-offset-olive group-focus-visible:ring-2 ${
                  photo.orientation === 'portrait' ?
                  'aspect-[4/5] h-[360px] md:h-[520px]' :
                  'aspect-[3/2] h-[360px] md:h-[520px]'}`
                  }>
                  
                    <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
                  
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-6">
                    <span className="font-display text-xl italic">{t(photo.caption)}</span>
                    <span className="text-xs tabular-nums text-ivory/50">
                      {i + 1} / {gallery.photos.length}
                    </span>
                  </div>
                </motion.button>
              </li>
            )}
          </ul>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {lightbox !== null &&
        <Lightbox
          city={gallery.city}
          photos={gallery.photos}
          index={lightbox}
          onChange={setLightbox}
          onClose={() => setLightbox(null)} />

        }
      </AnimatePresence>
    </section>);

}