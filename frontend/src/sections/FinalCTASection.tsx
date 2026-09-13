import React from 'react';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { Button } from '../components/Button';
import { siteConfig } from '../data/siteConfig';
import { generateWhatsAppUrl, openWhatsApp } from '../lib/whatsapp';

export interface FinalCTASectionProps {
  onOpenEnquiry: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenEnquiry }) => {
  const handleWhatsApp = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    openWhatsApp({ requirement: "Custom Workspace Quote" });
  };

  return (
    <section className="py-24 sm:py-32 bg-brand-offwhite relative overflow-hidden text-center">
      {/* Soft Ambient Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        <span className="text-xs font-bold uppercase tracking-widest text-brand-red block">
          Direct Commercial Consultation
        </span>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-black tracking-tight leading-[1.1]">
          Let's build a <br />
          <span className="text-brand-red">better workspace.</span>
        </h2>

        <p className="text-base sm:text-lg text-brand-muted max-w-xl mx-auto font-normal leading-relaxed">
          Tell us what you're looking for and we'll help you find the right seating and furniture solution for your budget, ergonomics, and aesthetics.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={onOpenEnquiry}
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Get a Free Quotation
          </Button>

          <Button
            variant="outline"
            size="lg"
            href={generateWhatsAppUrl({ requirement: "Custom Workspace Quote" })}
            onClick={handleWhatsApp}
            icon={<MessageCircle className="w-4 h-4 text-[#25D366]" />}
            className="w-full sm:w-auto cursor-pointer"
          >
            WhatsApp Us
          </Button>
        </div>

        <div className="pt-6 text-xs text-brand-muted">
          Or call our Unnao showroom directly at{' '}
          <a href={`tel:${siteConfig.phoneRaw}`} className="font-bold text-brand-black hover:text-brand-red transition-colors underline">
            {siteConfig.phone}
          </a>
        </div>

      </div>
    </section>
  );
};
