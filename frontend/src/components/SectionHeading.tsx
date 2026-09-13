import React from 'react';
import { cn } from '../lib/utils';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
  eyebrowColor?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  theme = 'light',
  className = '',
  eyebrowColor
}) => {
  const isDark = theme === 'dark';

  const alignments = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-12 sm:mb-16", alignments[align], className)}>
      {eyebrow && (
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-widest mb-3 inline-block",
            eyebrowColor ? eyebrowColor : isDark ? "text-brand-red" : "text-brand-red"
          )}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15]",
          isDark ? "text-white" : "text-brand-black"
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg font-normal leading-relaxed max-w-2xl",
            isDark ? "text-neutral-400" : "text-brand-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
