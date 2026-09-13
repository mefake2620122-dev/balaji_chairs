import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';

export interface LoadingScreenProps {
  isLoading?: boolean;
  message?: string;
  onFinish?: () => void;
  minDisplayTimeMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading = true,
  message = "Innovative Creations",
  onFinish,
  minDisplayTimeMs = 800
}) => {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setFadingOut(true);
        const removeTimer = setTimeout(() => {
          setVisible(false);
          onFinish?.();
        }, 500); // match fade duration
        return () => clearTimeout(removeTimer);
      }, minDisplayTimeMs);
      return () => clearTimeout(timer);
    }
  }, [isLoading, minDisplayTimeMs, onFinish]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-3xl transition-opacity duration-500 ease-out select-none ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-live="polite"
      aria-busy="true"
    >
      {/* Dynamic ambient background glow */}
      <div className="absolute w-72 h-72 rounded-full bg-brand-red/10 blur-[100px] pointer-events-none animate-pulse" />

      {/* Center Brand Identity & Apple Motion Preloader */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Brand Logo with ambient shadow */}
        <div className="transform transition-transform duration-700 hover:scale-105">
          <Logo size="lg" />
        </div>

        {/* Apple HIG Radial Activity Indicator (12-petal fading spinner) */}
        <div className="mt-8 relative w-9 h-9">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute left-[44%] top-0 w-[12%] h-[28%] rounded-full bg-brand-black/70 origin-[50%_180%]"
              style={{
                transform: `rotate(${i * 30}deg)`,
                animation: `appleSpinnerFade 1s linear infinite`,
                animationDelay: `${(i * (1 / 12) - 1).toFixed(3)}s`
              }}
            />
          ))}
        </div>

        {/* Status text */}
        <div className="mt-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-muted block">
            {message}
          </span>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            Unnao, Uttar Pradesh
          </span>
        </div>

        {/* Thin Apple Progress Indicator */}
        <div className="mt-5 w-36 h-[3px] bg-black/5 rounded-full overflow-hidden">
          <div className="h-full bg-brand-red rounded-full animate-apple-progress" />
        </div>
      </div>
    </div>
  );
};
