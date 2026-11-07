import { listWeddingData } from '../../../src/lib/weddingRepo';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await listWeddingData();
  return Response.json(data, { headers: { 'cache-control': 'no-store' } });
}
