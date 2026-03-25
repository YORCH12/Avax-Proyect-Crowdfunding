import { useMemo, useState } from "react";
import { Search, Wallet, ChevronDown, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useConnect, useConnectors, useConnection, useDisconnect, useBalance, useReadContract } from "wagmi";
import { formatEther } from "viem";
import SignupModal from "@/components/SignupModal";
import WalletModal from "@/components/WalletModal";
import { DONATIONBOX_ADDRESS, donationBoxAbi } from "@/blockchain/donationBox";
import { fujiChain } from "@/blockchain/wagmiConfig";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { address, isConnected } = useConnection();
  const { disconnect } = useDisconnect();
  const connectors = useConnectors();
  const { connect } = useConnect();
  const [signupOpen, setSignupOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const firstConnector = connectors[0];
  const shortAddress = useMemo(() => {
    if (!address) return "";
    if (address.length < 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  // Real AVAX balance from the chain
  const { data: balanceData } = useBalance({
    address: address,
    chainId: fujiChain.id,
    query: {
      enabled: !!address,
    },
  });

  const formattedBalance = useMemo(() => {
    if (!balanceData) return "0.00";
    const val = parseFloat(balanceData.formatted);
    return val.toFixed(4);
  }, [balanceData]);

  // Donor stats from the DonationBox contract
  const { data: donorStatsData } = useReadContract({
    address: DONATIONBOX_ADDRESS,
    abi: donationBoxAbi,
    functionName: "donorStats",
    args: address ? [address] : undefined,
    query: {
      enabled: !!DONATIONBOX_ADDRESS && !!address,
    },
  });

  const donationCount = useMemo(() => {
    if (!donorStatsData) return 0;
    return Number(donorStatsData[1]);
  }, [donorStatsData]);

  const totalDonated = useMemo(() => {
    if (!donorStatsData) return "0";
    const val = parseFloat(formatEther(donorStatsData[0]));
    return val.toFixed(4);
  }, [donorStatsData]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-header">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">IS</span>
            </div>
            <span className="font-semibold text-lg text-foreground tracking-tight">
              ImpactSphere
            </span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex items-center bg-secondary rounded-full px-4 py-2 w-full max-w-md mx-8">
            <Search className="w-4 h-4 text-muted-foreground mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Buscar proyectos, organizaciones..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Profile button */}
            {userName ? (
              <button className="flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-3 py-2 text-sm font-medium hover:bg-muted transition-colors duration-150">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="hidden sm:inline">{userName}</span>
              </button>
            ) : (
              <button
                onClick={() => setSignupOpen(true)}
                className="flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-3 py-2 text-sm font-medium hover:bg-muted transition-colors duration-150"
              >
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="hidden sm:inline">Perfil</span>
              </button>
            )}

            {/* Wallet */}
            {isConnected ? (
              <button
                onClick={() => setWalletModalOpen(true)}
                className="flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-sm font-medium hover:bg-muted transition-colors duration-150"
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>{shortAddress}</span>
                <span className="text-muted-foreground">|</span>
                <span className="text-primary font-semibold">{formattedBalance} AVAX</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!firstConnector) return;
                  connect({ connector: firstConnector });
                }}
                disabled={!firstConnector}
                className="flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity duration-150"
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">Conectar Billetera</span>
                <span className="sm:hidden">Wallet</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <SignupModal
        open={signupOpen}
        onOpenChange={setSignupOpen}
        onLogin={(name) => setUserName(name)}
      />

      <WalletModal
        open={walletModalOpen}
        onOpenChange={setWalletModalOpen}
        address={address ?? ""}
        shortAddress={shortAddress}
        onDisconnect={() => disconnect()}
        balance={formattedBalance}
        donationCount={donationCount}
        totalDonated={totalDonated}
      />
    </>
  );
};

export default Header;
