import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { TrustSnapshotSection } from '../sections/TrustSnapshotSection';
import { ProductCategoriesSection } from '../sections/ProductCategoriesSection';
import { FeaturedProductSection } from '../sections/FeaturedProductSection';
import { FindYourChairSection } from '../sections/FindYourChairSection';
import { OfficeSolutionsSection } from '../sections/OfficeSolutionsSection';
import { RepairServiceSection } from '../sections/RepairServiceSection';
import { WhyBalajiSection } from '../sections/WhyBalajiSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { ReviewsSection } from '../sections/ReviewsSection';
import { AboutSection } from '../sections/AboutSection';
import { ShowroomSection } from '../sections/ShowroomSection';
import { FinalCTASection } from '../sections/FinalCTASection';
import { OfficeSolution } from '../data/solutions';

export interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: (productName?: string, requirement?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenEnquiry
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 01: Hero Section */}
      <HeroSection
        onExploreProducts={() => onNavigate('/products')}
        onOpenEnquiry={() => onOpenEnquiry(undefined, "General Inquiry")}
      />

      {/* 02: Trust / Business Snapshot */}
      <TrustSnapshotSection />

      {/* 03: Product Categories */}
      <ProductCategoriesSection
        onSelectCategory={(catId) => onNavigate(`/products?category=${catId}`)}
      />

      {/* 04: Featured Product Experience */}
      <FeaturedProductSection
        onOpenEnquiry={(product) => onOpenEnquiry(product)}
      />

      {/* 05: Find Your Chair Mini-Selector */}
      <FindYourChairSection
        onSelectRecommendation={(catId) => onNavigate(`/products?category=${catId}`)}
        onOpenEnquiry={(req) => onOpenEnquiry(undefined, req)}
      />

      {/* 06: Office Solutions */}
      <OfficeSolutionsSection
        onExploreAll={() => onNavigate('/solutions')}
        onSelectSolution={() => onNavigate('/solutions')}
      />

      {/* 07: Repair & Service (Dark Theme) */}
      <RepairServiceSection
        onRequestRepair={() => onNavigate('/repair')}
      />

      {/* 08: Why Balaji Chairs */}
      <WhyBalajiSection />

      {/* 09: Projects / Workspaces Gallery & Lightbox */}
      <ProjectsSection />

      {/* 10: Customer Reviews */}
      <ReviewsSection />

      {/* 11: About */}
      <AboutSection
        onLearnMore={() => onNavigate('/about')}
        onOpenEnquiry={() => onOpenEnquiry(undefined, "Commercial Project Consultation")}
      />

      {/* 12: Showroom */}
      <ShowroomSection />

      {/* 13: Final CTA */}
      <FinalCTASection
        onOpenEnquiry={() => onOpenEnquiry(undefined, "Custom Workspace Quote")}
      />
    </div>
  );
};
