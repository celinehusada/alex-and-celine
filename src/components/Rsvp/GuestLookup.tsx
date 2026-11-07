import React, { useEffect, useState } from 'react';
import { Loader2Icon } from 'lucide-react';
import { useGuest } from '../../contexts/GuestContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { seedInvitations } from '../../data/invitations';
import { inviteUrl } from '../../utils/invitation';

export function GuestLookup() {
  const { openInvitation, status } = useGuest();
  const { t } = useLanguage();
  const [origin, setOrigin] = useState('');
  const loading = status === 'loading';
  const notFound = status === 'error';

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <div className="rounded-2xl bg-night p-6 text-ivory md:p-10">
      <h3 className="font-display text-3xl md:text-4xl">
        {t({ en: 'Your personal invitation', id: 'Undangan pribadi Anda' })}
      </h3>
      <p className="mt-2 max-w-md text-ivory/65">
        {t({
          en: 'No code needed — open the personal link we sent you. It already knows who you are.',
          id: 'Tidak perlu kode — buka tautan pribadi yang kami kirim. Tautan itu sudah terhubung ke undangan Anda.'
        })}
      </p>

      {loading && (
        <p className="mt-6 inline-flex items-center gap-2 text-sm text-ivory/70">
          <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />
          {t({ en: 'Opening your invitation…', id: 'Membuka undangan Anda…' })}
        </p>
      )}

      {notFound && (
        <p role="alert" className="mt-6 text-sm text-blush">
          {t({
            en: 'We couldn’t find that invitation link. Double-check the URL, or message Alex or Celine.',
            id: 'Tautan undangan tidak ditemukan. Mohon periksa kembali URL-nya, atau hubungi Alex atau Celine.'
          })}
        </p>
      )}

      <div className="mt-10 border-t border-ivory/10 pt-6">
        <p className="text-sm text-ivory/55">
          {t({
            en: 'Previewing the site? Open a sample guest link:',
            id: 'Sedang melihat pratinjau? Buka contoh tautan tamu:'
          })}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {seedInvitations.map((invitation) => (
            <button
              key={invitation.id}
              type="button"
              onClick={() => void openInvitation(invitation.token)}
              disabled={loading}
              className="whitespace-nowrap rounded-full border border-ivory/15 px-3 py-1.5 text-xs transition-colors duration-150 hover:border-blush hover:text-blush"
              title={origin ? inviteUrl(invitation.token, origin) : invitation.token}
            >
              {invitation.partyName} <span className="text-ivory/50">· {invitation.previewHint}</span>
            </button>
          ))}
        </div>
        {origin && (
          <p className="mt-4 break-all text-xs text-ivory/40">
            {t({ en: 'Link shape:', id: 'Bentuk tautan:' })} {inviteUrl('your-token', origin)}
          </p>
        )}
      </div>
    </div>
  );
}
