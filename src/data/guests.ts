import type { Guest } from '../types/wedding';
import { seedInvitations } from './invitations';
import { seedRooms } from './rooms';
import { resolveGuest } from '../utils/invitation';

/** Resolved seed guests for local preview when the API is unavailable. */
export const guests: Guest[] = seedInvitations
  .map((invitation) => resolveGuest(invitation, seedRooms))
  .filter((g): g is Guest => g !== null);
