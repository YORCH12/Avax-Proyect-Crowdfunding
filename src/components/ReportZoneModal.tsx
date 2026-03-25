import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, AlertTriangle, Camera, Send } from "lucide-react";

interface ReportZoneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const alcaldias = [
  "Álvaro Obregón", "Azcapotzalco", "Benito Juárez", "Coyoacán",
  "Cuajimalpa", "Cuauhtémoc", "Gustavo A. Madero", "Iztacalco",
  "Iztapalapa", "Magdalena Contreras", "Miguel Hidalgo", "Milpa Alta",
  "Tláhuac", "Tlalpan", "Venustiano Carranza", "Xochimilco",
];

const severityLevels = [
  { value: "low", label: "Leve", color: "bg-primary/20 text-primary border-primary/30" },
  { value: "medium", label: "Moderado", color: "bg-[hsl(var(--verified-gold)/0.2)] text-[hsl(var(--verified-gold))] border-[hsl(var(--verified-gold)/0.3)]" },
  { value: "high", label: "Severo", color: "bg-destructive/20 text-destructive border-destructive/30" },
  { value: "critical", label: "Crítico", color: "bg-destructive/30 text-destructive border-destructive/50" },
];

const ReportZoneModal = ({ open, onOpenChange }: ReportZoneModalProps) => {
  const [severity, setSeverity] = useState("");
  const [alcaldia, setAlcaldia] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSeverity("");
      setAlcaldia("");
      setAddress("");
      setDescription("");
      setContactName("");
      setContactPhone("");
      onOpenChange(false);
    }, 2500);
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Send className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Reporte Enviado</h3>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              Tu reporte ha sido registrado. Nuestro equipo verificará la zona lo antes posible.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <DialogTitle className="text-xl">Reportar Zona Afectada</DialogTitle>
          </div>
          <DialogDescription>
            Ayúdanos a identificar zonas de la CDMX afectadas por el sismo para coordinar la ayuda.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Severity */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Nivel de Severidad</label>
            <div className="grid grid-cols-2 gap-2">
              {severityLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setSeverity(level.value)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                    severity === level.value
                      ? level.color + " ring-2 ring-offset-1 ring-ring"
                      : "bg-secondary text-muted-foreground border-border hover:bg-muted"
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* Alcaldía */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Alcaldía</label>
            <select
              value={alcaldia}
              onChange={(e) => setAlcaldia(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            >
              <option value="">Selecciona una alcaldía</option>
              {alcaldias.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Dirección o Referencia</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej: Av. Insurgentes Sur 1234, Col. Roma"
                className="pl-9"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Descripción de Daños</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe los daños observados: edificios colapsados, grietas, fugas de gas..."
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            />
          </div>

          {/* Photo upload placeholder */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Evidencia Fotográfica</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center gap-2 hover:border-primary/40 transition-colors cursor-pointer">
              <Camera className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Arrastra fotos o haz clic para subir</span>
              <span className="text-xs text-muted-foreground/60">JPG, PNG hasta 10MB</span>
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Tu Nombre</label>
              <Input
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Nombre completo"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Teléfono</label>
              <Input
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+52 55 1234 5678"
              />
            </div>
          </div>

          <Button type="submit" className="w-full rounded-full" size="lg" disabled={!severity || !alcaldia}>
            <AlertTriangle className="w-4 h-4" />
            Enviar Reporte
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportZoneModal;
