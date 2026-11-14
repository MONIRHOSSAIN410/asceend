import React, { useState, useEffect } from 'react';
import { ArrowUp, Phone, MessageCircle, Facebook } from 'lucide-react';

interface FloatingActionsProps {
  onRequestCall: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onRequestCall }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-3 sm:right-5 bottom-4 sm:bottom-6 z-40 flex flex-col items-center gap-2 sm:gap-2.5">
      
      {/* Facebook Quick Link */}
      <a
        href="https://www.facebook.com/AasceendGroup/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95"
        title="Visit Aasceend Group on Facebook"
        aria-label="Facebook Page"
      >
        <Facebook className="w-5 h-5 fill-white" />
      </a>

      {/* WhatsApp Quick Chat */}
      <a
        href="https://wa.me/8801896006310"
        target="_blank"
        rel="noreferrer"
        className="w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95"
        title="Chat with Aasceend Group on WhatsApp"
        aria-label="WhatsApp Hotline"
      >
        <MessageCircle className="w-5 h-5" />
      </a>

      {/* Floating Call Back Request button */}
      <button
        onClick={onRequestCall}
        className="w-11 h-11 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95"
        title="Request Call Back"
        aria-label="Request Call Back"
      >
        <Phone className="w-5 h-5" />
      </button>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-neutral-900/90 dark:bg-white/90 hover:bg-neutral-900 dark:hover:bg-white text-white dark:text-neutral-900 flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95 animate-in fade-in"
          title="Back to Top"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
