/** Admin routes always deny by default — never fail open. */
export function requireAdmin(request: Request): Response | null {
  const expected = process.env.ADMIN_TOKEN?.trim() ?? '';
  if (expected === '') {
    return Response.json(
      {
        error: 'admin_token_unset',
        message: 'Set the ADMIN_TOKEN app secret before managing guest data.'
      },
      { status: 503 }
    );
  }

  const auth = request.headers.get('authorization') ?? '';
  if (auth !== `Bearer ${expected}`) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }
  return null;
}
