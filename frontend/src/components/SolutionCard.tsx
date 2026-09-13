import React from 'react';
import { ArrowRight } from 'lucide-react';
import { OfficeSolution } from '../data/solutions';

export interface SolutionCardProps {
  solution: OfficeSolution;
  onExplore?: (solution: OfficeSolution) => void;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ solution, onExplore }) => {
  return (
    <div
      onClick={() => onExplore?.(solution)}
      className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-black/5 hover:border-black/15 shadow-subtle hover:shadow-card transition-all duration-500 cursor-pointer"
    >
      {/* Visual Architectural Cover */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
        <img
          src={solution.image}
          alt={solution.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/90 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            {solution.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold text-brand-black tracking-tight group-hover:text-brand-red transition-colors">
            {solution.title}
          </h3>
          <p className="mt-1 text-xs font-semibold text-brand-red tracking-tight">
            {solution.tagline}
          </p>
          <p className="mt-3 text-xs sm:text-sm text-brand-muted leading-relaxed line-clamp-3">
            {solution.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-brand-black group-hover:text-brand-red transition-colors">
          <span>Explore Architecture</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};
