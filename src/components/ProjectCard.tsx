import { BadgeCheck, Users, Clock } from "lucide-react";
import { Project } from "@/data/mockData";
import { useEffect, useRef, useState } from "react";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const categoryColors: Record<string, string> = {
  "Educación": "bg-chain-blue-light text-chain-blue",
  "Salud": "bg-trust-green-light text-trust-green",
  "Crisis Climática": "bg-amber-50 text-amber-600",
  "Emergencia": "bg-red-50 text-red-600",
};

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const raisedPct = (project.raisedUSDC / project.goalUSDC) * 100;
  const executedPct = (project.executedUSDC / project.goalUSDC) * 100;

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="bg-card rounded-xl border border-border overflow-hidden cursor-pointer card-hover"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[project.category] || "bg-secondary text-secondary-foreground"}`}>
            {project.category}
          </span>
        </div>
        {project.verified && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1">
            <BadgeCheck className="w-3.5 h-3.5 text-verified-gold" />
            <span className="text-xs font-medium text-foreground">Verificada</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs text-muted-foreground font-medium mb-1">{project.orgName}</p>
        <h3 className="font-semibold text-foreground text-base mb-2 leading-snug">{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{project.description}</p>

        {/* Dual Progress */}
        <div className="space-y-2 mb-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Recaudado</span>
              <span className="font-semibold text-foreground">
                ${project.raisedUSDC.toLocaleString()} / ${project.goalUSDC.toLocaleString()} USDC
              </span>
            </div>
            <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full progress-animate"
                style={{ width: visible ? `${raisedPct}%` : "0%" }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Ejecutado</span>
              <span className="font-medium text-executed-teal">
                ${project.executedUSDC.toLocaleString()} USDC
              </span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-executed-teal rounded-full progress-animate"
                style={{ width: visible ? `${executedPct}%` : "0%" }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{project.donors} donantes</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{project.daysLeft} días restantes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
