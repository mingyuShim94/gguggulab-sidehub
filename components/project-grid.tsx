"use client";

import { ProjectCard } from "./project-card";
import { LazyLoad } from "@/components/ui/lazy-load";
import { Project } from "@/types/project";

interface ProjectGridProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

export function ProjectGrid({ projects, onProjectClick }: ProjectGridProps) {
  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
          Total {projects.length} Projects
        </p>
      </div>

      {/* Project Grid */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        role="grid"
        aria-label="Project List"
      >
        {projects.map((project) => (
          <LazyLoad key={project.id} className="h-full">
            <ProjectCard
              project={project}
              onCardClick={onProjectClick}
            />
          </LazyLoad>
        ))}
      </div>

      {/* No Results */}
      {projects.length === 0 && (
        <div className="text-center py-12" role="status" aria-live="polite">
          <p className="text-lg text-muted-foreground mb-2">No projects found</p>
        </div>
      )}
    </div>
  );
}