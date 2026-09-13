import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { ReviewItem } from '../data/reviews';

export interface ReviewCardProps {
  review: ReviewItem;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="relative flex flex-col justify-between bg-white rounded-3xl p-7 sm:p-8 border border-black/5 shadow-subtle hover:shadow-card transition-all duration-300 min-w-[300px] sm:min-w-[360px] flex-1">
      {/* Top Rating and Verification */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1 text-amber-400">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400" />
          ))}
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>{review.badge}</span>
        </div>
      </div>

      {/* Quote */}
      <div className="relative mb-6">
        <Quote className="w-8 h-8 text-neutral-200 absolute -top-3 -left-2 -z-0 opacity-40" />
        <p className="relative z-10 text-sm sm:text-base text-brand-black leading-relaxed font-normal italic">
          "{review.comment}"
        </p>
      </div>

      {/* Author and Role */}
      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-brand-black tracking-tight">
            {review.author}
          </h4>
          <p className="text-xs text-brand-muted">
            {review.role}
          </p>
        </div>
        <span className="text-[11px] font-mono text-neutral-400">
          {review.location}
        </span>
      </div>
    </div>
  );
};
