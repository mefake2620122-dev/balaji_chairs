import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md',
  showTagline = true
}) => {
  const heights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16'
  };

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Brand Logo Image with zero distortion */}
      <img
        src="/images/brand/balaji-logo.png"
        alt="Balaji Chairs™ - Innovative Creations"
        className={`${heights[size]} w-auto object-contain transition-transform duration-300 hover:scale-[1.02]`}
        loading="eager"
      />
    </div>
  );
};
