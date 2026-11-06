import type { Lang } from '../types/i18n';

/** "19:00" → "7:00 PM" in English, "19.00" in Indonesian */
export function formatTime(time24: string, lang: Lang) {
  const [h, m] = time24.split(':').map(Number);
  if (lang === 'id') return `${String(h).padStart(2, '0')}.${String(m).padStart(2, '0')}`;
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${period}`;
}