import { CheckCircle, RefreshCw, Circle, ExternalLink, FileText, Lock } from "lucide-react";
import { Milestone } from "@/data/mockData";

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

const statusConfig = {
  completed: {
    icon: CheckCircle,
    iconClass: "text-primary",
    lineClass: "bg-primary",
    label: "Completado",
    labelClass: "bg-trust-green-light text-trust-green",
  },
  "in-progress": {
    icon: RefreshCw,
    iconClass: "text-chain-blue",
    lineClass: "bg-chain-blue",
    label: "En Ejecución",
    labelClass: "bg-chain-blue-light text-chain-blue",
  },
  pending: {
    icon: Circle,
    iconClass: "text-muted-foreground",
    lineClass: "bg-border",
    label: "Pendiente",
    labelClass: "bg-secondary text-muted-foreground",
  },
};

const MilestoneTimeline = ({ milestones }: MilestoneTimelineProps) => {
  const lastCompletedIdx = milestones.reduce(
    (acc, m, i) => (m.status === "completed" ? i : acc), -1
  );

  return (
    <div className="space-y-0">
      {milestones.map((milestone, index) => {
        const config = statusConfig[milestone.status];
        const Icon = config.icon;
        const isLast = index === milestones.length - 1;
        const showUnlockNotice =
          milestone.status === "pending" && index > 0 && milestones[index - 1].status !== "completed";

        return (
          <div key={milestone.id} className="relative flex gap-4">
            {/* Timeline line + icon */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                milestone.status === "completed" ? "bg-trust-green-light" :
                milestone.status === "in-progress" ? "bg-chain-blue-light" : "bg-secondary"
              }`}>
                <Icon className={`w-4 h-4 ${config.iconClass} ${milestone.status === "in-progress" ? "animate-spin" : ""}`}
                  style={milestone.status === "in-progress" ? { animationDuration: "3s" } : {}}
                />
              </div>
              {!isLast && (
                <div className={`w-0.5 flex-1 min-h-[24px] ${config.lineClass}`} />
              )}
            </div>

            {/* Content */}
            <div className="pb-8 flex-1 -mt-0.5">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h4 className="font-semibold text-sm text-foreground">{milestone.title}</h4>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${config.labelClass}`}>
                  {config.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{milestone.description}</p>
              <p className="text-xs font-medium text-foreground mb-2">
                ${milestone.amount.toLocaleString()} USDC
              </p>

              {milestone.status === "completed" && milestone.txHash && (
                <div className="flex flex-wrap gap-2">
                  <a href="#" className="inline-flex items-center gap-1 text-xs text-chain-blue font-medium hover:underline">
                    <FileText className="w-3 h-3" />
                    Ver Factura On-Chain
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="#" className="inline-flex items-center gap-1 text-xs text-chain-blue font-medium hover:underline">
                    Ver Transacción
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {milestone.date && (
                <p className="text-[10px] text-muted-foreground mt-1">{milestone.date}</p>
              )}

              {showUnlockNotice && (
                <div className="mt-2 bg-secondary rounded-lg p-2.5 flex items-start gap-2">
                  <Lock className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Los fondos para este hito solo se liberarán cuando la comunidad valide el hito anterior.
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MilestoneTimeline;
