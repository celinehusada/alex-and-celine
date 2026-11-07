import type { Localized } from '../types/i18n';
import type { WeddingEvent } from '../types/wedding';

export const weddingDate: Localized = {
  en: 'Sunday, 22 August 2027',
  id: 'Minggu, 22 Agustus 2027'
};

export const replyBy: Localized = {
  en: '1 June 2027',
  id: '1 Juni 2027'
};

// Holy Matrimony start, Bali time (WITA, UTC+8)
export const ceremonyStart = '2027-08-22T15:00:00+08:00';

const allGuests: Localized = { en: 'All guests', id: 'Semua tamu' };

export const events: WeddingEvent[] = [
{
  id: 'welcome',
  dayLabel: { en: 'Saturday, 21 August', id: 'Sabtu, 21 Agustus' },
  dayShort: { en: 'Sat', id: 'Sab' },
  time: '19:00',
  name: { en: 'Welcome Dinner', id: 'Makan Malam Penyambutan' },
  venue: { en: 'Menega Cafe, Jimbaran Beach', id: 'Menega Cafe, Pantai Jimbaran' },
  audience: allGuests,
  note: {
    en: 'Casual Welcome Dinner. Dress code: White for Beach.',
    id: 'Casual Welcome Dinner. Dress code: White for Beach.'
  }
},
{
  id: 'tea',
  time: '14:00',
  name: { en: 'Tea Ceremony', id: 'Upacara Minum Teh (Teapai)' },
  venue: { en: 'Meeting Room, The Ritz-Carlton', id: 'Ruang Pertemuan, The Ritz-Carlton' },
  audience: { en: 'Family only', id: 'Khusus keluarga' },
  restrictedLabel: { en: 'Family only', id: 'Khusus keluarga' }
},
{
  id: 'matrimony',
  time: '15:00',
  name: { en: 'Holy Matrimony', id: 'Pemberkatan Pernikahan' },
  venue: { en: 'Majestic Chapel, The Ritz-Carlton', id: 'Majestic Chapel, The Ritz-Carlton' },
  audience: { en: 'First come, first served', id: 'Siapa cepat, dia dapat' },
  note: {
    en: 'The chapel seats 80 — RSVP early to get a seat.',
    id: 'Kapel hanya dapat menampung 80 orang — segera RSVP untuk mendapatkan tempat.'
  }
},
{
  id: 'cocktails',
  time: '17:00',
  name: { en: 'Sunset Hours', id: 'Sunset Hours' },
  venue: { en: 'Cliff Lawn, The Ritz-Carlton', id: 'Cliff Lawn, The Ritz-Carlton' },
  audience: allGuests
},
{
  id: 'reception',
  time: '18:30',
  name: { en: 'Reception', id: 'Resepsi' },
  venue: { en: 'Cliff Lawn, The Ritz-Carlton', id: 'Cliff Lawn, The Ritz-Carlton' },
  audience: allGuests
},
{
  id: 'afterparty',
  time: '22:30',
  endTime: '01:00',
  name: { en: 'After Party', id: 'After Party' },
  venue: { en: 'Grand Ballroom, The Ritz-Carlton', id: 'Grand Ballroom, The Ritz-Carlton' },
  audience: allGuests
}];