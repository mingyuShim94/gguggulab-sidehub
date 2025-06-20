import { Project } from "@/types/project";
import projectsData from "@/data/projects.json";

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getAllProjectsSortedByDate(): Project[] {
  const projects = getAllProjects();
  return projects.sort((a, b) => {
    // 최신 날짜가 먼저 오도록 내림차순 정렬
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export function getProjectById(id: string): Project | undefined {
  return getAllProjects().find((project) => project.id === id);
}
