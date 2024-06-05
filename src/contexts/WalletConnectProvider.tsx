"use client";

import { FC, PropsWithChildren } from "react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import {
  mainnet,
  bsc,
  sepolia,
  bscTestnet,
  arbitrumSepolia,
  arbitrum,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { isDevelopment, walletConnectProjectId } from "@/config";
import {
  mainnet as bitLayerMainnet,
  testnet as bitLayerTestnet,
} from "@/config/bitlayer";

const config = getDefaultConfig({
  appName: "Octopus",
  projectId: walletConnectProjectId,
  chains: isDevelopment
    ? [sepolia, arbitrumSepolia, bscTestnet, bitLayerTestnet]
    : [mainnet, arbitrum, bsc, bitLayerMainnet],
  transports: {
    [sepolia.id]: http("https://endpoints.omniatech.io/v1/eth/sepolia/public"),
    [arbitrumSepolia.id]: http(
      "https://public.stackup.sh/api/v1/node/arbitrum-sepolia"
    ),
    [bscTestnet.id]: http("https://bsc-testnet-rpc.publicnode.com"),
    [bitLayerTestnet.id]: http("https://testnet-rpc.bitlayer.org"),
    [mainnet.id]: http("https://eth.llamarpc.com"),
    [arbitrum.id]: http("https://arbitrum.llamarpc.com"),
    [bsc.id]: http("https://koge-rpc-bsc.48.club"),
    [bitLayerMainnet.id]: http("https://rpc-bitlayer.rockx.com"),
  },
  ssr: false, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const WalletConnectProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WalletConnectProviders;
