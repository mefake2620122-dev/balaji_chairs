import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProductCategory } from '../data/categories';
import { PerspectiveCard } from './PerspectiveCard';

export interface CategoryCardProps {
  category: ProductCategory;
  onClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <PerspectiveCard
      onClick={onClick}
      className="h-full"
      maxTilt={8}
      glareOpacity={0.15}
    >
      <div className="group relative flex flex-col justify-between h-full bg-white rounded-3xl border border-black/5 p-7 transition-all duration-500 hover:shadow-card hover:border-black/10 cursor-pointer overflow-hidden min-h-[380px]">
        {/* Top Header: Number and Arrow */}
        <div className="flex items-center justify-between z-10">
          <span className="text-sm font-mono font-semibold text-neutral-400">
            {category.number}
          </span>
          <div className="w-10 h-10 rounded-full bg-brand-offwhite border border-black/5 flex items-center justify-center text-brand-black transition-all duration-300 group-hover:bg-brand-red group-hover:text-white group-hover:border-transparent group-hover:scale-105">
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Central Image Visual */}
        <div className="relative my-6 aspect-[4/3] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-brand-offwhite/40">
          <img
            src={category.image}
            alt={category.name}
            loading="lazy"
            className="max-h-full w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Bottom Text Content */}
        <div className="z-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red block mb-1">
            {category.highlight}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-brand-black tracking-tight group-hover:text-brand-red transition-colors">
            {category.name}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-brand-muted leading-relaxed line-clamp-2">
            {category.shortDescription}
          </p>
        </div>
      </div>
    </PerspectiveCard>
  );
};
