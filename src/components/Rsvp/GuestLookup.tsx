import React, { useState } from 'react';
import { Loader2Icon } from 'lucide-react';
import { useGuest } from '../../contexts/GuestContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { guests } from '../../data/guests';

export function GuestLookup() {
  const { findInvitation, status } = useGuest();
  const { t } = useLanguage();
  const [code, setCode] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const loading = status === 'loading';
  const notFound = status === 'error';

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setEmptyError(true);
      return;
    }
    setEmptyError(false);
    void findInvitation(code);
  };

  const tryCode = (sample: string) => {
    setCode(sample);
    setEmptyError(false);
    void findInvitation(sample);
  };

  const errorText = emptyError ?
  t({ en: 'Enter the code from your invitation.', id: 'Masukkan kode dari undangan Anda.' }) :
  notFound ?
  t({
    en: 'We couldn’t find that code. Double-check your invitation, or message Alex or Celine.',
    id: 'Kode tidak ditemukan. Mohon periksa kembali undangan Anda, atau hubungi Alex atau Celine.'
  }) :
  null;

  return (
    <div className="rounded-2xl bg-night p-6 text-ivory md:p-10">
      <h3 className="font-display text-3xl md:text-4xl">{t({ en: 'Find your invitation', id: 'Temukan undangan Anda' })}</h3>
      <p className="mt-2 max-w-md text-ivory/65">
        {t({ en: 'Enter the code printed on your invitation card.', id: 'Masukkan kode yang tertera di kartu undangan Anda.' })}
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="invite-code" className="sr-only">
          {t({ en: 'Invitation code', id: 'Kode undangan' })}
        </label>
        <input
          id="invite-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={t({ en: 'e.g. HK-CREW', id: 'contoh: HK-CREW' })}
          autoComplete="off"
          aria-invalid={Boolean(errorText)}
          aria-describedby={errorText ? 'invite-code-error' : undefined}
          className="h-12 flex-1 rounded-full border border-ivory/20 bg-ivory/[0.04] px-5 uppercase tracking-wider text-ivory placeholder:normal-case placeholder:tracking-normal placeholder:text-ivory/35 focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20" />
        
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-blush px-7 font-medium text-oxblood transition-colors duration-150 hover:bg-ivory disabled:opacity-70">
          
          {loading && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {loading ? t({ en: 'Finding…', id: 'Mencari…' }) : t({ en: 'Find invitation', id: 'Cari undangan' })}
        </button>
      </form>
      {errorText &&
      <p id="invite-code-error" role="alert" className="mt-3 text-sm text-blush">
          {errorText}
        </p>
      }

      <div className="mt-10 border-t border-ivory/10 pt-6">
        <p className="text-sm text-ivory/55">
          {t({ en: 'Previewing the site? Try a sample invitation:', id: 'Sedang melihat pratinjau? Coba contoh undangan:' })}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {guests.map((g) =>
          <button
            key={g.code}
            type="button"
            onClick={() => tryCode(g.code)}
            disabled={loading}
            className="whitespace-nowrap rounded-full border border-ivory/15 px-3 py-1.5 text-xs transition-colors duration-150 hover:border-blush hover:text-blush">
            
              {g.code} <span className="text-ivory/50">· {g.previewHint}</span>
            </button>
          )}
        </div>
      </div>
    </div>);

}