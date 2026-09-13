import React from 'react';
import { MapPin, ArrowRight, ShieldCheck, PenTool } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { siteConfig } from '../data/siteConfig';

export interface AboutSectionProps {
  onLearnMore?: () => void;
  onOpenEnquiry?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore, onOpenEnquiry }) => {
  return (
    <section className="py-20 sm:py-28 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Editorial Story */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <SectionHeading
              eyebrow="Our Heritage & Ethos"
              title="Local roots. Modern ambitions."
              description="Balaji Chairs began with a straightforward conviction: workspaces in Unnao and nearby regions deserve genuine, ergonomically sound furniture without the markup and fragility of generic online catalog chairs."
              align="left"
              className="mb-6 sm:mb-8"
            />

            <div className="space-y-4 text-sm sm:text-base text-brand-muted leading-relaxed font-normal">
              <p>
                From our centrally located showroom at <strong className="text-brand-black font-semibold">941, Anwar Market, Daroga Bagh, Civil Lines</strong>, we have equipped hundreds of professional environments—from private medical clinics and chartered accountant chambers to expansive IT workstations.
              </p>
              <p>
                Our philosophy balances architectural aesthetics with industrial-strength componentry: certified Class 4 hydraulics, precision tilt plates, and high-density polyurethane cushions built to retain resilience over years of daily commercial use.
              </p>
              <p>
                Equally central to our mission is restorative care. Through our dedicated chair repair and component replacement center, we help businesses maintain, re-cushion, and upgrade existing furniture rather than prematurely discarding it.
              </p>
            </div>

            {/* Credibility highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white border border-black/5 text-brand-red shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-black">Direct Accountability</h4>
                  <p className="text-xs text-brand-muted mt-0.5">Physical showroom presence in Civil Lines, Unnao.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white border border-black/5 text-brand-black shrink-0">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-black">Restoration First</h4>
                  <p className="text-xs text-brand-muted mt-0.5">Complete spares support for gas-lifts, wheels & foam.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={onOpenEnquiry}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Discuss Workspace Project
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={onLearnMore}
              >
                Read Full Story
              </Button>
            </div>

          </div>

          {/* Right: Showroom Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-card border border-black/10 aspect-[4/5] bg-neutral-200">
              <img
                src="/images/brand/showroom-unnao.webp"
                alt="Balaji Chairs Showroom Environment"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red block">
                  Showroom & Workshop
                </span>
                <h4 className="text-lg font-bold tracking-tight">
                  Anwar Market, Daroga Bagh
                </h4>
                <p className="text-xs text-neutral-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-red" />
                  <span>Civil Lines, Unnao, Uttar Pradesh</span>
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
