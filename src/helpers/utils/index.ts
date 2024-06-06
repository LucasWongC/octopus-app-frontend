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
  const lowerCaseChainName = chain.toLowerCase();

  if (isDevelopment) {
    switch (lowerCaseChainName) {
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
    }
  } else {
    switch (lowerCaseChainName) {
      case "ethereum":
        return "https://etherscan.io/";
      case "arbitrum":
        return "https://arbiscan.io/";
      case "bsc":
        return "https://bscscan.com/";
      case "bitlayer":
        return "https://btrscan.com/";
      case "bitcoin":
        return "https://mempool.space/";
    }
  }
};
