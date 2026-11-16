import { randomUUID } from 'node:crypto';
import { requireAdmin } from '../../../../src/lib/adminAuth';
import { removeRoom, upsertRoom } from '../../../../src/lib/weddingRepo';
import type { HotelId } from '../../../../src/types/wedding';

export const dynamic = 'force-dynamic';

type Body = {
  id?: string;
  hotel?: HotelId;
  nights?: 1 | 2;
  occupants?: string[];
  label?: string;
};

async function write(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const body = (await request.json()) as Body;
  const occupants = (body.occupants ?? []).map((o) => o.trim()).filter(Boolean);
  if (!body.hotel || occupants.length === 0) {
    return Response.json({ error: 'invalid_body' }, { status: 400 });
  }

  const room = await upsertRoom({
    id: body.id?.trim() || `room-${randomUUID().slice(0, 8)}`,
    hotel: body.hotel,
    nights: body.nights === 1 ? 1 : 2,
    occupants,
    label: body.label?.trim() || undefined
  });

  return Response.json(room);
}

export async function POST(request: Request) {
  return write(request);
}

export async function PUT(request: Request) {
  return write(request);
}

export async function DELETE(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const id = new URL(request.url).searchParams.get('id')?.trim();
  if (!id) return Response.json({ error: 'missing_id' }, { status: 400 });
  await removeRoom(id);
  return new Response(null, { status: 204 });
}
