import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Nav } from '../components/Nav';
import { Hero } from '../components/Hero';
import { Opposites } from '../components/Opposites';
import { Story } from '../components/Story';
import { Shoots } from '../components/Shoots';
import { Schedule } from '../components/Schedule';
import { CivilSigning } from '../components/CivilSigning';
import { DressCode } from '../components/DressCode';
import { RsvpSection } from '../components/Rsvp/RsvpSection';
import { Stay } from '../components/Stay/Stay';
import { Footer } from '../components/Footer';
import { InvitationIntro } from '../components/InvitationIntro';

export function Home({ showIntro = true }: {showIntro?: boolean;}) {
  const [introOpen, setIntroOpen] = useState(showIntro);

  return (
    <div className="min-h-screen w-full bg-night font-sans text-ivory">
      <AnimatePresence>{introOpen && <InvitationIntro onDone={() => setIntroOpen(false)} />}</AnimatePresence>
      <Nav />
      <main>
        <Hero />
        <Opposites />
        <Story />
        <CivilSigning />
        <Schedule />
        <Shoots />
        <DressCode />
        <RsvpSection />
        <Stay />
      </main>
      <Footer />
    </div>);

}