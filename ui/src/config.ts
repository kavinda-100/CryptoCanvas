import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  anvil,
  sepolia,
} from "wagmi/chains";

const config = getDefaultConfig({
  appName: "CryptoCanvas",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, sepolia, anvil],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default config;
