import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, 
  ShieldCheck, 
  Trees, 
  Users, 
  Layers, 
  TrendingUp, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight, 
  Sparkles,
  Building2,
  Hotel
} from 'lucide-react';
import { PageView } from '../types';
import { PROJECTS, DIVISIONS } from '../data/mockData';
import { SisterConcernsCarousel } from '../components/SisterConcernsCarousel';

interface HomeViewProps {
  onNavigate: (view: PageView) => void;
  onRequestCall: () => void;
}

const HERO_SLIDES = [
  {
    id: 'purbachal',
    image: '/assets/images/cover2.png',
    tag: '1,300 Bigha Master Plan · Purbachal',
    title: 'Purbachal Aasceend Town',
    subtitle: 'Where Modern Living Meets Nature’s Serenity',
    projectId: 'purbachal-aasceend-town'
  },
  {
    id: 'eastern',
    image: '/assets/images/cover3.jpg',
    tag: '700 Bigha Residential Oasis · East Dhaka',
    title: 'Aasceend Eastern Town',
    subtitle: 'A Master-Planned Community of Contemporary Living',
    projectId: 'aasceend-eastern-town'
  },
  {
    id: 'green',
    image: '/assets/images/cover4.jpg',
    tag: 'Dhaka-Mawa Padma Expressway Corridor',
    title: 'Aasceend Green Town',
    subtitle: 'Eco-Living with Expansive Landscaped Parks & Road Networks',
    projectId: 'aasceend-green-town'
  },
  {
    id: 'river-view',
    image: '/assets/images/bd_riverview_town_1793789203288.jpg',
    tag: '12 Mins from National Parliament · Waterfront',
    title: 'Aasceend River View Town',
    subtitle: 'Live Close To Nature, Stay Close To The City',
    projectId: 'aasceend-river-view-town'
  },
  {
    id: 'hospitality',
    image: '/assets/images/bd_signature_bay_1793789202981.jpg',
    tag: '5-Star Luxury Coastal Destination',
    title: 'Signature Bay Hotel & Resorts',
    subtitle: 'Share-Based Ownership & Guaranteed Annual Dividend Growth',
    projectId: 'signature-bay-hotel'
  }
];

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onRequestCall }) => {
  // Real Estate Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play carousel timer (advances every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Project Category Filter
  const [projectFilter, setProjectFilter] = useState<'all' | 'township' | 'hospitality'>('all');

  const FEATURED_PROJECT_ORDER = [
    'purbachal-aasceend-town',
    'aasceend-eastern-town',
    'aasceend-green-town',
    'aasceend-river-view-town',
    'aasceend-town',
    'eden-paradise-resort',
    'aasceend-riviera-resort',
    'signature-bay-hotel'
  ];

  const filteredProjects = PROJECTS
    .filter((p) => {
      if (projectFilter === 'all') return true;
      if (projectFilter === 'township') return p.category === 'township';
      if (projectFilter === 'hospitality') return p.category === 'resort' || p.category === 'hotel';
      return true;
    })
    .sort((a, b) => {
      const idxA = FEATURED_PROJECT_ORDER.indexOf(a.id);
      const idxB = FEATURED_PROJECT_ORDER.indexOf(b.id);
      return (idxA !== -1 ? idxA : 99) - (idxB !== -1 ? idxB : 99);
    });

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const }
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24">
      
      {/* 1. HERO SECTION WITH RUNNING REAL ESTATE CAROUSEL */}
    
<section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
        
  {/* Carousel Background Images with Smooth Crossfade */}
  <div className="absolute inset-0 z-0">
    <AnimatePresence mode="sync">
      <motion.div
        key={HERO_SLIDES[currentSlide].id}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="absolute inset-0"
      >
        <img
          src={HERO_SLIDES[currentSlide].image}
          alt={HERO_SLIDES[currentSlide].title}
          className="w-full h-full object-cover object-center opacity-100"
        />
      </motion.div>
    </AnimatePresence>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div className="max-w-3xl space-y-6 text-white text-left">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="space-y-6"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          Aasceend Group
        </h1>

        <div className="text-2xl sm:text-3xl font-medium font-heading text-white leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
          Your Dreams, Our Commitment.
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <button
            onClick={() => onNavigate({ type: 'project', projectId: HERO_SLIDES[currentSlide].projectId })}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>View {HERO_SLIDES[currentSlide].title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate({ type: 'about' })}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold px-6 py-3.5 rounded-xl backdrop-blur-md transition-colors cursor-pointer"
          >
            About Our Vision
          </button>
        </div>

        {/* Quick Trust Highlights */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-white/15 max-w-xl">
          {/* <div>
            <div className="text-xl sm:text-3xl font-bold font-mono text-emerald-400">1300+</div>
            <div className="text-[10px] sm:text-xs text-neutral-300 mt-0.5">Bigha Purbachal</div>
          </div> */}
          {/* <div>
            <div className="text-xl sm:text-3xl font-bold font-mono text-emerald-400">100%</div>
            <div className="text-[10px] sm:text-xs text-neutral-300 mt-0.5">Legal Title</div>
          </div> */}
          {/* <div>
            <div className="text-xl sm:text-3xl font-bold font-mono text-emerald-400">480+</div>
            <div className="text-[10px] sm:text-xs text-neutral-300 mt-0.5">Experts</div>
          </div> */}
        </div>

        {/* Minimal Bottom Slide Indicators */}
        <div className="pt-4 flex items-center justify-between max-w-xl">
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-emerald-400' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevSlide}
              aria-label="Previous Slide"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextSlide}
              aria-label="Next Slide"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>


      {/* 2. FEATURED PROJECTS SECTION */}
      


