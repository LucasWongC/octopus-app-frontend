import { type Chain } from "viem";

export const testnet = {
  id: 11503,
  name: "BEVM Testnet",
  nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.bevm.io/rpc"],
    },
  },
  blockExplorers: {
    default: {
      name: "BEVM Testnet Explorer",
      url: "https://scan-testnet.bevm.io",
    },
  },
  contracts: {},
  testnet: true,
} as const satisfies Chain;
