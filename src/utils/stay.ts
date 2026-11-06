import type { Lang } from '../types/i18n';
import type { Guest } from '../types/wedding';

export const DEFAULT_NIGHTS = 2;

const dates = {
  sat: { en: 'Sat, 21 Aug', id: 'Sab, 21 Agu' },
  sun: { en: 'Sun, 22 Aug', id: 'Min, 22 Agu' },
  mon: { en: 'Mon, 23 Aug', id: 'Sen, 23 Agu' }
};

/** Default stay is 2 nights (Sat–Mon). Guests set to 1 night arrive on the wedding day. */
export function getStayDates(guest: Guest, lang: Lang) {
  const nights = guest.nights ?? DEFAULT_NIGHTS;
  return nights === 1 ?
  { checkIn: dates.sun[lang], checkOut: dates.mon[lang], nights } :
  { checkIn: dates.sat[lang], checkOut: dates.mon[lang], nights };
}

export function nightsLabel(nights: number, lang: Lang) {
  if (lang === 'id') return `${nights} malam`;
  return `${nights} ${nights === 1 ? 'night' : 'nights'}`;
}

/** Who the room is reserved for — the party by default, or a pairing set on the guest. */
export function roomNames(guest: Guest) {
  const names = guest.roomWith ?? guest.members;
  if (names.length <= 2) return names.join(' & ');
  return `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}`;
}