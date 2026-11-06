import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon } from 'lucide-react';
import { useGuest } from '../../contexts/GuestContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { hotels } from '../../data/hotels';
import { AssignedStay } from './AssignedStay';
import { RevealHeading } from '../RevealHeading';

/** Only rendered once a guest has found their invitation — their stay is personal to them. */
export function Stay() {
  const { guest, stayChoice } = useGuest();
  const { t, lang } = useLanguage();
  const hotel = guest ? hotels.find((h) => h.id === guest.hotel) : undefined;
  if (!guest || !hotel) return null;

  const own = stayChoice === 'own';
  const heading = own ?
  [t({ en: 'Your stay', id: 'Akomodasi Anda' })] :
  lang === 'id' ?
  ['Akomodasi Anda', 'di Nusa Dua'] :
  ['Your stay in', 'Nusa Dua'];

  return (
    <motion.section
      id="stay"
      className="bg-oxblood text-ivory"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
      
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <RevealHeading
            key={`${own ? 'own' : 'provided'}-${lang}`}
            className="font-display text-5xl leading-[1.05] md:text-6xl"
            lines={heading} />
          
          <p className="max-w-md text-lg leading-relaxed text-ivory/70 md:justify-self-end">
            {own ?
            t({
              en: 'Thank you for letting us know you’ll be arranging your own accommodation. As all events are at The Ritz-Carlton, we recommend staying in Nusa Dua.',
              id: 'Terima kasih telah mengabari bahwa Anda akan mengatur akomodasi sendiri. Karena seluruh acara berlangsung di The Ritz-Carlton, kami sarankan menginap di area Nusa Dua.'
            }) :
            t({
              en: 'We have reserved a room for you, so there is nothing you need to book. Your details are below.',
              id: 'Kami telah menyiapkan kamar untuk Anda, jadi tidak perlu memesan apa pun. Berikut detailnya.'
            })}
          </p>
        </div>

        {own ?
        <div className="mt-14 grid gap-10 border-t border-ivory/15 pt-10 md:grid-cols-2">
            <div>
              <p className="text-sm text-ivory/55">{t({ en: 'All celebrations at', id: 'Seluruh acara di' })}</p>
              <h3 className="mt-2 font-display text-4xl md:text-5xl">The Ritz-Carlton, Bali</h3>
              <p className="mt-3 flex items-center gap-2 text-ivory/70">
                <MapPinIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                Sawangan, Nusa Dua
              </p>
            </div>
            <p className="max-w-sm leading-relaxed text-ivory/70 md:justify-self-end">
              {t({
              en: 'Changed your mind? Your reserved room is held until 1 June —',
              id: 'Berubah pikiran? Kamar Anda kami tahan hingga 1 Juni —'
            })}{' '}
              <a href="#rsvp" className="text-blush underline underline-offset-4">
                {t({ en: 'edit your RSVP', id: 'ubah RSVP Anda' })}
              </a>{' '}
              {t({ en: 'and choose “Use my reserved room”.', id: 'dan pilih “Gunakan kamar yang disiapkan”.' })}
            </p>
          </div> :

        <AssignedStay guest={guest} hotel={hotel} />
        }
      </div>
    </motion.section>);

}