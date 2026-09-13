import React, { useState, useEffect } from 'react';
import { Menu, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { siteConfig } from '../data/siteConfig';
import { generateWhatsAppUrl, openWhatsApp } from '../lib/whatsapp';

export interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenMobileMenu: () => void;
  onOpenEnquiryModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenMobileMenu,
  onOpenEnquiryModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Products', path: '/products' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Repair & AMC', path: '/repair' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleWhatsApp = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    openWhatsApp();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3.5 shadow-subtle'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2 focus:outline-none cursor-pointer"
        >
          <Logo size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-black/5 shadow-subtle">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                type="button"
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-brand-black text-white shadow-sm'
                    : 'text-neutral-700 hover:text-brand-black hover:bg-black/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={generateWhatsAppUrl()}
            onClick={handleWhatsApp}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-[#25D366] text-neutral-800 hover:text-white border border-black/10 text-xs font-semibold tracking-tight transition-all duration-300 shadow-subtle cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={onOpenEnquiryModal}
            className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-brand-red text-white text-xs font-semibold tracking-tight hover:bg-brand-redDark transition-all duration-300 shadow-sm hover:shadow-red-glow cursor-pointer"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="p-2 rounded-full bg-white text-brand-black border border-black/5 shadow-subtle"
            aria-label="Call Balaji Chairs"
          >
            <Phone className="w-4 h-4 text-brand-red" />
          </a>
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="p-2.5 rounded-full bg-white text-brand-black border border-black/5 shadow-subtle hover:bg-neutral-50 transition-colors cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
