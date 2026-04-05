"use client";

import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { polygon } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { http } from "viem";

// Replace with your WalletConnect Project ID from https://cloud.walletconnect.com/
const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!WALLETCONNECT_PROJECT_ID && typeof window !== "undefined") {
  console.warn(
    "[DRIVEN] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. " +
      "Wallet connections may not work correctly. " +
      "Create a project at https://cloud.walletconnect.com/ and set the env var.",
  );
}

const config = getDefaultConfig({
  appName: "DRIVEN",
  projectId: WALLETCONNECT_PROJECT_ID ?? "YOUR_WALLETCONNECT_PROJECT_ID",
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} locale="ja">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
