import { getInvitationByToken } from '../../../../src/lib/weddingRepo';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, context: { params: { token: string } }) {
  const match = await getInvitationByToken(context.params.token);
  if (!match) {
    return Response.json({ error: 'not_found' }, { status: 404 });
  }

  // Return only this invitation's RSVP/stay details — never other guests or a token directory.
  const { invitation, room } = match;
  return Response.json(
    {
      invitation: {
        id: invitation.id,
        partyName: invitation.partyName,
        members: invitation.members,
        invitedEvents: invitation.invitedEvents,
        roomId: invitation.roomId,
        previewHint: invitation.previewHint
      },
      room: room
        ? {
            id: room.id,
            hotel: room.hotel,
            nights: room.nights,
            occupants: room.occupants,
            label: room.label
          }
        : null
    },
    { headers: { 'cache-control': 'private, no-store' } }
  );
}
