import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { Monogram } from './Monogram';
import { useGuest } from '../contexts/GuestContext';
import { useLanguage } from '../contexts/LanguageContext';
import type { Localized } from '../types/i18n';

const links: {href: string;label: Localized;}[] = [
{ href: '#us', label: { en: 'About us', id: 'Tentang kami' } },
{ href: '#story', label: { en: 'Our story', id: 'Kisah kami' } },
{ href: '#schedule', label: { en: 'Schedule', id: 'Jadwal' } },
{ href: '#shoots', label: { en: 'Gallery', id: 'Galeri' } },
{ href: '#dress-code', label: { en: 'Dress code', id: 'Dress code' } },
{ href: '#stay', label: { en: 'Stay', id: 'Akomodasi' } }];


export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || open;
  const { guest } = useGuest();
  // Stay details are personal — only link to them once the guest has found their invitation
  const visibleLinks = guest ? links : links.filter((l) => l.href !== '#stay');

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ease-out ${
      solid ? 'border-b border-ivory/10 bg-night/95 text-ivory backdrop-blur' : 'border-b border-transparent bg-transparent text-ivory'}`
      }>
      
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" aria-label="Alex & Celine" className="block">
          <Monogram className="h-10 w-10" sunColor="#F5F1E8" moonColor="#E6CFC6" />
        </a>
        <ul className="hidden items-center gap-7 text-sm lg:flex">
          {visibleLinks.map((link) =>
          <li key={link.href}>
              <a href={link.href} className="whitespace-nowrap opacity-80 transition-opacity duration-150 hover:opacity-100">
                {t(link.label)}
              </a>
            </li>
          )}
        </ul>
        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="#rsvp"
            className="whitespace-nowrap rounded-full bg-ivory px-5 py-2 text-sm font-medium text-burgundy transition-colors duration-200 hover:bg-blush">
            
            RSVP
          </a>
          <button
            type="button"
            className="rounded-full p-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t({ en: 'Close menu', id: 'Tutup menu' }) : t({ en: 'Open menu', id: 'Buka menu' })}
            onClick={() => setOpen((v) => !v)}>
            
            {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open &&
        <motion.ul
          id="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="border-t border-ivory/10 px-6 py-4 lg:hidden">
          
            {visibleLinks.map((link) =>
          <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)} className="block py-3 font-display text-2xl">
                  {t(link.label)}
                </a>
              </li>
          )}
          </motion.ul>
        }
      </AnimatePresence>
    </header>);

}