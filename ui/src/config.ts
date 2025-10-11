import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";
import { http } from "wagmi";

// get envs
const ALCHEMY_RPC_URL = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL;
const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const config = getDefaultConfig({
  appName: "CryptoCanvas",
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [sepolia.id]: http(ALCHEMY_RPC_URL),
  },
});

export default config;
