import React from 'react';
import { MoonIcon, MoonStarIcon, SunDimIcon, SunIcon, SunMediumIcon, SunsetIcon, UtensilsIcon } from 'lucide-react';
import type { EventId } from '../types/wedding';

const icons: Record<EventId, typeof SunIcon> = {
  welcome: UtensilsIcon,
  tea: SunIcon,
  matrimony: SunMediumIcon,
  photos: SunDimIcon,
  cocktails: SunsetIcon,
  reception: MoonIcon,
  afterparty: MoonStarIcon
};

export function EventPhaseIcon({ id, className = '' }: {id: EventId;className?: string;}) {
  const Icon = icons[id];
  return <Icon className={className} aria-hidden="true" />;
}