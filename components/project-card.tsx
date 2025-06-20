import Image from "next/image";
import { ExternalLink, Github, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      aria-label={`프로젝트 ${project.title}로 이동`}
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
            priority={project.featured}
            loading={project.featured ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          {project.featured && (
            <div className="absolute top-2 right-2">
              <Badge variant="default" className="bg-yellow-500 text-yellow-900">
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <Badge 
              variant={project.status === 'active' ? 'default' : 'secondary'}
              className={
                project.status === 'active' 
                  ? 'bg-green-500 text-green-900' 
                  : project.status === 'maintenance' 
                  ? 'bg-blue-500 text-blue-900' 
                  : 'bg-gray-500 text-gray-900'
              }
            >
              {project.status}
            </Badge>
          </div>
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
                aria-label={`${project.title} GitHub 저장소 열기`}
              >
                <Github className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
              aria-label={`${project.title} 프로젝트 열기`}
            >
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex-1 flex flex-col justify-between">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0.5">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                +{project.tags.length - 2}
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 2).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs px-1.5 py-0.5">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 2 && (
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                +{project.techStack.length - 2}
              </Badge>
            )}
          </div>
        </div>

        {project.metrics && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
            {project.metrics.visitors && (
              <div className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                <span>{project.metrics.visitors.toLocaleString()}</span>
              </div>
            )}
            {project.metrics.stars && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                <span>{project.metrics.stars}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}