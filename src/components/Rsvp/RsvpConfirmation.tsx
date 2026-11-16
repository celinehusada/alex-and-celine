import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownIcon, LeafIcon } from 'lucide-react';
import { events } from '../../data/events';
import { Monogram } from '../Monogram';
import { hotels } from '../../data/hotels';
import { useLanguage } from '../../contexts/LanguageContext';
import { getStayDates, nightsLabel, roomNames } from '../../utils/stay';
import { formatTime } from '../../utils/time';
import type { EventId, Guest, StayChoice } from '../../types/wedding';

interface RsvpConfirmationProps {
  guest: Guest;
  attending: string[];
  vegetarian: Record<string, boolean>;
  selectedEvents: EventId[];
  email: string;
  wishShared: boolean;
  stayChoice: StayChoice;
  onEdit: () => void;
}

export function RsvpConfirmation({
  guest,
  attending,
  vegetarian,
  selectedEvents,
  email,
  wishShared,
  stayChoice,
  onEdit
}: RsvpConfirmationProps) {
  const { t, lang } = useLanguage();
  const coming = attending.length > 0;
  const hotel = hotels.find((h) => h.id === guest.hotel);
  const stay = getStayDates(guest, lang);
  const stayLabel =
  stayChoice === 'own' ?
  t({ en: 'Arranging your own accommodation', id: 'Mengatur akomodasi sendiri' }) :
  `${hotel?.name} · ${nightsLabel(stay.nights, lang)} (${stay.checkIn} – ${stay.checkOut}) · ${t({
    en: 'Room for',
    id: 'Kamar untuk'
  })} ${roomNames(guest)}`;
  const chosen = events.filter((e) => selectedEvents.includes(e.id));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className="rounded-2xl bg-night p-6 text-ivory md:p-10"
      role="status">
      
      <Monogram className="h-12 w-12" sunColor="#F5F1E8" moonColor="#E6CFC6" />
      <h3 className="mt-4 font-display text-4xl">
        {coming ?
        `${t({ en: 'Thank you', id: 'Terima kasih' })}, ${guest.partyName}.` :
        t({ en: 'You’ll be missed.', id: 'Kami akan merindukan Anda.' })}
      </h3>
      <p className="mt-3 max-w-md text-ivory/65">
        {coming ?
        lang === 'id' ?
        `Kami telah menerima RSVP Anda dan menantikan kehadiran Anda. Informasi selanjutnya akan dikirim ke ${email}.` :
        `We’ve received your RSVP and look forward to celebrating with you. Updates will be sent to ${email}.` :
        t({
          en: 'Thank you for letting us know. We’ll be thinking of you on the day.',
          id: 'Terima kasih telah mengabari kami. Kami akan mengingat Anda di hari bahagia kami.'
        })}
      </p>

      {coming &&
      <dl className="mt-8 grid gap-6 border-t border-ivory/10 pt-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-ivory/55">{t({ en: 'Attending', id: 'Hadir' })}</dt>
            <dd className="mt-2 space-y-1">
              {attending.map((name) =>
            <p key={name} className="flex items-center gap-2 font-display text-xl">
                  {name}
                  {vegetarian[name] &&
              <span className="inline-flex items-center gap-1 font-sans text-xs text-sage">
                      <LeafIcon className="h-3 w-3" aria-hidden="true" /> Vegetarian
                    </span>
              }
                </p>
            )}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-ivory/55">{t({ en: 'Celebrations', id: 'Acara' })}</dt>
            <dd className="mt-2 space-y-1">
              {chosen.map((e) =>
            <p key={e.id} className="flex gap-3">
                  <span className="w-24 shrink-0 whitespace-nowrap text-sm tabular-nums text-ivory/55">
                    {e.dayShort ? `${t(e.dayShort)} ` : ''}
                    {formatTime(e.time, lang)}
                  </span>
                  <span className="font-display text-xl leading-tight">{t(e.name)}</span>
                </p>
            )}
            </dd>
          </div>
        </dl>
      }

      {coming && guest.roomId &&
      <div className="mt-6 border-t border-ivory/10 pt-6">
          <p className="text-sm text-ivory/55">{t({ en: 'Stay', id: 'Akomodasi' })}</p>
          <p className="mt-1 font-display text-xl">{stayLabel}</p>
        </div>
      }

      <div className="mt-8 flex flex-wrap items-center gap-6">
        {coming && guest.roomId &&
        <a
          href="#stay"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-blush px-6 py-3 text-sm font-medium text-oxblood transition-colors duration-150 hover:bg-ivory">
          
            {t({ en: 'See your stay', id: 'Lihat akomodasi' })} <ArrowDownIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        }
        {wishShared &&
        <a href="#wishes" className="whitespace-nowrap text-sm text-blush underline underline-offset-4">
            {t({ en: 'See your wish on the wall', id: 'Lihat ucapan Anda' })}
          </a>
        }
        <button
          type="button"
          onClick={onEdit}
          className="whitespace-nowrap text-sm text-ivory/60 underline underline-offset-4 hover:text-blush">
          
          {t({ en: 'Edit response', id: 'Ubah konfirmasi' })}
        </button>
      </div>
    </motion.div>);

}