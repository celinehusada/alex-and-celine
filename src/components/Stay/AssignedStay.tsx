import React from 'react';
import { BusIcon, FootprintsIcon } from 'lucide-react';
import { ShuttleTimetable } from './ShuttleTimetable';
import { useLanguage } from '../../contexts/LanguageContext';
import { getStayDates, roomNames } from '../../utils/stay';
import type { Guest, Hotel } from '../../types/wedding';

export function AssignedStay({ guest, hotel }: {guest: Guest;hotel: Hotel;}) {
  const { t, lang } = useLanguage();
  const stay = getStayDates(guest, lang);
  const details = [
  { label: t({ en: 'Check in', id: 'Check-in' }), value: stay.checkIn },
  { label: t({ en: 'Check out', id: 'Check-out' }), value: stay.checkOut },
  { label: t({ en: 'Nights', id: 'Malam' }), value: String(stay.nights) },
  { label: t({ en: 'Room for', id: 'Kamar untuk' }), value: roomNames(guest) }];


  return (
    <div className="mt-14 grid gap-14 border-t border-ivory/15 pt-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
      <div>
        <p className="text-sm text-ivory/55">{hotel.area}</p>
        <h3 className="mt-2 font-display text-4xl md:text-5xl">{hotel.name}</h3>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-ivory/70">{t(hotel.description)}</p>
        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
          {details.map((d) =>
          <div key={d.label}>
              <dt className="text-sm text-ivory/55">{d.label}</dt>
              <dd className="mt-1 font-display text-2xl">{d.value}</dd>
            </div>
          )}
        </dl>
      </div>

      <div>
        <p className="flex items-center gap-2 text-blush">
          {hotel.shuttles ?
          <BusIcon className="h-5 w-5" aria-hidden="true" /> :

          <FootprintsIcon className="h-5 w-5" aria-hidden="true" />
          }
          {t(hotel.transport)}
        </p>
        {hotel.shuttles ?
        <ShuttleTimetable shuttles={hotel.shuttles} /> :

        <p className="mt-4 max-w-sm leading-relaxed text-ivory/70">
            {t({
            en: 'Head down whenever you’re ready — the chapel, Cliff Lawn and Grand Ballroom are all within the resort.',
            id: 'Silakan datang kapan pun Anda siap — kapel, Cliff Lawn, dan Grand Ballroom semuanya berada di dalam resor.'
          })}
          </p>
        }
      </div>
    </div>);

}