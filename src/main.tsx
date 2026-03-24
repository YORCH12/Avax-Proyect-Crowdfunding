import { createRoot } from "react-dom/client";
import { WagmiProvider } from "wagmi";
import App from "./App.tsx";
import "./index.css";
import { wagmiConfig } from "@/blockchain/wagmiConfig";

createRoot(document.getElementById("root")!).render(
  <WagmiProvider config={wagmiConfig}>
    <App />
  </WagmiProvider>
);
