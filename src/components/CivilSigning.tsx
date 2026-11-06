import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { civilSigningPhotos } from '../data/civilSigning';
import { Lightbox } from './Lightbox';
import { useLanguage } from '../contexts/LanguageContext';

const ease = [0.23, 1, 0.32, 1] as const;

export function CivilSigning() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section id="civil" aria-labelledby="civil-title" className="bg-sage text-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between md:gap-12 md:px-10 md:py-16">
        <div className="max-w-xl">
          <h2 id="civil-title" className="font-display text-3xl leading-tight md:text-4xl">
            {t({ en: 'Our civil signing', id: 'Pencatatan sipil kami' })}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-ink/70">
            {t({
              en: 'We’ve already had our civil signing in Hong Kong — and now we’d love to celebrate with you in Bali!',
              id: 'Kami telah melangsungkan pencatatan sipil di Hong Kong — dan kini kami ingin merayakannya bersama kalian di Bali!'
            })}
          </p>
        </div>

        <ul className="flex shrink-0 gap-3" aria-label={t({ en: 'Civil signing photos', id: 'Foto pencatatan sipil' })}>
          {civilSigningPhotos.map((photo, i) =>
          <li key={photo.src}>
              <motion.button
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={t(photo.caption)}
              className="group block overflow-hidden rounded-lg bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2 focus-visible:ring-offset-sage"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.05, ease }}>
              
                <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-24 w-24 object-cover transition-transform duration-300 ease-out group-hover:scale-105 md:h-28 md:w-28" />
              
              </motion.button>
            </li>
          )}
        </ul>
      </div>

      <AnimatePresence>
        {lightbox !== null &&
        <Lightbox
          city={t({ en: 'Civil signing, Hong Kong', id: 'Pencatatan sipil, Hong Kong' })}
          photos={civilSigningPhotos}
          index={lightbox}
          onChange={setLightbox}
          onClose={() => setLightbox(null)} />

        }
      </AnimatePresence>
    </section>);

}