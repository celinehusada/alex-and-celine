import React from 'react';
import { GuestProvider } from './contexts/GuestContext';
import { WishesProvider } from './contexts/WishesContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Home } from './pages/Home';

interface AppProps {
  showInvitationIntro?: boolean;
}

export function App({ showInvitationIntro = true }: AppProps) {
  return (
    <LanguageProvider>
      <GuestProvider>
        <WishesProvider>
          <Home showIntro={showInvitationIntro} />
        </WishesProvider>
      </GuestProvider>
    </LanguageProvider>);

}