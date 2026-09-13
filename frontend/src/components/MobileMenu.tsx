import React, { useEffect } from 'react';
import { X, Phone, MessageCircle, ArrowRight, MapPin, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { siteConfig } from '../data/siteConfig';
import { generateWhatsAppUrl } from '../lib/whatsapp';

export interface MobileMenuProps {
  isOpen: boolean;
  currentPath: string;
  onClose: () => void;
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  currentPath,
  onClose,
  onNavigate,
  onOpenEnquiry
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Products Catalogue', path: '/products' },
    { label: 'Office Solutions', path: '/solutions' },
    { label: 'Chair Repair & AMC', path: '/repair' },
    { label: 'Installed Projects', path: '/projects' },
    { label: 'Our Story & Craft', path: '/about' },
    { label: 'Showroom & Contact', path: '/contact' }
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    onClose();
  };

  const handleWhatsApp = () => {
    const url = generateWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-brand-offwhite/95 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-5 border-b border-black/5">
        <Logo size="sm" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="p-2.5 rounded-full bg-white text-brand-black border border-black/5 shadow-subtle cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-6 py-8 flex flex-col justify-between">
        <nav className="space-y-3">
          {links.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                type="button"
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`w-full text-left py-3 px-4 rounded-2xl text-xl font-bold tracking-tight transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-brand-black text-white'
                    : 'text-brand-black hover:bg-black/5'
                }`}
              >
                <span>{link.label}</span>
                <ArrowRight className={`w-4 h-4 ${isActive ? 'text-brand-red' : 'text-neutral-400'}`} />
              </button>
            );
          })}
        </nav>

        {/* Business Location & CTAs */}
        <div className="pt-8 mt-6 border-t border-black/10 space-y-3">
          <div className="flex items-start gap-2.5 text-xs text-brand-muted px-2 mb-2">
            <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
            <span>941, Anwar Market, Daroga Bagh, Civil Lines, Unnao – 209801</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-brand-black text-white text-xs font-semibold tracking-tight shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call Showroom</span>
            </a>

            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-[#25D366] text-white text-xs font-semibold tracking-tight shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenEnquiry();
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-brand-red text-white text-xs font-semibold tracking-tight shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request Quotation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigate('/admin');
              }}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-brand-black transition-colors py-1 cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Staff & Admin Console</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