<section className="bg-neutral-100/80 dark:bg-neutral-900/50 py-16 lg:py-20 border-y border-neutral-200 dark:border-neutral-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-green-800 dark:text-emerald-400 tracking-tight">
          FEATURED PROJECTS
        </h2>

        <p className="text-sm text-emerald-950/80 dark:text-emerald-100/80 mt-2 max-w-2xl leading-relaxed">
          Modern master-planned residential townships, scenic riverfront
          communities, and luxury 5-star hotel and resort destinations
          across prime corridors in Bangladesh.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center p-1 bg-white dark:bg-neutral-800 rounded-xl border border-emerald-200 dark:border-emerald-800 shadow-sm text-xs shrink-0 self-start md:self-auto gap-1">

        <button
          onClick={() => setProjectFilter("all")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            projectFilter === "all"
              ? "bg-[#006838] text-white shadow-sm"
              : "text-emerald-900 dark:text-emerald-200 hover:text-[#006838] hover:bg-emerald-50 dark:hover:bg-neutral-700"
          }`}
        >
          <span>All Projects</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
            projectFilter === "all"
              ? "bg-white/20 text-white"
              : "bg-emerald-100 dark:bg-neutral-700 text-emerald-800 dark:text-emerald-300"
          }`}>
            {PROJECTS.length}
          </span>
        </button>

        <button
          onClick={() => setProjectFilter("township")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            projectFilter === "township"
              ? "bg-[#006838] text-white shadow-sm"
              : "text-emerald-900 dark:text-emerald-200 hover:text-[#006838] hover:bg-emerald-50 dark:hover:bg-neutral-700"
          }`}
        >
          <span>Townships</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
            projectFilter === "township"
              ? "bg-white/20 text-white"
              : "bg-emerald-100 dark:bg-neutral-700 text-emerald-800 dark:text-emerald-300"
          }`}>
            {PROJECTS.filter((p) => p.category === "township").length}
          </span>
        </button>

        <button
          onClick={() => setProjectFilter("hospitality")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            projectFilter === "hospitality"
              ? "bg-[#006838] text-white shadow-sm"
              : "text-emerald-900 dark:text-emerald-200 hover:text-[#006838] hover:bg-emerald-50 dark:hover:bg-neutral-700"
          }`}
        >
          <span>Resorts & Hotels</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
            projectFilter === "hospitality"
              ? "bg-white/20 text-white"
              : "bg-emerald-100 dark:bg-neutral-700 text-emerald-800 dark:text-emerald-300"
          }`}>
            {
              PROJECTS.filter(
                (p) => p.category === "resort" || p.category === "hotel"
              ).length
            }
          </span>
        </button>
      </div>
    </div>

    {/* Project Cards */}
    <AnimatePresence mode="wait">
      <motion.div
        key={projectFilter}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {filteredProjects.map((proj) => {

          const isRiverView = proj.name
            ?.toLowerCase()
            .includes("river view");

          const isAasceendTown = proj.name
            ?.toLowerCase()
            .includes("aasceend town");

          return (
            <div
              key={proj.id}
              onClick={() =>
                onNavigate({ type: "project", projectId: proj.id })
              }
              className="
                bg-white dark:bg-neutral-900
                rounded-2xl overflow-hidden
                border border-emerald-600/30
                hover:border-[#006838]
                shadow-sm hover:shadow-xl
                hover:shadow-emerald-950/10
                transition-all duration-300
                cursor-pointer group
                flex flex-col
                hover:-translate-y-1.5
              "
            >

              {/* Hero Image */}
              <div className="relative h-44 sm:h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={proj.heroImage}
                  alt={proj.name}
                  loading="lazy"
                  className="
                    w-full h-full object-cover
                    group-hover:scale-105
                    transition-transform duration-500 ease-out
                  "
                />
              </div>

              {/* Logo & Project Name */}
              <div className="
                px-4 pt-3 pb-4
                flex flex-col
                items-center
                text-center
                bg-white dark:bg-neutral-900
              ">

                {/* Project Logo */}
                {proj.projectLogoUrl && (
                  <div className="
                    w-full
                    h-[65px]
                    flex items-center justify-center
                    overflow-hidden
                  ">
                    <img
                      src={proj.projectLogoUrl}
                      alt={`${proj.name} Logo`}
                      loading="lazy"
                      style={{
                        clipPath: isRiverView
                          ? "inset(0 0 14% 0)"
                          : "none"
                      }}
                      className="
                        block
                        max-w-[185px]
                        max-h-[60px]
                        w-auto
                        h-auto
                        object-contain
                        object-center
                        transition-transform duration-300
                        group-hover:scale-105
                      "
                    />
                  </div>
                )}

                {/* English Project Name */}
                <div className="w-full flex items-center justify-center mt-1 px-1">

                  <h3
                    className={`
                      w-full
                      font-extrabold
                      font-heading
                      text-[#006838]
                      dark:text-emerald-400
                      tracking-tight
                      text-center
                      leading-snug
                      break-words
                      transition-colors
                      group-hover:text-emerald-600
                      dark:group-hover:text-emerald-300
                      ${isAasceendTown
                        ? "text-lg sm:text-xl"
                        : "text-base sm:text-lg"
                      }
                    `}
                  >
                    {proj.name}
                  </h3>

                </div>

              </div>
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>

  </div>
</section>




      {/* 3. BUILDING TRUST THROUGH PLANNING, TRANSPARENCY, AND VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-green-800 dark:text-white">
            Building Trust Through Planning, Transparency, And Vision
          </h2>
          <div className="w-16 h-1 mx-auto mt-4 rounded-full" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Card 1 */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white mb-2">
              Planned Development Approach
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every project is carefully designed with structured planning and long-term development vision to ensure generational longevity.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white mb-2">
              Transparent Land & Project Process
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We emphasize clarity, verified documentation, and responsible development practices at every stage of plot demarcation.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Trees className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white mb-2">
              Future-Focused Communities
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Our developments are planned to support modern living, open breathing landscapes, hospitality, and sustainable lifestyle growth.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white mb-2">
              Customer-First Philosophy
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We prioritize trust, transparent communication, and long-term relationships with our valued buyers and strategic investors.
            </p>
          </motion.div>

          {/* Card 5 */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white mb-2">
              Multi-Sector Development Group
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Operating across real estate, resort, IT, media, textiles, and hospitality sectors under a unified corporate roadmap.
            </p>
          </motion.div>

          {/* Card 6 */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white mb-2">
              Growing Development Portfolio
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              A diversified collection of residential townships, resort retreats, and commercial hospitality shaping future destinations.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. AT A GLANCE STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Feature Card (Deep Green Banner as in Video) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-linear-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl border border-emerald-700/40 relative overflow-hidden"
          >
            <div className="space-y-4 relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                Executive Summary
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                AT A GLANCE
              </h2>
              <p className="text-sm text-emerald-100/90 leading-relaxed pt-2">
                Our goal is to create well-organized developments that combine modern living, leisure experiences, and sustainable growth opportunities. Every project is approached with careful planning, transparency, and a commitment to building lasting value for customers and investors.
              </p>
              <p className="text-xs text-emerald-200/80 leading-relaxed">
                As a multi-sector development group, Aasceend Group is working toward shaping future destinations through responsible development practices and professional management.
              </p>
            </div>

            <div className="pt-6 relative z-10">
              <button
                onClick={() => onNavigate({ type: 'about' })}
                className="inline-flex items-center gap-2 bg-white text-emerald-950 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Subtle background graphic */}
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none" />
          </motion.div>

          {/* Right Stats Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6"
          >
            {/* Stat 1 */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-center items-center text-center group hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-3">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mb-1">
                11+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                Active Sister Concerns
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">Multi-industry operations across Bangladesh</div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-center items-center text-center group hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-3">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mb-1">
                480+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                Employees
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">Skilled workforce & engineers</div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-center items-center text-center group hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-3">
                <Trees className="w-6 h-6" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mb-1">
                3+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                Land, Duplex & Condominium Projects
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">Prime locations in Dhaka</div>
            </motion.div>

            {/* Stat 4 */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-center items-center text-center group hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-3">
                <Hotel className="w-6 h-6" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mb-1">
                14+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                Apartment & Resort Projects
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">Ongoing & upcoming phases</div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 5. DIVISIONS GRID (AS SEEN IN VIDEO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-green-800  dark:text-white mt-1">
            Our Business Divisions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            Pioneering growth across key economic growth engines in Bangladesh.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5"
        >
          {DIVISIONS.map((div) => (
            <motion.div
              key={div.id}
              variants={itemVariants}
              onClick={() => onNavigate({ type: 'division', divisionId: div.id })}
              className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={div.heroImage}
                alt={div.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent group-hover:from-emerald-950/90 transition-colors" />

              <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                  Division
                </span>
                <h4 className="text-xs sm:text-sm font-bold font-heading text-white line-clamp-2 mt-0.5">
                  {div.name}
                </h4>
                <div className="flex items-center gap-1 text-[10px] text-emerald-200 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore Division</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>



      {/* 6. SISTER CONCERNS INTERACTIVE CAROUSEL SLIDER */}
      <SisterConcernsCarousel onNavigate={onNavigate} />

    </div>
  );
};
