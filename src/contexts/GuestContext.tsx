import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchInvitationByToken } from '../lib/weddingApi';
import { readInviteTokenFromLocation, resolveGuest } from '../utils/invitation';
import type { Guest, StayChoice } from '../types/wedding';

type LookupStatus = 'idle' | 'loading' | 'error' | 'missing';

const GUEST_KEY = 'alex-celine-guest-code';
const STAY_KEY = 'alex-celine-stay-choice';
const RSVP_KEY = 'alex-celine-rsvp';

interface GuestContextValue {
  guest: Guest | null;
  status: LookupStatus;
  stayChoice: StayChoice;
  setStayChoice: (choice: StayChoice) => void;
  openInvitation: (token: string) => Promise<boolean>;
  clearGuest: () => void;
  saveRsvpDraft: (payload: unknown) => void;
  loadRsvpDraft: () => unknown | null;
}

const GuestContext = createContext<GuestContextValue | null>(null);

function loadStay(): StayChoice {
  try {
    const raw = localStorage.getItem(STAY_KEY);
    return raw === 'own' ? 'own' : 'provided';
  } catch {
    return 'provided';
  }
}

export function GuestProvider({ children }: { children: React.ReactNode }) {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [status, setStatus] = useState<LookupStatus>('loading');
  const [stayChoice, setStayChoiceState] = useState<StayChoice>(loadStay);
  const [booted, setBooted] = useState(false);

  const setStayChoice = useCallback((choice: StayChoice) => {
    setStayChoiceState(choice);
    try {
      localStorage.setItem(STAY_KEY, choice);
    } catch {
      // ignore
    }
  }, []);

  const openInvitation = useCallback(
    async (token: string) => {
      setStatus('loading');
      const match = await fetchInvitationByToken(token);
      if (!match) {
        setGuest(null);
        setStatus('error');
        return false;
      }
      const resolved =
        match.room || match.invitation.roomId
          ? resolveGuest(match.invitation, match.room ? [match.room] : [])
          : resolveGuest(match.invitation, []);
      // If roomId set but room missing from single-room array, still show invitation without room occupants
      const guestView: Guest =
        resolved ??
        ({
          code: match.invitation.token,
          partyName: match.invitation.partyName,
          members: match.invitation.members,
          invitedEvents: match.invitation.invitedEvents,
          hotel: match.room?.hotel ?? 'ritz',
          nights: match.room?.nights,
          roomWith: match.room?.occupants,
          previewHint: match.invitation.previewHint,
          roomId: match.invitation.roomId
        } satisfies Guest);

      setGuest(guestView);
      setStayChoice('provided');
      setStatus('idle');
      try {
        localStorage.setItem(GUEST_KEY, guestView.code);
        const url = new URL(window.location.href);
        url.searchParams.set('invite', guestView.code);
        window.history.replaceState({}, '', url.toString());
      } catch {
        // ignore
      }
      return true;
    },
    [setStayChoice]
  );

  useEffect(() => {
    if (booted) return;
    setBooted(true);

    const boot = async () => {
      const fromUrl = readInviteTokenFromLocation();
      if (fromUrl) {
        await openInvitation(fromUrl);
        return;
      }

      try {
        const saved = localStorage.getItem(GUEST_KEY);
        if (saved) {
          const ok = await openInvitation(saved);
          if (ok) return;
        }
      } catch {
        // ignore
      }

      setStatus('missing');
    };

    void boot();
  }, [booted, openInvitation]);

  const clearGuest = useCallback(() => {
    setGuest(null);
    setStayChoice('provided');
    setStatus('missing');
    try {
      localStorage.removeItem(GUEST_KEY);
      localStorage.removeItem(RSVP_KEY);
      const url = new URL(window.location.href);
      url.searchParams.delete('invite');
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
  }, [setStayChoice]);

  const saveRsvpDraft = useCallback((payload: unknown) => {
    try {
      localStorage.setItem(RSVP_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
  }, []);

  const loadRsvpDraft = useCallback(() => {
    try {
      const raw = localStorage.getItem(RSVP_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const value = useMemo(
    () => ({
      guest,
      status,
      stayChoice,
      setStayChoice,
      openInvitation,
      clearGuest,
      saveRsvpDraft,
      loadRsvpDraft
    }),
    [guest, status, stayChoice, setStayChoice, openInvitation, clearGuest, saveRsvpDraft, loadRsvpDraft]
  );

  return <GuestContext.Provider value={value}>{children}</GuestContext.Provider>;
}

export function useGuest() {
  const ctx = useContext(GuestContext);
  if (!ctx) throw new Error('useGuest must be used within GuestProvider');
  return ctx;
}
