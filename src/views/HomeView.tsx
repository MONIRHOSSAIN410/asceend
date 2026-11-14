import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
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
  Building2,
  Hotel,
  LandPlot,
  Briefcase,
  PieChart
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
    image: '/assets/images/nature.jpg',
    tag: '1,300 Bigha Master Plan · Purbachal',
    title: 'Purbachal Aasceend Town',
    subtitle: 'Where Modern Living Meets Nature’s Serenity',
    projectId: 'purbachal-aasceend-town'
  },
  {
    id: 'eastern',
    image: '/assets/images/nature2.jpg',
    tag: '700 Bigha Residential Oasis · East Dhaka',
    title: 'Signature Bay Hotel',
    subtitle: 'A Master-Planned Community of Contemporary Living',
    projectId: 'aasceend-eastern-town'
  },
  {
    id: 'green',
    image: '/assets/images/nature3.jpg',
    tag: 'Dhaka-Mawa Padma Expressway Corridor',
    title: 'Aasceend Green Town',
    subtitle: 'Eco-Living with Expansive Landscaped Parks & Road Networks',
    projectId: 'aasceend-green-town'
  },
  {
    id: 'river-view',
    image: '/assets/images/cover2.png',
    tag: '12 Mins from National Parliament · Waterfront',
    title: 'Aasceend River View Town',
    subtitle: 'Live Close To Nature, Stay Close To The City',
    projectId: 'aasceend-river-view-town'
  },
  {
    id: 'hospitality',
    image: '/assets/images/nature5.jpeg',
    tag: '5-Star Luxury Coastal Destination',
    title: 'Soa Resort ',
    subtitle: 'Share-Based Ownership & Guaranteed Annual Dividend Growth',
    projectId: 'signature-bay-hotel'
  }
];

const BUSINESS_SECTORS = [
  {
    id: 'real-estate',
    divisionId: 'real-estate',
    name: 'Real Estate & Infrastructure',
    titleLines: ['REAL ESTATE &', 'INFRASTRUCTURE'],
    concernName: 'AASCEEND PROPERTY DEVELOPMENT LIMITED',
    image: '/assets/sectors/real_estate.jpg'
  },
  {
    id: 'it-technology',
    divisionId: 'it-technology',
    name: 'Technology & IT Solutions',
    titleLines: ['TECHNOLOGY & IT', 'SOLUTIONS'],
    concernName: 'AASCEEND SYSTEMS LIMITED',
    image: '/assets/sectors/it_solutions.jpg'
  },
  {
    id: 'education',
    divisionId: 'education',
    name: 'Education & Consultancy',
    titleLines: ['EDUCATION &', 'CONSULTANCY'],
    concernName: 'AASCEEND GLOBAL EDUCATION & CONSULTANCY LIMITED',
    image: '/assets/sectors/education.jpg'
  },
  {
    id: 'agro-fisheries',
    divisionId: 'agro-fisheries',
    name: 'Agro & Fisheries',
    titleLines: ['AGRO & FISHERIES'],
    concernName: 'AASCEEND AGRO & FISHERIES LIMITED',
    image: '/assets/sectors/agro_fisheries.jpg'
  },
  {
    id: 'garments',
    divisionId: 'garments',
    name: 'Garments & Textiles',
    titleLines: ['GARMENTS &', 'TEXTILES'],
    concernName: 'AASCEEND GARMENTS LIMITED',
    image: '/assets/sectors/garments.jpg'
  },
  {
    id: 'logistics',
    divisionId: 'logistics',
    name: 'Logistics & Supply Chain',
    titleLines: ['LOGISTICS & SUPPLY', 'CHAIN'],
    concernName: 'AASCEEND LOGISTICS LIMITED',
    image: '/assets/sectors/logistics.jpg'
  },
  {
    id: 'media',
    divisionId: 'media',
    name: 'Media & Communications',
    titleLines: ['MEDIA &', 'COMMUNICATIONS'],
    concernName: 'AASCEEND MEDIA LIMITED',
    image: '/assets/sectors/media.jpg'
  },
  {
    id: 'foundation',
    divisionId: 'foundation',
    name: 'Social Impact (CSR) - Aasceend Group',
    titleLines: ['SOCIAL IMPACT', '(CSR) - AASCEEND', 'GROUP'],
    concernName: 'AASCEEND FOUNDATION',
    image: '/assets/sectors/social_impact.jpg'
  }
];

interface StatCounterProps {
  value: number;
  suffix?: string;
  padZero?: boolean;
  duration?: number;
  trigger?: boolean;
}

