import React, { useState } from 'react';
import { Mail, Phone, ArrowLeft, Building2 } from 'lucide-react';
import { PageView, LeaderData } from '../types';
import { LEADERS } from '../data/mockData';

interface LeaderViewProps {
  leaderId: string;
  onNavigate: (view: PageView) => void;
  onRequestCall: () => void;
}

export const LeaderView: React.FC<LeaderViewProps> = ({
  leaderId,
  onNavigate,
  onRequestCall
}) => {
  const currentLeader = LEADERS.find((l) => l.id === leaderId) || LEADERS[0];
  const [photoMode, setPhotoMode] = useState<'original' | 'hd'>('original');

  const displayedPhoto =
    currentLeader.id === 'deputy-md'
      ? photoMode === 'hd'
        ? '/assets/images/deputy_md_portrait.jpg'
        : '/assets/images/deputy_md_original_snap.jpg'
      : currentLeader.photoUrl;

  return (
    <div className="pb-16 space-y-12">
      
      {/* 1. Header Hero Banner */}
      <section className="relative py-18 bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
            alt="Corporate Banner"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-2">
        
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
            {currentLeader.title}
          </h1>
          {/* <p className="text-sm sm:text-base  font-medium">
            {currentLeader.roleDescription}
          </p> */}
        </div>
        
      </section>

      {/* 2. Leader Selector Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800/80 rounded-2xl border border-neutral-200 dark:border-neutral-700">
          {LEADERS.map((leader) => (
            <button
              key={leader.id}
              onClick={() => onNavigate({ type: 'leader', leaderId: leader.id })}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                leader.id === currentLeader.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-neutral-600 dark:text-neutral-300 hover:text-emerald-600'
              }`}
            >
              {leader.id === 'deputy-md' ? 'Khandoker Moinur Rahman' : leader.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main Leader Profile Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Portrait, Title & Social Links */}
          <div className="lg:col-span-4 bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm sticky top-28 space-y-6">
            <div className="relative rounded-2xl overflow-hidden aspect-4/5 shadow-inner bg-neutral-100 dark:bg-neutral-800">
              <img
                src={displayedPhoto}
                alt={currentLeader.id === 'deputy-md' ? 'Khandoker Moinur Rahman' : currentLeader.name}
                className={`w-full h-full object-cover ${currentLeader.id === 'deputy-md' ? 'object-top sm:object-center' : 'object-top'}`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* {currentLeader.id === 'deputy-md' && (
              <div className="flex items-center justify-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setPhotoMode('original')}
                  className={`flex-1 py-1 px-2 rounded-lg transition-colors ${
                    photoMode === 'original'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  Original Photo
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoMode('hd')}
                  className={`flex-1 py-1 px-2 rounded-lg transition-colors ${
                    photoMode === 'hd'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  Studio Portrait
                </button>
              </div>
            )} */}

            <div className="space-y-1">
              <h2 className="text-xl font-extrabold font-heading text-neutral-900 dark:text-white">
                {currentLeader.id === 'deputy-md' ? 'Khandoker Moinur Rahman' : currentLeader.name}
              </h2>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 leading-snug">
                {currentLeader.title}
              </p>
              <p className="text-xs text-neutral-500 font-medium">
                {currentLeader.roleDescription}
              </p>
            </div>

            {/* Social / Connect icons */}
            <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-neutral-600 dark:text-neutral-300 text-xs font-bold transition-colors"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-neutral-600 dark:text-neutral-300 text-xs font-bold transition-colors"
                aria-label="X"
              >
                X
              </a>
              <a
                href="https://wa.me/8801896006310"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-neutral-600 dark:text-neutral-300 text-xs font-bold transition-colors"
                aria-label="WhatsApp"
              >
                WA
              </a>
              <a
                href="mailto:info@aasceend.com"
                className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-neutral-600 dark:text-neutral-300 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              onClick={onRequestCall}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-md"
            >
              Schedule Executive Consultation
            </button>
          </div>

          {/* Right Column: Full Biography Prose */}
          <div className="lg:col-span-8 bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-10 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6 text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
            {currentLeader.bioParagraphs.map((para, idx) => (
              <p key={idx}>
                {para}
              </p>
            ))}

            <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <button
                onClick={() => onNavigate({ type: 'about' })}
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to About Us</span>
              </button>

              <button
                onClick={() => onNavigate({ type: 'investor' })}
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              >
                <span>Investor Relations</span>
                <Building2 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};