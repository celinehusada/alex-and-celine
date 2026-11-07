import { requireAdmin } from '../../../../src/lib/adminAuth';
import { listWeddingData } from '../../../../src/lib/weddingRepo';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const data = await listWeddingData();
  return Response.json(data, { headers: { 'cache-control': 'private, no-store' } });
}
