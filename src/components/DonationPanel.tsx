import { useEffect, useState } from "react";
import { ArrowRight, Shield } from "lucide-react";
import { Project } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useConnection, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { formatEther, parseEther } from "viem";
import { DONATIONBOX_ADDRESS, donationBoxAbi } from "@/blockchain/donationBox";
import { fujiChain } from "@/blockchain/wagmiConfig";

interface DonationPanelProps {
  project: Project;
}

const DonationPanel = ({ project }: DonationPanelProps) => {
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const { address, isConnected } = useConnection();
  const {
    data: totalReceived,
    refetch: refetchTotalReceived,
    isPending: isTotalPending,
  } = useReadContract({
    address: DONATIONBOX_ADDRESS,
    abi: donationBoxAbi,
    functionName: "totalReceived",
    args: [],
    query: {
      enabled: !!DONATIONBOX_ADDRESS,
    },
  });

  const raisedPct = (project.raisedUSDC / project.goalUSDC) * 100;

  const {
    data: hash,
    error: writeError,
    isPending: isSending,
    writeContract,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleDonate = async () => {
    if (!DONATIONBOX_ADDRESS) {
      toast({
        title: "Contrato no configurado",
        description: "Falta definir `VITE_DONATIONBOX_ADDRESS` en tu .env.",
      });
      return;
    }

    const parsed = parseFloat(amount);
    if (!amount || Number.isNaN(parsed) || parsed <= 0) return;
    if (!isConnected) {
      toast({
        title: "Conecta tu billetera",
        description: "Necesitas conectar tu wallet para donar.",
      });
      return;
    }

    writeContract({
      address: DONATIONBOX_ADDRESS,
      abi: donationBoxAbi,
      functionName: "donate",
      args: [],
      value: parseEther(amount),
      account: address,
      chain: fujiChain,
    });
  };

  useEffect(() => {
    if (!isConfirmed) return;
    refetchTotalReceived();
    setAmount("");
    toast({
      title: "¡Donación enviada!",
      description: address
        ? `Tu donación se registró en la red (tx: ${hash}).`
        : `tx: ${hash}`,
    });
  }, [address, hash, isConfirmed, refetchTotalReceived, toast]);

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

      {/* On-chain summary */}
      <div className="mb-4">
        <div className="flex justify-between items-center text-sm mb-1">
          <span className="text-muted-foreground">On-chain total</span>
          <span className="font-semibold text-foreground">
            {isTotalPending || totalReceived === undefined ? "—" : `${formatEther(totalReceived)} AVAX`}
          </span>
        </div>
        {!DONATIONBOX_ADDRESS && (
          <p className="text-xs text-muted-foreground">
            Configura `VITE_DONATIONBOX_ADDRESS` para habilitar la interacción on-chain.
          </p>
        )}
      </div>

      {/* Amount input */}
      <div className="mb-4">
        <label className="text-sm font-medium text-foreground mb-2 block">Cantidad (AVAX)</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">AVAX</span>
          <input
            type="number"
            step="0.0001"
            placeholder="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-secondary rounded-lg px-8 py-3 text-foreground text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150"
          />
        </div>
        {/* Quick amounts */}
        <div className="flex gap-2 mt-2">
          {[0.01, 0.05, 0.1, 0.5].map((v) => (
            <button
              key={v.toString()}
              onClick={() => setAmount(v.toString())}
              className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-lg hover:bg-muted transition-colors duration-150"
            >
              {v} AVAX
            </button>
          ))}
        </div>
      </div>

      {/* Donate button */}
      <button
        onClick={handleDonate}
        disabled={
          !DONATIONBOX_ADDRESS ||
          !amount ||
          Number.isNaN(parseFloat(amount)) ||
          parseFloat(amount) <= 0 ||
          isSending ||
          !isConnected
        }
        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg px-6 py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Shield className="w-4 h-4" />
        {isSending ? "Enviando..." : isConfirming ? "Confirmando..." : "Donar Ahora"}
        <ArrowRight className="w-4 h-4" />
      </button>

      {writeError && (
        <p className="text-xs text-red-600 mt-2">
          Error: {(writeError as any).shortMessage || writeError.message}
        </p>
      )}

      {/* Trust indicators */}
      <div className="mt-4 pt-4 border-t border-border space-y-2">
        {[
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
