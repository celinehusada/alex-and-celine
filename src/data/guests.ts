import type { Guest } from '../types/wedding';

// `nights` defaults to 2 (Sat 21 – Mon 23 Aug). Set `nights: 1` for guests arriving on the day.
// `roomWith` is optional — leave it out and the room is reserved for the party members.
export const guests: Guest[] = [
{
  code: 'TAN-FAMILY',
  partyName: 'The Tan Family',
  members: ['Richard Tan', 'Mei Tan', 'Joanne Tan'],
  invitedEvents: ['welcome', 'tea', 'matrimony', 'cocktails', 'reception', 'afterparty'],
  hotel: 'ritz',
  previewHint: 'family · all events'
},
{
  code: 'HK-CREW',
  partyName: 'Jason & Priya',
  members: ['Jason Wong', 'Priya Shah'],
  invitedEvents: ['welcome', 'matrimony', 'cocktails', 'reception', 'afterparty'],
  hotel: 'aventus',
  previewHint: 'friends · 2 nights'
},
{
  code: 'LDN-SOPHIE',
  partyName: 'Sophie & Tom',
  members: ['Sophie Clarke', 'Tom Hughes'],
  invitedEvents: ['welcome', 'matrimony', 'cocktails', 'reception', 'afterparty'],
  hotel: 'ritz',
  previewHint: 'friends · 2 nights'
},
{
  code: 'UNI-MARCUS',
  partyName: 'Marcus Lee',
  members: ['Marcus Lee'],
  invitedEvents: ['matrimony', 'cocktails', 'reception', 'afterparty'],
  hotel: 'aventus',
  nights: 1,
  // Paired with a guest from another invitation
  roomWith: ['Marcus Lee', 'Kenji Tanaka'],
  previewHint: 'solo · 1 night'
}];