import { Project } from "@/types/project";
import projectsData from "@/data/projects.json";

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getProjectById(id: string): Project | undefined {
  return getAllProjects().find(project => project.id === id);
}

