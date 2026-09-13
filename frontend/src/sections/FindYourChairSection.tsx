import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Building2, Briefcase, Users, LayoutGrid, Coffee, Home } from 'lucide-react';
import { Button } from '../components/Button';

export interface FindYourChairSectionProps {
  onSelectRecommendation: (category: string) => void;
  onOpenEnquiry: (requirement: string) => void;
}

interface SpaceOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  recommendedCategory: string;
  recommendedCategoryId: string;
  recommendationTitle: string;
  description: string;
  modelSuggestions: string[];
}

export const FindYourChairSection: React.FC<FindYourChairSectionProps> = ({
  onSelectRecommendation,
  onOpenEnquiry
}) => {
  const spaces: SpaceOption[] = [
    {
      id: 'executive',
      label: 'Executive Office',
      icon: <Briefcase className="w-5 h-5" />,
      recommendedCategory: 'Revolving Chairs',
      recommendedCategoryId: 'revolving-chairs',
      recommendationTitle: 'Try our High-Back Executive Revolving Chairs',
      description: 'Preserve poise and prevent lower-back fatigue during high-focus leadership sessions with multi-lock tilt mechanisms and premium leatherette contouring.',
      modelSuggestions: ['Aura High-Back Executive Chair', 'Prism Executive Desk']
    },
    {
      id: 'workstation',
      label: 'Staff Workstation',
      icon: <LayoutGrid className="w-5 h-5" />,
      recommendedCategory: 'Revolving Chairs',
      recommendedCategoryId: 'revolving-chairs',
      recommendationTitle: 'Try our Breathable Ergonomic Mesh Task Chairs',
      description: 'Engineered for intensive 8+ hour coding, accounting, or administrative shifts with breathable high-tensile mesh and active lumbar support.',
      modelSuggestions: ['Verve Ergonomic Mesh Task Chair', 'Nexus 4-Person Cluster']
    },
    {
      id: 'reception',
      label: 'Reception & Waiting',
      icon: <Coffee className="w-5 h-5" />,
      recommendedCategory: 'Visitor Chairs & Stools',
      recommendedCategoryId: 'visitor-chairs',
      recommendationTitle: 'Try our Cantilever Visitor Chairs & Counter Stools',
      description: 'Create an impressive, orderly entrance with durable chrome-framed cantilever visitor chairs and pneumatic counter swivel stools.',
      modelSuggestions: ['Matrix Cantilever Visitor Chair', 'Apex Pneumatic Swivel Stool']
    },
    {
      id: 'meeting',
      label: 'Meeting & Boardroom',
      icon: <Users className="w-5 h-5" />,
      recommendedCategory: 'Visitor Chairs',
      recommendedCategoryId: 'visitor-chairs',
      recommendationTitle: 'Try our Sleek Cantilever & Mid-Back Chairs',
      description: 'Foster dynamic discussion with balanced medium-back seating that keeps team members and clients relaxed yet engaged throughout meetings.',
      modelSuggestions: ['Linea Ribbed Leatherette Cabin Chair', 'Matrix Cantilever Visitor Chair']
    },
    {
      id: 'visitor',
      label: 'Visitor Area',
      icon: <Building2 className="w-5 h-5" />,
      recommendedCategory: 'Visitor Chairs',
      recommendedCategoryId: 'visitor-chairs',
      recommendationTitle: 'Try our Heavy-Gauge Cantilever Visitor Seating',
      description: 'High-density molded foam cushions and non-marking floor glides designed to withstand continuous patient, client, or student footfall.',
      modelSuggestions: ['Matrix Cantilever Visitor Chair']
    },
    {
      id: 'general',
      label: 'General Office & Billing',
      icon: <Home className="w-5 h-5" />,
      recommendedCategory: 'Revolving Stools & Mid-Back',
      recommendedCategoryId: 'revolving-stools',
      recommendationTitle: 'Try our Pneumatic Revolving Stools & Task Chairs',
      description: 'Space-saving 360-degree swivel stools with quick pneumatic lift levers tailored for pharmacy, retail counters, and dynamic multipurpose tasks.',
      modelSuggestions: ['Apex Pneumatic Swivel Stool', 'Verve Mesh Task Chair']
    }
  ];

  const [selectedSpace, setSelectedSpace] = useState<SpaceOption>(spaces[0]);

  return (
    <section className="py-20 sm:py-28 bg-brand-offwhite relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-red block mb-2">
            Interactive Selector
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight">
            Not sure where to start?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-muted">
            What are you furnishing? Select your workspace type below to discover the tailored seating solution.
          </p>
        </div>

        {/* Workspace Options Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
          {spaces.map((space) => {
            const isSelected = selectedSpace.id === space.id;
            return (
              <button
                key={space.id}
                onClick={() => setSelectedSpace(space)}
                className={`p-4 sm:p-5 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 text-center ${
                  isSelected
                    ? 'bg-brand-black text-white shadow-card scale-105 border border-brand-black'
                    : 'bg-white text-brand-black border border-black/5 hover:border-black/20 hover:bg-neutral-50'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-white/10 text-white' : 'bg-brand-offwhite text-brand-red'}`}>
                  {space.icon}
                </div>
                <span className="text-xs font-bold tracking-tight">
                  {space.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Recommendation Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-black/5 shadow-card transition-all duration-500">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-red mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommended Solution for {selectedSpace.label}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight">
                {selectedSpace.recommendationTitle}
              </h3>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => onSelectRecommendation(selectedSpace.recommendedCategoryId)}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              View {selectedSpace.recommendedCategory}
            </Button>
          </div>

          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8">
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                {selectedSpace.description}
              </p>
            </div>
            
            <div className="md:col-span-4 bg-brand-offwhite p-4 rounded-2xl border border-black/5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                Suggested Models:
              </span>
              <ul className="space-y-1.5">
                {selectedSpace.modelSuggestions.map((model, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-semibold text-brand-black">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0" />
                    <span>{model}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
