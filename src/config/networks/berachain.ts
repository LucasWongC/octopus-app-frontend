import { type Chain } from "viem";

export const testnet = {
  id: 80084,
  name: "Berachain bArtio",
  nativeCurrency: { name: "BERA", symbol: "BERA", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://bartio.rpc.berachain.com/"],
    },
  },
  blockExplorers: {
    default: {
      name: "Berachain bArtio Explorer",
      url: "https://bartio.beratrail.io/",
    },
  },
  contracts: {},
  testnet: true,
} as const satisfies Chain;
