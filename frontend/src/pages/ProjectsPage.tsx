import React, { useState, useMemo } from 'react';
import { MapPin, CheckCircle, ArrowRight, MessageCircle, Eye, Sparkles } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { Lightbox } from '../components/Lightbox';
import { projects, ProjectItem } from '../data/projects';
import { generateWhatsAppUrl, openWhatsApp } from '../lib/whatsapp';

export interface ProjectsPageProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: (productName?: string, requirement?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onNavigate,
  onOpenEnquiry
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map(p => p.category)));
    return ['all', ...cats];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    return projects.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

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
    <div className="pt-28 pb-24 bg-brand-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <SectionHeading
          eyebrow="Installed Portfolio & Workspaces"
          title="Turnkey Commercial Projects"
          description="Explore actual workspace installations and clinic suites furnished by Balaji Chairs across Unnao and Uttar Pradesh. We design, deliver, and assemble ergonomic environments engineered to perform."
          align="left"
        />

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-tight whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-black text-white shadow-sm'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-black/5'
                }`}
              >
                {cat === 'all' ? 'All Installations' : cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-black/5 overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Stage */}
              <div
                className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden cursor-pointer"
                onClick={() => handleOpenLightbox(idx)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-4 py-2 rounded-full bg-white/90 text-brand-black text-xs font-bold shadow-elevated flex items-center gap-2 backdrop-blur-md">
                    <Eye className="w-4 h-4" />
                    <span>View High-Res Photo</span>
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 text-brand-black backdrop-blur-md shadow-subtle border border-black/5">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-brand-red mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-brand-black tracking-tight group-hover:text-brand-red transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-600 bg-brand-offwhite p-3 rounded-2xl border border-black/5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{project.itemCount}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onOpenEnquiry(undefined, `Inquiry regarding project layout: ${project.title}`)}
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Enquire Similar Setup
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      href={generateWhatsAppUrl({ requirement: `I am interested in a workspace setup similar to "${project.title}" in Unnao.` })}
                      onClick={(e) => {
                        e.preventDefault();
                        openWhatsApp({ requirement: `I am interested in a workspace setup similar to "${project.title}" in Unnao.` });
                      }}
                      icon={<MessageCircle className="w-4 h-4 text-[#25D366]" />}
                    >
                      WhatsApp Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Turnkey Callout */}
        <div className="mt-16 bg-brand-black text-white p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-red">
              <Sparkles className="w-4 h-4" />
              <span>Commercial Project Execution</span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Furnishing a clinic, corporate office, or school?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
              We bring sample chairs directly to your premises in Unnao and nearby industrial clusters. Enjoy bulk institution pricing and 1-year on-site mechanical warranty.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Button
              variant="primary"
              size="md"
              onClick={() => onOpenEnquiry(undefined, "Commercial Office Bulk Seating Setup")}
              className="w-full sm:w-auto"
            >
              Request Site Visit
            </Button>
            <Button
              variant="dark"
              size="md"
              href={generateWhatsAppUrl({ requirement: "Commercial Bulk Seating Consultation & Site Measurement" })}
              onClick={(e) => {
                e.preventDefault();
                openWhatsApp({ requirement: "Commercial Bulk Seating Consultation & Site Measurement" });
              }}
              icon={<MessageCircle className="w-4 h-4 text-[#25D366]" />}
              className="w-full sm:w-auto"
            >
              Chat on WhatsApp
            </Button>
          </div>
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
    </div>
  );
};
