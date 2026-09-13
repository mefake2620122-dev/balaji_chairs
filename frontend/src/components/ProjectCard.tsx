import React from 'react';
import { Maximize2, MapPin } from 'lucide-react';
import { ProjectItem } from '../data/projects';

export interface ProjectCardProps {
  project: ProjectItem;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-3xl overflow-hidden bg-white border border-black/5 shadow-subtle hover:shadow-card transition-all duration-500 cursor-pointer flex flex-col"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="p-3 rounded-full bg-white text-brand-black shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Maximize2 className="w-5 h-5" />
          </div>
        </div>

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-black/50 text-white backdrop-blur-md border border-white/20">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-1">
            <MapPin className="w-3.5 h-3.5 text-brand-red" />
            <span>{project.location}</span>
          </div>
          <h3 className="text-lg font-bold text-brand-black tracking-tight group-hover:text-brand-red transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-brand-muted leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-400">
          Scope: {project.itemCount}
        </div>
      </div>
    </div>
  );
};
