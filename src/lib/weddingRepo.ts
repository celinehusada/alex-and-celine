import type { EventId, HotelId, Invitation, Room } from '../types/wedding';
import { ensureSeedData, sql } from './db';

type RoomRow = {
  id: string;
  hotel: HotelId;
  nights: number;
  occupants: string[] | string;
  label: string | null;
};

type InvitationRow = {
  id: string;
  token: string;
  party_name: string;
  members: string[] | string;
  invited_events: EventId[] | string;
  room_id: string | null;
  preview_hint: string;
};

function parseJsonArray<T>(value: T[] | string): T[] {
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value) as T[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mapRoom(row: RoomRow): Room {
  return {
    id: row.id,
    hotel: row.hotel,
    nights: (row.nights === 1 ? 1 : 2) as 1 | 2,
    occupants: parseJsonArray<string>(row.occupants),
    label: row.label ?? undefined
  };
}

function mapInvitation(row: InvitationRow): Invitation {
  return {
    id: row.id,
    token: row.token,
    partyName: row.party_name,
    members: parseJsonArray<string>(row.members),
    invitedEvents: parseJsonArray<EventId>(row.invited_events),
    roomId: row.room_id,
    previewHint: row.preview_hint
  };
}

export async function listWeddingData() {
  await ensureSeedData();
  const rooms = (await sql<RoomRow>('select * from rooms order by created_at asc')).map(mapRoom);
  const invitations = (await sql<InvitationRow>('select * from invitations order by created_at asc')).map(mapInvitation);
  return { rooms, invitations };
}

export async function getInvitationByToken(token: string) {
  await ensureSeedData();
  const invitations = await sql<InvitationRow>('select * from invitations where lower(token) = lower($1) limit 1', [
    token.trim()
  ]);
  const invitation = invitations[0] ? mapInvitation(invitations[0]) : null;
  if (!invitation) return null;
  let room: Room | null = null;
  if (invitation.roomId) {
    const rooms = await sql<RoomRow>('select * from rooms where id = $1 limit 1', [invitation.roomId]);
    room = rooms[0] ? mapRoom(rooms[0]) : null;
  }
  return { invitation, room };
}

export async function upsertRoom(input: {
  id: string;
  hotel: HotelId;
  nights: 1 | 2;
  occupants: string[];
  label?: string;
}) {
  await ensureSeedData();
  await sql(
    `insert into rooms (id, hotel, nights, occupants, label)
     values ($1, $2, $3, $4::jsonb, $5)
     on conflict (id) do update set
       hotel = excluded.hotel,
       nights = excluded.nights,
       occupants = excluded.occupants,
       label = excluded.label`,
    [input.id, input.hotel, input.nights, JSON.stringify(input.occupants), input.label ?? null]
  );
  const rows = await sql<RoomRow>('select * from rooms where id = $1', [input.id]);
  return mapRoom(rows[0]);
}

export async function removeRoom(id: string) {
  await ensureSeedData();
  await sql('update invitations set room_id = null where room_id = $1', [id]);
  await sql('delete from rooms where id = $1', [id]);
}

export async function upsertInvitation(input: {
  id: string;
  token: string;
  partyName: string;
  members: string[];
  invitedEvents: EventId[];
  roomId: string | null;
  previewHint: string;
}) {
  await ensureSeedData();
  await sql(
    `insert into invitations (id, token, party_name, members, invited_events, room_id, preview_hint)
     values ($1, $2, $3, $4::jsonb, $5::jsonb, $6, $7)
     on conflict (id) do update set
       token = excluded.token,
       party_name = excluded.party_name,
       members = excluded.members,
       invited_events = excluded.invited_events,
       room_id = excluded.room_id,
       preview_hint = excluded.preview_hint`,
    [
      input.id,
      input.token,
      input.partyName,
      JSON.stringify(input.members),
      JSON.stringify(input.invitedEvents),
      input.roomId,
      input.previewHint
    ]
  );
  const rows = await sql<InvitationRow>('select * from invitations where id = $1', [input.id]);
  return mapInvitation(rows[0]);
}

export async function removeInvitation(id: string) {
  await ensureSeedData();
  await sql('delete from invitations where id = $1', [id]);
}
