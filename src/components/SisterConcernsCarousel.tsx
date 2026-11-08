import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { PageView } from '../types';
import { SISTER_CONCERNS, SisterConcernEntry } from '../data/mockData';

// Tripled list for completely seamless infinite non-stop marquee loop
const INFINITE_CONCERNS: SisterConcernEntry[] = [
  ...SISTER_CONCERNS,
  ...SISTER_CONCERNS,
  ...SISTER_CONCERNS
];

interface SisterConcernsCarouselProps {
  onNavigate?: (view: PageView) => void;
}

export const SisterConcernsCarousel: React.FC<SisterConcernsCarouselProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Non-stop continuous marquee scroll loop
  useEffect(() => {
    let animationFrameId: number;
    const speed = 0.85; // Continuous smooth crawling speed

    const step = () => {
      const el = containerRef.current;
      if (el && !isHovered && !isDraggingRef.current) {
        const singleSetWidth = el.scrollWidth / 3;

        // Loop continuously without jumping
        if (el.scrollLeft >= singleSetWidth * 2) {
          el.scrollLeft -= singleSetWidth;
        } else if (el.scrollLeft <= 5) {
          el.scrollLeft += singleSetWidth;
        }

        el.scrollLeft += speed;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    // Initialize position at center set so user can scroll left or right infinitely
    if (containerRef.current) {
      const el = containerRef.current;
      const singleSetWidth = el.scrollWidth / 3;
      el.scrollLeft = singleSetWidth;
    }

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  const handleNext = () => {
    if (containerRef.current) {
      const cardWidth = 240;
      containerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      const cardWidth = 240;
      containerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  // Mouse drag support for smooth manual scrubbing
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftRef.current = containerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleCardClick = (concern: SisterConcernEntry) => {
    if (!onNavigate) return;
    if (concern.divisionId) {
      onNavigate({ type: 'division', divisionId: concern.divisionId });
    } else {
      onNavigate({ type: 'about' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28 select-none">
      {/* Title Header */}
      <div className="text-center mb-8">
        
        <h2 className="text-2xl text-emerald-600 sm:text-3xl font-extrabold font-heading  dark:text-white uppercase tracking-wider mt-1">
          SISTER CONCERNS
        </h2>
        <div className="w-12 h-1 bg-emerald-600 mx-auto mt-2 rounded-full" />
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-xl mx-auto">
          Driving diversified industrial, real estate, technological, and agricultural innovation across Bangladesh.
        </p>
      </div>

      {/* Non-stop Interactive Carousel Slider Container */}
      <div 
        className="relative group/carousel py-2 px-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left Arrow Button (Pinned matching video style) */}
        <button
          onClick={handlePrev}
          aria-label="Scroll left"
          className="absolute -left-1 sm:-left-3 top-1/2 -translate-y-1/2 z-30 w-7 sm:w-8 h-10 sm:h-14 bg-emerald-800 hover:bg-emerald-700 text-white rounded-md flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer border border-emerald-900/30"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={2.5} />
        </button>

        {/* Right Arrow Button (Pinned matching video style) */}
        <button
          onClick={handleNext}
          aria-label="Scroll right"
          className="absolute -right-1 sm:-right-3 top-1/2 -translate-y-1/2 z-30 w-7 sm:w-8 h-10 sm:h-14 bg-emerald-800 hover:bg-emerald-700 text-white rounded-md flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer border border-emerald-900/30"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={2.5} />
        </button>

        {/* Non-stop continuous horizontally scrollable track */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="overflow-x-auto overflow-y-hidden scrollbar-width:none flex gap-3 sm:gap-4 py-3 px-2 sm:px-3 cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {INFINITE_CONCERNS.map((concern, idx) => (
            <div
              key={`${concern.id}-${idx}`}
              onClick={() => handleCardClick(concern)}
              title={`${concern.name} · ${concern.sector}`}
              className="w-45 sm:w-55 lg:w-60 shrink-0 bg-white rounded-xl border border-neutral-200/90 shadow-xs hover:shadow-md hover:border-emerald-500/60 transition-all duration-300 h-28 sm:h-36 flex flex-col items-center justify-center p-2.5 sm:p-3 cursor-pointer group hover:-translate-y-1 relative"
            >
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <img
                  src={concern.logoUrl}
                  alt={concern.name}
                  className="max-h-24 sm:max-h-28 max-w-[92%] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to original asset if needed
                    const target = e.currentTarget;
                    if (target.src !== concern.originalAsset) {
                      target.src = concern.originalAsset;
                    }
                  }}
                />
              </div>

              {/* Subtle hover badge */}
              <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle status caption */}
        {/* <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>11 Active Conglomerate Concerns · Continuous Live Showcase · Hover to pause or use arrows</span>
        </div> */}
      </div>
    </section>
  );
};
