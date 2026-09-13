import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { SolutionCard } from '../components/SolutionCard';
import { Button } from '../components/Button';
import { solutions, OfficeSolution } from '../data/solutions';

export interface OfficeSolutionsSectionProps {
  onExploreAll: () => void;
  onSelectSolution: (solution: OfficeSolution) => void;
}

export const OfficeSolutionsSection: React.FC<OfficeSolutionsSectionProps> = ({
  onExploreAll,
  onSelectSolution
}) => {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="Architectural Space Planning"
            title="One workspace. Many possibilities."
            description="From single executive chambers to complete commercial floor plans, we furnish cohesive office environments that inspire confidence."
            align="left"
            className="mb-0"
          />

          <Button
            variant="outline"
            size="md"
            onClick={onExploreAll}
            icon={<ArrowRight className="w-4 h-4" />}
            className="self-start md:self-auto shrink-0"
          >
            Explore Office Solutions
          </Button>
        </div>

        {/* 4 Architectural Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {solutions.map((solution) => (
            <SolutionCard
              key={solution.id}
              solution={solution}
              onExplore={onSelectSolution}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