const StatCounter: React.FC<StatCounterProps> = ({ 
  value, 
  suffix = '', 
  padZero = false, 
  duration = 2,
  trigger = true 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTimestamp: number | null = null;
    let animId: number;

    const animateCount = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = (timestamp - startTimestamp) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth deceleration: easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(ease * value);
      setCount(current);

      if (progress < 1) {
        animId = requestAnimationFrame(animateCount);
      } else {
        setCount(value);
      }
    };

    animId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animId);
  }, [trigger, value, duration]);

  const formatted = padZero && count < 10 ? `0${count}` : `${count}`;

  return (
    <span className="inline-block tabular-nums">
      {formatted}{suffix}
    </span>
  );
};

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onRequestCall }) => {
  const atAGlanceRef = React.useRef<HTMLDivElement>(null);
  const isAtAGlanceInView = useInView(atAGlanceRef, { once: true, margin: '-50px' });

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
    'ag-dhaka-town',
    'aasceend-commercial-tower',
    'eden-paradise-resort',
    'aasceend-riviera-resort',
    'signature-bay-hotel',
    'soa-resort',
    'aasceend-eco-resort'
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
    
<section id="hero-section" className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
        
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
            className="bg-green-700 hover:bg-green-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span> {HERO_SLIDES[currentSlide].title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

         {/* <button
            onClick={() => onNavigate({ type: 'about' })}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold px-6 py-3.5 rounded-xl backdrop-blur-md transition-colors cursor-pointer"
          >
            About Our Vision
          </button> */}
        </div>

        {/* Quick Trust Highlights */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-white/10 max-w-sm">
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
          {/* <div className="flex items-center gap-2">
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
          </div> */}

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
        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-green-800 dark:text-green-400 tracking-tight">
          FEATURED PROJECTS
        </h2>

        <p className="text-sm text-emerald-950/80 dark:text-emerald-100/80 mt-2 max-w-2xl leading-relaxed">
          Modern master-planned residential townships, scenic riverfront
          communities, and luxury 5-star hotel and resort destinations
          across prime corridors in Bangladesh.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center p-1 bg-white dark:bg-neutral-800 rounded-xl border border-emerald-200 dark:border-green-800 shadow-sm text-xs shrink-0 self-start md:self-auto gap-1">

        <button
          onClick={() => setProjectFilter("all")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            projectFilter === "all"
              ? "bg-[#006838] text-white shadow-sm"
              : "text-green-900 dark:text-green-200 hover:text-[#006838] hover:bg-emerald-50 dark:hover:bg-neutral-700"
          }`}
        >
          <span>All Projects</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
            projectFilter === "all"
              ? "bg-white/20 text-white"
              : "bg-emerald-100 dark:bg-neutral-700 text-green-800 dark:text-green-300"
          }`}>
            {PROJECTS.length}
          </span>
        </button>

        <button
          onClick={() => setProjectFilter("township")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            projectFilter === "township"
              ? "bg-[#006838] text-white shadow-sm"
              : "text-emerald-900 dark:text-green-200 hover:text-[#006838] hover:bg-emerald-50 dark:hover:bg-neutral-700"
          }`}
        >
          <span>Townships</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
            projectFilter === "township"
              ? "bg-white/20 text-white"
              : "bg-emerald-100 dark:bg-neutral-700 text-green-800 dark:text-green-300"
          }`}>
            {PROJECTS.filter((p) => p.category === "township").length}
          </span>
        </button>

        <button
          onClick={() => setProjectFilter("hospitality")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            projectFilter === "hospitality"
              ? "bg-[#006838] text-white shadow-sm"
              : "text-green-900 dark:text-green-200 hover:text-[#006838] hover:bg-emerald-50 dark:hover:bg-neutral-700"
          }`}
        >
          <span>Resorts & Hotels</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
            projectFilter === "hospitality"
              ? "bg-white/20 text-white"
              : "bg-emerald-100 dark:bg-neutral-700 text-green-800 dark:text-green-300"
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
          return (
            <div
              key={proj.id}
              onClick={() =>
                onNavigate({ type: "project", projectId: proj.id })
              }
              className="
                bg-white dark:bg-neutral-900
                rounded-2xl overflow-hidden
                border border-green-600/30
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
                px-4 pt-3.5 pb-4
                flex flex-col
                items-center
                justify-center
                text-center
                bg-white dark:bg-neutral-900
              ">

                {/* Project Logo */}
                {proj.projectLogoUrl && (
                  <div className="
                    w-full
                    h-20
                    flex items-center justify-center
                    px-2
                  ">
                    <img
                      src={proj.projectLogoUrl}
                      alt={`${proj.name} Logo`}
                      loading="lazy"
                      className="
                        max-h-16
                        max-w-50
                        w-auto
                        h-auto
                        object-contain
                        transition-transform duration-300
                        group-hover:scale-105
                      "
                    />
                  </div>
                )}

                {/* English Project Name */}
                <div className="w-full flex items-center justify-center mt-2.5 px-1">

                  <h3
                    className="
                      w-full
                      font-extrabold
                      font-heading
                      text-[#006838]
                      dark:text-green-400
                      tracking-tight
                      text-center
                      leading-snug
                      wrap-break-word
                      transition-colors
                      group-hover:text-green-600
                      dark:group-hover:text-green-300
                      text-base sm:text-lg
                    "
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

      {/* 4. AT A GLANCE BANNER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={atAGlanceRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/60 min-h-[380px] md:min-h-[420px] lg:min-h-[450px] flex items-center"
        >
          {/* Background Image (Clean Cinematic Banner) */}
          <img 
            src="/assets/images/at_a_glance_bg.jpg" 
            alt="Aasceend Group At A Glance" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Contrast & Vignette Overlay - Lightweight so background image remains vibrant and visible */}
          <div className="absolute inset-0 bg-linear-to-r from-black/20 via-black/5 to-black/25 pointer-events-none" />

          {/* Banner Content Container */}
          <div className="relative z-10 w-full px-6 sm:px-10 md:px-12 lg:px-16 py-10 sm:py-12 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
              
              {/* Left Column: Title "AT A GLANCE" in vibrant Yellow */}
              <div className="lg:col-span-4 xl:col-span-4 flex items-center lg:pl-2 xl:pl-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-4xl font-black italic uppercase tracking-wider text-[#FFE500] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] drop-shadow-[0_0_24px_rgba(255,229,0,0.6)]">
                  AT A GLANCE
                </h2>
              </div>

              {/* Right Column: 6 Stats Grid (2 Columns x 3 Rows) - Shifted further right */}
              <div className="lg:col-span-8 xl:col-span-8 flex justify-end lg:pl-8 xl:pl-16">
                <div className="w-full max-w-md sm:max-w-lg lg:max-w-lg lg:ml-auto lg:translate-x-3 xl:translate-x-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-y-7 lg:gap-y-8 gap-x-6 sm:gap-x-8 lg:gap-x-12">
                  
                  {/* 1. Active Concerns */}
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="w-8 sm:w-9 h-8 sm:h-9 shrink-0 flex items-center justify-center pt-0.5 text-[#FFE500]">
                      <Briefcase 
                        className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] drop-shadow-[0_0_10px_rgba(255,229,0,0.45)]" 
                        strokeWidth={2.2} 
                      />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-none mb-1 drop-shadow-[0_2px_5px_rgba(0,0,0,0.85)]">
                        <StatCounter value={12} suffix="+" trigger={isAtAGlanceInView} duration={1.8} />
                      </div>
                      <div className="text-[11px] sm:text-xs font-bold text-white tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        ACTIVE CONCERNS
                      </div>
                    </div>
                  </div>

                  {/* 2. Employees */}
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="w-8 sm:w-9 h-8 sm:h-9 shrink-0 flex items-center justify-center pt-0.5 text-[#FFE500]">
                      <Users 
                        className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] drop-shadow-[0_0_10px_rgba(255,229,0,0.45)]" 
                        strokeWidth={2.2} 
                      />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-none mb-1 drop-shadow-[0_2px_5px_rgba(0,0,0,0.85)]">
                        <StatCounter value={1000} suffix="+" trigger={isAtAGlanceInView} duration={2.2} />
                      </div>
                      <div className="text-[11px] sm:text-xs font-bold text-white tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        EMPLOYEES
                      </div>
                    </div>
                  </div>

                  {/* 3. Sectors */}
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="w-8 sm:w-9 h-8 sm:h-9 shrink-0 flex items-center justify-center pt-0.5 text-[#FFE500]">
                      <PieChart 
                        className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] drop-shadow-[0_0_10px_rgba(255,229,0,0.45)]" 
                        strokeWidth={2.2} 
                      />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-none mb-1 drop-shadow-[0_2px_5px_rgba(0,0,0,0.85)]">
                        <StatCounter value={8} suffix="+" padZero={true} trigger={isAtAGlanceInView} duration={1.8} />
                      </div>
                      <div className="text-[11px] sm:text-xs font-bold text-white tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        SECTORS
                      </div>
                    </div>
                  </div>

                  {/* 4. Land Projects */}
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="w-8 sm:w-9 h-8 sm:h-9 shrink-0 flex items-center justify-center pt-0.5 text-[#FFE500]">
                      <LandPlot 
                        className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] drop-shadow-[0_0_10px_rgba(255,229,0,0.45)]" 
                        strokeWidth={2.2} 
                      />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-none mb-1 drop-shadow-[0_2px_5px_rgba(0,0,0,0.85)]">
                        <StatCounter value={8} padZero={true} trigger={isAtAGlanceInView} duration={1.8} />
                      </div>
                      <div className="text-[11px] sm:text-xs font-bold text-white tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        LAND PROJECTS
                      </div>
                    </div>
                  </div>

                  {/* 5. Resort & Hotel Projects */}
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="w-8 sm:w-9 h-8 sm:h-9 shrink-0 flex items-center justify-center pt-0.5 text-[#FFE500]">
                      <Hotel 
                        className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] drop-shadow-[0_0_10px_rgba(255,229,0,0.45)]" 
                        strokeWidth={2.2} 
                      />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-none mb-1 drop-shadow-[0_2px_5px_rgba(0,0,0,0.85)]">
                        <StatCounter value={5} padZero={true} trigger={isAtAGlanceInView} duration={1.8} />
                      </div>
                      <div className="text-[11px] sm:text-xs font-bold text-white tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        RESORT & HOTEL PROJECTS
                      </div>
                    </div>
                  </div>

                  {/* 6. Apartment Projects */}
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="w-8 sm:w-9 h-8 sm:h-9 shrink-0 flex items-center justify-center pt-0.5 text-[#FFE500]">
                      <Building2 
                        className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] drop-shadow-[0_0_10px_rgba(255,229,0,0.45)]" 
                        strokeWidth={2.2} 
                      />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-none mb-1 drop-shadow-[0_2px_5px_rgba(0,0,0,0.85)]">
                        <StatCounter value={34} suffix="+" trigger={isAtAGlanceInView} duration={2.0} />
                      </div>
                      <div className="text-[11px] sm:text-xs font-bold text-white tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        APARTMENT PROJECTS
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. OUR BUSINESS SECTORS (EXACTLY AS SEEN IN VIDEO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Section Header Matching Other Sections */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-[#006838] dark:text-emerald-400 uppercase tracking-wider">
            Our Business Sectors
          </h2>
          <div className="w-12 h-1 bg-[#ffffff] mx-auto mt-2.5 rounded-full" />
        </div>

        {/* 8-Card Flush Grid (2 rows x 4 columns) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-[2px] bg-neutral-200/80 dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-xl border border-neutral-200 dark:border-neutral-800">
          {BUSINESS_SECTORS.map((sector) => (
            <div
              key={sector.id}
              onClick={() => onNavigate({ type: 'division', divisionId: sector.divisionId })}
              className="group relative h-80 sm:h-96 md:h-[420px] lg:h-[450px] overflow-hidden cursor-pointer select-none"
            >
              {/* Background Image */}
              <img
                src={sector.image}
                alt={sector.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Base Top Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/25 to-black/40 pointer-events-none" />

              {/* Hover Green Overlay */}
              <div className="absolute inset-0 bg-[#006838]/70 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-400 pointer-events-none" />

              {/* Card Content at Top */}
              <div className="absolute inset-x-0 top-0 p-4 sm:p-5 lg:p-6 flex flex-col items-start z-10 text-left">
                {/* Sector Title */}
                <h3 className="text-xs sm:text-sm lg:text-[14px] xl:text-[15px] font-bold font-heading text-white uppercase leading-tight tracking-wide drop-shadow-md">
                  {sector.titleLines.map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}
                      {idx < sector.titleLines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h3>

                {/* Animated Divider Line (expands from left to right) */}
                <div className="w-16 sm:w-20 h-[2.5px] bg-white rounded-full my-2.5 sm:my-3 origin-left transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-500 ease-out" />

                {/* Animated Subsidiary / Concern Name */}
                <p className="text-[10px] sm:text-[11px] lg:text-xs font-semibold uppercase text-white leading-snug tracking-wide opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-active:opacity-100 group-active:translate-y-0 transition-all duration-500 ease-out delay-150 drop-shadow">
                  {sector.concernName}
                </p>
              </div>

              {/* Bottom Card Border: Animates from left to right */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-white origin-left transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-500 ease-out z-20" />
            </div>
          ))}
        </div>
      </section>



      {/* 6. SISTER CONCERNS INTERACTIVE CAROUSEL SLIDER */}
      <SisterConcernsCarousel onNavigate={onNavigate} />

    </div>
  );
};
