import React from 'react';
import { useGuest } from '../../contexts/GuestContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { replyBy } from '../../data/events';
import { GuestLookup } from './GuestLookup';
import { RsvpForm } from './RsvpForm';
import { WishesWall } from './WishesWall';
import { RevealHeading } from '../RevealHeading';

export function RsvpSection() {
  const { guest } = useGuest();
  const { t } = useLanguage();

  return (
    <section id="rsvp" className="bg-burgundy text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <RevealHeading className="font-display text-5xl leading-[1.05] md:text-6xl" lines={['RSVP']} />
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-ivory/75">
            {t({ en: 'Kindly reply by', id: 'Mohon konfirmasi kehadiran sebelum' })}{' '}
            <span className="text-ivory">{t(replyBy)}</span>.{' '}
            {t({
              en: 'Please enter the code from your invitation to view your details.',
              id: 'Masukkan kode dari undangan Anda untuk melihat detailnya.'
            })}
          </p>
          <div className="mt-8 max-w-sm space-y-4 border-t border-ivory/15 pt-6 text-sm leading-relaxed text-ivory/65">
            <p>
              {t({
                en: 'As this is an intimate celebration, we are only able to accommodate the guests named on your invitation. Thank you for understanding.',
                id: 'Karena acara ini bersifat intim, kami hanya dapat menerima tamu yang namanya tercantum di undangan. Terima kasih atas pengertiannya.'
              })}
            </p>
            <p>
              {t({
                en: 'The tea ceremony is for family only. The chapel seats 80 guests, so seating for the Holy Matrimony is on a first-come, first-served basis.',
                id: 'Upacara minum teh khusus untuk keluarga. Kapel hanya dapat menampung 80 tamu, sehingga tempat duduk untuk Pemberkatan Pernikahan berlaku siapa cepat, dia dapat.'
              })}
            </p>
          </div>
        </div>

        <div>{guest ? <RsvpForm key={guest.code} guest={guest} /> : <GuestLookup />}</div>
      </div>

      <WishesWall />
    </section>);

}