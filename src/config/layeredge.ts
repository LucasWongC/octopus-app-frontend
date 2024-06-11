import { type Chain } from "viem";

// export const mainnet = {
//   id: 200901,
//   name: "Bitlayer Mainnet",
//   nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 18 },
//   rpcUrls: {
//     default: {
//       http: [
//         "https://rpc.bitlayer.org",
//         "https://rpc.bitlayer-rpc.com",
//         "https://rpc.ankr.com/bitlayer",
//       ],
//     },
//   },
//   blockExplorers: {
//     default: { name: "BTRScan", url: "https://www.btrscan.com" },
//   },
//   contracts: {},
// } as const satisfies Chain;

export const testnet = {
  id: 3456,
  name: "LayerEdge Testnet",
  nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.layeredge.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "LayerScan",
      url: "https://testnet-explorer.layeredge.io",
    },
  },
  contracts: {},
  testnet: true,
} as const satisfies Chain;
