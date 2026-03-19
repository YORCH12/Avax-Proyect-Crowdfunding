import { useParams, useNavigate } from "react-router-dom";
import { projects } from "@/data/mockData";
import Header from "@/components/Header";
import DonationPanel from "@/components/DonationPanel";
import MilestoneTimeline from "@/components/MilestoneTimeline";
import ImpactFeed from "@/components/ImpactFeed";
import { ArrowLeft, BadgeCheck, Users, Clock, ExternalLink } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Proyecto no encontrado</h2>
          <button onClick={() => navigate("/")} className="text-primary text-sm font-medium hover:underline">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const raisedPct = (project.raisedUSDC / project.goalUSDC) * 100;
  const executedPct = (project.executedUSDC / project.goalUSDC) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Hero image */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <button
            onClick={() => navigate("/")}
            className="absolute top-6 left-6 flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-card transition-colors duration-150"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
        </div>

        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Story + Timeline */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project info card */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {project.category}
                  </span>
                  {project.verified && (
                    <span className="flex items-center gap-1 text-xs font-medium text-verified-gold">
                      <BadgeCheck className="w-4 h-4" />
                      Organización Verificada (KYC)
                    </span>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{project.title}</h1>
                <p className="text-sm text-muted-foreground mb-4">por {project.orgName}</p>
                <p className="text-foreground/80 leading-relaxed mb-6">{project.longDescription}</p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {project.donors} donantes
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {project.daysLeft} días restantes
                  </div>
                  <a href="#" className="flex items-center gap-1.5 text-chain-blue font-medium hover:underline">
                    Ver Contrato
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Milestone Timeline */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Trazabilidad Radical: Hitos del Proyecto
                </h2>
                <MilestoneTimeline milestones={project.milestones} />
              </div>

              {/* Impact Feed */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground mb-6">Pruebas de Impacto</h2>
                <ImpactFeed proofs={project.impactProofs} />
              </div>
            </div>

            {/* Right: Donation Panel */}
            <div>
              <DonationPanel project={project} />
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-16" />
      </main>
    </div>
  );
};

export default ProjectDetail;
