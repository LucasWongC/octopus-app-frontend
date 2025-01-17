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
  mainnet as bitlayerMainnet,
  testnet as bitlayerTestnet,
} from "@/config/networks/bitlayer";
import { testnet as layerEdgeTestnet } from "@/config/networks/layeredge";
import { testnet as gmTestnet } from "@/config/networks/gmNetwork";
import { testnet as aiLayerTestnet } from "@/config/networks/aiLayer";
import { testnet as bevmTestnet } from "@/config/networks/bevm";
import { testnet as berachainTestnet } from "@/config/networks/berachain";

const config = getDefaultConfig({
  appName: "Octopus",
  projectId: walletConnectProjectId,
  chains: isDevelopment
    ? [
        sepolia,
        arbitrumSepolia,
        bscTestnet,
        bitlayerTestnet,
        layerEdgeTestnet,
        gmTestnet,
        aiLayerTestnet,
        bevmTestnet,
        berachainTestnet,
      ]
    : [mainnet, arbitrum, bsc, bitlayerMainnet],
  transports: {
    [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
    [arbitrumSepolia.id]: http("https://sepolia-rollup.arbitrum.io/rpc"),
    [bscTestnet.id]: http("https://bsc-testnet-rpc.publicnode.com"),
    [bitlayerTestnet.id]: http("https://testnet-rpc.bitlayer.org"),
    [layerEdgeTestnet.id]: http("https://testnet-rpc.layeredge.io"),
    [mainnet.id]: http("https://eth.llamarpc.com"),
    [arbitrum.id]: http("https://api.zan.top/node/v1/arb/one/public"),
    [bsc.id]: http("https://koge-rpc-bsc.48.club"),
    [bitlayerMainnet.id]: http("https://rpc-bitlayer.rockx.com"),
    // [gmTestnet.id]: http("https://gmnetwork-testnet.alt.technology"),
    [aiLayerTestnet.id]: http("https://testnet-rpc.ailayer.xyz/"),
    [bevmTestnet.id]: http("https://testnet.bevm.io/rpc"),
    [berachainTestnet.id]: http("https://bartio.rpc.berachain.com/"),
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
