import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  onCardClick?: (project: Project) => void;
}

export function ProjectCard({ project, onCardClick }: ProjectCardProps) {
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(project);
    }
    
    const utmParams = new URLSearchParams({
      utm_source: 'portfolio',
      utm_medium: 'project_card',
      utm_campaign: 'project_showcase',
      utm_content: project.id
    });
    
    window.open(`${project.url}?${utmParams.toString()}`, '_blank', 'noopener,noreferrer');
  };

  const handleGithubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <Card 
      role="button"
      tabIndex={0}
      aria-label={`Go to project ${project.title}`}
      aria-describedby={`project-desc-${project.id}`}
      className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] focus:shadow-lg focus:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 h-full flex flex-col"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
    >
      <CardHeader className="pb-3">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-3">
          <Image
            src={project.thumbnail}
            alt={`${project.title} thumbnail`}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base sm:text-lg mb-1 group-hover:text-primary transition-colors truncate">
              {project.title}
            </CardTitle>
            <CardDescription 
              id={`project-desc-${project.id}`}
              className="text-xs sm:text-sm line-clamp-2"
            >
              {project.shortDescription}
            </CardDescription>
          </div>
          
          <div className="flex gap-1 ml-2 flex-shrink-0">
            {project.githubUrl && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                onClick={handleGithubClick}
                aria-label={`Open ${project.title} GitHub repository`}
              >
                <Github className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
              aria-label={`Open ${project.title} project`}
            >
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex-1 flex flex-col justify-between">
      </CardContent>
    </Card>
  );
}