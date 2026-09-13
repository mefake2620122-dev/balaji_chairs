import React from 'react';
import { Gauge, RotateCw, Shield, Sparkles, Wrench, Building, ArrowRight } from 'lucide-react';
import { ChairService } from '../data/services';

export interface ServiceCardProps {
  service: ChairService;
  onRequestRepair?: (service: ChairService) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Gauge: <Gauge className="w-5 h-5 text-brand-red" />,
  RotateCw: <RotateCw className="w-5 h-5 text-brand-red" />,
  Shield: <Shield className="w-5 h-5 text-brand-red" />,
  Sparkles: <Sparkles className="w-5 h-5 text-brand-red" />,
  Wrench: <Wrench className="w-5 h-5 text-brand-red" />,
  Building: <Building className="w-5 h-5 text-brand-red" />
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onRequestRepair }) => {
  return (
    <div
      onClick={() => onRequestRepair?.(service)}
      className="group relative flex flex-col justify-between bg-[#1A1A1A] border border-white/10 hover:border-brand-red/50 rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:shadow-2xl hover:bg-[#202020] cursor-pointer"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover:bg-brand-red/10 group-hover:border-brand-red/30">
            {iconMap[service.icon] || <Wrench className="w-5 h-5 text-brand-red" />}
          </div>
          <span className="text-[11px] font-mono font-medium text-neutral-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
            {service.turnaround}
          </span>
        </div>

        {/* Title and Subtitle */}
        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red block mb-1">
          {service.subtitle}
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-brand-red transition-colors">
          {service.title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed">
          {service.description}
        </p>

        {/* Common Symptoms */}
        <div className="mt-5 pt-4 border-t border-white/5 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
            Common Symptoms:
          </span>
          {service.commonIssues.map((issue, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
              <span className="w-1 h-1 rounded-full bg-brand-red shrink-0" />
              <span>{issue}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-white group-hover:text-brand-red transition-colors">
        <span>Book Part Replacement</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </div>
  );
};
