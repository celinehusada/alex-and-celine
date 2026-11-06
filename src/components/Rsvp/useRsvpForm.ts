import React, { useCallback, useMemo, useState } from 'react';
import { useWishes } from '../../contexts/WishesContext';
import { useGuest } from '../../contexts/GuestContext';
import type { EventId, Guest, StayChoice } from '../../types/wedding';
import type { Localized } from '../../types/i18n';

export type MemberResponse = 'yes' | 'no' | null;
type FormStatus = 'editing' | 'submitting' | 'submitted';
export type InvalidField = 'responses' | 'events' | 'email' | 'phone' | null;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RsvpDraft = {
  code: string;
  responses: Record<string, MemberResponse>;
  vegetarian: Record<string, boolean>;
  selectedEvents: EventId[];
  email: string;
  phone: string;
  dietary: string;
  message: string;
  shareWish: boolean;
  stayChoice: StayChoice;
  status: FormStatus;
};

export function useRsvpForm(guest: Guest) {
  const { upsertWish, removeWish } = useWishes();
  const {
    stayChoice: savedStayChoice,
    setStayChoice: commitStayChoice,
    saveRsvpDraft,
    loadRsvpDraft
  } = useGuest();

  const draft = (() => {
    const raw = loadRsvpDraft();
    if (!raw || typeof raw !== 'object') return null;
    const parsed = raw as Partial<RsvpDraft>;
    return parsed.code === guest.code ? (parsed as RsvpDraft) : null;
  })();

  const [stayChoice, setStayChoice] = useState<StayChoice>(draft?.stayChoice ?? savedStayChoice);
  const [responses, setResponses] = useState<Record<string, MemberResponse>>(
    () => draft?.responses ?? Object.fromEntries(guest.members.map((m) => [m, null]))
  );
  const [vegetarian, setVegetarian] = useState<Record<string, boolean>>(
    () => draft?.vegetarian ?? Object.fromEntries(guest.members.map((m) => [m, false]))
  );
  const [selectedEvents, setSelectedEvents] = useState<EventId[]>(draft?.selectedEvents ?? guest.invitedEvents);
  const [email, setEmail] = useState(draft?.email ?? '');
  const [phone, setPhone] = useState(draft?.phone ?? '');
  const [dietary, setDietary] = useState(draft?.dietary ?? '');
  const [message, setMessage] = useState(draft?.message ?? '');
  const [shareWish, setShareWish] = useState(draft?.shareWish ?? true);
  const [error, setError] = useState<Localized | null>(null);
  const [invalidField, setInvalidField] = useState<InvalidField>(null);
  const [status, setStatus] = useState<FormStatus>(draft?.status === 'submitted' ? 'submitted' : 'editing');

  const attending = useMemo(() => guest.members.filter((m) => responses[m] === 'yes'), [guest, responses]);
  const anyoneAttending = attending.length > 0;
  const wishShared = shareWish && message.trim().length > 0;

  const clearError = () => {
    setError(null);
    setInvalidField(null);
  };

  const setResponse = useCallback((member: string, value: MemberResponse) => {
    setResponses((prev) => ({ ...prev, [member]: value }));
    setError(null);
    setInvalidField(null);
  }, []);

  const toggleVegetarian = useCallback((member: string) => {
    setVegetarian((prev) => ({ ...prev, [member]: !prev[member] }));
  }, []);

  const toggleEvent = useCallback(
    (id: EventId) => {
      if (!guest.invitedEvents.includes(id)) return;
      setSelectedEvents((prev) => prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]);
      setError(null);
      setInvalidField(null);
    },
    [guest]
  );

  const fail = (field: InvalidField, text: Localized) => {
    setInvalidField(field);
    setError(text);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guest.members.some((m) => responses[m] === null)) {
      fail('responses', {
        en: 'Let us know for everyone in your party.',
        id: 'Mohon isi konfirmasi untuk semua tamu dalam undangan Anda.'
      });
      return;
    }
    if (anyoneAttending && selectedEvents.length === 0) {
      fail('events', { en: 'Pick at least one celebration to join.', id: 'Pilih setidaknya satu acara yang akan dihadiri.' });
      return;
    }
    if (!emailPattern.test(email.trim())) {
      fail('email', { en: 'Please add your email address.', id: 'Mohon isi alamat email Anda.' });
      return;
    }
    if (phone.replace(/[^\d]/g, '').length < 7) {
      fail('phone', {
        en: 'Please add your WhatsApp number so we can reach you in Bali.',
        id: 'Mohon isi nomor WhatsApp Anda agar kami dapat menghubungi Anda di Bali.'
      });
      return;
    }
    clearError();
    setStatus('submitting');
    window.setTimeout(() => {
      if (wishShared) upsertWish(guest.code, guest.partyName, message.trim());else
      removeWish(guest.code);
      commitStayChoice(stayChoice);
      const nextStatus: FormStatus = 'submitted';
      saveRsvpDraft({
        code: guest.code,
        responses,
        vegetarian,
        selectedEvents,
        email,
        phone,
        dietary,
        message,
        shareWish,
        stayChoice,
        status: nextStatus
      } satisfies RsvpDraft);
      setStatus(nextStatus);
    }, 900);
  };

  const edit = () => setStatus('editing');

  return {
    responses,
    setResponse,
    vegetarian,
    toggleVegetarian,
    selectedEvents,
    toggleEvent,
    email,
    setEmail: (v: string) => {
      setEmail(v);
      if (invalidField === 'email') clearError();
    },
    phone,
    setPhone: (v: string) => {
      setPhone(v);
      if (invalidField === 'phone') clearError();
    },
    dietary,
    setDietary,
    message,
    setMessage,
    shareWish,
    setShareWish,
    stayChoice,
    setStayChoice,
    wishShared,
    error,
    invalidField,
    status,
    attending,
    anyoneAttending,
    submit,
    edit
  };
}