import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ReviewCard } from '../components/ReviewCard';
import { reviews } from '../data/reviews';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-white border-y border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Customer Trust"
          title="Trusted by customers."
          description="Read experiences from local practitioners, corporate office managers, and institutional coordinators who furnish and repair with Balaji Chairs."
          align="left"
        />

        {/* Reviews Layout: Horizontal cards on desktop, swipeable on mobile */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 overflow-x-auto pb-4 no-scrollbar">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

      </div>
    </section>
  );
};
