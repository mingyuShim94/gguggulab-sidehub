"use client";

import { useState, useMemo } from "react";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";
import { ProjectCard } from "./project-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LazyLoad } from "@/components/ui/lazy-load";
import { Project, ProjectFilters, ProjectSortOptions } from "@/types/project";

interface ProjectGridProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

export function ProjectGrid({ projects, onProjectClick }: ProjectGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<ProjectFilters>({});
  const [sortOptions, setSortOptions] = useState<ProjectSortOptions>({
    field: "updatedAt",
    order: "desc"
  });
  const [showFilters, setShowFilters] = useState(false);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [projects]);

  const availableTechStack = useMemo(() => {
    const techStack = new Set<string>();
    projects.forEach(project => {
      project.techStack.forEach(tech => techStack.add(tech));
    });
    return Array.from(techStack).sort();
  }, [projects]);

  const filteredAndSortedProjects = useMemo(() => {
    const filtered = projects.filter(project => {
      const matchesSearch = !searchQuery || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTags = !filters.tags?.length || 
        filters.tags.some(tag => project.tags.includes(tag));

      const matchesTechStack = !filters.techStack?.length || 
        filters.techStack.some(tech => project.techStack.includes(tech));

      const matchesStatus = !filters.status || project.status === filters.status;

      const matchesFeatured = filters.featured === undefined || project.featured === filters.featured;

      return matchesSearch && matchesTags && matchesTechStack && matchesStatus && matchesFeatured;
    });

    return filtered.sort((a, b) => {
      let aValue: string | number | Date;
      let bValue: string | number | Date;

      switch (sortOptions.field) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "createdAt":
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case "updatedAt":
          aValue = new Date(a.updatedAt);
          bValue = new Date(b.updatedAt);
          break;
        case "metrics.visitors":
          aValue = a.metrics?.visitors || 0;
          bValue = b.metrics?.visitors || 0;
          break;
        default:
          aValue = new Date(a.updatedAt);
          bValue = new Date(b.updatedAt);
      }

      if (sortOptions.order === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  }, [projects, searchQuery, filters, sortOptions]);

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags?.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...(prev.tags || []), tag]
    }));
  };

  const toggleTechStack = (tech: string) => {
    setFilters(prev => ({
      ...prev,
      techStack: prev.techStack?.includes(tech) 
        ? prev.techStack.filter(t => t !== tech)
        : [...(prev.techStack || []), tech]
    }));
  };

  const toggleSort = (field: ProjectSortOptions['field']) => {
    setSortOptions(prev => ({
      field,
      order: prev.field === field && prev.order === "desc" ? "asc" : "desc"
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  const activeFiltersCount = 
    (filters.tags?.length || 0) + 
    (filters.techStack?.length || 0) + 
    (filters.status ? 1 : 0) + 
    (filters.featured !== undefined ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <label htmlFor="project-search" className="sr-only">
              프로젝트 검색
            </label>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <input
              id="project-search"
              type="text"
              placeholder="프로젝트 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-describedby="search-description"
            />
            <div id="search-description" className="sr-only">
              프로젝트 제목, 설명, 태그, 기술 스택으로 검색할 수 있습니다.
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 flex-1 sm:flex-none"
              aria-expanded={showFilters}
              aria-controls="filters-panel"
              aria-label={`필터 ${showFilters ? '숨기기' : '보기'}`}
            >
              <Filter className="h-4 w-4" aria-hidden="true" />
              필터
              {activeFiltersCount > 0 && (
                <Badge variant="default" className="ml-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSort("updatedAt")}
              className="flex items-center justify-center gap-2 flex-1 sm:flex-none"
              aria-label={`${sortOptions.field === "title" ? "이름" : 
                 sortOptions.field === "createdAt" ? "생성일" :
                 sortOptions.field === "metrics.visitors" ? "인기도" : "수정일"}순으로 ${sortOptions.order === "desc" ? "내림차순" : "오름차순"} 정렬`}
            >
              {sortOptions.order === "desc" ? <SortDesc className="h-4 w-4" aria-hidden="true" /> : <SortAsc className="h-4 w-4" aria-hidden="true" />}
              <span className="hidden sm:inline">
                {sortOptions.field === "title" ? "이름" : 
                 sortOptions.field === "createdAt" ? "생성일" :
                 sortOptions.field === "metrics.visitors" ? "인기도" : "수정일"}
              </span>
              <span className="sm:hidden">정렬</span>
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div id="filters-panel" className="p-4 border rounded-lg bg-muted/50 space-y-4" role="region" aria-label="프로젝트 필터">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">필터</h3>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} aria-label="모든 필터 제거">
                  모두 지우기
                </Button>
              )}
            </div>
            
            <div className="space-y-3">
              <fieldset>
                <legend className="text-sm font-medium mb-2">태그</legend>
                <div className="flex flex-wrap gap-2" role="group" aria-label="태그 선택">
                  {availableTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={filters.tags?.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                      onClick={() => toggleTag(tag)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleTag(tag);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={filters.tags?.includes(tag)}
                      aria-label={`${tag} 태그 ${filters.tags?.includes(tag) ? '제거' : '추가'}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </fieldset>
              
              <fieldset>
                <legend className="text-sm font-medium mb-2">기술 스택</legend>
                <div className="flex flex-wrap gap-2" role="group" aria-label="기술 스택 선택">
                  {availableTechStack.map(tech => (
                    <Badge
                      key={tech}
                      variant={filters.techStack?.includes(tech) ? "default" : "outline"}
                      className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                      onClick={() => toggleTechStack(tech)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleTechStack(tech);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={filters.techStack?.includes(tech)}
                      aria-label={`${tech} 기술 ${filters.techStack?.includes(tech) ? '제거' : '추가'}`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </fieldset>
              
              <fieldset>
                <legend className="text-sm font-medium mb-2">상태</legend>
                <div className="flex gap-2" role="group" aria-label="프로젝트 상태 선택">
                  {(['active', 'maintenance', 'deprecated'] as const).map(status => (
                    <Badge
                      key={status}
                      variant={filters.status === status ? "default" : "outline"}
                      className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                      onClick={() => setFilters(prev => ({ 
                        ...prev, 
                        status: prev.status === status ? undefined : status 
                      }))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setFilters(prev => ({ 
                            ...prev, 
                            status: prev.status === status ? undefined : status 
                          }));
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={filters.status === status}
                      aria-label={`${status === 'active' ? '활성' : status === 'maintenance' ? '유지보수' : '비활성'} 상태 ${filters.status === status ? '제거' : '선택'}`}
                    >
                      {status === 'active' ? '활성' : status === 'maintenance' ? '유지보수' : '비활성'}
                    </Badge>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
          총 {projects.length}개 프로젝트 중 {filteredAndSortedProjects.length}개 표시
        </p>
      </div>

      {/* Project Grid */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        role="grid"
        aria-label="프로젝트 목록"
      >
        {filteredAndSortedProjects.map((project) => (
          <LazyLoad key={project.id} className="h-full">
            <ProjectCard
              project={project}
              onCardClick={onProjectClick}
            />
          </LazyLoad>
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedProjects.length === 0 && (
        <div className="text-center py-12" role="status" aria-live="polite">
          <p className="text-lg text-muted-foreground mb-2">프로젝트를 찾을 수 없습니다</p>
          <p className="text-sm text-muted-foreground">
            검색어나 필터를 조정해보세요
          </p>
        </div>
      )}
    </div>
  );
}