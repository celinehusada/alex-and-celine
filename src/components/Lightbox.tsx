import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';
import type { GalleryPhoto } from '../types/wedding';
import { useLanguage } from '../contexts/LanguageContext';

interface LightboxProps {
  city: string;
  photos: GalleryPhoto[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}

const ease = [0.23, 1, 0.32, 1] as const;

export function Lightbox({ city, photos, index, onChange, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();
  const photo = photos[index];
  const prev = () => onChange((index - 1 + photos.length) % photos.length);
  const next = () => onChange((index + 1) % photos.length);

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onChange((index - 1 + photos.length) % photos.length);
      if (e.key === 'ArrowRight') onChange((index + 1) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, photos.length, onChange, onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={city}
      className="fixed inset-0 z-[70] flex flex-col bg-night/95 text-ivory"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease }}
      onClick={onClose}>
      
      <div className="flex items-center justify-between px-6 py-5 md:px-10">
        <p className="font-display text-2xl">{city}</p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t({ en: 'Close gallery', id: 'Tutup galeri' })}
          className="rounded-full p-2 text-ivory/80 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush">
          
          <XIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-6 md:px-24" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={photo.src}
            className="flex max-h-full flex-col items-center"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease }}>
            
            <img src={photo.src} alt={photo.alt} className="max-h-[72vh] w-auto rounded-md object-contain" />
            <figcaption className="mt-4 text-center">
              <span className="font-display text-xl italic">{t(photo.caption)}</span>
              <span className="ml-3 text-sm tabular-nums text-ivory/50">
                {index + 1} / {photos.length}
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        <button
          type="button"
          onClick={prev}
          aria-label={t({ en: 'Previous photo', id: 'Foto sebelumnya' })}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-ivory/25 p-3 text-ivory/80 transition-colors duration-150 hover:bg-ivory hover:text-night md:left-8">
          
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label={t({ en: 'Next photo', id: 'Foto berikutnya' })}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-ivory/25 p-3 text-ivory/80 transition-colors duration-150 hover:bg-ivory hover:text-night md:right-8">
          
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="h-10" />
    </motion.div>);

}