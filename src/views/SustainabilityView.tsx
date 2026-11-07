import React, { useState } from 'react';
import { Leaf, Sun, Trees, ShieldCheck, HeartHandshake, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { PageView } from '../types';

interface SustainabilityViewProps {
  initialTab?: 'environment' | 'csr';
  onNavigate: (view: PageView) => void;
  onRequestCall: () => void;
}

export const SustainabilityView: React.FC<SustainabilityViewProps> = ({
  initialTab = 'environment',
  onNavigate,
  onRequestCall
}) => {
  const [activeTab, setActiveTab] = useState<'environment' | 'csr'>(initialTab);

  return (
    <div className="pt-24 pb-16 space-y-16">
      
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80"
            alt="Sustainability"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            ESG & Planetary Responsibility
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Sustainability & Environmental Stewardship
          </h1>
          <p className="text-sm sm:text-base text-emerald-300 font-light">
            Preserving Bangladesh’s natural waterways, fertile soil, and biodiversity for generations to come.
          </p>
        </div>
      </section>

      {/* 2. Switcher */}
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-center p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
          <button
            onClick={() => setActiveTab('environment')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'environment'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-emerald-600'
            }`}
          >
            Environment & Ecology
          </button>
          <button
            onClick={() => setActiveTab('csr')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'csr'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-emerald-600'
            }`}
          >
            Corporate Social Responsibility (CSR)
          </button>
        </div>
      </div>

      {activeTab === 'environment' ? (
        <div className="space-y-16">
          
          {/* Philosophy Section from Video */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6 text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
              <div className="text-center pb-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-neutral-900 dark:text-white">
                  Our Philosophy: The Balance of Progress
                </h2>
                <div className="w-12 h-1 bg-emerald-600 mx-auto mt-3 rounded-full" />
              </div>

              <p>
                Anthropocentrism — the era where mother nature has been utilized, transformed, conquered, and dominated by mankind — has reached a turning point. As occupants of this planet, we have historically demanded from nature what seemed to be abundant and inexhaustible resources to fulfill our desires. However, the emergence of warning signs from nature has provided a vital wakeup call.
              </p>

              <p>
                Aasceend Group recognizes that <strong>Sustainable Development</strong> is the essential term for balancing environment and anthropocentrism, ensuring that our society and economy develop strictly within the earth's carrying capacity.
              </p>
            </div>
          </section>

          {/* Environmental Graphic Banner (As shown in video) */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl overflow-hidden aspect-[16/8] shadow-2xl relative border border-neutral-200 dark:border-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80"
                alt="Eco-friendly Master-planned Community"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <div className="text-white max-w-xl">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                    Green Infrastructure
                  </span>
                  <h3 className="text-xl font-bold font-heading text-white mt-1">
                    40% Minimum Open Space & Waterway Protection in All Townships
                  </h3>
                </div>
              </div>
            </div>
          </section>

          {/* Strategic Objectives (From Video) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-neutral-900 dark:text-white">
                Strategic Objectives
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                To uphold our environmental promise, we endeavor to:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Regulatory Excellence', text: 'Comply with and exceed all relevant environmental regulatory requirements.' },
                { title: 'Constant Monitoring', text: 'Continually improve and monitor our environmental performance metrics.' },
                { title: 'Impact Reduction', text: 'Proactively reduce environmental impacts across all project lifecycles.' },
                { title: 'Inclusive Decision Making', text: 'Incorporate environmental factors into every core business decision.' },
                { title: 'Culture of Awareness', text: 'Increase employee awareness and personal responsibility toward the planet.' },
                { title: 'Renewable Power', text: 'Incorporate rooftop solar grids and rainwater recharge swales across all campuses.' }
              ].map((obj, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2"
                >
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{obj.title}</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed pl-6">
                    {obj.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Track Record of Innovation */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-700 text-center space-y-4">
              <h3 className="text-2xl font-bold font-heading text-white">
                A Track Record of Innovation
              </h3>
              <p className="text-sm text-emerald-100 max-w-2xl mx-auto leading-relaxed">
                From designing efficient industries that require less fossil fuel consumption to implementing multi-stage process water filtration, Aasceend Group has a long history of providing pioneering, environment-friendly solutions for developing the nation's infrastructure.
              </p>
            </div>
          </section>

        </div>
      ) : (
        /* CSR TAB */
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <h2 className="text-2xl font-bold font-heading text-neutral-900 dark:text-white">
              Aasceend Foundation: Impacting Lives Across Bangladesh
            </h2>
            <p>
              Corporate Social Responsibility is at the heart of Aasceend Group’s identity. Through the Aasceend Foundation, we reinvest profits directly into community empowerment, orphan welfare, education stipends, and medical outreach clinics in rural communities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 space-y-2">
                <HeartHandshake className="w-8 h-8 text-emerald-600 mb-2" />
                <h4 className="font-bold text-base text-neutral-900 dark:text-white">Education For Every Child</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Providing full scholarships, backpacks, and STEM tutoring to children from underserved families in Narayanganj and Munshiganj.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 space-y-2">
                <Sun className="w-8 h-8 text-emerald-600 mb-2" />
                <h4 className="font-bold text-base text-neutral-900 dark:text-white">Healthcare & Emergency Relief</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Annual free medical health camps offering basic diagnostic tests, eye surgeries, and essential medicines to over 10,000 residents.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
