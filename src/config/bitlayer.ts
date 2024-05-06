import { type Chain } from "viem";

export const mainnet = {
  id: 200901,
  name: "BitLayer Mainnet",
  nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.bitlayer.org",
        "https://rpc.bitlayer-rpc.com",
        "https://rpc.ankr.com/bitlayer",
      ],
    },
  },
  blockExplorers: {
    default: { name: "BTRScan", url: "https://www.btrscan.com" },
  },
  contracts: {},
} as const satisfies Chain;

export const testnet = {
  id: 200901,
  name: "BitLayer Testnet",
  nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.bitlayer.org"],
    },
  },
  blockExplorers: {
    default: { name: "BTRScan", url: "https://testnet-scan.bitlayer.org" },
  },
  contracts: {},
} as const satisfies Chain;