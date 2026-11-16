import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2Icon } from 'lucide-react';
import { useGuest } from '../../contexts/GuestContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { events } from '../../data/events';
import { EventOption } from './EventOption';
import { MemberRow } from './MemberRow';
import { StayChoiceField } from './StayChoiceField';
import { RsvpConfirmation } from './RsvpConfirmation';
import { useRsvpForm } from './useRsvpForm';
import type { Guest } from '../../types/wedding';

const ease = [0.23, 1, 0.32, 1] as const;
const fieldBase =
'mt-2 w-full rounded-xl border bg-ivory/[0.04] text-ivory placeholder:text-ivory/35 focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20';
const inputClass = `${fieldBase} h-12 px-4`;

export function RsvpForm({ guest }: {guest: Guest;}) {
  const { clearGuest } = useGuest();
  const { t, lang } = useLanguage();
  const f = useRsvpForm(guest);
  const hasLocked = events.some((e) => !guest.invitedEvents.includes(e.id));
  const optional = t({ en: '(optional)', id: '(opsional)' });
  const seats = guest.members.length;

  if (f.status === 'submitted') {
    return (
      <RsvpConfirmation
        guest={guest}
        attending={f.attending}
        vegetarian={f.vegetarian}
        selectedEvents={f.selectedEvents}
        email={f.email.trim()}
        wishShared={f.wishShared}
        stayChoice={f.stayChoice}
        onEdit={f.edit} />);


  }

  return (
    <form onSubmit={f.submit} noValidate className="rounded-2xl bg-night p-6 text-ivory md:p-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-ivory/55">{t({ en: 'Invitation for', id: 'Undangan untuk' })}</p>
          <h3 className="font-display text-3xl md:text-4xl">{guest.partyName}</h3>
        </div>
        <button
          type="button"
          onClick={clearGuest}
          className="whitespace-nowrap pt-1 text-sm text-ivory/60 underline underline-offset-4 hover:text-blush">
          
          {t({ en: 'Not you?', id: 'Bukan Anda?' })}
        </button>
      </div>

      <fieldset className="mt-8">
        <legend className="text-sm font-medium">{t({ en: 'Guests', id: 'Tamu' })}</legend>
        <p className="mt-1 text-sm text-ivory/55">
          {lang === 'id' ?
          `Kami telah menyiapkan ${seats} kursi atas nama Anda.` :
          `We have reserved ${seats === 1 ? 'one seat' : `${seats} seats`} in your name.`}
        </p>
        <ul
          className={`mt-3 divide-y divide-ivory/10 border-y ${
          f.invalidField === 'responses' ? 'border-blush/60' : 'border-ivory/10'}`
          }>
          
          {guest.members.map((member) =>
          <MemberRow
            key={member}
            name={member}
            response={f.responses[member]}
            vegetarian={f.vegetarian[member]}
            onRespond={(value) => f.setResponse(member, value)}
            onToggleVegetarian={() => f.toggleVegetarian(member)} />

          )}
        </ul>
      </fieldset>

      <AnimatePresence initial={false}>
        {f.anyoneAttending &&
        <motion.div
          key="events"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease }}
          className="overflow-hidden">
          
            <fieldset className="pt-8">
              <legend className="text-sm font-medium">
                {t({ en: 'Which celebrations will you join?', id: 'Acara mana saja yang akan Anda hadiri?' })}
              </legend>
              <div className="mt-3 grid gap-2">
                {events.map((event) =>
              <EventOption
                key={event.id}
                event={event}
                checked={f.selectedEvents.includes(event.id)}
                locked={!guest.invitedEvents.includes(event.id)}
                onToggle={() => f.toggleEvent(event.id)} />

              )}
              </div>
              {hasLocked &&
            <p className="mt-3 text-sm text-ivory/55">
                  {t({
                en: 'The tea ceremony is for family only — thank you for understanding.',
                id: 'Upacara minum teh khusus untuk keluarga — terima kasih atas pengertiannya.'
              })}
                </p>
            }
            </fieldset>

            {guest.roomId ? <StayChoiceField guest={guest} value={f.stayChoice} onChange={f.setStayChoice} /> : null}

            <div className="mt-8">
              <label htmlFor="dietary" className="text-sm font-medium">
                {t({ en: 'Allergies or other dietary needs', id: 'Alergi atau kebutuhan makanan lainnya' })}{' '}
                <span className="font-normal text-ivory/50">{optional}</span>
              </label>
              <input
              id="dietary"
              value={f.dietary}
              onChange={(e) => f.setDietary(e.target.value)}
              placeholder={t({ en: 'No shellfish, nut allergy…', id: 'Tidak makan kerang, alergi kacang…' })}
              className={`${inputClass} border-ivory/20`} />
            
            </div>
          </motion.div>
        }
      </AnimatePresence>

      <fieldset className="mt-8">
        <legend className="text-sm font-medium">
          {t({ en: 'How can we reach you?', id: 'Bagaimana kami dapat menghubungi Anda?' })}
        </legend>
        <div className="mt-1 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="rsvp-email" className="text-sm text-ivory/65">
              Email
            </label>
            <input
              id="rsvp-email"
              type="email"
              autoComplete="email"
              value={f.email}
              onChange={(e) => f.setEmail(e.target.value)}
              placeholder={t({ en: 'you@example.com', id: 'anda@contoh.com' })}
              aria-invalid={f.invalidField === 'email'}
              className={`${inputClass} ${f.invalidField === 'email' ? 'border-blush' : 'border-ivory/20'}`} />
            
          </div>
          <div>
            <label htmlFor="rsvp-phone" className="text-sm text-ivory/65">
              {t({ en: 'WhatsApp number', id: 'Nomor WhatsApp' })}
            </label>
            <input
              id="rsvp-phone"
              type="tel"
              autoComplete="tel"
              value={f.phone}
              onChange={(e) => f.setPhone(e.target.value)}
              placeholder={t({ en: '+852 9123 4567', id: '+62 812 3456 7890' })}
              aria-invalid={f.invalidField === 'phone'}
              required
              className={`${inputClass} ${f.invalidField === 'phone' ? 'border-blush' : 'border-ivory/20'}`} />
            
          </div>
        </div>
      </fieldset>

      <div className="mt-8">
        <label htmlFor="message" className="text-sm font-medium">
          {t({ en: 'Message for the couple', id: 'Pesan untuk kedua mempelai' })}{' '}
          <span className="font-normal text-ivory/50">{optional}</span>
        </label>
        <textarea
          id="message"
          rows={3}
          value={f.message}
          onChange={(e) => f.setMessage(e.target.value)}
          placeholder={t({
            en: 'Share your wishes, or a song you’d love to hear.',
            id: 'Tuliskan ucapan Anda, atau lagu yang ingin Anda dengar.'
          })}
          className={`${fieldBase} resize-none border-ivory/20 px-4 py-3`} />
        
        <label className="mt-2 flex w-fit cursor-pointer items-center gap-2 text-sm text-ivory/65">
          <input
            type="checkbox"
            checked={f.shareWish}
            onChange={(e) => f.setShareWish(e.target.checked)}
            className="h-4 w-4 accent-[#E6CFC6]" />
          
          {t({ en: 'Show it on the wishes wall', id: 'Tampilkan di dinding ucapan' })}
        </label>
      </div>

      {f.error &&
      <p role="alert" className="mt-5 text-sm text-blush">
          {t(f.error)}
        </p>
      }

      <button
        type="submit"
        disabled={f.status === 'submitting'}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-blush px-8 font-medium text-oxblood transition-colors duration-150 hover:bg-ivory disabled:opacity-70 sm:w-auto">
        
        {f.status === 'submitting' && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {f.status === 'submitting' ? t({ en: 'Sending…', id: 'Mengirim…' }) : t({ en: 'Send RSVP', id: 'Kirim RSVP' })}
      </button>
    </form>);

}