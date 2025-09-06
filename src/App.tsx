import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CourseModules } from './components/CourseModules';
import CommissionGuide from './components/CommissionGuide';
import { Resources } from './components/Resources';
import { CertificationTracker } from './components/CertificationTracker';

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Hero setActiveSection={setActiveSection} />;
      case 'courses':
        return <CourseModules />;
      case 'commission':
        return <CommissionGuide />;
      case 'resources':
        return <Resources />;
      case 'certification':
        return <CertificationTracker />;
      default:
        return <Hero setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="pt-20">
        {renderActiveSection()}
      </main>
    </div>
  );
}

export default App;