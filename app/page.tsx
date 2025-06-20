import { ProjectGrid } from "@/components/project-grid";
import { getAllProjects } from "@/lib/projects";

export default function Home() {
  const projects = getAllProjects();

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
                  Personal Side Projects Collection
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="text-xs sm:text-sm text-muted-foreground border border-border rounded-full px-3 py-1">
                  {projects.length} Projects
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <ProjectGrid projects={projects} />
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © gguggulab. Showcase. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a
                href="https://github.com"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:gguggulab@gmail.com"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </a>
              <a
                href="/privacy-policy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
