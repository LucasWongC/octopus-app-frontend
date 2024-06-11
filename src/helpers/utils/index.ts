import { isDevelopment } from "@/config";

export const truncate = (value: string, prefix: number, suffix: number = 0) => {
  return value.length <= prefix + suffix
    ? value
    : value.substring(0, prefix) +
        "..." +
        value.substring(value.length - suffix);
};

export const toLocalTime = (timestamp: number) => {
  const dt = new Date(timestamp);

  return dt.toLocaleString();
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getExplorerUrl = (chain: Chain) => {
  if (isDevelopment) {
    switch (chain) {
      case "Ethereum":
        return "https://sepolia.etherscan.io/";
      case "Arbitrum":
        return "https://sepolia.arbiscan.io/";
      case "BSC":
        return "https://testnet.bscscan.com/";
      case "Bitlayer":
        return "https://testnet-scan.bitlayer.org/";
      case "Bitcoin":
        return "https://mempool.space/testnet/";
      case "LayerEdge":
        return "https://testnet-explorer.layeredge.io";
    }
  } else {
    switch (chain) {
      case "Ethereum":
        return "https://etherscan.io/";
      case "Arbitrum":
        return "https://arbiscan.io/";
      case "BSC":
        return "https://bscscan.com/";
      case "Bitlayer":
        return "https://scan.bitlayer.org/";
      case "Bitcoin":
        return "https://mempool.space/";
    }
  }
};
