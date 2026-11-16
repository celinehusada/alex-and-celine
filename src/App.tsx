import React from 'react';
import { GuestProvider } from './contexts/GuestContext';
import { WishesProvider } from './contexts/WishesContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Home } from './views/Home';
import { Admin } from './views/Admin';

interface AppProps {
  showInvitationIntro?: boolean;
  mode?: 'site' | 'admin';
}

export function App({ showInvitationIntro = true, mode = 'site' }: AppProps) {
  if (mode === 'admin') {
    return <Admin />;
  }

  return (
    <LanguageProvider>
      <GuestProvider>
        <WishesProvider>
          <Home showIntro={showInvitationIntro} />
        </WishesProvider>
      </GuestProvider>
    </LanguageProvider>
  );
}
