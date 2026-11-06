import type { Hotel } from '../types/wedding';

export const hotels: Hotel[] = [
{
  id: 'ritz',
  name: 'The Ritz-Carlton, Bali',
  area: 'Nusa Dua',
  description: {
    en: 'Every celebration happens right here — the chapel, the Cliff Lawn and the Grand Ballroom are all a short walk from your room.',
    id: 'Seluruh acara berlangsung di sini — kapel, Cliff Lawn, dan Grand Ballroom hanya beberapa langkah dari kamar Anda.'
  },
  transport: {
    en: 'No transfers needed — everything is on-site.',
    id: 'Tidak perlu transportasi — semua acara ada di dalam resor.'
  }
},
{
  id: 'aventus',
  name: 'Sunrise Aventus Nusa Dua',
  area: 'Nusa Dua',
  description: {
    en: 'A calm base a short drive from the Ritz-Carlton. We’ve arranged shuttles for every part of the day, and back again after the party.',
    id: 'Tempat menginap yang tenang, tidak jauh dari The Ritz-Carlton. Kami telah menyiapkan shuttle untuk setiap acara, termasuk perjalanan pulang setelah pesta.'
  },
  transport: {
    en: 'Complimentary shuttle to and from the Ritz-Carlton.',
    id: 'Shuttle gratis pulang-pergi ke The Ritz-Carlton.'
  },
  shuttles: {
    outbound: [
    { time: '14:15', label: { en: 'For Holy Matrimony guests', id: 'Untuk tamu Pemberkatan Pernikahan' } },
    { time: '16:00', label: { en: 'For sunset hours', id: 'Untuk sunset hours' } },
    { time: '18:00', label: { en: 'For the reception', id: 'Untuk resepsi' } }],

    inbound: [
    { time: '22:15', label: { en: 'After the reception', id: 'Setelah resepsi' } },
    { time: '23:45', label: { en: 'Mid-party', id: 'Di tengah pesta' } },
    { time: '01:15', label: { en: 'Last shuttle after the party', id: 'Shuttle terakhir setelah pesta' } }]

  }
}];