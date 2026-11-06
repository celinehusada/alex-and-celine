import React from 'react';
import { Monogram } from './Monogram';
import { FruitSketch } from './FruitSketch';
import { coupleInstagram, hashtags } from '../data/couple';
import { useLanguage } from '../contexts/LanguageContext';
import type { SketchKind } from '../types/wedding';

// Fruit (his love language) woven with the food they cook and eat together
const sketchRow: SketchKind[] = [
'apple',
'dumpling',
'kiwi',
'noodles',
'grapes',
'wok',
'mandarin',
'egg',
'cherries',
'bao',
'mango',
'pot',
'lychee'];


export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-night text-ivory">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center md:px-10">
        <Monogram className="h-20 w-20" sunColor="#CDD0B6" moonColor="#E6CFC6" />
        <p className="mt-6 font-display text-4xl">
          Alex <span className="italic">&amp;</span> Celine
        </p>
        <p className="mt-2 text-sm text-ivory/60">22 · 08 · 2027 — Ritz Carlton Nusa Dua, Bali</p>
        <a
          href={`https://instagram.com/${coupleInstagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-sm text-blush underline-offset-4 hover:underline">
          
          @{coupleInstagram}
        </a>
        <p className="mt-2 flex flex-wrap justify-center gap-x-4 font-display text-lg italic text-ivory/80">
          {hashtags.map((tag) =>
          <span key={tag}>#{tag}</span>
          )}
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-3 text-blush/50 md:gap-5">
          {sketchRow.map((kind, i) =>
          <FruitSketch key={kind} kind={kind} drawInView delay={i * 0.04} className="h-7 w-7 md:h-8 md:w-8" />
          )}
        </div>
        <p className="mt-6 text-xs text-ivory/40">{t({ en: 'We can’t wait to celebrate with you.', id: 'Kami tidak sabar merayakannya bersama Anda.' })}</p>
      </div>
    </footer>);

}