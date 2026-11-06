import React, { createContext, useContext, useEffect } from 'react';
import type { Lang, Localized } from '../types/i18n';

interface LanguageContextValue {
  lang: Lang;
  /** Pick the site copy (English only) */
  t: (copy: Localized) => string;
}

const value: LanguageContextValue = { lang: 'en', t: (copy) => copy.en };
const LanguageContext = createContext<LanguageContextValue>(value);

export function LanguageProvider({ children }: {children: React.ReactNode;}) {
  useEffect(() => {
    document.documentElement.lang = 'en';
  }, []);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}