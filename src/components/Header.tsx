import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Building2,
  Hotel,
  TreePine,
  Briefcase,
  Users,
  ShieldCheck,
  Award,
  Sparkles,
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
  const [mobileAccordions, setMobileAccordions] = useState<Record<string, boolean>>({
    about: true,
    divisions: true,
    projects: true,
    media: false,
    sustainability: false
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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-sm py-3.5`}
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
          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1 font-medium text-sm">
            
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
              className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide shadow-sm transition-transform active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="font-mono">01896-006310</span>
            </a>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full transition-colors bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-600" />}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 rounded-lg transition-colors text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-4 pt-4 pb-6 space-y-3 max-h-[85vh] overflow-y-auto text-neutral-900 dark:text-neutral-100 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
           
            <a
              href="https://wa.me/8801896006310"
              target="_blank"
              rel="noreferrer"
              className="inline-flex sm:hidden items-center gap-1.5 bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs"
            >
              <Phone className="w-3 h-3" />
              <span>01896-006310</span>
            </a>
          </div>

          {/* Home Link */}
          <button
            onClick={() => handleNav({ type: 'home' })}
            className={`w-full text-left py-2.5 font-bold text-sm border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between ${
              currentView.type === 'home' ? 'text-emerald-700 dark:text-emerald-400' : 'text-neutral-800 dark:text-neutral-200'
            }`}
          >
            <span>Home</span>
          </button>

          {/* 1. About Aasceend Accordion */}
          <div className="border-b border-neutral-100 dark:border-neutral-800 pb-2">
            <button
              onClick={() => toggleMobileAccordion('about')}
              className="w-full flex items-center justify-between py-2 text-left font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400"
            >
              <span>ABOUT AASCEEND</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAccordions.about ? 'rotate-180 text-emerald-700' : 'text-neutral-400'}`} />
            </button>
            {mobileAccordions.about && (
              <div className="space-y-1 pt-1 pl-1">
                <button onClick={() => handleNav({ type: 'about' })} className="block w-full text-left py-1.5 text-sm text-neutral-800 dark:text-neutral-200 hover:text-emerald-600">
                  About Us Overview
                </button>
                <button onClick={() => handleNav({ type: 'leader', leaderId: 'co-chairman' })} className="block w-full text-left py-1.5 text-sm text-neutral-800 dark:text-neutral-200 hover:text-emerald-600">
                  Khandoker Asadur Rahman (Chairman &amp; COO)
                </button>
                <button onClick={() => handleNav({ type: 'leader', leaderId: 'ceo' })} className="block w-full text-left py-1.5 text-sm text-neutral-800 dark:text-neutral-200 hover:text-emerald-600">
                  Khondokar Mohibur Rahman (MD &amp; CEO)
                </button>
                <button onClick={() => handleNav({ type: 'leader', leaderId: 'vice-chairman' })} className="block w-full text-left py-1.5 text-sm text-neutral-800 dark:text-neutral-200 hover:text-emerald-600">
                  Md. Mahafuzur Rahaman (Vice Chairman)
                </button>
                <button onClick={() => handleNav({ type: 'leader', leaderId: 'deputy-md' })} className="block w-full text-left py-1.5 text-sm text-neutral-800 dark:text-neutral-200 hover:text-emerald-600">
                  Deputy Managing Director
                </button>
                <button onClick={() => handleNav({ type: 'investor' })} className="block w-full text-left py-1.5 text-sm text-neutral-800 dark:text-neutral-200 hover:text-emerald-600">
                  Investor Relations
                </button>
                <button onClick={() => handleNav({ type: 'accreditations' })} className="block w-full text-left py-1.5 text-sm text-neutral-800 dark:text-neutral-200 hover:text-emerald-600">
                  Accreditations &amp; Awards
                </button>
              </div>
            )}
          </div>

          {/* 2. Divisions Accordion */}
          <div className="border-b border-neutral-100 dark:border-neutral-800 pb-2">
            <button
              onClick={() => toggleMobileAccordion('divisions')}
              className="w-full flex items-center justify-between py-2 text-left font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400"
            >
              <span>DIVISIONS</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAccordions.divisions ? 'rotate-180 text-emerald-700' : 'text-neutral-400'}`} />
            </button>
            {mobileAccordions.divisions && (
              <div className="space-y-1 pt-1 pl-1">
                {DIVISIONS.map(div => (
                  <button
                    key={div.id}
                    onClick={() => handleNav({ type: 'division', divisionId: div.id })}
                    className="block w-full text-left py-1.5 text-sm text-neutral-800 dark:text-neutral-200 hover:text-emerald-600"
                  >
                    {div.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Projects Accordion */}
          <div className="border-b border-neutral-100 dark:border-neutral-800 pb-2">
            <button
              onClick={() => toggleMobileAccordion('projects')}
              className="w-full flex items-center justify-between py-2 text-left font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400"
            >
              <span>PROJECTS</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAccordions.projects ? 'rotate-180 text-emerald-700' : 'text-neutral-400'}`} />
            </button>
            {mobileAccordions.projects && (
              <div className="space-y-1 pt-1 pl-1">
                {PROJECTS.filter(proj => proj.id !== 'aasceend-eastern-town').map(proj => (
                  <button
                    key={proj.id}
                    onClick={() => handleNav({ type: 'project', projectId: proj.id })}
                    className="w-full text-left py-1.5 text-sm text-neutral-800 dark:text-neutral-200 hover:text-emerald-600 block"
                  >
                    <span>{proj.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Media Center Accordion */}
          <div className="border-b border-neutral-100 dark:border-neutral-800 pb-2">
            <button
              onClick={() => toggleMobileAccordion('media')}
              className="w-full flex items-center justify-between py-2 text-left font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400"
            >
              <span>MEDIA CENTER</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAccordions.media ? 'rotate-180 text-emerald-700' : 'text-neutral-400'}`} />
            </button>
            {mobileAccordions.media && (
              <div className="space-y-1 pt-1 pl-1">
                <button onClick={() => handleNav({ type: 'media', tab: 'news' })} className="block w-full text-left py-1.5 text-sm text-neutral-800 dark:text-neutral-200 hover:text-emerald-600">
                  News &amp; Events
                </button>
                <button onClick={() => handleNav({ type: 'media', tab: 'photos' })} className="block w-full text-left py-1.5 text-sm text-neutral-800 dark:text-neutral-200 hover:text-emerald-600">
                  Photo Gallery
                </button>
                <button onClick={() => handleNav({ type: 'media', tab: 'videos' })} className="block w-full text-left py-1.5 text-sm text-neutral-800 dark:text-neutral-200 hover:text-emerald-600">
                  Video Gallery
                </button>
              </div>
            )}
          </div>

          {/* 5. Sustainability Accordion */}
          <div className="border-b border-neutral-100 dark:border-neutral-800 pb-2">
            <button
              onClick={() => toggleMobileAccordion('sustainability')}
              className="w-full flex items-center justify-between py-2 text-left font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400"
            >
              <span>SUSTAINABILITY</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAccordions.sustainability ? 'rotate-180 text-emerald-700' : 'text-neutral-400'}`} />
            </button>
            {mobileAccordions.sustainability && (
              <div className="space-y-1 pt-1 pl-1">
                <button onClick={() => handleNav({ type: 'sustainability', tab: 'environment' })} className="block w-full text-left py-1.5 text-sm text-neutral-800 dark:text-neutral-200 hover:text-emerald-600">
                  Environment &amp; Ecology
                </button>
                <button onClick={() => handleNav({ type: 'sustainability', tab: 'csr' })} className="block w-full text-left py-1.5 text-sm text-neutral-800 dark:text-neutral-200 hover:text-emerald-600">
                  Corporate Social Responsibility (CSR)
                </button>
              </div>
            )}
          </div>

          {/* Contact Mobile Link */}
          <button
            onClick={() => handleNav({ type: 'contact' })}
            className="w-full text-left py-2.5 font-bold text-sm text-neutral-800 dark:text-neutral-200 hover:text-emerald-600"
          >
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
};