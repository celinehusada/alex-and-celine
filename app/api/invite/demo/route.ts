import { DEMO_INVITE_TOKEN } from '../../../../src/server/seed';
import { getInvitationByToken } from '../../../../src/lib/weddingRepo';

export const dynamic = 'force-dynamic';

/** Hands out one labeled sample invitation only — never the full guest list. */
export async function GET() {
  const match = await getInvitationByToken(DEMO_INVITE_TOKEN);
  if (!match) {
    return Response.json({ error: 'demo_unavailable' }, { status: 404 });
  }
  return Response.json(
    {
      token: DEMO_INVITE_TOKEN,
      partyName: match.invitation.partyName,
      previewHint: match.invitation.previewHint
    },
    { headers: { 'cache-control': 'private, no-store' } }
  );
}
