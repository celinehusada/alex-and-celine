import type { Guest, Invitation, Room } from '../types/wedding';

export function resolveGuest(invitation: Invitation, rooms: Room[]): Guest | null {
  const room = invitation.roomId ? rooms.find((r) => r.id === invitation.roomId) : undefined;
  if (invitation.roomId && !room) return null;

  return {
    code: invitation.token,
    partyName: invitation.partyName,
    members: invitation.members,
    invitedEvents: invitation.invitedEvents,
    // Hotel/nights only meaningful when a room is linked; Stay UI hides itself without roomId.
    hotel: room?.hotel ?? 'ritz',
    nights: room?.nights,
    roomWith: room?.occupants,
    previewHint: invitation.previewHint,
    roomId: invitation.roomId
  };
}

export function inviteUrl(token: string, origin = typeof window !== 'undefined' ? window.location.origin : '') {
  const base = origin.replace(/\/$/, '');
  return `${base}/?invite=${encodeURIComponent(token)}`;
}

export function readInviteTokenFromLocation(search = typeof window !== 'undefined' ? window.location.search : '') {
  const params = new URLSearchParams(search);
  const raw = params.get('invite')?.trim();
  return raw ? raw.toLowerCase() : null;
}
