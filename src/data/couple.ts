import type { Localized } from '../types/i18n';

export interface CouplePerson {
  fullName: string;
  relation: Localized;
  parents: Localized;
  instagram: string;
}

export const couple: Record<'alex' | 'celine', CouplePerson> = {
  alex: {
    fullName: 'Atthaviriya Alexander Lim',
    relation: { en: 'The son of', id: 'Putra dari' },
    parents: { en: 'Mr. & Mrs. Lim', id: 'Bapak & Ibu Lim' },
    instagram: 'atthaviriya'
  },
  celine: {
    fullName: 'Celine Husada',
    relation: { en: 'The daughter of', id: 'Putri dari' },
    parents: { en: 'Mr. & Mrs. Husada', id: 'Bapak & Ibu Husada' },
    instagram: 'celinehusada'
  }
};

export const coupleInstagram = 'alexandceline';

export const hashtags = ['CEALtheDeal', 'CELamatinLEX'];