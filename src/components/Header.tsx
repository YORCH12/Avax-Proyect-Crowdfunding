import { useState } from "react";
import { Search, Wallet, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [connected, setConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
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

        {/* Wallet */}
        {connected ? (
          <button
            onClick={() => setConnected(false)}
            className="flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-sm font-medium hover:bg-muted transition-colors duration-150"
          >
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>0x8a4f...c2d1</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-primary font-semibold">1,250 USDC</span>
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </button>
        ) : (
          <button
            onClick={() => setConnected(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity duration-150"
          >
            <Wallet className="w-4 h-4" />
            Conectar Billetera
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
