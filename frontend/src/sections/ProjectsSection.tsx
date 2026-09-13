import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { Lightbox } from '../components/Lightbox';
import { projects, ProjectItem } from '../data/projects';

export const ProjectsSection: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + projects.length) % projects.length);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % projects.length);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Recent Installations"
          title="From chairs to complete workspaces."
          description="A curated glimpse into healthcare consultation cabins, corporate chambers, and open workstation installations furnished by Balaji Chairs."
          align="left"
        />

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleOpenLightbox(idx)}
            />
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <Lightbox
            isOpen={true}
            currentIndex={lightboxIndex}
            items={projects}
            onClose={handleCloseLightbox}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}

      </div>
    </section>
  );
};
