import type { EventId, HotelId } from '../types/wedding';

/** Server-only sample rows. No invite tokens here — tokens are generated when seeding the DB. */
export type SeedRoom = {
  id: string;
  hotel: HotelId;
  nights: 1 | 2;
  occupants: string[];
  label?: string;
};

export type SeedInvitation = {
  id: string;
  partyName: string;
  members: string[];
  invitedEvents: EventId[];
  roomId: string | null;
  previewHint: string;
  /** At most one sample invitation may be marked demo for /api/invite/demo */
  isDemo?: boolean;
};

export const seedRooms: SeedRoom[] = [
  {
    id: 'room-tan',
    hotel: 'ritz',
    nights: 2,
    occupants: ['Richard Tan', 'Mei Tan', 'Joanne Tan'],
    label: 'Tan family'
  },
  {
    id: 'room-hk',
    hotel: 'aventus',
    nights: 2,
    occupants: ['Jason Wong', 'Priya Shah'],
    label: 'Jason & Priya'
  },
  {
    id: 'room-ldn',
    hotel: 'ritz',
    nights: 2,
    occupants: ['Sophie Clarke', 'Tom Hughes'],
    label: 'Sophie & Tom'
  },
  {
    id: 'room-marcus-kenji',
    hotel: 'aventus',
    nights: 1,
    occupants: ['Marcus Lee', 'Kenji Tanaka'],
    label: 'Marcus & Kenji (shared)'
  }
];

export const seedInvitations: SeedInvitation[] = [
  {
    id: 'inv-tan',
    partyName: 'The Tan Family',
    members: ['Richard Tan', 'Mei Tan', 'Joanne Tan'],
    invitedEvents: ['welcome', 'tea', 'matrimony', 'cocktails', 'reception', 'afterparty'],
    roomId: 'room-tan',
    previewHint: 'family · all events'
  },
  {
    id: 'inv-hk',
    partyName: 'Jason & Priya',
    members: ['Jason Wong', 'Priya Shah'],
    invitedEvents: ['welcome', 'matrimony', 'cocktails', 'reception', 'afterparty'],
    roomId: 'room-hk',
    previewHint: 'friends · 2 nights',
    isDemo: true
  },
  {
    id: 'inv-ldn',
    partyName: 'Sophie & Tom',
    members: ['Sophie Clarke', 'Tom Hughes'],
    invitedEvents: ['welcome', 'matrimony', 'cocktails', 'reception', 'afterparty'],
    roomId: 'room-ldn',
    previewHint: 'friends · 2 nights'
  },
  {
    id: 'inv-marcus',
    partyName: 'Marcus Lee',
    members: ['Marcus Lee'],
    invitedEvents: ['matrimony', 'cocktails', 'reception', 'afterparty'],
    roomId: 'room-marcus-kenji',
    previewHint: 'solo invite · shared room'
  },
  {
    id: 'inv-kenji',
    partyName: 'Kenji Tanaka',
    members: ['Kenji Tanaka'],
    invitedEvents: ['matrimony', 'cocktails', 'reception', 'afterparty'],
    roomId: 'room-marcus-kenji',
    previewHint: 'solo invite · shared room'
  }
];
