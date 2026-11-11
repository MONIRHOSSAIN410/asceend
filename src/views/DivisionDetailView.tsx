import React from 'react';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Briefcase,
  Layers,
  TrendingUp,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { PageView, DivisionData } from '../types';
import { DIVISIONS, PROJECTS } from '../data/mockData';

interface DivisionDetailViewProps {
  divisionId: string;
  onNavigate: (view: PageView) => void;
  onRequestCall: () => void;
}

export const DivisionDetailView: React.FC<DivisionDetailViewProps> = ({
  divisionId,
  onNavigate,
  onRequestCall
}) => {
  const division = DIVISIONS.find((d) => d.id === divisionId) || DIVISIONS[0];

  // Specific project filters if real-estate or hospitality
  const relatedProjects = PROJECTS.filter((p) => {
    if (division.id === 'real-estate') return p.category === 'township';
    if (division.id === 'hotel-resort') return p.category !== 'township';
    return false;
  });

  return (
    <div className="pt-10 pb-16 space-y-16">
      
      {/* 1. Hero Banner */}
      <section className="relative py-20 bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={division.heroImage}
            alt={division.name}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-3">
         
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            {division.name}
          </h1>
          <p className="text-base sm:text-lg  font-light max-w-xl mx-auto">
            {division.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Primary Sector Overview Image & Introductory Statement */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="rounded-3xl overflow-hidden aspect-16/8 sm:aspect-21/9 shadow-2xl relative border border-neutral-200 dark:border-neutral-800">
          <img
            src={division.heroImage}
            alt={division.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold font-heading mb-1 text-white">
              {division.concernName}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-200">
              Operating with institutional standards, transparent governance, and world-class domain expertise.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Approach & Capabilities (6 Cards as shown in video) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-600 dark:text-white">
            {division.approachTitle}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-xl mx-auto">
            {division.approachDescription}
          </p>
          <div className="w-16 h-1 bg-emerald-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {division.capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white">
                {cap.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Division Specific Projects (For Real Estate & Hospitality as seen in video) */}
      {relatedProjects.length > 0 && (
        <section className="bg-neutral-100/70 dark:bg-neutral-900/40 py-16 border-y border-neutral-200 dark:border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-600 dark:text-white uppercase tracking-wider">
                Projects In Progress
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Explore active master-planned developments in this division
              </p>
            </div>

            <div className="space-y-12">
              {relatedProjects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm ${
                    idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-4/3 shadow-md">
                    <img
                      src={proj.heroImage}
                      alt={proj.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      {proj.logoBadgeText}
                    </div>

                    <h3 className="text-2xl font-bold font-heading text-neutral-900 dark:text-white">
                      {proj.name}
                    </h3>

                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                      <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl border border-neutral-200 dark:border-neutral-700">
                        <div className="text-xs font-semibold text-neutral-500">Total Land Area</div>
                        <div className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                          {proj.totalLandArea}
                        </div>
                      </div>

                      <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl border border-neutral-200 dark:border-neutral-700">
                        <div className="text-xs font-semibold text-neutral-500">Total Plots / Units</div>
                        <div className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                          {proj.totalPlots}
                        </div>
                      </div>

                      <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 col-span-2 sm:col-span-1">
                        <div className="text-xs font-semibold text-neutral-500">Handover</div>
                        <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200 mt-0.5 truncate">
                          {proj.handoverSchedule}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => onNavigate({ type: 'project', projectId: proj.id })}
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl text-xs shadow-md transition-colors"
                      >
                        <span>Learn more</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Vision Statement */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-700 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
            Vision in {division.name}
          </h3>
          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed max-w-2xl mx-auto">
            {division.vision}
          </p>
        </div>
      </section>

      {/* 6. "Our Concern" Box (As shown in video) */}
      <section className="max-w-xl mx-auto px-4 text-center space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
          Our Concern
        </h4>
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-extrabold text-2xl flex items-center justify-center mb-3 shadow-md">
            A
          </div>
          <div className="text-lg font-extrabold font-heading text-neutral-900 dark:text-white tracking-wide">
            {division.concernLogoText}
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            An Enterprise of Aasceend Group
          </div>
        </div>
      </section>

    </div>
  );
};
