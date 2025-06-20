import { ProjectGrid } from "@/components/project-grid";
import { getAllProjects, getProjectStats } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  const projects = getAllProjects();
  const stats = getProjectStats();


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Project Showcase
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  개인 사이드프로젝트 모음집
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <Badge variant="outline" className="text-xs sm:text-sm">
                  {stats.totalProjects} Projects
                </Badge>
                <Badge variant="outline" className="text-xs sm:text-sm hidden sm:inline-flex">
                  {stats.totalVisitors.toLocaleString()} Visitors
                </Badge>
                <ThemeToggle />
              </div>
            </div>
            
            {/* Stats Overview */}  
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-primary">{stats.activeProjects}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-primary">{stats.featuredProjects}</div>
                <div className="text-sm text-muted-foreground">Featured</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-primary">{stats.totalStars}</div>
                <div className="text-sm text-muted-foreground">Stars</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-primary">{stats.allTechStack.length}</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <ProjectGrid 
          projects={projects}
        />
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 Project Showcase. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="https://github.com" className="hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="mailto:contact@example.com" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
