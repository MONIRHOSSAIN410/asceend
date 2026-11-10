import React, { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Building2,
  ShieldCheck,
  Award,
  Phone
} from 'lucide-react';
import { PageView } from '../types';
import { PROJECTS, DIVISIONS } from '../data/mockData';

interface HeaderProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onRequestCall: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  isDark,
  onToggleTheme,
  onRequestCall
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [mobileAccordions, setMobileAccordions] = useState<
  Record<string, boolean>
>({
  about: false,
  divisions: false,
  projects: false,
  media: false,
  sustainability: false,
});
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileAccordion = (section: string) => {
    setMobileAccordions(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (view: PageView) => {
    onNavigate(view);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
   <header 
  className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 shadow-sm py-3.5"
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo Lockup */}
          <button 
            onClick={() => handleNav({ type: 'home' })}
            className="flex items-center group text-left cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
            aria-label="Aasceend Group"
          >
            <div className="flex items-center">
              <img 
                src="/assets/images/aasceend_logo_official_green.png" 
                alt="Aasceend Group" 
                className="h-8 sm:h-10 w-auto object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/assets/aistudio/10._Aasceend_Group_2-01_1444aef8.png') {
                    target.src = '/assets/aistudio/10._Aasceend_Group_2-01_1444aef8.png';
                  }
                }}
              />
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1 font-medium text-base">
            
            {/* Home */}
            <button
              onClick={() => handleNav({ type: 'home' })}
              className={`px-3 py-2 rounded-md transition-colors text-neutral-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 ${
                currentView.type === 'home'
                  ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                  : ''
              }`}
            >
              Home
            </button>

            {/* About Aasceend Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                onMouseEnter={() => setActiveDropdown('about')}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors text-neutral-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 ${
                  ['about', 'leader', 'investor', 'accreditations'].includes(currentView.type)
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                    : ''
                }`}
              >
                <span>About Aasceend</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>

              {activeDropdown === 'about' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 mt-1 w-80 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 py-2.5 z-50 text-neutral-800 dark:text-neutral-200 text-sm"
                >
                  <button
                    onClick={() => handleNav({ type: 'about' })}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-neutral-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-2.5 transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    <span>About Us</span>
                  </button>
                  <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-1" />
                  
                  <div className="px-4 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    Leadership Team
                  </div>

                  <button
                    onClick={() => handleNav({ type: 'leader', leaderId: 'ceo' })}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-neutral-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 flex flex-col transition-colors"
                  >
                    <span className="font-medium text-xs">Founder, Senior Chief Advisor, MD & CEO</span>
                    <span className="text-[11px] text-neutral-500">Khondokar Mohibur Rahman</span>
                  </button>

                  <button
                    onClick={() => handleNav({ type: 'leader', leaderId: 'co-chairman' })}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-neutral-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 flex flex-col transition-colors"
                  >
                    <span className="font-medium text-xs">Founder, Chief Advisor, Chairman &amp; COO</span>
                    <span className="text-[11px] text-neutral-500">Khandoker Asadur Rahman</span>
                  </button>

                  <button
                    onClick={() => handleNav({ type: 'leader', leaderId: 'vice-chairman' })}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-neutral-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 flex flex-col transition-colors"
                  >
                    <span className="font-medium text-xs">Founder, Vice Chief Advisor, Vice Chairman</span>
                    <span className="text-[11px] text-neutral-500">Md. Mahafuzur Rahaman</span>
                  </button>

                  <button
                    onClick={() => handleNav({ type: 'leader', leaderId: 'deputy-md' })}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-neutral-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 flex flex-col transition-colors"
                  >
                    <span className="font-medium text-xs">Co-Founder &amp; Deputy Managing Director</span>
                    <span className="text-[11px] text-neutral-500">Deputy Managing Director</span>
                  </button>

                  <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-1" />

                  <button
                    onClick={() => handleNav({ type: 'investor' })}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-neutral-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-2.5 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Investor Relations</span>
                  </button>

                  <button
                    onClick={() => handleNav({ type: 'accreditations' })}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-neutral-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-2.5 transition-colors"
                  >
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Accreditations & Awards</span>
                  </button>
                </div>
              )}
            </div>

            {/* Divisions Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'divisions' ? null : 'divisions')}
                onMouseEnter={() => setActiveDropdown('divisions')}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors text-neutral-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 ${
                  currentView.type === 'division'
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                    : ''
                }`}
              >
                <span>Divisions</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>

              {activeDropdown === 'divisions' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 mt-1 w-72 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 py-2.5 z-50 text-neutral-800 dark:text-neutral-200 text-sm max-h-96 overflow-y-auto"
                >
                  {DIVISIONS.map((div) => (
                    <button
                      key={div.id}
                      onClick={() => handleNav({ type: 'division', divisionId: div.id })}
                      className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-neutral-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-between transition-colors"
                    >
                      <span className="font-medium text-xs">{div.name}</span>
                      <ChevronRight className="w-3 h-3 text-neutral-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Projects Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'projects' ? null : 'projects')}
                onMouseEnter={() => setActiveDropdown('projects')}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors text-neutral-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 ${
                  currentView.type === 'project'
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                    : ''
                }`}
              >
                <span>Projects</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>

              {activeDropdown === 'projects' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 mt-1 w-80 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 py-2.5 z-50 text-neutral-800 dark:text-neutral-200 text-sm"
                >
                  <div className="px-4 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    Mega Townships
                  </div>
                  {PROJECTS.filter(p => p.category === 'township' && p.id !== 'aasceend-eastern-town').map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => handleNav({ type: 'project', projectId: proj.id })}
                      className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-neutral-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-between transition-colors"
                    >
                      <div>
                        <div className="font-medium text-xs">{proj.name}</div>
                        <div className="text-[10px] text-neutral-500">{proj.totalLandArea} · {proj.totalPlots} Plots</div>
                      </div>
                      <ChevronRight className="w-3 h-3 text-neutral-400" />
                    </button>
                  ))}

                  <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-1" />
                  <div className="px-4 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    Hospitality & Resorts
                  </div>
                  {PROJECTS.filter(p => p.category !== 'township' && p.id !== 'aasceend-eastern-town').map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => handleNav({ type: 'project', projectId: proj.id })}
                      className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-neutral-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-between transition-colors"
                    >
                      <div>
                        <div className="font-medium text-xs">{proj.name}</div>
                        <div className="text-[10px] text-neutral-500">{proj.tagline}</div>
                      </div>
                      <ChevronRight className="w-3 h-3 text-neutral-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Media Center Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'media' ? null : 'media')}
                onMouseEnter={() => setActiveDropdown('media')}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors text-neutral-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 ${
                  currentView.type === 'media'
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                    : ''
                }`}
              >
                <span>Media Center</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>

              {activeDropdown === 'media' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 mt-1 w-52 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 py-2 z-50 text-neutral-800 dark:text-neutral-200 text-sm"
                >
                  <button
                    onClick={() => handleNav({ type: 'media', tab: 'news' })}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-neutral-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    News & Events
                  </button>
                  <button
                    onClick={() => handleNav({ type: 'media', tab: 'photos' })}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-neutral-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    Photo Gallery
                  </button>
                  <button
                    onClick={() => handleNav({ type: 'media', tab: 'videos' })}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-neutral-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    Video Gallery
                  </button>
                </div>
              )}
            </div>

            {/* Sustainability Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'sustainability' ? null : 'sustainability')}
                onMouseEnter={() => setActiveDropdown('sustainability')}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors text-neutral-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 ${
                  currentView.type === 'sustainability'
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                    : ''
                }`}
              >
                <span>Sustainability</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>

              {activeDropdown === 'sustainability' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 mt-1 w-60 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 py-2 z-50 text-neutral-800 dark:text-neutral-200 text-sm"
                >
                  <button
                    onClick={() => handleNav({ type: 'sustainability', tab: 'environment' })}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-neutral-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    Environment & Ecology
                  </button>
                  <button
                    onClick={() => handleNav({ type: 'sustainability', tab: 'csr' })}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-neutral-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    Corporate Social Responsibility (CSR)
                  </button>
                </div>
              )}
            </div>

            {/* Contact */}
            <button
              onClick={() => handleNav({ type: 'contact' })}
              className={`px-3 py-2 rounded-md transition-colors text-neutral-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 ${
                currentView.type === 'contact'
                  ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                  : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Tools: Call button, Dark Mode Toggle & Mobile Menu */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://wa.me/8801896006310"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold tracking-wide shadow-sm transition-transform active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span className="font-mono text-sm font-bold">01896-006310</span>
            </a>

         {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-lg transition-colors text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

    </header>

      {/* Mobile Drawer Menu */}
{mobileMenuOpen && (
  <div className="fixed inset-0 z-[200] lg:hidden">

    {/* Background Overlay */}
    <button
      type="button"
      aria-label="Close menu"
      onClick={() => setMobileMenuOpen(false)}
      className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
    />

    {/* Drawer */}
    <div className="absolute top-0 right-0 h-full w-[min(100%,380px)] bg-white dark:bg-neutral-900 shadow-2xl flex flex-col overflow-hidden">

      {/* Top Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 dark:border-neutral-800">

        {/* Logo */}
        <button
          onClick={() => handleNav({ type: 'home' })}
          aria-label="Aasceend Home"
          className="flex items-center"
        >
          <img
            src="/assets/images/aasceend_logo_official_green.png"
            alt="Aasceend Group"
            className="h-9 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.src =
                '/assets/aistudio/10._Aasceend_Group_2-01_1444aef8.png';
            }}
          />
        </button>

        {/* Theme and Close Buttons */}
        {/* <div className="flex items-center gap-3">

          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-emerald-600 dark:text-amber-400"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center text-neutral-800 dark:text-white hover:text-emerald-600"
          >
            <X className="w-6 h-6" />
          </button>

        </div> */}
      </div>

      {/* Menu Content */}
      <div className="flex-1 overflow-y-auto px-5">

        {/* Phone Button */}
        <div className="py-4 border-b border-neutral-100 dark:border-neutral-800">

          <a
            href="https://wa.me/8801896006310"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-base font-bold transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>01896-006310</span>
          </a>

        </div>

        {/* Home */}
        <button
          onClick={() => handleNav({ type: 'home' })}
          className={`w-full flex items-center py-4 text-left text-sm border-b border-neutral-100 dark:border-neutral-800 ${
            currentView.type === 'home'
              ? 'text-emerald-600 font-semibold'
              : 'text-emerald-700 dark:text-emerald-400'
          }`}
        >
          Home
        </button>

        {/* Accordion Component */}
        {[
          {
            id: 'about',
            title: 'ABOUT AASCEEND',
            items: [
              {
                label: 'About Us Overview',
                action: () => handleNav({ type: 'about' }),
              },
              {
                label: 'Khondokar Mohibur Rahman (MD & CEO)',
                action: () => handleNav({
                  type: 'leader',
                  leaderId: 'ceo',
                }),
              },
              {
                label: 'Khandoker Asadur Rahman (Chairman & COO)',
                action: () => handleNav({
                  type: 'leader',
                  leaderId: 'co-chairman',
                }),
              },
              {
                label: 'Md. Mahafuzur Rahaman (Vice Chairman)',
                action: () => handleNav({
                  type: 'leader',
                  leaderId: 'vice-chairman',
                }),
              },
              {
                label: 'Deputy Managing Director',
                action: () => handleNav({
                  type: 'leader',
                  leaderId: 'deputy-md',
                }),
              },
              {
                label: 'Investor Relations',
                action: () => handleNav({ type: 'investor' }),
              },
              {
                label: 'Accreditations & Awards',
                action: () => handleNav({ type: 'accreditations' }),
              },
            ],
          },

          {
            id: 'divisions',
            title: 'DIVISIONS',
            items: DIVISIONS.map((div) => ({
              label: div.name,
              action: () => handleNav({
                type: 'division',
                divisionId: div.id,
              }),
            })),
          },

          {
            id: 'projects',
            title: 'PROJECTS',
            items: PROJECTS
              .filter(proj => proj.id !== 'aasceend-eastern-town')
              .map(proj => ({
                label: proj.name,
                action: () => handleNav({
                  type: 'project',
                  projectId: proj.id,
                }),
              })),
          },

          {
            id: 'media',
            title: 'MEDIA CENTER',
            items: [
              {
                label: 'News & Events',
                action: () => handleNav({
                  type: 'media',
                  tab: 'news',
                }),
              },
              {
                label: 'Photo Gallery',
                action: () => handleNav({
                  type: 'media',
                  tab: 'photos',
                }),
              },
              {
                label: 'Video Gallery',
                action: () => handleNav({
                  type: 'media',
                  tab: 'videos',
                }),
              },
            ],
          },

          {
            id: 'sustainability',
            title: 'SUSTAINABILITY',
            items: [
              {
                label: 'Environment & Ecology',
                action: () => handleNav({
                  type: 'sustainability',
                  tab: 'environment',
                }),
              },
              {
                label: 'Corporate Social Responsibility (CSR)',
                action: () => handleNav({
                  type: 'sustainability',
                  tab: 'csr',
                }),
              },
            ],
          },
        ].map((section) => (

          <div
            key={section.id}
            className="border-b border-neutral-100 dark:border-neutral-800"
          >

            {/* Accordion Title */}
            <button
              onClick={() => toggleMobileAccordion(section.id)}
              aria-expanded={mobileAccordions[section.id]}
              className="w-full flex items-center justify-between py-5 text-left text-xs font-bold tracking-wide text-emerald-700 dark:text-emerald-400"
            >
              <span>{section.title}</span>

              <ChevronDown
                className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
                  mobileAccordions[section.id]
                    ? 'rotate-180'
                    : ''
                }`}
              />
            </button>

            {/* Accordion Items */}
            <div
              className={`grid transition-all duration-300 ${
                mobileAccordions[section.id]
                  ? 'grid-rows-[1fr] opacity-100 pb-3'
                  : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">

                {section.items.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className="block w-full text-left py-2.5 px-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}

              </div>
            </div>

          </div>
        ))}

        {/* Contact Us */}
        <button
          onClick={() => handleNav({ type: 'contact' })}
          className="w-full text-left py-6 text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:text-emerald-600"
        >
          Contact Us
        </button>

      </div>

    </div>
  </div>
)}

    </>
  );
};