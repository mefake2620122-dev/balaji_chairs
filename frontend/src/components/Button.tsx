import React from 'react';
import { cn } from '../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  href?: string;
  target?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  isLoading = false,
  className,
  disabled,
  href,
  target,
  type = 'button',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none tracking-tight group cursor-pointer text-center";

  const variants = {
    primary: "bg-brand-red text-white hover:bg-brand-redDark shadow-sm hover:shadow-red-glow",
    secondary: "bg-brand-black text-white hover:bg-brand-graphite shadow-sm",
    outline: "border border-brand-black/20 text-brand-black hover:border-brand-black hover:bg-brand-black/5",
    ghost: "text-brand-black hover:bg-black/5",
    white: "bg-white text-brand-black hover:bg-neutral-100 shadow-sm",
    dark: "bg-neutral-900 border border-white/10 text-white hover:bg-neutral-800"
  };

  const sizes = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-2.5"
  };

  const content = (
    <>
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
      )}

      {icon && iconPosition === 'left' && (
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}

      <span>{children}</span>

      {icon && iconPosition === 'right' && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    const isExternalApp =
      href.startsWith('tel:') ||
      href.startsWith('mailto:') ||
      href.startsWith('whatsapp:') ||
      href.includes('wa.me') ||
      href.includes('api.whatsapp.com') ||
      href.includes('maps.google.com') ||
      href.includes('google.com/maps');

    const isMobile = typeof window !== 'undefined' &&
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768);

    // On mobile, never open deep links in target="_blank" as it causes popup blockers or tab bounce-backs
    const effectiveTarget = isMobile && isExternalApp ? undefined : target;
    const effectiveRel = effectiveTarget === '_blank' ? 'noopener noreferrer' : undefined;

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (props.onClick) {
        props.onClick(e as any);
      }
      if (isMobile && (href.includes('api.whatsapp.com') || href.includes('wa.me'))) {
        e.preventDefault();
        // Extract query or text if available to trigger native protocol
        try {
          const parsed = new URL(href);
          const phone = parsed.searchParams.get('phone') || '917880353900';
          const text = parsed.searchParams.get('text') || '';
          const nativeUrl = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(text)}`;
          window.location.href = nativeUrl;
          setTimeout(() => {
            if (!document.hidden) {
              window.location.href = href;
            }
          }, 1500);
        } catch {
          window.location.href = href;
        }
      }
    };

    return (
      <a
        href={href}
        target={effectiveTarget}
        rel={effectiveRel}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        onClick={handleAnchorClick}
        {...(props as any)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
};
