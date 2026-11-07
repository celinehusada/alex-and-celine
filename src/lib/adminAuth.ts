export function requireAdmin(request: Request): Response | null {
  const expected = process.env.ADMIN_TOKEN?.trim() ?? '';
  if (expected === '') {
    // Local / sample: allow writes when no production database is attached.
    if (process.env.DATABASE_URL?.trim()) {
      return Response.json(
        { error: 'admin_token_unset', message: 'Set the ADMIN_TOKEN app secret before managing live guest data.' },
        { status: 503 }
      );
    }
    return null;
  }

  const auth = request.headers.get('authorization') ?? '';
  if (auth !== `Bearer ${expected}`) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }
  return null;
}
