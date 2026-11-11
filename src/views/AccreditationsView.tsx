import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck, 
  Star, 
  Building2, 
  BadgeCheck, 
  Landmark,
  ArrowRight,
  ExternalLink,
  Scale
} from 'lucide-react';
import { PageView } from '../types';

interface AccreditationsViewProps {
  onNavigate: (view: PageView) => void;
  onRequestCall: () => void;
}

export const AccreditationsView: React.FC<AccreditationsViewProps> = ({ onNavigate, onRequestCall }) => {
  // Parallax refs and scroll progress
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Smooth parallax transformations for hero
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '40%']);
  const heroScale = useTransform(heroScroll, [0, 1], [1.02, 1.18]);
  const heroOpacity = useTransform(heroScroll, [0, 0.85], [1, 0.25]);

  // Mid-page parallax banner refs
  const bannerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: bannerScroll } = useScroll({
    target: bannerRef,
    offset: ['start end', 'end start']
  });
  const bannerY = useTransform(bannerScroll, [0, 1], ['-22%', '22%']);

  const accreditations = [
    {
      title: 'BLDA Registered Member',
      body: 'Official registration under Bangladesh Land Developers Association (BLDA), guaranteeing industry-standard code of conduct and customer protection.',
      icon: ShieldCheck,
      status: 'Active & Verified',
      regNo: 'Reg # BLDA-2021/DH-084'
    },
    {
      title: 'RAJUK Master Plan Endorsement',
      body: 'Township layouts and road networks aligned with the Capital Development Authority (RAJUK) Detailed Area Plan (DAP) standards.',
      icon: FileCheck,
      status: 'Endorsed & Approved',
      regNo: 'DAP Sector Alignment Verified'
    },
    {
      title: 'National Housing Authority (NHA) Clearances',
      body: 'Verified housing sector compliance ensuring proper demographic density, utility reservations, and structural integrity.',
      icon: CheckCircle2,
      status: 'Certified',
      regNo: 'NHA Urban Zoning Conformity'
    },
    {
      title: 'Department of Environment (DoE) Approvals',
      body: 'Comprehensive Environmental Impact Assessment (EIA) clearance for water preservation, green tree canopy, and eco-drainage.',
      icon: Award,
      status: 'Approved',
      regNo: 'EIA Ecological Clearance'
    },
    {
      title: 'Bangladesh Fire Service & Civil Defence',
      body: 'Fire safety approvals, standard minimum road widths of 30-100 feet for emergency access and hydrants.',
      icon: ShieldCheck,
      status: 'Compliant',
      regNo: 'FSCD Emergency Safety Standard'
    },
    {
      title: 'National Corporate Excellence Award',
      body: 'Recognized for pioneering sustainable suburban community living and transparent land documentation in Greater Dhaka.',
      icon: Star,
      status: 'Awarded 2025',
      regNo: 'National Housing Summit'
    }
  ];

  return (
    <div className="pt-10 pb-20 space-y-16 lg:space-y-24">
      
      {/* 1. HERO BANNER WITH FLUID PARALLAX BACKGROUND */}
      <section 
        ref={heroRef}
        className="relative min-h-120 sm:min-h-135 flex items-center justify-center bg-neutral-950 text-white overflow-hidden"
      >
        {/* Parallax Image Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
            className="absolute top-[-25%] left-[-10%] w-[120%] h-[150%] origin-center"
          >
            <img
              src="/assets/images/bd_corp_hq_1793793604296.jpg"
              alt="Aasceend Accreditations & Corporate Governance"
              className="w-full h-full object-cover object-center"
            />
            {/* Cinematic subtle dark overlay for crisp typography */}
            <div className="absolute inset-0 bg-neutral-950/45" />
            <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/30" />
            <div className="absolute inset-0 bg-linear-to-r from-neutral-950/60 via-transparent to-neutral-950/60" />
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5 py-16">
         

          <motion.h1 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            Accreditations &amp; Awards
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="text-base sm:text-lg text-emerald-200/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
          >
            Recognized by national housing regulators, land development associations, and civic planning authorities across Bangladesh.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-neutral-300"
          >
            
          
          </motion.div>
        </div>
      </section>

      {/* 2. ACCREDITATIONS CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-600 dark:text-white tracking-tight">
            Institutional Certifications
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Every plot and master-planned township follows strict statutory compliance standards mandated by Bangladesh laws.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accreditations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-5 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {item.body}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    {item.status}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {item.regNo}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. FULL-WIDTH PARALLAX SHOWCASE BANNER */}
      <section 
        ref={bannerRef}
        className="relative py-24 sm:py-32 overflow-hidden my-12"
      >
        {/* Parallax Image Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            style={{ y: bannerY, scale: 1.15 }}
            className="absolute top-[-35%] left-[-10%] w-[120%] h-[170%] origin-center"
          >
            <img
              src="/assets/images/bd_town_infra_1793789738145.jpg"
              alt="Aasceend Infrastructure Standards"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-neutral-950/75" />
            <div className="absolute inset-0 left-[-10%] from-neutral-950/90 via-transparent to-neutral-950/90" />
            <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-neutral-950" />
          </motion.div>
        </div>

        {/* Banner Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6">
         

          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight leading-snug drop-shadow-md">
            Zero Tolerance on Title Ambiguity. 100% Freehold Ownership Guaranteed.
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed drop-shadow">
            Every acre in Purbachal Aasceend Town and our satellite communities undergoes multi-tier land revenue verification and survey validation before plot allotment.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="text-2xl font-bold font-mono text-emerald-400">BLDA</div>
              <div className="text-xs text-neutral-300 mt-1 font-medium">Certified Member</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="text-2xl font-bold font-mono text-emerald-400">RAJUK</div>
              <div className="text-xs text-neutral-300 mt-1 font-medium">DAP Compliant</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="text-2xl font-bold font-mono text-emerald-400">DoE</div>
              <div className="text-xs text-neutral-300 mt-1 font-medium">EIA Approved</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="text-2xl font-bold font-mono text-emerald-400">NHA</div>
              <div className="text-xs text-neutral-300 mt-1 font-medium">Housing Clearance</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VERIFICATION CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-10 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl mx-auto flex items-center justify-center">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold font-heading text-neutral-900 dark:text-white">
            Want to Inspect Project Certifications in Person?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto leading-relaxed">
            You are warmly welcomed to our corporate headquarters to review original land titles, CS/SA/RS/BS mutations, and approved master plans with our legal advisory panel.
          </p>
          <div className="pt-2">
            <button
              onClick={onRequestCall}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Book In-Office Document Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
