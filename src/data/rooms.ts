import type { Room } from '../types/wedding';

/** Rooms are independent of invitations — occupants can come from different parties. */
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
