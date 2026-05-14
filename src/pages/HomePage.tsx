import { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { ActivitySection } from '../components/ActivitySection';
import { CountriesSection } from '../components/CountriesSection';
import Navigation from '../components/Navigation';
import { GalleryModal, TeamModal, DonateModal } from '../components/Modals';

function HomePage() {
  const [activeModal, setActiveModal] = useState<'gallery' | 'team' | 'donate' | null>(null);

  const handleNavigate = (section: string) => {
    if (section === 'gallery-modal') {
      setActiveModal('gallery');
      return;
    }

    if (section === 'team') {
      setActiveModal('team');
      return;
    }

    if (section === 'donate') {
      setActiveModal('donate');
      return;
    }

    const element = document.getElementById(section);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black min-h-screen relative">
      <Navigation onNavigate={handleNavigate} />

      <div id="home">
        <HeroSection />
      </div>

      <div id="gallery">
        <ActivitySection />
      </div>

      <div id="about">
        <CountriesSection />
      </div>

      {activeModal === 'gallery' && (
        <GalleryModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'team' && (
        <TeamModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'donate' && (
        <DonateModal onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}

export default HomePage;