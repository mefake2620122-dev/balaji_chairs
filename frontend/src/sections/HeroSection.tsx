import React from 'react';
import { ArrowRight, MessageCircle, ChevronDown, ShieldCheck, MapPin } from 'lucide-react';
import { Button } from '../components/Button';
import { siteConfig } from '../data/siteConfig';
import { generateWhatsAppUrl } from '../lib/whatsapp';

export interface HeroSectionProps {
  onExploreProducts: () => void;
  onOpenEnquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onOpenEnquiry
}) => {
  const handleWhatsApp = () => {
    const url = generateWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('trust-snapshot');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen pt-28 pb-16 lg:py-0 flex items-center justify-center overflow-hidden bg-brand-offwhite">
      {/* Subtle architectural ambient background glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-brand-red/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-neutral-200/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-black/5 shadow-subtle backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-black">
                {siteConfig.brandName} • {siteConfig.tagline}
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight leading-[1.08] text-brand-black">
              Furniture for <br className="hidden sm:inline" />
              <span className="relative inline-block text-brand-red">
                better work.
              </span>
            </h1>

            {/* Supporting Subtext */}
            <p className="text-base sm:text-lg md:text-xl text-brand-muted max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Premium office chairs, seating and workspace furniture designed for modern working environments. Available directly from our showroom in Unnao.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={onExploreProducts}
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Explore Products
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleWhatsApp}
                icon={<MessageCircle className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Talk to Us on WhatsApp
              </Button>
            </div>

            {/* Micro Trust Metadata */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-brand-muted font-medium border-t border-black/5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-red" />
                <span>Daroga Bagh, Civil Lines, Unnao</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-black" />
                <span>Class 4 Certified Hydraulics</span>
              </div>
            </div>
          </div>

          {/* Right Product Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Circular soft backdrop pedestal */}
            <div className="relative w-full max-w-md aspect-square rounded-full bg-white/70 backdrop-blur-xl border border-black/5 shadow-card flex items-center justify-center p-8">
              
              {/* Radial gradient floor shadow */}
              <div className="absolute bottom-6 w-48 h-8 rounded-full bg-black/15 blur-xl pointer-events-none" />

              {/* Real Balaji Chairs Executive Chair cutout */}
              <img
                src="/images/brand/executive-chair.png"
                alt="Balaji Chairs Flagship Executive Office Chair"
                className="relative z-10 max-h-[85%] w-auto object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                loading="eager"
              />

              {/* Floating Product Badge */}
              <div className="absolute -bottom-4 right-4 sm:right-6 z-20 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 shadow-elevated text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-red block">
                  Featured Model
                </span>
                <span className="text-xs font-bold text-brand-black block">
                  Aura High-Back Executive
                </span>
                <span className="text-[11px] text-brand-muted">
                  Class 4 Gas Lift • Ergonomic Lumbar
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <button
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-xs font-medium text-neutral-400 hover:text-brand-black transition-colors"
      >
        <span>Scroll to explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};
