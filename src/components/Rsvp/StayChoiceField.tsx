import React from 'react';
import { hotels } from '../../data/hotels';
import { useLanguage } from '../../contexts/LanguageContext';
import { getStayDates, nightsLabel, roomNames } from '../../utils/stay';
import type { Localized } from '../../types/i18n';
import type { Guest, StayChoice } from '../../types/wedding';

interface StayChoiceFieldProps {
  guest: Guest;
  value: StayChoice;
  onChange: (value: StayChoice) => void;
}

const options: {value: StayChoice;title: Localized;description: Localized;}[] = [
{
  value: 'provided',
  title: { en: 'Use my reserved room', id: 'Gunakan kamar yang disiapkan' },
  description: { en: 'Nothing to book — it’s all arranged.', id: 'Tidak perlu memesan — semua sudah diatur.' }
},
{
  value: 'own',
  title: { en: 'I’ll arrange my own', id: 'Saya atur sendiri' },
  description: { en: 'We’ll release the room on your behalf.', id: 'Kami akan melepas kamar atas nama Anda.' }
}];


export function StayChoiceField({ guest, value, onChange }: StayChoiceFieldProps) {
  const { t, lang } = useLanguage();
  const hotel = hotels.find((h) => h.id === guest.hotel);
  const stay = getStayDates(guest, lang);
  const nights = nightsLabel(stay.nights, lang);

  return (
    <fieldset className="pt-8">
      <legend className="text-sm font-medium">{t({ en: 'Your stay', id: 'Akomodasi Anda' })}</legend>
      <p className="mt-1 text-sm text-ivory/55">
        {lang === 'id' ?
        `Kami telah menyiapkan kamar untuk ${roomNames(guest)} di ${hotel?.name} — ${nights}, ${stay.checkIn} – ${stay.checkOut}.` :
        `We’ve reserved a room for ${roomNames(guest)} at ${hotel?.name} — ${nights}, ${stay.checkIn} – ${stay.checkOut}.`}
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-colors duration-150 ${
              selected ? 'border-blush bg-blush/10' : 'border-ivory/15 hover:border-ivory/35'}`
              }>
              
              <input
                type="radio"
                name="stay-choice"
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="mt-1.5 h-4 w-4 accent-[#E6CFC6]" />
              
              <span>
                <span className="block font-display text-xl leading-tight">{t(option.title)}</span>
                <span className="text-sm text-ivory/60">{t(option.description)}</span>
              </span>
            </label>);

        })}
      </div>
    </fieldset>);

}