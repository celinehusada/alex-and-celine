import React from 'react';
import { CheckIcon, LockIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatTime } from '../../utils/time';
import type { WeddingEvent } from '../../types/wedding';

interface EventOptionProps {
  event: WeddingEvent;
  checked: boolean;
  locked: boolean;
  onToggle: () => void;
}

export function EventOption({ event, checked, locked, onToggle }: EventOptionProps) {
  const { t, lang } = useLanguage();
  const active = checked && !locked;
  const restricted = event.restrictedLabel ? t(event.restrictedLabel) : undefined;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={active}
      aria-disabled={locked}
      disabled={locked}
      onClick={onToggle}
      className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3 text-left transition-colors duration-150 ${
      locked ?
      'cursor-not-allowed border-dashed border-ivory/15 text-ivory/35' :
      active ?
      'border-blush bg-blush/10' :
      'border-ivory/15 hover:border-ivory/35'}`
      }>
      
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors duration-150 ${
        active ? 'border-blush bg-blush text-oxblood' : locked ? 'border-ivory/15' : 'border-ivory/30'}`
        }
        aria-hidden="true">
        
        {active && <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />}
      </span>
      <span className="w-24 shrink-0 whitespace-nowrap text-sm tabular-nums text-ivory/60">
        {event.dayShort ? `${t(event.dayShort)} ` : ''}
        {formatTime(event.time, lang)}
      </span>
      <span className="min-w-0 flex-1 font-display text-xl leading-tight">{t(event.name)}</span>
      {locked && restricted &&
      <span className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap text-xs sm:inline-flex">
          <LockIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {restricted}
        </span>
      }
      {locked && <LockIcon className="h-4 w-4 shrink-0 sm:hidden" aria-label={restricted} />}
    </button>);

}