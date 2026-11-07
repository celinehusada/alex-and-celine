import type { EventId, HotelId, Invitation, Room } from '../types/wedding';
import { seedInvitations } from '../data/invitations';
import { seedRooms } from '../data/rooms';

const ADMIN_KEY = 'alex-celine-admin-token';
const LOCAL_INVITES = 'alex-celine-invitations';
const LOCAL_ROOMS = 'alex-celine-rooms';

export type WeddingDataset = {
  invitations: Invitation[];
  rooms: Room[];
  source: 'api' | 'local' | 'seed';
};

function readLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeLocal(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function getStoredAdminToken() {
  try {
    return sessionStorage.getItem(ADMIN_KEY) ?? '';
  } catch {
    return '';
  }
}

export function setStoredAdminToken(token: string) {
  try {
    if (token) sessionStorage.setItem(ADMIN_KEY, token);
    else sessionStorage.removeItem(ADMIN_KEY);
  } catch {
    // ignore
  }
}

export async function fetchDataset(): Promise<WeddingDataset> {
  try {
    const res = await fetch('/api/wedding', { headers: { accept: 'application/json' } });
    if (res.ok) {
      const data = (await res.json()) as { invitations: Invitation[]; rooms: Room[] };
      return { invitations: data.invitations, rooms: data.rooms, source: 'api' };
    }
  } catch {
    // fall through to local/seed
  }

  const invitations = readLocal(LOCAL_INVITES, seedInvitations);
  const rooms = readLocal(LOCAL_ROOMS, seedRooms);
  const source = localStorage.getItem(LOCAL_INVITES) || localStorage.getItem(LOCAL_ROOMS) ? 'local' : 'seed';
  return { invitations, rooms, source };
}

export async function fetchInvitationByToken(token: string): Promise<{ invitation: Invitation; room: Room | null } | null> {
  const normalized = token.trim().toLowerCase();
  try {
    const res = await fetch(`/api/invite/${encodeURIComponent(normalized)}`, {
      headers: { accept: 'application/json' }
    });
    if (res.ok) {
      return (await res.json()) as { invitation: Invitation; room: Room | null };
    }
    if (res.status === 404) return null;
  } catch {
    // fall through
  }

  const { invitations, rooms } = await fetchDataset();
  const invitation = invitations.find((i) => i.token.toLowerCase() === normalized);
  if (!invitation) return null;
  const room = invitation.roomId ? rooms.find((r) => r.id === invitation.roomId) ?? null : null;
  return { invitation, room };
}

async function adminFetch(path: string, init: RequestInit = {}) {
  const token = getStoredAdminToken();
  const headers = new Headers(init.headers);
  headers.set('content-type', 'application/json');
  if (token) headers.set('authorization', `Bearer ${token}`);
  return fetch(path, { ...init, headers });
}

export type InvitationInput = {
  id?: string;
  token?: string;
  partyName: string;
  members: string[];
  invitedEvents: EventId[];
  roomId: string | null;
  previewHint: string;
};

export type RoomInput = {
  id?: string;
  hotel: HotelId;
  nights: 1 | 2;
  occupants: string[];
  label?: string;
};

export async function saveInvitation(input: InvitationInput): Promise<Invitation> {
  try {
    const res = await adminFetch('/api/admin/invitations', {
      method: input.id ? 'PUT' : 'POST',
      body: JSON.stringify(input)
    });
    if (res.ok) return (await res.json()) as Invitation;
  } catch {
    // local fallback
  }

  const dataset = await fetchDataset();
  const token =
    input.token?.trim().toLowerCase() ||
    input.partyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') ||
    `invite-${Date.now()}`;
  const invitation: Invitation = {
    id: input.id ?? `inv-${crypto.randomUUID().slice(0, 8)}`,
    token,
    partyName: input.partyName.trim(),
    members: input.members.map((m) => m.trim()).filter(Boolean),
    invitedEvents: input.invitedEvents,
    roomId: input.roomId,
    previewHint: input.previewHint.trim() || 'guest'
  };
  const invitations = input.id
    ? dataset.invitations.map((i) => (i.id === input.id ? invitation : i))
    : [...dataset.invitations, invitation];
  writeLocal(LOCAL_INVITES, invitations);
  writeLocal(LOCAL_ROOMS, dataset.rooms);
  return invitation;
}

export async function deleteInvitation(id: string) {
  try {
    const res = await adminFetch(`/api/admin/invitations?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (res.ok || res.status === 204) return;
  } catch {
    // local
  }
  const dataset = await fetchDataset();
  writeLocal(
    LOCAL_INVITES,
    dataset.invitations.filter((i) => i.id !== id)
  );
  writeLocal(LOCAL_ROOMS, dataset.rooms);
}

export async function saveRoom(input: RoomInput): Promise<Room> {
  try {
    const res = await adminFetch('/api/admin/rooms', {
      method: input.id ? 'PUT' : 'POST',
      body: JSON.stringify(input)
    });
    if (res.ok) return (await res.json()) as Room;
  } catch {
    // local
  }

  const dataset = await fetchDataset();
  const room: Room = {
    id: input.id ?? `room-${crypto.randomUUID().slice(0, 8)}`,
    hotel: input.hotel,
    nights: input.nights,
    occupants: input.occupants.map((o) => o.trim()).filter(Boolean),
    label: input.label?.trim() || undefined
  };
  const rooms = input.id ? dataset.rooms.map((r) => (r.id === input.id ? room : r)) : [...dataset.rooms, room];
  writeLocal(LOCAL_ROOMS, rooms);
  writeLocal(LOCAL_INVITES, dataset.invitations);
  return room;
}

export async function deleteRoom(id: string) {
  try {
    const res = await adminFetch(`/api/admin/rooms?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (res.ok || res.status === 204) return;
  } catch {
    // local
  }
  const dataset = await fetchDataset();
  writeLocal(
    LOCAL_ROOMS,
    dataset.rooms.filter((r) => r.id !== id)
  );
  writeLocal(
    LOCAL_INVITES,
    dataset.invitations.map((i) => (i.roomId === id ? { ...i, roomId: null } : i))
  );
}

export async function resetLocalDataset() {
  try {
    localStorage.removeItem(LOCAL_INVITES);
    localStorage.removeItem(LOCAL_ROOMS);
  } catch {
    // ignore
  }
}
