import type { Invitation } from '../types/wedding';

/** Invitations are separate from rooms — assign a roomId to link stay details. */
export const seedInvitations: Invitation[] = [
  {
    id: 'inv-tan',
    token: 'tan-family',
    partyName: 'The Tan Family',
    members: ['Richard Tan', 'Mei Tan', 'Joanne Tan'],
    invitedEvents: ['welcome', 'tea', 'matrimony', 'cocktails', 'reception', 'afterparty'],
    roomId: 'room-tan',
    previewHint: 'family · all events'
  },
  {
    id: 'inv-hk',
    token: 'hk-crew',
    partyName: 'Jason & Priya',
    members: ['Jason Wong', 'Priya Shah'],
    invitedEvents: ['welcome', 'matrimony', 'cocktails', 'reception', 'afterparty'],
    roomId: 'room-hk',
    previewHint: 'friends · 2 nights'
  },
  {
    id: 'inv-ldn',
    token: 'ldn-sophie',
    partyName: 'Sophie & Tom',
    members: ['Sophie Clarke', 'Tom Hughes'],
    invitedEvents: ['welcome', 'matrimony', 'cocktails', 'reception', 'afterparty'],
    roomId: 'room-ldn',
    previewHint: 'friends · 2 nights'
  },
  {
    id: 'inv-marcus',
    token: 'uni-marcus',
    partyName: 'Marcus Lee',
    members: ['Marcus Lee'],
    invitedEvents: ['matrimony', 'cocktails', 'reception', 'afterparty'],
    roomId: 'room-marcus-kenji',
    previewHint: 'solo invite · shared room'
  },
  {
    id: 'inv-kenji',
    token: 'uni-kenji',
    partyName: 'Kenji Tanaka',
    members: ['Kenji Tanaka'],
    invitedEvents: ['matrimony', 'cocktails', 'reception', 'afterparty'],
    roomId: 'room-marcus-kenji',
    previewHint: 'solo invite · shared room'
  }
];
