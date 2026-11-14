import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PageView } from '../types';
import { SISTER_CONCERNS, SisterConcernEntry } from '../data/mockData';

const PREFERRED_ORDER = [
  'systems',
  'foundation',
  'global-education',
  'holdings',
  'asceend-limited',
  'hotels-resorts',
  'agro-fisheries',
  'logistics',
  'media',
  'garments',
  'property-development',
  'town-development'
];

const ORDERED_CONCERNS = [...SISTER_CONCERNS].sort((a, b) => {
  const indexA = PREFERRED_ORDER.indexOf(a.id);
  const indexB = PREFERRED_ORDER.indexOf(b.id);

  return (
    (indexA === -1 ? PREFERRED_ORDER.length : indexA) -
    (indexB === -1 ? PREFERRED_ORDER.length : indexB)
  );
});

const TOTAL = ORDERED_CONCERNS.length;
const MIDDLE_START = TOTAL * 2;
const INFINITE_ITEMS = Array.from({ length: 5 }, () => ORDERED_CONCERNS).flat();
const SLIDE_TRANSITION = 'transform 550ms cubic-bezier(0.25, 1, 0.5, 1)';

interface SisterConcernsCarouselProps {
  onNavigate?: (view: PageView) => void;
}

interface DragGesture {
  pointerId: number;
  startX: number;
  moved: boolean;
}

export const SisterConcernsCarousel: React.FC<SisterConcernsCarouselProps> = ({
  onNavigate
}) => {
  const [visibleCount, setVisibleCount] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(MIDDLE_START);
  const [withTransition, setWithTransition] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragGesture | null>(null);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      setVisibleCount(width < 640 ? 2 : width < 1024 ? 3 : 5);
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);

    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const moveBy = useCallback((cards: number) => {
    if (dragRef.current || TOTAL === 0) return;

    setWithTransition(true);
    setCurrentIndex(index =>
      Math.max(0, Math.min(INFINITE_ITEMS.length - visibleCount, index + cards))
    );
  }, [visibleCount]);

  const handleNext = useCallback(() => {
    moveBy(visibleCount);
  }, [moveBy, visibleCount]);

  const handlePrev = () => {
    moveBy(-visibleCount);
  };

  useEffect(() => {
    if (isHovered || isPointerDown || TOTAL === 0) return;

    const timer = window.setInterval(handleNext, 3500);
    return () => window.clearInterval(timer);
  }, [isHovered, isPointerDown, handleNext]);

  const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (
      event.target !== event.currentTarget ||
      event.propertyName !== 'transform' ||
      dragRef.current ||
      TOTAL === 0
    ) {
      return;
    }

    const normalizedIndex =
      MIDDLE_START + ((currentIndex - MIDDLE_START) % TOTAL + TOTAL) % TOTAL;

    if (normalizedIndex !== currentIndex) {
      setWithTransition(false);
      setCurrentIndex(normalizedIndex);
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0 || dragRef.current) return;

    suppressClickRef.current = false;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      moved: false
    };

    setIsPointerDown(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const trackWidth = trackRef.current?.clientWidth ?? 0;
    if (!drag || drag.pointerId !== event.pointerId || !trackWidth) return;

    const distance = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(distance) < 6) return;

    if (!drag.moved) {
      drag.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
    }

    const cardWidth = trackWidth / visibleCount;
    const maxLeft = Math.min(
      trackWidth,
      Math.max(0, INFINITE_ITEMS.length - visibleCount - currentIndex) * cardWidth
    );
    const maxRight = Math.min(trackWidth, currentIndex * cardWidth);

    setDragOffset(Math.max(-maxLeft, Math.min(maxRight, distance)));
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    dragRef.current = null;
    suppressClickRef.current = drag.moved;

    if (drag.moved && event.type === 'pointerup') {
      const trackWidth = trackRef.current?.clientWidth ?? 0;

      if (trackWidth > 0) {
        const cardWidth = trackWidth / visibleCount;
        const distance = event.clientX - drag.startX;
        const cards = Math.min(
          visibleCount,
          Math.round(Math.abs(distance) / cardWidth)
        );

        moveBy(-Math.sign(distance) * cards);
      }
    }

    if (drag.moved) setWithTransition(true);

    setDragOffset(0);
    setIsDragging(false);
    setIsPointerDown(false);
  };

  const handleCardClick = (concern: SisterConcernEntry) => {
    if (concern.divisionId) {
      onNavigate?.({ type: 'division', divisionId: concern.divisionId });
    } else {
      onNavigate?.({ type: 'about' });
    }
  };

  const stepPercent = 100 / visibleCount;
  const transformStyle: React.CSSProperties = {
    transform: `translateX(calc(${-currentIndex * stepPercent}% + ${dragOffset}px))`,
    transition: withTransition && !isDragging ? SLIDE_TRANSITION : 'none'
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28 select-none">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#006838] uppercase tracking-wider">
          SISTER CONCERNS
        </h2>
        <div className="w-12 h-1 bg-[#fdfdfd] mx-auto mt-2 rounded-full" />
        <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-xl mx-auto">
          Driving diversified industrial, real estate, technological, and agricultural innovation across Bangladesh.
        </p>
      </div>

      <div
        className="relative group/carousel py-2 px-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute -left-1 sm:-left-3 top-1/2 -translate-y-1/2 z-30 w-7 sm:w-8 h-10 sm:h-12 bg-[#006838] hover:bg-emerald-700 text-white rounded-md flex items-center justify-center shadow-lg transition-transform active:scale-90 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute -right-1 sm:-right-3 top-1/2 -translate-y-1/2 z-30 w-7 sm:w-8 h-10 sm:h-12 bg-[#006838] hover:bg-emerald-700 text-white rounded-md flex items-center justify-center shadow-lg transition-transform active:scale-90 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
        </button>

        <div
          className={`overflow-hidden py-3 px-1 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ touchAction: 'pan-y' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onLostPointerCapture={finishDrag}
          onPointerLeave={event => {
            if (!dragRef.current?.moved) finishDrag(event);
          }}
          onClickCapture={event => {
            if (!suppressClickRef.current) return;

            suppressClickRef.current = false;
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <div
            ref={trackRef}
            className="flex items-center"
            style={transformStyle}
            onTransitionEnd={handleTransitionEnd}
          >
            {INFINITE_ITEMS.map((concern, index) => (
              <div
                key={`${concern.id}-${index}`}
                className="shrink-0 px-2 sm:px-2.5"
                style={{ width: `${stepPercent}%` }}
              >
                <div
                  onClick={() => handleCardClick(concern)}
                  title={`${concern.name} · ${concern.sector}`}
                  className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs hover:shadow-md hover:border-emerald-500/60 transition-all duration-300 h-28 sm:h-32 flex items-center justify-center px-4 py-3 sm:px-5 sm:py-3.5 group hover:-translate-y-1 relative cursor-pointer"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={concern.logoUrl}
                      alt={concern.name}
                      className="w-full h-full max-h-16 sm:max-h-20 object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      draggable={false}
                      onError={event => {
                        const image = event.currentTarget;
                        if (image.getAttribute('src') !== concern.originalAsset) {
                          image.src = concern.originalAsset;
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};