import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxItem {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
  itemCount: string;
}

export interface LightboxProps {
  isOpen: boolean;
  currentIndex: number;
  items: LightboxItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  currentIndex,
  items,
  onClose,
  onPrev,
  onNext
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Top Action Bar */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-4">
        <span className="text-xs text-neutral-400 font-mono">
          {currentIndex + 1} / {items.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev / Next Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous project"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next project"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Container */}
      <div
        className="max-w-5xl w-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl"
          />
        </div>

        {/* Caption Info */}
        <div className="mt-6 text-center max-w-xl text-white space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-red">
            {currentItem.category} • {currentItem.location}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            {currentItem.title}
          </h3>
          <p className="text-sm text-neutral-300 font-normal leading-relaxed">
            {currentItem.description}
          </p>
          <div className="text-xs text-neutral-400 pt-1">
            Fitted: {currentItem.itemCount}
          </div>
        </div>
      </div>
    </div>
  );
};
