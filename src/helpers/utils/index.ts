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
  const chainNameLowerCase = chain.toLowerCase();

  if (isDevelopment) {
    switch (chainNameLowerCase) {
      case "ethereum":
        return "https://sepolia.etherscan.io/";
      case "arbitrum":
        return "https://sepolia.arbiscan.io/";
      case "bsc":
        return "https://testnet.bscscan.com/";
      case "bitlayer":
        return "https://testnet-scan.bitlayer.org/";
      case "bitcoin":
        return "https://mempool.space/testnet/";
      case "layeredge":
        return "https://testnet-explorer.layeredge.io/";
      case "ailayer":
        return "https://testnet-explorer.ailayer.xyz/";
      case "bevm":
        return "https://scan-testnet.bevm.io/";
      case "gmnetwork":
        return "https://gmnetwork-testnet-explorer.alt.technology/";
      case "berachain":
        return "https://bartio.beratrail.io/";
    }
  } else {
    switch (chainNameLowerCase) {
      case "ethereum":
        return "https://etherscan.io/";
      case "arbitrum":
        return "https://arbiscan.io/";
      case "bsc":
        return "https://bscscan.com/";
      case "bitlayer":
        return "https://scan.bitlayer.org/";
      case "bitcoin":
        return "https://mempool.space/";
    }
  }
};
