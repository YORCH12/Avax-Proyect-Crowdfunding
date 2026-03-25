import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { type Chain } from "viem";

const RPC_URL =
  (import.meta.env.VITE_FUJI_RPC_URL as string | undefined) ||
  "https://api.avax-testnet.xyz/ext/bc/C/rpc";

export const fujiChain: Chain = {
  id: 43113,
  name: "Avalanche Fuji",
  
  nativeCurrency: { name: "AVAX", symbol: "AVAX", decimals: 18 },
  rpcUrls: {
    default: {
      http: [RPC_URL],
    },
  },
  blockExplorers: {
    default: {
      name: "SnowTrace",
      url: "https://testnet.snowtrace.io",
    },
  },
};

export const wagmiConfig = createConfig({
  chains: [fujiChain],
  connectors: [injected()],
  transports: {
    [fujiChain.id]: http(RPC_URL),
  },
});

