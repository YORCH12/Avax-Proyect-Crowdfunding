import { Copy, ExternalLink, LogOut, Wallet, Shield, Activity } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: string;
  shortAddress: string;
  onDisconnect: () => void;
  balance: string;
  donationCount: number;
  totalDonated: string;
}

const WalletModal = ({
  open,
  onOpenChange,
  address,
  shortAddress,
  onDisconnect,
  balance,
  donationCount,
  totalDonated,
}: WalletModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDisconnect = () => {
    onDisconnect();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Mi Billetera
          </DialogTitle>
          <DialogDescription>
            Gestiona tu conexión y consulta tu actividad on-chain.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Address card */}
          <div className="bg-secondary rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-foreground">Conectada</span>
              </div>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Avalanche Fuji</span>
            </div>
            <div className="flex items-center justify-between bg-background rounded-lg px-3 py-2.5">
              <code className="text-sm text-foreground font-mono">{shortAddress}</code>
              <button
                onClick={handleCopy}
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Copiar dirección"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && (
              <p className="text-xs text-primary font-medium">¡Dirección copiada!</p>
            )}
          </div>

          {/* Balance */}
          <div className="bg-secondary rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-1">Saldo disponible</p>
            <p className="text-2xl font-bold text-foreground">{balance} <span className="text-sm font-medium text-primary">AVAX</span></p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary rounded-xl p-3 text-center">
              <Shield className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{donationCount}</p>
              <p className="text-xs text-muted-foreground">Donaciones</p>
            </div>
            <div className="bg-secondary rounded-xl p-3 text-center">
              <Activity className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{totalDonated} AVAX</p>
              <p className="text-xs text-muted-foreground">Total donado</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-1">
            <a
              href={`https://testnet.snowtrace.io/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
              Ver en SnowTrace
            </a>
            <button
              onClick={handleDisconnect}
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Desconectar Billetera
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
