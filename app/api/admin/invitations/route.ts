import { randomUUID } from 'node:crypto';
import { requireAdmin } from '../../../../src/lib/adminAuth';
import { removeInvitation, upsertInvitation } from '../../../../src/lib/weddingRepo';
import type { EventId } from '../../../../src/types/wedding';

export const dynamic = 'force-dynamic';

type Body = {
  id?: string;
  token?: string;
  partyName?: string;
  members?: string[];
  invitedEvents?: EventId[];
  roomId?: string | null;
  previewHint?: string;
};

function newInviteToken() {
  return `inv_${randomUUID().replace(/-/g, '')}`;
}

async function write(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const body = (await request.json()) as Body;
  const partyName = body.partyName?.trim() ?? '';
  const members = (body.members ?? []).map((m) => m.trim()).filter(Boolean);
  if (!partyName || members.length === 0) {
    return Response.json({ error: 'invalid_body' }, { status: 400 });
  }

  const explicit = body.token?.trim().toLowerCase() ?? '';
  // Never derive tokens from party names — they must be unguessable.
  const token = explicit.length >= 20 ? explicit : newInviteToken();

  const invitation = await upsertInvitation({
    id: body.id?.trim() || `inv-${randomUUID().slice(0, 8)}`,
    token,
    partyName,
    members,
    invitedEvents: body.invitedEvents ?? [],
    roomId: body.roomId ?? null,
    previewHint: body.previewHint?.trim() || 'guest'
  });

  return Response.json(invitation);
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
  await removeInvitation(id);
  return new Response(null, { status: 204 });
}
