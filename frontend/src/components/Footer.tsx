import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ArrowUpRight, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { siteConfig } from '../data/siteConfig';
import { generateWhatsAppUrl, openWhatsApp, openGoogleMaps } from '../lib/whatsapp';

export interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEnquiry }) => {
  const currentYear = new Date().getFullYear();

  const handleWhatsApp = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    openWhatsApp();
  };

  const handleDirections = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    openGoogleMaps();
  };

  return (
    <footer className="bg-brand-black text-white pt-16 sm:pt-20 pb-24 md:pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-3 rounded-2xl inline-block">
              <Logo size="sm" />
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              Specialist manufacturers and distributors of revolving chairs, visitor chairs, revolving stools, and modern office furniture systems. Crafted for ergonomic posture and workspace longevity.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-tight transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91 78803 53900</span>
              </a>
              <a
                href={generateWhatsAppUrl()}
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-white text-xs font-semibold tracking-tight transition-colors border border-[#25D366]/30 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] group-hover:text-white" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-red">
              Product Lines
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
              <li>
                <button type="button" onClick={() => onNavigate('/products')} className="hover:text-white transition-colors cursor-pointer">
                  Revolving Chairs
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('/products')} className="hover:text-white transition-colors cursor-pointer">
                  Visitor & Cantilever Chairs
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('/products')} className="hover:text-white transition-colors cursor-pointer">
                  Pneumatic Revolving Stools
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('/products')} className="hover:text-white transition-colors cursor-pointer">
                  Executive Desks & Tables
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('/solutions')} className="hover:text-white transition-colors cursor-pointer">
                  Modular Workstations
                </button>
              </li>
            </ul>
          </div>

          {/* Services & Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-red">
              Services & Spaces
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
              <li>
                <button type="button" onClick={() => onNavigate('/repair')} className="hover:text-white transition-colors cursor-pointer">
                  Hydraulic Replacement
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('/repair')} className="hover:text-white transition-colors cursor-pointer">
                  Wheel & Castor Replacement
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('/repair')} className="hover:text-white transition-colors cursor-pointer">
                  Foam Cushioning & Upholstery
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('/solutions')} className="hover:text-white transition-colors cursor-pointer">
                  Corporate Office Setup
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('/projects')} className="hover:text-white transition-colors cursor-pointer">
                  Recent Installations
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-red">
              Showroom Location
            </h4>
            <div className="text-xs text-neutral-400 space-y-2 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>941, Anwar Market, Daroga Bagh, Civil Lines, Unnao, UP – 209801</span>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <p>Mon – Sat: 10:00 AM – 8:30 PM</p>
                  <p>Sun: 11:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <a
                href={siteConfig.googleMapsUrl}
                onClick={handleDirections}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white underline underline-offset-4 cursor-pointer"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {currentYear} Balaji Chairs™ (Innovative Creations). All Rights Reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button type="button" onClick={() => onNavigate('/privacy')} className="hover:text-neutral-300 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button type="button" onClick={() => onNavigate('/terms')} className="hover:text-neutral-300 transition-colors cursor-pointer">
              Terms of Supply
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/admin')}
              className="hover:text-neutral-300 text-neutral-500 transition-colors flex items-center gap-1 group cursor-pointer"
              title="Staff & Management CRM Portal"
            >
              <Lock className="w-3 h-3 text-neutral-500 group-hover:text-brand-red transition-colors" />
              <span>Staff Portal</span>
            </button>
            <button type="button" onClick={onOpenEnquiry} className="hover:text-white text-brand-red transition-colors font-semibold cursor-pointer">
              Instant Quotation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
