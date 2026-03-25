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
import { User, Mail, Lock, CheckCircle } from "lucide-react";

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (name: string) => void;
}

type View = "signup" | "login";

const SignupModal = ({ open, onOpenChange, onLogin }: SignupModalProps) => {
  const [view, setView] = useState<View>("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = view === "signup" ? name : email.split("@")[0];
    onLogin(displayName);
    setName("");
    setEmail("");
    setPassword("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-xl">
              {view === "signup" ? "Crear Cuenta" : "Iniciar Sesión"}
            </DialogTitle>
          </div>
          <DialogDescription>
            {view === "signup"
              ? "Únete a ImpactSphere para donar y dar seguimiento a las campañas de ayuda."
              : "Ingresa con tu cuenta para continuar."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {view === "signup" && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nombre completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="pl-9"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Correo electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-9"
                required
                minLength={6}
              />
            </div>
          </div>

          {view === "signup" && (
            <div className="flex items-start gap-2 text-xs text-muted-foreground bg-secondary rounded-lg p-3">
              <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Al crear tu cuenta aceptas los términos de servicio y la política de privacidad de ImpactSphere.</span>
            </div>
          )}

          <Button type="submit" className="w-full rounded-full" size="lg">
            {view === "signup" ? "Crear Cuenta" : "Iniciar Sesión"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {view === "signup" ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
            <button
              type="button"
              onClick={() => setView(view === "signup" ? "login" : "signup")}
              className="text-primary font-medium hover:underline"
            >
              {view === "signup" ? "Inicia sesión" : "Regístrate"}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
