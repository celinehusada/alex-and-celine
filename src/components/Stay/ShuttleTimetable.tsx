import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatTime } from '../../utils/time';
import type { Hotel } from '../../types/wedding';

type Shuttles = NonNullable<Hotel['shuttles']>;

export function ShuttleTimetable({ shuttles }: {shuttles: Shuttles;}) {
  const { t, lang } = useLanguage();
  const groups = [
  { title: t({ en: 'To The Ritz-Carlton', id: 'Menuju The Ritz-Carlton' }), runs: shuttles.outbound },
  { title: t({ en: 'Back to Sunrise Aventus', id: 'Kembali ke Sunrise Aventus' }), runs: shuttles.inbound }];


  return (
    <div className="mt-6 grid gap-8">
      {groups.map((group) =>
      <table key={group.title} className="w-full text-left">
          <caption className="pb-2 text-left text-sm text-ivory/55">{group.title}</caption>
          <tbody>
            {group.runs.map((run) =>
          <tr key={run.time} className="border-t border-ivory/15">
                <th scope="row" className="w-28 whitespace-nowrap py-3 font-display text-2xl font-normal tabular-nums">
                  {formatTime(run.time, lang)}
                </th>
                <td className="py-3 text-sm text-ivory/70">{t(run.label)}</td>
              </tr>
          )}
          </tbody>
        </table>
      )}
      <p className="text-sm text-ivory/55">
        {t({
          en: 'Shuttles leave from the Sunrise Aventus lobby and the Ritz-Carlton main entrance.',
          id: 'Shuttle berangkat dari lobi Sunrise Aventus dan pintu masuk utama The Ritz-Carlton.'
        })}
      </p>
    </div>);

}