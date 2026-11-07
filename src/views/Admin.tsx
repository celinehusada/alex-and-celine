import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { events } from '../data/events';
import { hotels } from '../data/hotels';
import {
  deleteInvitation,
  deleteRoom,
  fetchDataset,
  getStoredAdminToken,
  resetLocalDataset,
  saveInvitation,
  saveRoom,
  setStoredAdminToken,
  type WeddingDataset
} from '../lib/weddingApi';
import { inviteUrl } from '../utils/invitation';
import type { EventId, HotelId, Invitation, Room } from '../types/wedding';

const allEventIds = events.map((e) => e.id);

function membersFromText(value: string) {
  return value
    .split(/,|\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function Admin() {
  const [dataset, setDataset] = useState<WeddingDataset | null>(null);
  const [adminToken, setAdminToken] = useState(getStoredAdminToken);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [origin, setOrigin] = useState('');

  const [partyName, setPartyName] = useState('');
  const [membersText, setMembersText] = useState('');
  const [token, setToken] = useState('');
  const [previewHint, setPreviewHint] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<EventId[]>(['welcome', 'matrimony', 'cocktails', 'reception', 'afterparty']);
  const [roomId, setRoomId] = useState<string>('');
  const [editingInviteId, setEditingInviteId] = useState<string | null>(null);

  const [roomLabel, setRoomLabel] = useState('');
  const [roomHotel, setRoomHotel] = useState<HotelId>('ritz');
  const [roomNights, setRoomNights] = useState<1 | 2>(2);
  const [occupantsText, setOccupantsText] = useState('');
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    const next = await fetchDataset();
    setDataset(next);
  }, []);

  useEffect(() => {
    setOrigin(window.location.origin);
    void reload();
  }, [reload]);

  const roomOptions = useMemo(() => dataset?.rooms ?? [], [dataset]);

  const resetInviteForm = () => {
    setEditingInviteId(null);
    setPartyName('');
    setMembersText('');
    setToken('');
    setPreviewHint('');
    setSelectedEvents(['welcome', 'matrimony', 'cocktails', 'reception', 'afterparty']);
    setRoomId('');
  };

  const resetRoomForm = () => {
    setEditingRoomId(null);
    setRoomLabel('');
    setRoomHotel('ritz');
    setRoomNights(2);
    setOccupantsText('');
  };

  const onSaveInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      await saveInvitation({
        id: editingInviteId ?? undefined,
        token: token || undefined,
        partyName,
        members: membersFromText(membersText),
        invitedEvents: selectedEvents,
        roomId: roomId || null,
        previewHint
      });
      resetInviteForm();
      await reload();
      setMessage('Invitation saved.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save invitation.');
    } finally {
      setBusy(false);
    }
  };

  const onSaveRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      await saveRoom({
        id: editingRoomId ?? undefined,
        hotel: roomHotel,
        nights: roomNights,
        occupants: membersFromText(occupantsText),
        label: roomLabel
      });
      resetRoomForm();
      await reload();
      setMessage('Room saved.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save room.');
    } finally {
      setBusy(false);
    }
  };

  const editInvitation = (invitation: Invitation) => {
    setEditingInviteId(invitation.id);
    setPartyName(invitation.partyName);
    setMembersText(invitation.members.join(', '));
    setToken(invitation.token);
    setPreviewHint(invitation.previewHint);
    setSelectedEvents(invitation.invitedEvents);
    setRoomId(invitation.roomId ?? '');
  };

  const editRoom = (room: Room) => {
    setEditingRoomId(room.id);
    setRoomLabel(room.label ?? '');
    setRoomHotel(room.hotel);
    setRoomNights(room.nights ?? 2);
    setOccupantsText(room.occupants.join(', '));
  };

  return (
    <div className="min-h-screen bg-night px-6 py-10 text-ivory md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-ivory/15 pb-6">
          <div>
            <p className="text-sm text-ivory/55">Alex & Celine</p>
            <h1 className="font-display text-4xl md:text-5xl">Guest & room manager</h1>
            <p className="mt-2 max-w-2xl text-sm text-ivory/65">
              Invitations and rooms are separate. Pair people from different families in one room, then send each party their own personal RSVP link.
            </p>
          </div>
          <a href="/" className="rounded-full border border-ivory/25 px-4 py-2 text-sm hover:border-blush hover:text-blush">
            ← Back to site
          </a>
        </header>

        <section className="grid gap-4 rounded-2xl border border-ivory/10 bg-oxblood/40 p-5 md:grid-cols-[1fr_auto] md:items-end">
          <label className="block text-sm">
            <span className="text-ivory/60">Admin token (from Cursor app secrets · leave blank for on-device sample data)</span>
            <input
              value={adminToken}
              onChange={(e) => setAdminToken(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-ivory/20 bg-night px-3"
              placeholder="ADMIN_TOKEN"
              autoComplete="off"
            />
          </label>
          <button
            type="button"
            className="h-11 rounded-full bg-blush px-5 font-medium text-oxblood"
            onClick={() => {
              setStoredAdminToken(adminToken.trim());
              setMessage('Admin token saved for this browser session.');
              void reload();
            }}
          >
            Save token
          </button>
          <p className="md:col-span-2 text-xs text-ivory/50">
            Data source: {dataset?.source ?? '…'}. Sample mode keeps edits in this browser until Postgres + ADMIN_TOKEN are connected on publish.
          </p>
        </section>

        {message && <p className="rounded-xl border border-blush/30 bg-blush/10 px-4 py-3 text-sm text-blush">{message}</p>}

        <div className="grid gap-10 lg:grid-cols-2">
          <section className="rounded-2xl border border-ivory/10 p-5">
            <h2 className="font-display text-3xl">Rooms</h2>
            <p className="mt-1 text-sm text-ivory/60">Hotel bookings. Occupants can mix across invitations.</p>
            <form onSubmit={onSaveRoom} className="mt-5 space-y-3">
              <input
                value={roomLabel}
                onChange={(e) => setRoomLabel(e.target.value)}
                placeholder="Label (e.g. Marcus & Kenji)"
                className="h-11 w-full rounded-xl border border-ivory/20 bg-night px-3"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={roomHotel}
                  onChange={(e) => setRoomHotel(e.target.value as HotelId)}
                  className="h-11 rounded-xl border border-ivory/20 bg-night px-3"
                >
                  {hotels.map((hotel) => (
                    <option key={hotel.id} value={hotel.id}>
                      {hotel.name}
                    </option>
                  ))}
                </select>
                <select
                  value={roomNights}
                  onChange={(e) => setRoomNights(Number(e.target.value) as 1 | 2)}
                  className="h-11 rounded-xl border border-ivory/20 bg-night px-3"
                >
                  <option value={1}>1 night</option>
                  <option value={2}>2 nights</option>
                </select>
              </div>
              <textarea
                value={occupantsText}
                onChange={(e) => setOccupantsText(e.target.value)}
                placeholder="Occupants, comma-separated (can be different families)"
                className="min-h-[88px] w-full rounded-xl border border-ivory/20 bg-night px-3 py-2"
                required
              />
              <div className="flex flex-wrap gap-2">
                <button type="submit" disabled={busy} className="rounded-full bg-ivory px-5 py-2 text-sm font-medium text-burgundy disabled:opacity-60">
                  {editingRoomId ? 'Update room' : 'Add room'}
                </button>
                {editingRoomId && (
                  <button type="button" onClick={resetRoomForm} className="rounded-full border border-ivory/25 px-4 py-2 text-sm">
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <ul className="mt-6 space-y-3">
              {(dataset?.rooms ?? []).map((room) => (
                <li key={room.id} className="rounded-xl border border-ivory/10 px-4 py-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-display text-xl">{room.label || room.id}</p>
                      <p className="text-sm text-ivory/60">
                        {hotels.find((h) => h.id === room.hotel)?.name} · {room.nights ?? 2} night(s)
                      </p>
                      <p className="mt-1 text-sm text-ivory/80">{room.occupants.join(' · ')}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" className="text-sm underline" onClick={() => editRoom(room)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-sm text-blush underline"
                        onClick={() => {
                          void deleteRoom(room.id).then(reload);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-ivory/10 p-5">
            <h2 className="font-display text-3xl">Invitations</h2>
            <p className="mt-1 text-sm text-ivory/60">Personal RSVP links. Assign a room without merging families into one invite.</p>
            <form onSubmit={onSaveInvite} className="mt-5 space-y-3">
              <input
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
                placeholder="Party name"
                className="h-11 w-full rounded-xl border border-ivory/20 bg-night px-3"
                required
              />
              <textarea
                value={membersText}
                onChange={(e) => setMembersText(e.target.value)}
                placeholder="Guest names on this invitation, comma-separated"
                className="min-h-[88px] w-full rounded-xl border border-ivory/20 bg-night px-3 py-2"
                required
              />
              <input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Link token (optional, e.g. uni-marcus)"
                className="h-11 w-full rounded-xl border border-ivory/20 bg-night px-3"
              />
              <input
                value={previewHint}
                onChange={(e) => setPreviewHint(e.target.value)}
                placeholder="Short hint"
                className="h-11 w-full rounded-xl border border-ivory/20 bg-night px-3"
              />
              <select
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="h-11 w-full rounded-xl border border-ivory/20 bg-night px-3"
              >
                <option value="">No room assigned</option>
                {roomOptions.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.label || room.id} — {room.occupants.join(', ')}
                  </option>
                ))}
              </select>
              <fieldset className="rounded-xl border border-ivory/10 p-3">
                <legend className="px-1 text-sm text-ivory/60">Invited events</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {allEventIds.map((id) => {
                    const event = events.find((item) => item.id === id);
                    const checked = selectedEvents.includes(id);
                    return (
                      <label key={id} className={`cursor-pointer rounded-full border px-3 py-1 text-xs ${checked ? 'border-blush bg-blush/15' : 'border-ivory/20'}`}>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() =>
                            setSelectedEvents((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
                          }
                        />
                        {event?.name.en ?? id}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <div className="flex flex-wrap gap-2">
                <button type="submit" disabled={busy} className="rounded-full bg-ivory px-5 py-2 text-sm font-medium text-burgundy disabled:opacity-60">
                  {editingInviteId ? 'Update invitation' : 'Add invitation'}
                </button>
                {editingInviteId && (
                  <button type="button" onClick={resetInviteForm} className="rounded-full border border-ivory/25 px-4 py-2 text-sm">
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <ul className="mt-6 space-y-3">
              {(dataset?.invitations ?? []).map((invitation) => {
                const room = dataset?.rooms.find((r) => r.id === invitation.roomId);
                return (
                  <li key={invitation.id} className="rounded-xl border border-ivory/10 px-4 py-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-xl">{invitation.partyName}</p>
                        <p className="text-sm text-ivory/60">{invitation.members.join(' · ')}</p>
                        <p className="mt-1 break-all text-xs text-blush/90">{origin ? inviteUrl(invitation.token, origin) : invitation.token}</p>
                        <p className="mt-1 text-xs text-ivory/50">
                          Room: {room ? `${room.label || room.id} (${room.occupants.join(', ')})` : 'none'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="text-sm underline" onClick={() => editInvitation(invitation)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-sm text-blush underline"
                          onClick={() => {
                            void deleteInvitation(invitation.id).then(reload);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-ivory/10 pt-6">
          <button
            type="button"
            className="rounded-full border border-ivory/25 px-4 py-2 text-sm"
            onClick={() => {
              void resetLocalDataset().then(reload);
              setMessage('Local sample overrides cleared.');
            }}
          >
            Reset on-device sample data
          </button>
        </div>
      </div>
    </div>
  );
}
