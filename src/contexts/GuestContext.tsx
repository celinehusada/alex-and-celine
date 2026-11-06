import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { guests } from '../data/guests';
import type { Guest, StayChoice } from '../types/wedding';

type LookupStatus = 'idle' | 'loading' | 'error';

const GUEST_KEY = 'alex-celine-guest-code';
const STAY_KEY = 'alex-celine-stay-choice';
const RSVP_KEY = 'alex-celine-rsvp';

interface GuestContextValue {
  guest: Guest | null;
  status: LookupStatus;
  stayChoice: StayChoice;
  setStayChoice: (choice: StayChoice) => void;
  findInvitation: (code: string) => Promise<boolean>;
  clearGuest: () => void;
  saveRsvpDraft: (payload: unknown) => void;
  loadRsvpDraft: () => unknown | null;
}

const GuestContext = createContext<GuestContextValue | null>(null);

function loadGuest(): Guest | null {
  try {
    const code = localStorage.getItem(GUEST_KEY);
    if (!code) return null;
    return guests.find((g) => g.code === code) ?? null;
  } catch {
    return null;
  }
}

function loadStay(): StayChoice {
  try {
    const raw = localStorage.getItem(STAY_KEY);
    return raw === 'own' ? 'own' : 'provided';
  } catch {
    return 'provided';
  }
}

export function GuestProvider({ children }: {children: React.ReactNode;}) {
  const [guest, setGuest] = useState<Guest | null>(loadGuest);
  const [status, setStatus] = useState<LookupStatus>('idle');
  const [stayChoice, setStayChoiceState] = useState<StayChoice>(loadStay);

  useEffect(() => {
    try {
      if (guest) localStorage.setItem(GUEST_KEY, guest.code);
      else localStorage.removeItem(GUEST_KEY);
    } catch {
      // Demo persistence is best-effort.
    }
  }, [guest]);

  const setStayChoice = useCallback((choice: StayChoice) => {
    setStayChoiceState(choice);
    try {
      localStorage.setItem(STAY_KEY, choice);
    } catch {
      // ignore
    }
  }, []);

  const findInvitation = useCallback(async (code: string) => {
    setStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 650));
    const normalized = code.trim().toUpperCase();
    const match = guests.find((g) => g.code === normalized);
    if (match) {
      setGuest(match);
      setStayChoice('provided');
      setStatus('idle');
      return true;
    }
    setStatus('error');
    return false;
  }, [setStayChoice]);

  const clearGuest = useCallback(() => {
    setGuest(null);
    setStayChoice('provided');
    setStatus('idle');
    try {
      localStorage.removeItem(RSVP_KEY);
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
      findInvitation,
      clearGuest,
      saveRsvpDraft,
      loadRsvpDraft
    }),
    [guest, status, stayChoice, setStayChoice, findInvitation, clearGuest, saveRsvpDraft, loadRsvpDraft]
  );

  return <GuestContext.Provider value={value}>{children}</GuestContext.Provider>;
}

export function useGuest() {
  const ctx = useContext(GuestContext);
  if (!ctx) throw new Error('useGuest must be used within GuestProvider');
  return ctx;
}