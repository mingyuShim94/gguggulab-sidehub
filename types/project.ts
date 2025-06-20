export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  url: string;
  githubUrl?: string;
  tags: string[];
  techStack: string[];
  status: 'active' | 'maintenance' | 'deprecated';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  metrics?: {
    visitors?: number;
    stars?: number;
  };
}

export interface ProjectFilters {
  tags?: string[];
  techStack?: string[];
  status?: Project['status'];
  featured?: boolean;
}

export interface ProjectSortOptions {
  field: 'createdAt' | 'updatedAt' | 'title' | 'metrics.visitors';
  order: 'asc' | 'desc';
}

export type ProjectGridLayout = 'grid' | 'list';