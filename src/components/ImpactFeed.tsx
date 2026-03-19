import { Camera, Calendar } from "lucide-react";
import { ImpactProof } from "@/data/mockData";

interface ImpactFeedProps {
  proofs: ImpactProof[];
}

const ImpactFeed = ({ proofs }: ImpactFeedProps) => {
  if (proofs.length === 0) {
    return (
      <div className="bg-secondary rounded-xl p-8 text-center">
        <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">
          Aún no hay pruebas de impacto publicadas para este proyecto.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {proofs.map((proof) => (
        <div key={proof.id} className="bg-card rounded-xl border border-border overflow-hidden card-hover">
          <div className="aspect-video overflow-hidden">
            <img src={proof.url} alt={proof.caption} className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <p className="text-sm text-foreground leading-relaxed mb-2">{proof.caption}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{proof.date}</span>
              <span className="mx-1">•</span>
              <span>Hito #{proof.milestoneId}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImpactFeed;
