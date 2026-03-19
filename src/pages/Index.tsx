import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/mockData";
import { Shield, Link as LinkIcon, Eye } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);

  const scrollToProjects = () => {
    gridRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <Hero onExplore={scrollToProjects} />

        {/* Trust bar */}
        <section className="bg-card border-y border-border py-6">
          <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { icon: Shield, text: "Smart Contracts Auditados" },
              { icon: LinkIcon, text: "Trazabilidad On-Chain" },
              { icon: Eye, text: "Transparencia Total" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-primary" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Projects grid */}
        <section ref={gridRef} className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">Causas Destacadas</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Cada proyecto cuenta con verificación on-chain y trazabilidad completa de fondos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => navigate(`/project/${project.id}`)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 ImpactSphere. Financiación transparente basada en blockchain.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
