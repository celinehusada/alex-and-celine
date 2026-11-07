import { getDemoInvitation } from '../../../../src/lib/weddingRepo';

export const dynamic = 'force-dynamic';

/** Hands out one labeled sample invitation from the DB — never a token from source. */
export async function GET() {
  const demo = await getDemoInvitation();
  if (!demo) {
    return Response.json({ error: 'demo_unavailable' }, { status: 404 });
  }
  return Response.json(demo, { headers: { 'cache-control': 'private, no-store' } });
}
