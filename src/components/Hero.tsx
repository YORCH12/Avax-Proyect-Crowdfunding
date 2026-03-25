import { useState } from "react";
import { ArrowRight, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import ReportZoneModal from "@/components/ReportZoneModal";

interface HeroProps {
  onExplore: () => void;
}

const Hero = ({ onExplore }: HeroProps) => {
  const [reportOpen, setReportOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">
                Transparencia On-Chain Verificable
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-card">
              Ayuda Transparente para los Terremotos de CDMX
            </h1>

            <p className="text-lg md:text-xl mb-8 text-card/80 leading-relaxed max-w-xl">
              Dona criptoactivos para el rescate, refugio y reconstrucción tras los sismos en la Ciudad de México. Cada peso es rastreable on-chain.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={onExplore}
                className="flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-8 py-3.5 text-base font-semibold hover:opacity-90 transition-opacity duration-150"
              >
                Ver Campañas de Ayuda
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setReportOpen(true)}
                className="flex items-center gap-2 bg-card/10 text-card border border-card/20 rounded-full px-8 py-3.5 text-base font-semibold hover:bg-card/20 transition-colors duration-150 backdrop-blur-sm"
              >
                Reportar Zona Afectada
              </button>
            </div>

            <div className="flex gap-8 mt-12">
              {[
                { value: "$1.8M", label: "Fondos Recaudados" },
                { value: "7,234", label: "Donantes Activos" },
                { value: "98.7%", label: "Trazabilidad" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-card">{stat.value}</div>
                  <div className="text-sm text-card/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ReportZoneModal open={reportOpen} onOpenChange={setReportOpen} />
    </>
  );
};

export default Hero;
