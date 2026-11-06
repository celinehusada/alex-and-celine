import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWishes } from '../../contexts/WishesContext';
import { useLanguage } from '../../contexts/LanguageContext';

const PREVIEW_COUNT = 6;

export function WishesWall() {
  const { wishes } = useWishes();
  const [showAll, setShowAll] = useState(false);
  const { t, lang } = useLanguage();
  const visible = showAll ? wishes : wishes.slice(0, PREVIEW_COUNT);

  return (
    <div id="wishes" className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-24 md:px-10 md:pb-32">
      <div className="grid gap-6 border-t border-ivory/15 pt-16 md:grid-cols-2 md:items-end">
        <h3 className="font-display text-4xl leading-tight md:text-5xl">
          {t({ en: 'Wishes from our guests', id: 'Ucapan dari para tamu' })}
        </h3>
        <p className="max-w-md text-ivory/70 md:justify-self-end">
          {t({
            en: 'Thank you for all the kind words. You can leave a message with your RSVP.',
            id: 'Terima kasih atas semua ucapan hangatnya. Anda dapat meninggalkan pesan saat mengisi RSVP.'
          })}
        </p>
      </div>

      <ul className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
        <AnimatePresence initial={false}>
          {visible.map((wish) =>
          <motion.li
            key={wish.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className={`mb-5 break-inside-avoid rounded-xl p-6 ${
            wish.isNew ? 'bg-blush text-oxblood' : 'bg-burgundy-deep text-ivory'}`
            }>
            
              <p className="font-display text-xl italic leading-snug">“{wish.message}”</p>
              <p className={`mt-4 flex items-center gap-2 text-sm ${wish.isNew ? 'text-burgundy' : 'text-blush'}`}>
                — {wish.name}
                {wish.isNew && <span className="rounded-full bg-burgundy/10 px-2 py-0.5 text-xs">{t({ en: 'Just now', id: 'Baru saja' })}</span>}
              </p>
            </motion.li>
          )}
        </AnimatePresence>
      </ul>

      {wishes.length > PREVIEW_COUNT &&
      <button
        type="button"
        onClick={() => setShowAll((v) => !v)}
        className="mt-4 whitespace-nowrap rounded-full border border-ivory/30 px-6 py-3 text-sm transition-colors duration-150 hover:bg-ivory hover:text-burgundy">
        
          {showAll ?
        t({ en: 'Show fewer', id: 'Tampilkan lebih sedikit' }) :
        lang === 'id' ?
        `Lihat semua ${wishes.length} ucapan` :
        `See all ${wishes.length} wishes`}
        </button>
      }
    </div>);

}