import type { Localized } from './i18n';

export type EventId =
'welcome' |
'tea' |
'matrimony' |
'photos' |
'cocktails' |
'reception' |
'afterparty';

export type HotelId = 'ritz' | 'aventus';

export type StayChoice = 'provided' | 'own';

export interface WeddingEvent {
  id: EventId;
  /** Set for events that aren't on the wedding day itself */
  dayLabel?: Localized;
  /** Short day name shown beside the time, e.g. "Sat" */
  dayShort?: Localized;
  /** 24-hour time, e.g. "19:00" */
  time: string;
  endTime?: string;
  name: Localized;
  venue: Localized;
  audience: Localized;
  note?: Localized;
  restrictedLabel?: Localized;
}

export interface Guest {
  code: string;
  partyName: string;
  members: string[];
  invitedEvents: EventId[];
  hotel: HotelId;
  /** Nights reserved — defaults to 2 when omitted */
  nights?: 1 | 2;
  /** Names on the room reservation — defaults to the party members. Can pair someone from another invitation. */
  roomWith?: string[];
  previewHint: string;
}

export interface ShuttleRun {
  /** 24-hour time */
  time: string;
  label: Localized;
}

export interface Hotel {
  id: HotelId;
  name: string;
  area: string;
  description: Localized;
  transport: Localized;
  shuttles?: {
    outbound: ShuttleRun[];
    inbound: ShuttleRun[];
  };
}

export interface Wish {
  id: string;
  name: string;
  message: string;
  isNew?: boolean;
}

export type FoodKind = 'dumpling' | 'noodles' | 'wok' | 'egg' | 'bao' | 'pot';

/** Any line sketch — fruit, or the food they cook together */
export type SketchKind = FruitKind | FoodKind;

export type FruitKind =
'apple' |
'kiwi' |
'mandarin' |
'grapes' |
'pear' |
'cherries' |
'mango' |
'strawberry' |
'lychee' |
'watermelon';

export interface StoryMilestone {
  year: string;
  title: Localized;
  body: Localized;
  fruit: FruitKind;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption: Localized;
  orientation: 'portrait' | 'landscape';
}

export interface Gallery {
  city: string;
  blurb: Localized;
  photos: GalleryPhoto[];
}