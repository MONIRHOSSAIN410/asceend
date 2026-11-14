import React from 'react';

import { 
  Building2, 
  Users, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Eye, 
  Target, 
  Globe2, 
  Sparkles,
  Heart,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { PageView } from '../types';


interface AboutViewProps {
  onNavigate: (view: PageView) => void;
  onRequestCall: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onRequestCall }) => {
  return (
    <div className="pb-16 space-y-16">
      
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
            alt="About Aasceend Group"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-4">
         
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            About Aasceend Group
          </h1>
          <p className="text-lg sm:text-xl text-emerald-300 font-light">
            Building Dreams, Delivering Excellence
          </p>
        </div>
      </section>

      {/* 2. Overview Prose */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed text-base sm:text-lg">
          <p>
            At <strong className="text-neutral-900 dark:text-white font-semibold">Aasceend Group</strong>, our name says it all. Taken from the word <em>"to climb"</em> or <em>"to rise,"</em> it represents our daily mission: to empower progress in Bangladesh and help our nation, our partners, and our people reach new heights of prosperity.
          </p>
          <p>
            We aren’t just building structures; we are creating ecosystems. From premium real estate and sustainable infrastructure to garments, education, and media, we work across multiple sectors to meet the core needs of the people of Bangladesh.
          </p>
        </div>
      </section>

      {/* 3. Why Choose Aasceend? (4 Cards from video) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl text-emerald-600 sm:text-3xl font-extrabold font-heading  dark:text-white">
            Why Choose Aasceend?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-xl mx-auto">
            Investing in property or a project is a big decision. We want you to feel confident in your choice. Here is how we ensure your investment is in safe hands:
          </p>
          <div className="w-16 h-1 bg-emerald-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white mb-2">
                Customer-First Approach
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Your needs drive our designs. Whether it’s a home or a commercial space, we focus on delivering real value for your money and long-term peace of mind.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white mb-2">
                Expert Engineering
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Our team of qualified engineers uses cutting-edge technology and innovative methods to ensure every project is built to last for generations.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white mb-2">
                Strong Management
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                With a solid reputation and professional leadership, we handle every detail so you don’t have to worry about execution risks.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white mb-2">
                Uncompromising Integrity
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We believe in absolute transparency and timely delivery. If we promise it, we deliver it with complete documentation.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Our Core Values (5 Promises from video) */}
      <section className="bg-neutral-100/70 dark:bg-neutral-900/40 py-16 border-y border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-600 dark:text-white">
              Our Core Values
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Our business is built on five simple promises that guide everything we do:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">
                Humble
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                We are dedicated to our clients and never forget that our success is built on your trust.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">
                Integrity
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                We hold ourselves to the highest standards of honesty and professionalism at all times.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">
                Innovative
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                We don’t just follow trends; we set them by constantly improving our methods.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">
                Solution-Based
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                We focus on delivering your "dream project" exactly as promised, on time and on budget.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">
                Servant Leadership
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                We care about our team. When our employees grow, they provide better service to you.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-600 dark:text-white">
            Our Mission & Vision
          </h2>
          <div className="w-16 h-1 bg-emerald-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-heading text-neutral-900 dark:text-white">
                Our Vision
              </h3>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              To redefine modern living in Bangladesh by creating sustainable, master-planned communities that exceed expectations and improve standards of living for everyone.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-heading text-neutral-900 dark:text-white">
                Our Mission
              </h3>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              To acquire prime land and develop it with foresight. We strive to provide the best real estate and infrastructure services in the nation through reliability and an unwavering commitment to our clients.
            </p>
          </div>

        </div>
      </section>

      {/* 6. Our Footprint & Quote */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-700/50 text-center space-y-6">
          <Globe2 className="w-12 h-12 text-emerald-300 mx-auto" />
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Our Footprint
          </h3>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            While we are deeply rooted in the economic landscape of Bangladesh, we are looking toward the horizon. We are actively expanding our reach to meet international needs, playing an essential role in the global economy while keeping our heart right here at home.
          </p>
          <div className="pt-4 border-t border-emerald-800/80">
            <blockquote className="font-serif italic text-lg sm:text-xl text-emerald-200 max-w-xl mx-auto">
              "At Aasceend, we don’t just sell land; we create the possibilities for your dreams to come true."
            </blockquote>
          </div>
        </div>
      </section>

    </div>
  );
};
