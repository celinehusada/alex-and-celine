import React, { useState } from 'react';
import { Loader2Icon } from 'lucide-react';
import { useGuest } from '../../contexts/GuestContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { fetchDemoInviteToken } from '../../lib/weddingApi';

export function GuestLookup() {
  const { openInvitation, status } = useGuest();
  const { t } = useLanguage();
  const [demoBusy, setDemoBusy] = useState(false);
  const [demoError, setDemoError] = useState(false);
  const loading = status === 'loading' || demoBusy;
  const notFound = status === 'error';

  const tryDemo = async () => {
    setDemoBusy(true);
    setDemoError(false);
    const demo = await fetchDemoInviteToken();
    if (!demo) {
      setDemoError(true);
      setDemoBusy(false);
      return;
    }
    await openInvitation(demo.token);
    setDemoBusy(false);
  };

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

      {(notFound || demoError) && (
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
            en: 'Previewing the site? Open one sample invitation (does not list other guests):',
            id: 'Sedang melihat pratinjau? Buka satu contoh undangan (tanpa daftar tamu lain):'
          })}
        </p>
        <button
          type="button"
          onClick={() => void tryDemo()}
          disabled={loading}
          className="mt-3 whitespace-nowrap rounded-full border border-ivory/15 px-4 py-2 text-sm transition-colors duration-150 hover:border-blush hover:text-blush disabled:opacity-60"
        >
          {t({ en: 'Try a sample invitation', id: 'Coba contoh undangan' })}
        </button>
      </div>
    </div>
  );
}
