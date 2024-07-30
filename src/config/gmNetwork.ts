import { type Chain } from "viem";

export const testnet = {
  id: 202402181627,
  name: "GMNetwork Testnet",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://gmnetwork-testnet.alt.technology"],
    },
  },
  blockExplorers: {
    default: {
      name: "GMNetwork Testnet Explorer",
      url: "https://gmnetwork-testnet-explorer.alt.technology",
    },
  },
  contracts: {},
  testnet: true,
} as const satisfies Chain;
