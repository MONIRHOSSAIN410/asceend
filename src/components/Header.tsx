import React, { useState, useEffect, useRef } from 'react';
import {
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
  onRequestCall: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
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

  const toggleMobileAccordion = (section: string) => {
    setMobileAccordions(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isPastHero, setIsPastHero] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Smart Navbar Scroll & Cursor Logic (Auto-hide on scroll down past hero, show on scroll up or mouse up)
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const checkHeroBoundary = () => {
      if (currentView.type === 'home') {
        const hero = document.getElementById('hero-section');
        if (hero) {
          const heroBottom = hero.getBoundingClientRect().bottom;
          return heroBottom <= 80;
        }
        return window.scrollY > 400;
      }
      return window.scrollY > 100;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const pastHero = checkHeroBoundary();
      setIsPastHero(pastHero);

      if (!pastHero) {
        // Inside hero section / top of page: always visible
        setIsNavbarVisible(true);
      } else {
        const diff = currentScrollY - lastScrollY.current;
        if (diff > 6) {
          // Scrolling down: hide navbar
          setIsNavbarVisible(false);
          setActiveDropdown(null);
        } else if (diff < -6) {
          // Scrolling up: show navbar
          setIsNavbarVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    const handleWheel = (event: WheelEvent) => {
      const pastHero = checkHeroBoundary();
      if (!pastHero) {
        setIsNavbarVisible(true);
        return;
      }

      if (event.deltaY > 6) {
        // Mouse wheel scrolled down: hide navbar
        setIsNavbarVisible(false);
        setActiveDropdown(null);
      } else if (event.deltaY < -6) {
        // Mouse wheel scrolled up: show navbar
        setIsNavbarVisible(true);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      // If cursor moves near the top of viewport (within 70px)
      if (event.clientY <= 70) {
        setIsNavbarVisible(true);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleScroll);
    };
  }, [currentView.type]);

  const handleNav = (view: PageView) => {
    onNavigate(view);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setIsNavbarVisible(true);
    setIsPastHero(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showHeader = !isPastHero || isNavbarVisible || Boolean(activeDropdown) || mobileMenuOpen;

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={() => setActiveDropdown(null)}
        className={`w-full z-50 transition-all duration-300 ease-in-out bg-black border-b border-neutral-800 shadow-md py-3.5 ${
          currentView.type === 'home'
            ? 'fixed top-0 left-0 right-0'
            : 'sticky top-0'
        } ${
          showHeader
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
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
                src="/assets/images/aasceend_logo_official_green_dark_bg.png" 
                alt="Aasceend Group" 
                className="h-8 sm:h-10 w-auto object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/assets/images/aasceend_logo_white.png') {
                    target.src = '/assets/images/aasceend_logo_white.png';
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
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView.type === 'home'
                  ? 'text-green-700 font-bold'
                  : 'text-neutral-200 hover:text-green-700 font-medium'
              }`}
            >
              Home
            </button>

            {/* About Aasceend Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                onMouseEnter={() => setActiveDropdown('about')}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                  ['about', 'leader', 'investor', 'accreditations'].includes(currentView.type)
                    ? 'text-green-400 font-bold'
                    : 'text-neutral-200 hover:text-green-400 font-medium'
                }`}
              >
                <span>About Aasceend</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>

              {activeDropdown === 'about' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 top-full w-80 bg-white backdrop-blur-md rounded-xl shadow-2xl border border-neutral-200 py-2.5 z-50 text-neutral-800 text-sm"
                >
                  <button
                    onClick={() => handleNav({ type: 'about' })}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-100 hover:text-green-700 flex items-center gap-2.5 transition-colors text-neutral-800"
                  >
                    <Building2 className="w-4 h-4 text-green-700" />
                    <span>About Us</span>
                  </button>
                  <div className="h-px bg-neutral-200 my-1" />
                  
                  <div className="px-4 py-1 text-[11px] font-semibold text-neutral-600 uppercase tracking-wider">
                    Leadership Team
                  </div>

                  <button
                    onClick={() => handleNav({ type: 'leader', leaderId: 'ceo' })}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-100 hover:text-green-700 flex flex-col transition-colors"
                  >
                    <span className="font-medium text-xs text-neutral-800">Founder, Senior Chief Advisor, MD & CEO</span>
                    <span className="text-[11px] text-neutral-600">Khondokar Mohibur Rahman</span>
                  </button>

                  <button
                    onClick={() => handleNav({ type: 'leader', leaderId: 'co-chairman' })}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-100 hover:text-green-700 flex flex-col transition-colors"
                  >
                    <span className="font-medium text-xs text-neutral-800">Founder, Chief Advisor, Chairman &amp; COO</span>
                    <span className="text-[11px] text-neutral-600">Khandoker Asadur Rahman</span>
                  </button>

                  <button
                    onClick={() => handleNav({ type: 'leader', leaderId: 'vice-chairman' })}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-100 hover:text-green-700 flex flex-col transition-colors"
                  >
                    <span className="font-medium text-xs text-neutral-800">Founder, Vice Chief Advisor, Vice Chairman</span>
                    <span className="text-[11px] text-neutral-600">Md. Mahafuzur Rahaman</span>
                  </button>

                  <button
                    onClick={() => handleNav({ type: 'leader', leaderId: 'deputy-md' })}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-100 hover:text-green-700 flex flex-col transition-colors"
                  >
                    <span className="font-medium text-xs text-neutral-800">Co-Founder &amp; Deputy Managing Director</span>
                    <span className="text-[11px] text-neutral-600">Deputy Managing Director</span>
                  </button>

                  <div className="h-px bg-neutral-200 my-1" />

                  <button
                    onClick={() => handleNav({ type: 'investor' })}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-100 hover:text-green-700 flex items-center gap-2.5 transition-colors text-neutral-800"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Investor Relations</span>
                  </button>

                  <button
                    onClick={() => handleNav({ type: 'accreditations' })}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-100 hover:text-green-700 flex items-center gap-2.5 transition-colors text-neutral-800"
                  >
                    <Award className="w-4 h-4 text-green-700" />
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
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                  currentView.type === 'division'
                    ? 'text-green-400 font-bold'
                    : 'text-neutral-200 hover:text-green-400 font-medium'
                }`}
              >
                <span>Divisions</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>

              {activeDropdown === 'divisions' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 top-full w-72 bg-white backdrop-blur-md rounded-xl shadow-2xl border border-neutral-200 py-2.5 z-50 text-neutral-800 text-sm max-h-96 overflow-y-auto"
                >
                  {DIVISIONS.map((div) => (
                    <button
                      key={div.id}
                      onClick={() => handleNav({ type: 'division', divisionId: div.id })}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-100 hover:text-green-700 flex items-center justify-between transition-colors text-neutral-800"
                    >
                      <span className="font-medium text-xs">{div.name}</span>
                      <ChevronRight className="w-3 h-3 text-neutral-500" />
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
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                  currentView.type === 'project'
                    ? 'text-emerald-400 font-bold'
                    : 'text-neutral-200 hover:text-green-400 font-medium'
                }`}
              >
                <span>Projects</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>

              {activeDropdown === 'projects' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 top-full w-80 bg-white backdrop-blur-md rounded-xl shadow-2xl border border-neutral-200 py-2.5 z-50 text-neutral-800 text-sm"
                >
                  <div className="px-4 py-1 text-[11px] font-semibold text-neutral-600 uppercase tracking-wider">
                    Mega Townships
                  </div>
                  {PROJECTS.filter(p => p.category === 'township').map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => handleNav({ type: 'project', projectId: proj.id })}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-100 hover:text-green-700 flex items-center justify-between transition-colors text-neutral-800"
                    >
                      <div>
                        <div className="font-medium text-xs text-neutral-800">{proj.name}</div>
                        <div className="text-[10px] text-neutral-600">{proj.totalLandArea} · {proj.totalPlots} Plots</div>
                      </div>
                      <ChevronRight className="w-3 h-3 text-neutral-500" />
                    </button>
                  ))}

                  <div className="h-px bg-neutral-200 my-1" />
                  <div className="px-4 py-1 text-[11px] font-semibold text-neutral-600 uppercase tracking-wider">
                    Hospitality & Resorts
                  </div>
                  {PROJECTS.filter(p => p.category !== 'township').map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => handleNav({ type: 'project', projectId: proj.id })}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-100 hover:text-green-700 flex items-center justify-between transition-colors text-neutral-800"
                    >
                      <div>
                        <div className="font-medium text-xs text-neutral-800">{proj.name}</div>
                        <div className="text-[10px] text-neutral-600">{proj.tagline}</div>
                      </div>
                      <ChevronRight className="w-3 h-3 text-neutral-500" />
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
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                  currentView.type === 'media'
                    ? 'text-green-400 font-bold'
                    : 'text-neutral-200 hover:text-green-400 font-medium'
                }`}
              >
                <span>Media Center</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>

              {activeDropdown === 'media' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 top-full w-52 bg-white backdrop-blur-md rounded-xl shadow-2xl border border-neutral-200 py-2 z-50 text-neutral-800 text-sm"
                >
                  <button
                    onClick={() => handleNav({ type: 'media', tab: 'news' })}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-100 hover:text-green-700 transition-colors text-neutral-800"
                  >
                    News & Events
                  </button>
                  <button
                    onClick={() => handleNav({ type: 'media', tab: 'photos' })}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-100 hover:text-green-700 transition-colors text-neutral-800"
                  >
                    Photo Gallery
                  </button>
                  <button
                    onClick={() => handleNav({ type: 'media', tab: 'videos' })}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-100 hover:text-green-700 transition-colors text-neutral-800"
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
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                  currentView.type === 'sustainability'
                    ? 'text-green-500 font-bold'
                    : 'text-neutral-200 hover:text-green-500 font-medium'
                }`}
              >
                <span>Sustainability</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>

              {activeDropdown === 'sustainability' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 top-full w-60 bg-white backdrop-blur-md rounded-xl shadow-2xl border border-neutral-200 py-2 z-50 text-neutral-800 text-sm"
                >
                  <button
                    onClick={() => handleNav({ type: 'sustainability', tab: 'environment' })}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-100 hover:text-green-700 transition-colors text-neutral-800"
                  >
                    Environment & Ecology
                  </button>
                  <button
                    onClick={() => handleNav({ type: 'sustainability', tab: 'csr' })}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-100 hover:text-green-700 transition-colors text-neutral-800"
                  >
                    Corporate Social Responsibility (CSR)
                  </button>
                </div>
              )}
            </div>

            {/* Contact */}
            <button
              onClick={() => handleNav({ type: 'contact' })}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView.type === 'contact'
                  ? 'text-green-400 font-bold'
                  : 'text-neutral-200 hover:text-green-400 font-medium'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Tools: Call button & Mobile Menu */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://wa.me/8801896006310"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-green-900 hover:bg-green-900 text-white px-4 py-2 rounded-lg text-sm font-bold tracking-wide shadow-sm transition-transform active:scale-95"
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
              className="lg:hidden p-2 rounded-lg transition-colors text-neutral-200 hover:text-white hover:bg-neutral-800"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

    </header>

      {/* Mobile Drawer Menu */}
{mobileMenuOpen && (
  <div className="fixed inset-0 z-200 lg:hidden">

    {/* Background Overlay */}
    <button
      type="button"
      aria-label="Close menu"
      onClick={() => setMobileMenuOpen(false)}
      className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
    />

    {/* Drawer */}
    <div className="absolute top-0 right-0 h-full w-[min(100%,380px)] bg-white text-neutral-800 shadow-2xl flex flex-col overflow-hidden">

      {/* Top Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">

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

        {/* Close Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center text-neutral-600 hover:text-green-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div> 
      </div>

      {/* Menu Content */}
      <div className="flex-1 overflow-y-auto px-5">

        {/* Phone Button */}
        <div className="py-4 border-b border-neutral-100">

          <a
            href="https://wa.me/8801896006310"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-900 text-white px-4 py-2 rounded-lg text-base font-bold transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>01896-006310</span>
          </a>

        </div>

        {/* Home */}
        <button
          onClick={() => handleNav({ type: 'home' })}
          className={`w-full flex items-center py-4 text-left text-sm border-b border-neutral-100 ${
            currentView.type === 'home'
              ? 'text-green-600 font-bold'
              : 'text-neutral-700 hover:text-green-600'
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
            className="border-b border-neutral-100"
          >

            {/* Accordion Title */}
            <button
              onClick={() => toggleMobileAccordion(section.id)}
              aria-expanded={mobileAccordions[section.id]}
              className="w-full flex items-center justify-between py-5 text-left text-xs font-bold tracking-wide text-emerald-700"
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
                    className="block w-full text-left py-2.5 px-2 text-sm text-neutral-600 hover:text-emerald-600 transition-colors"
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
          className="w-full text-left py-6 text-sm font-semibold text-neutral-700 hover:text-green-600"
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