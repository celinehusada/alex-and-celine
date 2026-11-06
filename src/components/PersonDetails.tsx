import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { CouplePerson } from '../data/couple';

export function PersonDetails({ person, align = 'left' }: {person: CouplePerson;align?: 'left' | 'right';}) {
  const { t } = useLanguage();

  return (
    <div className={`mt-4 max-w-xs md:mt-6 ${align === 'right' ? 'ml-auto text-right' : ''}`}>
      <p className="font-display text-lg leading-tight md:text-2xl">{person.fullName}</p>
      <p className="mt-1 text-xs text-ivory/65 md:text-sm">
        <span className="font-display italic text-blush/85">{t(person.relation)}</span> {t(person.parents)}
      </p>
      <a
        href={`https://instagram.com/${person.instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-xs text-blush underline-offset-4 hover:underline md:text-sm">
        
        @{person.instagram}
      </a>
    </div>);

}