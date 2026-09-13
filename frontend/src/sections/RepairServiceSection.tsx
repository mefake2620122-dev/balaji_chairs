import React from 'react';
import { Phone, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { Button } from '../components/Button';
import { services, ChairService } from '../data/services';
import { siteConfig } from '../data/siteConfig';

export interface RepairServiceSectionProps {
  onRequestRepair: (service?: ChairService) => void;
}

export const RepairServiceSection: React.FC<RepairServiceSectionProps> = ({
  onRequestRepair
}) => {
  return (
    <section className="py-20 sm:py-28 bg-[#111111] text-white relative overflow-hidden">
      {/* Soft ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-red/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <SectionHeading
            theme="dark"
            eyebrow="Chair Repair & Maintenance"
            title="Don't replace it. Restore it."
            description="Extend the lifespan of your office seating with certified replacement nitrogen cylinders, heavy-duty castors, and master upholstery re-padding."
            align="left"
            className="mb-0"
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <Button
              variant="primary"
              size="md"
              onClick={() => onRequestRepair()}
              icon={<Wrench className="w-4 h-4" />}
            >
              Request a Repair
            </Button>

            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold tracking-tight transition-colors border border-white/10"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call Us Directly</span>
            </a>
          </div>
        </div>

        {/* Services Grid (Loaded directly from centralized services.ts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onRequestRepair={onRequestRepair}
            />
          ))}
        </div>

        {/* Value Callout Footer Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white tracking-tight">
                Have 10 or more office chairs requiring maintenance?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                We provide corporate on-site AMC inspections and discounted batch repairs across Unnao and neighboring districts.
              </p>
            </div>
          </div>

          <button
            onClick={() => onRequestRepair()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-brand-black hover:bg-neutral-200 text-xs font-bold tracking-tight transition-colors shrink-0"
          >
            <span>Book Corporate Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
