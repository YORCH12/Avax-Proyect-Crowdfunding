import { useState } from "react";
import { ArrowRight, Info, Shield, Repeat } from "lucide-react";
import { Project } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

interface DonationPanelProps {
  project: Project;
}

const ETH_PRICE = 3200; // mock

const DonationPanel = ({ project }: DonationPanelProps) => {
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const ethAmount = amount ? parseFloat(amount) / ETH_PRICE : 0;
  const raisedPct = (project.raisedUSDC / project.goalUSDC) * 100;

  const handleDonate = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    toast({
      title: "¡Donación simulada con éxito!",
      description: `Has donado $${parseFloat(amount).toLocaleString()} USDC a "${project.title}".`,
    });
    setAmount("");
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
      <h3 className="font-semibold text-foreground text-lg mb-4">Donar a esta causa</h3>

      {/* Progress summary */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Recaudado</span>
          <span className="font-semibold text-foreground">{raisedPct.toFixed(0)}%</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden mb-1">
          <div className="h-full bg-primary rounded-full progress-animate" style={{ width: `${raisedPct}%` }} />
        </div>
        <p className="text-xs text-muted-foreground">
          ${project.raisedUSDC.toLocaleString()} de ${project.goalUSDC.toLocaleString()} USDC
        </p>
      </div>

      {/* Amount input */}
      <div className="mb-4">
        <label className="text-sm font-medium text-foreground mb-2 block">Cantidad (USDC)</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
          <input
            type="number"
            placeholder="100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-secondary rounded-lg px-8 py-3 text-foreground text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150"
          />
        </div>
        {/* Quick amounts */}
        <div className="flex gap-2 mt-2">
          {[25, 50, 100, 500].map((v) => (
            <button
              key={v}
              onClick={() => setAmount(v.toString())}
              className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-lg hover:bg-muted transition-colors duration-150"
            >
              ${v}
            </button>
          ))}
        </div>
      </div>

      {/* Conversion notice */}
      {amount && parseFloat(amount) > 0 && (
        <div className="bg-chain-blue-light rounded-lg p-3 mb-4 flex items-start gap-2">
          <Repeat className="w-4 h-4 text-chain-blue mt-0.5 shrink-0" />
          <p className="text-xs text-chain-blue leading-relaxed">
            Tu donación de <strong>{ethAmount.toFixed(4)} ETH</strong> se convertirá inmediatamente a{" "}
            <strong>${parseFloat(amount).toLocaleString()} USDC</strong> para proteger el valor para la causa.
          </p>
        </div>
      )}

      {/* Donate button */}
      <button
        onClick={handleDonate}
        disabled={!amount || parseFloat(amount) <= 0}
        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg px-6 py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Shield className="w-4 h-4" />
        Donar Ahora
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Trust indicators */}
      <div className="mt-4 pt-4 border-t border-border space-y-2">
        {[
          "Fondos protegidos en Stablecoin (USDC)",
          "Trazabilidad completa on-chain",
          "Liberación por hitos verificados",
        ].map((text) => (
          <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-3 h-3 text-primary shrink-0" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationPanel;
