import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (view: PageView) => void;
  onRequestCall: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestCall }) => {
  return (
    <footer className="bg-emerald-950 text-white pt-12 pb-8 border-t border-emerald-900/60">
      
      {/* Pre-Footer Action Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-700/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-1">
              Ready to Build Your Dream? Let’s Start the Conversation.
            </h3>
            <p className="text-emerald-200 text-sm">
              Connect with our senior property advisors for exclusive project briefings and site visits.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a 
              href="tel:+8801896006310" 
              className="flex items-center gap-2 bg-emerald-700/80 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold border border-emerald-500/40 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span className="font-mono">+88 01896 006310</span>
            </a>
            
            <button
              onClick={onRequestCall}
              className="flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-950 font-bold px-5 py-2.5 rounded-xl text-sm shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <span>Request Call Back</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-emerald-900">
          
          {/* Brand Column (Clean Logo without white background box) */}
          <div className="lg:col-span-4 space-y-4">
            <button 
              onClick={() => { onNavigate({ type: 'home' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-block text-left cursor-pointer group"
              aria-label="Aasceend Group Home"
            >
              <div className="flex items-center group-hover:scale-105 transition-transform">
                <img 
                  src="/assets/images/aasceend_logo_official_green.png" 
                  alt="Aasceend Group" 
                  className="h-8 sm:h-10 w-auto object-contain bg-transparent border-0 shadow-none ring-0 outline-none block"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== '/assets/aistudio/10._Aasceend_Group_2-01_1444aef8.png') {
                      target.src = '/assets/aistudio/10._Aasceend_Group_2-01_1444aef8.png';
                    }
                  }}
                />
              </div>
            </button>

            <p className="text-emerald-100 font-serif italic text-base leading-snug">
              "Your Dreams, Our Commitment.<br />
              Building Structures, Creating Ecosystems."
            </p>

            <p className="text-xs text-emerald-300/80 leading-relaxed max-w-sm">
              A forward-looking conglomerate driving sustainable urban development, technology infrastructure, academic consultancy, and high-impact industrial ventures across Bangladesh.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/80 hover:bg-emerald-600 flex items-center justify-center text-emerald-200 hover:text-white transition-colors text-xs font-bold"
                aria-label="Facebook"
              >
                f
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/80 hover:bg-emerald-600 flex items-center justify-center text-emerald-200 hover:text-white transition-colors text-xs font-bold"
                aria-label="X / Twitter"
              >
                X
              </a>
              <a 
                href="https://wa.me/8801896006310" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/80 hover:bg-emerald-600 flex items-center justify-center text-emerald-200 hover:text-white transition-colors text-xs font-bold"
                aria-label="WhatsApp"
              >
                WA
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/80 hover:bg-emerald-600 flex items-center justify-center text-emerald-200 hover:text-white transition-colors text-xs font-bold"
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          {/* Get In Touch - Offices Column */}
          <div className="lg:col-span-8 space-y-6">
            <h4 className="text-lg font-bold font-heading text-white border-b border-emerald-800 pb-2">
              Get In Touch
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Corporate Office */}
              <div className="bg-emerald-900/40 p-4 rounded-xl border border-emerald-800/60 space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <span className="font-semibold text-xs text-white uppercase tracking-wider block">
                      Corporate, Marketing & Sales Office
                    </span>
                    <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
                      House No - 531, Level - 03, Road No - 11, Baridhara DOHS, Dhaka - 1206, Bangladesh.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-800/40 flex flex-col gap-1 text-xs">
                  <a href="tel:+8801896006310" className="flex items-center gap-2 text-emerald-300 hover:text-white transition-colors">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-mono">+88 01896 006310</span>
                  </a>
                  <a href="mailto:info@aasceend.com" className="flex items-center gap-2 text-emerald-300 hover:text-white transition-colors">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>info@aasceend.com</span>
                  </a>
                </div>
              </div>

              {/* Branch Offices */}
              <div className="space-y-4">
                
                {/* Business Development */}
                <div className="bg-emerald-900/40 p-3.5 rounded-xl border border-emerald-800/60">
                  <span className="font-semibold text-xs text-white uppercase tracking-wider block">
                    Business Development, Marketing & Sales Office
                  </span>
                  <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
                    House No - 531, Level - 03, Road No - 11, Baridhara DOHS, Dhaka - 1206, Bangladesh.
                  </p>
                </div>

                {/* Estate Legal Office */}
                <div className="bg-emerald-900/40 p-3.5 rounded-xl border border-emerald-800/60">
                  <span className="font-semibold text-xs text-white uppercase tracking-wider block">
                    Estate, Legal, Marketing & Sales Office
                  </span>
                  <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
                    House No - 531, Level - 03, Road No - 11, Baridhara DOHS, Dhaka - 1206, Bangladesh.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300">
          <div >
            © 2026 <span className="font-semibold text-white">Aasceend Group</span> | All rights reserved
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => onNavigate({ type: 'about' })}
              className="hover:text-white transition-colors"
            >
              About Us
            </button>
            <button 
              onClick={() => onNavigate({ type: 'investor' })}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => onNavigate({ type: 'contact' })}
              className="hover:text-white transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};