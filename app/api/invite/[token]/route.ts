import { getInvitationByToken } from '../../../../src/lib/weddingRepo';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, context: { params: { token: string } }) {
  const match = await getInvitationByToken(context.params.token);
  if (!match) {
    return Response.json({ error: 'not_found' }, { status: 404 });
  }
  return Response.json(match, { headers: { 'cache-control': 'private, no-store' } });
}
