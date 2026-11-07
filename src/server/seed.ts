import type { Invitation, Room } from '../types/wedding';

/** Server-only sample data. Tokens are unguessable; never import this from client code. */
export const DEMO_INVITE_TOKEN = 'inv_7c4e9a2f1b8d6e0c3a5f9d2e1b0c8a74';

export const seedRooms: Room[] = [
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

export const seedInvitations: Invitation[] = [
  {
    id: 'inv-tan',
    token: 'inv_b2e1c9a84f7d6e0b3a5c1d9e8f0a2b47',
    partyName: 'The Tan Family',
    members: ['Richard Tan', 'Mei Tan', 'Joanne Tan'],
    invitedEvents: ['welcome', 'tea', 'matrimony', 'cocktails', 'reception', 'afterparty'],
    roomId: 'room-tan',
    previewHint: 'family · all events'
  },
  {
    id: 'inv-hk',
    token: DEMO_INVITE_TOKEN,
    partyName: 'Jason & Priya',
    members: ['Jason Wong', 'Priya Shah'],
    invitedEvents: ['welcome', 'matrimony', 'cocktails', 'reception', 'afterparty'],
    roomId: 'room-hk',
    previewHint: 'friends · 2 nights'
  },
  {
    id: 'inv-ldn',
    token: 'inv_9f0a3d7e2c1b8a6f5e4d3c2b1a0f9e8d',
    partyName: 'Sophie & Tom',
    members: ['Sophie Clarke', 'Tom Hughes'],
    invitedEvents: ['welcome', 'matrimony', 'cocktails', 'reception', 'afterparty'],
    roomId: 'room-ldn',
    previewHint: 'friends · 2 nights'
  },
  {
    id: 'inv-marcus',
    token: 'inv_1a2b3c4d5e6f708192a3b4c5d6e7f809',
    partyName: 'Marcus Lee',
    members: ['Marcus Lee'],
    invitedEvents: ['matrimony', 'cocktails', 'reception', 'afterparty'],
    roomId: 'room-marcus-kenji',
    previewHint: 'solo invite · shared room'
  },
  {
    id: 'inv-kenji',
    token: 'inv_f809e7d6c5b4a39281706f5e4d3c2b1a',
    partyName: 'Kenji Tanaka',
    members: ['Kenji Tanaka'],
    invitedEvents: ['matrimony', 'cocktails', 'reception', 'afterparty'],
    roomId: 'room-marcus-kenji',
    previewHint: 'solo invite · shared room'
  }
];
