import React from 'react';
import { LeafIcon } from 'lucide-react';
import type { MemberResponse } from './useRsvpForm';
import { useLanguage } from '../../contexts/LanguageContext';

interface MemberRowProps {
  name: string;
  response: MemberResponse;
  vegetarian: boolean;
  onRespond: (value: Exclude<MemberResponse, null>) => void;
  onToggleVegetarian: () => void;
}

export function MemberRow({ name, response, vegetarian, onRespond, onToggleVegetarian }: MemberRowProps) {
  const vegId = `veg-${name.replace(/\s+/g, '-').toLowerCase()}`;
  const { t } = useLanguage();

  return (
    <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <span className="font-display text-xl">{name}</span>
        {response === 'yes' &&
        <label htmlFor={vegId} className="mt-1.5 flex w-fit cursor-pointer items-center gap-2 text-sm text-ivory/70">
            <input
            id={vegId}
            type="checkbox"
            checked={vegetarian}
            onChange={onToggleVegetarian}
            className="h-4 w-4 rounded accent-[#CDD0B6]" />
          
            <LeafIcon className={`h-3.5 w-3.5 ${vegetarian ? 'text-sage' : 'text-ivory/40'}`} aria-hidden="true" />
            Vegetarian
          </label>
        }
      </div>
      <div
        role="group"
        aria-label={`${t({ en: 'Response for', id: 'Konfirmasi untuk' })} ${name}`}
        className="inline-flex self-start rounded-full border border-ivory/15 p-1 sm:self-center">
        
        {(['yes', 'no'] as const).map((value) => {
          const selected = response === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={selected}
              onClick={() => onRespond(value)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors duration-150 ${
              selected ?
              value === 'yes' ?
              'bg-sage text-ink' :
              'bg-ivory text-ink' :
              'text-ivory/65 hover:text-ivory'}`
              }>
              
              {value === 'yes' ?
              t({ en: 'Attending', id: 'Hadir' }) :
              t({ en: 'Can’t make it', id: 'Tidak dapat hadir' })}
            </button>);

        })}
      </div>
    </li>);

}