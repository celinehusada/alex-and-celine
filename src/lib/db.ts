import { randomUUID } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import pg from 'pg';

const databaseUrl = process.env.DATABASE_URL?.trim() ?? '';
let pool: pg.Pool | undefined;
let local: Promise<PGlite> | undefined;
let seeded = false;

function newInviteToken() {
  return `inv_${randomUUID().replace(/-/g, '')}`;
}

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
  // Shared on-disk store so every Next route handler sees the same runtime-generated tokens.
  const dataDir = path.join(process.cwd(), '.pglite-data');
  const db = new PGlite(dataDir);
  const migrationsDir = path.join(process.cwd(), 'migrations');
  const files = (await readdir(migrationsDir).catch(() => [])).filter((f) => f.endsWith('.sql')).sort();
  for (const file of files) {
    await db.exec(await readFile(path.join(migrationsDir, file), 'utf8'));
  }
  return db;
}

export async function ensureSeedData() {
  if (seeded) return;
  const existing = await sql<{ count: string }>('select count(*)::text as count from invitations');
  if (Number(existing[0]?.count ?? 0) > 0) {
    seeded = true;
    return;
  }

  const { seedRooms, seedInvitations } = await import('../server/seed');

  for (const room of seedRooms) {
    await sql(
      `insert into rooms (id, hotel, nights, occupants, label)
       values ($1, $2, $3, $4::jsonb, $5)
       on conflict (id) do nothing`,
      [room.id, room.hotel, room.nights ?? 2, JSON.stringify(room.occupants), room.label ?? null]
    );
  }

  for (const invitation of seedInvitations) {
    // Tokens are created at seed time only — never committed as source constants.
    const token = newInviteToken();
    await sql(
      `insert into invitations (id, token, party_name, members, invited_events, room_id, preview_hint, is_demo)
       values ($1, $2, $3, $4::jsonb, $5::jsonb, $6, $7, $8)
       on conflict (id) do nothing`,
      [
        invitation.id,
        token,
        invitation.partyName,
        JSON.stringify(invitation.members),
        JSON.stringify(invitation.invitedEvents),
        invitation.roomId,
        invitation.previewHint,
        invitation.isDemo === true
      ]
    );
  }
  seeded = true;
}
