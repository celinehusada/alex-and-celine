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

/** Personal invitation — who is invited and which events. Separate from hotel rooms. */
export interface Invitation {
  id: string;
  /** Unguessable token used in the personal invite URL (?invite=…) */
  token: string;
  partyName: string;
  members: string[];
  invitedEvents: EventId[];
  /** Optional link to a room; rooms are managed independently and can mix families */
  roomId: string | null;
  previewHint: string;
}

/** Hotel room reservation — occupants may belong to different invitations. */
export interface Room {
  id: string;
  hotel: HotelId;
  /** Nights reserved — defaults to 2 when omitted */
  nights?: 1 | 2;
  occupants: string[];
  label?: string;
}

/** Resolved view of an invitation + its room, used by guest-facing UI. */
export interface Guest {
  code: string;
  partyName: string;
  members: string[];
  invitedEvents: EventId[];
  hotel: HotelId;
  /** Nights reserved — defaults to 2 when omitted */
  nights?: 1 | 2;
  /** Names on the room reservation — from the linked room, which may include other invitations. */
  roomWith?: string[];
  previewHint: string;
  roomId?: string | null;
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