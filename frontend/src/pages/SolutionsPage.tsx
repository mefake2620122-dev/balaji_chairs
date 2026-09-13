import React from 'react';
import { CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { solutions } from '../data/solutions';
import { generateWhatsAppUrl } from '../lib/whatsapp';

export interface SolutionsPageProps {
  onOpenEnquiry: (requirement: string) => void;
  onNavigate: (path: string) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  onOpenEnquiry,
  onNavigate
}) => {
  const handleWhatsApp = (spaceTitle: string) => {
    const url = generateWhatsAppUrl({ requirement: `Office Solution for ${spaceTitle}` });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-28 pb-24 bg-brand-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <SectionHeading
          eyebrow="Commercial Planning & Ergonomics"
          title="Office Solutions"
          description="A systematic approach to workspace design. Discover coordinated seating, workstations, and tables curated for leadership cabins, team clusters, and customer areas."
          align="left"
        />

        {/* Deep Dive Solution Blocks */}
        <div className="space-y-16 mt-12">
          {solutions.map((solution, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={solution.id}
                className="bg-white rounded-3xl border border-black/5 overflow-hidden shadow-subtle p-6 sm:p-10 lg:p-12"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Image */}
                  <div className={`lg:col-span-6 rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100 ${isReversed ? 'lg:order-2' : ''}`}>
                    <img
                      src={solution.image}
                      alt={solution.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className={`lg:col-span-6 space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-red block mb-1">
                        {solution.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight">
                        {solution.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-brand-black/70">
                        {solution.tagline}
                      </p>
                      <p className="mt-4 text-sm sm:text-base text-brand-muted leading-relaxed">
                        {solution.description}
                      </p>
                    </div>

                    {/* Recommended Units */}
                    <div className="pt-4 border-t border-neutral-100 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                        Recommended Pairing:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {solution.recommendedChairs.concat(solution.recommendedTables).map((item, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-offwhite text-xs font-semibold text-brand-black border border-black/5">
                            <CheckCircle className="w-3.5 h-3.5 text-brand-red" />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="pt-4 flex flex-wrap gap-3">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onOpenEnquiry(`Office Solution: ${solution.title}`)}
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Enquire for this Space
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        href={generateWhatsAppUrl({ requirement: `Office Solution for ${solution.title}` })}
                        target="_blank"
                        icon={<MessageCircle className="w-4 h-4 text-[#25D366]" />}
                        className="cursor-pointer"
                      >
                        WhatsApp Plan
                      </Button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
