import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { FloatingActions } from './components/FloatingActions';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { LeaderView } from './views/LeaderView';
import { InvestorView } from './views/InvestorView';
import { AccreditationsView } from './views/AccreditationsView';
import { DivisionDetailView } from './views/DivisionDetailView';
import { ProjectDetailView } from './views/ProjectDetailView';
import { MediaView } from './views/MediaView';
import { SustainabilityView } from './views/SustainabilityView';
import { ContactView } from './views/ContactView';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>({ type: 'home' });
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aasceend_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadModalType, setLeadModalType] = useState<'callback' | 'brochure'>('callback');
  const [selectedBrochureProject, setSelectedBrochureProject] = useState<string | undefined>();

  // Toggle Dark Mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('aasceend_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('aasceend_theme', 'light');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCallback = () => {
    setLeadModalType('callback');
    setSelectedBrochureProject(undefined);
    setLeadModalOpen(true);
  };

  const handleOpenBrochure = (projectName: string) => {
    setLeadModalType('brochure');
    setSelectedBrochureProject(projectName);
    setLeadModalOpen(true);
  };

  // Generate unique key for view transition
  const getViewKey = (view: PageView) => {
    switch (view.type) {
      case 'home':
        return 'home';
      case 'about':
        return 'about';
      case 'leader':
        return `leader-${view.leaderId}`;
      case 'investor':
        return 'investor';
      case 'accreditations':
        return 'accreditations';
      case 'division':
        return `division-${view.divisionId}`;
      case 'project':
        return `project-${view.projectId}`;
      case 'media':
        return `media-${view.tab}`;
      case 'sustainability':
        return `sustainability-${view.tab}`;
      case 'contact':
        return 'contact';
      default:
        return 'unknown';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-emerald-600 selection:text-white transition-colors duration-300">
      
      {/* Top Global Navigation */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onRequestCall={handleOpenCallback}
      />

      {/* Main View Container with Sequential Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={getViewKey(currentView)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {currentView.type === 'home' && (
              <HomeView
                onNavigate={handleNavigate}
                onRequestCall={handleOpenCallback}
              />
            )}

            {currentView.type === 'about' && (
              <AboutView
                onNavigate={handleNavigate}
                onRequestCall={handleOpenCallback}
              />
            )}

            {currentView.type === 'leader' && (
              <LeaderView
                leaderId={currentView.leaderId}
                onNavigate={handleNavigate}
                onRequestCall={handleOpenCallback}
              />
            )}

            {currentView.type === 'investor' && (
              <InvestorView
                onNavigate={handleNavigate}
                onRequestCall={handleOpenCallback}
              />
            )}

            {currentView.type === 'accreditations' && (
              <AccreditationsView
                onNavigate={handleNavigate}
                onRequestCall={handleOpenCallback}
              />
            )}

            {currentView.type === 'division' && (
              <DivisionDetailView
                divisionId={currentView.divisionId}
                onNavigate={handleNavigate}
                onRequestCall={handleOpenCallback}
              />
            )}

            {currentView.type === 'project' && (
              <ProjectDetailView
                projectId={currentView.projectId}
                onNavigate={handleNavigate}
                onRequestCall={handleOpenCallback}
                onDownloadBrochure={handleOpenBrochure}
              />
            )}

            {currentView.type === 'media' && (
              <MediaView
                initialTab={currentView.tab}
                onNavigate={handleNavigate}
                onRequestCall={handleOpenCallback}
              />
            )}

            {currentView.type === 'sustainability' && (
              <SustainabilityView
                initialTab={currentView.tab}
                onNavigate={handleNavigate}
                onRequestCall={handleOpenCallback}
              />
            )}

            {currentView.type === 'contact' && (
              <ContactView
                onNavigate={handleNavigate}
                onRequestCall={handleOpenCallback}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Corporate Footer */}
      <Footer
        onNavigate={handleNavigate}
        onRequestCall={handleOpenCallback}
      />

      {/* Lead Modal (Callback or Brochure) */}
      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        type={leadModalType}
        defaultProject={selectedBrochureProject}
      />

      {/* Persistent Floating Controls (WhatsApp, Call, BackToTop) */}
      <FloatingActions onRequestCall={handleOpenCallback} />

    </div>
  );
}
