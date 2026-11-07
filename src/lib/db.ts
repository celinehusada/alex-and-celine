import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import pg from 'pg';

const databaseUrl = process.env.DATABASE_URL?.trim() ?? '';
let pool: pg.Pool | undefined;
let local: Promise<PGlite> | undefined;
let seeded = false;

export async function sql<T = Record<string, unknown>>(text: string, params: unknown[] = []): Promise<T[]> {
  if (databaseUrl !== '') {
    pool ??= new pg.Pool({ connectionString: databaseUrl, max: 5 });
    return (await pool.query(text, params)).rows as T[];
  }
  local ??= startLocal().catch((error: unknown) => {
    local = undefined;
    throw error;
  });
  return (await (await local).query<T>(text, params)).rows;
}

async function startLocal(): Promise<PGlite> {
  const db = new PGlite();
  const migrationsDir = path.join(process.cwd(), 'migrations');
  const files = (await readdir(migrationsDir).catch(() => [])).filter((f) => f.endsWith('.sql')).sort();
  for (const file of files) {
    await db.exec(await readFile(path.join(migrationsDir, file), 'utf8'));
  }
  return db;
}

export async function ensureSeedData() {
  if (seeded) return;
  const existing = await sql<{ count: string }>("select count(*)::text as count from invitations");
  if (Number(existing[0]?.count ?? 0) > 0) {
    seeded = true;
    return;
  }

  const { seedRooms } = await import('../data/rooms');
  const { seedInvitations } = await import('../data/invitations');

  for (const room of seedRooms) {
    await sql(
      `insert into rooms (id, hotel, nights, occupants, label)
       values ($1, $2, $3, $4::jsonb, $5)
       on conflict (id) do nothing`,
      [room.id, room.hotel, room.nights ?? 2, JSON.stringify(room.occupants), room.label ?? null]
    );
  }
  for (const invitation of seedInvitations) {
    await sql(
      `insert into invitations (id, token, party_name, members, invited_events, room_id, preview_hint)
       values ($1, $2, $3, $4::jsonb, $5::jsonb, $6, $7)
       on conflict (id) do nothing`,
      [
        invitation.id,
        invitation.token,
        invitation.partyName,
        JSON.stringify(invitation.members),
        JSON.stringify(invitation.invitedEvents),
        invitation.roomId,
        invitation.previewHint
      ]
    );
  }
  seeded = true;
}
