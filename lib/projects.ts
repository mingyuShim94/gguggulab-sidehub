import { Project } from "@/types/project";
import projectsData from "@/data/projects.json";

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter(project => project.featured);
}

export function getProjectById(id: string): Project | undefined {
  return getAllProjects().find(project => project.id === id);
}

export function getProjectsByTag(tag: string): Project[] {
  return getAllProjects().filter(project => 
    project.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getProjectsByTechStack(tech: string): Project[] {
  return getAllProjects().filter(project => 
    project.techStack.some(t => t.toLowerCase() === tech.toLowerCase())
  );
}

export function getProjectsByStatus(status: Project['status']): Project[] {
  return getAllProjects().filter(project => project.status === status);
}

export function searchProjects(query: string): Project[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllProjects().filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    project.techStack.some(tech => tech.toLowerCase().includes(lowercaseQuery))
  );
}

export function sortProjects(
  projects: Project[], 
  field: keyof Project, 
  order: 'asc' | 'desc' = 'desc'
): Project[] {
  return [...projects].sort((a, b) => {
    let aValue: string | number | Date = a[field] as string | number | Date;
    let bValue: string | number | Date = b[field] as string | number | Date;

    if (field === 'createdAt' || field === 'updatedAt') {
      aValue = new Date(aValue as string).getTime();
      bValue = new Date(bValue as string).getTime();
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (order === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });
}

export function getProjectStats() {
  const projects = getAllProjects();
  const totalVisitors = projects.reduce((sum, project) => 
    sum + (project.metrics?.visitors || 0), 0
  );
  const totalStars = projects.reduce((sum, project) => 
    sum + (project.metrics?.stars || 0), 0
  );
  
  return {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    featuredProjects: projects.filter(p => p.featured).length,
    totalVisitors,
    totalStars,
    allTags: [...new Set(projects.flatMap(p => p.tags))].sort(),
    allTechStack: [...new Set(projects.flatMap(p => p.techStack))].sort()
  };
}