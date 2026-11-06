import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { dressCodeLooks } from '../data/dressCode';
import { RevealHeading } from './RevealHeading';
import { useLanguage } from '../contexts/LanguageContext';

const ease = [0.23, 1, 0.32, 1] as const;

export function DressCode() {
  const reduceMotion = useReducedMotion();
  const { t, lang } = useLanguage();

  return (
    <section id="dress-code" aria-labelledby="dress-code-title" className="bg-night text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <RevealHeading
            key={lang}
            id="dress-code-title"
            className="font-display text-5xl leading-[1.05] md:text-6xl"
            lines={[
            'Dress code',
            <span className="italic text-blush">{t({ en: 'All black', id: 'Serba hitam' })}</span>]
            } />
          
          <p className="max-w-md text-lg leading-relaxed text-ivory/70 md:justify-self-end">
            {t({
              en: 'We kindly ask all our guests to wear black, in whatever style you feel comfortable. A few ideas below for inspiration.',
              id: 'Kami mengundang seluruh tamu untuk mengenakan busana hitam, dengan gaya apa pun yang membuat Anda nyaman. Berikut beberapa inspirasi.'
            })}
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6" aria-label={t({ en: 'Outfit inspiration', id: 'Inspirasi busana' })}>
          {dressCodeLooks.map((look, i) =>
          <li key={look.image} className={i % 2 === 1 ? 'mt-8 md:mt-12' : ''}>
              <motion.div
              className="overflow-hidden rounded-xl bg-oxblood"
              initial={reduceMotion ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.3, delay: i * 0.06, ease }}>
              
                <motion.img
                src={look.image}
                alt={look.alt}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
                initial={reduceMotion ? false : { scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.3, delay: i * 0.06, ease }} />
              
              </motion.div>
            </li>
          )}
        </ul>

      </div>
    </section>);

}