import React from 'react';
import { RevealHeading } from './RevealHeading';
import { useLanguage } from '../contexts/LanguageContext';

export function Opposites() {
  const { t, lang } = useLanguage();

  const lines =
  lang === 'id' ?
  ['Yang kenal kami pasti tahu,', 'kami sangat bertolak belakang.', <span className="italic text-blush">Tapi entah bagaimana, cocok.</span>] :
  ['If you know us,', 'we’re polar opposites.', <span className="italic text-blush">But somehow it works.</span>];

  return (
    <section id="us" className="bg-night text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <RevealHeading key={lang} className="font-display text-5xl leading-[1.05] md:text-6xl" lines={lines} />
          <p className="max-w-md text-lg leading-relaxed text-ivory/70 md:justify-self-end">
            {t({
              en: 'Alex is calm, loves the outdoors and is happiest with a quiet weekend. Celine is always on the go and already planning the next thing, especially at night. Total opposites — and surprisingly, it works.',
              id: 'Alex tenang, suka alam terbuka, dan paling bahagia dengan akhir pekan yang santai. Celine selalu sibuk dan sudah merencanakan hal berikutnya, terutama di malam hari. Benar-benar bertolak belakang — dan ternyata justru cocok.'
            })}
          </p>
        </div>
      </div>
    </section>);

}