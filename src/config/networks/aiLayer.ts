import { type Chain } from "viem";

export const testnet = {
  id: 2648,
  name: "AINN Layer2 Testnet",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.ailayer.xyz/"],
    },
  },
  blockExplorers: {
    default: {
      name: "AINN Layer2 Testnet Explorer",
      url: "https://testnet-explorer.ailayer.xyz/",
    },
  },
  contracts: {},
  testnet: true,
} as const satisfies Chain;
